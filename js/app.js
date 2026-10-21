'use strict';

/* =====================================================================
   As perguntas ficam em js/decks/ (um arquivo por vibe + extras.js).
   Aqui ficam as vibes: visual, textos e efeitos de cada tema.
   ===================================================================== */
const THEMES = {
  leve: {
    icon: 'sun', name: 'De boa', short: 'leve e divertido',
    swatch: 'linear-gradient(135deg, #ffb59e, #ff6a4d)',
    lead: 'Cartas pra se conhecerem sem pressão, dar risada e descobrir umas coisas bem aleatórias um do outro.',
    back: 'sun', favIcons: ['☆', '★'],
    bursts: ['✦', '●', '✧', 'i:sun'], burstColors: ['#ff6a4d', '#ffa630', '#ffcf6b', '#5fcfb4'],
    metaColor: '#fff6ee'
  },
  papo: {
    icon: 'moon', name: 'Papo de madrugada', short: 'pra se conhecer de verdade',
    swatch: 'linear-gradient(135deg, #2b357a, #0b0f2a)',
    lead: 'Pra quando a conversa fica boa e ninguém quer ir embora. Perguntas pra se conhecer de verdade.',
    back: 'moon', favIcons: ['☆', '★'],
    bursts: ['✦', '✧', '⋆', '✦'], burstColors: ['#f2d48a', '#c9d4ff', '#ffffff'],
    metaColor: '#080b1f'
  },
  resenha: {
    icon: 'bolt', name: 'Resenha', short: 'caos e risada',
    swatch: 'linear-gradient(135deg, #ffd23f, #ff4fa3 55%, #6b2bd9)',
    lead: 'Zero seriedade. Perguntas absurdas, micos e desafios bobos. Vai dar ruim (no bom sentido).',
    backText: '?!', favIcons: ['☆', '★'],
    bursts: ['★', '!', '✸', '?', 'i:bolt'], burstColors: ['#ffd23f', '#ff4fa3', '#3ddbd9', '#ffffff'],
    metaColor: '#1d0b3d'
  },
  romance: {
    icon: 'heart', name: 'Clima de romance', short: 'um pouco mais perto',
    swatch: 'linear-gradient(135deg, #f08aa0, #7a1f45)',
    lead: 'Um friozinho na barriga. Perguntas fofas, flertes leves e umas pequenas ousadias.',
    back: 'heart', favIcons: ['♡', '♥'],
    bursts: ['♥', '♥', '✦', 'i:heart'], burstColors: ['#f08aa0', '#ff6f94', '#e8c987'],
    metaColor: '#1a060d'
  },
  brisa: {
    icon: 'leaf', name: 'Brisa', short: 'gole, trago e papo doido',
    swatch: 'linear-gradient(135deg, #b8f06b, #2c7a3f 60%, #0f2e19)',
    lead: 'Vinho na taça, brisa no ar e zero compromisso com a lógica. Fugiu da pergunta? Gole ou trago.',
    back: 'leaf', favIcons: ['☆', '★'],
    bursts: ['i:leaf', 'i:leaf', '✦', '•'], burstColors: ['#9be15d', '#c6f06b', '#eaf78a'],
    metaColor: '#0b1a10'
  }
};

// "Baralho todo": as melhores cartas de cada baralho, e o visual muda conforme a vibe da carta
const TODO = {
  icon: 'layers', name: 'Baralho todo', short: 'o melhor de cada vibe',
  swatch: 'conic-gradient(from 200deg, #ff6a4d, #ffd23f, #9be15d, #5b6ee8, #f08aa0, #ff6a4d)',
  lead: 'O melhor de cada vibe num baralho só. Escolham os baralhos e o visual muda junto com o assunto da carta.',
  visual: 'papo'
};
const TOP_CARDS = 6; // quantas cartas de cada baralho entram no baralho todo

const SURPRISE_CAT = { id: 'surpresa', icon: 'dice', name: 'Carta surpresa', mode: 'surprise' };
const SIP_CAT = { id: 'gole', icon: 'cheers', name: 'Gole ou trago', mode: 'sip' };
const GAME_CARDS = {
  cor: { cat: { id: 'mini-cor', icon: 'palette', name: 'Mini-jogo', mode: 'game' }, text: 'Adivinha a cor: um vê uma cor e dá uma dica, o outro tenta achar ela no quadro.' },
  roleta: { cat: { id: 'mini-roleta', icon: 'dial', name: 'Mini-jogo', mode: 'game' }, text: 'Roleta do encontro: um vê onde a roleta parou e conta uma história, o outro tenta acertar o ponto.' }
};

/* =====================================================================
   Helpers
   ===================================================================== */
