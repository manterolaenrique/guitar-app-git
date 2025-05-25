"use client";
import { useState } from 'react';
import { chromaticScale, scalePatterns, instrumentStrings, InstrumentType, TOTAL_FRETS } from '@/data/scaleData';
import { scaleFormulas } from '@/data/scaleFormulas';

type DisplayMode = 'all' | 'scale' | 'positions';

const getScaleNotes = (root: string, pattern: number[]) => {
  const rootIndex = chromaticScale.indexOf(root);
  return pattern.map(step => chromaticScale[(rootIndex + step) % 12]);
};

const getFretboard = (scaleNotes: string[], instrumentType: InstrumentType, displayMode: DisplayMode) => {
  const strings = instrumentStrings[instrumentType];
  return strings.map(openNote => {
    const startIndex = chromaticScale.indexOf(openNote);
    return Array.from({ length: TOTAL_FRETS + 1 }, (_, fret) => {
      const note = chromaticScale[(startIndex + fret) % 12];
      if (displayMode === 'all') {
        return note;
      } else {
        return scaleNotes.includes(note) ? note : '';
      }
    });
  });
};

const getChordType = (scaleType: string, degree: number): string => {
  const scaleInfo = scaleFormulas[scaleType];
  if (!scaleInfo) return '';

  const intervals = scaleInfo.intervals;
  if (degree >= intervals.length) return '';

  const interval = intervals[degree];
  if (interval.includes('Mayor')) return 'Mayor';
  if (interval.includes('Menor')) return 'Menor';
  if (interval.includes('Disminuida')) return 'Disminuido';
  if (interval.includes('Aumentada')) return 'Aumentado';
  return 'Justo';
};

const getChordsByDegree = (scaleType: string, scaleNotes: string[]) => {
  const chords = scaleFormulas[scaleType]?.chords;
  if (!chords) return [];
  return scaleNotes.map((note, idx) => note + (chords[idx] || ''));
};

const tones = chromaticScale;
const scaleTypes = Object.keys(scalePatterns);

const ScaleViewer = () => {
  const [tone, setTone] = useState('C');
  const [scaleType, setScaleType] = useState('Pentatónica Mayor');
  const [instrumentType, setInstrumentType] = useState<InstrumentType>('guitar');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('scale');
  
  const pattern = scalePatterns[scaleType];
  const scaleNotes = getScaleNotes(tone, pattern);
  const fretboard = getFretboard(scaleNotes, instrumentType, displayMode);
  const scaleInfo = scaleFormulas[scaleType];

  return (
    <div className="scale-container">
      <h2 className="scale-title">Escalas</h2>

      <div className="scale-selector">
        <div>
          <label>Tono:</label>
          <select 
            value={tone} 
            onChange={(e) => setTone(e.target.value)}
          >
            {tones.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Tipo de escala:</label>
          <select 
            value={scaleType} 
            onChange={(e) => setScaleType(e.target.value)}
          >
            {scaleTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Instrumento:</label>
          <select 
            value={instrumentType} 
            onChange={(e) => setInstrumentType(e.target.value as InstrumentType)}
          >
            <option value="guitar">Guitarra (6 cuerdas)</option>
            <option value="bass">Bajo (4 cuerdas)</option>
          </select>
        </div>
      </div>

      <div className="scale-options">
        <label>Modo de visualización:</label>
        <select 
          value={displayMode} 
          onChange={(e) => setDisplayMode(e.target.value as DisplayMode)}
          className="display-mode-select"
        >
          <option value="all">Mostrar todas las notas</option>
          <option value="scale">Mostrar solo notas de la escala</option>
        </select>
      </div>

      <div className="fretboard-container">
        <div className="fretboard">
          <div className="fret-numbers">
            {Array.from({ length: TOTAL_FRETS + 1 }, (_, i) => (
              <div key={i}>{i}</div>
            ))}
          </div>
          <div className="strings-container">
            {fretboard.map((string, stringIdx) => (
              <div key={stringIdx} className="string-row">
                {string.map((note, fretIdx) => (
                  <div key={fretIdx} className="fret">
                    {note && (
                      <div 
                        className={`note-marker ${
                          scaleNotes.includes(note) 
                            ? note === tone 
                              ? 'root' 
                              : 'scale'
                            : 'non-scale'
                        }`}
                      >
                        {note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="scale-info-row">
        <div className="scale-info-block">
          <h3 className="scale-info-title">Fórmula de la escala</h3>
          <div className="formula-display">
            <span className="formula-text">{scaleInfo.formula}</span>
          </div>
        </div>
        <div className="scale-info-block">
          <h3 className="scale-info-title">Tipo de escala</h3>
          <span className={`type-badge ${scaleInfo.type}`}>
            {scaleInfo.type.charAt(0).toUpperCase() + scaleInfo.type.slice(1)}
          </span>
        </div>
        <div className="scale-info-block">
          <h3 className="scale-info-title">Tono seleccionado</h3>
          <span className="selected-tone-block">{tone}</span>
        </div>
        <div className="scale-info-block">
          <h3 className="scale-info-title">Tipo de escala seleccionada</h3>
          <span className="selected-scale-type-block">{scaleType}</span>
        </div>
      </div>

      <div className="scale-horizontal-blocks">
        <div className="horizontal-block">
          <div className="horizontal-block-title">Notas de la escala</div>
          <div className="horizontal-row">
            {scaleNotes.map((note, index) => (
              <span className="horizontal-item note-item" key={index}>
                <span className="note-degree">{index + 1}º</span> {note}
              </span>
            ))}
          </div>
        </div>
        <div className="horizontal-block">
          <div className="horizontal-block-title">Intervalos</div>
          <div className="horizontal-row">
            {scaleInfo.intervals.map((interval, index) => (
              <span className="horizontal-item interval-item" key={index}>
                <span className="interval-degree">{index + 1}º</span> {interval}
              </span>
            ))}
          </div>
        </div>
        <div className="horizontal-block">
          <div className="horizontal-block-title">Acordes por grado</div>
          <div className="horizontal-row">
            {getChordsByDegree(scaleType, scaleNotes).map((chord, index) => (
              <span className="horizontal-item chord-item" key={index}>
                <span className="chord-degree">{index + 1}º</span> {chord}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScaleViewer;
