import React from 'react';

/* Feste Sternpositionen für Konsistenz */
const STARS: { x: number; y: number; r: number; dur: number; delay: number }[] = [
  { x: 95,  y: 22, r: 1.2, dur: 3.1, delay: 0   },
  { x: 220, y: 48, r: 0.9, dur: 4.2, delay: 0.7 },
  { x: 370, y: 18, r: 1.5, dur: 2.8, delay: 1.4 },
  { x: 510, y: 38, r: 1.0, dur: 3.7, delay: 0.3 },
  { x: 640, y: 12, r: 1.3, dur: 4.5, delay: 1.8 },
  { x: 760, y: 55, r: 0.8, dur: 3.0, delay: 0.9 },
  { x: 890, y: 28, r: 1.1, dur: 2.6, delay: 2.1 },
  { x: 1040, y: 44, r: 1.4, dur: 3.9, delay: 0.5 },
  { x: 1150, y: 20, r: 0.9, dur: 3.3, delay: 1.1 },
  { x: 155, y: 75, r: 1.0, dur: 4.1, delay: 0.2 },
  { x: 300, y: 90, r: 1.3, dur: 2.9, delay: 1.6 },
  { x: 460, y: 65, r: 0.7, dur: 3.6, delay: 0.8 },
  { x: 590, y: 95, r: 1.2, dur: 4.3, delay: 2.3 },
  { x: 710, y: 72, r: 0.9, dur: 3.1, delay: 0.4 },
  { x: 850, y: 88, r: 1.1, dur: 2.7, delay: 1.7 },
  { x: 985, y: 62, r: 1.4, dur: 3.8, delay: 0.1 },
  { x: 1110, y: 80, r: 0.8, dur: 4.0, delay: 1.3 },
  { x: 52,  y: 55, r: 1.0, dur: 3.4, delay: 0.6 },
  { x: 428, y: 30, r: 1.2, dur: 2.5, delay: 2.0 },
  { x: 670, y: 85, r: 0.9, dur: 4.4, delay: 0.9 },
  { x: 820, y: 48, r: 1.3, dur: 3.2, delay: 1.5 },
  { x: 1075, y: 68, r: 1.0, dur: 3.7, delay: 0.3 },
  { x: 280, y: 115, r: 0.8, dur: 4.6, delay: 1.9 },
  { x: 535, y: 128, r: 1.1, dur: 3.0, delay: 0.7 },
  { x: 695, y: 108, r: 1.3, dur: 2.8, delay: 2.2 },
  { x: 945, y: 122, r: 0.9, dur: 3.5, delay: 0.4 },
  { x: 1098, y: 105, r: 1.2, dur: 4.2, delay: 1.0 },
];

const FIREFLIES = [
  { x: 182, y: 228, dur: 2.8, delay: 0.0 },
  { x: 355, y: 255, dur: 3.4, delay: 1.1 },
  { x: 518, y: 200, dur: 2.6, delay: 0.6 },
  { x: 688, y: 240, dur: 3.1, delay: 1.8 },
  { x: 828, y: 218, dur: 2.9, delay: 0.3 },
  { x: 962, y: 248, dur: 3.6, delay: 1.4 },
  { x: 1088, y: 205, dur: 2.7, delay: 0.8 },
  { x: 432, y: 272, dur: 3.2, delay: 2.0 },
  { x: 764, y: 262, dur: 2.5, delay: 0.5 },
];