const $ = (sel) => document.querySelector(sel);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const STORE_KEY = 'entre-nos-v2';
const store = {
  get() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; } },
  set(v) { try { localStorage.setItem(STORE_KEY, JSON.stringify(v)); } catch { /* sem armazenamento: tudo bem */ } }
};

/* =====================================================================
   Estado
   ===================================================================== */
const saved = store.get();
const state = {
  theme: THEMES[saved.theme] || saved.theme === 'todo' ? saved.theme : 'leve',
  visual: 'leve',     // tema que tá aparecendo na tela (no baralho todo muda a cada carta)
  names: ['', ''],
  selected: {},       // tema -> Set de ids de baralho ("todo" usa "tema:id")
  surprises: saved.surprises !== false,
  sips: saved.sips !== false,
  games: saved.games !== false,
  seen: Array.isArray(saved.seen) ? saved.seen : [],   // cartas coringa que já saíram
  deck: [],
  index: -1,          // -1 = nenhuma carta virada ainda
  firstTurn: 0,
  favs: [],
  busy: false
};
Object.keys(THEMES).forEach((t) => {
  const ids = (DECKS[t] || []).map((d) => d.id);
  const prev = saved.selected && Array.isArray(saved.selected[t]) ? saved.selected[t].filter((id) => ids.includes(id)) : [];
  state.selected[t] = new Set(prev.length ? prev : ids);
});
{
  const keys = Object.keys(THEMES).flatMap((t) => (DECKS[t] || []).map((d) => `${t}:${d.id}`));
  const prev = saved.selected && Array.isArray(saved.selected.todo) ? saved.selected.todo.filter((k) => keys.includes(k)) : [];
  state.selected.todo = new Set(prev.length ? prev : keys);
}

// baralhos que contam agora (no baralho todo, a Brisa só entra com gole ou trago ligado)
function activeDecks() {
  if (state.theme !== 'todo') {
    return (DECKS[state.theme] || [])
      .filter((d) => state.selected[state.theme].has(d.id))
      .map((d) => ({ ...d, theme: state.theme }));
  }
  return Object.keys(THEMES)
    .filter((t) => t !== 'brisa' || state.sips)
    .flatMap((t) => (DECKS[t] || [])
      .filter((d) => state.selected.todo.has(`${t}:${d.id}`))
      .map((d) => ({ ...d, theme: t, cards: d.cards.slice(0, TOP_CARDS) })));
}

const screens = { start: $('#screen-start'), game: $('#screen-game'), end: $('#screen-end') };

function show(name) {
  Object.entries(screens).forEach(([k, el]) => el.classList.toggle('active', k === name));
  window.scrollTo(0, 0);
}

function persist() {
  const selected = {};
  Object.entries(state.selected).forEach(([t, set]) => { selected[t] = [...set]; });
  store.set({
    theme: state.theme,
    names: [$('#name1').value.trim(), $('#name2').value.trim()],
    selected,
    surprises: state.surprises,
    sips: state.sips,
    games: state.games,
    seen: state.seen
  });
}

/* =====================================================================
   Tema
   ===================================================================== */
const themesBox = $('#themes');

[...Object.entries(THEMES), ['todo', TODO]].forEach(([id, t]) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'theme-opt';
  btn.setAttribute('role', 'radio');
  btn.dataset.theme = id;
  btn.style.setProperty('--sw', t.swatch);
  btn.innerHTML = `<span class="sw">${icon(t.icon)}</span><b>${t.name}</b><small>${t.short}</small>`;
  btn.addEventListener('click', () => {
    if (id === state.theme) return;
    const swap = () => applyTheme(id);
    if (document.startViewTransition && !reduceMotion) document.startViewTransition(swap);
    else swap();
    setTimeout(() => burstAt(btn, 10), 120);
    persist();
  });
  themesBox.appendChild(btn);
});

// troca só o visual (cores, fundo animado, verso da carta)
function setVisual(id) {
  state.visual = id;
  const t = THEMES[id];
  document.documentElement.dataset.theme = id;
  document.querySelector('meta[name="theme-color"]').content = t.metaColor;
  document.querySelectorAll('[data-theme-icon]').forEach((el) => { el.innerHTML = icon(t.icon); });
  $('#back-sym').innerHTML = t.backText ? '' : icon(t.back);
  if (t.backText) $('#back-sym').textContent = t.backText;
  background.setTheme(id);
}

// troca a vibe escolhida na tela inicial
function applyTheme(id) {
  state.theme = id;
  const t = id === 'todo' ? TODO : THEMES[id];
  setVisual(id === 'todo' ? TODO.visual : id);
  if (id === 'todo') document.querySelectorAll('#screen-start [data-theme-icon]').forEach((el) => { el.innerHTML = icon(TODO.icon); });
  themesBox.querySelectorAll('.theme-opt').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.theme === id)));
  $('#lead').textContent = t.lead;
  renderDecks();
}

