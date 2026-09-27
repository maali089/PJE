import Link from "next/link";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <nav aria-label="Brotkrumen" className="anim-fade-up" style={{ ["--d" as string]: 100 }}>
        <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-quiet">
          <li>
            <Link href="/" className="link-u hover:text-ink">
              Start
            </Link>
          </li>
          {items.map((it, i) => (
            <li key={it.path} className="flex items-center gap-2">
              <span aria-hidden>/</span>
              {i === items.length - 1 ? (
                <span aria-current="page" className="text-ink">
                  {it.name}
                </span>
              ) : (
                <Link href={it.path} className="link-u hover:text-ink">
                  {it.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  );
}
