// Datos fijos de la app: alimentos, recetas y ejercicios.
// Aquí NO hay datos personales: esos se guardan solo en el teléfono.
'use strict';

// ---------- Alimentos ----------
// Formas de cocinar: "k" son las kcal que añade el aceite o el rebozado a UNA ración
// y "p" los gramos de proteína que añade (harina, huevo, pan rallado).
const COCINADOS = {
  pescado: [
    { f: 'cocido o al vapor', k: 0 },
    { f: 'en papillote', k: 10 },
    { f: 'a la plancha', k: 30 },
    { f: 'al horno', k: 40 },
    { f: 'en salsa o a la sidra', k: 70 },
    { f: 'frito', k: 110 },
    { f: 'rebozado', k: 150, p: 3 },
  ],
  marisco: [
    { f: 'cocido o al vapor', k: 0 },
    { f: 'a la plancha', k: 30 },
    { f: 'en salsa', k: 70 },
    { f: 'al ajillo', k: 80 },
    { f: 'frito o rebozado', k: 150, p: 3 },
  ],
  carne: [
    { f: 'cocido o hervido', k: 0 },
    { f: 'en freidora de aire', k: 15 },
    { f: 'a la plancha', k: 30 },
    { f: 'al horno o asado', k: 40 },
    { f: 'guisado', k: 70 },
    { f: 'frito', k: 100 },
    { f: 'empanado', k: 160, p: 4 },
  ],
  verdura: [
    { f: 'cocida o al vapor', k: 0 },
    { f: 'a la plancha', k: 30 },
    { f: 'al horno', k: 40 },
    { f: 'en crema o puré', k: 40 },
    { f: 'salteada con ajo', k: 60 },
    { f: 'rebozada', k: 150, p: 3 },
  ],
  ensalada: [
    { f: 'sin aliñar', k: 0 },
    { f: 'con 1 cucharadita de aceite', k: 45 },
    { f: 'con 1 cucharada de aceite', k: 90 },
  ],
  patata: [
    { f: 'cocida o al vapor', k: 0 },
    { f: 'asada o al microondas', k: 0 },
    { f: 'en freidora de aire', k: 30 },
    { f: 'al horno con aceite', k: 45 },
    { f: 'en puré con leche', k: 50, p: 2 },
    { f: 'frita', k: 200 },
  ],
  cereal: [
    { f: 'cocido, solo', k: 0 },
    { f: 'con tomate casero', k: 50, p: 1 },
    { f: 'salteado con verduras', k: 70, p: 1 },
    { f: 'con aceite y ajo', k: 90 },
  ],
  legumbre: [
    { f: 'cocidas, solas', k: 0 },
    { f: 'guisadas con verduras', k: 60, p: 1 },
    { f: 'en ensalada', k: 70 },
    { f: 'con chorizo o compango', k: 200, p: 9 },
  ],
  huevo: [
    { f: 'cocido o pasado por agua', k: 0 },
    { f: 'escalfado', k: 0 },
    { f: 'a la plancha', k: 20 },
    { f: 'revuelto', k: 30 },
    { f: 'en tortilla francesa', k: 35 },
    { f: 'frito', k: 45 },
  ],
};

