import Image from "next/image";
import type { PersonInfo } from "@/lib/content";

/** Foto, falls vorhanden; sonst ein Monogramm-Feld (bewusst kein Platzhalterfoto). */
export function Portrait({ p, sizes, className = "", imgClassName = "", imgAttr }: { p: PersonInfo; sizes: string; className?: string; imgClassName?: string; imgAttr?: Record<string, string> }) {
  if (p.image)
    return <Image src={p.image} alt={p.imageAlt ?? p.name} fill sizes={sizes} className={`object-cover object-[50%_30%] ${imgClassName}`} {...imgAttr} />;
  return (
    <div role="img" aria-label={p.name} className={`absolute inset-0 grid place-items-center bg-ink text-white ${className}`} {...imgAttr}>
      <div aria-hidden className="dot-grid absolute inset-0 opacity-[0.12] invert" />
      <span className="relative text-[clamp(3rem,12cqw,9rem)] font-semibold tracking-[-0.06em] [container-type:normal]">
        {p.initials}
        <span className="text-accent">.</span>
      </span>
    </div>
  );
}

export function Avatar({ p, size = 56 }: { p: PersonInfo; size?: number }) {
  return (
    <span className="relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-ink font-semibold text-white" style={{ width: size, height: size, fontSize: size * 0.34 }}>
      {p.image ? <Image src={p.image} alt="" fill sizes={`${size}px`} className="object-cover object-[50%_35%]" /> : p.initials}
    </span>
  );
}
