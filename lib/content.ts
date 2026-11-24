import type { T } from "./i18n";
import { asset } from "./site";

/* ---------------- about ---------------- */
export const about = {
  label: { en: "about me", id: "tentang saya" },
  title: { en: "Engineering rigor, analytics clarity.", id: "Ketelitian engineering, kejelasan analitik." },
  body: [
    {
      en: "I'm a fullstack engineer with 7+ years of end to end work: Go backends, Next.js frontends, PostgreSQL schema design and Docker deployments. I built an internal API gateway that took the load off a legacy ERP, and tuned queries to cut response times by up to 40% for 5,000+ active users.",
      id: "Saya fullstack engineer dengan pengalaman 7+ tahun dari ujung ke ujung: backend Go, frontend Next.js, desain skema PostgreSQL, dan deployment dengan Docker. Saya membangun API gateway internal yang mengangkat beban dari ERP lama, dan menyetel query hingga waktu respons 40% lebih cepat untuk 5.000+ pengguna aktif.",
    },
    {
      en: "Right now I'm open to full-time roles in data, frontend, backend or fullstack with remote-first teams. I also build websites and apps for businesses.",
      id: "Saat ini saya terbuka untuk posisi full-time di bidang data, frontend, backend, atau fullstack di tim remote-first. Saya juga membuat website dan aplikasi untuk bisnis.",
    },
  ] as T[],
  impactLabel: { en: "a few things i'm proud of", id: "beberapa hal yang saya banggakan" },
  impact: [
    { en: "Cut query bottlenecks by up to 40% for a campus platform serving 5,000+ active users, through indexing and SQL tuning.", id: "Memangkas bottleneck query hingga 40% untuk platform kampus dengan 5.000+ pengguna aktif, lewat indexing dan tuning SQL." },
    { en: "Reduced manual data entry by 90% for academic compliance reporting with an automated two-way API integration.", id: "Mengurangi input data manual hingga 90% untuk pelaporan kepatuhan akademik dengan integrasi API dua arah yang otomatis." },
    { en: "Built the university's internal API gateway in Go (v1 to v2), moving heavy query load off the legacy ERP.", id: "Membangun API gateway internal universitas dengan Go (v1 ke v2), memindahkan beban query berat dari ERP lama." },
    { en: "Built and launched Tumbuu and Baraloo for clients. Both solo, end to end.", id: "Membangun dan meluncurkan Tumbuu dan Baraloo untuk klien. Keduanya solo, dari awal sampai akhir." },
  ] as T[],
  facts: [
    { k: { en: "experience", id: "pengalaman" }, v: { en: "7+ years", id: "7+ tahun" }, color: "var(--color-butter)" },
    { k: { en: "based in", id: "domisili" }, v: { en: "Surabaya, ID", id: "Surabaya, ID" }, color: "var(--color-sky)" },
    { k: { en: "works", id: "kerja" }, v: { en: "Remote / hybrid", id: "Remote / hybrid" }, color: "var(--color-sage)" },
    { k: { en: "speaks", id: "bahasa" }, v: { en: "EN · ID", id: "EN · ID" }, color: "var(--color-blush)" },
  ],
  stats: [
    { n: "40%", l: { en: "faster queries", id: "query lebih cepat" } },
    { n: "90%", l: { en: "less manual entry", id: "input manual berkurang" } },
    { n: "5,000+", l: { en: "users served", id: "pengguna dilayani" } },
    { n: "20+", l: { en: "tables modeled", id: "tabel dimodelkan" } },
  ],
};

/* ---------------- work ---------------- */
export type ProjectKind = "client" | "work" | "learning";
export const kindLabel: Record<ProjectKind, T> = {
  client: { en: "Client project", id: "Proyek klien" },
  work: { en: "At work", id: "Di kantor" },
  learning: { en: "Learning path", id: "Jalur belajar" },
};

