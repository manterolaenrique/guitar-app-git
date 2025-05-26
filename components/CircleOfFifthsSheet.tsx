'use client';
import { circleOfFifthsNotes } from '../data/circleOfFifthsNotes';

const CircleOfFifthsSheet = () => {
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
            <div className="major-key">{note.major}</div>
            <div className="minor-key">{note.minor}</div>
            <div className="sharps">{note.sharps || 0}</div>
            <div className="flats">{note.flats || 0}</div>
            <div className="altered-notes">
              {note.sharps ? 
                ['Fa#', 'Do#', 'Sol#', 'Re#', 'La#', 'Mi#', 'Si#'].slice(0, note.sharps).join(', ') :
                note.flats ? 
                ['Sib', 'Mib', 'Lab', 'Reb', 'Solb', 'Dob', 'Fab'].slice(0, note.flats).join(', ') :
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