export const NightScene: React.FC = () => (
  <div className="relative w-full overflow-hidden" style={{ maxHeight: '38vh', minHeight: 180 }}>
    <svg
      viewBox="0 0 1200 340"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      style={{ display: 'block' }}
    >
      <defs>
        {/* Sky gradient */}
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#020610" />
          <stop offset="55%"  stopColor="#080e28" />
          <stop offset="100%" stopColor="#14082c" />
        </linearGradient>

        {/* Horizon warm glow */}
        <radialGradient id="horizonGlow" cx="50%" cy="100%" r="55%">
          <stop offset="0%"   stopColor="#3d1a4e" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#14082c" stopOpacity="0" />
        </radialGradient>

        {/* Moon glow */}
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ffe8a0" stopOpacity="0.35" />
          <stop offset="60%"  stopColor="#ffe8a0" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffe8a0" stopOpacity="0" />
        </radialGradient>

        {/* Firefly glow */}
        <radialGradient id="ffGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#f9e070" stopOpacity="0.85" />
          <stop offset="50%"  stopColor="#f9c840" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f9c840" stopOpacity="0" />
        </radialGradient>

        {/* Mist / fog gradient */}
        <linearGradient id="mistGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#14082c" stopOpacity="0" />
          <stop offset="100%" stopColor="#080418" stopOpacity="0.85" />
        </linearGradient>

        {/* Side vignettes */}
        <linearGradient id="vigL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#030712" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#030712" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="vigR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#030712" stopOpacity="0" />
          <stop offset="100%" stopColor="#030712" stopOpacity="0.9" />
        </linearGradient>

        {/* Soft glow filter */}
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="moonFilter" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── Sky ── */}
      <rect width="1200" height="340" fill="url(#skyGrad)" />
      <rect width="1200" height="340" fill="url(#horizonGlow)" />

      {/* ── Stars ── */}
      {STARS.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#ccd8f0">
          <animate
            attributeName="opacity"
            values="0.15;0.85;0.15"
            dur={`${s.dur}s`}
            begin={`${s.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* ── Moon halo ── */}
      <circle cx="820" cy="78" r="80" fill="url(#moonGlow)" />
      {/* Moon body */}
      <circle cx="820" cy="78" r="30" fill="#f0e8d5" filter="url(#moonFilter)" />
      {/* Moon shadow/craters */}
      <circle cx="810" cy="70" r="5.5" fill="#d8d0be" opacity="0.45" />
      <circle cx="829" cy="84" r="3.5" fill="#d8d0be" opacity="0.38" />
      <circle cx="836" cy="66" r="2.5" fill="#d8d0be" opacity="0.32" />

      {/* ── Distant hills ── */}
      <path d="M0,230 Q120,195 280,215 Q460,235 600,205 Q740,178 900,200 Q1040,220 1200,208 L1200,340 L0,340 Z"
            fill="#060912" />

      {/* ── Mid hills ── */}
      <path d="M0,262 Q90,248 220,258 Q380,270 530,250 Q680,232 840,255 Q990,274 1140,260 L1200,260 L1200,340 L0,340 Z"
            fill="#050811" />

      {/* ── LEFT trees ── */}
      {/* tallest */}
      <polygon points="55,295  108,130  161,295"  fill="#03060e" />
      <polygon points="74,258  108,163  142,258"  fill="#04070e" />
      <rect    x="99"  y="292" width="18" height="32" fill="#03060e" />
      {/* medium */}
      <polygon points="0,295   36,190   72,295"   fill="#03060e" />
      <rect    x="28"  y="293" width="14" height="24" fill="#03060e" />
      {/* small cluster */}
      <polygon points="138,298 170,208 202,298"  fill="#04070d" />
      <polygon points="162,302 185,232 208,302"  fill="#03060d" />

      {/* Mushrooms left */}
      <ellipse cx="200" cy="300" rx="16" ry="7" fill="#150820" />
      <path    d="M192,300 Q200,281 208,300" fill="#280d40" />
      <ellipse cx="218" cy="302" rx="10" ry="5" fill="#150820" />
      <path    d="M211,302 Q218,287 225,302" fill="#200b36" />
      {/* Small glow flower left */}
      <circle  cx="252" cy="302" r="3" fill="#f5c060" opacity="0.55" filter="url(#softGlow)" />
      <circle  cx="263" cy="304" r="2" fill="#f5c060" opacity="0.38" />

      {/* ── RIGHT trees ── */}
      <polygon points="1039,292 1092,135 1145,292" fill="#03060e" />
      <polygon points="1058,256 1092,165 1126,256" fill="#04070e" />
      <rect    x="1083" y="290" width="18" height="32" fill="#03060e" />
      <polygon points="1128,297 1162,202 1196,297" fill="#04070d" />
      <polygon points="990,300  1014,230  1038,300" fill="#03060d" />

      {/* Mushrooms right */}
      <ellipse cx="995" cy="300" rx="14" ry="6" fill="#150820" />
      <path    d="M988,300 Q995,283 1002,300" fill="#280d40" />
      {/* Small glow flower right */}
      <circle  cx="940" cy="302" r="3" fill="#f5c060" opacity="0.5" filter="url(#softGlow)" />
      <circle  cx="928" cy="304" r="2" fill="#f5c060" opacity="0.35" />

      {/* ── Ground ── */}
      <rect x="0" y="300" width="1200" height="40" fill="#030610" />

      {/* ── Mist ── */}
      <rect x="0" y="268" width="1200" height="72" fill="url(#mistGrad)" />

      {/* ── Fireflies ── */}
      {FIREFLIES.map((ff, i) => (
        <g key={i}>
          {/* Outer glow */}
          <circle cx={ff.x} cy={ff.y} r="18" fill="url(#ffGlow)">
            <animate attributeName="opacity" values="0;0.7;0"
              dur={`${ff.dur}s`} begin={`${ff.delay}s`} repeatCount="indefinite" />
          </circle>
          {/* Core */}
          <circle cx={ff.x} cy={ff.y} r="2.2" fill="#fce870" filter="url(#softGlow)">
            <animate attributeName="opacity" values="0;1;0"
              dur={`${ff.dur}s`} begin={`${ff.delay}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* ── Side vignettes ── */}
      <rect width="260"  height="340" fill="url(#vigL)" />
      <rect x="940" width="260" height="340" fill="url(#vigR)" />

      {/* ── Bottom fade into page ── */}
      <linearGradient id="btmFade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="60%" stopColor="#050c1a" stopOpacity="0" />
        <stop offset="100%" stopColor="#050c1a" stopOpacity="1" />
      </linearGradient>
      <rect width="1200" height="340" fill="url(#btmFade)" />
    </svg>

    {/* Centered text overlay */}
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ paddingBottom: '6%' }}>
      {/* Logo */}
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
           style={{ background: 'rgba(245,192,96,0.15)', border: '1px solid rgba(245,192,96,0.3)', backdropFilter: 'blur(4px)' }}>
        <svg viewBox="0 0 28 28" fill="none" className="w-8 h-8">
          {/* Stylised crescent + note */}
          <circle cx="14" cy="14" r="8" stroke="#f5c060" strokeWidth="1.5" fill="none" opacity="0.6" />
          <circle cx="14" cy="14" r="4.5" fill="#f5c060" opacity="0.9" />
          <path d="M14 5.5 C14 5.5 11 9 11 14 C11 19 14 22.5 14 22.5"
                stroke="#f5c060" strokeWidth="1.2" fill="none" opacity="0.55" />
        </svg>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight"
          style={{ color: '#f0ead8', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
        SonicVault
      </h1>
      <p className="text-sm mt-1" style={{ color: '#8a9bb8', textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}>
        Ruhe · Klang · Atmung
      </p>
    </div>
  </div>
);
