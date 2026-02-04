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
    id: '1770209704849',
    filename: 'owl.mp3',
    title: 'Owl',
    category: SoundCategory.MISC,
    description: 'Owl',
    duration: '0:08'
  },
  {
    id: '1770209695411',
    filename: 'wolf.mp3',
    title: 'Wolf',
    category: SoundCategory.MISC,
    description: 'Wolf',
    duration: '0:07'
  },
  {
    id: '1770209686752',
    filename: 'hot-tub.mp3',
    title: 'Hot Tub',
    category: SoundCategory.MISC,
    description: 'Hot Tub',
    duration: '0:23'
  },
  {
    id: '1770209675695',
    filename: 'cat-meowing.mp3',
    title: 'Cat Meowing',
    category: SoundCategory.MISC,
    description: 'Cat Meowing',
    duration: '1:04'
  },
  {
    id: '1770209665987',
    filename: 'monk-chant.mp3',
    title: 'Monk Chant',
    category: SoundCategory.MISC,
    description: 'Monk Chant',
    duration: '1:33'
  },
  {
    id: '1770209653330',
    filename: 'space.mp3',
    title: 'Space',
    category: SoundCategory.MISC,
    description: 'Space',
    duration: '2:25'
  },
  {
    id: '1770209636288',
    filename: 'spa-ambient.mp3',
    title: 'Spa Ambient',
    category: SoundCategory.MISC,
    description: 'Spa Ambient',
    duration: '5:51'
  },
  {
    id: '1770209623154',
    filename: 'meditation.mp3',
    title: 'Medidation',
    category: SoundCategory.MISC,
    description: 'Medidation',
    duration: '3:04'
  },
  {
    id: '1770209608560',
    filename: 'spa-ambient2.mp3',
    title: 'Spa Ambient 2',
    category: SoundCategory.MISC,
    description: 'Spa Ambient 2',
    duration: '9:46'
  },
  {
    id: '1770209589631',
    filename: 'mindful-breathing.mp3',
    title: 'Mindful Breathing',
    category: SoundCategory.MISC,
    description: 'Mindful Breathing',
    duration: '2:21'
  },
  {
    id: '1770196772164',
    filename: 'frogs.mp3',
    title: 'Frogs',
    category: SoundCategory.AMBIENCE,
    description: 'Frogs',
    duration: '1:59'
  },
  {
    id: '1770196763960',
    filename: 'crickets.mp3',
    title: 'Crickets',
    category: SoundCategory.AMBIENCE,
    description: 'Crickets',
    duration: '1:53'
  },
  {
    id: '1770196754374',
    filename: 'lakeside.mp3',
    title: 'Lakeside',
    category: SoundCategory.AMBIENCE,
    description: 'Lakeside',
    duration: '3:00'
  },
  {
    id: '1770196745272',
    filename: 'medium-rain.mp3',
    title: 'Medium Rain',
    category: SoundCategory.AMBIENCE,
    description: 'Medium Rain',
    duration: '1:57'
  },
  {
    id: '1770196735647',
    filename: 'forest-rain.mp3',
    title: 'Forest Rain',
    category: SoundCategory.AMBIENCE,
    description: 'Forest Rain',
    duration: '2:20'
  },
  {
    id: '1770196725369',
    filename: 'rainforest-rain.mp3',
    title: 'Rainforest Rain',
    category: SoundCategory.AMBIENCE,
    description: 'Rainforest Rain',
    duration: '3:48'
  },
  {
    id: '1770196713166',
    filename: 'rain-on-tent.mp3',
    title: 'Rain on Tent',
    category: SoundCategory.AMBIENCE,
    description: 'Rain on Tent',
    duration: '5:09'
  },
  {
    id: '1770196703602',
    filename: 'rain-on-window.mp3',
    title: 'Rain on Window',
    category: SoundCategory.AMBIENCE,
    description: 'Rain on Window',
    duration: '3:52'
  },
  {
    id: '1770196606642',
    filename: 'wind.mp3',
    title: 'Wind',
    category: SoundCategory.AMBIENCE,
    description: 'Wind',
    duration: '1:29'
  },
  {
    id: '1770196592975',
    filename: 'wind-in-trees.mp3',
    title: 'Wind in Trees',
    category: SoundCategory.AMBIENCE,
    description: 'Wind in Trees',
    duration: '3:47'
  },
  {
    id: '1770196583177',
    filename: 'river.mp3',
    title: 'River',
    category: SoundCategory.AMBIENCE,
    description: 'River',
    duration: '1:44'
  },
  {
    id: '1770196574380',
    filename: 'ocean-waves.mp3',
    title: 'Ocean Waves',
    category: SoundCategory.AMBIENCE,
    description: 'Ocean Waves',
    duration: '3:19'
  },
  {
    id: '1770196564538',
    filename: 'underwater.mp3',
    title: 'Underwater',
    category: SoundCategory.AMBIENCE,
    description: 'Underwater',
    duration: '3:43'
  },
  {
    id: '1770196554838',
    filename: 'waterfall.mp3',
    title: 'Waterfall',
    category: SoundCategory.AMBIENCE,
    description: 'Waterfall',
    duration: '0:45'
  },
  {
    id: '1770196543932',
    filename: 'dusk.mp3',
    title: 'Dusk',
    category: SoundCategory.AMBIENCE,
    description: 'Dusk',
    duration: '1:58'
  },
  {
    id: '1770196534539',
    filename: 'cow-bells.mp3',
    title: 'Cow Bells',
    category: SoundCategory.AMBIENCE,
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
    category: SoundCategory.AMBIENCE,
    description: 'City Traffic',
    duration: '3:13'
  },
  {
    id: '1770196447838',
    filename: 'cafe-chatter.mp3',
    title: 'Cafe Chatter',
    category: SoundCategory.AMBIENCE,
    description: 'Cafe Chatter',
    duration: '4:47'
  },
  {
    id: '1770196436780',
    filename: 'fireplace.mp3',
    title: 'Fireplace',
    category: SoundCategory.AMBIENCE,
    description: 'Fireplace',
    duration: '2:51'
  },
  {
    id: '1770196424538',
    filename: 'snow-footsteps.mp3',
    title: 'Snow Footsteps',
    category: SoundCategory.AMBIENCE,
    description: 'Snow Footsteps',
    duration: '2:06'
  },
  {
    id: '1770196209880',
    filename: 'heartbeat.mp3',
    title: 'Heartbeat',
    category: SoundCategory.AMBIENCE,
    description: 'Heartbeat',
    duration: '3:37'
  },
  {
    id: '1770196191008',
    filename: 'birds.mp3',
    title: 'Birds',
    category: SoundCategory.AMBIENCE,
    description: 'Birds',
    duration: '1:27'
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