export type Project = {
  slug: string;
  featured: boolean; // set to false to hide from the homepage
  kind: ProjectKind;
  title: string;
  meta: T;
  summary: T;
  result: T;
  tags: string[];
  stack: string;
  href?: string;
  live?: string;
  image?: string;
  flow?: string[]; // drawn system diagram when there's no screenshot
  color: string;
  ink: "dark" | "light";
};

export const work = {
  label: { en: "explore my work", id: "lihat karya saya" },
  title: { en: "Selected work", id: "Karya pilihan" },
  intro: {
    en: "Client projects, production systems from my job, and the data projects on my learning path.",
    id: "Proyek klien, sistem produksi dari pekerjaan saya, dan proyek data di jalur belajar saya.",
  },
  view: { en: "View case study", id: "Lihat studi kasus" },
  visit: { en: "Visit live site", id: "Kunjungi situs" },
  internal: { en: "Internal system. Described, not shown.", id: "Sistem internal. Dijelaskan, tidak ditampilkan." },
  items: [
    {
      slug: "pddikti", featured: true, kind: "work", title: "PDDIKTI Integration",
      meta: { en: "Universitas PGRI Adi Buana · since 2023", id: "Universitas PGRI Adi Buana · sejak 2023" },
      summary: { en: "A two-way sync layer (Neo Feeder Importer) between the campus academic system and the government's PDDIKTI Feeder API, replacing manual academic-compliance reporting.", id: "Layer sinkronisasi dua arah (Neo Feeder Importer) antara sistem akademik kampus dan PDDIKTI Feeder API pemerintah, menggantikan pelaporan kepatuhan akademik manual." },
      result: { en: "−90% manual data entry", id: "−90% input data manual" },
      tags: ["Frontend", "Backend", "Fullstack"], stack: "Next.js · Go · PostgreSQL",
      flow: ["Campus SIAKAD DB", "Neo Feeder Importer", "PDDIKTI Feeder API"],
      color: "var(--color-sun)", ink: "dark",
    },
    {
      slug: "sister", featured: true, kind: "work", title: "SISTER Integration",
      meta: { en: "Universitas PGRI Adi Buana · since 2023", id: "Universitas PGRI Adi Buana · sejak 2023" },
      summary: { en: "Automated, secure cross-platform sync of institutional assets and lecturer profiles with SISTER, following national higher-education compliance standards.", id: "Sinkronisasi lintas platform yang otomatis dan aman untuk aset institusi dan profil dosen dengan SISTER, sesuai standar kepatuhan pendidikan tinggi nasional." },
      result: { en: "Full national-standard compliance", id: "Patuh standar nasional sepenuhnya" },
      tags: ["Frontend", "Backend", "Fullstack"], stack: "Next.js · Go · PostgreSQL",
      flow: ["SISTER Kemdikbud", "Sync service", "SISTER Adi Buana"],
      color: "var(--color-teal)", ink: "light",
    },
    {
      slug: "qontak", featured: true, kind: "work", title: "Qontak Broadcasting Engine",
      meta: { en: "Universitas PGRI Adi Buana · since 2023", id: "Universitas PGRI Adi Buana · sejak 2023" },
      summary: { en: "A high-volume WhatsApp broadcasting engine for Adi Buana, built on the Qontak WhatsApp Business API, with structured real-time delivery tracking for institutional messages.", id: "Mesin broadcast WhatsApp bervolume tinggi untuk Adi Buana di atas Qontak WhatsApp Business API, dengan pelacakan pengiriman real-time yang terstruktur untuk pesan institusi." },
      result: { en: "Real-time delivery tracking", id: "Pelacakan pengiriman real-time" },
      tags: ["Frontend", "Backend", "Fullstack"], stack: "Next.js · Go · PostgreSQL",
      flow: ["Campus apps", "Broadcasting engine", "Qontak WhatsApp API"],
      color: "var(--color-sage)", ink: "dark",
    },
    {
      slug: "baraloo", featured: true, kind: "client", title: "Baraloo",
      meta: { en: "Solo · launched Sep 2026", id: "Solo · rilis Sep 2026" },
      summary: { en: "An online store for a Surabaya baby-food (MPASI) reseller: 31 products in 5 categories with serving and storage info, a cart, WhatsApp order confirmation and local delivery, plus an installable admin app (PWA) for the team.", id: "Toko online untuk reseller MPASI di Surabaya: 31 produk dalam 5 kategori dengan info penyajian dan penyimpanan, keranjang, konfirmasi pesanan via WhatsApp, dan antar lokal, plus aplikasi admin (PWA) yang bisa dipasang tim." },
      result: { en: "Live store · 31 products online", id: "Toko live · 31 produk online" },
      tags: ["Frontend", "Backend", "Fullstack"], stack: "Next.js · Supabase · Tailscale",
      href: asset("/projects/baraloo/"), live: "https://baraloo.com/", image: asset("/assets/img/baraloo/storefront-desktop.png"),
      color: "var(--color-cobalt)", ink: "light",
    },
    {
      slug: "tumbuu", featured: true, kind: "client", title: "Tumbuu",
      meta: { en: "Solo · launched Jul 2026", id: "Solo · rilis Jul 2026" },
      summary: { en: "A parenting tracker: log feeding, sleep, diapers, growth (following Buku KIA), illness and moments, then get daily and doctor-visit summaries. Free for one child, with a paid Premium tier.", id: "Aplikasi pencatat tumbuh kembang: catat menyusui, tidur, popok, pertumbuhan (mengikuti Buku KIA), sakit, dan momen, lalu dapatkan ringkasan harian dan konsultasi dokter. Gratis untuk satu anak, dengan paket Premium." },
      result: { en: "Live product · free + Premium", id: "Produk live · gratis + Premium" },
      tags: ["Frontend", "Backend", "Fullstack"], stack: "Next.js · PostgreSQL · Better Auth · R2 · Midtrans",
      href: asset("/projects/tumbuu/"), live: "https://temantumbuu.com/", image: asset("/assets/img/tumbuu/landing-desktop.png"),
      color: "var(--color-ink)", ink: "light",
    },
    {
      slug: "gayanara", featured: true, kind: "learning", title: "Gayanara E-Commerce Review",
      meta: { en: "Self-directed · 2025", id: "Proyek mandiri · 2025" },
      summary: { en: "End-to-end analytics on a five-table fashion e-commerce dataset (10,586 rows): data quality audit, SQL modeling in DuckDB and seven analyses. Found Rp 31.4M in discounts produced no measurable basket lift. Synthetic dataset, stated as such.", id: "Analitik end-to-end pada dataset e-commerce fashion lima tabel (10.586 baris): audit kualitas data, modeling SQL di DuckDB, dan tujuh analisis. Menemukan diskon Rp 31,4 jt tidak menaikkan nilai keranjang secara terukur. Dataset sintetis, dinyatakan jelas." },
      result: { en: "7 analyses · 10,586 rows", id: "7 analisis · 10.586 baris" },
      tags: ["Data"], stack: "Python · SQL (DuckDB) · Tableau",
      href: asset("/projects/gayanara-ecommerce/"), image: asset("/assets/img/gayanara/gayanara-dashboard-preview.png"),
      color: "var(--color-tomato)", ink: "dark",
    },
    {
      slug: "deepp", featured: true, kind: "learning", title: "Kickstarter Projects DEEPP",
      meta: { en: "RevoU · 2024", id: "RevoU · 2024" },
      summary: { en: "Analyzed 375K+ Kickstarter campaigns (2009 to 2017) for the traits behind successful launches: exploratory analysis in Python, a live Tableau dashboard and investor-facing recommendations.", id: "Menganalisis 375K+ kampanye Kickstarter (2009 sampai 2017) untuk menemukan ciri peluncuran yang sukses: eksplorasi data dengan Python, dashboard Tableau, dan rekomendasi untuk investor." },
      result: { en: "375K+ campaigns analyzed", id: "375K+ kampanye dianalisis" },
      tags: ["Data"], stack: "Python · Google Colab · Tableau",
      href: asset("/projects/deepp-kickstarter/"), image: asset("/assets/img/deepp-dashboard-preview.png"),
      color: "var(--color-grape)", ink: "light",
    },
  ] as Project[],
};

