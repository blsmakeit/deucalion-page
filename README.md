# MakeIt × Deucalion — HPC Solutions Platform

A high-performance, production-ready web platform that showcases **Deucalion** (Portugal's EuroHPC supercomputer) and **MakeIt**'s consultancy services. Designed to convert enterprise visitors into clients through an immersive experience and an embedded AI expert chat powered by Claude.

---

## Overview

This page is linked directly from MakeIt's main website and serves as the primary conversion tool for HPC/AI project enquiries. Target audience: Portuguese and European companies with complex computational challenges across automotive, pharmaceutical, energy, finance, and environmental sectors.

**Live demo flow:**
Visitor lands → understands Deucalion's power → sees real project impact → asks the AI expert → contacts MakeIt.

---

## Features

| Feature | Details |
|---|---|
| **AI Chat (RAG)** | Claude `claude-opus-4-6` with context retrieved from `knowledge-base.txt`. Responds in the visitor's language (PT/EN). SSE streaming. |
| **Rate Limiting** | 25 requests / 15 min per IP (server) · 20 messages per browser session (client) |
| **Project Portfolio** | 5 real case studies with quantified impact metrics |
| **Responsive Design** | Fully mobile-first, WCAG AA accessible |
| **Dark UI** | Glassmorphism cards, animated hero orbs, live terminal metrics widget |
| **Security** | Helmet CSP headers, CORS, input sanitisation, 500-char message limit |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Node.js 20 + Express 4 |
| **AI** | Anthropic SDK — `claude-opus-4-6`, SSE streaming |
| **RAG** | Keyword-scored retrieval from `knowledge-base.txt` (no vector DB needed) |
| **Frontend** | Vanilla HTML5 / CSS3 / JavaScript (no framework) |
| **Fonts** | Plus Jakarta Sans (headings) · Inter (body) · JetBrains Mono (chat) |
| **Icons** | Lucide Icons (CDN) |
| **Markdown** | marked.js + DOMPurify (chat responses) |

---

## Project Structure

```
COTEC/
├── server.js              # Express server — API, RAG, streaming
├── knowledge-base.txt     # RAG knowledge base (edit to update AI answers)
├── package.json
├── .env.example
└── public/
    ├── index.html         # Full landing page (8 sections)
    ├── styles.css         # Design system + all component styles
    └── script.js          # Chat streaming, animations, FAQ accordion
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Local Development

```bash
# 1. Clone / navigate to project
cd COTEC

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY

# 4. Start the server
npm start
# → http://localhost:3000

# (Optional) Auto-restart on file changes
npm run dev
```

### Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ | — | Your Anthropic API key |
| `PORT` | ❌ | `3000` | Server port |
| `ALLOWED_ORIGIN` | ❌ | `*` | CORS allowed origin (set to your domain in production) |

---

## Updating the AI Knowledge Base

All AI answers are grounded in `knowledge-base.txt`. To update:

1. Open `knowledge-base.txt`
2. Edit or add content within the existing `=== SECTION NAME ===` blocks
3. Restart the server — the file is loaded on startup

The RAG system splits the file by section headers and scores each section against the user's query using keyword frequency. Top 3 sections are injected as context into each Claude request.

---

## Deployment

> **Important:** This project requires a persistent Node.js server (Express + SSE streaming). It **cannot** be deployed on Netlify's static hosting or standard serverless functions — SSE connections exceed Netlify Function timeouts.

### Recommended: Render

1. Push the repository to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variable: `ANTHROPIC_API_KEY`
6. Deploy — Render provides a free tier with auto-sleep (or paid for always-on)

### Alternatives

| Platform | Notes |
|---|---|
| **Railway** | Excellent DX, generous free tier, no sleep |
| **Fly.io** | Best performance/price for Europe region |
| **Heroku** | Classic choice, reliable |
| **VPS (Hetzner/OVH)** | Full control, recommended for production |

---

## Page Sections

| Section | ID | Description |
|---|---|---|
| Navigation | `#navbar` | Fixed, frosted-glass on scroll |
| Hero | `#hero` | Animated background + live terminal widget |
| Statistics | `#stats` | 4 key impact numbers with count-up animation |
| About | `#about` | What is Deucalion + MACC + EuroHPC context |
| Capabilities | `#capabilities` | 6 industry use-case cards |
| Projects | `#projects` | 5 case studies with expandable detail |
| AI Chat | `#chat` | RAG-powered chat interface |
| FAQ | `#faq` | 7-item accordion |
| Contact | `#contact` | CTA with email links |

---

## Brand Guidelines

| Element | Value |
|---|---|
| Primary (MakeIt) | `#E53935` (Red) |
| Accent (Deucalion) | `#6366F1` (Indigo) |
| Background | `#09090B` (Near-black) |
| Surface | `#18181B` |
| Text | `#FAFAFA` / `#A1A1AA` |

---

## License

Proprietary — © 2024 MakeIt Technology. All rights reserved.
