'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export type Meter = '2/4' | '3/4' | '4/4' | '6/8';
export type Subdivision = 'quarter' | 'eighth' | 'triplet' | 'sixteenth';

export interface MetronomePreset {
  label: string;
  bpm: number;
  description: string;
}

interface MetronomeContextValue {
  bpm: number;
  meter: Meter;
  subdivision: Subdivision;
  volume: number;
  accentEnabled: boolean;
  isPlaying: boolean;
  activeBeat: number;
  beatsPerBar: number;
  subdivisionCount: number;
  setBpm: (bpm: number) => void;
  setMeter: (meter: Meter) => void;
  setSubdivision: (subdivision: Subdivision) => void;
  setVolume: (volume: number) => void;
  setAccentEnabled: (enabled: boolean) => void;
  start: () => Promise<void>;
  stop: () => void;
  toggle: () => Promise<void>;
  nudgeBpm: (amount: number) => void;
  registerTap: () => void;
  applyPreset: (preset: MetronomePreset) => void;
}

const STORAGE_KEY = 'guitarflow-metronome-settings';
const MIN_BPM = 40;
const MAX_BPM = 240;

const meterBeats: Record<Meter, number> = {
  '2/4': 2,
  '3/4': 3,
  '4/4': 4,
  '6/8': 6,
};

const subdivisionValues: Record<Subdivision, number> = {
  quarter: 1,
  eighth: 2,
  triplet: 3,
  sixteenth: 4,
};

