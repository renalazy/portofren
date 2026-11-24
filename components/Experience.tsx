"use client";

import { useT } from "@/lib/i18n";
import { experience } from "@/lib/content";
import { CutLine, Pushpin, Rise, SectionHead, Toss } from "./paper";

export default function Experience() {
  const t = useT();
  return (
    <section id="experience" className="overflow-x-clip paper scroll-mt-20 pb-24 pt-6 sm:pb-28">
      <CutLine />
      <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:mt-20 lg:pl-24">
        <SectionHead label={t(experience.label)} title={t(experience.title)} />

        <ol className="relative mt-14 grid gap-12 lg:ml-40">
          {/* marker timeline */}
          <svg aria-hidden preserveAspectRatio="none" viewBox="0 0 10 100" className="absolute -left-1 top-2 hidden h-full w-3 lg:block">
            <path d="M5 0c-2 15 2 30 0 50s2 35 0 50" fill="none" stroke="var(--color-tomato)" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
          {experience.jobs.map((j, i) => (
            <li key={j.org} className="relative lg:pl-12">
              <span aria-hidden className="absolute -left-[3px] top-7 hidden h-4 w-4 rounded-full border-[3px] border-ink bg-paper lg:block" />
              <p className="mb-3 font-hand text-2xl text-ink-soft lg:absolute lg:-left-44 lg:top-5 lg:mb-0 lg:w-36 lg:text-right">
                {j.from} → {j.to ?? t(experience.now)}
              </p>
              <Toss rotate={i % 2 ? 0.6 : -0.6} from={-24}>
                <div className="relative bg-white px-6 pb-7 pt-8 shadow-[0_10px_24px_rgb(29_26_22/0.12)] sm:px-9">
                  <Pushpin className="-top-3 left-8" color={["var(--color-tomato)", "var(--color-cobalt)", "var(--color-teal)"][i]} />
                  <span aria-hidden className="absolute inset-y-0 left-0 w-2" style={{ background: j.color }} />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{j.role}</h3>
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">{t(j.meta)}</span>
                  </div>
                  <p className="mt-1 font-hand text-2xl text-tomato">{j.org}</p>
                  <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-soft sm:text-lg">{t(j.summary)}</p>
                  {j.points.length > 0 && (
                    <ul className="mt-4 grid gap-2.5">
                      {j.points.map((pt, k) => (
                        <li key={k} className="flex gap-3 leading-relaxed text-ink">
                          <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rotate-45 bg-ink" />
                          <span>{t(pt)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Toss>
            </li>
          ))}
        </ol>

        <div className="mt-20 lg:ml-40 lg:pl-12">
          <h3 className="font-hand text-3xl text-ink">{t(experience.eduTitle)}</h3>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            {experience.edu.map((e, i) => (
              <Rise key={e.school} delay={i * 0.08}>
                <div className={`relative bg-sky/60 px-6 pb-5 pt-6 shadow-[2px_4px_10px_rgb(29_26_22/0.12)] ${i ? "rotate-1" : "-rotate-1"}`}>
                  <span className="tape -top-3 left-1/2 w-20 -translate-x-1/2" />
                  <p className="text-xl font-semibold">{e.school}</p>
                  <p className="mt-1 text-ink-soft">{t(e.what)}</p>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