// no baralho todo, a tela muda de vibe junto com a carta (com um fade suave)
async function switchVisual(id) {
  if (id === state.visual) return;
  if (document.startViewTransition && !reduceMotion) {
    await document.startViewTransition(() => setVisual(id)).finished.catch(() => {});
  } else {
    setVisual(id);
  }
}

/* =====================================================================
   Tela inicial
   ===================================================================== */
const name1 = $('#name1');
const name2 = $('#name2');
const savedNames = Array.isArray(saved.names) ? saved.names : [];
name1.value = savedNames[0] || 'Pedro';
name2.value = savedNames[1] || 'Bella';

function updateEyebrow() {
  const a = name1.value.trim(), b = name2.value.trim();
  $('#eyebrow').textContent = a && b ? `um jogo para ${a} & ${b}` : 'um jogo para dois';
}
[name1, name2].forEach((inp) => inp.addEventListener('input', () => { inp.classList.remove('invalid'); updateEyebrow(); }));
updateEyebrow();

const catsBox = $('#cats');
function deckChip(deck, key, count, delay) {
  const sel = state.selected[state.theme];
  const label = document.createElement('label');
  label.className = 'cat';
  label.style.animationDelay = `${delay}s`;
  label.innerHTML = `
    <input type="checkbox">
    <span class="chip">
      <span class="icon">${icon(deck.icon)}</span>
      <span class="name"></span>
      <span class="desc"></span>
      <span class="count">${count}</span>
    </span>`;
  label.querySelector('.name').textContent = deck.name;
  label.querySelector('.desc').textContent = deck.desc;
  const input = label.querySelector('input');
  input.checked = sel.has(key);
  input.addEventListener('change', () => {
    input.checked ? sel.add(key) : sel.delete(key);
    $('#cats-error').hidden = activeDecks().length > 0;
    persist();
  });
  return label;
}

function renderDecks() {
  catsBox.innerHTML = '';
  if (state.theme === 'todo') {
    let i = 0;
    Object.entries(THEMES).forEach(([t, theme]) => {
      if (t === 'brisa' && !state.sips) return;
      const head = document.createElement('p');
      head.className = 'cat-group';
      head.innerHTML = `${icon(theme.icon)}<span></span>`;
      head.querySelector('span').textContent = theme.name;
      catsBox.appendChild(head);
      (DECKS[t] || []).forEach((deck) => {
        const n = Math.min(TOP_CARDS, deck.cards.length);
        catsBox.appendChild(deckChip(deck, `${t}:${deck.id}`, `${n} melhores`, (i++) * 0.03));
      });
    });
  } else {
    (DECKS[state.theme] || []).forEach((deck, i) => {
      catsBox.appendChild(deckChip(deck, deck.id, `${deck.cards.length} cartas`, i * 0.06));
    });
  }
  $('#cats-error').hidden = true;
}

const surprisesInput = $('#surprises');
surprisesInput.checked = state.surprises;
surprisesInput.addEventListener('change', () => { state.surprises = surprisesInput.checked; persist(); });
const sipsInput = $('#sips');
sipsInput.checked = state.sips;
sipsInput.addEventListener('change', () => { state.sips = sipsInput.checked; updateSipsUI(); persist(); });
const gamesInput = $('#games');
gamesInput.checked = state.games;
gamesInput.addEventListener('change', () => { state.games = gamesInput.checked; persist(); });

// sem gole ou trago, o tema Brisa some (ele é todo sobre isso)
function updateSipsUI() {
  themesBox.querySelector('[data-theme="brisa"]').hidden = !state.sips;
  if (!state.sips && state.theme === 'brisa') applyTheme('leve');
  else if (state.theme === 'todo') renderDecks();
}
document.querySelectorAll('[data-icon]').forEach((el) => { el.innerHTML = icon(el.dataset.icon); });

$('#start-form').addEventListener('submit', (e) => {
  e.preventDefault();
  let ok = true;
  [name1, name2].forEach((inp) => {
    inp.classList.remove('invalid');
    if (!inp.value.trim()) {
      void inp.offsetWidth; // reinicia a animação
      inp.classList.add('invalid');
      ok = false;
    }
  });
  if (!activeDecks().length) { $('#cats-error').hidden = false; ok = false; }
  if (!ok) { (name1.value.trim() ? name2 : name1).focus(); return; }

  state.names = [name1.value.trim(), name2.value.trim()];
  persist();
  startGame();
});

/* =====================================================================
   Jogo
   ===================================================================== */
const card = $('#card');
const stage = $('#stage');
const btnNext = $('#btn-next');
const btnFav = $('#btn-fav');
const tip = $('#tip');

