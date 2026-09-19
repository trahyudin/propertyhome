# LAPORAN AKHIR KERJA PRAKTIK (KP)

## Estatewerks — Website & Platform Digital Spesialis Properti

> Dokumen ini menggabungkan **dokumentasi teknis** dan **laporan akhir**. Bagian "Cara Kerja Web"
> sengaja tidak dimasukkan di sini karena dibahas pada dokumen terpisah.
> Isi placeholder bertanda `[[IKUTI_NAMA]]` sebelum diserahkan (daftar lengkap: `dokumentasi/README.md`).

| Item | Keterangan |
| --- | --- |
| Nama Mahasiswa | [[NAMA_MAHASISWA]] |
| NIM / Kelas | [[NIM_KELAS]] |
| Program Studi | [[PROGRAM_STUDI]] |
| Perusahaan / Divisi | [[NAMA_PERUSAHAAN]] — [[DIVISI]] |
| Periode KP | [[TANGGAL_MULAI]] s.d. [[TANGGAL_SELESAI]] |
| Pembimbing Lapangan | [[PEMBIMBING_LAPANGAN]] |
| Dosen Pembimbing | [[DOSEN_PEMBIMBING]] |
| Produk yang dikerjakan | **Estatewerks** — generator Perchance `property-12` |
| URL produk | https://perchance.org/property-12 |
| Repositori / sumber kode | `main.pjs`, `index.html`, `src/` (lihat `src/README.md`) |
| Versi dokumen | 1.0 — [[TANGGAL_DOKUMEN]] |

---

# 1. Laporan Ringkas / Executive Summary

## 1.1 Latar Belakang Project

Industri properti (developer, kantor broker, dan agen independen) menjual produk bernilai tinggi
tetapi sering bergantung pada **brosur fisik, katalog PDF, dan tautan WhatsApp yang tidak terukur**.
Akibatnya: biaya akuisisi lead mahal, performa iklan tidak bisa dilacak, dan calon pembeli tidak
mendapat pengalaman digital yang setara dengan nilai properti yang ditawarkan.

Selama masa KP, dikembangkan **Estatewerks**: sebuah *landing page* penjualan jasa/template website
properti **plus** sekumpulan situs properti jadi (portofolio demo) yang menjadi bukti kompetensi
sekaligus katalog produk. Produk inti berfungsi sebagai "mesin penjualan" yang menjelaskan 4 pilar
nilai, 3 tingkat paket solusi, 5 widget interaktif, 3 studi kasus, 15 contoh project nyata, tabel
harga, FAQ, dan kanal konversi (form konsultasi + deep-link WhatsApp) — seluruhnya **bilingual
(ID/EN)** dan **dual-theme (light/dark)**.

## 1.2 Tujuan & Problem Statement yang Diselesaikan

| Masalah | Solusi yang dibangun | Bukti |
| --- | --- | --- |
| Prospek tidak memahami nilai/lingkup layanan karena materi penawaran tersebar | Struktur naratif satu halaman: Pilar → Solusi per skala → Widget → Studi Kasus → Portofolio → Harga → FAQ → Kontak | 9 section bernavigasi (`#top`, `#keuntungan`, `#solusi`, `#widgets`, `#case`, `#portfolio`, `#harga`, `#faq`, `#kontak`) |
| Sulit menunjukkan *track record* secara kredibel | Galeri 15 project live dengan screenshot, kategori, tech stack, dan tombol demo | `data.js` → `PORTFOLIO` (15 entri, semua `liveUrl` https) |
| Konversi lambat: pengunjung harus mencari kontak manual | Deep-link WhatsApp di navbar, hero, bar mengapung, dan form konsultasi dengan status konfirmasi | 5 tautan `wa.me` aktif, form tervalidasi |
| Audiens lokal vs internasional tidak terlayani | Sistem i18n dua bahasa dengan harga Rupiah (ID) dan USD (EN) | `i18n.js` (`dict.id` / `dict.en`), persistensi `localStorage["ew.lang"]` |
| Pengalaman visual terasa "template murah" | Design system warm-minimalism arsitektural: tipografi Playfair Display + Plus Jakarta Sans, palet warm sand/terracotta, animasi halus | `tailwind-config.js`, `styles.css`, `animeFx.js` |

## 1.3 Scope (Batasan) Fitur Selama KP

**Termasuk dalam scope (dikerjakan):**

1. Landing page penjualan bilingual + dark/light mode (produk utama).
2. 9 section fungsional dengan animasi masuk (reveal), kartu hover (blend composition), dan *ambient motion*.
3. Library 15 kartu portofolio berisi tautan demo ke situs properti yang sudah dideploy.
4. Kalkulator KPR/mortgage *interaktif* sudah tercantum sebagai widget produk (lihat catatan pada §8.2).
5. Form konsultasi dengan validasi email sisi klien dan pesan konfirmasi.
6. Deep-link WhatsApp (bar mengapung + CTA).
7. Pipeline build (esbuild-wasm) yang menggabungkan semua modul React menjadi satu bundle ESM.
8. Aksesibilitas dasar: `aria-*`, navigasi keyboard pada tombol, serta penghormatan `prefers-reduced-motion`.

**Di luar scope (tidak dikerjakan / diserahkan ke tim lain):**

- Backend, database, autentikasi, dan pengiriman email (form masih client-side only).
- CMS/panel admin pengelolaan listing.
- Payment gateway, billing, dan dashboard klien.
- Multi-halaman / routing (produk ini satu halaman dengan navigasi anchor).
- Analitik (Google Analytics/Meta Pixel) — hanya tercantum sebagai layanan add-on, belum dipasang.

## 1.4 Ringkasan Hasil

| Indikator | Hasil |
| --- | --- |
| Section fungsional | 9 (termasuk navbar, footer, WhatsApp bar) |
| Komponen React aktif | 11 komponen (`Navbar`, `Hero`, `Pillars`, `Solutions`, `Widgets`, `CaseStudies`, `Portfolio`, `Pricing`, `Faq`, `Footer`, `WhatsAppBar`) + 2 utilitas (`Reveal`, `HoverCard`/`Stagger`) |
| Dukungan bahasa & tema | 2 bahasa (ID/EN) × 2 tema (light/dark), persisten |
| Proyek demo terhubung | 15 situs live |
| Verifikasi tautan demo | 15/15 URL merespons **HTTP 200** saat penyusunan dokumen |
| Ukuran bundle produksi | 88,8 KB (`src/realestate.bundle.js`, hasil build esbuild) |
| Total berkas sumber | 32 berkas, 244,5 KB di `src/` |
| Waktu muat terukur | `DOMContentLoaded` ≈ 402 ms, `load` ≈ 403 ms (preview desktop, warm cache) |
| Pengujian | 12 skenario otomatis/terarah: 11 **PASS**, 1 **temuan lingkungan** (throttling animasi saat tab tidak aktif — lihat §7.5) |
| Error konsol | 0 error; 1 peringatan pihak ketiga (Tailwind Play CDN) |

---

# 2. Daftar Project & Modul

## 2.1 Project yang Digarap

| # | Project | Jenis | Teknologi | Status |
| --- | --- | --- | --- | --- |
| 1 | **Estatewerks — Sales Landing Page** | Produk utama (marketing/sales site) | React 18 + Tailwind (CDN) + framer-motion + anime.js + Lenis, dibundel dengan esbuild-wasm | Live di `https://perchance.org/property-12` |
| 2 | **Portofolio situs properti (15 unit)** | Produk turunan/katalog demo per klien | Vite + React + Tailwind CSS, dideploy ke Vercel | Live (lihat §2.3) |
| 3 | **Pipeline build bundler** | Infrastruktur internal | esbuild-wasm 0.21.5 (browser/worker), ESM single-file output | Dipakai setiap rilis |
| 4 | **Sistem animasi internal (`animeFx.js`)** | Library internal | anime.js v4 (stagger, composition `blend`/`none`) | Dipakai lintas section |

## 2.2 Modul Fitur Produk Utama

