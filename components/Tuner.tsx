'use client';

import { useEffect, useRef, useState } from "react";
import { Activity, Mic, MicOff, Music4, SlidersHorizontal } from 'lucide-react';
import { useMicrophone } from "../hooks/useMicrophone";

const referenceNotes = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];

const Tuner = () => {
  const { stream } = useMicrophone();
  const [active, setActive] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [cents, setCents] = useState<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const noteFromFrequency = (frequency: number) => {
    const A4 = 440;
    const SEMITONE = 69;
    const noteIndex = 12 * (Math.log(frequency / A4) / Math.log(2));
    const midi = Math.round(noteIndex + SEMITONE);
    const centsOffset = Math.floor((noteIndex + SEMITONE - midi) * 100);
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    return {
      name: noteNames[midi % 12],
      cents: centsOffset,
    };
  };

  useEffect(() => {
    if (!stream || !active) return;

    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);
    analyserRef.current = analyser;
    const buffer = new Float32Array(analyser.fftSize);

    const detectPitch = () => {
      analyser.getFloatTimeDomainData(buffer);

      const autoCorrelate = (buf: Float32Array, sampleRate: number): number => {
        let bestOffset = -1;
        let bestCorrelation = 0;
        const rms = Math.sqrt(buf.reduce((acc, val) => acc + val * val, 0) / buf.length);
        if (rms < 0.01) return -1;

        let lastCorrelation = 1;
        for (let offset = 32; offset < 512; offset++) {
          let correlation = 0;
          for (let i = 0; i < 512; i++) {
            correlation += buf[i] * buf[i + offset];
          }
          correlation = Math.abs(correlation);
          if (correlation > bestCorrelation && correlation > lastCorrelation) {
            bestCorrelation = correlation;
            bestOffset = offset;
          }
          lastCorrelation = correlation;
        }
        if (bestOffset === -1) return -1;
        return sampleRate / bestOffset;
      };

      const freq = autoCorrelate(buffer, context.sampleRate);
      if (freq !== -1) {
        const result = noteFromFrequency(freq);
        setNote(result.name);
        setCents(result.cents);
      } else {
        setNote(null);
        setCents(null);
      }

      requestAnimationFrame(detectPitch);
    };

    detectPitch();

    return () => {
      analyser.disconnect();
      source.disconnect();
      context.close();
    };
  }, [stream, active]);

  const getTuningIndicator = () => {
    if (cents === null) return '-';
    if (cents < -10) return '♭';
    if (cents > 10) return '#';
    return '✓';
  };

  const getStatusLabel = () => {
    if (!active) return 'Inactivo';
    if (cents === null) return 'Escuchando';
    if (Math.abs(cents) <= 10) return 'Afinado';
    return cents < 0 ? 'Bajo' : 'Alto';
  };

  const getStatusTone = () => {
    if (!active || cents === null) return 'neutral';
    if (Math.abs(cents) <= 10) return 'in-tune';
    return 'out-of-tune';
  };

  const gaugeRotation = Math.max(-45, Math.min(45, (cents ?? 0) * 1.35));
  const centsLabel = cents === null ? '-- cents' : `${cents > 0 ? '+' : ''}${cents} cents`;

  return (
    <div className="tuner-container tuner-workspace">
      <header className="tuner-workspace-header">
        <span className="section-kicker">HERRAMIENTA DE PRECISION</span>
        <h2 className="tuner-title tuner-workspace-title">Afinador cromático</h2>
        <p className="tuner-workspace-text">
          Feedback visual directo para sesiones de práctica y ajuste fino, manteniendo la detección real del
          micrófono y la lectura actual del componente.
        </p>
      </header>

      <div className="tuner-workspace-grid">
        <section className="tuner-gauge-card">
          <div className="tuner-gauge-backdrop" />
          <div className="tuner-gauge-shell">
            <svg className="tuner-gauge-arc" viewBox="0 0 220 120" aria-hidden="true">
              <path
                d="M 20 100 A 90 90 0 0 1 200 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                className="tuner-gauge-track"
              />
            </svg>

            <div
              className={`tuner-gauge-needle ${getStatusTone()}`}
              style={{ transform: `translateX(-50%) rotate(${gaugeRotation}deg)` }}
            />

            <div className="tuner-gauge-display">
              <div className="tuner-note">{note || '--'}</div>
              <div className="tuner-cents">{centsLabel}</div>
              <div className={`tuner-status-pill ${getStatusTone()}`}>
                <Activity className="tuner-status-icon" />
                <span>{getStatusLabel()}</span>
              </div>
            </div>
          </div>

          <div className="tuner-scale-labels" aria-hidden="true">
            <span>-50</span>
            <span>0</span>
            <span>+50</span>
          </div>

          <div className="tuner-meta-row">
            <div className="tuner-meta-card">
              <span className="tuner-meta-label">Indicador</span>
              <strong className="tuner-meta-value">{getTuningIndicator()}</strong>
            </div>
            <div className="tuner-meta-card">
              <span className="tuner-meta-label">Desviación</span>
              <strong className="tuner-meta-value">{cents === null ? '--' : `${cents > 0 ? '+' : ''}${cents}`}</strong>
            </div>
          </div>
        </section>

        <aside className="tuner-side-panel">
          <article className="tuner-config-card">
            <div>
              <div className="tuner-panel-heading">
                <SlidersHorizontal className="tuner-panel-icon" />
                <span>Configuración</span>
              </div>
              <p className="tuner-panel-text">
                Activá el micrófono para iniciar la lectura en tiempo real y usar el afinador como referencia visual.
              </p>
            </div>

            <button
              onClick={() => setActive((prev) => !prev)}
              className={`tuner-button ${active ? 'on' : 'off'} tuner-action-button`}
            >
              {active ? <Mic className="ico-button" /> : <MicOff className="ico-button" />}
              <span>{active ? 'Apagar micrófono' : 'Encender micrófono'}</span>
            </button>
          </article>

          <article className="tuner-reference-card">
            <div className="tuner-panel-heading">
              <Music4 className="tuner-panel-icon" />
              <span>Notas de referencia</span>
            </div>
            <div className="tuner-reference-grid">
              {referenceNotes.map((referenceNote) => (
                <button key={referenceNote} type="button" className="tuner-reference-pill">
                  {referenceNote}
                </button>
              ))}
            </div>
          </article>
        </aside>
      </div>
    </div>
  );
};

export default Tuner;
