import React, { useState } from 'react';
import {
  Activity, BookOpen, Briefcase, Clock, CircleDot, Heart, Leaf, Moon, Music,
  Pause, Plane, Play, Sparkles, User, Users, Wind,
} from 'lucide-react';
import { GuidedTrack } from '../types';

type Tint = 'accent' | 'lav';

const TAG_STYLE: Record<string, { icon: React.FC<{ className?: string }>; tint: Tint }> = {
  'Achtsamkeit': { icon: Leaf, tint: 'accent' },
  'Body Scan':   { icon: User, tint: 'lav' },
  'Schlaf':      { icon: Moon, tint: 'accent' },
  'Heilung':     { icon: Sparkles, tint: 'lav' },
  'Mitgefühl':   { icon: Heart, tint: 'accent' },
  'Klang':       { icon: CircleDot, tint: 'lav' },
  'Kurz':        { icon: Clock, tint: 'accent' },
  'Technik':     { icon: Activity, tint: 'lav' },

  // Import 2026-07-30: neue Tags
  'Emotionen':                { icon: Heart, tint: 'lav' },
  'Beziehungen':              { icon: Users, tint: 'accent' },
  'Alltag & Arbeit':          { icon: Briefcase, tint: 'lav' },
  'Reisen':                   { icon: Plane, tint: 'accent' },
  'Angst & Stress':           { icon: Wind, tint: 'lav' },
  'Dankbarkeit & Mitgefühl':  { icon: Heart, tint: 'accent' },
  'Schlafgeschichten':        { icon: BookOpen, tint: 'lav' },
};
const DEFAULT_STYLE = { icon: Music, tint: 'accent' as Tint };


