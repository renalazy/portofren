"use client";

import { type FormEvent } from "react";
import { useT } from "@/lib/i18n";
import { contact } from "@/lib/content";
import { links } from "@/lib/site";
import { CutLine, Rise, SectionHead, Toss } from "./paper";
import { ArrowUpRight, GitHubIcon, InstagramIcon, LinkedInIcon, MailIcon } from "./icons";

const mail = (subject: string, body = "") =>
  `mailto:${links.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

function Stamp() {
  return (
    <div aria-hidden className="relative h-24 w-20 rotate-3 border-[3px] border-dotted border-ink/30 bg-white p-1.5 shadow-[1px_2px_5px_rgb(29_26_22/0.25)]">
      <div className="relative grid h-full w-full place-items-center bg-tomato">
        <span className="absolute inset-1 border border-white/60" />
        <span className="font-display text-2xl text-white">R.</span>
        <span className="absolute bottom-1 font-mono text-[8px] font-bold tracking-widest text-white/90">SBY 2026</span>
      </div>
    </div>
  );
}

function Postmark({ text }: { text: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden className="absolute -left-14 top-0 h-28 w-28 -rotate-12 text-ink/45">
      <circle cx="60" cy="60" r="44" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="32" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <defs><path id="pm" d="M60 22a38 38 0 1 1 0 76a38 38 0 1 1 0-76" /></defs>
      <text fontSize="9.5" fontFamily="var(--f-mono)" fontWeight="700" letterSpacing="2" fill="currentColor">
        <textPath href="#pm">{text.toUpperCase()} · SBY ·</textPath>
      </text>
      <text x="60" y="65" textAnchor="middle" fontSize="13" fontFamily="var(--f-mono)" fontWeight="700" fill="currentColor">2026</text>
      {[0, 1, 2, 3].map((k) => <path key={k} d={`M108 ${44 + k * 10}c10-4 20 4 30 0`} fill="none" stroke="currentColor" strokeWidth="2.5" />)}
    </svg>
  );
}

export default function Contact() {
  const t = useT();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const msg = String(f.get("message") ?? "").trim();
    window.location.href = mail(`Hello from ${name}`, `${msg}\n\nFrom: ${name} (${email})`);
  };
  const line = "w-full border-0 border-b-2 border-ink/25 bg-transparent px-1 py-2 text-lg text-ink placeholder:text-ink-faint focus:border-cobalt focus:outline-none";

  return (
    <section id="contact" className="overflow-x-clip paper scroll-mt-20 pb-24 pt-6 sm:pb-32">
      <CutLine />
      <div className="mx-auto mt-14 max-w-6xl px-4 sm:px-6 lg:mt-20">
        <SectionHead label={t(contact.label)} title={t(contact.title)} align="center">
          <Rise><p className="mx-auto mt-5 max-w-2xl font-hand text-2xl leading-snug text-ink-soft sm:text-3xl">{t(contact.intro)}</p></Rise>
        </SectionHead>

        <Toss rotate={-1} from={-30} className="mt-14">
          <div className="relative grid bg-white shadow-[0_16px_40px_rgb(29_26_22/0.18)] md:grid-cols-2">
            <span className="tape -top-3 left-10 -rotate-6" />
            <span className="tape -top-3 right-10 w-24 rotate-6" />
            {/* message side */}
            <div className="flex flex-col gap-6 p-7 sm:p-10 md:border-r-2 md:border-dashed md:border-ink/20">
              <p className="font-display text-2xl leading-tight text-tomato sm:text-3xl">{t(contact.postcard)}</p>
              <p className="font-hand text-2xl leading-snug text-ink">
                {t({ en: "Hi! Thanks for reading this far. Whether it's a role or a project, I'd love to hear about it.", id: "Halo! Terima kasih sudah membaca sampai sini. Baik soal pekerjaan maupun proyek, saya senang mendengarnya." })}
                <span className="mt-2 block">{t({ en: "Cheers, Renaldy", id: "Salam, Renaldy" })}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={mail("Job opportunity")} className="btn-chunky bg-ink px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-cobalt">
                  <MailIcon /> {t(contact.hire)}
                </a>
                <a href={mail("Project request: website / app")} className="btn-chunky bg-sun px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink">
                  {t(contact.build)} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="mt-auto flex items-center gap-2">
                {[
                  { href: links.github, label: "GitHub", Icon: GitHubIcon, bg: "var(--color-sun)" },
                  { href: links.linkedin, label: "LinkedIn", Icon: LinkedInIcon, bg: "var(--color-sky)" },
                  { href: links.instagram, label: "Instagram", Icon: InstagramIcon, bg: "var(--color-blush)" },
                ].map(({ href, label, Icon, bg }) => (
                  <a key={label} href={href} target="_blank" rel="noopener" aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink shadow-[2px_2px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5" style={{ background: bg }}>
                    <Icon />
                  </a>
                ))}
                <a href={`mailto:${links.email}`} className="ml-2 break-all font-mono text-sm font-bold text-ink underline decoration-tomato decoration-2 underline-offset-4">
                  {links.email}
                </a>
              </div>
            </div>

            {/* address side */}
            <div className="relative p-7 sm:p-10">
              <div className="relative mb-6 flex justify-end">
                <Postmark text={t({ en: "Surabaya", id: "Surabaya" })} />
                <Stamp />
              </div>
              <p className="font-hand text-2xl text-ink-soft">{t(contact.to)}</p>
              <form onSubmit={onSubmit} className="mt-4 grid gap-4">
                <label className="sr-only" htmlFor="c-name">{t(contact.form.name)}</label>
                <input id="c-name" name="name" required autoComplete="name" placeholder={t(contact.form.name)} className={line} />
                <label className="sr-only" htmlFor="c-email">{t(contact.form.email)}</label>
                <input id="c-email" name="email" type="email" required autoComplete="email" placeholder={t(contact.form.email)} className={line} />
                <label className="sr-only" htmlFor="c-msg">{t(contact.form.msg)}</label>
                <textarea id="c-msg" name="message" required rows={3} placeholder={t(contact.form.msg)} className={`${line} resize-none leading-[2.4rem] [background:repeating-linear-gradient(transparent_0,transparent_calc(2.4rem-2px),rgb(29_26_22/0.18)_calc(2.4rem-2px),rgb(29_26_22/0.18)_2.4rem)] border-b-0`} />
                <button type="submit" className="btn-chunky mt-2 w-fit bg-tomato px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-white">
                  {t(contact.form.send)} <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
                <p className="text-sm text-ink-faint">{t(contact.form.note)}</p>
              </form>
            </div>
          </div>
        </Toss>
      </div>
    </section>
  );
}
