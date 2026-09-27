import { Scene } from "@/components/motion/Scene";

type Step = { title: string; text: string };

export function ProcessTimeline({
  steps,
  title,
  lead,
  id = "ablauf",
}: {
  steps: Step[];
  title: React.ReactNode;
  lead?: string;
  id?: string;
}) {
  return (
    <Scene name="process" as="section" aria-labelledby={`${id}-titel`} className="relative">
      <div data-pin className="flex min-h-[100svh] flex-col justify-center py-24 lg:py-16">
        <div className="wrap w-full">
          <h2 id={`${id}-titel`} className="t-h2 max-w-[16ch]">
            {title}
          </h2>
          {lead && <p className="t-lead mt-6 max-w-[52ch]">{lead}</p>}

          <div className="relative mt-16 lg:mt-24">
            {/* Linie */}
            <div aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-line lg:left-0 lg:right-0 lg:top-[7px] lg:bottom-auto lg:h-px lg:w-auto">
              <span data-fill className="absolute inset-0 origin-top bg-accent lg:origin-left" />
            </div>

            <ol className="relative grid gap-12 lg:grid-cols-5 lg:gap-8">
              {steps.map((s, i) => (
                <li key={s.title} data-step className="group/step is-on relative pl-10 lg:pl-0 lg:pt-12">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border border-[#c9ccd3] bg-white transition-[background-color,border-color,scale] duration-500 group-[.is-on]/step:scale-110 group-[.is-on]/step:border-accent group-[.is-on]/step:bg-accent lg:top-0"
                  />
                  <span className="font-mono text-[0.78rem] text-quiet transition-colors duration-500 group-[.is-on]/step:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="t-h3 mt-2 text-[#8b9099] transition-colors duration-500 group-[.is-on]/step:text-ink">{s.title}</h3>
                  <p className="t-body mt-3 max-w-[30ch]">
                    {s.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Scene>
  );
}
