"use client";

/**
 * Verknüpft Scrollposition und Hintergrund-Nebel (MistScene).
 * Stufen: 0 Intro · 1 Web · 2 Software · 3 IT · 4 Standorte · 5 Team · 6 Kontakt – jede Stufe verteilt den Nebel anders.
 * Anker kommen aus zwei Quellen: der Desktop-Story (Timeline-Positionen) und Elementen mit [data-scene-stage].
 */

type Anchor = { stage: number; y: number };
const fromStory = new Map<number, number>();
let domAnchors: Anchor[] = [];
let merged: Anchor[] = [];

function merge() {
  const all: Anchor[] = [...domAnchors, ...Array.from(fromStory, ([stage, y]) => ({ stage, y }))];
  all.sort((a, b) => a.y - b.y);
  // Stufen müssen mit der Position steigen
  merged = all.filter((a, i) => i === 0 || a.stage > all.slice(0, i).reduce((m, x) => Math.max(m, x.stage), -1));
}

export function setStoryAnchors(list: Record<number, number>) {
  fromStory.clear();
  Object.entries(list).forEach(([s, y]) => fromStory.set(Number(s), y));
  merge();
}

export function measureDomAnchors() {
  const vh = window.innerHeight;
  domAnchors = Array.from(document.querySelectorAll<HTMLElement>("[data-scene-stage]"))
    .filter((el) => el.getClientRects().length)
    .map((el) => {
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY;
      const align = el.dataset.sceneAlign === "top" ? top : top + r.height / 2 - vh / 2;
      return { stage: Number(el.dataset.sceneStage), y: Math.max(0, align) };
    });
  merge();
}

export function stageAt(y: number) {
  if (!merged.length) return 0;
  if (y <= merged[0].y) return merged[0].stage;
  for (let i = 0; i < merged.length - 1; i++) {
    const a = merged[i], b = merged[i + 1];
    if (y <= b.y) {
      const t = (y - a.y) / Math.max(1, b.y - a.y);
      return a.stage + (b.stage - a.stage) * t;
    }
  }
  return merged[merged.length - 1].stage;
}