| Modul | Berkas | Fungsi utama |
| --- | --- | --- |
| Bootstrapping aplikasi | `index.html`, `src/main.jsx` | Script anti-*flash* tema (pra-paint), favicon dinamis, mount React ke `#root`, inisialisasi Lenis smooth scroll, *watchdog* `forceReveal` (2,5 s & 6 s) agar tidak ada elemen tertinggal transparan |
| Navbar | `src/components/Navbar.jsx` | Logo & brand, 6 menu anchor, CTA "Dapatkan Template", toggle ID/EN, toggle tema, menu hamburger (mobile) dengan animasi tinggi |
| Hero | `src/components/Hero.jsx` | Badge posisi produk, headline, deskripsi, 3 trust badge, 2 CTA, mockup browser + telepon, blob *aurora* + partikel *ambient*, CTA magnetis mengikuti kursor |
| 4 Pilar Nilai | `src/components/Pillars.jsx` | Menjelaskan 4 pilar (Branding & Trust, Marketing & Lead Gen, Visibility & SEO, Listing & Sales Productivity) dengan tag teknis |
| Solusi per Skala | `src/components/Solutions.jsx` | Tab switcher 3 tingkat (Solo Top-Agent / Agency & Brokerage Hub / Developer Masterplan Suite) berisi harga, audiens, fokus, dan tabel fitur |
| Widget Interaktif | `src/components/Widgets.jsx` | Katalog 5 modul siap pakai: Interactive Floor Plan Viewer, KPR/Mortgage Calculator, WhatsApp Schedule Viewing, Google Maps & Nearby Explorer, E-Brochure & Price List Gate |
| Studi Kasus | `src/components/CaseStudies.jsx` | 3 kartu format Tantangan → Solusi → Hasil (mis. +180% registrasi NUP) |
| Portofolio | `src/components/Portfolio.jsx` | Grid 15 project live + filter kategori (Semua / Luxury Villa / Urban Penthouse / Eco Resort) + tombol demo |
| Harga & Add-on | `src/components/Pricing.jsx` | 3 paket (Solo Agent, Agency Hub, Developer Enterprise), 4 add-on, band garansi instalasi & onboarding |
| FAQ | `src/components/Faq.jsx` | Accordion 5 pertanyaan (integrasi WhatsApp/CRM, update listing, hosting/domain, bantuan setup, kepemilikan source code) |
| Footer & Konversi | `src/components/Footer.jsx` | Blok CTA konsultasi, form email tervalidasi + pesan konfirmasi "…dalam 24 jam", kolom Template/Dukungan, tombol kembali ke atas |
| WhatsApp Bar | `src/components/WhatsAppBar.jsx` | Tombol mengapung `wa.me` untuk konsultasi instan |
| Reveal (util) | `src/components/Reveal.jsx` | Wrapper animasi `whileInView` (opacity/y) yang dapat dipakai ulang |
| i18n & tema | `src/i18n.js` | React Context `LangContext`/`useLang`: `lang`, `theme`, `toggleLang`, `toggleTheme`, dan kamus `t` lengkap 2 bahasa |
| Sumber data | `src/data.js` | Seluruh konten terstruktur (lihat §4.2) + helper `L(id, en)` untuk teks bilingual |
| Library bersama | `src/libs.js` | Re-export tunggal React, framer-motion, anime.js, embla, lucide (mencegah duplikasi instance React) |
| Sistem animasi | `src/animeFx.js` | `useStaggerReveal`/`Stagger`, `useBlendHover`/`HoverCard`, `useFloat`, `useMagnetic` |
| Utilitas scroll | `src/scroll.js` | `goTo(selector, offset)` yang memakai Lenis bila tersedia (fallback `scrollIntoView`) |
| Gaya & token | `src/styles.css`, `src/tailwind-config.js` | Font Google, token warna brand, keyframes (ken-burns, pulse-dot), konfigurasi Tailwind (`darkMode: "class"`) |

> **Catatan kebersihan kode (temuan teknis, lihat §8.1):** beberapa modul lama masih tersimpan di
> `src/components/` namun **tidak lagi di-render** oleh `main.jsx` (mis. `Collection.jsx`, `Contact.jsx`,
> `Calculator.jsx`, `Amenities.jsx`, `Philosophy.jsx`, `ProjectShowcase.jsx`, `Spotlight.jsx`,
> `Testimonials.jsx`), bersama sebagian data warisan pada `data.js`.

## 2.3 Inventaris Project Demo (Portofolio)

| # | Nama Project | Kategori | Tech stack (label di UI) | URL demo |
| --- | --- | --- | --- | --- |
| 1 | Solara Estates | Luxury Villa | Vite + React, Tailwind CSS, Editorial Serif | https://solara-estates-56wi.vercel.app/ |
| 2 | AUREA | Urban Penthouse | Vite + React, Tailwind CSS, Dark Cinematic | https://aurea-wheat-iota.vercel.app/ |
| 3 | VALA ESTATES | Eco Resort | Vite + React, Tailwind CSS, Warm Minimal | https://vala-ten.vercel.app/ |
| 4 | VANDEN | Luxury Villa | Vite + React, Tailwind CSS, Editorial Serif | https://vanden-one.vercel.app/ |
| 5 | AETHERIA | Urban Penthouse | Vite + React, Tailwind CSS, Modernist | https://pertiti.vercel.app/ |
| 6 | AURAIA | Luxury Villa | Vite + React, Tailwind CSS, Serif Editorial | https://protx1.vercel.app/ |
| 7 | VÆLOR | Urban Penthouse | Vite + React, Tailwind CSS, Cinematic Dark | https://prottx2.vercel.app/ |
| 8 | ARKHĒ | Luxury Villa | Vite + React, Tailwind CSS, Editorial | https://prottx3.vercel.app/ |
| 9 | VALO | Luxury Villa | Vite + React, Tailwind CSS, Light Minimal | https://proppp1.vercel.app/ |
| 10 | AUREXIS | Urban Penthouse | Vite + React, Tailwind CSS, Dark Cinematic | https://poppp2.vercel.app/ |
| 11 | VELARIS | Luxury Villa | Vite + React, Tailwind CSS, Cinematic | https://proppp3.vercel.app/ |
| 12 | Atelier Vesta | Luxury Villa | Vite + React, Tailwind CSS, Atelier Serif | https://proppp4.vercel.app/ |
| 13 | VÉLUM | Urban Penthouse | Vite + React, Tailwind CSS, Dark Minimal | https://proppp5.vercel.app/ |
| 14 | AETHERIA · Sanctuaries | Luxury Villa | Vite + React, Tailwind CSS, Serif Editorial | https://proppp6.vercel.app/ |
| 15 | AETHERIA · Estate | Eco Resort | Vite + React, Tailwind CSS, Bright Minimal | https://propp7.vercel.app/ |

[[ISI_PERAN_ANDA_PER_PROJECT]] — cantumkan peran Anda pada tiap situs (mis. desain + implementasi
front-end penuh, atau hanya bagian tertentu) agar laporan tidak dinilai terlalu umum.

## 2.4 Modul Pendukung (Tooling)

| Modul | Lokasi | Fungsi |
| --- | --- | --- |
| Bundler | resep esbuild-wasm pada `src/README.md`, output `src/realestate.bundle.js` | Menyatukan `src/main.jsx` + seluruh modul menjadi satu berkas ESM berisi JSX yang sudah dikompilasi |
| Resolver CDN | `src/libs.js` | Semua dependensi runtime diambil dari esm.sh dengan versi terpin (tanpa `node_modules`) |
| Konfigurasi Tailwind | `src/tailwind-config.js` | Palet & font kustom, `darkMode: "class"` |
| Metadata generator | `main.pjs` | `$meta.title`, `$meta.description`, dan `$meta.header.mode = minimal` (header Perchance disembunyikan agar tampilan bersih) |
| Ikon & favicon | `src/logo.svg` + SVG di `user.uploads.dev` | Favicon dan `apple-touch-icon` dinamis, dikirim ke parent window (`postMessage`) agar ikon tab ikut berubah |

---

# 3. Dokumentasi Arsitektur & Perancangan

## 3.1 System Architecture / Tech Stack

Arsitektur bersifat **static-first / serverless**: tidak ada server aplikasi maupun database.
Peramban memuat satu halaman HTML, menarik dependensi dari CDN, lalu menjalankan satu bundle
React yang sudah dikompilasi. Generator Perchance hanya berperan sebagai *hosting engine* +
penyedia metadata (SEO) dan tempat pengguna menyimpan/mempublikasikan hasil kerja.

```
                        ┌───────────────────────────────────────────────┐
                        │   Peramban pengguna (client-side rendering)   │
                        │                                               │
  index.html  ────────► │ 1. Script pra-paint: baca localStorage        │
  (body Perchance)      │    "ew.theme" → pasang class .dark (anti-flash)│
                        │ 2. <link> src/styles.css  (token + keyframes) │
                        │ 3. <script> cdn.tailwindcss.com (JIT runtime) │
                        │ 4. <script> src/tailwind-config.js            │
                        │ 5. dynamic import("./src/realestate.bundle.js")│
                        └───────────────────┬───────────────────────────┘
                                            │
                    ┌───────────────────────┴────────────────────────┐
                    │  realestate.bundle.js  (React app, 1 berkas)   │
                    │                                                │
                    │  main.jsx ──► <LangProvider> (i18n + theme)    │
                    │      │                                         │
                    │      ├── Navbar   Hero   Pillars  Solutions    │
                    │      ├── Widgets  CaseStudies  Portfolio       │
                    │      └── Pricing  Faq   Footer  WhatsAppBar    │
                    │                                                │
                    │  animeFx.js (anime.js v4)  +  Reveal (framer)  │
                    │  data.js (konten statis)   +  libs.js (CDN)    │
                    └────────────────────────────────────────────────┘
                                            │
             ┌──────────────────────────────┼──────────────────────────────┐
             │                              │                              │
   esm.sh (React, framer-motion,   user.uploads.dev (gambar  wa.me (deep-link
   anime.js, embla, lucide, lenis)  & ikon, permanen)       WhatsApp sales)
```

