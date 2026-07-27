"use client";

import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Layers3, Music2, Waypoints } from 'lucide-react';
import {
  chromaticScale,
  scalePatterns,
  instrumentStrings,
  InstrumentType,
  TOTAL_FRETS,
} from '@/data/scaleData';
import { scaleFormulas } from '@/data/scaleFormulas';
import { getScaleSlug, type ScaleDeepLinkState } from '@/data/deepLinks';
import { useMusicNotation } from '../contexts/MusicNotationContext';
import { convertNote } from '../utils/noteConverter';

type DisplayMode = 'all' | 'scale';

interface ScaleViewerProps {
  initialState?: Partial<ScaleDeepLinkState>;
  syncUrl?: boolean;
}

interface FretNote {
  note: string;
  isScaleNote: boolean;
  isRoot: boolean;
}

const getScaleNotes = (root: string, pattern: number[]): string[] => {
  const rootIndex = chromaticScale.indexOf(root);
  return pattern.map((step) => chromaticScale[(rootIndex + step) % 12]);
};

const getFretboard = (
  scaleNotesBase: string[],
  instrumentType: InstrumentType,
  displayMode: DisplayMode,
  rootNoteBase: string,
  fretCount: number,
): (FretNote | string)[][] => {
  const strings = instrumentStrings[instrumentType];

  return strings.map((openNoteBase) => {
    const startIndex = chromaticScale.indexOf(openNoteBase);
    return Array.from({ length: fretCount + 1 }, (_, fret) => {
      const noteBase = chromaticScale[(startIndex + fret) % 12];
      const isScaleNote = scaleNotesBase.includes(noteBase);
      const isRoot = noteBase === rootNoteBase;

      if (displayMode === 'all') {
        return {
          note: noteBase,
          isScaleNote,
          isRoot,
        } as FretNote;
      }

      return isScaleNote ? noteBase : '';
    });
  });
};

const getChordsByDegree = (scaleType: string, scaleNotes: string[]) => {
  const chords = scaleFormulas[scaleType]?.chords;
  if (!chords) return [];
  return scaleNotes.map((note, idx) => note + (chords[idx] || ''));
};

const getValidTone = (value: string | undefined) => (
  value && chromaticScale.includes(value) ? value : 'C'
);

const getValidScaleType = (value: string | undefined) => (
  value && scalePatterns[value] ? value : 'Pentatónica Mayor'
);

const getValidInstrument = (value: string | undefined): InstrumentType => (
  value === 'bass' ? 'bass' : 'guitar'
);

const getValidDisplayMode = (value: string | undefined): DisplayMode => (
  value === 'all' ? 'all' : 'scale'
);

