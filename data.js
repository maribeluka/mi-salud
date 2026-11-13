// Datos fijos de la app: alimentos, recetas y ejercicios.
// Aquí NO hay datos personales: esos se guardan solo en el teléfono.
'use strict';

// Raciones habituales. kcal y proteína (g) son aproximadas.
const ALIMENTOS = [
  { n: 'Café con leche desnatada (taza)', k: 60, p: 5 },
  { n: 'Leche semidesnatada (vaso)', k: 115, p: 8 },
  { n: 'Yogur natural desnatado', k: 55, p: 5 },
  { n: 'Queso fresco batido 0% (125 g)', k: 60, p: 10 },
  { n: 'Requesón (100 g)', k: 100, p: 11 },
  { n: 'Queso fresco de Burgos (60 g)', k: 110, p: 7 },
  { n: 'Pan integral (rebanada)', k: 75, p: 3 },
  { n: 'Huevo cocido', k: 75, p: 6 },
  { n: 'Manzana asturiana', k: 80, p: 0 },
  { n: 'Kiwi', k: 45, p: 1 },
  { n: 'Plátano', k: 100, p: 1 },
  { n: 'Naranja', k: 65, p: 1 },
  { n: 'Nueces (5)', k: 130, p: 3 },
  { n: 'Merluza a la plancha (150 g)', k: 135, p: 27 },
  { n: 'Sardinas a la plancha (4)', k: 210, p: 22 },
  { n: 'Bonito del norte en lata, escurrido (1 lata)', k: 110, p: 20 },
  { n: 'Pechuga de pollo a la plancha (150 g)', k: 165, p: 33 },
  { n: 'Filete de ternera asturiana (120 g)', k: 170, p: 26 },
  { n: 'Ensalada mixta con bonito', k: 220, p: 18 },
  { n: 'Puré de verduras (plato)', k: 120, p: 3 },
  { n: 'Fabes (plato pequeño, sin compango)', k: 250, p: 15 },
  { n: 'Arroz blanco (plato pequeño)', k: 200, p: 4 },
  { n: 'Patata cocida mediana', k: 130, p: 3 },
  { n: 'Aceite de oliva (cucharada)', k: 90, p: 0 },
  { n: 'Sidra natural (vaso)', k: 70, p: 0 },
];