/* ---------------- tech stack ---------------- */
export const stack = {
  label: { en: "what's in my toolbox", id: "isi kotak perkakas saya" },
  title: { en: "Tech stack", id: "Teknologi" },
  groups: [
    { name: { en: "Backend", id: "Backend" }, color: "var(--color-sun)", items: ["Go", "PHP · Laravel", "PostgreSQL", "MySQL", "REST APIs"] },
    { name: { en: "Frontend", id: "Frontend" }, color: "var(--color-sky)", items: ["Next.js", "React", "JavaScript", "TypeScript", "Tailwind CSS", "PWA"] },
    { name: { en: "Data", id: "Data" }, color: "var(--color-sage)", items: ["SQL", "Python", "Tableau", "DuckDB", "Excel", "Google Colab"] },
    { name: { en: "Platform & tools", id: "Platform & tools" }, color: "var(--color-blush)", items: ["Supabase", "Better Auth", "Cloudflare R2", "Backblaze B2", "Tailscale", "Midtrans", "Git"] },
  ],
};

/* ---------------- experience ---------------- */
export const experience = {
  label: { en: "where i've worked", id: "tempat saya bekerja" },
  title: { en: "Experience", id: "Pengalaman" },
  now: { en: "now", id: "sekarang" },
  jobs: [
    {
      role: "Web Developer", org: "Universitas PGRI Adi Buana Surabaya", from: "Aug 2023", to: null,
      meta: { en: "Full-time · Surabaya, on-site", id: "Full-time · Surabaya, on-site" },
      color: "var(--color-butter)",
      summary: { en: "Engineered and optimized the university's core data layer, API infrastructure and databases, serving 5,000+ active users.", id: "Merancang dan mengoptimalkan data layer inti, infrastruktur API, dan database universitas untuk 5.000+ pengguna aktif." },
      points: [
        { en: "PDDIKTI: built the Neo Feeder Importer, a two-way sync with the government Feeder API that cut manual data entry by 90%.", id: "PDDIKTI: membangun Neo Feeder Importer, sinkronisasi dua arah dengan Feeder API pemerintah yang memangkas input data manual hingga 90%." },
        { en: "SISTER: backend module that syncs lecturer profiles, portfolios and institutional data with the Kemdiktisaintek API.", id: "SISTER: modul backend yang menyinkronkan profil dosen, portofolio, dan data institusi dengan API Kemdiktisaintek." },
        { en: "Unipasby-Services: the internal API gateway in Go (v1 to v2), taking heavy query load off the legacy ERP.", id: "Unipasby-Services: API gateway internal dengan Go (v1 ke v2) yang mengangkat beban query berat dari ERP lama." },
        { en: "Next.js frontends for Student Hub, SI OBE, Keuakad Blast and SIREWARD, including the Qontak WhatsApp notification engine.", id: "Frontend Next.js untuk Student Hub, SI OBE, Keuakad Blast, dan SIREWARD, termasuk mesin notifikasi WhatsApp Qontak." },
        { en: "PostgreSQL indexing and query tuning: up to 40% faster response times.", id: "Indexing dan tuning query PostgreSQL: waktu respons hingga 40% lebih cepat." },
        { en: "Modeled 20+ tables for the government OBE curriculum.", id: "Memodelkan 20+ tabel untuk kurikulum OBE pemerintah." },
      ] as T[],
    },
    {
      role: "Software Developer", org: "Strugg House", from: "Nov 2019", to: null,
      meta: { en: "Freelance · Malang, remote", id: "Freelance · Malang, remote" },
      color: "var(--color-sky)",
      summary: { en: "Software and creative house delivering products end to end for retail and corporate clients.", id: "Software & creative house yang mengerjakan produk dari awal sampai akhir untuk klien retail dan korporat." },
      points: [
        { en: "Low-latency POS transaction engines in Go, handling high-volume retail transaction data.", id: "Mesin transaksi POS berlatensi rendah dengan Go untuk data transaksi retail bervolume tinggi." },
        { en: "Custom client portals: backend services and Next.js frontends for purchasing data and internal dashboards.", id: "Portal klien custom: layanan backend dan frontend Next.js untuk data pembelian dan dashboard internal." },
        { en: "Agile and AI-assisted workflows that cut project completion time by 25%.", id: "Alur kerja agile dan berbantuan AI yang memangkas waktu pengerjaan proyek hingga 25%." },
      ] as T[],
    },
    {
      role: "Mobile Developer (intern)", org: "CV. Birunet Media Komputindo", from: "Jun 2018", to: "Aug 2019",
      meta: { en: "Internship · Malang, hybrid", id: "Magang · Malang, hybrid" },
      color: "var(--color-blush)",
      summary: { en: "Flutter UI work: 20% faster app loading through data-fetching optimization, with zero errors at release.", id: "Pengerjaan UI Flutter: loading aplikasi 20% lebih cepat lewat optimasi pengambilan data, tanpa error saat rilis." },
      points: [] as T[],
    },
  ],
  eduTitle: { en: "Education", id: "Pendidikan" },
  edu: [
    { school: "RevoU", what: { en: "Full-stack Data Analytics · Jan to May 2024 · Grade 90.91", id: "Full-stack Data Analytics · Jan sampai Mei 2024 · Nilai 90,91" } },
    { school: "STIKI Malang", what: { en: "Bachelor of Informatics Engineering · 2016 to 2023", id: "S.Kom. Teknik Informatika · 2016 sampai 2023" } },
  ],
};

