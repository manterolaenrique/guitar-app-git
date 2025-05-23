// /data/chordFormulas.ts

export const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const chordFormulas = {
  Mayor: [0, 4, 7],
  Menor: [0, 3, 7],
  Disminuido: [0, 3, 6],
  Aumentado: [0, 4, 8]
};

export const chordLabels = {
  Mayor: ['T', '3', '5'],
  Menor: ['T', '♭3', '5'],
  Disminuido: ['T', '♭3', '♭5'],
  Aumentado: ['T', '3', '♯5']
};

export const tetradExtensions = {
  Mayor: [11],     // 7M
  Menor: [10],     // 7m
  Disminuido: [9], // 6
  Aumentado: [11]  // 7M
};

export const tetradLabels = {
  Mayor: ['7'],
  Menor: ['♭7'],
  Disminuido: ['6'],
  Aumentado: ['7']
};
