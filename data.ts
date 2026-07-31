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
  { id: 'med-tibetan-bowls', filename: 'tibetan-singing-bowls.mp3', title: 'Tibetische Klangschalen', duration: '8:28', tag: 'Klang' },

  /* ---- Import 2026-07-30: Guided Meditations (105 Dateien) ---- */

  // Emotionen
  { id: 'med-acceptance-12m', filename: 'acceptance-andy-12m.mp3', title: 'Acceptance', duration: '11:31', tag: 'Emotionen', narrators: [
    { narrator: 'Andy', filename: 'acceptance-andy-12m.mp3', duration: '11:31' },
    { narrator: 'Eve', filename: 'acceptance-eve-12m.mp3', duration: '11:30' },
  ] },
  { id: 'med-anger-6m', filename: 'anger-6m.mp3', title: 'Anger', duration: '5:44', tag: 'Emotionen' },
  { id: 'med-balance-12m', filename: 'balance-andy-12m.mp3', title: 'Balance', duration: '11:31', tag: 'Emotionen', narrators: [
    { narrator: 'Andy', filename: 'balance-andy-12m.mp3', duration: '11:31' },
    { narrator: 'Dora', filename: 'balance-dora-12m.mp3', duration: '11:30' },
  ] },
  { id: 'med-boredom-4m', filename: 'boredom-4m.mp3', title: 'Boredom', duration: '3:52', tag: 'Emotionen' },
  { id: 'med-dealing-with-regret-andy-12m', filename: 'dealing-with-regret-andy-12m.mp3', title: 'Dealing With Regret (12 Min)', duration: '11:30', tag: 'Emotionen' },
  { id: 'med-dealing-with-regret-andy-17m', filename: 'dealing-with-regret-andy-17m.mp3', title: 'Dealing With Regret (17 Min)', duration: '16:30', tag: 'Emotionen' },
  { id: 'med-dealing-with-regret-andy-22m', filename: 'dealing-with-regret-andy-22m.mp3', title: 'Dealing With Regret (22 Min)', duration: '21:30', tag: 'Emotionen' },
  { id: 'med-disturbing-images-6m', filename: 'disturbing-images-6m.mp3', title: 'Disturbing Images', duration: '5:55', tag: 'Emotionen' },
  { id: 'med-doubt-4m', filename: 'doubt-4m.mp3', title: 'Doubt', duration: '4:15', tag: 'Emotionen' },
  { id: 'med-excitement-4m', filename: 'excitement-4m.mp3', title: 'Excitement', duration: '3:32', tag: 'Emotionen' },
  { id: 'med-guilt-4m', filename: 'guilt-4m.mp3', title: 'Guilt', duration: '3:50', tag: 'Emotionen' },
  { id: 'med-happiness-12m', filename: 'happiness-andy-12m.mp3', title: 'Happiness', duration: '11:30', tag: 'Emotionen', narrators: [
    { narrator: 'Andy', filename: 'happiness-andy-12m.mp3', duration: '11:30' },
    { narrator: 'Eve', filename: 'happiness-eve-12m.mp3', duration: '11:30' },
  ] },
  { id: 'med-irritability-4m', filename: 'irritability-4m.mp3', title: 'Irritability', duration: '4:18', tag: 'Emotionen' },
  { id: 'med-letting-go-andy-2m', filename: 'letting-go-andy-2m.mp3', title: 'Letting Go', duration: '1:54', tag: 'Emotionen' },
  { id: 'med-lust-5m', filename: 'lust-5m.mp3', title: 'Lust', duration: '4:55', tag: 'Emotionen' },
  { id: 'med-material-desire-4m', filename: 'material-desire-4m.mp3', title: 'Material Desire', duration: '4:08', tag: 'Emotionen' },
  { id: 'med-mental-health-and-identity-jeanie-9m', filename: 'mental-health-and-identity-jeanie-9m.mp3', title: 'Mental Health and Identity', duration: '8:30', tag: 'Emotionen' },
  { id: 'med-obsession-6m', filename: 'obsession-6m.mp3', title: 'Obsession', duration: '5:33', tag: 'Emotionen' },
  { id: 'med-over-effort-5m', filename: 'over-effort-5m.mp3', title: 'Over Effort', duration: '4:49', tag: 'Emotionen' },
  { id: 'med-patience-andy-12m', filename: 'patience-andy-12m.mp3', title: 'Patience (12 Min)', duration: '11:30', tag: 'Emotionen' },
  { id: 'med-patience-andy-22m', filename: 'patience-andy-22m.mp3', title: 'Patience (22 Min)', duration: '21:31', tag: 'Emotionen' },
  { id: 'med-regret-3m', filename: 'regret-3m.mp3', title: 'Regret', duration: '3:10', tag: 'Emotionen' },
  { id: 'med-resentment-5m', filename: 'resentment-5m.mp3', title: 'Resentment', duration: '5:01', tag: 'Emotionen' },
  { id: 'med-resistance-4m', filename: 'resistance-4m.mp3', title: 'Resistance', duration: '4:03', tag: 'Emotionen' },
  { id: 'med-self-esteem-11m', filename: 'self-esteem-andy-11m.mp3', title: 'Self-Esteem', duration: '11:23', tag: 'Emotionen', narrators: [
    { narrator: 'Andy', filename: 'self-esteem-andy-11m.mp3', duration: '11:23' },
    { narrator: 'Eve', filename: 'self-esteem-eve-11m.mp3', duration: '11:30' },
  ] },
  { id: 'med-under-effort-5m', filename: 'under-effort-5m.mp3', title: 'Under Effort', duration: '4:31', tag: 'Emotionen' },
  { id: 'med-what-to-do-when-patience-runs-out-7m', filename: 'what-to-do-when-patience-runs-out-7m.mp3', title: 'What to Do When Patience Runs Out', duration: '7:04', tag: 'Emotionen' },

  // Beziehungen
  { id: 'med-overcoming-relationship-burnout-9m', filename: 'overcoming-relationship-burnout-9m.mp3', title: 'Overcoming Relationship Burnout', duration: '8:39', tag: 'Beziehungen' },
  { id: 'med-reframing-loneliness-eve-12m', filename: 'reframing-loneliness-eve-12m.mp3', title: 'Reframing Loneliness (12 Min)', duration: '11:30', tag: 'Beziehungen' },
  { id: 'med-reframing-loneliness-eve-22m', filename: 'reframing-loneliness-eve-22m.mp3', title: 'Reframing Loneliness (22 Min)', duration: '21:30', tag: 'Beziehungen' },
  { id: 'med-relationships-andy-11m', filename: 'relationships-andy-11m.mp3', title: 'Relationships', duration: '11:27', tag: 'Beziehungen' },
  { id: 'med-when-relationships-feel-one-sided-8m', filename: 'when-relationships-feel-one-sided-8m.mp3', title: 'When Relationships Feel One Sided', duration: '8:16', tag: 'Beziehungen' },

  // Alltag & Arbeit
  { id: 'med-allowing-yourself-to-unplug-dora-7m', filename: 'allowing-yourself-to-unplug-dora-7m.mp3', title: 'Allowing Yourself to Unplug', duration: '7:00', tag: 'Alltag & Arbeit' },
  { id: 'med-decompress-after-work-dora-8m', filename: 'decompress-after-work-dora-8m.mp3', title: 'Decompress After Work', duration: '7:30', tag: 'Alltag & Arbeit' },
  { id: 'med-end-of-day-3m', filename: 'end-of-day-andy-3m.mp3', title: 'End of Day', duration: '3:00', tag: 'Alltag & Arbeit', narrators: [
    { narrator: 'Andy', filename: 'end-of-day-andy-3m.mp3', duration: '3:00' },
    { narrator: 'Eve', filename: 'end-of-day-eve-4m.mp3', duration: '3:33' },
  ] },
  { id: 'med-finding-time-for-joy-eve-12m', filename: 'finding-time-for-joy-eve-12m.mp3', title: 'Finding Time for Joy', duration: '12:00', tag: 'Alltag & Arbeit' },
  { id: 'med-for-the-weekend-andy-5m', filename: 'for-the-weekend-andy-5m.mp3', title: 'For the Weekend', duration: '5:00', tag: 'Alltag & Arbeit' },
  { id: 'med-midday-check-in-dora-7m', filename: 'midday-check-in-dora-7m.mp3', title: 'Midday Check-in', duration: '7:15', tag: 'Alltag & Arbeit' },
  { id: 'med-mindful-coffee-walk-eve-4m', filename: 'mindful-coffee-walk-eve-4m.mp3', title: 'Mindful Coffee Walk', duration: '4:30', tag: 'Alltag & Arbeit' },
  { id: 'med-taking-a-break-andy-10m', filename: 'taking-a-break-andy-10m.mp3', title: 'Taking a Break (10 Min)', duration: '10:00', tag: 'Alltag & Arbeit' },
  { id: 'med-taking-a-break-andy-3m', filename: 'taking-a-break-andy-3m.mp3', title: 'Taking a Break (3 Min)', duration: '3:00', tag: 'Alltag & Arbeit' },
  { id: 'med-taking-a-break-andy-5m', filename: 'taking-a-break-andy-5m.mp3', title: 'Taking a Break (5 Min)', duration: '5:00', tag: 'Alltag & Arbeit' },
  { id: 'med-time-for-me-eve-6m', filename: 'time-for-me-eve-6m.mp3', title: 'Time for Me', duration: '5:45', tag: 'Alltag & Arbeit' },
  { id: 'med-waking-up-10m', filename: 'waking-up-andy-10m.mp3', title: 'Waking Up', duration: '10:00', tag: 'Alltag & Arbeit', narrators: [
    { narrator: 'Andy', filename: 'waking-up-andy-10m.mp3', duration: '10:00' },
    { narrator: 'Eve', filename: 'waking-up-eve-11m.mp3', duration: '10:32' },
  ] },
  { id: 'med-work-crisis-sos-eve-5m', filename: 'work-crisis-sos-eve-5m.mp3', title: 'Work Crisis SOS', duration: '5:00', tag: 'Alltag & Arbeit' },

  // Reisen
  { id: 'med-befriending-jet-lag-dora-4m', filename: 'befriending-jet-lag-dora-4m.mp3', title: 'Befriending Jet Lag', duration: '3:54', tag: 'Reisen' },
  { id: 'med-dealing-with-nighttime-wake-ups-dora-3m', filename: 'dealing-with-nighttime-wake-ups-dora-3m.mp3', title: 'Dealing with Nighttime Wake-Ups', duration: '3:00', tag: 'Reisen' },
  { id: 'med-easing-post-travel-stress-dora-6m', filename: 'easing-post-travel-stress-dora-6m.mp3', title: 'Easing Post-Travel Stress', duration: '6:00', tag: 'Reisen' },
  { id: 'med-the-power-of-morning-sunlight-dora-2m', filename: 'the-power-of-morning-sunlight-dora-2m.mp3', title: 'The Power of Morning Sunlight', duration: '2:16', tag: 'Reisen' },

  // Angst & Stress
  { id: 'med-calming-an-anxious-mind-eve-12m', filename: 'calming-an-anxious-mind-eve-12m.mp3', title: 'Calming an Anxious Mind', duration: '11:30', tag: 'Angst & Stress' },
  { id: 'med-coping-with-cravings-andy-11m', filename: 'coping-with-cravings-andy-11m.mp3', title: 'Coping With Cravings (11 Min)', duration: '11:30', tag: 'Angst & Stress' },
  { id: 'med-coping-with-cravings-andy-22m', filename: 'coping-with-cravings-andy-22m.mp3', title: 'Coping With Cravings (22 Min)', duration: '21:30', tag: 'Angst & Stress' },
  { id: 'med-feeling-overwhelmed-sos-eve-3m', filename: 'feeling-overwhelmed-sos-eve-3m.mp3', title: 'Feeling Overwhelmed SOS', duration: '3:00', tag: 'Angst & Stress' },
  { id: 'med-finding-calm-dora-9m', filename: 'finding-calm-dora-9m.mp3', title: 'Finding Calm', duration: '8:30', tag: 'Angst & Stress' },
  { id: 'med-grounding-a-racing-mind-dora-2m', filename: 'grounding-a-racing-mind-dora-2m.mp3', title: 'Grounding a Racing Mind', duration: '2:15', tag: 'Angst & Stress' },
  { id: 'med-managing-anxiety-eve-12m', filename: 'managing-anxiety-eve-12m.mp3', title: 'Managing Anxiety', duration: '11:30', tag: 'Angst & Stress' },
  { id: 'med-managing-anxious-moments-dora-8m', filename: 'managing-anxious-moments-dora-8m.mp3', title: 'Managing Anxious Moments', duration: '8:15', tag: 'Angst & Stress' },
  { id: 'med-managing-stress-in-uncertain-times-eve-12m', filename: 'managing-stress-in-uncertain-times-eve-12m.mp3', title: 'Managing Stress in Uncertain Times', duration: '11:30', tag: 'Angst & Stress' },

  // Dankbarkeit & Mitgefühl
  { id: 'med-appreciation-11m', filename: 'appreciation-andy-11m.mp3', title: 'Appreciation', duration: '11:27', tag: 'Dankbarkeit & Mitgefühl', narrators: [
    { narrator: 'Andy', filename: 'appreciation-andy-11m.mp3', duration: '11:27' },
    { narrator: 'Eve', filename: 'appreciation-eve-11m.mp3', duration: '11:30' },
  ] },
  { id: 'med-earth-appreciation-dora-9m', filename: 'earth-appreciation-dora-9m.mp3', title: 'Earth Appreciation', duration: '8:30', tag: 'Dankbarkeit & Mitgefühl' },
  { id: 'med-generosity-andy-12m', filename: 'generosity-andy-12m.mp3', title: 'Generosity (12 Min)', duration: '11:30', tag: 'Dankbarkeit & Mitgefühl' },
  { id: 'med-generosity-andy-17m', filename: 'generosity-andy-17m.mp3', title: 'Generosity (17 Min)', duration: '16:30', tag: 'Dankbarkeit & Mitgefühl' },
  { id: 'med-generosity-andy-22m', filename: 'generosity-andy-22m.mp3', title: 'Generosity (22 Min)', duration: '21:30', tag: 'Dankbarkeit & Mitgefühl' },
  { id: 'med-happiness-of-others-andy-1m', filename: 'happiness-of-others-andy-1m.mp3', title: 'Happiness of Others', duration: '1:15', tag: 'Dankbarkeit & Mitgefühl' },
  { id: 'med-kindness-12m', filename: 'kindness-andy-12m.mp3', title: 'Kindness (12 Min)', duration: '11:31', tag: 'Dankbarkeit & Mitgefühl', narrators: [
    { narrator: 'Andy', filename: 'kindness-andy-12m.mp3', duration: '11:31' },
    { narrator: 'Eve', filename: 'kindness-eve-12m.mp3', duration: '11:30' },
  ] },
  { id: 'med-kindness-22m', filename: 'kindness-andy-22m.mp3', title: 'Kindness (22 Min)', duration: '21:32', tag: 'Dankbarkeit & Mitgefühl', narrators: [
    { narrator: 'Andy', filename: 'kindness-andy-22m.mp3', duration: '21:32' },
    { narrator: 'Eve', filename: 'kindness-eve-22m.mp3', duration: '21:30' },
  ] },

  // Schlafgeschichten
  { id: 'med-45-minutes-of-gentle-aquarium-ambience-cozy-underwater-sleep-45m', filename: '45-minutes-of-gentle-aquarium-ambience-cozy-underwater-sleep-45m.mp3', title: 'Gentle Aquarium Ambience', duration: '45:21', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-arctic-light-45m', filename: 'arctic-light-dora-45m.mp3', title: 'Arctic Light', duration: '45:00', tag: 'Schlafgeschichten', series: 'Sleepcasts', narrators: [
    { narrator: 'Dora', filename: 'arctic-light-dora-45m.mp3', duration: '45:00' },
    { narrator: 'Kessonga', filename: 'arctic-light-kessonga-45m.mp3', duration: '45:00' },
  ] },
  { id: 'med-kauai-at-sunset-45-minute-hawaiian-sleep-story-for-deep-rest-45m', filename: 'kauai-at-sunset-45-minute-hawaiian-sleep-story-for-deep-rest-45m.mp3', title: 'Kauai at Sunset', duration: '45:20', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-moonrise-meadow-45m', filename: 'moonrise-meadow-dora-45m.mp3', title: 'Moonrise Meadow', duration: '45:00', tag: 'Schlafgeschichten', series: 'Sleepcasts', narrators: [
    { narrator: 'Dora', filename: 'moonrise-meadow-dora-45m.mp3', duration: '45:00' },
    { narrator: 'Kessonga', filename: 'moonrise-meadow-kessonga-45m.mp3', duration: '45:00' },
  ] },
  { id: 'med-nighttime-in-joshua-tree-samantha-45m', filename: 'nighttime-in-joshua-tree-samantha-45m.mp3', title: 'Nighttime in Joshua Tree', duration: '45:00', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-rainy-grove-45m', filename: 'rainy-grove-dora-45m.mp3', title: 'Rainy Grove', duration: '45:00', tag: 'Schlafgeschichten', series: 'Sleepcasts', narrators: [
    { narrator: 'Dora', filename: 'rainy-grove-dora-45m.mp3', duration: '45:00' },
    { narrator: 'Kessonga', filename: 'rainy-grove-kessonga-45m.mp3', duration: '45:00' },
  ] },
  { id: 'med-relaxation-dora-10m', filename: 'relaxation-dora-10m.mp3', title: 'Relaxation', duration: '10:15', tag: 'Schlafgeschichten' },
  { id: 'med-sleep-to-the-sounds-of-twilight-beach-45m', filename: 'sleep-to-the-sounds-of-twilight-beach-dora-45m.mp3', title: 'Sleep to the Sounds of Twilight Beach', duration: '45:00', tag: 'Schlafgeschichten', series: 'Sleepcasts', narrators: [
    { narrator: 'Dora', filename: 'sleep-to-the-sounds-of-twilight-beach-dora-45m.mp3', duration: '45:00' },
    { narrator: 'Kessonga', filename: 'sleep-to-the-sounds-of-twilight-beach-kessonga-45m.mp3', duration: '45:00' },
  ] },
  { id: 'med-sleepiness-5m', filename: 'sleepiness-5m.mp3', title: 'Sleepiness', duration: '4:32', tag: 'Schlafgeschichten' },
  { id: 'med-unwind-in-maui-rosie-45m', filename: 'unwind-in-maui-rosie-45m.mp3', title: 'Unwind in Maui', duration: '45:00', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-walk-by-the-riverside-dora-10m', filename: 'walk-by-the-riverside-dora-10m.mp3', title: 'Walk by the Riverside', duration: '10:00', tag: 'Schlafgeschichten' },
  { id: 'med-walking-in-nature-andy-5m', filename: 'walking-in-nature-andy-5m.mp3', title: 'Walking in Nature', duration: '5:00', tag: 'Schlafgeschichten' },
  { id: 'med-waters-of-the-mind-dora-7m', filename: 'waters-of-the-mind-dora-7m.mp3', title: 'Waters of the Mind', duration: '7:00', tag: 'Schlafgeschichten' },
  { id: 'med-whispering-pines-45-minute-moonlit-woodland-bedtime-story-wi-45m', filename: 'whispering-pines-45-minute-moonlit-woodland-bedtime-story-wi-45m.mp3', title: 'Whispering Pines', duration: '45:13', tag: 'Schlafgeschichten', series: 'Sleepcasts' },

  // Sleepcasts (Import 2026-07-30, Nachschlag)
  { id: 'med-a-bedtime-story-for-adults-45m', filename: 'a-bedtime-story-for-adults-45m.mp3', title: 'A Bedtime Story for Adults', duration: '45:24', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-after-carnival-45m', filename: 'after-carnival-45m.mp3', title: 'After Carnival', duration: '45:24', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-cozy-lodge-by-a-peaceful-scottish-loch-45m', filename: 'cozy-lodge-by-a-peaceful-scottish-loch-45m.mp3', title: 'Cozy Lodge by a Peaceful Scottish Loch', duration: '45:21', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-drift-to-sleep-at-the-oceans-edge-45m', filename: 'drift-to-sleep-at-the-oceans-edge-45m.mp3', title: 'Drift to Sleep at the Ocean’s Edge', duration: '45:18', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-evening-tide-45m', filename: 'evening-tide-45m.mp3', title: 'Evening Tide', duration: '45:12', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-fall-asleep-in-a-hushed-theater-45m', filename: 'fall-asleep-in-a-hushed-theater-45m.mp3', title: 'Fall Asleep in a Hushed Theater', duration: '45:20', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-fall-asleep-in-the-wilderness-olympic-national-park-46m', filename: 'fall-asleep-in-the-wilderness-olympic-national-park-46m.mp3', title: 'Fall Asleep in the Wilderness (Olympic National Park)', duration: '45:30', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-flower-market-45m', filename: 'flower-market-45m.mp3', title: 'Flower Market', duration: '45:00', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-lavender-fields-45m', filename: 'lavender-fields-45m.mp3', title: 'Lavender Fields', duration: '45:13', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-moonlit-stones-ocean-waves-45m', filename: 'moonlit-stones-ocean-waves-45m.mp3', title: 'Moonlit Stones & Ocean Waves', duration: '45:21', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-rainday-antiques-46m', filename: 'rainday-antiques-46m.mp3', title: 'Rainday Antiques', duration: '45:30', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-rainday-antiques-ii-45m', filename: 'rainday-antiques-ii-45m.mp3', title: 'Rainday Antiques II', duration: '45:12', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-sleep-sounds-by-the-sea-sandy-cove-45m', filename: 'sleep-sounds-by-the-sea-sandy-cove-45m.mp3', title: 'Sleep Sounds by the Sea (Sandy Cove)', duration: '45:03', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-snuggly-pup-palace-45m', filename: 'snuggly-pup-palace-45m.mp3', title: 'Snuggly Pup Palace', duration: '45:23', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-starlight-diner-45m', filename: 'starlight-diner-45m.mp3', title: 'Starlight Diner', duration: '45:27', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-sunset-boat-ride-45m', filename: 'sunset-boat-ride-45m.mp3', title: 'Sunset Boat Ride', duration: '45:20', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-twilight-in-the-grand-canyon-45m', filename: 'twilight-in-the-grand-canyon-45m.mp3', title: 'Twilight in the Grand Canyon', duration: '45:20', tag: 'Schlafgeschichten', series: 'Sleepcasts' },
  { id: 'med-vineyard-bedtime-story-no-wine-required-45m', filename: 'vineyard-bedtime-story-no-wine-required-45m.mp3', title: 'Vineyard Bedtime Story (No Wine Required)', duration: '45:19', tag: 'Schlafgeschichten', series: 'Sleepcasts' },

  // Achtsamkeit (Import 2026-07-30)
  { id: 'med-guided-meditation-5m', filename: 'guided-meditation-andy-5m.mp3', title: 'Guided Meditation (5 Min)', duration: '5:00', tag: 'Achtsamkeit', narrators: [
    { narrator: 'Andy', filename: 'guided-meditation-andy-5m.mp3', duration: '5:00' },
    { narrator: 'Eve', filename: 'guided-meditation-eve-5m.mp3', duration: '5:00' },
  ] },
  { id: 'med-guided-meditation-10m', filename: 'guided-meditation-andy-10m.mp3', title: 'Guided Meditation (10 Min)', duration: '10:00', tag: 'Achtsamkeit', narrators: [
    { narrator: 'Andy', filename: 'guided-meditation-andy-10m.mp3', duration: '10:00' },
    { narrator: 'Eve', filename: 'guided-meditation-eve-10m.mp3', duration: '10:00' },
  ] },
  { id: 'med-guided-meditation-15m', filename: 'guided-meditation-andy-15m.mp3', title: 'Guided Meditation (15 Min)', duration: '15:00', tag: 'Achtsamkeit', narrators: [
    { narrator: 'Andy', filename: 'guided-meditation-andy-15m.mp3', duration: '15:00' },
    { narrator: 'Eve', filename: 'guided-meditation-eve-15m.mp3', duration: '15:00' },
  ] },
  { id: 'med-guided-meditation-andy-20m', filename: 'guided-meditation-andy-20m.mp3', title: 'Guided Meditation (20 Min)', duration: '20:00', tag: 'Achtsamkeit' },
  { id: 'med-pro-level-1-eve-12m', filename: 'pro-level-1-eve-12m.mp3', title: 'Pro Level 1', duration: '11:30', tag: 'Achtsamkeit' },
];