const TITLE_TRANSLATIONS: Record<string, string> = {
  'Meditational': 'Meditativ',
  'Ancient Meditation': 'Uralte Meditation',
  'Calming Meditation': 'Beruhigende Meditation',
  'Working with Difficulties': 'Mit Schwierigkeiten umgehen',
  '3 Minute Sounds': '3 Minuten Klänge',
  'Body & Sound Meditation': 'Körper- & Klangmeditation',
  'Breath, Sound, Body': 'Atem, Klang, Körper',
  'Breath, Body, Thoughts & Emotions': 'Atem, Körper, Gedanken & Gefühle',
  'Loving Kindness': 'Liebevolle Güte',
  'Calm Sleep': 'Ruhiger Schlaf',
  'Guided Meditation (5 Min)': 'Geführte Meditation (5 Min)',
  'Guided Meditation (10 Min)': 'Geführte Meditation (10 Min)',
  'Guided Meditation (15 Min)': 'Geführte Meditation (15 Min)',
  'Guided Meditation (20 Min)': 'Geführte Meditation (20 Min)',
  'Finding Time for Joy': 'Zeit für Freude finden',
  'For the Weekend': 'Für das Wochenende',
  'Midday Check-in': 'Mittags-Check-in',
  'Mindful Coffee Walk': 'Achtsamer Kaffee-Spaziergang',
  'Taking a Break (10 Min)': 'Eine Pause nehmen (10 Min)',
  'Taking a Break (3 Min)': 'Eine Pause nehmen (3 Min)',
  'Taking a Break (5 Min)': 'Eine Pause nehmen (5 Min)',
  'Time for Me': 'Zeit für mich',
  'Waking Up': 'Aufwachen',
  'Work Crisis SOS': 'Arbeitskrise SOS',
  'Befriending Jet Lag': 'Jetlag annehmen',
  'Dealing with Nighttime Wake-Ups': 'Mit nächtlichem Aufwachen umgehen',
  'Easing Post-Travel Stress': 'Stress nach der Reise lösen',
  'The Power of Morning Sunlight': 'Die Kraft der Morgensonne',
  'Calming an Anxious Mind': 'Einen ängstlichen Geist beruhigen',
  'Coping With Cravings (11 Min)': 'Mit Verlangen umgehen (11 Min)',
  'Coping With Cravings (22 Min)': 'Mit Verlangen umgehen (22 Min)',
  'Feeling Overwhelmed SOS': 'Überforderung SOS',
  'Finding Calm': 'Ruhe finden',
  'Grounding a Racing Mind': 'Rasende Gedanken erden',
  'Managing Anxiety': 'Angst bewältigen',
  'Managing Anxious Moments': 'Ängstliche Momente bewältigen',
  'Managing Stress in Uncertain Times': 'Stress in unsicheren Zeiten bewältigen',
  'Appreciation': 'Wertschätzung',
  'Earth Appreciation': 'Wertschätzung für die Erde',
  'Generosity (12 Min)': 'Großzügigkeit (12 Min)',
  'Generosity (17 Min)': 'Großzügigkeit (17 Min)',
  'Generosity (22 Min)': 'Großzügigkeit (22 Min)',
  'Happiness of Others': 'Freude für andere',
  'Kindness (12 Min)': 'Freundlichkeit (12 Min)',
  'Kindness (22 Min)': 'Freundlichkeit (22 Min)',
  'Gentle Aquarium Ambience': 'Sanfte Aquarium-Atmosphäre',
  'Arctic Light': 'Arktisches Licht',
  'Kauai at Sunset': 'Kauai bei Sonnenuntergang',
  'Moonrise Meadow': 'Mondaufgangswiese',
  'Nighttime in Joshua Tree': 'Nacht im Joshua Tree',
  'Rainy Grove': 'Regnerischer Hain',
  'Relaxation': 'Entspannung',
  'Sleep to the Sounds of Twilight Beach': 'Einschlafen am Dämmerungsstrand',
  'Sleepiness': 'Schläfrigkeit',
  'Unwind in Maui': 'Loslassen auf Maui',
  'Walk by the Riverside': 'Spaziergang am Flussufer',
  'Walking in Nature': 'Spaziergang in der Natur',
  'Waters of the Mind': 'Gewässer des Geistes',
  'Whispering Pines': 'Flüsternde Kiefern',
  'A Bedtime Story for Adults': 'Eine Schlafgeschichte für Erwachsene',
  'After Carnival': 'Nach dem Karneval',
  'Cozy Lodge by a Peaceful Scottish Loch': 'Gemütliche Hütte am ruhigen schottischen See',
  'Drift to Sleep at the Ocean’s Edge': 'Am Meeresrand in den Schlaf gleiten',
  'Evening Tide': 'Abendflut',
  'Fall Asleep in a Hushed Theater': 'In einem stillen Theater einschlafen',
  'Fall Asleep in the Wilderness (Olympic National Park)': 'In der Wildnis einschlafen (Olympic National Park)',
  'Flower Market': 'Blumenmarkt',
  'Lavender Fields': 'Lavendelfelder',
  'Moonlit Stones & Ocean Waves': 'Mondhelle Steine & Meereswellen',
  'Rainday Antiques': 'Regentag-Antiquitäten',
  'Rainday Antiques II': 'Regentag-Antiquitäten II',
  'Sleep Sounds by the Sea (Sandy Cove)': 'Schlafklänge am Meer (Sandy Cove)',
  'Snuggly Pup Palace': 'Kuscheliger Welpenpalast',
  'Starlight Diner': 'Sternenlicht-Diner',
  'Sunset Boat Ride': 'Bootsfahrt bei Sonnenuntergang',
  'Twilight in the Grand Canyon': 'Dämmerung im Grand Canyon',
  'Vineyard Bedtime Story (No Wine Required)': 'Schlafgeschichte im Weinberg (ohne Wein)',
  'Pro Level 1': 'Profi-Level 1',
};

const displayTitle = (track: GuidedTrack) => TITLE_TRANSLATIONS[track.title] ?? track.title;


const hashText = (text: string) => {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return hash;
};

type TrackScene =
  | 'joshua' | 'aquarium' | 'arctic' | 'beach' | 'meadow' | 'grove' | 'maui' | 'river'
  | 'pines' | 'carnival' | 'lodge' | 'theater' | 'wilderness' | 'flowers' | 'lavender'
  | 'antiques' | 'diner' | 'boat' | 'canyon' | 'vineyard' | 'pup' | 'coffee' | 'work'
  | 'travel' | 'heart' | 'grounding' | 'body' | 'sound' | 'breath' | 'calm';

