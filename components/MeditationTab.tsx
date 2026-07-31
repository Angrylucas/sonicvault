import React, { useMemo, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { GuidedTrack } from '../types';
import { MEDITATIONS, MEDITATION_TAGS } from '../data';
import { TrackList } from './TrackList';
import { THEME_ART, DEFAULT_THEME_ART } from './ThemeArt';

interface Props {
  currentId?: string;
  onSelect: (track: GuidedTrack) => void;
  query: string;
}

const TAGS = MEDITATION_TAGS.filter(t => t !== 'Alle');

/** Tracks mit `series` werden zu benannten Sektionen gruppiert (Reihenfolge = erstes Vorkommen);
 *  Tracks ohne `series` landen gesammelt in einer letzten, unbetitelten Sektion. */
function groupBySeries(tracks: GuidedTrack[]) {
  const order: string[] = [];
  const groups: Record<string, GuidedTrack[]> = {};
  const rest: GuidedTrack[] = [];
  for (const t of tracks) {
    if (t.series) {
      if (!groups[t.series]) { groups[t.series] = []; order.push(t.series); }
      groups[t.series].push(t);
    } else {
      rest.push(t);
    }
  }
  return { seriesGroups: order.map(name => ({ name, tracks: groups[name] })), standalone: rest };
}

const GroupedTracks: React.FC<{
  tracks: GuidedTrack[];
  currentId?: string;
  onSelect: (track: GuidedTrack) => void;
}> = ({ tracks, currentId, onSelect }) => {
  const { seriesGroups, standalone } = groupBySeries(tracks);
  return (
    <div className="space-y-8">
      {seriesGroups.map(group => (
        <section key={group.name}>
          <h3 className="text-xs font-extrabold tracking-wide uppercase mb-3" style={{ color: 'var(--text-faint)' }}>
            {group.name}
          </h3>
          <TrackList tracks={group.tracks} currentId={currentId} onSelect={onSelect} />
        </section>
      ))}
      {standalone.length > 0 && (
        <section>
          {seriesGroups.length > 0 && (
            <h3 className="text-xs font-extrabold tracking-wide uppercase mb-3" style={{ color: 'var(--text-faint)' }}>
              Weitere
            </h3>
          )}
          <TrackList tracks={standalone} currentId={currentId} onSelect={onSelect} />
        </section>
      )}
    </div>
  );
};

export const MeditationTab: React.FC<Props> = ({ currentId, onSelect, query }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  // Suche überschreibt das Themen-Menü: flache, themenübergreifende Trefferliste.
  const searchResults = useMemo(
    () => (searching ? MEDITATIONS.filter(m => m.title.toLowerCase().includes(q)) : []),
    [searching, q]
  );

  const tagTracks = useMemo(
    () => (selectedTag ? MEDITATIONS.filter(m => m.tag === selectedTag) : []),
    [selectedTag]
  );

  if (searching) {
    return (
      <div className="fade-up">
        <GroupedTracks tracks={searchResults} currentId={currentId} onSelect={onSelect} />
      </div>
    );
  }

  if (selectedTag) {
    return (
      <div className="fade-up">
        <button
          onClick={() => setSelectedTag(null)}
          className="flex items-center gap-1.5 mb-5 text-sm font-bold"
          style={{ color: 'var(--text-muted)' }}
        >
          <ChevronLeft className="w-4 h-4" />
          Themen
        </button>
        <h2 className="text-xl font-extrabold mb-5" style={{ color: 'var(--text)' }}>{selectedTag}</h2>
        <GroupedTracks tracks={tagTracks} currentId={currentId} onSelect={onSelect} />
      </div>
    );
  }

  // Themen-Kachel-Menü: erste Ebene, führt zu den jeweiligen Meditationen.
  return (
    <div className="fade-up grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
      {TAGS.map(t => {
        const count = MEDITATIONS.filter(m => m.tag === t).length;
        const { gradient, Scene } = THEME_ART[t] ?? DEFAULT_THEME_ART;
        return (
          <button
            key={t}
            onClick={() => setSelectedTag(t)}
            className="relative rounded-2xl overflow-hidden text-left transition-transform hover:-translate-y-0.5 h-36"
            style={{ boxShadow: '0 10px 24px -12px var(--shadow)' }}
          >
            <div className="absolute inset-0" style={{ background: gradient }}>
              <Scene />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <span className="block text-sm font-extrabold text-white leading-snug">{t}</span>
              <span className="block text-[11px] font-semibold text-white/70 mt-0.5">
                {count} {count === 1 ? 'Session' : 'Sessions'}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
