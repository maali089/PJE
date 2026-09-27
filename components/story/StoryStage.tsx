import Link from "next/link";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { Scene } from "@/components/motion/Scene";
import { waLink } from "@/lib/content";
import { StorySiteDesktop, StorySiteNarrow } from "./StorySite";
import { MapSvg } from "@/components/sections/LocationsMap";
import { itParts, storyNodes, uiFragments } from "./data";

const left = "left-[var(--gutter)] xl:left-[max(var(--gutter),calc((100vw-1360px)/2+var(--gutter)))]";

// Grundposition der UI-Bausteine innerhalb des Smartphones (vw, von der Mitte aus)
const fragOffset: Record<(typeof uiFragments)[number], number> = { nav: -11.5, title: -6.5, image: -0.5, input: 5.5, button: 10 };

/** Desktop-Story (ab 1024 px). Auf kleineren Geräten übernimmt StoryMobile. */
export function StoryStage() {
  return (
    <Scene name="story" as="section" aria-label="PJE Systems: Websites, Software und IT" className="story-desktop relative hidden lg:block lg:motion-reduce:hidden">
      <div data-pin className="relative h-[100svh] overflow-hidden">
        {/* 01 Hero */}
        <div data-intro className="wrap absolute inset-x-0 top-0 flex h-full flex-col justify-center pt-[var(--nav-h)]">
          <h1 className="t-mega">
            <span data-w-pje className="line-mask w-fit">
              <span className="anim-rise block" style={{ ["--d" as string]: 120 }}>
                PJE
              </span>
            </span>
            <span data-w-sys className="line-mask w-fit">
              <span className="anim-rise block" style={{ ["--d" as string]: 210 }}>
                Systems<span className="text-accent">.</span>
              </span>
            </span>
            <span className="sr-only"> Websites, Software und IT-Service in München und Wolnzach.</span>
          </h1>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <p className="flex flex-wrap gap-x-[0.35em] text-[clamp(1.8rem,3.4vw,3.2rem)] font-semibold tracking-[-0.04em]" aria-hidden>
              {["Websites.", "Software.", "IT."].map((w, i) => (
                <span key={w} className="line-mask">
                  <span data-sub className="block">
                    <span className={`anim-rise block ${i === 2 ? "text-accent" : ""}`} style={{ ["--d" as string]: 320 + i * 80 }}>
                      {w}
                    </span>
                  </span>
                </span>
              ))}
            </p>
            <p className="line-mask font-mono text-[0.8rem] uppercase tracking-[0.18em] text-slate">
              <span data-loc className="block">
                <span className="anim-rise block" style={{ ["--d" as string]: 560 }}>
                  München <span className="text-accent">×</span> Wolnzach
                </span>
              </span>
            </p>
          </div>
          <div data-intro-cta className="mt-10">
            <div className="anim-fade-up flex flex-wrap items-center gap-3" style={{ ["--d" as string]: 650 }}>
              <Link href="/kontakt/" className="btn btn-primary" data-magnetic>
                <span className="btn-t"><span data-t="Projekt starten">Projekt starten</span></span>
                <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden />
              </Link>
              <a target="_blank" rel="noopener" href={waLink("Hallo PJE, ich habe eine Anfrage:")} className="btn btn-outline" data-magnetic>
                <WhatsappLogo size={18} aria-hidden />
                <span className="btn-t"><span data-t="WhatsApp">WhatsApp</span></span>
              </a>
              <p className="ml-4 max-w-[34ch] text-[0.95rem] leading-snug text-slate">Aus München und Wolnzach, für Unternehmen, Selbstständige und Privatkunden.</p>
            </div>
          </div>
        </div>

        {/* Punkt in der Mitte, aus dem die Linie entsteht */}
        <span data-hdot aria-hidden className="absolute left-1/2 top-1/2 -ml-[7px] -mt-[7px] h-[14px] w-[14px] rounded-full bg-accent opacity-0 shadow-[0_0_0_8px_rgb(38_81_240/0.14)]" />

        {/* 02 Websites: Titel */}
        <div data-web-title className={`absolute top-1/2 w-[31vw] max-w-[440px] -translate-y-1/2 opacity-0 ${left}`}>
          <h2 className="t-h2 !text-[clamp(2.2rem,3.6vw,3.9rem)]">
            Websites, die im Kopf bleiben<span className="text-accent">.</span>
          </h2>
          <p className="t-body mt-5 max-w-[36ch]">Eigenes Layout statt Vorlage, schnell geladen und für Google vorbereitet. Festpreis ab 499 €.</p>
          <p className="mt-8 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-slate">Gemacht für jeden Bildschirm</p>
          <ul className="mt-3 flex gap-2 font-mono text-[0.72rem] uppercase tracking-[0.08em]" aria-label="Geräte">
            {["Desktop", "Tablet", "Smartphone"].map((d, i) => (
              <li key={d} data-device={i} className="rounded-full border border-line px-3 py-1.5 text-quiet transition-colors duration-300 data-[on]:border-accent data-[on]:bg-accent-soft data-[on]:text-accent">
                {d}
              </li>
            ))}
          </ul>
          <Link href="/websites/" className="link-u mt-8 inline-flex items-center gap-2 font-medium">
            Mehr zu Websites <ArrowRight size={14} aria-hidden />
          </Link>
        </div>

        {/* 03 Software: Netzwerk (die „Kamera“ zoomt später in einen Datenpunkt) */}
        <div data-soft className="pointer-events-none absolute inset-0">
          <div data-soft-cam className="absolute inset-0">
            <div className="wrap pt-[calc(var(--nav-h)+4vh)]">
              <h2 className="t-h2 !text-[clamp(2.2rem,3.6vw,3.9rem)]">
                <span className="line-mask">
                  <span data-soft-l className="block">
                    Wir verbinden.
                  </span>
                </span>
                <span className="line-mask">
                  <span data-soft-l className="block">
                    Wir automatisieren.
                  </span>
                </span>
                <span className="line-mask">
                  <span data-soft-l className="block text-accent">
                    Wir vereinfachen.
                  </span>
                </span>
              </h2>
            </div>
            <div className="absolute left-1/2 top-[62%] h-0 w-[80vw] -translate-x-1/2">
              <div data-soft-track className="absolute left-[10%] right-[10%] top-0 h-px bg-line" />
              <div data-soft-line className="absolute left-[10%] right-[10%] top-0 h-px origin-left bg-accent" />
              <div className="absolute left-[10%] right-[10%] top-0">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span key={i} data-dot className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-accent shadow-[0_0_0_4px_rgb(38_81_240/0.15)]" />
                ))}
              </div>
              {storyNodes.map(({ key, Icon, text }, i) => (
                <div key={key} className="absolute top-0 w-[13vw] max-w-[190px] -translate-x-1/2 -translate-y-1/2" style={{ left: `${10 + i * 20}%` }}>
                  <div data-node={i} className="rounded-[18px] border border-line bg-white p-4 shadow-[0_24px_50px_-32px_rgb(11_12_14/0.45)]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-accent">{key}</span>
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-soft text-accent">
                        <Icon size={16} aria-hidden />
                      </span>
                    </div>
                    <p className="mt-5 text-[0.88rem] leading-snug text-graphite">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p data-soft-note className="wrap absolute inset-x-0 bottom-[7vh] text-[0.95rem] text-slate opacity-0">
              Webapps, Dashboards, interne Tools, API-Anbindungen und Automatisierungen. 50 €/Std., Aufgaben ab 50 €.{" "}
              <Link href="/leistungen/softwareentwicklung/" className="link-u pointer-events-auto font-medium text-ink">
                Mehr zu Software
              </Link>
            </p>
          </div>
        </div>

        {/* UI-Bausteine: das Smartphone zerfällt, die Teile werden zu Nodes */}
        <div data-frags aria-hidden className="pointer-events-none absolute left-[calc(50%+17vw)] top-1/2 h-0 w-0">
          {uiFragments.map((f) => (
            <div key={f} data-frag={f} className="absolute left-0 w-[12vw] opacity-0" style={{ top: `${fragOffset[f]}vw` }}>
              {f === "nav" && (
                <div className="flex items-center justify-between rounded-[0.8vw] border border-line bg-white px-[0.8vw] py-[0.6vw] shadow-[0_18px_30px_-20px_rgb(11_12_14/0.4)]">
                  <span className="h-[0.5vw] w-[3vw] rounded-full bg-ink" />
                  <span className="h-[0.5vw] w-[1.4vw] rounded-full bg-fog" />
                </div>
              )}
              {f === "title" && (
                <div className="rounded-[0.8vw] border border-line bg-white p-[0.8vw] shadow-[0_18px_30px_-20px_rgb(11_12_14/0.4)]">
                  <span className="block h-[0.8vw] w-[80%] rounded-full bg-ink" />
                  <span className="mt-[0.5vw] block h-[0.8vw] w-[55%] rounded-full bg-ink" />
                </div>
              )}
              {f === "image" && <div className="aspect-[4/3] rounded-[0.8vw] bg-[linear-gradient(135deg,#d9dce3,#eef0f4)] shadow-[0_18px_30px_-20px_rgb(11_12_14/0.4)]" />}
              {f === "input" && (
                <div className="rounded-[0.8vw] border border-line bg-white px-[0.8vw] py-[0.7vw] shadow-[0_18px_30px_-20px_rgb(11_12_14/0.4)]">
                  <span className="block h-[0.45vw] w-[45%] rounded-full bg-fog" />
                </div>
              )}
              {f === "button" && <div className="mx-auto w-[60%] rounded-full bg-accent py-[0.7vw] shadow-[0_14px_24px_-14px_rgb(38_81_240/0.7)]" />}
            </div>
          ))}
        </div>

        {/* Browser (Linie → Browser → Website → Geräte → Smartphone) */}
        <div
          data-browser
          aria-hidden
          className="invisible absolute left-1/2 top-1/2 aspect-[16/10] w-[min(1120px,78vw,calc(74svh*1.6))] -translate-x-1/2 -translate-y-1/2 [container-type:inline-size]"
        >
          <span data-line className="absolute inset-x-0 top-1/2 h-[3px] origin-center -translate-y-1/2 rounded-full bg-accent" />
          <div data-screen className="absolute inset-0 overflow-hidden rounded-[1.6cqw] border border-line bg-white shadow-[0_50px_100px_-50px_rgb(11_12_14/0.5)]">
            <div data-chrome className="flex h-[3.4cqw] items-center gap-[0.6cqw] border-b border-line bg-[#fafbfc] px-[1.4cqw]">
              <span className="h-[0.9cqw] w-[0.9cqw] rounded-full bg-[#e2e4e9]" />
              <span className="h-[0.9cqw] w-[0.9cqw] rounded-full bg-[#e2e4e9]" />
              <span className="h-[0.9cqw] w-[0.9cqw] rounded-full bg-[#e2e4e9]" />
              <span className="mx-auto rounded-full bg-[#eff1f4] px-[3cqw] py-[0.4cqw] font-mono text-[0.9cqw] text-slate">ihr-betrieb.de</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 top-[3.4cqw] [container-type:inline-size]">
              <StorySiteDesktop />
            </div>
          </div>
          <div data-tablet className="absolute inset-y-0 left-[26.6%] w-[46.8%] overflow-hidden rounded-[2.6cqw] border-[0.8cqw] border-ink bg-white opacity-0">
            <div className="absolute inset-0 [container-type:inline-size]">
              <StorySiteNarrow />
            </div>
          </div>
          <div data-phone className="absolute inset-y-0 left-[35.6%] w-[28.8%] overflow-hidden rounded-[3.4cqw] border-[0.8cqw] border-ink bg-white opacity-0">
            <div className="absolute inset-0 [container-type:inline-size]">
              <StorySiteNarrow phone />
            </div>
          </div>
        </div>

        {/* Ein Datenpunkt wächst bis zum Vollbild */}
        <span data-zdot aria-hidden className="absolute left-[58%] top-[62%] -ml-[6px] -mt-[6px] h-[12px] w-[12px] rounded-full bg-accent opacity-0" />

        {/* 04 IT: dunkle Welt hinter dem Punkt */}
        <span data-it-bg aria-hidden className="absolute left-1/2 top-1/2 -ml-[10px] -mt-[10px] h-[20px] w-[20px] rounded-full bg-[#0a0a0b]" style={{ transform: "scale(0)" }} />
        <div data-it className="pointer-events-none absolute inset-0 text-white opacity-0">
          <div className={`absolute top-1/2 w-[36vw] max-w-[480px] -translate-y-1/2 ${left}`}>
            <h2 className="t-h2 !text-[clamp(2.2rem,3.6vw,3.9rem)]">
              <span className="line-mask">
                <span data-it-l className="block">
                  Technik,
                </span>
              </span>
              <span className="line-mask">
                <span data-it-l className="block">
                  die einfach funktioniert<span className="text-[#6f8cff]">.</span>
                </span>
              </span>
            </h2>
            <ul className="mt-8">
              {[...itParts].reverse().map((p) => (
                <li key={p.key} data-it-row className="grid grid-cols-[5.5rem_1fr_auto] items-baseline gap-4 border-b border-white/12 py-2.5 text-[0.95rem]">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-[#8ea4ff]">{p.key}</span>
                  <span className="text-white/85">{p.service}</span>
                  <span className="t-num font-medium">{p.price}</span>
                </li>
              ))}
            </ul>
            <Link href="/leistungen/computerhilfe/" data-it-row className="link-u pointer-events-auto mt-6 inline-flex items-center gap-2 font-medium text-white">
              Alle IT-Leistungen <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
          <div data-stack aria-hidden className="absolute left-[calc(50%+18vw)] top-[56%] h-0 w-0">
            <div className="absolute left-0 top-0 [transform-style:preserve-3d] [transform:rotateX(58deg)_rotateZ(-40deg)]">
              {itParts.map(({ key, Icon }, i) => {
                const top = i === itParts.length - 1;
                return (
                  <div
                    key={key}
                    data-layer={i}
                    className="absolute -left-[11vw] -top-[7.5vw] flex h-[15vw] w-[22vw] flex-col justify-between rounded-[18px] border p-4"
                    style={{
                      background: top ? "#12151c" : "rgba(255,255,255,0.035)",
                      borderColor: top ? "rgba(111,140,255,0.55)" : "rgba(255,255,255,0.14)",
                      boxShadow: top ? "0 0 60px -10px rgba(38,81,240,.45)" : "0 30px 40px -30px rgba(0,0,0,.8)",
                      backdropFilter: "blur(2px)",
                    }}
                  >
                    <Icon size={26} weight="light" className="text-[#7d97ff]" />
                    <span className="font-mono text-[0.8rem] uppercase tracking-[0.14em] text-white/85">{key}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Helles Element verdrängt das Schwarz */}
        <span data-light aria-hidden className="absolute z-10 left-1/2 top-1/2 -ml-[10px] -mt-[10px] h-[20px] w-[20px] rounded-full bg-canvas" style={{ transform: "scale(0)" }} />

        {/* 05 Standorte */}
        <div data-map className="pointer-events-none absolute inset-0 z-20 opacity-0">
          <div className={`absolute top-1/2 w-[36vw] max-w-[480px] -translate-y-1/2 ${left}`}>
            <h2 className="t-h2 !text-[clamp(2.2rem,3.6vw,3.9rem)]">
              <span className="line-mask">
                <span data-map-l className="block">
                  München.
                </span>
              </span>
              <span className="line-mask">
                <span data-map-l className="block">
                  Wolnzach.
                </span>
              </span>
              <span className="line-mask">
                <span data-map-l className="block text-accent">
                  Und darüber hinaus digital.
                </span>
              </span>
            </h2>
            <p data-map-p className="mt-6 text-xl font-medium tracking-[-0.02em]">IT-Service vor Ort: ca. 50 km Umgebung</p>
            <p data-map-p className="t-body mt-3 max-w-[36ch]">Websites und Software entstehen auch standortunabhängig, für Betriebe überall.</p>
          </div>
          <div className="absolute inset-y-0 right-[var(--gutter)] flex items-center xl:right-[max(var(--gutter),calc((100vw-1360px)/2+var(--gutter)))]">
            <div data-map-cam className="w-[min(40vw,560px,62svh)]">
              <MapSvg idp="stage" />
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}
