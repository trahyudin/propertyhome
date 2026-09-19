import {
  Anchor,
  BellRing,
  Building2,
  Calculator,
  CalendarCheck,
  Code2,
  Cpu,
  Database,
  Download,
  Flag,
  Flower2,
  Gauge,
  Gem,
  Image,
  Layers,
  LayoutGrid,
  Map,
  Megaphone,
  MessageCircle,
  Plane,
  Rocket,
  Share2,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Waves,
} from 'lucide-react';

export const IMG = {
  hero: "https://user.uploads.dev/file/7a46590d4441462096c2fdd68088be7f.jpg",
  coast: "https://user.uploads.dev/file/6cf8acb1bdd5464998a3097a760edac4.jpg",
  loft: "https://user.uploads.dev/file/432928826c00a99b500c25cf833828a2.jpg",
  penthouse: "https://user.uploads.dev/file/3c744fe5c7db4509f3381e8880549ce0.jpg",
  med: "https://user.uploads.dev/file/d6561db324fde8ef389dab96f642ad1a.jpg",
  twilight: "https://user.uploads.dev/file/3a6b5f56ce39fe0209b015b413289633.jpg",
  rooftop: "https://user.uploads.dev/file/7eb1c5ce31804e43fd55b6b3c7877617.jpg",
  spa: "https://user.uploads.dev/file/6b50ff3c8b77dea727125d7e9d9d9700.jpg",
  tropical: "https://user.uploads.dev/file/368bbd0d513fae1d9ec34cb228dae072.jpg",
};

export const SHOTS = {
  solara: "https://user.uploads.dev/file/0e316c11441541faed90493ea7bc4617.png",
  aurea: "https://user.uploads.dev/file/c38e31ff2396b9de1543736176a00054.png",
  vala: "https://user.uploads.dev/file/06006f38dddd56ac40d70ffe7f01760f.png",
  vanden: "https://user.uploads.dev/file/b1cbc8784b60d0f1f90dd3910a0e0016.png",
  aetheria: "https://user.uploads.dev/file/32439df559f818ba447ee2c0b289c44d.png",
  auraia: "https://user.uploads.dev/file/a39271c59a9e270d46139115291af6ed.png",
  vaelor: "https://user.uploads.dev/file/56b140a2f4130efbe65e9e13c5f81349.png",
  arkhe: "https://user.uploads.dev/file/1ee9b94caf53f16821ade2c3c62cc00d.png",
  valo: "https://user.uploads.dev/file/e3fa592e5f410640a2e6ed9dd27dd50f.png",
  aurexis: "https://user.uploads.dev/file/19b1173f7327fca9ddf9784298720186.png",
  velaris: "https://user.uploads.dev/file/973e38ced0529c26fdb3585927ea7977.png",
  vesta: "https://user.uploads.dev/file/c4c86944c27547b035847aba21104e6c.png",
  velum: "https://user.uploads.dev/file/dd5266d73f6e5ca4dba543d5e18695bb.png",
  sanctuaries: "https://user.uploads.dev/file/6ca9ac4d5991dbd536175fc4ccf10890.png",
};

export const PORTFOLIO_CATEGORIES = ["Semua", "Luxury Villa", "Urban Penthouse", "Eco Resort"];

