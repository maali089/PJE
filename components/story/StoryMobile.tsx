import Link from "next/link";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { Scene } from "@/components/motion/Scene";
import { Locations } from "@/components/sections/Locations";
import { waLink } from "@/lib/content";
import { StorySiteDesktop, StorySiteNarrow } from "./StorySite";
import { itParts, storyNodes } from "./data";

/** Mobile-/Reduced-Motion-Fassung der Story: gleiche Kapitel, kürzere und ruhigere Bewegung. */
export function StoryMobile() {
  return (
    <div className="story-mobile lg:hidden lg:motion-reduce:block">
      {/* Intro */}
      <section data-chapter="intro" data-scene-stage="0" data-scene-align="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-12 pt-[calc(var(--nav-h)+24px)]" aria-labelledby="m-hero">
        <div className="wrap relative">
          <h1 id="m-hero" className="t-mega">
            <span className="line-mask">
              <span className="anim-rise block" style={{ ["--d" as string]: 100 }}>
                PJE
              </span>
            </span>
            <span className="line-mask">
              <span className="anim-rise block" style={{ ["--d" as string]: 180 }}>
                Systems<span className="text-accent">.</span>
              </span>
            </span>
            <span className="sr-only"> Websites, Software und IT-Service in München und Wolnzach.</span>
          </h1>
          <p className="mt-5 flex flex-wrap gap-x-[0.3em] text-[clamp(1.6rem,7vw,2.4rem)] font-semibold tracking-[-0.04em]" aria-hidden>
            {["Websites.", "Software.", "IT."].map((w, i) => (
              <span key={w} className="line-mask">
                <span className={`anim-rise block ${i === 2 ? "text-accent" : ""}`} style={{ ["--d" as string]: 280 + i * 80 }}>
                  {w}
                </span>
              </span>
            ))}
          </p>
          <p className="t-body anim-fade-up mt-6 max-w-[34ch]" style={{ ["--d" as string]: 520 }}>
            Aus München und Wolnzach, für Unternehmen, Selbstständige und Privatkunden.
          </p>
          <div className="anim-fade-up mt-8 flex flex-wrap gap-3" style={{ ["--d" as string]: 620 }}>
            <Link href="/kontakt/" className="btn btn-primary">
              <span className="btn-t"><span data-t="Projekt starten">Projekt starten</span></span> <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden />
            </Link>
            <a target="_blank" rel="noopener" href={waLink("Hallo PJE, ich habe eine Anfrage:")} className="btn btn-outline">
              <WhatsappLogo size={18} aria-hidden /> <span className="btn-t"><span data-t="WhatsApp">WhatsApp</span></span>
            </a>
          </div>
        </div>
      </section>

      {/* Websites: einfache Sticky-Sequenz */}
      <Scene name="webMobile" as="section" data-chapter="web" data-scene-stage="1" className="relative h-[180svh] motion-reduce:h-auto" aria-labelledby="m-web">
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:py-24">
          <div className="wrap">
            <h2 id="m-web" className="t-h2">
              Websites, die im Kopf bleiben<span className="text-accent">.</span>
            </h2>
            <p className="t-body mt-4">Eigenes Layout, schnell geladen, für Google vorbereitet. Festpreis ab 499 €.</p>
          </div>
          <div className="wrap mt-10">
            <div data-m-browser className="relative mx-auto aspect-[16/10] w-full max-w-[min(100%,calc((100svh-300px)*1.6))] [container-type:inline-size]">
              <span data-line className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-accent opacity-0 motion-reduce:hidden" />
              <div data-screen className="absolute inset-0 overflow-hidden rounded-[2.4cqw] border border-line bg-white shadow-[0_30px_60px_-34px_rgb(11_12_14/0.45)]">
                <div className="flex h-[5cqw] items-center gap-[1cqw] border-b border-line bg-[#fafbfc] px-[2cqw]">
                  <span className="h-[1.4cqw] w-[1.4cqw] rounded-full bg-[#e2e4e9]" />
                  <span className="h-[1.4cqw] w-[1.4cqw] rounded-full bg-[#e2e4e9]" />
                  <span className="h-[1.4cqw] w-[1.4cqw] rounded-full bg-[#e2e4e9]" />
                </div>
                <div className="absolute inset-x-0 bottom-0 top-[5cqw] [container-type:inline-size]">
                  <StorySiteDesktop />
                </div>
              </div>
              <div data-phone className="absolute inset-y-[-6%] left-[35%] w-[30%] overflow-hidden rounded-[4cqw] border-[1.2cqw] border-ink bg-white opacity-0 shadow-[0_30px_60px_-30px_rgb(11_12_14/0.5)] motion-reduce:opacity-100">
                <div className="absolute inset-0 [container-type:inline-size]">
                  <StorySiteNarrow phone />
                </div>
              </div>
            </div>
            <p data-m-caption className="mt-10 text-center font-mono text-[0.7rem] uppercase tracking-[0.08em] text-accent opacity-0 motion-reduce:opacity-100">
              Desktop und Smartphone aus einem Guss
            </p>
          </div>
        </div>
      </Scene>

      {/* Software: Datenpunkt läuft durch die Kette und wächst am Ende bis zum Vollbild */}
      <Scene name="softMobile" as="section" data-chapter="software" data-scene-stage="2" className="relative h-[190svh] motion-reduce:h-auto" aria-labelledby="m-soft">
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-[var(--nav-h)] motion-reduce:static motion-reduce:h-auto motion-reduce:py-20">
          <div className="wrap">
            <h2 id="m-soft" className="t-h2 !text-[clamp(2rem,8.4vw,2.8rem)]">
              {["Wir verbinden.", "Wir automatisieren.", "Wir vereinfachen."].map((l, i) => (
                <span key={l} className="line-mask">
                  <span data-sl className={`block ${i === 2 ? "text-accent" : ""}`}>
                    {l}
                  </span>
                </span>
              ))}
            </h2>
            <ol className="relative mt-8 pl-8">
              <span aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-line" />
              <span data-sline aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-accent" />
              {storyNodes.map((n) => (
                <li key={n.key} data-snode className="relative py-2.5">
                  <span className="block font-mono text-[0.72rem] uppercase tracking-[0.1em] text-accent">{n.key}</span>
                  <span className="block text-[1rem] text-graphite">{n.text}</span>
                </li>
              ))}
            </ol>
            <p data-snote className="t-body mt-6 text-[0.95rem]">
              Webapps, Dashboards, interne Tools, API-Anbindungen und Automatisierungen. 50 €/Std., Aufgaben ab 50 €.{" "}
              <Link href="/leistungen/softwareentwicklung/" className="link-u font-medium text-ink">
                Mehr zu Software
              </Link>
            </p>
          </div>
          <span data-sdot aria-hidden className="absolute left-[calc(var(--gutter)+3px)] top-0 h-[9px] w-[9px] rounded-full bg-accent shadow-[0_0_0_5px_rgb(38_81_240/0.18)] motion-reduce:hidden" />
        </div>
      </Scene>

      {/* IT: aus dem Blau öffnet sich eine dunkle Welt, die Ebenen fahren auseinander, danach wird es wieder hell */}
      <Scene name="itMobile" as="section" data-chapter="it" data-scene-stage="3" className="relative h-[200svh] motion-reduce:h-auto" aria-labelledby="m-it">
        <div data-mstage className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden bg-[#0a0a0b] pt-[var(--nav-h)] text-white motion-reduce:static motion-reduce:h-auto motion-reduce:py-20">
          <span data-mblue aria-hidden className="absolute inset-0 bg-accent motion-reduce:hidden" />
          <span data-mhole aria-hidden className="absolute left-1/2 top-1/2 -ml-[10px] -mt-[10px] h-[20px] w-[20px] rounded-full bg-[#0a0a0b] motion-reduce:hidden" />
          <div className="wrap relative">
            <h2 id="m-it" className="t-h2 !text-[clamp(2rem,8.4vw,2.8rem)]">
              <span className="line-mask">
                <span data-il className="block">Technik,</span>
              </span>
              <span className="line-mask">
                <span data-il className="block">
                  die einfach funktioniert<span className="text-[#6f8cff]">.</span>
                </span>
              </span>
            </h2>
          </div>
          <div aria-hidden className="relative mx-auto mt-2 h-[36svh] w-full">
            <div className="absolute left-1/2 top-1/2 [transform-style:preserve-3d] [transform:rotateX(58deg)_rotateZ(-40deg)]">
              {itParts.map(({ key, Icon }, i) => {
                const top = i === itParts.length - 1;
                return (
                  <div
                    key={key}
                    data-mlayer={i}
                    className="absolute -left-[22vw] -top-[14vw] flex h-[28vw] max-h-[190px] w-[44vw] max-w-[300px] flex-col justify-between rounded-[14px] border p-3"
                    style={{
                      background: top ? "#12151c" : "rgba(255,255,255,0.04)",
                      borderColor: top ? "rgba(111,140,255,0.55)" : "rgba(255,255,255,0.16)",
                      boxShadow: top ? "0 0 40px -10px rgba(38,81,240,.5)" : "none",
                    }}
                  >
                    <Icon size={18} weight="light" className="text-[#7d97ff]" />
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/85">{key}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="wrap relative">
            <ul data-inote className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[0.85rem]">
              {[...itParts].reverse().map((p) => (
                <li key={p.key} className="flex justify-between gap-2 border-b border-white/12 py-1.5">
                  <span className="text-white/80">{p.service}</span>
                  <span className="t-num shrink-0 font-medium">{p.price}</span>
                </li>
              ))}
            </ul>
            <Link data-inote href="/leistungen/computerhilfe/" className="link-u mt-4 inline-block font-medium text-white">
              Alle IT-Leistungen
            </Link>
          </div>
          <span data-mlight aria-hidden className="absolute left-1/2 top-1/2 z-10 -ml-[10px] -mt-[10px] h-[20px] w-[20px] rounded-full bg-canvas motion-reduce:hidden" />
        </div>
      </Scene>

      <div data-scene-stage="4" data-chapter="standorte">
        <Locations />
      </div>
    </div>
  );
}
