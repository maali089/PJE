import { Breadcrumbs } from "./Breadcrumbs";

/** Kopfbereich der Unterseiten: Zeilen der H1 steigen maskiert auf. */
export function PageHero({
  crumbs,
  lines,
  lead,
  facts,
  children,
  aside,
}: {
  crumbs: { name: string; path: string }[];
  lines: React.ReactNode[];
  lead: string;
  facts?: { label: string; value: string }[];
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+48px)] pb-16 md:pt-[calc(var(--nav-h)+72px)] md:pb-24">
      <div
        aria-hidden
        className="dot-grid anim-fade pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_85%_20%,black,transparent_75%)]"
      />
      <div className={`wrap relative ${aside ? "grid items-end gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : ""}`}>
        <div>
          <Breadcrumbs items={crumbs} />
          <h1 className={`t-h1 mt-8 ${aside ? "lg:!text-[clamp(3rem,5.2vw,5.25rem)]" : ""}`}>
            {lines.map((l, i) => (
              <span key={i} className="line-mask">
                <span className="anim-rise" style={{ ["--d" as string]: 150 + i * 110 }}>
                  {l}
                </span>
              </span>
            ))}
          </h1>
          <p className="t-lead anim-fade-up mt-7 max-w-[54ch]" style={{ ["--d" as string]: 450 }}>
            {lead}
          </p>
          {facts && (
            <dl className="anim-fade-up mt-9 flex flex-wrap gap-x-10 gap-y-4" style={{ ["--d" as string]: 560 }}>
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="t-label">{f.label}</dt>
                  <dd className="mt-1 text-lg font-medium tracking-[-0.02em]">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {children && (
            <div className="anim-fade-up mt-10 flex flex-wrap gap-3" style={{ ["--d" as string]: 650 }}>
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div className="anim-fade-up" style={{ ["--d" as string]: 500 }}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
