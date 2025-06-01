type SpanishNote = 'Do' | 'Re' | 'Mi' | 'Fa' | 'Sol' | 'La' | 'Si' | 'Do#' | 'Re#' | 'Fa#' | 'Sol#' | 'La#' | 'Dob' | 'Reb' | 'Mib' | 'Fab' | 'Solb' | 'Lab' | 'Sib';
type AmericanNote = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B' | 'C#' | 'D#' | 'F#' | 'G#' | 'A#' | 'Cb' | 'Db' | 'Eb' | 'Fb' | 'Gb' | 'Ab' | 'Bb';

export const noteConverter = {
  spanishToAmerican: {
    'Do': 'C',
    'Re': 'D',
    'Mi': 'E',
    'Fa': 'F',
    'Sol': 'G',
    'La': 'A',
    'Si': 'B',
    'Do#': 'C#',
    'Re#': 'D#',
    'Fa#': 'F#',
    'Sol#': 'G#',
    'La#': 'A#',
    'Dob': 'Cb',
    'Reb': 'Db',
    'Mib': 'Eb',
    'Fab': 'Fb',
    'Solb': 'Gb',
    'Lab': 'Ab',
    'Sib': 'Bb'
  } as Record<SpanishNote, AmericanNote>,
  americanToSpanish: {
    'C': 'Do',
    'D': 'Re',
    'E': 'Mi',
    'F': 'Fa',
    'G': 'Sol',
    'A': 'La',
    'B': 'Si',
    'C#': 'Do#',
    'D#': 'Re#',
    'F#': 'Fa#',
    'G#': 'Sol#',
    'A#': 'La#',
    'Cb': 'Dob',
    'Db': 'Reb',
    'Eb': 'Mib',
    'Fb': 'Fab',
    'Gb': 'Solb',
    'Ab': 'Lab',
    'Bb': 'Sib'
  } as Record<AmericanNote, SpanishNote>
};

export function convertNote(note: string, toNotation: 'american' | 'spanish'): string {
  if (toNotation === 'american') {
    return noteConverter.spanishToAmerican[note as SpanishNote] || note;
  } else {
    return noteConverter.americanToSpanish[note as AmericanNote] || note;
  }
} 