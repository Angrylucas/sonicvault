import React, { useMemo, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { GuidedTrack } from '../types';
import { MEDITATIONS, MEDITATION_TAGS } from '../data';
import { TrackList } from './TrackList';
import { EmptyState } from './EmptyState';
import { THEME_ART, DEFAULT_THEME_ART, ThemeArtDefs } from './ThemeArt';

interface Props {
  currentId?: string;
  playing: boolean;
  onSelect: (track: GuidedTrack) => void;
  query: string;
  onClearQuery: () => void;
}

const TAGS = MEDITATION_TAGS.filter(t => t !== 'All');

/** 14 Themen in vier Gruppen: weniger Entscheidungen auf einmal, überlappende Namen liegen beieinander. */
const CLUSTERS: { title: string; tags: string[] }[] = [
  { title: 'Settle and focus', tags: ['Mindfulness', 'Body Scan', 'Sound', 'Healing'] },
  { title: 'Sleep', tags: ['Sleep', 'Sleep Stories'] },
  { title: 'Feelings and people', tags: ['Emotions', 'Relationships', 'Compassion', 'Gratitude & Compassion'] },
  { title: 'Everyday life', tags: ['Daily Life & Work', 'Anxiety & Stress', 'Travel'] },
];

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
  playing: boolean;
  onSelect: (track: GuidedTrack) => void;
  hideTag?: boolean;
  query?: string;
  onClearQuery?: () => void;
}> = ({ tracks, currentId, playing, onSelect, hideTag, query, onClearQuery }) => {
  if (tracks.length === 0 && query && onClearQuery) return <EmptyState what="sessions" query={query} onClear={onClearQuery} />;
  const { seriesGroups, standalone } = groupBySeries(tracks);
  return (
    <div className="space-y-8">
      {seriesGroups.map(group => (
        <section key={group.name}>
          <h3 className="text-sm font-extrabold mb-3" style={{ color: 'var(--text)' }}>
            {group.name}
          </h3>
          <TrackList tracks={group.tracks} currentId={currentId} playing={playing} onSelect={onSelect} hideTag={hideTag} />
        </section>
      ))}
      {standalone.length > 0 && (
        <section>
          {seriesGroups.length > 0 && (
            <h3 className="text-sm font-extrabold mb-3" style={{ color: 'var(--text)' }}>
              More
            </h3>
          )}
          <TrackList tracks={standalone} currentId={currentId} playing={playing} onSelect={onSelect} hideTag={hideTag} />
        </section>
      )}
    </div>
  );
};

export const MeditationTab: React.FC<Props> = ({ currentId, playing, onSelect, query, onClearQuery }) => {
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
        <GroupedTracks tracks={searchResults} currentId={currentId} playing={playing} onSelect={onSelect} query={query} onClearQuery={onClearQuery} />
      </div>
    );
  }

  if (selectedTag) {
    return (
      <div className="fade-up">
        <button
          onClick={() => setSelectedTag(null)}
          className="flex items-center gap-1.5 min-h-[44px] -ml-1 pr-3 mb-3 text-sm font-bold rounded-full"
          style={{ color: 'var(--text-muted)' }}
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          Themes
        </button>
        <h2 className="text-xl font-extrabold mb-5" style={{ color: 'var(--text)' }}>{selectedTag}</h2>
        <GroupedTracks tracks={tagTracks} currentId={currentId} playing={playing} onSelect={onSelect} hideTag />
      </div>
    );
  }

  // Themen-Kachel-Menü: erste Ebene, in Gruppen geordnet.
  return (
    <div className="fade-up space-y-8">
      <ThemeArtDefs />
      {CLUSTERS.map(cluster => (
        <section key={cluster.title} aria-labelledby={`cluster-${cluster.title.replace(/\W+/g, '-')}`}>
          <h2 id={`cluster-${cluster.title.replace(/\W+/g, '-')}`} className="text-sm font-extrabold mb-3" style={{ color: 'var(--text)' }}>
            {cluster.title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {cluster.tags.filter(t => TAGS.includes(t)).map(t => {
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
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <span className="block text-sm font-extrabold text-white leading-snug">{t}</span>
                    <span className="block text-xs font-semibold text-white/85 mt-0.5">
                      {count} {count === 1 ? 'session' : 'sessions'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};
