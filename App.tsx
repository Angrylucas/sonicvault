import React, { useState } from 'react';
import { AudioWaveform, Flower2, Moon, Search, Sun, Wind } from 'lucide-react';
import { Tab } from './types';
import { MIX_SOUNDS, MEDITATIONS, BREATHING_PATTERNS, BREATHING_TRACKS } from './data';
import { useMixer } from './hooks/useMixer';
import { useGuidedPlayer } from './hooks/useGuidedPlayer';
import { useTheme } from './hooks/useTheme';
import { MeditationTab } from './components/MeditationTab';
import { BreathingTab } from './components/BreathingTab';
import { SoundsTab } from './components/SoundsTab';
import { GuidedPlayer } from './components/GuidedPlayer';

const TABS: { id: Tab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'sounds',    label: 'Sounds',    icon: AudioWaveform },
  { id: 'meditation',label: 'Meditation',icon: Flower2 },
  { id: 'breathing', label: 'Atmung',    icon: Wind },
];

const TAB_META: Record<Tab, { title: string; sub: string; placeholder: string }> = {
  sounds: {
    title: 'Guten Abend.<br/>Wonach klingt es heute?',
    sub: `${MIX_SOUNDS.length} Sounds · frei kombinierbar`,
    placeholder: 'Sound suchen …',
  },
  meditation: {
    title: 'Einen Moment<br/>für dich.',
    sub: `${MEDITATIONS.length} geführte Sessions`,
    placeholder: 'Meditation suchen …',
  },
  breathing: {
    title: 'Atme ruhig<br/>und tief.',
    sub: `${BREATHING_PATTERNS.length} Muster · ${BREATHING_TRACKS.length} geführte Übungen`,
    placeholder: 'Übung suchen …',
  },
};

const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>('sounds');
  const [query, setQuery] = useState('');
  const mixer = useMixer();
  const player = useGuidedPlayer();
  const { theme, toggle: toggleTheme } = useTheme();

  const changeTab = (t: Tab) => {
    setTab(t);
    setQuery('');
  };

  const meta = TAB_META[tab];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      {/* ── Banner ── */}
      <header
        className="relative overflow-hidden px-5 pt-5 pb-14"
        style={{ background: 'linear-gradient(160deg, var(--accent-soft), var(--lav-soft) 130%)' }}
      >
        <div className="hero-pattern absolute inset-0 pointer-events-none opacity-30" style={{ color: 'var(--text)' }} aria-hidden="true" />
        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'var(--surface)', color: 'var(--accent)', boxShadow: '0 6px 16px var(--shadow)' }}
            >
              <AudioWaveform className="w-4 h-4" />
            </span>
            <span className="font-bold text-base" style={{ color: 'var(--text)' }}>SonicVault</span>
          </div>
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Zu Light Mode wechseln' : 'Zu Dark Mode wechseln'}
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-105"
            style={{ background: 'var(--surface)', color: 'var(--accent)', boxShadow: '0 8px 20px var(--shadow)' }}
          >
            {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>
        </div>

        <h1
          className="relative mt-5 text-2xl font-extrabold leading-tight"
          style={{ color: 'var(--text)' }}
          dangerouslySetInnerHTML={{ __html: meta.title }}
        />
        <p className="relative mt-1 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{meta.sub}</p>
      </header>

      {/* ── Suche (überlappt das Banner) ── */}
      <div className="relative px-5 -mt-8 z-10">
        <div
          className="flex items-center gap-2.5 rounded-full px-4 py-3"
          style={{ background: 'var(--surface)', boxShadow: '0 10px 26px var(--shadow)' }}
        >
          <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--text-faint)' }} />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={meta.placeholder}
            className="w-full bg-transparent outline-none text-sm font-semibold placeholder:font-medium"
            style={{ color: 'var(--text)' }}
          />
        </div>
      </div>

      {/* ── Desktop-Navigation ── */}
      <nav className="hidden md:flex items-center gap-1 px-6 pt-4 sticky top-0 z-20" style={{ background: 'var(--bg)' }}>
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => changeTab(id)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all"
            style={
              tab === id
                ? { background: 'var(--accent)', color: 'var(--accent-ink)' }
                : { color: 'var(--text-muted)' }
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </nav>

      {/* ── Inhalt ── */}
      <main className="flex-grow w-full max-w-6xl mx-auto px-5 pt-6 pb-28 md:pb-10">
        {tab === 'sounds'     && <SoundsTab mixer={mixer} query={query} />}
        {tab === 'meditation' && <MeditationTab currentId={player.track?.id} onSelect={player.select} query={query} />}
        {tab === 'breathing'  && <BreathingTab  player={player} query={query} />}
      </main>

      {/* ── Mobile Bottom-Tab-Bar ── */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-30 flex"
        style={{ background: 'var(--surface)', boxShadow: '0 -8px 24px var(--shadow)', padding: '10px 10px calc(10px + env(safe-area-inset-bottom, 0px))' }}
      >
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => changeTab(id)}
            className="flex-1 flex flex-col items-center gap-1 py-1 text-[10.5px] font-bold"
            style={{ color: tab === id ? 'var(--accent)' : 'var(--text-faint)' }}
          >
            <Icon className="w-[18px] h-[18px]" />
            {label}
          </button>
        ))}
      </nav>

      {/* ── Geführter Player ── */}
      <GuidedPlayer player={player} />
    </div>
  );
};

export default App;