/* ---------------- credentials ---------------- */
export type Featured = {
  id: string; kind: T; title: string; subtitle: T; issuer: T; color: string;
  facts: { k: T; v: T }[];
  pages: string[]; thumb: string; pdf: string; verify?: string;
};

const cert = (f: string) => asset(`/certificates/${f}`);

export const credentials = {
  label: { en: "checkable, not just claimed", id: "bisa dicek, bukan sekadar klaim" },
  title: { en: "Credentials", id: "Sertifikat" },
  verify: { en: "Verify", id: "Cek" },
  view: { en: "View certificate", id: "Lihat sertifikat" },
  download: { en: "Download PDF", id: "Unduh PDF" },
  alsoTitle: { en: "Also certified in", id: "Sertifikat lainnya" },
  privacy: { en: "Home addresses on the copyright letters are blurred for privacy.", id: "Alamat rumah pada surat hak cipta disamarkan demi privasi." },
  url: "https://www.linkedin.com/in/renaldy-bilal-setyawan-0462b2286/details/certifications/",
  featured: [
    {
      id: "hki-si-obe", title: "SI OBE Adi Buana", color: "var(--color-grape)",
      kind: { en: "Copyright · computer program", id: "Hak cipta · program komputer" },
      subtitle: { en: "Outcome-Based Education information system", id: "Sistem Informasi Outcome-Based Education" },
      issuer: { en: "DJKI, Ministry of Law of Indonesia", id: "DJKI, Kementerian Hukum RI" },
      facts: [
        { k: { en: "Reg. no.", id: "No. catat" }, v: { en: "000911846", id: "000911846" } },
        { k: { en: "Recorded", id: "Dicatat" }, v: { en: "20 Jun 2025", id: "20 Jun 2025" } },
        { k: { en: "Role", id: "Peran" }, v: { en: "Co-creator", id: "Pencipta bersama" } },
      ],
      pages: [cert("hki-si-obe-1.jpg")], thumb: cert("hki-si-obe-thumb.jpg"), pdf: cert("hki-si-obe.pdf"),
    },
    {
      id: "hki-sispami", title: "SISPAMI Adi Buana", color: "var(--color-cobalt)",
      kind: { en: "Copyright · computer program", id: "Hak cipta · program komputer" },
      subtitle: { en: "Internal quality assurance and audit system (SPMI & AMI)", id: "Sistem penjaminan mutu dan audit mutu internal (SPMI & AMI)" },
      issuer: { en: "DJKI, Ministry of Law of Indonesia", id: "DJKI, Kementerian Hukum RI" },
      facts: [
        { k: { en: "Reg. no.", id: "No. catat" }, v: { en: "000911970", id: "000911970" } },
        { k: { en: "Recorded", id: "Dicatat" }, v: { en: "20 Jun 2025", id: "20 Jun 2025" } },
        { k: { en: "Role", id: "Peran" }, v: { en: "Co-creator", id: "Pencipta bersama" } },
      ],
      pages: [cert("hki-sispami-1.jpg"), cert("hki-sispami-2.jpg")], thumb: cert("hki-sispami-thumb.jpg"), pdf: cert("hki-sispami.pdf"),
    },
    {
      id: "revou-fsda", title: "Full Stack Data Analytics", color: "var(--color-tomato)",
      kind: { en: "Bootcamp · 13 weeks", id: "Bootcamp · 13 minggu" },
      subtitle: { en: "Proficient in all 5 modules: business problems, statistics, SQL, Python and data visualization", id: "Proficient di 5 modul: masalah bisnis, statistika, SQL, Python, dan visualisasi data" },
      issuer: { en: "RevoU", id: "RevoU" },
      facts: [
        { k: { en: "Final grade", id: "Nilai akhir" }, v: { en: "90.91", id: "90,91" } },
        { k: { en: "Issued", id: "Terbit" }, v: { en: "4 May 2024", id: "4 Mei 2024" } },
        { k: { en: "Batch", id: "Angkatan" }, v: { en: "8", id: "8" } },
      ],
      pages: [cert("revou-fsda-1.jpg"), cert("revou-fsda-2.jpg")], thumb: cert("revou-fsda-thumb.jpg"), pdf: cert("revou-fsda.pdf"),
      verify: "https://certificates.revou.co/renaldy-bilal-setyawan-certificate-achievements-facfsda23.pdf",
    },
  ] as Featured[],
  items: [
    { name: "HackerRank SQL (Advanced)", issuer: "HackerRank", date: "Jul 2026", id: "ID 6a055d7ccfd2", short: "SQL", color: "var(--color-sun)" },
    { name: "Suhu SQL", issuer: "Ngulik Data", date: "Jul 2026", id: "ID m2Gv4S60duO6", short: "SQL", color: "var(--color-teal)" },
  ],
};

/* ---------------- contact ---------------- */
export const contact = {
  label: { en: "say hello", id: "sapa saya" },
  title: { en: "Let's talk", id: "Ayo ngobrol" },
  intro: {
    en: "Hiring for data, frontend, backend or fullstack? Need a website or app built? I usually reply within a day.",
    id: "Sedang merekrut untuk data, frontend, backend, atau fullstack? Butuh website atau aplikasi? Biasanya saya membalas dalam sehari.",
  },
  hire: { en: "Hiring? Email me", id: "Merekrut? Email saya" },
  build: { en: "Need something built?", id: "Butuh dibuatkan sesuatu?" },
  postcard: { en: "Greetings from Surabaya", id: "Salam dari Surabaya" },
  to: { en: "To: whoever needs a builder", id: "Untuk: siapa pun yang butuh builder" },
  form: {
    name: { en: "Your name", id: "Nama kamu" },
    email: { en: "Your email", id: "Email kamu" },
    msg: { en: "Your message", id: "Pesan kamu" },
    send: { en: "Send via email", id: "Kirim via email" },
    note: { en: "Opens your email app with the message ready. Nothing is stored.", id: "Membuka aplikasi email dengan pesan siap kirim. Tidak ada yang disimpan." },
  },
};
