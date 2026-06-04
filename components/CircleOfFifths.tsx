'use client';

import { useMemo, useState } from 'react';
import { Compass, Layers3, Lightbulb, Orbit } from 'lucide-react';
import { circleOfFifthsNotes, CircleNote } from '../data/circleOfFifthsNotes';
import { useMusicNotation } from '../contexts/MusicNotationContext';

const SEGMENTS = circleOfFifthsNotes.length;

const sharpNotesSpanish = ['Fa#', 'Do#', 'Sol#', 'Re#', 'La#', 'Mi#', 'Si#'];
const sharpNotesAmerican = ['F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#'];
const flatNotesSpanish = ['Sib', 'Mib', 'Lab', 'Reb', 'Solb', 'Dob', 'Fab'];
const flatNotesAmerican = ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb'];

const CircleOfFifths = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const { notation } = useMusicNotation();

  const getNoteLabel = (
    note: CircleNote,
    type: 'major' | 'minor' | 'enharmonicMajor' | 'enharmonicMinor',
  ) => {
    if (notation === 'spanish') {
      if (type === 'major') return note.major || '';
      if (type === 'minor') return `${note.minor || ''}m`;
      if (type === 'enharmonicMajor') return note.enharmonicMajor || '';
      if (type === 'enharmonicMinor') {
        return note.enharmonicMinor ? `${note.enharmonicMinor}m` : '';
      }
      return '';
    }

    if (type === 'major') return note.major_en;
    if (type === 'minor') return `${note.minor_en}m`;
    if (type === 'enharmonicMajor') return note.enharmonicMajor_en || '';
    if (type === 'enharmonicMinor') return note.enharmonicMinor_en ? `${note.enharmonicMinor_en}m` : '';
    return '';
  };

  const selectedNote = selected !== null ? circleOfFifthsNotes[selected] : null;

  const selectedAlterations = useMemo(() => {
    if (!selectedNote) return { sharps: [], flats: [] };

    const sharpSource = notation === 'spanish' ? sharpNotesSpanish : sharpNotesAmerican;
    const flatSource = notation === 'spanish' ? flatNotesSpanish : flatNotesAmerican;

    return {
      sharps: selectedNote.sharps ? sharpSource.slice(0, selectedNote.sharps) : [],
      flats: selectedNote.flats ? flatSource.slice(0, selectedNote.flats) : [],
    };
  }, [notation, selectedNote]);

  const getSectorPath = (index: number, innerRadius = 210, outerRadius = 390) => {
    const startAngle = (index / SEGMENTS) * 2 * Math.PI - Math.PI / 2;
    const endAngle = ((index + 1) / SEGMENTS) * 2 * Math.PI - Math.PI / 2;

    const x1 = 450 + outerRadius * Math.cos(startAngle);
    const y1 = 450 + outerRadius * Math.sin(startAngle);
    const x2 = 450 + outerRadius * Math.cos(endAngle);
    const y2 = 450 + outerRadius * Math.sin(endAngle);
    const x3 = 450 + innerRadius * Math.cos(endAngle);
    const y3 = 450 + innerRadius * Math.sin(endAngle);
    const x4 = 450 + innerRadius * Math.cos(startAngle);
    const y4 = 450 + innerRadius * Math.sin(startAngle);

    return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`;
  };

  return (
    <section className="circle-of-fifths-container circle-workspace">
      <header className="circle-workspace-header">
        <span className="section-kicker">BRUJULA ARMONICA</span>
        <h2 className="scale-title circle-workspace-title">Círculo de Quintas</h2>
        <p className="circle-workspace-text">
          Visualizá relaciones entre tonalidades, armaduras y relativos en un panel técnico inspirado en
          Stitch, pero montado sobre la teoría real de la app.
        </p>
      </header>

      <div className="circle-workspace-grid">
        <div className="circle-visual-card">
          <div className="circle-visual-backdrop" />
          <div className="circle-visual-head">
            <span className="circle-panel-kicker">Visualizador interactivo</span>
            <div className="circle-legend-row">
              <div className="circle-legend-pill sharps">
                <span className="circle-legend-dot" />
                <span>Sostenidos</span>
              </div>
              <div className="circle-legend-pill flats">
                <span className="circle-legend-dot" />
                <span>Bemoles</span>
              </div>
            </div>
          </div>

          <div className="circle-of-fifths-responsive circle-workspace-responsive">
            <svg className="circle-svg" viewBox="0 0 900 900" width="100%" height="100%">
              {circleOfFifthsNotes.map((note, idx) => (
                <path
                  key={`sector-${note.major_en}-${idx}`}
                  d={getSectorPath(idx)}
                  className={`circle-ring-sector ${selected === idx ? 'is-selected' : ''} ${note.sharps ? 'is-sharp-sector' : note.flats ? 'is-flat-sector' : 'is-neutral-sector'}`}
                  onClick={() => setSelected(idx)}
                />
              ))}

              {circleOfFifthsNotes.map((_, idx) => {
                const angle = (idx / SEGMENTS) * 360;
                const rad = (angle - 90) * (Math.PI / 180);
                const x = 450 + 390 * Math.cos(rad);
                const y = 450 + 390 * Math.sin(rad);
                return (
                  <line
                    key={`divider-${idx}`}
                    x1="450"
                    y1="450"
                    x2={x}
                    y2={y}
                    className="circle-divider-line"
                  />
                );
              })}

              {circleOfFifthsNotes.map((note, idx) => {
                const angle = ((idx + 0.5) / SEGMENTS) * 360;
                const rad = (angle - 90) * (Math.PI / 180);
                const x = 450 + 320 * Math.cos(rad);
                const y = 450 + 320 * Math.sin(rad);
                return (
                  <g
                    key={`major-label-${idx}`}
                    className="circle-label-group"
                    onClick={() => setSelected(idx)}
                  >
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      className={`circle-label-major-svg note-svg-${note.colorClass} ${selected === idx ? 'selected-note' : ''}`}
                    >
                      {getNoteLabel(note, 'major')}
                    </text>
                    {getNoteLabel(note, 'enharmonicMajor') && (
                      <text
                        x={x}
                        y={y + 38}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        className={`circle-label-enharmonic ${selected === idx ? 'selected-note' : ''}`}
                      >
                        {getNoteLabel(note, 'enharmonicMajor')}
                      </text>
                    )}
                  </g>
                );
              })}

              {circleOfFifthsNotes.map((note, idx) => {
                const angle = ((idx + 0.5) / SEGMENTS) * 360;
                const rad = (angle - 90) * (Math.PI / 180);
                const x = 450 + 238 * Math.cos(rad);
                const y = 450 + 238 * Math.sin(rad);
                return (
                  <g
                    key={`minor-label-${idx}`}
                    className="circle-label-group"
                    onClick={() => setSelected(idx)}
                  >
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      className={`circle-label-minor-svg note-svg-${note.colorClass} ${selected === idx ? 'selected-note' : ''}`}
                    >
                      {getNoteLabel(note, 'minor')}
                    </text>
                    {getNoteLabel(note, 'enharmonicMinor') && (
                      <text
                        x={x}
                        y={y + 34}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        className={`circle-label-enharmonic-minor ${selected === idx ? 'selected-note' : ''}`}
                      >
                        {getNoteLabel(note, 'enharmonicMinor')}
                      </text>
                    )}
                  </g>
                );
              })}

              <circle cx="450" cy="450" r="390" className="circle-frame-outer" />
              <circle cx="450" cy="450" r="210" className="circle-frame-inner" />
              <circle cx="450" cy="450" r="112" className="circle-frame-core" />
            </svg>
          </div>
        </div>

        <div className="circle-info-column">
          <article className="circle-info-card accent-primary">
            <div className="circle-info-card-head">
              <Compass className="circle-info-icon" />
              <h3>¿Qué es el círculo?</h3>
            </div>
            <p>
              Es una representación geométrica de la relación entre las 12 tonalidades de la escala cromática.
              En sentido horario, cada tonalidad está a una quinta justa de distancia respecto de la anterior.
            </p>
          </article>

          <article className="circle-info-card accent-secondary">
            <div className="circle-info-card-head">
              <Orbit className="circle-info-icon" />
              <h3>Tonalidades relativas</h3>
            </div>
            <p>
              Cada tonalidad mayor comparte exactamente las mismas notas que su relativa menor. Esto hace al
              círculo especialmente útil para analizar funciones armónicas y cambios de centro tonal.
            </p>
            <div className="circle-tip-box">
              <Lightbulb className="circle-tip-icon" />
              <span>Tip: bajá tres semitonos desde la tónica mayor para encontrar la relativa menor.</span>
            </div>
          </article>

          <article className="circle-info-card accent-primary-soft">
            <div className="circle-info-card-head">
              <Layers3 className="circle-info-icon" />
              <h3>Lectura rápida</h3>
            </div>
            {selectedNote ? (
              <div className="circle-selection-summary">
                <div className="circle-selection-title">
                  {getNoteLabel(selectedNote, 'major')} / {getNoteLabel(selectedNote, 'minor')}
                  {getNoteLabel(selectedNote, 'enharmonicMajor') && (
                    <span className="circle-selection-alt">
                      {' '}({getNoteLabel(selectedNote, 'enharmonicMajor')})
                    </span>
                  )}
                </div>

                <div className="circle-selection-stats">
                  <div className="circle-selection-stat">
                    <span className="circle-selection-label">Sostenidos</span>
                    <strong>{selectedNote.sharps || 0}</strong>
                    <small>{selectedAlterations.sharps.length ? selectedAlterations.sharps.join(', ') : 'Ninguno'}</small>
                  </div>
                  <div className="circle-selection-stat">
                    <span className="circle-selection-label">Bemoles</span>
                    <strong>{selectedNote.flats || 0}</strong>
                    <small>{selectedAlterations.flats.length ? selectedAlterations.flats.join(', ') : 'Ninguno'}</small>
                  </div>
                </div>
              </div>
            ) : (
              <p>
                Seleccioná una tonalidad en el círculo para ver su relativo menor, su armadura y las alteraciones
                correspondientes.
              </p>
            )}
          </article>
        </div>
      </div>
    </section>
  );
};

export default CircleOfFifths;
