# PJE Systems – Website (Relaunch 2026)

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Phosphor Icons

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint     # TypeScript-Check
```

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `lib/content.ts` | **Alle Fakten** (Person, Kontakt, Preise, Pakete, Leistungen, FAQ, Standorte). Einzige Quelle für alle Seiten. |
| `lib/seo.ts` | Metadaten-Helfer, JSON-LD (LocalBusiness/ProfessionalService, Person, FAQPage, BreadcrumbList, Service) |
| `lib/scenes.ts` | Alle GSAP-Scroll-Szenen. Das Markup rendert der Server, `components/motion/Scene.tsx` hängt nur die Bewegung an. |
| `lib/gsap.ts` | `useGsap`-Hook mit `gsap.matchMedia` (Reduced Motion, Desktop/Mobile); Szenen unterhalb des Folds starten im Idle |
| `components/sections/*` | Sections (Hero, Signature „Von der Idee zur fertigen Lösung“, Showcase, Pipeline, Karte, Timeline …) |
| `app/globals.css` | Design-Tokens, Typografie, Buttons, Reveal-System, Reduced-Motion-Regeln |

Radien-Regel: Buttons/Chips = pill, Flächen = 20 px, Eingabefelder = 12 px. Blau (`#2651F0`) nur als Akzent.

## URLs

Alle bisherigen URLs bleiben erhalten (`/`, `/websites/`, `/leistungen/`, `/leistungen/computerhilfe/`, `/leistungen/softwareentwicklung/`, `/preise/`, `/kontakt/`, `/impressum/`, `/datenschutz/`). Neu: `/ueber-uns/`. Zusätzliche 301/308-Weiterleitungen für naheliegende Kurz-URLs stehen in `next.config.ts`.

## Startseite: Scroll-Experience (Prinzip der Referenz mont-fort.com)

- **Lenis Smooth Scroll** auf allen Seiten (`components/motion/SmoothScroll.tsx`), synchron mit GSAP ScrollTrigger.
- **Durchgehender Drohnenflug (Startseite)** – `components/scene/DroneScene.tsx`, Gelände `lib/drone/terrain.ts`, Route `lib/drone/path.ts`, Licht/Shader `lib/drone/look.ts`:
  prozedurales WebGL-Hochgebirge (Ridged-Noise, Hauptgipfel, Querkamm, Tal unter der Route) mit Schnee/Fels-Shading, Bump-Detail, Talnebel, atmosphärischer Perspektive, Himmel mit Wolken, Wolkenmeer und Wolken-Durchflug.
  Die Kamera hängt an Keyframes, die an Abschnitten der Seite verankert sind (`data-drone="…"` in `app/page.tsx`); zwischen den Keyframes wird weich interpoliert, die Kamera folgt gedämpft.
  Verlauf: Gewitterbild → Wolke am Gipfel → Überflug mit Schwenk nach unten → kleinere Ketten → Grat vor der Headline (`FlyHeadline` + Vordergrund-Ebene `DroneFront`) → Wolkenbank zu CEN-GIZ → Weiterflug mit seitlichem Drift → über den Wolken (Team) → Morgendämmerung (Kontakt).
  Dunst hinter Textabschnitten (`haze`) hält Schrift lesbar. Handy: gröberes Gelände, vereinfachter Shader, keine Vordergrund-Ebene. Unterseiten behalten den Blau-Nebel (`MistScene`).
  Neue Inhalte auf der Startseite brauchen einen `data-drone`-Anker und einen Keyframe in `lib/drone/path.ts`.
- **Eröffnung: Gewitter am Berg** (`components/scene/MountainStage.tsx`, Bild `public/assets/berg-gewitter-2.webp`):
  Das Bild liegt zweimal übereinander; die obere Kopie ist auf die Silhouette des Massivs zugeschnitten (`RIDGE`), dazwischen steht „Wir bauen digitale Erlebnisse.“ und kommt beim Scrollen hinter dem Grat hervor.
  Animiert: zwei WebGL-Nebelschichten (hinten/vorne), Regen in zwei Tiefen, zufällige Blitze mit Flackern und Lichtschein, leise glimmender gemalter Blitz. Scroll = Kamerafahrt auf den Gipfel, am Ende eine Nebelwand, in der sich die Bühne in den hellen Nebel der Story auflöst.
  Vorlage 1672 × 941 px, mit Lanczos auf 2560 × 1441 px hochgerechnet und leicht nachgeschärft (`berg-gewitter-2.webp`). Bei neuem Motiv muss `RIDGE` in `lib/mountain.ts` neu nachgezeichnet werden.
- **Referenzen in der Bergwelt** (`components/scene/ProjectShowcase.tsx`, Daten in `lib/content.ts` → `projects`):
  Lichtspalt im Tal → Browserfenster → die Seite bleibt stehen und der Scroll fährt durch die echte Website → Kamera zieht zurück, Nebel.
  Neues Projekt: Aufnahmen der Website als senkrechten Streifen nach `public/assets/projekte/` legen (plus deren Navigation als eigenes Bild) und einen Eintrag in `projects` ergänzen.
- **Bergreise durch die Story:** IT-Kapitel auf der dunklen Bergseite, Team oberhalb der Wolken (`CloudSea` in `components/scene/Sky.tsx`). Nach den Fragen folgt direkt der Kontakt, kein Abspann. Nebel-Shader gemeinsam in `components/scene/Fog.tsx`, Bergsilhouette in `lib/mountain.ts`.
- **Karte mit Satellitenbild** (`components/sections/LocationsMap.tsx`): Hintergrund `public/assets/karte-satellit.webp` aus Sentinel-2 cloudless 2016 von EOX (CC BY 4.0, Bildnachweis steht unter der Karte, Datei liegt lokal, kein Fremdabruf). Ungefärbtes Original: `karte-satellit-original.webp`.
- **Atmosphärischer Blau-Nebel** hinter allen Seiten (`components/scene/MistScene.tsx`, Scroll-Zuordnung in `lib/sceneStage.ts`):
  ein Fullscreen-Shader (domain-warped Noise) in reduzierter Auflösung, drei Ebenen mit eigener Parallaxe (Mobile: zwei Ebenen, weniger Oktaven),
  entsättigtes Blau mit max. ca. 28 % Deckkraft auf hellem Grau mit warmen Off-White-Lichtflächen. Scroll verschiebt, dehnt und verteilt den Nebel je Kapitel neu (rückwärts exakt zurück).
  Ohne Scroll rendert er mit 30 fps, bei `prefers-reduced-motion` steht er still.
- **Desktop-Story** (`components/story/StoryStage.tsx`, Choreografie `lib/story.ts`): gepinnte Bühne über der Szene. Browser entsteht, Kamerafahrt hinein, Website baut sich auf, Desktop/Tablet/Smartphone, Smartphone wird zum Node, Datenfluss, Dashboard, Computer-Ebenen, Standortkarte mit 50-km-Radien.
- **Mobile** (`StoryMobile.tsx`): eigene scrollgesteuerte Sticky-Sequenzen (Browser → Smartphone, Datenpunkt durch die Software-Kette, IT-Ebenen fahren auseinander) plus derselbe Hintergrund-Nebel.
- Alle übrigen Inhalte sind an die Scrollposition gekoppelt (laufen beim Zurückscrollen rückwärts), Bilder mit Parallaxe.
- Bei „Bewegung reduzieren“: kein Smooth Scroll, statische Szene und Inhalte.

## Kontakt

- Keine Online-Buchung und keine Anzahlung. Kontakt per WhatsApp-Button (**+49 176 56814860**), Telefon (+49 176 55377205), E-Mail und nicht speicherndem Formular (öffnet Mailprogramm bzw. WhatsApp).
- Ansprechpartner für Anfragen und Fragen: **Blagoja Ljubeski** (im Kontaktbereich, Footer, Team und Schema). Inhaber und Umsetzung: Paul Höflich.
- Für Blagoja liegt kein Foto vor, deshalb zeigt der Team-Bereich ein Monogramm. Foto später als `image` in `lib/content.ts` ergänzen.
- Nummern und Texte zentral in `lib/content.ts`.

## Offene Punkte vor dem Livegang

1. **Datenschutzerklärung:** Supabase, Stripe und Google Calendar wurden entfernt (keine Online-Buchung mehr). Prüfen, ob Vercel Analytics/Speed Insights im Vercel-Projekt aktiv sind, sonst die Abschnitte streichen. Rechtlich gegenlesen lassen.
2. **Anfahrtspreise** gelten laut alter Seite bis 40 km (darüber auf Anfrage), das Vor-Ort-Gebiet ist „rund 50 km um München und Wolnzach“. Klären, ab welchem Standort gerechnet wird.
3. **München:** keine Anschrift hinterlegt, nur Wolnzach. Bei Bedarf in `lib/content.ts` ergänzen.
