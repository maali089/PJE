"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { contact, nav, waLink } from "@/lib/content";

function isActive(pathname: string, href: string) {
  if (href === "/leistungen/") return pathname === "/leistungen/" || pathname === "/preise/";
  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Kompakter Zustand, sobald der Seitenanfang verlassen wird
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const first = menuRef.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div ref={sentinel} aria-hidden className="pointer-events-none absolute left-0 top-0 h-6 w-px" />
      <header
        data-scrolled={scrolled || undefined}
        className="group/nav fixed inset-x-0 top-0 z-50 transition-[transform] duration-500"
      >
        <div
          className="absolute inset-0 border-b border-transparent bg-white/0 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 group-data-[scrolled]/nav:border-line/80 group-data-[scrolled]/nav:bg-white/75 group-data-[scrolled]/nav:shadow-[0_8px_30px_-20px_rgb(11_12_14/0.25)] group-data-[scrolled]/nav:backdrop-blur-xl group-data-[scrolled]/nav:backdrop-saturate-150"
          aria-hidden
        />
        <div className="wrap relative flex h-[72px] items-center justify-between gap-6 transition-[height] duration-500 group-data-[scrolled]/nav:h-[60px]">
          <Link
            href="/"
            aria-label="PJE Systems, zur Startseite"
            className="anim-fade relative z-10 shrink-0 rounded-md"
            style={{ ["--d" as string]: 0 }}
          >
            <Image
              src="/assets/logo-pje-systems.webp"
              alt="PJE Systems"
              width={905}
              height={372}
              preload
              sizes="80px"
              className="h-[30px] w-auto mix-blend-multiply transition-[height] duration-500 group-data-[scrolled]/nav:h-[26px]"
            />
          </Link>

          <nav aria-label="Hauptnavigation" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {nav.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="anim-fade-up" style={{ ["--d" as string]: 120 + i * 50 }}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`link-u text-[0.94rem] tracking-[-0.01em] transition-colors ${
                        active ? "text-accent" : "text-graphite hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={waLink("Hallo PJE, ich habe eine Anfrage:")}
              target="_blank"
              rel="noopener"
              aria-label={`WhatsApp (${contact.whatsappDisplay})`}
              data-magnetic
              className="btn btn-outline btn-sm anim-fade-up !w-11 !px-0 md:!w-auto md:!px-[1.15rem]"
              style={{ ["--d" as string]: 420 }}
            >
              <WhatsappLogo size={18} aria-hidden />
              <span className="hidden md:inline"><span className="btn-t"><span data-t="WhatsApp">WhatsApp</span></span></span>
            </a>
            <Link
              href="/kontakt/"
              data-magnetic
              className="btn btn-primary btn-sm anim-fade-up hidden sm:inline-flex"
              style={{ ["--d" as string]: 480 }}
            >
              <span className="btn-t"><span data-t="Projekt starten">Projekt starten</span></span>
              <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              className="relative z-[60] grid h-11 w-11 place-items-center rounded-full border border-line bg-white/70 backdrop-blur lg:hidden"
            >
              <span className="relative block h-3 w-[18px]">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-full bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                    open ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                    open ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen-Menü (Mobile/Tablet) */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col bg-canvas transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_60%)]" />
        <nav aria-label="Mobile Navigation" className="wrap relative flex flex-1 flex-col justify-center pt-20">
          <ul className="flex flex-col gap-1">
            {[{ href: "/", label: "Start" }, ...nav, { href: "/preise/", label: "Preise" }].map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`flex items-baseline justify-between py-1.5 text-[clamp(2rem,9vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.045em] transition-[transform,color] duration-700 ease-[var(--ease-out-expo)] ${
                    open ? "translate-y-0" : "translate-y-full"
                  } ${isActive(pathname, item.href) && item.href !== "/" ? "text-accent" : "text-ink"}`}
                  style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
                >
                  {item.label}
                  <ArrowUpRight size={22} className="text-quiet" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div
          className={`wrap relative grid gap-3 pb-[max(24px,env(safe-area-inset-bottom))] transition-[opacity,transform] duration-700 ${
            open ? "translate-y-0 opacity-100 delay-300" : "translate-y-3 opacity-0"
          }`}
        >
          <Link href="/kontakt/" className="btn btn-primary w-full">
            <span className="btn-t"><span data-t="Projekt starten">Projekt starten</span></span>
            <ArrowRight size={16} weight="bold" aria-hidden />
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <a href={contact.phoneHref} className="btn btn-outline btn-sm">
              <span className="btn-t"><span data-t="Anrufen">Anrufen</span></span>
            </a>
            <a target="_blank" href={waLink("Hallo PJE, ich habe eine Anfrage:")} className="btn btn-outline btn-sm" rel="noopener">
              <span className="btn-t"><span data-t="WhatsApp">WhatsApp</span></span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
