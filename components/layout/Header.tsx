"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Phone, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { contact, nav, waLink } from "@/lib/content";

function isActive(pathname: string, href: string) {
  if (href === "/leistungen/") return pathname === "/leistungen/" || pathname === "/preise/";
  return pathname.startsWith(href);
}

// Mobile-Menü: die vorhandenen Seiten plus die Referenzen auf der Startseite
const mobileNav = [
  { href: "/websites/", label: "Websites" },
  { href: "/leistungen/computerhilfe/", label: "IT-Service" },
  { href: "/leistungen/softwareentwicklung/", label: "Software" },
  { href: "/#referenzen", label: "Referenzen" },
  { href: "/ueber-uns/", label: "Über uns" },
  { href: "/kontakt/", label: "Kontakt" },
];
const mobileNavSmall = [
  { href: "/leistungen/", label: "Alle Leistungen" },
  { href: "/preise/", label: "Preise" },
];

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

  // Menü offen: Seite dahinter steht still (Lenis anhalten, natives Scrollen sperren), Position bleibt erhalten
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const lenis = window.__lenis;
    lenis?.stop();
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = "";
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open]);

  // Sprungmarke auf derselben Seite: erst Menü schließen, dann weich hinscrollen
  const onNav = (href: string) => (e: React.MouseEvent) => {
    const [path, hash] = href.split("#");
    if (!hash || (path || "/") !== pathname) return;
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => {
      const el = document.getElementById(hash);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 64;
      if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.4 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    }, 60);
  };

  const all = [...mobileNav, ...mobileNavSmall];
  return (
    <>
      <div ref={sentinel} aria-hidden className="pointer-events-none absolute left-0 top-0 h-6 w-px" />
      <header
        data-scrolled={scrolled || undefined}
        data-menu={open || undefined}
        className="group/nav fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[transform] duration-500"
      >
        <div
          className="absolute inset-0 border-b border-transparent bg-white/0 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 group-data-[scrolled]/nav:border-line/80 group-data-[scrolled]/nav:bg-white/75 group-data-[scrolled]/nav:shadow-[0_8px_30px_-20px_rgb(11_12_14/0.25)] group-data-[scrolled]/nav:backdrop-blur-xl group-data-[scrolled]/nav:backdrop-saturate-150 group-data-[menu]/nav:border-transparent group-data-[menu]/nav:bg-transparent group-data-[menu]/nav:shadow-none group-data-[menu]/nav:backdrop-blur-none"
          aria-hidden
        />
        <div className="wrap safe-x relative flex h-16 items-center justify-between gap-3 transition-[height] duration-500 sm:h-[72px] sm:gap-6 group-data-[scrolled]/nav:h-[60px]">
          <Link
            href="/"
            aria-label="PJE Systems, zur Startseite"
            className="anim-fade relative z-10 -my-2 shrink-0 rounded-md py-2"
            style={{ ["--d" as string]: 0 }}
          >
            <Image
              src="/assets/logo-pje-systems.webp"
              alt="PJE Systems"
              width={905}
              height={372}
              preload
              sizes="80px"
              className="h-[28px] w-auto mix-blend-multiply transition-[height] duration-500 sm:h-[30px] group-data-[scrolled]/nav:h-[26px]"
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

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={waLink("Hallo PJE, ich habe eine Anfrage:")}
              target="_blank"
              rel="noopener"
              aria-label={`WhatsApp (${contact.whatsappDisplay})`}
              data-magnetic
              className="btn btn-outline btn-sm anim-fade-up !min-h-11 !w-11 !px-0 md:!w-auto md:!px-[1.15rem]"
              style={{ ["--d" as string]: 420 }}
            >
              <WhatsappLogo size={19} aria-hidden />
              <span className="hidden md:inline">
                <span className="btn-t">
                  <span data-t="WhatsApp">WhatsApp</span>
                </span>
              </span>
            </a>
            <Link href="/kontakt/" data-magnetic className="btn btn-primary btn-sm anim-fade-up hidden sm:inline-flex" style={{ ["--d" as string]: 480 }}>
              <span className="btn-t">
                <span data-t="Projekt starten">Projekt starten</span>
              </span>
              <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              className="relative grid h-11 w-11 shrink-0 touch-manipulation place-items-center rounded-full border border-line bg-white/80 shadow-[0_6px_18px_-10px_rgb(11_12_14/0.35)] backdrop-blur transition-colors duration-300 active:scale-95 group-data-[menu]/nav:border-ink group-data-[menu]/nav:bg-ink lg:hidden"
            >
              <span className="relative block h-3 w-[18px]">
                <span
                  className={`absolute left-0 top-0 h-[1.6px] w-full rounded-full transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)] ${
                    open ? "translate-y-[5px] rotate-45 bg-white" : "bg-ink"
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.6px] w-full rounded-full transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)] ${
                    open ? "-translate-y-[5px] -rotate-45 bg-white" : "bg-ink"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile-Menü: fast Fullscreen, öffnet sich als Maske von oben rechts (dort sitzt der Button) */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
        inert={!open}
        className={`mobile-menu fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-canvas/95 backdrop-blur-xl lg:hidden ${open ? "is-open" : ""}`}
      >
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_70%)]" />
        <nav aria-label="Mobile Navigation" className="wrap safe-x relative flex flex-1 flex-col justify-center pb-5 pt-[calc(env(safe-area-inset-top)+76px)] short:pb-2 short:pt-[calc(env(safe-area-inset-top)+68px)]">
          <p className="mm-item font-mono text-[0.7rem] uppercase tracking-[0.22em] text-quiet short:hidden" style={{ ["--i" as string]: 0 }}>
            PJE Systems · Menü
          </p>
          <ul className="mt-4 flex flex-col short:mt-0 short:landscape:grid short:landscape:grid-cols-2 short:landscape:gap-x-10">
            {mobileNav.map((item, i) => {
              const active = !item.href.includes("#") && isActive(pathname, item.href);
              return (
                <li key={item.href} className="mm-item border-b border-line/70" style={{ ["--i" as string]: i + 1, ["--r" as string]: all.length - i }}>
                  <Link
                    href={item.href}
                    onClick={onNav(item.href)}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-[48px] items-center justify-between gap-4 py-[min(1.1svh,10px)] text-[clamp(1.5rem,min(8vw,4.8svh),2.9rem)] font-semibold leading-[1.05] tracking-[-0.045em] ${active ? "text-accent" : "text-ink"}`}
                  >
                    {item.label}
                    <ArrowUpRight size={20} className="shrink-0 text-quiet" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="mm-item mt-4 flex flex-wrap gap-x-6 gap-y-1 short:mt-1" style={{ ["--i" as string]: mobileNav.length + 1 }}>
            {mobileNavSmall.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center text-[1rem] text-slate underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mm-item wrap safe-x relative grid gap-3 pb-[max(24px,env(safe-area-inset-bottom))] short:gap-1 short:pb-[max(12px,env(safe-area-inset-bottom))]" style={{ ["--i" as string]: mobileNav.length + 2 }}>
          <div className="grid grid-cols-2 gap-3 short:landscape:hidden">
            <a target="_blank" rel="noopener" href={waLink("Hallo PJE, ich habe eine Anfrage:")} aria-label={`WhatsApp ${contact.whatsappDisplay}`} className="btn w-full !px-3 [--btn-bg:var(--color-navy)] [--btn-fill:var(--color-navy-deep)]">
              <WhatsappLogo size={20} weight="fill" aria-hidden />
              <span>WhatsApp</span>
            </a>
            <Link href="/kontakt/" className="btn btn-primary w-full !px-3">
              <span>Projekt starten</span>
            </Link>
          </div>
          <a href={contact.phoneHref} className="inline-flex min-h-11 items-center justify-center gap-2 text-[0.95rem] text-slate">
            <Phone size={16} aria-hidden /> {contact.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  );
}
