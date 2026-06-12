import { useCallback, useEffect, useRef, useState } from 'react';
import { MixerSoundState } from '../types';
import { MIX_SOUNDS, SOUND_BASE_PATH } from '../data';

const STORAGE_KEY = 'sonicvault-mix-v1';
const TICK_MS = 120;

interface LfoState {
  current: number;    // aktuell gesetzte Lautstärke (0..1)
  target: number;     // Ziel-Lautstärke, zu der gedriftet wird
  nextChangeAt: number; // Zeitstempel für das nächste Zufallsziel
}

const FILE_BY_ID: Record<string, string> = Object.fromEntries(
  MIX_SOUNDS.map(s => [s.id, s.filename])
);

function loadSaved(): Record<string, MixerSoundState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const clean: Record<string, MixerSoundState> = {};
    for (const [id, st] of Object.entries(parsed as Record<string, MixerSoundState>)) {
      if (FILE_BY_ID[id] && typeof st?.volume === 'number') {
        clean[id] = {
          volume: Math.min(1, Math.max(0, st.volume)),
          randomness: Math.min(1, Math.max(0, st.randomness ?? 0)),
        };
      }
    }
    return clean;
  } catch {
    return {};
  }
}

/**
 * Verwaltet den Ambient-Sound-Mixer: beliebig viele gleichzeitig laufende
 * Loops mit eigener Lautstärke und einem Randomness-Regler, der die
 * Lautstärke organisch um den eingestellten Wert schwanken lässt.
 */
export function useMixer() {
  const [sounds, setSounds] = useState<Record<string, MixerSoundState>>(loadSaved);
  const [playing, setPlaying] = useState(false);

  const audioEls = useRef(new Map<string, HTMLAudioElement>());
  const lfo = useRef(new Map<string, LfoState>());
  const soundsRef = useRef(sounds);
  soundsRef.current = sounds;
  const playingRef = useRef(playing);
  playingRef.current = playing;

  // Mix-Konfiguration speichern
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sounds));
    } catch {
      // localStorage nicht verfügbar – Mix wird nur für die Sitzung gehalten
    }
  }, [sounds]);

  const ensureEl = useCallback((id: string): HTMLAudioElement => {
    let el = audioEls.current.get(id);
    if (!el) {
      el = new Audio(SOUND_BASE_PATH + encodeURIComponent(FILE_BY_ID[id]));
      el.loop = true;
      el.preload = 'auto';
      audioEls.current.set(id, el);
    }
    return el;
  }, []);

  // Randomness-LFO: lässt jede Lautstärke sanft um den Basiswert wandern
  useEffect(() => {
    const interval = setInterval(() => {
      if (!playingRef.current) return;
      const now = Date.now();
      for (const [id, st] of Object.entries(soundsRef.current) as [string, MixerSoundState][]) {
        const el = audioEls.current.get(id);
        if (!el || el.paused) continue;

        let state = lfo.current.get(id);
        if (!state) {
          state = { current: st.volume, target: st.volume, nextChangeAt: 0 };
          lfo.current.set(id, state);
        }

        if (st.randomness <= 0.001) {
          state.current = st.volume;
          state.target = st.volume;
        } else {
          if (now >= state.nextChangeAt) {
            // Neues Zufallsziel zwischen (1 - randomness) * volume und volume
            const min = st.volume * (1 - st.randomness);
            state.target = min + Math.random() * (st.volume - min);
            // Alle 1,5–4,5 s ein neues Ziel
            state.nextChangeAt = now + 1500 + Math.random() * 3000;
          }
          state.current += (state.target - state.current) * 0.06;
        }
        el.volume = Math.min(1, Math.max(0, state.current));
      }
    }, TICK_MS);
    return () => clearInterval(interval);
  }, []);

  const toggle = useCallback((id: string) => {
    setSounds(prev => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
        const el = audioEls.current.get(id);
        if (el) {
          el.pause();
          el.currentTime = 0;
        }
        lfo.current.delete(id);
        if (Object.keys(next).length === 0) setPlaying(false);
      } else {
        next[id] = { volume: 0.7, randomness: 0 };
        const el = ensureEl(id);
        el.volume = 0.7;
        el.play().catch(() => undefined);
        setPlaying(true);
      }
      return next;
    });
  }, [ensureEl]);

  const setVolume = useCallback((id: string, volume: number) => {
    setSounds(prev => (prev[id] ? { ...prev, [id]: { ...prev[id], volume } } : prev));
    const el = audioEls.current.get(id);
    const state = lfo.current.get(id);
    if (state) {
      state.current = volume;
      state.target = volume;
      state.nextChangeAt = 0;
    }
    if (el) el.volume = volume;
  }, []);

  const setRandomness = useCallback((id: string, randomness: number) => {
    setSounds(prev => (prev[id] ? { ...prev, [id]: { ...prev[id], randomness } } : prev));
    const state = lfo.current.get(id);
    if (state) state.nextChangeAt = 0;
  }, []);

  const pause = useCallback(() => {
    for (const el of audioEls.current.values()) el.pause();
    setPlaying(false);
  }, []);

  const resume = useCallback(() => {
    const active = soundsRef.current;
    if (Object.keys(active).length === 0) return;
    for (const [id, st] of Object.entries(active) as [string, MixerSoundState][]) {
      const el = ensureEl(id);
      el.volume = st.volume;
      el.play().catch(() => undefined);
    }
    setPlaying(true);
  }, [ensureEl]);

  const stopAll = useCallback(() => {
    for (const el of audioEls.current.values()) {
      el.pause();
      el.currentTime = 0;
    }
    lfo.current.clear();
    setSounds({});
    setPlaying(false);
  }, []);

  const activeCount = Object.keys(sounds).length;

  return { sounds, playing, activeCount, toggle, setVolume, setRandomness, pause, resume, stopAll };
}

export type Mixer = ReturnType<typeof useMixer>;
