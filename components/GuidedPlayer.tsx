import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, X, RotateCcw, RotateCw } from 'lucide-react';
import { GuidedTrack } from '../types';
import { SOUND_BASE_PATH } from '../data';

interface Props {
  track: GuidedTrack;
  onClose: () => void;
}

function fmt(sec: number): string {
  if (!isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** Fixierter Mini-Player am unteren Rand für geführte Tracks. */
export const GuidedPlayer: React.FC<Props> = ({ track, onClose }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const el = new Audio(SOUND_BASE_PATH + encodeURIComponent(track.filename));
    audioRef.current = el;
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));

    const onTime = () => setTime(el.currentTime);
    const onMeta = () => setDuration(el.duration);
    const onEnd = () => setPlaying(false);
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('ended', onEnd);
    return () => {
      el.pause();
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('ended', onEnd);
      audioRef.current = null;
    };
  }, [track]);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => undefined);
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const seek = (value: number) => {
    const el = audioRef.current;
    if (el && isFinite(el.duration)) {
      el.currentTime = value;
      setTime(value);
    }
  };

  const skip = (delta: number) => {
    const el = audioRef.current;
    if (el) seek(Math.min(Math.max(0, el.currentTime + delta), el.duration || 0));
  };

  const progress = duration > 0 ? (time / duration) * 100 : 0;

  return (
    <div className="fixed bottom-16 md:bottom-0 inset-x-0 z-40 fade-up">
      <div className="mx-auto max-w-3xl px-3 pb-2 md:pb-4">
        <div className="bg-night-850/95 backdrop-blur-xl border border-night-700 rounded-2xl shadow-2xl px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : 'Abspielen'}
              className="w-11 h-11 shrink-0 rounded-full bg-accent-400 hover:bg-accent-300 text-night-950 flex items-center justify-center transition-colors"
            >
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <div className="min-w-0 flex-grow">
              <p className="text-sm font-semibold text-slate-100 truncate">{track.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] text-slate-400 tabular-nums w-9">{fmt(time)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 1}
                  step={0.1}
                  value={time}
                  onChange={e => seek(Number(e.target.value))}
                  style={{ '--fill': `${progress}%` } as React.CSSProperties}
                  aria-label="Fortschritt"
                />
                <span className="text-[11px] text-slate-400 tabular-nums w-9 text-right">{fmt(duration)}</span>
              </div>
            </div>
            <button onClick={() => skip(-15)} aria-label="15 Sekunden zurück" className="hidden sm:flex p-2 text-slate-400 hover:text-white transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button onClick={() => skip(15)} aria-label="15 Sekunden vor" className="hidden sm:flex p-2 text-slate-400 hover:text-white transition-colors">
              <RotateCw className="w-4 h-4" />
            </button>
            <button onClick={onClose} aria-label="Player schließen" className="p-2 text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
