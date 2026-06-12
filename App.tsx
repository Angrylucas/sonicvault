import React, { useState } from 'react';
import { Flower2, Wind, AudioWaveform, Moon } from 'lucide-react';
import { Tab, GuidedTrack } from './types';
import { useMixer } from './hooks/useMixer';
import { MeditationTab } from './components/MeditationTab';
import { BreathingTab } from './components/BreathingTab';
import { SoundsTab } from './components/SoundsTab';
import { GuidedPlayer } from './components/GuidedPlayer';

const TABS: { id: Tab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'meditation', label: 'Meditation', icon: Flower2 },
  { id: 'breathing', label: 'Atmung', icon: Wind },
  { id: 'sounds', label: 'Sounds', icon: AudioWaveform },
];

const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>('sounds');
  const [track, setTrack] = useState<GuidedTrack | null>(null);
  const mixer = useMixer();

  const selectTrack = (t: GuidedTrack) => {
    setTrack(prev => (prev?.id === t.id ? null : t));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Kopfzeile */}
      <header className="sticky top-0 z-20 bg-night-950/80 backdrop-blur-xl border-b border-night-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-400 to-lav-500 flex items-center justify-center">
              <Moon className="w-5 h-5 text-night-950" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-100 leading-tight">SonicVault</h1>
              <p className="text-[11px] text-slate-500 leading-tight">Ruhe · Klang · Atmung</p>
            </div>
          </div>

          {/* Desktop-Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-night-900/80 border border-night-800 rounded-full p-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  tab === id
                    ? 'bg-accent-400 text-night-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Inhalt */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-44 md:pb-40">
        {tab === 'meditation' && <MeditationTab currentId={track?.id} onSelect={selectTrack} />}
        {tab === 'breathing' && <BreathingTab currentId={track?.id} onSelect={selectTrack} />}
        {tab === 'sounds' && <SoundsTab mixer={mixer} />}
      </main>

      {/* Geführter Player */}
      {track && <GuidedPlayer track={track} onClose={() => setTrack(null)} />}

      {/* Mobile Bottom-Navigation */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-night-950/95 backdrop-blur-xl border-t border-night-900">
        <div className="grid grid-cols-3 h-16 pb-[env(safe-area-inset-bottom)]">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                tab === id ? 'text-accent-300' : 'text-slate-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default App;
