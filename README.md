# SonicVault – Meditation & Klangwelten

Eine ruhige Web-App für Klangräume, Meditation und Atemübungen im Stil eines
Spa-Foyers (Salbeiminze und Dämmerlavendel). Funktioniert auf Desktop und
Mobile (Bottom-Navigation). Design-Kontext: `PRODUCT.md`, `DESIGN.md`.

## Features

Drei Tabs, ein Klangraum: **Sounds**, **Meditation**, **Atmung**. Hell und
dunkel (Mond-/Sonnen-Button im Banner; ohne Wahl folgt die App dem System).

### 🎚️ Sounds – dein eigener Klangraum
Beliebig viele Ambient-Sounds lassen sich **stapeln** und gemeinsam
abspielen, jeder mit eigenem **Lautstärke-Regler**. Loops laufen lückenlos
(Web Audio). Der Mix läuft beim Tab-Wechsel weiter, lässt sich über die
Mix-Leiste pausieren/leeren, benennen und speichern und wird in
`localStorage` wiederhergestellt.

### 🧘 Meditation
Geführte Meditationen und Sleepcasts als Themenkacheln (Body Scans, Schlaf,
Achtsamkeit, Mitgefühl, Heilung), mit Sprecherwahl und einem Mini-Player mit
Fortschritt und ±15 s.

### 🌬️ Atmung
- **Atemmuster** (Box Breathing, 4-7-8, Kohärentes Atmen,
  Entspannungsatmung) als Übersicht mit Phasen und Dauer.
- Geführte Atem-Audios (3–46 Minuten, inkl. Wim-Hof-Übungen).

## Entwicklung

```bash
npm install
npm run dev      # Dev-Server auf Port 3000 (Tailwind über PostCSS)
npm run build    # Produktions-Build nach dist/
npm run preview  # Build lokal testen
```

## Eigene Sounds hinzufügen

1. Audiodatei nach `public/sounds/` legen.
2. In `data.ts` eintragen:
   - Loopbarer Ambient-Sound → `MIX_SOUNDS` (mit Name, Icon und Kategorie)
   - Geführte Meditation → `MEDITATIONS`
   - Geführte Atemübung → `BREATHING_TRACKS`

## Sound-Quellen

Ein Teil der Ambient-Sounds stammt aus dem Open-Source-Projekt
[Moodist](https://github.com/remvze/moodist) (MIT-Lizenz; die Aufnahmen
selbst sind CC0 / Public Domain, u. a. von freesound.org).

Weitere Sounds (u. a. zusätzliche Regen-Varianten, ASMR- und
Instrumenten-Klänge) stammen aus [XMSLEEP](https://github.com/Tosencen/XMSLEEP)
(MIT-Lizenz; Sounds laut Projekt-README aus offenen Audio-Bibliotheken,
Moodist sowie Pixabay Content License / CC0). Dieses Projekt ist privat
und wird nicht weiterverbreitet.

## Deployment (Vercel)

1. Repository auf [vercel.com](https://vercel.com) importieren.
2. Framework-Preset **Vite** übernehmen und deployen – fertig.
