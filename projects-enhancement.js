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