export const PORTFOLIO = [
  {
    id: "portfolio-1",
    title: "Solara Estates",
    category: "Luxury Villa",
    tag: "Tropical Luxury",
    badge: "Live Project",
    description:
      "Portal properti tropis mewah Bali — koleksi residence eksklusif, private villa, dan prime development di destinasi paling dicari di Pulau Dewata.",
    image: SHOTS.solara,
    fallback: IMG.tropical,
    techStack: ["Vite + React", "Tailwind CSS", "Editorial Serif"],
    features: ["Curated Villas", "Prime Bali Destinations"],
    liveUrl: "https://solara-estates-56wi.vercel.app/",
  },
  {
    id: "portfolio-2",
    title: "AUREA",
    category: "Urban Penthouse",
    tag: "Trophy Villas",
    badge: "Live Project",
    description:
      "Portfolio privat sanctuaries cliff-front dan trophy residences — villa arsitektural modern untuk kolektor properti di Uluwatu.",
    image: SHOTS.aurea,
    fallback: IMG.hero,
    techStack: ["Vite + React", "Tailwind CSS", "Dark Cinematic"],
    features: ["Cliff-Front Sanctuaries", "Private Portfolio"],
    liveUrl: "https://aurea-wheat-iota.vercel.app/",
  },
  {
    id: "portfolio-3",
    title: "VALA ESTATES",
    category: "Eco Resort",
    tag: "Coastal Estates",
    badge: "Live Project",
    description:
      "Real estate arsitektural & coastal pilihan — villa mewah, clifftop sanctuary, dan estate di Uluwatu, Bingin, dan enclave pantai premium Bali.",
    image: SHOTS.vala,
    fallback: IMG.coast,
    techStack: ["Vite + React", "Tailwind CSS", "Warm Minimal"],
    features: ["Clifftop Sanctuaries", "Coastal Enclaves"],
    liveUrl: "https://vala-ten.vercel.app/",
  },
  {
    id: "portfolio-4",
    title: "VANDEN",
    category: "Luxury Villa",
    tag: "Global Estates",
    badge: "Live Project",
    description:
      "Kurasi monumen arsitektural langka, estate pesisir premium, dan private reserve residence di destinasi global paling bergengsi.",
    image: SHOTS.vanden,
    fallback: IMG.loft,
    techStack: ["Vite + React", "Tailwind CSS", "Editorial Serif"],
    features: ["Architectural Monuments", "Private Reserves"],
    liveUrl: "https://vanden-one.vercel.app/",
  },
  {
    id: "portfolio-5",
    title: "AETHERIA",
    category: "Urban Penthouse",
    tag: "Modernist Living",
    badge: "Live Project",
    description:
      "Platform real estate global bespoke — villa modernis langka, penthouse ikonik, estate privat off-market, dan layanan concierge interaktif.",
    image: SHOTS.aetheria,
    fallback: IMG.penthouse,
    techStack: ["Vite + React", "Tailwind CSS", "Modernist"],
    features: ["Off-Market Estates", "Concierge Services"],
    liveUrl: "https://pertiti.vercel.app/",
  },
  {
    id: "portfolio-6",
    title: "AURAIA",
    category: "Luxury Villa",
    tag: "Architectural",
    badge: "Live Project",
    description:
      "Real estate arsitektural kelas dunia — koleksi residence ikonik, sanctuaries, dan estate modernis dengan standard ultra-luxury.",
    image: SHOTS.auraia,
    fallback: IMG.med,
    techStack: ["Vite + React", "Tailwind CSS", "Serif Editorial"],
    features: ["Iconic Residences", "Modernist Estates"],
    liveUrl: "https://protx1.vercel.app/",
  },
  {
    id: "portfolio-7",
    title: "VÆLOR",
    category: "Urban Penthouse",
    tag: "Ultra-Luxury",
    badge: "Live Project",
    description:
      "Platform real estate sinematik generasi baru — residence terkurasi, penthouse sanctuary, lifestyle discovery, dan investment intelligence.",
    image: SHOTS.vaelor,
    fallback: IMG.twilight,
    techStack: ["Vite + React", "Tailwind CSS", "Cinematic Dark"],
    features: ["Lifestyle Discovery", "Investment Intelligence"],
    liveUrl: "https://prottx2.vercel.app/",
  },
  {
    id: "portfolio-8",
    title: "ARKHĒ",
    category: "Luxury Villa",
    tag: "Marketplace",
    badge: "Live Project",
    description:
      "Marketplace properti mewah dunia, editorial arsitektural, dan platform discovery interaktif untuk residence paling luar biasa.",
    image: SHOTS.arkhe,
    fallback: IMG.rooftop,
    techStack: ["Vite + React", "Tailwind CSS", "Editorial"],
    features: ["Luxury Marketplace", "Architectural Editorial"],
    liveUrl: "https://prottx3.vercel.app/",
  },
  {
    id: "portfolio-9",
    title: "VALO",
    category: "Luxury Villa",
    tag: "Editorial",
    badge: "Live Project",
    description:
      "Koleksi hunian pantai editorial modern, coastal enclave, dan properti tropis arsitektural bernilai tinggi.",
    image: SHOTS.valo,
    fallback: IMG.coast,
    techStack: ["Vite + React", "Tailwind CSS", "Light Minimal"],
    features: ["Coastal Enclave", "Modern Editorial"],
    liveUrl: "https://proppp1.vercel.app/",
  },
  {
    id: "portfolio-10",
    title: "AUREXIS",
    category: "Urban Penthouse",
    tag: "Dark Cinematic",
    badge: "Live Project",
    description:
      "Penthouse metropolitan premium dan penthouse suite bertingkat dengan pemandangan cakrawala kota tak tertandingi.",
    image: SHOTS.aurexis,
    fallback: IMG.penthouse,
    techStack: ["Vite + React", "Tailwind CSS", "Dark Cinematic"],
    features: ["Skyline Vistas", "Private Elevator"],
    liveUrl: "https://poppp2.vercel.app/",
  },
  {
    id: "portfolio-11",
    title: "VELARIS",
    category: "Luxury Villa",
    tag: "Cinematic",
    badge: "Live Project",
    description:
      "Koleksi villa kontemporer eksklusif dengan pencahayaan sinematik dan privasi maksimal.",
    image: SHOTS.velaris,
    fallback: IMG.hero,
    techStack: ["Vite + React", "Tailwind CSS", "Cinematic"],
    features: ["Infinity Pool", "Panoramic Glass"],
    liveUrl: "https://proppp3.vercel.app/",
  },
  {
    id: "portfolio-12",
    title: "Atelier Vesta",
    category: "Luxury Villa",
    tag: "Atelier Serif",
    badge: "Live Project",
    description:
      "Studio arsitektur hunian dengan sentuhan kerajinan tangan, material alami, dan kehangatan tropis.",
    image: SHOTS.vesta,
    fallback: IMG.loft,
    techStack: ["Vite + React", "Tailwind CSS", "Atelier Serif"],
    features: ["Handcrafted Finish", "Tropical Warmth"],
    liveUrl: "https://proppp4.vercel.app/",
  },
  {
    id: "portfolio-13",
    title: "VÉLUM",
    category: "Urban Penthouse",
    tag: "Dark Minimal",
    badge: "Live Project",
    description:
      "Penthouse minimalis bernuansa monokrom dengan tata cahaya arsitektural dan ruang terbuka luas.",
    image: SHOTS.velum,
    fallback: IMG.twilight,
    techStack: ["Vite + React", "Tailwind CSS", "Dark Minimal"],
    features: ["Double-Height Living", "Private Terrace"],
    liveUrl: "https://proppp5.vercel.app/",
  },
  {
    id: "portfolio-14",
    title: "AETHERIA · Sanctuaries",
    category: "Luxury Villa",
    tag: "Serif Editorial",
    badge: "Live Project",
    description:
      "Sanctuary privat terpencil di puncak tebing dengan pemandangan samudra tanpa batas.",
    image: SHOTS.sanctuaries,
    fallback: IMG.med,
    techStack: ["Vite + React", "Tailwind CSS", "Serif Editorial"],
    features: ["Cliff Sanctuary", "Oceanfront Horizon"],
    liveUrl: "https://proppp6.vercel.app/",
  },
  {
    id: "portfolio-15",
    title: "AETHERIA · Estate",
    category: "Eco Resort",
    tag: "Bright Minimal",
    badge: "Live Project",
    description:
      "Eco resort modern berbalut keindahan alam tropis, material ramah lingkungan, dan kenyamanan bintang lima.",
    image: SHOTS.aetheria,
    fallback: IMG.spa,
    techStack: ["Vite + React", "Tailwind CSS", "Bright Minimal"],
    features: ["Sustainable Eco Design", "Five-Star Comfort"],
    liveUrl: "https://propp7.vercel.app/",
  },
];

