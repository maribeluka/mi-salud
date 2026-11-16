// Mi Salud: toda la información se guarda solo en este teléfono (localStorage).
// No se envía nada a ningún servidor.
'use strict';

const CLAVE = 'mi-salud-v1';
const ML_VASO = 250;

// ---------- Guardar y leer ----------
function vacio() {
  return { perfil: null, dias: {}, pesos: [], metaPasos: 10000 };
}
function cargar() {
  try {
    const d = JSON.parse(localStorage.getItem(CLAVE));
    return d && typeof d === 'object' ? { ...vacio(), ...d } : vacio();
  } catch {
    return vacio();
  }
}
let datos = cargar();
function guardar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(datos));
  } catch {
    alert('No se ha podido guardar. Revisa que Safari no esté en modo privado.');
  }
}

// ---------- Utilidades ----------
function hoyClave(f = new Date()) {
  const y = f.getFullYear();
  const m = String(f.getMonth() + 1).padStart(2, '0');
  const d = String(f.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
function dia(clave = hoyClave()) {
  if (!datos.dias[clave]) datos.dias[clave] = { comidas: [], vasos: 0, pasos: null, kcalReloj: null, hechos: [] };
  return datos.dias[clave];
}
function num(v, min, max) {
  const n = Number(String(v).replace(',', '.'));
  if (!Number.isFinite(n) || n < min || n > max) return null;
  return n;
}
// Crea elementos sin usar innerHTML: el texto nunca se interpreta como código.
function el(tag, attrs = {}, ...hijos) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') e.className = v;
    else if (k === 'style') e.style.cssText = v; // por JS, permitido por la política de seguridad
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v === true ? '' : v);
  }
  for (const h of hijos.flat()) {
    if (h === null || h === undefined || h === false) continue;
    e.append(h instanceof Node ? h : document.createTextNode(String(h)));
  }
  return e;
}
// Título de bloque con su dibujo en un cuadradito de color.
function cabeza(emoji, texto, id, tono) {
  return el('div', { class: 'titulo-bloque' },
    el('span', { class: `icono tono-${tono}`, 'aria-hidden': 'true' }, emoji),
    el('h2', { id }, texto));
}
function formato(n) {
  return Math.round(n).toLocaleString('es-ES');
}

// ---------- Cálculos (fórmula de Mifflin-St Jeor, mujer) ----------
function objetivos() {
  const p = datos.perfil;
  if (!p) return null;
  const peso = ultimoPeso() ?? p.peso;
  const basal = 10 * peso + 6.25 * p.altura - 5 * p.edad - 161;
  const gasto = basal * 1.375; // actividad ligera
  let kcal = Math.round((gasto - 400) / 50) * 50; // unos 400 de menos: medio kilo por semana
  kcal = Math.max(kcal, Math.ceil(basal / 50) * 50, 1300);
  const prot = Math.round((peso * 1.3) / 5) * 5; // proteína alta para músculo y hueso
  const vasos = Math.max(6, Math.round((peso * 30) / ML_VASO));
  return { kcal, prot, vasos, basal: Math.round(basal) };
}
function ultimoPeso() {
  const l = datos.pesos;
  return l.length ? l[l.length - 1].kg : null;
}

// ---------- Navegación ----------
const vista = document.getElementById('vista');
const titulo = document.getElementById('titulo');
const dialogo = document.getElementById('dialogo');
const VISTAS = { hoy: 'Hoy', recetas: 'Recetas', ejercicios: 'Ejercicios', progreso: 'Progreso' };
let actual = 'hoy';

document.querySelectorAll('.pestanas button').forEach(b =>
  b.addEventListener('click', () => ir(b.dataset.vista)),
);
function ir(nombre) {
  actual = nombre;
  document.querySelectorAll('.pestanas button').forEach(b => {
    if (b.dataset.vista === nombre) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  });
  pintar();
  window.scrollTo(0, 0);
}
function pintar() {
  const f = new Date();
  document.getElementById('fecha').textContent = f.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  const h = f.getHours();
  const saludos = { hoy: h < 13 ? '¡Buenos días! 🌿' : h < 21 ? '¡Buenas tardes! 🌿' : '¡Buenas noches! 🌙', recetas: 'Cocina de Asturias, ligera', ejercicios: 'Despacio y con cuidado', progreso: 'Paso a paso se llega' };
  document.getElementById('saludo').textContent = datos.perfil ? saludos[actual] : 'Vamos a empezar';
  if (!datos.perfil) {
    titulo.textContent = 'Bienvenida';
    vista.replaceChildren(pantallaPerfil(true));
    return;
  }
  titulo.textContent = VISTAS[actual];
  const pantallas = { hoy: pantallaHoy, recetas: pantallaRecetas, ejercicios: pantallaEjercicios, progreso: pantallaProgreso };
  vista.replaceChildren(...[].concat(pantallas[actual]()));
}

