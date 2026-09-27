"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, CheckCircle, Code, Desktop, DotsThree, Globe, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { contact, mailLink, waLink } from "@/lib/content";

const topics = [
  { id: "website", label: "Website", Icon: Globe },
  { id: "software", label: "Software", Icon: Code },
  { id: "it", label: "IT-Service", Icon: Desktop },
  { id: "sonstiges", label: "Sonstiges", Icon: DotsThree },
] as const;
type TopicId = (typeof topics)[number]["id"];

type Fields = { name: string; company: string; email: string; phone: string; place: string; message: string };
const empty: Fields = { name: "", company: "", email: "", phone: "", place: "", message: "" };

export function ContactForm() {
  const uid = useId();
  const [topic, setTopic] = useState<TopicId>("website");
  const [pkg, setPkg] = useState<string | null>(null);
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState<null | "mail" | "whatsapp">(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Vorauswahl über ?thema=…&paket=… (z. B. aus den Paketen)
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const t = sp.get("thema");
    if (t && topics.some((x) => x.id === t)) setTopic(t as TopicId);
    const p = sp.get("paket");
    if (p && ["Starter", "Business", "Premium"].includes(p)) setPkg(p);
  }, []);

  const topicLabel = topics.find((t) => t.id === topic)!.label;

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setF((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = (needEmail: boolean) => {
    const er: Partial<Record<keyof Fields, string>> = {};
    if (!f.name.trim()) er.name = "Bitte geben Sie Ihren Namen an.";
    if (needEmail && !/^\S+@\S+\.\S+$/.test(f.email.trim())) er.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
    if (!f.message.trim()) er.message = "Bitte beschreiben Sie kurz Ihr Anliegen.";
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    return !first;
  };

  const compose = () => {
    const details = [
      `Name: ${f.name.trim()}`,
      f.company.trim() ? `Unternehmen: ${f.company.trim()}` : null,
      f.email.trim() ? `E-Mail: ${f.email.trim()}` : null,
      f.phone.trim() ? `Telefon: ${f.phone.trim()}` : null,
      f.place.trim() ? `Ort: ${f.place.trim()}` : null,
    ].filter(Boolean);
    const intro = `ich habe eine Anfrage zum Thema ${topicLabel}${pkg && topic === "website" ? ` (Paket ${pkg})` : ""}.`;
    return ["Hallo PJE,", "", intro, "", f.message.trim(), "", ...details].join("\n");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(true)) return;
    window.location.href = mailLink(`Anfrage ${topicLabel}${f.company ? `, ${f.company}` : ""}`, compose());
    setSent("mail");
  };

  const onWhatsApp = () => {
    if (!validate(false)) return;
    window.open(waLink(compose()), "_blank", "noopener");
    setSent("whatsapp");
  };

  const field = (k: keyof Fields, label: string, opts: { type?: string; optional?: boolean; autoComplete?: string; textarea?: boolean } = {}) => {
    const id = `${uid}-${k}`;
    const err = errors[k];
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-[0.9rem] font-medium text-graphite">
          {label}
          {opts.optional && <span className="font-normal text-quiet"> (optional)</span>}
        </label>
        {opts.textarea ? (
          <textarea
            id={id}
            name={k}
            rows={5}
            value={f[k]}
            onChange={set(k)}
            aria-invalid={!!err || undefined}
            aria-describedby={err ? `${id}-err` : undefined}
            className="field min-h-[140px] resize-y"
            placeholder="Worum geht es, bis wann, was gibt es schon?"
          />
        ) : (
          <input
            id={id}
            name={k}
            type={opts.type ?? "text"}
            value={f[k]}
            onChange={set(k)}
            autoComplete={opts.autoComplete}
            aria-invalid={!!err || undefined}
            aria-describedby={err ? `${id}-err` : undefined}
            className="field"
          />
        )}
        {err && (
          <p id={`${id}-err`} className="text-[0.85rem] text-[#b3261e]">
            {err}
          </p>
        )}
      </div>
    );
  };

  if (sent) {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center rounded-[var(--radius-panel)] border border-line bg-white p-8 md:p-10" role="status">
        <CheckCircle size={40} weight="fill" className="text-accent" aria-hidden />
        <p className="mt-6 text-2xl font-semibold tracking-[-0.03em]">
          {sent === "mail" ? "Ihr E-Mail-Programm wurde geöffnet." : "WhatsApp wurde geöffnet."}
        </p>
        <p className="t-body mt-3 max-w-[46ch]">
          Die Nachricht ist vorbereitet. Sie wird erst verschickt, wenn Sie sie dort absenden. Antwort in der Regel {contact.responseTime}.
        </p>
        <p className="t-body mt-3 max-w-[46ch]">
          Hat sich nichts geöffnet? Schreiben Sie direkt an{" "}
          <a className="link-u-static text-ink" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>{" "}
          oder rufen Sie an:{" "}
          <a className="link-u-static text-ink" href={contact.phoneHref}>
            {contact.phoneDisplay}
          </a>
          .
        </p>
        <button type="button" onClick={() => setSent(null)} className="btn btn-outline btn-sm mt-8">
          <span className="btn-t"><span data-t="Zurück zum Formular">Zurück zum Formular</span></span>
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="rounded-[var(--radius-panel)] border border-line bg-white p-6 shadow-[0_40px_80px_-60px_rgb(11_12_14/0.4)] md:p-9"
    >
      <fieldset>
        <legend className="text-[0.9rem] font-medium text-graphite">Worum geht es?</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {topics.map(({ id, label, Icon }) => {
            const active = topic === id;
            return (
              <label
                key={id}
                className={`group relative flex min-h-[76px] cursor-pointer flex-col justify-between rounded-[14px] border p-3.5 transition-[border-color,background-color,box-shadow] duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-2 ${
                  active ? "border-accent bg-accent-soft" : "border-line hover:border-[#c9ccd3]"
                }`}
              >
                <input
                  type="radio"
                  name="topic"
                  value={id}
                  checked={active}
                  onChange={() => setTopic(id)}
                  className="sr-only"
                />
                <Icon size={20} className={`transition-transform duration-500 group-hover:-translate-y-0.5 ${active ? "text-accent" : "text-slate"}`} aria-hidden />
                <span className={`mt-3 text-[0.92rem] font-medium ${active ? "text-accent" : "text-ink"}`}>{label}</span>
              </label>
            );
          })}
        </div>
        {pkg && topic === "website" && (
          <p className="mt-3 text-[0.88rem] text-slate">
            Ausgewähltes Paket: <span className="font-medium text-ink">{pkg}</span>{" "}
            <button type="button" className="link-u-static ml-1 text-quiet" onClick={() => setPkg(null)}>
              entfernen
            </button>
          </p>
        )}
      </fieldset>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {field("name", "Name", { autoComplete: "name" })}
        {field("company", "Unternehmen", { optional: true, autoComplete: "organization" })}
        {field("email", "E-Mail", { type: "email", autoComplete: "email" })}
        {field("phone", "Telefon", { type: "tel", optional: true, autoComplete: "tel" })}
        {topic === "it" && <div className="sm:col-span-2">{field("place", "Ort", { optional: true, autoComplete: "address-level2" })}</div>}
        <div className="sm:col-span-2">{field("message", "Nachricht", { textarea: true })}</div>
      </div>

      <p className="mt-5 text-[0.82rem] leading-relaxed text-slate">
        Die Website speichert nichts. Die Nachricht wird erst verschickt, wenn Sie sie in Ihrem Mailprogramm oder in WhatsApp absenden. Mehr dazu in der{" "}
        <a href="/datenschutz/" className="link-u-static">
          Datenschutzerklärung
        </a>
        .
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="btn btn-primary sm:flex-1" data-magnetic>
          <span className="btn-t"><span data-t="Projekt anfragen">Projekt anfragen</span></span>
          <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden />
        </button>
        <button type="button" onClick={onWhatsApp} className="btn btn-outline">
          <WhatsappLogo size={18} aria-hidden />
          <span className="btn-t"><span data-t="Per WhatsApp senden">Per WhatsApp senden</span></span>
        </button>
      </div>
    </form>
  );
}
