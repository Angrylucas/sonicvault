import React from 'react';
import { Play, Pause, Clock } from 'lucide-react';
import { GuidedTrack } from '../types';

interface Props {
  tracks: GuidedTrack[];
  currentId?: string;
  onSelect: (track: GuidedTrack) => void;
}

/** Wiederverwendbare Liste für geführte Tracks (Meditation & Atmung). */
export const TrackList: React.FC<Props> = ({ tracks, currentId, onSelect }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {tracks.map(track => {
      const active = track.id === currentId;
      return (
        <button
          key={track.id}
          onClick={() => onSelect(track)}
          className={`group flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${
            active
              ? 'bg-accent-400/10 border-accent-400/40'
              : 'bg-night-900/70 border-night-800 hover:border-night-700 hover:bg-night-850'
          }`}
        >
          <span
            className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center transition-colors ${
              active
                ? 'bg-accent-400 text-night-950'
                : 'bg-night-800 text-accent-300 group-hover:bg-night-700'
            }`}
          >
            {active ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-slate-100 truncate">{track.title}</span>
            <span className="flex items-center gap-2 mt-1 text-xs text-slate-400">
              <Clock className="w-3 h-3" />
              {track.duration}
              <span className="text-slate-600">·</span>
              {track.tag}
            </span>
          </span>
        </button>
      );
    })}
  </div>
);
