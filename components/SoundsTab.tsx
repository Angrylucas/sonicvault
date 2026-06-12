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

interface Props {
  mixer: Mixer;
}

export const SoundsTab: React.FC<Props> = ({ mixer }) => {
  const { sounds, playing, activeCount, toggle, setVolume, setRandomness, pause, resume, stopAll } = mixer;

  return (
    <div className="fade-up">
      <h2 className="text-2xl font-semibold text-slate-100">Sounds</h2>
      <p className="text-sm text-slate-400 mt-1 mb-6">
        Kombiniere beliebig viele Klänge zu deinem eigenen Klangraum. Pro Sound kannst du
        Lautstärke und Randomness (natürliche Schwankung) einstellen.
      </p>

      {MIX_CATEGORIES.map(category => (
        <section key={category} className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
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
                  className={`rounded-2xl border transition-all ${
                    active
                      ? 'bg-accent-400/10 border-accent-400/40 shadow-[0_0_24px_rgba(125,211,192,0.08)]'
                      : 'bg-night-900/70 border-night-800 hover:border-night-700'
                  }`}
                >
                  <button
                    onClick={() => toggle(sound.id)}
                    className="w-full flex items-center gap-3 p-3.5 text-left"
                    aria-pressed={active}
                  >
                    <span
                      className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-colors ${
                        active ? 'bg-accent-400 text-night-950' : 'bg-night-800 text-accent-300'
                      } ${active && playing ? 'pulse-soft' : ''}`}
                    >
                      <Icon className="w-[18px] h-[18px]" />
                    </span>
                    <span className={`text-sm font-medium truncate ${active ? 'text-slate-50' : 'text-slate-300'}`}>
                      {sound.name}
                    </span>
                  </button>

                  {active && (
                    <div className="px-3.5 pb-3.5 space-y-2.5 fade-up">
                      <div className="flex items-center gap-2.5">
                        <Volume2 className="w-3.5 h-3.5 text-accent-300 shrink-0" />
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.01}
                          value={state.volume}
                          onChange={e => setVolume(sound.id, Number(e.target.value))}
                          style={{ '--fill': `${state.volume * 100}%` } as React.CSSProperties}
                          aria-label={`Lautstärke ${sound.name}`}
                        />
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Shuffle className="w-3.5 h-3.5 text-lav-400 shrink-0" />
                        <input
                          type="range"
                          className="slider-lav"
                          min={0}
                          max={1}
                          step={0.01}
                          value={state.randomness}
                          onChange={e => setRandomness(sound.id, Number(e.target.value))}
                          style={{ '--fill': `${state.randomness * 100}%` } as React.CSSProperties}
                          aria-label={`Randomness ${sound.name}`}
                        />
                      </div>
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
          <div className="mx-auto max-w-3xl px-3 pb-2 md:pb-4">
            <div className="pointer-events-auto bg-night-850/95 backdrop-blur-xl border border-night-700 rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3">
              <button
                onClick={playing ? pause : resume}
                aria-label={playing ? 'Mix pausieren' : 'Mix abspielen'}
                className="w-11 h-11 shrink-0 rounded-full bg-accent-400 hover:bg-accent-300 text-night-950 flex items-center justify-center transition-colors"
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
                className="p-2.5 text-slate-400 hover:text-red-400 transition-colors"
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
