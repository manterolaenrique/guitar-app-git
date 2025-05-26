'use client';
import { useState } from 'react';
import { circleOfFifthsNotes, CircleNote } from '../data/circleOfFifthsNotes';

const CIRCLE_DEGREES = 360;
const SEGMENTS = circleOfFifthsNotes.length;

const CircleOfFifths = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [notation, setNotation] = useState<'es' | 'en'>('en');

  // Función para obtener el texto según notación
  const getNoteLabel = (note: CircleNote, type: 'major' | 'minor' | 'enharmonicMajor' | 'enharmonicMinor') => {
    if (notation === 'es') {
      return note[type] || '';
    } else {
      if (type === 'major') return note.major_en;
      if (type === 'minor') return note.minor_en;
      if (type === 'enharmonicMajor') return note.enharmonicMajor_en || '';
      if (type === 'enharmonicMinor') return note.enharmonicMinor_en || '';
      return '';
    }
  };

  return (
    <div className="circle-of-fifths-container">
      <h2 className="scale-title">Círculo de Quintas</h2>
      <div className="scale-info">
        <p>
          El círculo de quintas es una herramienta fundamental en la teoría musical que muestra la relación entre las doce notas de la escala cromática, 
          sus armaduras de clave y sus tonalidades relativas. Es esencial para entender la armonía y la composición musical.
        </p>
      </div>
      <div className="circle-explanation">
        <h3>¿Qué es el Círculo de Quintas?</h3>
        <p>
          El círculo de quintas es una representación visual de las relaciones entre las 12 tonalidades mayores y menores. Cada sector muestra la tonalidad mayor (afuera) y su relativa menor (adentro), y las enarmónicas comparten espacio.
        </p>
        <ul>
          <li>Las tonalidades con sostenidos (#) se muestran en la mitad derecha del círculo</li>
          <li>Las tonalidades con bemoles (♭) se muestran en la mitad izquierda</li>
          <li>Do (C) se sitúa en la parte superior, sin alteraciones</li>
        </ul>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, alignItems: 'center', gap: 12 }}>
        <label className="notation-toggle-checkbox">
          <input
            type="checkbox"
            checked={notation === 'en'}
            onChange={() => setNotation(notation === 'es' ? 'en' : 'es')}
          />
          Mostrar notas en cifrado americano
        </label>
      </div>
      <div className="circle-of-fifths-responsive">
        <svg className="circle-svg" viewBox="0 0 900 900" width="100%" height="100%">
          {/* Divisiones */}
          {circleOfFifthsNotes.map((_, idx) => {
            const angle = (idx / SEGMENTS) * 360;
            const rad = (angle - 90) * (Math.PI / 180);
            const x = 450 + 370 * Math.cos(rad);
            const y = 450 + 370 * Math.sin(rad);
            return (
              <line
                key={`divider-${idx}`}
                x1="450" y1="450" x2={x} y2={y}
                stroke="#e0e0e0" strokeWidth="2"
              />
            );
          })}
          {/* Anillo exterior (mayores) */}
          {circleOfFifthsNotes.map((note, idx) => {
            const angle = ((idx + 0.5) / SEGMENTS) * 360;
            const rad = (angle - 90) * (Math.PI / 180);
            const x = 450 + 320 * Math.cos(rad);
            const y = 450 + 320 * Math.sin(rad);
            return (
              <g key={`major-label-${idx}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelected(idx)}
              >
                <text x={x} y={y} textAnchor="middle" alignmentBaseline="middle" className={`circle-label-major-svg note-svg-${note.colorClass}`}>{getNoteLabel(note, 'major')}</text>
                {getNoteLabel(note, 'enharmonicMajor') && (
                  <text x={x} y={y + 38} textAnchor="middle" alignmentBaseline="middle" className="circle-label-enharmonic">{getNoteLabel(note, 'enharmonicMajor')}</text>
                )}
             
              </g>
            );
          })}
          {/* Anillo interior (menores) */}
          {circleOfFifthsNotes.map((note, idx) => {
            const angle = ((idx + 0.5) / SEGMENTS) * 360;
            const rad = (angle - 90) * (Math.PI / 180);
            const x = 450 + 250 * Math.cos(rad);
            const y = 450 + 250 * Math.sin(rad);
            return (
              <g key={`minor-label-${idx}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelected(idx)}
              >
                <text x={x} y={y} textAnchor="middle" alignmentBaseline="middle" className={`circle-label-minor-svg note-svg-${note.colorClass}`}>{getNoteLabel(note, 'minor')}</text>
                {getNoteLabel(note, 'enharmonicMinor') && (
                  <text x={x} y={y + 34} textAnchor="middle" alignmentBaseline="middle" className="circle-label-enharmonic-minor">{getNoteLabel(note, 'enharmonicMinor')}</text>
                )}
              </g>
            );
          })}
          {/* Círculo base */}
          <circle cx="450" cy="450" r="390" fill="none" stroke="#b2dfdb" strokeWidth="16" />
          <circle cx="450" cy="450" r="200" fill="none" stroke="#b2dfdb" strokeWidth="12" />
        </svg>
      </div>
      {selected !== null && (
        <div className="note-info">
          <h3 className="note-info-title">
            Información sobre la nota seleccionada
          </h3>
          <div className="note-info-main-label">
            {getNoteLabel(circleOfFifthsNotes[selected], 'major')} / {getNoteLabel(circleOfFifthsNotes[selected], 'minor')}
            {getNoteLabel(circleOfFifthsNotes[selected], 'enharmonicMajor') && (
              <span style={{ fontSize: '1.2rem', opacity: 0.7 }}> ({getNoteLabel(circleOfFifthsNotes[selected], 'enharmonicMajor')})</span>
            )}
          </div>
          <div className="note-info-content">
            <div className="note-info-block">
              <h4>Sostenidos (#)</h4>
              <p style={{ fontSize: '1.3rem', fontWeight: 600 }}>{circleOfFifthsNotes[selected].sharps || 0}</p>
              {circleOfFifthsNotes[selected].sharps ? (
                <span className="note-info-armature-list">
                  {notation === 'es'
                    ? ['Fa#', 'Do#', 'Sol#', 'Re#', 'La#', 'Mi#', 'Si#'].slice(0, circleOfFifthsNotes[selected].sharps).join(', ')
                    : ['F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#'].slice(0, circleOfFifthsNotes[selected].sharps).join(', ')
                  }
                </span>
              ) : null}
            </div>
            <div className="note-info-block">
              <h4>Bemoles (♭)</h4>
              <p style={{ fontSize: '1.3rem', fontWeight: 600 }}>{circleOfFifthsNotes[selected].flats || 0}</p>
              {circleOfFifthsNotes[selected].flats ? (
                <span className="note-info-armature-list">
                  {notation === 'es'
                    ? ['Sib', 'Mib', 'Lab', 'Reb', 'Solb', 'Dob', 'Fab'].slice(0, circleOfFifthsNotes[selected].flats).join(', ')
                    : ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb'].slice(0, circleOfFifthsNotes[selected].flats).join(', ')
                  }
                </span>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CircleOfFifths; 