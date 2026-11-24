"use client";

import { useT } from "@/lib/i18n";
import { kindLabel, work, type Project } from "@/lib/content";
import { CutLine, Rise, SectionHead } from "./paper";
import { ArrowUpRight } from "./icons";

function Rings() {
  return (
    <div aria-hidden className="pointer-events-none absolute -top-4 left-8 right-8 flex justify-between sm:left-14 sm:right-14">
      {Array.from({ length: 9 }).map((_, i) => (
        <svg key={i} viewBox="0 0 14 30" className={`h-8 w-3.5 ${i > 4 ? "hidden sm:block" : ""}`}>
          <rect x="2" y="1" width="10" height="28" rx="5" fill="none" stroke="#8d939c" strokeWidth="2.6" />
          <rect x="4" y="3" width="6" height="8" rx="3" fill="#f2f2f0" />
        </svg>
      ))}
    </div>
  );
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <div role="img" aria-label={`System flow: ${steps.join(", ")}`}
      className="paper flex h-full min-h-64 flex-col items-center justify-center gap-2 p-6">
      {steps.map((s, i) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <span className={`border-2 border-ink px-4 py-2.5 text-center font-mono text-sm font-bold text-ink shadow-[3px_3px_0_var(--color-ink)] ${i === 1 ? "bg-sun" : "bg-white"}`}>
            {s}
          </span>
          {i < steps.length - 1 && (
            <svg viewBox="0 0 20 30" aria-hidden className="h-7 w-5 text-ink" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M10 2c-2 8 2 16 0 24M4 19l6 8 6-8" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

function Card({ p, i }: { p: Project; i: number }) {
  const t = useT();
  const light = p.ink === "light";
  const fg = light ? "text-white" : "text-ink";
  const soft = light ? "text-white/85" : "text-ink/80";
  return (
    <article className="relative lg:sticky" style={{ top: `calc(5.5rem + ${i * 14}px)` }}>
      <Rings />
      <div className={`relative grid gap-8 px-6 pb-8 pt-10 shadow-[0_14px_34px_rgb(29_26_22/0.22)] sm:px-10 sm:pb-10 sm:pt-12 lg:min-h-[70vh] lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:px-14 ${fg}`}
        style={{ background: p.color }}>
        {/* dog-ear */}
        <span aria-hidden className="absolute bottom-0 right-0 h-10 w-10 bg-[linear-gradient(135deg,transparent_50%,rgb(0_0_0/0.18)_50%)]" />

        <div className="flex flex-col">
          <span className="inline-flex w-fit -rotate-2 items-center gap-2 bg-white px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-[2px_2px_0_rgb(29_26_22/0.35)]">
            <span className="text-tomato">{String(i + 1).padStart(2, "0")}</span> · {t(kindLabel[p.kind])}
          </span>
          <p className={`mt-6 font-mono text-xs font-bold uppercase tracking-[0.16em] ${soft}`}>{t(p.meta)}</p>
          <h3 className="mt-2 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl">{p.title}</h3>
          <p className={`mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${soft}`}>{t(p.summary)}</p>
          <p className="mt-6 flex items-center gap-2 font-hand text-2xl sm:text-3xl">
            <span aria-hidden>✦</span>{t(p.result)}
          </p>
          <p className={`mt-2 font-mono text-xs font-bold tracking-wide ${soft}`}>{p.stack}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <span key={tag} className="rounded-full border-2 border-white bg-white/90 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            {p.href ? (
              <a href={p.href} className="btn-chunky bg-white px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink">
                {t(work.view)} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : (
              <span className={`font-hand text-xl ${soft}`}>{t(work.internal)}</span>
            )}
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener"
                className={`inline-flex items-center gap-2 border-b-2 pb-0.5 font-mono text-xs font-bold uppercase tracking-[0.12em] ${light ? "border-white" : "border-ink"}`}>
                {t(work.visit)} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        <div className="relative self-center">
          <span className="tape -top-3 left-6 z-10 -rotate-6" />
          <span className="tape -top-3 right-6 z-10 w-20 rotate-6" />
          <div className="overflow-hidden border-[5px] border-white bg-white shadow-[0_8px_20px_rgb(29_26_22/0.25)] lg:h-[calc(70vh-8rem)]">
            {p.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" className="aspect-[16/10] h-full w-full object-cover object-left-top lg:aspect-auto" />
            ) : (
              <Flow steps={p.flow ?? []} />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const t = useT();
  const items = work.items.filter((p) => p.featured);
  return (
    <section id="work" className="overflow-x-clip paper scroll-mt-20 pb-28 pt-6">
      <CutLine />
      <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:mt-20 lg:pl-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <SectionHead label={t(work.label)} title={t(work.title)} />
          <Rise>
            <p className="max-w-md -rotate-1 bg-butter px-5 py-3 text-lg leading-snug text-ink shadow-[2px_4px_10px_rgb(29_26_22/0.15)]">
              {t(work.intro)}
            </p>
          </Rise>
        </div>
        <div className="mt-16 flex flex-col gap-16 lg:gap-[14vh]">
          {items.map((p, i) => <Card key={p.slug} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}
