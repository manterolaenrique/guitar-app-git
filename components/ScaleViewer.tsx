"use client";
import { useState, useEffect } from 'react';
import { chromaticScale, scalePatterns, instrumentStrings, InstrumentType, TOTAL_FRETS } from '@/data/scaleData';
import { scaleFormulas } from '@/data/scaleFormulas';
import { useMusicNotation } from '../contexts/MusicNotationContext';
import { convertNote } from '../utils/noteConverter';

type DisplayMode = 'all' | 'scale' | 'positions';

interface FretNote {
  note: string;
  isScaleNote: boolean;
}

const getScaleNotes = (root: string, pattern: number[], notation: 'american' | 'spanish'): string[] => {
  const rootIndex = chromaticScale.indexOf(root);
  return pattern.map(step => {
    const note = chromaticScale[(rootIndex + step) % 12];
    return convertNote(note, notation);
  });
};

const getFretboard = (scaleNotes: string[], instrumentType: InstrumentType, displayMode: DisplayMode, notation: 'american' | 'spanish', fretCount: number): (FretNote | string)[][] => {
  const strings = instrumentStrings[instrumentType];
  return strings.map(openNote => {
    const startIndex = chromaticScale.indexOf(openNote);
    return Array.from({ length: fretCount + 1 }, (_, fret) => {
      const note = chromaticScale[(startIndex + fret) % 12];
      const convertedNote = convertNote(note, notation);
      if (displayMode === 'all') {
        return {
          note: convertedNote,
          isScaleNote: scaleNotes.includes(convertedNote)
        };
      } else {
        return scaleNotes.includes(convertedNote) ? note : '';
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
  const { notation } = useMusicNotation();
  const [tone, setTone] = useState(notation === 'spanish' ? 'Do' : 'C');
  const [scaleType, setScaleType] = useState('Pentatónica Mayor');
  const [instrumentType, setInstrumentType] = useState<InstrumentType>('guitar');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('scale');
  
  const pattern = scalePatterns[scaleType];
  const scaleNotes = getScaleNotes(tone, pattern, notation);
  const fretCount = TOTAL_FRETS;
  const fretboard = getFretboard(scaleNotes, instrumentType, displayMode, notation, fretCount);
  const scaleInfo = scaleFormulas[scaleType];

  const handleNotationChange = (newTone: string) => {
    setTone(newTone);
  };

  const getNoteClass = (note: FretNote | string): string => {
    if (displayMode === 'all') {
      if (typeof note === 'string') return '';
      if (!note.note) return '';
      if (note.isScaleNote) {
        const tonicInCurrentNotation = convertNote(chromaticScale[chromaticScale.indexOf(tone)], notation);
        return note.note === tonicInCurrentNotation ? 'note-marker root' : 'note-marker scale';
      }
      return 'note-marker non-scale';
    } else {
      if (typeof note === 'string') {
        if (!note) return '';
        const tonicBaseNote = chromaticScale[chromaticScale.indexOf(tone)];
        return note === tonicBaseNote ? 'note-marker root' : 'note-marker scale';
      }
      return '';
    }
  };

  const getNoteDisplay = (note: FretNote | string): string => {
    if (displayMode === 'all') {
      if (typeof note === 'string') return '';
      return note.note;
    } else {
      if (typeof note === 'string') {
        return note ? convertNote(note, notation) : '';
      }
      return '';
    }
  };

  return (
    <div className="scale-container">
      <h2 className="scale-title">Escalas</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-4 scale-selector">
        <div>
          <label>Tono:</label>
          <select 
            value={tone} 
            onChange={(e) => handleNotationChange(e.target.value)}
          >
            {chromaticScale.map((t) => (
              <option key={t} value={t}>
                {convertNote(t, notation)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Tipo de escala:</label>
          <select 
            value={scaleType} 
            onChange={(e) => setScaleType(e.target.value)}
          >
            {Object.keys(scalePatterns).map((type) => (
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
        <div>
          <label>Modo de visualización:</label>
          <select 
            value={displayMode} 
            onChange={(e) => setDisplayMode(e.target.value as DisplayMode)}
          >
            <option value="all">Mostrar todas las notas</option>
            <option value="scale">Mostrar solo notas de la escala</option>
          </select>
        </div>
      </div>

      <div className="fretboard-container">
        <div className="fretboard">
          <div className="fret-numbers">
            {Array.from({ length: TOTAL_FRETS + 1 }, (_, i) => (
              <div key={i} className="fret-number">{i}</div>
            ))}
          </div>
          <div className="strings-container">
            {fretboard.map((string, stringIdx) => (
              <div key={stringIdx} className="string-row">
                {string.map((note, fretIdx) => (
                  <div
                    key={fretIdx}
                    className={`fret ${getNoteClass(note)}`}
                  >
                    {getNoteDisplay(note)}
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
          <span className="selected-tone-block">{convertNote(tone, notation)}</span>
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
