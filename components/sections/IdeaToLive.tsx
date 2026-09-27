import Image from "next/image";
import { CheckCircle, EnvelopeSimple, LockSimple } from "@phosphor-icons/react/ssr";
import { Scene } from "@/components/motion/Scene";

const steps = [
  { title: "Idee", text: "Sie erzählen, was Ihr Betrieb braucht. Ein paar Sätze genügen für den Anfang." },
  { title: "Konzept", text: "Seiten, Struktur und Inhalte werden gemeinsam festgelegt. Danach gibt es ein schriftliches Angebot." },
  { title: "Design", text: "Eigenes Layout statt Vorlage. Sie sehen die Startseite, bevor der Rest gebaut wird." },
  { title: "Entwicklung", text: "Echter Code statt Baukasten, geprüft auf Handy, Tablet und Desktop." },
  { title: "Live", text: "Domain umgestellt, Einweisung und Dokumentation übergeben. Die Website gehört Ihnen." },
];

const notes = ["Leistungen zeigen", "Anfragen per Formular", "Gut lesbar am Handy", "Bei Google gefunden werden"];

const code: [string, string][] = [
  ["k", "export default function Startseite() {"],
  ["p", "  return ("],
  ["t", "    <main>"],
  ["t", "      <Hero"],
  ["a", '        titel="Gute Arbeit. Aus der Region."'],
  ["a", '        aktion="Termin anfragen"'],
  ["t", "      />"],
  ["t", "      <Leistungen eintraege={leistungen} />"],
  ["t", "      <Kontaktformular spamschutz />"],
  ["t", "    </main>"],
  ["p", "  );"],
  ["k", "}"],
];

const codeColor: Record<string, string> = { k: "#8fa6ff", p: "#9aa0aa", t: "#e8eaee", a: "#7fd1b9" };

