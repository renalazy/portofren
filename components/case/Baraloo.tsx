"use client";

import { useT } from "@/lib/i18n";
import { asset } from "@/lib/site";
import { Block, CaseHero, CasePage, Closing, NoteGrid, PageCard, Shot, Shots, StackList, TwoUp } from "./kit";

const img = (f: string) => asset(`/assets/img/baraloo/${f}`);

export default function Baraloo() {
  const t = useT();
  return (
    <CasePage>
      <CaseHero
        color="var(--color-cobalt)"
        kind={t({ en: "Client project", id: "Proyek klien" })}
        name="Baraloo"
        subtitle={t({ en: "an online store for baby food in Surabaya", id: "toko online MPASI di Surabaya" })}
        lead={t({
          en: "A Surabaya reseller of Petite Plates MPASI (home-made baby food) needed an online store. I built a storefront where parents can see exactly what each product is (serving, storage, producer) and order in a few taps, plus an admin panel the team installs on their phones as an app (PWA) to run the shop.",
          id: "Reseller MPASI Petite Plates di Surabaya membutuhkan toko online. Saya membangun toko tempat orang tua bisa melihat jelas setiap produk (cara penyajian, penyimpanan, produsen) dan memesan dalam beberapa ketukan, plus admin panel yang dipasang tim di HP sebagai aplikasi (PWA) untuk mengelola toko.",
        })}
        facts={[
          { k: t({ en: "type", id: "jenis" }), v: t({ en: "Client commission", id: "Komisi klien" }) },
          { k: t({ en: "team", id: "tim" }), v: t({ en: "Solo, end to end", id: "Solo, dari awal sampai akhir" }) },
          { k: t({ en: "launched", id: "rilis" }), v: t({ en: "20 Sep 2026", id: "20 Sep 2026" }) },
          { k: t({ en: "catalogue", id: "katalog" }), v: t({ en: "31 products · 5 categories", id: "31 produk · 5 kategori" }) },
          { k: t({ en: "delivery", id: "pengiriman" }), v: t({ en: "Surabaya area", id: "Area Surabaya" }) },
        ]}
        actions={[{ href: "https://baraloo.com/", label: t({ en: "Visit baraloo.com", id: "Kunjungi baraloo.com" }), primary: true }]}
        tags={["Frontend", "Backend", "Fullstack"]}
        image={{ src: img("storefront-mobile.png"), alt: "Baraloo home page on a phone", phone: true }}
      />

      <Block label={t({ en: "the storefront", id: "etalase" })} title={t({ en: "What shoppers see first", id: "Yang pertama dilihat pembeli" })}>
        <Shots desktop={{ src: img("storefront-desktop.png"), alt: "Baraloo home page on desktop: headline, call to action, illustration and store stats", caption: t({ en: "Desktop, 1440px.", id: "Desktop, 1440px." }) }} />
      </Block>

      <Block tint label={t({ en: "the brief", id: "brief" })} title={t({ en: "What the store had to do", id: "Yang harus dilakukan toko ini" })}>
        <TwoUp>
          <PageCard rotate={-0.6} title={t({ en: "For shoppers", id: "Untuk pembeli" })} items={[
            { b: t({ en: "Browse without asking", id: "Belanja tanpa bertanya" }), text: t({ en: "31 products in 5 categories, with price and stock status shown up front.", id: "31 produk dalam 5 kategori, dengan harga dan status stok langsung terlihat." }) },
            { b: t({ en: "No guesswork", id: "Tanpa tebak-tebakan" }), text: t({ en: "Every product states serving method and storage, plus producer and halal certification.", id: "Setiap produk mencantumkan cara penyajian dan penyimpanan, plus produsen dan sertifikasi halal." }) },
            { b: t({ en: "Order in a few taps", id: "Pesan dalam beberapa ketukan" }), text: t({ en: "Cart and checkout, confirmed over WhatsApp, delivered in Surabaya.", id: "Keranjang dan checkout, dikonfirmasi lewat WhatsApp, diantar di Surabaya." }) },
          ]} />
          <PageCard rotate={0.6} title={t({ en: "For the client", id: "Untuk klien" })} items={[
            { b: t({ en: "Run the shop from a phone", id: "Kelola toko dari HP" }), text: t({ en: "The admin panel is a PWA the team installs on their phones to manage products and orders. It stays off the public internet and is reachable only over a private Tailscale network.", id: "Admin panel berupa PWA yang dipasang tim di HP untuk mengelola produk dan pesanan. Tidak terbuka di internet publik dan hanya bisa diakses lewat jaringan privat Tailscale." }) },
            { b: t({ en: "Policies answered up front", id: "Kebijakan terjawab di depan" }), text: t({ en: "Ordering, payment, delivery and returns pages that customers can read on their own.", id: "Halaman cara pesan, pembayaran, pengiriman, dan pengembalian yang bisa dibaca pelanggan sendiri." }) },
            { b: t({ en: "Responsive storefront", id: "Etalase responsif" }), text: t({ en: "A regular website that adapts from desktop down to a phone in one hand. Nothing for shoppers to install.", id: "Website biasa yang menyesuaikan dari desktop hingga HP di satu tangan. Pembeli tidak perlu memasang apa pun." }) },
          ]} />
        </TwoUp>
      </Block>

      <Block label={t({ en: "features", id: "fitur" })} title={t({ en: "What I built", id: "Yang saya bangun" })}>
        <NoteGrid items={[
          { title: t({ en: "Catalogue", id: "Katalog" }), body: t({ en: "Categories for beef, chicken, fish & fillet, broth and dried goods, with stock labels like “limited” and “sold out”.", id: "Kategori olahan sapi, ayam, ikan & fillet, kaldu, dan produk kering, dengan label stok seperti “terbatas” dan “habis”." }) },
          { title: t({ en: "Product pages", id: "Halaman produk" }), body: t({ en: "Serving and storage info, quantity picker, add to cart, producer details and halal certificate number.", id: "Info penyajian dan penyimpanan, pilihan jumlah, tambah ke keranjang, detail produsen, dan nomor sertifikat halal." }) },
          { title: t({ en: "Ordering", id: "Pemesanan" }), body: t({ en: "A cart and checkout that hands the order to WhatsApp for confirmation, the channel the client's customers already use.", id: "Keranjang dan checkout yang meneruskan pesanan ke WhatsApp untuk dikonfirmasi, kanal yang sudah dipakai pelanggan klien." }) },
          { title: t({ en: "Store policies", id: "Kebijakan toko" }), body: t({ en: "How to order, payment, delivery, returns, product disclaimer, privacy and terms, so customers get answers without asking.", id: "Cara pesan, pembayaran, pengiriman, pengembalian, disclaimer produk, privasi, dan ketentuan, jadi pelanggan dapat jawaban tanpa bertanya." }) },
        ]} />
      </Block>

      <Block tint label={t({ en: "the shop floor", id: "lantai toko" })} title={t({ en: "Catalogue and product page", id: "Katalog dan halaman produk" })}>
        <TwoUp>
          <Shot rotate={-1} src={img("catalog-desktop.png")} alt="Baraloo product catalogue page" caption={t({ en: "Catalogue.", id: "Katalog." })} />
          <Shot rotate={1} src={img("product-desktop.png")} alt="Baraloo product page for tuna fillet with serving, storage, price and add-to-cart" caption={t({ en: "Product detail with serving and storage info.", id: "Detail produk dengan info penyajian dan penyimpanan." })} />
        </TwoUp>
      </Block>

      <Block label={t({ en: "under the hood", id: "di balik layar" })} title={t({ en: "The stack", id: "Teknologi yang dipakai" })}
        intro={t({ en: "Storefront, admin and data layer, all built by me end to end.", id: "Etalase, admin, dan lapisan data, semuanya saya bangun dari ujung ke ujung." })}>
        <StackList head={[t({ en: "Layer", id: "Lapisan" }), t({ en: "Technology", id: "Teknologi" }), t({ en: "What it does", id: "Fungsinya" })]} rows={[
          { layer: t({ en: "Storefront & API", id: "Etalase & API" }), tech: "Next.js", what: t({ en: "Catalogue, product pages, cart and checkout, rendered fast for phones, with the server-side API in the same codebase.", id: "Katalog, halaman produk, keranjang, dan checkout yang cepat di HP, dengan API server dalam satu codebase." }) },
          { layer: "Database", tech: "Supabase", what: t({ en: "PostgreSQL for products, categories, stock status and orders.", id: "PostgreSQL untuk produk, kategori, status stok, dan pesanan." }) },
          { layer: t({ en: "Authentication", id: "Autentikasi" }), tech: "Supabase Auth", what: t({ en: "Sign-in for the client's staff on the admin panel.", id: "Login untuk staf klien di admin panel." }) },
          { layer: t({ en: "Admin app", id: "Aplikasi admin" }), tech: "PWA", what: t({ en: "The admin panel installs on staff phones like a native app, with its own home-screen icon.", id: "Admin panel bisa dipasang di HP staf seperti aplikasi native, lengkap dengan ikon di layar utama." }) },
          { layer: t({ en: "Admin access", id: "Akses admin" }), tech: "Tailscale", what: t({ en: "The admin panel lives on a private network: no public login page to find or attack.", id: "Admin panel berada di jaringan privat: tidak ada halaman login publik yang bisa ditemukan atau diserang." }) },
          { layer: t({ en: "Order handoff", id: "Penerusan pesanan" }), tech: "WhatsApp", what: t({ en: "Checkout passes the order to WhatsApp for confirmation, the channel the client's customers already use.", id: "Checkout meneruskan pesanan ke WhatsApp untuk dikonfirmasi, kanal yang sudah dipakai pelanggan klien." }) },
        ]} />
      </Block>

      <Closing
        actions={[
          { href: "https://baraloo.com/", label: t({ en: "Live store", id: "Toko live" }), primary: true },
          { href: "https://baraloo.com/produk", label: t({ en: "All products", id: "Semua produk" }) },
          { href: "https://baraloo.com/cara-pesan", label: t({ en: "How to order", id: "Cara pesan" }) },
          { href: `${asset("/")}#contact`, label: t({ en: "Need a store like this?", id: "Butuh toko seperti ini?" }) },
        ]}
        note={t({ en: "Screenshots captured from the public store in September 2026. The admin panel sits on a private network, so it isn't shown.", id: "Screenshot diambil dari toko publik pada September 2026. Admin panel berada di jaringan privat, jadi tidak ditampilkan." })}
      />
    </CasePage>
  );
}
