import { useCallback, useEffect, useRef, useState } from 'react';
import { GuidedTrack } from '../types';
import { SOUND_BASE_PATH } from '../data';

/**
 * Globaler Player für geführte Tracks (Meditation & Atmung).
 * Hält das Audio-Element außerhalb der UI. Die Abspielposition steckt bewusst
 * NICHT im State: sie tickt mehrmals pro Sekunde und würde sonst die ganze App
 * neu rendern. Der Player liest sie selbst über `getTime()`.
 */
export function useGuidedPlayer() {
  const [track, setTrack] = useState<GuidedTrack | null>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!track) return;
    const el = new Audio(SOUND_BASE_PATH + encodeURIComponent(track.filename));
    audioRef.current = el;
    setDuration(0);
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));

    const onMeta = () => setDuration(el.duration);
    const onEnd = () => setPlaying(false);
    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('ended', onEnd);

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);

    return () => {
      el.pause();
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('ended', onEnd);
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
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
    }
  }, []);

  const skip = useCallback((delta: number) => {
    const el = audioRef.current;
    if (el) {
      const next = Math.min(Math.max(0, el.currentTime + delta), el.duration || 0);
      el.currentTime = next;
    }
  }, []);

  const getTime = useCallback(() => audioRef.current?.currentTime ?? 0, []);

  return { track, playing, duration, select, close, togglePlay, seek, skip, getTime };
}

export type GuidedPlayerState = ReturnType<typeof useGuidedPlayer>;