function MiniSite({ variant }: { variant: "wire" | "design" }) {
  const wire = variant === "wire";
  const box = "rounded-[0.6cqw] border border-dashed border-[#b9bdc6] bg-transparent";
  return (
    <div className="absolute inset-0 flex flex-col px-[4cqw] pt-[2.6cqw]">
      {/* Nav */}
      <div className="flex items-center justify-between">
        {wire ? (
          <span data-wire className={`${box} h-[2.2cqw] w-[13cqw] origin-left`} />
        ) : (
          <span className="text-[1.7cqw] font-semibold tracking-[-0.03em]">Ihr Betrieb</span>
        )}
        <div className="flex items-center gap-[2.2cqw]">
          {["Leistungen", "Über uns", "Kontakt"].map((l) =>
            wire ? (
              <span key={l} data-wire className={`${box} h-[1.3cqw] w-[6.5cqw] origin-left`} />
            ) : (
              <span key={l} className="text-[1.15cqw] text-[#5c6068]">
                {l}
              </span>
            ),
          )}
          {wire ? (
            <span data-wire className={`${box} h-[2.8cqw] w-[9cqw] origin-left !rounded-full`} />
          ) : (
            <span className="rounded-full bg-[#101114] px-[1.5cqw] py-[0.7cqw] text-[1.1cqw] text-white">Anfrage</span>
          )}
        </div>
      </div>

      {/* Hero */}
      <div className="mt-[4.5cqw] grid grid-cols-[1.05fr_1fr] items-center gap-[4cqw]">
        <div>
          {wire ? (
            <>
              <span data-wire className={`${box} block h-[3.6cqw] w-[88%] origin-left`} />
              <span data-wire className={`${box} mt-[1.2cqw] block h-[3.6cqw] w-[64%] origin-left`} />
              <span data-wire className={`${box} mt-[2.4cqw] block h-[1.2cqw] w-[80%] origin-left`} />
              <span data-wire className={`${box} mt-[0.9cqw] block h-[1.2cqw] w-[70%] origin-left`} />
              <span data-wire className={`${box} mt-[2.6cqw] block h-[3.4cqw] w-[15cqw] origin-left !rounded-full`} />
            </>
          ) : (
            <>
              <p className="text-[4.3cqw] font-semibold leading-[0.98] tracking-[-0.05em] text-[#0b0c0e]">
                Gute Arbeit.
                <br />
                Aus der Region<span className="text-accent">.</span>
              </p>
              <p className="mt-[1.8cqw] max-w-[34cqw] text-[1.25cqw] leading-[1.5] text-[#5c6068]">
                Beratung, Planung und Umsetzung aus einer Hand. Termine direkt online anfragen.
              </p>
              <span className="mt-[2.4cqw] inline-block rounded-full bg-accent px-[2cqw] py-[1cqw] text-[1.2cqw] font-medium text-white">
                Termin anfragen
              </span>
            </>
          )}
        </div>
        {wire ? (
          <div data-wire className={`${box} relative aspect-[4/3] origin-left`}>
            <svg className="absolute inset-0 h-full w-full text-[#c9ccd3]" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden>
              <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.4" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.4" />
            </svg>
          </div>
        ) : (
          <div data-design-img className="relative aspect-[4/3] overflow-hidden rounded-[1.2cqw]">
            <Image
              src="/assets/arbeitsplatz-pje-systems-wolnzach.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 30vw, 45vw"
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Leistungen */}
      <div className="mt-[4cqw] grid grid-cols-3 gap-[2cqw]">
        {["Beratung", "Planung", "Umsetzung"].map((l, i) =>
          wire ? (
            <div key={l} data-wire className={`${box} h-[9cqw] origin-left`} />
          ) : (
            <div
              key={l}
              className="rounded-[1cqw] p-[1.6cqw]"
              style={{ background: i === 1 ? "#0b0c0e" : "#f3f4f7", color: i === 1 ? "#fff" : "#0b0c0e" }}
            >
              <span className="block h-[1.6cqw] w-[1.6cqw] rounded-full" style={{ background: i === 1 ? "#2651f0" : "#d7dcea" }} />
              <p className="mt-[2.2cqw] text-[1.35cqw] font-semibold tracking-[-0.02em]">{l}</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export function IdeaToLive() {
  return (
    <Scene name="idea" as="section"
      aria-labelledby="idee-titel"
      data-step="4"
      className="group/steps relative"
      style={{ ["--p" as string]: 1 }}
    >
      <div data-pin className="relative flex min-h-[100svh] items-center overflow-hidden py-24 lg:py-0">
        <div className="wrap grid w-full items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          {/* Linke Spalte: Titel + Schritte */}
          <div>
            <h2 id="idee-titel" className="t-h2 max-w-[12ch] lg:!text-[clamp(2.5rem,4.2vw,4rem)]">
              Von der Idee zur fertigen Lösung<span className="text-accent">.</span>
            </h2>

            {/* Desktop-Schrittliste */}
            <ol className="mt-10 hidden space-y-5 motion-reduce:block">
              {steps.map((s) => (
                <li key={s.title}>
                  <p className="t-h3">{s.title}</p>
                  <p className="t-body mt-1 max-w-[40ch]">{s.text}</p>
                </li>
              ))}
            </ol>

            <ol aria-hidden className="relative mt-12 hidden pl-6 lg:block motion-reduce:!hidden">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-px bg-line" />
              <span
                aria-hidden
                className="absolute left-0 top-1 bottom-1 w-px origin-top bg-accent"
                style={{ transform: "scaleY(var(--p))" }}
              />
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  data-i={i}
                  className="py-2 text-[clamp(1.4rem,2vw,1.9rem)] font-semibold tracking-[-0.03em] text-[#c3c6cd] transition-colors duration-500 group-data-[step='0']/steps:[&[data-i='0']]:text-ink group-data-[step='1']/steps:[&[data-i='1']]:text-ink group-data-[step='2']/steps:[&[data-i='2']]:text-ink group-data-[step='3']/steps:[&[data-i='3']]:text-ink group-data-[step='4']/steps:[&[data-i='4']]:text-ink"
                >
                  {s.title}
                </li>
              ))}
            </ol>

            {/* Mobile: Fortschritt */}
            <div className="mt-6 lg:hidden motion-reduce:hidden" aria-hidden>
              <div className="relative h-px w-full bg-line">
                <span className="absolute inset-0 origin-left bg-accent" style={{ transform: "scaleX(var(--p))" }} />
              </div>
              <div className="mt-3 flex justify-between font-mono text-[0.68rem] uppercase tracking-[0.08em] text-quiet">
                {steps.map((s, i) => (
                  <span
                    key={s.title}
                    data-i={i}
                    className="transition-colors duration-300 group-data-[step='0']/steps:[&[data-i='0']]:text-accent group-data-[step='1']/steps:[&[data-i='1']]:text-accent group-data-[step='2']/steps:[&[data-i='2']]:text-accent group-data-[step='3']/steps:[&[data-i='3']]:text-accent group-data-[step='4']/steps:[&[data-i='4']]:text-accent"
                  >
                    {s.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Beschreibung des aktiven Schritts */}
            <div className="relative mt-5 min-h-[5.5rem] lg:mt-8 motion-reduce:hidden">
              {steps.map((s, i) => (
                <p
                  key={s.title}
                  data-i={i}
                  className="t-body absolute inset-x-0 top-0 max-w-[38ch] translate-y-2 opacity-0 transition-[opacity,translate] duration-500 group-data-[step='0']/steps:[&[data-i='0']]:translate-y-0 group-data-[step='0']/steps:[&[data-i='0']]:opacity-100 group-data-[step='1']/steps:[&[data-i='1']]:translate-y-0 group-data-[step='1']/steps:[&[data-i='1']]:opacity-100 group-data-[step='2']/steps:[&[data-i='2']]:translate-y-0 group-data-[step='2']/steps:[&[data-i='2']]:opacity-100 group-data-[step='3']/steps:[&[data-i='3']]:translate-y-0 group-data-[step='3']/steps:[&[data-i='3']]:opacity-100 group-data-[step='4']/steps:[&[data-i='4']]:translate-y-0 group-data-[step='4']/steps:[&[data-i='4']]:opacity-100"
                >
                  <span className="sr-only">{s.title}: </span>
                  {s.text}
                </p>
              ))}
            </div>
          </div>

          {/* Rechte Spalte: Browser */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[var(--radius-panel)] border border-line bg-white shadow-[0_40px_80px_-40px_rgb(11_12_14/0.35),0_2px_6px_rgb(11_12_14/0.04)]">
              {/* Chrome */}
              <div className="flex h-11 items-center gap-3 border-b border-line bg-[#fafbfc] px-4">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e2e4e9]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e2e4e9]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e2e4e9]" />
                </div>
                <div className="relative mx-auto flex h-7 w-full max-w-[340px] items-center justify-center overflow-hidden rounded-full bg-[#eff1f4] px-3 font-mono text-[0.7rem] text-slate">
                  <span data-url-test className="absolute inset-0 grid place-items-center opacity-0">
                    test.ihr-betrieb.de
                  </span>
                  <span data-url-live className="absolute inset-0 flex items-center justify-center gap-1.5 text-ink">
                    <LockSimple size={11} weight="bold" className="text-accent" aria-hidden /> ihr-betrieb.de
                  </span>
                </div>
                <span
                  data-live-badge
                  className="hidden items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-accent sm:flex"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Live
                </span>
              </div>

              {/* Viewport */}
              <div className="relative aspect-[4/3] w-full [container-type:inline-size] sm:aspect-[16/10.5]">
                <div className="dot-grid absolute inset-0 opacity-70" aria-hidden />

                {/* Idee: Notizen */}
                <div data-notes className="absolute inset-0 grid place-items-center opacity-0">
                  <div className="w-[min(78%,420px)] rounded-2xl border border-line bg-white p-5 shadow-[0_20px_50px_-30px_rgb(11_12_14/0.35)] sm:p-7">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-quiet">Notizen zur neuen Website</p>
                    <ul className="mt-4 space-y-2.5">
                      {notes.map((n) => (
                        <li key={n} data-note className="flex items-center gap-3 text-[clamp(0.85rem,1.6cqw,1.05rem)] text-graphite">
                          <span className="h-4 w-4 shrink-0 rounded-[5px] border border-[#c9ccd3]" aria-hidden />
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div data-layer="wire" className="absolute inset-0 opacity-0">
                  <MiniSite variant="wire" />
                </div>
                <div data-layer="design" className="absolute inset-0 bg-white">
                  <MiniSite variant="design" />
                </div>

                {/* Design-Annotationen */}
                <div className="pointer-events-none absolute bottom-[4%] left-[4%] flex flex-wrap gap-2" aria-hidden>
                  {[
                    { k: "Schrift", v: "Geist 600" },
                    { k: "Akzent", v: "#2651F0", sw: true },
                    { k: "Raster", v: "12 Spalten" },
                  ].map((c) => (
                    <span
                      key={c.k}
                      data-chip
                      className="flex opacity-0 items-center gap-2 rounded-full border border-line bg-white/95 px-3 py-1.5 font-mono text-[0.66rem] text-slate shadow-sm"
                    >
                      {c.sw && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
                      <span className="text-quiet">{c.k}</span> {c.v}
                    </span>
                  ))}
                </div>

                {/* Entwicklung: Code */}
                <div
                  data-code
                  style={{ transform: "translateX(104%)" }}
                  className="absolute inset-y-0 right-0 flex w-full flex-col justify-between bg-[#111317] p-[4cqw] sm:w-[58%] sm:p-[2.6cqw]"
                >
                  <pre className="overflow-hidden font-mono text-[clamp(0.58rem,1.25cqw,0.82rem)] leading-[1.75] sm:text-[clamp(0.6rem,1.12cqw,0.82rem)]">
                    {code.map(([k, line], i) => (
                      <span key={i} data-code-line className="block whitespace-pre" style={{ color: codeColor[k] }}>
                        <span className="mr-4 inline-block w-4 text-right text-[#4a4f59]">{i + 1}</span>
                        {line}
                      </span>
                    ))}
                  </pre>
                  <div className="flex flex-wrap gap-2">
                    {["Handy", "Tablet", "Desktop"].map((d) => (
                      <span
                        key={d}
                        data-check
                        className="flex items-center gap-1.5 rounded-full bg-white/8 px-2.5 py-1 font-mono text-[0.66rem] text-white/85"
                      >
                        <CheckCircle size={13} weight="fill" className="text-[#7fd1b9]" aria-hidden />
                        {d} geprüft
                      </span>
                    ))}
                  </div>
                </div>

                {/* Live: Toast */}
                <div
                  data-toast
                  className="absolute left-[4%] top-[5%] flex max-w-[70%] items-center gap-3 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-[0_20px_40px_-24px_rgb(11_12_14/0.45)] backdrop-blur"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-white">
                    <EnvelopeSimple size={16} weight="bold" aria-hidden />
                  </span>
                  <span className="text-[0.8rem] leading-tight text-graphite">
                    Neue Anfrage
                    <span className="block text-[0.72rem] text-quiet">über das Kontaktformular</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Live: Smartphone */}
            <div
              data-phone
              aria-hidden
              className="absolute -bottom-6 right-[-2%] w-[26%] min-w-[96px] max-w-[190px] rounded-[26px] border-[5px] border-[#111317] bg-white shadow-[0_30px_60px_-24px_rgb(11_12_14/0.5)] sm:-bottom-10 sm:right-[-4%]"
            >
              <div className="relative aspect-[9/19] overflow-hidden rounded-[20px] [container-type:inline-size]">
                <div className="flex items-center justify-between px-[8cqw] pt-[9cqw]">
                  <span className="text-[7cqw] font-semibold tracking-[-0.03em]">Ihr Betrieb</span>
                  <span className="flex flex-col gap-[2cqw]">
                    <span className="h-[1.4cqw] w-[9cqw] bg-ink" />
                    <span className="h-[1.4cqw] w-[9cqw] bg-ink" />
                  </span>
                </div>
                <div className="relative mx-[8cqw] mt-[8cqw] aspect-[4/3] overflow-hidden rounded-[5cqw]">
                  <Image src="/assets/arbeitsplatz-pje-systems-wolnzach.webp" alt="" fill sizes="190px" className="object-cover" />
                </div>
                <p className="mx-[8cqw] mt-[7cqw] text-[11cqw] font-semibold leading-[0.98] tracking-[-0.05em]">
                  Gute Arbeit. Aus der Region<span className="text-accent">.</span>
                </p>
                <span className="mx-[8cqw] mt-[7cqw] inline-block rounded-full bg-accent px-[6cqw] py-[3cqw] text-[6cqw] text-white">
                  Termin anfragen
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}
