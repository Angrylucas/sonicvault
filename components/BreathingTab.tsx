import React, { useEffect, useMemo, useState } from 'react';
import { Play, Square } from 'lucide-react';
import { BreathingPattern } from '../types';
import { BREATHING_PATTERNS, BREATHING_TRACKS } from '../data';
import { TrackList } from './TrackList';
import { GuidedPlayerState } from '../hooks/useGuidedPlayer';

interface Props {
  player: GuidedPlayerState;
}

const SCALE_IN = 1.45;
const SCALE_OUT = 1.0;

/** Animierte Atem-Session für ein Muster. */
const BreathSession: React.FC<{ pattern: BreathingPattern; running: boolean }> = ({ pattern, running }) => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(pattern.phases[0].seconds);

  useEffect(() => {
    setPhaseIndex(0);
    setCountdown(pattern.phases[0].seconds);
  }, [pattern, running]);

  // Phasenwechsel
  useEffect(() => {
    if (!running) return;
    const phase = pattern.phases[phaseIndex];
    const t = setTimeout(() => {
      setPhaseIndex(i => (i + 1) % pattern.phases.length);
    }, phase.seconds * 1000);
    return () => clearTimeout(t);
  }, [running, phaseIndex, pattern]);

  // Sekunden-Countdown innerhalb der Phase
  useEffect(() => {
    if (!running) return;
    setCountdown(pattern.phases[phaseIndex].seconds);
    const iv = setInterval(() => {
      setCountdown(c => (c > 1 ? c - 1 : c));
    }, 1000);
    return () => clearInterval(iv);
  }, [running, phaseIndex, pattern]);

  const phase = pattern.phases[phaseIndex];

  // Ziel-Skalierung: bei "Halten" bleibt die Skalierung der letzten Atemphase
  const scale = useMemo(() => {
    if (!running) return SCALE_OUT;
    for (let i = phaseIndex; i >= 0; i--) {
      const k = pattern.phases[i].kind;
      if (k === 'in') return SCALE_IN;
      if (k === 'out') return SCALE_OUT;
    }
    return SCALE_OUT;
  }, [running, phaseIndex, pattern]);

  const transitionSeconds = phase.kind === 'hold' ? 0 : phase.seconds;

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="relative w-56 h-56 flex items-center justify-center">
        <div
          className="breath-circle absolute inset-0 rounded-full"
          style={{ background: 'rgba(245,192,96,0.07)', transform: `scale(${scale})`, transitionDuration: `${transitionSeconds}s` }}
        />
        <div
          className="breath-circle absolute inset-6 rounded-full border"
          style={{ background: 'rgba(245,192,96,0.12)', borderColor: 'rgba(245,192,96,0.28)', transform: `scale(${scale})`, transitionDuration: `${transitionSeconds}s` }}
        />
        <div
          className="breath-circle w-28 h-28 rounded-full shadow-[0_0_60px_rgba(245,192,96,0.4)]"
          style={{
            background: 'linear-gradient(135deg, #f5c060, #9099d8)',
            transform: `scale(${scale})`,
            transitionDuration: `${transitionSeconds}s`,
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-night-950 font-bold text-lg drop-shadow-sm">
            {running ? phase.label : 'Bereit?'}
          </span>
          {running && (
            <span className="text-night-950/80 font-semibold text-sm tabular-nums">{countdown}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export const BreathingTab: React.FC<Props> = ({ player }) => {
  const [pattern, setPattern] = useState<BreathingPattern>(BREATHING_PATTERNS[0]);
  const [running, setRunning] = useState(false);

  return (
    <div className="fade-up">
      <h2 className="text-2xl font-semibold text-slate-100">Atemübungen</h2>
      <p className="text-sm text-slate-400 mt-1 mb-6">
        Folge dem Kreis: Er wächst beim Einatmen und zieht sich beim Ausatmen zusammen.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {BREATHING_PATTERNS.map(p => {
          const total = p.phases.reduce((s, ph) => s + ph.seconds, 0);
          const active = pattern.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => { setPattern(p); setRunning(false); }}
              className={`rounded-2xl border text-left transition-all overflow-hidden ${
                active
                  ? 'border-accent-400/40'
                  : 'bg-night-900/70 border-night-800 hover:border-night-700'
              }`}
              style={active ? { background: 'rgba(245,192,96,0.07)' } : undefined}
            >
              {/* Rhythm bar */}
              <div className="flex h-1.5 rounded-t-2xl overflow-hidden">
                {p.phases.map((ph, i) => (
                  <div
                    key={i}
                    style={{ width: `${(ph.seconds / total) * 100}%` }}
                    className={
                      ph.kind === 'in'   ? 'bg-teal-400/70' :
                      ph.kind === 'hold' ? 'bg-accent-400/60' :
                                           'bg-lav-400/70'
                    }
                  />
                ))}
              </div>
              <div className="p-4 pt-3">
                <span className="block text-sm font-bold text-slate-100">{p.name}</span>
                {/* Phase pills */}
                <div className="flex flex-wrap gap-1 mt-2 mb-2.5">
                  {p.phases.map((ph, i) => (
                    <span key={i} className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      ph.kind === 'in'   ? 'bg-teal-900/60 text-teal-300' :
                      ph.kind === 'hold' ? 'bg-accent-400/15 text-accent-300' :
                                           'bg-lav-900/60 text-lav-300'
                    }`}>
                      {ph.label} {ph.seconds}s
                    </span>
                  ))}
                </div>
                <span className="block text-xs text-slate-400 leading-relaxed">{p.description}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-night-900/70 border border-night-800 rounded-3xl overflow-hidden mb-10">
        <BreathSession pattern={pattern} running={running} />
        <div className="flex justify-center pb-8">
          <button
            onClick={() => setRunning(r => !r)}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition-colors ${
              running
                ? 'bg-night-800 text-slate-200 hover:bg-night-700'
                : 'text-night-950 hover:opacity-80'
            }`}
            style={!running ? { background: '#f5c060' } : undefined}
          >
            {running ? (
              <>
                <Square className="w-4 h-4" /> Beenden
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Starten
              </>
            )}
          </button>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-slate-100 mb-4">Geführte Atemübungen</h3>
      <TrackList tracks={BREATHING_TRACKS} currentId={player.track?.id} onSelect={player.select} />
    </div>
  );
};
