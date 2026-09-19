import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const dict = {
  id: {
    dir: "ltr",
    navBrandTag: "Web Studio",
    navAriaTop: "Kembali ke atas",
    navMenuAria: "Buka menu navigasi",
    navCta: "Dapatkan Template",
    navLinks: [
      { href: "#solusi", label: "Solusi" },
      { href: "#widgets", label: "Widget Interaktif" },
      { href: "#keuntungan", label: "Keuntungan" },
      { href: "#case", label: "Studi Kasus" },
      { href: "#portfolio", label: "Portofolio" },
      { href: "#harga", label: "Harga" },
    ],
    heroBadge: "Spesialis Solusi Digital Industri Real Estate & Properti",
    heroTitleA: "Bangun Kehadiran Digital Kelas Dunia untuk",
    heroTitleB: "Proyek Properti, Kantor Broker, & Top Agen.",
    heroDesc:
      "Platform website siap pakai yang menggabungkan Branding Mewah, Lead Generation Otomatis, SEO Google Properti, dan Manajemen Listing dalam satu sistem.",
    heroCta1: "Eksplorasi Solusi Website",
    heroCta2: "Konsultasi Gratis via WhatsApp",
    heroTrust: ["100% Mobile Optimized", "Hak Milik Source Code", "SEO & Schema Ready"],
    heroImgAlt: "Platform website properti premium",
    heroChipLabel: "Core Web Vitals",
    pillarsKicker: "4 Core Pillars",
    pillarsTitle: "Bukan Sekadar Website Properti",
    pillarsSub:
      "Kami memahami bahasa dan siklus operasional bisnis properti — setiap elemen dirancang untuk prestise, konversi, dan produktivitas tim sales Anda.",
    solKicker: "Pilihan Solusi Sesuai Skala Bisnis",
    solTitle: "Solusi untuk Setiap Skala Bisnis Properti",
    solDesc:
      "Dari agen independen hingga pengembang kawasan — pilih fondasi website yang tumbuh seiring bisnis Anda.",
    widKicker: "Interactive Property Widgets Library",
    widTitle: "Modul Interaktif Siap Pakai",
    widDesc:
      "Fitur bawaan yang mengubah website menjadi mesin penjualan: kalkulator, penjadwalan, peta, hingga e-brochure.",
    caseKicker: "Mini Case Studies",
    caseTitle: "Hasil Nyata, Bukan Sekadar Janji",
    caseDesc: "Format: Tantangan → Solusi → Hasil.",
    portKicker: "Portofolio Proyek",
    portTitle: "Website Properti yang Kami Bangun",
    portDesc:
      "Sebagian dari website properti yang sudah kami kembangkan. Klik Sneak Peek untuk preview interaktif langsung, atau Demo untuk membuka tab baru.",
    portDemo: "Lihat Demo",
    portDemoSoon: "Demo Segera",
    portSneakPeek: "Sneak Peek",
    portVisit: "Buka Situs",
    widDemo: "Lihat Modul",
    pricKicker: "Pricing & Add-ons",
    pricTitle: "Paket Transparan Tanpa Biaya Tersembunyi",
    pricDesc:
      "Tiga paket jelas: jumlah halaman, timeline pengerjaan, kuota revisi, dan durasi support teknis.",
    pricAddonsTitle: "Add-on Layanan Opsional",
    pricFeatured: "Paling Disarankan",
    pricWarranty: "Garansi instalasi 24 jam di setiap pembelian",
    pricOnboard: "Sesi onboarding video call untuk setup",
    faqKicker: "Pertanyaan Umum",
    faqTitle: "FAQ",
    footerKicker: "Konsultasi Custom Website",
    footerTitle: "Siap Membangun Situs Properti Berkonversi Tinggi?",
    footerDesc:
      "Ceritakan kebutuhan Anda — tim kami siap membantu dari pemilihan template hingga custom build penuh.",
    formLabel: "Konsultasi cepat",
    formPlaceholder: "email@perusahaan.com",
    formSubmit: "Minta Penawaran",
    formDone: "Terima kasih! Lead Anda telah tersimpan di database kami. Tim kami akan menghubungi Anda dalam 24 jam.",
    footerColTemplate: "Template",
    footerColSupport: "Dukungan",
    footerColLinks: {
      template: ["The Developer Edition", "Luxury Agency Suite", "Solo Top-Agent", "Custom Build"],
      support: ["FAQ", "Panduan Deploy", "Kebijakan Privasi", "Hubungi Kami"],
    },
    footerAbout:
      "Template & jasa pembuatan website khusus industri real estate — cepat, elegan, dan dibangun untuk konversi.",
    footerCopy: "© 2026 Estate Web Studio. Seluruh hak cipta dilindungi.",
    footerTagline: "Siap deploy · SEO · Konversi tinggi",
    footerBackTop: "Kembali ke atas",
    waTitle: "Konsultasi Gratis",
    waText: "Tim kami siap membantu Anda.",
    waCta: "Chat via WhatsApp",
    waAria: "Buka chat WhatsApp",
    // Sneak peek translations
    previewTitle: "Sneak Peek Template Interaktif",
    previewSwitchDesktop: "Desktop (100%)",
    previewSwitchTablet: "Tablet (768px)",
    previewSwitchMobile: "Mobile (375px)",
    previewReload: "Muat Ulang",
    previewExternal: "Buka di Tab Baru",
    previewClose: "Tutup Preview",
    previewPrev: "Template Sebelumnya",
    previewNext: "Template Berikutnya",
    previewLoading: "Memuat live preview...",
    // Calculator modal
    calcTitle: "Simulasi Pembiayaan KPR Properti",
    calcSubtitle: "Hitung perkiraan cicilan bulanan dan rasio pinjaman untuk properti idaman Anda.",
    calcClose: "Tutup Kalkulator",
  },
  en: {
    dir: "ltr",
    navBrandTag: "Web Studio",
    navAriaTop: "Back to top",
    navMenuAria: "Open navigation menu",
    navCta: "Get Template",
    navLinks: [
      { href: "#solusi", label: "Solutions" },
      { href: "#widgets", label: "Interactive Widgets" },
      { href: "#keuntungan", label: "Benefits" },
      { href: "#case", label: "Case Studies" },
      { href: "#portfolio", label: "Portfolio" },
      { href: "#harga", label: "Pricing" },
    ],
    heroBadge: "Real Estate & Property Digital Solutions Specialist",
    heroTitleA: "Build a World-Class Digital Presence for",
    heroTitleB: "Property Developers, Brokerage Offices & Top Agents.",
    heroDesc:
      "A ready-to-deploy website platform combining luxury branding, automated lead generation, property-focused Google SEO, and listing management in one system.",
    heroCta1: "Explore Website Solutions",
    heroCta2: "Free WhatsApp Consultation",
    heroTrust: ["100% Mobile Optimized", "Full Source Ownership", "SEO & Schema Ready"],
    heroImgAlt: "Premium property website platform",
    heroChipLabel: "Core Web Vitals",
    pillarsKicker: "4 Core Pillars",
    pillarsTitle: "More Than a Property Website",
    pillarsSub:
      "We speak the language and operating cycle of the property business — every element engineered for prestige, conversion, and your sales team's productivity.",
    solKicker: "Solutions for Every Business Scale",
    solTitle: "A Solution for Every Property Business Scale",
    solDesc:
      "From independent agents to township developers — pick a website foundation that grows with your business.",
    widKicker: "Interactive Property Widgets Library",
    widTitle: "Ready-to-Use Interactive Modules",
    widDesc:
      "Built-in features that turn your website into a sales engine: calculators, scheduling, maps, and e-brochures.",
    caseKicker: "Mini Case Studies",
    caseTitle: "Real Results, Not Just Promises",
    caseDesc: "Format: Challenge → Solution → Result.",
    portKicker: "Project Portfolio",
    portTitle: "Property Websites We Build",
    portDesc:
      "A selection of the property websites we've developed. Click Sneak Peek for a live embedded preview, or Demo to open in a new tab.",
    portDemo: "View Demo",
    portDemoSoon: "Demo Soon",
    portSneakPeek: "Sneak Peek",
    portVisit: "Visit Site",
    widDemo: "View Module",
    pricKicker: "Pricing & Add-ons",
    pricTitle: "Transparent Pricing, No Hidden Fees",
    pricDesc:
      "Three clear packages: number of pages, build timeline, revision quota, and technical support duration.",
    pricAddonsTitle: "Optional Add-on Services",
    pricFeatured: "Most Popular",
    pricWarranty: "24-hour installation warranty on every purchase",
    pricOnboard: "Video-call onboarding session for setup",
    faqKicker: "Frequently Asked Questions",
    faqTitle: "FAQ",
    footerKicker: "Custom Website Consultation",
    footerTitle: "Ready to Build a High-Converting Property Site?",
    footerDesc:
      "Tell us what you need — our team will help you from template selection all the way to a full custom build.",
    formLabel: "Quick consultation",
    formPlaceholder: "email@company.com",
    formSubmit: "Request a Quote",
    formDone: "Thank you! Your inquiry has been saved to our database. Our team will contact you within 24 hours.",
    footerColTemplate: "Templates",
    footerColSupport: "Support",
    footerColLinks: {
      template: ["The Developer Edition", "Luxury Agency Suite", "Solo Top-Agent", "Custom Build"],
      support: ["FAQ", "Deploy Guide", "Privacy Policy", "Contact Us"],
    },
    footerAbout:
      "Templates and custom website builds for the real estate industry — fast, elegant, and engineered for conversion.",
    footerCopy: "© 2026 Estate Web Studio. All rights reserved.",
    footerTagline: "Ready to deploy · SEO · High conversion",
    footerBackTop: "Back to top",
    waTitle: "Free Consultation",
    waText: "Our team is ready to help.",
    waCta: "Chat on WhatsApp",
    waAria: "Open WhatsApp chat",
    // Sneak peek translations
    previewTitle: "Interactive Template Sneak Peek",
    previewSwitchDesktop: "Desktop (100%)",
    previewSwitchTablet: "Tablet (768px)",
    previewSwitchMobile: "Mobile (375px)",
    previewReload: "Reload",
    previewExternal: "Open in New Tab",
    previewClose: "Close Preview",
    previewPrev: "Previous Template",
    previewNext: "Next Template",
    previewLoading: "Loading live preview...",
    // Calculator modal
    calcTitle: "Property Mortgage & Loan Simulation",
    calcSubtitle: "Calculate estimated monthly installments and loan ratios for your dream residence.",
    calcClose: "Close Calculator",
  },
};

const applyTheme = (theme) => {
  const root = document.documentElement;
  if (!root) return;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
};

export const LangContext = createContext(null);

export const useLang = () => useContext(LangContext);

export default function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem("ew.lang");
      return saved === "en" ? "en" : "id";
    } catch {
      return "id";
    }
  });

  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("ew.theme");
      if (saved === "dark" || saved === "light") return saved;
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    } catch {
    }
    return "light";
  });

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem("ew.theme", theme);
    } catch {
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem("ew.lang", lang);
    } catch {
    }
  }, [lang]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const toggleLang = () => setLang((l) => (l === "id" ? "en" : "id"));

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      theme,
      setTheme,
      toggleTheme,
      t: dict[lang],
    }),
    [lang, theme]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
