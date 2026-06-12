import React, { useEffect, useMemo, useState } from 'react';
import { Play, Square } from 'lucide-react';
import { BreathingPattern, GuidedTrack } from '../types';
import { BREATHING_PATTERNS, BREATHING_TRACKS } from '../data';
import { TrackList } from './TrackList';

interface Props {
  currentId?: string;
  onSelect: (track: GuidedTrack) => void;
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
        {/* Äußerer Glow */}
        <div
          className="breath-circle absolute inset-0 rounded-full bg-accent-400/10"
          style={{ transform: `scale(${scale})`, transitionDuration: `${transitionSeconds}s` }}
        />
        <div
          className="breath-circle absolute inset-6 rounded-full bg-accent-400/15 border border-accent-400/30"
          style={{ transform: `scale(${scale})`, transitionDuration: `${transitionSeconds}s` }}
        />
        <div
          className="breath-circle w-28 h-28 rounded-full bg-gradient-to-br from-accent-400 to-lav-500 shadow-[0_0_60px_rgba(125,211,192,0.35)]"
          style={{ transform: `scale(${scale})`, transitionDuration: `${transitionSeconds}s` }}
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

export const BreathingTab: React.FC<Props> = ({ currentId, onSelect }) => {
  const [pattern, setPattern] = useState<BreathingPattern>(BREATHING_PATTERNS[0]);
  const [running, setRunning] = useState(false);

  return (
    <div className="fade-up">
      <h2 className="text-2xl font-semibold text-slate-100">Atemübungen</h2>
      <p className="text-sm text-slate-400 mt-1 mb-6">
        Folge dem Kreis: Er wächst beim Einatmen und zieht sich beim Ausatmen zusammen.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {BREATHING_PATTERNS.map(p => (
          <button
            key={p.id}
            onClick={() => {
              setPattern(p);
              setRunning(false);
            }}
            className={`p-4 rounded-2xl border text-left transition-all ${
              pattern.id === p.id
                ? 'bg-accent-400/10 border-accent-400/40'
                : 'bg-night-900/70 border-night-800 hover:border-night-700'
            }`}
          >
            <span className="block text-sm font-semibold text-slate-100">{p.name}</span>
            <span className="block text-xs text-slate-400 mt-1 leading-relaxed">{p.description}</span>
          </button>
        ))}
      </div>

      <div className="bg-night-900/70 border border-night-800 rounded-3xl overflow-hidden mb-10">
        <BreathSession pattern={pattern} running={running} />
        <div className="flex justify-center pb-8">
          <button
            onClick={() => setRunning(r => !r)}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition-colors ${
              running
                ? 'bg-night-800 text-slate-200 hover:bg-night-700'
                : 'bg-accent-400 text-night-950 hover:bg-accent-300'
            }`}
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
      <TrackList tracks={BREATHING_TRACKS} currentId={currentId} onSelect={onSelect} />
    </div>
  );
};