// Alimentos que se cocinan: "k" y "p" son kcal y proteína por 100 g EN CRUDO,
// "r" los gramos de una ración normal (o lo que pesa una unidad, si lleva "u"),
// "g" el grupo de formas de cocinar y "o" otros nombres para encontrarlo.
// Los valores son aproximados (tablas españolas de composición de alimentos).
const ALIMENTOS = [
  // Pescados
  { n: 'Merluza', k: 72, p: 16, r: 150, g: 'pescado', o: 'pescadilla pijota' },
  { n: 'Bacalao fresco', k: 80, p: 18, r: 150, g: 'pescado' },
  { n: 'Pixín (rape)', k: 78, p: 16, r: 150, g: 'pescado' },
  { n: 'Lenguado o gallo', k: 82, p: 17, r: 150, g: 'pescado' },
  { n: 'Dorada', k: 100, p: 19, r: 150, g: 'pescado' },
  { n: 'Lubina', k: 100, p: 19, r: 150, g: 'pescado', o: 'robalo' },
  { n: 'Salmón', k: 190, p: 20, r: 150, g: 'pescado' },
  { n: 'Bonito del norte o atún fresco', k: 135, p: 23, r: 150, g: 'pescado' },
  { n: 'Sardinas', k: 150, p: 18, r: 120, g: 'pescado', o: 'parrochas' },
  { n: 'Bocartes (boquerones)', k: 125, p: 18, r: 120, g: 'pescado', o: 'anchoas' },
  { n: 'Xarda (caballa)', k: 170, p: 19, r: 150, g: 'pescado', o: 'verdel' },
  { n: 'Trucha', k: 110, p: 19, r: 150, g: 'pescado' },
  { n: 'Chicharro (jurel)', k: 125, p: 20, r: 150, g: 'pescado' },
  { n: 'Congrio', k: 110, p: 19, r: 150, g: 'pescado' },
  { n: 'Besugo', k: 95, p: 18, r: 150, g: 'pescado' },
  { n: 'Rodaballo', k: 100, p: 16, r: 150, g: 'pescado' },
  { n: 'Bacalao desalado', k: 110, p: 25, r: 150, g: 'pescado' },
  { n: 'Pescado blanco (cualquier otro)', k: 85, p: 17, r: 150, g: 'pescado', o: 'mero rey cabracho abadejo fletan panga' },
  { n: 'Pescado azul (cualquier otro)', k: 160, p: 19, r: 150, g: 'pescado', o: 'arenque salmonete' },
  // Mariscos
  { n: 'Calamares', k: 82, p: 16, r: 150, g: 'marisco', o: 'chipirones' },
  { n: 'Sepia', k: 75, p: 16, r: 150, g: 'marisco', o: 'jibia choco' },
  { n: 'Pulpo', k: 82, p: 17, r: 150, g: 'marisco' },
  { n: 'Gambas o langostinos pelados', k: 95, p: 20, r: 100, g: 'marisco' },
  { n: 'Mejillones (sin concha)', k: 80, p: 12, r: 100, g: 'marisco' },
  { n: 'Almejas (sin concha)', k: 75, p: 11, r: 80, g: 'marisco' },
  { n: 'Centollo (ñocla) o buey de mar, la carne', k: 95, p: 18, r: 100, g: 'marisco', o: 'centolla nocla' },
  { n: 'Nécoras (andaricas), la carne', k: 95, p: 18, r: 80, g: 'marisco', o: 'necoras' },
  { n: 'Bogavante o langosta, la carne', k: 90, p: 19, r: 100, g: 'marisco', o: 'bugre' },
  { n: 'Cigalas peladas', k: 90, p: 19, r: 100, g: 'marisco' },
  { n: 'Percebes (sin cáscara)', k: 65, p: 14, r: 80, g: 'marisco' },
  { n: 'Oricios (erizos de mar)', k: 110, p: 13, r: 60, g: 'marisco', o: 'erizos' },
  { n: 'Berberechos (sin concha)', k: 50, p: 11, r: 80, g: 'marisco' },
  { n: 'Navajas (sin concha)', k: 70, p: 13, r: 100, g: 'marisco' },
  { n: 'Vieiras o zamburiñas (sin concha)', k: 80, p: 15, r: 100, g: 'marisco', o: 'zamburinas' },
  // Carnes
  { n: 'Pechuga de pollo', k: 110, p: 23, r: 150, g: 'carne' },
  { n: 'Muslo de pollo sin piel', k: 125, p: 20, r: 150, g: 'carne' },
  { n: 'Filete de ternera', k: 130, p: 21, r: 120, g: 'carne', o: 'vaca buey carne roja' },
  { n: 'Carne picada de ternera', k: 200, p: 19, r: 100, g: 'carne', o: 'hamburguesa albóndigas' },
  { n: 'Lomo de cerdo', k: 150, p: 21, r: 120, g: 'carne', o: 'gochu' },
  { n: 'Solomillo de cerdo', k: 120, p: 21, r: 120, g: 'carne' },
  { n: 'Chuleta de cerdo', k: 220, p: 18, r: 120, g: 'carne' },
  { n: 'Conejo', k: 130, p: 21, r: 150, g: 'carne' },
  { n: 'Cordero', k: 225, p: 18, r: 120, g: 'carne' },
  { n: 'Hígado', k: 135, p: 20, r: 120, g: 'carne' },
  { n: 'Carne de ternera para guisar', k: 140, p: 20, r: 120, g: 'carne', o: 'estofado' },
  { n: 'Pollo con piel', k: 170, p: 18, r: 150, g: 'carne', o: 'pollo asado' },
  { n: 'Costilla de cerdo', k: 280, p: 17, r: 120, g: 'carne', o: 'costillas' },
  { n: 'Carne magra (cualquier otra)', k: 130, p: 21, r: 120, g: 'carne', o: 'potro caballo' },
  // Huevos
  { n: 'Huevo', k: 142, p: 12, r: 55, u: '1 huevo', g: 'huevo' },
  // Verduras
  { n: 'Judías verdes', k: 30, p: 2, r: 200, g: 'verdura', o: 'vainas fréjoles' },
  { n: 'Brócoli', k: 34, p: 3, r: 200, g: 'verdura' },
  { n: 'Coliflor', k: 25, p: 2, r: 200, g: 'verdura' },
  { n: 'Espinacas', k: 23, p: 3, r: 200, g: 'verdura' },
  { n: 'Acelgas', k: 20, p: 2, r: 200, g: 'verdura' },
  { n: 'Berza o repollo', k: 25, p: 2, r: 200, g: 'verdura', o: 'col' },
  { n: 'Calabacín', k: 17, p: 1, r: 200, g: 'verdura' },
  { n: 'Berenjena', k: 25, p: 1, r: 200, g: 'verdura' },
  { n: 'Pimientos', k: 27, p: 1, r: 150, g: 'verdura' },
  { n: 'Champiñones o setas', k: 22, p: 3, r: 150, g: 'verdura' },
  { n: 'Zanahoria', k: 40, p: 1, r: 150, g: 'verdura' },
  { n: 'Calabaza', k: 26, p: 1, r: 200, g: 'verdura' },
  { n: 'Puerros', k: 30, p: 2, r: 150, g: 'verdura' },
  { n: 'Alcachofas', k: 45, p: 3, r: 150, g: 'verdura' },
  { n: 'Espárragos', k: 20, p: 2, r: 150, g: 'verdura' },
  { n: 'Cebolla', k: 40, p: 1, r: 100, g: 'verdura' },
  { n: 'Guisantes', k: 80, p: 6, r: 150, g: 'verdura', o: 'arbeyos' },
  { n: 'Coles de Bruselas', k: 45, p: 3, r: 200, g: 'verdura' },
  { n: 'Nabos o grelos', k: 25, p: 2, r: 200, g: 'verdura' },
  { n: 'Menestra o verdura variada', k: 35, p: 2, r: 200, g: 'verdura', o: 'verduras' },
  { n: 'Lechuga', k: 15, p: 1, r: 100, g: 'ensalada', o: 'ensalada verde' },
  { n: 'Tomate', k: 20, p: 1, r: 150, g: 'ensalada' },
  { n: 'Pepino', k: 13, p: 1, r: 100, g: 'ensalada' },
  { n: 'Patata', k: 80, p: 2, r: 150, g: 'patata', o: 'patatas' },
  // Arroz, pasta y legumbres (peso en seco)
  { n: 'Arroz blanco', k: 350, p: 7, r: 60, g: 'cereal', seco: true },
  { n: 'Arroz integral', k: 345, p: 8, r: 60, g: 'cereal', seco: true },
  { n: 'Pasta (macarrones, espaguetis)', k: 355, p: 12, r: 70, g: 'cereal', o: 'fideos', seco: true },
  { n: 'Quinoa', k: 365, p: 14, r: 60, g: 'cereal', seco: true },
  { n: 'Fabes o alubias', k: 300, p: 21, r: 60, g: 'legumbre', o: 'judías blancas fabada', seco: true },
  { n: 'Lentejas', k: 310, p: 24, r: 60, g: 'legumbre', seco: true },
  { n: 'Garbanzos', k: 340, p: 20, r: 60, g: 'legumbre', seco: true },
];

