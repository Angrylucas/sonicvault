import React from 'react';

/**
 * Ruhige Kachel-Illustrationen für das Meditations-Zwischenmenü.
 * Stilreferenz: flache Nacht-Szenen mit weichen, organischen Flächen,
 * gedecktem Navy, Website-Akzenten in Mint/Lavendel und ohne harte Kontraste.
 */

const viewBox = '0 0 120 80';

const wrap = (children: React.ReactNode) => (
  <svg viewBox={viewBox} className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <filter id="soft-blur" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="5" />
      </filter>
    </defs>
    {children}
  </svg>
);

const Atmosphere: React.FC<{ glow?: string; moon?: boolean }> = ({ glow = '#b3a4ea', moon = true }) => (
  <>
    <path d="M6 66c8-18 22-18 34-30C55 20 58 7 83 8c27 1 34 22 33 50v22H0V68Z" fill="#ffffff" opacity="0.06" />
    <circle cx="68" cy="37" r="34" fill={glow} opacity="0.18" filter="url(#soft-blur)" />
    {moon && (
      <>
        <circle cx="94" cy="18" r="8" fill="#dce4ff" opacity="0.88" />
        <path d="M90 12c4 2 8 5 10 10-2 2-5 4-9 4-5 0-9-4-9-9 0-2 0-3 1-5 2-1 4-1 7 0Z" fill="#b3a4ea" opacity="0.42" />
      </>
    )}
    <circle cx="24" cy="18" r="1.2" fill="#ffffff" opacity="0.62" />
    <circle cx="38" cy="29" r="0.9" fill="#ffffff" opacity="0.42" />
    <circle cx="72" cy="14" r="1" fill="#ffffff" opacity="0.5" />
    <circle cx="101" cy="36" r="0.9" fill="#ffffff" opacity="0.45" />
    <path d="M53 18l1.4 3 3 1.4-3 1.3-1.4 3-1.3-3-3-1.3 3-1.4Z" fill="#ffffff" opacity="0.55" />
  </>
);

const Ground = ({ color = '#24332d' }) => <ellipse cx="60" cy="67" rx="45" ry="7" fill={color} opacity="0.75" />;

const MeditatingPerson: React.FC<{ x?: number; y?: number; robe?: string; skin?: string }> = ({
  x = 60,
  y = 48,
  robe = '#7cd6ab',
  skin = '#f1c6a8',
}) => (
  <g transform={`translate(${x - 60} ${y - 48})`}>
    <circle cx="60" cy="31" r="7" fill={skin} />
    <path d="M51 31c3-8 12-10 18-3-1-7-5-11-12-10-6 1-9 6-6 13Z" fill="#1b2036" />
    <path d="M45 55c2-11 8-17 15-17s13 6 15 17Z" fill={robe} />
    <path d="M33 63c7-10 17-13 27-8 10-5 20-2 27 8-11 5-22 6-27 1-5 5-16 4-27-1Z" fill={robe} opacity="0.78" />
    <path d="M48 50c7 5 17 5 24 0" stroke="#e8fff5" strokeWidth="2" strokeLinecap="round" opacity="0.55" fill="none" />
  </g>
);

const SchlafgeschichtenArt = () => wrap(<>
  <Atmosphere glow="#8fa0e0" />
  <rect x="12" y="54" width="70" height="12" rx="5" fill="#405b73" />
  <rect x="13" y="45" width="20" height="21" rx="4" fill="#5f7d94" />
  <ellipse cx="37" cy="49" rx="19" ry="9" fill="#d4e5ee" />
  <path d="M35 49c13-8 33-7 57 8 0 10-6 16-17 18H35Z" fill="#87a9b8" />
  <path d="M66 54c9 6 17 8 25 7" stroke="#6e90a3" strokeWidth="2" strokeLinecap="round" opacity="0.55" fill="none" />
  <circle cx="46" cy="43" r="6" fill="#f1c6a8" />
  <path d="M40 42c4-8 13-8 17-2-2-5-6-8-12-7-5 1-8 4-5 9Z" fill="#111827" />
  <text x="17" y="37" fontSize="9" fill="#eef7f4" fontWeight="700" opacity="0.9">Z</text>
  <text x="24" y="30" fontSize="7" fill="#eef7f4" fontWeight="700" opacity="0.68">Z</text>
</>);

const SchlafArt = () => wrap(<>
  <Atmosphere glow="#b3a4ea" moon={false} />
  <path d="M78 19a17 17 0 1 0 0 30 13 13 0 1 1 0-30Z" fill="#dce4ff" />
  <path d="M20 63c10-8 23-10 38-4 12 5 27 4 42-6-8 15-25 23-48 22-13-1-24-5-32-12Z" fill="#405b73" opacity="0.74" />
  <circle cx="31" cy="56" r="5" fill="#d4e5ee" />
</>);

