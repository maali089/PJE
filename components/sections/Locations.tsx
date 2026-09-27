import { contact, getGroup, places } from "@/lib/content";
import { LocationsMap } from "./LocationsMap";

export function Locations({ showTravel = true }: { showTravel?: boolean }) {
  const travel = getGroup("anfahrt");
  return (
    <section className="section" aria-labelledby="standorte-titel" id="standorte" data-bg="paper">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        <div>
          <h2 id="standorte-titel" className="t-h2 max-w-[11ch]" data-reveal>
            Vor Ort für Sie da<span className="text-accent">.</span>
          </h2>
          <p className="t-lead mt-6 max-w-[44ch]" data-reveal>
            Vor-Ort-Service in München, Wolnzach und rund 50 km Umgebung. Websites und Software entstehen standortunabhängig, für Betriebe überall.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="border-t-2 border-accent pt-5" data-reveal>
              <p className="text-2xl font-semibold tracking-[-0.03em]">München</p>
              <p className="t-body mt-2 text-[0.95rem]">IT-Service vor Ort in München und Umgebung, Projekte für Unternehmen in der Region.</p>
            </div>
            <div className="border-t-2 border-accent pt-5" data-reveal style={{ ["--i" as string]: 1 }}>
              <p className="text-2xl font-semibold tracking-[-0.03em]">Wolnzach</p>
              <p className="t-body mt-2 text-[0.95rem]">
                {contact.street}, {contact.zip} {contact.city}. Vor Ort in der Hallertau und bis Ingolstadt.
              </p>
            </div>
          </div>

          <p className="t-body mt-8 text-[0.95rem]" data-reveal>
            <span className="text-ink">Im Einzugsgebiet unter anderem:</span> {places.map((p) => p.name).join(", ")}.
          </p>

          {showTravel && (
            <div className="mt-10" data-reveal>
              <p className="t-label">Anfahrt, einmal pro Termin</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {travel.rows.map((r) => (
                  <div key={r.label} className="rounded-[14px] bg-white px-4 py-3">
                    <dt className="text-[0.8rem] text-slate">{r.label}</dt>
                    <dd className="t-num mt-1 font-semibold tracking-[-0.02em]">{r.price}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        <div className="relative mx-auto w-full max-w-[560px]" data-reveal="fade">
          <LocationsMap />
        </div>
      </div>
    </section>
  );
}
