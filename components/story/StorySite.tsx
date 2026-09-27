import Image from "next/image";

/*
 * Beispiel-Website „Ihr Betrieb“, die in der Story Stück für Stück entsteht.
 * Alle Maße in cqw, damit die Seite mit ihrem Rahmen skaliert.
 * data-b markiert die Bausteine, die nacheinander erscheinen.
 */

export function StorySiteDesktop() {
  return (
    <div className="absolute inset-0 flex flex-col bg-white px-[4cqw] pt-[2.4cqw] text-ink">
      <div data-b="nav" className="flex items-center justify-between">
        <span className="text-[1.6cqw] font-semibold tracking-[-0.03em]">
          Ihr Betrieb<span className="text-accent">.</span>
        </span>
        <div className="flex items-center gap-[2.2cqw] text-[1.1cqw] text-slate">
          <span>Leistungen</span>
          <span>Über uns</span>
          <span>Kontakt</span>
          <span className="rounded-full bg-ink px-[1.5cqw] py-[0.7cqw] text-white">Anfrage</span>
        </div>
      </div>
      <div className="mt-[4cqw] grid grid-cols-[1.05fr_1fr] items-center gap-[4cqw]">
        <div>
          <p data-b="title" className="text-[4.6cqw] font-semibold leading-[0.96] tracking-[-0.05em]">
            Gute Arbeit.
            <br />
            Aus der Region<span className="text-accent">.</span>
          </p>
          <p data-b="text" className="mt-[1.8cqw] max-w-[34cqw] text-[1.25cqw] leading-[1.5] text-slate">
            Beratung, Planung und Umsetzung aus einer Hand. Termine direkt online anfragen.
          </p>
          <span data-b="cta" className="mt-[2.4cqw] inline-block rounded-full bg-accent px-[2cqw] py-[1cqw] text-[1.2cqw] font-medium text-white">
            Termin anfragen
          </span>
        </div>
        <div data-b="img" className="relative aspect-[4/3] overflow-hidden rounded-[1.2cqw] bg-fog">
          <Image src="/assets/arbeitsplatz-pje-systems-wolnzach.webp" alt="" fill sizes="40vw" className="object-cover" />
        </div>
      </div>
      <div className="mt-[4cqw] grid grid-cols-3 gap-[2cqw]">
        {["Beratung", "Planung", "Umsetzung"].map((l, i) => (
          <div
            key={l}
            data-b="tile"
            className="rounded-[1cqw] p-[1.6cqw]"
            style={{ background: i === 1 ? "#0b0c0e" : "#f3f4f7", color: i === 1 ? "#fff" : "#0b0c0e" }}
          >
            <span className="block h-[1.6cqw] w-[1.6cqw] rounded-full" style={{ background: i === 1 ? "#2651f0" : "#d7dcea" }} />
            <p className="mt-[2.2cqw] text-[1.35cqw] font-semibold tracking-[-0.02em]">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Tablet- und Smartphone-Fassung derselben Seite (Maße relativ zur eigenen Breite). */
export function StorySiteNarrow({ phone = false }: { phone?: boolean }) {
  const k = phone ? 1.55 : 1;
  const u = (n: number) => `${n * k}cqw`;
  return (
    <div className="absolute inset-0 flex flex-col bg-white text-ink" style={{ padding: `${u(7)} ${u(7)} 0` }}>
      <div className="flex items-center justify-between">
        <span className="font-semibold tracking-[-0.03em]" style={{ fontSize: u(4.2) }}>
          Ihr Betrieb<span className="text-accent">.</span>
        </span>
        <span className="flex flex-col" style={{ gap: u(1.3) }}>
          <span className="block bg-ink" style={{ height: u(0.6), width: u(5) }} />
          <span className="block bg-ink" style={{ height: u(0.6), width: u(5) }} />
        </span>
      </div>
      <div className="relative overflow-hidden" style={{ marginTop: u(7), aspectRatio: "4/3", borderRadius: u(3) }}>
        <Image src="/assets/arbeitsplatz-pje-systems-wolnzach.webp" alt="" fill sizes="20vw" className="object-cover" />
      </div>
      <p className="font-semibold leading-[0.96] tracking-[-0.05em]" style={{ fontSize: u(9), marginTop: u(6) }}>
        Gute Arbeit. Aus der Region<span className="text-accent">.</span>
      </p>
      <span
        className="w-fit rounded-full bg-accent font-medium text-white"
        style={{ fontSize: u(3.4), padding: `${u(2.2)} ${u(4.4)}`, marginTop: u(5) }}
      >
        Termin anfragen
      </span>
      {!phone && (
        <div className="grid grid-cols-2" style={{ gap: u(3), marginTop: u(7) }}>
          {["Beratung", "Planung"].map((l, i) => (
            <div
              key={l}
              style={{ padding: u(4), borderRadius: u(2.4), background: i === 1 ? "#0b0c0e" : "#f3f4f7", color: i === 1 ? "#fff" : "#0b0c0e" }}
            >
              <p className="font-semibold" style={{ fontSize: u(3.4) }}>
                {l}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