// Alimentos que se toman tal cual: kcal y proteína de la ración que pone entre paréntesis.
const ALIMENTOS_FIJOS = [
  { n: 'Café solo', k: 2, p: 0 },
  { n: 'Café con leche desnatada (taza)', k: 60, p: 5 },
  { n: 'Leche semidesnatada (vaso)', k: 115, p: 8 },
  { n: 'Leche desnatada (vaso)', k: 85, p: 8 },
  { n: 'Yogur natural desnatado', k: 55, p: 5 },
  { n: 'Yogur natural entero', k: 80, p: 5 },
  { n: 'Yogur griego natural', k: 150, p: 5 },
  { n: 'Queso fresco batido 0% (125 g)', k: 60, p: 10 },
  { n: 'Requesón (100 g)', k: 100, p: 11 },
  { n: 'Queso blanco fresco, tipo Burgos (60 g)', k: 110, p: 7 },
  { n: 'Queso curado (30 g)', k: 120, p: 8 },
  { n: 'Queso semicurado (30 g)', k: 110, p: 7 },
  { n: 'Queso tierno (30 g)', k: 95, p: 6 },
  { n: 'Queso de cabra (30 g)', k: 100, p: 6 },
  { n: "Queso Afuega'l pitu (30 g)", k: 95, p: 6 },
  { n: 'Queso Cabrales (30 g)', k: 115, p: 6 },
  { n: 'Pan integral (rebanada)', k: 75, p: 3 },
  { n: 'Pan blanco (trozo de 40 g)', k: 105, p: 3 },
  { n: 'Copos de avena (40 g)', k: 150, p: 5 },
  { n: 'Galletas María (4)', k: 100, p: 2 },
  { n: 'Jamón serrano (2 lonchas)', k: 70, p: 9 },
  { n: 'Jamón cocido (2 lonchas)', k: 45, p: 8 },
  { n: 'Pechuga de pavo, fiambre (2 lonchas)', k: 40, p: 8 },
  { n: 'Pechuga de pollo, fiambre (2 lonchas)', k: 40, p: 8 },
  { n: 'Lomo embuchado (30 g)', k: 65, p: 11 },
  { n: 'Cecina (30 g)', k: 70, p: 12 },
  { n: 'Salchichón (30 g)', k: 130, p: 7 },
  { n: 'Chorizo (30 g)', k: 115, p: 7 },
  { n: 'Lacón cocido (100 g)', k: 180, p: 20 },
  { n: 'Lacón cocido magro, sin grasa (100 g)', k: 130, p: 21 },
  { n: 'Morcilla asturiana (30 g)', k: 115, p: 4 },
  { n: 'Tocino (30 g)', k: 200, p: 2 },
  { n: 'Tortilla de patata (trozo de 150 g)', k: 290, p: 10 },
  { n: 'Bonito del norte en lata, escurrido (1 lata)', k: 110, p: 20 },
  { n: 'Sardinas en lata, escurridas (1 lata)', k: 190, p: 21 },
  { n: 'Mejillones en escabeche (1 lata)', k: 130, p: 10 },
  { n: 'Manzana asturiana', k: 80, p: 0 },
  { n: 'Pera', k: 85, p: 1 },
  { n: 'Kiwi', k: 45, p: 1 },
  { n: 'Plátano', k: 100, p: 1 },
  { n: 'Naranja', k: 65, p: 1 },
  { n: 'Mandarinas (2)', k: 60, p: 1 },
  { n: 'Fresas (tazón)', k: 50, p: 1 },
  { n: 'Arándanos (100 g)', k: 55, p: 1 },
  { n: 'Uvas (racimo pequeño)', k: 70, p: 1 },
  { n: 'Melón (tajada)', k: 70, p: 1 },
  { n: 'Sandía (tajada)', k: 60, p: 1 },
  { n: 'Melocotón', k: 60, p: 1 },
  { n: 'Piña (rodaja)', k: 50, p: 0 },
  { n: 'Cerezas (puñado)', k: 60, p: 1 },
  { n: 'Ciruelas negras o claras, frescas (2)', k: 50, p: 1 },
  { n: 'Ciruelas pasas (4)', k: 90, p: 1 },
  { n: 'Dátiles (3 pequeños)', k: 60, p: 1 },
  { n: 'Dátil grande, tipo Medjoul (1)', k: 65, p: 0 },
  { n: 'Higos (2)', k: 75, p: 1 },
  { n: 'Albaricoques (2)', k: 35, p: 1 },
  { n: 'Aguacate (medio)', k: 160, p: 2 },
  { n: 'Nueces (5)', k: 130, p: 3 },
  { n: 'Almendras (15)', k: 115, p: 4 },
  { n: 'Avellanas (15)', k: 125, p: 3 },
  { n: 'Aceite de oliva (cucharada)', k: 90, p: 0 },
  { n: 'Aceite de oliva (cucharadita)', k: 45, p: 0 },
  { n: 'Chocolate negro (2 onzas)', k: 110, p: 2 },
  { n: 'Ensalada mixta con bonito', k: 220, p: 18 },
  { n: 'Puré de verduras (plato)', k: 120, p: 3 },
  { n: 'Sopa de pollo (plato)', k: 90, p: 6 },
  { n: 'Sopa de pollo con fideos (plato)', k: 140, p: 8 },
  { n: 'Caldo de pollo desgrasado (taza)', k: 20, p: 3 },
  { n: 'Sopa de verduras (plato)', k: 80, p: 3 },
  { n: 'Sopa de pescado (plato)', k: 120, p: 10 },
  { n: 'Sidra natural (vaso)', k: 70, p: 0 },
  { n: 'Vino tinto o blanco (copa de 125 ml)', k: 100, p: 0 },
  { n: 'Cerveza (caña)', k: 90, p: 1 },
  { n: 'Cerveza sin alcohol (botellín)', k: 50, p: 1 },
  { n: 'Cava (copa)', k: 75, p: 0 },
  { n: 'Agua', k: 0, p: 0 },
  { n: 'Agua con gas', k: 0, p: 0 },
  { n: 'Infusión sin azúcar', k: 2, p: 0 },
  { n: 'Café cortado', k: 20, p: 1 },
  { n: 'Refresco de cola, naranja o limón (lata)', k: 140, p: 0 },
  { n: 'Refresco sin azúcar, zero o light (lata)', k: 1, p: 0 },
  { n: 'Tónica (botellín)', k: 70, p: 0 },
  { n: 'Zumo de naranja natural (vaso)', k: 90, p: 1 },
];

