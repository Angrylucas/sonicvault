# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Der Inhaber und ein kleiner privater Kreis (per geteiltem Link). Kein öffentliches Publikum. Tageszeit und Situation der Nutzung sind nicht bestätigt (Angebot der App: Runterkommen, Einschlafen, Fokus); Desktop und Mobile-Web sind beide vorhanden.

## Product Purpose

SonicVault bündelt drei Dinge, die sonst auf mehrere Apps verteilt sind, in einer Web-App: einen stapelbaren Ambient-Klangmixer, geführte Meditationen und Atemübungen. Erfolg heißt: Man öffnet die App, baut sich in Sekunden einen passenden Klangraum oder startet eine Session und hört auf, sich mit der App zu beschäftigen.

## Positioning

Alles in einer App: Klangmixer (pro Sound Lautstärke und „natürliche" Schwankung, speicherbare Klangräume), Meditation (nach Themen gegliedert) und Atmung an einem Ort, ohne Konto, Abo oder Tracking. Zustand (Mix, Klangräume, Theme) liegt im Browser (localStorage).

## Operating Context

- Tabs: Sounds (Mixer), Meditation (Themen-Zwischenmenü → Sessions), Atmung (geführte Übungen).
- Audio läuft im Hintergrund weiter, auch beim Tab-Wechsel.
- Sounds sind Loop-Dateien (MP3) im Repo unter `public/sounds`; Meditationen/Atemübungen sind lange Audio-Tracks mit Mini-Player.
- Deployment über Vercel; Mobile-Bottom-Navigation, Desktop-Top-Navigation.

## Capabilities and Constraints

- Stack: React 19 + Vite + TypeScript, Tailwind per CDN, lucide-react; Web Audio API für nahtlose Loops.
- Theme: Light/Dark-Umschaltung, persistiert.
- Bibliothek wächst per Import aus Open-Source-Quellen (Moodist, XMSLEEP u. a.); Inhalte sind teils englischsprachig (Meditationen).
- Offen/unentschieden: Sprache der Meditationstitel und -inhalte (Deutsch vs. Original), Umbenennung „Sounds" → „Klänge", Zukunft des Atem-Tabs (geführte Tracks vs. animierte Muster) — parallel laufen Codex-PRs #16–#18 mit abweichenden Entscheidungen.

## Brand Commitments

Name: SonicVault. Kein Markenkit bestätigt. Die Oberfläche ist derzeit deutsch (inferiert aus dem Code, nicht als bindend bestätigt).

## Evidence on Hand

- 111 Ambient-Sounds in 9 Kategorien (`data.ts`, `public/sounds`).
- 121 geführte Meditationen in 14 Themen, davon 27 „Sleepcasts" (45 Min); einige mit Sprecher-Varianten.
- 17 geführte Atemübungen.
- Keine Nutzerzahlen, Testimonials, Presse oder externe Belege vorhanden; nichts davon erfinden.

## Product Principles

1. Eine App statt drei: Mixer, Meditation und Atmung fühlen sich wie ein Produkt an, nicht wie drei Tools.
2. Schnell zum Klang: Vom Öffnen bis zum ersten Ton so wenige Schritte wie möglich.
3. Privat und nicht kommerziell: Kein Konto, kein Tracking, keine Bewerbung; Audio-Lizenzen sind bewusst pragmatisch.

## Accessibility & Inclusion

Kein produktspezifischer Standard bestätigt. Vorhanden im Code: Light/Dark-Umschaltung und `prefers-reduced-motion`.
