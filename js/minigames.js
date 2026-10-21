'use strict';

/* =====================================================================
   Mini-jogos
   - Adivinha a cor: um vê a cor e dá uma dica, o outro acha no quadro.
   - Roleta do encontro: um vê onde a roleta parou e conta uma história,
     o outro tenta colocar o ponteiro no lugar certo.
   ===================================================================== */
const SPECTRUMS = [
  ['Melhor encontro', 'Pior encontro'],
  ['Comida boa', 'Comida ruim'],
  ['Green flag', 'Red flag'],
  ['Muito romântico', 'Zero romântico'],
  ['Rolê perfeito', 'Rolê flopado'],
  ['Normal', 'Bizarro'],
  ['Estiloso', 'Cringe'],
  ['Eu faria', 'Nem pagando'],
  ['Filme bom', 'Filme ruim'],
  ['Calmo', 'Caótico'],
  ['Subestimado', 'Superestimado'],
  ['Orgulho', 'Vergonha alheia']
];

const mgRoot = document.getElementById('mg');
const mg = { onClose: null, seer: 1, target: null, guess: null, ends: null };

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function mgNames() {
  return { seer: esc(state.names[mg.seer]), guesser: esc(state.names[1 - mg.seer]) };
}

function openMinigame(kind, onClose) {
  mg.onClose = onClose || null;
  mgRoot.hidden = false;
  if (kind === 'menu') renderMenu();
  else mgStart(kind);
}

function closeMinigame() {
  mgRoot.classList.add('closing');
  setTimeout(() => {
    mgRoot.hidden = true;
    mgRoot.classList.remove('closing');
    mgRoot.innerHTML = '';
    const cb = mg.onClose;
    mg.onClose = null;
    if (cb) cb();
  }, 250);
}

function mgStart(kind) {
  mg.seer = 1 - mg.seer; // reveza quem vê
  if (kind === 'cor') colorIntro();
  else dialSetup();
}

function panel(html) {
  mgRoot.innerHTML = `
    <div class="mg-panel" role="dialog" aria-modal="true">
      <button class="mg-x" type="button" aria-label="Fechar">×</button>
      ${html}
    </div>`;
  mgRoot.querySelector('.mg-x').addEventListener('click', closeMinigame);
  const p = mgRoot.querySelector('.mg-panel');
  const first = p.querySelector('[data-go]');
  if (first) setTimeout(() => first.focus({ preventScroll: true }), 50);
  return p;
}

function resultActions(kind) {
  return `
    <div class="mg-actions">
      <button class="btn primary" type="button" data-again>Jogar de novo</button>
      <button class="btn ghost" type="button" data-back>Voltar pras cartas</button>
    </div>`;
}

function wireResult(p, kind) {
  p.querySelector('[data-again]').addEventListener('click', () => mgStart(kind));
  p.querySelector('[data-back]').addEventListener('click', closeMinigame);
}

function sipPill(lost) {
  return lost && state.sips ? '<span class="pill">quem errou: gole ou trago</span>' : '';
}

mgRoot.addEventListener('click', (e) => { if (e.target === mgRoot) closeMinigame(); });
document.addEventListener('keydown', (e) => { if (!mgRoot.hidden && e.key === 'Escape') closeMinigame(); });

/* ---------- menu ---------- */
function renderMenu() {
  const p = panel(`
    <div class="mg-head">${icon('dice')}<span>Mini-jogos</span></div>
    <h3>Bora de joguinho?</h3>
    <div class="mg-menu">
      <button class="mg-opt" type="button" data-kind="cor">
        ${icon('palette')}
        <span><b>Adivinha a cor</b><small>um vê a cor e dá uma dica, o outro tenta achar no quadro</small></span>
      </button>
      <button class="mg-opt" type="button" data-kind="roleta">
        ${icon('dial')}
        <span><b>Roleta do encontro</b><small>um vê onde a roleta parou e conta uma história, o outro chuta o ponto</small></span>
      </button>
    </div>`);
  p.querySelectorAll('.mg-opt').forEach((b) => b.addEventListener('click', () => mgStart(b.dataset.kind)));
}

/* =====================================================================
   Adivinha a cor
   ===================================================================== */
const SAT = 78;
const lightAt = (y) => 84 - y * 54;           // topo claro, base escura
const colorAt = (x, y) => `hsl(${Math.round(x * 360)}, ${SAT}%, ${Math.round(lightAt(y))}%)`;

function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0) * 255, f(8) * 255, f(4) * 255];
}

