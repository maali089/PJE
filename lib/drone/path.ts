/*
 * Flugroute der Drohne. Jeder Keyframe hängt an einem Abschnitt der Seite ([data-drone="…"]):
 * f = Anteil am scrollbaren Weg dieses Abschnitts (0 = Oberkante oben am Bildschirm), off = zusätzliche Bildschirmhöhen.
 * Zwischen den Keyframes wird weich interpoliert (Catmull-Rom für die Position), dadurch wirkt der Flug schwer und ruhig.
 *
 * mood: 0 Gewitter · 1 diffuses Tageslicht · 2 Morgendämmerung
 * cloud: Drohne fliegt durch eine Wolke (0 … 1)   haze: zusätzlicher Dunst hinter Text (0 … 1)
 * sea: Höhe des Wolkenmeers (unter der Drohne), seaA: Dichte des Wolkenmeers
 */

export type Vec3 = [number, number, number];
export type Key = {
  a: string;
  f?: number;
  off?: number;
  pos: Vec3;
  tgt: Vec3;
  mood?: number;
  cloud?: number;
  haze?: number;
  sea?: number;
  seaA?: number;
  front?: number; // Text-hinter-dem-Berg-Moment aktiv
};

export const KEYS: Key[] = [
  // Gewitter: frontal auf den Hauptgipfel (verdeckt vom gemalten Bild der Eröffnung)
  { a: "hero", f: 0, pos: [0.2, 3.0, 9], tgt: [0.2, 4.6, -6], mood: 0, cloud: 0, haze: 0, sea: 0.9, seaA: 0 },
  { a: "hero", f: 0.62, pos: [0.2, 4.4, 0.4], tgt: [0.2, 5.4, -6], mood: 0, cloud: 0.55 },
  // in der Wolke direkt unter dem Gipfel
  { a: "hero", f: 0.94, pos: [0.2, 5.6, -3.4], tgt: [0.2, 6.2, -6.5], mood: 0.1, cloud: 1 },
  // über den Gipfel, Kamera kippt nach unten: dahinter öffnet sich das Gebirge
  { a: "story", f: 0, pos: [0.2, 7.0, -6.0], tgt: [0.4, 4.2, -10.5], mood: 0.3, cloud: 0.45, haze: 0.04 },
  { a: "story", f: 0.14, pos: [0.5, 6.9, -9.2], tgt: [1.2, 2.0, -14.6], mood: 0.65, cloud: 0, haze: 0.14 },
  { a: "story", f: 0.45, pos: [-1.2, 5.6, -13.8], tgt: [-1.8, 0.8, -19.4], mood: 0.9, haze: 0.36 },
  { a: "story", f: 1, pos: [0.6, 3.9, -17.5], tgt: [0.9, 1.6, -23], mood: 1, haze: 0.42 },
  // tiefer ins Tal: vor der Kamera liegt ein Grat, dahinter steht die Schrift
  { a: "fly", f: 0, pos: [valleyAt(-20.8), 2.15, -20.8], tgt: [valleyAt(-27), 2.45, -30], mood: 1, haze: 0.12, front: 1 },
  { a: "fly", f: 0.55, pos: [valleyAt(-21.6), 3.6, -21.6], tgt: [valleyAt(-27), 2.0, -30], haze: 0.12, front: 1 },
  { a: "fly", f: 1, pos: [valleyAt(-24.5), 4.6, -24.5], tgt: [valleyAt(-29), 1.4, -31], haze: 0.15, front: 0 },
  // Wolkenbank vor CEN-GIZ
  { a: "project", f: 0, pos: [0.6, 4.4, -26.5], tgt: [0.4, 3.2, -32], mood: 0.85, cloud: 1, haze: 0.1 },
  { a: "project", f: 0.14, pos: [0.4, 4.3, -28], tgt: [0.1, 1.8, -34], mood: 0.75, cloud: 0.12 },
  { a: "project", f: 0.86, pos: [-0.2, 4.4, -31.5], tgt: [-0.4, 1.8, -37.5], mood: 0.75, cloud: 0.12 },
  { a: "project", f: 1, pos: [-0.4, 4.5, -33], tgt: [-0.5, 2.8, -38.5], mood: 0.9, cloud: 1 },
  // weiter über kleinere Ketten, seitlicher Drift
  { a: "facts", f: 0, off: -0.4, pos: [-0.9, 4.8, -35.5], tgt: [-1.6, 1.0, -41.5], mood: 1, cloud: 0.15, haze: 0.55 },
  { a: "services", f: 0, pos: [-2.2, 4.6, -40], tgt: [-1.2, 0.9, -46], haze: 0.55, cloud: 0 },
  { a: "services", f: 1, pos: [2.2, 4.5, -50], tgt: [2.8, 0.8, -56], haze: 0.55 },
  { a: "packages", f: 0, off: 0.3, pos: [1.6, 4.9, -55], tgt: [0.6, 1.2, -61], haze: 0.52, sea: 1.55, seaA: 0 },
  // über die Wolkendecke: ruhiger, Blick wieder nach vorne
  { a: "team", f: 0, pos: [0.4, 5.9, -61], tgt: [0.2, 5.2, -72], mood: 1.25, haze: 0.18, sea: 1.55, seaA: 1 },
  { a: "team", f: 1, pos: [0.8, 6.1, -67], tgt: [0.6, 5.3, -78], mood: 1.45, haze: 0.2 },
  { a: "trust", f: 0, pos: [0.6, 6.2, -70], tgt: [0.3, 5.4, -81], mood: 1.55, haze: 0.3 },
  { a: "faq", f: 0, pos: [0.2, 6.3, -76], tgt: [0, 5.6, -87], mood: 1.7, haze: 0.55 },
  // Kontakt: weiter Horizont, warmes Licht, die Drohne gleitet langsam weiter
  { a: "contact", f: 0, off: -0.2, pos: [0, 6.6, -83], tgt: [0, 6.3, -96], mood: 2, haze: 0.42, sea: 1.4 },
  { a: "contact", f: 1, off: 1.2, pos: [0, 6.8, -88], tgt: [0, 6.5, -101], mood: 2, haze: 0.42 },
];