// o quanto cada vibe "esquenta" a noite: o jogo começa leve e o romance vai chegando aos poucos
function blockWeight(cat, progress) {
  const byTheme = {
    leve: 1.4 - progress,
    resenha: 1.1,
    papo: 0.6 + 0.6 * progress,
    brisa: 0.7 + 0.3 * progress,
    romance: 0.15 + 1.3 * progress
  };
  return (byTheme[cat.theme] ?? 1) * (cat.mode === 'challenge' ? 0.8 : 1);
}

function weightedPick(items, weights) {
  let r = Math.random() * weights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

// as perguntas em blocos do mesmo baralho, pra conversa não pular de assunto toda hora.
// desafio vem em bloco curto (2–3) pra não virar uma sequência só de desafio.
function buildQuestions() {
  const todo = state.theme === 'todo';
  const blocks = [];
  activeDecks().forEach((d) => {
    const cards = shuffle(d.cards.map((text) => ({ text, cat: d })));
    while (cards.length) {
      const size = d.mode === 'challenge' ? rand(2, 3) : todo ? rand(3, 4) : rand(4, 6);
      blocks.push(cards.splice(0, Math.round(size)));
    }
  });

  const total = blocks.reduce((n, b) => n + b.length, 0);
  const deck = [];
  let last = null;
  while (blocks.length) {
    let options = blocks.filter((b) => b[0].cat.id !== last);
    if (!options.length) options = blocks;
    // as duas primeiras rodadas são sempre tranquilas: nada de desafio nem de romance
    if (deck.length < 6) {
      let calm = options.filter((b) => b[0].cat.mode !== 'challenge');
      const softer = calm.filter((b) => !['romance', 'brisa'].includes(b[0].cat.theme));
      if (softer.length) calm = softer;
      if (calm.length) options = calm;
    }
    const block = weightedPick(options, options.map((b) => blockWeight(b[0].cat, deck.length / total)));
    blocks.splice(blocks.indexOf(block), 1);
    deck.push(...block);
    last = block[0].cat.id;
  }
  return deck;
}

// cartas coringa: as que vocês ainda não viram vêm primeiro
function freshFirst(list) {
  const seen = new Set(state.seen);
  const s = shuffle(list);
  return [...s.filter((t) => !seen.has(t)), ...s.filter((t) => seen.has(t))];
}

function buildDeck() {
  const deck = buildQuestions();
  const pools = {
    surprise: state.surprises && typeof SURPRISES !== 'undefined' ? freshFirst(SURPRISES).map((text) => ({ text, cat: SURPRISE_CAT })) : [],
    sip: state.sips && typeof SIPS !== 'undefined' ? freshFirst(SIPS).map((text) => ({ text, cat: SIP_CAT })) : []
  };
  let game = Math.random() < 0.5 ? 'cor' : 'roleta';
  let lastKind = null;

  // coringa a cada 5–8 perguntas; mini-jogo garantido lá pela 10ª e depois a cada 15–20.
  // nunca dois coringas do mesmo tipo seguidos, e nada logo depois de um desafio.
  const out = [];
  let count = 0;
  let nextWild = Math.round(rand(5, 7));
  let nextGame = Math.round(rand(9, 12));
  deck.forEach((item, i) => {
    out.push(item);
    count++;
    if (item.cat.mode === 'challenge' || i === deck.length - 1) return;

    if (state.games && count >= nextGame) {
      out.push({ ...GAME_CARDS[game], game });
      game = game === 'cor' ? 'roleta' : 'cor';
      lastKind = 'game';
      nextGame = count + Math.round(rand(15, 20));
      nextWild = Math.max(nextWild, count + Math.round(rand(4, 6)));
      return;
    }

    if (count >= nextWild) {
      const kinds = Object.keys(pools).filter((k) => pools[k].length);
      const fresh = kinds.filter((k) => k !== lastKind);
      const kind = pick(fresh.length ? fresh : kinds);
      if (kind) {
        out.push(pools[kind].shift());
        lastKind = kind;
        nextGame = Math.max(nextGame, count + 4);
      }
      nextWild = count + Math.round(rand(5, 8));
    }
  });
  return out;
}

function startGame() {
  state.deck = buildDeck();
  if (state.theme === 'todo') setVisual(state.deck[0].cat.theme);
  state.index = -1;
  state.turnCount = 0;
  state.favs = [];
  state.busy = false;
  state.firstTurn = Math.random() < 0.5 ? 0 : 1;

  card.className = 'card reset';
  void card.offsetWidth;
  card.classList.remove('reset');
  card.classList.add('enter');
  stage.classList.remove('last');

  updateProgress();
  updateFav();
  btnNext.textContent = 'Virar a primeira carta';
  btnFav.disabled = true;
  tip.textContent = 'Toque na carta ou aperte espaço';
  show('game');
}

function fillCard(item) {
  const [a, b] = state.names;
  const mode = item.cat.mode;
  let label, name, hint;
  let pass = '';

  if (mode === 'surprise') {
    label = 'Atenção, os dois';
    name = `${a} & ${b}`;
    hint = 'vale pros dois, sem fugir';
  } else if (mode === 'game') {
    label = 'Hora do mini-jogo';
    name = `${a} & ${b}`;
    hint = 'aperta em "bora jogar"';
  } else if (mode === 'sip') {
    label = 'Rodada';
    name = `${a} & ${b}`;
    hint = 'água também conta, viu';
  } else if (mode === 'both') {
    label = 'Os dois juntos';
    name = `${a} & ${b}`;
    hint = item.cat.hint || 'respondam ao mesmo tempo';
  } else {
    // a vez só alterna nas cartas individuais
    const turn = (state.firstTurn + state.turnCount++) % 2;
    const who = state.names[turn];
    const other = state.names[1 - turn];
    name = who;
    if (mode === 'challenge') {
      label = 'Desafio para';
      hint = `depois ${other} faz também`;
    } else {
      label = 'Responde primeiro';
      hint = `depois ${other} responde também`;
      // só nas perguntas que não falam de gole/trago por conta própria
      if (state.sips && !/gole|trago|brind/i.test(item.text)) pass = 'fugiu da pergunta? gole ou trago';
    }
  }

  $('#card-cat').textContent = item.cat.name;
  $('#card-icon').innerHTML = icon(item.cat.icon);
  const passEl = $('#card-pass');
  passEl.textContent = pass;
  passEl.hidden = !pass;
  const text = $('#card-text');
  text.textContent = item.text;
  text.classList.toggle('long', item.text.length > 105);
  $('#card-label').textContent = label;
  $('#card-name').textContent = name;
  $('#card-hint').textContent = hint;
  card.classList.toggle('challenge', mode === 'challenge');
  card.classList.toggle('surprise', mode === 'surprise');
  card.classList.toggle('sip', mode === 'sip');
  card.classList.toggle('game', mode === 'game');
}

function nextLabel() {
  const item = currentItem();
  if (item && item.game && !item.played) return 'Bora jogar';
  return state.index === state.deck.length - 1 ? 'Finalizar' : 'Próxima carta';
}

function playCardGame() {
  const item = currentItem();
  openMinigame(item.game, () => {
    item.played = true;
    btnNext.textContent = nextLabel();
  });
}

function updateProgress() {
  const total = state.deck.length;
  const n = Math.max(state.index + 1, 0);
  $('#progress-text').textContent = `${n} / ${total}`;
  $('#progress-bar').style.width = `${total ? (n / total) * 100 : 0}%`;
}

function currentItem() { return state.deck[state.index]; }
function isFav() { return state.favs.includes(currentItem()); }

function updateFav() {
  const on = state.index >= 0 && isFav();
  const [off, onIcon] = THEMES[state.visual].favIcons;
  btnFav.setAttribute('aria-pressed', String(on));
  btnFav.firstElementChild.textContent = on ? onIcon : off;
}

async function draw() {
  if (state.busy) return;
  state.busy = true;

  const first = state.index < 0;
  if (!first) {
    card.classList.add(state.index % 2 ? 'leave-l' : 'leave-r');
    btnFav.disabled = true;
    await wait(reduceMotion ? 0 : 520);
    // baralho todo: a tela vira a vibe da próxima carta enquanto a carta tá fora da tela
    const upcoming = state.deck[state.index + 1];
    if (state.theme === 'todo' && upcoming && upcoming.cat.theme) await switchVisual(upcoming.cat.theme);
    card.classList.remove('leave-l', 'leave-r', 'flipped', 'enter');
    card.classList.add('reset');
    void card.offsetWidth;
    card.classList.remove('reset');
  }

  state.index++;
  if (state.index >= state.deck.length) { state.busy = false; endGame(); return; }

  const item = currentItem();
  if (['surprise', 'sip'].includes(item.cat.mode) && !state.seen.includes(item.text)) {
    state.seen = [...state.seen, item.text].slice(-28); // as mais antigas voltam a ser "novas"
    persist();
  }
  fillCard(item);
  updateProgress();
  updateFav();
  stage.classList.toggle('last', state.index === state.deck.length - 1);

  if (!first) {
    card.classList.add('enter');
    await wait(reduceMotion ? 0 : 650);
  }

  card.classList.add('flipped');
  const surprise = ['surprise', 'sip', 'game'].includes(currentItem().cat.mode);
  setTimeout(() => burstAt(card, surprise ? 16 : 8, surprise), 250);
  card.setAttribute('aria-label', 'Carta virada');

  btnNext.textContent = nextLabel();
  btnFav.disabled = false;
  tip.textContent = state.index === 0 ? 'Curtiu uma pergunta? Toque na estrelinha pra guardar' : '';
  if (state.index === 0 && state.visual === 'romance') tip.textContent = 'Curtiu uma pergunta? Toque no coração pra guardar';

  await wait(reduceMotion ? 0 : 700);
  state.busy = false;
}

function advance() {
  if (!screens.game.classList.contains('active')) return;
  const item = currentItem();
  if (item && item.game && !item.played && !state.busy) { playCardGame(); return; }
  draw();
}

card.addEventListener('click', () => {
  if (state.index < 0) draw();
  else if (currentItem().game && !state.busy) playCardGame();
});
$('#btn-games').addEventListener('click', () => openMinigame('menu'));
btnNext.addEventListener('click', advance);

btnFav.addEventListener('click', () => {
  if (state.index < 0 || state.busy) return;
  const item = currentItem();
  if (isFav()) state.favs = state.favs.filter((f) => f !== item);
  else { state.favs.push(item); burstAt(btnFav, 10); }
  updateFav();
});

document.addEventListener('keydown', (e) => {
  if (!screens.game.classList.contains('active')) return;
  if (!$('#mg').hidden) return; // mini-jogo aberto
  if (e.target.closest('button, input')) return; // botões já tratam Enter/Espaço
  if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
    e.preventDefault();
    advance();
  }
});

