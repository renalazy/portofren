"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useT } from "@/lib/i18n";
import { asset } from "@/lib/site";
import Header from "../Header";
import Footer from "../Footer";
import { Arrow, CutLine, Pushpin, Rise, StickyNote, Toss } from "../paper";
import { ArrowUpRight } from "../icons";

const HOME = asset("/");
const PINS = ["var(--color-tomato)", "var(--color-cobalt)", "var(--color-teal)", "var(--color-sun)", "var(--color-grape)"];
const NOTES = ["var(--color-butter)", "var(--color-sky)", "var(--color-sage)", "var(--color-blush)"];
const TILT = [-1.5, 1.2, -0.8, 1.6, -1.2, 0.9];

/* ---------------- page shell ---------------- */
export function CasePage({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[90] focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <div className="grain" aria-hidden />
      <Header home={HOME} current="work" />
      <main id="main">
        <div id="top" />
        {children}
      </main>
      <Footer home={HOME} />
    </>
  );
}

/* ---------------- hero ---------------- */
export type Fact = { k: ReactNode; v: ReactNode };
export type Action = { href: string; label: ReactNode; primary?: boolean; external?: boolean; download?: boolean };

export function CaseHero({
  kind, name, subtitle, lead, facts, actions, tags, color, image,
}: {
  kind: ReactNode; name: string; subtitle: ReactNode; lead: ReactNode;
  facts?: Fact[]; actions?: Action[]; tags?: string[]; color: string;
  image?: { src: string; alt: string; phone?: boolean };
}) {
  const t = useT();
  return (
    <section className="overflow-x-clip paper paper-margin pb-16 pt-8 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:pl-24">
        <a href={`${HOME}#work`} className="group inline-flex items-center gap-2 font-hand text-2xl text-ink-soft hover:text-ink">
          <span aria-hidden className="transition-transform group-hover:-translate-x-1">←</span>
          {t({ en: "all work", id: "semua karya" })}
        </a>

        <div className={`mt-8 grid gap-12 ${image ? (image.phone ? "lg:grid-cols-[1fr_17rem] lg:items-center xl:grid-cols-[1fr_19rem]" : "lg:grid-cols-[1.05fr_0.95fr] lg:items-center") : ""}`}>
          <div>
            <Toss rotate={-2} from={-20}>
              <span className="inline-flex items-center gap-2 bg-white px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-[2px_2px_0_rgb(29_26_22/0.35)]">
                <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                {kind} · {t({ en: "Case study", id: "Studi kasus" })}
              </span>
            </Toss>
            <h1 className="mt-6 font-display text-[3.2rem] leading-[0.9] tracking-tight text-ink sm:text-7xl lg:text-8xl">
              {name}
            </h1>
            <p className="mt-4 max-w-2xl font-hand text-3xl leading-tight text-ink-soft sm:text-4xl">{subtitle}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">{lead}</p>

            {actions && actions.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {actions.map((a, i) => <ActionLink key={i} a={a} />)}
              </div>
            )}
            {tags && tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full border-2 border-ink bg-white px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink">{tag}</span>
                ))}
              </div>
            )}
          </div>

          {image && (
            <Toss rotate={2.5} delay={0.15} className={`relative ${image.phone ? "mx-auto w-full max-w-[17rem] sm:max-w-[19rem]" : ""}`}>
              <span className="tape -top-3 left-8 z-10 -rotate-6" />
              <span className="tape -top-3 right-8 z-10 w-20 rotate-6" />
              <div className="border-[6px] border-white bg-white shadow-[0_14px_34px_rgb(29_26_22/0.22)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.src} alt={image.alt} className="w-full" />
              </div>
            </Toss>
          )}
        </div>

        {facts && facts.length > 0 && (
          <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {facts.map((f, i) => (
              <li key={i}>
                <Toss rotate={TILT[i % TILT.length] * 1.4} delay={0.1 + i * 0.06} from={-24}>
                  <StickyNote color={NOTES[i % NOTES.length]} className="h-full pb-3 pt-5">
                    <Pushpin className="-top-3 left-1/2 h-6 w-6 -translate-x-1/2" color={PINS[i % PINS.length]} />
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink-faint">{f.k}</span>
                    <span className="mt-0.5 block text-2xl">{f.v}</span>
                  </StickyNote>
                </Toss>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export function ActionLink({ a }: { a: Action }) {
  const ext = a.external ?? /^https?:/.test(a.href);
  const cls = a.primary
    ? "btn-chunky bg-ink px-5 py-3 text-white hover:bg-cobalt"
    : "btn-chunky bg-white px-4 py-2.5 text-ink hover:bg-butter";
  return (
    <a href={a.href} {...(ext ? { target: "_blank", rel: "noopener" } : {})} {...(a.download ? { download: "" } : {})}
      className={`${cls} font-mono text-xs font-bold uppercase tracking-[0.12em]`}>
      {a.label} {ext && <ArrowUpRight className="h-3.5 w-3.5" />}
    </a>
  );
}

/* ---------------- section ---------------- */
export function Block({
  label, title, intro, children, tint = false, id,
}: { label: ReactNode; title: ReactNode; intro?: ReactNode; children?: ReactNode; tint?: boolean; id?: string }) {
  return (
    <section id={id} className={`overflow-x-clip paper pb-20 pt-6 sm:pb-24 ${tint ? "bg-paper-2" : ""}`}>
      <CutLine />
      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:mt-16 lg:pl-24">
        <Rise>
          <p className="inline-flex items-center gap-2 font-hand text-2xl text-tomato sm:text-3xl">
            {label}
            <Arrow className="mt-2 h-5 w-10 rotate-[20deg] text-ink-soft" />
          </p>
          <h2 className="mt-1 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">{title}</h2>
          {intro && <div className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft [&_a]:font-semibold [&_a]:text-ink [&_a]:underline [&_a]:decoration-tomato [&_a]:decoration-2 [&_a]:underline-offset-4 [&_code]:font-mono [&_code]:text-[0.9em]">{intro}</div>}
        </Rise>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

/* ---------------- screenshots ---------------- */
export function Shots({ desktop, phone }: {
  desktop: { src: string; alt: string; caption?: ReactNode };
  phone?: { src: string; alt: string; caption?: ReactNode };
}) {
  return (
    <div className={`grid items-start gap-10 ${phone ? "lg:grid-cols-[1fr_17rem] xl:grid-cols-[1fr_19rem]" : ""}`}>
      <Shot {...desktop} rotate={-0.8} />
      {phone && <Shot {...phone} rotate={2} narrow />}
    </div>
  );
}

export function Shot({ src, alt, caption, rotate = 0, narrow = false }: { src: string; alt: string; caption?: ReactNode; rotate?: number; narrow?: boolean }) {
  return (
    <Toss rotate={rotate} from={-20} className={narrow ? "mx-auto w-full max-w-[19rem]" : ""}>
      <figure className="relative bg-white p-3 pb-2 shadow-[0_12px_30px_rgb(29_26_22/0.2)]">
        <span className="tape -top-3 left-1/2 z-10 w-24 -translate-x-1/2 rotate-2" />
        <div className="overflow-hidden border border-ink/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} loading="lazy" className="w-full" />
        </div>
        {caption && <figcaption className="px-1 pb-1 pt-2 font-hand text-xl leading-snug text-ink-soft">{caption}</figcaption>}
      </figure>
    </Toss>
  );
}

/* ---------------- sticky-note grid ---------------- */
export function NoteGrid({ items, cols = 4 }: { items: { title: ReactNode; body: ReactNode }[]; cols?: 2 | 3 | 4 }) {
  const grid = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <ul className={`grid gap-8 ${grid}`}>
      {items.map((it, i) => (
        <li key={i}>
          <Toss rotate={TILT[i % TILT.length]} delay={i * 0.06} from={-24} className="h-full">
            <div className="relative h-full px-6 pb-6 pt-7 text-ink shadow-[2px_6px_14px_rgb(29_26_22/0.16)]" style={{ background: NOTES[i % NOTES.length] }}>
              <Pushpin className="-top-3 left-1/2 -translate-x-1/2" color={PINS[i % PINS.length]} />
              <h3 className="font-hand text-3xl leading-none">{it.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/85">{it.body}</p>
            </div>
          </Toss>
        </li>
      ))}
    </ul>
  );
}

/* ---------------- notebook page with a ticked list ---------------- */
const Tick = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="mt-1 h-5 w-5 shrink-0 text-teal" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 13c2.5 1.6 4.2 3.5 5.5 6C11 12 15 7 21 3" />
  </svg>
);

export function PageCard({ title, items, rotate = 0 }: { title: ReactNode; items: { b?: ReactNode; text: ReactNode }[]; rotate?: number }) {
  return (
    <Rise className="h-full">
      <div className="relative h-full bg-white px-6 pb-7 pt-9 shadow-[0_10px_26px_rgb(29_26_22/0.12)] sm:px-8" style={{ rotate: `${rotate}deg` }}>
        <span className="tape -top-3 left-1/2 w-24 -translate-x-1/2 -rotate-2" />
        <h3 className="font-hand text-3xl text-tomato">{title}</h3>
        <ul className="mt-4 grid gap-4">
          {items.map((it, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-ink-soft">
              <Tick />
              <span>{it.b && <b className="block font-semibold text-ink">{it.b}</b>}{it.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </Rise>
  );
}

export function TwoUp({ children }: { children: ReactNode }) {
  return <div className="grid gap-10 lg:grid-cols-2">{children}</div>;
}

/* ---------------- stack: label-maker tape + description ---------------- */
export function StackList({ head, rows }: { head: [ReactNode, ReactNode, ReactNode]; rows: { layer: ReactNode; tech: string; what: ReactNode }[] }) {
  return (
    <Rise>
      <div className="relative bg-white shadow-[0_10px_26px_rgb(29_26_22/0.12)]">
        <span className="tape -top-3 left-10 -rotate-3" />
        <div className="hidden grid-cols-[11rem_15rem_1fr] gap-6 border-b-2 border-ink px-8 pb-3 pt-8 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-faint md:grid">
          <span>{head[0]}</span><span>{head[1]}</span><span>{head[2]}</span>
        </div>
        <ul className="divide-y divide-dashed divide-ink/20 px-5 pb-4 pt-6 sm:px-8 md:pt-0">
          {rows.map((r, i) => (
            <li key={i} className="grid gap-2 py-4 md:grid-cols-[11rem_15rem_1fr] md:items-center md:gap-6">
              <span className="font-hand text-2xl leading-none text-ink">{r.layer}</span>
              <span>
                <span className="inline-block bg-ink px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white [text-shadow:0_-1px_0_rgb(0_0_0/0.6)]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 97% 50%, 100% 100%, 0 100%, 3% 50%)", rotate: `${TILT[i % TILT.length] * 0.8}deg` }}>
                  {r.tech}
                </span>
              </span>
              <span className="leading-relaxed text-ink-soft">{r.what}</span>
            </li>
          ))}
        </ul>
      </div>
    </Rise>
  );
}

/* ---------------- big numbers ---------------- */
export function Kpis({ items }: { items: { n: string; l: ReactNode }[] }) {
  const lines = ["var(--color-tomato)", "var(--color-cobalt)", "var(--color-teal)", "var(--color-sun)", "var(--color-grape)"];
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-10 min-[420px]:grid-cols-2 lg:grid-cols-3">
      {items.map((k, i) => (
        <li key={i}>
          <Rise delay={i * 0.06}>
            <div className="whitespace-nowrap font-display text-[clamp(1.9rem,7vw,3rem)] leading-none text-ink">{k.n}</div>
            <svg viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden className="mt-2 h-2 w-24">
              <path d="M2 5c18-3 36-3 54-1s28 2 42-1" fill="none" stroke={lines[i % lines.length]} strokeWidth="3.5" strokeLinecap="round" />
            </svg>
            <div className="mt-2 max-w-[16rem] font-mono text-[11px] font-bold uppercase leading-relaxed tracking-[0.14em] text-ink-soft">{k.l}</div>
          </Rise>
        </li>
      ))}
    </ul>
  );
}

/* ---------------- callout ---------------- */
export function Callout({ title, children, color = "var(--color-butter)" }: { title?: ReactNode; children: ReactNode; color?: string }) {
  return (
    <Rise>
      <div className="relative -rotate-[0.4deg] border-2 border-ink px-6 py-6 shadow-[4px_4px_0_var(--color-ink)] sm:px-8 [&_code]:font-mono [&_code]:text-[0.9em] [&_li]:mt-2 [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5" style={{ background: color }}>
        {title && <h3 className="mb-2 font-hand text-3xl leading-none text-ink">{title}</h3>}
        <div className="leading-relaxed text-ink">{children}</div>
      </div>
    </Rise>
  );
}

/* ---------------- question / scope blocks ---------------- */
export function Briefs({ items, cols = 3 }: { items: { title: ReactNode; body: ReactNode }[]; cols?: 2 | 3 }) {
  return (
    <div className={`grid gap-8 ${cols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
      {items.map((b, i) => (
        <Rise key={i} delay={i * 0.06}>
          <div className="relative h-full bg-white px-6 pb-6 pt-8 shadow-[0_10px_24px_rgb(29_26_22/0.12)] [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
            <Pushpin className="-top-3 left-8" color={PINS[i % PINS.length]} />
            <h3 className="font-hand text-3xl leading-none text-tomato">{b.title}</h3>
            <div className="mt-3 leading-relaxed text-ink-soft">{b.body}</div>
          </div>
        </Rise>
      ))}
    </div>
  );
}

/* ---------------- numbered steps ---------------- */
export function Steps({ items }: { items: { title: ReactNode; body: ReactNode }[] }) {
  const cols = items.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";
  return (
    <ol className={`grid gap-6 sm:grid-cols-2 ${cols}`}>
      {items.map((s, i) => (
        <li key={i}>
          <Rise delay={i * 0.06} className="h-full">
            <div className="relative h-full border-2 border-ink bg-white px-5 pb-5 pt-6 shadow-[3px_3px_0_var(--color-ink)]">
              <span className="absolute -top-5 left-4 grid h-10 w-10 place-items-center rounded-full border-2 border-ink font-display text-lg text-white" style={{ background: PINS[i % PINS.length] }}>
                {i + 1}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.body}</p>
            </div>
          </Rise>
        </li>
      ))}
    </ol>
  );
}

/* ---------------- findings ---------------- */
export function Finding({ n, label, statement, points }: { n: number; label?: ReactNode; statement: ReactNode; points: ReactNode[] }) {
  return (
    <Rise>
      <article className="relative bg-white px-5 pb-6 pt-7 shadow-[0_10px_24px_rgb(29_26_22/0.1)] sm:px-8">
        <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-tomato" />
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-display text-3xl leading-none text-tomato">{String(n).padStart(2, "0")}</span>
          {label && <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink-faint">{label}</span>}
        </div>
        <p className="mt-3 text-xl font-medium leading-snug text-ink sm:text-2xl [&_code]:font-mono [&_code]:text-[0.85em]">{statement}</p>
        <ul className="mt-5 grid gap-3">
          {points.map((p, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-ink-soft [&_b]:font-semibold [&_b]:text-ink [&_code]:font-mono [&_code]:text-[0.88em] [&_code]:text-ink">
              <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rotate-45 bg-ink" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </article>
    </Rise>
  );
}

export function Stack({ children, gap = "gap-10" }: { children: ReactNode; gap?: string }) {
  return <div className={`grid ${gap}`}>{children}</div>;
}

/* ---------------- SQL on a dark index card ---------------- */
export function Code({ children, title = "SQL" }: { children: string; title?: string }) {
  return (
    <Rise>
      <figure className="relative overflow-hidden border-2 border-ink bg-ink text-[#f4efe3] shadow-[4px_4px_0_var(--color-tomato)]">
        <figcaption className="flex items-center gap-2 border-b border-white/15 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">
          <span className="h-2.5 w-2.5 rounded-full bg-tomato" /><span className="h-2.5 w-2.5 rounded-full bg-sun" /><span className="h-2.5 w-2.5 rounded-full bg-teal" />
          <span className="ml-2">{title}</span>
        </figcaption>
        <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed sm:px-5 sm:text-[13px]"><code>{children}</code></pre>
      </figure>
    </Rise>
  );
}

/* ---------------- data table ---------------- */
export function DataTable({ head, rows, num = [], caption }: { head: ReactNode[]; rows: ReactNode[][]; num?: number[]; caption?: ReactNode }) {
  return (
    <Rise>
      <div className="relative bg-white shadow-[0_10px_24px_rgb(29_26_22/0.1)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-ink">
                {head.map((h, i) => (
                  <th key={i} className={`px-5 pb-3 pt-5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-faint ${num.includes(i) ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri} className="border-b border-dashed border-ink/15 last:border-0">
                  {r.map((c, ci) => (
                    <td key={ci} className={`px-5 py-3 align-top text-ink-soft [&_b]:font-semibold [&_b]:text-ink [&_code]:font-mono [&_code]:text-[0.88em] [&_code]:text-ink ${num.includes(ci) ? "whitespace-nowrap text-right font-mono text-sm tabular-nums text-ink" : ""}`}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {caption && <p className="border-t-2 border-dashed border-ink/15 px-5 py-3 font-hand text-xl leading-snug text-ink-soft">{caption}</p>}
      </div>
    </Rise>
  );
}

/* ---------------- chart figure ---------------- */
export function Figure({ src, alt, caption, rotate = 0.6 }: { src: string; alt: string; caption: ReactNode; rotate?: number }) {
  return <Shot src={src} alt={alt} caption={caption} rotate={rotate} />;
}

/* ---------------- recommendations ---------------- */
export function Recos({ items }: { items: { title: ReactNode; body: ReactNode }[] }) {
  return (
    <ol className="grid gap-5">
      {items.map((r, i) => (
        <li key={i}>
          <Rise delay={i * 0.04}>
            <div className="grid gap-3 border-2 border-ink bg-white px-5 py-5 shadow-[3px_3px_0_var(--color-ink)] sm:grid-cols-[7rem_14rem_1fr] sm:items-baseline sm:gap-6 sm:px-7">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-tomato">Step {String(i + 1).padStart(2, "0")}</span>
              <span className="font-hand text-3xl leading-none text-ink">{r.title}</span>
              <span className="leading-relaxed text-ink-soft">{r.body}</span>
            </div>
          </Rise>
        </li>
      ))}
    </ol>
  );
}

/* ---------------- ticked list on a page ---------------- */
export function Checklist({ items }: { items: ReactNode[] }) {
  return (
    <Rise>
      <ul className="relative grid gap-4 bg-white px-6 pb-7 pt-9 shadow-[0_10px_26px_rgb(29_26_22/0.12)] sm:px-10 [&_b]:font-semibold [&_b]:text-ink [&_code]:font-mono [&_code]:text-[0.88em]">
        <span className="tape -top-3 left-1/2 w-28 -translate-x-1/2 rotate-1" />
        {items.map((it, i) => (
          <li key={i} className="flex gap-3 leading-relaxed text-ink-soft"><Tick /><span>{it}</span></li>
        ))}
      </ul>
    </Rise>
  );
}

/* ---------------- slide deck carousel ---------------- */
export function Deck({ dir, total, label, pdf }: { dir: string; total: number; label: string; pdf: string }) {
  const t = useT();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const go = useCallback((d: number) => setI((v) => (v + d + total) % total), [total]);
  const src = (n: number) => asset(`${dir}/slide-${String(n + 1).padStart(2, "0")}.png`);

  useEffect(() => {
    const next = new Image();
    next.src = src((i + 1) % total);
  }, [i, total]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Rise>
      <div role="region" aria-roledescription="carousel" aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}
        className="relative bg-white p-3 shadow-[0_14px_34px_rgb(29_26_22/0.2)] outline-none focus-visible:ring-4 focus-visible:ring-cobalt/40 sm:p-4">
        <span className="tape -top-3 left-10 z-10 -rotate-6" />
        <span className="tape -top-3 right-10 z-10 w-20 rotate-6" />
        <div className="relative aspect-video overflow-hidden border border-ink/10 bg-paper-2">
          <AnimatePresence initial={false} mode="wait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img key={i} src={src(i)} alt={`Slide ${i + 1} of ${total}`}
              className="absolute inset-0 h-full w-full object-contain"
              initial={reduce ? false : { opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.16 }} />
          </AnimatePresence>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <button type="button" onClick={() => go(-1)} aria-label={t({ en: "Previous slide", id: "Slide sebelumnya" })}
            className="btn-chunky bg-white px-3.5 py-2 font-mono text-sm font-bold text-ink hover:bg-butter">←</button>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink-soft" aria-live="polite">
            {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button type="button" onClick={() => go(1)} aria-label={t({ en: "Next slide", id: "Slide berikutnya" })}
            className="btn-chunky bg-white px-3.5 py-2 font-mono text-sm font-bold text-ink hover:bg-butter">→</button>
        </div>
      </div>
      <p className="mt-4 font-hand text-xl text-ink-soft">
        {t({ en: `${total} slides. Use the arrows or your keyboard's ← → keys, or `, id: `${total} slide. Pakai tombol panah atau ← → di keyboard, atau ` })}
        <a href={pdf} target="_blank" rel="noopener" className="text-ink underline decoration-tomato decoration-2 underline-offset-4">
          {t({ en: "open the original PDF", id: "buka PDF aslinya" })}
        </a>.
      </p>
    </Rise>
  );
}

/* ---------------- resource cards ---------------- */
export type Resource = { label: ReactNode; title: ReactNode; desc: ReactNode; href?: string; actions?: Action[] };

export function Resources({ items }: { items: Resource[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((r, i) => {
        const ext = r.href && /^https?:|\.pdf$|\.png$/.test(r.href);
        const body = (
          <>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-faint">{r.label}</span>
            <span className="mt-1 flex items-start gap-1.5 break-words text-lg font-semibold leading-snug text-ink">
              {r.title} {r.href && <ArrowUpRight className="mt-1.5 h-3.5 w-3.5 shrink-0" />}
            </span>
            <span className="mt-2 text-sm leading-relaxed text-ink-soft">{r.desc}</span>
            {r.actions && (
              <span className="mt-4 flex flex-wrap gap-2">
                {r.actions.map((a, k) => <ActionLink key={k} a={a} />)}
              </span>
            )}
          </>
        );
        const cls = "relative flex h-full flex-col border-2 border-ink bg-white px-5 pb-5 pt-6 shadow-[3px_3px_0_var(--color-ink)] transition-transform";
        return (
          <li key={i}>
            <Rise delay={(i % 3) * 0.05} className="h-full">
              {r.href ? (
                <a href={r.href} {...(ext ? { target: "_blank", rel: "noopener" } : {})} className={`${cls} hover:-translate-y-1 hover:bg-butter/40`}>{body}</a>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </Rise>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------------- closing strip ---------------- */
export function Closing({ actions, note }: { actions: Action[]; note?: ReactNode }) {
  const t = useT();
  return (
    <section className="overflow-x-clip paper pb-24 pt-6">
      <CutLine />
      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:pl-24">
        <Toss rotate={-1} from={-24}>
          <div className="relative bg-butter px-6 pb-8 pt-9 shadow-[0_12px_30px_rgb(29_26_22/0.16)] sm:px-10">
            <span className="tape -top-3 left-10 -rotate-6" />
            <p className="font-hand text-3xl text-ink sm:text-4xl">{t({ en: "Explore further", id: "Jelajahi lebih lanjut" })}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {actions.map((a, i) => <ActionLink key={i} a={a} />)}
            </div>
            {note && <p className="mt-5 text-sm text-ink-soft">{note}</p>}
          </div>
        </Toss>
      </div>
    </section>
  );
}
