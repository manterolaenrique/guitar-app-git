import type { ScaleDeepLinkState } from './deepLinks';

export type LessonCategory = 'technique' | 'theory' | 'improvisation' | 'practice';
export type LessonLevel = 'Inicial' | 'Intermedio' | 'Avanzado';

export interface LessonExercise {
  title: string;
  steps: string[];
}

export interface LessonToolLink {
  title: string;
  description: string;
  tool: string;
  href: string;
  buttonLabel: string;
}

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  level: LessonLevel;
  category: LessonCategory;
  estimatedTime: string;
  concept: string[];
  practice: string[];
  commonMistakes: string[];
  exercises: LessonExercise[];
  checkpoint: string[];
  tips: string[];
  toolLink: LessonToolLink;
}

export interface LearnTopic {
  title: string;
  slug: string;
  description: string;
}

export interface LearnCategory {
  id: LessonCategory;
  title: string;
  description: string;
  topics: LearnTopic[];
}

const fretboardTool = {
  title: 'Verlo en el diapason',
  tool: 'Escalas y diapason',
  href: '/fretboard?root=A&scale=minor-pentatonic&instrument=guitar&view=scale',
  buttonLabel: 'Abrir visualizador',
};

const chordTool = {
  title: 'Explorar acordes',
  tool: 'Triadas y acordes',
  href: '/chords?root=C&type=major',
  buttonLabel: 'Abrir acordes',
};

const progressionTool = {
  title: 'Practicar una progresion',
  tool: 'Progresiones',
  href: '/progressions?root=C&scale=ionian&degrees=1-5-6-4',
  buttonLabel: 'Abrir progresiones',
};

const circleTool = {
  title: 'Ubicar la tonalidad',
  tool: 'Circulo de quintas',
  href: '/circle-of-fifths',
  buttonLabel: 'Abrir circulo',
};

const tunerTool = {
  title: 'Preparar el instrumento',
  tool: 'Afinador',
  href: '/tuner',
  buttonLabel: 'Abrir afinador',
};

export const learnCategories: LearnCategory[] = [
  {
    id: 'technique',
    title: 'Tecnica',
    description: 'Manos sincronizadas, control del sonido y recursos fisicos para tocar con claridad.',
    topics: [
      { title: 'Alternate Picking', slug: 'alternate-picking', description: 'Sincronizacion, direccion y limpieza con pua alternada.' },
      { title: 'Bending', slug: 'bending', description: 'Afinacion, control y llegada expresiva a la nota objetivo.' },
      { title: 'Vibrato', slug: 'vibrato', description: 'Control de pulso, amplitud y estabilidad despues de una nota.' },
      { title: 'Legato', slug: 'legato', description: 'Hammer-ons y pull-offs con volumen parejo.' },
      { title: 'Palm Muting', slug: 'palm-muting', description: 'Control de ataque y duracion con la mano derecha.' },
      { title: 'Downpicking', slug: 'downpicking', description: 'Consistencia ritmica con ataque descendente.' },
      { title: 'Sweep Picking', slug: 'sweep-picking', description: 'Economia de movimiento en arpegios.' },
      { title: 'Tapping', slug: 'tapping', description: 'Notas articuladas con ambas manos.' },
    ],
  },
  {
    id: 'theory',
    title: 'Teoria',
    description: 'Conceptos musicales llevados al mastil para entender que estas tocando.',
    topics: [
      { title: 'Intervalos', slug: 'intervals', description: 'Distancias entre notas y su sonido sobre la guitarra.' },
      { title: 'Escalas', slug: 'scales', description: 'Patrones, formulas y uso musical.' },
      { title: 'Pentatonica', slug: 'pentatonic', description: 'La escala esencial para conectar posiciones e improvisar.' },
      { title: 'Triadas', slug: 'triads', description: 'Acordes de tres notas y sus funciones.' },
      { title: 'Acordes', slug: 'chords', description: 'Construccion armonica aplicada al instrumento.' },
      { title: 'Tonalidades', slug: 'keys', description: 'Centro tonal y relaciones entre escalas y acordes.' },
      { title: 'Armonizacion', slug: 'harmonization', description: 'Acordes derivados de una escala.' },
      { title: 'Progresiones', slug: 'progressions', description: 'Secuencias armonicas y funcion tonal.' },
    ],
  },
  {
    id: 'improvisation',
    title: 'Improvisacion',
    description: 'Ideas para transformar escalas en frases, motivos y musica.',
    topics: [
      { title: 'Como utilizar la pentatonica', slug: 'using-pentatonic', description: 'Del patron visual a frases con sentido.' },
      { title: 'Fraseo', slug: 'phrasing', description: 'Respiracion, pregunta-respuesta y repeticion variada.' },
      { title: 'Notas objetivo', slug: 'target-notes', description: 'Resolver frases hacia notas del acorde.' },
      { title: 'Conectar posiciones', slug: 'connecting-positions', description: 'Moverse por el mastil sin perder el centro tonal.' },
      { title: 'Ritmo en la improvisacion', slug: 'improvisation-rhythm', description: 'Silencios, subdivisiones y motivos ritmicos.' },
    ],
  },
  {
    id: 'practice',
    title: 'Practica',
    description: 'Rutinas simples para convertir conocimiento en habito musical.',
    topics: [
      { title: 'Rutina de 15 minutos', slug: '15-minute-routine', description: 'Una sesion compacta para dias con poco tiempo.' },
      { title: 'Rutina de 30 minutos', slug: '30-minute-routine', description: 'Tecnica, teoria y aplicacion musical equilibradas.' },
      { title: 'Rutina de 60 minutos', slug: '60-minute-routine', description: 'Trabajo profundo con bloques claros.' },
      { title: 'Como practicar con metronomo', slug: 'metronome-practice', description: 'Control, subdivision y progresion de BPM.' },
    ],
  },
];

