'use client';

import Link from 'next/link';
import { Gauge, Minus, Music2, Pause, Play, Plus } from 'lucide-react';
import { useMetronome } from '@/contexts/MetronomeContext';

export default function GlobalMetronomePlayer() {
  const { bpm, isPlaying, activeBeat, beatsPerBar, toggle, nudgeBpm } = useMetronome();

  return (
    <aside className={`global-metronome-player ${isPlaying ? 'is-playing' : ''}`} aria-label="Metrónomo global">
      <button
        type="button"
        className="global-metronome-play"
        onClick={() => void toggle()}
        aria-label={isPlaying ? 'Pausar metrónomo' : 'Iniciar metrónomo'}
      >
        {isPlaying ? <Pause /> : <Play />}
      </button>

      <div className="global-metronome-info">
        <span className="global-metronome-label">
          <Music2 />
          Metrónomo
        </span>
        <strong>{bpm} BPM</strong>
      </div>

      <div className="global-metronome-beats" aria-label={`Pulso ${activeBeat} de ${beatsPerBar}`}>
        {Array.from({ length: beatsPerBar }, (_, index) => (
          <span key={index} className={activeBeat === index + 1 && isPlaying ? 'is-active' : ''} />
        ))}
      </div>

      <div className="global-metronome-actions">
        <button type="button" onClick={() => nudgeBpm(-5)} aria-label="Bajar 5 BPM">
          <Minus />
        </button>
        <button type="button" onClick={() => nudgeBpm(5)} aria-label="Subir 5 BPM">
          <Plus />
        </button>
        <Link href="/metronome" aria-label="Abrir metrónomo completo">
          <Gauge />
        </Link>
      </div>
    </aside>
  );
}
