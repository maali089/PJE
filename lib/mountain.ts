/* Gemeinsame Maße der Bergszene (Bild public/assets/berg-gewitter-2.webp, 2560 × 1441). */

// Silhouette des vorderen Bergmassivs in Prozent des Bildes (2560 × 1441)
export const RIDGE =
  "polygon(0% 36.5%,3% 38%,7% 43%,11% 47.5%,15% 51%,19% 53%,21% 48%,23% 40%,25% 34%,27% 31%,30.5% 27%,33% 22.5%,34.6% 20.8%,36% 22.5%,37.1% 29%,38.9% 35.5%,40.5% 38.5%,42.9% 40%,45.7% 34.3%,48.6% 30.2%,50% 32.5%,51.4% 35.5%,54.3% 40.6%,56.4% 37.2%,58.6% 41.9%,60.7% 46.3%,62.9% 48.9%,65.5% 49.5%,67.1% 47.6%,69.3% 50.8%,71.4% 55.8%,74.3% 59.6%,78.6% 55%,82.1% 60%,85% 60.5%,89.3% 63.5%,95% 66%,100% 68.5%,100% 100%,0% 100%)";

// Bildbox wie object-cover, damit Bild und Silhouette immer exakt übereinander liegen
export const coverBox = "absolute left-1/2 top-1/2 aspect-[2560/1441] w-[max(100vw,177.7svh)] -translate-x-1/2 -translate-y-1/2";
