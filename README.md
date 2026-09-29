# SonicVault – Meditation & Klangwelten

Eine ruhige Web-App für Klangräume, Meditation und Atemübungen im Stil eines
Spa-Foyers (Salbeiminze und Dämmerlavendel). Funktioniert auf Desktop und
Mobile (Bottom-Navigation). Design-Kontext: `PRODUCT.md`, `DESIGN.md`.

## Features

Drei Tabs: **Sounds**, **Meditation**, **Breathing**. Die Oberfläche ist
Englisch. Hell und dunkel (Mond-/Sonnen-Button im Banner; ohne Wahl folgt die
App dem System).

### 🎚️ Sounds
- 111 Ambient-Sounds in 9 Kategorien, beliebig **stapelbar**, je mit eigener
  Lautstärke und „natural" (organische Schwankung). Loops laufen lückenlos.
- **Quick start**: vier fertige Räume, gespeicherte Soundscapes, Favoriten
  (Herz auf aktiver Kachel) und zuletzt genutzte Sounds; Kategorie-Chips
  springen direkt zum Abschnitt.
- **Dock** unten: Mix-Leiste (einklappbar) und Player übereinander, dazu ein
  **Sleep-Timer** (15/30/60 min, blendet aus). Löschen wird per Undo-Toast
  abgefangen.

### 🧘 Meditation
Themenkacheln in vier Gruppen (Settle and focus, Sleep, Feelings and people,
Everyday life) mit Sprecherwahl und Mini-Player (Fortschritt, ±15 s).

### 🌬️ Breathing
Geführte Atem-Audios (3–46 Minuten, inkl. Wim-Hof-Übungen).

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