// ---------- Mis datos ----------
function pantallaPerfil(primeraVez) {
  const p = datos.perfil || {};
  const form = el('form', { class: 'bloque', onsubmit: e => {
    e.preventDefault();
    const f = new FormData(form);
    const edad = num(f.get('edad'), 18, 110);
    const altura = num(f.get('altura'), 120, 220);
    const peso = num(f.get('peso'), 30, 250);
    const meta = num(f.get('meta'), 30, 250);
    const pasos = num(f.get('pasos'), 500, 30000);
    if (!edad || !altura || !peso || !meta || !pasos) {
      error.textContent = 'Revisa los números: edad en años, altura en centímetros y pesos en kilos.';
      return;
    }
    datos.perfil = { edad, altura, peso, meta };
    datos.metaPasos = Math.round(pasos);
    if (!datos.pesos.length) datos.pesos.push({ f: hoyClave(), kg: peso });
    guardar();
    actual = primeraVez ? 'hoy' : actual;
    pintar();
  } });
  const error = el('p', { class: 'permiso', role: 'alert' });
  form.append(
    cabeza(primeraVez ? '👋' : '🙋‍♀️', primeraVez ? 'Cuéntame un poco de ti' : 'Mis datos', null, 'sidra'),
    primeraVez && el('p', { class: 'suave' }, 'Con esto calculo tus calorías, tu proteína y tu agua. Se guarda solo en este teléfono.'),
    el('div', { class: 'dos' },
      el('label', {}, 'Edad', el('input', { name: 'edad', inputmode: 'numeric', required: true, value: p.edad ?? '' })),
      el('label', {}, 'Altura (cm)', el('input', { name: 'altura', inputmode: 'numeric', required: true, value: p.altura ?? '' })),
    ),
    el('div', { class: 'dos' },
      el('label', {}, 'Peso ahora (kg)', el('input', { name: 'peso', inputmode: 'decimal', required: true, value: p.peso ?? '' })),
      el('label', {}, 'Peso objetivo (kg)', el('input', { name: 'meta', inputmode: 'decimal', required: true, value: p.meta ?? '' })),
    ),
    el('label', {}, 'Pasos al día que quieres dar', el('input', { name: 'pasos', inputmode: 'numeric', required: true, value: datos.metaPasos ?? 10000 })),
    el('p', { class: 'suave' }, 'Puedes cambiarlo cuando quieras. Súbelo poco a poco, sin dolor en el talón.'),
    error,
    el('button', { class: 'boton ancho', type: 'submit' }, primeraVez ? 'Empezar' : 'Guardar mis datos'),
  );
  return form;
}

