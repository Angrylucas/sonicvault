import React, { useState } from 'react';
import {
  Activity, AudioWaveform, Bath, Bell, Bird, BookOpen, Brain, Bug, Car, Cat, Check,
  Church, CircleDot, Clock, CloudDrizzle, CloudLightning, CloudRain, Coffee, Disc3,
  Droplets, Fan, Fish, Flame, Footprints, Heart, HeartPulse, Home, Landmark, Layers,
  Leaf, Moon, Mountain, Music, Pause, Plane, Play, Radio, Rocket, Sailboat, Save,
  Shuffle, Snowflake, Sparkles, Sunset, Tent, TrainFront, Trash2, Trees, Umbrella,
  Volume2, Waves, Wind, X, Zap,
} from 'lucide-react';
import { MIX_CATEGORIES, MIX_SOUNDS } from '../data';
import { Mixer } from '../hooks/useMixer';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Activity, AudioWaveform, Bath, Bell, Bird, BookOpen, Brain, Bug, Car, Cat, Church,
  CircleDot, Clock, CloudDrizzle, CloudLightning, CloudRain, Coffee, Disc3, Droplets,
  Fan, Fish, Flame, Footprints, Heart, HeartPulse, Home, Landmark, Leaf, Moon,
  Mountain, Music, Plane, Radio, Rocket, Sailboat, Snowflake, Sparkles, Sunset,
  Tent, TrainFront, Trees, Umbrella, Waves, Wind, Zap,
};

const CATEGORY_ICON: Record<string, React.FC<{ className?: string }>> = {
  'Regen & Gewitter': CloudRain,
  'Wasser': Waves,
  'Natur': Trees,
  'Tiere': Bird,
  'Orte & Atmosphäre': Home,
  'Klang & Musik': Music,
  'Noise & Frequenzen': Radio,
  'Heilfrequenzen': Sparkles,
  'Binaurale Beats': Brain,
};

const SOUND_BY_ID = Object.fromEntries(MIX_SOUNDS.map(s => [s.id, s]));

interface Props { mixer: Mixer }

