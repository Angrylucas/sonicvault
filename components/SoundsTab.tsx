import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Heart, Layers, Music, Play, Shuffle, Sparkles, Trash2, Volume2 } from 'lucide-react';
import { MIX_CATEGORIES, MIX_SOUNDS, STARTER_ROOMS } from '../data';
import { MixSound } from '../types';
import { Mixer } from '../hooks/useMixer';
import { Prefs } from '../hooks/usePrefs';
import { ToastApi } from '../hooks/useToast';
import { ICON_MAP, SOUND_BY_ID } from './soundIcons';
import { EmptyState } from './EmptyState';

// Kategorien wechseln sich zwischen Mint (accent) und Lavendel (lav) ab.
const CATEGORY_TINT: Record<string, 'accent' | 'lav'> = {
  'Rain & Thunder': 'accent',
  'Water': 'lav',
  'Nature': 'accent',
  'Animals': 'lav',
  'Places & Ambience': 'accent',
  'Sound & Music': 'lav',
  'Noise & Frequencies': 'accent',
  'Healing Frequencies': 'lav',
  'Binaural Beats': 'accent',
};

interface Props {
  mixer: Mixer;
  prefs: Prefs;
  toast: ToastApi;
  query: string;
  onClearQuery: () => void;
}

const IconBtn = 'hit w-7 h-7 flex items-center justify-center rounded-full transition-colors';

const slug = (category: string) => 'cat-' + category.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/** Kompakte Pille zum schnellen Ein-/Ausschalten (Favoriten, Zuletzt). */
const SoundPill: React.FC<{ id: string; active: boolean; onToggle: (id: string) => void }> = ({ id, active, onToggle }) => {
  const sound = SOUND_BY_ID[id];
  if (!sound) return null;
  const Icon = ICON_MAP[sound.icon] ?? Music;
  return (
    <button
      onClick={() => onToggle(id)}
      aria-pressed={active}
      className="flex items-center gap-2 min-h-[44px] px-4 rounded-full text-sm font-bold transition-colors shrink-0"
      style={active ? { background: 'var(--accent)', color: 'var(--accent-ink)' } : { background: 'var(--surface)', color: 'var(--text)', boxShadow: '0 4px 12px var(--shadow)' }}
    >
      <Icon className="w-4 h-4" aria-hidden="true" />
      {sound.name}
    </button>
  );
};

