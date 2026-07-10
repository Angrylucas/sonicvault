import { useCallback, useEffect, useRef, useState } from 'react';
import { SOUND_BASE_PATH } from '../data';
import { BreathPhase } from '../types';

const CUE_BASE = SOUND_BASE_PATH + 'breathing-cues/';
const STORAGE_KEY = 'sonicvault-breathing-voice';

export type BreathingVoiceId = 'laura' | 'paul' | 'bell' | 'off';

export const BREATHING_VOICES: { id: BreathingVoiceId; label: string }[] = [
  { id: 'laura', label: 'Laura' },
  { id: 'paul', label: 'Paul' },
  { id: 'bell', label: 'Glocke' },
  { id: 'off', label: 'Aus' },
];

/** Audio-Cue-Dateien pro Stimme und Atemphase (aus Breathly übernommen). */
const CUE_FILES: Record<Exclude<BreathingVoiceId, 'off'>, Record<BreathPhase['kind'], string>> = {
  laura: { in: 'laurainhale.mp3', hold: 'laurahold.mp3', out: 'lauraexhale.mp3' },
  paul:  { in: 'paulinhale.mp3',  hold: 'paulhold.mp3',  out: 'paulexhale.mp3' },
  bell:  { in: 'cuebell1.mp3',    hold: 'cuebell2.mp3',  out: 'cuebell1.mp3' },
};

function loadVoice(): BreathingVoiceId {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'laura' || raw === 'paul' || raw === 'bell' || raw === 'off') return raw;
  } catch { /* noop */ }
  return 'bell';
}

/** Spielt pro Atemphase (Einatmen/Halten/Ausatmen) eine passende Sprach- oder Glocken-Ansage. */
export function useBreathingVoice() {
  const [voice, setVoice] = useState<BreathingVoiceId>(loadVoice);
  const cache = useRef(new Map<string, HTMLAudioElement>());

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, voice); } catch { /* noop */ }
  }, [voice]);

  const playCue = useCallback((kind: BreathPhase['kind']) => {
    if (voice === 'off') return;
    const filename = CUE_FILES[voice][kind];
    let el = cache.current.get(filename);
    if (!el) {
      el = new Audio(CUE_BASE + encodeURIComponent(filename));
      cache.current.set(filename, el);
    }
    el.currentTime = 0;
    el.play().catch(() => undefined);
  }, [voice]);

  return { voice, setVoice, playCue };
}