export const L = (id, en) => ({ id, en });

export const PILLARS = [
  {
    icon: Gem,
    title: L("Branding & Trust", "Branding & Trust"),
    desc: L(
      "Meningkatkan prestise dan kepercayaan pembeli properti pada proyek, kantor agen, atau personal brand Anda.",
      "Raise prestige and buyer trust in your project, agency office, or personal brand."
    ),
    tags: ["Desain Editorial", "Masterplan Showcase", "Legalitas Developer", "Portofolio Proyek"],
  },
  {
    icon: Megaphone,
    title: L("Marketing & Lead Generation", "Marketing & Lead Generation"),
    desc: L(
      "Mengubah pengunjung menjadi jadwal private viewing dan booking — setiap halaman mengarah ke konversi.",
      "Turn visitors into private-viewing appointments and bookings — every page funnels to conversion."
    ),
    tags: ["Launching Page", "CTA WhatsApp", "Fast Inquiry Form", "Booking Fee Funnel"],
  },
  {
    icon: Gauge,
    title: L("Visibility & Property SEO", "Visibility & Property SEO"),
    desc: L(
      "Optimasi mesin pencari khusus properti — schema, kecepatan, dan mobile-first agar mudah ditemukan.",
      "Property-specific search engine optimization — schema, speed, and mobile-first discoverability."
    ),
    tags: ["Schema Real Estate", "Fast Loading", "Google Maps", "Mobile-First"],
  },
  {
    icon: Layers,
    title: L("Listing & Sales Productivity", "Listing & Sales Productivity"),
    desc: L(
      "Manajemen listing terpusat dan tool tim sales — pengelolaan fasilitas bagi admin pemula tanpa kode.",
      "Centralized listing management and sales-team tools — beginner-friendly editing with zero code."
    ),
    tags: ["CMS Listing", "Filter Lanjutan", "Auto-routing Lead", "Admin Mudah"],
  },
];

