(() => {
  const projects = [
    { category: 'Caso Líder', title: 'Transformação da Alta Direção', client: 'Instituição Pública', description: 'Programa estratégico para elevar a eficácia, a comunicação e a governação de equipas executivas.', image: 'linear-gradient(120deg, #0f243e 0%, #1a365d 55%, #c2a878 100%)', context: 'Uma organização nacional precisava alinhar liderança, processos e cultura para responder a uma nova fase de crescimento.', objectives: ['Alinhar equipas de alta direcção', 'Criar padrões de comunicação executiva', 'Medir a melhoria operacional'], deliverables: ['Diagnóstico estratégico', 'Programa executivo presencial e híbrido', 'Playbook de comunicação institucional'], results: ['3000+ profissionais envolvidos', 'Melhoria de 32% na clareza de processos', 'Implementação em todo o território nacional'] },
    { category: 'Formação', title: 'Secretariado Executivo', client: 'ENAPP', description: 'Capacitação prática para profissionais que sustentam decisões críticas.', image: 'linear-gradient(135deg, #c2a878, #f5e6c8)', context: 'A atualização das competências administrativas tornou-se essencial para equipas que trabalham junto da alta direção.', objectives: ['Reforçar competências técnicas', 'Melhorar organização e protocolo'], deliverables: ['Formação modular', 'Avaliação de competências'], results: ['Equipas mais autónomas', 'Processos mais consistentes'] },
    { category: 'Consultoria', title: 'Governança e Procedimentos', client: 'ARSEG', description: 'Apoio à estruturação de procedimentos, protocolo e capacitação de equipas.', image: 'linear-gradient(135deg, #1a365d, #718096)', context: 'A organização procurava consolidar práticas de governança e reduzir ambiguidades na execução diária.', objectives: ['Mapear fluxos críticos', 'Clarificar responsabilidades'], deliverables: ['Procedimentos operacionais', 'Sessões de alinhamento'], results: ['Maior previsibilidade operacional', 'Decisões mais rápidas'] },
    { category: 'Impacto', title: 'PIC-Angola', client: 'Projecto nacional', description: 'Formação e atualização em secretariado e administração com alcance nacional.', image: 'linear-gradient(135deg, #0f243e, #c2a878)', context: 'Um projecto de impacto nacional para democratizar o acesso a competências de alta direcção.', objectives: ['Escalar formação de qualidade', 'Criar impacto mensurável'], deliverables: ['Programas presenciais', 'Conteúdo híbrido'], results: ['8+ anos de impacto', '8000+ funcionários capacitados'] },
    { category: 'Formação', title: 'Liderança Institucional', client: 'Prime Academy', description: 'Desenvolvimento de habilidades técnicas e humanas para gestão secretarial.', image: 'linear-gradient(135deg, #edf2f7, #c2a878)', context: 'Equipas de suporte executivo precisavam transformar experiência em métodos replicáveis.', objectives: ['Desenvolver liderança', 'Aumentar a qualidade de execução'], deliverables: ['Academia de competências', 'Mentoria aplicada'], results: ['Melhoria contínua incorporada', 'Soluções personalizadas'] },
    { category: 'Consultoria', title: 'Comunicação Executiva', client: 'Organizações de referência', description: 'Soluções institucionais para comunicar com clareza, rigor e influência.', image: 'linear-gradient(135deg, #1a365d, #0f243e)', context: 'A comunicação institucional precisava de uma linguagem mais coerente entre áreas e níveis de decisão.', objectives: ['Unificar mensagens-chave', 'Aumentar a influência institucional'], deliverables: ['Arquitetura de mensagens', 'Workshops executivos'], results: ['Maior consistência de marca', 'Alinhamento entre stakeholders'] }
  ];
  const categories = ['Todos', ...new Set(projects.map((project) => project.category))];
  let activeCategory = 'Todos';
  let query = '';

  const create = (tag, className, text) => { const node = document.createElement(tag); if (className) node.className = className; if (text) node.textContent = text; return node; };
  const matches = (project) => activeCategory === 'Todos' || project.category === activeCategory;
  const searchMatches = (project) => `${project.title} ${project.client} ${project.description}`.toLowerCase().includes(query.toLowerCase());

  function openModal(project) {
    const modal = create('div', 'sem-project-modal'); modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true'); modal.setAttribute('aria-label', project.title);
    const dialog = create('div', 'sem-project-dialog');
    const close = create('button', 'sem-project-close', 'Fechar'); close.type = 'button'; close.addEventListener('click', () => modal.remove());
    const image = create('div', 'sem-project-modal-image'); image.style.background = project.image;
    const body = create('div', 'sem-project-modal-body');
    const badge = create('span', 'sem-project-badge', project.category); body.append(badge, create('h3', '', project.title), create('p', 'sem-project-client', project.client));
    [['Contexto Estratégico', project.context], ['Objetivos', project.objectives], ['Entregáveis', project.deliverables], ['Resultados Mensurados', project.results]].forEach(([heading, value]) => { const section = create('section', 'sem-project-detail'); section.append(create('h4', '', heading)); if (Array.isArray(value)) { const list = create('ul', ''); value.forEach((item) => list.append(create('li', '', item))); section.append(list); } else section.append(create('p', '', value)); body.append(section); });
    dialog.append(close, image, body); modal.append(dialog); document.body.append(modal); close.focus(); modal.addEventListener('click', (event) => { if (event.target === modal) modal.remove(); }); document.addEventListener('keydown', function escape(event) { if (event.key === 'Escape') { modal.remove(); document.removeEventListener('keydown', escape); } });
  }

  function render(section) {
    section.className = 'sem-projects-section'; section.replaceChildren();
    const wrap = create('div', 'sem-projects-wrap');
    const eyebrow = create('div', 'sem-projects-eyebrow', '04 / PROJECTOS'); wrap.append(eyebrow, create('h2', 'sem-projects-title', 'Portfólio de Intervenções'));
    const intro = create('p', 'sem-projects-intro', 'Intervenções desenhadas para transformar competência em impacto institucional mensurável.'); wrap.append(intro);
    const controls = create('div', 'sem-project-controls'); const tabs = create('div', 'sem-project-tabs'); tabs.setAttribute('role', 'tablist'); categories.forEach((category) => { const button = create('button', `sem-project-tab${activeCategory === category ? ' is-active' : ''}`, category); button.type = 'button'; button.setAttribute('role', 'tab'); button.setAttribute('aria-selected', String(activeCategory === category)); button.addEventListener('click', () => { activeCategory = category; render(section); }); tabs.append(button); }); const search = create('input', 'sem-project-search'); search.type = 'search'; search.placeholder = 'Pesquisar projectos...'; search.setAttribute('aria-label', 'Pesquisar por título, cliente ou descrição'); search.value = query; search.addEventListener('input', (event) => { query = event.target.value; renderGrid(); }); controls.append(tabs, search); wrap.append(controls);
    const grid = create('div', 'sem-project-grid'); wrap.append(grid); section.append(wrap);
    function renderGrid() { grid.replaceChildren(); projects.filter(matches).filter(searchMatches).forEach((project, index) => { const card = create('article', `sem-project-card sem-project-card-${index % 5}`); card.tabIndex = 0; const visual = create('div', 'sem-project-visual'); visual.style.background = project.image; const content = create('div', 'sem-project-card-content'); content.append(create('span', 'sem-project-badge', project.category), create('h3', '', project.title), create('span', 'sem-project-client', project.client), create('p', '', project.description), create('span', 'sem-project-link', 'Ver estudo de caso →')); card.append(visual, content); card.addEventListener('click', () => openModal(project)); card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openModal(project); } }); grid.append(card); }); if (!grid.children.length) grid.append(create('p', 'sem-project-empty', 'Nenhum projecto encontrado.')); }
    renderGrid();
  }

  const boot = () => { const section = document.querySelector('#projetos'); if (section && !section.dataset.semEnhanced) { section.dataset.semEnhanced = 'true'; render(section); return true; } return false; }; if (!boot()) { const observer = new MutationObserver(() => { if (boot()) observer.disconnect(); }); observer.observe(document.body, { childList: true, subtree: true }); }
})();

