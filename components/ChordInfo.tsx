"use client";

import { useState } from "react";
import {
  chromaticScale,
  chordFormulas,
  chordLabels,
  tetradExtensions,
  tetradLabels,
} from "@/data/chordFormulas";
import { ChordType } from "@/data/chordShapes";
import { useMusicNotation } from '@/contexts/MusicNotationContext';
import { convertNote } from '@/utils/noteConverter';

const chordTypes: ChordType[] = ["Mayor", "Menor", "Disminuido", "Aumentado"];

const ChordInfo = () => {
  const [tone, setTone] = useState("C");
  const [type, setType] = useState<ChordType>("Mayor");
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

  const getChordNotes = (root: string, formula: number[]): string[] => {
    const rootIndex = chromaticScale.indexOf(root);
    return formula.map((interval) => chromaticScale[(rootIndex + interval) % 12]);
  };

  const chordNotes = getChordNotes(tone, finalFormula);

  const explanation = isTetrad
    ? `Una cuatriada ${type.toLowerCase()} se forma con los grados: ${finalLabels.join(', ')}.`
    : `Una tríada ${type.toLowerCase()} contiene los grados: ${finalLabels.join(', ')}.`;

  const chordDisplayName = `${convertNote(tone, notation)} ${type}${isTetrad ? ' 7' : ''}`;

  return (
    <div className="chord-container scale-container chord-workspace">
      <header className="chord-workspace-header">
        <span className="section-kicker">TEORIA APLICADA</span>
        <h2 className="chord-title chord-workspace-title">Triadas y acordes</h2>
        <p className="chord-workspace-text">
          Explorá la estructura armónica del acorde seleccionado con un layout más claro, manteniendo
          intactas las fórmulas, intervalos y notas generadas por la app.
        </p>
      </header>

      <div className="chord-workspace-grid">
        <section className="chord-control-panel">
          <div className="chord-control-group">
            <span className="chord-panel-kicker">Tonalidad</span>
            <div className="chord-tone-grid">
              {chromaticScale.map((note) => {
                const isActive = note === tone;
                return (
                  <button
                    key={note}
                    type="button"
                    className={`chord-tone-button ${isActive ? 'is-active' : ''}`}
                    onClick={() => setTone(note)}
                  >
                    {convertNote(note, notation)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="chord-control-group">
            <span className="chord-panel-kicker">Tipo de acorde</span>
            <div className="chord-type-list">
              {chordTypes.map((currentType) => {
                const isActive = currentType === type;
                return (
                  <button
                    key={currentType}
                    type="button"
                    className={`chord-type-button ${isActive ? 'is-active' : ''}`}
                    onClick={() => setType(currentType)}
                  >
                    <span>{currentType}</span>
                    <span className="chord-type-suffix">
                      {currentType === 'Mayor' ? 'M' : currentType === 'Menor' ? 'm' : currentType === 'Aumentado' ? 'aug' : 'dim'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="chord-extension-toggle">
            <div>
              <span className="chord-panel-kicker">Extensiones</span>
              <p className="chord-extension-copy">Agregar séptima para ver la cuatriada resultante.</p>
            </div>
            <label className="chord-toggle-switch">
              <input
                type="checkbox"
                checked={isTetrad}
                onChange={() => setIsTetrad(!isTetrad)}
              />
              <span className="chord-toggle-slider" />
            </label>
          </div>
        </section>

        <section className="chord-visual-panel">
          <div className="chord-visual-notes">
            {chordNotes.map((note, index) => (
              <div key={`${note}-${index}`} className={`chord-note-orb ${index === 0 ? 'is-root' : ''}`}>
                <span className="chord-note-role">{finalLabels[index]}</span>
                <div className="chord-note-circle">
                  <span className="chord-note-letter">{convertNote(note, notation)}</span>
                </div>
                <span className="chord-note-degree">{index + 1}</span>
              </div>
            ))}
          </div>

          <div className="chord-visual-summary">
            <h3 className="chord-visual-title">{chordDisplayName}</h3>
            <p className="chord-visual-subtitle">Intervalos: {finalLabels.join(' — ')}</p>
          </div>
        </section>
      </div>

      <section className="chord-details-grid">
        <article className="chord-detail-card">
          <h3 className="scale-info-title">Grados</h3>
          <div className="chord-detail-list">
            {finalLabels.map((label, index) => (
              <div className="interval-item" key={index}>
                <span className="interval-degree">{index + 1}º</span> {label}
              </div>
            ))}
          </div>
        </article>

        <article className="chord-detail-card">
          <h3 className="scale-info-title">Notas</h3>
          <div className="chord-detail-list">
            {chordNotes.map((note, index) => (
              <div className="note-item" key={index}>
                <span className="note-degree">{index + 1}º</span> {convertNote(note, notation)}
              </div>
            ))}
          </div>
        </article>

        <article className="chord-detail-card chord-detail-copy">
          <h3 className="scale-info-title">Lectura rápida</h3>
          <p className="chord-explanation">{explanation}</p>
          <p className="chord-notes">
            Notas en <span className="selected-tone-block">{convertNote(tone, notation)}</span>{' '}
            <span className="selected-scale-type-block">{type}</span>: {chordNotes.map((note) => convertNote(note, notation)).join(', ')}
          </p>
        </article>
      </section>
    </div>
  );
};

export default ChordInfo;
