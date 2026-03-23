/* ═══════════════════════════════════════════════════════════════
   MAKEIT × DEUCALION — SCRIPT
   Features: navbar, mobile menu, scroll reveal, terminal,
             FAQ accordion, chat with streaming SSE, stats counter
═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── Utility: wait for DOM ────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // ── Init Lucide icons ─────────────────────────────────────────
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ── LANGUAGE / TRANSLATIONS ────────────────────────────────
  const TRANSLATIONS = {
    pt: {
      'nav.cta': 'Contactar',
      'hero.event': 'COTEC Open Day',
      'hero.title': 'Supercomputação Europeia para a Indústria',
      'hero.subtitle': 'A MakeIt faz a ponte entre a sua empresa e os 30+ petaflops do Deucalion — sem precisar de experiência em HPC.',
      'hero.cta1': 'Falar com o AI Expert',
      'hero.cta2': 'Agendar Consulta',
      'chat.tagline': 'Respostas instantâneas sobre o Deucalion e como o HPC pode transformar o seu negócio.',
      'chat.welcome': 'Olá! Sou o assistente AI da MakeIt. Posso ajudá-lo com questões sobre o <strong>Deucalion</strong>, HPC e AI. O que pretende saber?',
      'chat.placeholder': 'Escreva a sua pergunta sobre Deucalion...',
      'chat.disclaimer': 'Assistente AI baseado na knowledge base da MakeIt. Para questões específicas, <a href="mailto:info@make-it.tech" class="text-link">contacte-nos diretamente</a>.',
      'chat.label': 'AI Expert',
      'footer.brand.desc': 'Parceiro de acesso ao supercomputador Deucalion. Programa COTEC Open Day.',
      'footer.col1.title': 'Plataforma',
      'footer.col2.title': 'Contacto',
      'footer.col3.title': 'Parceiros',
      'footer.link.chat': 'Chat AI Expert',
      'footer.link.deucalion': 'Sobre o Deucalion',
      'footer.link.cap': 'Capacidades HPC',
      'footer.link.faq': 'FAQ',
      'footer.link.consult': 'Consulta Gratuita',
      'footer.bottom': '© 2025 COTEC Open Day. Powered by EuroHPC Deucalion.',
      'footer.made': 'Feito em Portugal 🇵🇹',
      'suggestions': [
        'O que pode o Deucalion fazer pela minha indústria?',
        'Como trata a MakeIt um projeto do início ao fim?',
        'Quanto custa usar o Deucalion?',
        'Quanto tempo demora um projeto típico?',
        'O que é o Deucalion?',
        'Os meus dados estão seguros com a MakeIt?',
        'Que indústrias beneficiam mais do HPC?',
        'O que é o EuroHPC?',
        'A MakeIt pode treinar a nossa equipa?',
        'Que software corre no Deucalion?',
      ],
    },
    en: {
      'nav.cta': 'Contact',
      'hero.event': 'COTEC Open Day',
      'hero.title': 'European Supercomputing for Industry',
      'hero.subtitle': "MakeIt bridges your company with Deucalion's 30+ petaflops — no HPC expertise required.",
      'hero.cta1': 'Talk to the AI Expert',
      'hero.cta2': 'Schedule a Consultation',
      'chat.tagline': 'Instant answers about Deucalion and how HPC can transform your business.',
      'chat.welcome': "Hello! I'm MakeIt's AI assistant. I can help you with questions about <strong>Deucalion</strong>, HPC and AI. What would you like to know?",
      'chat.placeholder': 'Ask your question about Deucalion...',
      'chat.disclaimer': 'AI assistant based on MakeIt\'s knowledge base. For specific queries, <a href="mailto:info@make-it.tech" class="text-link">contact us directly</a>.',
      'chat.label': 'AI Expert',
      'footer.brand.desc': 'Access partner for the Deucalion supercomputer. COTEC Open Day programme.',
      'footer.col1.title': 'Platform',
      'footer.col2.title': 'Contact',
      'footer.col3.title': 'Partners',
      'footer.link.chat': 'AI Expert Chat',
      'footer.link.deucalion': 'About Deucalion',
      'footer.link.cap': 'HPC Capabilities',
      'footer.link.faq': 'FAQ',
      'footer.link.consult': 'Free Consultation',
      'footer.bottom': '© 2025 COTEC Open Day. Powered by EuroHPC Deucalion.',
      'footer.made': 'Built in Portugal 🇵🇹',
      'suggestions': [
        'What can Deucalion do for my industry?',
        'How does MakeIt handle a project from start to finish?',
        'What does it cost to use Deucalion?',
        'How long does a typical HPC project take?',
        'What is Deucalion?',
        'Is my data safe with MakeIt?',
        'What industries benefit most from HPC?',
        'What is EuroHPC?',
        'Can MakeIt train our team?',
        'What software runs on Deucalion?',
      ],
    },
  };

  let currentLang = localStorage.getItem('lang') || 'pt';

  function applyTranslations(lang) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS['pt'];
    // Simple text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) el.textContent = t[key];
    });
    // HTML content
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      if (t[key] !== undefined) el.innerHTML = t[key];
    });
    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (t[key] !== undefined) el.placeholder = t[key];
    });
    // Update lang buttons state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
    // Update html lang attribute
    document.documentElement.lang = lang;
  }

  // Lang switch handler
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang === currentLang) return;
      currentLang = lang;
      localStorage.setItem('lang', lang);
      applyTranslations(lang);
      // Re-render suggestions in new language
      if (typeof renderSuggestions === 'function') renderSuggestions('');
      else renderSuggestionsLang('');
    });
  });

  // Apply on load
  applyTranslations(currentLang);

  // ── 1. NAVBAR SCROLL EFFECT ────────────────────────────────────
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ── 2. MOBILE MENU ─────────────────────────────────────────────
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Fechar menu');
    mobileMenu.classList.add('open');
    mobileMenu.removeAttribute('aria-hidden');
    mobileMenu.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menu');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    setTimeout(() => { mobileMenu.style.display = ''; }, 300);
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      hamburger.classList.contains('open') &&
      !navbar.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // ── 3. SMOOTH SCROLL ──────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ── 4. SCROLL REVEAL ──────────────────────────────────────────
  const fadeElements = document.querySelectorAll('.fade-up');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  fadeElements.forEach(el => revealObserver.observe(el));

  // ── 5. STATS COUNTER ANIMATION ───────────────────────────────
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  function animateCounter(el) {
    const target  = parseInt(el.dataset.target, 10);
    const prefix  = el.dataset.prefix  || '';
    const suffix  = el.dataset.suffix  || '';
    const duration = 1400;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = `${prefix}${current}${suffix}`;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(el => counterObserver.observe(el));

  // ── 6. TERMINAL ANIMATION ────────────────────────────────────
  const termJobs       = document.getElementById('term-jobs');
  const termEfficiency = document.getElementById('term-efficiency');

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function updateTerminalMetrics() {
    if (termJobs) {
      const jobs = randomBetween(2400, 3200);
      termJobs.textContent = jobs.toLocaleString('pt-PT');
    }
    if (termEfficiency) {
      const eff = (randomBetween(920, 980) / 10).toFixed(1);
      termEfficiency.textContent = `${eff}%`;
    }
  }

  setInterval(updateTerminalMetrics, 3000);

  // ── 7. FAQ ACCORDION ─────────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = question.getAttribute('aria-expanded') === 'true';

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          const otherQ = other.querySelector('.faq-question');
          const otherA = other.querySelector('.faq-answer');
          if (otherQ && otherA) {
            otherQ.setAttribute('aria-expanded', 'false');
            otherA.hidden = true;
          }
        }
      });

      // Toggle this item
      if (isOpen) {
        question.setAttribute('aria-expanded', 'false');
        answer.hidden = true;
      } else {
        question.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
        // Reinit icons inside newly shown content
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    });
  });

  // ── 8. PROJECT DETAILS TOGGLE ────────────────────────────────
  const detailToggles = document.querySelectorAll('.proj-details-toggle');

  detailToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const controlsId  = btn.getAttribute('aria-controls');
      const details      = document.getElementById(controlsId);
      if (!details) return;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        btn.setAttribute('aria-expanded', 'false');
        details.hidden = true;
      } else {
        btn.setAttribute('aria-expanded', 'true');
        details.hidden = false;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    });
  });

  // ── 9. CHAT FUNCTIONALITY ─────────────────────────────────────

  // State
  const MAX_MESSAGES  = 20;
  const SESSION_KEY   = 'chatMsgCount';
  let conversationHistory = [];
  let isStreaming         = false;

  // DOM refs
  const chatForm          = document.getElementById('chat-form');
  const chatInput         = document.getElementById('chat-input');
  const chatSendBtn       = document.getElementById('chat-send-btn');
  const chatMessages      = document.getElementById('chat-messages');
  const charCounter       = document.getElementById('char-counter');
  const limitReached      = document.getElementById('limit-reached');
  const rateLimitInfo     = document.getElementById('rate-limit-info');
  const suggestionsEl     = document.getElementById('chat-suggestions');

  // ── Suggestion chips with autocomplete ───────────────────────
  function getActiveSuggestions() {
    return (TRANSLATIONS[currentLang] || TRANSLATIONS['pt'])['suggestions'] || [];
  }

  function renderSuggestions(query = '') {
    if (!suggestionsEl) return;
    const lower = query.toLowerCase().trim();
    const all = getActiveSuggestions();
    const filtered = lower
      ? all.filter(s => s.toLowerCase().includes(lower)).slice(0, 5)
      : all.slice(0, 4);

    suggestionsEl.innerHTML = '';
    filtered.forEach(text => {
      const btn = document.createElement('button');
      btn.className = 'suggestion-chip';
      btn.textContent = text;
      btn.type = 'button';
      btn.setAttribute('aria-label', text);
      btn.addEventListener('click', () => {
        if (getRemaining() <= 0 || isStreaming) return;
        chatInput.value = text;
        chatInput.dispatchEvent(new Event('input'));
        chatInput.focus();
      });
      suggestionsEl.appendChild(btn);
    });
  }

  renderSuggestions();

  // Get saved message count
  function getMsgCount() {
    return parseInt(sessionStorage.getItem(SESSION_KEY) || '0', 10);
  }

  function incrementMsgCount() {
    const newCount = getMsgCount() + 1;
    sessionStorage.setItem(SESSION_KEY, String(newCount));
    return newCount;
  }

  function getRemaining() {
    return Math.max(0, MAX_MESSAGES - getMsgCount());
  }

  function disableChat() {
    if (chatInput)    chatInput.disabled   = true;
    if (chatSendBtn)  chatSendBtn.disabled = true;
    if (limitReached) limitReached.hidden  = false;
  }

  // Initialise on load — disable chat if session already exhausted
  if (getRemaining() <= 0) disableChat();

  // ── Warning toast at message 15 ───────────────────────────────
  function showWarningToast() {
    const footer = document.querySelector('.chat-footer');
    if (!footer || document.getElementById('chat-warning-toast')) return;
    const toast = document.createElement('div');
    toast.id = 'chat-warning-toast';
    toast.className = 'chat-warning-toast';
    toast.setAttribute('role', 'alert');
    const warnText = currentLang === 'en'
      ? 'Notice: <strong>5 messages</strong> remaining in this free session.'
      : 'Atenção: Restam <strong>5 mensagens</strong> nesta sessão gratuita.';
    toast.innerHTML = `<i data-lucide="alert-triangle" aria-hidden="true"></i><span>${warnText}</span>`;
    footer.prepend(toast);
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // ── Handoff action card ───────────────────────────────────────
  function showHandoffActionCard() {
    const userMessages = conversationHistory
      .filter(m => m.role === 'user')
      .slice(-5)
      .map(m => `- ${m.content}`)
      .join('\n');
    const subject = encodeURIComponent('Interesse via Chat Deucalion - COTEC');
    const body = encodeURIComponent(
      `Olá MakeIt,\n\nTive uma conversa no vosso assistente AI durante o COTEC OpenDay e gostaria de continuar.\n\nAs minhas perguntas foram:\n${userMessages}\n\nGostaria de ser contactado para saber mais.\n\nObrigado.`
    );
    const mailHref = `mailto:info@make-it.tech?subject=${subject}&body=${body}`;

    const card = document.createElement('div');
    card.className = 'handoff-action-card';
    const isEn = currentLang === 'en';
    card.innerHTML = `
      <p class="handoff-action-title">${isEn ? 'Would you like to continue this conversation with MakeIt?' : 'Quer continuar esta conversa com a MakeIt?'}</p>
      <p class="handoff-action-sub">${isEn ? 'We can share the summary with the team to follow up.' : 'Podemos partilhar o resumo desta conversa com a equipa para dar seguimento.'}</p>
      <div class="handoff-action-btns">
        <a href="${mailHref}" class="handoff-btn-yes">
          <i data-lucide="mail" aria-hidden="true"></i>
          ${isEn ? 'Yes, contact me' : 'Sim, quero ser contactado'}
        </a>
        <button class="handoff-btn-no" type="button">${isEn ? 'No, thank you' : 'Não, obrigado'}</button>
      </div>`;
    card.querySelector('.handoff-btn-no').addEventListener('click', () => card.remove());
    chatMessages.appendChild(card);
    if (typeof lucide !== 'undefined') lucide.createIcons();
    scrollToBottom();
  }

  // ── Character counter ──────────────────────────────────────────
  if (chatInput && charCounter) {
    chatInput.addEventListener('input', () => {
      const len = chatInput.value.length;
      charCounter.textContent = `${len}/500`;
      charCounter.classList.toggle('warning', len >= 400 && len < 480);
      charCounter.classList.toggle('danger', len >= 480);

      // Auto-resize textarea
      chatInput.style.height = 'auto';
      chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';

      // Update suggestion autocomplete
      renderSuggestions(chatInput.value);
    });

    // Submit on Enter (Shift+Enter for newline)
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!isStreaming && getRemaining() > 0) {
          chatForm.requestSubmit();
        }
      }
    });
  }

  // ── Scroll to bottom ──────────────────────────────────────────
  function scrollToBottom(smooth = true) {
    if (!chatMessages) return;
    chatMessages.scrollTo({
      top: chatMessages.scrollHeight,
      behavior: smooth ? 'smooth' : 'instant',
    });
  }

  // ── Append message bubble ─────────────────────────────────────
  function appendMessage(role, content, isMarkdown = false) {
    if (!chatMessages) return null;

    const wrapper = document.createElement('div');
    wrapper.className = `chat-message ${role === 'user' ? 'user-message' : 'ai-message'}`;
    wrapper.setAttribute('role', 'article');

    if (role === 'assistant') {
      const avatar = document.createElement('div');
      avatar.className = 'msg-avatar';
      avatar.setAttribute('aria-hidden', 'true');
      avatar.innerHTML = '<i data-lucide="cpu"></i>';
      wrapper.appendChild(avatar);
    }

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';

    if (isMarkdown && role === 'assistant') {
      // Render markdown safely
      try {
        const rawHtml  = typeof marked !== 'undefined' ? marked.parse(content) : content;
        const cleanHtml = typeof DOMPurify !== 'undefined' ? DOMPurify.sanitize(rawHtml) : rawHtml;
        bubble.innerHTML = cleanHtml;
      } catch {
        bubble.textContent = content;
      }
    } else {
      const p = document.createElement('p');
      p.textContent = content;
      bubble.appendChild(p);
    }

    wrapper.appendChild(bubble);
    chatMessages.appendChild(wrapper);

    // Reinit Lucide icons in new avatar
    if (typeof lucide !== 'undefined') lucide.createIcons({ attrs: { 'stroke-width': 1.5 } });

    scrollToBottom();
    return bubble;
  }

  // ── Typing indicator ──────────────────────────────────────────
  function showTypingIndicator() {
    const wrapper = document.createElement('div');
    wrapper.className = 'chat-message ai-message typing-wrapper';
    wrapper.id = 'typing-indicator';

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.innerHTML = '<i data-lucide="cpu"></i>';
    wrapper.appendChild(avatar);

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = `
      <div class="typing-indicator" aria-label="A escrever...">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>`;
    wrapper.appendChild(bubble);

    chatMessages.appendChild(wrapper);
    if (typeof lucide !== 'undefined') lucide.createIcons();
    scrollToBottom();
    return wrapper;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
  }

  // ── Show error ────────────────────────────────────────────────
  function showError(message) {
    removeTypingIndicator();
    const wrapper = document.createElement('div');
    wrapper.className = 'chat-message ai-message';
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.style.background = 'rgba(229,57,53,0.08)';
    bubble.style.border = '1px solid rgba(229,57,53,0.2)';
    bubble.style.color = '#FCA5A5';
    const p = document.createElement('p');
    p.textContent = message;
    p.style.color = '#FCA5A5';
    bubble.appendChild(p);
    wrapper.appendChild(bubble);
    chatMessages.appendChild(wrapper);
    scrollToBottom();
  }

  // ── Handle streaming response ─────────────────────────────────
  async function handleStreamingResponse(response, aiBubble) {
    const reader  = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer    = '';
    let fullText  = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // keep incomplete line

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);

            if (parsed.error) {
              throw new Error(parsed.error);
            }

            if (parsed.text) {
              fullText += parsed.text;

              // Render markdown on the accumulated text
              if (aiBubble) {
                try {
                  const raw   = typeof marked !== 'undefined' ? marked.parse(fullText) : fullText;
                  const clean = typeof DOMPurify !== 'undefined' ? DOMPurify.sanitize(raw) : raw;
                  aiBubble.innerHTML = clean;
                } catch {
                  aiBubble.textContent = fullText;
                }
                scrollToBottom(false);
              }
            }
          } catch (parseErr) {
            if (parseErr.message && parseErr.message !== 'Unexpected end of JSON input') {
              throw parseErr;
            }
          }
        }
      }
    } catch (err) {
      throw err;
    }

    return fullText;
  }

  // ── Main chat submit ──────────────────────────────────────────
  if (chatForm) {
    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Guard conditions
      if (isStreaming)               return;
      if (getRemaining() <= 0)       return;
      if (!chatInput?.value.trim())  return;

      const userText = chatInput.value.trim();
      if (userText.length > 500) {
        showError('A sua mensagem excede 500 caracteres. Por favor, encurte a pergunta.');
        return;
      }

      // Clear input + reset size
      chatInput.value = '';
      chatInput.style.height = 'auto';
      if (charCounter) charCounter.textContent = '0/500';
      charCounter?.classList.remove('warning', 'danger');

      // Disable inputs during streaming
      isStreaming = true;
      chatInput.disabled   = true;
      chatSendBtn.disabled = true;
      if (rateLimitInfo) rateLimitInfo.hidden = true;

      // Show user message
      appendMessage('user', userText);

      // Build history for request (last 6 messages)
      const historyToSend = conversationHistory.slice(-6);

      // Show typing indicator
      showTypingIndicator();

      // Increment counter + trigger milestone logic
      const newCount = incrementMsgCount();
      if (newCount === 15) showWarningToast();
      const isHandoff = newCount === 16;

      try {
        const response = await fetch('/api/chat', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userText,
            history: historyToSend,
            handoffTrigger: isHandoff,
            lang: currentLang,
          }),
        });

        // Check for error responses
        if (response.status === 429) {
          removeTypingIndicator();
          await response.json().catch(() => ({}));
          if (rateLimitInfo) {
            rateLimitInfo.hidden  = false;
            rateLimitInfo.textContent = 'Muitas mensagens. Aguarde 5 minutos.';
          }
          showError('Atingiu o limite de pedidos por minuto. Aguarde um momento e tente novamente, ou contacte-nos em info@make-it.tech.');
          return;
        }

        if (!response.ok) {
          const errData = await response.json().catch(() => ({ error: 'Erro desconhecido.' }));
          throw new Error(errData.error || 'Erro do servidor.');
        }

        // Remove typing indicator, create AI bubble
        removeTypingIndicator();
        const aiWrapper = document.createElement('div');
        aiWrapper.className = 'chat-message ai-message';
        aiWrapper.setAttribute('role', 'article');

        const aiAvatar = document.createElement('div');
        aiAvatar.className = 'msg-avatar';
        aiAvatar.setAttribute('aria-hidden', 'true');
        aiAvatar.innerHTML = '<i data-lucide="cpu"></i>';
        aiWrapper.appendChild(aiAvatar);

        const aiBubble = document.createElement('div');
        aiBubble.className = 'msg-bubble';
        aiBubble.textContent = '';
        aiWrapper.appendChild(aiBubble);
        chatMessages.appendChild(aiWrapper);
        if (typeof lucide !== 'undefined') lucide.createIcons();
        scrollToBottom();

        // Stream the response
        const fullText = await handleStreamingResponse(response, aiBubble);

        // Update conversation history
        conversationHistory.push({ role: 'user', content: userText });
        conversationHistory.push({ role: 'assistant', content: fullText });

        // Show handoff card after the 16th message response
        if (isHandoff) showHandoffActionCard();
        // Keep max 10 messages in memory (5 pairs)
        if (conversationHistory.length > 10) {
          conversationHistory = conversationHistory.slice(-10);
        }

      } catch (err) {
        console.error('[Chat] Error:', err);
        removeTypingIndicator();
        showError(
          err.message ||
          'Ocorreu um erro ao processar a sua pergunta. Por favor, tente novamente ou contacte info@make-it.tech.'
        );
      } finally {
        isStreaming = false;

        // Re-enable or keep disabled based on remaining count
        if (getRemaining() > 0) {
          chatInput.disabled   = false;
          chatSendBtn.disabled = false;
          chatInput.focus();
        } else {
          disableChat();
        }
      }
    });
  }

  // ── 10. SUGGESTED QUESTIONS — handled by renderSuggestions() ──

  // ── 11. HERO "ASK THE AI" BUTTON ─────────────────────────────
  const heroChatBtn = document.getElementById('hero-chat-btn');
  if (heroChatBtn) {
    heroChatBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const chatSection = document.getElementById('chat');
      if (chatSection) {
        chatSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          if (chatInput && !chatInput.disabled) chatInput.focus();
        }, 600);
      }
    });
  }

  // ── 12. REDUCE MOTION — respect OS preference ─────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Immediately show all fade-up elements without animation
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // ── Done ──────────────────────────────────────────────────────
  console.log('%cMakeIt × Deucalion 🚀', 'color: #E53935; font-size: 16px; font-weight: bold;');
  console.log('%cPowered by EuroHPC · MACC · Braga, Portugal', 'color: #A1A1AA;');

}); // end DOMContentLoaded