const AchtsamkeitArt = () => wrap(<>
  <Atmosphere glow="#7cd6ab" />
  <circle cx="60" cy="38" r="25" fill="none" stroke="#c3e6d2" strokeWidth="1.2" opacity="0.32" />
  <circle cx="60" cy="38" r="17" fill="none" stroke="#b3a4ea" strokeWidth="1" opacity="0.32" />
  <MeditatingPerson robe="#7cd6ab" />
  <Ground />
</>);

const BodyScanArt = () => wrap(<>
  <Atmosphere glow="#8fa0e0" />
  <Ground color="#2c3d55" />
  <ellipse cx="61" cy="55" rx="37" ry="9" fill="#7f9cad" opacity="0.9" />
  <circle cx="27" cy="53" r="7" fill="#d4e5ee" />
  <path d="M29 51c9-5 24-6 43-2 9 2 17 5 24 10-9 4-23 3-41-1-10-2-19-3-26-7Z" fill="#5f7d94" />
  <path d="M37 38c11-8 29-12 50-6" stroke="#dce4ff" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="1 9" opacity="0.85" />
  <circle cx="60" cy="31" r="3" fill="#7cd6ab" opacity="0.9" />
</>);

const HeilungArt = () => wrap(<>
  <Atmosphere glow="#7cd6ab" />
  <Ground />
  <path d="M60 64V44" stroke="#7cd6ab" strokeWidth="3" strokeLinecap="round" />
  <path d="M60 51c-15-5-19-16-7-20 7 5 9 12 7 20Z" fill="#c3e6d2" />
  <path d="M60 51c15-5 19-16 7-20-7 5-9 12-7 20Z" fill="#7cd6ab" />
  <path d="M60 45c-9-9-7-19 0-23 7 4 9 14 0 23Z" fill="#b3a4ea" />
  <circle cx="60" cy="42" r="18" fill="none" stroke="#d8f0e3" opacity="0.38" />
</>);

const MitgefuehlArt = () => wrap(<>
  <Atmosphere glow="#b3a4ea" />
  <Ground color="#302c4a" />
  <path d="M60 55c-18-10-21-27-8-28 5 0 8 3 8 7 0-4 3-7 8-7 13 1 10 18-8 28Z" fill="#c7b8f5" />
  <path d="M35 62c7-8 16-10 25-5 9-5 18-3 25 5-8 5-17 6-25 2-8 4-17 3-25-2Z" fill="#7cd6ab" opacity="0.45" />
</>);

const KlangArt = () => wrap(<>
  <Atmosphere glow="#d8f0e3" />
  <Ground color="#2c3d35" />
  <path d="M40 35q20-11 40 0" stroke="#d8f0e3" strokeWidth="1.6" fill="none" opacity="0.55" />
  <path d="M34 43q26-14 52 0" stroke="#c7b8f5" strokeWidth="1.6" fill="none" opacity="0.46" />
  <ellipse cx="60" cy="56" rx="27" ry="7" fill="#c3a66b" />
  <path d="M34 56c2 11 13 16 26 16s24-5 26-16Z" fill="#8a744f" />
  <ellipse cx="60" cy="55" rx="22" ry="4" fill="#f0dfab" opacity="0.55" />
</>);

const EmotionenArt = () => wrap(<>
  <Atmosphere glow="#b3a4ea" />
  <Ground color="#302c4a" />
  <path d="M20 44q10-14 20 0t20 0 20 0 20 0" stroke="#c7b8f5" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.78" />
  <circle cx="35" cy="33" r="5" fill="#7cd6ab" opacity="0.76" />
  <circle cx="60" cy="27" r="4" fill="#d8f0e3" opacity="0.72" />
  <circle cx="85" cy="33" r="5" fill="#b3a4ea" opacity="0.72" />
</>);

const BeziehungenArt = () => wrap(<>
  <Atmosphere glow="#8fa0e0" />
  <Ground color="#2c3d55" />
  <MeditatingPerson x={50} y={50} robe="#7cd6ab" />
  <MeditatingPerson x={72} y={51} robe="#b3a4ea" skin="#f3d5bf" />
  <path d="M49 27c4-6 18-6 22 0" stroke="#dce4ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" fill="none" />
</>);

