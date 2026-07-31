import React from 'react';

/**
 * Kleine, ruhige Nacht-Illustrationen im Stil des Referenzbilds (gedämpftes
 * Navy/Blau-Violett, flache geometrische Formen, Mond/Sterne, sanftes Glühen).
 * Eine Szene pro Meditations-Thema, für die Themen-Kacheln im Meditation-Tab.
 */

const Stars: React.FC<{ opacity?: number }> = ({ opacity = 0.55 }) => (
  <>
    <circle cx="18" cy="14" r="1.3" fill="#fff" opacity={opacity} />
    <circle cx="34" cy="24" r="0.9" fill="#fff" opacity={opacity * 0.8} />
    <circle cx="82" cy="16" r="1.1" fill="#fff" opacity={opacity} />
    <circle cx="96" cy="30" r="0.8" fill="#fff" opacity={opacity * 0.7} />
    <circle cx="62" cy="10" r="0.9" fill="#fff" opacity={opacity * 0.8} />
  </>
);

const Glow: React.FC<{ cx: number; cy: number; r: number; color: string; opacity?: number }> = ({ cx, cy, r, color, opacity = 0.35 }) => (
  <circle cx={cx} cy={cy} r={r} fill={color} opacity={opacity} style={{ filter: 'blur(10px)' }} />
);

const viewBox = '0 0 120 80';
const wrap = (children: React.ReactNode) => (
  <svg viewBox={viewBox} className="w-full h-full" preserveAspectRatio="xMidYMid slice">{children}</svg>
);

/* Schlafgeschichten — schlafende Figur im Bett, Mond + Sterne, "Zzz" */
const SchlafgeschichtenArt = () => wrap(<>
  <Stars />
  <circle cx="94" cy="18" r="10" fill="#aab4e8" opacity="0.8" />
  <circle cx="90" cy="15" r="8" fill="#2b3561" />
  <Glow cx="30" cy="55" r="26" color="#7c86c9" opacity="0.25" />
  <rect x="10" y="58" width="66" height="10" rx="5" fill="#3a4270" />
  <path d="M14 58c0-10 6-16 16-16h20c10 0 16 8 16 16Z" fill="#4a5488" />
  <ellipse cx="34" cy="50" rx="18" ry="11" fill="#c9cdf0" />
  <circle cx="24" cy="44" r="6" fill="#e8eaff" />
  <text x="46" y="30" fontSize="9" fill="#c9cdf0" opacity="0.9" fontWeight="700">z</text>
  <text x="52" y="24" fontSize="7" fill="#c9cdf0" opacity="0.7" fontWeight="700">z</text>
  <text x="57" y="19" fontSize="5" fill="#c9cdf0" opacity="0.5" fontWeight="700">z</text>
</>);

/* Schlaf — Mondsichel, Sterne, sanftes Glühen */
const SchlafArt = () => wrap(<>
  <Stars opacity={0.6} />
  <Glow cx="70" cy="34" r="24" color="#8fa0e0" opacity="0.3" />
  <path d="M82 20a16 16 0 1 0 0 28 13 13 0 1 1 0-28Z" fill="#dbe0fb" />
  <circle cx="30" cy="58" r="2" fill="#fff" opacity="0.5" />
  <circle cx="42" cy="62" r="1.3" fill="#fff" opacity="0.4" />
</>);

/* Achtsamkeit — sitzende, meditierende Silhouette unter sanftem Halo */
const AchtsamkeitArt = () => wrap(<>
  <Stars opacity={0.4} />
  <Glow cx="60" cy="40" r="28" color="#9a8fe0" opacity="0.3" />
  <circle cx="60" cy="30" r="9" fill="#d9d3f7" />
  <path d="M38 66c0-14 10-22 22-22s22 8 22 22Z" fill="#8b80d6" />
  <path d="M38 66c4-8 12-12 22-12s18 4 22 12Z" fill="#a89ee6" />
  <circle cx="60" cy="16" r="1.4" fill="#fff" opacity="0.6" />
  <circle cx="52" cy="20" r="1" fill="#fff" opacity="0.4" />
  <circle cx="68" cy="20" r="1" fill="#fff" opacity="0.4" />
</>);

