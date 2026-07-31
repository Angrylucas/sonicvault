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

const TrackArt: React.FC<{ track: GuidedTrack; tint: Tint }> = ({ track, tint }) => {
  const seed = hashText(`${track.id}-${displayTitle(track)}`);
  const orbX = 22 + (seed % 64);
  const orbY = 16 + ((seed >> 3) % 24);
  const peakA = 24 + ((seed >> 6) % 18);
  const peakB = 46 + ((seed >> 9) % 17);
  const curve = 20 + ((seed >> 12) % 14);
  const topic = `${track.tag} ${displayTitle(track)} ${track.title}`.toLowerCase();
  const isSleep = topic.includes('schlaf') || topic.includes('sleep') || topic.includes('bedtime') || topic.includes('night');
  const isWater = topic.includes('water') || topic.includes('sea') || topic.includes('ocean') || topic.includes('river') || topic.includes('beach') || topic.includes('maui');
  const isHeart = topic.includes('kind') || topic.includes('compassion') || topic.includes('mitgefühl') || topic.includes('gratitude') || topic.includes('appreciation');
  const isWork = topic.includes('work') || topic.includes('break') || topic.includes('coffee') || topic.includes('alltag');

  return (
    <svg viewBox="0 0 128 68" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`track-${track.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={tint === 'accent' ? '#7cd6ab' : '#b3a4ea'} stopOpacity="0.62" />
          <stop offset="100%" stopColor="#242631" stopOpacity="0.96" />
        </linearGradient>
      </defs>
      <rect width="128" height="68" fill={`url(#track-${track.id})`} />
      <circle cx={orbX} cy={orbY} r={isSleep ? 8 : 13} fill="#fff" opacity={isSleep ? 0.72 : 0.16} />
      <path d={`M0 58 C ${curve} 42, ${peakA + 16} 54, ${peakB + 28} 34 S 110 48, 128 28 V68 H0Z`} fill="#fff" opacity="0.10" />
      <path d={`M8 62 C ${peakA} 50, ${peakB} 63, 120 48`} stroke="#d8f0e3" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.45" />
      {isWater && <path d="M12 48q14-9 28 0t28 0 28 0 28 0" stroke="#dce4ff" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.72" />}
      {isHeart && <path d="M64 45c-13-8-15-21-5-22 4 0 6 3 6 6 0-3 3-6 7-6 10 1 7 14-8 22Z" fill="#f3d6e8" opacity="0.78" />}
      {isWork && <rect x="50" y="28" width="31" height="21" rx="5" fill="#d8f0e3" opacity="0.42" />}
      {!isWater && !isHeart && !isWork && !isSleep && <circle cx="65" cy="38" r={10 + (seed % 9)} fill="none" stroke="#d8f0e3" strokeWidth="1.8" opacity="0.48" />}
      {Array.from({ length: 5 }).map((_, i) => (
        <circle key={i} cx={14 + ((seed >> (i * 4)) % 102)} cy={10 + ((seed >> (i * 5 + 2)) % 30)} r={0.8 + (i % 2) * 0.35} fill="#fff" opacity="0.48" />
      ))}
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
  const { icon: Icon, tint } = TAG_STYLE[track.tag] ?? DEFAULT_STYLE;

  return (
    <button
      onClick={() => onSelect(resolved)}
      className="text-left rounded-2xl p-4 flex flex-col gap-3.5 transition-transform hover:-translate-y-0.5"
      style={{
        background: 'var(--surface)',
        boxShadow: active ? '0 14px 28px -10px var(--shadow)' : '0 10px 24px -12px var(--shadow)',
        outline: active ? '2px solid var(--accent)' : 'none',
        outlineOffset: active ? '-2px' : undefined,
      }}
    >
      <div className="h-24 -m-4 mb-0 overflow-hidden">
        <TrackArt track={track} tint={tint} />
      </div>

      <div className="flex items-center justify-between">
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: `var(--${tint}-soft)`, color: `var(--${tint})` }}
        >
          <Icon className="w-4 h-4" />
        </span>
        <span className="text-[10px] font-extrabold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
          {track.tag}
        </span>
      </div>

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
