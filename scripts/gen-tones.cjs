// Erzeugt nahtlos loopbare WAV-Dateien (Heilfrequenzen + binaurale Beats).
// Nahtlos = die Datei enthält eine ganzzahlige Anzahl Schwingungen pro Kanal,
// dadurch sind Anfang und Ende identisch (kein Knacken beim Loopen).
const fs = require('fs');
const path = require('path');

const SR = 22050;       // Sample-Rate
const DUR = 15;         // Sekunden
const AMP = 0.26;       // Amplitude (kein Clipping)
const OUT = path.join(__dirname, '..', 'public', 'sounds');

function writeWav(filename, channels) {
  const numCh = channels.length;
  const numSamples = channels[0].length;
  const blockAlign = numCh * 2;
  const dataLen = numSamples * blockAlign;
  const buf = Buffer.alloc(44 + dataLen);

  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + dataLen, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);            // PCM
  buf.writeUInt16LE(numCh, 22);
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * blockAlign, 28);
  buf.writeUInt16LE(blockAlign, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(dataLen, 40);

  let off = 44;
  for (let i = 0; i < numSamples; i++) {
    for (let c = 0; c < numCh; c++) {
      const v = Math.max(-1, Math.min(1, channels[c][i]));
      buf.writeInt16LE(Math.round(v * 32767), off);
      off += 2;
    }
  }
  fs.writeFileSync(path.join(OUT, filename), buf);
  console.log('wrote', filename, (dataLen / 1048576).toFixed(2) + ' MB');
}

// Reiner Ton mit dezenter Obertonwärme; ganzzahlige Frequenz => sauberer Loop
function tone(freq) {
  const n = SR * DUR;
  const ch = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    ch[i] =
      AMP * Math.sin(2 * Math.PI * freq * t) +
      AMP * 0.12 * Math.sin(2 * Math.PI * freq * 2 * t);
  }
  return [ch];
}

// Binauraler Beat: linker/rechter Kanal leicht verstimmt (Differenz = Beat)
function binaural(carrier, beat) {
  const n = SR * DUR;
  const l = new Float32Array(n);
  const r = new Float32Array(n);
  const fl = carrier - beat / 2;
  const fr = carrier + beat / 2;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    l[i] = AMP * Math.sin(2 * Math.PI * fl * t);
    r[i] = AMP * Math.sin(2 * Math.PI * fr * t);
  }
  return [l, r];
}

const solfeggio = [
  ['396-hz.wav', 396],
  ['417-hz.wav', 417],
  ['432-hz.wav', 432],
  ['528-hz.wav', 528],
  ['639-hz.wav', 639],
  ['741-hz.wav', 741],
  ['852-hz.wav', 852],
];
for (const [f, hz] of solfeggio) writeWav(f, tone(hz));

const beats = [
  ['binaural-delta.wav', 200, 2],   // Tiefschlaf
  ['binaural-theta.wav', 200, 6],   // Meditation
  ['binaural-alpha.wav', 200, 10],  // Entspannung
];
for (const [f, c, b] of beats) writeWav(f, binaural(c, b));
