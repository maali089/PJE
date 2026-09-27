import Image from "next/image";
import { Scene } from "@/components/motion/Scene";

/* Drei bewusst unterschiedliche Beispielentwürfe (keine Kundenreferenzen). */

function DesignHandwerk() {
  return (
    <div className="absolute inset-0 bg-[#16150f] text-[#f4efe6]">
      <div className="absolute inset-y-0 right-0 w-[46%]">
        <Image src="/assets/werkzeuge-pc-reparatur.webp" alt="" fill sizes="40vw" className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#16150f] via-[#16150f]/40 to-transparent" />
      </div>
      <div className="relative flex h-full flex-col px-[5cqw] py-[3.4cqw]">
        <div className="flex items-center justify-between text-[1.2cqw] tracking-[0.12em] uppercase">
          <span className="font-semibold">Holzwerk Brandl</span>
          <span className="hidden gap-[2.5cqw] opacity-70 sm:flex">
            <span>Möbel</span>
            <span>Innenausbau</span>
            <span>Kontakt</span>
          </span>
        </div>
        <div className="mt-auto max-w-[58%] pb-[2cqw]">
          <p className="text-[1.2cqw] uppercase tracking-[0.2em] text-[#e0a15a]">Schreinerei seit Generationen</p>
          <p className="mt-[1.6cqw] text-[6.2cqw] font-bold uppercase leading-[0.86] tracking-[-0.04em]">
            Maß
            <br />
            arbeit.
          </p>
          <div className="mt-[3cqw] flex items-center gap-[1.6cqw]">
            <span className="bg-[#e0a15a] px-[2cqw] py-[1cqw] text-[1.2cqw] font-semibold text-[#16150f]">Projekt anfragen</span>
            <span className="text-[1.2cqw] underline underline-offset-4 opacity-80">Referenzen</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesignKanzlei() {
  return (
    <div className="absolute inset-0 bg-[#f7f8fa] text-[#0e1a33]">
      <div className="flex h-full flex-col px-[5cqw] py-[3.4cqw]">
        <div className="flex items-center justify-between border-b border-[#0e1a33]/10 pb-[2cqw]">
          <span className="text-[1.6cqw] font-semibold tracking-[-0.02em]">
            Weber <span className="font-normal text-[#0e1a33]/50">Steuerberatung</span>
          </span>
          <span className="rounded-full border border-[#0e1a33]/20 px-[1.6cqw] py-[0.7cqw] text-[1.1cqw]">Termin vereinbaren</span>
        </div>
        <div className="mt-[4cqw] grid flex-1 grid-cols-[1.2fr_1fr] gap-[4cqw]">
          <div>
            <p className="text-[4.6cqw] font-medium leading-[1.02] tracking-[-0.045em]">
              Klarheit für Ihre
              <br />
              Zahlen.
            </p>
            <p className="mt-[2cqw] max-w-[36cqw] text-[1.25cqw] leading-[1.6] text-[#0e1a33]/60">
              Steuern, Buchhaltung und Beratung für Selbstständige und Unternehmen.
            </p>
            <div className="mt-[3.6cqw] grid grid-cols-3 gap-[1.6cqw]">
              {["Steuern", "Lohn", "Beratung"].map((t, i) => (
                <div key={t} className="border-t-2 pt-[1cqw]" style={{ borderColor: i === 0 ? "#2f6bff" : "#0e1a3322" }}>
                  <p className="text-[1.15cqw] font-medium">{t}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[1.4cqw]">
            <Image src="/assets/it-beratung-unternehmen.webp" alt="" fill sizes="30vw" className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DesignCafe({ mode }: { mode: "desktop" | "tablet" | "phone" }) {
  const phone = mode === "phone";
  const tablet = mode === "tablet";
  const s = phone ? 2.7 : tablet ? 1.45 : 1; // Skalierung der cqw-Werte je Gerät
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#dfe9dc] text-[#1d2b1c]">
      <div
        aria-hidden
        className="absolute rounded-full bg-[#f3c969]"
        style={{ width: `${34 * s}cqw`, height: `${34 * s}cqw`, right: `${-8 * s}cqw`, top: phone ? "38%" : `${-6 * s}cqw` }}
      />
      <div aria-hidden className="absolute rounded-full bg-[#1d2b1c]" style={{ width: `${10 * s}cqw`, height: `${10 * s}cqw`, right: `${22 * s}cqw`, bottom: `${8 * s}cqw` }} />
      <div className="relative flex h-full flex-col" style={{ padding: `${3.4 * s}cqw ${5 * s}cqw` }}>
        <div className="flex items-center justify-between" style={{ fontSize: `${1.3 * s}cqw` }}>
          <span className="font-bold tracking-[-0.02em]">café ilm</span>
          {phone ? (
            <span className="flex flex-col" style={{ gap: `${0.8 * s}cqw` }}>
              <span className="block bg-[#1d2b1c]" style={{ height: `${0.35 * s}cqw`, width: `${3.4 * s}cqw` }} />
              <span className="block bg-[#1d2b1c]" style={{ height: `${0.35 * s}cqw`, width: `${3.4 * s}cqw` }} />
            </span>
          ) : (
            <span className="flex" style={{ gap: `${2.2 * s}cqw` }}>
              <span>Karte</span>
              <span>Frühstück</span>
              <span>Besuch</span>
            </span>
          )}
        </div>
        <p
          className="font-bold leading-[0.92] tracking-[-0.05em]"
          style={{ fontSize: `${(phone ? 6.2 : tablet ? 5.8 : 7) * s}cqw`, marginTop: `${(phone ? 6 : 5) * s}cqw` }}
        >
          Guten
          <br />
          Morgen,
          <br />
          Hallertau.
        </p>
        <div className="flex flex-wrap items-center" style={{ gap: `${1.4 * s}cqw`, marginTop: `${3 * s}cqw` }}>
          <span className="rounded-full bg-[#1d2b1c] text-[#dfe9dc]" style={{ fontSize: `${1.2 * s}cqw`, padding: `${1 * s}cqw ${2.2 * s}cqw` }}>
            Tisch reservieren
          </span>
          {!phone && (
            <span style={{ fontSize: `${1.2 * s}cqw` }} className="underline underline-offset-4">
              Zur Karte
            </span>
          )}
        </div>
        {!phone && (
          <div className="mt-auto grid grid-cols-3" style={{ gap: `${1.6 * s}cqw`, fontSize: `${1.05 * s}cqw` }}>
            {["Mo bis Fr ab 7 Uhr", "Hausgemachte Kuchen", "Hunde willkommen"].map((t) => (
              <span key={t} className="border-t border-[#1d2b1c]/25" style={{ paddingTop: `${1 * s}cqw` }}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const designs = [
  { name: "Handwerksbetrieb", Comp: DesignHandwerk },
  { name: "Kanzlei", Comp: DesignKanzlei },
  { name: "Café", Comp: () => <DesignCafe mode="desktop" /> },
];

export function Showcase() {
  return (
    <Scene name="showcase" as="section" aria-labelledby="showcase-titel" className="relative" data-bg="mist">
      <div data-pin className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-16">
        <div className="wrap w-full">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 id="showcase-titel" className="t-h2 max-w-[13ch]">
              Jede Website ein Unikat<span className="text-accent">.</span>
            </h2>
            <p className="t-body max-w-[34ch] md:text-right">
              Eigenes Layout statt Vorlage, sauber umgesetzt auf jedem Gerät.
            </p>
          </div>

          <div className="relative mx-auto mt-10 w-full max-w-[min(1080px,calc((100svh-320px)*1.55))] md:mt-12">
            {/* Desktop */}
            <div data-desktop className="relative z-10 origin-center">
              <div className="overflow-hidden rounded-[var(--radius-panel)] border border-black/5 bg-white shadow-[0_50px_100px_-50px_rgb(11_12_14/0.45)]">
                <div className="flex h-9 items-center gap-1.5 border-b border-line bg-[#fafbfc] px-4" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e2e4e9]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e2e4e9]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e2e4e9]" />
                </div>
                <div className="relative aspect-[16/10] overflow-hidden [container-type:inline-size]" aria-hidden>
                  {designs.map(({ name, Comp }) => (
                    <div key={name} data-slide className="absolute inset-0 origin-top overflow-hidden bg-ink">
                      <div className="absolute inset-0">
                        <Comp />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tablet */}
            <div
              data-tablet
              aria-hidden
              className="absolute bottom-[-4%] left-[-2%] z-20 w-[34%] rounded-[18px] border-[6px] border-[#111317] bg-[#111317] shadow-[0_40px_80px_-30px_rgb(11_12_14/0.55)] md:left-[2%]"
              style={{ opacity: 0 }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[12px] [container-type:inline-size]">
                <DesignCafe mode="tablet" />
              </div>
            </div>

            {/* Smartphone */}
            <div
              data-phone
              aria-hidden
              className="absolute bottom-[-8%] right-[-1%] z-30 w-[19%] min-w-[92px] rounded-[22px] border-[5px] border-[#111317] bg-[#111317] shadow-[0_40px_80px_-30px_rgb(11_12_14/0.6)] md:right-[4%]"
              style={{ opacity: 0 }}
            >
              <div className="relative aspect-[9/19] overflow-hidden rounded-[17px] [container-type:inline-size]">
                <DesignCafe mode="phone" />
              </div>
            </div>
          </div>

          {/* Beschriftung */}
          <div className="relative mt-14 h-6 md:mt-16">
            {designs.map((dsg, i) => (
              <p key={dsg.name} data-caption className="t-label absolute inset-x-0 text-center" style={i === 0 ? undefined : { opacity: 0 }}>
                Beispielentwurf: {dsg.name}
              </p>
            ))}
            <p data-resp className="t-label absolute inset-x-0 text-center !text-accent" style={{ opacity: 0 }}>
              Desktop, Tablet und Smartphone aus einem Guss
            </p>
          </div>
        </div>
      </div>
    </Scene>
  );
}