/** Sticky Mix-Leiste: bleibt beim Scrollen unten sichtbar. */
const MixPanel: React.FC<{ mixer: Mixer }> = ({ mixer }) => {
  const { sounds, playing, activeCount, toggle, toggleRandomness, setAllRandomness, pause, resume, stopAll, saveSpace } = mixer;
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');

  const activeIds = Object.keys(sounds);
  const allNatural = activeIds.length > 0 && activeIds.every(id => sounds[id].randomness);

  const confirmSave = () => {
    saveSpace(name);
    setName('');
    setSaving(false);
  };

  return (
    <div
      className="sticky bottom-3 z-30 rounded-2xl border border-night-700 shadow-[0_8px_28px_rgba(0,0,0,0.55)] p-4 mt-4"
      style={{ background: 'rgba(24,24,27,0.95)', backdropFilter: 'blur(12px)' }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={playing ? pause : resume}
          aria-label={playing ? 'Mix pausieren' : 'Mix abspielen'}
          className="w-11 h-11 shrink-0 rounded-full bg-accent-400 text-night-950 flex items-center justify-center transition-opacity hover:opacity-80"
        >
          {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        <div className="min-w-0 flex-grow">
          <p className="text-sm font-semibold text-slate-100 font-heading">Dein Klangraum</p>
          <p className="text-xs text-slate-400">
            {activeCount} {activeCount === 1 ? 'Sound' : 'Sounds'} {playing ? 'aktiv' : 'pausiert'}
          </p>
        </div>

        {/* Master-Toggle: alle Sounds gleichzeitig auf "natürlich" */}
        <button
          onClick={() => setAllRandomness(!allNatural)}
          aria-pressed={allNatural}
          title="Natürliche Schwankung für alle Sounds"
          className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all ${
            allNatural ? 'bg-accent-400 text-night-950' : 'bg-night-800 text-slate-300 hover:bg-night-700'
          }`}
        >
          <Shuffle className="w-3.5 h-3.5" />
          alle natürlich
        </button>

        <button
          onClick={() => setSaving(s => !s)}
          aria-label="Klangraum speichern"
          title="Klangraum speichern"
          className="p-2.5 text-slate-300 hover:text-white transition-colors"
        >
          <Save className="w-5 h-5" />
        </button>

        <button
          onClick={stopAll}
          aria-label="Mix leeren"
          className="p-2.5 text-slate-500 hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Speichern-Eingabe */}
      {saving && (
        <div className="flex items-center gap-2 mt-3 fade-up">
          <input
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') confirmSave(); if (e.key === 'Escape') setSaving(false); }}
            placeholder="Name für diesen Klangraum…"
            maxLength={40}
            className="flex-grow bg-night-950 border border-night-700 rounded-full px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-night-700"
          />
          <button
            onClick={confirmSave}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-accent-400 text-night-950 transition-opacity hover:opacity-80"
          >
            <Check className="w-3.5 h-3.5" />
            Speichern
          </button>
        </div>
      )}

      {/* Master-Toggle auf Mobile (eigene Zeile) */}
      <button
        onClick={() => setAllRandomness(!allNatural)}
        aria-pressed={allNatural}
        className={`sm:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all mt-3 ${
          allNatural ? 'bg-accent-400 text-night-950' : 'bg-night-800 text-slate-300'
        }`}
      >
        <Shuffle className="w-3.5 h-3.5" />
        alle natürlich
      </button>

      {/* Aktive Sounds als Chips */}
      <div className="flex flex-wrap gap-2 mt-3.5">
        {activeIds.map(id => {
          const sound = SOUND_BY_ID[id];
          if (!sound) return null;
          const Icon = ICON_MAP[sound.icon] ?? Music;
          const natural = sounds[id].randomness;
          return (
            <span
              key={id}
              className="flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-full text-xs font-medium border border-night-700 bg-night-950/70 text-slate-200"
            >
              <Icon className={`w-3.5 h-3.5 ${natural ? 'text-slate-50' : 'text-slate-500'}`} />
              {sound.name}
              <button
                onClick={() => toggleRandomness(id)}
                title={natural ? 'Natürlich aus' : 'Natürlich an'}
                className={`ml-0.5 p-0.5 rounded-full transition-colors ${
                  natural ? 'text-slate-50' : 'text-slate-500 hover:text-slate-300'
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

/** Liste gespeicherter Klangräume zum Laden/Löschen. */
const SavedSpaces: React.FC<{ mixer: Mixer }> = ({ mixer }) => {
  const { savedSpaces, loadSpace, deleteSpace } = mixer;
  if (savedSpaces.length === 0) return null;

  return (
    <section className="mb-10">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2 justify-center">
        <Layers className="w-3.5 h-3.5" />
        Gespeicherte Klangräume
      </h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {savedSpaces.map(space => {
          const count = Object.keys(space.sounds).length;
          return (
            <span
              key={space.id}
              className="flex items-center gap-2 pl-1 pr-1.5 py-1 rounded-full border border-night-800 bg-night-900/70"
            >
              <button
                onClick={() => loadSpace(space.id)}
                className="flex items-center gap-2 pl-3 pr-1 py-1 rounded-full text-sm font-medium text-slate-100 hover:text-white transition-colors"
                title="Klangraum laden"
              >
                <Play className="w-3.5 h-3.5 text-slate-400" />
                {space.name}
                <span className="text-xs text-slate-500">{count}</span>
              </button>
              <button
                onClick={() => deleteSpace(space.id)}
                aria-label={`${space.name} löschen`}
                className="p-1 rounded-full text-slate-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </span>
          );
        })}
      </div>
    </section>
  );
};

/** Kategorie-Kopf im Moodist-Stil: vertikale Linie, Icon-Kreis, Serifen-Titel. */
const CategoryHeader: React.FC<{ category: string; first: boolean }> = ({ category, first }) => {
  const Icon = CATEGORY_ICON[category] ?? Music;
  return (
    <div className="flex flex-col items-center mb-6">
      {!first && (
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-night-700 mb-4" aria-hidden="true" />
      )}
      <div className="w-11 h-11 rounded-full border border-night-700 bg-gradient-to-b from-night-950 to-night-900 flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-slate-400" />
      </div>
      <h3 className="font-display text-xl text-slate-100 text-center">{category}</h3>
    </div>
  );
};

export const SoundsTab: React.FC<Props> = ({ mixer }) => {
  const { sounds, playing, activeCount, toggle, setVolume, toggleRandomness } = mixer;

  return (
    <div className="fade-up">
      <SavedSpaces mixer={mixer} />

      {MIX_CATEGORIES.map((category, ci) => (
        <section key={category} className="mb-10">
          <CategoryHeader category={category} first={ci === 0} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {MIX_SOUNDS.filter(s => s.category === category).map(sound => {
              const state = sounds[sound.id];
              const active = !!state;
              const Icon = ICON_MAP[sound.icon] ?? Music;

              return (
                <div
                  key={sound.id}
                  className={`relative rounded-xl transition-all duration-200 ${
                    active
                      ? 'border border-transparent shadow-[0_0_0_2px_#e4e4e7]'
                      : 'border border-night-800 hover:border-night-700'
                  }`}
                  style={{ background: 'linear-gradient(rgba(24,24,27,0.5), transparent)' }}
                >
                  {!active && <span className="tile-shine" aria-hidden="true" />}

                  <button
                    onClick={() => toggle(sound.id)}
                    className="w-full flex flex-col items-center pt-6 pb-5 px-3 text-center"
                    aria-pressed={active}
                  >
                    {/* Runder Icon-Badge mit Gradient-Ring */}
                    <span className="p-px rounded-full bg-gradient-to-b from-night-700 to-night-900">
                      <span className={`w-10 h-10 rounded-full bg-night-950 flex items-center justify-center transition-colors ${
                        active ? `text-slate-50 ${playing ? 'pulse-soft' : ''}` : 'text-slate-500'
                      }`}>
                        <Icon className="w-[18px] h-[18px]" />
                      </span>
                    </span>
                    <span className={`font-heading text-sm font-semibold mt-2.5 leading-snug ${
                      active ? 'text-slate-50' : 'text-slate-300'
                    }`}>
                      {sound.name}
                    </span>
                  </button>

                  {active && (
                    <div className="px-4 pb-5 space-y-3 fade-up flex flex-col items-center">
                      <div className="flex items-center gap-2.5 w-full max-w-[150px]">
                        <Volume2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
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
                            ? 'bg-accent-400 text-night-950'
                            : 'bg-night-800 text-slate-400 hover:bg-night-700 hover:text-slate-300'
                        }`}
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

      {activeCount > 0 && <MixPanel mixer={mixer} />}
    </div>
  );
};