**Lapisan-lapisan:**

1. **Presentasi & interaksi** — komponen React fungsional + Hooks; seluruh state aplikasi hanya berupa
   state UI (bahasa, tema, tab solusi aktif, accordion terbuka, menu mobile, status form).
2. **Animasi** — dua mesin animasi dengan pembagian tugas yang jelas: *framer-motion* untuk
   reveal saat masuk viewport dan transisi mount; *anime.js v4* untuk stagger grid, hover
   (composition `blend`), ambient loop (`composition: none`), dan efek magnetis.
3. **Konten** — `data.js` sebagai *single source of truth*; tiap field teks dibungkus `L(id, en)`.
4. **Distribusi** — esm.sh sebagai module CDN, `user.uploads.dev` untuk aset gambar permanen.
5. **Hosting** — Perchance (produk utama, otomatis) dan Vercel (15 situs demo).

## 3.2 Tech Stack & Versi

**Runtime (sisi klien):**

| Teknologi | Versi | Peran |
| --- | --- | --- |
| JavaScript (ES2020+) / JSX | — | Bahasa utama |
| React | 18.3.1 | Library UI (functional components + hooks) |
| React DOM | 18.3.1 | Renderer (`createRoot`) |
| Tailwind CSS | Play CDN (v3, JIT) | Utility-first styling; konfigurasi kustom via `tailwind-config.js` |
| framer-motion | 11.18.2 | Animasi deklaratif (`motion`, `AnimatePresence`, reveal saat masuk viewport) |
| anime.js | 4.5.0 | Stagger reveal, hover `blend`, ambient float, magnetic CTA |
| lucide-react | 0.469.0 | Ikon SVG |
| embla-carousel-react | 8.5.1 | Slider/carousel (dipakai modul lama) |
| Lenis | 1.1.18 | Smooth scrolling (`window.__lenis`) |
| Google Fonts | Playfair Display, Plus Jakarta Sans | Tipografi (serif editorial + sans UI) |

**Build-time & tooling:**

| Teknologi | Versi | Peran |
| --- | --- | --- |
| esbuild-wasm | 0.21.5 | Bundling `src/main.jsx` → `src/realestate.bundle.js` (format ESM, target es2020, JSX automatic) |
| Perchance engine (pjs) | platform | Hosting halaman, evaluasi `main.pjs` (`$meta`), penyediaan `index.html` |
| Vercel | SaaS | Hosting 15 situs demo portofolio |
| Git | — | [[VCS_YANG_DIPAKAI]] — sebutkan alur branch/PR bila ada |

**Database:** tidak ada (lihat §4.1). **Backend/API internal:** tidak ada (lihat §5.1).

## 3.3 Struktur Folder

```
workspace/
├── main.pjs                     # metadata Perchance ($meta) — konfigurasi "tingkat generator"
├── index.html                   # body halaman: anti-flash tema, favicon, bootstrapping bundle
└── src/                         # 32 berkas, 244,5 KB (ikut terkirim saat generator disimpan)
    ├── README.md                # dokumentasi teknis internal + resep build
    ├── main.jsx                 # entry point React (App + Lenis + watchdog reveal)
    ├── i18n.js                  # context bahasa & tema + kamus teks ID/EN
    ├── data.js                  # seluruh konten terstruktur
    ├── libs.js                  # re-export dependensi CDN (satu instance React)
    ├── animeFx.js               # hook animasi anime.js v4
    ├── scroll.js                # helper scroll-to-section (Lenis-aware)
    ├── format.js                # formatter angka/uang (dipakai modul lama)
    ├── styles.css               # font, token warna, keyframes, styling slider
    ├── tailwind-config.js       # konfigurasi Tailwind (warna + font, darkMode class)
    ├── logo.svg                 # ikon brand
    ├── realestate.bundle.js     # HASIL BUILD (88,8 KB) — jangan diedit manual
    └── components/              # 22 komponen (11 aktif, sisanya warisan)
```

## 3.4 Manajemen State & Alur Data

| State | Pemilik | Persistensi | Konsumen |
| --- | --- | --- | --- |
| `lang` (`id`/`en`) | `LangProvider` (`i18n.js`) | `localStorage["ew.lang"]` | Semua komponen lewat `useLang().t` |
| `theme` (`light`/`dark`) | `LangProvider` | `localStorage["ew.theme"]` + class `.dark` di `<html>` | Seluruh CSS/Tailwind (`dark:` variant) |
| `scrolled` | `Navbar` | tidak | Perubahan gaya navbar saat halaman digulir |
| `open` (menu mobile) | `Navbar` | tidak | AnimatePresence panel menu |
| Tab tier aktif | `Solutions` | tidak | Panel fitur/price yang tampil |
| Accordion FAQ aktif | `Faq` | tidak | `AnimatePresence` tinggi panel |
| `email`, `done` | `Footer` | tidak | Validasi + pesan konfirmasi |
| Instance Lenis | `main.jsx` | `window.__lenis` | `scroll.js` (`goTo`) |

Alur data satu arah: `data.js` → komponen → JSX. Tidak ada fetch data saat runtime kecuali
pemuatan modul/bundle dari CDN, sehingga tidak ada *loading state* data dan halaman sangat cepat
secara struktural.

## 3.5 Sistem Desain

| Aspek | Nilai |
| --- | --- |
| Warm Sand | `#F5F2EB` (juga `sand-deep #ece7db`) |
| Deep Slate / Charcoal | `#1A1A1A` (juga `charcoal-soft #26261f`) |
| Muted Terracotta | `#C27D60` (aksen utama; `terracotta-deep #a9634a`) |
| Soft Bone / Ink / Line | `#FAF9F6`, `#3D3D38`, `#E4DFD3` |
| Tipografi | Heading: **Playfair Display** (serif); Body/UI: **Plus Jakarta Sans** |
| Prinsip motion | Halus & membumi (ease `[0.22, 1, 0.36, 1]`), durasi 0,8–1 s untuk reveal; hover memakai `composition: "blend"` agar akumulatif; ambient loop untuk blob/partikel; semua hook menghormati `prefers-reduced-motion` dan `(hover: hover)` |
| Aksesibilitas | `aria-pressed` pada toggle bahasa & tema, `aria-expanded` pada menu mobile, `aria-label` pada ikon, elemen dekoratif `aria-hidden="true"` |

## 3.6 Pipeline Build

Semua perubahan pada berkas di `src/` **wajib** diikuti proses build ulang:

```
src/main.jsx ──(esbuild-wasm, platform browser, jsx automatic)──► src/realestate.bundle.js
        │                                                                  │
        ├── import "./libs.js"   → tetap external (URL esm.sh)             │
        ├── import "./data.js"   → dibundel                                │
        └── import "./components/*.jsx" → dibundel                           ▼
                                                        index.html: import("./src/realestate.bundle.js")
```

Karakteristik: semua dependensi CDN dipertahankan sebagai URL (external) namun **dibundel sebagai
satu instance** oleh `libs.js`; berkas relatif di-resolve oleh plugin kustom (`normalize` + `onLoad`
yang mengembalikan `resolveDir`). Script build lengkap ada di `src/README.md` (bagian "Build") dan
harus dijalankan dari workspace root (via worker `execute_js`).

---

# 4. Database Structure

## 4.1 Pernyataan Cakupan: Tidak Ada Database

Produk pada masa KP ini adalah **aplikasi front-end murni (static-first)**. Tidak terdapat RDBMS,
NoSQL, maupun backend database. Karena itu dokumen ini tidak memuat ERD tabel fisik; sebagai
gantinya disajikan:

1. **Model data klien** (skema entitas konten) — §4.2.
2. **Skema persistensi peramban** (satu-satunya penyimpanan data saat ini) — §4.3.
3. **Usulan skema database** apabila nanti ditambahkan backend — §4.4 (belum diimplementasikan).

## 4.2 Model Data Klien (ERD Logis)

Seluruh konten hidup pada satu modul: `src/data.js`. Tiap entitas adalah array objek JavaScript;
field teks bilingual dibungkus helper `L(id, en)` sehingga bertipe `{ id: string, en: string }`.

