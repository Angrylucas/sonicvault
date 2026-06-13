export type Tab = 'meditation' | 'breathing' | 'sounds';

/** Geführter Audio-Track (Meditation oder Atemübung) */
export interface GuidedTrack {
  id: string;
  filename: string;
  title: string;
  duration: string; // z. B. "10:32"
  tag: string;      // z. B. "Schlaf", "Body Scan"
}

/** Loopbarer Ambient-Sound für den Mixer */
export interface MixSound {
  id: string;
  filename: string;
  name: string;
  icon: string;     // lucide-Icon-Name (siehe ICON_MAP in SoundsTab)
  category: string; // Anzeigename der Kategorie
}

/** Zustand eines aktiven Sounds im Mixer */
export interface MixerSoundState {
  volume: number;      // 0..1
  randomness: boolean; // natürliche Lautstärkeschwankung ein/aus
}

/** Ein vom Nutzer benannter, gespeicherter Klangraum */
export interface SavedSpace {
  id: string;
  name: string;
  sounds: Record<string, MixerSoundState>;
}

/** Phase einer Atemübung */
export interface BreathPhase {
  label: string;
  kind: 'in' | 'hold' | 'out';
  seconds: number;
}

export interface BreathingPattern {
  id: string;
  name: string;
  description: string;
  phases: BreathPhase[];
}