// Recetas del plan semanal (unas 1.150 kcal de base + comida + cena).
// Cantidades para 1 persona. kcal y proteína son aproximadas.
const RECETAS = [
  {
    id: 'desayuno', emoji: '☕', tipo: 'Desayuno', nombre: 'Café con leche y tostada con tomate',
    kcal: 280, prot: 11, min: 5, raciones: 1,
    ing: ['Café con 200 ml de leche entera', '40 g de pan integral', 'Tomate rallado', '1 cucharadita de aceite de oliva'],
    pasos: ['Prepara el café con la leche.', 'Tuesta el pan.', 'Pon el tomate rallado por encima y el aceite.'],
    nota: 'Todos los días. La leche entera suma calcio para tus huesos.',
  },
  {
    id: 'media-manana', emoji: '🥣', tipo: 'Media mañana', nombre: 'Yogur griego 0 % con nueces',
    kcal: 135, prot: 16, min: 2, raciones: 1,
    ing: ['1 yogur griego natural 0 % (150 g)', '2 nueces'],
    pasos: ['Trocea las nueces y ponlas encima del yogur.'],
    nota: 'Todos los días. Mucha proteína para el músculo y calcio para el hueso.',
  },
  {
    id: 'merienda', emoji: '🫐', tipo: 'Merienda', nombre: 'Ciruelas pasas y dátil',
    kcal: 110, prot: 1, min: 1, raciones: 1,
    ing: ['3 ciruelas pasas', '1 dátil'],
    pasos: ['Listo para tomar.'],
    nota: 'Todos los días. Dulce natural, sin azúcar añadido.',
  },
  {
    id: 'merluza-horno', emoji: '🐟', tipo: 'Comida', nombre: 'Merluza al horno con patata y pimiento',
    kcal: 355, prot: 30, min: 25, raciones: 1,
    ing: ['150 g de merluza', '150 g de patata cocida', '1 pimiento asado', '20 g de pan', '1 cucharadita de aceite de oliva', 'Ajo, limón y perejil'],
    pasos: ['Enciende el horno a 200 grados.', 'Pon la merluza con ajo, limón y perejil.', 'Hornéala de 15 a 18 minutos.', 'Sírvela con la patata y el pimiento.', 'Añade el aceite al final.'],
    nota: 'Martes y sábado.',
  },
  {
    id: 'pote-ligero', emoji: '🥬', tipo: 'Comida', nombre: 'Pote asturiano ligero',
    kcal: 350, prot: 20, min: 65, raciones: 1,
    ing: ['50 g de judías blancas secas (en remojo desde la noche anterior)', '150 g de berza', '1 patata pequeña (80 g)', '20 g de chorizo asturiano'],
    pasos: ['Pon todo junto en una olla cubierto de agua.', 'Cuécelo 1 hora a fuego suave.', 'Retira el chorizo.', 'Quita la grasa del caldo antes de servir.'],
    nota: 'Lunes. Quitar el chorizo y la grasa del caldo ahorra muchas calorías.',
  },
  {
    id: 'pollo-arroz', emoji: '🍗', tipo: 'Comida', nombre: 'Pollo con verduras y arroz',
    kcal: 375, prot: 38, min: 20, raciones: 1,
    ing: ['150 g de pechuga de pollo', '100 g de arroz ya cocido', '150 g de calabacín y pimiento', '1 cucharadita de aceite de oliva', 'Pimentón y orégano'],
    pasos: ['Haz el pollo a la plancha.', 'Saltea el calabacín y el pimiento con el aceite.', 'Sirve con el arroz.', 'Sazona con pimentón y orégano.'],
    nota: 'Miércoles. El plato con más proteína de la semana.',
  },
  {
    id: 'ensalada-bonito', emoji: '🥗', tipo: 'Comida', nombre: 'Ensalada de bonito con patata',
    kcal: 345, prot: 28, min: 25, raciones: 1,
    ing: ['100 g de bonito natural escurrido', '150 g de patata cocida', 'Lechuga, tomate y cebolla', '1 cucharadita de aceite de oliva', '20 g de pan', 'Un chorrito de vinagre'],
    pasos: ['Cuece la patata y déjala templar.', 'Mezcla todo en un plato.', 'Aliña con el aceite y el vinagre.'],
    nota: 'Jueves.',
  },
  {
    id: 'fabes-ligeras', emoji: '🫘', tipo: 'Comida', nombre: 'Fabes ligeras',
    kcal: 340, prot: 18, min: 120, raciones: 1,
    ing: ['60 g de fabes secas (en remojo desde la noche anterior)', '20 g de chorizo asturiano', 'Un poco de cebolla'],
    pasos: ['Cuece las fabes con el chorizo y la cebolla a fuego muy suave, hasta que estén tiernas.', 'Escurre la grasa del chorizo antes de servir.'],
    nota: 'Viernes.',
  },
  {
    id: 'tortilla-espinacas', emoji: '🍳', tipo: 'Cena', nombre: 'Tortilla francesa con espinacas',
    kcal: 265, prot: 18, min: 10, raciones: 1,
    ing: ['2 huevos', '100 g de espinacas', '1 cucharadita de aceite de oliva', '20 g de pan'],
    pasos: ['Saltea las espinacas con el aceite.', 'Bate los huevos.', 'Cuaja la tortilla a fuego medio.', 'Sírvela con las espinacas y el pan.'],
    nota: 'Lunes y viernes.',
  },
  {
    id: 'revuelto-champinones', emoji: '🍄', tipo: 'Cena', nombre: 'Revuelto de champiñones y jamón',
    kcal: 285, prot: 25, min: 15, raciones: 1,
    ing: ['2 huevos', '100 g de champiñones', '30 g de jamón serrano', '1 cucharadita de aceite de oliva'],
    pasos: ['Saltea los champiñones con el aceite.', 'Añade el jamón.', 'Echa los huevos batidos y remueve a fuego lento.'],
    nota: 'Martes.',
  },
  {
    id: 'sardinas-ensalada', emoji: '🐟', tipo: 'Cena', nombre: 'Sardinas con ensalada',
    kcal: 290, prot: 22, min: 5, raciones: 1,
    ing: ['80 g de sardinas en aceite de oliva, escurridas', '150 g de tomate y pepino', '1 cucharadita de aceite de oliva', '20 g de pan'],
    pasos: ['Corta el tomate y el pepino.', 'Aliña con el aceite.', 'Pon las sardinas encima.'],
    nota: 'Miércoles y sábado. Las sardinas en lata, con su espina, dan mucho calcio.',
  },
  {
    id: 'crema-calabacin', emoji: '🥒', tipo: 'Cena', nombre: 'Crema de calabacín con queso',
    kcal: 250, prot: 11, min: 30, raciones: 1,
    ing: ['300 g de crema de calabacín casera, sin nata', '40 g de queso fresco', '20 g de pan', '1 cucharadita de aceite de oliva'],
    pasos: ['Calienta la crema.', 'Sírvela con el queso desmenuzado por encima.', 'Añade el aceite al final.'],
    nota: 'Jueves.',
  },
];

