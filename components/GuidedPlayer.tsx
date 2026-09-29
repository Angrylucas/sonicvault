import React, { useEffect, useState } from 'react';
import { Play, Pause, X, RotateCcw, RotateCw } from 'lucide-react';
import { GuidedPlayerState } from '../hooks/useGuidedPlayer';

function fmt(sec: number): string {
  if (!isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** Schwebender Mini-Player für geführte Tracks. Die Zeit tickt nur hier, nicht in der App. */
export const GuidedPlayer: React.FC<{ player: GuidedPlayerState }> = ({ player }) => {
  const { track, playing, duration, close, togglePlay, seek, skip, getTime } = player;
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTime(0);
  }, [track?.id]);

  useEffect(() => {
    if (!track || !playing) return;
    setTime(getTime());
    const iv = setInterval(() => setTime(getTime()), 250);
    return () => clearInterval(iv);
  }, [track, playing, getTime]);

  if (!track) return null;

  const progress = duration > 0 ? (time / duration) * 100 : 0;

  return (
    <section
      aria-label="Player"
      className="fixed inset-x-0 z-40 fade-up bottom-[var(--nav-h)] md:bottom-0"
    >
      <div className="mx-auto max-w-3xl px-3 pb-2 md:pb-4">
        <div
          className="player-grid rounded-2xl px-4 py-3"
          style={{ background: 'var(--surface)', boxShadow: '0 14px 32px var(--shadow)' }}
        >
          <button
            onClick={togglePlay}
            aria-label={playing ? 'Pause' : 'Abspielen'}
            className="player-play w-11 h-11 shrink-0 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            {playing ? <Pause className="w-5 h-5" aria-hidden="true" /> : <Play className="w-5 h-5 ml-0.5" aria-hidden="true" />}
          </button>

          <p className="player-title text-sm font-bold truncate" style={{ color: 'var(--text)' }}>{track.title}</p>

          <button
            onClick={() => { skip(-15); setTime(getTime()); }}
            aria-label="15 Sekunden zurück"
            className="player-skipb hit w-10 h-10 flex items-center justify-center rounded-full"
            style={{ color: 'var(--text-muted)' }}
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            onClick={() => { skip(15); setTime(getTime()); }}
            aria-label="15 Sekunden vor"
            className="player-skipf hit w-10 h-10 flex items-center justify-center rounded-full"
            style={{ color: 'var(--text-muted)' }}
          >
            <RotateCw className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            onClick={close}
            aria-label="Player schließen"
            className="player-close hit w-10 h-10 flex items-center justify-center rounded-full"
            style={{ color: 'var(--text-muted)' }}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="player-prog flex items-center gap-2">
            <span className="text-[11px] font-semibold tabular-nums w-9" style={{ color: 'var(--text-muted)' }}>{fmt(time)}</span>
            <input
              type="range"
              min={0}
              max={duration || 1}
              step={0.1}
              value={time}
              onChange={e => { const v = Number(e.target.value); seek(v); setTime(v); }}
              style={{ '--fill': `${progress}%` } as React.CSSProperties}
              aria-label="Fortschritt"
              aria-valuetext={`${fmt(time)} von ${fmt(duration)}`}
            />
            <span className="text-[11px] font-semibold tabular-nums w-9 text-right" style={{ color: 'var(--text-muted)' }}>{fmt(duration)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
