import { useCallback, useEffect, useRef, useState } from 'react';
import { MixerSoundState, SavedSpace } from '../types';
import { MIX_SOUNDS, SOUND_BASE_PATH } from '../data';

const STORAGE_KEY = 'sonicvault-mix-v2';
const SPACES_KEY = 'sonicvault-spaces-v1';
const TICK_MS = 150;
const RANDOMNESS_AMOUNT = 0.38;

interface LfoState {
  target: number;
  nextChangeAt: number;
}

interface ActiveNode {
  source: AudioBufferSourceNode;
  gain: GainNode;
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

  // Web Audio API refs — AudioBufferSourceNode gives zero-gap looping
  const ctxRef = useRef<AudioContext | null>(null);
  const bufferCache = useRef(new Map<string, AudioBuffer>());
  const activeNodes = useRef(new Map<string, ActiveNode>());
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

  const getCtx = useCallback((): AudioContext => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const fetchBuffer = useCallback(async (id: string): Promise<AudioBuffer | null> => {
    const cached = bufferCache.current.get(id);
    if (cached) return cached;
    try {
      const url = SOUND_BASE_PATH + encodeURIComponent(FILE_BY_ID[id]);
      const res = await fetch(url);
      const arr = await res.arrayBuffer();
      const ctx = getCtx();
      const buf = await ctx.decodeAudioData(arr);
      bufferCache.current.set(id, buf);
      return buf;
    } catch {
      return null;
    }
  }, [getCtx]);

  const spawnNode = useCallback((id: string, buffer: AudioBuffer, volume: number): ActiveNode => {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.connect(ctx.destination);

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(gain);
    source.start(0);

    return { source, gain };
  }, [getCtx]);

  const killNode = useCallback((id: string) => {
    const node = activeNodes.current.get(id);
    if (!node) return;
    try { node.source.stop(); } catch { /* already ended */ }
    node.source.disconnect();
    node.gain.disconnect();
    activeNodes.current.delete(id);
  }, []);

  // LFO tick — uses AudioParam.setTargetAtTime for smooth, click-free ramping
  useEffect(() => {
    const interval = setInterval(() => {
      if (!playingRef.current) return;
      const ctx = ctxRef.current;
      if (!ctx || ctx.state !== 'running') return;
      const now = Date.now();

      for (const [id, st] of Object.entries(soundsRef.current) as [string, MixerSoundState][]) {
        const node = activeNodes.current.get(id);
        if (!node) continue;

        if (!st.randomness) {
          // Snap back to base volume smoothly
          node.gain.gain.setTargetAtTime(st.volume, ctx.currentTime, 0.1);
          lfo.current.delete(id);
          continue;
        }

        let state = lfo.current.get(id);
        if (!state) {
          state = { target: st.volume, nextChangeAt: 0 };
          lfo.current.set(id, state);
        }

        if (now >= state.nextChangeAt) {
          const min = st.volume * (1 - RANDOMNESS_AMOUNT);
          state.target = min + Math.random() * (st.volume - min);
          state.nextChangeAt = now + 1500 + Math.random() * 3000;
          // Exponential ramp to target over ~0.5s — inaudible click-free
          node.gain.gain.setTargetAtTime(state.target, ctx.currentTime, 0.4);
        }
      }
    }, TICK_MS);
    return () => clearInterval(interval);
  }, []);

  const toggle = useCallback((id: string) => {
    setSounds(prev => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
        killNode(id);
        lfo.current.delete(id);
        if (Object.keys(next).length === 0) setPlaying(false);
      } else {
        next[id] = { volume: 0.7, randomness: false };
        fetchBuffer(id).then(buf => {
          if (!buf || !soundsRef.current[id]) return;
          const node = spawnNode(id, buf, soundsRef.current[id].volume);
          activeNodes.current.set(id, node);
        });
        setPlaying(true);
      }
      return next;
    });
  }, [killNode, fetchBuffer, spawnNode]);

  const setVolume = useCallback((id: string, volume: number) => {
    setSounds(prev => (prev[id] ? { ...prev, [id]: { ...prev[id], volume } } : prev));
    const node = activeNodes.current.get(id);
    const state = lfo.current.get(id);
    if (state) { state.target = volume; state.nextChangeAt = 0; }
    if (node && ctxRef.current) {
      node.gain.gain.setTargetAtTime(volume, ctxRef.current.currentTime, 0.05);
    }
  }, []);

  const toggleRandomness = useCallback((id: string) => {
    setSounds(prev => {
      if (!prev[id]) return prev;
      const state = lfo.current.get(id);
      if (state) state.nextChangeAt = 0;
      return { ...prev, [id]: { ...prev[id], randomness: !prev[id].randomness } };
    });
  }, []);

  const setAllRandomness = useCallback((value: boolean) => {
    for (const state of lfo.current.values()) state.nextChangeAt = 0;
    if (!value) lfo.current.clear();
    setSounds(prev => {
      const next: Record<string, MixerSoundState> = {};
      for (const [id, st] of Object.entries(prev) as [string, MixerSoundState][]) {
        next[id] = { ...st, randomness: value };
      }
      return next;
    });
  }, []);

  // Pause: suspend the AudioContext — all sources freeze in place, no gap on resume
  const pause = useCallback(() => {
    ctxRef.current?.suspend();
    setPlaying(false);
  }, []);

  // Resume: unsuspend OR spawn fresh nodes if context was closed/missing
  const resume = useCallback(async () => {
    const active = soundsRef.current;
    if (Object.keys(active).length === 0) return;
    const ctx = getCtx();
    if (ctx.state === 'suspended') {
      await ctx.resume();
      setPlaying(true);
      return;
    }
    // Nodes missing (e.g. after stopAll then re-play)
    for (const [id, st] of Object.entries(active) as [string, MixerSoundState][]) {
      if (activeNodes.current.has(id)) continue;
      const buf = bufferCache.current.get(id);
      if (buf) {
        activeNodes.current.set(id, spawnNode(id, buf, st.volume));
      } else {
        fetchBuffer(id).then(b => {
          if (!b || !soundsRef.current[id]) return;
          activeNodes.current.set(id, spawnNode(id, b, soundsRef.current[id].volume));
        });
      }
    }
    setPlaying(true);
  }, [getCtx, spawnNode, fetchBuffer]);

  const stopAll = useCallback(() => {
    for (const id of activeNodes.current.keys()) killNode(id);
    lfo.current.clear();
    setSounds({});
    setPlaying(false);
  }, [killNode]);

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

  const loadSpace = useCallback((id: string) => {
    const space = spacesRef.current.find(s => s.id === id);
    if (!space) return;
    for (const nid of activeNodes.current.keys()) killNode(nid);
    lfo.current.clear();
    const next: Record<string, MixerSoundState> = JSON.parse(JSON.stringify(space.sounds));
    setSounds(next);
    for (const [sid, st] of Object.entries(next) as [string, MixerSoundState][]) {
      const buf = bufferCache.current.get(sid);
      if (buf) {
        activeNodes.current.set(sid, spawnNode(sid, buf, st.volume));
      } else {
        fetchBuffer(sid).then(b => {
          if (!b || !soundsRef.current[sid]) return;
          activeNodes.current.set(sid, spawnNode(sid, b, soundsRef.current[sid].volume));
        });
      }
    }
    setPlaying(Object.keys(next).length > 0);
  }, [killNode, spawnNode, fetchBuffer]);

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
