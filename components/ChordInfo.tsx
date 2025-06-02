"use client";
import { useState } from "react";
import FretboardChord from "./fretboard/FretboardChord";
import {
  chromaticScale,
  chordFormulas,
  chordLabels,
  tetradExtensions,
  tetradLabels,
} from "@/data/chordFormulas";
import { chordShapes, ShapeType, ChordType, Position } from "@/data/chordShapes";
import { useMusicNotation } from '@/contexts/MusicNotationContext';
import { convertNote } from '@/utils/noteConverter';

const ChordInfo = () => {
  const [tone, setTone] = useState("C");
  const [type, setType] = useState<ChordType>("Mayor");
  const [shape, setShape] = useState<ShapeType>("Fundamental");
  const [isTetrad, setIsTetrad] = useState(false);

  const { notation } = useMusicNotation();

  const baseFormula = chordFormulas[type];
  const baseLabels = chordLabels[type];
  const finalFormula = isTetrad && tetradExtensions[type]
    ? [...baseFormula, ...tetradExtensions[type]]
    : baseFormula;
  const finalLabels = isTetrad && tetradLabels[type]
    ? [...baseLabels, ...tetradLabels[type]]
    : baseLabels;

  const transposePositions = (
    positions: Position[],
    fromNote: string,
    toNote: string
  ): Position[] => {
    const fromIdx = chromaticScale.indexOf(fromNote);
    const toIdx = chromaticScale.indexOf(toNote);
    const diff = (toIdx - fromIdx + 12) % 12;

    const baseFrets = positions.map((p) => p.fret);
    const highest = Math.max(...baseFrets);
    const hasTetrad = isTetrad && finalLabels.length > 3;

    const extra: Position[] = hasTetrad
      ? [{ string: 0, fret: highest + 1, label: finalLabels[3] }]
      : [];

    return [...positions, ...extra].map((pos) => ({
      ...pos,
      fret: pos.fret + diff,
    }));
  };

  const getChordNotes = (root: string, formula: number[]): string[] => {
    const rootIndex = chromaticScale.indexOf(root);
    return formula.map((i) => chromaticScale[(rootIndex + i) % 12]);
  };

  const tonicShape = chordShapes[type][shape];
  const transposed = transposePositions(tonicShape, "C", tone);
  const chordNotes = getChordNotes(tone, finalFormula);

  const explanation = isTetrad
    ? `Una cuatriada ${type.toLowerCase()} se forma con los grados: ${finalLabels.join(', ')}.`
    : `Una tríada ${type.toLowerCase()} contiene los grados: ${finalLabels.join(', ')}.`;

  return (
    <div className="chord-container scale-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 className="chord-title scale-title" style={{ textAlign: 'center', width: '100%' }}>Visualizador de Acordes</h2>

      <div className="chord-form scale-selector" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', width: '100%' }}>
        <div>
          <label className="chord-label">Tonalidad</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="chord-select"
          >
            {chromaticScale.map((note) => (
              <option key={note} value={note}>
                {convertNote(note, notation)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="chord-label">Tipo de acorde</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ChordType)}
            className="chord-select"
          >
            {["Mayor", "Menor", "Disminuido", "Aumentado"].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="chord-checkbox-wrapper">
          <input
            type="checkbox"
            checked={isTetrad}
            onChange={() => setIsTetrad(!isTetrad)}
            className="mr-2"
          />
          <label>Agregar séptima (cuatriada)</label>
        </div>
      </div>

      <div className="chord-info-row" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', width: '100%' }}>
        <div className="chord-info-block">
          <h3 className="scale-info-title">Grados</h3>
          <div className="intervals-list">
            {finalLabels.map((label, idx) => (
              <div className="interval-item" key={idx}>
                <span className="interval-degree">{idx + 1}º</span> {label}
              </div>
            ))}
          </div>
        </div>
        <div className="chord-info-block">
          <h3 className="scale-info-title">Notas</h3>
          <div className="notes-list">
            {chordNotes.map((note, idx) => (
              <div className="note-item" key={idx}>
                <span className="note-degree">{idx + 1}º</span> {convertNote(note, notation)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="chord-explanation" style={{ textAlign: 'center', width: '100%' }}>{explanation}</p>
      <p className="chord-notes" style={{ textAlign: 'center', width: '100%' }}>
        Notas en <span className="selected-tone-block">{convertNote(tone, notation)}</span> <span className="selected-scale-type-block">{type}</span>: {chordNotes.map(note => convertNote(note, notation)).join(', ')}
      </p>

      {/* <FretboardChord positions={transposed} /> */}
    </div>
  );
};

export default ChordInfo;
