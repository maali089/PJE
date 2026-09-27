import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { waLink, websiteSituations } from "@/lib/content";

export function Situations() {
  return (
    <section className="section" aria-labelledby="lagen-titel">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="lagen-titel" className="t-h2" data-reveal>
            Typische Lagen<span className="text-accent">.</span>
          </h2>
          <p className="t-lead mt-6 max-w-[32ch]" data-reveal>
            Die meisten Anfragen beginnen mit einem dieser Sätze.
          </p>
        </div>
        <ol className="border-t border-line">
          {websiteSituations.map((s, i) => (
            <li key={s.problem} className="group border-b border-line" data-reveal>
              <a
                target="_blank"
                href={waLink(s.wa)}
                rel="noopener"
                className="grid gap-4 py-8 md:grid-cols-[3rem_minmax(0,1fr)_auto] md:items-start md:gap-6"
                aria-label={`${s.problem} Per WhatsApp fragen`}
              >
                <span className="font-mono text-[0.78rem] text-quiet transition-colors group-hover:text-accent md:pt-1.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[clamp(1.25rem,2vw,1.6rem)] font-semibold leading-snug tracking-[-0.025em]">{s.problem}</span>
                  <span className="t-body mt-2 block">{s.solution}</span>
                </span>
                <span className="flex items-center gap-4 md:flex-col md:items-end md:gap-3">
                  <span className="t-num whitespace-nowrap rounded-full bg-accent-soft px-3 py-1 text-[0.85rem] font-medium text-accent">{s.price}</span>
                  <span className="inline-flex items-center gap-1 text-[0.85rem] text-slate transition-colors group-hover:text-ink">
                    Per WhatsApp fragen <ArrowUpRight size={14} aria-hidden />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
