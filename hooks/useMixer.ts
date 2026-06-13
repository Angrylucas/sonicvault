import { useCallback, useEffect, useRef, useState } from 'react';
import { MixerSoundState, SavedSpace } from '../types';
import { MIX_SOUNDS, SOUND_BASE_PATH } from '../data';

const STORAGE_KEY = 'sonicvault-mix-v2';
const SPACES_KEY = 'sonicvault-spaces-v1';
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

function loadSpaces(): SavedSpace[] {
  try {
    const raw = localStorage.getItem(SPACES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedSpace[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(s => s && typeof s.name === 'string' && s.sounds)
      .map(s => {
        const clean: Record<string, MixerSoundState> = {};
        for (const [id, st] of Object.entries(s.sounds) as [string, MixerSoundState][]) {
          if (FILE_BY_ID[id] && typeof st?.volume === 'number') {
            clean[id] = { volume: Math.min(1, Math.max(0, st.volume)), randomness: !!st.randomness };
          }
        }
        return { id: s.id, name: s.name, sounds: clean };
      });
  } catch {
    return [];
  }
}

export function useMixer() {
  const [sounds, setSounds] = useState<Record<string, MixerSoundState>>(loadSaved);
  const [playing, setPlaying] = useState(false);
  const [savedSpaces, setSavedSpaces] = useState<SavedSpace[]>(loadSpaces);

  const audioEls = useRef(new Map<string, HTMLAudioElement>());
  const lfo = useRef(new Map<string, LfoState>());
  const soundsRef = useRef(sounds);
  soundsRef.current = sounds;
  const playingRef = useRef(playing);
  playingRef.current = playing;
  const spacesRef = useRef(savedSpaces);
  spacesRef.current = savedSpaces;

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sounds)); } catch { /* noop */ }
  }, [sounds]);

  useEffect(() => {
    try { localStorage.setItem(SPACES_KEY, JSON.stringify(savedSpaces)); } catch { /* noop */ }
  }, [savedSpaces]);

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

  // Aktuellen Mix unter einem Namen speichern
  const saveSpace = useCallback((name: string) => {
    const snapshot = soundsRef.current;
    if (Object.keys(snapshot).length === 0) return;
    const space: SavedSpace = {
      id: Date.now().toString(),
      name: name.trim() || 'Klangraum',
      sounds: JSON.parse(JSON.stringify(snapshot)),
    };
    setSavedSpaces(prev => [...prev, space]);
  }, []);

  // Gespeicherten Klangraum laden und sofort abspielen
  const loadSpace = useCallback((id: string) => {
    const space = spacesRef.current.find(s => s.id === id);
    if (!space) return;
    for (const el of audioEls.current.values()) { el.pause(); el.currentTime = 0; }
    lfo.current.clear();
    const next: Record<string, MixerSoundState> = JSON.parse(JSON.stringify(space.sounds));
    setSounds(next);
    for (const [sid, st] of Object.entries(next) as [string, MixerSoundState][]) {
      const el = ensureEl(sid);
      el.volume = st.volume;
      el.play().catch(() => undefined);
    }
    setPlaying(Object.keys(next).length > 0);
  }, [ensureEl]);

  const deleteSpace = useCallback((id: string) => {
    setSavedSpaces(prev => prev.filter(s => s.id !== id));
  }, []);

  return {
    sounds, playing, savedSpaces,
    activeCount: Object.keys(sounds).length,
    toggle, setVolume, toggleRandomness, setAllRandomness,
    pause, resume, stopAll,
    saveSpace, loadSpace, deleteSpace,
  };
}

export type Mixer = ReturnType<typeof useMixer>;
