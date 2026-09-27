import type { ElementType } from "react";
import { Scene } from "@/components/motion/Scene";

/** Text wird beim Scrollen Wort für Wort sichtbar. Wörter in *Sternchen* werden blau. */
export function WordScrub({ text, as: Tag = "p", className = "" }: { text: string; as?: ElementType; className?: string }) {
  const parts = text.split(" ");
  return (
    <Scene name="words" as={Tag} className={className}>
      {parts.map((w, i) => {
        const hl = w.startsWith("*");
        const clean = w.replace(/\*/g, "");
        return (
          <span key={i} data-w className={hl ? "text-accent" : undefined}>
            {clean}
            {i < parts.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Scene>
  );
}