(() => {
  const refineExecutiveSections = () => {
    const hero = document.querySelector('#inicio');
    const about = document.querySelector('#sobre');
    const results = document.querySelector('#resultados');
    const opinions = document.querySelector('#obras');
    if (!hero || !about || !results || !opinions) return false;
    if (document.querySelector('#sem-executive-sections-style')) return true;
    hero.classList.add('sem-executive-hero');
    const style = document.createElement('style');
    style.id = 'sem-executive-sections-style';
    style.textContent = `
      .sem-executive-hero{background:radial-gradient(circle at 76% 42%,rgba(194,168,120,.11),transparent 28%),linear-gradient(135deg,#f8fafc 0%,#fff 58%,#f5f1e9 100%)!important}
      .sem-executive-hero h1{letter-spacing:-.055em!important;font-size:clamp(54px,7vw,104px)!important;line-height:.88!important;text-wrap:balance}
      .sem-executive-hero .text-\\[11px\\]{color:#9b7a3e!important;letter-spacing:.2em!important}
      .sem-executive-hero .mt-6.text-\\[18px\\]{max-width:560px!important;font-size:clamp(18px,2vw,23px)!important;line-height:1.45!important;color:#344054!important}
      .sem-executive-hero .mt-8{margin-top:42px!important}
      .sem-executive-hero::after{content:'SANTOS EGAS MONIZ  /  EXECUTIVE ADVISORY';position:absolute;right:3%;bottom:28px;color:#b0b7c1;font:600 10px/1 Arial,sans-serif;letter-spacing:.18em;writing-mode:vertical-rl;opacity:.7}
      @media(max-width:767px){.sem-executive-hero h1{font-size:58px!important}.sem-executive-hero::after{display:none}}
    `;
    document.head.append(style);
    return true;
  };
  if (!refineExecutiveSections()) { const observer = new MutationObserver(() => { if (refineExecutiveSections()) observer.disconnect(); }); observer.observe(document.body, { childList:true, subtree:true }); }
})();

