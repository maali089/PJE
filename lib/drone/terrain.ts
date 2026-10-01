/*
 * Prozedurales Hochgebirge für den Drohnenflug.
 * Welt: x quer (−18…18), z in Flugrichtung (8 … −108, die Drohne fliegt Richtung −z), y Höhe.
 * Aufbau: Ridged-Noise-Grate, ein monumentaler Hauptgipfel am Anfang, ein Querkamm für den
 * „Text hinter dem Berg“-Moment und ein gewundenes Tal unter der Flugroute.
 */

// ---------------------------------------------------------------- Perlin-Noise (deterministisch)
const perm = new Uint8Array(512);
(() => {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = 1337;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
})();
const grad = (h: number, x: number, y: number) => {
  const g = h & 7;
  const u = g < 4 ? x : y, v = g < 4 ? y : x;
  return (g & 1 ? -u : u) + (g & 2 ? -2 * v : 2 * v);
};
const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
export function perlin(x: number, y: number) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
  x -= Math.floor(x);
  y -= Math.floor(y);
  const u = fade(x), v = fade(y);
  const a = perm[X] + Y, b = perm[X + 1] + Y;
  const l1 = grad(perm[a], x, y) + u * (grad(perm[b], x - 1, y) - grad(perm[a], x, y));
  const l2 = grad(perm[a + 1], x, y - 1) + u * (grad(perm[b + 1], x - 1, y - 1) - grad(perm[a + 1], x, y - 1));
  return (l1 + v * (l2 - l1)) * 0.25; // etwa −1 … 1
}

const smooth = (a: number, b: number, t: number) => {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
};

function ridged(x: number, z: number, oct: number) {
  let sum = 0, amp = 0.55, freq = 0.17, weight = 1;
  for (let i = 0; i < oct; i++) {
    let n = 1 - Math.abs(perlin(x * freq + 13.1 * i, z * freq - 7.7 * i));
    n *= n;
    n *= weight;
    weight = Math.min(1, n * 1.7);
    sum += n * amp;
    amp *= 0.5;
    freq *= 2.07;
  }
  // spitzere Gipfel, weichere Mulden
  return Math.pow(sum, 1.3) * 1.15;
}

/** Talverlauf unter der Flugroute (x-Mitte des Tals bei z). */
export const valleyX = (z: number) => 2.0 * Math.sin(z * 0.07) + 1.1 * Math.sin(z * 0.023 + 1.3);

/** Geländehöhe an (x, z). */
export function heightAt(x: number, z: number, oct = 6) {
  // Höhenprofil entlang der Strecke: wuchtig am Anfang, danach kleinere Ketten
  const amp = 1.0 + 0.9 * smooth(-14, -4, z) - 0.35 * smooth(-50, -70, z);
  const r = ridged(x, z, oct);
  // Tal unter der Route, Ränder steigen an
  const dv = Math.abs(x - valleyX(z));
  const valley = 0.5 + 0.5 * smooth(0.3, 6.5, dv);
  let h = r * 2.1 * amp * valley + 0.25 * smooth(8, 17, Math.abs(x));

  // Hauptgipfel (Pyramide mit gezackten Graten)
  const dx = x - 0.2, dz = z + 6.2;
  const rr = Math.sqrt(dx * dx * 1.05 + dz * dz * 1.35);
  const jag = 0.82 + 0.3 * ridged(x * 1.6 + 40, z * 1.6, 3);
  h += 3.55 * Math.exp(-Math.pow(rr / 2.5, 1.3)) * jag;

  // Querkamm vor dem Text-Moment
  const ridge = Math.exp(-Math.pow((z + 24.5) / 1.15, 2)) * (0.75 + 0.4 * ridged(x * 1.3, z * 1.3 + 9, 3));
  h += 2.1 * ridge * smooth(9, 2, Math.abs(x - valleyX(-24.5)) * 0.6);

  return h - 0.15;
}

// ---------------------------------------------------------------- Mesh
export type TerrainMesh = {
  data: Float32Array; // pos(3) normal(3) ao(1)
  index: Uint32Array;
  cols: number;
  rows: number;
  z0: number;
  dz: number;
  rowIndexStart: (row: number) => number;
};

export function buildTerrain(opts: { x0: number; x1: number; z0: number; z1: number; step: number; oct?: number }): TerrainMesh {
  const { x0, x1, z0, z1, step } = opts;
  const oct = opts.oct ?? 6;
  const cols = Math.floor((x1 - x0) / step) + 1;
  const rows = Math.floor((z0 - z1) / step) + 1;
  const H = new Float32Array(cols * rows);
  for (let r = 0; r < rows; r++) {
    const z = z0 - r * step;
    for (let c = 0; c < cols; c++) H[r * cols + c] = heightAt(x0 + c * step, z, oct);
  }
  // Kavitäten-AO: Höhe minus geglättete Umgebung (zwei Box-Blur-Pässe)
  const blur = (src: Float32Array, rad: number) => {
    const tmp = new Float32Array(src.length), out = new Float32Array(src.length);
    for (let r = 0; r < rows; r++) {
      let acc = 0;
      const row = r * cols;
      for (let c = -rad; c <= rad; c++) acc += src[row + Math.min(cols - 1, Math.max(0, c))];
      for (let c = 0; c < cols; c++) {
        tmp[row + c] = acc / (2 * rad + 1);
        acc += src[row + Math.min(cols - 1, c + rad + 1)] - src[row + Math.max(0, c - rad)];
      }
    }
    for (let c = 0; c < cols; c++) {
      let acc = 0;
      for (let r = -rad; r <= rad; r++) acc += tmp[Math.min(rows - 1, Math.max(0, r)) * cols + c];
      for (let r = 0; r < rows; r++) {
        out[r * cols + c] = acc / (2 * rad + 1);
        acc += tmp[Math.min(rows - 1, r + rad + 1) * cols + c] - tmp[Math.max(0, r - rad) * cols + c];
      }
    }
    return out;
  };
  const rad = Math.max(2, Math.round(0.45 / step));
  const B = blur(H, rad);

  const data = new Float32Array(cols * rows * 7);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const hL = H[r * cols + Math.max(0, c - 1)], hR = H[r * cols + Math.min(cols - 1, c + 1)];
      const hU = H[Math.max(0, r - 1) * cols + c], hD = H[Math.min(rows - 1, r + 1) * cols + c];
      // Normale aus zentralen Differenzen (z nimmt mit r ab)
      let nx = hL - hR, ny = 2 * step, nz = hD - hU;
      const l = Math.hypot(nx, ny, nz);
      nx /= l; ny /= l; nz /= l;
      const o = i * 7;
      data[o] = x0 + c * step;
      data[o + 1] = H[i];
      data[o + 2] = z0 - r * step;
      data[o + 3] = nx;
      data[o + 4] = ny;
      data[o + 5] = nz;
      data[o + 6] = H[i] - B[i];
    }
  }
  const index = new Uint32Array((cols - 1) * (rows - 1) * 6);
  let k = 0;
  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols - 1; c++) {
      const a = r * cols + c, b = a + 1, d = a + cols, e = d + 1;
      index[k++] = a; index[k++] = d; index[k++] = b;
      index[k++] = b; index[k++] = d; index[k++] = e;
    }
  }
  return { data, index, cols, rows, z0, dz: step, rowIndexStart: (row) => Math.max(0, Math.min(rows - 1, row)) * (cols - 1) * 6 };
}
