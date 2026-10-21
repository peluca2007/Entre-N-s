'use strict';

/* =====================================================================
   Ícones desenhados à mão (SVG 24×24, traço na cor do tema).
   Os baralhos em js/questions.js apontam pra estes nomes no campo `icon`.
   ===================================================================== */
const DOT = (cx, cy, r = 1.1) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="currentColor" stroke="none"/>`;

// folha de 7 pontas: [ângulo em graus, tamanho relativo]
const LEAFLETS = [[0, 1], [-28, 0.85], [28, 0.85], [-58, 0.65], [58, 0.65], [-88, 0.38], [88, 0.38]];

function leafSvg() {
  const L = 13, bx = 12, by = 17;
  const blades = LEAFLETS.map(([a, k]) => {
    const len = L * k;
    return `<ellipse cx="${bx}" cy="${by - len / 2}" rx="${(len * 0.17).toFixed(2)}" ry="${(len / 2).toFixed(2)}" transform="rotate(${a} ${bx} ${by})"/>`;
  }).join('');
  return `<g fill="currentColor" fill-opacity=".18">${blades}</g><path d="M12 17v5"/>`;
}

const ICONS = {
  // temas
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M18 3.2v3M16.5 4.7h3"/>',
  bolt: '<path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12l1-8z"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>',
  leaf: leafSvg(),

  // baralhos
  cube: '<path d="M12 2.8 20 7.2v9.6L12 21.2 4 16.8V7.2z"/><path d="M4 7.2l8 4.4 8-4.4M12 11.6v9.6"/>',
  split: '<path d="M16 3h5v5M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.2-2.9L3 3M15 9l6-6"/>',
  home: '<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>',
  question: '<circle cx="12" cy="12" r="9"/><path d="M9.3 9.2a2.8 2.8 0 0 1 5.4 1c0 1.9-2.7 2.4-2.7 4"/>' + DOT(12, 17.2),
  mirror: '<ellipse cx="12" cy="9.5" rx="5.5" ry="7"/><path d="M12 16.5V21M8.5 21h7M9.6 8l2-2M9.6 11l4-4"/>',
  photo: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><rect x="6.5" y="5.5" width="11" height="10" rx=".5"/><path d="M6.5 13.5l3-3 3 3 2-2 3 3"/>',
  star: '<path d="M12 3.2l2.6 5.5 6 .8-4.4 4.1 1.1 5.9L12 16.6l-5.3 2.9 1.1-5.9-4.4-4.1 6-.8z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/>' + DOT(12, 12, 1.4),
  oops: '<circle cx="12" cy="12" r="9"/><path d="M7.8 8.6l2 1.2-2 1.2M16.2 8.6l-2 1.2 2 1.2M8 15.6c.9-.9 1.8-.9 2.7 0s1.8.9 2.6 0 1.8-.9 2.7 0"/>',
  spiral: '<path d="M12 12a1.5 1.5 0 0 1 3 0 3 3 0 0 1-6 0 4.5 4.5 0 0 1 9 0 6 6 0 0 1-12 0 7.5 7.5 0 0 1 15 0"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>',
  wink: '<circle cx="12" cy="12" r="9"/><path d="M7.8 10h2.8M8.5 14.5a4.5 4.5 0 0 0 7 0"/>' + DOT(15.3, 10),
  chat: '<path d="M4 4.5h10a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5H8.5l-3.5 3v-3H4A1.5 1.5 0 0 1 2.5 12V6A1.5 1.5 0 0 1 4 4.5z"/><path d="M18 9h1.5A1.5 1.5 0 0 1 21 10.5v5a1.5 1.5 0 0 1-1.5 1.5h-.5v2.5L16 17h-4.5a1.5 1.5 0 0 1-1.5-1.5"/>',
  cheers: '<g transform="rotate(7 8 19)"><path d="M5.5 5h5v3.5a2.5 2.5 0 0 1-5 0zM8 11v8M6 19h4"/></g><g transform="rotate(-7 16 19)"><path d="M13.5 5h5v3.5a2.5 2.5 0 0 1-5 0zM16 11v8M14 19h4"/></g><path d="M12 1.2v1.6M9.8 2l.7 1M14.2 2l-.7 1"/>',
  flame: '<path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.3 2.3-5.2 3.3-8 .9 1.6 2 2.4 2.7 2.6.7-2.8 2.1-5.1 4.5-6.4-.3 2.6.8 4.4 2.1 6 1 1.3 1.4 2.8 1.4 4.6 0 4.6-2.6 7.4-6.5 7.4z"/><path d="M12 21c-1.6 0-2.7-1.2-2.7-2.8 0-1.8 1.6-2.7 2.2-4.2 1.4 1.1 3.2 2.4 3.2 4.3 0 1.6-1.1 2.7-2.7 2.7z"/>',
  glass: '<path d="M7 3h10l-1 6.5a4 4 0 0 1-8 0z"/><path d="M7.5 6.5h9M12 13.5V20M8.5 20h7"/>',
  cloud: '<path d="M7 19a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 9.5a4.75 4.75 0 0 1 .5 9.5z"/><path d="M10 6.5c0-1.2 1.2-1.6 1.2-2.8M13.6 6c0-1 1-1.3 1-2.3"/>',
  pizza: '<path d="M12 21.5 3.5 6.5a17 17 0 0 1 17 0z"/><path d="M5 9.2a14.5 14.5 0 0 1 14 0"/>' + DOT(10, 12, 1.1) + DOT(14.2, 13.2, 1) + DOT(12, 17, .9),
  bottle: '<path d="M10 2.5h4M10.5 2.5v5c0 1-3 2.3-3 5V20a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5v-7.5c0-2.7-3-4-3-5v-5"/><path d="M7.5 13.5h9M7.5 18h9"/>',

  // mini-jogos
  palette: '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.7 1.7-1.7H16a5 5 0 0 0 5-5C21 6.4 17 3 12 3z"/>' + DOT(7.5, 11.5) + DOT(9.6, 7.4) + DOT(14.4, 7.2) + DOT(17, 11),
  dial: '<path d="M3.5 17a8.5 8.5 0 1 1 17 0"/><path d="M12 17l4-5.5M5.6 11.5l1.3.8M12 8.5V10M18.4 11.5l-1.3.8"/>' + DOT(12, 17, 1.4),

  // cartas especiais
  dice: '<rect x="3.5" y="3.5" width="17" height="17" rx="3.5"/>' + DOT(8.3, 8.3, 1.25) + DOT(15.7, 8.3, 1.25) + DOT(12, 12, 1.25) + DOT(8.3, 15.7, 1.25) + DOT(15.7, 15.7, 1.25)
};

function icon(name, cls = '') {
  const body = ICONS[name] || ICONS.star;
  return `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`;
}
