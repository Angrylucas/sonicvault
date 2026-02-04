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
