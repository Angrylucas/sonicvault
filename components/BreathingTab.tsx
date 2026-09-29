import React, { useMemo } from 'react';
import { BreathPhase } from '../types';
import { BREATHING_PATTERNS, BREATHING_TRACKS } from '../data';
import { TrackList } from './TrackList';
import { GuidedPlayerState } from '../hooks/useGuidedPlayer';

interface Props {
  player: GuidedPlayerState;
  query: string;
}

const PHASE_COLOR: Record<BreathPhase['kind'], string> = {
  in: 'var(--accent)',
  hold: 'var(--text-faint)',
  out: 'var(--lav)',
};
const PHASE_TINT: Record<BreathPhase['kind'], string> = {
  in: 'var(--accent-soft)',
  hold: 'var(--surface-2)',
  out: 'var(--lav-soft)',
};

export const BreathingTab: React.FC<Props> = ({ player, query }) => {
  const q = query.trim().toLowerCase();
  const filteredTracks = useMemo(
    () => BREATHING_TRACKS.filter(t => t.title.toLowerCase().includes(q)),
    [q]
  );

  return (
    <div className="fade-up">
      <h2 className="text-sm font-extrabold mb-3" style={{ color: 'var(--text)' }}>Atemmuster</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {BREATHING_PATTERNS.map(p => {
          const total = p.phases.reduce((s, ph) => s + ph.seconds, 0);
          return (
            <div
              key={p.id}
              className="rounded-2xl text-left overflow-hidden"
              style={{ background: 'var(--surface)', boxShadow: '0 10px 22px -12px var(--shadow)' }}
            >
              <div className="flex h-1.5" aria-hidden="true">
                {p.phases.map((ph, i) => (
                  <div key={i} style={{ width: `${(ph.seconds / total) * 100}%`, background: PHASE_COLOR[ph.kind] }} />
                ))}
              </div>
              <div className="p-3.5">
                <span className="block text-sm font-extrabold mb-2" style={{ color: 'var(--text)' }}>{p.name}</span>
                <div className="flex flex-wrap gap-1 mb-2">
                  {p.phases.map((ph, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-xs font-extrabold px-1.5 py-0.5 rounded-full"
                      style={{ background: PHASE_TINT[ph.kind], color: 'var(--text)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: PHASE_COLOR[ph.kind] }} aria-hidden="true" />
                      {ph.label} {ph.seconds}s
                    </span>
                  ))}
                </div>
                <span className="block text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{p.description}</span>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="text-sm font-extrabold mb-3" style={{ color: 'var(--text)' }}>Geführte Atemübungen</h2>
      <TrackList tracks={filteredTracks} currentId={player.track?.id} onSelect={player.select} />
    </div>
  );
};
