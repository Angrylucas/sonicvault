import React, { useMemo, useState } from 'react';
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

// Kategorien wechseln sich zwischen Mint (accent) und Lavendel (lav) ab.
const CATEGORY_TINT: Record<string, 'accent' | 'lav'> = {
  'Regen & Gewitter': 'accent',
  'Wasser': 'lav',
  'Natur': 'accent',
  'Tiere': 'lav',
  'Orte & Atmosphäre': 'accent',
  'Klang & Musik': 'lav',
  'Noise & Frequenzen': 'accent',
  'Heilfrequenzen': 'lav',
  'Binaurale Beats': 'accent',
};

const SOUND_BY_ID = Object.fromEntries(MIX_SOUNDS.map(s => [s.id, s]));

interface Props {
  mixer: Mixer;
  query: string;
}

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
      className="sticky bottom-[84px] md:bottom-3 z-20 rounded-2xl p-4 mt-4"
      style={{ background: 'var(--surface)', boxShadow: '0 14px 30px var(--shadow)' }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={playing ? pause : resume}
          aria-label={playing ? 'Mix pausieren' : 'Mix abspielen'}
          className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        <div className="min-w-0 flex-grow">
          <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>Dein Klangraum</p>
          <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
            {activeCount} {activeCount === 1 ? 'Sound' : 'Sounds'} {playing ? 'aktiv' : 'pausiert'}
          </p>
        </div>

        <button
          onClick={() => setAllRandomness(!allNatural)}
          aria-pressed={allNatural}
          title="Natürliche Schwankung für alle Sounds"
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all"
          style={allNatural ? { background: 'var(--accent)', color: 'var(--accent-ink)' } : { background: 'var(--surface-2)', color: 'var(--text-muted)' }}
        >
          <Shuffle className="w-3.5 h-3.5" />
          alle natürlich
        </button>

        <button
          onClick={() => setSaving(s => !s)}
          aria-label="Klangraum speichern"
          title="Klangraum speichern"
          className="p-2.5 transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          <Save className="w-5 h-5" />
        </button>

        <button
          onClick={stopAll}
          aria-label="Mix leeren"
          className="p-2.5 text-red-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {saving && (
        <div className="flex items-center gap-2 mt-3 fade-up">
          <input
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') confirmSave(); if (e.key === 'Escape') setSaving(false); }}
            placeholder="Name für diesen Klangraum…"
            maxLength={40}
            className="flex-grow rounded-full px-4 py-2 text-sm font-medium focus:outline-none"
            style={{ background: 'var(--surface-2)', color: 'var(--text)' }}
          />
          <button
            onClick={confirmSave}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            <Check className="w-3.5 h-3.5" />
            Speichern
          </button>
        </div>
      )}

      <button
        onClick={() => setAllRandomness(!allNatural)}
        aria-pressed={allNatural}
        className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all mt-3"
        style={allNatural ? { background: 'var(--accent)', color: 'var(--accent-ink)' } : { background: 'var(--surface-2)', color: 'var(--text-muted)' }}
      >
        <Shuffle className="w-3.5 h-3.5" />
        alle natürlich
      </button>

      <div className="flex flex-wrap gap-2 mt-3.5">
        {activeIds.map(id => {
          const sound = SOUND_BY_ID[id];
          if (!sound) return null;
          const Icon = ICON_MAP[sound.icon] ?? Music;
          const natural = sounds[id].randomness;
          return (
            <span
              key={id}
              className="flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'var(--surface-2)', color: 'var(--text)' }}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: natural ? 'var(--accent)' : 'var(--text-faint)' }} />
              {sound.name}
              <button
                onClick={() => toggleRandomness(id)}
                title={natural ? 'Natürlich aus' : 'Natürlich an'}
                className="ml-0.5 p-0.5 rounded-full transition-colors"
                style={{ color: natural ? 'var(--accent)' : 'var(--text-faint)' }}
              >
                <Shuffle className="w-3 h-3" />
              </button>
              <button
                onClick={() => toggle(id)}
                aria-label={`${sound.name} entfernen`}
                className="p-0.5 rounded-full text-red-400 hover:text-red-500 transition-colors"
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
    <section className="mb-8">
      <h3 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: 'var(--text-faint)' }}>
        <Layers className="w-3.5 h-3.5" />
        Gespeicherte Klangräume
      </h3>
      <div className="flex flex-wrap gap-2">
        {savedSpaces.map(space => {
          const count = Object.keys(space.sounds).length;
          return (
            <span
              key={space.id}
              className="flex items-center gap-2 pl-1 pr-1.5 py-1 rounded-full"
              style={{ background: 'var(--surface)', boxShadow: '0 4px 12px var(--shadow)' }}
            >
              <button
                onClick={() => loadSpace(space.id)}
                className="flex items-center gap-2 pl-3 pr-1 py-1 rounded-full text-sm font-bold transition-colors"
                style={{ color: 'var(--text)' }}
                title="Klangraum laden"
              >
                <Play className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                {space.name}
                <span className="text-xs font-medium" style={{ color: 'var(--text-faint)' }}>{count}</span>
              </button>
              <button
                onClick={() => deleteSpace(space.id)}
                aria-label={`${space.name} löschen`}
                className="p-1 rounded-full text-red-400 hover:text-red-500 transition-colors"
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

export const SoundsTab: React.FC<Props> = ({ mixer, query }) => {
  const { sounds, playing, activeCount, toggle, setVolume, toggleRandomness } = mixer;
  const q = query.trim().toLowerCase();

  const groups = useMemo(() => {
    return MIX_CATEGORIES
      .map(category => ({
        category,
        items: MIX_SOUNDS.filter(s => s.category === category && s.name.toLowerCase().includes(q)),
      }))
      .filter(g => g.items.length > 0);
  }, [q]);

  return (
    <div className="fade-up">
      <SavedSpaces mixer={mixer} />

      {groups.length === 0 && (
        <p className="text-center text-sm py-16" style={{ color: 'var(--text-faint)' }}>Keine Sounds gefunden.</p>
      )}

      {groups.map(({ category, items }) => {
        const tint = CATEGORY_TINT[category] ?? 'accent';
        return (
          <section key={category} className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: `var(--${tint})` }} />
              <h3 className="text-sm font-extrabold" style={{ color: 'var(--text)' }}>{category}</h3>
              <span className="text-xs font-bold" style={{ color: 'var(--text-faint)' }}>{items.length}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3">
              {items.map(sound => {
                const state = sounds[sound.id];
                const active = !!state;
                const Icon = ICON_MAP[sound.icon] ?? Music;

                return (
                  <div
                    key={sound.id}
                    className="rounded-2xl transition-all duration-200"
                    style={{
                      background: active ? 'var(--accent)' : 'var(--surface)',
                      boxShadow: active ? '0 12px 26px -10px var(--shadow)' : '0 10px 22px -12px var(--shadow)',
                    }}
                  >
                    <button
                      onClick={() => toggle(sound.id)}
                      className="w-full flex flex-col items-center pt-4 pb-3.5 px-2 text-center"
                      aria-pressed={active}
                    >
                      <span
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                        style={
                          active
                            ? { background: 'rgba(255,255,255,0.28)', color: 'var(--accent-ink)' }
                            : { background: `var(--${tint}-soft)`, color: `var(--${tint})` }
                        }
                      >
                        <Icon className={`w-[17px] h-[17px] ${active && playing ? 'pulse-soft' : ''}`} />
                      </span>
                      <span
                        className="text-[11px] font-bold mt-2 leading-snug min-h-[2.4em] flex items-start justify-center"
                        style={{ color: active ? 'var(--accent-ink)' : 'var(--text)' }}
                      >
                        {sound.name}
                      </span>
                    </button>

                    {active && (
                      <div className="px-3 pb-3.5 space-y-2.5 fade-up flex flex-col items-center">
                        <div className="flex items-center gap-2 w-full max-w-[110px]">
                          <Volume2 className="w-3 h-3 shrink-0" style={{ color: 'rgba(255,255,255,0.8)' }} />
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
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all"
                          style={
                            state.randomness
                              ? { background: '#fff', color: 'var(--accent)' }
                              : { background: 'rgba(255,255,255,0.22)', color: 'var(--accent-ink)' }
                          }
                          aria-pressed={state.randomness}
                          title="Natürliche Lautstärke-Schwankung"
                        >
                          <Shuffle className="w-2.5 h-2.5" />
                          natürlich
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {activeCount > 0 && <MixPanel mixer={mixer} />}
    </div>
  );
};
