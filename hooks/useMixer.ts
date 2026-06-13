import { useCallback, useEffect, useRef, useState } from 'react';
import { MixerSoundState } from '../types';
import { MIX_SOUNDS, SOUND_BASE_PATH } from '../data';

const STORAGE_KEY = 'sonicvault-mix-v2';
const TICK_MS = 120;
const RANDOMNESS_AMOUNT = 0.38; // Schwankungstiefe wenn Randomness aktiv

interface LfoState {
  current: number;
  target: number;
  nextChangeAt: number;
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
    for (const [id, st] of Object.entries(parsed as Record<string, unknown>)) {
      const s = st as MixerSoundState | null;
      if (FILE_BY_ID[id] && s && typeof s.volume === 'number') {
        clean[id] = {
          volume: Math.min(1, Math.max(0, s.volume)),
          randomness: !!s.randomness,
        };
      }
    }
    return clean;
  } catch {
    return {};
  }
}

export function useMixer() {
  const [sounds, setSounds] = useState<Record<string, MixerSoundState>>(loadSaved);
  const [playing, setPlaying] = useState(false);

  const audioEls = useRef(new Map<string, HTMLAudioElement>());
  const lfo = useRef(new Map<string, LfoState>());
  const soundsRef = useRef(sounds);
  soundsRef.current = sounds;
  const playingRef = useRef(playing);
  playingRef.current = playing;

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sounds)); } catch { /* noop */ }
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

  // Randomness-LFO
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

        if (!st.randomness) {
          state.current = st.volume;
          state.target = st.volume;
        } else {
          if (now >= state.nextChangeAt) {
            const min = st.volume * (1 - RANDOMNESS_AMOUNT);
            state.target = min + Math.random() * (st.volume - min);
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
        if (el) { el.pause(); el.currentTime = 0; }
        lfo.current.delete(id);
        if (Object.keys(next).length === 0) setPlaying(false);
      } else {
        next[id] = { volume: 0.7, randomness: false };
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
    if (state) { state.current = volume; state.target = volume; state.nextChangeAt = 0; }
    if (el) el.volume = volume;
  }, []);

  const toggleRandomness = useCallback((id: string) => {
    setSounds(prev => {
      if (!prev[id]) return prev;
      const newVal = !prev[id].randomness;
      const state = lfo.current.get(id);
      if (state) state.nextChangeAt = 0;
      return { ...prev, [id]: { ...prev[id], randomness: newVal } };
    });
  }, []);

  // Setzt Randomness für alle aktiven Sounds gleichzeitig
  const setAllRandomness = useCallback((value: boolean) => {
    for (const state of lfo.current.values()) state.nextChangeAt = 0;
    setSounds(prev => {
      const next: Record<string, MixerSoundState> = {};
      for (const [id, st] of Object.entries(prev) as [string, MixerSoundState][]) {
        next[id] = { ...st, randomness: value };
      }
      return next;
    });
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
    for (const el of audioEls.current.values()) { el.pause(); el.currentTime = 0; }
    lfo.current.clear();
    setSounds({});
    setPlaying(false);
  }, []);

  return {
    sounds, playing,
    activeCount: Object.keys(sounds).length,
    toggle, setVolume, toggleRandomness, setAllRandomness,
    pause, resume, stopAll,
  };
}

export type Mixer = ReturnType<typeof useMixer>;
