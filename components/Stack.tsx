"use client";

import { motion, useReducedMotion } from "motion/react";
import { useT } from "@/lib/i18n";
import { stack } from "@/lib/content";
import { CutLine, SectionHead } from "./paper";

const tilt = [-2, 1.5, -1, 2, -1.5, 1, -2.5];

/** Embossed label-maker tape. */
function Label({ text, i, g }: { text: string; i: number; g: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      initial={reduce ? false : { opacity: 0, scale: 0.7, rotate: 0 }}
      whileInView={{ opacity: 1, scale: 1, rotate: tilt[(i + g) % tilt.length] }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: "spring", stiffness: 260, damping: 15, delay: i * 0.05 }}
      className="relative inline-block bg-ink px-3.5 py-2 font-mono text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_3px_6px_rgb(29_26_22/0.3)] [text-shadow:0_1px_0_rgb(255_255_255/0.25),0_-1px_0_rgb(0_0_0/0.6)] sm:text-base"
      style={{ clipPath: "polygon(0 0, 100% 0, 98.5% 50%, 100% 100%, 0 100%, 1.5% 50%)" }}
    >
      {text}
    </motion.span>
  );
}

export default function Stack() {
  const t = useT();
  return (
    <section id="stack" className="overflow-x-clip paper paper-margin scroll-mt-20 pb-24 pt-6 sm:pb-28">
      <CutLine />
      <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:mt-20 lg:pl-24">
        <SectionHead label={t(stack.label)} title={t(stack.title)} />
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:gap-x-16">
          {stack.groups.map((g, gi) => (
            <div key={gi}>
              <h3 className="inline-block -rotate-1 px-3 py-1 font-hand text-3xl text-ink" style={{ background: g.color }}>
                {t(g.name)}
              </h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {g.items.map((it, i) => <Label key={it} text={it} i={i} g={gi} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
