import { Breadcrumbs } from "./Breadcrumbs";

export function LegalPage({ title, path, children }: { title: string; path: string; children: React.ReactNode }) {
  return (
    <article className="pb-28 pt-[calc(var(--nav-h)+48px)] md:pt-[calc(var(--nav-h)+72px)]">
      <div className="wrap">
        <Breadcrumbs items={[{ name: title, path }]} />
        <h1 className="t-h1 mt-8">
          <span className="line-mask">
            <span className="anim-rise" style={{ ["--d" as string]: 150 }}>
              {title}
              <span className="text-accent">.</span>
            </span>
          </span>
        </h1>
        <div className="legal anim-fade-up mt-14 max-w-[72ch]" style={{ ["--d" as string]: 350 }}>
          {children}
        </div>
      </div>
    </article>
  );
}
