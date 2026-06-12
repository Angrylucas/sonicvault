import { GuidedTrack, MixSound, BreathingPattern } from './types';

export const SOUND_BASE_PATH = '/sounds/';

/* ------------------------------------------------------------------ */
/* Geführte Meditationen                                               */
/* ------------------------------------------------------------------ */

export const MEDITATIONS: GuidedTrack[] = [
  { id: 'med-meditational', filename: 'meditational.mp3', title: 'Meditational', duration: '20:09', tag: 'Achtsamkeit' },
  { id: 'med-ancient', filename: 'ancient-meditation.mp3', title: 'Ancient Meditation', duration: '33:24', tag: 'Achtsamkeit' },
  { id: 'med-calming', filename: 'calming-meditation.mp3', title: 'Calming Meditation', duration: '19:00', tag: 'Achtsamkeit' },
  { id: 'med-difficulties', filename: 'meditation-for-working-with-difficulties.mp3', title: 'Working with Difficulties', duration: '6:54', tag: 'Achtsamkeit' },
  { id: 'med-3min-sounds', filename: '3-minute-sounds.mp3', title: '3 Minute Sounds', duration: '3:02', tag: 'Achtsamkeit' },
  { id: 'med-body-sound', filename: 'body-sound-meditation.mp3', title: 'Body & Sound Meditation', duration: '3:06', tag: 'Body Scan' },
  { id: 'med-body-scan', filename: 'body-scan.mp3', title: 'Body Scan', duration: '2:44', tag: 'Body Scan' },
  { id: 'med-body-scan-14', filename: '14-minutes-body-scan.mp3', title: '14 Minuten Body Scan', duration: '14:36', tag: 'Body Scan' },
  { id: 'med-breath-sound-body', filename: 'breath-sound-body.mp3', title: 'Breath, Sound, Body', duration: '12:00', tag: 'Body Scan' },
  { id: 'med-bsbte', filename: 'breath-sounds-body-toughts-emotions.mp3', title: 'Breath, Body, Thoughts & Emotions', duration: '19:00', tag: 'Body Scan' },
  { id: 'med-body-scan-sleep', filename: 'body-scan-for-sleep.mp3', title: 'Body Scan zum Einschlafen', duration: '13:49', tag: 'Schlaf' },
  { id: 'med-calm-sleep', filename: 'calm-sleep.mp3', title: 'Calm Sleep', duration: '10:00', tag: 'Schlaf' },
  { id: 'med-deep-healing', filename: 'deep-healing.mp3', title: 'Deep Healing', duration: '8:57', tag: 'Heilung' },
  { id: 'med-deep-spiritual', filename: 'deep-spiritual.mp3', title: 'Deep Spiritual', duration: '8:44', tag: 'Heilung' },
  { id: 'med-tension-release', filename: 'tension-release.mp3', title: 'Tension Release', duration: '5:45', tag: 'Heilung' },
  { id: 'med-loving-kindness', filename: 'loving-kindness-meditation.mp3', title: 'Loving Kindness', duration: '9:31', tag: 'Mitgefühl' },
  { id: 'med-calm-yoga', filename: 'calm-yoga.mp3', title: 'Calm Yoga', duration: '13:31', tag: 'Heilung' },
];

export const MEDITATION_TAGS = ['Alle', 'Achtsamkeit', 'Body Scan', 'Schlaf', 'Heilung', 'Mitgefühl'];

/* ------------------------------------------------------------------ */
/* Atemübungen                                                         */
/* ------------------------------------------------------------------ */

