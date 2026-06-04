import { chromaticScale, scalePatterns } from './scaleData';

export type ScaleFamily = 'major' | 'minor';
export type HarmonicFunction = 'Tonica' | 'Subdominante' | 'Dominante';
export type SupportedScaleName = 'Jónico' | 'Eólico';

export interface ProgressionTemplate {
  id: string;
  name: string;
  scaleFamily: ScaleFamily;
  degrees: number[];
  tags: string[];
  description: string;
}

export interface DegreeChord {
  degree: number;
  roman: string;
  quality: string;
  harmonicFunction: HarmonicFunction;
  note: string;
  chordName: string;
}

interface ScaleConfig {
  family: ScaleFamily;
  chordQualities: string[];
  harmonicFunctions: HarmonicFunction[];
  romanNumerals: string[];
}

const scaleConfigs: Record<SupportedScaleName, ScaleConfig> = {
  'Jónico': {
    family: 'major',
    chordQualities: ['Maj7', 'm7', 'm7', 'Maj7', '7', 'm7', 'm7b5'],
    harmonicFunctions: ['Tonica', 'Subdominante', 'Tonica', 'Subdominante', 'Dominante', 'Tonica', 'Dominante'],
    romanNumerals: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'viiø'],
  },
  'Eólico': {
    family: 'minor',
    chordQualities: ['m7', 'm7b5', 'Maj7', 'm7', 'm7', 'Maj7', '7'],
    harmonicFunctions: ['Tonica', 'Subdominante', 'Tonica', 'Subdominante', 'Dominante', 'Tonica', 'Dominante'],
    romanNumerals: ['i', 'iiø', 'III', 'iv', 'v', 'VI', 'VII'],
  },
};

export const progressionTemplates: ProgressionTemplate[] = [
  {
    id: 'major-pop-anthem',
    name: 'I-V-vi-IV',
    scaleFamily: 'major',
    degrees: [1, 5, 6, 4],
    tags: ['pop', 'hook', 'moderno'],
    description: 'Progresion amplia y muy usada para hooks, estribillos y canciones de estructura abierta.',
  },
  {
    id: 'major-cadence',
    name: 'ii-V-I',
    scaleFamily: 'major',
    degrees: [2, 5, 1],
    tags: ['jazz', 'cadencia', 'resolucion'],
    description: 'Cadencia clasica para estudiar tension, dominante y llegada tonal.',
  },
  {
    id: 'major-foundation',
    name: 'I-IV-V',
    scaleFamily: 'major',
    degrees: [1, 4, 5],
    tags: ['base', 'rock', 'folk'],
    description: 'Estructura esencial para entender los tres grandes polos funcionales de la tonalidad.',
  },
  {
    id: 'major-turnaround',
    name: 'I-vi-ii-V',
    scaleFamily: 'major',
    degrees: [1, 6, 2, 5],
    tags: ['turnaround', 'estandar', 'flujo'],
    description: 'Recorrido tonal completo que arma tension de forma progresiva antes de resolver.',
  },
  {
    id: 'major-blues-cycle',
    name: '12 Bar Blues',
    scaleFamily: 'major',
    degrees: [1, 1, 1, 1, 4, 4, 1, 1, 5, 4, 1, 5],
    tags: ['blues', 'ciclo', 'clasico'],
    description: 'Ciclo extendido ideal para practicar forma, repeticion y cambios funcionales largos.',
  },
  {
    id: 'minor-cinematic',
    name: 'i-VI-III-VII',
    scaleFamily: 'minor',
    degrees: [1, 6, 3, 7],
    tags: ['cinematico', 'modal', 'moderno'],
    description: 'Color menor amplio y expresivo para progresiones atmosfericas o melodicas.',
  },
  {
    id: 'minor-core',
    name: 'i-iv-v',
    scaleFamily: 'minor',
    degrees: [1, 4, 5],
    tags: ['base', 'menor', 'tradicional'],
    description: 'Recorrido minimo para estudiar la sonoridad natural menor sin salir de la escala.',
  },
  {
    id: 'minor-pop',
    name: 'i-VI-iv-V',
    scaleFamily: 'minor',
    degrees: [1, 6, 4, 5],
    tags: ['pop', 'dramatico', 'groove'],
    description: 'Secuencia menor muy util para relacionar descanso, expansion y cierre con movimiento claro.',
  },
  {
    id: 'minor-motion',
    name: 'i-VII-VI-VII',
    scaleFamily: 'minor',
    degrees: [1, 7, 6, 7],
    tags: ['loop', 'riff', 'ostinato'],
    description: 'Movimiento circular que funciona muy bien para riffs, grooves y centros tonales estables.',
  },
];

export const supportedProgressionScales: SupportedScaleName[] = ['Jónico', 'Eólico'];

export function getScaleFamily(scaleName: SupportedScaleName): ScaleFamily {
  return scaleConfigs[scaleName].family;
}

export function getDiatonicChords(root: string, scaleName: SupportedScaleName): DegreeChord[] {
  const pattern = scalePatterns[scaleName];
  const config = scaleConfigs[scaleName];
  const rootIndex = chromaticScale.indexOf(root);

  return pattern.map((step, index) => {
    const note = chromaticScale[(rootIndex + step) % 12];
    const quality = config.chordQualities[index];

    return {
      degree: index + 1,
      roman: config.romanNumerals[index],
      quality,
      harmonicFunction: config.harmonicFunctions[index],
      note,
      chordName: `${note}${quality}`,
    };
  });
}

export function getProgressionFromDegrees(degrees: number[], diatonicChords: DegreeChord[]): DegreeChord[] {
  return degrees
    .map((degree) => diatonicChords.find((chord) => chord.degree === degree))
    .filter((chord): chord is DegreeChord => Boolean(chord));
}

export function getTemplatesForScale(scaleName: SupportedScaleName): ProgressionTemplate[] {
  const family = getScaleFamily(scaleName);
  return progressionTemplates.filter((template) => template.scaleFamily === family);
}