```mermaid
erDiagram
    IMG ||--o{ PORTFOLIO : "image (fallback)"
    SHOTS ||--o{ PORTFOLIO : "image (screenshot)"
    PORTFOLIO {
        string id PK
        string title
        string category
        string tag
        string badge
        string description
        string image FK
        string fallback FK
        array  techStack
        array  features
        string liveUrl
    }
    IMG {
        string key PK
        string url
    }
    SHOTS {
        string key PK
        string url
    }
    PILLARS { object title; object desc; array tags; component icon }
    TIERS   { string id PK; object level; object title; object audience; object price; object focus; array features }
    WIDGETS { object title; object desc; component icon }
    CASES   { object name; object challenge; object solution; object result; object tag; component icon }
    ADDONS  { object label }
    PLANS   { object name; object price; boolean featured; array spec; object cta }
    FAQS    { object q; object a }
    LEGACY  { array PROPERTIES; array GALLERY; array STATS; array LOCATIONS; array TYPES; array PRICE_RANGES; array AMENITIES; array TESTIMONIALS; array FLOORS; object AGENT }
```

**Kamus data ringkas:**

| Entitas | Kunci / field | Tipe | Keterangan |
| --- | --- | --- | --- |
| `IMG` | `hero, coast, loft, penthouse, med, twilight, rooftop, spa, tropical` | `string` (URL) | 9 foto stok properti (uploads.dev, URL permanen) |
| `SHOTS` | `solara … sanctuaries` (14 entri) | `string` (URL) | Screenshot situs demo untuk kartu portofolio |
| `PORTFOLIO` | 11 field (lihat ERD) | array 15 objek | Katalog project; `category` ∈ {Luxury Villa, Urban Penthouse, Eco Resort} |
| `PORTFOLIO_CATEGORIES` | `["Semua","Luxury Villa","Urban Penthouse","Eco Resort"]` | array | Opsi filter |
| `PILLARS` | `icon, title(L), desc(L), tags[]` | array 4 | 4 pilar nilai |
| `TIERS` | `id, level(L), title(L), audience(L), price(L), focus(L), features[]` | array 3 | Tingkat solusi (`solo`, `agency`, `developer`) |
| `WIDGETS` | `icon, title(L), desc(L)` | array 5 | Katalog widget interaktif |
| `CASES` | `icon, name(L), challenge(L), solution(L), result(L), tag(L)` | array 3 | Studi kasus mini |
| `ADDONS` | `L(id, en)` | array 4 | Layanan tambahan |
| `PLANS` | `name(L), price(L), featured, spec[](L), cta(L)` | array 3 | Paket harga |
| `FAQS` | `q(L), a(L)` | array 5 | Pertanyaan umum |
| `LEGACY` | `PROPERTIES, GALLERY, STATS, LOCATIONS, TYPES, PRICE_RANGES, AMENITIES, TESTIMONIALS, FLOORS, AGENT` | — | Data warisan versi sebelumnya yang **belum dibersihkan** |

Contoh representasi satu record:

```js
{
  id: "portfolio-1",
  title: "Solara Estates",
  category: "Luxury Villa",
  tag: "Tropical Luxury",
  badge: "Live Project",
  description: "Portal properti tropis mewah Bali — ...",
  image: SHOTS.solara,
  fallback: IMG.tropical,
  techStack: ["Vite + React", "Tailwind CSS", "Editorial Serif"],
  features: ["Curated Villas", "Prime Bali Destinations"],
  liveUrl: "https://solara-estates-56wi.vercel.app/"
}
```

## 4.3 Skema Persistensi Peramban

| Media | Kunci | Tipe nilai | Ditulis oleh | Dibaca oleh |
| --- | --- | --- | --- | --- |
| `localStorage` | `ew.lang` | `"id"` \| `"en"` | `i18n.js` saat toggle | `i18n.js` saat inisialisasi |
| `localStorage` | `ew.theme` | `"light"` \| `"dark"` | `i18n.js` saat toggle | `i18n.js` + script pra-paint di `index.html` |

Catatan: data ini bersifat *per-origin per-generator* dan tidak pernah dikirim ke server.
Tidak ada cookie, tidak ada data pribadi pengguna yang disimpan.

## 4.4 Usulan Skema Database (Belum Diimplementasikan)

Jika perusahaan ingin menyimpan lead dan listing secara terpusat, skema minimal berikut dapat
dipakai (MySQL/PostgreSQL). Ditandai **proposal** karena tidak termasuk scope KP.

```
leads
  id            BIGSERIAL PK
  name          VARCHAR(120)
  email         VARCHAR(160) NOT NULL
  phone         VARCHAR(32)
  company       VARCHAR(160)
  message       TEXT
  source_page   VARCHAR(60)     -- mis. "footer-form", "hero-cta", "portfolio-demo"
  lang          CHAR(2)
  utm_source    VARCHAR(80)
  status        ENUM('new','contacted','qualified','won','lost') DEFAULT 'new'
  created_at    TIMESTAMP DEFAULT now()

projects (portfolio)
  id            BIGSERIAL PK
  slug          VARCHAR(80) UNIQUE
  title         VARCHAR(160)
  category_id   INT FK -> categories.id
  tag           VARCHAR(80)
  description   TEXT
  live_url      VARCHAR(255)
  is_published  BOOLEAN DEFAULT false
  sort_order    INT DEFAULT 0
  created_at    TIMESTAMP

categories
  id            SERIAL PK
  name          VARCHAR(80) UNIQUE      -- Luxury Villa | Urban Penthouse | Eco Resort

project_assets (1-N gambar/screenshot per project)
  id            BIGSERIAL PK
  project_id    BIGINT FK -> projects.id ON DELETE CASCADE
  url           VARCHAR(255)
  kind          ENUM('screenshot','fallback','og_image')
  sort_order    INT
```

Relasi: `categories 1—N projects 1—N project_assets`; `leads` berdiri sendiri (tidak berelasi).

---

# 5. API Documentation

## 5.1 Ringkasan

Sama seperti §4.1: **produk tidak mengekspos API internal** (tidak ada `fetch` ke backend sendiri).
Yang ada adalah **integrasi keluar** (outbound) ke layanan pihak ketiga, plus satu **kontrak API
usulan** untuk kebutuhan pengembangan berikutnya.

## 5.2 Integrasi Eksternal yang Dipakai

| # | Layanan | Method | Endpoint | Parameter/Input | Contoh respons |
| --- | --- | --- | --- | --- | --- |
| 1 | esm.sh (module CDN) | GET | `https://esm.sh/react@18.3.1` | path paket + `?deps=react@18.3.1` untuk pemaksaan versi React tunggal | Modul ESM (`export`) siap `import` |
| 2 | esm.sh | GET | `https://esm.sh/framer-motion@11.18.2?deps=react@18.3.1,react-dom@18.3.1` | `deps` (versi peer) | Modul ESM |
| 3 | esm.sh | GET | `https://esm.sh/animejs@4.5.0` | — | Modul ESM |
| 4 | esm.sh | GET | `https://esm.sh/lenis@1.1.18` | — | Modul ESM (default export kelas `Lenis`) |
| 5 | esm.sh | GET | `https://esm.sh/lucide-react@0.469.0?deps=react@18.3.1` | `deps` | Modul ESM berisi ikon (`Anchor`, `Rocket`, …) |
| 6 | Tailwind Play CDN | GET | `https://cdn.tailwindcss.com` | Membaca `tailwind.config` dari global setelah dimuat | Runtime CSS (JIT) — memunculkan peringatan "should not be used in production" |
| 7 | Google Fonts | GET | `https://fonts.googleapis.com/...` (via `@import` di `styles.css`) | family Playfair Display & Plus Jakarta Sans | CSS + file font |
| 8 | uploads.dev (asset hosting) | GET | `https://user.uploads.dev/file/<hash>.(jpg|png|svg)` | — | Biner gambar; dipakai untuk 23 aset (`IMG`, `SHOTS`, favicon) |
| 9 | WhatsApp deep link | GET | `https://wa.me/628112223456` | opsional `?text=<pesan-terenkode>` | Halaman/redirect aplikasi WhatsApp |
| 10 | Vercel (demo portofolio) | GET | `https://<proyek>.vercel.app/` (15 URL, §2.3) | — | HTML situs demo |

**Contoh pemakaian deep-link WhatsApp dengan pesan terisi:**

```
https://wa.me/628112223456?text=Halo%2C%20saya%20tertarik%20dengan%20template%20Estatewerks
```

Implementasi saat ini (murni tautan, tanpa parameter):

```html
<a href="https://wa.me/628112223456" target="_blank" rel="noopener noreferrer" aria-label="…">
```

## 5.3 Kontrak API Usulan — Form Konsultasi (Proposal)

Saat ini form di `Footer.jsx` hanya memvalidasi pola email (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) lalu
menampilkan pesan konfirmasi; **tidak ada pengiriman data**. Untuk produksi, disarankan endpoint
`POST /api/leads` dengan kontrak berikut:

**Request**

```http
POST /api/leads
Content-Type: application/json
Origin: https://perchance.org
```

```json
{
  "email": "calon@perusahaan.com",
  "name": "Nama Prospek",
  "phone": "+6281xxxxxxx",
  "company": "PT Contoh Properti",
  "message": "Butuh 20 halaman listing",
  "sourcePage": "footer-form",
  "lang": "id",
  "utm": { "source": "instagram", "campaign": "launch-q3" }
}
```

