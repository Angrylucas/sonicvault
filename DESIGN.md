---
name: SonicVault
description: Ein Spa-Foyer für Klang, Meditation und Atmung — weiche Karten, Salbeiminze und Dämmerlavendel, Tiefe durch schwebende Schatten.
colors:
  foyer-white: "#f8f8f8"
  porcelain: "#ffffff"
  mint-frost: "#f5fbf8"
  dusk-ink: "#222b45"
  slate-mist: "#4b5263"
  haze: "#6b7280"
  hairline: "#ececec"
  sage-mint: "#2c7d59"
  sage-mint-soft: "#d8f0e3"
  sage-mint-deep: "#c3e6d2"
  dusk-lavender: "#5c579a"
  dusk-lavender-soft: "#c7b8f5"
  night-ground: "#14161f"
  night-surface: "#1e2029"
  night-surface-raised: "#242631"
  moonlit-paper: "#f2f0ea"
  night-mist: "#a7abc2"
  night-haze: "#8a8fa6"
  night-hairline: "#2a2d3a"
  night-mint: "#7cd6ab"
  night-mint-ink: "#0e2a1c"
  night-mint-soft: "#24332d"
  night-mint-deep: "#2c3d35"
  night-lavender: "#b3a4ea"
  night-lavender-soft: "#302c4a"
  signal-red: "#d13431"
  night-signal: "#f2706a"
  scene-slate: "#405b73"
  scene-indigo: "#384268"
  night-shadow: "rgba(0, 0, 0, 0.5)"
typography:
  headline:
    fontFamily: "Cairo, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "normal"
  title:
    fontFamily: "Cairo, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 800
    lineHeight: 1.375
    letterSpacing: "normal"
  body:
    fontFamily: "Cairo, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Cairo, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1.375
    letterSpacing: "normal"
  eyebrow:
    fontFamily: "Cairo, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 800
    lineHeight: 1.5
    letterSpacing: "0.025em"
rounded:
  card: "16px"
  panel: "24px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
components:
  sound-tile:
    backgroundColor: "{colors.porcelain}"
    textColor: "{colors.dusk-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.card}"
    padding: "16px 8px 14px"
  sound-tile-active:
    backgroundColor: "{colors.sage-mint}"
    textColor: "{colors.porcelain}"
    rounded: "{rounded.card}"
  track-card:
    backgroundColor: "{colors.porcelain}"
    textColor: "{colors.dusk-ink}"
    typography: "{typography.title}"
    rounded: "{rounded.card}"
    padding: "16px"
  chip:
    backgroundColor: "{colors.porcelain}"
    textColor: "{colors.slate-mist}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  chip-active:
    backgroundColor: "{colors.sage-mint}"
    textColor: "{colors.porcelain}"
  search-bar:
    backgroundColor: "{colors.porcelain}"
    textColor: "{colors.dusk-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "12px 16px"
  nav-item:
    textColor: "{colors.slate-mist}"
    typography: "{typography.title}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  nav-item-active:
    backgroundColor: "{colors.sage-mint}"
    textColor: "{colors.porcelain}"
  theme-tile:
    textColor: "{colors.porcelain}"
    typography: "{typography.title}"
    rounded: "{rounded.card}"
    height: "144px"
---

# Design System: SonicVault

## Overview

**Creative North Star: "Das Spa-Foyer"**

SonicVault fühlt sich an wie der Vorraum eines Spa: gedämpftes Licht, alles gepolstert, nichts kantig. Karten schweben knapp über einem hellen (oder nachtblauen) Boden, statt in Rahmen zu sitzen. Zwei Akzentfarben, Salbeiminze und Dämmerlavendel, tauchen ab, ohne je zu schreien; sie färben Icons, Auswahlzustände und Kategorien, nicht ganze Flächen. Die Grundstimmung ist weich, still, umhüllend.

Das System will nicht beeindrucken, sondern verschwinden: Es liefert genug Form (runde Pillen, große Radien, ein sanfter Verlauf im Kopf), damit die Oberfläche als ein ruhiger Ort gelesen wird, und tritt dann zurück, sobald der erste Ton läuft. Das Dunkel ist kein Umkehrbild, sondern ein zweiter Raum derselben Architektur: kühles Nachtblau statt warmem Braun, Minze und Lavendel heller gestellt.

