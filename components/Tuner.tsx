'use client';
import { useEffect, useState, useRef } from "react";
import { useMicrophone } from "../hooks/useMicrophone";
import { Mic, MicOff } from 'lucide-react';

const Tuner = () => {
  const { stream, request } = useMicrophone();
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
      cents: centsOffset
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
    if (cents === null) return "-";
    if (cents < -10) return "♭";
    if (cents > 10) return "#";
    return "✓";
  };

  return (
    <div className="tuner-container">
      <h2 className="tuner-title">Afinador Online</h2>

      <div className="tuner-bar-container">
        <div className="tuner-bar">
          <div
            className="tuner-bar-indicator"
            style={{
              transform: `translateX(${cents ?? 0}px)`,
              backgroundColor:
                cents === null
                  ? '#d1d5db'
                  : Math.abs(cents) > 10
                    ? '#f87171'
                    : '#22c55e',
            }}
          />
        </div>
        <div className="tuner-bar-labels">
          <span>♭</span>
          <span>#</span>
        </div>
      </div>

      <p className="tuner-note">
        {note || "--"} <span className="tuner-indicator">{getTuningIndicator()}</span>
      </p>

      <div className="tuner-button-wrapper">
        <button
          onClick={() => setActive((prev) => !prev)}
          className={`tuner-button ${active ? 'on' : 'off'} flex items-center gap-2`}
        >
          {active ? <Mic className="ico-button" /> : <MicOff className="ico-button" />}
          {active ? 'Apagar micrófono' : 'Encender micrófono'}
        </button>
      </div>
    </div>
  );
};

export default Tuner;
