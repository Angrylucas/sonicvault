import { useCallback, useEffect, useRef, useState } from 'react';
import { GuidedTrack } from '../types';
import { SOUND_BASE_PATH } from '../data';

/**
 * Globaler Player für geführte Tracks (Meditation & Atmung).
 * Hält das Audio-Element außerhalb der UI, damit z. B. der Atmung-Tab
 * den visuellen Indikator zur Abspielposition synchronisieren kann.
 */
export function useGuidedPlayer() {
  const [track, setTrack] = useState<GuidedTrack | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!track) return;
    const el = new Audio(SOUND_BASE_PATH + encodeURIComponent(track.filename));
    audioRef.current = el;
    setTime(0);
    setDuration(0);
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));

    const onMeta = () => setDuration(el.duration);
    const onEnd = () => setPlaying(false);
    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('ended', onEnd);

    // Feinere Auflösung als 'timeupdate' (~4 Hz), damit der
    // Atem-Indikator und der Countdown flüssig laufen.
    const iv = setInterval(() => setTime(el.currentTime), 100);

    return () => {
      el.pause();
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('ended', onEnd);
      clearInterval(iv);
      audioRef.current = null;
    };
  }, [track]);

  const select = useCallback((t: GuidedTrack) => {
    setTrack(prev => (prev?.id === t.id ? null : t));
  }, []);

  const close = useCallback(() => setTrack(null), []);

  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => undefined);
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }, []);

  const seek = useCallback((value: number) => {
    const el = audioRef.current;
    if (el && isFinite(el.duration)) {
      el.currentTime = value;
      setTime(value);
    }
  }, []);

  const skip = useCallback((delta: number) => {
    const el = audioRef.current;
    if (el) {
      const next = Math.min(Math.max(0, el.currentTime + delta), el.duration || 0);
      el.currentTime = next;
      setTime(next);
    }
  }, []);

  return { track, playing, time, duration, select, close, togglePlay, seek, skip };
}

export type GuidedPlayerState = ReturnType<typeof useGuidedPlayer>;
