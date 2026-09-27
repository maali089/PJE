import { Plus } from "@phosphor-icons/react/ssr";
import type { Faq as FaqT } from "@/lib/content";
import { faqJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export function Faq({ items, title = "Häufige Fragen", id = "fragen" }: { items: FaqT[]; title?: React.ReactNode; id?: string }) {
  return (
    <section aria-labelledby={`${id}-titel`} className="section" id={id}>
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div>
          <h2 id={`${id}-titel`} className="t-h2 lg:sticky lg:top-28" data-reveal>
            {title}
          </h2>
        </div>
        <div className="border-t border-line">
          {items.map((f, i) => (
            <details key={f.q} className="faq group border-b border-line" data-reveal style={{ ["--i" as string]: i }}>
              <summary className="flex items-start justify-between gap-6 py-6 text-[1.1rem] font-medium tracking-[-0.015em] transition-colors hover:text-accent md:text-[1.2rem]">
                {f.q}
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line transition-colors group-open:border-accent group-open:bg-accent group-open:text-white">
                  <Plus size={14} weight="bold" className="faq-icon" aria-hidden />
                </span>
              </summary>
              <p className="t-body max-w-[62ch] pb-7 pr-12">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqJsonLd(items)} />
    </section>
  );
}
