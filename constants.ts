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
    id: '1770712102579',
    filename: 'breath-sounds-body-toughts-emotions.mp3',
    title: 'Breath Sounds Body Toughts Emotions',
    category: SoundCategory.AMBIENCE,
    description: 'Breath Sounds Body Toughts Emotions',
    duration: '19:00'
  },
  {
    id: '1770712090079',
    filename: 'calming-meditation.mp3',
    title: 'Calming Meditation',
    category: SoundCategory.AMBIENCE,
    description: 'Calming Meditation',
    duration: '19:00'
  },
  {
    id: '1770712078165',
    filename: 'compassionate-breath.mp3',
    title: 'Compassionate Breath',
    category: SoundCategory.AMBIENCE,
    description: 'Compassionate Breath',
    duration: '11:33'
  },
  {
    id: '1770712064702',
    filename: 'breath-sound-body.mp3',
    title: 'Breath Sound Body',
    category: SoundCategory.AMBIENCE,
    description: 'Breath Sound Body',
    duration: '12:00'
  },
  {
    id: '1770712051343',
    filename: 'box-breathing-5-minutes.mp3',
    title: 'Box Breathing 5 Minutes',
    category: SoundCategory.AMBIENCE,
    description: 'Box Breathing 5 Minutes',
    duration: '6:52'
  },
  {
    id: '1770712039444',
    filename: 'loving-kindness-meditation.mp3',
    title: 'Loving Kindness Meditation',
    category: SoundCategory.AMBIENCE,
    description: 'Loving Kindness Meditation',
    duration: '9:31'
  },
  {
    id: '1770712025340',
    filename: '4-7-8-breathing-10-min.mp3',
    title: '4-7-8 Breathing 10 Min',
    category: SoundCategory.AMBIENCE,
    description: '4-7-8 Breathing 10 Min',
    duration: '10:32'
  },
  {
    id: '1770712013141',
    filename: 'tension-release.mp3',
    title: 'Tension Release',
    category: SoundCategory.AMBIENCE,
    description: 'Tension Release',
    duration: '5:45'
  },
  {
    id: '1770712001830',
    filename: 'breathing-space.mp3',
    title: 'Breathing Space',
    category: SoundCategory.AMBIENCE,
    description: 'Breathing Space',
    duration: '5:39'
  },
  {
    id: '1770711938441',
    filename: 'meditation-for-working-with-difficulties.mp3',
    title: 'Meditation for Working with Difficulties',
    category: SoundCategory.AMBIENCE,
    description: 'Meditation for Working with Difficulties',
    duration: '6:54'
  },
  {
    id: '1770711927896',
    filename: '5-minute-breathing.mp3',
    title: '5 Minute Breathing',
    category: SoundCategory.AMBIENCE,
    description: '5 Minute Breathing',
    duration: '4:39'
  },
  {
    id: '1770711915231',
    filename: 'breathing-meditation.mp3',
    title: 'Breathing Meditation',
    category: SoundCategory.AMBIENCE,
    description: 'Breathing Meditation',
    duration: '5:31'
  },
  {
    id: '1770711905979',
    filename: 'body-scan.mp3',
    title: 'Body Scan',
    category: SoundCategory.AMBIENCE,
    description: 'Body Scan',
    duration: '2:44'
  },
  {
    id: '1770711895962',
    filename: '10-minute-breathing.mp3',
    title: '10 Minute Breathing',
    category: SoundCategory.AMBIENCE,
    description: '10 Minute Breathing',
    duration: '9:56'
  },
  {
    id: '1770711884531',
    filename: 'body-sound-meditation.mp3',
    title: 'Body Sound Meditation',
    category: SoundCategory.AMBIENCE,
    description: 'Body Sound Meditation',
    duration: '3:06'
  },
  {
    id: '1770711875605',
    filename: '4-7-8-breathing.mp3',
    title: '4-7-8 Breathing',
    category: SoundCategory.AMBIENCE,
    description: '4-7-8 Breathing',
    duration: '4:02'
  },
  {
    id: '1770711866554',
    filename: '3-minute-sounds.mp3',
    title: '3 Minute Sounds',
    category: SoundCategory.AMBIENCE,
    description: '3 Minute Sounds',
    duration: '3:02'
  },
  {
    id: '1770711855864',
    filename: '3-minute-breathing.mp3',
    title: '3 Minute Breathing',
    category: SoundCategory.AMBIENCE,
    description: '3 Minute Breathing',
    duration: '3:35'
  },
  {
    id: '1770711845561',
    filename: '3-minute-breathing-space.mp3',
    title: '3 Minute Breathing Space',
    category: SoundCategory.AMBIENCE,
    description: '3 Minute Breathing Space',
    duration: '3:34'
  },
  {
    id: '1770711540484',
    filename: 'meditational.mp3',
    title: 'Meditational',
    category: SoundCategory.AMBIENCE,
    description: 'Meditational',
    duration: '20:09'
  },
  {
    id: '1770386740167',
    filename: 'singing-bowl.mp3',
    title: 'Singing Bowl',
    category: SoundCategory.UI,
    description: 'Singing Bowl',
    duration: '2:24'
  },
  {
    id: '1770386726159',
    filename: 'white-noise.mp3',
    title: 'White Noise',
    category: SoundCategory.UI,
    description: 'White Noise',
    duration: '5:00'
  },
  {
    id: '1770386711158',
    filename: 'brown-noise.mp3',
    title: 'Brown Noise',
    category: SoundCategory.UI,
    description: 'Brown Noise',
    duration: '10:00'
  },
  {
    id: '1770386701020',
    filename: 'blue-noise.mp3',
    title: 'Blue Noise',
    category: SoundCategory.UI,
    description: 'Blue Noise',
    duration: '1:00'
  },
  {
    id: '1770386690325',
    filename: 'pink-noise.mp3',
    title: 'Pink Noise',
    category: SoundCategory.UI,
    description: 'Pink Noise',
    duration: '1:00'
  },
  {
    id: '1770386678297',
    filename: 'grey-noise.mp3',
    title: 'Grey Noise',
    category: SoundCategory.UI,
    description: 'Grey Noise',
    duration: '1:00'
  },
  {
    id: '1770386667833',
    filename: 'violet-noise.mp3',
    title: 'Violet Noise',
    category: SoundCategory.UI,
    description: 'Violet Noise',
    duration: '1:00'
  },
  {
    id: '1770386652966',
    filename: 'cat-purring.mp3',
    title: 'Cat Purring',
    category: SoundCategory.UI,
    description: 'Cat Purring',
    duration: '10:30'
  },
  {
    id: '1770386627890',
    filename: 'thunderstorm.mp3',
    title: 'Thunderstorm',
    category: SoundCategory.UI,
    description: 'Thunderstorm',
    duration: '12:08'
  },
  {
    id: '1770386607233',
    filename: 'rain-on-roof.mp3',
    title: 'Rain on Roof',
    category: SoundCategory.UI,
    description: 'Rain on Roof',
    duration: '2:06'
  },
  {
    id: '1770386596988',
    filename: '200-hz.mp3',
    title: '200 Hz',
    category: SoundCategory.UI,
    description: '200 Hz',
    duration: '0:10'
  },
  {
    id: '1770386588262',
    filename: '100-hz.mp3',
    title: '100 Hz',
    category: SoundCategory.UI,
    description: '100 Hz',
    duration: '0:10'
  },
  {
    id: '1770386578610',
    filename: '30-hz.mp3',
    title: '30 Hz',
    category: SoundCategory.UI,
    description: '30 Hz',
    duration: '2:43'
  },
  {
    id: '1770386569739',
    filename: '400-hz.mp3',
    title: '400 Hz',
    category: SoundCategory.UI,
    description: '400 Hz',
    duration: '0:10'
  },
  {
    id: '1770386559375',
    filename: 'peaceful.mp3',
    title: 'Peaceful',
    category: SoundCategory.UI,
    description: 'Peaceful',
    duration: '2:22'
  },
  {
    id: '1770386545440',
    filename: 'cave.mp3',
    title: 'Cave',
    category: SoundCategory.UI,
    description: 'Cave',
    duration: '2:31'
  },
  {
    id: '1770274850466',
    filename: 'waves.mp3',
    title: 'Waves',
    category: SoundCategory.UI,
    description: 'Waves',
    duration: '3:30'
  },
  {
    id: '1770209723594',
    filename: 'polar-weather.mp3',
    title: 'Polar Weather',
    category: SoundCategory.MISC,
    description: 'Polar Weather',
    duration: '6:32'
  },
  {
    id: '1770209713237',
    filename: 'thunder.mp3',
    title: 'Thunder',
    category: SoundCategory.MISC,
    description: 'Thunder',
    duration: '4:26'
  },
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