$('#btn-quit').addEventListener('click', () => endGame());

/* =====================================================================
   Fim
   ===================================================================== */
const END_LINES = {
  leve: (n) => `vocês viraram ${n} ${n === 1 ? 'carta' : 'cartas'}. Já dá pra dizer que se conhecem um pouquinho mais.`,
  papo: (n) => `foram ${n} ${n === 1 ? 'carta' : 'cartas'} de papo bom. Do tipo que faz perder a hora.`,
  resenha: (n) => `${n} ${n === 1 ? 'carta' : 'cartas'} de pura resenha. Ninguém saiu ileso.`,
  romance: (n) => `vocês viraram ${n} ${n === 1 ? 'carta' : 'cartas'} juntos. Que venham os próximos encontros.`,
  brisa: (n) => `${n} ${n === 1 ? 'carta' : 'cartas'} depois, a conversa já foi longe. Agora bebam uma água e peçam a larica.`,
  todo: (n) => `${n} ${n === 1 ? 'carta' : 'cartas'} passando por todas as vibes. Teve de tudo um pouco.`
};

function endGame() {
  const played = Math.max(Math.min(state.index + 1, state.deck.length), 0);
  const [a, b] = state.names;
  $('#end-summary').textContent = played
    ? `${a} & ${b}, ${END_LINES[state.theme](played)}`
    : `${a} & ${b}, o baralho ficou esperando por vocês. Quando quiserem, é só voltar.`;

  const list = $('#fav-list');
  list.innerHTML = '';
  state.favs.forEach((item, i) => {
    const li = document.createElement('li');
    li.style.animationDelay = `${0.15 * i + 0.3}s`;
    li.textContent = item.text;
    const small = document.createElement('small');
    small.textContent = item.cat.name;
    li.appendChild(small);
    list.appendChild(li);
  });
  $('#fav-wrap').hidden = state.favs.length === 0;

  show('end');
  setTimeout(() => burstAt($('#screen-end .beat'), 14), 400);
}