function drawBoard(canvas) {
  const W = 360, H = 180;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(W, H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const [r, g, b] = hslToRgb((x / W) * 360, SAT, lightAt(y / H));
      const i = (y * W + x) * 4;
      img.data[i] = r; img.data[i + 1] = g; img.data[i + 2] = b; img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
}

function placeMark(el, x, y) {
  el.style.left = `${x * 100}%`;
  el.style.top = `${y * 100}%`;
}

function colorIntro() {
  const { seer, guesser } = mgNames();
  mg.target = { x: Math.random(), y: rand(0.06, 0.94) };
  mg.guess = null;
  const p = panel(`
    <div class="mg-head">${icon('palette')}<span>Adivinha a cor</span></div>
    <h3>Só <b>${seer}</b> pode olhar</h3>
    <p>${guesser}, vira o rosto. ${seer} vai ver uma cor e dar uma dica de até 3 palavras, tipo “chiclete Babalu” ou “grama depois da chuva”.</p>
    <button class="btn primary" type="button" data-go>Mostrar a cor</button>`);
  p.querySelector('[data-go]').addEventListener('click', colorReveal);
}

function colorReveal() {
  const { guesser } = mgNames();
  const t = mg.target;
  const p = panel(`
    <div class="mg-head">${icon('palette')}<span>Só você tá vendo</span></div>
    <div class="swatch" style="background:${colorAt(t.x, t.y)}"></div>
    <p>Pensa numa dica de até 3 palavras pra essa cor. Falar o nome da cor não vale, hein.</p>
    <button class="btn primary" type="button" data-go>Escondi, ${guesser} pode chutar</button>`);
  p.querySelector('[data-go]').addEventListener('click', colorGuess);
}

function colorGuess() {
  const { seer, guesser } = mgNames();
  const p = panel(`
    <div class="mg-head">${icon('palette')}<span>Vez de ${guesser}</span></div>
    <h3>Cadê a cor?</h3>
    <p>Toca (ou arrasta) no quadro onde você acha que tá a cor da dica de ${seer}.</p>
    <div class="board"><canvas></canvas><i class="mark guess" hidden></i></div>
    <button class="btn primary" type="button" data-go disabled>Confirmar</button>`);
  const board = p.querySelector('.board');
  const mark = board.querySelector('.guess');
  const go = p.querySelector('[data-go]');
  drawBoard(board.querySelector('canvas'));

  let dragging = false;
  const set = (e) => {
    const r = board.getBoundingClientRect();
    const x = clamp((e.clientX - r.left) / r.width, 0, 0.999);
    const y = clamp((e.clientY - r.top) / r.height, 0, 1);
    mg.guess = { x, y };
    placeMark(mark, x, y);
    mark.style.background = colorAt(x, y);
    mark.hidden = false;
    go.disabled = false;
  };
  board.addEventListener('pointerdown', (e) => { dragging = true; board.setPointerCapture(e.pointerId); set(e); });
  board.addEventListener('pointermove', (e) => { if (dragging) set(e); });
  board.addEventListener('pointerup', () => { dragging = false; });
  go.addEventListener('click', colorResult);
}

function colorResult() {
  const t = mg.target, g = mg.guess;
  let dx = Math.abs(t.x - g.x);
  dx = Math.min(dx, 1 - dx) * 2;                  // matiz é circular
  const dist = Math.hypot(dx, Math.abs(t.y - g.y));
  const score = Math.max(0, Math.round(100 * (1 - dist / 0.55)));
  const verdict =
    score >= 85 ? 'Telepatia. Vocês tão na mesma frequência.' :
    score >= 60 ? 'Mó sintonia, foi quase.' :
    score >= 35 ? 'Mais ou menos... a dica ajudou ou atrapalhou?' :
    'Daltonismo emocional detectado.';

  const p = panel(`
    <div class="mg-head">${icon('palette')}<span>Resultado</span></div>
    <div class="score">${score}<small>/100</small></div>
    <p class="verdict">${verdict}</p>
    <div class="board"><canvas></canvas><i class="mark target"></i><i class="mark guess"></i></div>
    <div class="compare">
      <div><i style="background:${colorAt(t.x, t.y)}"></i><small>a cor era</small></div>
      <div><i style="background:${colorAt(g.x, g.y)}"></i><small>o chute</small></div>
    </div>
    ${sipPill(score < 35)}
    ${resultActions()}`);
  const board = p.querySelector('.board');
  drawBoard(board.querySelector('canvas'));
  placeMark(board.querySelector('.target'), t.x, t.y);
  const gm = board.querySelector('.guess');
  placeMark(gm, g.x, g.y);
  gm.style.background = colorAt(g.x, g.y);
  wireResult(p, 'cor');
  if (score >= 60) setTimeout(() => burstAt(p.querySelector('.score'), 12), 200);
}

/* =====================================================================
   Roleta do encontro
   ===================================================================== */
const CX = 150, CY = 150, R = 135;
const BANDS = [[0.125, 2, '#ffd23f'], [0.075, 3, '#ff8a3d'], [0.025, 4, '#e8436f']];

function pt(p, r = R) {
  const th = Math.PI * (1 - p);
  return [CX + r * Math.cos(th), CY - r * Math.sin(th)];
}

function wedge(p1, p2, r = R) {
  const [x1, y1] = pt(p1, r), [x2, y2] = pt(p2, r);
  return `M${CX} ${CY}L${x1.toFixed(1)} ${y1.toFixed(1)}A${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}Z`;
}

function dialSvg({ target = null, needle = null } = {}) {
  let bands = '';
  if (target !== null) {
    bands = BANDS.map(([half, pts, color]) => `<path d="${wedge(target - half, target + half)}" fill="${color}"/>`).join('');
    bands += [[-0.1, 2], [-0.05, 3], [0, 4], [0.05, 3], [0.1, 2]].map(([o, n]) => {
      const [x, y] = pt(target + o, R * 0.84);
      return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}">${n}</text>`;
    }).join('');
  }
  const ticks = Array.from({ length: 11 }, (_, i) => {
    const [x1, y1] = pt(i / 10, R + 4), [x2, y2] = pt(i / 10, R + 10);
    return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}"/>`;
  }).join('');
  const needleEl = needle === null ? '' :
    `<g class="needle" transform="rotate(${(needle - 0.5) * 180} ${CX} ${CY})">
       <path d="M${CX} ${CY}L${CX} ${CY - R + 14}"/><circle cx="${CX}" cy="${CY - R + 14}" r="6"/>
     </g>`;
  return `
    <svg class="dial" viewBox="0 -12 300 172" aria-hidden="true">
      <defs>
        <linearGradient id="dial-bg" x1="0" x2="1">
          <stop offset="0" style="stop-color:var(--pop)"/><stop offset="1" style="stop-color:var(--front-accent)"/>
        </linearGradient>
        <clipPath id="dial-half"><rect x="0" y="-20" width="300" height="${CY + 20}"/></clipPath>
      </defs>
      <path d="${wedge(0, 1)}" fill="url(#dial-bg)" opacity=".22"/>
      <g clip-path="url(#dial-half)"><g class="bands">${bands}</g></g>
      <path d="${wedge(0, 1)}" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="1.5"/>
      <g class="ticks">${ticks}</g>
      ${needleEl}
      <circle cx="${CX}" cy="${CY}" r="8" class="hub"/>
    </svg>`;
}

