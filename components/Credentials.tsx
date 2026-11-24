"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useT } from "@/lib/i18n";
import { credentials, type Featured } from "@/lib/content";
import { CutLine, Pushpin, SectionHead, Toss } from "./paper";
import { ArrowUpRight, DownloadIcon } from "./icons";

/** Round pin-back button badge. */
function Badge({ short, color }: { short: string; color: string }) {
  return (
    <span aria-hidden className="relative grid h-20 w-20 shrink-0 place-items-center rounded-full border-[3px] border-ink shadow-[3px_4px_0_var(--color-ink)]"
      style={{ background: color }}>
      <span className="absolute inset-1.5 rounded-full border-2 border-dashed border-white/70" />
      <span className="absolute left-3 top-2.5 h-4 w-6 -rotate-[30deg] rounded-full bg-white/35" />
      <span className="relative font-display text-lg text-white [text-shadow:1px_1px_0_var(--color-ink)]">{short}</span>
    </span>
  );
}

/** A certificate pinned to the board: thumbnail, details, view + download. */
function FeaturedCard({ c, i, onOpen }: { c: Featured; i: number; onOpen: () => void }) {
  const t = useT();
  return (
    <Toss rotate={[-1.5, 1.2, -0.8][i % 3]} delay={i * 0.08} from={-30} className="h-full">
      <article className="relative flex h-full flex-col bg-white p-3 pb-6 shadow-[0_14px_32px_rgb(29_26_22/0.18)]">
        <Pushpin className="-top-3 left-1/2 z-10 -translate-x-1/2" color={c.color} />
        <button type="button" onClick={onOpen} aria-label={`${t(credentials.view)}: ${c.title}`}
          className="group relative block h-60 overflow-hidden border border-ink/10 bg-paper-2 sm:h-64">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.thumb} alt="" loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
          <span className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors group-hover:bg-ink/35">
            <span className="translate-y-2 border-2 border-ink bg-white px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink opacity-0 shadow-[3px_3px_0_var(--color-ink)] transition-all group-hover:translate-y-0 group-hover:opacity-100">
              {t(credentials.view)}
            </span>
          </span>
          {c.pages.length > 1 && (
            <span className="absolute bottom-2 right-2 bg-ink px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white">
              {c.pages.length} {t({ en: "pages", id: "halaman" })}
            </span>
          )}
        </button>

        <div className="flex flex-1 flex-col px-2 pt-5 sm:px-3">
          <span className="inline-flex w-fit items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-faint">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
            {t(c.kind)}
          </span>
          <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-ink">{c.title}</h3>
          <p className="mt-1 leading-snug text-ink-soft">{t(c.subtitle)}</p>
          <p className="mt-2 font-hand text-xl leading-tight text-tomato">{t(c.issuer)}</p>

          <dl className="mt-4 grid grid-cols-3 gap-2 border-y-2 border-dashed border-ink/15 py-3">
            {c.facts.map((f, k) => (
              <div key={k} className="min-w-0">
                <dt className="font-mono text-[9.5px] font-bold uppercase tracking-[0.12em] text-ink-faint">{t(f.k)}</dt>
                <dd className="mt-0.5 truncate font-mono text-sm font-bold text-ink">{t(f.v)}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
            <button type="button" onClick={onOpen}
              className="btn-chunky bg-ink px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-cobalt">
              {t(credentials.view)}
            </button>
            <a href={c.pdf} download className="inline-flex items-center gap-1.5 border-b-2 border-tomato pb-0.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink">
              <DownloadIcon className="h-3.5 w-3.5" /> PDF
            </a>
            {c.verify && (
              <a href={c.verify} target="_blank" rel="noopener" className="inline-flex items-center gap-1 border-b-2 border-ink/30 pb-0.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink">
                {t(credentials.verify)} <ArrowUpRight className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </article>
    </Toss>
  );
}

const ZOOMS = [1, 1.6, 2.4];

/** Full-screen certificate viewer: page through, zoom, download. */
function Viewer({ c, onClose }: { c: Featured; onClose: () => void }) {
  const t = useT();
  const reduce = useReducedMotion();
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = c.pages.length;

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") { setPage((p) => Math.min(total - 1, p + 1)); setZoom(0); }
      if (e.key === "ArrowLeft") { setPage((p) => Math.max(0, p - 1)); setZoom(0); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose, total]);

  const go = (d: number) => { setPage((p) => Math.min(total - 1, Math.max(0, p + d))); setZoom(0); };
  const tool = "btn-chunky bg-white px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink hover:bg-butter disabled:pointer-events-none disabled:opacity-40";

  return (
    <motion.div role="dialog" aria-modal="true" aria-label={`${c.title} certificate`}
      className="fixed inset-0 z-[80] flex flex-col bg-ink/85 backdrop-blur-sm"
      initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="flex flex-wrap items-center gap-3 border-b-2 border-dashed border-white/20 bg-paper px-4 py-3 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold text-ink">{c.title}</p>
          <p className="truncate font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-faint">{t(c.issuer)}</p>
        </div>
        <div className="order-3 flex w-full flex-wrap items-center gap-2 sm:order-2 sm:w-auto">
          {total > 1 && (
            <>
              <button type="button" className={tool} onClick={() => go(-1)} disabled={page === 0} aria-label={t({ en: "Previous page", id: "Halaman sebelumnya" })}>←</button>
              <span className="px-1 font-mono text-xs font-bold text-ink" aria-live="polite">{page + 1} / {total}</span>
              <button type="button" className={tool} onClick={() => go(1)} disabled={page === total - 1} aria-label={t({ en: "Next page", id: "Halaman berikutnya" })}>→</button>
            </>
          )}
          <button type="button" className={tool} onClick={() => setZoom((z) => (z + 1) % ZOOMS.length)}
            aria-label={t({ en: "Change zoom", id: "Ubah zoom" })}>
            {zoom === ZOOMS.length - 1 ? "−" : "+"} {Math.round(ZOOMS[zoom] * 100)}%
          </button>
          <a href={c.pdf} download className={`${tool} bg-sun`}>
            <DownloadIcon className="h-3.5 w-3.5" /> <span className="hidden sm:inline">{t(credentials.download)}</span><span className="sm:hidden">PDF</span>
          </a>
        </div>
        <div className="order-2 sm:order-3">
          <button ref={closeRef} type="button" onClick={onClose} aria-label={t({ en: "Close", id: "Tutup" })}
            className="btn-chunky bg-tomato px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-white">✕</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto overscroll-contain p-4 sm:p-8" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <AnimatePresence mode="wait" initial={false}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img key={page} src={c.pages[page]} alt={`${c.title}, page ${page + 1} of ${total}`}
            onClick={() => setZoom((z) => (z + 1) % ZOOMS.length)}
            className={`mx-auto block bg-white shadow-[0_20px_50px_rgb(0_0_0/0.45)] ${zoom === 0 ? "h-auto max-h-[calc(100dvh-8rem)] w-auto max-w-full cursor-zoom-in sm:max-h-[calc(100dvh-9rem)]" : "max-w-none cursor-zoom-out"}`}
            style={zoom === 0 ? undefined : { width: `${ZOOMS[zoom] * 100}%` }}
            initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }} />
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Credentials() {
  const t = useT();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<Featured | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="credentials" className="overflow-x-clip paper paper-margin scroll-mt-20 pb-24 pt-6 sm:pb-28">
      <CutLine />
      <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:mt-20 lg:pl-24">
        <SectionHead label={t(credentials.label)} title={t(credentials.title)} />

        <ul className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {credentials.featured.map((c, i) => (
            <li key={c.id}><FeaturedCard c={c} i={i} onOpen={() => setOpen(c)} /></li>
          ))}
        </ul>
        <p className="mt-6 font-hand text-xl text-ink-soft">{t(credentials.privacy)}</p>

        <h3 className="mt-16 inline-block -rotate-1 bg-butter px-3 py-1 font-hand text-3xl text-ink">{t(credentials.alsoTitle)}</h3>
        <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:max-w-4xl">
          {credentials.items.map((c, i) => (
            <motion.li key={c.id} className="flex items-start gap-4"
              initial={reduce ? false : { opacity: 0, y: 20, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 220, damping: 16, delay: i * 0.08 }}>
              <Badge short={c.short} color={c.color} />
              <div className="min-w-0 pt-1">
                <p className="text-lg font-semibold leading-snug">{c.name}</p>
                <p className="mt-0.5 text-sm text-ink-soft">{c.issuer} · {c.date}</p>
                <p className="mt-1 break-all font-mono text-xs text-ink-faint">{c.id}</p>
                <a href={credentials.url} target="_blank" rel="noopener"
                  className="mt-2 inline-flex items-center gap-1 border-b-2 border-tomato font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink">
                  {t(credentials.verify)} <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>{open && <Viewer key={open.id} c={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
