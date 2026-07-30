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

const SCALE_IN = 1.35;
const SCALE_OUT = 1.0;

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

  const phase = pattern.phases[phaseIndex];

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
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-44 h-44 flex items-center justify-center">
        <div
          className="breath-circle absolute inset-0 rounded-full"
          style={{ background: 'var(--accent-soft)', transform: `scale(${scale})`, transitionDuration: `${transitionSeconds}s` }}
        />
        <div
          className="breath-circle absolute inset-4 rounded-full"
          style={{ background: 'var(--lav-soft)', transform: `scale(${scale})`, transitionDuration: `${transitionSeconds}s` }}
        />
        <div
          className="breath-circle w-[68px] h-[68px] rounded-full flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, var(--accent), var(--lav))',
            boxShadow: '0 10px 30px var(--shadow)',
            transform: `scale(${scale})`,
            transitionDuration: `${transitionSeconds}s`,
          }}
        >
          <span className="text-white font-extrabold text-xs">{running ? phase.label : 'Bereit?'}</span>
          {running && <span className="text-white/85 font-bold text-[10px] tabular-nums">{countdown}</span>}
        </div>
      </div>
    </div>
  );
};

export const BreathingTab: React.FC<Props> = ({ player, query }) => {
  const [pattern, setPattern] = useState<BreathingPattern>(BREATHING_PATTERNS[0]);
  const [running, setRunning] = useState(false);
  const { voice, setVoice, playCue } = useBreathingVoice();

  const q = query.trim().toLowerCase();
  const filteredTracks = useMemo(
    () => BREATHING_TRACKS.filter(t => t.title.toLowerCase().includes(q)),
    [q]
  );

  return (
    <div className="fade-up">
      <div className="text-xs font-extrabold uppercase tracking-wide mb-3" style={{ color: 'var(--text-faint)' }}>
        Atemmuster
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {BREATHING_PATTERNS.map(p => {
          const total = p.phases.reduce((s, ph) => s + ph.seconds, 0);
          const active = pattern.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => { setPattern(p); setRunning(false); }}
              className="rounded-2xl text-left overflow-hidden transition-all"
              style={{
                background: 'var(--surface)',
                boxShadow: '0 10px 22px -12px var(--shadow)',
                outline: active ? '2px solid var(--accent)' : 'none',
                outlineOffset: active ? '-2px' : undefined,
              }}
            >
              <div className="flex h-1.5">
                {p.phases.map((ph, i) => (
                  <div key={i} style={{ width: `${(ph.seconds / total) * 100}%`, background: PHASE_COLOR[ph.kind] }} />
                ))}
              </div>
              <div className="p-3.5">
                <span className="block text-xs font-extrabold mb-1.5" style={{ color: 'var(--text)' }}>{p.name}</span>
                <div className="flex flex-wrap gap-1 mb-2">
                  {p.phases.map((ph, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full"
                      style={{ background: PHASE_TINT[ph.kind], color: PHASE_COLOR[ph.kind] }}
                    >
                      {ph.label} {ph.seconds}s
                    </span>
                  ))}
                </div>
                <span className="block text-[10.5px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{p.description}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl p-5 mb-8 flex flex-col items-center" style={{ background: 'var(--surface)', boxShadow: '0 10px 26px -12px var(--shadow)' }}>
        <BreathSession pattern={pattern} running={running} playCue={playCue} />

        <div className="flex items-center justify-center gap-1.5 flex-wrap mb-4">
          <Volume2 className="w-3.5 h-3.5 mr-0.5" style={{ color: 'var(--text-faint)' }} />
          {BREATHING_VOICES.map(v => (
            <button
              key={v.id}
              onClick={() => setVoice(v.id)}
              aria-pressed={voice === v.id}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
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
          className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-colors"
          style={
            running
              ? { background: 'var(--surface-2)', color: 'var(--text)', boxShadow: 'inset 0 0 0 1px var(--border)' }
              : { background: 'var(--accent)', color: 'var(--accent-ink)' }
          }
        >
          {running ? (<><Square className="w-4 h-4" /> Beenden</>) : (<><Play className="w-4 h-4" /> Starten</>)}
        </button>
      </div>

      <div className="text-xs font-extrabold uppercase tracking-wide mb-3" style={{ color: 'var(--text-faint)' }}>
        Geführte Atemübungen
      </div>
      <TrackList tracks={filteredTracks} currentId={player.track?.id} onSelect={player.select} />
    </div>
  );
};