**Respons sukses — `201 Created`**

```json
{
  "success": true,
  "data": { "id": "ld_8f3c2a", "status": "new", "createdAt": "2026-05-12T09:41:22Z" }
}
```

**Respons gagal**

| Status | Kode | Penyebab | Bentuk respons |
| --- | --- | --- | --- |
| 400 | `INVALID_EMAIL` | Format email salah | `{ "success": false, "error": { "code": "INVALID_EMAIL", "message": "Email tidak valid" } }` |
| 422 | `MISSING_FIELD` | Field wajib kosong | `{ "success": false, "error": { "code": "MISSING_FIELD", "field": "email" } }` |
| 429 | `RATE_LIMITED` | > 5 permintaan/menit/IP | `{ "success": false, "error": { "code": "RATE_LIMITED", "retryAfter": 60 } }` |
| 500 | `SERVER_ERROR` | Kesalahan internal | `{ "success": false, "error": { "code": "SERVER_ERROR" } }` |

**Ketentuan tambahan:** validasi wajib diulang di sisi server (validasi klien hanya UX),
honeypot + rate limit untuk anti-spam, dan notifikasi ke WhatsApp/e-mail tim sales setelah data
tersimpan.

---

# 6. Panduan Instalasi & Deployment (Setup Guide)

## 6.1 Prasyarat Sistem

| Kebutuhan | Versi/Detail | Wajib? | Catatan |
| --- | --- | --- | --- |
| Peramban modern | Chrome/Edge/Firefox/Safari versi terbaru | Ya | Wajib mendukung ES Modules, `IntersectionObserver`, Web Animations API |
| Koneksi internet | — | Ya | Semua dependensi diambil dari esm.sh, Tailwind CDN, dan Google Fonts |
| Node.js | ≥ 18 (disarankan 20 LTS) | Tidak untuk produk utama | Diperlukan hanya bila mengembangkan ulang situs demo dengan Vite secara lokal |
| npm / pnpm | npm ≥ 9 | Tidak untuk produk utama | Untuk project Vite (§2.3) |
| Akun Perchance | gratis | Ya (untuk publikasi produk utama) | https://perchance.org |
| Akun Vercel/Netlify | gratis (opsional) | Tidak | Alternatif hosting statis |
| Editor kode | VS Code / editor apa pun | Ya | Untuk mengubah `src/` |
| Git | ≥ 2.30 | Disarankan | [[VCS_YANG_DIPAKAI]] |

## 6.2 Menjalankan Project di Lingkungan Lokal (Development)

### Opsi A — Development produk utama (editor Perchance)

1. Buka `https://perchance.org/property-12` → klik **Edit** (tombol kode) untuk masuk ke editor.
2. Ubah berkas sesuai kebutuhan:
   - `main.pjs` → metadata/SEO (`$meta.title`, `$meta.description`).
   - `index.html` → bootstrapping, favicon, anti-flash tema.
   - `src/**` → komponen, data, gaya, animasi.
3. Jika `src/**` diubah, **jalankan build ulang** (§3.6 / §6.3) — preview langsung menampilkan berkas
   `src/` terbaru, jadi perubahan belum terlihat di bundle sebelum build.
4. Preview berjalan di iframe `<publicId>.perchance.org/property-12`; ini sudah lingkungan dev
   yang sebenarnya (tanpa server lokal tambahan).
5. Sebelum publikasi, lakukan checklist §6.4.

### Opsi B — Menjalankan sebagai situs statis murni (opsional, untuk uji di host sendiri)

```bash
# 1) ambil berkas dari editor: main.pjs (opsional), index.html, dan seluruh isi src/
#    susun menjadi struktur: index.html + src/**
# 2) jalankan server statis apa pun dari folder tersebut
python3 -m http.server 8080
# lalu buka http://localhost:8080
```

Catatan: script bootstrapping pada `index.html` memakai `import("./src/realestate.bundle.js")`,
sehingga folder `src/` **wajib** berada tepat di samping `index.html`.

### Opsi C — Menjalankan situs demo portofolio (project Vite)

```bash
npm create vite@latest nama-project -- --template react     # atau clone repo project terkait
cd nama-project
npm install
npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
npm run dev          # development server (biasanya http://localhost:5173)
npm run build        # hasil produksi ke dist/
```

## 6.3 Build Ulang Bundle (wajib setelah mengubah `src/**`)

Jalankan resep berikut dari root project (tidak perlu Node; berjalan di worker peramban):

```js
const { default: esbuild } = await import("https://esm.sh/esbuild-wasm@0.21.5?bundle");
await esbuild.initialize({ wasmURL: "https://esm.sh/esbuild-wasm@0.21.5/esbuild.wasm" });
const result = await esbuild.build({
  entryPoints: ["src/main.jsx"],
  bundle: true, write: false, format: "esm", platform: "browser", target: ["es2020"],
  jsx: "automatic", jsxDev: false, legalComments: "none",
  plugins: [{ name: "ws", setup(build) { /* resolver CDN + relative (§3.6) */ } }],
});
await fs.writeFile("src/realestate.bundle.js", result.outputFiles[0].contents);
```

Resep lengkap (termasuk fungsi `normalize` dan `onLoad`) tersedia di `src/README.md` bagian **Build**.

## 6.4 Deployment ke Production

### 6.4.1 Produk utama (Perchance)

1. Selesaikan semua perubahan → jalankan build (§6.3).
2. Pastikan tidak ada error konsol/syntax pada preview.
3. Klik **Save** pada editor. Halaman publik otomatis tersedia di
   `https://perchance.org/<nama-generator>` (saat ini `property-12`).
4. Fork/rename: jika di-fork, Google/mesin pencari akan mengindeks URL baru — sebaiknya tetapkan
   nama final lebih awal karena `localStorage` dan beberapa data plugin terikat pada nama generator.

### 6.4.2 Alternatif hosting statis (Vercel/Netlify)

1. Susun berkas: `index.html` + folder `src/**`.
2. Unggah/drag-drop ke Vercel atau Netlify (tanpa build command, tanpa framework preset — sebagai
   *static site*).
3. Atur header cache untuk `src/realestate.bundle.js` (mis. `Cache-Control: public, max-age=31536000, immutable`).
4. Aktifkan HTTPS (otomatis) dan arahkan domain milik perusahaan.

### 6.4.3 Situs demo portofolio (Vercel)

1. `npm run build` → hasil ada di `dist/`.
2. Deploy: `vercel --prod` atau hubungkan repo Git di dashboard Vercel (build command `npm run build`,
   output directory `dist`).
3. Tambahkan URL hasil deploy ke `SHOTS` dan `PORTFOLIO[].liveUrl` pada `src/data.js`, lalu build ulang
   bundle produk utama (§6.3).

### 6.4.4 Checklist sebelum publikasi

- [ ] Build ulang bundle selesai dan `realestate.bundle.js` terbarui.
- [ ] Tidak ada error di konsol; tidak ada tautan `#` yang belum dimaksudkan.
- [ ] Semua 15 `liveUrl` demo masih dapat dibuka.
- [ ] Metadata `$meta` (title/description) sesuai penawaran terbaru.
- [ ] Uji pada viewport mobile (390×844) **dan** desktop (1920×1080).
- [ ] Nomor WhatsApp pada `Hero.jsx` dan `WhatsAppBar.jsx` sudah nomor sales yang benar.
- [ ] Tidak ada kredensial/rahasia di berkas yang disimpan (lihat §6.5).

## 6.5 Konfigurasi Variabel Lingkungan

Produk ini **tidak menggunakan file `.env`** dan tidak memiliki rahasia apa pun, karena seluruh
konfigurasinya bersifat publik (konten marketing) dan tidak ada backend. Yang ada adalah
"variabel konfigurasi" berupa nilai di dalam kode:

| Variabel logis | Lokasi | Nilai saat ini | Rahasia? |
| --- | --- | --- | --- |
| Nama generator / URL publik | platform Perchance (`window.generatorName`) | `property-12` | Tidak |
| Nama brand & tagline | `src/i18n.js` (`dict.id.navBrandTag`) | "Web Studio" | Tidak |
| Nomor WhatsApp sales | `src/components/Hero.jsx`, `src/components/WhatsAppBar.jsx` | `628112223456` | **Tidak** (nomor publik) |
| Alamat e-mail kontak | `src/components/Footer.jsx` | `hello@estate-web.studio` | Tidak |
| Kunci penyimpanan preferensi | `src/i18n.js` | `ew.lang`, `ew.theme` | Tidak |
| Metadata SEO | `main.pjs` (`$meta`) | title/description | Tidak |

Untuk keperluan dokumentasi/handover, berikut **struktur** berkas `.env` (tanpa password/rahasia)
bila kelak backend ditambahkan:

