# SonicVault – Meditation & Klangwelten

Eine ruhige, moderne Web-App für Meditation, Atemübungen und individuelle
Klangräume – inspiriert von Apps wie BetterSleep. Funktioniert auf Desktop
und Mobile (responsives Design mit Bottom-Navigation).

## Features

### 🧘 Meditation
Geführte Meditationen (Body Scans, Schlaf, Achtsamkeit, Mitgefühl, Heilung)
mit Filter-Chips und einem Mini-Player mit Fortschrittsanzeige und ±15 s.

### 🌬️ Atemübungen
- Animierte Atem-Sessions: **Box Breathing**, **4-7-8**, **Kohärentes Atmen**,
  **Entspannungsatmung** – ein Kreis wächst beim Einatmen und zieht sich beim
  Ausatmen zusammen, inklusive Phasen-Countdown.
- Geführte Atem-Audios (3–46 Minuten, inkl. Wim-Hof-Übungen).

### 🎚️ Sounds – dein eigener Klangraum
Beliebig viele Ambient-Sounds lassen sich **stapeln** und gemeinsam abspielen.
Pro Sound gibt es:
- einen **Lautstärke-Regler**
- einen **Randomness-Regler**: Die Lautstärke schwankt organisch um den
  eingestellten Wert, sodass der Mix lebendig und natürlich klingt.

Der Mix läuft beim Tab-Wechsel weiter, lässt sich über die Mix-Leiste
pausieren/leeren und wird in `localStorage` gespeichert, sodass er beim
nächsten Besuch wiederhergestellt wird.

## Entwicklung

```bash
npm install
npm run dev      # Dev-Server auf Port 3000
npm run build    # Produktions-Build nach dist/
npm run preview  # Build lokal testen
```

## Eigene Sounds hinzufügen

1. Audiodatei nach `public/sounds/` legen.
2. In `data.ts` eintragen:
   - Loopbarer Ambient-Sound → `MIX_SOUNDS` (mit Name, Icon und Kategorie)
   - Geführte Meditation → `MEDITATIONS`
   - Geführte Atemübung → `BREATHING_TRACKS`

## Deployment (Vercel)

1. Repository auf [vercel.com](https://vercel.com) importieren.
2. Framework-Preset **Vite** übernehmen und deployen – fertig.
