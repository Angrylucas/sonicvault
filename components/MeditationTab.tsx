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

  return (
    <div className="fade-up">
      <h2 className="text-2xl font-semibold text-slate-100">Meditation</h2>
      <p className="text-sm text-slate-400 mt-1 mb-6">
        Geführte Meditationen für Ruhe, Schlaf und Achtsamkeit.
      </p>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-1 px-1">
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

      <TrackList tracks={filtered} currentId={currentId} onSelect={onSelect} />
    </div>
  );
};