// Menú de la semana: el código de la receta de comida y de cena de cada día.
// El orden empieza en domingo, como los días de JavaScript (0 = domingo).
const MENU = [
  { dia: 'Domingo', libre: true },
  { dia: 'Lunes', comida: 'pote-ligero', cena: 'tortilla-espinacas' },
  { dia: 'Martes', comida: 'merluza-horno', cena: 'revuelto-champinones' },
  { dia: 'Miércoles', comida: 'pollo-arroz', cena: 'sardinas-ensalada' },
  { dia: 'Jueves', comida: 'ensalada-bonito', cena: 'crema-calabacin' },
  { dia: 'Viernes', comida: 'fabes-ligeras', cena: 'tortilla-espinacas' },
  { dia: 'Sábado', comida: 'merluza-horno', cena: 'sardinas-ensalada' },
];
const BASE_DIARIA = ['desayuno', 'media-manana', 'merienda'];
const NOTA_DOMINGO = 'Día libre: come normal, sin excesos y sin alcohol. Un día de 3.000 kcal borra el esfuerzo de toda la semana.';

// "ok" = necesita permiso de tu médico o fisio antes de hacerlo.
// "sube" = cómo hacerlo más difícil cuando te resulte fácil.
// Fuerza con carga progresiva: es lo que ayuda al hueso a fijar el calcio.
const EJERCICIOS = [
  {
    grupo: 'Calentamiento', emoji: '🔥', intro: '5 minutos antes de cada sesión, para preparar el cuerpo.',
    lista: [
      { n: 'Marchar en el sitio', c: 'Junto a la encimera, levanta las rodillas por turnos y mueve los brazos, como si caminaras sin moverte.', s: '2 minutos', sube: 'Sube más las rodillas y ve más rápido.' },
      { n: 'Boxeo de sombra suave', c: 'De pie, con las rodillas un poco dobladas, lanza golpes rectos al aire con un brazo y luego con el otro. Que trabajen los brazos, no la cintura: no gires el tronco con fuerza.', s: '3 rondas de 1 minuto, descansando 30 segundos', sube: 'Coge una botella pequeña de agua en cada mano.', ok: 'Por el hombro operado: empieza con golpes cortos y sin estirar del todo.' },
    ],
  },
  {
    grupo: 'Piernas con fuerza', emoji: '🦵', intro: '2 o 3 días por semana, con un día de descanso entre medias. Estos son los que más ayudan a tus huesos de la cadera.',
    lista: [
      { n: 'Sentarse y levantarse de la silla', c: 'De pie delante de una silla firme. Saca el culete hacia atrás y baja hasta rozar la silla, con la espalda recta y el pecho alto. Sube apretando los glúteos.', s: '3 series de 10', sube: 'Sostén una mancuerna o una garrafa de agua pegada al pecho, con las dos manos. Ve subiendo el peso poco a poco.' },
      { n: 'Subir a un escalón', c: 'Agarrada a la barandilla, sube a un escalón con un pie y luego con el otro. Baja despacio, primero el mismo pie.', s: '3 series de 10 con cada pierna', sube: 'Usa un escalón más alto o lleva una mochila con un poco de peso.' },
      { n: 'Zancada quieta', c: 'Agarrada a la encimera, pon un pie delante y otro detrás. Baja la rodilla de atrás hacia el suelo, sin llegar a tocarlo, con la espalda recta. Sube.', s: '3 series de 8 con cada pierna', sube: 'Sostén una mancuerna en la mano libre.' },
      { n: 'Puente de glúteos', c: 'Tumbada boca arriba con las rodillas dobladas y los pies en el suelo. Aprieta los glúteos y sube la cadera hasta que el cuerpo quede recto de las rodillas a los hombros. Baja despacio.', s: '3 series de 12', sube: 'Pon una mancuerna o una bolsa de arroz encima de la cadera.' },
      { n: 'Pierna al lado y atrás con tobillera', c: 'De pie, agarrada a la encimera. Lleva la pierna estirada hacia el lado y vuelve; luego hacia atrás y vuelve. Sin inclinar el cuerpo.', s: '2 series de 12 con cada pierna y cada dirección', sube: 'Ponte tobilleras con peso: empieza con 0,5 kg y sube hasta 2 kg.' },
      { n: 'Puntillas con peso', c: 'Agarrada a la encimera, sube a las puntillas, aguanta 1 segundo y baja despacio.', s: '3 series de 15', sube: 'Hazlo con una sola pierna, o con una mochila con peso.', ok: 'Por el calcáneo: solo cuando tu traumatólogo te haya dado el alta de ese pie.' },
    ],
  },
  {
    grupo: 'Espalda fuerte', emoji: '🪑', intro: 'Los músculos de la espalda protegen tus vértebras. Siempre con la espalda recta, nunca doblada hacia delante.',
    lista: [
      { n: 'Remo con goma', c: 'Ata la goma al pomo de una puerta cerrada. Sentada y recta, tira de la goma hacia la tripa llevando los codos hacia atrás y juntando los omóplatos.', s: '3 series de 12', sube: 'Usa una goma más dura o ponte más lejos de la puerta.', ok: 'Por el hombro operado: pregunta a tu fisio cuándo puedes usar goma.' },
      { n: 'Pájaro-perro', c: 'A cuatro patas, con la espalda recta como una mesa. Estira un brazo hacia delante y la pierna contraria hacia atrás. Aguanta 3 segundos y cambia.', s: '3 series de 8 con cada lado', sube: 'Aguanta 5 segundos, o ponte tobilleras con peso.', ok: 'Por el pulgar: apóyate sobre los puños cerrados o sobre los antebrazos si te molesta la mano.' },
      { n: 'Levantar el pecho tumbada boca abajo', c: 'Tumbada boca abajo con una almohada bajo la tripa, levanta un poco la cabeza y los hombros, sin forzar. Baja despacio.', s: '2 series de 8', sube: 'Lleva las manos a la frente en lugar de a los lados.', ok: 'Con tus vértebras, hazlo solo si tu médico o fisio te lo aprueba y te enseña a hacerlo.' },
      { n: 'Espalda contra la pared', c: 'De pie, apoya en la pared los talones, el culete, la espalda y la cabeza. Sube los brazos en forma de W, rozando la pared.', s: '3 veces, 30 segundos', sube: 'Separa un poco los pies de la pared y aguanta más tiempo.' },
    ],
  },
  {
    grupo: 'Brazos y pecho', emoji: '💪', intro: 'Con mancuernas de 1 a 3 kg o con goma. Sin apretar fuerte con el pulgar derecho.',
    lista: [
      { n: 'Flexiones en la encimera', c: 'Apoya las manos en el borde de la encimera, da un paso atrás y deja el cuerpo recto. Dobla los codos para acercar el pecho y empuja para volver.', s: '3 series de 10', sube: 'Ponte más lejos de la encimera, o apóyate en una mesa más baja.', ok: 'Por el pulgar: apoya la mano con los dedos juntos, sin hacer fuerza con el pulgar.' },
      { n: 'Bíceps con mancuernas', c: 'Sentada y recta, con una mancuerna en cada mano. Dobla los codos para subirlas a los hombros y baja despacio.', s: '3 series de 12', sube: 'Sube el peso de medio kilo en medio kilo.', ok: 'Por el pulgar: usa pesas de muñeca con velcro, que no hay que agarrar.' },
      { n: 'Subir los brazos por delante', c: 'Sentada y recta, con poco peso, sube los brazos estirados por delante hasta la altura de los hombros. Baja despacio.', s: '2 series de 10', sube: 'Más peso, poco a poco.', ok: 'Por la operación del hombro: solo con permiso de tu fisio.' },
    ],
  },
  {
    grupo: 'Equilibrio', emoji: '🧍‍♀️', intro: 'Todos los días, junto a la encimera. Es lo que más te protege de una caída.',
    lista: [
      { n: 'A la pata coja', c: 'Agarrada a la encimera con una mano, levanta un pie del suelo. Mira un punto fijo.', s: '3 veces, 20 segundos con cada pie', sube: 'Suelta la mano, o agárrate solo con un dedo.' },
      { n: 'Andar en línea', c: 'Camina junto a la encimera poniendo un pie justo delante del otro, como por una raya.', s: '3 veces, 10 pasos', sube: 'Camina hacia atrás de la misma forma.' },
      { n: 'Pasar el peso de un pie a otro', c: 'Con los pies separados, lleva el peso despacio al pie derecho y luego al izquierdo.', s: '2 series de 10', sube: 'Hazlo de puntillas.' },
    ],
  },
];

