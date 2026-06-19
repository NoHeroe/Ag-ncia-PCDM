/* ═══════════════════════════════════════════════════════════════════════
   CANTOS DA MATA — main.js
   Hash router · renderers (lodges, tours, gallery) · lightbox · WhatsApp
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const S = window.CDM_SITE, LODGES = window.CDM_LODGES, TOURS = window.CDM_TOURS,
        GAL = window.CDM_GALLERY || {}, TESTI = window.CDM_TESTIMONIALS || [], INFO = window.CDM_INFO || [];

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const waLink = (msg) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg || S.whatsappMsg)}`;
  const cover = (lodge) => (lodge.gallery && GAL[lodge.gallery]) ? GAL[lodge.gallery].images[0] : null;

  /* ─── WhatsApp + contact wiring ─────────────────────────────────── */
  function wireWhats() {
    $$('[data-whats]').forEach(el => {
      if (el.dataset.wired) return;
      el.dataset.wired = '1';
      el.setAttribute('href', waLink());
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
  }
  function fillContact() {
    const set = (id, txt, href) => { const el = $(id); if (!el) return; if (txt != null) el.textContent = txt; if (href) el.setAttribute('href', href); };
    set('#contactWhats', S.phoneLabel); set('#footWhats', S.phoneLabel);
    set('#contactMail', S.email, 'mailto:' + S.email);
    set('#footMail2', S.email, 'mailto:' + S.email);
    const fm = $('#footMail'); if (fm) fm.setAttribute('href', 'mailto:' + S.email);
    set('#contactAddr', S.address); set('#footAddr', S.address);
    const ig = $('#footIg'); if (ig) { if (S.instagram) ig.setAttribute('href', S.instagram); else ig.hidden = true; }
    const y = $('#year'); if (y) y.textContent = '2026';
    const map = $('#mapEmbed'); if (map) map.setAttribute('src', S.mapEmbed);
  }

  /* ─── Nav: lodge links ──────────────────────────────────────────── */
  function renderNavLodges() {
    const links = LODGES.map(l => `<a href="#chale/${l.slug}">${esc(l.name)}</a>`).join('');
    if ($('#dropChales')) $('#dropChales').innerHTML = links;
    if ($('#msub-chales')) $('#msub-chales').innerHTML = LODGES.map(l => `<a href="#chale/${l.slug}" data-close>${esc(l.name)}</a>`).join('');
    if ($('#footLodges')) $('#footLodges').innerHTML = LODGES.map(l => `<li><a href="#chale/${l.slug}">${esc(l.name)}</a></li>`).join('');
  }

  /* ─── Home: accommodations preview ──────────────────────────────── */
  function renderHomeAccom() {
    const box = $('#homeAccom'); if (!box) return;
    box.innerHTML = LODGES.map(l => {
      const c = cover(l);
      const media = c ? `<img src="${c.small}" loading="lazy" alt="${esc(l.name)}">` : `<div class="ph ph--forest">${esc(l.name)}</div>`;
      return `<div class="accom-row" data-reveal>
        <div class="accom-media">${media}</div>
        <div class="accom-text">
          <p class="eyebrow">Chalé · ${l.num}</p>
          <h3>${esc(l.name)}</h3>
          <p>${esc(l.tagline)}. ${esc(l.paragraphs[0])}</p>
          <a href="#chale/${l.slug}" class="arrow-link on-dark">Ver detalhes</a>
        </div></div>`;
    }).join('');
  }

  /* ─── Home: experiences preview (first 3 tours) ─────────────────── */
  function renderHomeExp() {
    const box = $('#homeExp'); if (!box) return;
    box.innerHTML = TOURS.slice(0, 3).map((t, i) => `
      <div class="card" data-reveal data-reveal-delay="${i}">
        <div class="card-media"><div class="ph ${t.ph}">${esc(t.badge)}</div><span class="card-tag">${esc(t.badge)}</span></div>
        <div class="card-body"><h3>${esc(t.title)}</h3><p>${esc(t.summary)}</p><a href="#passeios" class="arrow-link on-dark">Saiba mais</a></div>
      </div>`).join('');
  }

  /* ─── Home: testimonials ────────────────────────────────────────── */
  function renderTesti() {
    const box = $('#homeTesti'); if (!box) return;
    box.innerHTML = TESTI.map(t => `
      <div class="testi">
        <div class="testi-stars">${'★'.repeat(t.stars)}</div>
        <p class="testi-text">"${esc(t.text)}"</p>
        <div class="testi-author"><div class="testi-av">${esc(t.name[0])}</div><div><div class="testi-name">${esc(t.name)}</div><div class="testi-origin">${esc(t.origin)}</div></div></div>
      </div>`).join('');
  }

  /* ─── Home: gallery strip (curated spread) ──────────────────────── */
  function collectImages(slugs) {
    let out = [];
    slugs.forEach(s => { if (GAL[s]) out = out.concat(GAL[s].images.map(im => ({ ...im, label: GAL[s].label }))); });
    return out;
  }
  function renderHomeGallery() {
    const box = $('#homeGallery'); if (!box) return;
    const picks = ['areas', 'caracol', 'casinha', 'casa-de-pedra'].map(s => GAL[s] ? GAL[s].images[1] || GAL[s].images[0] : null)
      .concat(['abrigo', 'areas', 'caracol', 'casa-de-pedra'].map(s => GAL[s] ? GAL[s].images[2] || GAL[s].images[0] : null))
      .filter(Boolean);
    box.innerHTML = picks.map((im, i) => `<button type="button" class="g-cell" data-lb="home" data-i="${i}" aria-label="Ampliar foto ${i + 1} de ${picks.length}"><img src="${im.small}" loading="lazy" alt=""></button>`).join('');
    box._imgs = picks.map(p => ({ src: p.big, alt: 'Cantos da Mata — galeria' }));
  }

  /* ─── Chalés overview grid ──────────────────────────────────────── */
  function renderLodgeGrid() {
    const box = $('#lodgeGrid'); if (!box) return;
    box.innerHTML = LODGES.map(l => {
      const c = cover(l);
      const bg = c ? `style="background-image:url('${c.small}')"` : 'class="lodge-card-bg ph--forest"';
      const bgEl = c ? `<div class="lodge-card-bg" ${bg}></div>` : `<div class="lodge-card-bg ph--forest"></div>`;
      return `<a class="lodge-card" href="#chale/${l.slug}" data-reveal>
        ${bgEl}
        <div class="lodge-card-body"><span class="num">Chalé · ${l.num}</span><h3>${esc(l.name)}</h3><p>${esc(l.tagline)}</p><span class="arrow-link on-dark">Ver chalé</span></div>
      </a>`;
    }).join('');
  }

  /* ─── Lodge detail (rendered on demand) ─────────────────────────── */
  function renderLodgeDetail(slug) {
    const box = $('#route-chale'); if (!box) return false;
    const idx = LODGES.findIndex(l => l.slug === slug);
    if (idx < 0) return false;
    const l = LODGES[idx];
    const g = l.gallery && GAL[l.gallery] ? GAL[l.gallery] : null;
    const heroImg = g ? g.images[0].big : null;
    const prev = LODGES[(idx - 1 + LODGES.length) % LODGES.length];
    const next = LODGES[(idx + 1) % LODGES.length];

    const heroMedia = heroImg ? `<img src="${heroImg}" alt="${esc(l.name)}">` : '';
    const heroBg = heroImg ? '' : 'background:linear-gradient(135deg,var(--green-deep),var(--green-moss))';

    const galleryHtml = g
      ? `<div class="gallery-grid" id="lodgeGallery">${g.images.map((im, i) => `<button type="button" class="g-cell" data-lb="lodge" data-i="${i}" aria-label="Ampliar foto ${i + 1} de ${g.images.length} — ${esc(l.name)}"><img src="${im.small}" loading="lazy" alt=""></button>`).join('')}</div>`
      : `<div class="ph ph--forest" style="aspect-ratio:16/7;border-radius:2px">Fotos em breve — fale conosco para conhecer o ${esc(l.name)}.</div>`;

    box.innerHTML = `
      <div class="page-hero" style="${heroBg}">
        <div class="page-hero-media" data-parallax="0.2">${heroMedia}</div>
        <div class="container inner">
          <div class="breadcrumb"><a href="#home">Início</a><span>/</span><a href="#chales">Chalés</a><span>/</span><span>${esc(l.name)}</span></div>
          <p class="eyebrow no-line" style="color:var(--green-leaf);margin-top:1rem">Chalé · ${l.num}</p>
          <h1>${esc(l.name)}</h1>
          <p class="sub">${esc(l.tagline)}</p>
        </div>
      </div>

      <section class="section section--cream">
        <div class="container lodge-intro">
          <div class="lodge-intro-text" data-reveal="left">
            <p class="eyebrow">O refúgio</p>
            <h2 style="margin-top:1rem">${esc(l.name)}</h2>
            ${l.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}
            <div class="amenities">${l.amenities.map(a => `<span class="amenity">${esc(a)}</span>`).join('')}</div>
          </div>
          <aside class="ficha" data-reveal="right">
            <h4>Ficha do chalé</h4>
            <ul>
              <li><svg><use href="#i-check"/></svg> Café da manhã incluso</li>
              <li><svg><use href="#i-clock"/></svg> Check-in 13h · Check-out 11h</li>
              <li><svg><use href="#i-check"/></svg> Recepção 24h</li>
              <li><svg><use href="#i-check"/></svg> Wi-Fi e estacionamento grátis</li>
              <li><svg><use href="#i-pin"/></svg> Capacidade sob consulta</li>
            </ul>
            <a class="btn btn--whats" data-whats><svg><use href="#i-whats"/></svg>Reservar este chalé</a>
          </aside>
        </div>
      </section>

      <section class="section section--dark" style="padding-top:0">
        <div class="container"><div class="section-head"><p class="eyebrow center" style="color:var(--green-leaf)">Galeria</p><h2>${esc(l.name)} em imagens</h2></div></div>
        <div class="container">${galleryHtml}</div>
        <div class="container">
          <div class="lodge-nav">
            <a href="#chale/${prev.slug}" class="arrow-link on-dark" style="flex-direction:row-reverse">← ${esc(prev.name)}</a>
            <a href="#chales" class="arrow-link on-dark" style="--x:0">Todos os chalés</a>
            <a href="#chale/${next.slug}" class="arrow-link on-dark">${esc(next.name)}</a>
          </div>
        </div>
      </section>`;

    // wire data-whats inside the freshly rendered detail + lightbox for this lodge's gallery
    wireWhats();
    if (g) {
      const grid = $('#lodgeGallery', box);
      if (grid) grid._imgs = g.images.map((im, i) => ({ src: im.big, alt: `${l.name} ${i + 1}` }));
    }
    return true;
  }

  /* ─── Passeios ──────────────────────────────────────────────────── */
  function renderTours() {
    const box = $('#tourList'); if (!box) return;
    box.innerHTML = TOURS.map(t => `
      <div class="tour" data-reveal>
        <div class="tour-media"><div class="ph ${t.ph}">${esc(t.title)}</div><span class="badge">${esc(t.badge)}</span></div>
        <div class="tour-body">
          <p class="eyebrow" style="color:var(--green-leaf)">${esc(t.badge)}</p>
          <h3>${esc(t.title)}</h3>
          ${t.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}
          <div class="tour-meta">${t.meta.map(m => `<div><div class="k">${esc(m.k)}</div><div class="v">${esc(m.v)}</div></div>`).join('')}</div>
          ${t.partners ? `<div class="partner-note">${t.partners.map(esc).join(' · ')}</div>` : ''}
          <a class="btn btn--leaf" data-whats style="margin-top:1.4rem"><svg><use href="#i-whats"/></svg>Reservar este passeio</a>
        </div>
      </div>`).join('');
    wireWhats();
  }

  /* ─── Galeria (full, with filters) ──────────────────────────────── */
  let galleryState = { filter: 'all', imgs: [] };
  function renderFullGallery() {
    const filters = $('#galleryFilters'), grid = $('#fullGallery');
    if (!filters || !grid) return;
    const cats = [['all', 'Todos']].concat(Object.keys(GAL).map(k => [k, GAL[k].label]));
    filters.innerHTML = cats.map(([k, label]) =>
      `<button class="btn ${k === galleryState.filter ? 'btn--leaf' : 'btn--outline'}" data-filter="${k}" style="padding:0.55rem 1.2rem;font-size:0.6rem">${esc(label)}</button>`).join('');
    const slugs = galleryState.filter === 'all' ? Object.keys(GAL) : [galleryState.filter];
    const imgs = collectImages(slugs);
    galleryState.imgs = imgs.map(im => ({ src: im.big, alt: im.label }));
    grid.innerHTML = imgs.map((im, i) => `<button type="button" class="g-cell" data-lb="full" data-i="${i}" aria-label="Ampliar foto ${i + 1} de ${imgs.length} — ${esc(im.label)}"><img src="${im.small}" loading="lazy" alt=""></button>`).join('');
    grid._imgs = galleryState.imgs;
    filters.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => { galleryState.filter = b.dataset.filter; renderFullGallery(); }));
  }

  /* ─── Infos ─────────────────────────────────────────────────────── */
  function renderInfo() {
    const box = $('#infoList'); if (!box) return;
    box.innerHTML = INFO.map(i => `<li><span class="k">${esc(i.k)}</span><span class="v">${esc(i.v)}</span></li>`).join('');
  }

  /* ─── Lightbox ──────────────────────────────────────────────────── */
  const LB = { list: [], i: 0, opener: null };
  const lb = $('#lightbox'), lbImg = $('#lbImg'), lbCount = $('#lbCount');
  const lbControls = () => [$('#lbPrev'), $('#lbClose'), $('#lbNext')].filter(Boolean);
  const bgRegions = () => [$('#main'), document.querySelector('header'), $('.site-footer'), $('.fab-whats')].filter(Boolean);
  function openLB(list, i) {
    if (!list || !list.length) return;
    LB.list = list; LB.i = i || 0; LB.opener = document.activeElement;
    lb.classList.add('is-open'); document.body.style.overflow = 'hidden';
    bgRegions().forEach(el => el.setAttribute('inert', ''));
    showLB();
    const c = $('#lbClose'); if (c) c.focus();
  }
  function showLB() { const it = LB.list[LB.i]; lbImg.src = (it && it.src) || it; lbImg.alt = (it && it.alt) || ''; lbCount.textContent = `${LB.i + 1} / ${LB.list.length}`; }
  function closeLB() {
    lb.classList.remove('is-open'); document.body.style.overflow = '';
    bgRegions().forEach(el => el.removeAttribute('inert'));
    if (LB.opener && LB.opener.focus) LB.opener.focus();
  }
  function nav(d) { LB.i = (LB.i + d + LB.list.length) % LB.list.length; showLB(); }
  if (lb) {
    $('#lbClose').addEventListener('click', closeLB);
    $('#lbPrev').addEventListener('click', () => nav(-1));
    $('#lbNext').addEventListener('click', () => nav(1));
    lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') { closeLB(); return; }
      if (e.key === 'ArrowRight') { nav(1); return; }
      if (e.key === 'ArrowLeft') { nav(-1); return; }
      if (e.key === 'Tab') { // focus trap among the visible controls
        const f = lbControls(); if (!f.length) return;
        e.preventDefault();
        const idx = f.indexOf(document.activeElement);
        const next = e.shiftKey ? (idx <= 0 ? f.length - 1 : idx - 1) : (idx >= f.length - 1 ? 0 : idx + 1);
        f[next].focus();
      }
    });
    // delegate clicks on any gallery cell (works for <button> cells)
    document.addEventListener('click', e => {
      const cell = e.target.closest('.g-cell'); if (!cell) return;
      const grid = cell.parentElement; const imgs = grid._imgs; if (!imgs) return;
      openLB(imgs, parseInt(cell.dataset.i, 10) || 0);
    });
  }

  /* ─── Contact form → WhatsApp ───────────────────────────────────── */
  const form = $('#contactForm');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(form);
    const msg = `Olá! Vim pelo site da Cantos da Mata.\n\nNome: ${f.get('nome')}\nEmail: ${f.get('email')}\n\n${f.get('msg')}`;
    window.open(waLink(msg), '_blank', 'noopener');
  });

  /* ─── Mobile menu ───────────────────────────────────────────────── */
  const toggle = $('#navToggle'), drawer = $('#mobileNav');
  function closeDrawer() {
    if (toggle) { toggle.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); }
    if (drawer) drawer.classList.remove('is-open');
  }
  if (toggle) toggle.addEventListener('click', () => {
    const open = drawer.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  $$('[data-msub]').forEach(b => b.addEventListener('click', () => {
    const s = $('#msub-' + b.dataset.msub); if (!s) return;
    b.setAttribute('aria-expanded', String(s.classList.toggle('is-open')));
  }));
  document.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeDrawer(); });

  /* ─── Router ────────────────────────────────────────────────────── */
  const ROUTES = ['home', 'sobre', 'chales', 'chale', 'passeios', 'gastronomia', 'galeria', 'contato'];
  function parseHash() {
    let h = decodeURIComponent(location.hash.slice(1));
    if (!h) return { route: 'home' };
    if (h.includes('/')) { const [r, p] = h.split('/'); return { route: r, param: p }; }
    if (ROUTES.includes(h)) return { route: h };
    const el = document.getElementById(h);
    if (el) { const sec = el.closest('.route'); return { route: sec ? sec.dataset.route : 'home', anchor: h }; }
    return { route: 'home' };
  }
  function setActiveNav(route) {
    $$('.nav-link[data-nav]').forEach(a => a.classList.toggle('is-active', a.dataset.nav === route));
  }
  let booted = false;
  function go() {
    const { route, param, anchor } = parseHash();
    let target = route;
    if (route === 'chale') { if (!renderLodgeDetail(param)) { location.hash = '#chales'; return; } }
    if (!ROUTES.includes(target)) target = 'home';
    $$('.route').forEach(r => r.classList.remove('is-active'));
    const sec = $('#route-' + target) || $('#route-home');
    sec.classList.add('is-active');
    setActiveNav(route === 'chale' ? 'chales' : target);
    closeDrawer();
    wireWhats();
    window.CDM_anim && window.CDM_anim.onRouteChange(sec);
    const h1 = sec.querySelector('h1');
    const status = $('#routeStatus'); if (status && h1) status.textContent = h1.textContent;
    requestAnimationFrame(() => {
      if (anchor) { const el = document.getElementById(anchor); if (el) scrollToEl(el); }
      else scrollTop();
      if (booted && h1 && !anchor) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
      booted = true;
    });
  }
  function scrollTop() { if (window.lenis) window.lenis.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0); }
  function scrollToEl(el) { if (window.lenis) window.lenis.scrollTo(el, { offset: -70 }); else el.scrollIntoView({ behavior: 'smooth' }); }

  /* ─── Init ──────────────────────────────────────────────────────── */
  renderNavLodges(); renderHomeAccom(); renderHomeExp(); renderTesti(); renderHomeGallery();
  renderLodgeGrid(); renderTours(); renderFullGallery(); renderInfo();
  fillContact(); wireWhats();
  const skip = $('.skip-link');
  if (skip) skip.addEventListener('click', e => { e.preventDefault(); const m = $('#main'); if (m) m.focus({ preventScroll: true }); scrollTop(); });
  window.addEventListener('hashchange', go);
  go();

  window.CDM = { openLB, waLink, go };
})();
