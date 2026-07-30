import React from 'react';
import { Play, Pause, Clock } from 'lucide-react';
import { GuidedTrack } from '../types';

/* ── Inline SVG Illustrations ─────────────────────────────────────── */

const Lotus = () => (
  <svg viewBox="-50 -50 100 100" fill="none" className="w-full h-full">
    {([0,45,90,135,180,225,270,315] as number[]).map(a => (
      <ellipse key={a} cx={0} cy={-22} rx={7} ry={18}
        transform={`rotate(${a})`} fill="rgba(255,255,255,0.42)" />
    ))}
    <circle r={14} fill="rgba(255,255,255,0.12)" />
    <circle r={9} fill="rgba(255,255,255,0.78)" />
  </svg>
);

const MoonStars = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
    <defs>
      <mask id="moon-mask">
        <rect width="100" height="100" fill="white" />
        <circle cx={56} cy={44} r={24} fill="black" />
      </mask>
    </defs>
    <circle cx={40} cy={52} r={27} fill="rgba(255,255,255,0.8)" mask="url(#moon-mask)" />
    <circle cx={74} cy={22} r={2.5} fill="rgba(255,255,255,0.7)" />
    <circle cx={83} cy={55} r={1.5} fill="rgba(255,255,255,0.6)" />
    <circle cx={70} cy={76} r={1.5} fill="rgba(255,255,255,0.5)" />
    <circle cx={88} cy={35} r={1}   fill="rgba(255,255,255,0.5)" />
    <circle cx={62} cy={80} r={1}   fill="rgba(255,255,255,0.4)" />
  </svg>
);

const HealingRays = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i * 30) * Math.PI / 180;
      return (
        <line key={i}
          x1={50 + Math.cos(a) * 20} y1={50 + Math.sin(a) * 20}
          x2={50 + Math.cos(a) * 44} y2={50 + Math.sin(a) * 44}
          stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"
        />
      );
    })}
    <circle cx={50} cy={50} r={20} fill="rgba(255,255,255,0.08)" />
    <circle cx={50} cy={50} r={12} fill="rgba(255,255,255,0.3)" />
    <circle cx={50} cy={50} r={6}  fill="rgba(255,255,255,0.85)" />
  </svg>
);

const HeartAura = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
    <circle cx={50} cy={52} r={40} stroke="rgba(255,255,255,0.1)"  strokeWidth="1.5" />
    <circle cx={50} cy={52} r={30} stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
    <path d="M50 68 C14 50 14 22 50 38 C86 22 86 50 50 68Z" fill="rgba(255,255,255,0.75)" />
  </svg>
);

const SingingBowl = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
    <path d="M32 40 Q50 30 68 40" stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M24 31 Q50 17 76 31" stroke="rgba(255,255,255,0.26)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 22 Q50 4  84 22" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" strokeLinecap="round" />
    <ellipse cx={50} cy={48} rx={30} ry={6} fill="rgba(255,255,255,0.18)" />
    <path d="M20 48 Q22 72 50 72 Q78 72 80 48" fill="rgba(255,255,255,0.62)" />
    <rect x={43} y={72} width={14} height={5} rx={2.5} fill="rgba(255,255,255,0.52)" />
  </svg>
);

const MeditatingFigure = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
    <circle cx={50} cy={27} r={10} fill="rgba(255,255,255,0.75)" />
    <ellipse cx={50} cy={61} rx={24} ry={16} fill="rgba(255,255,255,0.5)" />
    <path d="M26 59 Q20 69 32 74" stroke="rgba(255,255,255,0.6)" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M74 59 Q80 69 68 74" stroke="rgba(255,255,255,0.6)" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx={50} cy={38} r={2.5} fill="rgba(255,255,255,0.55)" />
    <circle cx={50} cy={48} r={2.5} fill="rgba(255,255,255,0.42)" />
    <circle cx={50} cy={58} r={2.5} fill="rgba(255,255,255,0.30)" />
  </svg>
);

const BreathWave = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
    <path d="M5 50 Q20 25 35 50 Q50 75 65 50 Q80 25 95 50"
      stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 57 Q20 32 35 57 Q50 82 65 57 Q80 32 95 57"
      stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ── Tag → gradient + illustration map ───────────────────────────── */

type ArtConfig = { gradient: string; Illustration: React.FC };

