'use client';

import { circleOfFifthsNotes } from '../data/circleOfFifthsNotes';
import { useMusicNotation } from '../contexts/MusicNotationContext';
import { convertNote } from '../utils/noteConverter';

const CircleOfFifthsSheet = () => {
  const { notation } = useMusicNotation();

  return (
    <section className="circle-sheet-container circle-sheet-workspace">
      <header className="circle-sheet-header">
        <span className="section-kicker">TABLA DE ARMADURAS</span>
        <h2 className="circle-sheet-title">Planilla del Círculo de Quintas</h2>
        <p className="circle-sheet-text">
          Una lectura tabular para revisar rápidamente la tonalidad mayor, su relativo menor y las alteraciones
          correspondientes sin perder el contexto visual del círculo.
        </p>
      </header>

      <div className="sheet-grid circle-sheet-grid">
        <div className="sheet-header">
          <div>Tonalidad Mayor</div>
          <div>Tonalidad Menor</div>
          <div>Sostenidos (#)</div>
          <div>Bemoles (♭)</div>
          <div>Notas alteradas</div>
        </div>

        {circleOfFifthsNotes.map((note, index) => (
          <div key={index} className="sheet-row">
            <div className="major-key">{convertNote(note.major, notation)}</div>
            <div className="minor-key">{`${convertNote(note.minor, notation)}m`}</div>
            <div className="sharps">{note.sharps || 0}</div>
            <div className="flats">{note.flats || 0}</div>
            <div className="altered-notes">
              {note.sharps
                ? ['Fa#', 'Do#', 'Sol#', 'Re#', 'La#', 'Mi#', 'Si#']
                    .slice(0, note.sharps)
                    .map((currentNote) => convertNote(currentNote, notation))
                    .join(', ')
                : note.flats
                  ? ['Sib', 'Mib', 'Lab', 'Reb', 'Solb', 'Dob', 'Fab']
                      .slice(0, note.flats)
                      .map((currentNote) => convertNote(currentNote, notation))
                      .join(', ')
                  : 'Ninguna'}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CircleOfFifthsSheet;
