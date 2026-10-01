import { ChartLineUp, DeviceMobile, MagnifyingGlass, ShieldCheck, ArrowsClockwise } from "@phosphor-icons/react/ssr";
import { websiteQuality, websiteScope, vatNote } from "@/lib/content";

const icons = [ChartLineUp, DeviceMobile, MagnifyingGlass, ShieldCheck, ArrowsClockwise];

export function WebsiteQuality() {
  const cell = "rounded-[var(--radius-panel)] p-7 md:p-9";
  const Item = ({ i, dark = false }: { i: number; dark?: boolean }) => {
    const q = websiteQuality[i];
    const Icon = icons[i];
    return (
      <>
        <Icon size={26} weight="light" className={dark ? "text-[#7d97ff]" : "text-accent"} aria-hidden />
        <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{q.title}</h3>
        <p className={`mt-2 leading-relaxed ${dark ? "text-white/70" : "text-slate"}`}>{q.text}</p>
      </>
    );
  };
  return (
    <section className="section" aria-labelledby="qualitaet-titel" data-bg="mist">
      <div className="wrap">
        <h2 id="qualitaet-titel" className="t-h2 max-w-[14ch]" data-reveal>
          In jedem Paket<span className="text-accent">.</span>
        </h2>
        <p className="t-lead mt-6 max-w-[52ch]" data-reveal>
          {vatNote}
        </p>

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <div className={`${cell} bg-navy text-white md:col-span-4`} data-reveal data-tilt="2">
            <Item i={0} dark />
            <ul className="mt-8 flex flex-wrap gap-2">
              {websiteScope.map((s) => (
                <li key={s} className="rounded-full border border-white/15 px-3 py-1.5 text-[0.85rem] text-white/85">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${cell} bg-white md:col-span-2`} data-reveal style={{ ["--i" as string]: 1 }}>
            <Item i={1} />
          </div>
          <div className={`${cell} bg-white md:col-span-2`} data-reveal>
            <Item i={2} />
          </div>
          <div className={`${cell} bg-white md:col-span-2`} data-reveal style={{ ["--i" as string]: 1 }}>
            <Item i={3} />
          </div>
          <div className={`${cell} bg-accent text-white md:col-span-2`} data-reveal style={{ ["--i" as string]: 2 }}>
            <ArrowsClockwise size={26} weight="light" aria-hidden />
            <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{websiteQuality[4].title}</h3>
            <p className="mt-2 leading-relaxed text-white/85">{websiteQuality[4].text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
