// Gama 960+ · progressive enhancements. The page is complete without this file.
(() => {
  const root = document.documentElement;
  root.classList.add('js');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hasIO = 'IntersectionObserver' in window;

  // Header gets a hairline once the page leaves the top.
  const header = document.querySelector('.site-header');
  if (header && hasIO) {
    const sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none;';
    document.body.prepend(sentinel);
    new IntersectionObserver(([entry]) => {
      header.classList.toggle('is-scrolled', !entry.isIntersecting);
    }).observe(sentinel);
  }

  // Mobile navigation (html.nav-open). Styling lives in mobile.css.
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const setNav = (open) => {
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    root.classList.toggle('nav-open', open);
    // Keep keyboard focus inside the open panel.
    document.querySelectorAll('main, .site-footer, .fab').forEach((el) => { el.inert = open; });
  };
  toggle?.addEventListener('click', () => setNav(toggle.getAttribute('aria-expanded') !== 'true'));
  nav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setNav(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && root.classList.contains('nav-open')) {
      setNav(false);
      toggle?.focus();
    }
  });
  window.matchMedia('(min-width: 960px)').addEventListener('change', (event) => {
    if (event.matches) setNav(false);
  });

  // Motif arrows: expose the drawing's scale so CSS keeps a constant line weight (see base.css).
  if ('ResizeObserver' in window) {
    const motifObserver = new ResizeObserver((entries) => {
      for (const { target } of entries) {
        const box = target.viewBox.baseVal;
        const rect = target.getBoundingClientRect();
        if (!box || !box.width || !rect.width) continue;
        const scale = Math.min(rect.width / box.width, rect.height / box.height);
        target.style.setProperty('--motif-scale', scale.toFixed(4));
      }
    });
    document.querySelectorAll('.motif-arrow').forEach((svg) => motifObserver.observe(svg));
  }

  // Count-up numbers: <span data-count-to="980" data-count-from="700">980</span>
  const format = (n) => n.toLocaleString('pt-BR');
  const counters = [...document.querySelectorAll('[data-count-to]')];
  const runCounter = (el) => {
    const to = Number(el.dataset.countTo);
    const from = Number(el.dataset.countFrom ?? 0);
    if (reduceMotion.matches) {
      el.textContent = format(to);
      return;
    }
    const duration = Number(el.dataset.countDuration ?? 1600);
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 4);
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = format(Math.round(from + (to - from) * easeOut(t)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  // Reveal on scroll. Also drives line drawing, competency bars and counters via .is-in.
  const revealables = document.querySelectorAll('[data-reveal]');
  if (!hasIO) {
    revealables.forEach((el) => el.classList.add('is-in'));
  } else {
    if (!reduceMotion.matches) {
      counters.forEach((el) => { el.textContent = format(Number(el.dataset.countFrom ?? 0)); });
    }
    const revealObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    revealables.forEach((el) => revealObserver.observe(el));

    const counterObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    }, { threshold: 0.6 });
    counters.forEach((el) => counterObserver.observe(el));
  }

  // Floating WhatsApp button (html.fab-visible): shown after the hero, hidden over the final CTA.
  const hero = document.querySelector('.hero');
  const finalCta = document.querySelector('.final-cta');
  if (hero && finalCta && hasIO) {
    let heroVisible = true;
    let finalVisible = false;
    const update = () => root.classList.toggle('fab-visible', !heroVisible && !finalVisible);
    new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; update(); }).observe(hero);
    new IntersectionObserver(([entry]) => { finalVisible = entry.isIntersecting; update(); }).observe(finalCta);
  }
})();
