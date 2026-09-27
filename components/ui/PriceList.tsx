import type { PriceGroup } from "@/lib/content";

export function PriceList({ group, columns = 1, showTitle = true, dark = false }: { group: PriceGroup; columns?: 1 | 2; showTitle?: boolean; dark?: boolean }) {
  const muted = dark ? "text-white/60" : "text-slate";
  return (
    <div id={`preise-${group.id}`} className="scroll-mt-32">
      {showTitle && (
        <div className="mb-5">
          <h3 className="t-h3">{group.title}</h3>
          {group.lead && <p className={`mt-2 max-w-[60ch] text-[0.98rem] leading-relaxed ${muted}`}>{group.lead}</p>}
        </div>
      )}
      <dl className={`grid gap-x-10 ${columns === 2 ? "md:grid-cols-2" : ""}`}>
        {group.rows.map((r) => (
          <div
            key={r.label}
            className={`flex items-baseline justify-between gap-6 border-b py-3.5 ${dark ? "border-white/12" : "border-line"}`}
          >
            <dt className={dark ? "text-white/85" : "text-graphite"}>{r.label}</dt>
            <dd className="t-num shrink-0 font-medium tracking-[-0.01em]">{r.price}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
