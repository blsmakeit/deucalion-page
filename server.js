require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Security & Middleware ──────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
    },
  },
}));

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['GET', 'POST'],
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ── Rate Limiting ──────────────────────────────────────────────────────────────
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests. Please wait 5 minutes before trying again.',
    retryAfter: 300,
  },
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  },
});

// ── Knowledge Base RAG ────────────────────────────────────────────────────────
let knowledgeSections = [];

function loadKnowledgeBase() {
  try {
    const kbPath = path.join(__dirname, 'knowledge-base.txt');
    const raw = fs.readFileSync(kbPath, 'utf-8');

    // Split by === SECTION NAME === headers
    const parts = raw.split(/(?=^=== .+ ===)/m).filter(Boolean);

    knowledgeSections = parts.map((section) => {
      const match = section.match(/^=== (.+) ===/);
      const title = match ? match[1].trim() : 'GENERAL';
      const content = section.replace(/^=== .+ ===\n?/, '').trim();
      return { title, content };
    });

    console.log(`[KB] Loaded ${knowledgeSections.length} knowledge sections.`);
  } catch (err) {
    console.error('[KB] Failed to load knowledge base:', err.message);
    knowledgeSections = [];
  }
}

function retrieveRelevantContext(query, topK = 3) {
  if (!knowledgeSections.length) return '';

  const queryLower = query.toLowerCase();
  const queryWords = queryLower
    .split(/\W+/)
    .filter((w) => w.length > 3);

  // Score each section by keyword overlap
  const scored = knowledgeSections.map((section) => {
    const text = (section.title + ' ' + section.content).toLowerCase();
    let score = 0;

    // Direct substring matches (higher weight)
    if (text.includes(queryLower)) score += 10;

    // Individual keyword matches
    for (const word of queryWords) {
      // Count occurrences
      const occurrences = (text.match(new RegExp(word, 'g')) || []).length;
      score += occurrences;
    }

    // Boost certain sections based on topic keywords
    const topicBoosts = {
      'PROJECTS': ['project', 'case', 'example', 'automotive', 'pharma', 'drug', 'wind', 'energy', 'bank', 'finance', 'ocean', 'climate', 'ev', 'aerodynamic'],
      'TECHNICAL SPECIFICATIONS': ['spec', 'hardware', 'gpu', 'cpu', 'petaflop', 'memory', 'storage', 'node', 'technical', 'infrastructure'],
      'USE CASES': ['use', 'application', 'industry', 'simulation', 'cfd', 'machine learning', 'ai', 'ml'],
      'FREQUENTLY ASKED QUESTIONS': ['cost', 'price', 'how', 'what', 'why', 'access', 'time', 'duration', 'safe', 'data', 'train', 'consult'],
      'ABOUT MAKEIT': ['makeit', 'company', 'service', 'team', 'who', 'contact', 'consult'],
      'WHAT IS DEUCALION': ['deucalion', 'supercomputer', 'eurohpc', 'macc', 'braga', 'portugal', 'what is'],
    };

    for (const [sectionKey, keywords] of Object.entries(topicBoosts)) {
      if (section.title.includes(sectionKey)) {
        for (const kw of keywords) {
          if (queryLower.includes(kw)) score += 5;
        }
      }
    }

    return { section, score };
  });

  // Sort descending, pick top K
  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, topK);

  if (top.every((t) => t.score === 0)) {
    // No relevant match — return first 3 sections as fallback
    return knowledgeSections
      .slice(0, topK)
      .map((s) => `[${s.title}]\n${s.content}`)
      .join('\n\n---\n\n');
  }

  return top
    .map((t) => `[${t.section.title}]\n${t.section.content}`)
    .join('\n\n---\n\n');
}

loadKnowledgeBase();

// ── Auto-reload KB when knowledge-base.txt changes ─────────────
fs.watch(path.join(__dirname, 'knowledge-base.txt'), { persistent: false }, (eventType) => {
  if (eventType === 'change') {
    console.log('[KB] knowledge-base.txt changed — reloading...');
    loadKnowledgeBase();
  }
});