$('#btn-again').addEventListener('click', startGame);
$('#btn-home').addEventListener('click', () => { applyTheme(state.theme); show('start'); });

/* =====================================================================
   Explosão de símbolos
   ===================================================================== */
const burstBox = $('#bursts');

function burstAt(el, n = 8, wild = false) {
  if (reduceMotion) return;
  const t = THEMES[state.visual];
  const glyphs = wild ? ['i:dice', '✦', '★', '!', '?'] : t.bursts;
  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span');
    s.className = 'burst';
    const g = pick(glyphs);
    if (g.startsWith('i:')) s.innerHTML = icon(g.slice(2));
    else s.textContent = g;
    const ang = (Math.PI * 2 * i) / n + Math.random() * 0.6;
    const dist = 60 + Math.random() * Math.min(r.width, 170);
    const color = pick(t.burstColors);
    s.style.left = `${cx}px`;
    s.style.top = `${cy}px`;
    s.style.color = color;
    s.style.textShadow = `0 0 8px ${color}`;
    s.style.setProperty('--dx', `${Math.cos(ang) * dist}px`);
    s.style.setProperty('--dy', `${Math.sin(ang) * dist - 30}px`);
    s.style.setProperty('--r', `${(Math.random() - 0.5) * 90}deg`);
    s.style.setProperty('--s', `${12 + Math.random() * 16}px`);
    burstBox.appendChild(s);
    s.addEventListener('animationend', () => s.remove());
  }
}

/* =====================================================================
   Fundo animado — cada tema tem seu efeito
   ===================================================================== */