export const MEDITATION_TAGS = ['Alle', 'Achtsamkeit', 'Body Scan', 'Schlaf', 'Heilung', 'Mitgefühl', 'Klang', 'Emotionen', 'Beziehungen', 'Alltag & Arbeit', 'Reisen', 'Angst & Stress', 'Dankbarkeit & Mitgefühl', 'Schlafgeschichten'];

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

  // Technik (Import 2026-07-30)
  { id: 'br-box-5m', filename: 'box-breathing-5m.mp3', title: 'Box Breathing', duration: '5:05', tag: 'Technik' },
  { id: 'br-deep-stress-relief-5m', filename: 'deep-breathing-for-stress-relief-eve-5m.mp3', title: 'Deep Breathing for Stress Relief', duration: '5:15', tag: 'Technik' },
  { id: 'br-lazy-eight-5m', filename: 'lazy-eight-breathing-5m.mp3', title: 'Lazy Eight Breathing', duration: '5:05', tag: 'Technik' },
  { id: 'br-star-5m', filename: 'star-breathing-5m.mp3', title: 'Star Breathing', duration: '5:05', tag: 'Technik' },
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
  { id: 'heavy-rain', filename: 'heavy-rain.mp3', name: 'Starker Regen', icon: 'CloudRain', category: 'Regen & Gewitter' },
  { id: 'rain-on-leaves', filename: 'rain-on-leaves.mp3', name: 'Regen auf Blättern', icon: 'Leaf', category: 'Regen & Gewitter' },
  { id: 'rain-on-umbrella', filename: 'rain-on-umbrella.mp3', name: 'Regen auf Schirm', icon: 'Umbrella', category: 'Regen & Gewitter' },

  // Wasser
  { id: 'ocean-waves', filename: 'ocean-waves.mp3', name: 'Meereswellen', icon: 'Waves', category: 'Wasser' },
  { id: 'waves', filename: 'waves.mp3', name: 'Sanfte Wellen', icon: 'Waves', category: 'Wasser' },
  { id: 'river', filename: 'river.mp3', name: 'Fluss', icon: 'Droplets', category: 'Wasser' },
  { id: 'waterfall', filename: 'waterfall.mp3', name: 'Wasserfall', icon: 'Droplets', category: 'Wasser' },
  { id: 'lakeside', filename: 'lakeside.mp3', name: 'Seeufer', icon: 'Mountain', category: 'Wasser' },
  { id: 'underwater', filename: 'underwater.mp3', name: 'Unterwasser', icon: 'Fish', category: 'Wasser' },
  { id: 'hot-tub', filename: 'hot-tub.mp3', name: 'Whirlpool', icon: 'Bath', category: 'Wasser' },
  { id: 'droplets', filename: 'droplets.mp3', name: 'Wassertropfen', icon: 'Droplets', category: 'Wasser' },
  { id: 'bubbles', filename: 'bubbles.mp3', name: 'Blubbern', icon: 'Droplets', category: 'Wasser' },
  { id: 'rowing-boat', filename: 'rowing-boat.mp3', name: 'Ruderboot', icon: 'Sailboat', category: 'Wasser' },
  { id: 'sailboat', filename: 'sailboat.mp3', name: 'Segelboot', icon: 'Sailboat', category: 'Wasser' },

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
  { id: 'jungle', filename: 'jungle.mp3', name: 'Dschungel', icon: 'Trees', category: 'Natur' },
  { id: 'walk-on-leaves', filename: 'walk-on-leaves.mp3', name: 'Schritte im Laub', icon: 'Footprints', category: 'Natur' },
  { id: 'campfire', filename: 'campfire.mp3', name: 'Lagerfeuer', icon: 'Flame', category: 'Natur' },

  // Tiere
  { id: 'cat-purring', filename: 'cat-purring.mp3', name: 'Schnurrende Katze', icon: 'Cat', category: 'Tiere' },
  { id: 'cat-meowing', filename: 'cat-meowing.mp3', name: 'Miauende Katze', icon: 'Cat', category: 'Tiere' },
  { id: 'owl', filename: 'owl.mp3', name: 'Eule', icon: 'Bird', category: 'Tiere' },
  { id: 'wolf', filename: 'wolf.mp3', name: 'Wolf', icon: 'Moon', category: 'Tiere' },
  { id: 'seagulls', filename: 'seagulls.mp3', name: 'Möwen', icon: 'Bird', category: 'Tiere' },
  { id: 'whale', filename: 'whale.mp3', name: 'Wal', icon: 'Fish', category: 'Tiere' },
  { id: 'woodpecker', filename: 'woodpecker.mp3', name: 'Specht', icon: 'Bird', category: 'Tiere' },
  { id: 'beehive', filename: 'beehive.mp3', name: 'Bienenstock', icon: 'Bug', category: 'Tiere' },

  // Orte & Atmosphäre
  { id: 'fireplace', filename: 'fireplace.mp3', name: 'Kaminfeuer', icon: 'Flame', category: 'Orte & Atmosphäre' },
  { id: 'cafe-chatter', filename: 'cafe-chatter.mp3', name: 'Café', icon: 'Coffee', category: 'Orte & Atmosphäre' },
  { id: 'city-traffic', filename: 'city-traffic.mp3', name: 'Stadtverkehr', icon: 'Car', category: 'Orte & Atmosphäre' },
  { id: 'cave', filename: 'cave.mp3', name: 'Höhle', icon: 'Mountain', category: 'Orte & Atmosphäre' },
  { id: 'sauna', filename: 'AMBRoom-Electric-Sauna-Ambience.mp3', name: 'Sauna', icon: 'Flame', category: 'Orte & Atmosphäre' },
  { id: 'space', filename: 'space.mp3', name: 'Weltraum', icon: 'Rocket', category: 'Orte & Atmosphäre' },
  { id: 'spa-ambient', filename: 'spa-ambient.mp3', name: 'Spa I', icon: 'Sparkles', category: 'Orte & Atmosphäre' },
  { id: 'spa-ambient2', filename: 'spa-ambient2.mp3', name: 'Spa II', icon: 'Sparkles', category: 'Orte & Atmosphäre' },
  { id: 'library', filename: 'library.mp3', name: 'Bibliothek', icon: 'BookOpen', category: 'Orte & Atmosphäre' },
  { id: 'church', filename: 'church.mp3', name: 'Kirche', icon: 'Church', category: 'Orte & Atmosphäre' },
  { id: 'temple', filename: 'temple.mp3', name: 'Tempel', icon: 'Landmark', category: 'Orte & Atmosphäre' },
  { id: 'night-village', filename: 'night-village.mp3', name: 'Dorf bei Nacht', icon: 'Moon', category: 'Orte & Atmosphäre' },
  { id: 'inside-a-train', filename: 'inside-a-train.mp3', name: 'Zugfahrt', icon: 'TrainFront', category: 'Orte & Atmosphäre' },
  { id: 'airplane', filename: 'airplane.mp3', name: 'Flugzeugkabine', icon: 'Plane', category: 'Orte & Atmosphäre' },
  { id: 'ceiling-fan', filename: 'ceiling-fan.mp3', name: 'Ventilator', icon: 'Fan', category: 'Orte & Atmosphäre' },

  // Klang & Musik
  { id: 'singing-bowl', filename: 'singing-bowl.mp3', name: 'Klangschale', icon: 'CircleDot', category: 'Klang & Musik' },
  { id: 'monk-chant', filename: 'monk-chant.mp3', name: 'Mönchsgesang', icon: 'Music', category: 'Klang & Musik' },
  { id: 'peaceful', filename: 'peaceful.mp3', name: 'Friedvoll', icon: 'Heart', category: 'Klang & Musik' },
  { id: 'meditation-music', filename: 'meditation.mp3', name: 'Meditationsklang', icon: 'Music', category: 'Klang & Musik' },
  { id: 'soundscapes', filename: 'soundscapes.mp3', name: 'Klanglandschaften', icon: 'AudioWaveform', category: 'Klang & Musik' },
  { id: 'binaural-waves', filename: 'binaural-waves.mp3', name: 'Binaurale Wellen', icon: 'Brain', category: 'Klang & Musik' },
  { id: 'heartbeat', filename: 'heartbeat.mp3', name: 'Herzschlag', icon: 'HeartPulse', category: 'Klang & Musik' },
  { id: 'wind-chimes', filename: 'wind-chimes.mp3', name: 'Windspiel', icon: 'Bell', category: 'Klang & Musik' },
  { id: 'vinyl-effect', filename: 'vinyl-effect.mp3', name: 'Vinyl-Knistern', icon: 'Disc3', category: 'Klang & Musik' },
  { id: 'clock', filename: 'clock.mp3', name: 'Uhrenticken', icon: 'Clock', category: 'Klang & Musik' },

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

  // Heilfrequenzen (Solfeggio) – prozedural erzeugt, nahtlos loopbar
  { id: 'sol-396', filename: '396-hz.wav', name: '396 Hz · Befreiung', icon: 'Sparkles', category: 'Heilfrequenzen' },
  { id: 'sol-417', filename: '417-hz.wav', name: '417 Hz · Wandel', icon: 'Sparkles', category: 'Heilfrequenzen' },
  { id: 'sol-432', filename: '432-hz.wav', name: '432 Hz · Harmonie', icon: 'Sparkles', category: 'Heilfrequenzen' },
  { id: 'sol-528', filename: '528-hz.wav', name: '528 Hz · Heilung', icon: 'Sparkles', category: 'Heilfrequenzen' },
  { id: 'sol-639', filename: '639-hz.wav', name: '639 Hz · Verbindung', icon: 'Sparkles', category: 'Heilfrequenzen' },
  { id: 'sol-741', filename: '741-hz.wav', name: '741 Hz · Klarheit', icon: 'Sparkles', category: 'Heilfrequenzen' },
  { id: 'sol-852', filename: '852-hz.wav', name: '852 Hz · Intuition', icon: 'Sparkles', category: 'Heilfrequenzen' },

  // Binaurale Beats – Stereo, prozedural erzeugt (Kopfhörer empfohlen)
  { id: 'bin-delta', filename: 'binaural-delta.wav', name: 'Delta · Tiefschlaf', icon: 'Brain', category: 'Binaurale Beats' },
  { id: 'bin-theta', filename: 'binaural-theta.wav', name: 'Theta · Meditation', icon: 'Brain', category: 'Binaurale Beats' },
  { id: 'bin-alpha', filename: 'binaural-alpha.wav', name: 'Alpha · Entspannung', icon: 'Brain', category: 'Binaurale Beats' },
];

export const MIX_CATEGORIES = [
  'Regen & Gewitter',
  'Wasser',
  'Natur',
  'Tiere',
  'Orte & Atmosphäre',
  'Klang & Musik',
  'Noise & Frequenzen',
  'Heilfrequenzen',
  'Binaurale Beats',
];
