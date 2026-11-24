"use client";

import { useT } from "@/lib/i18n";
import { links, nav } from "@/lib/site";
import { CutLine } from "./paper";

export default function Footer({ home = "" }: { home?: string }) {
  const t = useT();
  return (
    <footer className="paper pb-10 pt-6">
      <CutLine />
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-10 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:pl-24">
        <div>
          <p className="font-display text-5xl leading-none text-ink sm:text-7xl">RENALDY</p>
          <p className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
            {t({ en: "Software engineer · fullstack & data · Surabaya", id: "Software engineer · fullstack & data · Surabaya" })}
          </p>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <nav aria-label="Footer" className="flex flex-wrap gap-1">
            {[...nav, { id: "contact", label: { en: "Contact", id: "Kontak" } }].map((n) => (
              <a key={n.id} href={`${home}#${n.id}`} className="px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] hover:bg-butter">{t(n.label)}</a>
            ))}
          </nav>
          <div className="flex flex-wrap gap-4 font-mono text-xs font-bold uppercase tracking-[0.12em]">
            <a href={links.github} target="_blank" rel="noopener" className="hover:text-tomato">GitHub ↗</a>
            <a href={links.linkedin} target="_blank" rel="noopener" className="hover:text-tomato">LinkedIn ↗</a>
            <a href={links.instagram} target="_blank" rel="noopener" className="hover:text-tomato">Instagram ↗</a>
            <a href={`mailto:${links.email}`} className="hover:text-tomato">Email ↗</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-sm text-ink-faint sm:flex-row sm:px-6 lg:pl-24">
        <span>© {new Date().getFullYear()} Renaldy Bilal Setyawan</span>
        <a href="#top" className="rounded-full border-2 border-ink/20 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink hover:bg-butter">
          {t({ en: "Back to top ↑", id: "Kembali ke atas ↑" })}
        </a>
      </div>
    </footer>
  );
}
