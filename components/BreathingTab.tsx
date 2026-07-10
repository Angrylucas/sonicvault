import React, { useEffect, useMemo, useState } from 'react';
import { Play, Square, Volume2 } from 'lucide-react';
import { BreathingPattern, BreathPhase } from '../types';
import { BREATHING_PATTERNS, BREATHING_TRACKS } from '../data';
import { TrackList } from './TrackList';
import { GuidedPlayerState } from '../hooks/useGuidedPlayer';
import { BREATHING_VOICES, useBreathingVoice } from '../hooks/useBreathingVoice';

interface Props {
  player: GuidedPlayerState;
}

const SCALE_IN = 1.45;
const SCALE_OUT = 1.0;

/** Animierte Atem-Session für ein Muster. */
const BreathSession: React.FC<{
  pattern: BreathingPattern;
  running: boolean;
  playCue: (kind: BreathPhase['kind']) => void;
}> = ({ pattern, running, playCue }) => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(pattern.phases[0].seconds);

  useEffect(() => {
    setPhaseIndex(0);
    setCountdown(pattern.phases[0].seconds);
  }, [pattern, running]);

  // Phasenwechsel + Audio-Cue für die neu begonnene Phase
  useEffect(() => {
    if (!running) return;
    const phase = pattern.phases[phaseIndex];
    playCue(phase.kind);
    const t = setTimeout(() => {
      setPhaseIndex(i => (i + 1) % pattern.phases.length);
    }, phase.seconds * 1000);
    return () => clearTimeout(t);
  }, [running, phaseIndex, pattern, playCue]);

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
          style={{ background: 'rgba(250,250,250,0.05)', transform: `scale(${scale})`, transitionDuration: `${transitionSeconds}s` }}
        />
        <div
          className="breath-circle absolute inset-6 rounded-full border"
          style={{ background: 'rgba(250,250,250,0.08)', borderColor: 'rgba(250,250,250,0.22)', transform: `scale(${scale})`, transitionDuration: `${transitionSeconds}s` }}
        />
        <div
          className="breath-circle w-28 h-28 rounded-full shadow-[0_0_60px_rgba(250,250,250,0.3)]"
          style={{
            background: 'linear-gradient(135deg, #fafafa, #a1a1aa)',
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
  const { voice, setVoice, playCue } = useBreathingVoice();

  return (
    <div className="fade-up">
      <h2 className="font-display text-2xl text-slate-100 text-center">Atemübungen</h2>
      <p className="text-sm text-slate-400 mt-1 mb-6 text-center">
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
              className={`rounded-xl border text-left transition-all overflow-hidden ${
                active
                  ? 'border-transparent shadow-[0_0_0_2px_#e4e4e7]'
                  : 'bg-night-900/70 border-night-800 hover:border-night-700'
              }`}
              style={active ? { background: 'rgba(250,250,250,0.04)' } : undefined}
            >
              {/* Rhythm bar */}
              <div className="flex h-1.5 rounded-t-xl overflow-hidden">
                {p.phases.map((ph, i) => (
                  <div
                    key={i}
                    style={{ width: `${(ph.seconds / total) * 100}%` }}
                    className={
                      ph.kind === 'in'   ? 'bg-slate-50/80' :
                      ph.kind === 'hold' ? 'bg-slate-400/60' :
                                           'bg-slate-600/60'
                    }
                  />
                ))}
              </div>
              <div className="p-4 pt-3">
                <span className="block font-heading text-sm font-bold text-slate-100">{p.name}</span>
                {/* Phase pills */}
                <div className="flex flex-wrap gap-1 mt-2 mb-2.5">
                  {p.phases.map((ph, i) => (
                    <span key={i} className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      ph.kind === 'in'   ? 'bg-night-700 text-slate-100' :
                      ph.kind === 'hold' ? 'bg-night-800 text-slate-300' :
                                           'bg-night-900 text-slate-400 border border-night-800'
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
        <BreathSession pattern={pattern} running={running} playCue={playCue} />

        {/* Stimmen-Auswahl für die Phasen-Ansagen */}
        <div className="flex items-center justify-center gap-1.5 mb-5">
          <Volume2 className="w-3.5 h-3.5 text-slate-500 mr-1" />
          {BREATHING_VOICES.map(v => (
            <button
              key={v.id}
              onClick={() => setVoice(v.id)}
              aria-pressed={voice === v.id}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                voice === v.id
                  ? 'bg-accent-400 text-night-950'
                  : 'bg-night-800 text-slate-400 hover:bg-night-700 hover:text-slate-300'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="flex justify-center pb-8">
          <button
            onClick={() => setRunning(r => !r)}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition-colors ${
              running
                ? 'bg-night-800 text-slate-200 hover:bg-night-700'
                : 'bg-accent-400 text-night-950 hover:opacity-80'
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

      <h3 className="font-display text-xl text-slate-100 mb-4 text-center">Geführte Atemübungen</h3>
      <TrackList tracks={BREATHING_TRACKS} currentId={player.track?.id} onSelect={player.select} />
    </div>
  );
};