// ── Anthropic Client ───────────────────────────────────────────────────────────
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ── Chat Endpoint ──────────────────────────────────────────────────────────────
app.post('/api/chat', chatLimiter, async (req, res) => {
  // Input validation
  const { message, history, handoffTrigger, lang } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required.' });
  }

  const trimmedMessage = message.trim();
  if (!trimmedMessage) {
    return res.status(400).json({ error: 'Message cannot be empty.' });
  }

  if (trimmedMessage.length > 500) {
    return res.status(400).json({ error: 'Message exceeds 500 character limit.' });
  }

  let conversationHistory = [];
  if (Array.isArray(history)) {
    // Validate and sanitize history — max 6 items, only role+content strings
    conversationHistory = history
      .slice(-6)
      .filter(
        (h) =>
          h &&
          typeof h === 'object' &&
          (h.role === 'user' || h.role === 'assistant') &&
          typeof h.content === 'string' &&
          h.content.length > 0
      )
      .map((h) => ({ role: h.role, content: h.content.slice(0, 1000) }));
  }

  // RAG: retrieve relevant context
  const context = retrieveRelevantContext(trimmedMessage, 3);

  const handoffInstruction = handoffTrigger === true ? `

SPECIAL INSTRUCTION FOR THIS RESPONSE ONLY: After your (very brief) answer to the user's question, add EXACTLY the following paragraph — adapt the language to match what the user is writing in:
• If writing in Portuguese: "Estivemos aqui a falar de coisas interessantes que acho que devias falar com a MAKE IT. Queres que a MAKE IT entre em contacto contigo para continuar a conversa? Posso partilhar com a MAKE IT o teu interesse com base nesta conversa ou podes-me dizer aqui uma mensagem específica que queres que lhes envie."
• If writing in English: "We've been having an interesting conversation here — I think this is something you should discuss directly with MAKE IT. Would you like MAKE IT to get in touch with you? I can share your interest based on our conversation, or you can tell me a specific message you'd like me to send them."` : '';

  const systemPrompt = `You are an expert AI assistant for MakeIt Technology — a Portuguese HPC and AI company that helps businesses access Deucalion, one of Europe's most powerful supercomputers, hosted at MACC in Braga, Portugal. This assistant is part of the Programa COTEC OpenDay.
${lang === 'en' ? 'CRITICAL: You MUST respond ONLY in English. Every single word of your response must be in English.' : 'CRÍTICO: DEVES responder SEMPRE e APENAS em Português Europeu. Absolutamente todas as palavras devem ser em Português.'}

Your role is to help visitors understand:
- What Deucalion is and what it can do
- How MakeIt can help their company use it
- Real project examples and their business impact
- Practical information about costs, timelines, and the process

KNOWLEDGE BASE CONTEXT (use this to answer accurately):
${context}

RESPONSE STYLE — CRITICAL:
- Be extremely concise and direct. Maximum 2–3 short paragraphs OR a short bulleted list.
- Use markdown formatting: **bold** for key terms, bullet lists for comparisons or options, short sentences.
- Never be verbose, never pad your answer, never repeat information already given.
- Get straight to the point.

GUIDELINES:
- Always respond in the same language the user writes in (Portuguese or English)
- Be professional and genuinely helpful — no marketing fluff
- Base your answers on the knowledge base context when relevant
- For questions outside the knowledge base (custom quotes, proprietary details), recommend: info@make-it.tech
- Never invent technical specifications or project details not in the knowledge base
- When relevant, mention MakeIt offers a free initial consultation${handoffInstruction}`;

  // Set up SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  try {
    const messages = [
      ...conversationHistory,
      { role: 'user', content: trimmedMessage },
    ];

    const stream = await anthropic.messages.stream({
      model: 'claude-opus-4-6',
      max_tokens: 600,
      system: systemPrompt,
      messages,
    });

    for await (const event of stream) {
      if (
        event.type === 'content_block_delta' &&
        event.delta?.type === 'text_delta' &&
        event.delta.text
      ) {
        const payload = JSON.stringify({ text: event.delta.text });
        res.write(`data: ${payload}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('[Chat] Error:', err.message);

    if (!res.headersSent) {
      return res.status(500).json({ error: 'AI service temporarily unavailable. Please try again.' });
    }

    const errPayload = JSON.stringify({ error: 'An error occurred. Please try again or contact us at info@make-it.tech.' });
    res.write(`data: ${errPayload}\n\n`);
    res.end();
  }
});

// ── Health Check ───────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    kbSections: knowledgeSections.length,
    timestamp: new Date().toISOString(),
  });
});

// ── Catch-all → index.html ─────────────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Start Server ───────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 COTEC / MakeIt x Deucalion server running on http://localhost:${PORT}`);
  console.log(`   Knowledge base: ${knowledgeSections.length} sections loaded`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}\n`);
});