```dotenv
# ---------- FRONT-END ----------
VITE_LEAD_ENDPOINT=https://api.example.com/api/leads
VITE_WHATSAPP_NUMBER=628112223456
VITE_SITE_URL=https://perchance.org/property-12
VITE_DEFAULT_LANG=id

# ---------- BACKEND (server-side, JANGAN pernah dipakai di kode klien) ----------
DATABASE_URL=postgres://<user>:<password>@<host>:5432/<db>
MAIL_API_KEY=<isi-lewat-secret-manager>
ADMIN_PASSWORD_HASH=<hash-sha256>
RATE_LIMIT_PER_MINUTE=5
```

```dotenv
# ---------- .env.example (versi aman untuk repo) ----------
VITE_LEAD_ENDPOINT=
VITE_WHATSAPP_NUMBER=
DATABASE_URL=
MAIL_API_KEY=
```

**Aturan keamanan:** nilai backend hanya boleh ada pada variabel lingkungan server/secret manager.
Kode yang disimpan di generator (`index.html`, `main.pjs`, `src/**`) **bersifat publik** — siapa pun
dapat melihatnya, sehingga tidak boleh memuat API key, token, password, atau URL penghapusan data.

## 6.6 Troubleshooting

| Gejala | Penyebab umum | Solusi |
| --- | --- | --- |
| Halaman putih / tidak ada konten | `src/realestate.bundle.js` gagal dimuat | Buka konsol (pesan "Bundle gagal dimuat"); pastikan folder `src/` sejajar dengan `index.html`, lalu refresh (script punya 4 kali retry) |
| Perubahan kode tidak muncul | Bundle belum dibangun ulang | Jalankan §6.3 lalu refresh halaman |
| Teks terlihat "kosong" sekilas saat tab tidak aktif | Animasi akselerasi WAAPI dijeda peramban saat dokumen tidak terlihat | Biarkan tab aktif sejenak; animasi selesai otomatis (lihat §7.5) |
| Ikon tab tidak berubah | `postMessage` favicon diblokir / parent belum siap | Script mengirim ulang pada 300 ms & 1200 ms; pastikan memakai `index.html` versi terbaru |
| Peringatan Tailwind di konsol | Tailwind Play CDN hanya untuk prototipe | Untuk produksi, kompilasi Tailwind dengan CLI/PostCSS (§8.3) |
| Menu mobile tidak terbuka | Lebar viewport ≥ 1024 px (menu desktop) | Uji di ≤ 1023 px; atau periksa `aria-expanded` tombol hamburger |

---

# 7. Hasil Pengujian (Testing & Validation)

## 7.1 Metode & Lingkungan Pengujian

| Aspek | Keterangan |
| --- | --- |
| Jenis pengujian | **Manual terarah (scripted DOM assertion)** dijalankan pada preview live (`property-12`), ditambah verifikasi visual (screenshot + penilaian gambar) |
| Peramban | Chrome (mesin preview Perchance), desktop |
| Viewport | Desktop (918×…, 1920×1080) dan mobile (390×844) |
| Alat bantu | Script DOM di iframe (klik nyata pada elemen, baca `getComputedStyle`, `localStorage`, `performance`) |
| Belum ada | Framework uji otomatis (Vitest/Playwright) — lihat backlog §8.3 |
| Kriteria lulus | Fitur berperilaku sesuai kriteria penerimaan (§7.6) tanpa error konsol |

## 7.2 Skenario Pengujian Fungsional

| ID | Skenario | Kriteria lulus | Hasil | Bukti |
| --- | --- | --- | --- | --- |
| T-01 | Render aplikasi React ke `#root` | 1 root container ter-mount, aplikasi tampil | **PASS** | `#root children = 1` |
| T-02 | Semua section utama ter-render | 8 anchor section ada di DOM | **PASS** | `top, keuntungan, solusi, widgets, case, portfolio, harga, kontak` |
| T-03 | Tidak ada elemen tertinggal `opacity: 0` setelah watchdog (2,5 s/6 s) | 0 elemen terlihat tertahan transparan | **PERHATIAN** | 3 elemen hero (badge, `h1`, paragraf) terbaca `opacity: 0` saat dokumen dalam keadaan *hidden* — kembali normal setelah dokumen terlihat (lihat §7.5) |
| T-04 | Toggle bahasa ID ⇄ EN | Seluruh copy berubah, `aria-pressed` benar, `localStorage["ew.lang"]` terbarui | **PASS** | headline ID ⇄ EN, `ew.lang=id` |
| T-05 | State bahasa reversible | Kembali ke nilai awal secara konsisten | **PASS** | `ew.lang=en`, headline kembali identik |
| T-06 | Toggle tema light ⇄ dark | Class `.dark` pada `<html>` berubah dua arah, tersimpan | **PASS** | `true → false → true`, `ew.theme=dark` |
| T-07 | Navigasi smooth scroll (Lenis) | Klik menu membawa section tujuan ke posisi ~84 px dari atas | **PASS** | `#solusi → 84 px`, `#widgets → 84 px`, `#harga → 84 px` |
| T-08 | Accordion FAQ | 5 item, dapat dibuka & ditutup (tinggi panel ter-animasi) | **PASS** | `items=5`, open lalu kembali ke panjang teks awal |
| T-09 | Validasi form konsultasi | Email invalid ditolak, email valid menampilkan pesan konfirmasi | **PASS** | `blocked=true`, `accepted=true` |
| T-10 | Kartu portofolio & tautan demo | ≥ 15 kartu, semua `https://`, semua `target="_blank"` | **PASS** | `cards=15`, semua `https` |
| T-11 | Deep-link WhatsApp | Tersedia di ≥ 2 lokasi, `rel="noopener noreferrer"` | **PASS** | 5 tautan `wa.me` terdeteksi |
| T-12 | Tidak ada horizontal overflow (desktop) | `scrollWidth ≤ innerWidth + 1` | **PASS** | `scrollW=908`, `winW=918` |
| T-13 | Ketersediaan seluruh tautan demo portofolio | 15/15 URL demo merespons `HTTP 200` dan memuat halaman bertema properti | **PASS** | 15× `200 OK`, 17–40 KB HTML, judul halaman unik per project (lihat Lampiran B.1) |

Ringkasan: **12 PASS / 13**, 1 temuan bersifat lingkungan (bukan cacat logika), 0 error konsol.

## 7.3 Pengujian Responsif

| Viewport | Hasil |
| --- | --- |
| **390 × 844** (mobile) | Tidak ada overflow horizontal (`scrollWidth = 381 ≤ 390`); navbar desktop tersembunyi; tombol hamburger tampil dan `aria-expanded` berubah menjadi `true` saat diklik; panel menu memuat 6 tautan + CTA + tombol bahasa "Bahasa Indonesia / English"; hero setinggi 844 px (pas 100 svh); heading 36 px; grid harga menjadi 1 kolom (`340,8 px`) |
| **918 px** (tablet/preview) | Mockup browser+telepon disembunyikan (muncul pada breakpoint `lg` ≥ 1024 px) — sesuai desain; grid harga 3 kolom |
| **1920 × 1080** (desktop) | Layout maksimum `max-w-7xl` terpusat; tanpa overflow; seluruh CTA dan navbar tampil penuh |

## 7.4 Pengukuran Performa

| Metrik | Nilai | Catatan |
| --- | --- | --- |
| `DOMContentLoaded` | ≈ 402 ms | Environment preview, cache hangat |
| `load` | ≈ 403 ms | — |
| Unduh bundle | ≈ 374 ms (mode preview, dimuat via service worker preview) | Ukuran bundle **88,8 KB** (belum gzip) |
| Total berkas `src/` | 32 berkas / 244,5 KB | Termasuk berkas warisan yang belum dipangkas |
| Berkas terbesar | `realestate.bundle.js` 88,8 KB → `data.js` 31,6 KB → `Collection.jsx` 11,8 KB (tidak terpakai) | Pemangkasan berpotensi menghemat ± 40 KB sumber |
| Animasi | Blob/partikel *ambient* berjalan kontinu; watchdog reveal menjamin konten tidak tertahan | — |
| Error konsol | 0 error, 1 peringatan (Tailwind Play CDN) | — |

## 7.5 Temuan & Catatan Teknis

1. **Throttling animasi saat dokumen tidak aktif (temuan utama).** Saat pengujian otomatis,
   status dokumen preview adalah `hidden`. Diverifikasi secara empiris: animasi **Web Animations API
   dan framer-motion dijeda** oleh peramban pada kondisi tersebut (elemen uji: `opacity` tetap 0),
   sementara animasi berbasis `requestAnimationFrame` murni (anime.js) **tetap berjalan** (≈ 51 tick/s).
   Konsekuensi: teks hero yang dianimasikan framer-motion tampak belum muncul bila halaman dibuka
   di latar belakang; setelah dokumen terlihat, `opacity` `h1` kembali `1` dan hero tampil utuh
   (terverifikasi lewat tangkapan layar: badge, headline serif dua warna, deskripsi, 3 trust badge,
   dan 2 CTA tampil rapi tanpa tumpang-tindih). Ini perilaku peramban, bukan kesalahan logika —
   namun lihat rekomendasi mitigasi pada §8.1.