/* Body Scan — liegende Silhouette, Linie sanfter Lichtpunkte */
const BodyScanArt = () => wrap(<>
  <Stars opacity={0.4} />
  <Glow cx="60" cy="42" r="30" color="#7f8fd0" opacity="0.25" />
  <ellipse cx="60" cy="56" rx="42" ry="9" fill="#3d4670" />
  <ellipse cx="60" cy="50" rx="36" ry="10" fill="#5a64a0" />
  <circle cx="26" cy="49" r="7" fill="#d6d9f5" />
  <circle cx="40" cy="30" r="1.6" fill="#e9ecff" opacity="0.9" />
  <circle cx="52" cy="24" r="1.6" fill="#e9ecff" opacity="0.75" />
  <circle cx="64" cy="20" r="1.6" fill="#e9ecff" opacity="0.6" />
  <circle cx="76" cy="24" r="1.6" fill="#e9ecff" opacity="0.45" />
</>);

/* Heilung — erblühende Pflanze/Lotus mit sanften Lichtstrahlen */
const HeilungArt = () => wrap(<>
  <Stars opacity={0.35} />
  <Glow cx="60" cy="38" r="30" color="#5fd0b0" opacity="0.28" />
  {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
    <line key={a}
      x1={60 + Math.cos(a * Math.PI / 180) * 14} y1={38 + Math.sin(a * Math.PI / 180) * 14}
      x2={60 + Math.cos(a * Math.PI / 180) * 24} y2={38 + Math.sin(a * Math.PI / 180) * 24}
      stroke="#bff2e2" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
  ))}
  <circle cx="60" cy="38" r="11" fill="#2c5750" />
  <circle cx="60" cy="38" r="6" fill="#8fe8cd" />
  <ellipse cx="60" cy="66" rx="30" ry="7" fill="#234840" />
</>);

/* Mitgefühl — zwei sanfte Herz-/Aura-Formen */
const MitgefuehlArt = () => wrap(<>
  <Stars opacity={0.4} />
  <Glow cx="60" cy="40" r="28" color="#e0a0c0" opacity="0.28" />
  <circle cx="60" cy="42" r="24" fill="none" stroke="#d9a8c8" strokeWidth="1" opacity="0.4" />
  <path d="M60 54c-16-9-16-24-6-24 5 0 8 3 6 8 -2-5-11-4-11 3 0 8 7 14 11 17Z" fill="#e8b8d4" />
  <path d="M60 54c16-9 16-24 6-24-5 0-8 3-6 8 2-5 11-4 11 3 0 8-7 14-11 17Z" fill="#c98cba" />
</>);

/* Klang — Klangschale mit aufsteigenden Klangwellen */
const KlangArt = () => wrap(<>
  <Stars opacity={0.4} />
  <Glow cx="60" cy="40" r="26" color="#d8b06a" opacity="0.25" />
  <path d="M40 44q20-10 40 0" stroke="#e8cf9a" strokeWidth="1.3" fill="none" opacity="0.5" />
  <path d="M36 50q24-13 48 0" stroke="#e8cf9a" strokeWidth="1.3" fill="none" opacity="0.35" />
  <ellipse cx="60" cy="56" rx="26" ry="6" fill="#7a5a34" />
  <path d="M34 56c0 9 12 14 26 14s26-5 26-14Z" fill="#c99a58" />
</>);

/* Emotionen — Wellenlinie / wechselnde Stimmung, verstreute Punkte */
const EmotionenArt = () => wrap(<>
  <Stars opacity={0.4} />
  <Glow cx="60" cy="38" r="28" color="#a888d8" opacity="0.28" />
  <path d="M18 42q12-16 24 0t24 0 24 0 24 0" stroke="#d6c2f0" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
  <circle cx="30" cy="30" r="1.6" fill="#e9dbfa" opacity="0.7" />
  <circle cx="60" cy="24" r="1.3" fill="#e9dbfa" opacity="0.5" />
  <circle cx="90" cy="30" r="1.6" fill="#e9dbfa" opacity="0.6" />
</>);

/* Beziehungen — zwei Silhouetten nah beieinander */
const BeziehungenArt = () => wrap(<>
  <Stars opacity={0.4} />
  <Glow cx="60" cy="42" r="28" color="#8296d8" opacity="0.28" />
  <circle cx="50" cy="30" r="8" fill="#cdd4f6" />
  <path d="M32 62c0-12 8-19 18-19s18 7 18 19Z" fill="#7c88c4" />
  <circle cx="72" cy="32" r="7" fill="#dfe3fa" />
  <path d="M56 62c0-11 7-17 16-17s16 6 16 17Z" fill="#94a0d8" />
</>);

