import React, { useMemo } from 'react';
import { Clock, Pause, Play } from 'lucide-react';
import { GuidedTrack } from '../types';
import { BREATHING_TRACKS } from '../data';
import { GuidedPlayerState } from '../hooks/useGuidedPlayer';

interface Props {
  player: GuidedPlayerState;
  query: string;
}

type DurationGroup = '3 Minuten' | '5 Minuten' | '10 Minuten' | 'Längere Übungen';

type BreathArtKind = 'space' | 'waves' | 'stress' | 'eight' | 'star' | 'box' | 'deep' | 'long';

const DURATION_GROUPS: DurationGroup[] = ['3 Minuten', '5 Minuten', '10 Minuten', 'Längere Übungen'];

const parseDurationMinutes = (duration: string) => {
  const [minutes = '0', seconds = '0'] = duration.split(':');
  return Number(minutes) + Number(seconds) / 60;
};

const getDurationGroup = (track: GuidedTrack): DurationGroup => {
  const minutes = parseDurationMinutes(track.duration);
  if (minutes < 4) return '3 Minuten';
  if (minutes < 8) return '5 Minuten';
  if (minutes < 12) return '10 Minuten';
  return 'Längere Übungen';
};

const getArtKind = (track: GuidedTrack): BreathArtKind => {
  const text = `${track.id} ${track.title}`.toLowerCase();
  if (text.includes('space')) return 'space';
  if (text.includes('stress') || text.includes('compassionate')) return 'stress';
  if (text.includes('lazy-eight')) return 'eight';
  if (text.includes('star')) return 'star';
  if (text.includes('box')) return 'box';
  if (text.includes('deep')) return 'deep';
  if (parseDurationMinutes(track.duration) >= 12) return 'long';
  return 'waves';
};

const BreathingArt: React.FC<{ kind: BreathArtKind }> = ({ kind }) => {
  const common = (
    <>
      <path d="M7 57c8-15 20-15 31-25 13-13 16-24 37-23 24 1 32 20 31 45v20H0V59Z" fill="#fff" opacity="0.08" />
      <circle cx="66" cy="38" r="31" fill="#7cd6ab" opacity="0.18" />
      <circle cx="91" cy="17" r="7" fill="#dce4ff" opacity="0.75" />
      <circle cx="25" cy="18" r="1.2" fill="#fff" opacity="0.55" />
      <circle cx="39" cy="28" r="0.9" fill="#fff" opacity="0.4" />
      <circle cx="78" cy="15" r="1" fill="#fff" opacity="0.45" />
    </>
  );

  return (
    <svg viewBox="0 0 112 76" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {common}
      {kind === 'space' && (
        <>
          <circle cx="56" cy="40" r="20" fill="none" stroke="#c3e6d2" strokeWidth="1.5" opacity="0.55" />
          <circle cx="56" cy="40" r="12" fill="none" stroke="#b3a4ea" strokeWidth="1.4" opacity="0.55" />
          <circle cx="56" cy="40" r="5" fill="#d8f0e3" />
          <path d="M34 60c12 4 32 4 44 0" stroke="#7cd6ab" strokeWidth="2" strokeLinecap="round" opacity="0.45" fill="none" />
        </>
      )}
      {kind === 'waves' && (
        <>
          <path d="M18 44q12-12 24 0t24 0 24 0" stroke="#d8f0e3" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.78" />
          <path d="M24 55q10-8 20 0t20 0 20 0" stroke="#b3a4ea" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.5" />
          <circle cx="56" cy="35" r="8" fill="#7cd6ab" opacity="0.8" />
        </>
      )}
      {kind === 'stress' && (
        <>
          <path d="M56 52c-15-9-18-24-7-25 5 0 7 3 7 7 0-4 3-7 8-7 11 1 8 16-8 25Z" fill="#c7b8f5" />
          <path d="M30 61c8-8 17-10 26-5 9-5 18-3 26 5-8 5-18 6-26 2-8 4-18 3-26-2Z" fill="#7cd6ab" opacity="0.48" />
        </>
      )}
      {kind === 'eight' && (
        <>
          <path d="M32 42c11-18 27-18 35 0 8 18 24 18 35 0" stroke="#c3e6d2" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.82" />
          <path d="M32 42c11 18 27 18 35 0 8-18 24-18 35 0" stroke="#b3a4ea" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.58" />
          <circle cx="56" cy="42" r="4" fill="#d8f0e3" />
        </>
      )}
      {kind === 'star' && (
        <>
          <path d="M56 21l6 14 15 1-11 10 4 15-14-8-14 8 4-15-11-10 15-1Z" fill="#c7b8f5" opacity="0.86" />
          <path d="M56 30l3 8 9 1-7 6 3 8-8-5-8 5 3-8-7-6 9-1Z" fill="#d8f0e3" opacity="0.76" />
        </>
      )}
      {kind === 'box' && (
        <>
          <rect x="35" y="25" width="42" height="32" rx="7" fill="none" stroke="#c3e6d2" strokeWidth="3" opacity="0.78" />
          <circle cx="35" cy="25" r="4" fill="#7cd6ab" />
          <circle cx="77" cy="25" r="4" fill="#b3a4ea" />
          <circle cx="77" cy="57" r="4" fill="#7cd6ab" />
          <circle cx="35" cy="57" r="4" fill="#b3a4ea" />
        </>
      )}
      {kind === 'deep' && (
        <>
          <path d="M56 60V36" stroke="#7cd6ab" strokeWidth="3" strokeLinecap="round" />
          <path d="M56 43c-14-5-17-16-6-20 6 5 8 12 6 20Z" fill="#c3e6d2" />
          <path d="M56 43c14-5 17-16 6-20-6 5-8 12-6 20Z" fill="#7cd6ab" />
          <circle cx="56" cy="39" r="18" fill="none" stroke="#d8f0e3" opacity="0.36" />
        </>
      )}
      {kind === 'long' && (
        <>
          <path d="M20 58 38 36l13 13 12-18 24 27Z" fill="#405b73" opacity="0.92" />
          <path d="M38 36 51 49l12-18 8 12-22 15H20Z" fill="#5f7d94" opacity="0.74" />
          <path d="M35 26c10-7 24-9 42-5" stroke="#d8f0e3" strokeWidth="1.8" strokeLinecap="round" opacity="0.58" fill="none" />
        </>
      )}
    </svg>
  );
};