2. **Watchdog `forceReveal` hanya menangani elemen bergaya inline transform** (`main.jsx`), sehingga
   tidak memulihkan elemen yang seluruhnya dianimasikan oleh framer-motion. Rekomendasi: tambahkan
   handler `visibilitychange` yang memaksa nilai akhir animasi masuk.
3. **Tailwind Play CDN.** Peringatan resmi "should not be used in production"; solusi ada di §8.3.
4. **Validasi form hanya di sisi klien.** Data tidak terkirim ke mana pun; untuk produksi perlu
   endpoint (§5.3).
5. **Konten statis terverifikasi visual.** Section harga terbaca benar: 3 kartu (Solo Agent $649 /
   Agency Hub $1.290 "Paling Disarankan" / Developer Enterprise $3.190) + 4 add-on.

## 7.6 Kriteria Penerimaan (terverifikasi)

- [x] Halaman tampil tanpa error konsol dan tanpa syntax error.
- [x] Seluruh section utama dapat dijangkau dari navigasi.
- [x] Perpindahan bahasa & tema bekerja dua arah dan bertahan setelah reload.
- [x] Form konsultasi menolak email tidak valid dan memberi umpan balik saat valid.
- [x] Semua tautan demo portofolio valid, aman (`https`, tab baru, `noopener`), dan masih online (15/15 HTTP 200).
- [x] Layout tidak rusak/overflow pada viewport mobile maupun desktop.
- [ ] Pengiriman lead ke sistem perusahaan — **di luar scope**, tercatat sebagai backlog (§8.2).

---

# 8. Catatan Pengembangan Mendatang (Future Improvements / Known Bugs)

## 8.1 Known Issues / Bug yang Diketahui

| ID | Isu | Tingkat | Dampak | Rekomendasi |
| --- | --- | --- | --- | --- |
| B-01 | Animasi masuk (framer-motion/WAAPI) dijeda peramban saat dokumen `hidden`, elemen tertahan `opacity: 0` sampai tab terlihat | Rendah | Kosmetik sementara; konten tetap muncul ketika tab aktif | Tambahkan listener `visibilitychange` yang memaksa state akhir (mis. `document.querySelectorAll('[data-motion]')` → `opacity: 1`), atau migrasikan reveal hero ke anime.js yang tidak dijeda |
| B-02 | `forceReveal` di `main.jsx` hanya memproses elemen dengan inline `transform` | Rendah | Sebagian elemen framer-motion di luar jangkauan watchdog | Perluas kondisi (mis. tandai elemen dengan atribut `data-reveal` lalu sapu pada 2,5 s/6 s) |
| B-03 | Peringatan Tailwind Play CDN ("should not be used in production") | Rendah | CSS dihasilkan saat runtime → sedikit lebih lambat + ukuran CSS lebih besar | Kompilasi Tailwind (PostCSS/CLI) menjadi satu berkas CSS statis, lalu hapus `<script src="cdn.tailwindcss.com">` |
| B-04 | Kode & data warisan masih ada (`Collection.jsx`, `Contact.jsx`, `Calculator.jsx`, `Amenities.jsx`, `Philosophy.jsx`, `ProjectShowcase.jsx`, `Spotlight.jsx`, `Testimonials.jsx`, `format.js`, serta `PROPERTIES/GALLERY/STATS/…/AGENT` pada `data.js`) | Sedang | Membingungkan developer baru; menambah berat `src/` (± 40–50 KB); berisiko dipakai tanpa sengaja | Hapus modul yang tidak dirujuk `main.jsx` (atau pindahkan ke folder `legacy/`), lalu build ulang |
| B-05 | Form konsultasi tidak mengirim data apa pun (tidak ada lead yang tersimpan) | **Tinggi (untuk bisnis)** | Potensi kehilangan lead; klaim "terhubung CRM" pada FAQ belum terealisasi | Implementasikan `POST /api/leads` (§5.3) + notifikasi WhatsApp/e-mail; minimal fallback: ubah tombol form menjadi deep-link WhatsApp yang membawa isi email |
| B-06 | Tombol toggle bahasa `ID` dan `EN` sama-sama memanggil `toggleLang` (bukan `setLang("id")`) | Rendah | Klik tombol yang sudah aktif justru berpindah bahasa | Ganti menjadi `setLang` eksplisit dengan guard "abai bila sudah aktif" |
| B-07 | Tautan footer statis (`href="#"` dengan `preventDefault`) dan e-mail belum `mailto:` | Rendah | Klik tidak melakukan apa pun; membingungkan pengunjung | Arahkan ke anchor section terkait atau `mailto:hello@estate-web.studio` |
| B-08 | Gambar dari CDN tanpa `width/height`/`srcset` | Rendah | Potensi CLS (pergeseran layout) dan boros kuota data di perangkat lemah | Tambahkan dimensi eksplisit, `loading="lazy"` untuk gambar bawah-fold, dan varian WebP/AVIF |
| B-09 | SEO satu bahasa & tanpa URL terpisah per bahasa; belum ada `hreflang`, sitemap, atau `robots.txt` | Sedang | Versi EN/ID tidak terindeks terpisah; jangkauan organik terbatas | Gunakan `?lang=` atau subpath + `hreflang`, dan `$meta.dynamic` (plugin Perchance) untuk metadata per URL |
| B-10 | Lenis smooth-scroll tetap aktif meski pengguna memilih `prefers-reduced-motion` | Rendah | Ketidaknyamanan bagi pengguna sensitif gerak | Nonaktifkan `smoothWheel`/Lenis ketika `matchMedia("(prefers-reduced-motion: reduce)")` cocok |
| B-11 | Tidak ada pengujian otomatis/regresi | Sedang | Risiko regresi setiap perubahan besar | Tambahkan Vitest + Testing Library (unit) dan Playwright (E2E: bahasa, tema, scroll, form) |
| B-12 | Belum ada analitik/tracking | Sedang | Tidak dapat mengukur konversi & sumber lead | Pasang Google Analytics 4 + Meta Pixel (sesuai add-on yang dijual), dengan pemberitahuan privasi |

## 8.2 Fitur yang Belum Dikembangkan (Backlog)

| Prioritas | Fitur | Nilai bisnis | Estimasi |
| --- | --- | --- | --- |
| P0 | Endpoint lead + penyimpanan + notifikasi (menutup B-05) | Menyelamatkan lead nyata | 1–2 hari |
| P0 | Kompilasi Tailwind produksi + pemangkasan kode warisan (B-03, B-04) | Halaman lebih ringan & mudah dirawat | 0,5–1 hari |
| P1 | Kalkulator KPR **fungsional** (sudah dijanjikan pada section Widget) | Prospek lebih "panas" sebelum kontak | 1 hari |
| P1 | Widget Floor Plan Viewer interaktif (hotspot ruangan) | Diferensiasi produk | 2–3 hari |
| P1 | Ganti form menjadi alur booking viewing (pilih tanggal/waktu → WhatsApp terisi otomatis) | Konversi lebih tinggi | 1–2 hari |
| P1 | SEO teknis: `hreflang`, sitemap, `robots.txt`, schema `RealEstateAgent`/`Product` | Trafik organik | 1 hari |
| P2 | CMS (Sanity/Strapi) agar tim non-teknis mengelola 15 kartu portofolio | Operasional mandiri | 3–5 hari |
| P2 | Modul testimoni & rating asli (komponen `Testimonials.jsx` sudah ada, tinggal diaktifkan kembali) | Bukti sosial | 0,5 hari |
| P2 | A/B test headline & harga (butuh analitik dulu) | Optimasi konversi | 2 hari |
| P3 | Internasionalisasi tambahan (mis. mandarin) & mata uang lain | Ekspansi pasar | 1–2 hari |
| P3 | Mode cetak/PDF price list otomatis per paket | Sales kit | 1 hari |

## 8.3 Rekomendasi Teknis untuk Handover

1. **Bangun pipeline produksi**: tailwind CLI/PostCSS → `styles.build.css`, dan jalankan esbuild
   (resep §6.3) sebagai satu perintah `npm run build` agar tidak lupa membangun bundle.
2. **Tandai berkas hasil build**: tambahkan header otomatis "GENERATED FILE — jangan diedit" pada
   `realestate.bundle.js`, dan simpan sumbernya (`src/**`) sebagai satu-satunya tempat perubahan.
3. **Bersihkan warisan (B-04)** sebelum menambah fitur baru agar mudah menavigasi kode.
4. **Tambah pengujian minimum**: 3 skenario E2E paling bernilai (toggle bahasa, toggle tema,
   validasi form) untuk mencegah regresi saat produksi berubah.