**Key Characteristics:**
- Tiefe entsteht durch weite, weiche Schatten mit negativem Spread, nicht durch Linien oder Rahmen.
- Fast jede interaktive Form ist eine Pille oder ein Kissen (16px bis voll rund).
- Auswahl = Füllung: aktive Elemente kippen von Weiß auf Salbeiminze.
- Ein einziger Schrifttyp (Cairo), Hierarchie über Gewicht 600–800, nicht über Größe.
- Light und Dark sind vollwertig; Wechsel per Kreis-Button oben rechts im Banner.

## Colors

Zwei kühle, nahe verwandte Töne (Minze, Lavendel) auf einem nahezu neutralen Grund; im Dunkel liegen sie auf Nachtblau statt Schwarz.

### Primary
- **Salbeiminze** (#2c7d59; Dunkel: **Nachtminze** #7cd6ab): Aktive Zustände, gefüllte Pillen (Nav, Chips, aktiver Sound), Play-Buttons, Slider-Füllung, Logo-Marke. Die Farbe der Handlung. Weiß darauf erreicht 5,0 : 1, deshalb dürfen kleine Beschriftungen auf Minz-Flächen stehen.

### Secondary
- **Dämmerlavendel** (#5c579a; Dunkel: **Nachtlavendel** #b3a4ea): Zweiter Akzent für Kategorien und Tags, die sich mit Minze abwechseln (Icons in `dusk-lavender-soft` #c7b8f5 bzw. `night-lavender-soft` #302c4a), Atem-Phase „Ausatmen" in den Muster-Karten.

### Tertiary
- **Minzhauch** (#d8f0e3 / #c3e6d2; Dunkel: #24332d / #2c3d35): Sanfte Minz-Füllung hinter Icons im Ruhezustand, Verlaufsanfang im Banner.

### Neutral
- **Foyer-Weiß** (#f8f8f8; Dunkel: **Nachtgrund** #14161f): Seitenhintergrund.
- **Porzellan** (#ffffff; Dunkel: **Nachtfläche** #1e2029): Karten, Suche, Player, Mix-Leiste, Bottom-Nav.
- **Minzfrost** (#f5fbf8; Dunkel: #242631): Zweite Fläche, etwa für ruhende Chips in der Mix-Leiste und Eingabefelder.
- **Dämmertinte** (#222b45; Dunkel: **Mondpapier** #f2f0ea): Fließtext und Titel — ein bläuliches Nachtgrau statt Schwarz, im Dunkel ein warmes Off-White statt Weiß.
- **Schiefernebel** (#4b5263; Dunkel: #a7abc2): Sekundärtext, inaktive Desktop-Nav, Meta-Zeilen (7,4 : 1).
- **Dunst** (#6b7280; Dunkel: #8a8fa6): Tertiärtext, Zähler, Tags, inaktive Mobile-Nav, Placeholder. Bewusst die schwächste Stufe, die noch AA schafft (4,6–4,8 : 1 hell, 4,7–5,6 : 1 dunkel).
- **Haarlinie** (#ececec; Dunkel: #2a2d3a): Nur Slider-Spur und Scrollbar-Daumen; sie trennt nirgends Karten.
- **Signalrot** (#d13431; Dunkel: **Nachtsignal** #f2706a): Ausschließlich destruktive Aktionen (Mix leeren, Sound entfernen, Klangraum löschen); über `--danger`.
- **Szenen-Schiefer / Szenen-Indigo** (#405b73 / #384268): Feste Verlaufsstopps der Themenkacheln; sie gehören zur Illustration und folgen dem Theme nicht.

### Named Rules
**The Tint Ladder Rule.** Ein Icon im Ruhezustand sitzt in der `-soft`-Tönung seiner Akzentfarbe; aktiv wird die Fläche selbst zur vollen Akzentfarbe, das Rondell dunkelt über `--veil` leicht ab und das Icon nimmt `accent-ink`. Keine dritte Stufe erfinden.

**The Alternating Tint Rule.** Kategorien und Tags wechseln in fester Reihenfolge zwischen Minze und Lavendel, damit ein Raster aus gleichförmigen Kacheln Rhythmus bekommt, ohne dass Farbe Bedeutung trägt.

**The Contrast Floor Rule.** Text und Steuerelemente erreichen AA in beiden Themes: weiß auf `--accent` ≥ 4,5 : 1, `--text-faint` ≥ 4,5 : 1 auf jeder Fläche, Akzent-Icons auf `-soft` ≥ 3 : 1. Wer eine Farbe aufhellt, prüft diese Paare zuerst.

**The Cool Ground Rule.** Der Dunkelgrund bleibt kühl (Nachtblau). Wärmere Akzente (Terrakotta, Amber, Koralle) wurden verworfen, weil sie gegen den kühlen Boden bissen; Orange ist ausdrücklich raus.

## Typography

**Display Font:** Cairo (lokal ausgeliefert, variable Schrift 400–800, mit `system-ui, sans-serif`)
**Body Font:** Cairo (mit `system-ui, sans-serif`)
**Label/Mono Font:** Cairo; Ziffern mit `tabular-nums` (Countdown, Zeitanzeige)

**Character:** Cairo ist geometrisch-freundlich mit leicht abgerundeten Endungen, weich genug für ein Spa, klar genug für 12px-Labels. Die Hierarchie kommt fast ausschließlich über Gewicht (600 → 800), kaum über Größe: Titel wirken „gepolstert", nicht „laut".

### Hierarchy
- **Headline** (800, 1.5rem/24px, 1.25): Banner-Titel („Guten Abend. Wonach klingt es heute?"), zweizeilig mit `<br/>`.
- **Title** (800, 0.875rem/14px, 1.375): Kartentitel, Kategorien- und Gruppennamen (Sleepcasts, Atemmuster), Nav-Beschriftung, Kachel-Namen; bis 2 Zeilen mit `line-clamp`.
- **Body** (600, 0.875rem/14px, 1.5): Sucheingabe, Player-Titel (700), Hinweistexte.
- **Label** (700, 0.75rem/12px, 1.375): Sound-Kachel-Label, Chips (12px/700), Dauer-Zeilen (12px/700).
- **Eyebrow** (800, 0.75rem/12px, +0.025em, Versalien): Tag neben dem Icon auf Karten, nie über einer Überschrift; kleinste erlaubte Größe.

### Named Rules
**The Weight-Not-Size Rule.** Rangfolge über Gewicht 600/700/800 lösen; die Größenspanne bleibt eng (12–24px, nichts unter 12px). Kein zusätzlicher Schrifttyp.

## Layout

Ein zentrierter Inhaltsstreifen (`max-w-6xl`, 5 × 4px = 20px Seitenrand) unter einem Vollbreiten-Banner mit Verlauf. Die Suchleiste überlappt das Banner (–32px Versatz) und verankert so Kopf und Inhalt. Unterhalb von 768px navigiert eine feste Bottom-Tab-Bar (mit Safe-Area-Inset); ab 768px ersetzt sie eine klebende Pillen-Leiste unter dem Banner. Die Höhe der Bottom-Bar ist eine Variable (`--nav-h`, inkl. Safe-Area); Player und Mix-Leiste leiten ihre Position daraus ab, und die Mix-Leiste weicht über `--dock-h` dem geöffneten Player aus.

Raster füllen die Breite dicht, aber mit großzügigem Zwischenraum (12–14px): Sound-Kacheln 2 / 3 / 4 / 6 / 7 Spalten (ab 0 / 640 / 768 / 1024 / 1280px), Themenkacheln 2 / 3 / 4, Track-Karten 1 / 2 / 3 / 4. Abschnitte trennt vertikaler Abstand (32px), nie Linien. Inhalt hat unten 112px Luft auf Mobil (Bottom-Bar), 40px ab `md`.

## Elevation & Depth

Hybrid aus Schwebe und Tönung: Ruhende Flächen sind bereits leicht angehoben (kein „flach bei Ruhe"), Aktivierung macht den Schatten nur etwas näher und dichter. Dunkel behält dieselben Schattenwerte, mit `night-shadow` (`rgba(0, 0, 0, 0.5)`) statt Nachtblau-getönt.

### Shadow Vocabulary
- **Card rest** (`box-shadow: 0 10px 22px -12px var(--shadow)`): Sound-Kacheln, Themenkacheln (24px), Atemmuster-Karten, Track-Karten (`0 10px 24px -12px`).
- **Card active** (`0 12px 26px -10px`, Track `0 14px 28px -10px`): Aktivierter Sound, laufende Karte.
- **Search / Panel** (`0 10px 26px var(--shadow)`; Atem-Panel `0 10px 26px -12px`): Suchleiste, größere Container.
- **Chip** (`0 4px 12px var(--shadow)`): Filter-Chips im Ruhezustand.
- **Float bar** (`0 14px 30px var(--shadow)`; Player `0 14px 32px`): Mix-Leiste und geführter Player.
- **Header controls** (`0 6px 16px` Logo-Marke, `0 8px 20px` Theme-Toggle): Kreise im Banner.
- **Bottom bar** (`0 -8px 24px var(--shadow)`): Schatten nach oben.

`--shadow` ist im Hellen ein getöntes Nachtblau (`rgba(34, 43, 69, 0.14)`), nie Schwarz.

### Named Rules
**The Float Rule.** Karten trennen sich vom Boden durch Schatten mit negativem Spread, nie durch Rahmen oder Linien. `--border` gehört nur Slider-Spur und Scrollbar.

**The Ink-Tint Shadow Rule.** Helle Schatten sind bläulich getönt (`34, 43, 69`), damit sie wie Dämmerlicht wirken, nicht wie Schmutz.

## Shapes

Kissenweich. Karten und Kacheln sind `rounded-2xl` (16px); große Container wie das Atem-Panel `rounded-3xl` (24px); alles Kleine ist eine Pille oder ein Kreis (Chips, Nav, Suche, Play-Buttons, Icon-Rondelle, Theme-Toggle). Icon-Rondelle sind 36px (Kacheln, Karten) bzw. 32px (Play). Kein Element hat einen Radius unter 16px außer 1.5px-Bars und Fortschrittsspuren. Icons: Lucide (Strich), 12–18px.

Wiederkehrende Silhouette: **runder Icon-Kreis oben, Text darunter, zweite Pille unten** — die „Kissen-Kachel".

## Components

### Buttons
- **Shape:** Pille (9999px); Play/Pause als Kreis 32–44px.
- **Primary:** Salbeiminze-Füllung mit `accent-ink`, `px-8 py-3`, 14px/700 (Start), Play-Kreis 44px im Mixer.
- **Secondary:** `surface-2` mit Tinten-Text und 1px-Innenring `inset 0 0 0 1px var(--border)` (Beenden); Play-Kreis auf Karten im Ruhezustand in `-soft`-Tönung mit Akzent-Icon.
- **Hover / Focus:** Sanfte Bewegung/Opazität: `hover:opacity-80`, `hover:scale-105` (Toggle), `hover:-translate-y-0.5` (Karten; entfällt bei reduzierter Bewegung). Fokus: 2px-Ring in `--focus` (= Akzent), 2px Abstand, auf jedem Element; Karten zeigen ihn als Ring um die ganze Karte (Stretched Link).

### Chips
- **Style:** Ruhe: Porzellan mit Schiefernebel-Text und Chip-Schatten; aktiv: Salbeiminze-Fläche, `accent-ink`.
- **State:** Auswahl = Füllung, keine Häkchen. Sprecher-Chips auf Karten sind kleiner (12px/700, `px-2 py-0.5`), aktiv Minze, ruhend `surface-2`.

### Cards / Containers
- **Corner Style:** 16px (Themen 16px mit Bild), Atem-Panel 24px.
- **Background:** Porzellan / Nachtfläche; aktive Sound-Kachel Salbeiminze.
- **Shadow Strategy:** Siehe Elevation; Ruhe schwebt, Aktiv rückt näher.
- **Border:** Keine. Laufende Track-Karte bekommt einen 2px-Innenring in Minze (`outline: 2px solid var(--accent); outline-offset: -2px`).
- **Internal Padding:** 16px (Track), 16/8/14px (Sound-Kachel).

### Inputs / Fields
- **Style:** Suchleiste ist eine Vollpille auf Porzellan, transparentes Feld ohne Rahmen, 14px/600, Placeholder 500 in Dunst. Speichern-Feld im Mixer: Pille auf `surface-2`.
- **Focus:** Der Ring sitzt auf der Pille (`focus-within`), nicht auf dem Feld. Suchleiste und Speichern-Feld haben `aria-label`.
- **Error / Disabled:** Nicht definiert.

### Navigation
- **Style:** Desktop: klebende Pillen-Leiste unter dem Banner, aktiv Minz-Füllung, inaktiv Schiefernebel ohne Fläche. Mobile: feste Bottom-Tab-Bar auf Porzellan, Icon 18px über 12px/700-Label, Höhe `--nav-h`, aktiv Minze, inaktiv Dunst; oberer Schatten; aktiver Tab trägt `aria-current`.
- **Mobile:** Bar mit Safe-Area-Inset; Player und Mix-Leiste sitzen darüber (`bottom-[76px]`/`[84px]`).

### Sound-Kachel (Signature)
Kissen-Kachel: 36px-Icon-Rondell in der Tönung der Kategorie, darunter 12px/700-Label (min. 2 Zeilen hoch). Aktiv: ganze Kachel wird Salbeiminze, Rondell abgedunkelt (`--veil`), darunter Lautstärke-Slider (max. 110px, Füllung in `accent-ink`) und „natürlich"-Pille; das Icon pulsiert sacht (`softPulse` 2.4s), solange der Mix läuft.

### Themenkachel (Signature)
Immer dunkle Szene (feste Nachtverläufe aus Navy, Minz- und Lavendeltönen), 144px hoch, mit selbstgezeichneter Inline-SVG-Illustration (Mond, Sterne, Silhouetten, Halo) und Fußverlauf `black/55`. Weißer Titel + 11px-Sessionzahl. Die Kachel folgt dem Theme nicht: sie ist im Hellen wie im Dunklen dieselbe Nachtszene.

### Slider
4px-Spur in 44px hoher Trefferfläche (negativer Rand, Layout unverändert), Minz-Füllung bis `--fill`, Restspur `--border`; 14px-Daumen in Fläche mit 2px Minz-Rand und weichem Schatten.

## Do's and Don'ts

### Do:
- **Do** Tiefe über `box-shadow` mit negativem Spread (`0 10px 22px -12px var(--shadow)`) herstellen.
- **Do** Auswahl als Flächenwechsel auf `--accent` mit `--accent-ink` zeigen (Chip, Nav, Sound-Kachel).
- **Do** Icons im Ruhezustand in `-soft`-Tönung ihrer Akzentfarbe setzen und Minze/Lavendel pro Kategorie abwechseln.
- **Do** Farben ausschließlich über die CSS-Variablen (`var(--accent)` etc.) ansprechen, damit beide Themes greifen.
- **Do** `prefers-reduced-motion` beachten (Animationen und Transitions werden global abgeschaltet).
- **Do** im Dunkel bei Nachtblau (#14161f) bleiben; Textfarbe ist ein warmes Off-White (#f2f0ea).

### Don't:
- **Don't** Orange, Terrakotta, Koralle oder Amber als Akzent einsetzen; der Wechsel zu Minz/Lavendel war eine bewusste Entscheidung.
- **Don't** den Dunkelgrund wärmer machen (Braun, Espresso); das kühle Nachtblau wurde ausdrücklich bevorzugt.
- **Don't** Karten mit Rahmen oder Trennlinien versehen; `--border` gehört Slider-Spur und Scrollbar.
- **Don't** harte, schwarze Schatten im Hellen verwenden; `--shadow` ist bläulich getönt.
- **Don't** `--accent` wieder aufhellen (etwa zurück auf #3fae7c, 2,8 : 1 mit Weiß) oder `--text-faint` unter 4,5 : 1 ziehen; beide tragen Text.
- **Don't** rotes Tailwind (`text-red-400`) oder feste Weiß-Overlays auf Akzentflächen verwenden; dafür gibt es `--danger` und `--veil`.
- **Don't** interaktive Elemente ineinander schachteln (Button in Button); Karten nutzen den Stretched-Link-Ansatz.
- **Don't** einen animierten Atem-Kreis (oder ein Ersatz-Bild dafür) einbauen; die Atmung läuft über Ansage und Textanzeige.
- **Don't** einen zweiten Schrifttyp einführen oder Größen außerhalb von 12–24px für die App-Oberfläche.