/** Einstiege oben: Starter-Räume, gespeicherte Räume, Favoriten, Zuletzt. */
const QuickStart: React.FC<{ mixer: Mixer; prefs: Prefs; toast: ToastApi; onToggle: (id: string) => void }> = ({ mixer, prefs, toast, onToggle }) => {
  const { sounds, savedSpaces, applySounds, loadSpace, deleteSpace, restoreSpace } = mixer;
  const recents = prefs.recents.filter(id => !prefs.favorites.includes(id)).slice(0, 6);

  const removeSpace = (id: string) => {
    const index = savedSpaces.findIndex(s => s.id === id);
    const space = savedSpaces[index];
    if (!space) return;
    deleteSpace(id);
    toast.show(`“${space.name}” deleted`, 'Undo', () => restoreSpace(space, index));
  };

  return (
    <div className="space-y-6 mb-8">
      <section aria-labelledby="starter-h">
        <h2 id="starter-h" className="text-sm font-extrabold mb-3 flex items-center gap-2" style={{ color: 'var(--text)' }}>
          <Sparkles className="w-4 h-4" style={{ color: 'var(--accent)' }} aria-hidden="true" />
          Quick start
        </h2>
        <div className="rail flex gap-2.5 overflow-x-auto -mx-5 px-5 pb-2 snap-x">
          {STARTER_ROOMS.map(room => (
            <button
              key={room.id}
              onClick={() => applySounds(room.sounds)}
              className="snap-start shrink-0 w-44 text-left rounded-2xl p-4 transition-transform hover:-translate-y-0.5 min-h-[44px]"
              style={{ background: 'var(--surface)', boxShadow: '0 10px 22px -12px var(--shadow)' }}
            >
              <span className="flex items-center gap-2 text-sm font-extrabold" style={{ color: 'var(--text)' }}>
                <Play className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                {room.name}
              </span>
              <span className="block text-xs font-semibold mt-1" style={{ color: 'var(--text-muted)' }}>{room.hint}</span>
            </button>
          ))}
        </div>
      </section>

      {savedSpaces.length > 0 && (
        <section aria-labelledby="saved-spaces-h">
          <h2 id="saved-spaces-h" className="text-sm font-extrabold mb-3 flex items-center gap-2" style={{ color: 'var(--text)' }}>
            <Layers className="w-4 h-4" style={{ color: 'var(--lav)' }} aria-hidden="true" />
            Your soundscapes
          </h2>
          <div className="flex flex-wrap gap-2">
            {savedSpaces.map(space => {
              const count = Object.keys(space.sounds).length;
              return (
                <span
                  key={space.id}
                  className="flex items-center gap-1 pl-1 pr-1.5 py-1 rounded-full"
                  style={{ background: 'var(--surface)', boxShadow: '0 4px 12px var(--shadow)' }}
                >
                  <button
                    onClick={() => loadSpace(space.id)}
                    className="flex items-center gap-2 min-h-[44px] pl-3 pr-2 rounded-full text-sm font-bold"
                    style={{ color: 'var(--text)' }}
                    title="Load soundscape"
                  >
                    <Play className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                    {space.name}
                    <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{count}</span>
                  </button>
                  <button
                    onClick={() => removeSpace(space.id)}
                    aria-label={`Delete ${space.name}`}
                    className={IconBtn}
                    style={{ color: 'var(--danger)' }}
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </span>
              );
            })}
          </div>
        </section>
      )}

      {prefs.favorites.length > 0 && (
        <section aria-labelledby="fav-h">
          <h2 id="fav-h" className="text-sm font-extrabold mb-3 flex items-center gap-2" style={{ color: 'var(--text)' }}>
            <Heart className="w-4 h-4" style={{ color: 'var(--lav)' }} aria-hidden="true" />
            Favorites
          </h2>
          <div className="flex flex-wrap gap-2">
            {prefs.favorites.map(id => <SoundPill key={id} id={id} active={!!sounds[id]} onToggle={onToggle} />)}
          </div>
        </section>
      )}

      {recents.length > 0 && (
        <section aria-labelledby="recent-h">
          <h2 id="recent-h" className="text-sm font-extrabold mb-3" style={{ color: 'var(--text)' }}>Recently used</h2>
          <div className="flex flex-wrap gap-2">
            {recents.map(id => <SoundPill key={id} id={id} active={!!sounds[id]} onToggle={onToggle} />)}
          </div>
        </section>
      )}
    </div>
  );
};

interface TileProps {
  sound: MixSound;
  tint: 'accent' | 'lav';
  active: boolean;
  volume: number;
  randomness: boolean;
  playing: boolean;
  favorite: boolean;
  onToggle: (id: string) => void;
  onFavorite: (id: string) => void;
  onVolume: (id: string, v: number) => void;
  onRandom: (id: string) => void;
}

