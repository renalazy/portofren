"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang, useT } from "@/lib/i18n";
import { links, nav } from "@/lib/site";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "./icons";

const socials = [
  { href: links.github, label: "GitHub", Icon: GitHubIcon, bg: "var(--color-sun)" },
  { href: links.linkedin, label: "LinkedIn", Icon: LinkedInIcon, bg: "var(--color-sky)" },
  { href: links.instagram, label: "Instagram", Icon: InstagramIcon, bg: "var(--color-blush)" },
];

function useActiveSection() {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language" className="flex border-2 border-ink bg-white font-mono text-xs font-bold">
      {(["en", "id"] as const).map((l) => (
        <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l}
          className={`px-2.5 py-1.5 uppercase transition-colors ${lang === l ? "bg-ink text-white" : "text-ink hover:bg-butter"}`}>
          {l}
        </button>
      ))}
    </div>
  );
}

/** `home` prefixes section links, so subpages point back to the homepage. */
export default function Header({ home = "", current }: { home?: string; current?: string }) {
  const t = useT();
  const seen = useActiveSection();
  const active = current ?? seen;
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-dashed border-ink/15 bg-paper/90 backdrop-blur-sm">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <a href={`${home}#top`} aria-label="Renaldy, home"
            className="grid h-10 w-10 -rotate-6 place-items-center rounded-full border-[2.5px] border-ink bg-tomato font-display text-lg text-white shadow-[2px_2px_0_var(--color-ink)] transition-transform hover:rotate-6">
            R.
          </a>
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <a key={n.id} href={`${home}#${n.id}`} aria-current={active === n.id ? "true" : undefined}
                className="group relative px-3 py-2 font-mono text-[13px] font-bold uppercase tracking-[0.12em] text-ink">
                {t(n.label)}
                <svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden
                  className={`absolute inset-x-2 bottom-0.5 h-2 transition-opacity ${active === n.id ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}>
                  <path d="M2 6c20-4 40-4 60-1s28 2 36-2" fill="none" stroke="var(--color-tomato)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <LangToggle />
          <div className="hidden items-center gap-1.5 sm:flex">
            {socials.map(({ href, label, Icon, bg }) => (
              <a key={label} href={href} target="_blank" rel="noopener" aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink text-ink shadow-[2px_2px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5"
                style={{ background: bg }}>
                <Icon />
              </a>
            ))}
          </div>
          <a href={`${home}#contact`} className="btn-chunky hidden bg-sun px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink lg:inline-flex">
            {t({ en: "Contact", id: "Kontak" })}
          </a>
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu"
            className="grid h-10 w-10 place-items-center border-2 border-ink bg-white md:hidden">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav aria-label="Mobile"
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="paper absolute inset-x-0 top-full flex flex-col gap-1 border-b-2 border-ink p-3 md:hidden">
              {nav.map((n) => (
                <a key={n.id} href={`${home}#${n.id}`} onClick={() => setOpen(false)}
                  className={`px-3 py-3 font-mono text-sm font-bold uppercase tracking-[0.12em] ${active === n.id ? "bg-butter" : ""}`}>
                  {t(n.label)}
                </a>
              ))}
              <div className="mt-2 flex items-center gap-2 px-3 pb-1">
                {socials.map(({ href, label, Icon, bg }) => (
                  <a key={label} href={href} target="_blank" rel="noopener" aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink" style={{ background: bg }}>
                    <Icon />
                  </a>
                ))}
                <a href={`${home}#contact`} onClick={() => setOpen(false)}
                  className="btn-chunky ml-auto bg-sun px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em]">
                  {t({ en: "Contact", id: "Kontak" })}
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
