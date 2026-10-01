import { locations, places, serviceRadiusKm } from "@/lib/content";
import { Scene } from "@/components/motion/Scene";

// Einfache äquirektanguläre Projektion in Kilometern (reicht für ~150 km Ausschnitt)
const LON0 = 10.75;
const LAT0 = 49.2;
const KM_LON = 73.8; // km pro Längengrad bei ~48,4° N
const KM_LAT = 111.2;
const project = (lat: number, lon: number) => ({ x: (lon - LON0) * KM_LON, y: (LAT0 - lat) * KM_LAT });

const labelPos: Record<string, { dx: number; dy: number; anchor: "start" | "end" | "middle" }> = {
  Ingolstadt: { dx: -2.6, dy: 1.2, anchor: "end" },

  Mainburg: { dx: 2.6, dy: 1.2, anchor: "start" },

  "Pfaffenhofen a. d. Ilm": { dx: -2.2, dy: 5, anchor: "end" },
  Freising: { dx: 2.6, dy: 1.2, anchor: "start" },
  Dachau: { dx: -2.6, dy: 1.2, anchor: "end" },

  Erding: { dx: 2.6, dy: 1.2, anchor: "start" },
};

export function MapSvg({ idp = "m" }: { idp?: string }) {
  const cities = locations.map((l) => ({ ...l, ...project(l.lat, l.lon) }));
  const [muc, wol] = cities;
  const pts = places.map((p) => ({ ...p, ...project(p.lat, p.lon) }));
  const r = serviceRadiusKm;

  return (
    <>
      <svg
        viewBox="-6 6 146 176"
        className="h-auto w-full"
        role="img"
        aria-labelledby={`${idp}-karte-titel ${idp}-karte-beschreibung`}
      >
        <title id={`${idp}-karte-titel`}>Einsatzgebiet von PJE Systems</title>
        <desc id={`${idp}-karte-beschreibung`}>
          Karte mit den Standorten München und Wolnzach und einem Vor-Ort-Radius von jeweils rund {r} Kilometern.
        </desc>
        <defs>
          <pattern id={`${idp}-map-dots`} width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.42" fill="#0b0c0e" fillOpacity="0.16" />
          </pattern>
          <pattern id={`${idp}-map-dots-in`} width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.55" fill="#2651f0" fillOpacity="0.45" />
          </pattern>
          <radialGradient id={`${idp}-map-fade`} cx="50%" cy="50%" r="50%">
            <stop offset="45%" stopColor="#fff" />
            <stop offset="98%" stopColor="#000" />
          </radialGradient>
          <mask id={`${idp}-map-mask`}>
            <rect x="-6" y="6" width="146" height="176" fill={`url(#${idp}-map-fade)`} />
          </mask>
          <clipPath id={`${idp}-map-radius-clip`}>
            <circle cx={muc.x} cy={muc.y} r={r} />
            <circle cx={wol.x} cy={wol.y} r={r} />
          </clipPath>
        </defs>

        {/* Satellitenbild der Region (Sentinel-2 cloudless 2016, EOX, CC BY 4.0), zu den Rändern ausgeblendet */}
        <g mask={`url(#${idp}-map-mask)`}>
          <image href="/assets/karte-satellit.webp" x="-6" y="6" width="146" height="176" preserveAspectRatio="none" opacity={0.6} />
          <rect x="-6" y="6" width="146" height="176" fill={`url(#${idp}-map-dots)`} />
        </g>

        {cities.map((c, i) => (
          <g key={c.name} data-radius>
            <circle cx={c.x} cy={c.y} r={r} fill="#2651f0" fillOpacity={0.045} />
            <circle
              cx={c.x}
              cy={c.y}
              r={r}
              fill="none"
              stroke="#2651f0"
              strokeOpacity={0.45}
              strokeWidth={0.35}
              strokeDasharray={i === 0 ? "1.2 1.2" : "0"}
            />
          </g>
        ))}
        {/* Im Einsatzgebiet ist das Satellitenbild klar zu sehen */}
        <g data-radius clipPath={`url(#${idp}-map-radius-clip)`}>
          <image href="/assets/karte-satellit.webp" x="-6" y="6" width="146" height="176" preserveAspectRatio="none" />
          <rect x="-6" y="6" width="146" height="176" fill={`url(#${idp}-map-dots-in)`} />
        </g>

        <line
          data-link
          x1={wol.x}
          y1={wol.y}
          x2={muc.x}
          y2={muc.y}
          stroke="#2651f0"
          strokeWidth="0.45"
          strokeDasharray="60"
          strokeLinecap="round"
        />

        {pts.map((p) => {
          const lp = labelPos[p.name]; // Orte ohne Eintrag: nur Punkt (Name steht in der Liste daneben)
          return (
            <g key={p.name} data-place>
              <circle cx={p.x} cy={p.y} r={0.9} fill="#2b2f36" stroke="#f1f3f7" strokeWidth={0.4} />
              {lp && <text
                x={p.x + lp.dx}
                y={p.y + lp.dy}
                textAnchor={lp.anchor}
                fontSize="3.6"
                fill="#2b2f36"
                stroke="#f1f3f7"
                strokeWidth={1}
                strokeOpacity={0.9}
                paintOrder="stroke"
                style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
              >
                {p.name}
              </text>}
            </g>
          );
        })}

        {cities.map((c) => (
          <g key={c.name} data-city>
            <circle cx={c.x} cy={c.y} r={4.5} fill="#2651f0" fillOpacity="0.14" className="map-pulse" />
            <circle cx={c.x} cy={c.y} r={2.2} fill="#2651f0" stroke="#fff" strokeWidth="0.8" />
            <text
              x={c.name === "München" ? c.x : c.x - 4.2}
              y={c.name === "München" ? c.y + 9 : c.y + 2}
              textAnchor={c.name === "München" ? "middle" : "end"}
              fontSize="4.6"
              fontWeight="600"
              fill="#0b0c0e"
              stroke="#f1f3f7"
              strokeWidth={1.2}
              strokeOpacity={0.95}
              paintOrder="stroke"
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.03em" }}
            >
              {c.name}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-2 text-right text-[0.62rem] leading-snug text-quiet">
        Satellitenbild:{" "}
        <a href="https://s2maps.eu" target="_blank" rel="noopener" className="underline decoration-dotted underline-offset-2">
          Sentinel-2 cloudless 2016
        </a>{" "}
        von EOX IT Services GmbH (enthält modifizierte Copernicus-Sentinel-Daten 2016),{" "}
        <a href="https://creativecommons.org/licenses/by/4.0/deed.de" target="_blank" rel="noopener" className="underline decoration-dotted underline-offset-2">
          CC BY 4.0
        </a>
        , eingefärbt.
      </p>
      <style>{`
        @keyframes mapPulse { 0% { transform: scale(0.6); opacity: .9 } 100% { transform: scale(2.4); opacity: 0 } }
        .map-pulse { transform-box: fill-box; transform-origin: center; animation: mapPulse 2.8s cubic-bezier(.16,1,.3,1) infinite; }
        @media (prefers-reduced-motion: reduce) { .map-pulse { animation: none } }
      `}</style>
    </>
  );
}

export function LocationsMap() {
  return (
    <Scene name="map" as="div" className="relative">
      <MapSvg idp="lm" />
    </Scene>
  );
}