/** Kissen-Kachel eines Sounds. Memoisiert: nur betroffene Kacheln rendern neu. */
const SoundTile = memo<TileProps>(({ sound, tint, active, volume, randomness, playing, favorite, onToggle, onFavorite, onVolume, onRandom }) => {
  const Icon = ICON_MAP[sound.icon] ?? Music;

  return (
    <div
      className="rounded-2xl transition-all duration-200"
      style={{
        background: active ? 'var(--accent)' : 'var(--surface)',
        boxShadow: active ? '0 12px 26px -10px var(--shadow)' : '0 10px 22px -12px var(--shadow)',
        '--range-fill': 'var(--accent-ink)',
        '--range-track': 'var(--veil)',
      } as React.CSSProperties}
    >
      <button
        onClick={() => onToggle(sound.id)}
        className="w-full flex flex-col items-center pt-4 pb-3.5 px-2 text-center rounded-2xl"
        aria-pressed={active}
      >
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          style={
            active
              ? { background: 'var(--veil)', color: 'var(--accent-ink)' }
              : { background: `var(--${tint}-soft)`, color: `var(--${tint})` }
          }
        >
          <Icon className={`w-[17px] h-[17px] ${active && playing ? 'pulse-soft' : ''}`} aria-hidden="true" />
        </span>
        <span
          className="text-xs font-bold mt-2 leading-snug min-h-[2.4em] flex items-start justify-center"
          style={{ color: active ? 'var(--accent-ink)' : 'var(--text)' }}
        >
          {sound.name}
        </span>
      </button>

      {active && (
        <div className="px-3 pb-3.5 space-y-2 fade-up flex flex-col items-center">
          <div className="flex items-center gap-2 w-full max-w-[110px] py-2">
            <Volume2 className="w-3 h-3 shrink-0" style={{ color: 'var(--accent-ink)' }} aria-hidden="true" />
            <input
              type="range"
              min={0} max={1} step={0.01}
              value={volume}
              onChange={e => onVolume(sound.id, Number(e.target.value))}
              style={{ '--fill': `${volume * 100}%` } as React.CSSProperties}
              aria-label={`Volume ${sound.name}`}
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onRandom(sound.id)}
              className="hit flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all"
              style={
                randomness
                  ? { background: 'var(--accent-ink)', color: 'var(--accent)' }
                  : { background: 'var(--veil)', color: 'var(--accent-ink)' }
              }
              aria-pressed={randomness}
              title="Natural volume variation"
            >
              <Shuffle className="w-2.5 h-2.5" aria-hidden="true" />
              natural
            </button>
            <button
              onClick={() => onFavorite(sound.id)}
              aria-pressed={favorite}
              aria-label={`Favorite ${sound.name}`}
              className="hit w-7 h-7 flex items-center justify-center rounded-full"
              style={{ background: favorite ? 'var(--accent-ink)' : 'var(--veil)', color: favorite ? 'var(--accent)' : 'var(--accent-ink)' }}
            >
              <Heart className="w-3 h-3" fill={favorite ? 'currentColor' : 'none'} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export const SoundsTab: React.FC<Props> = ({ mixer, prefs, toast, query, onClearQuery }) => {
  const { sounds, playing, toggle, setVolume, toggleRandomness } = mixer;
  const { favorites, toggleFavorite, noteRecent } = prefs;
  const q = query.trim().toLowerCase();

  // Stabiler Toggle-Callback (Kacheln sind memoisiert): merkt sich neu aktivierte Sounds als "zuletzt".
  const soundsRef = useRef(sounds);
  useEffect(() => { soundsRef.current = sounds; }, [sounds]);
  const handleToggle = useCallback((id: string) => {
    if (!soundsRef.current[id]) noteRecent(id);
    toggle(id);
  }, [toggle, noteRecent]);

  const groups = useMemo(() => {
    return MIX_CATEGORIES
      .map(category => ({
        category,
        items: MIX_SOUNDS.filter(s => s.category === category && s.name.toLowerCase().includes(q)),
      }))
      .filter(g => g.items.length > 0);
  }, [q]);

  const jumpTo = (category: string) => {
    const el = document.getElementById(slug(category));
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="fade-up">
      {!q && <QuickStart mixer={mixer} prefs={prefs} toast={toast} onToggle={handleToggle} />}

      {!q && (
        <nav aria-label="Sound categories" className="rail flex gap-2 overflow-x-auto -mx-5 px-5 pb-3 mb-4">
          {MIX_CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => jumpTo(c)}
              className="shrink-0 min-h-[44px] px-4 rounded-full text-xs font-bold"
              style={{ background: 'var(--surface)', color: 'var(--text-muted)', boxShadow: '0 4px 12px var(--shadow)' }}
            >
              {c}
            </button>
          ))}
        </nav>
      )}

      {groups.length === 0 && <EmptyState what="sounds" query={query} onClear={onClearQuery} />}

      {groups.map(({ category, items }) => {
        const tint = CATEGORY_TINT[category] ?? 'accent';
        return (
          <section key={category} id={slug(category)} aria-labelledby={`${slug(category)}-h`} className="mb-8 scroll-mt-16">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: `var(--${tint})` }} aria-hidden="true" />
              <h2 id={`${slug(category)}-h`} className="text-sm font-extrabold" style={{ color: 'var(--text)' }}>{category}</h2>
              <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>{items.length}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 items-start">
              {items.map(sound => {
                const state = sounds[sound.id];
                return (
                  <SoundTile
                    key={sound.id}
                    sound={sound}
                    tint={tint}
                    active={!!state}
                    volume={state?.volume ?? 0}
                    randomness={state?.randomness ?? false}
                    playing={playing}
                    favorite={favorites.includes(sound.id)}
                    onToggle={handleToggle}
                    onFavorite={toggleFavorite}
                    onVolume={setVolume}
                    onRandom={toggleRandomness}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};
