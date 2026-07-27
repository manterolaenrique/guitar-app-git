import { chromaticScale, type InstrumentType, scalePatterns } from './scaleData';
import {
  progressionTemplates,
  supportedProgressionScales,
  type SupportedScaleName,
} from './progressions';
import type { ChordType } from './chordShapes';

export type ScaleViewMode = 'all' | 'scale';

export interface ScaleDeepLinkState {
  root: string;
  scale: string;
  instrument: InstrumentType;
  view: ScaleViewMode;
}

export interface ChordDeepLinkState {
  root: string;
  type: ChordType;
  tetrad: boolean;
}

export interface ProgressionDeepLinkState {
  root: string;
  scale: SupportedScaleName;
  templateId: string;
  degrees: number[] | null;
}

const scaleSlugByLabel: Record<string, string> = {
  'Jonico': 'ionian',
  'Jónico': 'ionian',
  'Dorico': 'dorian',
  'Dórico': 'dorian',
  Frigio: 'phrygian',
  Lidio: 'lydian',
  Mixolidio: 'mixolydian',
  'Eolico': 'aeolian',
  'Eólico': 'aeolian',
  Locrio: 'locrian',
  'Pentatonica Mayor': 'major-pentatonic',
  'Pentatónica Mayor': 'major-pentatonic',
  'Pentatonica Menor': 'minor-pentatonic',
  'Pentatónica Menor': 'minor-pentatonic',
};

const scaleLabelBySlug = Object.entries(scaleSlugByLabel).reduce<Record<string, string>>(
  (accumulator, [label, slug]) => {
    if (scalePatterns[label]) accumulator[slug] = label;
    return accumulator;
  },
  {},
);

const chordTypeBySlug: Record<string, ChordType> = {
  major: 'Mayor',
  mayor: 'Mayor',
  minor: 'Menor',
  menor: 'Menor',
  diminished: 'Disminuido',
  disminuido: 'Disminuido',
  augmented: 'Aumentado',
  aumentado: 'Aumentado',
};

const progressionScaleBySlug: Record<string, SupportedScaleName> = {
  ionian: 'Jónico',
  jonico: 'Jónico',
  major: 'Jónico',
  aeolian: 'Eólico',
  eolico: 'Eólico',
  minor: 'Eólico',
};

export function getScaleSlug(label: string): string {
  return scaleSlugByLabel[label] || label.toLowerCase().replace(/\s+/g, '-');
}

export function parseScaleDeepLink(searchParams: Record<string, string | string[] | undefined>): ScaleDeepLinkState {
  const root = normalizeNoteParam(searchParams.root) || 'C';
  const scaleParam = readParam(searchParams.scale);
  const instrumentParam = readParam(searchParams.instrument);
  const viewParam = readParam(searchParams.view);

  return {
    root,
    scale: (scaleParam && scaleLabelBySlug[scaleParam]) || 'Pentatónica Mayor',
    instrument: instrumentParam === 'bass' ? 'bass' : 'guitar',
    view: viewParam === 'all' ? 'all' : 'scale',
  };
}

export function parseChordDeepLink(searchParams: Record<string, string | string[] | undefined>): ChordDeepLinkState {
  const root = normalizeNoteParam(searchParams.root) || 'C';
  const typeParam = readParam(searchParams.type);
  const tetradParam = readParam(searchParams.tetrad);

  return {
    root,
    type: (typeParam && chordTypeBySlug[typeParam]) || 'Mayor',
    tetrad: tetradParam === 'true' || tetradParam === '1' || tetradParam === 'yes',
  };
}

export function parseProgressionDeepLink(
  searchParams: Record<string, string | string[] | undefined>,
): ProgressionDeepLinkState {
  const root = normalizeNoteParam(searchParams.root) || 'C';
  const scaleParam = readParam(searchParams.scale);
  const templateParam = readParam(searchParams.template);
  const degreesParam = readParam(searchParams.degrees);
  const scale = (scaleParam && progressionScaleBySlug[scaleParam]) || 'Jónico';
  const validTemplate = progressionTemplates.find((template) => template.id === templateParam);

  return {
    root,
    scale: supportedProgressionScales.includes(scale) ? scale : 'Jónico',
    templateId: validTemplate ? validTemplate.id : '',
    degrees: parseDegrees(degreesParam),
  };
}

function normalizeNoteParam(value: string | string[] | undefined): string | null {
  const note = readParam(value);
  if (!note) return null;
  const normalized = note.trim().toUpperCase();
  return chromaticScale.includes(normalized) ? normalized : null;
}

function readParam(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) return value[0]?.trim().toLowerCase() || null;
  return value?.trim().toLowerCase() || null;
}

function parseDegrees(value: string | null): number[] | null {
  if (!value) return null;
  const degrees = value
    .split('-')
    .map((degree) => Number.parseInt(degree, 10))
    .filter((degree) => Number.isInteger(degree) && degree >= 1 && degree <= 7);

  return degrees.length ? degrees : null;
}