// ---------- Hoy ----------
function pantallaHoy() {
  const o = objetivos();
  const d = dia();
  const comido = d.comidas.reduce((s, c) => s + c.k, 0);
  const prot = d.comidas.reduce((s, c) => s + c.p, 0);
  const quedan = o.kcal - comido;
  const pasado = quedan < 0;
  const pct = Math.min(100, (comido / o.kcal) * 100);

  const calorias = el('section', { class: 'bloque franja-sidra', 'aria-labelledby': 't-cal' },
    cabeza('🔥', 'Calorías', 't-cal', 'sidra'),
    el('p', { class: 'frase-grande' + (pasado ? ' pasado' : '') },
      pasado ? `Te has pasado ${formato(-quedan)} kcal` : `Te quedan ${formato(quedan)} kcal`),
    el('div', { class: 'barra' + (pasado ? ' pasado' : ''), role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': o.kcal, 'aria-valuenow': comido, 'aria-label': 'Calorías comidas' },
      el('span', { style: `width:${pct}%` })),
    el('div', { class: 'cifras' },
      el('p', {}, el('b', {}, formato(comido)), el('span', {}, 'comidas')),
      el('p', {}, el('b', {}, formato(o.kcal)), el('span', {}, 'tu objetivo')),
      el('p', {}, el('b', {}, `${formato(prot)} g`), el('span', {}, `de ${o.prot} g de proteína`)),
    ),
  );

  const lista = el('ul', { class: 'lista' },
    d.comidas.length === 0
      ? el('li', {}, el('span', { class: 'suave' }, 'Todavía no has apuntado nada hoy.'))
      : d.comidas.map((c, i) => el('li', {},
          el('span', { class: 'texto' }, c.n),
          el('span', { class: 'kcal' }, `${formato(c.k)} kcal`, el('small', {}, `${formato(c.p)} g prot.`)),
          el('button', { class: 'quitar', type: 'button', 'aria-label': `Quitar ${c.n}`, onclick: () => {
            d.comidas.splice(i, 1); guardar(); pintar();
          } }, '✕'),
        )),
  );
  const comidas = el('section', { class: 'bloque', 'aria-labelledby': 't-com' },
    cabeza('🍽️', 'Lo que he comido', 't-com', 'prado'),
    lista,
    el('button', { class: 'boton ancho', type: 'button', onclick: abrirAnadirComida }, '+ Apuntar comida'),
  );

  const agua = el('section', { class: 'bloque franja-mar', 'aria-labelledby': 't-agua' },
    el('div', { class: 'fila' },
      cabeza('💧', 'Agua', 't-agua', 'mar'),
      el('p', { class: 'suave' }, `${d.vasos} de ${o.vasos} vasos · ${(d.vasos * ML_VASO / 1000).toLocaleString('es-ES')} l`),
    ),
    el('div', { class: 'vasos' },
      Array.from({ length: Math.max(o.vasos, d.vasos) }, (_, i) =>
        el('button', { class: 'vaso', type: 'button', 'aria-pressed': String(i < d.vasos), 'aria-label': `Vaso ${i + 1}`, onclick: () => {
          d.vasos = i < d.vasos ? i : i + 1; guardar(); pintar();
        } })),
    ),
    el('p', { class: 'suave' }, 'Toca un vaso cada vez que bebas uno (250 ml).'),
  );

  const formReloj = el('form', { class: 'bloque franja-prado', 'aria-labelledby': 't-reloj', onsubmit: e => {
    e.preventDefault();
    const f = new FormData(formReloj);
    const pasos = f.get('pasos') === '' ? null : num(f.get('pasos'), 0, 100000);
    const kcal = f.get('kcal') === '' ? null : num(f.get('kcal'), 0, 10000);
    d.pasos = pasos === null ? null : Math.round(pasos);
    d.kcalReloj = kcal === null ? null : Math.round(kcal);
    guardar(); pintar();
  } });
  const faltan = datos.metaPasos - (d.pasos ?? 0);
  formReloj.append(
    cabeza('👟', 'Pasos y reloj', 't-reloj', 'prado'),
    el('p', { class: d.pasos !== null && faltan <= 0 ? 'frase-grande' : '' },
      d.pasos === null ? `Tu objetivo: ${formato(datos.metaPasos)} pasos.`
        : faltan <= 0 ? '¡Objetivo de pasos conseguido! 🎉' : `Te faltan ${formato(faltan)} pasos.`),
    el('div', { class: 'dos' },
      el('label', {}, 'Pasos', el('input', { name: 'pasos', inputmode: 'numeric', value: d.pasos ?? '' })),
      el('label', {}, 'Kcal gastadas', el('input', { name: 'kcal', inputmode: 'numeric', value: d.kcalReloj ?? '' })),
    ),
    el('p', { class: 'suave' }, 'Cópialos de tu reloj al final del día. Las kcal del reloj son solo para que lo veas: no te suman comida.'),
    el('button', { class: 'boton claro ancho', type: 'submit' }, 'Guardar pasos'),
  );

  return [calorias, comidas, agua, formReloj, bloqueTension(d)];
}

// ---------- Tensión y pulso ----------
// La app no puede leer aparatos: se copian aquí los números del tensiómetro o del reloj.
function valorarTension(a, b) {
  if (a >= 180 || b >= 110) return { t: 'Muy alta. Siéntate, espera 5 minutos y repite. Si sigue así, llama hoy a tu médico; si además te duele el pecho, te cuesta respirar o ves mal, llama al 112.', mal: true };
  if (a >= 135 || b >= 85) return { t: 'Algo alta para medirla en casa. Repítela tras 5 minutos sentada. Si te sale así varios días, enséñaselo a tu médico.', mal: true };
  if (a < 90 || b < 60) return { t: 'Baja. Si notas mareo, siéntate y bebe agua. Coméntaselo a tu médico si se repite.', mal: true };
  return { t: 'Dentro de lo normal.', mal: false };
}
function bloqueTension(d) {
  const lista = d.tension || [];
  const error = el('p', { class: 'permiso', role: 'alert' });
  const form = el('form', { class: 'bloque franja-manzana', 'aria-labelledby': 't-tension', onsubmit: e => {
    e.preventDefault();
    const f = new FormData(form);
    const a = f.get('alta') === '' ? null : num(f.get('alta'), 60, 260);
    const b = f.get('baja') === '' ? null : num(f.get('baja'), 30, 160);
    const pul = f.get('pulso') === '' ? null : num(f.get('pulso'), 30, 220);
    const hayTension = f.get('alta') !== '' || f.get('baja') !== '';
    if ((hayTension && (a === null || b === null || b >= a)) || (f.get('pulso') !== '' && pul === null) || (!hayTension && pul === null)) {
      error.textContent = 'Revisa los números. Ejemplo: alta 125, baja 78, pulso 70. Puedes apuntar solo el pulso.';
      return;
    }
    const ahora = new Date();
    d.tension = [...lista, {
      h: `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}`,
      a: a === null ? null : Math.round(a), b: b === null ? null : Math.round(b), pul: pul === null ? null : Math.round(pul),
    }].slice(-20);
    guardar(); pintar();
  } });
  const ultima = [...lista].reverse().find(x => x.a !== null);
  const valor = ultima && valorarTension(ultima.a, ultima.b);
  form.append(
    cabeza('❤️', 'Tensión y pulso', 't-tension', 'manzana'),
    lista.length > 0 && el('ul', { class: 'lista' }, lista.map((x, i) => el('li', {},
      el('span', { class: 'suave' }, x.h),
      el('span', { class: 'texto' }, [x.a !== null && `${x.a}/${x.b}`, x.pul !== null && `${x.pul} latidos`].filter(Boolean).join(' · ')),
      el('button', { class: 'quitar', type: 'button', 'aria-label': `Quitar la medida de las ${x.h}`, onclick: () => {
        d.tension = lista.filter((_, j) => j !== i); guardar(); pintar();
      } }, '✕')))),
    valor && el('p', { class: valor.mal ? 'permiso' : 'series' }, valor.t),
    el('div', { class: 'tres' },
      el('label', {}, 'Alta', el('input', { name: 'alta', inputmode: 'numeric', placeholder: '125' })),
      el('label', {}, 'Baja', el('input', { name: 'baja', inputmode: 'numeric', placeholder: '78' })),
      el('label', {}, 'Pulso', el('input', { name: 'pulso', inputmode: 'numeric', placeholder: '70' })),
    ),
    error,
    el('button', { class: 'boton claro ancho', type: 'submit' }, 'Apuntar medida'),
    el('p', { class: 'suave' }, 'Mídela sentada, tras 5 minutos de reposo, con un tensiómetro de brazo. Copia aquí los números. Esto no sustituye a tu médico.'),
  );
  return form;
}

function sinTildes(t) {
  return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}
// Calorías y proteína de un alimento según cómo se cocina y cuántos gramos (en crudo).
function calcular(a, c, peso) {
  const parte = peso / a.r; // el aceite o el rebozado crecen con la ración
  return {
    k: Math.round((a.k * peso / 100 + c.k * parte) / 5) * 5,
    p: Math.round(a.p * peso / 100 + (c.p || 0) * parte),
  };
}

function abrirAnadirComida() {
  const buscar = el('input', { type: 'search', placeholder: 'Escribe: merluza, pollo, yogur…', 'aria-label': 'Nombre del alimento', autocomplete: 'off' });
  const gramos = el('input', { inputmode: 'numeric', placeholder: 'ración normal', 'aria-label': 'Gramos, si los sabes' });
  const opciones = el('div', { class: 'opciones' });
  const boton = a => el('button', { class: 'opcion', type: 'button', onclick: () => anadir(a) },
    el('span', {}, a.ver || a.n),
    el('span', { class: 'valores' }, el('b', {}, `${a.k} kcal`), el('span', {}, `${a.p} g prot.`)));
  const pintarOpciones = () => {
    const q = sinTildes(buscar.value.trim());
    if (!q) {
      // Sin nada escrito: la lista de nombres, para elegir con el dedo.
      opciones.replaceChildren(
        el('p', { class: 'grupo-alimento suave' }, 'Escribe el nombre arriba, o elige uno:'),
        ...ALIMENTOS.map(a => el('button', { class: 'opcion', type: 'button', onclick: () => {
          buscar.value = a.n; pintarOpciones(); opciones.scrollTop = 0;
        } }, el('span', {}, a.n), el('span', { class: 'suave' }, '›'))));
      return;
    }
    const g = gramos.value === '' ? null : num(gramos.value, 1, 2000);
    const hijos = [];
    // Alimentos que se cocinan: salen todas sus formas con las cuentas ya hechas.
    for (const a of ALIMENTOS.filter(a => sinTildes(`${a.n} ${a.o || ''}`).includes(q)).slice(0, 8)) {
      const peso = g ?? a.r;
      const cuanto = a.u && g === null ? a.u : `${formato(peso)} g ${a.seco ? 'en seco' : 'en crudo'}`;
      hijos.push(el('p', { class: 'grupo-alimento' }, el('b', {}, a.n), ` · ${cuanto}`));
      for (const c of COCINADOS[a.g]) {
        hijos.push(boton({ ...calcular(a, c, peso), ver: c.f.charAt(0).toUpperCase() + c.f.slice(1), n: `${a.n} ${c.f} (${cuanto})` }));
      }
    }
    const fijos = [
      ...ALIMENTOS_FIJOS,
      ...RECETAS.map(r => ({ n: `${r.nombre} (1 ración)`, k: r.kcal, p: r.prot })),
    ].filter(a => sinTildes(a.n).includes(q));
    if (fijos.length) hijos.push(el('p', { class: 'grupo-alimento' }, el('b', {}, 'Listos para tomar')), ...fijos.map(boton));
    if (!hijos.length) hijos.push(el('p', { class: 'grupo-alimento suave' }, 'No lo tengo en la lista. Escríbelo tú más abajo.'));
    opciones.replaceChildren(...hijos);
  };
  buscar.addEventListener('input', pintarOpciones);
  gramos.addEventListener('input', pintarOpciones);

  const nombre = el('input', { placeholder: 'Ej.: bocadillo de jamón' });
  const kcal = el('input', { inputmode: 'numeric', placeholder: 'kcal' });
  const prot = el('input', { inputmode: 'numeric', placeholder: 'g (si lo sabes)' });
  const error = el('p', { class: 'permiso', role: 'alert' });

  function anadir(a) {
    dia().comidas.push({ n: a.n.slice(0, 80), k: a.k, p: a.p || 0 });
    guardar();
    dialogo.close();
    pintar();
  }

  dialogo.replaceChildren(el('div', { class: 'dialogo-dentro' },
    el('div', { class: 'fila' },
      el('h2', {}, 'Apuntar comida'),
      el('button', { class: 'quitar', type: 'button', 'aria-label': 'Cerrar', onclick: () => dialogo.close() }, '✕')),
    el('label', {}, '¿Qué has comido?', buscar),
    el('label', {}, 'Gramos (solo si los has pesado)', gramos),
    el('p', { class: 'suave' }, 'Toca cómo lo has cocinado y se apuntan solas las calorías y la proteína.'),
    opciones,
    el('h3', {}, 'O escríbelo tú'),
    el('label', {}, 'Qué has comido', nombre),
    el('div', { class: 'dos' }, el('label', {}, 'Calorías', kcal), el('label', {}, 'Proteína', prot)),
    error,
    el('button', { class: 'boton ancho', type: 'button', onclick: () => {
      const k = num(kcal.value, 1, 5000);
      const p = prot.value === '' ? 0 : num(prot.value, 0, 300);
      if (!nombre.value.trim() || k === null || p === null) {
        error.textContent = 'Escribe qué has comido y sus calorías.';
        return;
      }
      anadir({ n: nombre.value.trim().slice(0, 80), k: Math.round(k), p: Math.round(p) });
    } }, 'Apuntar'),
  ));
  pintarOpciones();
  dialogo.showModal();
}

// ---------- Recetas ----------
let filtroRecetas = 'Todas';
function pantallaRecetas() {
  const tipos = ['Todas', 'Desayuno', 'Comida', 'Cena', 'Merienda', 'Postre'];
  const filtros = el('div', { class: 'filtros', role: 'group', 'aria-label': 'Tipo de receta' },
    tipos.map(t => el('button', { class: 'filtro', type: 'button', 'aria-pressed': String(t === filtroRecetas), onclick: () => {
      filtroRecetas = t; pintar();
    } }, t)));
  const lista = RECETAS.filter(r => filtroRecetas === 'Todas' || r.tipo.includes(filtroRecetas));
  return [
    filtros,
    ...lista.map(r => el('button', { class: 'bloque receta', type: 'button', onclick: () => abrirReceta(r) },
      el('span', { class: `plato tono-${tonoReceta(r)}`, 'aria-hidden': 'true' }, r.emoji),
      el('span', { class: 'tipo' }, r.tipo),
      el('h2', {}, r.nombre),
      el('span', { class: 'datos' },
        el('span', {}, `${r.kcal} kcal por ración`), el('span', {}, `${r.prot} g de proteína`), el('span', {}, `${r.min} min`)),
    )),
    el('p', { class: 'suave' }, 'Las calorías son aproximadas.'),
  ];
}
function tonoReceta(r) {
  if (r.emoji === '🐟') return 'mar';
  if (/Desayuno|Merienda|Postre/.test(r.tipo)) return 'sidra';
  if (r.emoji === '🥩' || r.emoji === '🍗') return 'manzana';
  return 'prado';
}
function abrirReceta(r) {
  dialogo.replaceChildren(el('div', { class: 'dialogo-dentro' },
    el('div', { class: 'fila' },
      cabeza(r.emoji, r.nombre, 't-receta', tonoReceta(r)),
      el('button', { class: 'quitar', type: 'button', 'aria-label': 'Cerrar', onclick: () => dialogo.close() }, '✕')),
    el('p', { class: 'datos' },
      el('span', {}, `${r.kcal} kcal por ración`), el('span', {}, `${r.prot} g de proteína`),
      el('span', {}, `${r.min} min`), el('span', {}, `${r.raciones} ${r.raciones === 1 ? 'ración' : 'raciones'}`)),
    el('h3', {}, 'Ingredientes'),
    el('ul', { class: 'ingredientes' }, r.ing.map(i => el('li', {}, i))),
    el('h3', {}, 'Cómo se hace'),
    el('ol', { class: 'pasos' }, r.pasos.map(p => el('li', {}, p))),
    el('p', { class: 'nota' }, r.nota),
    el('button', { class: 'boton ancho', type: 'button', onclick: () => {
      dia().comidas.push({ n: `${r.nombre} (1 ración)`, k: r.kcal, p: r.prot });
      guardar(); dialogo.close(); ir('hoy');
    } }, 'Apuntar 1 ración en Hoy'),
  ));
  dialogo.showModal();
}

// ---------- Ejercicios ----------
function pantallaEjercicios() {
  const d = dia();
  const reglas = el('section', { class: 'bloque reglas', 'aria-labelledby': 't-reglas' },
    cabeza('⚠️', 'Antes de empezar', 't-reglas', 'manzana'),
    el('ul', {}, REGLAS.map(r => el('li', {}, r))),
  );
  const grupos = EJERCICIOS.map(g => el('section', { class: 'bloque', 'aria-label': g.grupo },
    cabeza(g.emoji, g.grupo, null, 'prado'),
    el('p', { class: 'suave' }, g.intro),
    g.lista.map(x => {
      const id = `${g.grupo}-${x.n}`;
      const caja = el('input', { type: 'checkbox', checked: d.hechos.includes(id), onchange: () => {
        const i = d.hechos.indexOf(id);
        if (i >= 0) d.hechos.splice(i, 1); else d.hechos.push(id);
        guardar();
      } });
      return el('div', { class: 'ejercicio' },
        el('h3', {}, x.n),
        dibujo(x.n),
        el('p', {}, x.c),
        el('p', { class: 'series' }, x.s),
        x.sube && el('p', { class: 'sube' }, el('b', {}, '📈 Cuando te resulte fácil: '), x.sube),
        x.ok && el('p', { class: 'permiso' }, '⚠️ ', x.ok),
        el('label', { class: 'hecho' }, caja, 'Hecho hoy'),
      );
    }),
  ));
  return [reglas, bloqueBaile(d), ...grupos];
}

// Vídeos de baile: se abren en YouTube (hace falta internet).
function bloqueBaile(d) {
  return el('section', { class: 'bloque franja-sidra', 'aria-labelledby': 't-baile' },
    cabeza('💃', 'Baile de 15 minutos', 't-baile', 'sidra'),
    el('p', { class: 'suave' }, 'Mueve todo el cuerpo con música. Elige uno distinto cada día. Se abre en YouTube.'),
    el('ul', { class: 'reglas-baile' }, REGLAS_BAILE.map(r => el('li', {}, r))),
    BAILES.map(v => {
      const id = `Baile-${v.id}`;
      const caja = el('input', { type: 'checkbox', checked: d.hechos.includes(id), onchange: () => {
        const i = d.hechos.indexOf(id);
        if (i >= 0) d.hechos.splice(i, 1); else d.hechos.push(id);
        guardar();
      } });
      return el('div', { class: 'ejercicio' },
        el('h3', {}, v.n),
        el('p', { class: 'datos' }, el('span', {}, `💃 ${v.estilo}`), el('span', {}, `🎵 ${v.musica}`), el('span', {}, `⏱️ ${v.min} min`)),
        v.nota && el('p', { class: 'suave' }, v.nota),
        el('a', { class: 'boton mar ancho', href: `https://www.youtube.com/watch?v=${v.id}`, target: '_blank', rel: 'noopener noreferrer' }, '▶ Ver el vídeo'),
        el('p', { class: 'suave' }, `Canal: ${v.canal}`),
        el('label', { class: 'hecho' }, caja, 'Hecho hoy'),
      );
    }),
    el('p', { class: 'permiso' }, '⚠️ Por el calcáneo, las vértebras y los mareos: enséñale un vídeo a tu fisio o traumatólogo antes de empezar.'),
  );
}

// ---------- Progreso ----------
function pantallaProgreso() {
  const p = datos.perfil;
  const o = objetivos();
  const actualKg = ultimoPeso() ?? p.peso;
  const perdido = p.peso - actualKg;
  const quedan = actualKg - p.meta;

  const pesoInput = el('input', { inputmode: 'decimal', placeholder: 'Ej.: 74,5', 'aria-label': 'Peso de hoy en kilos' });
  const error = el('p', { class: 'permiso', role: 'alert' });
  const peso = el('section', { class: 'bloque franja-prado', 'aria-labelledby': 't-peso' },
    cabeza('⚖️', 'Mi peso', 't-peso', 'prado'),
    el('p', { class: 'frase-grande' },
      quedan <= 0 ? '¡Has llegado a tu objetivo! 🎉' : `Te quedan ${quedan.toLocaleString('es-ES', { maximumFractionDigits: 1 })} kg`),
    el('p', { class: 'suave' },
      perdido > 0 ? `Llevas ${perdido.toLocaleString('es-ES', { maximumFractionDigits: 1 })} kg menos desde que empezaste.` : 'Pésate una vez por semana, en ayunas y el mismo día.'),
    grafica(),
    el('div', { class: 'dos' },
      pesoInput,
      el('button', { class: 'boton', type: 'button', onclick: () => {
        const kg = num(pesoInput.value, 30, 250);
        if (kg === null) { error.textContent = 'Escribe tu peso en kilos, por ejemplo 74,5.'; return; }
        const hoy = hoyClave();
        datos.pesos = datos.pesos.filter(x => x.f !== hoy);
        datos.pesos.push({ f: hoy, kg });
        datos.pesos.sort((a, b) => a.f.localeCompare(b.f));
        guardar(); pintar();
      } }, 'Apuntar'),
    ),
    error,
  );

  const plan = el('section', { class: 'bloque', 'aria-labelledby': 't-plan' },
    cabeza('🎯', 'Mi plan', 't-plan', 'sidra'),
    el('ul', { class: 'lista' },
      el('li', {}, el('span', { class: 'texto' }, 'Calorías al día'), el('b', {}, `${formato(o.kcal)} kcal`)),
      el('li', {}, el('span', { class: 'texto' }, 'Proteína al día'), el('b', {}, `${o.prot} g`)),
      el('li', {}, el('span', { class: 'texto' }, 'Agua al día'), el('b', {}, `${o.vasos} vasos`)),
      el('li', {}, el('span', { class: 'texto' }, 'Pasos al día'), el('b', {}, formato(datos.metaPasos))),
    ),
    el('p', { class: 'nota' }, 'Para tus huesos: toma lácteos o sardinas cada día (calcio) y pregunta a tu médico por la vitamina D. No bajes de estas calorías: perder peso muy deprisa también hace perder hueso y músculo.'),
  );

  const instalar = esIphoneSinInstalar() && el('section', { class: 'bloque aviso' },
    el('h2', {}, 'Ponla en tu pantalla de inicio'),
    el('p', {}, 'En Safari, toca el botón de compartir (el cuadrado con la flecha hacia arriba) y elige «Añadir a pantalla de inicio».'),
  );

  const copia = el('section', { class: 'bloque', 'aria-labelledby': 't-copia' },
    cabeza('💾', 'Copia de seguridad', 't-copia', 'mar'),
    el('p', { class: 'suave' }, 'Tus datos solo están en este teléfono. Guarda una copia de vez en cuando, por ejemplo en Archivos o en iCloud.'),
    el('button', { class: 'boton claro ancho', type: 'button', onclick: exportar }, 'Guardar una copia'),
    el('label', { class: 'boton claro ancho' }, 'Recuperar una copia',
      el('input', { type: 'file', accept: 'application/json,.json', class: 'oculto', onchange: e => importar(e.target.files[0]) })),
  );

  // Tensión de los últimos días, para enseñársela al médico.
  const medidas = Object.keys(datos.dias).sort().reverse().slice(0, 14)
    .flatMap(f => (datos.dias[f].tension || []).map(x => ({ f, ...x }))).slice(0, 14);
  const tension = el('section', { class: 'bloque', 'aria-labelledby': 't-tens-hist' },
    cabeza('❤️', 'Mi tensión y mi pulso', 't-tens-hist', 'manzana'),
    medidas.length === 0
      ? el('p', { class: 'suave' }, 'Cuando apuntes medidas en «Hoy», aquí verás las últimas para enseñárselas a tu médico.')
      : el('ul', { class: 'lista' }, medidas.map(x => el('li', {},
          el('span', { class: 'suave' }, `${x.f.slice(5).split('-').reverse().join('/')} ${x.h}`),
          el('span', { class: 'texto' }, x.a !== null ? `${x.a}/${x.b}` : '—'),
          el('b', {}, x.pul !== null ? `${x.pul} lat.` : '')))),
  );

  return [peso, plan, tension, instalar, pantallaPerfil(false), copia].filter(Boolean);
}

function grafica() {
  const l = datos.pesos.slice(-20);
  const meta = datos.perfil.meta;
  if (l.length < 2) return el('p', { class: 'suave' }, 'Cuando apuntes dos pesos verás aquí tu línea.');
  const W = 320, H = 150, m = 24;
  const kgs = l.map(x => x.kg).concat(meta);
  const max = Math.max(...kgs) + 1, min = Math.min(...kgs) - 1;
  const x = i => m + (i * (W - 2 * m)) / (l.length - 1);
  const y = kg => m + ((max - kg) * (H - 2 * m)) / (max - min);
  const NS = 'http://www.w3.org/2000/svg';
  const s = (tag, attrs, texto) => {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    if (texto) e.textContent = texto;
    return e;
  };
  const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, class: 'grafica', role: 'img', 'aria-label': `Peso: de ${l[0].kg} a ${l[l.length - 1].kg} kilos. Objetivo ${meta}.` });
  svg.append(
    s('line', { class: 'meta', x1: m, x2: W - m, y1: y(meta), y2: y(meta) }),
    s('text', { x: W - m, y: y(meta) - 6, 'text-anchor': 'end' }, `objetivo ${meta} kg`),
    s('polyline', { class: 'linea', points: l.map((p, i) => `${x(i)},${y(p.kg)}`).join(' ') }),
    ...l.map((p, i) => s('circle', { class: 'punto', cx: x(i), cy: y(p.kg), r: 4 })),
    s('text', { x: m, y: H - 4 }, l[0].f.slice(5).split('-').reverse().join('/')),
    s('text', { x: W - m, y: H - 4, 'text-anchor': 'end' }, l[l.length - 1].f.slice(5).split('-').reverse().join('/')),
  );
  return svg;
}