const getTrackScene = (track: GuidedTrack): TrackScene => {
  const topic = `${track.tag} ${displayTitle(track)} ${track.title}`.toLowerCase();
  if (topic.includes('joshua')) return 'joshua';
  if (topic.includes('aquarium') || topic.includes('underwater')) return 'aquarium';
  if (topic.includes('arctic')) return 'arctic';
  if (topic.includes('twilight beach') || topic.includes('ocean') || topic.includes('sea') || topic.includes('sandy cove') || topic.includes('tide')) return 'beach';
  if (topic.includes('moonrise meadow')) return 'meadow';
  if (topic.includes('rainy grove')) return 'grove';
  if (topic.includes('maui') || topic.includes('kauai')) return 'maui';
  if (topic.includes('riverside') || topic.includes('waters')) return 'river';
  if (topic.includes('pines')) return 'pines';
  if (topic.includes('carnival')) return 'carnival';
  if (topic.includes('lodge') || topic.includes('loch')) return 'lodge';
  if (topic.includes('theater')) return 'theater';
  if (topic.includes('wilderness') || topic.includes('olympic')) return 'wilderness';
  if (topic.includes('flower market')) return 'flowers';
  if (topic.includes('lavender')) return 'lavender';
  if (topic.includes('antiques')) return 'antiques';
  if (topic.includes('diner')) return 'diner';
  if (topic.includes('boat')) return 'boat';
  if (topic.includes('grand canyon')) return 'canyon';
  if (topic.includes('vineyard')) return 'vineyard';
  if (topic.includes('pup')) return 'pup';
  if (topic.includes('coffee')) return 'coffee';
  if (topic.includes('work') || topic.includes('pause') || topic.includes('break') || topic.includes('weekend') || topic.includes('check-in')) return 'work';
  if (topic.includes('travel') || topic.includes('jet lag') || topic.includes('morning sunlight')) return 'travel';
  if (topic.includes('kind') || topic.includes('compassion') || topic.includes('mitgefühl') || topic.includes('gratitude') || topic.includes('appreciation') || topic.includes('generosity')) return 'heart';
  if (topic.includes('anx') || topic.includes('stress') || topic.includes('overwhelmed') || topic.includes('calm') || topic.includes('grounding')) return 'grounding';
  if (topic.includes('body')) return 'body';
  if (topic.includes('sound') || topic.includes('klang')) return 'sound';
  if (topic.includes('breath') || topic.includes('atem')) return 'breath';
  return 'calm';
};

