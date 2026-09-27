import { Fragment } from "react";
import { ChartLineUp, Database, FileXls, GearSix, Globe, PlugsConnected } from "@phosphor-icons/react/ssr";
import { Scene } from "@/components/motion/Scene";

const nodes = [
  { key: "Input", Icon: FileXls, text: "Excel, CSV, E-Mails, Formulare" },
  { key: "Automation", Icon: GearSix, text: "Python-Skripte, Regeln, feste Zeitpunkte" },
  { key: "API", Icon: PlugsConnected, text: "Shop, ERP, Buchhaltung" },
  { key: "Output", Icon: ChartLineUp, text: "Dashboards, Berichte, sortierte Dateien" },
];

function Connector({ i }: { i: number }) {
  return (
    <li data-conn={i} aria-hidden className="relative flex items-center justify-center py-1 lg:px-1 lg:py-0">
      {/* Mobile: vertikal, Desktop: horizontal */}
      <div className="relative h-12 w-px lg:h-px lg:w-full">
        <span className="absolute inset-0 bg-line" />
        <span data-line className="absolute inset-0 origin-top bg-accent lg:origin-left" />
        <div data-flow className="absolute inset-0 opacity-0 motion-reduce:hidden">
          {[0, 1, 2].map((d) => (
            <span
              key={d}
              className="flow-dot absolute left-0 top-0 h-full w-full"
              style={{ animationDelay: `${d * -0.8 - i * 0.3}s` }}
            >
              <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_3px_rgb(38_81_240/0.15)] lg:left-0 lg:top-1/2" />
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}

export function Pipeline({ items }: { items?: { key: string; text: string }[] } = {}) {
  const list = items ? items.map((it, i) => ({ ...it, Icon: [Globe, PlugsConnected, GearSix, Database, ChartLineUp][i] ?? GearSix })) : nodes;
  return (
    <Scene name="pipeline" as="div" className="relative">
      <style>{`
        @keyframes flowY { from { transform: translateY(0) } to { transform: translateY(100%) } }
        @keyframes flowX { from { transform: translateX(0) } to { transform: translateX(100%) } }
        .flow-dot { animation: flowY 2.4s linear infinite; }
        @media (min-width: 1024px) { .flow-dot { animation-name: flowX; } }
      `}</style>
      <ol
        className="grid grid-cols-1 lg:[grid-template-columns:var(--cols)]"
        style={{ ["--cols" as string]: list.map(() => "1fr").join(" minmax(32px,0.3fr) ") }}
      >
        {list.map(({ key, Icon, text }, i) => (
          <Fragment key={key}>
            <li data-node className="relative">
              <div className="group relative overflow-hidden rounded-[var(--radius-panel)] border border-line bg-white p-6 transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgb(38_81_240/0.45)]">
                <span
                  data-ring
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[var(--radius-panel)] ring-1 ring-accent/60 ring-inset"
                />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-accent">{key}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-accent transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                    <Icon size={20} weight="regular" aria-hidden />
                  </span>
                </div>
                <p className="mt-8 text-[1.02rem] leading-snug tracking-[-0.01em] text-graphite">{text}</p>
              </div>
            </li>
            {i < list.length - 1 && <Connector i={i} />}
          </Fragment>
        ))}
      </ol>
    </Scene>
  );
}