function esIphoneSinInstalar() {
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent);
  const instalada = window.navigator.standalone === true || matchMedia('(display-mode: standalone)').matches;
  return ios && !instalada;
}

function exportar() {
  const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
  const a = el('a', { href: URL.createObjectURL(blob), download: `mi-salud-copia-${hoyClave()}.json` });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
function importar(archivo) {
  if (!archivo) return;
  if (archivo.size > 5_000_000) { alert('Ese archivo es demasiado grande para ser una copia de Mi Salud.'); return; }
  archivo.text().then(t => {
    const limpio = limpiarCopia(JSON.parse(t));
    if (!confirm('Esto cambiará tus datos actuales por los de la copia. ¿Seguimos?')) return;
    datos = limpio;
    guardar(); pintar();
  }).catch(() => alert('Ese archivo no es una copia de Mi Salud.'));
}
// Solo acepta de una copia los datos con la forma esperada; lo demás se ignora.
function limpiarCopia(d) {
  if (!d || typeof d !== 'object' || typeof d.dias !== 'object' || !Array.isArray(d.pesos)) throw new Error('formato');
  const texto = v => String(v ?? '').slice(0, 80);
  const n = (v, min, max) => num(v, min, max);
  const p = d.perfil || {};
  const perfil = { edad: n(p.edad, 18, 110), altura: n(p.altura, 120, 220), peso: n(p.peso, 30, 250), meta: n(p.meta, 30, 250) };
  if (Object.values(perfil).some(v => v === null)) throw new Error('perfil');
  const dias = {};
  for (const [clave, x] of Object.entries(d.dias)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(clave) || !x || typeof x !== 'object') continue;
    dias[clave] = {
      comidas: (Array.isArray(x.comidas) ? x.comidas : []).slice(0, 200)
        .map(c => ({ n: texto(c && c.n), k: n(c && c.k, 0, 5000) ?? 0, p: n(c && c.p, 0, 300) ?? 0 })),
      vasos: n(x.vasos, 0, 30) ?? 0,
      pasos: n(x.pasos, 0, 100000),
      kcalReloj: n(x.kcalReloj, 0, 10000),
      hechos: (Array.isArray(x.hechos) ? x.hechos : []).slice(0, 100).map(texto),
      tension: (Array.isArray(x.tension) ? x.tension : []).slice(0, 20)
        .filter(t => t && typeof t === 'object' && /^\d{2}:\d{2}$/.test(t.h))
        .map(t => ({ h: t.h, a: n(t.a, 60, 260), b: n(t.b, 30, 160), pul: n(t.pul, 30, 220) })),
    };
  }
  const pesos = d.pesos
    .filter(x => x && /^\d{4}-\d{2}-\d{2}$/.test(x.f) && n(x.kg, 30, 250) !== null)
    .map(x => ({ f: x.f, kg: Number(x.kg) }))
    .sort((a, b) => a.f.localeCompare(b.f));
  return { perfil, dias, pesos, metaPasos: n(d.metaPasos, 500, 30000) ?? 10000 };
}

// ---------- Arranque ----------
dialogo.addEventListener('click', e => { if (e.target === dialogo) dialogo.close(); });
pintar();
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