export const WIDGETS = [
  {
    id: "floorplan",
    icon: LayoutGrid,
    title: L("Interactive Floor Plan Viewer", "Interactive Floor Plan Viewer"),
    desc: L(
      "Denah interaktif dengan hotspot ruangan, luas area, dan deskripsi tiap unit — tanpa memperlambat situs.",
      "Interactive floor plans with room hotspots, areas, and per-unit details — without slowing the site."
    ),
  },
  {
    id: "calculator",
    icon: Calculator,
    title: L("KPR / Mortgage Calculator", "KPR / Mortgage Calculator"),
    desc: L(
      "Kalkulator estimasi cicilan KPR real-time yang memicu minat pembeli dan meningkatkan lead serius.",
      "Real-time mortgage installment estimator that sparks buyer interest and boosts serious leads."
    ),
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    title: L("WhatsApp Schedule Viewing Widget", "WhatsApp Schedule Viewing Widget"),
    desc: L(
      "Tombol penjadwalan private viewing yang langsung terhubung ke WhatsApp tim sales Anda.",
      "A schedule-viewing button wired straight into your sales team's WhatsApp."
    ),
  },
  {
    id: "maps",
    icon: Map,
    title: L("Google Maps & Nearby Explorer", "Google Maps & Nearby Explorer"),
    desc: L(
      "Peta lokasi dengan eksplorasi fasilitas sekitar: sekolah, rumah sakit, mall, dan akses tol.",
      "Location map exploring nearby amenities: schools, hospitals, malls, and toll access."
    ),
  },
  {
    id: "brochure",
    icon: Download,
    title: L("E-Brochure & Price List Gate", "E-Brochure & Price List Gate"),
    desc: L(
      "Unduh e-brochure proyek dan price list dengan form — mengubah pengunjung jadi data kontak.",
      "Project e-brochure and price-list download gated by a form — turning visitors into contacts."
    ),
  },
];

