// Dibujos sencillos de cada ejercicio (muñeco de palitos).
// Lienzo de 120 x 100; el suelo está en y = 92.
// Tipos: c = cabeza, l = cuerpo, m = mueble (línea), R = mueble (rectángulo),
// E = mueble (óvalo), w = pesa, a = flecha, d = raya del suelo.
'use strict';

const ENCIMERA = [['R', 92, 50, 26, 42], ['m', 88, 50, 120, 50]];
const SILLA = [['m', 18, 62, 44, 62], ['m', 18, 62, 18, 30], ['m', 20, 62, 20, 92], ['m', 42, 62, 42, 92]];
const SILLA_SENTADA = [['m', 34, 62, 60, 62], ['m', 34, 62, 34, 30], ['m', 36, 62, 36, 92], ['m', 58, 62, 58, 92]];
// Muñeco sentado en SILLA_SENTADA, mirando a la derecha.
const SENTADA = [['c', 46, 20, 7], ['l', 46, 27, 46, 60], ['l', 46, 60, 70, 60], ['l', 70, 60, 70, 92]];

const DIBUJOS = {
  'Marchar en el sitio': [
    ...ENCIMERA,
    ['c', 60, 18, 7], ['l', 60, 25, 60, 56],
    ['l', 60, 56, 60, 92], ['l', 60, 56, 74, 64], ['l', 74, 64, 72, 80],
    ['l', 60, 32, 50, 48], ['l', 60, 32, 72, 44],
    ['a', 80, 78, 80, 62],
  ],
  'Boxeo de sombra suave': [
    ['c', 50, 18, 7], ['l', 50, 25, 50, 56],
    ['l', 50, 56, 42, 92], ['l', 50, 56, 60, 92],
    ['l', 50, 32, 84, 32], ['l', 50, 32, 60, 42], ['l', 60, 42, 58, 30],
    ['a', 90, 26, 106, 26], ['a', 90, 38, 102, 38],
  ],
  'Sentarse y levantarse de la silla': [
    ...SILLA,
    ['c', 52, 22, 7], ['l', 50, 29, 44, 58],
    ['l', 44, 58, 66, 62], ['l', 66, 62, 62, 92],
    ['l', 49, 34, 68, 42], ['w', 66, 38, 8, 8],
    ['a', 88, 70, 88, 40],
  ],
  'Subir a un escalón': [
    ['R', 56, 76, 50, 16], ['m', 30, 30, 112, 30],
    ['c', 46, 18, 7], ['l', 46, 25, 46, 54],
    ['l', 46, 54, 62, 62], ['l', 62, 62, 64, 76], ['l', 46, 54, 42, 92],
    ['l', 46, 32, 60, 30],
    ['a', 84, 70, 84, 50],
  ],
  'Zancada quieta': [
    ...ENCIMERA,
    ['c', 58, 18, 7], ['l', 58, 25, 58, 56],
    ['l', 58, 56, 72, 72], ['l', 72, 72, 74, 92],
    ['l', 58, 56, 46, 82], ['l', 46, 82, 32, 90],
    ['l', 58, 32, 88, 50],
    ['a', 22, 60, 22, 80],
  ],
  'Puente de glúteos': [
    ['c', 12, 84, 6], ['l', 18, 86, 58, 66],
    ['l', 58, 66, 82, 62], ['l', 82, 62, 86, 92],
    ['l', 20, 88, 44, 90],
    ['a', 58, 58, 58, 40],
  ],
  'Pierna al lado y atrás con tobillera': [
    ['R', 2, 50, 22, 42], ['m', 0, 50, 28, 50],
    ['c', 56, 18, 7], ['l', 56, 25, 56, 56],
    ['l', 56, 56, 54, 92], ['l', 56, 56, 82, 84],
    ['w', 80, 80, 8, 8],
    ['l', 56, 32, 26, 50], ['l', 56, 32, 66, 50],
    ['a', 92, 70, 106, 60],
  ],
  'Puntillas con peso': [
    ...ENCIMERA,
    ['c', 60, 14, 7], ['l', 60, 21, 60, 52],
    ['l', 60, 52, 58, 86], ['l', 58, 86, 66, 92],
    ['l', 60, 30, 88, 50],
    ['a', 40, 80, 40, 56],
  ],
  'Remo con goma': [
    ...SILLA_SENTADA, ...SENTADA,
    ['R', 104, 8, 10, 84],
    ['l', 46, 34, 34, 44], ['l', 34, 44, 52, 46],
    ['d', 52, 46, 104, 46],
    ['a', 86, 36, 66, 36],
  ],
  'Pájaro-perro': [
    ['c', 88, 46, 6], ['l', 42, 58, 78, 58],
    ['l', 74, 58, 74, 92],
    ['l', 42, 58, 42, 90], ['l', 42, 90, 30, 90],
    ['l', 78, 58, 112, 60],
    ['l', 42, 58, 10, 54],
  ],
  'Levantar el pecho tumbada boca abajo': [
    ['E', 54, 88, 12, 5],
    ['l', 8, 88, 46, 88], ['l', 46, 88, 76, 78],
    ['c', 84, 74, 6],
    ['l', 70, 80, 60, 90],
    ['a', 98, 82, 98, 62],
  ],
  'Espalda contra la pared': [
    ['m', 30, 4, 30, 92], ['m', 26, 4, 26, 92],
    ['c', 40, 18, 7], ['l', 38, 26, 38, 56],
    ['l', 38, 56, 40, 92],
    ['l', 38, 32, 52, 28], ['l', 52, 28, 50, 12],
    ['a', 72, 50, 52, 50],
  ],
  'Flexiones en la encimera': [
    ...ENCIMERA,
    ['c', 80, 30, 7], ['l', 74, 38, 30, 90],
    ['l', 72, 40, 82, 52], ['l', 82, 52, 92, 50],
    ['a', 56, 40, 70, 30],
  ],
  'Bíceps con mancuernas': [
    ...SILLA_SENTADA, ...SENTADA,
    ['l', 46, 34, 48, 52], ['l', 48, 52, 60, 38],
    ['w', 58, 32, 8, 8],
    ['a', 76, 54, 70, 36],
  ],
  'Subir los brazos por delante': [
    ...SILLA_SENTADA, ...SENTADA,
    ['l', 46, 34, 84, 34], ['w', 84, 30, 8, 8],
    ['a', 100, 60, 100, 38],
  ],
  'A la pata coja': [
    ...ENCIMERA,
    ['c', 60, 18, 7], ['l', 60, 25, 60, 56],
    ['l', 60, 56, 60, 92], ['l', 60, 56, 64, 72], ['l', 64, 72, 50, 76],
    ['l', 60, 32, 88, 50], ['l', 60, 32, 46, 48],
  ],
  'Andar en línea': [
    ['d', 6, 92, 114, 92],
    ['c', 58, 18, 7], ['l', 58, 25, 58, 56],
    ['l', 58, 56, 48, 92], ['l', 58, 56, 70, 92],
    ['l', 58, 32, 48, 50], ['l', 58, 32, 68, 50],
    ['a', 84, 70, 104, 70],
  ],
  'Pasar el peso de un pie a otro': [
    ['c', 60, 18, 7], ['l', 60, 25, 60, 56],
    ['l', 60, 56, 46, 92], ['l', 60, 56, 74, 92],
    ['l', 60, 32, 48, 50], ['l', 60, 32, 72, 50],
    ['a', 50, 66, 30, 66], ['a', 70, 66, 90, 66],
  ],
};

