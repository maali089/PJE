"use client";

import { useEffect, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react/ssr";
import { contact, waLink } from "@/lib/content";

/** Schwebender WhatsApp-Button, erscheint nach dem ersten Bildschirm. */
export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const s = document.createElement("div");
    s.style.cssText = "position:absolute;top:0;left:0;width:1px;height:90vh;pointer-events:none";
    document.body.appendChild(s);
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting));
    io.observe(s);
    return () => {
      io.disconnect();
      s.remove();
    };
  }, []);
  return (
    <a
      href={waLink("Hallo PJE, ich habe eine Anfrage:")}
      target="_blank"
      rel="noopener"
      aria-label={`Per WhatsApp schreiben (${contact.whatsappDisplay})`}
      className={`group fixed bottom-[max(20px,env(safe-area-inset-bottom))] right-5 z-40 flex h-14 items-center gap-2 overflow-hidden rounded-full bg-ink pl-4 pr-4 text-white shadow-[0_18px_40px_-16px_rgb(11_12_14/0.6)] transition-[opacity,translate,background-color] duration-500 ease-[var(--ease-out-expo)] hover:bg-accent ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsappLogo size={24} weight="fill" aria-hidden />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.92rem] font-medium transition-[max-width] duration-500 ease-[var(--ease-out-expo)] group-hover:max-w-[160px] group-focus-visible:max-w-[160px]">
        WhatsApp
      </span>
    </a>
  );
}
