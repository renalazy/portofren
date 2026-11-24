"use client";

import { useT } from "@/lib/i18n";
import { asset } from "@/lib/site";
import { Block, CaseHero, CasePage, Closing, NoteGrid, PageCard, Shots, StackList, TwoUp } from "./kit";
import { Rise } from "../paper";

const img = (f: string) => asset(`/assets/img/tumbuu/${f}`);

const questions = [
  { en: "When did she last drink?", id: "Terakhir minum jam berapa, ya?" },
  { en: "Has the medicine been given?", id: "Obatnya sudah diberi belum?" },
  { en: "Which day did the fever start?", id: "Demamnya mulai hari apa?" },
  { en: "What was his last weight?", id: "Berat badannya terakhir berapa?" },
  { en: "What should we ask the doctor?", id: "Apa saja yang perlu ditanyakan ke dokter?" },
  { en: "How long did she sleep?", id: "Tadi tidurnya berapa lama?" },
];

export default function Tumbuu() {
  const t = useT();
  return (
    <CasePage>
      <CaseHero
        color="var(--color-teal)"
        kind={t({ en: "Client project", id: "Proyek klien" })}
        name="Tumbuu"
        subtitle={t({ en: "a parenting tracker, built and launched", id: "pencatat tumbuh kembang anak, dibangun dan diluncurkan" })}
        lead={t({
          en: "Parents get asked the same questions at the worst moments: when did she last drink, has the medicine been given, when did the fever start. Tumbuu lets them log it in seconds and hands it back as clean summaries. I designed, built and launched it for the client, solo and end to end.",
          id: "Orang tua sering ditanya hal yang sama di saat paling repot: terakhir minum jam berapa, obatnya sudah diberi belum, demamnya mulai kapan. Tumbuu membuat mereka bisa mencatat dalam hitungan detik dan mengembalikannya sebagai ringkasan yang rapi. Saya merancang, membangun, dan meluncurkannya untuk klien, sendirian dari awal sampai akhir.",
        })}
        facts={[
          { k: t({ en: "type", id: "jenis" }), v: t({ en: "Client project", id: "Proyek klien" }) },
          { k: t({ en: "team", id: "tim" }), v: t({ en: "Solo, end to end", id: "Solo, dari awal sampai akhir" }) },
          { k: t({ en: "launched", id: "rilis" }), v: t({ en: "July 2026", id: "Juli 2026" }) },
          { k: t({ en: "platform", id: "platform" }), v: t({ en: "Web app + PWA", id: "Web app + PWA" }) },
          { k: t({ en: "model", id: "model" }), v: t({ en: "Free + Premium", id: "Gratis + Premium" }) },
        ]}
        actions={[{ href: "https://temantumbuu.com/", label: t({ en: "Visit temantumbuu.com", id: "Kunjungi temantumbuu.com" }), primary: true }]}
        tags={["Frontend", "Backend", "Fullstack"]}
        image={{ src: img("landing-mobile.png"), alt: "Tumbuu landing page on a phone", phone: true }}
      />

      <Block label={t({ en: "the landing page", id: "landing page" })} title={t({ en: "What parents see first", id: "Yang pertama dilihat orang tua" })}>
        <Shots
          desktop={{ src: img("landing-desktop.png"), alt: "Tumbuu landing page on desktop: headline, call to action and an app preview card with sample data", caption: t({ en: "Desktop, 1440px. The preview card uses made-up sample data.", id: "Desktop, 1440px. Kartu pratinjau memakai data contoh fiktif." }) }}
        />
      </Block>

      <Block tint label={t({ en: "the problem", id: "masalahnya" })} title={t({ en: "Questions that come up at the busiest moments", id: "Pertanyaan yang muncul saat paling repot" })}>
        <ul className="flex flex-wrap gap-4">
          {questions.map((q, i) => (
            <li key={i}>
              <Rise delay={i * 0.05}>
                <span className={`inline-block border-2 border-ink bg-white px-4 py-2.5 font-hand text-2xl text-ink shadow-[3px_3px_0_var(--color-ink)] ${i % 2 ? "rotate-1" : "-rotate-1"}`}>
                  “{t(q)}”
                </span>
              </Rise>
            </li>
          ))}
        </ul>
        <Rise className="mt-10 max-w-3xl">
          <p className="text-lg leading-relaxed text-ink-soft">
            {t({
              en: "The answers usually end up scattered: some in a parent's head, some in a chat with their partner, the rest on paper or in the photo gallery. Tumbuu collects them in one place, without making parents do the work twice.",
              id: "Jawabannya biasanya berserakan: sebagian di kepala, sebagian di chat pasangan, sisanya di kertas atau galeri foto. Tumbuu mengumpulkannya jadi satu, tanpa membuat orang tua kerja dua kali.",
            })}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            {t({ en: "The design principle: ", id: "Prinsip desainnya: " })}
            <b className="marker is-in font-semibold text-ink">{t({ en: "log only what you can", id: "catat seperlunya" })}</b>
            {t({ en: ". Whatever gets logged is already enough to help later.", id: ". Yang sempat dicatat saja sudah cukup untuk menolong nanti." })}
          </p>
        </Rise>
      </Block>

      <Block label={t({ en: "features", id: "fitur" })} title={t({ en: "Four things Tumbuu looks after", id: "Empat hal yang Tumbuu jaga" })}>
        <NoteGrid items={[
          { title: t({ en: "Daily care", id: "Keseharian" }), body: t({ en: "Breastfeeding, bottle milk, meals, sleep, diapers, temperature and quick notes, saved in seconds with the time pre-filled and editable.", id: "Menyusui, susu botol, makan, tidur, popok, suhu, dan catatan singkat, tersimpan dalam hitungan detik dengan waktu yang otomatis terisi dan bisa diubah." }) },
          { title: t({ en: "Growth", id: "Pertumbuhan" }), body: t({ en: "Weight, height and head circumference as a history, plus a development checklist that follows Indonesia's Buku KIA, with the date each milestone was reached.", id: "Berat, tinggi, dan lingkar kepala tersimpan sebagai riwayat, plus ceklis perkembangan mengikuti Buku KIA lengkap dengan tanggal pencapaiannya." }) },
          { title: t({ en: "Health", id: "Kesehatan" }), body: t({ en: "Illness records with symptoms, temperature, medicine and dosing history, doctor visits, costs and immunizations. Document attachments on Premium.", id: "Catatan sakit dengan gejala, suhu, obat dan riwayat pemberiannya, kunjungan, biaya, dan imunisasi. Lampiran dokumen di Premium." }) },
          { title: t({ en: "Moments", id: "Momen" }), body: t({ en: "Unlimited stories, with up to 5 photos on the free plan.", id: "Cerita tanpa batas, dengan hingga 5 foto di paket gratis." }) },
        ]} />
      </Block>

      <Block tint label={t({ en: "product decisions", id: "keputusan produk" })} title={t({ en: "Decisions built into the product", id: "Keputusan di balik produknya" })}>
        <TwoUp>
          <PageCard rotate={-0.6} title={t({ en: "Trust & privacy", id: "Kepercayaan & privasi" })} items={[
            { b: t({ en: "No guessing", id: "Tanpa tebakan" }), text: t({ en: "Every summary is computed only from what the parent logged. Tumbuu doesn't diagnose or replace a health professional, and says so on every page.", id: "Setiap ringkasan dihitung hanya dari yang dicatat orang tua. Tumbuu tidak memberi diagnosis atau menggantikan tenaga kesehatan, dan menyatakannya di setiap halaman." }) },
            { b: t({ en: "Private by default", id: "Privat sejak awal" }), text: t({ en: "Records open only through the parent's account, and photos are stored privately, never behind public links.", id: "Catatan hanya bisa dibuka lewat akun orang tua, dan foto disimpan privat, tidak pernah lewat tautan publik." }) },
            { b: t({ en: "Location data stripped", id: "Data lokasi dihapus" }), text: t({ en: "Photo location data is removed on the device, before upload.", id: "Data lokasi pada foto dihapus di perangkat, sebelum diunggah." }) },
            { b: t({ en: "Admin off the public internet", id: "Admin tidak terbuka di internet publik" }), text: t({ en: "Internal tools are reachable only over a private Tailscale network, so there is no public admin login to probe.", id: "Tools internal hanya bisa diakses lewat jaringan privat Tailscale, jadi tidak ada halaman login admin publik yang bisa dicoba-coba." }) },
            { b: t({ en: "No ads, no selling family data", id: "Tanpa iklan, tanpa menjual data keluarga" }), text: t({ en: "Stated up front, right next to the sign-up button.", id: "Dinyatakan jelas, tepat di samping tombol daftar." }) },
          ]} />
          <PageCard rotate={0.6} title={t({ en: "Business model", id: "Model bisnis" })} items={[
            { b: t({ en: "Free for one child", id: "Gratis untuk satu anak" }), text: t({ en: "Includes a basic daily summary. Useful on its own, not a trial.", id: "Termasuk ringkasan harian dasar. Berguna sendiri, bukan sekadar uji coba." }) },
            { b: t({ en: "Premium tier", id: "Paket Premium" }), text: t({ en: "Adds handover and doctor-consultation summaries, PDF reports and document attachments.", id: "Menambah ringkasan serah terima dan konsultasi dokter, laporan PDF, dan lampiran dokumen." }) },
            { b: t({ en: "Shared caregiving", id: "Berbagi pengasuhan" }), text: t({ en: "Invite up to 4 extra caregivers with their own accounts. Each can only edit what they logged, and access can be revoked anytime.", id: "Undang hingga 4 pengasuh tambahan dengan akun masing-masing. Setiap pengasuh hanya bisa mengubah catatannya sendiri, dan akses bisa dicabut kapan saja." }) },
            { b: t({ en: "Local payments", id: "Pembayaran lokal" }), text: t({ en: "Handled through Midtrans, with a published refund policy.", id: "Diproses lewat Midtrans, dengan kebijakan pengembalian dana yang dipublikasikan." }) },
          ]} />
        </TwoUp>
      </Block>

      <Block label={t({ en: "under the hood", id: "di balik layar" })} title={t({ en: "The stack", id: "Teknologi yang dipakai" })}
        intro={t({ en: "End to end: interface, API, database, storage, payments and backups.", id: "Dari ujung ke ujung: antarmuka, API, database, penyimpanan, pembayaran, dan backup." })}>
        <StackList head={[t({ en: "Layer", id: "Lapisan" }), t({ en: "Technology", id: "Teknologi" }), t({ en: "What it does", id: "Fungsinya" })]} rows={[
          { layer: t({ en: "App & API", id: "Aplikasi & API" }), tech: "Next.js", what: t({ en: "Landing pages, the logged-in app and the server-side API in one codebase, installable as a PWA.", id: "Landing page, aplikasi setelah login, dan API server dalam satu codebase, bisa dipasang sebagai PWA." }) },
          { layer: "Database", tech: "PostgreSQL", what: t({ en: "Children, caregivers, daily logs, growth, health records and subscriptions.", id: "Data anak, pengasuh, catatan harian, pertumbuhan, kesehatan, dan langganan." }) },
          { layer: t({ en: "Authentication", id: "Autentikasi" }), tech: "Better Auth", what: t({ en: "Email and password sign-up and login, password reset, per-caregiver accounts.", id: "Daftar dan masuk dengan email dan kata sandi, reset kata sandi, akun per pengasuh." }) },
          { layer: t({ en: "File storage", id: "Penyimpanan file" }), tech: "Cloudflare R2", what: t({ en: "Private storage for photos and documents.", id: "Penyimpanan privat untuk foto dan dokumen." }) },
          { layer: "Backup", tech: "Backblaze B2", what: t({ en: "Off-site database backups.", id: "Backup database di luar server utama." }) },
          { layer: t({ en: "Admin access", id: "Akses admin" }), tech: "Tailscale", what: t({ en: "Internal admin tools on a private network, not exposed publicly.", id: "Tools admin internal di jaringan privat, tidak terbuka untuk publik." }) },
          { layer: t({ en: "Payments", id: "Pembayaran" }), tech: "Midtrans", what: t({ en: "Premium subscriptions with Indonesian payment methods.", id: "Langganan Premium dengan metode pembayaran Indonesia." }) },
        ]} />
      </Block>

      <Block tint label={t({ en: "the gate", id: "gerbangnya" })} title={t({ en: "Behind the login", id: "Di balik login" })}
        intro={t({ en: "The app holds real family records, so only the parents' entrance is shown. The internal admin side sits on a private network and isn't public at all.", id: "Aplikasinya menyimpan catatan keluarga sungguhan, jadi hanya pintu masuk orang tua yang ditampilkan. Sisi admin internal berada di jaringan privat dan sama sekali tidak publik." })}>
        <Shots
          desktop={{ src: img("login-desktop.png"), alt: "Tumbuu login page on desktop" }}
          phone={{ src: img("login-mobile.png"), alt: "Tumbuu login page on a phone" }}
        />
      </Block>

      <Closing
        actions={[
          { href: "https://temantumbuu.com/", label: t({ en: "Live site", id: "Situs live" }), primary: true },
          { href: "https://temantumbuu.com/install", label: t({ en: "Install as app", id: "Pasang sebagai aplikasi" }) },
          { href: "https://temantumbuu.com/privacy", label: t({ en: "Privacy", id: "Privasi" }) },
          { href: "https://temantumbuu.com/security", label: t({ en: "Data security", id: "Keamanan data" }) },
          { href: `${asset("/")}#contact`, label: t({ en: "Need an app like this?", id: "Butuh aplikasi seperti ini?" }) },
        ]}
        note={t({ en: "Screenshots captured from the public site in September 2026.", id: "Screenshot diambil dari situs publik pada September 2026." })}
      />
    </CasePage>
  );
}