const TrackArt: React.FC<{ track: GuidedTrack; tint: Tint }> = ({ track, tint }) => {
  const seed = hashText(`${track.id}-${displayTitle(track)}`);
  const scene = getTrackScene(track);
  const moonX = 24 + (seed % 72);
  const moonY = 13 + ((seed >> 4) % 16);
  const accent = tint === 'accent' ? '#7cd6ab' : '#b3a4ea';
  const soft = tint === 'accent' ? '#d8f0e3' : '#dce4ff';

  return (
    <svg viewBox="0 0 128 92" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`track-${track.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.6" />
          <stop offset="68%" stopColor="#405b73" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#242631" stopOpacity="0.98" />
        </linearGradient>
      </defs>
      <rect width="128" height="92" fill={`url(#track-${track.id})`} />
      <circle cx={moonX} cy={moonY} r={scene === 'arctic' ? 10 : 7} fill="#fff" opacity="0.72" />
      {Array.from({ length: 7 }).map((_, i) => (
        <circle key={i} cx={10 + ((seed >> (i * 4)) % 112)} cy={9 + ((seed >> (i * 5 + 1)) % 32)} r={0.7 + (i % 2) * 0.35} fill="#fff" opacity="0.46" />
      ))}

      {scene === 'joshua' && <><path d="M0 72c18-10 36-6 52-13 24-11 45-10 76 4v29H0Z" fill="#2f3542"/><path d="M16 68c12-15 29-20 46-16 15 4 29 1 50-8 8 9 12 19 16 32H0c4-3 9-6 16-8Z" fill="#5f5262" opacity="0.64"/><path d="M82 70V35M82 49c-11-2-13-11-8-17M82 54c13-2 16-9 14-18" stroke="#7cd6ab" strokeWidth="5" strokeLinecap="round" fill="none"/><path d="M50 70V46M50 55c-8-1-11-7-9-13" stroke="#7cd6ab" strokeWidth="3" strokeLinecap="round" fill="none"/></>}
      {scene === 'aquarium' && <><path d="M0 70q18-8 36 0t36 0 36 0 20 0v22H0Z" fill="#223f55"/><path d="M16 48q12-10 24 0t24 0 24 0 24 0" stroke="#dce4ff" strokeWidth="2" fill="none" opacity="0.6"/><path d="M48 48c10-7 20-7 30 0-10 7-20 7-30 0Z" fill={soft}/><circle cx="58" cy="46" r="1.3" fill="#242631"/><path d="M29 76c1-12 9-18 18-21-2 11-8 18-18 21Z" fill="#7cd6ab" opacity="0.62"/></>}
      {scene === 'arctic' && <><path d="M0 70 30 42l16 18 20-26 34 36Z" fill="#dce4ff" opacity="0.64"/><path d="M46 60 66 34l34 36H0l30-28Z" fill="#fff" opacity="0.35"/><path d="M12 74c24-6 47-6 104 0" stroke="#fff" strokeWidth="5" opacity="0.42"/></>}
      {scene === 'beach' && <><path d="M0 66q18-10 36 0t36 0 36 0 20 0v26H0Z" fill="#20384f"/><path d="M14 58q15-8 30 0t30 0 30 0" stroke="#dce4ff" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M84 66c9-15 18-22 32-29" stroke="#2e594a" strokeWidth="3"/><path d="M105 39c-12-1-21 5-29 13 13 1 23-2 29-13Z" fill="#7cd6ab" opacity="0.7"/></>}
      {scene === 'meadow' && <><path d="M0 68c28-16 58-13 128-4v28H0Z" fill="#315947"/><path d="M18 74c16-14 32-16 48-9 18-9 35-8 52 5" stroke="#7cd6ab" strokeWidth="3" fill="none" opacity="0.62"/><circle cx="36" cy="62" r="2" fill="#c7b8f5"/><circle cx="72" cy="67" r="2" fill="#d8f0e3"/></>}
      {scene === 'grove' || scene === 'pines' ? <><path d="M0 72c28-8 70-11 128-2v22H0Z" fill="#2f3f3a"/><path d="M24 70 38 38l14 32ZM60 72 76 31l17 41ZM96 72l12-28 13 28Z" fill="#7cd6ab" opacity="0.52"/><path d="M18 44c24-8 54-7 92 1" stroke="#dce4ff" strokeWidth="2" opacity="0.35"/></> : null}
      {scene === 'maui' && <><path d="M0 70c26-8 47-9 66-2 20-8 40-8 62-1v25H0Z" fill="#2f4a5e"/><path d="M70 70 92 42l22 28Z" fill="#405b73"/><path d="M28 61c9-15 20-22 36-30" stroke="#2e594a" strokeWidth="3"/><path d="M55 34c-15 0-25 7-33 18 16 1 27-4 33-18Z" fill="#7cd6ab" opacity="0.72"/></>}
      {scene === 'river' && <><path d="M0 66c24-12 42-8 58-15 19-8 44-7 70 5v36H0Z" fill="#2d4b52"/><path d="M42 92c10-24 19-36 30-44 8 15 5 31-5 44Z" fill="#dce4ff" opacity="0.46"/><path d="M52 72q10-6 20 0t20 0" stroke="#fff" strokeWidth="2" opacity="0.5" fill="none"/></>}
      {scene === 'carnival' && <><path d="M0 72h128v20H0Z" fill="#2f3542"/><path d="M25 68l14-29 14 29ZM75 68l14-29 14 29Z" fill="#c7b8f5" opacity="0.68"/><path d="M23 49h32M73 49h32" stroke="#fff" strokeWidth="2" opacity="0.45"/><circle cx="64" cy="50" r="13" fill="none" stroke="#7cd6ab" strokeWidth="2" opacity="0.6"/></>}
      {scene === 'lodge' && <><path d="M0 72c35-9 82-9 128 0v20H0Z" fill="#263a45"/><path d="M35 69V49l29-18 29 18v20Z" fill="#7a6170"/><path d="M45 69V55h15v14M68 54h13v10H68Z" fill="#f3d6a6" opacity="0.72"/><path d="M24 72 42 42M104 72 86 42" stroke="#7cd6ab" strokeWidth="4" opacity="0.55"/></>}
      {scene === 'theater' && <><path d="M16 25h96v49H16Z" fill="#2b2836"/><path d="M24 31h80v33H24Z" fill="#d8f0e3" opacity="0.16"/><path d="M16 25c16 9 32 10 48 0 16 10 32 9 48 0v12c-16 7-32 7-48 0-16 7-32 7-48 0Z" fill="#b3a4ea" opacity="0.72"/><path d="M22 80h84" stroke="#7cd6ab" strokeWidth="4" opacity="0.42"/></>}
      {scene === 'wilderness' && <><path d="M0 72 25 44l16 18 22-30 28 40Z" fill="#405b73"/><path d="M55 72 85 34l43 38Z" fill="#304454"/><path d="M22 72 34 47l13 25ZM88 72l12-26 14 26Z" fill="#7cd6ab" opacity="0.58"/></>}
      {scene === 'flowers' || scene === 'lavender' ? <><path d="M0 70c35-12 80-12 128 0v22H0Z" fill="#36533f"/><path d="M22 73V52M44 76V48M67 73V50M91 76V47M108 73V53" stroke="#7cd6ab" strokeWidth="2"/><circle cx="22" cy="50" r="4" fill="#f3d6e8"/><circle cx="44" cy="46" r="4" fill={scene === 'lavender' ? '#b3a4ea' : '#d8f0e3'}/><circle cx="67" cy="48" r="4" fill="#c7b8f5"/><circle cx="91" cy="45" r="4" fill={scene === 'lavender' ? '#b3a4ea' : '#f3d6e8'}/><circle cx="108" cy="51" r="4" fill="#d8f0e3"/></> : null}
      {scene === 'antiques' && <><path d="M0 73h128v19H0Z" fill="#2f3542"/><rect x="24" y="44" width="34" height="25" rx="4" fill="#7a6170"/><rect x="70" y="35" width="28" height="34" rx="4" fill="#5f5262"/><circle cx="41" cy="55" r="8" fill="none" stroke="#f3d6a6" strokeWidth="2"/><path d="M79 43h10M79 52h10M79 61h10" stroke="#d8f0e3" strokeWidth="2" opacity="0.6"/></>}
      {scene === 'diner' && <><path d="M0 70h128v22H0Z" fill="#26323f"/><rect x="22" y="38" width="84" height="30" rx="5" fill="#d8f0e3" opacity="0.28"/><path d="M22 48h84" stroke="#f3d6e8" strokeWidth="5" opacity="0.65"/><circle cx="40" cy="30" r="7" fill="#7cd6ab" opacity="0.72"/><circle cx="64" cy="30" r="7" fill="#c7b8f5" opacity="0.72"/><circle cx="88" cy="30" r="7" fill="#7cd6ab" opacity="0.72"/></>}
      {scene === 'boat' && <><path d="M0 67q18-8 36 0t36 0 36 0 20 0v25H0Z" fill="#21394f"/><path d="M47 58h36l-8 10H55Z" fill="#d8f0e3" opacity="0.72"/><path d="M64 57V32l18 18H64Z" fill="#c7b8f5" opacity="0.78"/><path d="M64 32 49 52h15Z" fill="#7cd6ab" opacity="0.72"/></>}
      {scene === 'canyon' && <><path d="M0 74 18 46h20l14 28ZM47 74l19-39h19l20 39ZM95 74l12-25h21v43H0V74Z" fill="#7a5262"/><path d="M16 74h96" stroke="#f3d6a6" strokeWidth="5" opacity="0.3"/><path d="M63 74 76 43l16 31Z" fill="#405b73" opacity="0.45"/></>}
      {scene === 'vineyard' && <><path d="M0 70c30-12 72-12 128-2v24H0Z" fill="#36533f"/><path d="M16 72c16-12 31-12 45 0M64 72c16-12 31-12 45 0" stroke="#7cd6ab" strokeWidth="3" opacity="0.65" fill="none"/><circle cx="43" cy="58" r="3" fill="#b3a4ea"/><circle cx="49" cy="63" r="3" fill="#b3a4ea"/><circle cx="88" cy="58" r="3" fill="#b3a4ea"/><circle cx="94" cy="63" r="3" fill="#b3a4ea"/></>}
      {scene === 'pup' && <><path d="M0 72c30-9 74-9 128 0v20H0Z" fill="#3b3a45"/><ellipse cx="66" cy="60" rx="28" ry="16" fill="#d8f0e3" opacity="0.65"/><circle cx="50" cy="49" r="9" fill="#d8f0e3" opacity="0.78"/><circle cx="82" cy="49" r="9" fill="#d8f0e3" opacity="0.78"/><circle cx="59" cy="57" r="2" fill="#242631"/><circle cx="73" cy="57" r="2" fill="#242631"/><path d="M63 63q4 4 8 0" stroke="#242631" strokeWidth="2" fill="none"/></>}
      {scene === 'coffee' && <><path d="M0 72h128v20H0Z" fill="#2f3542"/><path d="M48 59h28v9c0 8-6 13-14 13s-14-5-14-13Z" fill="#d8f0e3" opacity="0.7"/><path d="M76 62h8c0 8-4 11-10 10" stroke="#d8f0e3" strokeWidth="3" fill="none" opacity="0.7"/><path d="M54 45c-4-6 6-7 2-13M65 45c-4-6 6-7 2-13" stroke="#fff" strokeWidth="2" opacity="0.5"/></>}
      {scene === 'work' && <><path d="M0 72h128v20H0Z" fill="#2f3542"/><rect x="37" y="38" width="54" height="34" rx="5" fill="#d8f0e3" opacity="0.24"/><path d="M52 72V51h24v21" fill="#c7b8f5" opacity="0.55"/><path d="M30 60c11-10 23-10 34 0 12-10 24-10 35 0" stroke="#7cd6ab" strokeWidth="3" fill="none" opacity="0.58"/></>}
      {scene === 'travel' && <><path d="M0 72c36-10 77-10 128 0v20H0Z" fill="#2f3542"/><path d="M27 47c25-9 49-9 74 0" stroke="#d8f0e3" strokeWidth="3" fill="none" opacity="0.62"/><path d="M66 32l27 26-27-8-27 8Z" fill="#c7b8f5" opacity="0.76"/></>}
      {scene === 'heart' && <><path d="M0 72c34-12 79-12 128 0v20H0Z" fill="#33413d"/><path d="M64 61c-17-10-21-28-8-30 6 0 8 4 8 9 0-5 4-9 10-9 13 2 9 20-10 30Z" fill="#f3d6e8" opacity="0.8"/><path d="M34 74c10-9 20-11 30-5 10-6 20-4 30 5" stroke="#7cd6ab" strokeWidth="3" fill="none" opacity="0.52"/></>}
      {scene === 'grounding' && <><path d="M0 70c29-10 70-10 128 0v22H0Z" fill="#32453e"/><circle cx="64" cy="50" r="18" fill="none" stroke="#d8f0e3" strokeWidth="2" opacity="0.5"/><path d="M44 62c13 7 27 7 40 0M64 32v36" stroke="#7cd6ab" strokeWidth="3" strokeLinecap="round" opacity="0.68"/></>}
      {scene === 'body' && <><path d="M0 72c34-9 76-9 128 0v20H0Z" fill="#33413d"/><ellipse cx="64" cy="59" rx="28" ry="10" fill="#c7b8f5" opacity="0.52"/><circle cx="36" cy="59" r="7" fill="#d8f0e3" opacity="0.72"/><path d="M44 58h43" stroke="#d8f0e3" strokeWidth="7" strokeLinecap="round" opacity="0.62"/><path d="M24 49h80" stroke="#7cd6ab" strokeWidth="2" opacity="0.56"/></>}
      {scene === 'sound' && <><path d="M0 72c36-11 78-10 128 0v20H0Z" fill="#2f3f45"/><circle cx="64" cy="52" r="10" fill="none" stroke="#d8f0e3" strokeWidth="2.5" opacity="0.68"/><circle cx="64" cy="52" r="21" fill="none" stroke="#c7b8f5" strokeWidth="2" opacity="0.46"/><path d="M18 67q14-9 28 0t28 0 28 0" stroke="#7cd6ab" strokeWidth="2.5" fill="none" opacity="0.58"/></>}
      {scene === 'breath' && <><path d="M0 72c36-11 78-10 128 0v20H0Z" fill="#2f3f45"/><path d="M30 58q17-17 34 0t34 0" stroke="#d8f0e3" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.72"/><circle cx="64" cy="45" r="14" fill="none" stroke="#7cd6ab" strokeWidth="2" opacity="0.58"/></>}
      {scene === 'calm' && <><path d="M0 72c28-13 51-10 70-17 20-7 40-5 58 5v32H0Z" fill="#31464c"/><circle cx="64" cy="51" r="16" fill="none" stroke="#d8f0e3" strokeWidth="2" opacity="0.52"/><path d="M38 68c17-12 35-12 52 0" stroke="#7cd6ab" strokeWidth="3" fill="none" opacity="0.58"/></>}
    </svg>
  );
};


interface Props {
  tracks: GuidedTrack[];
  currentId?: string;
  onSelect: (track: GuidedTrack) => void;
}

/** Löst die aktuell gewählte Sprecher-Variante zu einem spielbaren Track auf. */
function resolveVariant(track: GuidedTrack, narrator: string | null): GuidedTrack {
  if (!track.narrators || !narrator) return track;
  const variant = track.narrators.find(n => n.narrator === narrator);
  if (!variant) return track;
  return {
    ...track,
    id: `${track.id}::${variant.narrator}`,
    filename: variant.filename,
    duration: variant.duration,
  };
}

const TrackCard: React.FC<{
  track: GuidedTrack;
  currentId?: string;
  onSelect: (track: GuidedTrack) => void;
}> = ({ track, currentId, onSelect }) => {
  const hasNarrators = !!track.narrators && track.narrators.length > 1;
  const [narrator, setNarrator] = useState<string | null>(
    hasNarrators ? track.narrators![0].narrator : null
  );
  const resolved = resolveVariant(track, narrator);
  const active = resolved.id === currentId;
  const { tint } = TAG_STYLE[track.tag] ?? DEFAULT_STYLE;

  return (
    <button
      onClick={() => onSelect(resolved)}
      className="text-left rounded-2xl overflow-hidden flex flex-col transition-transform hover:-translate-y-0.5"
      style={{
        background: 'var(--surface)',
        boxShadow: active ? '0 14px 28px -10px var(--shadow)' : '0 10px 24px -12px var(--shadow)',
        outline: active ? '2px solid var(--accent)' : 'none',
        outlineOffset: active ? '-2px' : undefined,
      }}
    >
      <div className="h-36 overflow-hidden">
        <TrackArt track={track} tint={tint} />
      </div>

      <div className="p-4 flex flex-col gap-3.5 flex-grow">
        <span className="text-sm font-extrabold leading-snug line-clamp-2" style={{ color: 'var(--text)' }}>
          {displayTitle(track)}
        </span>

        {hasNarrators && (
          <span className="flex flex-wrap gap-1 -mt-2">
            {track.narrators!.map(v => (
              <span
                key={v.narrator}
                role="button"
                tabIndex={0}
                onClick={e => {
                  e.stopPropagation();
                  setNarrator(v.narrator);
                  if (active) onSelect(resolveVariant(track, v.narrator));
                }}
                onKeyDown={e => {
                  if (e.key !== 'Enter' && e.key !== ' ') return;
                  e.preventDefault();
                  e.stopPropagation();
                  setNarrator(v.narrator);
                  if (active) onSelect(resolveVariant(track, v.narrator));
                }}
                className="px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors"
                style={
                  v.narrator === narrator
                    ? { background: 'var(--accent)', color: 'var(--accent-ink)' }
                    : { background: 'var(--surface-2)', color: 'var(--text-muted)' }
                }
              >
                {v.narrator}
              </span>
            ))}
          </span>
        )}

        <div className="flex items-center justify-between mt-auto">
          <span className="flex items-center gap-1.5 text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
            <Clock className="w-3 h-3" />
            {resolved.duration}
          </span>
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={
              active
                ? { background: 'var(--accent)', color: 'var(--accent-ink)' }
                : { background: `var(--${tint}-soft)`, color: `var(--${tint})` }
            }
          >
            {active ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </span>
        </div>
      </div>
    </button>
  );
};

export const TrackList: React.FC<Props> = ({ tracks, currentId, onSelect }) => {
  if (tracks.length === 0) {
    return <p className="text-center text-sm py-16" style={{ color: 'var(--text-faint)' }}>Nichts gefunden.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {tracks.map(track => (
        <TrackCard key={track.id} track={track} currentId={currentId} onSelect={onSelect} />
      ))}
    </div>
  );
};
