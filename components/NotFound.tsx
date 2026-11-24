"use client";

import { useT } from "@/lib/i18n";
import { asset } from "@/lib/site";
import Header from "./Header";
import Footer from "./Footer";
import { StickyNote, Toss } from "./paper";

const HOME = asset("/");

export default function NotFound() {
  const t = useT();
  return (
    <>
      <div className="grain" aria-hidden />
      <Header home={HOME} />
      <main id="top" className="paper paper-margin grid min-h-[70vh] place-items-center px-4 py-20">
        <div className="text-center">
          <Toss rotate={-3} from={-30}>
            <p className="font-display text-[7rem] leading-none text-ink sm:text-[10rem]">404</p>
          </Toss>
          <Toss rotate={2} delay={0.15} from={-20} className="mx-auto mt-4 w-fit">
            <StickyNote className="px-6 py-4 text-3xl">
              {t({ en: "This page got torn out of the sketchbook.", id: "Halaman ini sobek dari buku sketsa." })}
            </StickyNote>
          </Toss>
          <a href={HOME} className="btn-chunky mt-10 inline-flex bg-ink px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-cobalt">
            ← {t({ en: "Back to the homepage", id: "Kembali ke beranda" })}
          </a>
        </div>
      </main>
      <Footer home={HOME} />
    </>
  );
}