function endsRow() {
  return `<div class="dial-ends"><span>← ${esc(mg.ends[0])}</span><span>${esc(mg.ends[1])} →</span></div>`;
}

function dialSetup() {
  const { seer, guesser } = mgNames();
  const pre = mg.ends || pick(SPECTRUMS);
  const p = panel(`
    <div class="mg-head">${icon('dial')}<span>Roleta do encontro</span></div>
    <h3>Escolham a régua</h3>
    <p>Pega uma sugestão ou escreve a de vocês.</p>
    <div class="chips">${SPECTRUMS.map((s, i) => `<button type="button" class="chip-s" data-i="${i}">${s[0]} / ${s[1]}</button>`).join('')}</div>
    <div class="ends">
      <input id="mg-left" maxlength="22" aria-label="Ponta da esquerda">
      <span aria-hidden="true">↔</span>
      <input id="mg-right" maxlength="22" aria-label="Ponta da direita">
    </div>
    <p>Só <b>${seer}</b> vai ver a roleta. ${guesser}, vira o rosto.</p>
    <button class="btn primary" type="button" data-go>Girar a roleta</button>`);
  const left = p.querySelector('#mg-left'), right = p.querySelector('#mg-right');
  const chips = p.querySelectorAll('.chip-s');
  const mark = () => chips.forEach((c) => {
    const s = SPECTRUMS[c.dataset.i];
    c.classList.toggle('on', s[0] === left.value && s[1] === right.value);
  });
  left.value = pre[0];
  right.value = pre[1];
  mark();
  chips.forEach((c) => c.addEventListener('click', () => {
    [left.value, right.value] = SPECTRUMS[c.dataset.i];
    mark();
  }));
  [left, right].forEach((inp) => inp.addEventListener('input', mark));
  p.querySelector('[data-go]').addEventListener('click', () => {
    mg.ends = [left.value.trim() || 'Melhor', right.value.trim() || 'Pior'];
    mg.target = rand(0.1, 0.9);
    dialSpin();
  });
}

