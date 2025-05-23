export interface ScaleFormula {
  formula: string;
  intervals: string[];
  type: 'mayor' | 'menor' | 'disminuido' | 'aumentado' | 'otro';
  chords: string[];
}

export const scaleFormulas: Record<string, ScaleFormula> = {
  'Jónico': {
    formula: 'T-T-ST-T-T-T-ST',
    intervals: ['Tónica', 'Segunda Mayor', 'Tercera Mayor', 'Cuarta Justa', 'Quinta Justa', 'Sexta Mayor', 'Séptima Mayor'],
    type: 'mayor',
    chords: ['Maj7', 'm7', 'm7', 'Maj7', '7', 'm7', 'm7b5']
  },
  'Dórico': {
    formula: 'T-ST-T-T-T-ST-T',
    intervals: ['Tónica', 'Segunda Mayor', 'Tercera Menor', 'Cuarta Justa', 'Quinta Justa', 'Sexta Mayor', 'Séptima Menor'],
    type: 'menor',
    chords: ['m7', 'm7', 'Maj7', '7', 'm7', 'm7b5', 'Maj7']
  },
  'Frigio': {
    formula: 'ST-T-T-T-ST-T-T',
    intervals: ['Tónica', 'Segunda Menor', 'Tercera Menor', 'Cuarta Justa', 'Quinta Justa', 'Sexta Menor', 'Séptima Menor'],
    type: 'menor',
    chords: ['m7', 'Maj7', '7', 'm7', 'm7b5', 'Maj7', 'm7']
  },
  'Lidio': {
    formula: 'T-T-T-ST-T-T-ST',
    intervals: ['Tónica', 'Segunda Mayor', 'Tercera Mayor', 'Cuarta Aumentada', 'Quinta Justa', 'Sexta Mayor', 'Séptima Mayor'],
    type: 'mayor',
    chords: ['Maj7', '7', 'm7', 'm7b5', 'Maj7', 'm7', 'm7']
  },
  'Mixolidio': {
    formula: 'T-T-ST-T-T-ST-T',
    intervals: ['Tónica', 'Segunda Mayor', 'Tercera Mayor', 'Cuarta Justa', 'Quinta Justa', 'Sexta Mayor', 'Séptima Menor'],
    type: 'mayor',
    chords: ['7', 'm7', 'm7b5', 'Maj7', 'm7', 'm7', 'Maj7']
  },
  'Eólico': {
    formula: 'T-ST-T-T-ST-T-T',
    intervals: ['Tónica', 'Segunda Mayor', 'Tercera Menor', 'Cuarta Justa', 'Quinta Justa', 'Sexta Menor', 'Séptima Menor'],
    type: 'menor',
    chords: ['m7', 'm7b5', 'Maj7', 'm7', 'm7', 'Maj7', '7']
  },
  'Locrio': {
    formula: 'ST-T-T-ST-T-T-T',
    intervals: ['Tónica', 'Segunda Menor', 'Tercera Menor', 'Cuarta Justa', 'Quinta Disminuida', 'Sexta Menor', 'Séptima Menor'],
    type: 'disminuido',
    chords: ['m7b5', 'Maj7', 'm7', 'm7', 'Maj7', '7', 'm7']
  },
  'Pentatónica Mayor': {
    formula: 'T-T-T-ST-T',
    intervals: ['Tónica', 'Segunda Mayor', 'Tercera Mayor', 'Quinta Justa', 'Sexta Mayor'],
    type: 'mayor',
    chords: ['Maj7', 'm7', 'Maj7', '7', 'm7']
  },
  'Pentatónica Menor': {
    formula: 'T-ST-T-T-ST',
    intervals: ['Tónica', 'Tercera Menor', 'Cuarta Justa', 'Quinta Justa', 'Séptima Menor'],
    type: 'menor',
    chords: ['m7', 'Maj7', 'm7', 'm7', 'Maj7']
  }
}; 