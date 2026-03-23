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
      'hero.trust4': '20+ Projetos',
      'about.label': 'O Supercomputador',
      'about.title': 'O Que é o <span class="gradient-text">Deucalion</span>?',
      'about.text1': 'O Deucalion é um dos supercomputadores mais poderosos da Europa, alojado no MACC (Minho Advanced Computing Centre) em Braga, Portugal. Parte do consórcio EuroHPC Joint Undertaking, foi inaugurado em 2023 com um desempenho de pico superior a <strong>30 petaflops</strong> — o equivalente a 30 quatrilhões de operações por segundo.',
      'about.text2': 'Com processadores <strong>AMD EPYC</strong> de última geração e GPUs <strong>AMD Instinct MI250X</strong>, o sistema é igualmente capaz de lidar com simulações científicas tradicionais e com os workloads de IA mais exigentes — tornando Portugal num polo de computação científica e industrial de nível mundial.',
      'about.cta': 'Ver Capacidades',
      'about.card1.text': 'O Minho Advanced Computing Centre opera o Deucalion num data center de última geração em Braga. Infraestrutura soberana europeia, com toda a segurança e conformidade GDPR.',
      'about.card2.text': 'Financiado pela iniciativa europeia EuroHPC, o acesso ao Deucalion é parcialmente subsidiado — nivelando o campo de jogo para empresas portuguesas face à concorrência internacional com infraestrutura HPC própria.',
      'about.card3.title': 'Hardware de Ponta',
      'about.card3.text': 'AMD EPYC para CPU workloads · AMD Instinct MI250X GPUs · InfiniBand HDR · Lustre Petabyte Storage · Suporte ROCm, MPI, OpenMP, TensorFlow, PyTorch.',
      'cap.label': 'O Que é Possível',
      'cap.title': 'O Que Pode o Deucalion Fazer Pela <span class="gradient-text">Sua Empresa?</span>',
      'cap.subtitle': 'Do design automóvel à descoberta de fármacos — o Deucalion transforma problemas que pareciam impossíveis em resultados em semanas.',
      'cap.cfd': 'Simule aerodinâmica, fluxo de fluidos e processos térmicos com resolução sem precedentes. Da carroçaria de um veículo ao escoamento em turbinas eólicas.',
      'cap.drug': 'Explore milhões de candidatos moleculares e acelere ciclos de I&D de anos para semanas, com dinâmica molecular e deep learning acelerado por GPU.',
      'cap.ai': 'Treine modelos de linguagem, visão computacional e IA generativa com clusters de GPU massivos. Fine-tuning de LLMs sobre dados proprietários da sua indústria.',
      'cap.energy': 'Otimize parques eólicos, instalações solares e configurações de redes inteligentes. Simule milhares de layouts para maximizar produção anual de energia.',
      'cap.finance': 'Execute milhões de cenários Monte Carlo para avaliação de risco em tempo real e otimização de portfolios. De 4 horas para 18 minutos — resultados reais.',
      'cap.climate': 'Simulações ambientais de alta resolução que orientam decisões de política e descobertas científicas. Modelos acoplados oceano-atmosfera com 3× mais resolução.',
      'faq.label': 'Perguntas Frequentes',
      'faq.title': 'Tudo o Que Precisa de <span class="gradient-text">Saber</span>',
      'faq.subtitle': 'As perguntas mais comuns sobre o Deucalion, a MakeIt, e como o HPC pode beneficiar a sua empresa.',
      'faq.q1': 'O que é um supercomputador e porque precisa a minha empresa de um?',
      'faq.q2': 'Como posso aceder ao Deucalion através da MakeIt?',
      'faq.q3': 'Quanto custa utilizar o Deucalion através da MakeIt?',
      'faq.q4': 'Quanto tempo demora um projeto típico?',
      'faq.q5': 'Os meus dados e propriedade intelectual estão seguros?',
      'faq.q6': 'O que é o EuroHPC e porque importa para empresas portuguesas?',
      'faq.q7': 'A MakeIt pode treinar a nossa equipa?',
      'faq.a1': '<p>Um supercomputador realiza centenas de biliões de cálculos por segundo — muito além do que mesmo um grande cluster de workstations consegue alcançar.</p><p>A sua empresa pode beneficiar se precisar de: processar conjuntos de dados massivos que excedem a capacidade atual da sua infraestrutura; executar simulações físicas complexas (aerodinâmica, mecânica estrutural, escoamento de fluidos); treinar modelos de IA ou machine learning de grande escala; ou explorar problemas de otimização com milhões de variáveis.</p><p>Se os seus engenheiros esperam horas ou dias pelos resultados de uma simulação, ou se tem uma questão de investigação que parece computacionalmente \'impossível\', é um sinal forte de que o HPC pode transformar o seu trabalho.</p>',
      'faq.a2': '<p>A MakeIt gere todo o processo — não precisa de qualquer experiência prévia em HPC. O processo típico é:</p><ol><li><strong>Consulta inicial gratuita</strong> para compreender o seu problema e avaliar viabilidade.</li><li><strong>Design de arquitetura</strong> computacional e estimativa de recursos necessários.</li><li>A MakeIt <strong>candidata-se a alocações de tempo</strong> de computação no Deucalion em seu nome.</li><li>Os nossos engenheiros <strong>desenvolvem ou adaptam</strong> o seu software para execução paralela eficiente.</li><li><strong>Executamos as computações</strong>, monitorizamos o progresso e resolvemos problemas.</li><li><strong>Entregamos os resultados</strong> com análise completa, visualizações e documentação.</li></ol><p>Você foca-se na sua área de especialização — nós tratamos de tudo o que é técnico.</p>',
      'faq.a3': '<p>Os custos dependem do âmbito, complexidade e duração do projeto. A MakeIt oferece:</p><ul><li><strong>Pacotes de preço fixo por projeto</strong> para estudos bem definidos.</li><li><strong>Modelos de retainer</strong> para trabalhos contínuos ou exploratórios.</li></ul><p>Importantemente, o tempo de computação no Deucalion é significativamente <strong>subsidiado pelo financiamento EuroHPC</strong>, o que reduz dramaticamente os custos de infraestrutura face a HPC comercial em cloud para projetos elegíveis.</p><p><strong>A consulta inicial é sempre gratuita</strong> e inclui uma estimativa de custos detalhada antes de qualquer compromisso.</p>',
      'faq.a4': '<ul><li><strong>Estudos de viabilidade ou simulações piloto:</strong> 2–4 semanas.</li><li><strong>Campanhas de simulação de média escala ou desenvolvimento de modelos ML:</strong> 4–8 semanas.</li><li><strong>Projetos de grande escala multi-física ou modelos climáticos de longa duração:</strong> 2–6 meses.</li></ul><p>Definimos sempre marcos claros e fornecemos relatórios de progresso semanais. O tempo de entrega é dramaticamente mais rápido — como os nossos casos de estudo mostram, comprimimos 18 meses de descoberta de fármacos em 3 semanas.</p>',
      'faq.a5': '<p>Absolutamente. A MakeIt opera sob padrões rigorosos de governança de dados:</p><ul><li>Conformidade total com o <strong>RGPD</strong>.</li><li>Assinamos <strong>NDAs abrangentes</strong> com todos os clientes antes de qualquer envolvimento.</li><li>Práticas alinhadas com <strong>ISO 27001</strong> de segurança da informação.</li><li>Todos os dados armazenados em <strong>sistemas encriptados com controlos de acesso</strong>.</li><li>A infraestrutura do Deucalion é operada pelo MACC com protocolos de segurança ao nível da UE.</li></ul><p>A sua propriedade intelectual permanece inteiramente sua.</p>',
      'faq.a6': '<p>O EuroHPC (European High Performance Computing Joint Undertaking) é uma iniciativa da UE para construir e operar infraestruturas de supercomputação de classe mundial em toda a Europa. Financiou o Deucalion como sistema flagship de Portugal.</p><p>Para empresas portuguesas, o EuroHPC é importante porque:</p><ul><li>Proporciona <strong>acesso subsidiado</strong> a infraestrutura que custaria centenas de milhões de euros.</li><li>Nivela o campo de jogo face a concorrentes internacionais maiores com infraestrutura HPC própria.</li><li>Mantém os seus dados dentro da <strong>soberania europeia</strong> e dos quadros regulatórios.</li><li>Desenvolve competências e competitividade nacional em setores tecnológicos estratégicos.</li></ul>',
      'faq.a7': '<p>Sim. A MakeIt oferece formação adaptada a diferentes níveis de competência:</p><ul><li><strong>Sessões introdutórias de consciencialização HPC</strong> para gestores técnicos e decisores.</li><li><strong>Cursos práticos de programação paralela</strong> (MPI, OpenMP, programação GPU com ROCm/CUDA).</li><li><strong>Formação específica por domínio</strong> para CFD, simulação molecular ou workloads de ML.</li><li><strong>Transferência de conhecimento</strong> ao longo de todos os envolvimentos de projeto.</li></ul><p>Acreditamos em capacitar os clientes, não em criar dependência.</p>',
      'faq.cta.text': 'Não encontrou a resposta que procurava?',
      'faq.cta.btn': 'Fazer uma Pergunta',
      'contact.title': 'Pronto para Resolver o Seu Maior <span class="gradient-text">Desafio Computacional?</span>',
      'contact.subtitle': 'Junte-se às empresas de Portugal e Europa que transformaram a sua I&D, operações e inovação com a MakeIt e o Deucalion. A consulta inicial é gratuita — sem compromisso.',
      'contact.btn1': 'Enviar Mensagem',
      'contact.btn2': 'Agendar Consulta',
      'contact.trust1': 'Consulta inicial gratuita',
      'contact.trust2': 'Resposta em 1 dia útil',
      'contact.trust3': 'NDA disponível',
      'contact.trust4': 'Sem compromisso',
      'mobile.cta': 'Contactar',
      'modal.title': 'Enviar Mensagem',
      'modal.title.makeit': 'Contactar a MAKE IT',
      'modal.title.deucalion': 'Contactar o Deucalion',
      'modal.title.cotec': 'Contactar a COTEC',
      'modal.label.to': 'Para *',
      'modal.label.name': 'Nome *',
      'modal.label.email': 'Email *',
      'modal.label.subject': 'Assunto',
      'modal.label.message': 'Mensagem *',
      'modal.label.attachment': 'Anexo (opcional)',
      'modal.placeholder.name': 'O seu nome',
      'modal.placeholder.subject': 'Consulta sobre o Deucalion',
      'modal.placeholder.message': 'Descreva o seu projeto ou questão...',
      'modal.file.label': 'Adicionar ficheiro',
      'modal.submit': 'Enviar Mensagem',
      'modal.sending': 'A enviar...',
      'modal.success': 'Mensagem enviada com sucesso! Entraremos em contacto brevemente.',
      'modal.error': 'Erro ao enviar. Por favor tente novamente ou contacte info@make-it.tech.',
      'modal.error.fields': 'Por favor preencha nome, email e mensagem.',
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
      'hero.trust4': '20+ Projects',
      'about.label': 'The Supercomputer',
      'about.title': 'What is <span class="gradient-text">Deucalion</span>?',
      'about.text1': 'Deucalion is one of Europe\'s most powerful supercomputers, hosted at MACC (Minho Advanced Computing Centre) in Braga, Portugal. Part of the EuroHPC Joint Undertaking, it was inaugurated in 2023 with peak performance exceeding <strong>30 petaflops</strong> — the equivalent of 30 quadrillion operations per second.',
      'about.text2': 'Powered by next-generation <strong>AMD EPYC</strong> processors and <strong>AMD Instinct MI250X</strong> GPUs, the system handles both traditional scientific simulations and the most demanding AI workloads — making Portugal a world-class hub for scientific and industrial computing.',
      'about.cta': 'See Capabilities',
      'about.card1.text': 'The Minho Advanced Computing Centre operates Deucalion in a state-of-the-art data center in Braga. European sovereign infrastructure, with full security and GDPR compliance.',
      'about.card2.text': 'Funded by the EuroHPC European initiative, access to Deucalion is partially subsidized — leveling the playing field for Portuguese companies against international competition with private HPC infrastructure.',
      'about.card3.title': 'Cutting-Edge Hardware',
      'about.card3.text': 'AMD EPYC for CPU workloads · AMD Instinct MI250X GPUs · InfiniBand HDR · Lustre Petabyte Storage · ROCm, MPI, OpenMP, TensorFlow, PyTorch support.',
      'cap.label': "What's Possible",
      'cap.title': 'What Can Deucalion Do For <span class="gradient-text">Your Business?</span>',
      'cap.subtitle': 'From automotive design to drug discovery — Deucalion turns seemingly impossible problems into results in weeks.',
      'cap.cfd': 'Simulate aerodynamics, fluid flow, and thermal processes with unprecedented resolution. From vehicle body shapes to flow in wind turbines.',
      'cap.drug': 'Explore millions of molecular candidates and accelerate R&D cycles from years to weeks, with molecular dynamics and GPU-accelerated deep learning.',
      'cap.ai': 'Train language models, computer vision, and generative AI with massive GPU clusters. Fine-tune LLMs on your industry\'s proprietary data.',
      'cap.energy': 'Optimize wind farms, solar installations, and smart grid configurations. Simulate thousands of layouts to maximize annual energy production.',
      'cap.finance': 'Run millions of Monte Carlo scenarios for real-time risk assessment and portfolio optimization. From 4 hours to 18 minutes — real results.',
      'cap.climate': 'High-resolution environmental simulations that guide policy decisions and scientific discoveries. Coupled ocean-atmosphere models with 3× more resolution.',
      'faq.label': 'Frequently Asked Questions',
      'faq.title': 'Everything You Need to <span class="gradient-text">Know</span>',
      'faq.subtitle': 'The most common questions about Deucalion, MakeIt, and how HPC can benefit your company.',
      'faq.q1': 'What is a supercomputer and why does my company need one?',
      'faq.q2': 'How can I access Deucalion through MakeIt?',
      'faq.q3': 'What does it cost to use Deucalion through MakeIt?',
      'faq.q4': 'How long does a typical project take?',
      'faq.q5': 'Is my data and intellectual property safe?',
      'faq.q6': 'What is EuroHPC and why does it matter for Portuguese companies?',
      'faq.q7': 'Can MakeIt train our team?',
      'faq.a1': '<p>A supercomputer performs hundreds of trillions of calculations per second — far beyond what even a large cluster of workstations can achieve.</p><p>Your company could benefit if you need to: process massive datasets that exceed your current infrastructure capacity; run complex physics simulations (aerodynamics, structural mechanics, fluid flow); train large AI or machine learning models; or explore optimization problems with millions of variables.</p><p>If your engineers are waiting hours or days for simulation results, or if you have a research question that seems computationally "impossible," that\'s a strong signal that HPC could transform your work.</p>',
      'faq.a2': '<p>MakeIt manages the entire process — you don\'t need any prior HPC expertise. The typical process is:</p><ol><li><strong>Free initial consultation</strong> to understand your problem and assess feasibility.</li><li><strong>Computational architecture design</strong> and resource requirements estimate.</li><li>MakeIt <strong>applies for computing time allocations</strong> on Deucalion on your behalf.</li><li>Our engineers <strong>develop or adapt</strong> your software for efficient parallel execution.</li><li>We <strong>run the computations</strong>, monitor progress, and troubleshoot.</li><li>We <strong>deliver results</strong> with full analysis, visualizations, and documentation.</li></ol><p>You focus on your domain expertise — we handle everything technical.</p>',
      'faq.a3': '<p>Costs depend on project scope, complexity, and duration. MakeIt offers:</p><ul><li><strong>Fixed-price project packages</strong> for well-defined studies.</li><li><strong>Retainer models</strong> for ongoing or exploratory work.</li></ul><p>Importantly, computing time on Deucalion is significantly <strong>subsidized by EuroHPC funding</strong>, which dramatically reduces infrastructure costs compared to commercial cloud HPC for eligible projects.</p><p><strong>The initial consultation is always free</strong> and includes a detailed cost estimate before any commitment.</p>',
      'faq.a4': '<ul><li><strong>Feasibility studies or pilot simulations:</strong> 2–4 weeks.</li><li><strong>Medium-scale simulation campaigns or ML model development:</strong> 4–8 weeks.</li><li><strong>Large-scale multi-physics projects or long-running climate models:</strong> 2–6 months.</li></ul><p>We always define clear milestones and provide weekly progress reports. Turnaround is dramatically faster — as our case studies show, we compressed 18 months of drug discovery work into 3 weeks.</p>',
      'faq.a5': '<p>Absolutely. MakeIt operates under strict data governance standards:</p><ul><li>Full compliance with <strong>GDPR</strong>.</li><li>We sign <strong>comprehensive NDAs</strong> with all clients before any engagement.</li><li>Practices aligned with <strong>ISO 27001</strong> information security standards.</li><li>All data stored in <strong>encrypted systems with access controls</strong>.</li><li>Deucalion\'s infrastructure is operated by MACC with EU-level security protocols.</li></ul><p>Your intellectual property remains entirely yours.</p>',
      'faq.a6': '<p>EuroHPC (European High Performance Computing Joint Undertaking) is an EU initiative to build and operate world-class supercomputing infrastructure across Europe. It funded Deucalion as Portugal\'s flagship system.</p><p>For Portuguese companies, EuroHPC matters because:</p><ul><li>It provides <strong>subsidized access</strong> to infrastructure that would otherwise cost hundreds of millions of euros.</li><li>It levels the playing field against larger international competitors with private HPC infrastructure.</li><li>It keeps your data within <strong>European sovereignty</strong> and regulatory frameworks.</li><li>It builds domestic expertise and competitiveness in strategic technology sectors.</li></ul>',
      'faq.a7': '<p>Yes. MakeIt offers training workshops tailored to different skill levels:</p><ul><li><strong>Introductory HPC awareness sessions</strong> for technical managers and decision-makers.</li><li><strong>Hands-on parallel programming courses</strong> (MPI, OpenMP, GPU programming with ROCm/CUDA).</li><li><strong>Domain-specific training</strong> for CFD, molecular simulation, or ML workloads.</li><li><strong>Knowledge transfer</strong> throughout all project engagements.</li></ul><p>We believe in empowering clients, not creating dependency.</p>',
      'faq.cta.text': "Didn't find the answer you were looking for?",
      'faq.cta.btn': 'Ask a Question',
      'contact.title': 'Ready to Solve Your Biggest <span class="gradient-text">Computational Challenge?</span>',
      'contact.subtitle': 'Join the companies across Portugal and Europe that have transformed their R&D, operations, and innovation with MakeIt and Deucalion. The initial consultation is free — no commitment.',
      'contact.btn1': 'Send a Message',
      'contact.btn2': 'Schedule a Consultation',
      'contact.trust1': 'Free initial consultation',
      'contact.trust2': 'Response within 1 business day',
      'contact.trust3': 'NDA available',
      'contact.trust4': 'No commitment',
      'mobile.cta': 'Contact',
      'modal.title': 'Send Message',
      'modal.title.makeit': 'Contact MAKE IT',
      'modal.title.deucalion': 'Contact Deucalion',
      'modal.title.cotec': 'Contact COTEC',
      'modal.label.to': 'To *',
      'modal.label.name': 'Name *',
      'modal.label.email': 'Email *',
      'modal.label.subject': 'Subject',
      'modal.label.message': 'Message *',
      'modal.label.attachment': 'Attachment (optional)',
      'modal.placeholder.name': 'Your name',
      'modal.placeholder.subject': 'Inquiry about Deucalion',
      'modal.placeholder.message': 'Describe your project or question...',
      'modal.file.label': 'Add file',
      'modal.submit': 'Send Message',
      'modal.sending': 'Sending...',
      'modal.success': 'Message sent successfully! We will get back to you shortly.',
      'modal.error': 'Failed to send. Please try again or contact info@make-it.tech.',
      'modal.error.fields': 'Please fill in name, email and message.',
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

  // ── 13. CONTACT MODAL ─────────────────────────────────────────
  const contactModal    = document.getElementById('contact-modal');
  const modalClose      = document.getElementById('modal-close');
  const contactForm     = document.getElementById('contact-form');
  const toSelect        = document.getElementById('contact-to-select');
  const submitBtn       = document.getElementById('contact-submit-btn');
  const submitBtnText   = document.getElementById('submit-btn-text');
  const submitIcon      = document.getElementById('submit-icon');
  const submitSpinner   = document.getElementById('submit-spinner');
  const contactFeedback = document.getElementById('contact-feedback');
  const fileInput       = document.getElementById('contact-attachment');
  const fileNameDisplay = document.getElementById('file-name-display');

  function openContactModal(target) {
    if (!contactModal) return;

    // Reset form state first, then set target (reset() would overwrite the value)
    if (contactForm) contactForm.reset();
    if (fileNameDisplay) fileNameDisplay.textContent = '';

    // Pre-select target in dropdown after reset
    if (toSelect) toSelect.value = (target && toSelect.querySelector(`option[value="${target}"]`)) ? target : 'makeit';
    hideFeedback();
    setSubmitIdle();

    contactModal.classList.add('is-open');
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first input
    setTimeout(() => {
      const first = contactForm?.querySelector('.form-input');
      if (first) first.focus();
    }, 80);
  }

  function closeContactModal() {
    if (!contactModal) return;
    contactModal.classList.remove('is-open');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function hideFeedback() {
    if (!contactFeedback) return;
    contactFeedback.hidden = true;
    contactFeedback.textContent = '';
    contactFeedback.className = 'contact-feedback';
  }

  function showFeedback(msg, type) {
    if (!contactFeedback) return;
    contactFeedback.textContent = msg;
    contactFeedback.className = `contact-feedback feedback-${type}`;
    contactFeedback.hidden = false;
  }

  function setSubmitLoading() {
    if (!submitBtn) return;
    submitBtn.disabled = true;
    if (submitIcon) submitIcon.hidden = true;
    if (submitSpinner) submitSpinner.hidden = false;
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS['pt'];
    if (submitBtnText) submitBtnText.textContent = t['modal.sending'];
  }

  function setSubmitIdle() {
    if (!submitBtn) return;
    submitBtn.disabled = false;
    if (submitIcon) submitIcon.hidden = false;
    if (submitSpinner) submitSpinner.hidden = true;
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS['pt'];
    if (submitBtnText) submitBtnText.textContent = t['modal.submit'];
  }

  // Open modal on any data-contact-target button/link
  document.querySelectorAll('[data-contact-target]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal(el.dataset.contactTarget || 'makeit');
    });
  });

  // Close on X button
  if (modalClose) modalClose.addEventListener('click', closeContactModal);

  // Close on overlay click (outside panel)
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) closeContactModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal?.classList.contains('is-open')) {
      closeContactModal();
    }
  });

  // File input — show chosen filename
  if (fileInput && fileNameDisplay) {
    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];
      fileNameDisplay.textContent = file ? file.name : '';
    });
  }

  // Form submit
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideFeedback();

      const t = TRANSLATIONS[currentLang] || TRANSLATIONS['pt'];
      const name    = contactForm.querySelector('#contact-name')?.value.trim();
      const email   = contactForm.querySelector('#contact-email')?.value.trim();
      const message = contactForm.querySelector('#contact-message')?.value.trim();

      if (!name || !email || !message) {
        showFeedback(t['modal.error.fields'], 'error');
        return;
      }

      setSubmitLoading();

      const formData = new FormData(contactForm);

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          showFeedback(t['modal.success'], 'success');
          contactForm.reset();
          if (fileNameDisplay) fileNameDisplay.textContent = '';
          setSubmitIdle();
          // Auto-close after 3 s
          setTimeout(closeContactModal, 3000);
        } else {
          showFeedback(data.error || t['modal.error'], 'error');
          setSubmitIdle();
        }
      } catch {
        showFeedback(t['modal.error'], 'error');
        setSubmitIdle();
      }
    });
  }

  // ── Done ──────────────────────────────────────────────────────
  console.log('%cMakeIt × Deucalion 🚀', 'color: #E53935; font-size: 16px; font-weight: bold;');
  console.log('%cPowered by EuroHPC · MACC · Braga, Portugal', 'color: #A1A1AA;');

}); // end DOMContentLoaded
