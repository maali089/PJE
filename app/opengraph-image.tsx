import { ImageResponse } from "next/og";

export const alt = "PJE Systems: Websites, Software und IT in München und Wolnzach";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#ffffff",
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(11,12,14,0.10) 1px, transparent 0)",
          backgroundSize: "24px 24px",
          color: "#0b0c0e",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: 6 }}>PJE SYSTEMS</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 118, fontWeight: 700, lineHeight: 0.95, letterSpacing: -5 }}>
          <div style={{ display: "flex" }}>
            Digital<span style={{ color: "#2651f0" }}>.</span>
          </div>
          <div style={{ display: "flex" }}>
            Einfach<span style={{ color: "#2651f0" }}>.</span>
          </div>
          <div style={{ display: "flex" }}>
            Besser<span style={{ color: "#2651f0" }}>.</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#5c6068" }}>Websites · Software · IT in München und Wolnzach</div>
      </div>
    ),
    size,
  );
}
