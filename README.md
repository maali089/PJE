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