const background = (function () {
  const canvas = $('#bg');
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, dpr = 1;
  let items = [];
  let fx = null;
  let shooting = null;
  let nextShot = 0;
  let running = false;

  function sparkle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.quadraticCurveTo(x, y, x, y + r);
    ctx.quadraticCurveTo(x, y, x - r, y);
    ctx.quadraticCurveTo(x, y, x, y - r);
    ctx.fill();
  }

  const FX = {
    // bolhas de luz subindo + brilhinhos
    leve: {
      density: 26000, min: 16, max: 40,
      make(scatter) {
        const r = rand(4, 18);
        return {
          x: rand(0, w), y: scatter ? rand(0, h) : h + r * 2, r,
          vy: rand(0.15, 0.45), sway: rand(10, 30), ph: rand(0, 6.28),
          a: rand(0.14, 0.32), star: Math.random() < 0.3,
          c: pick(['255,122,89', '255,166,48', '255,196,160', '95,207,180'])
        };
      },
      step(p) { p.ph += 0.01; p.y -= p.vy; p.x += Math.sin(p.ph) * p.sway / 150; return p.y > -40; },
      draw(p, t) {
        if (p.star) {
          const a = (0.35 + 0.65 * Math.abs(Math.sin(t * 0.002 + p.ph))) * Math.min(1, p.a * 2.6);
          sparkle(p.x, p.y, p.r * 0.55, `rgba(${p.c},${a})`);
          return;
        }
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, `rgba(${p.c},${p.a})`);
        g.addColorStop(1, `rgba(${p.c},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.28);
        ctx.fill();
      }
    },

    // céu estrelado piscando + estrela cadente
    papo: {
      density: 9000, min: 60, max: 160,
      make(scatter) {
        return {
          x: rand(0, w), y: scatter ? rand(0, h) : -4, r: rand(0.4, 1.7),
          ph: rand(0, 6.28), sp: rand(0.0008, 0.0025), a: rand(0.35, 0.95),
          gold: Math.random() < 0.15
        };
      },
      step(p) { p.y += 0.04; p.x += 0.01; return p.y < h + 4; },
      draw(p, t) {
        const a = p.a * (0.35 + 0.65 * Math.abs(Math.sin(t * p.sp + p.ph)));
        const c = p.gold ? `rgba(242,212,138,${a})` : `rgba(230,236,255,${a})`;
        if (p.r > 1.4) sparkle(p.x, p.y, p.r * 2.6, c);
        else { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill(); }
      },
      extra(t) {
        if (!shooting && t > nextShot) {
          shooting = { x: rand(w * 0.2, w), y: rand(0, h * 0.4), vx: -rand(7, 11), vy: rand(2.5, 4), life: 1 };
        }
        if (!shooting) return;
        const s = shooting;
        s.x += s.vx; s.y += s.vy; s.life -= 0.018;
        const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 12, s.y - s.vy * 12);
        g.addColorStop(0, `rgba(255,255,255,${s.life})`);
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 12, s.y - s.vy * 12);
        ctx.stroke();
        if (s.life <= 0) { shooting = null; nextShot = t + rand(3500, 8000); }
      }
    },

    // confete caindo
    resenha: {
      density: 24000, min: 22, max: 60,
      make(scatter) {
        return {
          x: rand(0, w), y: scatter ? rand(0, h) : -20,
          w: rand(5, 10), h: rand(9, 15), vy: rand(0.7, 1.6), vx: rand(-0.3, 0.3),
          rot: rand(0, 6.28), vr: rand(-0.05, 0.05), ph: rand(0, 6.28), circle: Math.random() < 0.2,
          c: pick(['#ffd23f', '#ff4fa3', '#3ddbd9', '#b48cff', '#ffffff'])
        };
      },
      step(p) { p.y += p.vy; p.x += p.vx + Math.sin(p.ph) * 0.4; p.rot += p.vr; p.ph += 0.05; return p.y < h + 20; },
      draw(p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(1, Math.cos(p.ph));
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = p.c;
        if (p.circle) { ctx.beginPath(); ctx.arc(0, 0, p.w * 0.5, 0, 6.28); ctx.fill(); }
        else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    },

    // pétalas caindo + corações subindo
    romance: {
      density: 30000, min: 18, max: 52,
      make(scatter) {
        const heart = Math.random() < 0.25;
        return {
          heart,
          x: rand(0, w), y: scatter ? rand(0, h) : (heart ? h + 30 : -30),
          size: heart ? rand(5, 14) : rand(6, 15), speed: heart ? rand(0.2, 0.65) : rand(0.25, 0.85),
          sway: rand(15, 50), ph: rand(0, 6.28), rot: rand(0, 6.28), spin: rand(-0.01, 0.01),
          a: heart ? rand(0.12, 0.37) : rand(0.25, 0.65),
          c: pick(['240,138,160', '255,190,205', '217,87,122', '255,217,223'])
        };
      },
      step(p) {
        p.ph += 0.008; p.rot += p.spin;
        p.y += p.heart ? -p.speed : p.speed;
        p.x += Math.sin(p.ph) * p.sway / 120;
        return p.heart ? p.y > -30 : p.y < h + 30;
      },
      draw(p, t) {
        const s = p.size;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.beginPath();
        if (p.heart) {
          ctx.rotate(Math.sin(p.ph) * 0.25);
          ctx.shadowColor = `rgba(${p.c},.7)`;
          ctx.shadowBlur = 12;
          ctx.moveTo(0, s * 0.35);
          ctx.bezierCurveTo(-s * 1.1, -s * 0.4, -s * 0.5, -s * 1.1, 0, -s * 0.4);
          ctx.bezierCurveTo(s * 0.5, -s * 1.1, s * 1.1, -s * 0.4, 0, s * 0.35);
        } else {
          ctx.rotate(p.rot);
          ctx.scale(0.45 + 0.55 * Math.abs(Math.cos(t * 0.0012 + p.ph)), 1);
          ctx.moveTo(0, -s);
          ctx.bezierCurveTo(s * 0.95, -s * 0.55, s * 0.8, s * 0.75, 0, s);
          ctx.bezierCurveTo(-s * 0.8, s * 0.75, -s * 0.95, -s * 0.55, 0, -s);
        }
        ctx.fill();
        ctx.restore();
      }
    },

    // folhinhas caindo + fumacinha subindo
    brisa: {
      density: 30000, min: 16, max: 44,
      make(scatter) {
        if (Math.random() < 0.28) {
          return {
            smoke: true, x: rand(0, w), y: scatter ? rand(0, h) : h + 80,
            r: rand(30, 70), vy: rand(0.15, 0.35), grow: rand(0.04, 0.12), a: rand(0.025, 0.06), ph: rand(0, 6.28)
          };
        }
        return {
          x: rand(0, w), y: scatter ? rand(0, h) : -30, s: rand(8, 17),
          vy: rand(0.3, 0.75), sway: rand(15, 45), ph: rand(0, 6.28),
          rot: rand(-0.6, 0.6), spin: rand(-0.008, 0.008), a: rand(0.25, 0.6),
          c: pick(['120,200,90', '155,225,93', '86,165,78', '198,240,107'])
        };
      },
      step(p) {
        if (p.smoke) {
          p.y -= p.vy; p.r += p.grow; p.ph += 0.006; p.x += Math.sin(p.ph) * 0.3;
          return p.y + p.r > -10;
        }
        p.ph += 0.009; p.y += p.vy; p.x += Math.sin(p.ph) * p.sway / 120; p.rot += p.spin;
        return p.y < h + 30;
      },
      draw(p, t) {
        if (p.smoke) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          g.addColorStop(0, `rgba(225,240,225,${p.a})`);
          g.addColorStop(1, 'rgba(225,240,225,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, 6.28);
          ctx.fill();
          return;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot + Math.sin(p.ph) * 0.3);
        ctx.scale(0.55 + 0.45 * Math.abs(Math.cos(t * 0.001 + p.ph)), 1);
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        LEAFLETS.forEach(([deg, k]) => {
          const len = p.s * k;
          ctx.save();
          ctx.rotate((deg * Math.PI) / 180);
          ctx.beginPath();
          ctx.ellipse(0, -len / 2, len * 0.17, len / 2, 0, 0, 6.28);
          ctx.fill();
          ctx.restore();
        });
        ctx.fillRect(-0.7, 0, 1.4, p.s * 0.45);
        ctx.restore();
      }
    }
  };

  function populate() {
    if (!fx) return;
    const n = Math.round(Math.max(fx.min, Math.min((w * h) / fx.density, fx.max)));
    items = Array.from({ length: n }, () => fx.make(true));
    shooting = null;
    nextShot = performance.now() + 2500;
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    populate();
    if (reduceMotion) still();
  }

  function still() {
    ctx.clearRect(0, 0, w, h);
    items.forEach((p) => fx.draw(p, 0));
  }

  function frame(t) {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < items.length; i++) {
      const p = items[i];
      if (fx.step(p)) fx.draw(p, t);
      else items[i] = fx.make(false);
    }
    if (fx.extra) fx.extra(t);
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize);

  return {
    setTheme(id) {
      fx = FX[id];
      if (!w) resize(); else populate();
      if (reduceMotion) { still(); return; }
      if (!running) { running = true; requestAnimationFrame(frame); }
    }
  };
})();

if (!state.sips && state.theme === 'brisa') state.theme = 'leve';
applyTheme(state.theme);
updateSipsUI();