export const TIERS = [
  {
    id: "solo",
    level: L("Tingkat 1", "Level 1"),
    title: L("Solo Top-Agent Brand", "Solo Top-Agent Brand"),
    audience: L("Broker / Agen Independen", "Independent Broker / Agent"),
    price: L("Rp 12,2 jt", "$790"),
    focus: L(
      "Personal authority, direct closing, listing eksklusif, dan bio link interaktif.",
      "Personal authority, direct closing, exclusive listings, and interactive bio link."
    ),
    features: [
      "Personal Profile & Branding",
      "Direct Booking Client",
      "Testimonial & Social Proof",
      "Portfolio Listing Pribadi",
      "WhatsApp Direct Chat",
    ],
  },
  {
    id: "agency",
    level: L("Tingkat 2", "Level 2"),
    title: L("Property Agency / Brokerage Hub", "Property Agency / Brokerage Hub"),
    audience: L("Kantor Agen Berlisensi", "Licensed Agency Office"),
    price: L("Rp 26,1 jt", "$1,690"),
    focus: L(
      "Multi-agent directory, katalog multi-listing, dan filter area & harga lanjutan.",
      "Multi-agent directory, multi-listing catalog, and advanced area & price filters."
    ),
    features: [
      "Multi-Agent Directory",
      "Multi-Listing Catalog",
      "Area & Harga Filter",
      "Integrasi CRM + WhatsApp",
      "Auto-routing Lead per Agen",
    ],
  },
  {
    id: "developer",
    level: L("Tingkat 3", "Level 3"),
    title: L("Developer & Masterplan Suite", "Developer & Masterplan Suite"),
    audience: L("Pengembang Kawasan / Apartemen", "Township / Apartment Developer"),
    price: L("Rp 40,5 jt", "$2,690"),
    focus: L(
      "Showcase masterplan proyek, 360° virtual tour, interactive floor plan, dan booking fee funnel.",
      "Project masterplan showcase, 360° virtual tour, interactive floor plans, and booking-fee funnel."
    ),
    features: [
      "Masterplan Showcase",
      "360° Virtual Tour Embed",
      "Interactive Floor Plan",
      "Booking Fee Funnel",
      "NUP Registration Portal",
    ],
  },
];

export const CASES = [
  {
    icon: Building2,
    name: L("Developer Kota Mandiri", "Township Developer"),
    challenge: L("Brosur fisik mahal & hasil sulit dilacak.", "Expensive physical brochures with no trackable results."),
    solution: L("Masterplan website + lead form terpadu.", "Integrated masterplan website + lead form."),
    result: L("+180% Registrasi NUP", "+180% NUP registrations"),
    tag: L("Pengembangan", "Development"),
  },
  {
    icon: TrendingUp,
    name: L("Luxury Agency", "Luxury Agency"),
    challenge: L("Website lambat & katalog listing berantakan.", "Slow website & messy listing catalog."),
    solution: L("Smart catalog filter + fast loading.", "Smart catalog filters + fast loading."),
    result: L("+300% Inbound Leads via WhatsApp", "+300% inbound leads via WhatsApp"),
    tag: L("Agen Mewah", "Agency"),
  },
  {
    icon: Rocket,
    name: L("Residential Cluster", "Residential Cluster"),
    challenge: L("Tidak terindeks Google & tanpa pipeline lead.", "Invisible on Google & no lead pipeline."),
    solution: L("Launching page + schema + Meta Pixel.", "Launch page + schema + Meta Pixel."),
    result: L("2.4x Konversi Lead", "2.4x lead conversion"),
    tag: L("Cluster / Rumah", "Cluster / Homes"),
  },
];

export const ADDONS = [
  { id: "vtour", label: L("Virtual Tour 360° Integration", "Virtual Tour 360° Integration") },
  { id: "copy", label: L("Copywriting & Listing Copy", "Copywriting & Listing Copy") },
  { id: "ads", label: L("Setup Google Ads / Meta Pixel", "Google Ads / Meta Pixel Setup") },
  { id: "maintenance", label: L("Pemeliharaan Bulanan", "Monthly Maintenance") },
];

