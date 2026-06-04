'use client';

import { useMemo, useState } from 'react';
import {
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  Layers3,
  ListMusic,
  Plus,
  RotateCcw,
  Route,
  Trash2,
} from 'lucide-react';
import { chromaticScale } from '@/data/scaleData';
import {
  DegreeChord,
  ProgressionTemplate,
  ScaleFamily,
  SupportedScaleName,
  getDiatonicChords,
  getProgressionFromDegrees,
  getScaleFamily,
  getTemplatesForScale,
  supportedProgressionScales,
} from '@/data/progressions';
import { useMusicNotation } from '@/contexts/MusicNotationContext';
import { convertNote } from '@/utils/noteConverter';

const functionDescriptions: Record<ScaleFamily, Record<string, string>> = {
  major: {
    Tonica: 'Zona de reposo y estabilidad tonal.',
    Subdominante: 'Empuja el movimiento hacia una zona de mayor tension.',
    Dominante: 'Crea expectativa de resolucion y regreso al centro tonal.',
  },
  minor: {
    Tonica: 'Ancla el color menor y reafirma el centro modal.',
    Subdominante: 'Abre el recorrido armonico antes del punto de mayor tension.',
    Dominante: 'Marca el impulso de cierre dentro de la sonoridad menor natural.',
  },
};

const defaultDegreesByFamily: Record<ScaleFamily, number[]> = {
  major: [1, 4, 5],
  minor: [1, 6, 3, 7],
};

const formatChordLabel = (chord: DegreeChord, notation: 'american' | 'spanish') =>
  `${convertNote(chord.note, notation)}${chord.quality}`;

