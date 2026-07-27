'use client';

import Link from 'next/link';
import { ArrowRight, Minus, Pause, Play, Plus, Volume2 } from 'lucide-react';
import { useMetronome, type Meter, type MetronomePreset, type Subdivision } from '@/contexts/MetronomeContext';

const meterOptions: Meter[] = ['4/4', '3/4', '2/4', '6/8'];

const subdivisionOptions: Array<{ value: Subdivision; label: string }> = [
  { value: 'quarter', label: 'Negras' },
  { value: 'eighth', label: 'Corcheas' },
  { value: 'triplet', label: 'Tresillos' },
  { value: 'sixteenth', label: 'Semicorcheas' },
];

const presets: MetronomePreset[] = [
  { label: 'Técnica lenta', bpm: 60, description: 'Para limpiar movimiento y escuchar cada nota.' },
  { label: 'Pulso medio', bpm: 90, description: 'Tempo cómodo para riffs, cambios y fraseo.' },
  { label: 'Rock ajustado', bpm: 120, description: 'Control rítmico con más empuje.' },
  { label: 'Control de velocidad', bpm: 150, description: 'Velocidad medida sin perder precisión.' },
];

export default function MetronomeWorkbench() {
  const {
    bpm,
    meter,
    subdivision,
    volume,
    accentEnabled,
    isPlaying,
    activeBeat,
    beatsPerBar,
    setBpm,
    setMeter,
    setSubdivision,
    setVolume,
    setAccentEnabled,
    toggle,
    nudgeBpm,
    registerTap,
    applyPreset,
  } = useMetronome();

  return (
    <div className="metronome-workbench">
      <section className="metronome-stage">
        <div className="metronome-readout">
          <span className="section-kicker">REPRODUCTOR DE PULSO</span>
          <div className="metronome-bpm-display">
            <strong>{bpm}</strong>
            <span>BPM</span>
          </div>
          <p>
            Un metrónomo persistente para estudiar con pulso y seguir navegando por el mástil, triadas o progresiones
            sin que se corte.
          </p>
        </div>

        <div className="metronome-transport">
          <button
            type="button"
            className="metronome-main-play"
            onClick={() => void toggle()}
            aria-label={isPlaying ? 'Pausar metrónomo' : 'Iniciar metrónomo'}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>

          <div className="metronome-beat-ring" aria-label={`Pulso ${activeBeat} de ${beatsPerBar}`}>
            {Array.from({ length: beatsPerBar }, (_, index) => (
              <span key={index} className={activeBeat === index + 1 && isPlaying ? 'is-active' : ''}>
                {index + 1}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="metronome-controls-grid">
        <article className="metronome-panel">
          <label htmlFor="metronome-bpm">Tempo</label>
          <div className="metronome-stepper">
            <button type="button" onClick={() => nudgeBpm(-5)} aria-label="Bajar 5 BPM">
              <Minus />
            </button>
            <input
              id="metronome-bpm"
              type="number"
              min={40}
              max={240}
              value={bpm}
              onChange={(event) => setBpm(Number(event.target.value))}
            />
            <button type="button" onClick={() => nudgeBpm(5)} aria-label="Subir 5 BPM">
              <Plus />
            </button>
          </div>
          <input
            aria-label="Tempo en BPM"
            type="range"
            min={40}
            max={240}
            value={bpm}
            onChange={(event) => setBpm(Number(event.target.value))}
            className="metronome-range"
          />
          <button type="button" className="metronome-tap-button" onClick={registerTap}>
            Tap tempo
          </button>
        </article>

        <article className="metronome-panel">
          <label htmlFor="metronome-meter">Compás</label>
          <select id="metronome-meter" value={meter} onChange={(event) => setMeter(event.target.value as Meter)}>
            {meterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label htmlFor="metronome-subdivision">Subdivisión</label>
          <select
            id="metronome-subdivision"
            value={subdivision}
            onChange={(event) => setSubdivision(event.target.value as Subdivision)}
          >
            {subdivisionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </article>

        <article className="metronome-panel">
          <div className="metronome-toggle-row">
            <div>
              <span>Acento</span>
              <p>Marca el primer tiempo del compás.</p>
            </div>
            <label className="metronome-switch">
              <input
                type="checkbox"
                checked={accentEnabled}
                onChange={(event) => setAccentEnabled(event.target.checked)}
              />
              <span />
            </label>
          </div>

          <label htmlFor="metronome-volume" className="metronome-volume-label">
            <Volume2 />
            Volumen
          </label>
          <input
            id="metronome-volume"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="metronome-range"
          />
        </article>
      </section>

      <section className="platform-section">
        <div className="platform-section-header">
          <div>
            <span className="section-kicker">ATAJOS</span>
            <h2 className="platform-section-title">Puntos de partida</h2>
          </div>
          <p className="platform-section-text">
            Elegí un tempo base y ajustalo desde el reproductor global mientras practicás.
          </p>
        </div>

        <div className="metronome-preset-grid">
          {presets.map((preset) => (
            <button key={preset.label} type="button" className="metronome-preset-card" onClick={() => applyPreset(preset)}>
              <span>{preset.bpm} BPM</span>
              <strong>{preset.label}</strong>
              <small>{preset.description}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="metronome-links">
        <Link href="/practice" className="platform-button secondary">
          Ir a Práctica
        </Link>
        <Link href="/learn/metronome-practice" className="platform-button primary">
          <span>Lección de metrónomo</span>
          <ArrowRight className="platform-button-icon" />
        </Link>
      </section>
    </div>
  );
}
