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
  const [loading, setLoading] = useState(false);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!track) return;
    const el = new Audio(SOUND_BASE_PATH + encodeURIComponent(track.filename));
    audioRef.current = el;
    setDuration(0);
    setLoading(true);
    el.play().then(() => setPlaying(true)).catch(() => { setPlaying(false); setLoading(false); });

    const onMeta = () => setDuration(el.duration);
    const onEnd = () => setPlaying(false);
    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('ended', onEnd);

    const onReady = () => setLoading(false);
    const onWaiting = () => setLoading(true);
    el.addEventListener('playing', onReady);
    el.addEventListener('canplay', onReady);
    el.addEventListener('waiting', onWaiting);
    el.addEventListener('error', onReady);

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);

    return () => {
      el.pause();
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('ended', onEnd);
      el.removeEventListener('playing', onReady);
      el.removeEventListener('canplay', onReady);
      el.removeEventListener('waiting', onWaiting);
      el.removeEventListener('error', onReady);
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

  /** Blendet den Track aus und pausiert ihn (Sleep-Timer). */
  const fadeOutAndPause = useCallback((seconds: number) => {
    const el = audioRef.current;
    if (!el || el.paused) return;
    if (fadeRef.current) clearInterval(fadeRef.current);
    const steps = seconds * 4;
    let i = 0;
    const start = el.volume;
    fadeRef.current = setInterval(() => {
      i++;
      el.volume = Math.max(0, start * (1 - i / steps));
      if (i >= steps) {
        clearInterval(fadeRef.current!);
        fadeRef.current = null;
        el.pause();
        el.volume = 1;
      }
    }, 250);
  }, []);

  const getTime = useCallback(() => audioRef.current?.currentTime ?? 0, []);

  return { track, playing, loading, duration, fadeOutAndPause, select, close, togglePlay, seek, skip, getTime };
}

export type GuidedPlayerState = ReturnType<typeof useGuidedPlayer>;