const RECETAS = [
  {
    id: 'merluza-sidra', emoji: '🐟', tipo: 'Comida o cena', nombre: 'Merluza a la sidra',
    kcal: 280, prot: 30, min: 30, raciones: 2,
    ing: ['2 rodajas de merluza (unos 300 g)', '1 cebolla', '1 diente de ajo', '1 vaso de sidra natural', '1 cucharada de aceite de oliva', 'Perejil y sal'],
    pasos: ['Pica la cebolla y el ajo.', 'Pocha la cebolla con el aceite a fuego suave, 10 minutos.', 'Añade la sidra y deja que hierva 5 minutos.', 'Pon la merluza con un poco de sal y cuécela 6 u 8 minutos, dándole la vuelta a mitad.', 'Sirve con perejil por encima.'],
    nota: 'Mucha proteína y poca grasa. El alcohol de la sidra se evapora casi todo al cocinar.',
  },
  {
    id: 'pixin-horno', emoji: '🐟', tipo: 'Comida o cena', nombre: 'Pixín al horno con verduras',
    kcal: 260, prot: 32, min: 40, raciones: 2,
    ing: ['300 g de pixín (rape) limpio', '1 pimiento rojo', '1 calabacín', '1 cebolla', '1 cucharada de aceite de oliva', 'Ajo, perejil, sal y limón'],
    pasos: ['Enciende el horno a 200 grados.', 'Corta las verduras en tiras y ponlas en una bandeja con el aceite y sal.', 'Hornéalas 15 minutos.', 'Pon el pixín encima con ajo picado y perejil.', 'Hornea 15 minutos más y sírvelo con unas gotas de limón.'],
    nota: 'Un pescado muy de aquí, sin espinas pequeñas y muy ligero.',
  },
  {
    id: 'sardinas', emoji: '🐟', tipo: 'Comida o cena', nombre: 'Sardinas a la plancha con ensalada',
    kcal: 320, prot: 24, min: 15, raciones: 1,
    ing: ['4 sardinas frescas limpias', 'Lechuga, tomate y cebolla', '1 cucharadita de aceite de oliva', 'Sal gorda y limón'],
    pasos: ['Calienta bien la plancha.', 'Pon las sardinas con sal gorda, 3 minutos por cada lado.', 'Prepara la ensalada con el aceite.', 'Sirve con limón.'],
    nota: 'Buen pescado azul para tus huesos. Las sardinas en lata, comidas con su espina, dan aún más calcio.',
  },
  {
    id: 'fabes-almejas', emoji: '🫘', tipo: 'Comida', nombre: 'Fabes con almejas (versión ligera)',
    kcal: 380, prot: 24, min: 150, raciones: 4,
    ing: ['250 g de fabes de la granja (en remojo desde la noche anterior)', '300 g de almejas', '1 cebolla', '2 dientes de ajo', '1 cucharada de aceite de oliva', 'Unas hebras de azafrán, perejil y sal'],
    pasos: ['Pon las fabes en una olla cubiertas de agua fría con la cebolla entera.', 'Cuando hiervan, «asústalas» con un chorrito de agua fría. Repítelo 2 o 3 veces mientras se hacen.', 'Cuécelas a fuego muy suave unas 2 horas, hasta que estén tiernas.', 'Aparte, abre las almejas en una sartén con el aceite y el ajo.', 'Añade almejas, azafrán y perejil a las fabes y deja 5 minutos más.'],
    nota: 'La ración es de plato pequeño. Así entran en la dieta sin pasarte.',
  },
  {
    id: 'pote-ligero', emoji: '🥬', tipo: 'Comida', nombre: 'Pote asturiano ligero',
    kcal: 350, prot: 22, min: 150, raciones: 4,
    ing: ['200 g de fabes (en remojo desde la noche anterior)', '1 berza', '2 patatas', '150 g de lacón magro, sin grasa', 'Media morcilla (opcional, solo para dar sabor)', 'Pimentón y sal'],
    pasos: ['Cuece las fabes con el lacón a fuego suave, como en la receta de las fabes.', 'Lava la berza, córtala y escáldala 5 minutos en otra olla. Tira esa agua.', 'Cuando las fabes estén casi hechas, añade la berza y las patatas en trozos.', 'Si usas la morcilla, ponla entera los últimos 15 minutos y retírala al servir.', 'Ajusta de sal y añade un poco de pimentón.'],
    nota: 'Quitando el tocino y casi todo el compango, se queda en la mitad de calorías.',
  },
  {
    id: 'pollo-guisado', emoji: '🍗', tipo: 'Comida', nombre: 'Pollo de caleya guisado con verduras',
    kcal: 330, prot: 35, min: 60, raciones: 4,
    ing: ['1 pollo de corral troceado, sin piel', '2 zanahorias', '1 cebolla', '1 pimiento verde', '1 tomate', '1 vaso de vino blanco o sidra', '1 cucharada de aceite de oliva', 'Laurel y sal'],
    pasos: ['Dora el pollo con el aceite y retíralo.', 'En la misma olla, pocha la cebolla, el pimiento y la zanahoria.', 'Añade el tomate rallado y el vino, y deja que se reduzca 5 minutos.', 'Vuelve a poner el pollo con el laurel y un poco de agua.', 'Cuece a fuego suave 40 minutos.'],
    nota: 'Quitar la piel ahorra mucha grasa. La proteína te ayuda a ganar músculo.',
  },
  {
    id: 'bonito-encebollado', emoji: '🐟', tipo: 'Comida o cena', nombre: 'Bonito del norte encebollado',
    kcal: 300, prot: 30, min: 30, raciones: 2,
    ing: ['300 g de bonito del norte fresco', '2 cebollas', '1 pimiento verde', '1 cucharada de aceite de oliva', 'Sal y un chorrito de vinagre'],
    pasos: ['Corta la cebolla y el pimiento en tiras finas.', 'Pocha todo a fuego suave con el aceite, 15 minutos.', 'Añade el bonito en tacos con sal.', 'Cocínalo solo 4 o 5 minutos, para que no quede seco.', 'Termina con un chorrito de vinagre.'],
    nota: 'En verano es temporada de bonito en el Cantábrico. El resto del año, usa bonito en lata escurrido.',
  },
  {
    id: 'ternera-pimientos', emoji: '🥩', tipo: 'Comida o cena', nombre: 'Ternera asturiana con pimientos',
    kcal: 300, prot: 30, min: 20, raciones: 1,
    ing: ['1 filete de ternera asturiana (120 g)', '1 pimiento rojo', '1 cucharadita de aceite de oliva', 'Sal gorda'],
    pasos: ['Asa el pimiento en tiras en la sartén con el aceite, 10 minutos.', 'Haz el filete a la plancha bien caliente, 2 minutos por cada lado.', 'Sirve con sal gorda.'],
    nota: 'La ternera da hierro y proteína. El pimiento rojo, vitamina C.',
  },
  {
    id: 'crema-calabaza', emoji: '🎃', tipo: 'Cena', nombre: 'Crema de calabaza y puerros con queso fresco',
    kcal: 180, prot: 9, min: 35, raciones: 4,
    ing: ['600 g de calabaza', '2 puerros', '1 patata pequeña', '1 cucharada de aceite de oliva', '4 cucharadas de queso fresco batido 0%', 'Sal y nuez moscada'],
    pasos: ['Pocha los puerros con el aceite.', 'Añade la calabaza y la patata en trozos y cúbrelo todo de agua.', 'Cuece 25 minutos.', 'Tritura hasta que quede fina.', 'Sirve con una cucharada de queso fresco por encima.'],
    nota: 'Cena ligera que llena mucho. El queso fresco suma calcio.',
  },
  {
    id: 'tortilla-espinacas', emoji: '🍳', tipo: 'Cena', nombre: 'Tortilla de espinacas',
    kcal: 220, prot: 20, min: 15, raciones: 1,
    ing: ['1 huevo y 2 claras', 'Un puñado grande de espinacas', '1 cucharadita de aceite de oliva', 'Sal'],
    pasos: ['Saltea las espinacas en la sartén con el aceite, 2 minutos.', 'Bate el huevo con las claras y la sal.', 'Échalo sobre las espinacas y cuaja a fuego medio.', 'Dale la vuelta con un plato y deja 1 minuto más.'],
    nota: 'Mucha proteína con pocas calorías. Ideal para cenar.',
  },
  {
    id: 'yogur-manzana', emoji: '🍎', tipo: 'Desayuno o merienda', nombre: 'Yogur con manzana asturiana y nueces',
    kcal: 200, prot: 8, min: 5, raciones: 1,
    ing: ['1 yogur natural desnatado', 'Media manzana asturiana', '3 nueces', 'Canela'],
    pasos: ['Corta la manzana en dados.', 'Ponla sobre el yogur con las nueces troceadas.', 'Espolvorea canela.'],
    nota: 'El yogur da calcio y las nueces, grasas buenas.',
  },
  {
    id: 'requeson-kiwi', emoji: '🥝', tipo: 'Merienda', nombre: 'Requesón con kiwi',
    kcal: 150, prot: 12, min: 3, raciones: 1,
    ing: ['100 g de requesón', '1 kiwi'],
    pasos: ['Pela y corta el kiwi.', 'Mézclalo con el requesón.'],
    nota: 'Asturias produce kiwi muy bueno. Merienda con proteína para los músculos.',
  },
  {
    id: 'arroz-leche', emoji: '🍚', tipo: 'Postre', nombre: 'Arroz con leche ligero',
    kcal: 170, prot: 7, min: 50, raciones: 6,
    ing: ['1 litro de leche desnatada', '80 g de arroz redondo', 'Piel de 1 limón', '1 rama de canela', 'Edulcorante al gusto'],
    pasos: ['Calienta la leche con la piel de limón y la canela.', 'Cuando hierva, añade el arroz y baja el fuego al mínimo.', 'Remueve a menudo durante 45 minutos, hasta que espese.', 'Retira el limón y la canela y añade el edulcorante.', 'Déjalo enfriar y espolvorea canela.'],
    nota: 'Con leche desnatada y sin azúcar, el clásico asturiano entra en la dieta. Y aporta calcio.',
  },
];

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
