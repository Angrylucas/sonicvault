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

const hashText = (text: string) => {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return hash;
};

const TITLE_TRANSLATIONS: Record<string, string> = {
  '3 Minute Breathing': '3-Minuten-Atmung',
  '3 Minute Breathing Space': '3-Minuten-Atemraum',
  'Mindful Breathing': 'Achtsames Atmen',
  '5 Minute Breathing': '5-Minuten-Atmung',
  'Breathing Meditation': 'Atemmeditation',
  'Breathing Space': 'Atemraum',
  '10 Minute Breathing': '10-Minuten-Atmung',
  'Compassionate Breath': 'Mitfühlender Atem',
  '4-7-8 Breathing': '4-7-8-Atmung',
  '4-7-8 Breathing · 10 Min': '4-7-8-Atmung · 10 Min',
  'Box Breathing · 5 Min': 'Box-Atmung · 5 Min',
  'Wim Hof Breathing · Easy': 'Wim-Hof-Atmung · leicht',
  'Wim Hof Breathing · Expert': 'Wim-Hof-Atmung · fortgeschritten',
  'Box Breathing': 'Box-Atmung',
  'Deep Breathing for Stress Relief': 'Tiefe Atmung gegen Stress',
  'Lazy Eight Breathing': 'Atem-Acht',
  'Star Breathing': 'Stern-Atmung',
};

const displayTitle = (track: GuidedTrack) => TITLE_TRANSLATIONS[track.title] ?? track.title;

const BreathingArt: React.FC<{ track: GuidedTrack }> = ({ track }) => {
  const seed = hashText(`${track.id}-${displayTitle(track)}`);
  const orbX = 20 + (seed % 72);
  const orbY = 16 + ((seed >> 4) % 30);
  const pathA = 18 + ((seed >> 7) % 22);
  const pathB = 48 + ((seed >> 10) % 26);
  const text = `${track.id} ${displayTitle(track)}`.toLowerCase();
  const isSpace = text.includes('space') || text.includes('atemraum');
  const isHeart = text.includes('stress') || text.includes('compassionate') || text.includes('mitfühl');
  const isEight = text.includes('eight') || text.includes('acht');
  const isStar = text.includes('star');
  const isBox = text.includes('box');
  const isLong = parseDurationMinutes(track.duration) >= 12;

  return (
    <svg viewBox="0 0 112 76" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path d={`M7 57c${pathA}-15 20-15 31-25 13-13 16-24 37-23 24 1 32 20 31 45v20H0V59Z`} fill="#fff" opacity="0.08" />
      <circle cx={orbX} cy={orbY} r={13 + (seed % 12)} fill="#7cd6ab" opacity="0.18" />
      <circle cx={91 - (seed % 18)} cy="17" r="7" fill="#dce4ff" opacity="0.72" />
      {Array.from({ length: 4 }).map((_, i) => <circle key={i} cx={18 + ((seed >> (i * 4)) % 78)} cy={12 + ((seed >> (i * 5)) % 28)} r="1" fill="#fff" opacity="0.45" />)}
      {isSpace && <><circle cx="56" cy="40" r={16 + (seed % 6)} fill="none" stroke="#c3e6d2" strokeWidth="1.5" opacity="0.55" /><circle cx="56" cy="40" r="5" fill="#d8f0e3" /></>}
      {isHeart && <><path d="M56 52c-15-9-18-24-7-25 5 0 7 3 7 7 0-4 3-7 8-7 11 1 8 16-8 25Z" fill="#c7b8f5" /><path d={`M28 61c${8 + seed % 8}-8 19-10 28-5 9-5 20-3 28 5-8 5-18 6-28 2-8 4-20 3-28-2Z`} fill="#7cd6ab" opacity="0.48" /></>}
      {isEight && <><path d="M26 42c11-18 27-18 35 0 8 18 24 18 35 0" stroke="#c3e6d2" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.82" /><path d="M26 42c11 18 27 18 35 0 8-18 24-18 35 0" stroke="#b3a4ea" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.58" /></>}
      {isStar && <path d="M56 21l6 14 15 1-11 10 4 15-14-8-14 8 4-15-11-10 15-1Z" fill="#c7b8f5" opacity="0.86" />}
      {isBox && <rect x={32 + (seed % 8)} y="25" width="42" height="32" rx="7" fill="none" stroke="#c3e6d2" strokeWidth="3" opacity="0.78" />}
      {isLong && <><path d={`M20 58 ${38 + seed % 8} 36l13 13 12-18 24 27Z`} fill="#405b73" opacity="0.92" /><path d="M35 26c10-7 24-9 42-5" stroke="#d8f0e3" strokeWidth="1.8" strokeLinecap="round" opacity="0.58" fill="none" /></>}
      {!isSpace && !isHeart && !isEight && !isStar && !isBox && !isLong && <><path d={`M18 44q12-${8 + seed % 8} 24 0t${pathB - 24} 0 24 0`} stroke="#d8f0e3" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.78" /><circle cx="56" cy="35" r={6 + seed % 6} fill="#7cd6ab" opacity="0.8" /></>}
    </svg>
  );
};

const BreathingCard: React.FC<{
  track: GuidedTrack;
  currentId?: string;
  onSelect: (track: GuidedTrack) => void;
}> = ({ track, currentId, onSelect }) => {
  const active = track.id === currentId;
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
        <BreathingArt track={track} />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <span className="text-sm font-extrabold leading-snug line-clamp-2" style={{ color: 'var(--text)' }}>
          {displayTitle(track)}
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
    const visible = BREATHING_TRACKS.filter(t => displayTitle(t).toLowerCase().includes(q) || t.title.toLowerCase().includes(q));
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
