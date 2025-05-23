export type ShapeType = 'Fundamental' | '1ª Inversión' | '2ª Inversión';
export type ChordType = 'Mayor' | 'Menor' | 'Disminuido' | 'Aumentado';

export interface Position {
  string: number; // 0 = primera cuerda (E aguda), 5 = sexta cuerda (E grave)
  fret: number;
  label: string; // 'T', '3', '♭3', '5', '♯5', '7', etc.
}

export const chordShapes: Record<ChordType, Record<ShapeType, Position[]>> = {
  Mayor: {
    Fundamental: [
      { string: 5, fret: 3, label: 'T' },
      { string: 4, fret: 2, label: '3' },
      { string: 3, fret: 0, label: '5' },
    ],
    "1ª Inversión": [
      { string: 4, fret: 2, label: '3' },
      { string: 3, fret: 0, label: '5' },
      { string: 2, fret: 1, label: 'T' },
    ],
    "2ª Inversión": [
      { string: 3, fret: 0, label: '5' },
      { string: 2, fret: 1, label: 'T' },
      { string: 1, fret: 0, label: '3' },
    ],
  },
  Menor: {
    Fundamental: [
      { string: 5, fret: 3, label: 'T' },
      { string: 4, fret: 1, label: '♭3' },
      { string: 3, fret: 0, label: '5' },
    ],
    "1ª Inversión": [
      { string: 4, fret: 1, label: '♭3' },
      { string: 3, fret: 0, label: '5' },
      { string: 2, fret: 1, label: 'T' },
    ],
    "2ª Inversión": [
      { string: 3, fret: 0, label: '5' },
      { string: 2, fret: 1, label: 'T' },
      { string: 1, fret: 1, label: '♭3' },
    ],
  },
  Disminuido: {
    Fundamental: [
      { string: 5, fret: 3, label: 'T' },
      { string: 4, fret: 1, label: '♭3' },
      { string: 3, fret: 1, label: '♭5' },
    ],
    "1ª Inversión": [
      { string: 4, fret: 1, label: '♭3' },
      { string: 3, fret: 1, label: '♭5' },
      { string: 2, fret: 1, label: 'T' },
    ],
    "2ª Inversión": [
      { string: 3, fret: 1, label: '♭5' },
      { string: 2, fret: 1, label: 'T' },
      { string: 1, fret: 1, label: '♭3' },
    ],
  },
  Aumentado: {
    Fundamental: [
      { string: 5, fret: 3, label: 'T' },
      { string: 4, fret: 2, label: '3' },
      { string: 3, fret: 1, label: '♯5' },
    ],
    "1ª Inversión": [
      { string: 4, fret: 2, label: '3' },
      { string: 3, fret: 1, label: '♯5' },
      { string: 2, fret: 1, label: 'T' },
    ],
    "2ª Inversión": [
      { string: 3, fret: 1, label: '♯5' },
      { string: 2, fret: 1, label: 'T' },
      { string: 1, fret: 0, label: '3' },
    ],
  },
};