function valleyAt(z: number) {
  return 2.0 * Math.sin(z * 0.07) + 1.1 * Math.sin(z * 0.023 + 1.3);
}

export type Cam = { pos: Vec3; tgt: Vec3; mood: number; cloud: number; haze: number; sea: number; seaA: number; front: number };

/** Füllt fehlende Werte mit dem jeweils letzten gesetzten Wert auf. */
export function resolveKeys(keys: Key[]) {
  let mood = 0, cloud = 0, haze = 0, sea = 0.8, seaA = 0.5, front = 0;
  return keys.map((k) => {
    mood = k.mood ?? mood;
    cloud = k.cloud ?? cloud;
    haze = k.haze ?? haze;
    sea = k.sea ?? sea;
    seaA = k.seaA ?? seaA;
    front = k.front ?? 0;
    return { ...k, mood, cloud, haze, sea, seaA, front };
  });
}

const cr = (p0: number, p1: number, p2: number, p3: number, t: number) => {
  const t2 = t * t, t3 = t2 * t;
  return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
};
const ease = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Kamera bei Scrollposition y; ys = Scrollpositionen der Keyframes (aufsteigend). */
export function cameraAt(y: number, ys: number[], keys: ReturnType<typeof resolveKeys>): Cam {
  const n = keys.length;
  let i = 0;
  if (y <= ys[0]) i = 0;
  else if (y >= ys[n - 1]) i = n - 2;
  else while (i < n - 2 && y > ys[i + 1]) i++;
  const span = Math.max(1, ys[i + 1] - ys[i]);
  const t = Math.min(1, Math.max(0, (y - ys[i]) / span));
  const k0 = keys[Math.max(0, i - 1)], k1 = keys[i], k2 = keys[i + 1], k3 = keys[Math.min(n - 1, i + 2)];
  const te = ease(t);
  const v = (sel: (k: (typeof keys)[number]) => Vec3, j: number) => cr(sel(k0)[j], sel(k1)[j], sel(k2)[j], sel(k3)[j], t);
  return {
    pos: [v((k) => k.pos, 0), v((k) => k.pos, 1), v((k) => k.pos, 2)],
    tgt: [v((k) => k.tgt, 0), v((k) => k.tgt, 1), v((k) => k.tgt, 2)],
    mood: lerp(k1.mood, k2.mood, te),
    cloud: lerp(k1.cloud, k2.cloud, te),
    haze: lerp(k1.haze, k2.haze, te),
    sea: lerp(k1.sea, k2.sea, te),
    seaA: lerp(k1.seaA, k2.seaA, te),
    front: lerp(k1.front, k2.front, te),
  };
}
