import React from 'react';
import {
  Activity, AudioWaveform, Bath, Bell, Bird, Brain, Bug, Car, Cat, CircleDot,
  CloudDrizzle, CloudLightning, CloudRain, Coffee, Droplets, Fish, Flame,
  Footprints, Heart, HeartPulse, Home, Moon, Mountain, Music, Pause, Play,
  Radio, Rocket, Shuffle, Snowflake, Sparkles, Sunset, Tent, Trash2, Trees,
  Volume2, Waves, Wind, X, Zap,
} from 'lucide-react';
import { MIX_CATEGORIES, MIX_SOUNDS } from '../data';
import { Mixer } from '../hooks/useMixer';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Activity, AudioWaveform, Bath, Bell, Bird, Brain, Bug, Car, Cat, CircleDot,
  CloudDrizzle, CloudLightning, CloudRain, Coffee, Droplets, Fish, Flame,
  Footprints, Heart, HeartPulse, Home, Moon, Mountain, Music, Radio, Rocket,
  Snowflake, Sparkles, Sunset, Tent, Trees, Waves, Wind, Zap,
};

const SOUND_BY_ID = Object.fromEntries(MIX_SOUNDS.map(s => [s.id, s]));

interface Props { mixer: Mixer }

/** Mitlaufende Mix-Leiste (im normalen Fluss, scrollt mit). */
const MixPanel: React.FC<{ mixer: Mixer }> = ({ mixer }) => {
  const { sounds, playing, activeCount, toggle, toggleRandomness, setAllRandomness, pause, resume, stopAll } = mixer;

  const activeIds = Object.keys(sounds);
  const allNatural = activeIds.length > 0 && activeIds.every(id => sounds[id].randomness);

  return (
    <div
      className="rounded-2xl border border-accent-400/30 shadow-[0_0_28px_rgba(245,192,96,0.08)] p-4 mb-8"
      style={{ background: 'rgba(14,22,46,0.85)', backdropFilter: 'blur(8px)' }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={playing ? pause : resume}
          aria-label={playing ? 'Mix pausieren' : 'Mix abspielen'}
          className="w-11 h-11 shrink-0 rounded-full text-night-950 flex items-center justify-center transition-opacity hover:opacity-80"
          style={{ background: '#f5c060' }}
        >
          {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        <div className="min-w-0 flex-grow">
          <p className="text-sm font-semibold text-slate-100">Dein Klangraum</p>
          <p className="text-xs text-slate-400">
            {activeCount} {activeCount === 1 ? 'Sound' : 'Sounds'} {playing ? 'aktiv' : 'pausiert'}
          </p>
        </div>

        {/* Master-Toggle: alle Sounds gleichzeitig auf "natürlich" */}
        <button
          onClick={() => setAllRandomness(!allNatural)}
          aria-pressed={allNatural}
          title="Natürliche Schwankung für alle Sounds"
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all ${
            allNatural ? 'text-night-950' : 'bg-night-800 text-slate-300 hover:bg-night-700'
          }`}
          style={allNatural ? { background: '#f5c060' } : undefined}
        >
          <Shuffle className="w-3.5 h-3.5" />
          alle natürlich
        </button>

        <button
          onClick={stopAll}
          aria-label="Mix leeren"
          className="p-2.5 text-slate-500 hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Aktive Sounds als Chips – Klick entfernt den Sound */}
      <div className="flex flex-wrap gap-2 mt-3.5">
        {activeIds.map(id => {
          const sound = SOUND_BY_ID[id];
          if (!sound) return null;
          const Icon = ICON_MAP[sound.icon] ?? Music;
          const natural = sounds[id].randomness;
          return (
            <span
              key={id}
              className="group flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-full text-xs font-medium border border-night-700 bg-night-900/70 text-slate-200"
            >
              <Icon className={`w-3.5 h-3.5 ${natural ? 'text-accent-400' : 'text-slate-400'}`} />
              {sound.name}
              <button
                onClick={() => toggleRandomness(id)}
                title={natural ? 'Natürlich aus' : 'Natürlich an'}
                className={`ml-0.5 p-0.5 rounded-full transition-colors ${
                  natural ? 'text-accent-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Shuffle className="w-3 h-3" />
              </button>
              <button
                onClick={() => toggle(id)}
                aria-label={`${sound.name} entfernen`}
                className="p-0.5 rounded-full text-slate-500 hover:text-red-400 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const SoundsTab: React.FC<Props> = ({ mixer }) => {
  const { sounds, playing, activeCount, toggle, setVolume, toggleRandomness } = mixer;

  return (
    <div className="fade-up">
      <h2 className="text-2xl font-semibold text-slate-100">Sounds</h2>
      <p className="text-sm text-slate-400 mt-1 mb-6">
        Kombiniere beliebig viele Klänge zu deinem eigenen Klangraum.
      </p>

      {activeCount > 0 && <MixPanel mixer={mixer} />}

      {MIX_CATEGORIES.map(category => (
        <section key={category} className="mb-8">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
            {category}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {MIX_SOUNDS.filter(s => s.category === category).map(sound => {
              const state = sounds[sound.id];
              const active = !!state;
              const Icon = ICON_MAP[sound.icon] ?? Music;

              return (
                <div
                  key={sound.id}
                  className={`rounded-2xl border transition-all duration-200 ${
                    active
                      ? 'border-accent-400/40 shadow-[0_0_28px_rgba(245,192,96,0.1)]'
                      : 'bg-night-900/80 border-night-800 hover:border-night-700'
                  }`}
                  style={active ? { background: 'rgba(245,192,96,0.07)' } : undefined}
                >
                  {/* Toggle-Button */}
                  <button
                    onClick={() => toggle(sound.id)}
                    className="w-full flex items-center gap-3 p-3.5 text-left"
                    aria-pressed={active}
                  >
                    <span
                      className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-colors ${
                        active
                          ? `text-night-950 ${active && playing ? 'pulse-soft' : ''}`
                          : 'bg-night-800 text-slate-400'
                      }`}
                      style={active ? { background: '#f5c060' } : undefined}
                    >
                      <Icon className="w-[18px] h-[18px]" />
                    </span>
                    <span className={`text-sm font-medium truncate ${active ? 'text-slate-50' : 'text-slate-300'}`}>
                      {sound.name}
                    </span>
                  </button>

                  {/* Lautstärke + Randomness-Toggle */}
                  {active && (
                    <div className="px-3.5 pb-3.5 space-y-2.5 fade-up">
                      <div className="flex items-center gap-2.5">
                        <Volume2 className="w-3.5 h-3.5 text-accent-400 shrink-0" />
                        <input
                          type="range"
                          min={0} max={1} step={0.01}
                          value={state.volume}
                          onChange={e => setVolume(sound.id, Number(e.target.value))}
                          style={{ '--fill': `${state.volume * 100}%` } as React.CSSProperties}
                          aria-label={`Lautstärke ${sound.name}`}
                        />
                      </div>

                      <button
                        onClick={() => toggleRandomness(sound.id)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          state.randomness
                            ? 'text-night-950'
                            : 'bg-night-800 text-slate-400 hover:bg-night-700 hover:text-slate-300'
                        }`}
                        style={state.randomness ? { background: '#f5c060' } : undefined}
                        aria-pressed={state.randomness}
                        title="Natürliche Lautstärke-Schwankung"
                      >
                        <Shuffle className="w-3 h-3" />
                        natürlich
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};
