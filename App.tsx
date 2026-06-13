import React, { useState } from 'react';
import { Flower2, Wind, AudioWaveform } from 'lucide-react';
import { Tab } from './types';
import { useMixer } from './hooks/useMixer';
import { useGuidedPlayer } from './hooks/useGuidedPlayer';
import { NightScene } from './components/NightScene';
import { MeditationTab } from './components/MeditationTab';
import { BreathingTab } from './components/BreathingTab';
import { SoundsTab } from './components/SoundsTab';
import { GuidedPlayer } from './components/GuidedPlayer';

const TABS: { id: Tab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'sounds',    label: 'Sounds',    icon: AudioWaveform },
  { id: 'meditation',label: 'Meditation',icon: Flower2 },
  { id: 'breathing', label: 'Atmung',    icon: Wind },
];

const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>('sounds');
  const mixer = useMixer();
  const player = useGuidedPlayer();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050c1a' }}>
      {/* ── Illustration ── */}
      <NightScene />

      {/* ── Tab-Navigation ── */}
      <div className="sticky top-0 z-20" style={{ background: 'rgba(5,12,26,0.88)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(28,38,71,0.7)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-1 py-2">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  tab === id
                    ? 'text-night-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                style={tab === id ? { background: '#f5c060' } : undefined}
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
                  tab === id ? 'text-night-950' : 'text-slate-400'
                }`}
                style={tab === id ? { background: '#f5c060' } : undefined}
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
