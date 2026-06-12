import React from 'react';
import {
  Activity, AudioWaveform, Bath, Bell, Bird, Brain, Bug, Car, Cat, CircleDot,
  CloudDrizzle, CloudLightning, CloudRain, Coffee, Droplets, Fish, Flame,
  Footprints, Heart, HeartPulse, Home, Moon, Mountain, Music, Pause, Play,
  Radio, Rocket, Shuffle, Snowflake, Sparkles, Sunset, Tent, Trash2, Trees,
  Volume2, Waves, Wind, Zap,
} from 'lucide-react';
import { MIX_CATEGORIES, MIX_SOUNDS } from '../data';
import { Mixer } from '../hooks/useMixer';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Activity, AudioWaveform, Bath, Bell, Bird, Brain, Bug, Car, Cat, CircleDot,
  CloudDrizzle, CloudLightning, CloudRain, Coffee, Droplets, Fish, Flame,
  Footprints, Heart, HeartPulse, Home, Moon, Mountain, Music, Radio, Rocket,
  Snowflake, Sparkles, Sunset, Tent, Trees, Waves, Wind, Zap,
};

interface Props { mixer: Mixer }

export const SoundsTab: React.FC<Props> = ({ mixer }) => {
  const { sounds, playing, activeCount, toggle, setVolume, toggleRandomness, pause, resume, stopAll } = mixer;

  return (
    <div className="fade-up">
      <h2 className="text-2xl font-semibold text-slate-100">Sounds</h2>
      <p className="text-sm text-slate-400 mt-1 mb-6">
        Kombiniere beliebig viele Klänge zu deinem eigenen Klangraum.
      </p>

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
                          : 'bg-night-800 text-slate-400 group-hover:bg-night-700'
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
                      {/* Lautstärke-Slider */}
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

                      {/* Randomness-Toggle (Pill) */}
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

      {/* Mix-Leiste */}
      {activeCount > 0 && (
        <div className="fixed bottom-16 md:bottom-0 inset-x-0 z-30 fade-up pointer-events-none">
          <div className="mx-auto max-w-3xl px-3 pb-2 md:pb-5">
            <div
              className="pointer-events-auto backdrop-blur-xl border border-night-700 rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3"
              style={{ background: 'rgba(14,22,46,0.95)' }}
            >
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
              <button
                onClick={stopAll}
                aria-label="Mix leeren"
                className="p-2.5 text-slate-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
