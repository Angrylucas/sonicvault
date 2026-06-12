import React, { useEffect, useMemo, useState } from 'react';
import { Play, Square, AudioWaveform } from 'lucide-react';
import { BreathingPattern, BreathPhase, GuidedTrack } from '../types';
import { BREATHING_PATTERNS, BREATHING_TRACKS } from '../data';
import { TrackList } from './TrackList';
import { GuidedPlayerState } from '../hooks/useGuidedPlayer';

interface Props {
  player: GuidedPlayerState;
}

const SCALE_IN = 1.45;
const SCALE_OUT = 1.0;

/** Reiner Anzeige-Kreis für beide Modi (manuell & synchronisiert). */
const BreathCircle: React.FC<{
  label: string;
  countdown?: number;
  scale: number;
  transitionSeconds: number;
}> = ({ label, countdown, scale, transitionSeconds }) => (
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
      <span className="text-night-950 font-bold text-lg drop-shadow-sm">{label}</span>
      {countdown !== undefined && (
        <span className="text-night-950/80 font-semibold text-sm tabular-nums">{countdown}</span>
      )}
    </div>
  </div>
);

/** Manuelle Atem-Session mit eigenen Timern. */
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

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <BreathCircle
        label={running ? phase.label : 'Bereit?'}
        countdown={running ? countdown : undefined}
        scale={scale}
        transitionSeconds={phase.kind === 'hold' ? 0 : phase.seconds}
      />
    </div>
  );
};

/** Berechnet Phase, Restsekunden und Skalierung aus der Audio-Position. */
function syncedState(pattern: BreathingPattern, time: number): {
  phase: BreathPhase;
  countdown: number;
  scale: number;
} {
  const cycle = pattern.phases.reduce((sum, p) => sum + p.seconds, 0);
  let pos = time % cycle;
  let phaseIndex = 0;
  for (let i = 0; i < pattern.phases.length; i++) {
    if (pos < pattern.phases[i].seconds) {
      phaseIndex = i;
      break;
    }
    pos -= pattern.phases[i].seconds;
  }
  const phase = pattern.phases[phaseIndex];
  const progress = Math.min(1, pos / phase.seconds);

  // Skalierung direkt aus der Position berechnen, damit der Kreis auch
  // nach Spulen oder Pause exakt zur Abspielposition passt
  let scale: number;
  if (phase.kind === 'in') {
    scale = SCALE_OUT + (SCALE_IN - SCALE_OUT) * progress;
  } else if (phase.kind === 'out') {
    scale = SCALE_IN - (SCALE_IN - SCALE_OUT) * progress;
  } else {
    // Halten: Skalierung der vorherigen Atemphase beibehalten
    scale = SCALE_OUT;
    for (let i = phaseIndex - 1; i >= phaseIndex - pattern.phases.length; i--) {
      const k = pattern.phases[(i + pattern.phases.length) % pattern.phases.length].kind;
      if (k === 'in') { scale = SCALE_IN; break; }
      if (k === 'out') { scale = SCALE_OUT; break; }
    }
  }

  return { phase, countdown: Math.max(1, Math.ceil(phase.seconds - pos)), scale };
}

/** Zum laufenden Audio synchronisierter Indikator. */
const SyncedBreathVisual: React.FC<{
  pattern: BreathingPattern;
  track: GuidedTrack;
  time: number;
  playing: boolean;
}> = ({ pattern, track, time, playing }) => {
  const { phase, countdown, scale } = syncedState(pattern, time);

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <BreathCircle
        label={playing ? phase.label : 'Pausiert'}
        countdown={playing ? countdown : undefined}
        scale={scale}
        transitionSeconds={0.15}
      />
      <p className="mt-8 flex items-center gap-2 text-xs text-slate-400">
        <AudioWaveform className="w-3.5 h-3.5 text-accent-400" />
        Synchron zu „{track.title}“ · {pattern.name}
      </p>
    </div>
  );
};

export const BreathingTab: React.FC<Props> = ({ player }) => {
  const [pattern, setPattern] = useState<BreathingPattern>(BREATHING_PATTERNS[0]);
  const [running, setRunning] = useState(false);

  // Läuft gerade ein Atem-Track mit bekanntem Muster? Dann zeigt das
  // große Panel den synchronisierten Indikator statt der manuellen Session.
  const syncedTrack = player.track?.pattern ? player.track : null;
  const syncedPattern = syncedTrack
    ? BREATHING_PATTERNS.find(p => p.id === syncedTrack.pattern) ?? null
    : null;

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
              !syncedPattern && pattern.id === p.id
                ? 'border-accent-400/40'
                : 'bg-night-900/70 border-night-800 hover:border-night-700'
            }`}
            style={!syncedPattern && pattern.id === p.id ? { background: 'rgba(245,192,96,0.07)' } : undefined}
          >
            <span className="block text-sm font-semibold text-slate-100">{p.name}</span>
            <span className="block text-xs text-slate-400 mt-1 leading-relaxed">{p.description}</span>
          </button>
        ))}
      </div>

      <div className="bg-night-900/70 border border-night-800 rounded-3xl overflow-hidden mb-10">
        {syncedPattern && syncedTrack ? (
          <SyncedBreathVisual
            pattern={syncedPattern}
            track={syncedTrack}
            time={player.time}
            playing={player.playing}
          />
        ) : (
          <>
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
          </>
        )}
      </div>

      <h3 className="text-lg font-semibold text-slate-100 mb-4">Geführte Atemübungen</h3>
      <TrackList tracks={BREATHING_TRACKS} currentId={player.track?.id} onSelect={player.select} />
    </div>
  );
};
