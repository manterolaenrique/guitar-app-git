// Tipado para las notas del círculo de quintas
export interface CircleNote {
  major: string;
  minor: string;
  enharmonicMajor?: string;
  enharmonicMinor?: string;
  sharps?: number;
  flats?: number;
  colorClass: string;
  major_en: string;
  minor_en: string;
  enharmonicMajor_en?: string;
  enharmonicMinor_en?: string;
}

// Notas en español y en cifrado americano
export const circleOfFifthsNotes: CircleNote[] = [
  { major: 'Do', minor: 'La', major_en: 'C', minor_en: 'A', colorClass: 'note-C' },
  { major: 'Sol', minor: 'Mi', major_en: 'G', minor_en: 'E', sharps: 1, colorClass: 'note-G' },
  { major: 'Re', minor: 'Si', major_en: 'D', minor_en: 'B', sharps: 2, colorClass: 'note-D' },
  { major: 'La', minor: 'Fa#', major_en: 'A', minor_en: 'F#', sharps: 3, colorClass: 'note-A' },
  { major: 'Mi', minor: 'Do#', major_en: 'E', minor_en: 'C#', sharps: 4, colorClass: 'note-E' },
  { major: 'Si', minor: 'Sol#', major_en: 'B', minor_en: 'G#', sharps: 5, colorClass: 'note-B' },
  { major: 'Fa#', minor: 'Re#', enharmonicMajor: 'Solb', enharmonicMinor: 'Mib', major_en: 'F#', minor_en: 'D#', enharmonicMajor_en: 'Gb', enharmonicMinor_en: 'Eb', sharps: 6, flats: 6, colorClass: 'note-Fs' },
  { major: 'Reb', minor: 'Sib', enharmonicMajor: 'Do#', enharmonicMinor: 'La#', major_en: 'Db', minor_en: 'Bb', enharmonicMajor_en: 'C#', enharmonicMinor_en: 'A#', flats: 5, sharps: 7, colorClass: 'note-Cs' },
  { major: 'Lab', minor: 'Fa', major_en: 'Ab', minor_en: 'F', flats: 4, colorClass: 'note-Gs' },
  { major: 'Mib', minor: 'Do', major_en: 'Eb', minor_en: 'C', flats: 3, colorClass: 'note-Ds' },
  { major: 'Sib', minor: 'Sol', major_en: 'Bb', minor_en: 'G', flats: 2, colorClass: 'note-As' },
  { major: 'Fa', minor: 'Re', major_en: 'F', minor_en: 'D', flats: 1, colorClass: 'note-F' },
]; 