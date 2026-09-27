import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div aria-hidden className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="wrap relative">
        <p className="t-label">Fehler 404</p>
        <h1 className="t-h1 mt-6">
          <span className="line-mask">
            <span className="anim-rise">Diese Seite</span>
          </span>
          <span className="line-mask">
            <span className="anim-rise" style={{ ["--d" as string]: 110 }}>
              gibt es nicht<span className="text-accent">.</span>
            </span>
          </span>
        </h1>
        <p className="t-lead anim-fade-up mt-6 max-w-[44ch]" style={{ ["--d" as string]: 300 }}>
          Vielleicht wurde sie beim Relaunch verschoben. Hier geht es weiter:
        </p>
        <div className="anim-fade-up mt-10 flex flex-wrap gap-3" style={{ ["--d" as string]: 420 }}>
          <Link href="/" className="btn btn-primary">
            <span className="btn-t"><span data-t="Zur Startseite">Zur Startseite</span></span> <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden />
          </Link>
          <Link href="/leistungen/" className="btn btn-outline">
            <span className="btn-t"><span data-t="Leistungen">Leistungen</span></span>
          </Link>
          <Link href="/kontakt/" className="btn btn-outline">
            <span className="btn-t"><span data-t="Kontakt">Kontakt</span></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
