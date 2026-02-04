import { Sound, SoundCategory } from './types';

/**
 * ------------------------------------------------------------------
 * INSTRUCTIONS FOR ADDING YOUR OWN SOUNDS:
 * ------------------------------------------------------------------
 * 1. Create a folder named 'sounds' inside your 'public' directory.
 *    (e.g., public/sounds/)
 * 
 * 2. Drag and drop your audio files (mp3, wav) into that folder.
 * 
 * 3. Add a new object to the SOUND_LIBRARY array below for each file.
 *    The 'filename' must match exactly (case-sensitive).
 * 
 * 4. IMPORTANT: Empty out the DEMO_URL_MAP at the bottom of this file
 *    to stop using the internet demo sounds and use your local files.
 * ------------------------------------------------------------------
 */

// This path works for Vercel/Root deployments.
// It tells the app to look in the /public/sounds/ folder.
export const SOUND_BASE_PATH = '/sounds/';

export const SOUND_LIBRARY: Sound[] = [
  {
    id: '1770196772164',
    filename: 'frogs.mp3',
    title: 'Frogs',
    category: SoundCategory.MISC,
    description: 'Frogs',
    duration: '1:59'
  },
  {
    id: '1770196763960',
    filename: 'crickets.mp3',
    title: 'Crickets',
    category: SoundCategory.MISC,
    description: 'Crickets',
    duration: '1:53'
  },
  {
    id: '1770196754374',
    filename: 'lakeside.mp3',
    title: 'Lakeside',
    category: SoundCategory.MISC,
    description: 'Lakeside',
    duration: '3:00'
  },
  {
    id: '1770196745272',
    filename: 'medium-rain.mp3',
    title: 'Medium Rain',
    category: SoundCategory.MISC,
    description: 'Medium Rain',
    duration: '1:57'
  },
  {
    id: '1770196735647',
    filename: 'forest-rain.mp3',
    title: 'Forest Rain',
    category: SoundCategory.MISC,
    description: 'Forest Rain',
    duration: '2:20'
  },
  {
    id: '1770196725369',
    filename: 'rainforest-rain.mp3',
    title: 'Rainforest Rain',
    category: SoundCategory.MISC,
    description: 'Rainforest Rain',
    duration: '3:48'
  },
  {
    id: '1770196713166',
    filename: 'rain-on-tent.mp3',
    title: 'Rain on Tent',
    category: SoundCategory.MISC,
    description: 'Rain on Tent',
    duration: '5:09'
  },
  {
    id: '1770196703602',
    filename: 'rain-on-window.mp3',
    title: 'Rain on Window',
    category: SoundCategory.MISC,
    description: 'Rain on Window',
    duration: '3:52'
  },
  {
    id: '1770196606642',
    filename: 'wind.mp3',
    title: 'Wind',
    category: SoundCategory.MISC,
    description: 'Wind',
    duration: '1:29'
  },
  {
    id: '1770196592975',
    filename: 'wind-in-trees.mp3',
    title: 'Wind in Trees',
    category: SoundCategory.MISC,
    description: 'Wind in Trees',
    duration: '3:47'
  },
  {
    id: '1770196583177',
    filename: 'river.mp3',
    title: 'River',
    category: SoundCategory.MISC,
    description: 'River',
    duration: '1:44'
  },
  {
    id: '1770196574380',
    filename: 'ocean-waves.mp3',
    title: 'Ocean Waves',
    category: SoundCategory.MISC,
    description: 'Ocean Waves',
    duration: '3:19'
  },
  {
    id: '1770196564538',
    filename: 'underwater.mp3',
    title: 'Underwater',
    category: SoundCategory.MISC,
    description: 'Underwater',
    duration: '3:43'
  },
  {
    id: '1770196554838',
    filename: 'waterfall.mp3',
    title: 'Waterfall',
    category: SoundCategory.MISC,
    description: 'Waterfall',
    duration: '0:45'
  },
  {
    id: '1770196543932',
    filename: 'dusk.mp3',
    title: 'Dusk',
    category: SoundCategory.MISC,
    description: 'Dusk',
    duration: '1:58'
  },
  {
    id: '1770196534539',
    filename: 'cow-bells.mp3',
    title: 'Cow Bells',
    category: SoundCategory.MISC,
    description: 'Cow Bells',
    duration: '1:48'
  },
  {
    id: '1770196468466',
    filename: 'howling-wind.mp3',
    title: 'Howling Wind',
    category: SoundCategory.MISC,
    description: 'Howling Wind',
    duration: '5:36'
  },
  {
    id: '1770196457886',
    filename: 'city-traffic.mp3',
    title: 'City Traffic',
    category: SoundCategory.MISC,
    description: 'City Traffic',
    duration: '3:13'
  },
  {
    id: '1770196447838',
    filename: 'cafe-chatter.mp3',
    title: 'Cafe Chatter',
    category: SoundCategory.MISC,
    description: 'Cafe Chatter',
    duration: '4:47'
  },
  {
    id: '1770196436780',
    filename: 'fireplace.mp3',
    title: 'Fireplace',
    category: SoundCategory.MISC,
    description: 'Fireplace',
    duration: '2:51'
  },
  {
    id: '1770196424538',
    filename: 'snow-footsteps.mp3',
    title: 'Snow Footsteps',
    category: SoundCategory.MISC,
    description: 'Snow Footsteps',
    duration: '2:06'
  },
  {
    id: '1770196209880',
    filename: 'heartbeat.mp3',
    title: 'Heartbeat',
    category: SoundCategory.MISC,
    description: 'Heartbeat',
    duration: '3:37'
  },
  {
    id: '1770196191008',
    filename: 'birds.mp3',
    title: 'Birds',
    category: SoundCategory.MISC,
    description: 'Birds',
    duration: '1:27'
  },
  {
    id: '1',
    filename: 'success_bell.mp3', 
    title: 'Success Bell',
    category: SoundCategory.UI,
    description: 'A cheerful chime indicating a successful action.',
    duration: '0:02'
  },
  {
    id: '2',
    filename: 'error_buzzer.mp3',
    title: 'Error Buzzer',
    category: SoundCategory.UI,
    description: 'A flat buzzer sound for validation errors.',
    duration: '0:01'
  },
  {
    id: '3',
    filename: 'forest_ambience.mp3',
    title: 'Forest Morning',
    category: SoundCategory.AMBIENCE,
    description: 'Light wind through trees with distant birds.',
    duration: '0:15'
  },
  {
    id: '4',
    filename: 'coin_pickup.wav',
    title: 'Coin Pickup',
    category: SoundCategory.GAME,
    description: 'Classic retro 8-bit coin collect sound.',
    duration: '0:01'
  },
  {
    id: '5',
    filename: 'message_pop.mp3',
    title: 'Message Pop',
    category: SoundCategory.NOTIFICATION,
    description: 'Soft bubble pop for incoming messages.',
    duration: '0:01'
  },
  {
    id: '6',
    filename: 'laser_shoot.wav',
    title: 'Laser Blast',
    category: SoundCategory.GAME,
    description: 'Futuristic sci-fi laser weapon fire.',
    duration: '0:02'
  },
  {
    id: '7',
    filename: 'rain_heavy.mp3',
    title: 'Heavy Rain',
    category: SoundCategory.AMBIENCE,
    description: 'Intense rainstorm against a window.',
    duration: '0:30'
  }
];

/**
 * DEMO MODE CONFIGURATION
 * 
 * As long as a filename exists in this map, the app will load the sound 
 * from the internet (Mixkit) instead of your local folder.
 * 
 * TO ENABLE YOUR LOCAL SOUNDS:
 * Delete the content inside this object so it looks like:
 * export const DEMO_URL_MAP: Record<string, string> = {};
 */
export const DEMO_URL_MAP: Record<string, string> = {
  'success_bell.mp3': 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  'error_buzzer.mp3': 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3',
  'forest_ambience.mp3': 'https://assets.mixkit.co/active_storage/sfx/249/249-preview.mp3',
  'coin_pickup.wav': 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
  'message_pop.mp3': 'https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3',
  'laser_shoot.wav': 'https://assets.mixkit.co/active_storage/sfx/1507/1507-preview.mp3',
  'rain_heavy.mp3': 'https://assets.mixkit.co/active_storage/sfx/246/246-preview.mp3',
};
