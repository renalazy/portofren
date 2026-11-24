"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useT } from "@/lib/i18n";
import { hero } from "@/lib/site";

/** A sticky note slaps onto the page, says hi, then peels away. Once per visit. */
export default function Splash({ onDone }: { onDone: (shown: boolean) => void }) {
  const t = useT();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<0 | 1 | 2>(0); // 0 first line, 1 second line, 2 gone

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("splash") === "1"; sessionStorage.setItem("splash", "1"); } catch {}
    if (seen || reduce) { setPhase(2); onDone(false); return; }
    const a = setTimeout(() => setPhase(1), 750);
    const b = setTimeout(() => { setPhase(2); onDone(true); }, 1600);
    return () => { clearTimeout(a); clearTimeout(b); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div key="splash" aria-hidden className="paper fixed inset-0 z-[80] grid place-items-center"
          exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.15 } }}>
          <motion.div
            initial={{ scale: 1.6, rotate: -14, opacity: 0 }}
            animate={{ scale: 1, rotate: -4, opacity: 1 }}
            exit={{ y: -60, rotate: 8, opacity: 0, transition: { duration: 0.35 } }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="relative grid h-44 w-56 place-items-center bg-butter px-5 text-center font-hand text-4xl leading-tight text-ink shadow-[3px_6px_16px_rgb(29_26_22/0.22)] sm:h-52 sm:w-64 sm:text-5xl">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-4deg]" />
            <AnimatePresence mode="wait">
              <motion.span key={phase} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
                {t(hero.splash[phase === 1 ? 1 : 0])}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
