import React, { useState } from 'react';
import { Flower2, Wind, AudioWaveform } from 'lucide-react';
import { Tab } from './types';
import { MIX_SOUNDS } from './data';
import { useMixer } from './hooks/useMixer';
import { useGuidedPlayer } from './hooks/useGuidedPlayer';
import { MeditationTab } from './components/MeditationTab';
import { BreathingTab } from './components/BreathingTab';
import { SoundsTab } from './components/SoundsTab';
import { GuidedPlayer } from './components/GuidedPlayer';

const TABS: { id: Tab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'sounds',    label: 'Sounds',    icon: AudioWaveform },
  { id: 'meditation',label: 'Meditation',icon: Flower2 },
  { id: 'breathing', label: 'Atmung',    icon: Wind },
];

/** Hero im Moodist-Stil: Punktmuster, Serifen-Titel, Sound-Zähler. */
const Hero: React.FC = () => (
  <header className="relative text-center pt-20 pb-12 px-4 overflow-hidden">
    <div className="hero-pattern absolute inset-0 pointer-events-none" aria-hidden="true" />
    <div className="relative">
      <div className="mx-auto mb-6 w-11 h-11 rounded-full border border-night-700 bg-gradient-to-b from-night-950 to-night-900 flex items-center justify-center">
        <AudioWaveform className="w-5 h-5 text-slate-400" />
      </div>
      <h1 className="font-display text-4xl sm:text-5xl text-slate-50 leading-tight">
        SonicVault
        <span className="block text-2xl sm:text-3xl text-slate-300 mt-1">Klang für Ruhe & Fokus</span>
      </h1>
      <p className="text-sm text-slate-500 mt-4">Meditation · Atmung · Klangräume</p>
      <p className="inline-flex items-center gap-2 mt-6 px-4 py-1.5 rounded-full border border-night-800 bg-night-950 text-xs text-slate-400">
        <AudioWaveform className="w-3.5 h-3.5" />
        {MIX_SOUNDS.length} Sounds
      </p>
    </div>
  </header>
);

const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>('sounds');
  const mixer = useMixer();
  const player = useGuidedPlayer();

  return (
    <div className="min-h-screen flex flex-col bg-night-950">
      <Hero />

      {/* ── Tab-Navigation ── */}
      <div className="sticky top-0 z-20" style={{ background: 'rgba(9,9,11,0.88)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #27272a' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Desktop */}
          <nav className="hidden md:flex items-center justify-center gap-1 py-2">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  tab === id
                    ? 'bg-accent-400 text-night-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>

          {/* Mobile */}
          <nav className="flex md:hidden items-center gap-1 py-2">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-semibold transition-all ${
                  tab === id ? 'bg-accent-400 text-night-950' : 'text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Inhalt ── */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        {tab === 'sounds'    && <SoundsTab mixer={mixer} />}
        {tab === 'meditation'&& <MeditationTab currentId={player.track?.id} onSelect={player.select} />}
        {tab === 'breathing' && <BreathingTab  player={player} />}
      </main>

      {/* ── Geführter Player ── */}
      <GuidedPlayer player={player} />
    </div>
  );
};

export default App;