export const FAQS = [
  {
    q: L(
      "Apakah bisa diintegrasikan ke WhatsApp & CRM?",
      "Can it integrate with WhatsApp & CRM?"
    ),
    a: L(
      "Ya. Setiap template sudah menyertakan tombol WhatsApp dan endpoint form yang siap dihubungkan ke database MySQL atau CRM populer seperti HubSpot, Pipedrive, dan notifikasi ke grup WhatsApp Anda.",
      "Yes. Every template ships with a WhatsApp button and a form endpoint ready to connect to MySQL database or popular CRMs like HubSpot, Pipedrive, or your WhatsApp group notifications."
    ),
  },
  {
    q: L("Bagaimana cara mengubah listing properti?", "How do I update property listings?"),
    a: L(
      "Semua data properti tersimpan rapi di database MySQL (atau file data terstruktur). Melalui cPanel phpMyAdmin atau form admin, Anda cukup mengisi field seperti nama, harga, foto, dan deskripsi tanpa menyentuh kode program.",
      "All property data is neatly stored in MySQL database (or structured data file). Through cPanel phpMyAdmin or admin forms, you simply fill in fields like name, price, photos, and description without touching code."
    ),
  },
  {
    q: L("Apakah sudah termasuk hosting & domain?", "Are hosting & domain included?"),
    a: L(
      "Template ini 100% siap dideploy ke cPanel hosting Anda sendiri (lengkap dengan skrip build, .htaccess, dan database.sql). Anda juga mendapatkan panduan deployment cPanel langkah demi langkah.",
      "This template is 100% ready to deploy to your own cPanel hosting (complete with build scripts, .htaccess, and database.sql). You also get a step-by-step cPanel deployment guide."
    ),
  },
  {
    q: L("Bagaimana bantuan setup-nya?", "What setup assistance is provided?"),
    a: L(
      "Setiap pembelian mendapat garansi instalasi 24 jam dan sesi onboarding via video call untuk memastikan template berjalan, konten terisi, dan integrasi API / database tersambung dengan benar di cPanel Anda.",
      "Every purchase includes a 24-hour installation warranty and a video-call onboarding session to make sure the template runs, content is filled, and your API / database is connected properly on your cPanel."
    ),
  },
  {
    q: L("Apakah saya mendapat kode sumber sepenuhnya?", "Do I get full source code?"),
    a: L(
      "Tentu. Anda menerima 100% kode sumber (Frontend React Vite + Backend PHP/Express + Database SQL) tanpa biaya lisensi bulanan. Boleh dimodifikasi, dipindah hosting, dan digunakan untuk proyek Anda tanpa batasan.",
      "Absolutely. You receive 100% of the source code (Frontend React Vite + Backend PHP/Express + Database SQL) with no recurring license fees. Modify it, move hosts, and use it for your projects without restriction."
    ),
  },
];

export const PLANS = [
  {
    name: L("Solo Agent", "Solo Agent"),
    price: L("Rp 9,9 jt", "$649"),
    featured: false,
    spec: [
      L("1 Halaman Landing", "1 Landing Page"),
      L("5 Halaman Listing", "5 Listing Pages"),
      L("Timeline 3–5 hari", "3–5 day timeline"),
      L("1x Kuota Revisi", "1x Revision"),
      L("Support 1 Bulan", "1-Month Support"),
    ],
    cta: L("Pilih Paket Solo", "Choose Solo"),
  },
  {
    name: L("Agency Hub", "Agency Hub"),
    price: L("Rp 19,9 jt", "$1,290"),
    featured: true,
    spec: [
      L("1 Halaman Landing", "1 Landing Page"),
      L("20 Halaman Listing", "20 Listing Pages"),
      L("Timeline 7–10 hari", "7–10 day timeline"),
      L("3x Kuota Revisi", "3x Revisions"),
      L("Support 3 Bulan", "3-Month Support"),
    ],
    cta: L("Pilih Agency Hub", "Choose Agency Hub"),
  },
  {
    name: L("Developer Enterprise", "Developer Enterprise"),
    price: L("Rp 49 jt", "$3,190"),
    featured: false,
    spec: [
      L("Custom Unlimited Halaman", "Custom Unlimited Pages"),
      L("Multi-Proyek & CMS", "Multi-Project & CMS"),
      L("Timeline 2–4 minggu", "2–4 week timeline"),
      L("Revisi tanpa batas", "Unlimited Revisions"),
      L("Support 12 Bulan", "12-Month Support"),
    ],
    cta: L("Konsultasi Enterprise", "Talk to Us"),
  },
];
