"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useT } from "@/lib/i18n";
import { asset, cvs, hero } from "@/lib/site";
import { Arrow, EASE, Paperclip, Polaroid, Pushpin, RichLine, Sticker, StickyNote } from "./paper";
import { ArrowUpRight, DownloadIcon } from "./icons";

const spring = (damping = 14, delay = 0) => ({ type: "spring" as const, stiffness: 190, damping, delay });

function CvMenu() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", close); document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("click", close); document.removeEventListener("keydown", esc); };
  }, []);
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}
        className="btn-chunky bg-sun px-5 py-3 font-mono text-sm font-bold uppercase tracking-[0.12em] text-ink">
        <DownloadIcon /> {t(hero.cv)}
      </button>
      {open && (
        <div className="absolute left-0 top-[calc(100%+10px)] z-30 w-64 border-2 border-ink bg-white p-1.5 shadow-[4px_4px_0_var(--color-ink)]">
          {cvs.map((c) => (
            <a key={c.href} href={c.href} target="_blank" rel="noopener"
              className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold hover:bg-butter">
              {c.label} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const t = useT();
  const reduce = useReducedMotion();
  const letters = hero.name.split("");

  // drop-in from above and settle at `rotate`
  const toss = (rotate: number, delay: number, from = -50, damping = 13) => ({
    initial: reduce ? false : { opacity: 0, y: from, rotate: rotate * 2.2 },
    animate: ready || reduce ? { opacity: 1, y: 0, rotate } : undefined,
    transition: spring(damping, delay),
  });

  return (
    <section id="top" className="paper paper-margin relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:min-h-[calc(100svh-4rem)] lg:pb-20 lg:pt-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10 lg:pl-16">
        {/* ---------- left: who ---------- */}
        <div className="relative">
          <p className="flex items-center gap-2 font-hand text-3xl text-ink-soft sm:text-4xl">
            {t(hero.label)}
            <Arrow className="mt-3 h-6 w-12 rotate-[18deg]" />
          </p>

          {/* name card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -6 }}
            animate={ready || reduce ? { opacity: 1, scale: 1, rotate: -1.5 } : undefined}
            transition={{ duration: 0.55, ease: EASE }}
            className="relative mt-4 inline-block max-w-full bg-white px-5 pb-4 pt-6 shadow-[0_10px_26px_rgb(29_26_22/0.16)] sm:px-9 sm:pb-6 sm:pt-8"
          >
            {/* index-card rules */}
            <span aria-hidden className="absolute inset-x-0 top-5 h-0.5 bg-tomato/50 sm:top-6" />
            <span aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_31px,rgb(51_85_201/0.12)_31px,rgb(51_85_201/0.12)_32px)] [background-position:0_22px]" />
            <Pushpin className="-top-3 left-1/2 -translate-x-1/2" color="var(--color-cobalt)" />

            <h1 className="relative font-display text-[15.5vw] leading-[0.9] tracking-tight text-ink sm:text-[13vw] lg:text-[6.4rem] xl:text-[8.4rem]">
              <span className="sr-only">{hero.fullName}</span>
              <span aria-hidden className="inline-block whitespace-nowrap">
                {letters.map((l, i) => (
                  <motion.span key={i} className="inline-block"
                    initial={reduce ? false : { opacity: 0, y: "0.6em", rotate: i % 2 ? 8 : -8 }}
                    animate={ready || reduce ? { opacity: 1, y: 0, rotate: 0 } : undefined}
                    transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.2 + i * 0.055 }}>
                    {l}
                  </motion.span>
                ))}
              </span>
            </h1>
            <p className="relative mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint sm:text-xs">
              {hero.fullName}
            </p>

            {/* stickers on the card corners */}
            <motion.div {...toss(-9, 0.55)} className="absolute -left-3 -top-5 sm:-left-6">
              <Sticker color="var(--color-sage)">{t(hero.stickers[0])}</Sticker>
            </motion.div>
            <motion.div {...toss(7, 0.65)} className="absolute -right-2 -top-6 sm:-right-8">
              <Sticker color="var(--color-sky)">{t(hero.stickers[1])}</Sticker>
            </motion.div>

            {/* rubber stamp */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 1.8, rotate: -2 }}
              animate={ready || reduce ? { opacity: 0.92, scale: 1, rotate: -9 } : undefined}
              transition={{ duration: 0.28, ease: "easeIn", delay: 0.95 }}
              className="absolute -bottom-6 right-2 sm:-bottom-7 sm:-right-6"
            >
              <span className="stamp inline-block bg-paper/40 font-display text-sm uppercase tracking-wider text-tomato sm:text-lg">
                {t(hero.stamp)}
              </span>
            </motion.div>
          </motion.div>

          {/* notes */}
          <div className="mt-10 flex flex-wrap items-start gap-5 sm:mt-12">
            <motion.div {...toss(-3, 1.05, -110, 9)}>
              <StickyNote className="text-xl sm:text-3xl">
                <Pushpin className="-top-3 left-1/2 -translate-x-1/2" />
                {t(hero.role)}
              </StickyNote>
            </motion.div>
            <motion.div {...toss(2.5, 1.2, -110, 9)}>
              <StickyNote color="var(--color-blush)" className="text-xl sm:text-3xl">
                <Pushpin className="-top-3 left-1/2 -translate-x-1/2" color="var(--color-teal)" />
                {t(hero.location)}
              </StickyNote>
            </motion.div>
            <p className="flex items-center gap-2 self-center font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink-soft sm:text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal" />
              </span>
              {t(hero.status)}
            </p>
          </div>

          {/* headline */}
          <p className="mt-10 max-w-2xl text-3xl font-semibold leading-[1.18] tracking-tight text-ink sm:text-[2.6rem]">
            <RichLine text={t(hero.headline)} />
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn-chunky bg-ink px-5 py-3 font-mono text-sm font-bold uppercase tracking-[0.12em] text-white hover:bg-cobalt">
              {t(hero.cta)} <ArrowUpRight />
            </a>
            <CvMenu />
          </div>
        </div>

        {/* ---------- right: photos ---------- */}
        <div className="relative mx-auto flex w-full max-w-md items-start justify-center gap-4 sm:gap-8 lg:mx-0 lg:block lg:h-[600px] lg:max-w-none">
          <motion.div {...toss(4, 0.35, -60)} className="relative z-10 w-[46%] sm:w-52 lg:absolute lg:right-0 lg:top-10 lg:w-60 xl:w-64">
            <Polaroid src={asset("/assets/img/me/selfie.jpg")} alt="Renaldy, selfie" caption="me, probably debugging">
              <span className="tape -top-3 left-1/2 w-24 -translate-x-1/2 -rotate-3" />
            </Polaroid>
            <div className="absolute -top-12 left-0 hidden items-end lg:flex">
              <span className="font-hand text-2xl leading-none text-ink">{t(hero.annotations.me)}</span>
              <Arrow className="ml-1 h-8 w-12 rotate-[35deg]" />
            </div>
          </motion.div>
          <motion.div {...toss(-6, 0.5, -60)} className="relative mt-10 w-[46%] sm:w-48 lg:absolute lg:bottom-0 lg:-left-6 lg:mt-0 lg:w-52 xl:left-0 xl:w-56">
            <Polaroid src={asset("/assets/img/me/cafe.jpg")} alt="Renaldy at a café" caption="fuel: iced coffee">
              <Paperclip className="-top-6 right-6 rotate-[8deg]" />
            </Polaroid>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