function dialSpin() {
  const { guesser } = mgNames();
  const p = panel(`
    <div class="mg-head">${icon('dial')}<span>Só você tá vendo</span></div>
    ${dialSvg({ target: mg.target })}
    ${endsRow()}
    <p class="spin-tip">Girando...</p>
    <button class="btn primary" type="button" data-go hidden>Esconder e passar pra ${guesser}</button>`);
  const bands = p.querySelector('.bands');
  const tip = p.querySelector('.spin-tip');
  const go = p.querySelector('[data-go]');
  const done = () => {
    bands.removeAttribute('transform');
    tip.innerHTML = `A roleta parou aí. Agora conta uma história (ou dá uma dica) que caia nesse ponto entre <b>${esc(mg.ends[0])}</b> e <b>${esc(mg.ends[1])}</b>. Tipo: “foi no cinema, tudo perfeito, mas na hora do beijo... bafo de lanche”.`;
    go.hidden = false;
    go.focus({ preventScroll: true });
  };
  go.addEventListener('click', dialGuess);
  if (reduceMotion) { done(); return; }

  const DUR = 2200, t0 = performance.now();
  const frame = (now) => {
    if (!bands.isConnected) return;
    const k = Math.min((now - t0) / DUR, 1);
    const amp = 0.6 * (1 - k) * (1 - k);
    const pos = mg.target + amp * Math.sin(k * Math.PI * 7);
    bands.setAttribute('transform', `rotate(${(pos - mg.target) * 180} ${CX} ${CY})`);
    if (k < 1) requestAnimationFrame(frame); else done();
  };
  requestAnimationFrame(frame);
}

function dialGuess() {
  const { seer, guesser } = mgNames();
  mg.guess = 0.5;
  const p = panel(`
    <div class="mg-head">${icon('dial')}<span>Vez de ${guesser}</span></div>
    <h3>Onde a roleta parou?</h3>
    <p>Arrasta o ponteiro pro ponto que combina com a história de ${seer}.</p>
    ${dialSvg({ needle: 0.5 })}
    ${endsRow()}
    <button class="btn primary" type="button" data-go>Confirmar</button>`);
  const svg = p.querySelector('.dial');
  const needle = svg.querySelector('.needle');
  svg.classList.add('drag');

  let dragging = false;
  const set = (e) => {
    const r = svg.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 300;
    const y = ((e.clientY - r.top) / r.height) * 172 - 12;
    const dx = x - CX, dy = CY - y;
    const th = dy < 0 ? (dx < 0 ? Math.PI : 0) : Math.atan2(dy, dx);
    mg.guess = clamp(1 - th / Math.PI, 0, 1);
    needle.setAttribute('transform', `rotate(${(mg.guess - 0.5) * 180} ${CX} ${CY})`);
  };
  svg.addEventListener('pointerdown', (e) => { dragging = true; svg.setPointerCapture(e.pointerId); set(e); });
  svg.addEventListener('pointermove', (e) => { if (dragging) set(e); });
  svg.addEventListener('pointerup', () => { dragging = false; });
  p.querySelector('[data-go]').addEventListener('click', dialResult);
}

function dialResult() {
  const d = Math.abs(mg.guess - mg.target);
  const pts = d <= 0.025 ? 4 : d <= 0.075 ? 3 : d <= 0.125 ? 2 : 0;
  const verdict = [
    'Nada a ver kkkk. Ninguém entendeu nada.', '', 'Passou raspando.', 'Pertinho! Sintonia boa.', 'Na mosca! Leitura de mente confirmada.'
  ][pts];
  const p = panel(`
    <div class="mg-head">${icon('dial')}<span>Resultado</span></div>
    <div class="score">${pts}<small> ${pts === 1 ? 'ponto' : 'pontos'}</small></div>
    <p class="verdict">${verdict}</p>
    ${dialSvg({ target: mg.target, needle: mg.guess })}
    ${endsRow()}
    ${sipPill(pts === 0)}
    ${resultActions()}`);
  wireResult(p, 'roleta');
  if (pts >= 3) setTimeout(() => burstAt(p.querySelector('.score'), 12), 200);
}