export const BREATHING_PATTERNS: BreathingPattern[] = [
  {
    id: 'box',
    name: 'Box Breathing',
    description: '4 · 4 · 4 · 4 — beruhigt das Nervensystem und schärft den Fokus.',
    phases: [
      { label: 'Einatmen', kind: 'in', seconds: 4 },
      { label: 'Halten', kind: 'hold', seconds: 4 },
      { label: 'Ausatmen', kind: 'out', seconds: 4 },
      { label: 'Halten', kind: 'hold', seconds: 4 },
    ],
  },
  {
    id: '478',
    name: '4-7-8 Atmung',
    description: '4 · 7 · 8 — die klassische Übung zum Entspannen und Einschlafen.',
    phases: [
      { label: 'Einatmen', kind: 'in', seconds: 4 },
      { label: 'Halten', kind: 'hold', seconds: 7 },
      { label: 'Ausatmen', kind: 'out', seconds: 8 },
    ],
  },
  {
    id: 'coherent',
    name: 'Kohärentes Atmen',
    description: '5 · 5 — gleichmäßiger Rhythmus für innere Balance.',
    phases: [
      { label: 'Einatmen', kind: 'in', seconds: 5 },
      { label: 'Ausatmen', kind: 'out', seconds: 5 },
    ],
  },
  {
    id: 'relax',
    name: 'Entspannungsatmung',
    description: '4 · 6 — längeres Ausatmen aktiviert den Ruhenerv.',
    phases: [
      { label: 'Einatmen', kind: 'in', seconds: 4 },
      { label: 'Ausatmen', kind: 'out', seconds: 6 },
    ],
  },
];

export const BREATHING_TRACKS: GuidedTrack[] = [
  { id: 'br-3min', filename: '3-minute-breathing.mp3', title: '3 Minute Breathing', duration: '3:35', tag: 'Kurz' },
  { id: 'br-3min-space', filename: '3-minute-breathing-space.mp3', title: '3 Minute Breathing Space', duration: '3:34', tag: 'Kurz' },
  { id: 'br-mindful', filename: 'mindful-breathing.mp3', title: 'Mindful Breathing', duration: '2:21', tag: 'Kurz' },
  { id: 'br-5min', filename: '5-minute-breathing.mp3', title: '5 Minute Breathing', duration: '4:39', tag: 'Kurz' },
  { id: 'br-meditation', filename: 'breathing-meditation.mp3', title: 'Breathing Meditation', duration: '5:31', tag: 'Achtsamkeit' },
  { id: 'br-space', filename: 'breathing-space.mp3', title: 'Breathing Space', duration: '5:39', tag: 'Achtsamkeit' },
  { id: 'br-10min', filename: '10-minute-breathing.mp3', title: '10 Minute Breathing', duration: '9:56', tag: 'Achtsamkeit' },
  { id: 'br-compassionate', filename: 'compassionate-breath.mp3', title: 'Compassionate Breath', duration: '11:33', tag: 'Achtsamkeit' },
  { id: 'br-478', filename: '4-7-8-breathing.mp3', title: '4-7-8 Breathing', duration: '4:02', tag: 'Technik' },
  { id: 'br-478-10', filename: '4-7-8-breathing-10-min.mp3', title: '4-7-8 Breathing · 10 Min', duration: '10:32', tag: 'Technik' },
  { id: 'br-box-5', filename: 'box-breathing-5-minutes.mp3', title: 'Box Breathing · 5 Min', duration: '6:52', tag: 'Technik' },
  { id: 'br-wim-easy', filename: 'wim-hof-breathing-(easy).mp3', title: 'Wim Hof Breathing · Easy', duration: '21:29', tag: 'Technik' },
  { id: 'br-wim-expert', filename: 'wim-hof-breathing-expert.mp3', title: 'Wim Hof Breathing · Expert', duration: '46:46', tag: 'Technik' },
];

/* ------------------------------------------------------------------ */
/* Ambient-Sounds für den Mixer                                        */
/* ------------------------------------------------------------------ */

