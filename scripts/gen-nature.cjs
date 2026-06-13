// Erzeugt nahtlos loopbare Naturklänge per DSP-Synthese (kein Sample-Material).
// Technik: gefiltertes Rauschen + Modulation, danach ein Crossfade-Loop, bei dem
// das Ende in den Anfang überblendet -> kein hörbarer Sprung beim Loopen.
const fs = require('fs');
const path = require('path');

const SR = 32000;
const LOOP = 20;          // hörbare Loop-Länge (s)
const XF = 2;             // Crossfade-Länge (s)
const N = (LOOP + XF) * SR;
const LSAMP = LOOP * SR;
const OUT = path.join(__dirname, '..', 'public', 'sounds');

// Deterministischer PRNG, damit Builds reproduzierbar sind
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const lpA = fc => 1 - Math.exp(-2 * Math.PI * fc / SR);

// Crossfade-Loop + Normalisierung auf Peak 0.9
function finalize(buf) {
  const C = XF * SR;
  const out = new Float32Array(LSAMP);
  for (let i = 0; i < LSAMP; i++) {
    if (i < C) {
      const w = 0.5 - 0.5 * Math.cos((Math.PI * i) / C); // 0->1 raised cosine
      out[i] = buf[i] * w + buf[LSAMP + i] * (1 - w);
    } else {
      out[i] = buf[i];
    }
  }
  let peak = 1e-6;
  for (let i = 0; i < LSAMP; i++) peak = Math.max(peak, Math.abs(out[i]));
  const g = 0.9 / peak;
  for (let i = 0; i < LSAMP; i++) out[i] *= g;
  return out;
}

function writeWav(filename, ch) {
  const len = ch.length;
  const buf = Buffer.alloc(44 + len * 2);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + len * 2, 4); buf.write('WAVE', 8);
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28);
  buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(len * 2, 40);
  let off = 44;
  for (let i = 0; i < len; i++) {
    const v = Math.max(-1, Math.min(1, ch[i]));
    buf.writeInt16LE(Math.round(v * 32767), off); off += 2;
  }
  fs.writeFileSync(path.join(OUT, filename), buf);
  console.log('wrote', filename, (len * 2 / 1048576).toFixed(2) + ' MB');
}

// Streut kurze, exponentiell abklingende, gefilterte Rauschstöße ein (Tropfen/Knistern)
function sprinkleGrains(buf, rng, ratePerSec, opts) {
  const total = N;
  let next = Math.floor((-Math.log(1 - rng()) / ratePerSec) * SR);
  while (next < total) {
    const loud = rng() < (opts.loudProb || 0);
    const amp = (loud ? opts.loudAmp : opts.amp) * (0.5 + 0.5 * rng());
    const decay = (loud ? opts.loudDecay : opts.decay) * (0.6 + 0.8 * rng());
    const fc = opts.fcLow + rng() * (opts.fcHigh - opts.fcLow);
    const a = lpA(fc);
    let lp = 0, env = amp;
    const k = Math.exp(-1 / (decay * SR));
    for (let j = 0; j < decay * SR * 6 && next + j < total; j++) {
      const w = rng() * 2 - 1;
      lp += a * (w - lp);
      buf[next + j] += (w - lp) * env;     // hochpassiges Knacken
      env *= k;
      if (env < 1e-4) break;
    }
    next += Math.floor((-Math.log(1 - rng()) / ratePerSec) * SR) + 1;
  }
}

/* ---------------- Regen ---------------- */
function rain(seed, heavy) {
  const rng = mulberry32(seed);
  const buf = new Float32Array(N);
  let lpHiss = 0, lpBody = 0, hpBody = 0, lpLow = 0;
  const aHiss = lpA(heavy ? 9500 : 7500);
  const aBodyLP = lpA(5000);
  const aBodyHP = lpA(heavy ? 600 : 1100);
  const aLow = lpA(160);
  for (let i = 0; i < N; i++) {
    const w = rng() * 2 - 1;
    lpHiss += aHiss * (w - lpHiss); const hiss = w - lpHiss;
    lpBody += aBodyLP * (w - lpBody);
    hpBody += aBodyHP * (lpBody - hpBody); const body = lpBody - hpBody;
    lpLow += aLow * (w - lpLow);
    buf[i] = hiss * (heavy ? 0.45 : 0.55) + body * 0.8 + (heavy ? lpLow * 1.4 : 0);
  }
  sprinkleGrains(buf, rng, heavy ? 90 : 35, {
    amp: heavy ? 0.5 : 0.4, decay: 0.012, fcLow: 2500, fcHigh: 6000,
    loudProb: heavy ? 0.12 : 0.05, loudAmp: 0.9, loudDecay: 0.05,
  });
  return finalize(buf);
}