const AlltagArt = () => wrap(<>
  <Atmosphere glow="#7cd6ab" />
  <rect x="19" y="53" width="82" height="6" rx="3" fill="#405b73" />
  <rect x="28" y="35" width="27" height="18" rx="3" fill="#5f7d94" />
  <rect x="31" y="38" width="21" height="12" rx="2" fill="#c7b8f5" opacity="0.58" />
  <path d="M75 53V36l12-7" stroke="#8fa0e0" strokeWidth="2.4" strokeLinecap="round" />
  <circle cx="88" cy="28" r="7" fill="#d8f0e3" opacity="0.86" />
  <path d="M37 64c12 5 30 5 43 0" stroke="#7cd6ab" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
</>);

const ReisenArt = () => wrap(<>
  <Atmosphere glow="#8fa0e0" />
  <path d="M8 65 30 38l14 15 13-20 24 31 18-14 13 15Z" fill="#2c3d55" />
  <path d="M30 38 44 53l13-20 9 12-24 20H8Z" fill="#405b73" />
  <path d="m47 27 20 7-16 4-3 8-4-10-10-4Z" fill="#dce4ff" opacity="0.78" />
  <path d="M37 34c7-5 16-7 27-6" stroke="#7cd6ab" strokeWidth="1.3" strokeLinecap="round" opacity="0.45" fill="none" />
</>);

const AngstStressArt = () => wrap(<>
  <Atmosphere glow="#7cd6ab" moon={false} />
  <circle cx="60" cy="42" r="29" fill="none" stroke="#7cd6ab" strokeWidth="1" opacity="0.24" />
  <circle cx="60" cy="42" r="21" fill="none" stroke="#7cd6ab" strokeWidth="1.2" opacity="0.34" />
  <circle cx="60" cy="42" r="13" fill="none" stroke="#d8f0e3" strokeWidth="1.6" opacity="0.54" />
  <circle cx="60" cy="42" r="5" fill="#d8f0e3" />
  <path d="M37 61c13 5 33 5 46 0" stroke="#b3a4ea" strokeWidth="2" strokeLinecap="round" opacity="0.38" fill="none" />
</>);

const DankbarkeitArt = () => wrap(<>
  <Atmosphere glow="#b3a4ea" />
  <Ground color="#302c4a" />
  <circle cx="60" cy="36" r="8" fill="#d8f0e3" opacity="0.9" />
  <path d="M31 58c7-12 17-15 29-9 12-6 22-3 29 9-8 7-19 10-29 6-10 4-21 1-29-6Z" fill="#c7b8f5" opacity="0.84" />
  <path d="M34 58c8-6 17-8 26-4 9-4 18-2 26 4" stroke="#f8f8f8" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" fill="none" />
</>);

export interface ThemeArtConfig {
  gradient: string;
  Scene: React.FC;
}

export const THEME_ART: Record<string, ThemeArtConfig> = {
  'Schlafgeschichten':       { gradient: 'linear-gradient(160deg,#405b73,#242631 72%)', Scene: SchlafgeschichtenArt },
  'Schlaf':                  { gradient: 'linear-gradient(160deg,#384268,#1e2029 76%)', Scene: SchlafArt },
  'Achtsamkeit':             { gradient: 'linear-gradient(160deg,#24332d,#302c4a)', Scene: AchtsamkeitArt },
  'Body Scan':               { gradient: 'linear-gradient(160deg,#405b73,#242631 76%)', Scene: BodyScanArt },
  'Heilung':                 { gradient: 'linear-gradient(160deg,#2c3d35,#1e2029 74%)', Scene: HeilungArt },
  'Mitgefühl':               { gradient: 'linear-gradient(160deg,#302c4a,#242631 76%)', Scene: MitgefuehlArt },
  'Klang':                   { gradient: 'linear-gradient(160deg,#405b73,#24332d 78%)', Scene: KlangArt },
  'Emotionen':               { gradient: 'linear-gradient(160deg,#302c4a,#242631 76%)', Scene: EmotionenArt },
  'Beziehungen':             { gradient: 'linear-gradient(160deg,#384268,#242631 76%)', Scene: BeziehungenArt },
  'Alltag & Arbeit':         { gradient: 'linear-gradient(160deg,#405b73,#242631 76%)', Scene: AlltagArt },
  'Reisen':                  { gradient: 'linear-gradient(160deg,#384268,#1e2029 76%)', Scene: ReisenArt },
  'Angst & Stress':          { gradient: 'linear-gradient(160deg,#24332d,#1e2029 76%)', Scene: AngstStressArt },
  'Dankbarkeit & Mitgefühl': { gradient: 'linear-gradient(160deg,#302c4a,#24332d 78%)', Scene: DankbarkeitArt },
};

export const DEFAULT_THEME_ART: ThemeArtConfig = {
  gradient: 'linear-gradient(160deg,#384268,#242631 76%)',
  Scene: SchlafArt,
};
