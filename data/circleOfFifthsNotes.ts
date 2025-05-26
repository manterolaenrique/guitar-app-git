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
  { major: 'Do', minor: 'Lam', major_en: 'C', minor_en: 'Am', colorClass: 'note-C' },
  { major: 'Sol', minor: 'Mim', major_en: 'G', minor_en: 'Em', sharps: 1, colorClass: 'note-G' },
  { major: 'Re', minor: 'Sim', major_en: 'D', minor_en: 'Bm', sharps: 2, colorClass: 'note-D' },
  { major: 'La', minor: 'Fa#m', major_en: 'A', minor_en: 'F#m', sharps: 3, colorClass: 'note-A' },
  { major: 'Mi', minor: 'Do#m', major_en: 'E', minor_en: 'C#m', sharps: 4, colorClass: 'note-E' },
  { major: 'Si', minor: 'Sol#m', major_en: 'B', minor_en: 'G#m', sharps: 5, colorClass: 'note-B' },
  { major: 'Fa#', minor: 'Re#m', enharmonicMajor: 'Solb', enharmonicMinor: 'Mibm', major_en: 'F#', minor_en: 'D#m', enharmonicMajor_en: 'Gb', enharmonicMinor_en: 'Ebm', sharps: 6, flats: 6, colorClass: 'note-Fs' },
  { major: 'Reb', minor: 'Sibm', enharmonicMajor: 'Do#', enharmonicMinor: 'La#m', major_en: 'Db', minor_en: 'Bbm', enharmonicMajor_en: 'C#', enharmonicMinor_en: 'A#m', flats: 5, sharps: 7, colorClass: 'note-Cs' },
  { major: 'Lab', minor: 'Fam', major_en: 'Ab', minor_en: 'Fm', flats: 4, colorClass: 'note-Gs' },
  { major: 'Mib', minor: 'Dom', major_en: 'Eb', minor_en: 'Cm', flats: 3, colorClass: 'note-Ds' },
  { major: 'Sib', minor: 'Solm', major_en: 'Bb', minor_en: 'Gm', flats: 2, colorClass: 'note-As' },
  { major: 'Fa', minor: 'Rem', major_en: 'F', minor_en: 'Dm', flats: 1, colorClass: 'note-F' },
]; 