(() => {
  const refineFooterStructure = () => {
    const footer = document.querySelector('footer');
    if (!footer || footer.dataset.semFooterRefined) return false;
    footer.dataset.semFooterRefined = 'true';
    const gridContainer = Array.from(footer.querySelectorAll('div')).find((node) => node.classList.contains('grid') && node.classList.contains('md:grid-cols-4'));
    if (!gridContainer) return true;
    const columns = Array.from(gridContainer.children);
    if (columns[1]) columns[1].remove();
    const contactColumn = Array.from(gridContainer.children).find((column) => column.textContent.includes('contacto@sem.ao'));
    if (contactColumn) {
      contactColumn.style.textAlign = 'right';
      contactColumn.querySelectorAll('div, a').forEach((node) => { node.style.textAlign = 'right'; });
    }
    gridContainer.style.textAlign = 'left';
    return true;
  };
  
  const refineContactSection = () => {
    const contactSection = document.querySelector('section#contacto');
    if (!contactSection || contactSection.dataset.semContactRefined) return false;
    contactSection.dataset.semContactRefined = 'true';
    
    const grid = contactSection.querySelector('div.grid.md\\:grid-cols-\\[1\\.1fr_0\\.9fr\\]');
    if (!grid) return true;
    
    const columns = Array.from(grid.children);
    const secondStagger = columns.find((column, index) => index > 0 && column.classList.contains('fade-stagger'));
    if (secondStagger) secondStagger.remove();
    const textContent = Array.from(grid.children).find((column) => column.textContent.includes('Vamos elevar')) || grid.querySelector('.fade-stagger');
    const box = textContent?.querySelector('div.mt-10.rounded-\\[12px\\]');
    if (box && textContent) grid.insertBefore(box, textContent);
    
    // Remove "Certificado ENAPP" badge from contact form
    const formBox = box || grid.querySelector('div.mt-10.rounded-\\[12px\\]');
    if (formBox) {
      const spaceDiv = formBox.querySelector('div.space-y-5');
      if (spaceDiv) {
        const flexGaps = Array.from(spaceDiv.querySelectorAll('div.flex.gap-2'));
        if (flexGaps[3]) {
          const badges = Array.from(flexGaps[3].querySelectorAll('span.text-\\[10px\\].px-3'));
          if (badges[1] && badges[1].textContent.includes('Certificado')) {
            badges[1].remove();
          }
        }
      }
    }
    
    contactSection.classList.add('sem-contact-section');
    grid.classList.add('sem-contact-grid');
    if (box) box.classList.add('sem-contact-form');
    if (textContent) textContent.classList.add('sem-contact-copy');
    const style = document.createElement('style');
    style.textContent = `.sem-contact-section{background-color:#0b1d32!important;background-image:radial-gradient(circle at 86% 18%,rgba(194,168,120,.10),transparent 30%),linear-gradient(135deg,#0b1d32 0%,#0f243e 65%,#122b49 100%)!important}.sem-contact-grid{align-items:center!important;gap:clamp(32px,7vw,104px)!important}.sem-contact-copy{order:2!important;padding:28px 0 28px 8px;border-left:1px solid rgba(194,168,120,.55)}.sem-contact-copy>div:first-child{color:#d7bf8c!important}.sem-contact-copy h2{font-size:clamp(40px,5vw,68px)!important;line-height:.92!important;letter-spacing:-.035em!important}.sem-contact-copy p{max-width:430px!important;font-size:17px!important}.sem-contact-form{order:1!important;background:rgba(26,54,93,.68)!important;border-color:rgba(194,168,120,.32)!important;border-radius:2px!important;box-shadow:0 22px 60px rgba(0,0,0,.18)!important}.sem-contact-form button{border-radius:2px!important}.sem-contact-form input{border-radius:2px!important}.sem-contact-form .flex.items-center{border-bottom:1px solid rgba(194,168,120,.2);padding-bottom:18px}.sem-contact-section .absolute{color:#173455!important}@media(max-width:767px){.sem-contact-grid{display:flex!important;flex-direction:column!important;gap:28px!important;align-items:stretch!important}.sem-contact-copy{order:1!important;padding:0 0 0 18px}.sem-contact-form{order:2!important;margin-top:0!important}.sem-contact-copy h2{font-size:48px!important}}`;
    document.head.append(style);
    return true;
  };
  
  const refineSectionNumbers = () => {
    const sections = ['#galeria', '#obras', '#resultados', '#sobre'];
    sections.forEach(selector => {
      const section = document.querySelector(selector);
      if (!section) return;
      const numDiv = section.querySelector('div.absolute.-top-8 div');
      if (numDiv) numDiv.style.lineHeight = '0em';
    });
  };
  
  const refineInitioSection = () => {
    const inicio = document.querySelector('section#inicio');
    if (!inicio) return;
    
    // Remove the flex items-center div
    const flexDiv = inicio.querySelector('div.mt-8.flex.items-center');
    if (flexDiv) flexDiv.remove();
    
    // Update text content
    const eyebrow = inicio.querySelector('div.text-\\[11px\\].tracking-\\[0\\.15em\\]');
    if (eyebrow) eyebrow.textContent = 'Consultoria de Alta Direção';
    
    const desc = inicio.querySelector('div.mt-6.text-\\[18px\\]');
    if (desc) desc.textContent = 'Excelência Administrativa, Governança Estratégica & Capacitação Humana.';
  };
  
  const refineResultsSection = () => {
    const resultados = document.querySelector('section#resultados');
    if (!resultados) return;
    
    // Remove 4th border-y div
    const divs = Array.from(resultados.querySelectorAll('div.mt-12.border-y'));
    if (divs.length > 0) divs[divs.length - 1].remove();
    
    // Apply text-align right to result labels
    const labels = resultados.querySelectorAll('div.text-\\[11px\\].leading-\\[1\\.3\\].text-\\[#A0AEC0\\]');
    labels.forEach(label => {
      if (label.textContent.includes('Funcionários') || label.textContent.includes('Textos') || label.textContent.includes('Profissionais')) {
        label.style.textAlign = 'right';
      }
    });
  };
  
  const applyRefinements = () => {
    const ready = document.querySelector('footer') && document.querySelector('#inicio') && document.querySelector('#resultados');
    if (!ready) return false;
    refineFooterStructure();
    refineContactSection();
    refineSectionNumbers();
    refineInitioSection();
    refineResultsSection();
    return true;
  };
  if (!applyRefinements()) {
    const observer = new MutationObserver(() => { if (applyRefinements()) observer.disconnect(); });
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();

(() => {
  const enhanceGallery = () => {
    const gallery = document.querySelector('#galeria');
    if (!gallery || gallery.dataset.semGalleryEnhanced) return false;
  gallery.dataset.semGalleryEnhanced = 'true';

  const sourceImages = [...gallery.querySelectorAll('img')].map((image, index) => ({
    src: image.currentSrc || image.src,
    alt: image.alt || `Registo de formação ${index + 1}`,
  }));
  if (!sourceImages.length) return;

  const style = document.createElement('style');
  style.textContent = `.sem-gallery-grid{display:grid;grid-template-columns:1fr;gap:16px}.sem-gallery-tile{position:relative;display:block;aspect-ratio:4/3;overflow:hidden;border-radius:12px;border:1px solid #e2e8f0;background:#0f243e;cursor:zoom-in;padding:0;text-align:left}.sem-gallery-tile img{width:100%;height:100%;display:block;object-fit:cover;transition:transform .45s ease}.sem-gallery-tile:hover img,.sem-gallery-tile:focus-visible img{transform:scale(1.05)}.sem-gallery-scrim{position:absolute;inset:35% 0 0;background:linear-gradient(transparent,#0f243ecc);pointer-events:none}.sem-gallery-expand{position:absolute;right:16px;top:16px;width:36px;height:36px;border:1px solid #ffffff66;border-radius:999px;background:#0f243ecc;color:#fff;display:grid;place-items:center;font:20px/1 Arial;pointer-events:none}.sem-gallery-lightbox{position:fixed;inset:0;z-index:1100;background:#07172be8;display:grid;place-items:center;padding:24px}.sem-gallery-dialog{position:relative;max-width:1100px;width:100%;display:flex;flex-direction:column;align-items:center}.sem-gallery-dialog img{display:block;width:auto;max-width:100%;max-height:72vh;object-fit:contain;border-radius:10px;box-shadow:0 24px 80px #0008}.sem-gallery-close,.sem-gallery-nav{position:absolute;border:1px solid #ffffff55;background:#0f243ecc;color:#fff;cursor:pointer;border-radius:999px}.sem-gallery-close{top:-48px;right:0;padding:9px 14px;font:12px Arial}.sem-gallery-nav{top:50%;transform:translateY(-50%);width:44px;height:44px;font:28px/1 Arial}.sem-gallery-prev{left:-56px}.sem-gallery-next{right:-56px}.sem-gallery-caption{color:#fff;font:13px Arial;margin-top:14px;text-align:center}@media(min-width:640px){.sem-gallery-grid{grid-template-columns:repeat(2,1fr)}}@media(min-width:1200px){.sem-gallery-grid{grid-template-columns:repeat(3,1fr)}}@media(max-width:700px){.sem-gallery-lightbox{padding:16px}.sem-gallery-close{top:-48px;right:0}.sem-gallery-prev{left:4px}.sem-gallery-next{right:4px}.sem-gallery-nav{background:#0f243ebb}.sem-gallery-dialog img{max-width:calc(100% - 24px)}}`;
  document.head.append(style);

  const create = (tag, className, text) => { const node = document.createElement(tag); node.className = className; if (text) node.textContent = text; return node; };
  const content = gallery.querySelector('.max-w-\\[1200px\\]');
  if (!content) return;
  const originalTitle = content.querySelector('h2')?.textContent || 'Galeria';
  content.querySelectorAll('.mt-10').forEach((node) => node.remove());
  const grid = create('div', 'sem-gallery-grid');
  let activeIndex = 0;

  function closeLightbox(keyboardHandler) {
    document.querySelector('.sem-gallery-lightbox')?.remove();
    if (keyboardHandler) document.removeEventListener('keydown', keyboardHandler);
  }
  function openLightbox(index) {
    activeIndex = (index + sourceImages.length) % sourceImages.length;
    const modal = create('div', 'sem-gallery-lightbox'); modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true'); modal.setAttribute('aria-label', 'Galeria de imagens');
    const dialog = create('div', 'sem-gallery-dialog');
    const close = create('button', 'sem-gallery-close', 'Fechar'); close.type = 'button'; close.addEventListener('click', closeLightbox);
    const prev = create('button', 'sem-gallery-nav sem-gallery-prev', '‹'); prev.type = 'button'; prev.setAttribute('aria-label', 'Imagem anterior');
    const next = create('button', 'sem-gallery-nav sem-gallery-next', '›'); next.type = 'button'; next.setAttribute('aria-label', 'Próxima imagem');
    const image = document.createElement('img'); const caption = create('p', 'sem-gallery-caption');
    const update = () => { const item = sourceImages[activeIndex]; image.src = item.src; image.alt = item.alt; caption.textContent = `${activeIndex + 1} / ${sourceImages.length} — ${item.alt}`; };
    prev.addEventListener('click', () => { activeIndex = (activeIndex - 1 + sourceImages.length) % sourceImages.length; update(); });
    next.addEventListener('click', () => { activeIndex = (activeIndex + 1) % sourceImages.length; update(); });
    function onKeydown(event) { if (event.key === 'Escape') closeLightbox(onKeydown); if (event.key === 'ArrowLeft') prev.click(); if (event.key === 'ArrowRight') next.click(); }
    dialog.append(close, prev, image, next, caption); modal.append(dialog); document.body.append(modal); update(); close.focus(); modal.addEventListener('click', (event) => { if (event.target === modal) closeLightbox(onKeydown); }); document.addEventListener('keydown', onKeydown);
  }
  sourceImages.forEach((item, index) => { const tile = create('button', 'sem-gallery-tile'); tile.type = 'button'; tile.setAttribute('aria-label', `Ampliar imagem ${index + 1}: ${item.alt}`); const image = document.createElement('img'); image.src = item.src; image.alt = item.alt; image.loading = index === 0 ? 'eager' : 'lazy'; tile.append(image, create('span', 'sem-gallery-scrim'), create('span', 'sem-gallery-expand', '↗')); tile.addEventListener('click', () => openLightbox(index)); grid.append(tile); });
  const galleryHeading = content.querySelector('h2'); if (galleryHeading) galleryHeading.textContent = originalTitle;
  content.append(grid);
  return true;
  };
  if (!enhanceGallery()) { const observer = new MutationObserver(() => { if (enhanceGallery()) observer.disconnect(); }); observer.observe(document.body, { childList: true, subtree: true }); }
})();

(() => {
  const applyCeoSystem = () => {
    if (document.querySelector('#sem-ceo-system-style')) return true;
    const required = ['#inicio', '#sobre', '#resultados', '#obras', '#galeria', '#projetos'].every((selector) => document.querySelector(selector));
    if (!required) return false;
    const aboutSection = document.querySelector('#sobre');
    const aboutGrid = Array.from(aboutSection.querySelectorAll('div')).find((element) => element.classList.contains('mt-12') && element.classList.contains('md:mt-16'));
    const aboutCopy = Array.from(aboutGrid?.children || []).find((element) => !element.querySelector('img'));
    const aboutHeading = aboutSection.querySelector('h2')?.parentElement;
    if (aboutCopy && aboutHeading && !aboutCopy.contains(aboutHeading)) aboutCopy.insertBefore(aboutHeading, aboutCopy.firstChild);
    const style = document.createElement('style');
    style.id = 'sem-ceo-system-style';
    style.textContent = `
      :root{--sem-ink:#0F243E;--sem-gold:#C2A878;--sem-white:#FFFFFF;--sem-soft:#F8FAFC;--sem-line:#E2E8F0;--sem-radius-lg:16px;--sem-radius-md:12px;--sem-radius-sm:8px;--sem-shadow-soft:0 8px 28px rgba(15,36,62,.06);--sem-shadow-medium:0 16px 44px rgba(15,36,62,.10)}
      .max-w-\\[1200px\\],.max-w-\\[1120px\\],.sem-projects-wrap{width:100%;max-width:1280px!important;margin-left:auto!important;margin-right:auto!important;padding-left:32px!important;padding-right:32px!important}
      .sem-executive-section,section#inicio,section#sobre,section#resultados,section#obras,section#galeria,section#projetos{scroll-margin-top:80px}
      section#obras,section#galeria,section#projetos{padding-top:160px!important;padding-bottom:160px!important}
      section#sobre,section#resultados{padding-top:96px!important;padding-bottom:96px!important}
      section#sobre .max-w-\\[1200px\\],section#resultados .max-w-\\[1200px\\]{max-width:1200px!important;padding-left:24px!important;padding-right:24px!important}
      section#sobre .relative.fade-stagger{border-left:0;padding-left:0}
      section#sobre .relative.fade-stagger:before{display:none}
      section#resultados{background-color:#0F243E!important;background-image:none!important;background-size:auto!important}
      section#resultados .mt-12.rounded-\\[12px\\]{border-radius:12px!important;border-top:1px solid #2D4A6B!important;box-shadow:0 8px 24px rgba(0,0,0,.2)!important}
      section#obras .mt-10.rounded-\\[12px\\],section#obras article{border-left:2px solid var(--sem-line)!important;border-radius:0!important;transition:border-color .25s ease,transform .25s ease}
      section#obras .mt-10.rounded-\\[12px\\]:hover,section#obras article:hover{border-left-color:var(--sem-gold)!important;transform:translateX(4px)}
      .sem-gallery-tile{border-radius:var(--sem-radius-lg)!important;transition:transform .3s ease,box-shadow .3s ease!important}
      .sem-gallery-tile:hover,.sem-gallery-tile:focus-visible{transform:scale(1.02);box-shadow:var(--sem-shadow-medium)}
      .sem-gallery-tile img{transition:transform .3s ease!important}
      .sem-project-card{border-radius:var(--sem-radius-md)!important;box-shadow:var(--sem-shadow-soft)!important;border-left:2px solid var(--sem-line)!important;transition:border-color .25s ease,transform .25s ease,box-shadow .25s ease!important}
      .sem-project-card:hover,.sem-project-card:focus-visible{border-left-color:var(--sem-gold)!important;transform:translateX(4px);box-shadow:var(--sem-shadow-medium)!important}
      .sem-projects-section{padding-top:160px!important;padding-bottom:160px!important;background:transparent!important}
      section#inicio .max-w-\\[1200px\\],section#sobre .max-w-\\[1200px\\],section#projetos .sem-projects-wrap,section#obras .max-w-\\[1200px\\],section#galeria .max-w-\\[1200px\\]{position:relative;z-index:1}
      button,.sem-project-tab,.sem-project-search{border-radius:var(--sem-radius-sm)!important}
      @media(max-width:767px){.max-w-\\[1200px\\],.max-w-\\[1120px\\],.sem-projects-wrap{padding-left:20px!important;padding-right:20px!important}section#sobre,section#resultados{padding-top:96px!important;padding-bottom:96px!important}section#obras,section#galeria,section#projetos{padding-top:80px!important;padding-bottom:80px!important}section#sobre .max-w-\\[1200px\\],section#resultados .max-w-\\[1200px\\]{padding-left:20px!important;padding-right:20px!important}}
      /* Reference layout: Sobre */
      section#inicio,section#sobre,section#projetos,section#obras,section#galeria{position:relative;isolation:isolate;background-color:#fbfcfd!important;background-image:radial-gradient(circle at 8% 12%,rgba(194,168,120,.10),transparent 24%),radial-gradient(circle at 92% 84%,rgba(15,36,62,.045),transparent 30%),linear-gradient(135deg,#fbfcfd 0%,#f8fafc 52%,#fdfcf9 100%)!important}
      section#inicio:before,section#sobre:before,section#projetos:before,section#obras:before,section#galeria:before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.34;background-image:linear-gradient(115deg,transparent 0%,rgba(194,168,120,.10) 48%,transparent 49%);background-size:720px 720px}
      section#inicio:after,section#sobre:after,section#projetos:after,section#obras:after,section#galeria:after{content:"";position:absolute;top:0;right:6%;width:1px;height:100%;background:linear-gradient(180deg,transparent,rgba(194,168,120,.25) 32%,rgba(194,168,120,.08) 72%,transparent);z-index:-1;pointer-events:none}
      section#sobre{background:radial-gradient(circle at 10% 18%,rgba(194,168,120,.09),transparent 25%),linear-gradient(135deg,#f8fafc 0%,#f6f8fb 58%,#fcfbf7 100%)!important}
      section#sobre .max-w-\\[1200px\\]{max-width:1280px!important;padding-left:8px!important;padding-right:8px!important}
      section#sobre .mt-12.md\\:mt-16{display:grid!important;grid-template-columns:1fr 1.12fr!important;gap:88px!important;align-items:start!important}
      section#sobre .mt-12.md\\:mt-16>div:has(img){position:relative!important;grid-column:1!important;grid-row:1!important}
      section#sobre .mt-12.md\\:mt-16>div:not(:has(img)){grid-column:2!important;grid-row:1!important;padding-top:0!important}
      section#sobre .mt-12.md\\:mt-16>div:not(:has(img))>div:first-child{margin-bottom:32px!important}
      section#sobre .mt-12.md\\:mt-16>div:has(img):before{content:"";display:block;height:1px;background:#d7bf8c;margin-bottom:20px}
      section#sobre .mt-12.md\\:mt-16>div:has(img) img{width:100%!important;aspect-ratio:1.45!important;object-fit:cover!important;border-radius:12px!important}
      section#sobre .mt-12.md\\:mt-16>div:has(img):after{content:"ARSEG     UAN     ENAPP     PIC-ANGOLA     PRIME ACADEMY";position:absolute;left:18px;right:18px;bottom:18px;color:#0f243e;background:rgba(255,255,255,.9);padding:8px 10px;border-radius:999px;font:600 9px/1 Arial,sans-serif;letter-spacing:.08em;word-spacing:10px;text-align:center}
      section#sobre h2{max-width:620px!important;font-size:clamp(44px,5vw,68px)!important;line-height:.94!important;letter-spacing:-.045em!important;color:#0f243e!important}
      section#sobre .font-sans.space-y-6.text-\\[16px\\]{max-width:630px!important;color:#35506f!important;font-size:16px!important;line-height:1.75!important}
      section#sobre .font-sans.space-y-6.text-\\[16px\\]>div:last-child{margin-top:32px!important;border-left:1px solid #e2e8f0!important;padding-left:24px!important}
      /* Reference layout: Resultados */
      section#resultados{background:#0f243e!important;color:#fff!important;min-height:620px!important}
      section#resultados .max-w-\\[1200px\\]{max-width:1280px!important;padding-left:8px!important;padding-right:8px!important}
      section#resultados h2{font-size:clamp(46px,5vw,72px)!important;line-height:.95!important;letter-spacing:-.045em!important;color:#fff!important}
      section#resultados .mt-12.rounded-\\[12px\\]{display:grid!important;grid-template-columns:repeat(4,1fr)!important;gap:48px!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;padding:0!important}
      section#resultados .mt-12.rounded-\\[12px\\]>div{border-top:1px solid rgba(194,168,120,.42)!important;padding-top:28px!important}
      section#resultados .text-\\[56px\\]{font-size:clamp(48px,5vw,68px)!important;line-height:.9!important;color:#fff!important}
      section#resultados .mt-12.rounded-\\[12px\\] .text-\\[11px\\]{color:#d7bf8c!important;letter-spacing:.14em!important}
      section#resultados .mt-12.rounded-\\[12px\\] .text-\\[13px\\]{color:#7890ad!important}
      @media(max-width:767px){section#sobre .mt-12.md\\:mt-16{grid-template-columns:1fr!important;gap:40px!important}section#sobre .mt-12.md\\:mt-16>div:has(img),section#sobre .mt-12.md\\:mt-16>div:not(:has(img)){grid-column:1!important;grid-row:auto!important}section#sobre .mt-12.md\\:mt-16>div:has(img) img{aspect-ratio:1.2!important}section#resultados .mt-12.rounded-\\[12px\\]{grid-template-columns:repeat(2,1fr)!important;gap:28px!important}}
    `;
    document.head.append(style);
    return true;
  };
  if (!applyCeoSystem()) { const observer = new MutationObserver(() => { if (applyCeoSystem()) observer.disconnect(); }); observer.observe(document.body, { childList:true, subtree:true }); }
})();