const ScaleViewer = ({ initialState, syncUrl = false }: ScaleViewerProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { notation } = useMusicNotation();
  const [tone, setTone] = useState(() => getValidTone(initialState?.root));
  const [scaleType, setScaleType] = useState(() => getValidScaleType(initialState?.scale));
  const [instrumentType, setInstrumentType] = useState<InstrumentType>(() => getValidInstrument(initialState?.instrument));
  const [displayMode, setDisplayMode] = useState<DisplayMode>(() => getValidDisplayMode(initialState?.view));
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const pattern = scalePatterns[scaleType];
  const scaleNotesBase = getScaleNotes(tone, pattern);
  const fretCount = TOTAL_FRETS;
  const fretboard = getFretboard(scaleNotesBase, instrumentType, displayMode, tone, fretCount);
  const scaleInfo = scaleFormulas[scaleType];
  const totalFrets = fretCount + 1;
  const fretMinSize = instrumentType === 'guitar' ? 'clamp(1.55rem, 4.8vw, 2.45rem)' : 'clamp(1.85rem, 5.6vw, 2.8rem)';
  const fretboardStyle: CSSProperties = {
    width: instrumentType === 'guitar' ? 'max(100%, 48rem)' : 'max(100%, 36rem)',
  };
  const fretGridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${totalFrets}, minmax(${fretMinSize}, 1fr))`,
  };

  useEffect(() => {
    if (!syncUrl) return;

    const params = new URLSearchParams({
      root: tone,
      scale: getScaleSlug(scaleType),
      instrument: instrumentType,
      view: displayMode,
    });

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [displayMode, instrumentType, pathname, router, scaleType, syncUrl, tone]);

  const handleDisplayModeChange = (newMode: DisplayMode) => {
    setIsLoading(true);
    setLoadingMessage('Cambiando visualización...');
    setDisplayMode(newMode);

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const handleNotationChange = (newTone: string) => {
    setIsLoading(true);
    setLoadingMessage('Cambiando tono...');
    setTone(newTone);

    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  const handleScaleTypeChange = (newScaleType: string) => {
    setIsLoading(true);
    setLoadingMessage('Cambiando escala...');
    setScaleType(newScaleType);

    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  const handleInstrumentChange = (newInstrument: InstrumentType) => {
    setIsLoading(true);
    setLoadingMessage('Cambiando instrumento...');
    setInstrumentType(newInstrument);

    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  const getNoteClass = (note: FretNote | string): string => {
    if (displayMode === 'all') {
      if (typeof note === 'string') return '';
      if (note.isRoot) return 'note-marker root';
      if (note.isScaleNote) return 'note-marker scale';
      return 'note-marker non-scale';
    }

    if (typeof note === 'string') {
      if (!note) return 'note-marker non-scale';
      const tonicBaseNote = chromaticScale[chromaticScale.indexOf(tone)];
      return note === tonicBaseNote ? 'note-marker root' : 'note-marker scale';
    }

    return '';
  };

  const getNoteDisplay = (note: FretNote | string): string => {
    if (displayMode === 'all') {
      if (typeof note === 'string') return '';
      return convertNote(note.note, notation);
    }

    if (typeof note === 'string') {
      return note ? convertNote(note, notation) : '';
    }

    return '';
  };

  return (
    <div className="scale-container scale-workspace">
      <header className="scale-workspace-header">
        <div>
          <span className="section-kicker">MUSICAL MAP</span>
          <h2 className="scale-title scale-workspace-title">Escalas y diapasón dinámico</h2>
        </div>
        <p className="scale-workspace-text">
          Explorá la relación entre tono, patrón e instrumento en un workspace visual pensado para estudiar
          con claridad sin alterar la lógica real de la app.
        </p>
      </header>

      <section className="scale-controls-grid">
        <article className="scale-control-card accent-primary">
          <span className="scale-control-kicker">Fundamental</span>
          <label htmlFor="scale-tone" className="scale-control-title">Tono</label>
          <select
            id="scale-tone"
            value={tone}
            onChange={(event) => handleNotationChange(event.target.value)}
            className="scale-workspace-select"
          >
            {chromaticScale.map((currentTone) => (
              <option key={currentTone} value={currentTone}>
                {convertNote(currentTone, notation)}
              </option>
            ))}
          </select>
        </article>

        <article className="scale-control-card accent-secondary">
          <span className="scale-control-kicker">Estructura</span>
          <label htmlFor="scale-type" className="scale-control-title">Escala</label>
          <select
            id="scale-type"
            value={scaleType}
            onChange={(event) => handleScaleTypeChange(event.target.value)}
            className="scale-workspace-select"
          >
            {Object.keys(scalePatterns).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </article>

        <article className="scale-control-card accent-tertiary">
          <span className="scale-control-kicker">Herramienta</span>
          <label htmlFor="scale-instrument" className="scale-control-title">Instrumento</label>
          <select
            id="scale-instrument"
            value={instrumentType}
            onChange={(event) => handleInstrumentChange(event.target.value as InstrumentType)}
            className="scale-workspace-select"
          >
            <option value="guitar">Guitarra (6 cuerdas)</option>
            <option value="bass">Bajo (4 cuerdas)</option>
          </select>
        </article>

        <article className="scale-control-card accent-primary-soft">
          <span className="scale-control-kicker">Interfaz</span>
          <label htmlFor="scale-display" className="scale-control-title">Visualización</label>
          <select
            id="scale-display"
            value={displayMode}
            onChange={(event) => handleDisplayModeChange(event.target.value as DisplayMode)}
            className="scale-workspace-select"
          >
            <option value="all">Mostrar todas las notas</option>
            <option value="scale">Mostrar solo notas de la escala</option>
          </select>
        </article>
      </section>

      <div className="scale-legend-strip">
        <div className="scale-legend-pill root">
          <span className="scale-legend-dot" />
          <span>Tónica</span>
        </div>
        <div className="scale-legend-pill scale">
          <span className="scale-legend-dot" />
          <span>Nota de escala</span>
        </div>
        <div className="scale-legend-pill neutral">
          <span className="scale-legend-dot" />
          <span>{displayMode === 'all' ? 'Nota fuera de escala' : 'Espacio no usado'}</span>
        </div>
      </div>

      <section className="scale-fretboard-shell">
        <div className="scale-fretboard-header">
          <div>
            <span className="scale-control-kicker">Visualizador principal</span>
            <h3 className="scale-fretboard-title">Diapasón técnico</h3>
          </div>
          <div className="scale-fretboard-stats">
            <span className="scale-stat-chip">
              <Music2 className="scale-stat-icon" />
              {convertNote(tone, notation)}
            </span>
            <span className="scale-stat-chip">
              <Layers3 className="scale-stat-icon" />
              {scaleType}
            </span>
            <span className="scale-stat-chip">
              <Waypoints className="scale-stat-icon" />
              {instrumentType === 'guitar' ? '6 cuerdas' : '4 cuerdas'}
            </span>
          </div>
        </div>

        <div className="fretboard-container">
          {isLoading ? (
            <div className="fretboard-loading">
              <div className="spinner"></div>
              <p>{loadingMessage}</p>
            </div>
          ) : (
            <div className="fretboard" style={fretboardStyle}>
              <div className="fret-numbers" style={fretGridStyle}>
                {Array.from({ length: TOTAL_FRETS + 1 }, (_, index) => (
                  <div key={index} className="fret-number">{index}</div>
                ))}
              </div>
              <div className="strings-container">
                {fretboard.map((string, stringIdx) => (
                  <div
                    key={stringIdx}
                    className={`string-row ${displayMode === 'all' ? 'string-row-all' : 'string-row-scale'}`}
                    style={fretGridStyle}
                  >
                    {string.map((note, fretIdx) => (
                      <div key={fretIdx} className={`fret ${getNoteClass(note)}`}>
                        {getNoteDisplay(note)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="scale-insight-grid">
        <article className="scale-insight-card">
          <h3 className="scale-info-title">Fórmula de la escala</h3>
          <div className="formula-display">
            <span className="formula-text">{scaleInfo.formula}</span>
          </div>
        </article>
        <article className="scale-insight-card">
          <h3 className="scale-info-title">Tipo</h3>
          <span className={`type-badge ${scaleInfo.type}`}>
            {scaleInfo.type.charAt(0).toUpperCase() + scaleInfo.type.slice(1)}
          </span>
        </article>
        <article className="scale-insight-card">
          <h3 className="scale-info-title">Tónica seleccionada</h3>
          <span className="selected-tone-block">{convertNote(tone, notation)}</span>
        </article>
        <article className="scale-insight-card">
          <h3 className="scale-info-title">Modo activo</h3>
          <span className="selected-scale-type-block">{scaleType}</span>
        </article>
      </section>

      <div className="scale-horizontal-blocks">
        <div className="horizontal-block">
          <div className="horizontal-block-title">Notas de la escala</div>
          <div className="horizontal-row">
            {scaleNotesBase.map((noteBase, index) => (
              <span className="horizontal-item note-item" key={index}>
                <span className="note-degree">{index + 1}º</span> {convertNote(noteBase, notation)}
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
            {getChordsByDegree(scaleType, scaleNotesBase).map((chord, index) => (
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