const REGLAS = [
  'Nunca dobles la espalda hacia delante: nada de abdominales ni de tocarte los pies.',
  'No gires el tronco con fuerza ni saltes.',
  'No cojas las pesas del suelo: déjalas encima de una silla.',
  'Sube el peso poco a poco: cuando hagas todas las repeticiones bien y sin dolor, sube un poquito.',
  'Cambia de postura despacio: al levantarte, al agacharte y al tumbarte.',
  'Ten siempre algo firme cerca para agarrarte.',
  'Si algo duele, para. Cansancio sí; dolor, no.',
  'Enséñale estos ejercicios a tu traumatólogo o fisio antes de empezar.',
];

// Vídeos de baile de unos 15 minutos, de bajo impacto (sin saltos según sus autores).
// Se abren en YouTube. "id" es el código del vídeo.
const BAILES = [
  { id: 'v7i3I7YnWGU', n: 'Salsa suave con estiramientos', estilo: 'Salsa', musica: 'Música latina', min: 16, canal: 'Flow Dance Studios', nota: 'Pensado para mayores. Sáltate los estiramientos en los que haya que doblarse hacia delante.' },
  { id: 'oOr82MWtQAg', n: 'Zumba sin saltos', estilo: 'Zumba', musica: 'Ritmos latinos', min: 15, canal: 'Kaji Pm' },
  { id: 'mQhThoW5UtY', n: 'Zumba fácil para mayores', estilo: 'Zumba', musica: 'Latina y pop', min: 17, canal: 'Dance With Mark' },
  { id: 'zgGmdkpNPeI', n: 'Bollywood para principiantes', estilo: 'Bollywood', musica: 'Música de la India', min: 15, canal: 'Meinhaj Hussain' },
  { id: 'YFLLfv8C4Lk', n: 'Canciones de siempre', estilo: 'Baile clásico', musica: 'Éxitos antiguos', min: 18, canal: 'GoldeyFit' },
  { id: '4aKTZLHAI0I', n: 'Caminar bailando al estilo de antes', estilo: 'Caminata con baile', musica: 'Funk y soul de los 70 y 80', min: 16, canal: 'Coach Angel' },
  { id: '9c5sBvAofTQ', n: 'Baile para mayores de 50, todo el cuerpo', estilo: 'Baile aeróbico', musica: 'Pop', min: 16, canal: 'Move with Bez' },
  { id: 'qSJguOFc-C4', n: 'Baile alegre que cuida las rodillas', estilo: 'Baile aeróbico', musica: 'Pop alegre', min: 17, canal: 'Coach Mich', nota: 'Sin sentadillas, sin zancadas y sin saltos.' },
  { id: 'QA3d2jnairI', n: 'Caminar bailando para volver a empezar', estilo: 'Caminata con baile', musica: 'Música animada', min: 17, canal: 'Paul Eugene' },
];

const REGLAS_BAILE = [
  'Calienta antes 2 minutos marchando en el sitio.',
  'Si en el vídeo saltan, tú no: haz el mismo paso caminando.',
  'No gires la cintura con fuerza ni te dobles hacia delante: mueve los pies y los brazos.',
  'Baila con zapatillas, en un suelo que no resbale y con una silla firme cerca.',
  'Si una vuelta te marea, no la hagas: sigue de frente.',
  'Los vídeos están en inglés, pero basta con mirar y copiar los pasos.',
];

// Calorías gastadas (aproximadas): intensidad (MET) x peso en kg x horas.
// Cada ejercicio cuenta como 5 minutos; cada baile, lo que dura su vídeo.
const MIN_EJERCICIO = 5;
const INTENSIDAD = {
  'Calentamiento': 3.5,
  'Piernas con fuerza': 3.5,
  'Espalda fuerte': 3,
  'Brazos y pecho': 3,
  'Equilibrio': 2.5,
  baile: 4.5,
  caminata: 4,
};
const KCAL_POR_PASO_Y_KG = 0.0005; // caminar: unas 37 kcal cada 1.000 pasos con 75 kg
