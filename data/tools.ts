export type ToolStatus = 'available' | 'planned';

export interface GuitarFlowTool {
  href: string;
  title: string;
  description: string;
  area: 'fretboard' | 'tuner' | 'harmony' | 'theory' | 'rhythm';
  status: ToolStatus;
}

export const guitarFlowTools: GuitarFlowTool[] = [
  {
    href: '/fretboard',
    title: 'Escalas y diapason',
    description: 'Visualiza escalas, tonicas e intervalos directamente sobre el mastil.',
    area: 'fretboard',
    status: 'available',
  },
  {
    href: '/tuner',
    title: 'Afinador',
    description: 'Ajusta la afinacion con lectura cromatica y feedback visual en tiempo real.',
    area: 'tuner',
    status: 'available',
  },
  {
    href: '/chords',
    title: 'Triadas y acordes',
    description: 'Explora la estructura de triadas, cuatriadas, grados y notas del acorde.',
    area: 'harmony',
    status: 'available',
  },
  {
    href: '/progressions',
    title: 'Progresiones',
    description: 'Construye secuencias diatonicas, analiza funcion tonal y transpone ideas.',
    area: 'harmony',
    status: 'available',
  },
  {
    href: '/circle-of-fifths',
    title: 'Circulo de quintas',
    description: 'Conecta tonalidades, relativos, armaduras y alteraciones desde una vista clara.',
    area: 'theory',
    status: 'available',
  },
  {
    href: '/metronome',
    title: 'Metronomo',
    description: 'Practica con pulso estable, tap tempo, compases, subdivisiones y reproductor persistente.',
    area: 'rhythm',
    status: 'available',
  },
];