const ProgressionLab = () => {
  const { notation } = useMusicNotation();
  const [tone, setTone] = useState('C');
  const [scaleName, setScaleName] = useState<SupportedScaleName>('Jónico');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [builderDegrees, setBuilderDegrees] = useState<number[]>(defaultDegreesByFamily.major);

  const scaleFamily = useMemo(() => getScaleFamily(scaleName), [scaleName]);
  const diatonicChords = useMemo(() => getDiatonicChords(tone, scaleName), [tone, scaleName]);
  const templateOptions = useMemo(() => getTemplatesForScale(scaleName), [scaleName]);
  const progressionChords = useMemo(
    () => getProgressionFromDegrees(builderDegrees, diatonicChords),
    [builderDegrees, diatonicChords],
  );

  const selectedTemplate = useMemo(
    () => templateOptions.find((template) => template.id === selectedTemplateId) || null,
    [selectedTemplateId, templateOptions],
  );

  const functionSummary = useMemo(() => {
    const counts = progressionChords.reduce<Record<string, number>>((accumulator, chord) => {
      accumulator[chord.harmonicFunction] = (accumulator[chord.harmonicFunction] || 0) + 1;
      return accumulator;
    }, {});

    return ['Tonica', 'Subdominante', 'Dominante'].map((harmonicFunction) => ({
      harmonicFunction,
      count: counts[harmonicFunction] || 0,
      description: functionDescriptions[scaleFamily][harmonicFunction],
    }));
  }, [progressionChords, scaleFamily]);

  const handleLoadTemplate = (template: ProgressionTemplate) => {
    setSelectedTemplateId(template.id);
    setBuilderDegrees(template.degrees);
  };

  const handleAppendDegree = (degree: number) => {
    setBuilderDegrees((currentDegrees) => [...currentDegrees, degree]);
  };

  const handleMoveStep = (index: number, direction: -1 | 1) => {
    setBuilderDegrees((currentDegrees) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= currentDegrees.length) return currentDegrees;

      const nextDegrees = [...currentDegrees];
      [nextDegrees[index], nextDegrees[nextIndex]] = [nextDegrees[nextIndex], nextDegrees[index]];
      return nextDegrees;
    });
  };

  const handleRemoveStep = (index: number) => {
    setBuilderDegrees((currentDegrees) => currentDegrees.filter((_, stepIndex) => stepIndex !== index));
  };

  const handleTranspose = (direction: -1 | 1) => {
    const currentIndex = chromaticScale.indexOf(tone);
    const nextIndex = (currentIndex + direction + chromaticScale.length) % chromaticScale.length;
    setTone(chromaticScale[nextIndex]);
  };

  return (
    <div className="progression-container progression-workspace scale-container">
      <header className="progression-workspace-header">
        <span className="section-kicker">LABORATORIO ARMONICO</span>
        <h2 className="scale-title progression-workspace-title">Progresiones y funcion tonal</h2>
        <p className="progression-workspace-text">
          Uni escalas, acordes y funcion armonica en un workspace visual para construir progresiones,
          analizar su movimiento y transponerlas sin perder contexto teorico.
        </p>
      </header>

      <div className="progression-layout-grid">
        <section className="progression-config-panel">
          <div className="progression-panel-head">
            <Route className="progression-panel-icon" />
            <div>
              <span className="progression-panel-kicker">Configuracion</span>
              <h3 className="progression-panel-title">Centro tonal y punto de partida</h3>
            </div>
          </div>

          <div className="progression-config-grid">
            <label className="progression-config-field" htmlFor="progression-tone">
              <span>Tonalidad</span>
              <select
                id="progression-tone"
                value={tone}
                onChange={(event) => setTone(event.target.value)}
                className="progression-select"
              >
                {chromaticScale.map((currentTone) => (
                  <option key={currentTone} value={currentTone}>
                    {convertNote(currentTone, notation)}
                  </option>
                ))}
              </select>
            </label>

            <label className="progression-config-field" htmlFor="progression-scale">
              <span>Escala base</span>
              <select
                id="progression-scale"
                value={scaleName}
                onChange={(event) => {
                  const nextScale = event.target.value as SupportedScaleName;
                  setScaleName(nextScale);
                  setSelectedTemplateId('');
                  setBuilderDegrees(defaultDegreesByFamily[getScaleFamily(nextScale)]);
                }}
                className="progression-select"
              >
                {supportedProgressionScales.map((supportedScale) => (
                  <option key={supportedScale} value={supportedScale}>
                    {supportedScale}
                  </option>
                ))}
              </select>
            </label>

            <label className="progression-config-field" htmlFor="progression-template">
              <span>Preset sugerido</span>
              <select
                id="progression-template"
                value={selectedTemplateId}
                onChange={(event) => setSelectedTemplateId(event.target.value)}
                className="progression-select"
              >
                <option value="">Elegir progresion comun</option>
                {templateOptions.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="progression-config-actions">
            <button
              type="button"
              className="progression-cta progression-cta-primary"
              onClick={() => {
                if (selectedTemplate) handleLoadTemplate(selectedTemplate);
              }}
              disabled={!selectedTemplate}
            >
              <ListMusic className="progression-cta-icon" />
              <span>Cargar progresion comun</span>
            </button>

            <button type="button" className="progression-cta progression-cta-secondary" onClick={() => setBuilderDegrees([])}>
              <Trash2 className="progression-cta-icon" />
              <span>Limpiar</span>
            </button>
          </div>

          <div className="progression-transpose-bar">
            <span className="progression-panel-kicker">Transposicion instantanea</span>
            <div className="progression-transpose-actions">
              <button type="button" className="progression-chip-button" onClick={() => handleTranspose(-1)}>
                <ChevronLeft className="progression-inline-icon" />
                <span>Bajar</span>
              </button>
              <div className="progression-transpose-current">
                <ArrowLeftRight className="progression-inline-icon" />
                <strong>{convertNote(tone, notation)}</strong>
              </div>
              <button type="button" className="progression-chip-button" onClick={() => handleTranspose(1)}>
                <span>Subir</span>
                <ChevronRight className="progression-inline-icon" />
              </button>
            </div>
          </div>
        </section>

        <section className="progression-builder-panel">
          <div className="progression-panel-head">
            <Layers3 className="progression-panel-icon" />
            <div>
              <span className="progression-panel-kicker">Builder visual</span>
              <h3 className="progression-panel-title">Secuencia activa</h3>
            </div>
          </div>

          <div className="progression-builder-actions">
            {diatonicChords.map((chord) => (
              <button
                key={chord.degree}
                type="button"
                className="progression-add-button"
                onClick={() => handleAppendDegree(chord.degree)}
              >
                <Plus className="progression-inline-icon" />
                <span>{chord.roman}</span>
                <small>{formatChordLabel(chord, notation)}</small>
              </button>
            ))}
          </div>

          {progressionChords.length ? (
            <div className="progression-steps-grid">
              {progressionChords.map((chord, index) => (
                <article key={`${chord.roman}-${index}`} className="progression-step-card">
                  <div className="progression-step-order">Paso {index + 1}</div>
                  <div className="progression-step-roman">{chord.roman}</div>
                  <h4 className="progression-step-chord">{formatChordLabel(chord, notation)}</h4>
                  <p className="progression-step-function">{chord.harmonicFunction}</p>
                  <div className="progression-step-actions">
                    <button
                      type="button"
                      className="progression-step-button"
                      onClick={() => handleMoveStep(index, -1)}
                      disabled={index === 0}
                    >
                      <ChevronLeft className="progression-inline-icon" />
                    </button>
                    <button
                      type="button"
                      className="progression-step-button"
                      onClick={() => handleMoveStep(index, 1)}
                      disabled={index === progressionChords.length - 1}
                    >
                      <ChevronRight className="progression-inline-icon" />
                    </button>
                    <button
                      type="button"
                      className="progression-step-button danger"
                      onClick={() => handleRemoveStep(index)}
                    >
                      <Trash2 className="progression-inline-icon" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="progression-empty-state">
              <RotateCcw className="progression-panel-icon" />
              <p>La progresion esta vacia. Carga un preset o agrega grados desde el builder.</p>
            </div>
          )}
        </section>
      </div>

      <div className="progression-insight-grid">
        <section className="progression-diatonic-panel">
          <div className="progression-panel-head">
            <ListMusic className="progression-panel-icon" />
            <div>
              <span className="progression-panel-kicker">Acordes diatonicos</span>
              <h3 className="progression-panel-title">Mapa funcional en {convertNote(tone, notation)}</h3>
            </div>
          </div>

          <div className="progression-degree-grid">
            {diatonicChords.map((chord) => (
              <article key={chord.degree} className="progression-degree-card">
                <span className="progression-degree-roman">{chord.roman}</span>
                <strong className="progression-degree-chord">{formatChordLabel(chord, notation)}</strong>
                <span className="progression-degree-function">{chord.harmonicFunction}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="progression-analysis-panel">
          <div className="progression-panel-head">
            <Layers3 className="progression-panel-icon" />
            <div>
              <span className="progression-panel-kicker">Lectura armonica</span>
              <h3 className="progression-panel-title">Como se mueve la progresion</h3>
            </div>
          </div>

          {selectedTemplate ? (
            <div className="progression-template-card">
              <div className="progression-template-header">
                <h4>{selectedTemplate.name}</h4>
                <div className="progression-tag-row">
                  {selectedTemplate.tags.map((tag) => (
                    <span key={tag} className="progression-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p>{selectedTemplate.description}</p>
            </div>
          ) : null}

          <div className="progression-function-list">
            {functionSummary.map((item) => (
              <article key={item.harmonicFunction} className="progression-function-card">
                <div className="progression-function-top">
                  <span className="progression-function-name">{item.harmonicFunction}</span>
                  <strong>{item.count}</strong>
                </div>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="progression-suggestions-panel">
        <div className="progression-panel-head">
          <Route className="progression-panel-icon" />
          <div>
            <span className="progression-panel-kicker">Progresiones sugeridas</span>
            <h3 className="progression-panel-title">Biblioteca segun familia {scaleFamily === 'major' ? 'mayor' : 'menor'}</h3>
          </div>
        </div>

        <div className="progression-suggestion-grid">
          {templateOptions.map((template) => (
            <article key={template.id} className="progression-suggestion-card">
              <div className="progression-suggestion-top">
                <h4>{template.name}</h4>
                <span>{template.degrees.join(' - ')}</span>
              </div>
              <p>{template.description}</p>
              <button
                type="button"
                className="progression-cta progression-cta-ghost"
                onClick={() => handleLoadTemplate(template)}
              >
                <span>Usar en el builder</span>
                <ChevronRight className="progression-cta-icon" />
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProgressionLab;