/* ---------------- Meeresbrandung ---------------- */
function surf(seed) {
  const rng = mulberry32(seed);
  const buf = new Float32Array(N);
  let lpWater = 0, lpFoamS = 0;
  const aWater = lpA(550);
  const aFoam = lpA(2200);
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    // Zwei überlagerte Wellen-Schwellen für unregelmäßigen Rhythmus
    let s = 0.55 + 0.45 * Math.sin(2 * Math.PI * 0.075 * t)
                 + 0.18 * Math.sin(2 * Math.PI * 0.031 * t + 1.3);
    const env = Math.max(0, Math.min(1, s)) ** 2;
    const w = rng() * 2 - 1;
    lpWater += aWater * (w - lpWater);
    lpFoamS += aFoam * (w - lpFoamS); const foam = w - lpFoamS;
    buf[i] = lpWater * (0.35 + 0.65 * env) + foam * 0.6 * env ** 3;
  }
  return finalize(buf);
}

/* ---------------- Wind ---------------- */
function wind(seed, howling) {
  const rng = mulberry32(seed);
  const buf = new Float32Array(N);
  let brown = 0, lpBed = 0;
  const aBed = lpA(howling ? 420 : 300);
  // State-Variable-Filter für den pfeifenden Anteil
  let low = 0, band = 0;
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const w = rng() * 2 - 1;
    brown = (brown + 0.025 * w) / 1.025;
    lpBed += aBed * (brown * 8 - lpBed);
    let gust = 0.45 + 0.55 * (0.5 + 0.5 * (
      Math.sin(2 * Math.PI * 0.05 * t) +
      0.6 * Math.sin(2 * Math.PI * 0.11 * t + 0.7) +
      0.4 * Math.sin(2 * Math.PI * 0.19 * t + 2.1)) / 2);
    gust = Math.max(0.1, Math.min(1, gust));
    let out = lpBed * gust;
    if (howling) {
      const fc = 350 + 320 * (0.5 + 0.5 * Math.sin(2 * Math.PI * 0.07 * t + 1.1));
      const f = 2 * Math.sin(Math.PI * fc / SR);
      const q = 0.16;
      low += f * band;
      const high = (rng() * 2 - 1) - low - q * band;
      band += f * high;
      out += band * 0.5 * gust * gust;
    }
    buf[i] = out;
  }
  return finalize(buf);
}

/* ---------------- Kaminfeuer ---------------- */
function fire(seed) {
  const rng = mulberry32(seed);
  const buf = new Float32Array(N);
  let brown = 0, lpRoar = 0;
  const aRoar = lpA(900);
  for (let i = 0; i < N; i++) {
    const w = rng() * 2 - 1;
    brown = (brown + 0.025 * w) / 1.025;
    lpRoar += aRoar * (brown * 8 - lpRoar);
    buf[i] = lpRoar * 0.55;
  }
  sprinkleGrains(buf, rng, 22, {
    amp: 0.5, decay: 0.01, fcLow: 1500, fcHigh: 5000,
    loudProb: 0.08, loudAmp: 1.0, loudDecay: 0.06,
  });
  return finalize(buf);
}

/* ---------------- Fernes Donnergrollen ---------------- */
function thunder(seed) {
  const rng = mulberry32(seed);
  const buf = new Float32Array(N);
  let brown = 0, lp = 0;
  const a = lpA(95);
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const w = rng() * 2 - 1;
    brown = (brown + 0.025 * w) / 1.025;
    lp += a * (brown * 8 - lp);
    const swell = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(2 * Math.PI * 0.04 * t));
    buf[i] = lp * swell;
  }
  // gelegentliche tiefere Grollen
  sprinkleGrains(buf, rng, 0.4, {
    amp: 0.0, decay: 0.0, fcLow: 60, fcHigh: 140,
    loudProb: 1, loudAmp: 0.8, loudDecay: 0.9,
  });
  return finalize(buf);
}

writeWav('gen-rain-soft.wav', rain(1001, false));
writeWav('gen-rain-heavy.wav', rain(1002, true));
writeWav('gen-surf.wav', surf(1003));
writeWav('gen-wind-breeze.wav', wind(1004, false));
writeWav('gen-wind-howling.wav', wind(1005, true));
writeWav('gen-fire.wav', fire(1006));
writeWav('gen-thunder.wav', thunder(1007));
