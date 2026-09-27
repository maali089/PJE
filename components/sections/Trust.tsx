import { FileText, Key, Lightning, ReceiptX, Tag, UserFocus } from "@phosphor-icons/react/ssr";
import { trustPoints } from "@/lib/content";
import { Scene } from "@/components/motion/Scene";

const icons = [UserFocus, ReceiptX, Tag, Key, FileText, Lightning];

export function Trust() {
  return (
    <Scene name="trust" as="section" aria-labelledby="vertrauen-titel" className="relative">
      <div data-panel className="relative overflow-hidden bg-ink text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.1)_1px,transparent_0)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_20%_0%,black,transparent_70%)]"
        />
        <div className="wrap relative py-28 md:py-40">
          <h2 id="vertrauen-titel" className="t-h2 max-w-none">
            <span data-line-a className="block">
              Sie kümmern sich um Ihr Unternehmen.
            </span>
            <span data-line-b className="mt-1 block text-[#7d97ff]">
              Wir kümmern uns um die Technik.
            </span>
          </h2>

          <ul className="mt-20 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-28 lg:grid-cols-3">
            {trustPoints.map((t, i) => {
              const Icon = icons[i];
              return (
                <li key={t.title} className="group border-t border-white/12 pt-7" data-reveal style={{ ["--i" as string]: i % 3 }}>
                  <Icon
                    size={26}
                    weight="light"
                    className="text-[#7d97ff] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110"
                    aria-hidden
                  />
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em]">{t.title}</h3>
                  <p className="mt-2 max-w-[36ch] leading-relaxed text-white/65">{t.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Scene>
  );
}
