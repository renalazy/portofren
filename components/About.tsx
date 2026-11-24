"use client";

import { useT } from "@/lib/i18n";
import { about } from "@/lib/content";
import { asset } from "@/lib/site";
import { CutLine, Polaroid, Pushpin, Rise, SectionHead, StickyNote, Toss } from "./paper";

const Tick = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="mt-1 h-5 w-5 shrink-0 text-teal" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 13c2.5 1.6 4.2 3.5 5.5 6C11 12 15 7 21 3" />
  </svg>
);

export default function About() {
  const t = useT();
  return (
    <section id="about" className="overflow-x-clip paper paper-margin scroll-mt-20 pb-24 pt-6 sm:pb-32">
      <CutLine />
      <div className="mx-auto mt-14 grid max-w-7xl gap-14 px-4 sm:px-6 lg:mt-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:pl-24">
        {/* photo + facts */}
        <div className="relative mx-auto w-full max-w-sm lg:mx-0">
          <Toss rotate={-4} className="relative mx-auto w-64 sm:w-72">
            <Polaroid src={asset("/assets/img/displaypic.png")} alt="Portrait of Renaldy Bilal Setyawan" caption="Renaldy Bilal S." imgClass="aspect-square">
              <span className="tape -top-3 left-6 -rotate-12" />
              <span className="tape -top-3 right-6 w-20 rotate-12" />
            </Polaroid>
          </Toss>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {about.facts.map((f, i) => (
              <Toss key={i} rotate={[-3, 2.5, 2, -2.5][i]} delay={0.1 + i * 0.08}>
                <StickyNote color={f.color} className="pb-2 pt-3.5">
                  <Pushpin className="-top-3 left-1/2 h-6 w-6 -translate-x-1/2" color={["var(--color-tomato)", "var(--color-cobalt)", "var(--color-teal)", "var(--color-sun)"][i]} />
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink-faint">{t(f.k)}</span>
                  <span className="block text-2xl">{t(f.v)}</span>
                </StickyNote>
              </Toss>
            ))}
          </div>
        </div>

        {/* story */}
        <div>
          <SectionHead label={t(about.label)} title={t({ en: "About", id: "Tentang" })} />
          <Rise className="relative mt-10">
            <div className="relative bg-white px-6 pb-8 pt-9 shadow-[0_10px_26px_rgb(29_26_22/0.12)] sm:px-10">
              <span className="tape -top-3 left-1/2 w-28 -translate-x-1/2 rotate-2" />
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t(about.title)}</h3>
              {about.body.map((p, i) => (
                <p key={i} className="mt-4 text-lg leading-relaxed text-ink-soft">{t(p)}</p>
              ))}
              <p className="mt-8 font-hand text-2xl text-tomato">{t(about.impactLabel)}</p>
              <ul className="mt-3 grid gap-3">
                {about.impact.map((it, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed text-ink">
                    <Tick /> <span>{t(it)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Rise>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10">
            {about.stats.map((s, i) => (
              <Rise key={i} delay={i * 0.07}>
                <div className="whitespace-nowrap font-display text-[clamp(2rem,9vw,3rem)] leading-none text-ink">{s.n}</div>
                <svg viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden className="mt-1 h-2 w-20">
                  <path d="M2 5c18-3 36-3 54-1s28 2 42-1" fill="none" stroke={["var(--color-tomato)", "var(--color-cobalt)", "var(--color-teal)", "var(--color-sun)"][i]} strokeWidth="3.5" strokeLinecap="round" />
                </svg>
                <div className="mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft">{t(s.l)}</div>
              </Rise>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
