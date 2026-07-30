import React, { useState } from 'react';
import {
  Activity, BookOpen, Briefcase, Clock, CircleDot, Heart, Leaf, Moon, Music,
  Pause, Plane, Play, Sparkles, User, Users, Wind,
} from 'lucide-react';
import { GuidedTrack } from '../types';

type Tint = 'accent' | 'lav';

const TAG_STYLE: Record<string, { icon: React.FC<{ className?: string }>; tint: Tint }> = {
  'Achtsamkeit': { icon: Leaf, tint: 'accent' },
  'Body Scan':   { icon: User, tint: 'lav' },
  'Schlaf':      { icon: Moon, tint: 'accent' },
  'Heilung':     { icon: Sparkles, tint: 'lav' },
  'Mitgefühl':   { icon: Heart, tint: 'accent' },
  'Klang':       { icon: CircleDot, tint: 'lav' },
  'Kurz':        { icon: Clock, tint: 'accent' },
  'Technik':     { icon: Activity, tint: 'lav' },

  // Import 2026-07-30: neue Tags
  'Emotionen':                { icon: Heart, tint: 'lav' },
  'Beziehungen':              { icon: Users, tint: 'accent' },
  'Alltag & Arbeit':          { icon: Briefcase, tint: 'lav' },
  'Reisen':                   { icon: Plane, tint: 'accent' },
  'Angst & Stress':           { icon: Wind, tint: 'lav' },
  'Dankbarkeit & Mitgefühl':  { icon: Heart, tint: 'accent' },
  'Schlafgeschichten':        { icon: BookOpen, tint: 'lav' },
};
const DEFAULT_STYLE = { icon: Music, tint: 'accent' as Tint };

interface Props {
  tracks: GuidedTrack[];
  currentId?: string;
  onSelect: (track: GuidedTrack) => void;
}

/** Löst die aktuell gewählte Sprecher-Variante zu einem spielbaren Track auf. */
function resolveVariant(track: GuidedTrack, narrator: string | null): GuidedTrack {
  if (!track.narrators || !narrator) return track;
  const variant = track.narrators.find(n => n.narrator === narrator);
  if (!variant) return track;
  return {
    ...track,
    id: `${track.id}::${variant.narrator}`,
    filename: variant.filename,
    duration: variant.duration,
  };
}

const TrackCard: React.FC<{
  track: GuidedTrack;
  currentId?: string;
  onSelect: (track: GuidedTrack) => void;
}> = ({ track, currentId, onSelect }) => {
  const hasNarrators = !!track.narrators && track.narrators.length > 1;
  const [narrator, setNarrator] = useState<string | null>(
    hasNarrators ? track.narrators![0].narrator : null
  );
  const resolved = resolveVariant(track, narrator);
  const active = resolved.id === currentId;
  const { icon: Icon, tint } = TAG_STYLE[track.tag] ?? DEFAULT_STYLE;

  return (
    <button
      onClick={() => onSelect(resolved)}
      className="text-left rounded-2xl p-4 flex flex-col gap-3.5 transition-transform hover:-translate-y-0.5"
      style={{
        background: 'var(--surface)',
        boxShadow: active ? '0 14px 28px -10px var(--shadow)' : '0 10px 24px -12px var(--shadow)',
        outline: active ? '2px solid var(--accent)' : 'none',
        outlineOffset: active ? '-2px' : undefined,
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: `var(--${tint}-soft)`, color: `var(--${tint})` }}
        >
          <Icon className="w-4 h-4" />
        </span>
        <span className="text-[10px] font-extrabold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
          {track.tag}
        </span>
      </div>

      <span className="text-sm font-extrabold leading-snug line-clamp-2" style={{ color: 'var(--text)' }}>
        {track.title}
      </span>

      {hasNarrators && (
        <span className="flex flex-wrap gap-1 -mt-2">
          {track.narrators!.map(v => (
            <span
              key={v.narrator}
              role="button"
              tabIndex={0}
              onClick={e => {
                e.stopPropagation();
                setNarrator(v.narrator);
                if (active) onSelect(resolveVariant(track, v.narrator));
              }}
              onKeyDown={e => {
                if (e.key !== 'Enter' && e.key !== ' ') return;
                e.preventDefault();
                e.stopPropagation();
                setNarrator(v.narrator);
                if (active) onSelect(resolveVariant(track, v.narrator));
              }}
              className="px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors"
              style={
                v.narrator === narrator
                  ? { background: 'var(--accent)', color: 'var(--accent-ink)' }
                  : { background: 'var(--surface-2)', color: 'var(--text-muted)' }
              }
            >
              {v.narrator}
            </span>
          ))}
        </span>
      )}

      <div className="flex items-center justify-between mt-auto">
        <span className="flex items-center gap-1.5 text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
          <Clock className="w-3 h-3" />
          {resolved.duration}
        </span>
        <span
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={
            active
              ? { background: 'var(--accent)', color: 'var(--accent-ink)' }
              : { background: `var(--${tint}-soft)`, color: `var(--${tint})` }
          }
        >
          {active ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </span>
      </div>
    </button>
  );
};

export const TrackList: React.FC<Props> = ({ tracks, currentId, onSelect }) => {
  if (tracks.length === 0) {
    return <p className="text-center text-sm py-16" style={{ color: 'var(--text-faint)' }}>Nichts gefunden.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {tracks.map(track => (
        <TrackCard key={track.id} track={track} currentId={currentId} onSelect={onSelect} />
      ))}
    </div>
  );
};
