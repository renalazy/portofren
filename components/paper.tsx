"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

export const EASE = [0.2, 0.9, 0.3, 1] as const;

/** Something tossed onto the desk: falls in and settles with a spring. */
export function Toss({
  children, rotate = 0, delay = 0, from = -40, bounce = 14, className, style,
}: {
  children: ReactNode; rotate?: number; delay?: number; from?: number; bounce?: number;
  className?: string; style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? { rotate } : { opacity: 0, y: from, rotate: rotate * 2.2 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 190, damping: bounce, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Pushpin({ color = "var(--color-tomato)", className = "" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden className={`pointer-events-none absolute z-10 h-7 w-7 ${className}`}>
      <ellipse cx="15" cy="24" rx="5" ry="1.6" fill="rgb(29 26 22 / .18)" />
      <circle cx="14" cy="11" r="8" fill={color} stroke="var(--color-ink)" strokeWidth="1.6" />
      <circle cx="11" cy="8" r="2.4" fill="#fff" opacity=".7" />
    </svg>
  );
}

export function Paperclip({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 60" aria-hidden className={`pointer-events-none absolute z-10 h-14 w-6 ${className}`}
      fill="none" stroke="#8d939c" strokeWidth="2.6" strokeLinecap="round">
      <path d="M8 18v28a4 4 0 0 0 8 0V12a7 7 0 0 0-14 0v34a10 10 0 0 0 20 0V20" />
    </svg>
  );
}

export function Polaroid({
  src, alt, caption, className = "", imgClass = "aspect-[4/5]", children,
}: { src: string; alt: string; caption?: string; className?: string; imgClass?: string; children?: ReactNode }) {
  return (
    <figure className={`relative bg-white p-2.5 pb-2 shadow-[0_8px_22px_rgb(29_26_22/0.22)] ${className}`}>
      {children}
      <div className={`w-full overflow-hidden bg-paper-2 ${imgClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </div>
      {caption && <figcaption className="mt-1.5 text-center font-hand text-xl leading-tight text-ink-soft">{caption}</figcaption>}
    </figure>
  );
}

export function StickyNote({ children, color = "var(--color-butter)", className = "" }: { children: ReactNode; color?: string; className?: string }) {
  return (
    <div
      className={`relative px-5 pb-3 pt-4 font-hand leading-tight text-ink shadow-[2px_4px_10px_rgb(29_26_22/0.18)] ${className}`}
      style={{ background: color }}
    >
      {children}
    </div>
  );
}

/** Die-cut vinyl sticker. */
export function Sticker({ children, color, className = "" }: { children: ReactNode; color: string; className?: string }) {
  return (
    <span
      className={`inline-block rounded-full border-[3px] border-white px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-[0_3px_8px_rgb(29_26_22/0.25)] sm:text-sm ${className}`}
      style={{ background: color }}
    >
      {children}
    </span>
  );
}

/** Wraps text in a hand-drawn circle that draws itself when scrolled into view. */
export function Scribble({ children, color = "var(--color-tomato)" }: { children: ReactNode; color?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  return (
    <span ref={ref} className="relative inline-block whitespace-nowrap">
      {children}
      <svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden
        className={`scribble pointer-events-none absolute -inset-x-[6%] -inset-y-[22%] h-[144%] w-[112%] ${inView ? "is-in" : ""}`}>
        <path pathLength={1} d="M14 34C10 14 70 5 118 7c46 2 76 12 74 26-2 16-52 23-104 22C40 54 6 46 9 30 12 15 48 9 82 8"
          fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/** Highlighter swipe behind a word, drawn on view. */
export function Marker({ children, color }: { children: ReactNode; color?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  return (
    <span ref={ref} className={`marker ${inView ? "is-in" : ""}`} style={color ? ({ "--mk": color } as CSSProperties) : undefined}>
      {children}
    </span>
  );
}

/** Hand-drawn arrow, drawn pointing right; rotate/flip with classes. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 40" aria-hidden className={`pointer-events-none ${className}`} fill="none" stroke="var(--color-ink)"
      strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 30c14-14 32-20 58-16" />
      <path d="M52 6l11 8-12 7" />
    </svg>
  );
}

/** Renders "{hl:…}" and "{sc:…}" tokens inside a sentence. */
export function RichLine({ text }: { text: string }) {
  const parts = text.split(/(\{(?:hl|sc):[^}]+\})/g);
  return (
    <>
      {parts.map((p, i) => {
        const m = p.match(/^\{(hl|sc):([^}]+)\}$/);
        if (!m) return <span key={i}>{p}</span>;
        return m[1] === "hl" ? <Marker key={i}>{m[2]}</Marker> : <Scribble key={i}>{m[2]}</Scribble>;
      })}
    </>
  );
}

/** Dashed "cut here" line with scissors, used between sections. */
export function CutLine() {
  return (
    <div aria-hidden className="mx-auto flex max-w-7xl items-center gap-3 px-4 sm:px-6">
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 -rotate-90 text-ink-faint" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M8.1 8.1 20 20M8.1 15.9 20 4" />
      </svg>
      <span className="h-0 flex-1 border-t-2 border-dashed border-ink/20" />
    </div>
  );
}

/** Handwritten label + big chunky title whose letters hop in on scroll. */
export function SectionHead({ label, title, align = "left", children }: { label: string; title: string; align?: "left" | "center"; children?: ReactNode }) {
  const reduce = useReducedMotion();
  const words = title.split(" ");
  let n = 0;
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className={`inline-flex items-center gap-2 font-hand text-2xl text-ink-soft sm:text-3xl ${align === "center" ? "justify-center" : ""}`}>
        {label}
        <Arrow className="mt-2 h-5 w-10 rotate-[20deg]" />
      </p>
      <h2 className="mt-2 font-display text-[2.6rem] leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
        <span className="sr-only">{title}</span>
        <span aria-hidden>
          {words.map((w, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {w.split("").map((ch) => {
                const i = n++;
                return (
                  <motion.span key={i} className="inline-block"
                    initial={reduce ? false : { opacity: 0, y: "0.45em" }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.035 }}>
                    {ch}
                  </motion.span>
                );
              })}
              {wi < words.length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
        </span>
      </h2>
      {children}
    </div>
  );
}

/** Fade up on scroll. */
export function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}
