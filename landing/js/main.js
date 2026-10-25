// Gama 960+ · v4. The page is complete without JS; this adds reveals and counters.
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hasIO = 'IntersectionObserver' in window;

  // Header gets a white bar once the page leaves the top
  const header = document.querySelector('.site-header');
  if (header && hasIO) {
    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:12px;pointer-events:none;';
    document.body.prepend(sentinel);
    new IntersectionObserver(([e]) => header.classList.toggle('is-scrolled', !e.isIntersecting)).observe(sentinel);
  }

  // Mobile navigation (html.nav-open); styling lives in mobile.css
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const setNav = (open) => {
    if (!toggle) return;
    root.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.querySelectorAll('main, .site-footer, .fab').forEach((el) => { el.inert = open; });
  };
  toggle?.addEventListener('click', () => setNav(toggle.getAttribute('aria-expanded') !== 'true'));
  nav?.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('nav-open')) { setNav(false); toggle?.focus(); }
  });
  window.matchMedia('(min-width: 960px)').addEventListener('change', (e) => { if (e.matches) setNav(false); });

  // Floating WhatsApp button (html.fab-visible): shown once the hero has scrolled away, hidden over the final section
  const hero = document.querySelector('.hero');
  const finalSection = document.querySelector('.final');
  if (hero && finalSection && hasIO) {
    let heroIn = true, finalIn = false;
    const update = () => root.classList.toggle('fab-visible', !heroIn && !finalIn);
    new IntersectionObserver(([e]) => { heroIn = e.isIntersecting; update(); }, { rootMargin: '-25% 0px 0px 0px' }).observe(hero);
    new IntersectionObserver(([e]) => { finalIn = e.isIntersecting; update(); }, { threshold: 0.3 }).observe(finalSection);
  }

  // Hero video: still frame for reduced motion or metered/slow connections; otherwise play only while on screen
  const video = document.querySelector('.hero__video');
  const conn = navigator.connection;
  const slowNetwork = Boolean(conn && (conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType)));
  if (video && slowNetwork) {
    video.removeAttribute('autoplay');
    video.querySelectorAll('source').forEach((s) => s.remove());
    video.load(); // keeps the poster, skips the download
  } else if (video) {
    if (reduceMotion.matches) {
      video.removeAttribute('autoplay');
      video.pause();
      video.currentTime = 0;
    } else if (hasIO) {
      new IntersectionObserver(([e]) => {
        if (e.isIntersecting) video.play().catch(() => {});
        else video.pause();
      }, { threshold: 0.05 }).observe(video);
    }
  }

  // Reveal on scroll
  const revealables = document.querySelectorAll('[data-reveal]');
  if (!hasIO) revealables.forEach((el) => el.classList.add('is-in'));
  else {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    revealables.forEach((el) => io.observe(el));
  }

  // Count-up numbers: <span data-count-to="980" data-count-from="700">980</span>
  const format = (n) => n.toLocaleString('pt-BR');
  const counters = [...document.querySelectorAll('[data-count-to]')];
  const run = (el) => {
    const to = Number(el.dataset.countTo), from = Number(el.dataset.countFrom ?? 0);
    if (reduceMotion.matches || !hasIO) { el.textContent = format(to); return; }
    const start = performance.now(), dur = 1500;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      el.textContent = format(Math.round(from + (to - from) * (1 - Math.pow(1 - t, 4))));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (hasIO && !reduceMotion.matches) {
    counters.forEach((el) => { el.textContent = format(Number(el.dataset.countFrom ?? 0)); });
    const co = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { run(e.target); co.unobserve(e.target); }
    }, { threshold: 0.6 });
    counters.forEach((el) => co.observe(el));
  }
})();
