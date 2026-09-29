import React, { useMemo } from 'react';
import { BREATHING_TRACKS } from '../data';
import { TrackList } from './TrackList';
import { GuidedPlayerState } from '../hooks/useGuidedPlayer';

interface Props {
  player: GuidedPlayerState;
  query: string;
}

export const BreathingTab: React.FC<Props> = ({ player, query }) => {
  const q = query.trim().toLowerCase();
  const filteredTracks = useMemo(
    () => BREATHING_TRACKS.filter(t => t.title.toLowerCase().includes(q)),
    [q]
  );

  return (
    <div className="fade-up">
      <h2 className="text-sm font-extrabold mb-3" style={{ color: 'var(--text)' }}>Geführte Atemübungen</h2>
      <TrackList tracks={filteredTracks} currentId={player.track?.id} onSelect={player.select} />
    </div>
  );
};
