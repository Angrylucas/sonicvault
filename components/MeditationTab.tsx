import React, { useMemo, useState } from 'react';
import { GuidedTrack } from '../types';
import { MEDITATIONS, MEDITATION_TAGS } from '../data';
import { TrackList } from './TrackList';

interface Props {
  currentId?: string;
  onSelect: (track: GuidedTrack) => void;
  query: string;
}

export const MeditationTab: React.FC<Props> = ({ currentId, onSelect, query }) => {
  const [tag, setTag] = useState('Alle');
  const q = query.trim().toLowerCase();

  const filtered = useMemo(
    () => MEDITATIONS.filter(m => (tag === 'Alle' || m.tag === tag) && m.title.toLowerCase().includes(q)),
    [tag, q]
  );

  // Tracks mit `series` werden zu benannten Sektionen gruppiert (Reihenfolge = erstes Vorkommen);
  // Tracks ohne `series` landen gesammelt in einer letzten, unbetitelten Sektion.
  const { seriesGroups, standalone } = useMemo(() => {
    const order: string[] = [];
    const groups: Record<string, typeof filtered> = {};
    const rest: typeof filtered = [];
    for (const t of filtered) {
      if (t.series) {
        if (!groups[t.series]) { groups[t.series] = []; order.push(t.series); }
        groups[t.series].push(t);
      } else {
        rest.push(t);
      }
    }
    return { seriesGroups: order.map(name => ({ name, tracks: groups[name] })), standalone: rest };
  }, [filtered]);

  return (
    <div className="fade-up">
      <div className="flex gap-2 overflow-x-auto pb-3 mb-5 -mx-1 px-1">
        {MEDITATION_TAGS.map(t => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className="shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-colors"
            style={
              tag === t
                ? { background: 'var(--accent)', color: 'var(--accent-ink)' }
                : { background: 'var(--surface)', color: 'var(--text-muted)', boxShadow: '0 4px 12px var(--shadow)' }
            }
          >
            {t}
          </button>
        ))}
      </div>

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
    </div>
  );
};
