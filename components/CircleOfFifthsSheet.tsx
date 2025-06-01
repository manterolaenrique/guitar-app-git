'use client';
import { circleOfFifthsNotes } from '../data/circleOfFifthsNotes';
import { useMusicNotation } from '../contexts/MusicNotationContext';
import { convertNote } from '../utils/noteConverter';

const CircleOfFifthsSheet = () => {
  const { notation } = useMusicNotation();

  return (
    <div className="circle-sheet-container">
      <h2>Planilla del Círculo de Quintas</h2>
      <div className="sheet-grid">
        <div className="sheet-header">
          <div>Tonalidad Mayor</div>
          <div>Tonalidad Menor</div>
          <div>Sostenidos (#)</div>
          <div>Bemoles (♭)</div>
          <div>Notas Alteradas</div>
        </div>
        {circleOfFifthsNotes.map((note, index) => (
          <div key={index} className="sheet-row">
            <div className="major-key">{convertNote(note.major, notation)}</div>
            <div className="minor-key">{convertNote(note.minor, notation)}</div>
            <div className="sharps">{note.sharps || 0}</div>
            <div className="flats">{note.flats || 0}</div>
            <div className="altered-notes">
              {note.sharps ? 
                ['Fa#', 'Do#', 'Sol#', 'Re#', 'La#', 'Mi#', 'Si#'].slice(0, note.sharps).map(n => convertNote(n, notation)).join(', ') :
                note.flats ? 
                ['Sib', 'Mib', 'Lab', 'Reb', 'Solb', 'Dob', 'Fab'].slice(0, note.flats).map(n => convertNote(n, notation)).join(', ') :
                'Ninguna'
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircleOfFifthsSheet; 