export const MIX_SOUNDS: MixSound[] = [
  // Regen & Gewitter
  { id: 'medium-rain', filename: 'medium-rain.mp3', name: 'Sanfter Regen', icon: 'CloudRain', category: 'Regen & Gewitter' },
  { id: 'forest-rain', filename: 'forest-rain.mp3', name: 'Waldregen', icon: 'CloudRain', category: 'Regen & Gewitter' },
  { id: 'rainforest-rain', filename: 'rainforest-rain.mp3', name: 'Regenwald', icon: 'CloudRain', category: 'Regen & Gewitter' },
  { id: 'rain-on-window', filename: 'rain-on-window.mp3', name: 'Regen am Fenster', icon: 'CloudDrizzle', category: 'Regen & Gewitter' },
  { id: 'rain-on-roof', filename: 'rain-on-roof.mp3', name: 'Regen auf dem Dach', icon: 'Home', category: 'Regen & Gewitter' },
  { id: 'rain-on-tent', filename: 'rain-on-tent.mp3', name: 'Regen auf Zelt', icon: 'Tent', category: 'Regen & Gewitter' },
  { id: 'thunder', filename: 'thunder.mp3', name: 'Donner', icon: 'CloudLightning', category: 'Regen & Gewitter' },
  { id: 'thunderstorm', filename: 'thunderstorm.mp3', name: 'Gewitter', icon: 'Zap', category: 'Regen & Gewitter' },

  // Wasser
  { id: 'ocean-waves', filename: 'ocean-waves.mp3', name: 'Meereswellen', icon: 'Waves', category: 'Wasser' },
  { id: 'waves', filename: 'waves.mp3', name: 'Sanfte Wellen', icon: 'Waves', category: 'Wasser' },
  { id: 'river', filename: 'river.mp3', name: 'Fluss', icon: 'Droplets', category: 'Wasser' },
  { id: 'waterfall', filename: 'waterfall.mp3', name: 'Wasserfall', icon: 'Droplets', category: 'Wasser' },
  { id: 'lakeside', filename: 'lakeside.mp3', name: 'Seeufer', icon: 'Mountain', category: 'Wasser' },
  { id: 'underwater', filename: 'underwater.mp3', name: 'Unterwasser', icon: 'Fish', category: 'Wasser' },
  { id: 'hot-tub', filename: 'hot-tub.mp3', name: 'Whirlpool', icon: 'Bath', category: 'Wasser' },

  // Natur
  { id: 'birds', filename: 'birds.mp3', name: 'Vögel', icon: 'Bird', category: 'Natur' },
  { id: 'crickets', filename: 'crickets.mp3', name: 'Grillen', icon: 'Bug', category: 'Natur' },
  { id: 'frogs', filename: 'frogs.mp3', name: 'Frösche', icon: 'Bug', category: 'Natur' },
  { id: 'dusk', filename: 'dusk.mp3', name: 'Abenddämmerung', icon: 'Sunset', category: 'Natur' },
  { id: 'wind', filename: 'wind.mp3', name: 'Wind', icon: 'Wind', category: 'Natur' },
  { id: 'wind-in-trees', filename: 'wind-in-trees.mp3', name: 'Wind in Bäumen', icon: 'Trees', category: 'Natur' },
  { id: 'howling-wind', filename: 'howling-wind.mp3', name: 'Heulender Wind', icon: 'Wind', category: 'Natur' },
  { id: 'polar-weather', filename: 'polar-weather.mp3', name: 'Polarwetter', icon: 'Snowflake', category: 'Natur' },
  { id: 'snow-footsteps', filename: 'snow-footsteps.mp3', name: 'Schritte im Schnee', icon: 'Footprints', category: 'Natur' },
  { id: 'cow-bells', filename: 'cow-bells.mp3', name: 'Kuhglocken', icon: 'Bell', category: 'Natur' },

  // Tiere
  { id: 'cat-purring', filename: 'cat-purring.mp3', name: 'Schnurrende Katze', icon: 'Cat', category: 'Tiere' },
  { id: 'cat-meowing', filename: 'cat-meowing.mp3', name: 'Miauende Katze', icon: 'Cat', category: 'Tiere' },
  { id: 'owl', filename: 'owl.mp3', name: 'Eule', icon: 'Bird', category: 'Tiere' },
  { id: 'wolf', filename: 'wolf.mp3', name: 'Wolf', icon: 'Moon', category: 'Tiere' },

  // Orte & Atmosphäre
  { id: 'fireplace', filename: 'fireplace.mp3', name: 'Kaminfeuer', icon: 'Flame', category: 'Orte & Atmosphäre' },
  { id: 'cafe-chatter', filename: 'cafe-chatter.mp3', name: 'Café', icon: 'Coffee', category: 'Orte & Atmosphäre' },
  { id: 'city-traffic', filename: 'city-traffic.mp3', name: 'Stadtverkehr', icon: 'Car', category: 'Orte & Atmosphäre' },
  { id: 'cave', filename: 'cave.mp3', name: 'Höhle', icon: 'Mountain', category: 'Orte & Atmosphäre' },
  { id: 'sauna', filename: 'AMBRoom-Electric-Sauna-Ambience.mp3', name: 'Sauna', icon: 'Flame', category: 'Orte & Atmosphäre' },
  { id: 'space', filename: 'space.mp3', name: 'Weltraum', icon: 'Rocket', category: 'Orte & Atmosphäre' },
  { id: 'spa-ambient', filename: 'spa-ambient.mp3', name: 'Spa I', icon: 'Sparkles', category: 'Orte & Atmosphäre' },
  { id: 'spa-ambient2', filename: 'spa-ambient2.mp3', name: 'Spa II', icon: 'Sparkles', category: 'Orte & Atmosphäre' },

  // Klang & Musik
  { id: 'singing-bowl', filename: 'singing-bowl.mp3', name: 'Klangschale', icon: 'CircleDot', category: 'Klang & Musik' },
  { id: 'tibetan-bowls', filename: 'tibetan-singing-bowls.mp3', name: 'Tibetische Klangschalen', icon: 'CircleDot', category: 'Klang & Musik' },
  { id: 'monk-chant', filename: 'monk-chant.mp3', name: 'Mönchsgesang', icon: 'Music', category: 'Klang & Musik' },
  { id: 'peaceful', filename: 'peaceful.mp3', name: 'Friedvoll', icon: 'Heart', category: 'Klang & Musik' },
  { id: 'meditation-music', filename: 'meditation.mp3', name: 'Meditationsklang', icon: 'Music', category: 'Klang & Musik' },
  { id: 'soundscapes', filename: 'soundscapes.mp3', name: 'Klanglandschaften', icon: 'AudioWaveform', category: 'Klang & Musik' },
  { id: 'binaural-waves', filename: 'binaural-waves.mp3', name: 'Binaurale Wellen', icon: 'Brain', category: 'Klang & Musik' },
  { id: 'heartbeat', filename: 'heartbeat.mp3', name: 'Herzschlag', icon: 'HeartPulse', category: 'Klang & Musik' },

  // Noise & Frequenzen
  { id: 'white-noise', filename: 'white-noise.mp3', name: 'White Noise', icon: 'Radio', category: 'Noise & Frequenzen' },
  { id: 'pink-noise', filename: 'pink-noise.mp3', name: 'Pink Noise', icon: 'Radio', category: 'Noise & Frequenzen' },
  { id: 'brown-noise', filename: 'brown-noise.mp3', name: 'Brown Noise', icon: 'Radio', category: 'Noise & Frequenzen' },
  { id: 'grey-noise', filename: 'grey-noise.mp3', name: 'Grey Noise', icon: 'Radio', category: 'Noise & Frequenzen' },
  { id: 'blue-noise', filename: 'blue-noise.mp3', name: 'Blue Noise', icon: 'Radio', category: 'Noise & Frequenzen' },
  { id: 'violet-noise', filename: 'violet-noise.mp3', name: 'Violet Noise', icon: 'Radio', category: 'Noise & Frequenzen' },
  { id: 'hz-30', filename: '30-hz.mp3', name: '30 Hz', icon: 'Activity', category: 'Noise & Frequenzen' },
  { id: 'hz-100', filename: '100-hz.mp3', name: '100 Hz', icon: 'Activity', category: 'Noise & Frequenzen' },
  { id: 'hz-200', filename: '200-hz.mp3', name: '200 Hz', icon: 'Activity', category: 'Noise & Frequenzen' },
  { id: 'hz-400', filename: '400-hz.mp3', name: '400 Hz', icon: 'Activity', category: 'Noise & Frequenzen' },
];

export const MIX_CATEGORIES = [
  'Regen & Gewitter',
  'Wasser',
  'Natur',
  'Tiere',
  'Orte & Atmosphäre',
  'Klang & Musik',
  'Noise & Frequenzen',
];
