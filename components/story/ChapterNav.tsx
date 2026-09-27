"use client";

import { useEffect, useState } from "react";
import { chapterScroll, setChapter, type Chapter } from "@/lib/story";
import { ScrollTrigger } from "@/lib/gsap";
import { scrollToY } from "@/components/motion/SmoothScroll";

const chapters: { id: Chapter; label: string }[] = [
  { id: "intro", label: "Intro" },
  { id: "web", label: "Web" },
  { id: "software", label: "Software" },
  { id: "it", label: "IT" },
  { id: "standorte", label: "Standorte" },
  { id: "team", label: "Team" },
  { id: "kontakt", label: "Kontakt" },
];

/** Minimalistische Kapitel-Anzeige am rechten Rand (nur Desktop). */
export function ChapterNav() {
  const [active, setActive] = useState<Chapter>("intro");

  useEffect(() => {
    const on = (e: Event) => setActive((e as CustomEvent<Chapter>).detail);
    window.addEventListener("pje:chapter", on);
    // Kapitel außerhalb der Desktop-Story (Mobile-Fassung, Projekte, Team, Kontakt)
    const triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"))
      .filter((el) => el.getClientRects().length)
      .map((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setChapter(el.dataset.chapter as Chapter),
        }),
      );
    return () => {
      window.removeEventListener("pje:chapter", on);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const go = (c: Chapter) => {
    const y = chapterScroll[c];
    const el = document.querySelector<HTMLElement>(`[data-chapter="${c}"]`);
    const top = y ?? (el && el.getClientRects().length ? el.getBoundingClientRect().top + window.scrollY : undefined);
    if (top !== undefined) scrollToY(top);
  };

  return (
    <nav aria-label="Kapitel" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <ol className="flex flex-col items-end gap-2.5">
        {chapters.map((c, i) => {
          const on = c.id === active;
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => go(c.id)}
                aria-current={on ? "step" : undefined}
                className={`group flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.1em] transition-colors duration-300 ${on ? "text-accent" : "text-quiet hover:text-ink"}`}
              >
                <span className={`transition-[opacity,translate] duration-300 ${on ? "opacity-100" : "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}>
                  {c.label}
                </span>
                <span className="t-num">{String(i + 1).padStart(2, "0")}</span>
                <span className={`h-px transition-[width,background-color] duration-500 ${on ? "w-6 bg-accent" : "w-3 bg-[#c9ccd3]"}`} />
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
