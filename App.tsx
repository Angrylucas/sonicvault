import React, { useState } from 'react';
import { AudioWaveform, Flower2, Moon, Search, Sun, Wind } from 'lucide-react';
import { Tab } from './types';
import { MIX_SOUNDS, MEDITATIONS, BREATHING_TRACKS } from './data';
import { useMixer } from './hooks/useMixer';
import { useGuidedPlayer } from './hooks/useGuidedPlayer';
import { useTheme } from './hooks/useTheme';
import { MeditationTab } from './components/MeditationTab';
import { BreathingTab } from './components/BreathingTab';
import { SoundsTab } from './components/SoundsTab';
import { Dock } from './components/Dock';
import { usePrefs } from './hooks/usePrefs';
import { useSleepTimer } from './hooks/useSleepTimer';
import { useToast } from './hooks/useToast';

const TABS: { id: Tab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'sounds',    label: 'Sounds',    icon: AudioWaveform },
  { id: 'meditation',label: 'Meditation',icon: Flower2 },
  { id: 'breathing', label: 'Breathing', icon: Wind },
];

function greeting(hour = new Date().getHours()): string {
  if (hour >= 5 && hour < 12) return 'Good morning.';
  if (hour >= 12 && hour < 18) return 'Good afternoon.';
  if (hour >= 18 && hour < 23) return 'Good evening.';
  return 'Still awake?';
}

const TAB_META: Record<Tab, { title: () => [string, string]; sub: string; placeholder: string }> = {
  sounds: {
    title: () => [greeting(), 'Find your sound.'],
    sub: `${MIX_SOUNDS.length} sounds · mix them freely`,
    placeholder: 'Search sounds …',
  },
  meditation: {
    title: () => ['A moment', 'for you.'],
    sub: `${MEDITATIONS.length} guided sessions`,
    placeholder: 'Search meditations …',
  },
  breathing: {
    title: () => ['Breathe slowly', 'and deeply.'],
    sub: `${BREATHING_TRACKS.length} guided exercises`,
    placeholder: 'Search exercises …',
  },
};

// Höhe der schwebenden Leisten (inkl. Abstand), hält den Inhalt frei.
const MIX_BAR_HEIGHT = 68;
const PLAYER_HEIGHT = 104;

const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>('sounds');
  const [query, setQuery] = useState('');
  const mixer = useMixer();
  const player = useGuidedPlayer();
  const { theme, toggle: toggleTheme } = useTheme();
  const prefs = usePrefs();
  const toast = useToast();
  const timer = useSleepTimer(seconds => {
    mixer.fadeOutAndPause(seconds);
    player.fadeOutAndPause(seconds);
  });

  const changeTab = (t: Tab) => {
    setTab(t);
    setQuery('');
  };

  const clearQuery = () => setQuery('');
  const meta = TAB_META[tab];
  const title = meta.title();

  return (
    <div
      className="min-h-dvh flex flex-col"
      style={{ background: 'var(--bg)', '--dock-h': `${(mixer.activeCount > 0 ? MIX_BAR_HEIGHT : 0) + (player.track ? PLAYER_HEIGHT : 0)}px` } as React.CSSProperties}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-full text-sm font-bold"
        style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
      >
        Skip to content
      </a>

      {/* ── Banner ── */}
      <header
        className="relative overflow-hidden px-5 pt-4 pb-12"
        style={{ background: 'linear-gradient(160deg, var(--accent-soft), var(--lav-soft) 130%)' }}
      >
        <div className="hero-pattern absolute inset-0 pointer-events-none opacity-30" style={{ color: 'var(--text)' }} aria-hidden="true" />
        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'var(--surface)', color: 'var(--accent)', boxShadow: '0 6px 16px var(--shadow)' }}
            >
              <AudioWaveform className="w-4 h-4" aria-hidden="true" />
            </span>
            <span className="font-bold text-base" style={{ color: 'var(--text)' }}>SonicVault</span>
          </div>
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-105"
            style={{ background: 'var(--surface)', color: 'var(--accent)', boxShadow: '0 8px 20px var(--shadow)' }}
          >
            {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" aria-hidden="true" /> : <Moon className="w-[18px] h-[18px]" aria-hidden="true" />}
          </button>
        </div>

        <h1
          className="relative mt-4 text-2xl font-extrabold leading-tight"
          style={{ color: 'var(--text)' }}
        >
          <span className="block">{title[0]}</span>
          <span className="block">{title[1]}</span>
        </h1>
        <p className="relative mt-1 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{meta.sub}</p>
      </header>

      {/* ── Suche (überlappt das Banner) ── */}
      <div className="relative px-5 -mt-8 z-10">
        <label
          className="search-shell flex items-center gap-2.5 rounded-full px-4 py-3 cursor-text"
          style={{ background: 'var(--surface)', boxShadow: '0 10px 26px var(--shadow)' }}
        >
          <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--text-faint)' }} aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={meta.placeholder}
            aria-label={meta.placeholder.replace(' …', '')}
            autoComplete="off"
            className="w-full bg-transparent text-sm font-semibold placeholder:font-medium placeholder:text-[color:var(--text-faint)]"
            style={{ color: 'var(--text)' }}
          />
        </label>
      </div>

      {/* ── Desktop-Navigation ── */}
      <nav
        aria-label="Main navigation"
        className="hidden md:flex items-center gap-1 px-6 pt-4 sticky top-0 z-20"
        style={{ background: 'var(--bg)' }}
      >
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => changeTab(id)}
            aria-current={tab === id ? 'page' : undefined}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all"
            style={
              tab === id
                ? { background: 'var(--accent)', color: 'var(--accent-ink)' }
                : { color: 'var(--text-muted)' }
            }
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>

      {/* ── Inhalt ── */}
      <main id="main" tabIndex={-1} className="flex-grow w-full max-w-6xl mx-auto px-5 pt-6 pb-[calc(var(--nav-h)_+_var(--dock-h)_+_1.5rem)] md:pb-[calc(var(--dock-h)_+_2.5rem)]">
        {tab === 'sounds'     && <SoundsTab mixer={mixer} prefs={prefs} toast={toast} query={query} onClearQuery={clearQuery} />}
        {tab === 'meditation' && <MeditationTab currentId={player.track?.id} playing={player.playing} onSelect={player.select} query={query} onClearQuery={clearQuery} />}
        {tab === 'breathing'  && <BreathingTab  player={player} query={query} onClearQuery={clearQuery} />}
      </main>

      {/* ── Mobile Bottom-Tab-Bar ── */}
      <nav
        aria-label="Main navigation (mobile)"
        className="md:hidden fixed bottom-0 inset-x-0 z-30 flex items-start px-2.5 pt-2"
        style={{ height: 'var(--nav-h)', background: 'var(--surface)', boxShadow: '0 -8px 24px var(--shadow)' }}
      >
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => changeTab(id)}
            aria-current={tab === id ? 'page' : undefined}
            className="flex-1 flex flex-col items-center justify-center gap-1 min-h-[44px] text-xs font-bold"
            style={{ color: tab === id ? 'var(--accent)' : 'var(--text-faint)' }}
          >
            <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>

      {/* ── Geführter Player ── */}
      <Dock mixer={mixer} player={player} timer={timer} toast={toast} />
    </div>
  );
};

export default App;