const TAG_ART: Record<string, ArtConfig> = {
  Achtsamkeit:  { gradient: 'linear-gradient(135deg,#1e1b4b,#5b21b6)', Illustration: Lotus },
  'Body Scan':  { gradient: 'linear-gradient(135deg,#1e293b,#312e81)', Illustration: MeditatingFigure },
  Schlaf:       { gradient: 'linear-gradient(135deg,#0c1445,#1e3a5f)', Illustration: MoonStars },
  Heilung:      { gradient: 'linear-gradient(135deg,#022c22,#065f46)', Illustration: HealingRays },
  Mitgefühl:    { gradient: 'linear-gradient(135deg,#4c0519,#831843)', Illustration: HeartAura },
  Klang:        { gradient: 'linear-gradient(135deg,#451a03,#92400e)', Illustration: SingingBowl },
  Kurz:         { gradient: 'linear-gradient(135deg,#022c22,#134e4a)', Illustration: BreathWave },
  Technik:      { gradient: 'linear-gradient(135deg,#1e1b4b,#164e63)', Illustration: BreathWave },

  // Import 2026-07-30: neue Tags, bestehende Illustrationen mit neuen Gradients
  Emotionen:                 { gradient: 'linear-gradient(135deg,#3b0764,#a21caf)', Illustration: HeartAura },
  Beziehungen:                { gradient: 'linear-gradient(135deg,#4a044e,#be185d)', Illustration: MeditatingFigure },
  'Alltag & Arbeit':          { gradient: 'linear-gradient(135deg,#0f172a,#334155)', Illustration: BreathWave },
  Reisen:                     { gradient: 'linear-gradient(135deg,#083344,#0e7490)', Illustration: Lotus },
  'Angst & Stress':           { gradient: 'linear-gradient(135deg,#1e3a2f,#15803d)', Illustration: HealingRays },
  'Dankbarkeit & Mitgefühl':  { gradient: 'linear-gradient(135deg,#451a03,#b45309)', Illustration: HeartAura },
  Schlafgeschichten:          { gradient: 'linear-gradient(135deg,#0f0c29,#302b63)', Illustration: MoonStars },
};

const DEFAULT_ART: ArtConfig = {
  gradient: 'linear-gradient(135deg,#0f172a,#1e3a5f)',
  Illustration: BreathWave,
};

/* ── Component ───────────────────────────────────────────────────── */

interface Props {
  tracks: GuidedTrack[];
  currentId?: string;
  onSelect: (track: GuidedTrack) => void;
}

export const TrackList: React.FC<Props> = ({ tracks, currentId, onSelect }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
    {tracks.map(track => {
      const active = track.id === currentId;
      const { gradient, Illustration } = TAG_ART[track.tag] ?? DEFAULT_ART;

      return (
        <button
          key={track.id}
          onClick={() => onSelect(track)}
          className={`group rounded-2xl border overflow-hidden text-left transition-all duration-200 ${
            active
              ? 'border-transparent shadow-[0_0_0_2px_#e4e4e7]'
              : 'border-night-800 hover:border-night-700'
          }`}
        >
          {/* Artwork */}
          <div className="relative h-28 sm:h-32 overflow-hidden" style={{ background: gradient }}>
            <div className="absolute inset-0 scale-110 opacity-65 pointer-events-none">
              <Illustration />
            </div>
            {/* Bottom fade into card body */}
            <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Playing indicator dot */}
            {active && (
              <span className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-slate-50 shadow-[0_0_8px_rgba(250,250,250,0.9)]" />
            )}

            {/* Play / Pause badge */}
            <span className={`absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              active
                ? 'bg-slate-50 text-night-950'
                : 'bg-black/50 text-slate-300 opacity-0 group-hover:opacity-100'
            }`}>
              {active
                ? <Pause className="w-3.5 h-3.5" />
                : <Play  className="w-3.5 h-3.5 ml-0.5" />}
            </span>
          </div>

          {/* Track info */}
          <div className="bg-night-900/80 px-3 pt-2.5 pb-3 space-y-1.5">
            <span className="block font-heading text-sm font-semibold text-slate-100 leading-snug line-clamp-2">
              {track.title}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="w-3 h-3 shrink-0" />
              {track.duration}
              <span className="text-slate-700">·</span>
              {track.tag}
            </span>
          </div>
        </button>
      );
    })}
  </div>
);
