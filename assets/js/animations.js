/* ═══════════════════════════════════════════════════════════════════════
   CANTOS DA MATA — animations.js
   Lenis smooth scroll · scroll reveals · parallax · forest & monkey motifs
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;
  const hasGSAP = !!window.gsap;

  /* ─── Falling leaves ────────────────────────────────────────────── */
  function makeLeaves() {
    if (reduce) return;
    const LEAF = '<svg viewBox="0 0 32 32"><path d="M16 3 C22 11 22 22 16 29 C10 22 10 11 16 3 Z" fill="currentColor" opacity="0.9"/></svg>';
    $$('[data-leaves]').forEach(box => {
      if (box.dataset.done) return; box.dataset.done = '1';
      const n = parseInt(box.dataset.leaves, 10) || 10;
      for (let i = 0; i < n; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.innerHTML = LEAF;
        leaf.style.left = (Math.random() * 100) + '%';
        leaf.style.width = (14 + Math.random() * 20) + 'px';
        leaf.style.animationDuration = (9 + Math.random() * 12) + 's';
        leaf.style.animationDelay = (-Math.random() * 15) + 's';
        leaf.style.color = Math.random() > 0.5 ? '#6b8e23' : '#3c5a36';
        box.appendChild(leaf);
      }
    });
  }

  /* ─── Smooth scroll (Lenis) ─────────────────────────────────────── */
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new window.Lenis({ duration: 1.1, smoothWheel: true, lerp: 0.1 });
    window.lenis = lenis;
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on('scroll', onScroll);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─── Scroll-driven: header, progress, parallax ─────────────────── */
  const header = $('#siteHeader'), progress = $('#scrollProgress');
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY || window.pageYOffset;
      if (header) header.classList.toggle('is-solid', y > 48);
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
      }
      parallax();
      ticking = false;
    });
  }
  function parallax() {
    if (reduce) return;
    const vh = window.innerHeight;
    $$('[data-parallax]').forEach(el => {
      if (!el.offsetParent) return; // hidden route
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const speed = parseFloat(el.dataset.parallax) || 0.2;
      const offset = (r.top + r.height / 2 - vh / 2) * speed * -1;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
  }

  /* ─── Scroll reveals (IntersectionObserver) ─────────────────────── */
  const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }) : null;

  function revealInView(root) {
    const vh = window.innerHeight;
    $$('[data-reveal]', root).forEach(el => {
      const r = el.getBoundingClientRect();
      if (el.offsetParent && r.top < vh * 0.92 && r.bottom > 0) el.classList.add('is-in');
    });
  }
  function observe(root) { if (io) $$('[data-reveal]', root).forEach(el => { if (!el.classList.contains('is-in')) io.observe(el); }); }

  /* ─── Count-up stats ────────────────────────────────────────────── */
  const countIO = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return; countIO.unobserve(e.target);
      const el = e.target, target = parseFloat(el.dataset.count), suf = el.dataset.suffix || '';
      if (reduce) { el.textContent = target + suf; return; }
      const dur = 1400, t0 = performance.now();
      (function step(t) {
        const p = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suf;
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    });
  }, { threshold: 0.5 }) : null;
  function observeCounts(root) { if (countIO) $$('[data-count]', root).forEach(el => countIO.observe(el)); }

  /* ─── Monkey + vine ─────────────────────────────────────────────── */
  function initMonkey() {
    const m = $('#monkeySwing'); if (!m || reduce) return;
    if (hasGSAP) {
      window.gsap.set(m, { transformOrigin: 'top center' });
      window.gsap.fromTo(m, { rotation: -13 }, { rotation: 13, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    } else {
      m.style.animation = 'monkeyPend 2.6s ease-in-out infinite';
    }
  }

  /* ─── Hero subtle scale on load ─────────────────────────────────── */
  function initHero() {
    if (reduce || !hasGSAP) return;
    const img = $('.hero-media img');
    if (img) window.gsap.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 2.4, ease: 'power2.out' });
    const content = $('.hero-content');
    if (content) window.gsap.from(content.children, { y: 34, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 });
  }

  /* ─── Public API for the router ─────────────────────────────────── */
  window.CDM_anim = {
    onRouteChange(sec) {
      makeLeaves();
      observe(sec); revealInView(sec); observeCounts(sec);
      parallax();
      if (sec && sec.id === 'route-home') { initMonkey(); }
      if (lenis) lenis.resize();
    },
    observe, revealInView,
  };

  /* ─── Boot ──────────────────────────────────────────────────────── */
  makeLeaves();
  revealInView(document);        // show what's already on screen (no flash)...
  body.classList.remove('no-anim'); // ...then enable animations for the rest
  observe(document);
  observeCounts(document);
  initMonkey();
  initHero();
  onScroll();
})();
