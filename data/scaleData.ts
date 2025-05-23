export const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const scalePatterns: Record<string, number[]> = {
  'Jónico':    [0, 2, 4, 5, 7, 9, 11],  // Modo mayor
  'Dórico':    [0, 2, 3, 5, 7, 9, 10],
  'Frigio':    [0, 1, 3, 5, 7, 8, 10],
  'Lidio':     [0, 2, 4, 6, 7, 9, 11],
  'Mixolidio': [0, 2, 4, 5, 7, 9, 10],
  'Eólico':    [0, 2, 3, 5, 7, 8, 10],  // Modo menor natural
  'Locrio':    [0, 1, 3, 5, 6, 8, 10],  // Con 5ª disminuida

  'Pentatónica Mayor': [0, 2, 4, 7, 9],
  'Pentatónica Menor': [0, 3, 5, 7, 10]
};

export type InstrumentType = 'guitar' | 'bass';

export const instrumentStrings: Record<InstrumentType, string[]> = {
  guitar: ['E', 'B', 'G', 'D', 'A', 'E'],      // De agudo a grave - Guitarra estándar
  bass: ['G', 'D', 'A', 'E']                    // De agudo a grave - Bajo estándar
};

export const TOTAL_FRETS = 24;
