import React, { useMemo, useState } from 'react';
import { GuidedTrack } from '../types';
import { MEDITATIONS, MEDITATION_TAGS } from '../data';
import { TrackList } from './TrackList';

interface Props {
  currentId?: string;
  onSelect: (track: GuidedTrack) => void;
}

export const MeditationTab: React.FC<Props> = ({ currentId, onSelect }) => {
  const [tag, setTag] = useState('Alle');

  const filtered = useMemo(
    () => (tag === 'Alle' ? MEDITATIONS : MEDITATIONS.filter(m => m.tag === tag)),
    [tag]
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
      <h2 className="font-display text-2xl text-slate-100 text-center">Meditation</h2>
      <p className="text-sm text-slate-400 mt-1 mb-6 text-center">
        Geführte Meditationen für Ruhe, Schlaf und Achtsamkeit.
      </p>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-1 px-1 sm:justify-center">
        {MEDITATION_TAGS.map(t => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              tag === t
                ? 'bg-accent-400 text-night-950'
                : 'bg-night-900 text-slate-300 border border-night-800 hover:border-night-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {seriesGroups.map(group => (
          <section key={group.name}>
            <h3 className="text-xs font-semibold tracking-wide uppercase text-slate-500 mb-3">
              {group.name}
            </h3>
            <TrackList tracks={group.tracks} currentId={currentId} onSelect={onSelect} />
          </section>
        ))}
        {standalone.length > 0 && (
          <section>
            {seriesGroups.length > 0 && (
              <h3 className="text-xs font-semibold tracking-wide uppercase text-slate-500 mb-3">
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
