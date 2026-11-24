import type { T } from "./i18n";

export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
/** Prefix a public/ path with the GitHub Pages base path. */
export const asset = (p: string) => `${BASE}${p.startsWith("/") ? p : `/${p}`}`;

export const links = {
  email: "renaldybys@gmail.com",
  github: "https://github.com/renalazy",
  linkedin: "https://www.linkedin.com/in/renaldy-bilal-setyawan-0462b2286/",
  instagram: "https://www.instagram.com/renxietyyyy/",
};

export const cvs = [
  { label: "Fullstack Developer CV", href: asset("/pdf/CV_ATS_RENALDY_FS.pdf") },
  { label: "Data Analyst CV", href: asset("/pdf/CV_ATS_RENALDY_DA%20(Intern).pdf") },
];

export const nav: { id: string; label: T }[] = [
  { id: "top", label: { en: "Home", id: "Beranda" } },
  { id: "about", label: { en: "About", id: "Tentang" } },
  { id: "work", label: { en: "Work", id: "Karya" } },
  { id: "experience", label: { en: "Experience", id: "Pengalaman" } },
];

export const hero = {
  splash: [{ en: "hi there!", id: "halo!" }, { en: "glad you dropped by.", id: "makasih sudah mampir." }] as T[],
  label: { en: "hello, i'm", id: "halo, saya" },
  name: "RENALDY",
  fullName: "Renaldy Bilal Setyawan",
  stickers: [{ en: "ships it", id: "pasti rilis" }, { en: "data-minded", id: "paham data" }] as T[],
  role: { en: "Software Engineer", id: "Software Engineer" },
  location: { en: "Surabaya, ID", id: "Surabaya, ID" },
  stamp: { en: "Open to work", id: "Terbuka untuk kerja" },
  status: { en: "7+ years · fullstack & data", id: "7+ tahun · fullstack & data" },
  annotations: {
    me: { en: "that's me!", id: "ini saya!" },
    years: { en: "7+ years of shipping", id: "7+ tahun merilis" },
  },
  // {hl:...} = marker highlight, {sc:...} = scribble circle
  headline: {
    en: "I build {sc:fast, reliable} web products, from the {hl:database} all the way to the screen.",
    id: "Saya membangun produk web yang {sc:cepat dan andal}, dari {hl:database} sampai ke layar.",
  },
  cta: { en: "Say hello", id: "Sapa saya" },
  cv: { en: "Download CV", id: "Unduh CV" },
};