const MetronomeContext = createContext<MetronomeContextValue | undefined>(undefined);

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function MetronomeProvider({ children }: { children: ReactNode }) {
  const [bpm, setBpmState] = useState(90);
  const [meter, setMeterState] = useState<Meter>('4/4');
  const [subdivision, setSubdivisionState] = useState<Subdivision>('quarter');
  const [volume, setVolumeState] = useState(0.65);
  const [accentEnabled, setAccentEnabledState] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeBeat, setActiveBeat] = useState(1);
  const [mounted, setMounted] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef(0);
  const stepRef = useRef(0);
  const tapTimesRef = useRef<number[]>([]);

  const bpmRef = useRef(bpm);
  const meterRef = useRef(meter);
  const subdivisionRef = useRef(subdivision);
  const volumeRef = useRef(volume);
  const accentEnabledRef = useRef(accentEnabled);

  useEffect(() => {
    const storedSettings = window.localStorage.getItem(STORAGE_KEY);
    if (storedSettings) {
      try {
        const parsed = JSON.parse(storedSettings) as Partial<{
          bpm: number;
          meter: Meter;
          subdivision: Subdivision;
          volume: number;
          accentEnabled: boolean;
        }>;

        if (typeof parsed.bpm === 'number') setBpmState(clamp(parsed.bpm, MIN_BPM, MAX_BPM));
        if (parsed.meter && parsed.meter in meterBeats) setMeterState(parsed.meter);
        if (parsed.subdivision && parsed.subdivision in subdivisionValues) setSubdivisionState(parsed.subdivision);
        if (typeof parsed.volume === 'number') setVolumeState(clamp(parsed.volume, 0, 1));
        if (typeof parsed.accentEnabled === 'boolean') setAccentEnabledState(parsed.accentEnabled);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    bpmRef.current = bpm;
    meterRef.current = meter;
    subdivisionRef.current = subdivision;
    volumeRef.current = volume;
    accentEnabledRef.current = accentEnabled;
  }, [accentEnabled, bpm, meter, subdivision, volume]);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ bpm, meter, subdivision, volume, accentEnabled }),
    );
  }, [accentEnabled, bpm, meter, mounted, subdivision, volume]);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  const scheduleClick = useCallback((time: number, step: number) => {
    const context = getAudioContext();
    const subdivisionCount = subdivisionValues[subdivisionRef.current];
    const beatsInBar = meterBeats[meterRef.current];
    const stepsPerBar = beatsInBar * subdivisionCount;
    const beatIndex = Math.floor((step % stepsPerBar) / subdivisionCount) + 1;
    const isBeat = step % subdivisionCount === 0;
    const isDownbeat = step % stepsPerBar === 0;
    const shouldAccent = accentEnabledRef.current && isDownbeat;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(shouldAccent ? 1480 : isBeat ? 980 : 720, time);
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(volumeRef.current * (shouldAccent ? 0.95 : isBeat ? 0.62 : 0.35), time + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.055);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(time);
    oscillator.stop(time + 0.06);

    window.setTimeout(() => {
      setActiveBeat(beatIndex);
    }, Math.max(0, (time - context.currentTime) * 1000));
  }, [getAudioContext]);

  const scheduler = useCallback(() => {
    const context = audioContextRef.current;
    if (!context) return;

    while (nextNoteTimeRef.current < context.currentTime + 0.1) {
      scheduleClick(nextNoteTimeRef.current, stepRef.current);
      const secondsPerBeat = 60 / bpmRef.current;
      nextNoteTimeRef.current += secondsPerBeat / subdivisionValues[subdivisionRef.current];
      stepRef.current += 1;
    }
  }, [scheduleClick]);

  const start = useCallback(async () => {
    const context = getAudioContext();
    if (context.state === 'suspended') {
      await context.resume();
    }

    if (intervalRef.current !== null) return;

    stepRef.current = 0;
    nextNoteTimeRef.current = context.currentTime + 0.05;
    setActiveBeat(1);
    setIsPlaying(true);
    intervalRef.current = window.setInterval(scheduler, 25);
  }, [getAudioContext, scheduler]);

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    stepRef.current = 0;
    setActiveBeat(1);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
      void audioContextRef.current?.close();
    };
  }, []);

  const setBpm = useCallback((nextBpm: number) => {
    setBpmState(clamp(Math.round(nextBpm), MIN_BPM, MAX_BPM));
  }, []);

  const setVolume = useCallback((nextVolume: number) => {
    setVolumeState(clamp(nextVolume, 0, 1));
  }, []);

  const setMeter = useCallback((nextMeter: Meter) => {
    setMeterState(nextMeter);
    stepRef.current = 0;
    setActiveBeat(1);
  }, []);

  const setSubdivision = useCallback((nextSubdivision: Subdivision) => {
    setSubdivisionState(nextSubdivision);
    stepRef.current = 0;
    setActiveBeat(1);
  }, []);

  const setAccentEnabled = useCallback((enabled: boolean) => {
    setAccentEnabledState(enabled);
  }, []);

  const toggle = useCallback(async () => {
    if (intervalRef.current !== null) {
      stop();
      return;
    }
    await start();
  }, [start, stop]);

  const nudgeBpm = useCallback((amount: number) => {
    setBpmState((currentBpm) => clamp(currentBpm + amount, MIN_BPM, MAX_BPM));
  }, []);

  const registerTap = useCallback(() => {
    const now = performance.now();
    const recentTaps = [...tapTimesRef.current.filter((tap) => now - tap < 2500), now].slice(-5);
    tapTimesRef.current = recentTaps;

    if (recentTaps.length < 2) return;

    const intervals = recentTaps.slice(1).map((tap, index) => tap - recentTaps[index]);
    const averageInterval = intervals.reduce((total, interval) => total + interval, 0) / intervals.length;
    setBpmState(clamp(Math.round(60000 / averageInterval), MIN_BPM, MAX_BPM));
  }, []);

  const applyPreset = useCallback((preset: MetronomePreset) => {
    setBpmState(clamp(preset.bpm, MIN_BPM, MAX_BPM));
  }, []);

  const value = useMemo<MetronomeContextValue>(
    () => ({
      bpm,
      meter,
      subdivision,
      volume,
      accentEnabled,
      isPlaying,
      activeBeat,
      beatsPerBar: meterBeats[meter],
      subdivisionCount: subdivisionValues[subdivision],
      setBpm,
      setMeter,
      setSubdivision,
      setVolume,
      setAccentEnabled,
      start,
      stop,
      toggle,
      nudgeBpm,
      registerTap,
      applyPreset,
    }),
    [
      accentEnabled,
      activeBeat,
      applyPreset,
      bpm,
      isPlaying,
      meter,
      nudgeBpm,
      registerTap,
      setAccentEnabled,
      setBpm,
      setMeter,
      setSubdivision,
      setVolume,
      start,
      stop,
      subdivision,
      toggle,
      volume,
    ],
  );

  return <MetronomeContext.Provider value={value}>{children}</MetronomeContext.Provider>;
}

export function useMetronome() {
  const context = useContext(MetronomeContext);
  if (!context) {
    throw new Error('useMetronome must be used within MetronomeProvider');
  }
  return context;
}