const BreathingCard: React.FC<{
  track: GuidedTrack;
  currentId?: string;
  onSelect: (track: GuidedTrack) => void;
}> = ({ track, currentId, onSelect }) => {
  const active = track.id === currentId;
  const kind = getArtKind(track);

  return (
    <button
      onClick={() => onSelect(track)}
      className="text-left rounded-2xl overflow-hidden transition-transform hover:-translate-y-0.5"
      style={{
        background: 'var(--surface)',
        boxShadow: active ? '0 14px 28px -10px var(--shadow)' : '0 10px 24px -12px var(--shadow)',
        outline: active ? '2px solid var(--accent)' : 'none',
        outlineOffset: active ? '-2px' : undefined,
      }}
    >
      <div className="h-28" style={{ background: 'linear-gradient(160deg,#405b73,#242631 74%)' }}>
        <BreathingArt kind={kind} />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <span className="text-sm font-extrabold leading-snug line-clamp-2" style={{ color: 'var(--text)' }}>
          {track.title}
        </span>
        <div className="flex items-center justify-between mt-auto">
          <span className="flex items-center gap-1.5 text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
            <Clock className="w-3 h-3" />
            {track.duration}
          </span>
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={
              active
                ? { background: 'var(--accent)', color: 'var(--accent-ink)' }
                : { background: 'var(--accent-soft)', color: 'var(--accent)' }
            }
          >
            {active ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </span>
        </div>
      </div>
    </button>
  );
};

export const BreathingTab: React.FC<Props> = ({ player, query }) => {
  const q = query.trim().toLowerCase();

  const groupedTracks = useMemo(() => {
    const visible = BREATHING_TRACKS.filter(t => t.title.toLowerCase().includes(q));
    return DURATION_GROUPS.map(name => ({
      name,
      tracks: visible.filter(track => getDurationGroup(track) === name),
    })).filter(group => group.tracks.length > 0);
  }, [q]);

  if (groupedTracks.length === 0) {
    return <p className="text-center text-sm py-16 fade-up" style={{ color: 'var(--text-faint)' }}>Nichts gefunden.</p>;
  }

  return (
    <div className="fade-up space-y-8">
      {groupedTracks.map(group => (
        <section key={group.name}>
          <h2 className="text-xs font-extrabold uppercase tracking-wide mb-3" style={{ color: 'var(--text-faint)' }}>
            {group.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {group.tracks.map(track => (
              <BreathingCard key={track.id} track={track} currentId={player.track?.id} onSelect={player.select} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