export const lessons: Lesson[] = [
  {
    slug: 'alternate-picking',
    title: 'Alternate Picking',
    description: 'Aprende a practicar pua alternada con control, sincronizacion y velocidad progresiva.',
    level: 'Inicial',
    category: 'technique',
    estimatedTime: '18 min',
    concept: [
      'Alternate picking significa alternar golpes hacia abajo y hacia arriba de forma constante.',
      'El objetivo inicial no es tocar rapido: es lograr que ambas manos lleguen juntas y que cada nota tenga el mismo volumen.',
    ],
    practice: [
      'Empieza con una cuerda y cuatro notas por pulso lento.',
      'Mantene la pua cerca de la cuerda y evita movimientos grandes.',
      'Subi el tempo solo cuando puedas repetir el patron sin tension ni notas fantasmas.',
    ],
    commonMistakes: [
      'Acelerar antes de que el movimiento sea estable.',
      'Separar demasiado la pua de la cuerda.',
      'Tocar fuerte para compensar falta de control.',
    ],
    exercises: [
      {
        title: 'Cuatro notas por cuerda',
        steps: [
          'Elegir una escala pentatonica menor.',
          'Tocar cuatro notas en una cuerda usando abajo-arriba-abajo-arriba.',
          'Pasar a la cuerda siguiente manteniendo la misma direccion de pua.',
        ],
      },
    ],
    checkpoint: [
      'Podes tocar 60 segundos sin perder la alternancia.',
      'Las notas suenan parejas aunque bajes el volumen de la mano derecha.',
    ],
    tips: [
      'Graba un audio corto: los problemas de sincronizacion se escuchan antes de verse.',
      'Si aparece tension, baja el tempo y achica el movimiento.',
    ],
    toolLink: {
      ...fretboardTool,
      description: 'Usa el visualizador para elegir una pentatonica menor y ubicar un patron simple antes de practicar.',
    },
  },
  {
    slug: 'bending',
    title: 'Bending',
    description: 'Practica bends afinados usando notas objetivo y control de llegada.',
    level: 'Intermedio',
    category: 'technique',
    estimatedTime: '20 min',
    concept: [
      'Un bend no es solo empujar la cuerda: es mover una nota hacia una altura exacta.',
      'La referencia mas importante es la nota objetivo, que debe escucharse antes de ejecutar el bend.',
    ],
    practice: [
      'Toca primero la nota objetivo sin bend.',
      'Volver a la nota inicial y empujar hasta igualar esa altura.',
      'Sostener la llegada sin que la afinacion caiga.',
    ],
    commonMistakes: [
      'No escuchar la nota objetivo antes de empujar.',
      'Llegar apenas bajo o apenas alto y aceptarlo como correcto.',
      'Usar solo un dedo en lugar de apoyar con dedos vecinos.',
    ],
    exercises: [
      {
        title: 'Bend de tono completo',
        steps: [
          'Elegir una posicion comoda de la pentatonica.',
          'Tocar la nota dos trastes arriba como objetivo.',
          'Volver a la nota inicial y hacer el bend hasta igualarla.',
        ],
      },
    ],
    checkpoint: [
      'La nota final del bend coincide con la nota objetivo.',
      'Podes sostener el bend dos pulsos sin perder afinacion.',
    ],
    tips: [
      'Usa menos fuerza y mas rotacion de muneca.',
      'Practica lento: la afinacion del bend es mas importante que la energia del gesto.',
    ],
    toolLink: {
      ...fretboardTool,
      title: 'Ubicar notas objetivo',
      description: 'Visualiza una pentatonica menor para encontrar desde que nota conviene hacer el bend.',
      buttonLabel: 'Ver notas en el mastil',
    },
  },
  {
    slug: 'vibrato',
    title: 'Vibrato',
    description: 'Desarrolla un vibrato estable, afinado y expresivo despues de cada nota.',
    level: 'Intermedio',
    category: 'technique',
    estimatedTime: '16 min',
    concept: [
      'El vibrato es una oscilacion controlada alrededor de una nota, no un movimiento nervioso al final de una frase.',
      'Su calidad depende de tres variables: pulso, amplitud y afinacion del centro.',
    ],
    practice: [
      'Toca una nota larga y espera un pulso antes de iniciar el vibrato.',
      'Mantene una oscilacion lenta y pareja durante cuatro pulsos.',
      'Alterna vibrato estrecho y amplio sin cambiar el tempo interno.',
    ],
    commonMistakes: [
      'Mover el dedo sin escuchar si la nota vuelve al centro.',
      'Hacer vibrato demasiado rapido por tension.',
      'Agregar vibrato a todas las notas sin intencion musical.',
    ],
    exercises: [
      {
        title: 'Vibrato con espera',
        steps: [
          'Elegir una nota de la pentatonica.',
          'Tocarla, sostenerla un pulso limpia y luego iniciar vibrato.',
          'Repetir usando negras, corcheas y tresillos como pulso interno.',
        ],
      },
    ],
    checkpoint: [
      'El vibrato conserva la afinacion de referencia.',
      'Podes variar amplitud sin acelerar el movimiento.',
    ],
    tips: [
      'Escucha guitarristas distintos y copia solo la velocidad del vibrato.',
      'Un vibrato lento y afinado suele sonar mas maduro que uno rapido e inestable.',
    ],
    toolLink: {
      ...fretboardTool,
      description: 'Ubica notas de reposo en una escala para practicar vibrato sobre puntos melodicos fuertes.',
    },
  },
  {
    slug: 'legato',
    title: 'Legato',
    description: 'Trabaja hammer-ons y pull-offs con volumen parejo y articulacion limpia.',
    level: 'Intermedio',
    category: 'technique',
    estimatedTime: '18 min',
    concept: [
      'Legato permite conectar notas con menos ataque de pua, usando fuerza y precision de la mano izquierda.',
      'La meta es que las notas ligadas tengan presencia parecida a las notas atacadas.',
    ],
    practice: [
      'Aisla dos notas en una cuerda y alterna hammer-on y pull-off lento.',
      'Cuida que el pull-off no tire la cuerda fuera de afinacion.',
      'Combina tres notas por cuerda antes de cruzar a otra cuerda.',
    ],
    commonMistakes: [
      'Hacer pull-offs demasiado agresivos.',
      'Perder volumen en la segunda o tercera nota.',
      'Subir velocidad sin limpiar ruido de cuerdas vecinas.',
    ],
    exercises: [
      {
        title: 'Tres notas ligadas',
        steps: [
          'Elegir tres notas consecutivas de una escala.',
          'Atacar solo la primera con pua.',
          'Completar las demas con hammer-on y volver con pull-offs.',
        ],
      },
    ],
    checkpoint: [
      'Las notas ligadas se escuchan completas.',
      'Podes tocar lento sin que el patron se caiga ritmicamente.',
    ],
    tips: [
      'Practica con menos ganancia de la habitual para escuchar inconsistencias.',
      'El silencio entre cuerdas es parte de la tecnica.',
    ],
    toolLink: {
      ...fretboardTool,
      href: '/fretboard?root=C&scale=ionian&instrument=guitar&view=scale',
      description: 'Usa el diapason para elegir grupos de tres notas y construir patrones de legato.',
    },
  },
  {
    slug: 'palm-muting',
    title: 'Palm Muting',
    description: 'Controla ataque, duracion y peso ritmico apoyando la mano derecha.',
    level: 'Inicial',
    category: 'technique',
    estimatedTime: '15 min',
    concept: [
      'Palm muting consiste en apoyar suavemente el borde de la mano sobre las cuerdas cerca del puente.',
      'No se trata de apagar todo: se trata de controlar cuanto sustain queda despues del ataque.',
    ],
    practice: [
      'Toca una cuerda al aire y mueve la mano hacia el puente hasta encontrar claridad.',
      'Alterna notas muteadas y abiertas para escuchar el contraste.',
      'Practica patrones de corcheas con acentos cada cuatro golpes.',
    ],
    commonMistakes: [
      'Apoyar demasiado lejos del puente y matar la nota.',
      'Cambiar la posicion de la mano en cada golpe.',
      'Confundir palm muting con tocar mas fuerte.',
    ],
    exercises: [
      {
        title: 'Riff de control',
        steps: [
          'Elegir una cuerda grave afinada.',
          'Tocar ocho corcheas muteadas a tempo medio.',
          'Abrir la ultima corchea de cada compas para comparar sustain.',
        ],
      },
    ],
    checkpoint: [
      'El mute mantiene pitch reconocible.',
      'Podes repetir el patron sin que cambie el nivel de apagado.',
    ],
    tips: [
      'La posicion de la mano derecha es milimetrica: pequenos cambios importan.',
      'Usa el afinador antes de practicar riffs graves para no entrenar una referencia mala.',
    ],
    toolLink: {
      ...tunerTool,
      description: 'Afina antes de trabajar riffs muteados para que el control ritmico no tape problemas de pitch.',
    },
  },
  {
    slug: 'downpicking',
    title: 'Downpicking',
    description: 'Construye consistencia y resistencia con ataques descendentes controlados.',
    level: 'Intermedio',
    category: 'technique',
    estimatedTime: '17 min',
    concept: [
      'Downpicking usa golpes hacia abajo para lograr ataque uniforme y peso ritmico.',
      'La dificultad esta en sostener relajacion mientras el tempo sube.',
    ],
    practice: [
      'Empieza con corcheas en una cuerda grave a tempo comodo.',
      'Descansa la mano si aparece tension en antebrazo u hombro.',
      'Sube de a pocos BPM solo si el ataque sigue sonando igual.',
    ],
    commonMistakes: [
      'Bloquear la muneca y tocar desde el brazo.',
      'Practicar siempre al limite de velocidad.',
      'Perder precision en acentos y silencios.',
    ],
    exercises: [
      {
        title: 'Corcheas con acentos',
        steps: [
          'Tocar ocho corcheas con golpes hacia abajo.',
          'Acentuar la primera de cada grupo de cuatro.',
          'Repetir dos minutos sin aumentar tempo.',
        ],
      },
    ],
    checkpoint: [
      'El ataque se mantiene estable durante al menos un minuto.',
      'La mano no se endurece al agregar acentos.',
    ],
    tips: [
      'La resistencia se construye con volumen de practica, no con fuerza.',
      'Anota el tempo limpio del dia para medir progreso real.',
    ],
    toolLink: {
      ...tunerTool,
      description: 'Usa el afinador antes de rutinas de downpicking en cuerdas graves y riffs repetitivos.',
    },
  },
  {
    slug: 'sweep-picking',
    title: 'Sweep Picking',
    description: 'Aprende a barrer arpegios con economia de movimiento y notas separadas.',
    level: 'Avanzado',
    category: 'technique',
    estimatedTime: '24 min',
    concept: [
      'Sweep picking aprovecha una misma direccion de pua para cruzar cuerdas de forma economica.',
      'Aunque el movimiento parece continuo, las notas deben sonar separadas y no como un rasgueo.',
    ],
    practice: [
      'Empieza con triadas de tres cuerdas a tempo muy lento.',
      'Sincroniza el apagado de cada nota antes de tocar la siguiente.',
      'Agrega direccion inversa solo cuando el barrido descendente sea claro.',
    ],
    commonMistakes: [
      'Rasguear el arpegio sin separar notas.',
      'Dejar dedos apoyados y generar acordes accidentales.',
      'Buscar velocidad antes de controlar muting.',
    ],
    exercises: [
      {
        title: 'Triada de tres cuerdas',
        steps: [
          'Elegir una triada mayor simple.',
          'Barrer tres cuerdas hacia abajo, una nota por cuerda.',
          'Volver hacia arriba apagando cada cuerda al salir.',
        ],
      },
    ],
    checkpoint: [
      'Cada nota del arpegio se distingue con claridad.',
      'No queda un acorde sonando al terminar el barrido.',
    ],
    tips: [
      'Practica primero sin distorsion para exponer ruido.',
      'El muting es tan importante como la direccion de pua.',
    ],
    toolLink: {
      ...chordTool,
      description: 'Revisa las notas de una triada antes de convertirla en arpegio para sweep picking.',
    },
  },
  {
    slug: 'tapping',
    title: 'Tapping',
    description: 'Integra notas percutidas con ambas manos sin perder ritmo ni limpieza.',
    level: 'Avanzado',
    category: 'technique',
    estimatedTime: '22 min',
    concept: [
      'Tapping agrega notas con la mano derecha directamente sobre el diapason.',
      'Funciona mejor cuando se piensa como una extension del legato y no como un truco aislado.',
    ],
    practice: [
      'Arma un grupo de tres notas: una tocada, una ligada y una con tapping.',
      'Cuida que la nota tap tenga volumen parecido al resto.',
      'Usa muting de ambas manos para controlar cuerdas vecinas.',
    ],
    commonMistakes: [
      'Golpear demasiado fuerte y desafinar la nota.',
      'No retirar el dedo de tapping con direccion clara.',
      'Ignorar el ritmo por concentrarse solo en la tecnica.',
    ],
    exercises: [
      {
        title: 'Patron 1-2-tap',
        steps: [
          'Elegir dos notas de la mano izquierda en una cuerda.',
          'Agregar una tercera nota con tapping doce trastes arriba.',
          'Repetir en tresillos lentos hasta igualar volumen.',
        ],
      },
    ],
    checkpoint: [
      'La nota de tapping no suena mas fuerte ni mas debil que las demas.',
      'El patron mantiene subdivision clara.',
    ],
    tips: [
      'Menos fuerza suele dar mas control.',
      'Usa una escala visible para elegir notas que pertenezcan al contexto armonico.',
    ],
    toolLink: {
      ...fretboardTool,
      description: 'Visualiza la escala para elegir notas de tapping que encajen con la tonalidad.',
    },
  },
  {
    slug: 'intervals',
    title: 'Intervalos',
    description: 'Comprende las distancias entre notas y aprende a reconocerlas en el mastil.',
    level: 'Inicial',
    category: 'theory',
    estimatedTime: '20 min',
    concept: [
      'Un intervalo es la distancia entre dos notas.',
      'En guitarra, entender intervalos ayuda a construir escalas, acordes, riffs y frases sin depender solo de formas memorizadas.',
    ],
    practice: [
      'Elige una tonica y localiza segunda, tercera, cuarta, quinta y septima alrededor.',
      'Toca cada intervalo ascendente y descendente.',
      'Asocia cada distancia con una sensacion: reposo, tension, apertura o resolucion.',
    ],
    commonMistakes: [
      'Aprender nombres sin ubicarlos en el instrumento.',
      'Pensar solo en trastes y no en sonido.',
      'Confundir intervalo melodico con acorde completo.',
    ],
    exercises: [
      {
        title: 'Mapa desde una tonica',
        steps: [
          'Elegir C como tonica.',
          'Buscar tercera mayor, quinta justa y septima menor.',
          'Tocar pequenas frases que usen solo esos intervalos.',
        ],
      },
    ],
    checkpoint: [
      'Podes ubicar una quinta justa desde distintas cuerdas.',
      'Reconoces si una tercera suena mayor o menor.',
    ],
    tips: [
      'Canta el intervalo antes de tocarlo.',
      'Los acordes son intervalos apilados: esta leccion sostiene mucha teoria posterior.',
    ],
    toolLink: {
      ...fretboardTool,
      href: '/fretboard?root=C&scale=ionian&instrument=guitar&view=scale',
      description: 'Usa el diapason para ubicar intervalos alrededor de una tonica.',
    },
  },
  {
    slug: 'scales',
    title: 'Escalas',
    description: 'Aprende a leer escalas como formulas de intervalos y no solo como dibujos.',
    level: 'Inicial',
    category: 'theory',
    estimatedTime: '22 min',
    concept: [
      'Una escala es una seleccion organizada de notas alrededor de una tonica.',
      'Cada escala tiene una formula de intervalos que define su color.',
    ],
    practice: [
      'Elige una escala y observa sus notas en una sola posicion.',
      'Identifica la tonica antes de tocar el patron completo.',
      'Crea frases cortas que no empiecen siempre desde la primera nota.',
    ],
    commonMistakes: [
      'Subir y bajar patrones sin saber que nota es la tonica.',
      'Cambiar de escala sin escuchar su color.',
      'Tocar todas las notas disponibles en cada frase.',
    ],
    exercises: [
      {
        title: 'Formula y sonido',
        steps: [
          'Abrir C jonico en el visualizador.',
          'Tocar solo tonica, tercera y quinta.',
          'Agregar el resto de notas de a una y escuchar como cambia el color.',
        ],
      },
    ],
    checkpoint: [
      'Podes explicar que notas forman la escala elegida.',
      'Podes tocar una frase que termine en la tonica.',
    ],
    tips: [
      'La escala es vocabulario; la musica aparece cuando armas frases.',
      'Aprende menos patrones, pero con mas conciencia.',
    ],
    toolLink: {
      ...fretboardTool,
      href: '/fretboard?root=C&scale=ionian&instrument=guitar&view=scale',
      description: 'Compara formulas y notas directamente sobre el diapason.',
    },
  },
  {
    slug: 'pentatonic',
    title: 'Pentatonica',
    description: 'Entende la pentatonica como material musical, no solo como una forma memorizada.',
    level: 'Inicial',
    category: 'theory',
    estimatedTime: '22 min',
    concept: [
      'La escala pentatonica menor tiene cinco notas y funciona muy bien sobre blues, rock, pop y muchas progresiones menores.',
      'Memorizar la forma ayuda, pero el salto real ocurre cuando reconoces tonica, intervalos y notas de reposo.',
    ],
    practice: [
      'Elegi una tonalidad y localiza todas las tonicas visibles.',
      'Toca frases cortas que terminen en la tonica o en una nota del acorde.',
      'Cambia el ritmo antes de cambiar de posicion.',
    ],
    commonMistakes: [
      'Subir y bajar la caja como ejercicio automatico.',
      'No saber donde esta la tonica.',
      'Tocar demasiadas notas sin silencios ni direccion.',
    ],
    exercises: [
      {
        title: 'Tres notas objetivo',
        steps: [
          'Elegir A menor pentatonica.',
          'Marcar tonica, tercera menor y quinta.',
          'Crear frases de dos compases que terminen en una de esas notas.',
        ],
      },
    ],
    checkpoint: [
      'Podes ubicar la tonica en mas de una cuerda.',
      'Tus frases no dependen de tocar la escala completa de principio a fin.',
    ],
    tips: [
      'Repeti un motivo pequeno y cambiale solo el final.',
      'La pentatonica se vuelve musical cuando hay ritmo, silencios y resolucion.',
    ],
    toolLink: {
      ...fretboardTool,
      title: 'Explorar la pentatonica menor',
      description: 'Abre el diapason configurado en A menor pentatonica para ver tonicas y notas disponibles.',
      buttonLabel: 'Explorar escala',
    },
  },
  {
    slug: 'triads',
    title: 'Triadas',
    description: 'Construye acordes de tres notas y entiende su funcion en el instrumento.',
    level: 'Inicial',
    category: 'theory',
    estimatedTime: '21 min',
    concept: [
      'Una triada es un acorde formado por tonica, tercera y quinta.',
      'Cambiar la tercera o la quinta modifica la cualidad del acorde: mayor, menor, disminuido o aumentado.',
    ],
    practice: [
      'Elige una tonica y compara triada mayor y menor.',
      'Toca las notas por separado antes de pensarlas como acorde.',
      'Busca la misma triada en distintas zonas del mastil.',
    ],
    commonMistakes: [
      'Memorizar formas sin conocer que nota cumple cada funcion.',
      'Confundir inversion con tipo de acorde.',
      'No escuchar la diferencia entre tercera mayor y menor.',
    ],
    exercises: [
      {
        title: 'Mayor contra menor',
        steps: [
          'Abrir C mayor en la herramienta de acordes.',
          'Cambiar a C menor y detectar que nota se mueve.',
          'Tocar ambas triadas como arpegio lento.',
        ],
      },
    ],
    checkpoint: [
      'Podes nombrar las tres notas de una triada mayor.',
      'Podes explicar que cambia para volverla menor.',
    ],
    tips: [
      'La tercera define gran parte del color.',
      'Pensar en grados ayuda a mover triadas por el mastil.',
    ],
    toolLink: {
      ...chordTool,
      description: 'Usa la herramienta de acordes para ver grados y notas de cada triada.',
    },
  },
  {
    slug: 'chords',
    title: 'Acordes',
    description: 'Entiende los acordes como combinaciones de intervalos aplicadas a una tonalidad.',
    level: 'Inicial',
    category: 'theory',
    estimatedTime: '23 min',
    concept: [
      'Un acorde es un conjunto de notas que suenan con una funcion armonica.',
      'En guitarra, un mismo acorde puede aparecer en muchas posiciones e inversiones.',
    ],
    practice: [
      'Elige un acorde y separa sus notas.',
      'Toca el acorde como bloque y despues como arpegio.',
      'Compara triada y cuatriada agregando septima.',
    ],
    commonMistakes: [
      'Pensar acordes solo como dibujos de mano izquierda.',
      'No saber que nota es la tonica.',
      'Agregar extensiones sin entender su funcion.',
    ],
    exercises: [
      {
        title: 'Del acorde al arpegio',
        steps: [
          'Elegir C mayor.',
          'Tocar sus notas una por una.',
          'Agregar septima y escuchar como cambia la estabilidad.',
        ],
      },
    ],
    checkpoint: [
      'Podes separar notas de un acorde simple.',
      'Podes reconocer si una septima agrega tension o reposo.',
    ],
    tips: [
      'Cada forma de acorde contiene informacion melodica.',
      'Aprender acordes como notas mejora improvisacion y composicion.',
    ],
    toolLink: {
      ...chordTool,
      href: '/chords?root=C&type=major&tetrad=true',
      description: 'Compara triadas y cuatriadas desde la herramienta actual.',
    },
  },
  {
    slug: 'keys',
    title: 'Tonalidades',
    description: 'Comprende el centro tonal y la relacion entre notas, escalas y acordes.',
    level: 'Inicial',
    category: 'theory',
    estimatedTime: '20 min',
    concept: [
      'Una tonalidad organiza la musica alrededor de un centro de reposo.',
      'Saber en que tonalidad estas te ayuda a elegir escalas, acordes y notas objetivo.',
    ],
    practice: [
      'Elige una tonalidad y ubica su relativa menor.',
      'Identifica tonica, dominante y subdominante.',
      'Toca una progresion simple y escucha donde resuelve.',
    ],
    commonMistakes: [
      'Confundir nota inicial con tonalidad real.',
      'No relacionar tonalidad con acordes disponibles.',
      'Ignorar alteraciones de la armadura.',
    ],
    exercises: [
      {
        title: 'Centro y relativo',
        steps: [
          'Abrir el circulo de quintas.',
          'Elegir una tonalidad mayor y ubicar su relativa menor.',
          'Crear una progresion corta en esa tonalidad.',
        ],
      },
    ],
    checkpoint: [
      'Podes explicar cual es el centro tonal de una progresion.',
      'Podes encontrar una relativa menor usando el circulo.',
    ],
    tips: [
      'La tonalidad se confirma por resolucion, no solo por escala.',
      'El circulo de quintas es una brujula para moverte entre centros.',
    ],
    toolLink: {
      ...circleTool,
      description: 'Usa el circulo para ubicar tonalidades, relativos y alteraciones.',
    },
  },
  {
    slug: 'harmonization',
    title: 'Armonizacion',
    description: 'Aprende a derivar acordes desde una escala y entender su funcion.',
    level: 'Intermedio',
    category: 'theory',
    estimatedTime: '26 min',
    concept: [
      'Armonizar una escala significa construir acordes sobre cada uno de sus grados.',
      'Esto explica por que ciertos acordes aparecen juntos de forma natural en una tonalidad.',
    ],
    practice: [
      'Elige una escala mayor y construye acordes por grado.',
      'Observa que algunos grados tienen funcion de reposo y otros de tension.',
      'Toca progresiones usando solo acordes diatonicos.',
    ],
    commonMistakes: [
      'Memorizar listas de acordes sin relacionarlas con grados.',
      'Pensar que todos los acordes cumplen la misma funcion.',
      'No escuchar como resuelve la dominante.',
    ],
    exercises: [
      {
        title: 'I, IV y V',
        steps: [
          'Abrir progresiones en C jonico.',
          'Cargar o armar I-IV-V.',
          'Escuchar como cada grado empuja o descansa.',
        ],
      },
    ],
    checkpoint: [
      'Podes nombrar los acordes principales de una tonalidad mayor.',
      'Podes distinguir tonica, subdominante y dominante.',
    ],
    tips: [
      'Armonizacion conecta teoria con canciones reales.',
      'Empieza con triadas antes de sumar septimas.',
    ],
    toolLink: {
      ...progressionTool,
      description: 'Usa el laboratorio de progresiones para ver acordes diatonicos por grado.',
    },
  },
  {
    slug: 'progressions',
    title: 'Progresiones',
    description: 'Construye secuencias armonicas y entiende como se mueve la funcion tonal.',
    level: 'Intermedio',
    category: 'theory',
    estimatedTime: '24 min',
    concept: [
      'Una progresion es una secuencia de acordes que crea movimiento, tension y resolucion.',
      'Los grados permiten transportar una idea a cualquier tonalidad sin perder estructura.',
    ],
    practice: [
      'Empieza con I-IV-V o I-V-vi-IV.',
      'Toca cada acorde como bloque y luego como arpegio.',
      'Transpone la progresion para escuchar la misma funcion en otra altura.',
    ],
    commonMistakes: [
      'Memorizar nombres de acordes sin entender grados.',
      'Cambiar acordes sin pulso estable.',
      'No escuchar donde la progresion descansa.',
    ],
    exercises: [
      {
        title: 'I-V-vi-IV',
        steps: [
          'Abrir la progresion en C.',
          'Identificar que acorde ocupa cada grado.',
          'Transponer hacia arriba y mantener la misma secuencia.',
        ],
      },
    ],
    checkpoint: [
      'Podes escribir una progresion en grados.',
      'Podes transportarla sin cambiar su funcion.',
    ],
    tips: [
      'Los grados son mas importantes que los nombres absolutos cuando estudias canciones.',
      'Canta la resolucion antes de tocar el ultimo acorde.',
    ],
    toolLink: {
      ...progressionTool,
      description: 'Abre una progresion comun y analiza sus grados activos.',
    },
  },
  {
    slug: 'using-pentatonic',
    title: 'Como utilizar la pentatonica',
    description: 'Convierte la pentatonica en frases con direccion, ritmo y resolucion.',
    level: 'Inicial',
    category: 'improvisation',
    estimatedTime: '20 min',
    concept: [
      'Usar la pentatonica no significa tocar la caja completa.',
      'La escala se vuelve musical cuando eliges notas objetivo, silencios y motivos repetibles.',
    ],
    practice: [
      'Elige tres notas dentro de la posicion.',
      'Crea una frase corta y repetila con pequenas variaciones.',
      'Termina algunas frases en la tonica y otras en la tercera menor o quinta.',
    ],
    commonMistakes: [
      'Tocar demasiadas notas sin respirar.',
      'Resolver siempre en la misma cuerda.',
      'No variar ritmo ni articulacion.',
    ],
    exercises: [
      {
        title: 'Frase de tres notas',
        steps: [
          'Elegir A menor pentatonica.',
          'Usar solo tres notas durante dos minutos.',
          'Cambiar ritmo antes de agregar nuevas notas.',
        ],
      },
    ],
    checkpoint: [
      'Podes crear una frase reconocible con pocas notas.',
      'Podes repetir un motivo sin sonar mecanico.',
    ],
    tips: [
      'La limitacion de notas obliga a pensar en ritmo.',
      'Una buena frase suele tener un final claro.',
    ],
    toolLink: {
      ...fretboardTool,
      description: 'Ubica pocas notas de la pentatonica y usalas como material de fraseo.',
    },
  },
  {
    slug: 'phrasing',
    title: 'Fraseo',
    description: 'Aprende a construir ideas musicales con respiracion, repeticion y contraste.',
    level: 'Intermedio',
    category: 'improvisation',
    estimatedTime: '21 min',
    concept: [
      'Frasear es organizar notas como si fueran lenguaje: una idea, una pausa y una respuesta.',
      'La calidad no depende de la cantidad de notas, sino de direccion, ritmo y cierre.',
    ],
    practice: [
      'Toca una frase de dos compases y deja dos compases de silencio.',
      'Repite la frase cambiando solo el final.',
      'Usa bends, vibrato o slides como puntuacion, no como relleno.',
    ],
    commonMistakes: [
      'No dejar espacios.',
      'Cambiar de idea antes de desarrollar la anterior.',
      'Tocar escalas en vez de frases.',
    ],
    exercises: [
      {
        title: 'Pregunta y respuesta',
        steps: [
          'Crear una pregunta musical de un compas.',
          'Responder en el compas siguiente con ritmo parecido.',
          'Repetir cambiando solo la nota final.',
        ],
      },
    ],
    checkpoint: [
      'Tu frase se puede cantar sin guitarra.',
      'Hay silencios claros entre ideas.',
    ],
    tips: [
      'Graba y escucha si la frase tiene forma.',
      'Repetir una idea con variacion suele sonar mas musical que empezar de cero.',
    ],
    toolLink: {
      ...fretboardTool,
      description: 'Elige una escala y marca puntos de reposo para construir frases con cierre.',
    },
  },
  {
    slug: 'target-notes',
    title: 'Notas objetivo',
    description: 'Resuelve frases hacia notas del acorde para que la improvisacion siga la armonia.',
    level: 'Intermedio',
    category: 'improvisation',
    estimatedTime: '23 min',
    concept: [
      'Una nota objetivo es una nota elegida para cerrar o destacar una frase.',
      'Cuando esa nota pertenece al acorde activo, la frase se siente conectada a la armonia.',
    ],
    practice: [
      'Elige una progresion y marca las notas de cada acorde.',
      'Improvisa frases cortas que terminen en tonica, tercera o quinta del acorde.',
      'Practica llegar a la nota objetivo justo cuando cambia el acorde.',
    ],
    commonMistakes: [
      'Improvisar sobre la escala sin mirar los acordes.',
      'Resolver siempre en la tonica.',
      'Llegar tarde al cambio armonico.',
    ],
    exercises: [
      {
        title: 'Llegada al acorde',
        steps: [
          'Abrir una progresion I-V-vi-IV.',
          'Elegir una nota del acorde para cada cambio.',
          'Crear frases que terminen en esa nota.',
        ],
      },
    ],
    checkpoint: [
      'Podes nombrar la nota a la que queres llegar antes de tocar.',
      'Tus frases siguen los cambios de acordes.',
    ],
    tips: [
      'La tercera del acorde suele definir muy bien el color.',
      'Pensar en destino simplifica la improvisacion.',
    ],
    toolLink: {
      ...progressionTool,
      description: 'Usa progresiones para elegir notas objetivo sobre cada acorde.',
    },
  },
  {
    slug: 'connecting-positions',
    title: 'Conectar posiciones',
    description: 'Muevete por el mastil sin perder tonica, escala ni direccion melodica.',
    level: 'Intermedio',
    category: 'improvisation',
    estimatedTime: '24 min',
    concept: [
      'Conectar posiciones significa ver la escala como un mapa continuo, no como cajas aisladas.',
      'La clave es reconocer tonicas y notas comunes entre posiciones vecinas.',
    ],
    practice: [
      'Elige dos posiciones cercanas de la pentatonica.',
      'Busca una nota comun o una nota puente entre ambas.',
      'Crea una frase que empiece en una posicion y termine en otra.',
    ],
    commonMistakes: [
      'Saltar posiciones sin saber donde esta la tonica.',
      'Conectar solo con slides rapidos sin frase clara.',
      'Perder el ritmo durante el desplazamiento.',
    ],
    exercises: [
      {
        title: 'Frase horizontal',
        steps: [
          'Abrir A menor pentatonica.',
          'Elegir una tonica grave y una tonica aguda.',
          'Crear una frase que conecte ambas sin tocar la escala completa.',
        ],
      },
    ],
    checkpoint: [
      'Podes moverte a otra zona y resolver en una tonica.',
      'El desplazamiento suena como frase, no como ejercicio.',
    ],
    tips: [
      'Las tonicas son puntos de referencia, no jaulas.',
      'Conecta dos posiciones antes de intentar recorrer todo el mastil.',
    ],
    toolLink: {
      ...fretboardTool,
      description: 'Usa el visualizador para ver la escala como mapa completo del mastil.',
    },
  },
  {
    slug: 'improvisation-rhythm',
    title: 'Ritmo en la improvisacion',
    description: 'Usa silencios, subdivisiones y motivos ritmicos para que tus frases respiren.',
    level: 'Inicial',
    category: 'improvisation',
    estimatedTime: '18 min',
    concept: [
      'El ritmo define gran parte de una frase, incluso si usas pocas notas.',
      'Cambiar la subdivision o dejar silencios puede transformar una escala simple en una idea musical.',
    ],
    practice: [
      'Usa una sola nota y crea variaciones ritmicas.',
      'Alterna negras, corcheas y silencios.',
      'Despues agrega dos notas mas sin cambiar el motivo ritmico.',
    ],
    commonMistakes: [
      'Tocar todas las frases con la misma subdivision.',
      'Rellenar cada espacio con notas.',
      'Perder pulso durante silencios.',
    ],
    exercises: [
      {
        title: 'Una nota, tres ritmos',
        steps: [
          'Elegir una nota de la pentatonica.',
          'Crear tres patrones ritmicos distintos.',
          'Repetirlos y luego moverlos a otra nota.',
        ],
      },
    ],
    checkpoint: [
      'Podes mantener el pulso aunque no estes tocando.',
      'Una frase con pocas notas sigue teniendo identidad.',
    ],
    tips: [
      'Los silencios tambien forman parte de la frase.',
      'Antes de agregar notas, mejora el ritmo de las que ya usas.',
    ],
    toolLink: {
      ...fretboardTool,
      description: 'Elige pocas notas visibles y concentrate en variar el ritmo.',
    },
  },
  {
    slug: '15-minute-routine',
    title: 'Rutina de 15 minutos',
    description: 'Organiza una sesion corta para mantener continuidad aun con poco tiempo.',
    level: 'Inicial',
    category: 'practice',
    estimatedTime: '15 min',
    concept: [
      'Una rutina corta debe tener un objetivo claro y evitar saltar entre demasiados temas.',
      'La continuidad diaria vale mas que una sesion larga hecha sin foco.',
    ],
    practice: [
      'Dedica cinco minutos a tecnica lenta.',
      'Dedica cinco minutos a una escala o acorde.',
      'Dedica cinco minutos a aplicar eso en una frase o progresion.',
    ],
    commonMistakes: [
      'Intentar practicar todo en quince minutos.',
      'Empezar sin afinar ni definir objetivo.',
      'Medir la sesion por velocidad y no por calidad.',
    ],
    exercises: [
      {
        title: 'Bloque compacto',
        steps: [
          'Afinar la guitarra.',
          'Practicar alternate picking lento cinco minutos.',
          'Usar A menor pentatonica para crear tres frases simples.',
        ],
      },
    ],
    checkpoint: [
      'Terminaste con una idea concreta mejor que al inicio.',
      'No cambiaste de foco mas de tres veces.',
    ],
    tips: [
      'Deja anotado que vas a practicar antes de empezar.',
      'Una rutina corta debe sentirse posible, no heroica.',
    ],
    toolLink: {
      ...tunerTool,
      description: 'Empieza la rutina afinando para que cada minuto de practica tenga buena referencia sonora.',
    },
  },
  {
    slug: '30-minute-routine',
    title: 'Rutina de 30 minutos',
    description: 'Equilibra tecnica, teoria aplicada y musica en una sesion mantenible.',
    level: 'Inicial',
    category: 'practice',
    estimatedTime: '30 min',
    concept: [
      'Treinta minutos alcanzan para trabajar un recurso tecnico y aplicarlo musicalmente.',
      'La sesion debe tener bloques con cierre, no una lista infinita de ejercicios.',
    ],
    practice: [
      'Diez minutos de tecnica con tempo controlado.',
      'Diez minutos de mapa teorico: escala, acorde o progresion.',
      'Diez minutos de aplicacion: riff, frase o improvisacion guiada.',
    ],
    commonMistakes: [
      'Pasar media hora calentando sin aplicar nada.',
      'Cambiar de ejercicio cada dos minutos.',
      'No registrar tempos o dificultades.',
    ],
    exercises: [
      {
        title: 'Tecnica + escala + frase',
        steps: [
          'Practicar legato lento en una cuerda.',
          'Abrir C jonico y elegir tres notas objetivo.',
          'Crear una frase que use legato y termine en una nota del acorde.',
        ],
      },
    ],
    checkpoint: [
      'Cada bloque tuvo una meta simple.',
      'La aplicacion musical uso el material tecnico trabajado.',
    ],
    tips: [
      'Usa temporizador para no consumir toda la sesion en un solo bloque.',
      'Anota una sola cosa a mejorar manana.',
    ],
    toolLink: {
      ...fretboardTool,
      href: '/fretboard?root=C&scale=ionian&instrument=guitar&view=scale',
      description: 'Usa el visualizador como bloque central de teoria aplicada dentro de la rutina.',
    },
  },
  {
    slug: '60-minute-routine',
    title: 'Rutina de 60 minutos',
    description: 'Estructura una practica profunda con tecnica, armonia, improvisacion y repaso.',
    level: 'Intermedio',
    category: 'practice',
    estimatedTime: '60 min',
    concept: [
      'Una hora permite trabajar profundidad, pero solo si cada bloque tiene prioridad clara.',
      'La rutina debe cerrar conectando tecnica y teoria con musica real.',
    ],
    practice: [
      'Diez minutos de calentamiento y afinacion.',
      'Quince minutos de tecnica especifica.',
      'Quince minutos de teoria aplicada a herramienta.',
      'Quince minutos de improvisacion o composicion.',
      'Cinco minutos de notas y seguimiento.',
    ],
    commonMistakes: [
      'Practicar una hora sin descansos ni cambios de foco.',
      'Separar tecnica y musica como mundos distintos.',
      'No cerrar con registro de progreso.',
    ],
    exercises: [
      {
        title: 'Sesion completa',
        steps: [
          'Afinar y elegir una tonalidad.',
          'Practicar una tecnica sobre una escala real.',
          'Armar una progresion y crear frases que la sigan.',
        ],
      },
    ],
    checkpoint: [
      'La sesion termino con una aplicacion musical grabable.',
      'Sabes que tempo, tonalidad o recurso queda para la proxima practica.',
    ],
    tips: [
      'Una rutina larga necesita pausas breves para mantener calidad.',
      'Graba los ultimos cinco minutos para escuchar progreso real.',
    ],
    toolLink: {
      ...progressionTool,
      description: 'Usa una progresion como eje musical para integrar tecnica, teoria e improvisacion.',
    },
  },
  {
    slug: 'metronome-practice',
    title: 'Como practicar con metronomo',
    description: 'Usa el metronomo para desarrollar control, subdivision y progreso medible.',
    level: 'Inicial',
    category: 'practice',
    estimatedTime: '18 min',
    concept: [
      'Practicar con metronomo no es perseguir BPM: es comprobar estabilidad y control.',
      'El tempo correcto es aquel donde podes repetir el ejercicio con sonido limpio y relajacion.',
    ],
    practice: [
      'Elige un tempo donde el ejercicio se sienta facil.',
      'Toca ciclos cortos y descansa antes de que aparezca tension.',
      'Sube 3 a 5 BPM solo cuando logres varias repeticiones limpias.',
    ],
    commonMistakes: [
      'Subir tempo despues de una sola repeticion buena.',
      'Tocar por encima del click sin escucharlo.',
      'Ignorar el sonido por mirar solo el numero de BPM.',
    ],
    exercises: [
      {
        title: 'Tres tempos',
        steps: [
          'Tocar un patron a tempo comodo durante un minuto.',
          'Subir 5 BPM y repetir.',
          'Volver al tempo inicial y comprobar si suena mas estable.',
        ],
      },
    ],
    checkpoint: [
      'Podes tocar con el click sin empujarlo ni arrastrarlo.',
      'Sabes cual fue tu tempo limpio, no solo tu tempo maximo.',
    ],
    tips: [
      'Practica tambien muy lento: ahi aparecen los huecos ritmicos.',
      'El metronomo mide consistencia, no valor personal.',
    ],
    toolLink: {
      ...fretboardTool,
      description: 'Elige una escala simple y usala como material para practicar subdivisiones con metronomo externo.',
    },
  },
];

export const lessonBySlug = new Map(lessons.map((lesson) => [lesson.slug, lesson]));

export function getLesson(slug: string): Lesson | undefined {
  return lessonBySlug.get(slug);
}

export function getCategoryTitle(category: LessonCategory): string {
  return learnCategories.find((item) => item.id === category)?.title || category;
}

export function getScaleLessonDefaults(): ScaleDeepLinkState {
  return {
    root: 'A',
    scale: 'Pentatónica Menor',
    instrument: 'guitar',
    view: 'scale',
  };
}
