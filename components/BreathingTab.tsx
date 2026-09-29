import React, { useEffect, useMemo, useState } from 'react';
import { Play, Square, Volume2 } from 'lucide-react';
import { BreathingPattern, BreathPhase } from '../types';
import { BREATHING_PATTERNS, BREATHING_TRACKS } from '../data';
import { TrackList } from './TrackList';
import { GuidedPlayerState } from '../hooks/useGuidedPlayer';
import { BREATHING_VOICES, useBreathingVoice } from '../hooks/useBreathingVoice';

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

/** Phasen-Takt eines Musters: Sprach-/Glocken-Ansage pro Phase, Text-Anzeige statt Animation. */
function usePacer(pattern: BreathingPattern, running: boolean, playCue: (kind: BreathPhase['kind']) => void) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(pattern.phases[0].seconds);

  useEffect(() => {
    setPhaseIndex(0);
    setCountdown(pattern.phases[0].seconds);
  }, [pattern, running]);

  useEffect(() => {
    if (!running) return;
    const phase = pattern.phases[phaseIndex];
    playCue(phase.kind);
    const t = setTimeout(() => {
      setPhaseIndex(i => (i + 1) % pattern.phases.length);
    }, phase.seconds * 1000);
    return () => clearTimeout(t);
  }, [running, phaseIndex, pattern, playCue]);

  useEffect(() => {
    if (!running) return;
    setCountdown(pattern.phases[phaseIndex].seconds);
    const iv = setInterval(() => {
      setCountdown(c => (c > 1 ? c - 1 : c));
    }, 1000);
    return () => clearInterval(iv);
  }, [running, phaseIndex, pattern]);

  return { phase: pattern.phases[phaseIndex], countdown };
}

export const BreathingTab: React.FC<Props> = ({ player, query }) => {
  const [pattern, setPattern] = useState<BreathingPattern>(BREATHING_PATTERNS[0]);
  const [running, setRunning] = useState(false);
  const { voice, setVoice, playCue } = useBreathingVoice();
  const { phase, countdown } = usePacer(pattern, running, playCue);

  const q = query.trim().toLowerCase();
  const filteredTracks = useMemo(
    () => BREATHING_TRACKS.filter(t => t.title.toLowerCase().includes(q)),
    [q]
  );

  return (
    <div className="fade-up">
      <h2 className="text-sm font-extrabold mb-3" style={{ color: 'var(--text)' }}>Atemmuster</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {BREATHING_PATTERNS.map(p => {
          const total = p.phases.reduce((s, ph) => s + ph.seconds, 0);
          const active = pattern.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => { setPattern(p); setRunning(false); }}
              aria-pressed={active}
              className="rounded-2xl text-left overflow-hidden transition-all"
              style={{
                background: 'var(--surface)',
                boxShadow: '0 10px 22px -12px var(--shadow)',
                outline: active ? '2px solid var(--accent)' : 'none',
                outlineOffset: active ? '-2px' : undefined,
              }}
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
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl p-5 mb-8 flex flex-col items-center" style={{ background: 'var(--surface)', boxShadow: '0 10px 26px -12px var(--shadow)' }}>
        <div className="text-center py-5 min-h-[88px] flex flex-col items-center justify-center">
          {running ? (
            <>
              <p className="text-2xl font-extrabold leading-tight" style={{ color: 'var(--text)' }} aria-live="polite">{phase.label}</p>
              <p className="text-sm font-bold tabular-nums mt-1" style={{ color: 'var(--text-muted)' }}>{countdown} s</p>
            </>
          ) : (
            <p className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
              {pattern.name}: Muster wählen, Ansage einstellen, starten.
            </p>
          )}
        </div>

        <div role="group" aria-label="Ansage" className="flex items-center justify-center gap-1.5 flex-wrap mb-4">
          <Volume2 className="w-3.5 h-3.5 mr-0.5" style={{ color: 'var(--text-faint)' }} aria-hidden="true" />
          {BREATHING_VOICES.map(v => (
            <button
              key={v.id}
              onClick={() => setVoice(v.id)}
              aria-pressed={voice === v.id}
              className="min-h-[44px] px-4 py-2 rounded-full text-xs font-bold transition-colors"
              style={
                voice === v.id
                  ? { background: 'var(--accent)', color: 'var(--accent-ink)' }
                  : { background: 'var(--surface-2)', color: 'var(--text-muted)' }
              }
            >
              {v.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setRunning(r => !r)}
          className="flex items-center gap-2 min-h-[48px] px-8 py-3 rounded-full font-bold text-sm transition-colors"
          style={
            running
              ? { background: 'var(--surface-2)', color: 'var(--text)', boxShadow: 'inset 0 0 0 1px var(--border)' }
              : { background: 'var(--accent)', color: 'var(--accent-ink)' }
          }
        >
          {running ? (<><Square className="w-4 h-4" aria-hidden="true" /> Beenden</>) : (<><Play className="w-4 h-4" aria-hidden="true" /> Starten</>)}
        </button>
      </div>

      <h2 className="text-sm font-extrabold mb-3" style={{ color: 'var(--text)' }}>Geführte Atemübungen</h2>
      <TrackList tracks={filteredTracks} currentId={player.track?.id} onSelect={player.select} />
    </div>
  );
};