// Crea el dibujo como SVG, sin usar innerHTML.
function dibujo(nombre) {
  const formas = DIBUJOS[nombre];
  if (!formas) return null;
  const NS = 'http://www.w3.org/2000/svg';
  const s = (tag, attrs) => {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    return e;
  };
  const svg = s('svg', { viewBox: '0 0 120 100', class: 'dibujo', 'aria-hidden': 'true' });
  svg.append(s('line', { class: 'suelo', x1: 2, y1: 92, x2: 118, y2: 92 }));
  for (const [t, a, b, c, d] of formas) {
    if (t === 'c') svg.append(s('circle', { class: 'cuerpo', cx: a, cy: b, r: c }));
    else if (t === 'l') svg.append(s('line', { class: 'cuerpo', x1: a, y1: b, x2: c, y2: d }));
    else if (t === 'm') svg.append(s('line', { class: 'mueble', x1: a, y1: b, x2: c, y2: d }));
    else if (t === 'R') svg.append(s('rect', { class: 'mueble', x: a, y: b, width: c, height: d, rx: 2 }));
    else if (t === 'E') svg.append(s('ellipse', { class: 'mueble', cx: a, cy: b, rx: c, ry: d }));
    else if (t === 'w') svg.append(s('rect', { class: 'pesa', x: a, y: b, width: c, height: d, rx: 2 }));
    else if (t === 'd') svg.append(s('line', { class: 'raya', x1: a, y1: b, x2: c, y2: d }));
    else if (t === 'a') {
      const ang = Math.atan2(d - b, c - a);
      const punta = (g) => `${c - 7 * Math.cos(ang - g)},${d - 7 * Math.sin(ang - g)}`;
      svg.append(
        s('line', { class: 'flecha', x1: a, y1: b, x2: c, y2: d }),
        s('polyline', { class: 'flecha', points: `${punta(0.5)} ${c},${d} ${punta(-0.5)}` }),
      );
    }
  }
  return svg;
}