5. **Jangan simpan rahasia di kode klien** (§6.5) — semua berkas yang disimpan pada generator bersifat publik.
6. **Dokumentasi**: pertahankan `src/README.md` dan dokumen ini; perbarui setiap ada perubahan
   arsitektur, entitas data, atau kontrak API.

## 8.4 Handover / Serah Terima

| Item | Lokasi |
| --- | --- |
| Kode sumber produk utama | `main.pjs`, `index.html`, `src/**` (dalam generator Perchance `property-12`) |
| Dokumentasi teknis internal | `src/README.md` (arsitektur, build, sistem animasi, design system) |
| Dokumen laporan ini | `dokumentasi/LAPORAN-AKHIR-KP.md` |
| Alur build | `src/README.md` → bagian "Build" (esbuild-wasm) |
| Daftar URL demo | §2.3 + `src/data.js` (`PORTFOLIO[].liveUrl`) |
| Kontak teknis penerus | [[NAMA_PENERUS_JIKA_ADA]] |

---

## Lampiran A — Glosarium

| Istilah | Arti |
| --- | --- |
| **Bundle** | Satu berkas JavaScript hasil penggabungan seluruh modul oleh esbuild |
| **Perchance (pjs)** | Platform hosting + bahasa template tempat produk ini dijalankan |
| **Reveal** | Animasi memunculkan elemen saat masuk area pandang |
| **Composition `blend`** | Mode anime.js yang menjumlahkan tween (hover tidak "restart") |
| **WAAPI** | Web Animations API — animasi native peramban (dijeda saat dokumen tidak terlihat) |
| **CLS** | Cumulative Layout Shift — metrik kestabilan tata letak |

## Lampiran B — Daftar Lengkap Tautan (Link Inventory)

Hasil verifikasi DOM pada halaman live: **total 20 tautan eksternal** — 15 di antaranya tombol
"Lihat Demo" portofolio, 5 tautan WhatsApp (`wa.me`). Tidak ada tautan eksternal lain.

### B.1 Tautan Demo Portofolio (15) — dipakai pada section `#portfolio`

| # | Nama Project | Label tombol | URL |
| --- | --- | --- | --- |
| 1 | Solara Estates | Lihat Demo | https://solara-estates-56wi.vercel.app/ |
| 2 | AUREA | Lihat Demo | https://aurea-wheat-iota.vercel.app/ |
| 3 | VALA ESTATES | Lihat Demo | https://vala-ten.vercel.app/ |
| 4 | VANDEN | Lihat Demo | https://vanden-one.vercel.app/ |
| 5 | AETHERIA | Lihat Demo | https://pertiti.vercel.app/ |
| 6 | AURAIA | Lihat Demo | https://protx1.vercel.app/ |
| 7 | VÆLOR | Lihat Demo | https://prottx2.vercel.app/ |
| 8 | ARKHĒ | Lihat Demo | https://prottx3.vercel.app/ |
| 9 | VALO | Lihat Demo | https://proppp1.vercel.app/ |
| 10 | AUREXIS | Lihat Demo | https://poppp2.vercel.app/ |
| 11 | VELARIS | Lihat Demo | https://proppp3.vercel.app/ |
| 12 | Atelier Vesta | Lihat Demo | https://proppp4.vercel.app/ |
| 13 | VÉLUM | Lihat Demo | https://proppp5.vercel.app/ |
| 14 | AETHERIA · Sanctuaries | Lihat Demo | https://proppp6.vercel.app/ |
| 15 | AETHERIA · Estate | Lihat Demo | https://propp7.vercel.app/ |

Sumber data: `src/data.js` → `PORTFOLIO[].liveUrl`; dirender oleh `src/components/Portfolio.jsx`
(`target="_blank"`, `rel="noopener noreferrer"`). Semua 15 tombol berstatus aktif dan tampil pada
klik pertama (diuji T-10: `cards=15`). Bila salah satu proyek dipindah domain, cukup perbarui
`liveUrl` lalu build ulang bundle.

**Hasil verifikasi tautan (uji T-13, saat penyusunan dokumen):**

| # | Host | Status HTTP | Judul halaman yang dimuat |
| --- | --- | --- | --- |
| 1 | solara-estates-56wi.vercel.app | 200 OK | Solara Estates — Modern Tropical Luxury Real Estat… |
| 2 | aurea-wheat-iota.vercel.app | 200 OK | AUREA Luxury Estates \| Architectural Sanctuaries… |
| 3 | vala-ten.vercel.app | 200 OK | VALA ESTATES — Prime Architectural & Coastal Real… |
| 4 | vanden-one.vercel.app | 200 OK | VANDEN \| Architectural Estates & Prime Global Resi… |
| 5 | pertiti.vercel.app | 200 OK | AETHERIA \| Architectural Living & Real Estate |
| 6 | protx1.vercel.app | 200 OK | AURAIA Architectural Estates — Modern Luxury Real… |
| 7 | prottx2.vercel.app | 200 OK | VÆLOR Monolith \| Ultra-Luxury Architectural Real E… |
| 8 | prottx3.vercel.app | 200 OK | ARKHĒ Architectural Real Estate |
| 9 | proppp1.vercel.app | 200 OK | VALO \| Architectural Estates & Prime Real Estate |
| 10 | poppp2.vercel.app | 200 OK | AUREXIS \| Ultra-Prime Architectural Real Estate & … |
| 11 | proppp3.vercel.app | 200 OK | VELARIS \| Ultra-Luxury Real Estate & Architectural… |
| 12 | proppp4.vercel.app | 200 OK | Atelier Vesta \| Architectural Real Estate |
| 13 | proppp5.vercel.app | 200 OK | VÉLUM \| Architectural Realty & Private Estates |
| 14 | proppp6.vercel.app | 200 OK | AETHERIA \| Architectural Sanctuaries & Luxury Esta… |
| 15 | propp7.vercel.app | 200 OK | AETHERIA \| Luxury Property & Architectural Estates |

Tidak ada tautan yang menghasilkan 404/403/redirect-error pada saat pengujian. Rekomendasi: jalankan
pemeriksaan ini berkala (mis. bulanan) karena 15 situs demo adalah aset jual utama.

### B.2 Tautan WhatsApp (5 lokasi, satu nomor)

| # | Lokasi | Berkas | Format |
| --- | --- | --- | --- |
| 1 | CTA hero "Konsultasi Gratis via WhatsApp" | `src/components/Hero.jsx` | `https://wa.me/628112223456` |
| 2 | Bar mengapung kanan bawah (desktop & mobile) | `src/components/WhatsAppBar.jsx` | `https://wa.me/628112223456` |
| 3–5 | Tautan konversi lain pada alur section | komponen section terkait | `https://wa.me/628112223456` |

Nomor ini juga dirujuk pada §6.5. Untuk menambahkan pesan otomatis, gunakan format:
`https://wa.me/628112223456?text=<pesan-terenkode-URL>` (§5.2).

### B.3 Tautan Pendukung Lain

| Jenis | URL / Nilai | Berkas |
| --- | --- | --- |
| Halaman publik generator | https://perchance.org/property-12 | `main.pjs`, `index.html` |
| E-mail kontak (belum `mailto:`) | hello@estate-web.studio | `src/components/Footer.jsx` |
| Favicon / apple-touch-icon | `https://user.uploads.dev/file/82555a6a99528792e2aeb8e8ed2441b7.svg` | `index.html` |
| Foto stok properti (9 URL) | `https://user.uploads.dev/file/<hash>.jpg` | `src/data.js` → `IMG` |
| Screenshot project (14 URL) | `https://user.uploads.dev/file/<hash>.png` | `src/data.js` → `SHOTS` |
| Dependensi runtime | `https://esm.sh/react@18.3.1`, `framer-motion@11.18.2`, `animejs@4.5.0`, `lucide-react@0.469.0`, `embla-carousel-react@8.5.1`, `lenis@1.1.18` | `src/libs.js`, `src/main.jsx` |
| Tailwind runtime | `https://cdn.tailwindcss.com` | `index.html` |
| Font | Google Fonts (Playfair Display, Plus Jakarta Sans) | `src/styles.css` |

> **Catatan pemeliharaan:** daftar ini adalah satu-satunya sumber tautan eksternal produk.
> Jika ada penambahan project demo baru, perbarui `PORTFOLIO` di `src/data.js` **dan** tabel §2.3/B.1
> agar keduanya tetap sinkron.

## Lampiran C — Referensi

- Dokumentasi anime.js v4 (parameter `composition`: `replace` / `none` / `blend`, `stagger`).
- Dokumentasi React 18 (`createRoot`, Context, Hooks).
- Dokumentasi Tailwind CSS (dark mode berbasis class, kustom tema).
- Dokumentasi Lenis (smooth scrolling, `scrollTo` dengan offset).
- Dokumentasi esbuild (JSX automatic, plugin `onResolve`/`onLoad`).
- Dokumentasi Perchance (sintaks pjs, `$meta`, plugin).