/* Alltag & Arbeit — Schreibtisch-Silhouette mit Lampe */
const AlltagArt = () => wrap(<>
  <Stars opacity={0.4} />
  <Glow cx="70" cy="30" r="20" color="#e8d888" opacity="0.25" />
  <rect x="16" y="52" width="88" height="6" rx="2" fill="#3d4468" />
  <rect x="24" y="34" width="26" height="18" rx="2" fill="#4d5786" />
  <rect x="27" y="37" width="20" height="12" rx="1" fill="#8fa0e8" opacity="0.7" />
  <path d="M72 52V34" stroke="#7a86ba" strokeWidth="2" />
  <path d="M72 34l14-6" stroke="#7a86ba" strokeWidth="2" strokeLinecap="round" />
  <circle cx="86" cy="26" r="6" fill="#f0dd8e" opacity="0.9" />
</>);

/* Reisen — Berg-Horizont, Mond, kleines Flugzeug */
const ReisenArt = () => wrap(<>
  <Stars opacity={0.5} />
  <circle cx="90" cy="18" r="7" fill="#dbe0fb" opacity="0.9" />
  <path d="M10 62l22-26 14 14 12-18 26 30 20-14 8 8v6H10Z" fill="#33406c" />
  <path d="M10 62l22-26 14 14 12-18 8 9-24 21H10Z" fill="#3f4d7e" />
  <path d="M46 24l6 3-2 5-6-2Z" fill="#dbe0fb" opacity="0.8" />
</>);

/* Angst & Stress — beruhigende, konzentrische Wellen um einen ruhigen Punkt */
const AngstStressArt = () => wrap(<>
  <Stars opacity={0.35} />
  <circle cx="60" cy="40" r="26" fill="none" stroke="#7fd0c8" strokeWidth="1" opacity="0.3" />
  <circle cx="60" cy="40" r="18" fill="none" stroke="#7fd0c8" strokeWidth="1.2" opacity="0.4" />
  <circle cx="60" cy="40" r="10" fill="none" stroke="#9fe0d8" strokeWidth="1.4" opacity="0.55" />
  <circle cx="60" cy="40" r="4" fill="#c8f0e8" />
</>);

/* Dankbarkeit & Mitgefühl — geöffnete Hände mit sanftem Licht */
const DankbarkeitArt = () => wrap(<>
  <Stars opacity={0.4} />
  <Glow cx="60" cy="36" r="22" color="#e8b8a0" opacity="0.3" />
  <circle cx="60" cy="34" r="7" fill="#ffe8c8" />
  <path d="M28 58c6-14 16-16 32-16s26 2 32 16c-10 6-22 9-32 9s-22-3-32-9Z" fill="#c98878" />
  <path d="M28 58c6-9 16-11 32-11s26 2 32 11" stroke="#e0a894" strokeWidth="1.4" fill="none" opacity="0.6" />
</>);

export interface ThemeArtConfig {
  gradient: string;
  Scene: React.FC;
}

export const THEME_ART: Record<string, ThemeArtConfig> = {
  'Schlafgeschichten':       { gradient: 'linear-gradient(160deg,#2d3561,#1a2036)', Scene: SchlafgeschichtenArt },
  'Schlaf':                  { gradient: 'linear-gradient(160deg,#232a4d,#141a33)', Scene: SchlafArt },
  'Achtsamkeit':             { gradient: 'linear-gradient(160deg,#383a68,#201f3d)', Scene: AchtsamkeitArt },
  'Body Scan':               { gradient: 'linear-gradient(160deg,#2f3a5c,#1b2338)', Scene: BodyScanArt },
  'Heilung':                 { gradient: 'linear-gradient(160deg,#1f4a4a,#142e2e)', Scene: HeilungArt },
  'Mitgefühl':               { gradient: 'linear-gradient(160deg,#4a3350,#241a30)', Scene: MitgefuehlArt },
  'Klang':                   { gradient: 'linear-gradient(160deg,#4a3a2a,#241d16)', Scene: KlangArt },
  'Emotionen':               { gradient: 'linear-gradient(160deg,#3d2c52,#201a33)', Scene: EmotionenArt },
  'Beziehungen':             { gradient: 'linear-gradient(160deg,#384268,#1e2440)', Scene: BeziehungenArt },
  'Alltag & Arbeit':         { gradient: 'linear-gradient(160deg,#37415c,#1c2133)', Scene: AlltagArt },
  'Reisen':                  { gradient: 'linear-gradient(160deg,#2b3a5a,#16203a)', Scene: ReisenArt },
  'Angst & Stress':          { gradient: 'linear-gradient(160deg,#23384a,#131f2c)', Scene: AngstStressArt },
  'Dankbarkeit & Mitgefühl': { gradient: 'linear-gradient(160deg,#4a3348,#26192a)', Scene: DankbarkeitArt },
};

export const DEFAULT_THEME_ART: ThemeArtConfig = {
  gradient: 'linear-gradient(160deg,#2f3a5c,#1b2338)',
  Scene: SchlafArt,
};
