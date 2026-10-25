// Gama 960+ · v3. The page is complete without JS; this adds the living answer sheet.
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const hasIO = 'IntersectionObserver' in window;

  /* Header hairline after the top */
  const header = document.querySelector('.site-header');
  if (header && hasIO) {
    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:12px;pointer-events:none;';
    document.body.prepend(sentinel);
    new IntersectionObserver(([e]) => header.classList.toggle('is-scrolled', !e.isIntersecting)).observe(sentinel);
  }

  /* Reveal on scroll */
  const revealables = document.querySelectorAll('[data-reveal]');
  if (!hasIO) revealables.forEach((el) => el.classList.add('is-in'));
  else {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    revealables.forEach((el) => io.observe(el));
  }

  /* ---------- The answer sheet ---------- */
  const sheet = document.querySelector('.sheet');
  if (!sheet) return;
  const body = sheet.querySelector('.sheet__body');
  const inkSvg = sheet.querySelector('.sheet__ink');
  const marksSvg = sheet.querySelector('.sheet__marks');
  const LINES = 30;
  const SVG = 'http://www.w3.org/2000/svg';

  // Seeded PRNG so the "handwriting" is the same on every visit
  const mulberry = (a) => () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

  const f1 = (n) => n.toFixed(1);
  const curve = (pts) => {
    let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += `C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`;
    }
    return d;
  };

  // One "word": a smooth squiggle with the odd ascender/descender
  const word = (x0, y, len, amp, rnd) => {
    const n = Math.max(3, Math.round(len / 6.5));
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const r = rnd();
      let dy = (rnd() - 0.5) * 2 * amp;
      if (r < 0.11) dy = -amp * 2.6; else if (r < 0.19) dy = amp * 2.1;
      pts.push([x0 + (len * i) / n, y + dy]);
    }
    return curve(pts);
  };

  const drawInk = () => {
    const W = body.clientWidth, H = body.clientHeight;
    if (!W || !H) return;
    const lh = H / LINES;
    sheet.style.setProperty('--lh', `${lh}px`);
    const rnd = mulberry(960);
    const left = 16; // past the line numbers
    const amp = lh * 0.16;
    inkSvg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    inkSvg.replaceChildren();
    const paragraphs = [6, 8, 9, 7];
    let line = 0;
    for (const count of paragraphs) {
      for (let k = 0; k < count; k++) {
        const last = k === count - 1;
        const maxX = last ? left + (W - left) * (0.3 + rnd() * 0.5) : W - 4 - rnd() * 10;
        const y = lh * line + lh * 0.7;
        let x = left + (k === 0 ? 26 : 0);
        let d = '';
        while (x < maxX - 12) {
          const len = Math.min(24 + rnd() * 62, maxX - x);
          d += word(x, y, len, amp, rnd);
          x += len + 7 + rnd() * 8;
        }
        const path = document.createElementNS(SVG, 'path');
        path.setAttribute('d', d);
        path.setAttribute('pathLength', '1');
        path.style.setProperty('--i', String(line));
        inkSvg.appendChild(path);
        line++;
      }
    }
    // Corrector marks: a loop around lines 13-15 and an underline on line 21
    marksSvg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    marksSvg.replaceChildren();
    const loop = document.createElementNS(SVG, 'path');
    const cx = W * 0.42, cy = lh * 13.9, rx = W * 0.3, ry = lh * 1.7;
    loop.setAttribute('d', `M${f1(cx + rx)} ${f1(cy)} A${f1(rx)} ${f1(ry)} 0 1 1 ${f1(cx + rx * 0.98)} ${f1(cy - ry * 0.25)}`);
    loop.setAttribute('pathLength', '1');
    loop.dataset.stage = '1';
    const under = document.createElementNS(SVG, 'path');
    const uy = lh * 21.85;
    under.setAttribute('d', curve([[left + 10, uy], [W * 0.25, uy + 1.5], [W * 0.5, uy - 1], [W * 0.72, uy + 1]]));
    under.setAttribute('pathLength', '1');
    under.dataset.stage = '2';
    marksSvg.append(loop, under);
    applyStage(currentStage, true);
  };

  /* Stages */
  const num = sheet.querySelector('.sheet__num');
  const score = sheet.querySelector('.sheet__score');
  const fills = [...sheet.querySelectorAll('.score__fill')];
  fills.forEach((f, i) => f.style.setProperty('--i', String(i)));
  const pens = { 1: ['.pen--q'], 2: ['.pen--a', '.pen--b', '.pen--c'] };
  let currentStage = 0;
  let countTimer = 0;

  const countTo = (from, to) => {
    cancelAnimationFrame(countTimer);
    if (reduceMotion.matches) { num.textContent = String(to); return; }
    const start = performance.now(), dur = 1400;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      num.textContent = String(Math.round(from + (to - from) * (1 - Math.pow(1 - t, 4))));
      if (t < 1) countTimer = requestAnimationFrame(tick);
    };
    countTimer = requestAnimationFrame(tick);
  };

  const applyStage = (stage, silent) => {
    const prev = currentStage;
    currentStage = stage;
    sheet.dataset.stage = String(stage);
    const written = stage === 0 ? 11 : LINES;
    inkSvg.querySelectorAll('path').forEach((p, i) => p.classList.toggle('is-on', i < written));
    marksSvg.querySelectorAll('path').forEach((p) => p.classList.toggle('is-on', stage >= Number(p.dataset.stage)));
    sheet.querySelectorAll('.pen').forEach((p) => p.classList.remove('is-on'));
    for (let s = 1; s <= stage; s++) (pens[s] || []).forEach((sel) => sheet.querySelector(sel)?.classList.add('is-on'));
    score.classList.toggle('is-on', stage >= 1);
    const fill = stage === 0 ? 0 : stage === 3 ? 0.98 : 0.7;
    fills.forEach((f) => f.style.setProperty('--fill', String(fill)));
    sheet.querySelector('.stamp').classList.toggle('is-on', stage === 3);
    sheet.querySelector('.sheet__sign').classList.toggle('is-on', stage === 3);
    num.classList.toggle('is-gold', stage === 3);
    if (stage === 0) num.textContent = '—';
    else if (stage === 3) { if (!silent && prev !== 3) countTo(700, 980); else num.textContent = '980'; }
    else if (prev === 3 && !silent) countTo(980, 700); else num.textContent = '700';
  };

  drawInk();
  if ('ResizeObserver' in window) {
    let w = body.clientWidth, h = body.clientHeight;
    new ResizeObserver(() => { if (body.clientWidth !== w || body.clientHeight !== h) { w = body.clientWidth; h = body.clientHeight; drawInk(); } }).observe(body);
  }

  const stages = [...document.querySelectorAll('.stage[data-stage]')];
  if (hasIO) {
    const so = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) applyStage(Number(e.target.dataset.stage));
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
    stages.forEach((s) => so.observe(s));
  } else applyStage(3, true);

  /* Desk lamp + sheet tilt follow the pointer (mouse only) */
  const story = document.querySelector('.story');
  if (story && finePointer.matches && !reduceMotion.matches) {
    let raf = 0, mx = 0.72, my = 0.2;
    story.addEventListener('pointermove', (ev) => {
      const r = story.getBoundingClientRect();
      mx = (ev.clientX - r.left) / r.width;
      my = (ev.clientY - window.innerHeight * 0) / window.innerHeight;
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; story.style.setProperty('--mx', mx.toFixed(3)); story.style.setProperty('--my', Math.min(1, Math.max(0, my)).toFixed(3)); });
    }, { passive: true });
  }
})();
