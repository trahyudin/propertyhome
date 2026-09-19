import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure data folder exists for local lead fallback
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// MySQL Connection Pool (Optional - falls back gracefully if not configured)
let pool = null;
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'estatewerks_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

async function testDb() {
  try {
    pool = mysql.createPool(dbConfig);
    const conn = await pool.getConnection();
    console.log(`[DB] Connected to MySQL database "${dbConfig.database}"`);
    conn.release();
  } catch (err) {
    console.log('[DB] MySQL connection not active. Using resilient file-based storage fallback.');
    pool = null;
  }
}
testDb();

// -----------------------------------------------------------------------------
// API Routes
// -----------------------------------------------------------------------------

// Health check
app.get('/api/health', async (req, res) => {
  let dbStatus = 'disconnected (using file fallback)';
  let leadCount = 0;
  let projectCount = 0;

  if (pool) {
    try {
      const [leads] = await pool.query('SELECT COUNT(*) as count FROM leads');
      const [projects] = await pool.query('SELECT COUNT(*) as count FROM projects');
      leadCount = leads[0]?.count || 0;
      projectCount = projects[0]?.count || 0;
      dbStatus = 'connected';
    } catch (e) {
      dbStatus = `error: ${e.message}`;
    }
  }

  res.json({
    success: true,
    data: {
      app: 'Estatewerks Node.js API',
      status: 'healthy',
      node_version: process.version,
      database: {
        status: dbStatus,
        host: dbConfig.host,
        database: dbConfig.database,
        leads_count: leadCount,
        projects_count: projectCount,
      },
      time: new Date().toISOString(),
    },
  });
});

// Portfolio API
app.get('/api/portfolio', async (req, res) => {
  if (pool) {
    try {
      const [rows] = await pool.query(
        'SELECT id, title, category, tag, badge, description, image, fallback, tech_stack, features, live_url FROM projects WHERE is_published = 1 ORDER BY sort_order ASC'
      );
      if (rows.length > 0) {
        const formatted = rows.map((r) => ({
          id: r.id,
          title: r.title,
          category: r.category,
          tag: r.tag,
          badge: r.badge,
          description: r.description,
          image: r.image,
          fallback: r.fallback,
          techStack: typeof r.tech_stack === 'string' ? JSON.parse(r.tech_stack) : r.tech_stack,
          features: typeof r.features === 'string' ? JSON.parse(r.features) : r.features,
          liveUrl: r.live_url,
        }));
        return res.json({ success: true, data: formatted });
      }
    } catch (err) {
      console.error('[API] Portfolio DB error:', err.message);
    }
  }

  // Fallback to static JSON file or default array
  const defaultPortfolio = [
    {
      id: "portfolio-1",
      title: "Solara Estates",
      category: "Luxury Villa",
      tag: "Tropical Luxury",
      badge: "Live Project",
      description: "Portal properti tropis mewah Bali — koleksi residence eksklusif, private villa, dan prime development di destinasi paling dicari di Pulau Dewata.",
      image: "https://user.uploads.dev/file/0e316c11441541faed90493ea7bc4617.png",
      fallback: "https://user.uploads.dev/file/368bbd0d513fae1d9ec34cb228dae072.jpg",
      techStack: ["Vite + React", "Tailwind CSS", "Editorial Serif"],
      features: ["Curated Villas", "Prime Bali Destinations"],
      liveUrl: "https://solara-estates-56wi.vercel.app/"
    },
    {
      id: "portfolio-2",
      title: "AUREA",
      category: "Urban Penthouse",
      tag: "Trophy Villas",
      badge: "Live Project",
      description: "Portfolio privat sanctuaries cliff-front dan trophy residences — villa arsitektural modern untuk kolektor properti di Uluwatu.",
      image: "https://user.uploads.dev/file/c38e31ff2396b9de1543736176a00054.png",
      fallback: "https://user.uploads.dev/file/7a46590d4441462096c2fdd68088be7f.jpg",
      techStack: ["Vite + React", "Tailwind CSS", "Dark Cinematic"],
      features: ["Cliff-Front Sanctuaries", "Private Portfolio"],
      liveUrl: "https://aurea-wheat-iota.vercel.app/"
    },
    {
      id: "portfolio-3",
      title: "VALA ESTATES",
      category: "Eco Resort",
      tag: "Coastal Estates",
      badge: "Live Project",
      description: "Real estate arsitektural & coastal pilihan — villa mewah, clifftop sanctuary, dan estate di Uluwatu, Bingin, dan enclave pantai premium Bali.",
      image: "https://user.uploads.dev/file/06006f38dddd56ac40d70ffe7f01760f.png",
      fallback: "https://user.uploads.dev/file/6cf8acb1bdd5464998a3097a760edac4.jpg",
      techStack: ["Vite + React", "Tailwind CSS", "Warm Minimal"],
      features: ["Clifftop Sanctuaries", "Coastal Enclaves"],
      liveUrl: "https://vala-ten.vercel.app/"
    },
    {
      id: "portfolio-4",
      title: "VANDEN",
      category: "Luxury Villa",
      tag: "Global Estates",
      badge: "Live Project",
      description: "Kurasi monumen arsitektural langka, estate pesisir premium, dan private reserve residence di destinasi global paling bergengsi.",
      image: "https://user.uploads.dev/file/b1cbc8784b60d0f1f90dd3910a0e0016.png",
      fallback: "https://user.uploads.dev/file/432928826c00a99b500c25cf833828a2.jpg",
      techStack: ["Vite + React", "Tailwind CSS", "Editorial Serif"],
      features: ["Architectural Monuments", "Private Reserves"],
      liveUrl: "https://vanden-one.vercel.app/"
    },
    {
      id: "portfolio-5",
      title: "AETHERIA",
      category: "Urban Penthouse",
      tag: "Modernist Living",
      badge: "Live Project",
      description: "Platform real estate global bespoke — villa modernis langka, penthouse ikonik, estate privat off-market, dan layanan concierge interaktif.",
      image: "https://user.uploads.dev/file/32439df559f818ba447ee2c0b289c44d.png",
      fallback: "https://user.uploads.dev/file/3c744fe5c7db4509f3381e8880549ce0.jpg",
      techStack: ["Vite + React", "Tailwind CSS", "Modernist"],
      features: ["Off-Market Estates", "Concierge Services"],
      liveUrl: "https://pertiti.vercel.app/"
    },
    {
      id: "portfolio-6",
      title: "AURAIA",
      category: "Luxury Villa",
      tag: "Architectural",
      badge: "Live Project",
      description: "Real estate arsitektural kelas dunia — koleksi residence ikonik, sanctuaries, dan estate modernis dengan standard ultra-luxury.",
      image: "https://user.uploads.dev/file/a39271c59a9e270d46139115291af6ed.png",
      fallback: "https://user.uploads.dev/file/d6561db324fde8ef389dab96f642ad1a.jpg",
      techStack: ["Vite + React", "Tailwind CSS", "Serif Editorial"],
      features: ["Iconic Residences", "Modernist Estates"],
      liveUrl: "https://protx1.vercel.app/"
    },
    {
      id: "portfolio-7",
      title: "VÆLOR",
      category: "Urban Penthouse",
      tag: "Ultra-Luxury",
      badge: "Live Project",
      description: "Platform real estate sinematik generasi baru — residence terkurasi, penthouse sanctuary, lifestyle discovery, dan investment intelligence.",
      image: "https://user.uploads.dev/file/56b140a2f4130efbe65e9e13c5f81349.png",
      fallback: "https://user.uploads.dev/file/3a6b5f56ce39fe0209b015b413289633.jpg",
      techStack: ["Vite + React", "Tailwind CSS", "Cinematic Dark"],
      features: ["Lifestyle Discovery", "Investment Intelligence"],
      liveUrl: "https://prottx2.vercel.app/"
    },
    {
      id: "portfolio-8",
      title: "ARKHĒ",
      category: "Luxury Villa",
      tag: "Marketplace",
      badge: "Live Project",
      description: "Marketplace properti mewah dunia, editorial arsitektural, dan platform discovery interaktif untuk residence paling luar biasa.",
      image: "https://user.uploads.dev/file/1ee9b94caf53f16821ade2c3c62cc00d.png",
      fallback: "https://user.uploads.dev/file/7eb1c5ce31804e43fd55b6b3c7877617.jpg",
      techStack: ["Vite + React", "Tailwind CSS", "Editorial"],
      features: ["Luxury Marketplace", "Architectural Editorial"],
      liveUrl: "https://prottx3.vercel.app/"
    },
    {
      id: "portfolio-9",
      title: "VALO",
      category: "Luxury Villa",
      tag: "Editorial",
      badge: "Live Project",
      description: "Koleksi hunian pantai editorial modern, coastal enclave, dan properti tropis arsitektural bernilai tinggi.",
      image: "https://user.uploads.dev/file/e3fa592e5f410640a2e6ed9dd27dd50f.png",
      fallback: "https://user.uploads.dev/file/6cf8acb1bdd5464998a3097a760edac4.jpg",
      techStack: ["Vite + React", "Tailwind CSS", "Light Minimal"],
      features: ["Coastal Enclave", "Modern Editorial"],
      liveUrl: "https://proppp1.vercel.app/"
    },
    {
      id: "portfolio-10",
      title: "AUREXIS",
      category: "Urban Penthouse",
      tag: "Dark Cinematic",
      badge: "Live Project",
      description: "Penthouse metropolitan premium dan penthouse suite bertingkat dengan pemandangan cakrawala kota tak tertandingi.",
      image: "https://user.uploads.dev/file/19b1173f7327fca9ddf9784298720186.png",
      fallback: "https://user.uploads.dev/file/3c744fe5c7db4509f3381e8880549ce0.jpg",
      techStack: ["Vite + React", "Tailwind CSS", "Dark Cinematic"],
      features: ["Skyline Vistas", "Private Elevator"],
      liveUrl: "https://poppp2.vercel.app/"
    },
    {
      id: "portfolio-11",
      title: "VELARIS",
      category: "Luxury Villa",
      tag: "Cinematic",
      badge: "Live Project",
      description: "Koleksi villa kontemporer eksklusif dengan pencahayaan sinematik dan privasi maksimal.",
      image: "https://user.uploads.dev/file/973e38ced0529c26fdb3585927ea7977.png",
      fallback: "https://user.uploads.dev/file/7a46590d4441462096c2fdd68088be7f.jpg",
      techStack: ["Vite + React", "Tailwind CSS", "Cinematic"],
      features: ["Infinity Pool", "Panoramic Glass"],
      liveUrl: "https://proppp3.vercel.app/"
    },
    {
      id: "portfolio-12",
      title: "Atelier Vesta",
      category: "Luxury Villa",
      tag: "Atelier Serif",
      badge: "Live Project",
      description: "Studio arsitektur hunian dengan sentuhan kerajinan tangan, material alami, dan kehangatan tropis.",
      image: "https://user.uploads.dev/file/c4c86944c27547b035847aba21104e6c.png",
      fallback: "https://user.uploads.dev/file/432928826c00a99b500c25cf833828a2.jpg",
      techStack: ["Vite + React", "Tailwind CSS", "Atelier Serif"],
      features: ["Handcrafted Finish", "Tropical Warmth"],
      liveUrl: "https://proppp4.vercel.app/"
    },
    {
      id: "portfolio-13",
      title: "VÉLUM",
      category: "Urban Penthouse",
      tag: "Dark Minimal",
      badge: "Live Project",
      description: "Penthouse minimalis bernuansa monokrom dengan tata cahaya arsitektural dan ruang terbuka luas.",
      image: "https://user.uploads.dev/file/dd5266d73f6e5ca4dba543d5e18695bb.png",
      fallback: "https://user.uploads.dev/file/3a6b5f56ce39fe0209b015b413289633.jpg",
      techStack: ["Vite + React", "Tailwind CSS", "Dark Minimal"],
      features: ["Double-Height Living", "Private Terrace"],
      liveUrl: "https://proppp5.vercel.app/"
    },
    {
      id: "portfolio-14",
      title: "AETHERIA · Sanctuaries",
      category: "Luxury Villa",
      tag: "Serif Editorial",
      badge: "Live Project",
      description: "Sanctuary privat terpencil di puncak tebing dengan pemandangan samudra tanpa batas.",
      image: "https://user.uploads.dev/file/6ca9ac4d5991dbd536175fc4ccf10890.png",
      fallback: "https://user.uploads.dev/file/d6561db324fde8ef389dab96f642ad1a.jpg",
      techStack: ["Vite + React", "Tailwind CSS", "Serif Editorial"],
      features: ["Cliff Sanctuary", "Oceanfront Horizon"],
      liveUrl: "https://proppp6.vercel.app/"
    },
    {
      id: "portfolio-15",
      title: "AETHERIA · Estate",
      category: "Eco Resort",
      tag: "Bright Minimal",
      badge: "Live Project",
      description: "Eco resort modern berbalut keindahan alam tropis, material ramah lingkungan, dan kenyamanan bintang lima.",
      image: "https://user.uploads.dev/file/32439df559f818ba447ee2c0b289c44d.png",
      fallback: "https://user.uploads.dev/file/6b50ff3c8b77dea727125d7e9d9d9700.jpg",
      techStack: ["Vite + React", "Tailwind CSS", "Bright Minimal"],
      features: ["Sustainable Eco Design", "Five-Star Comfort"],
      liveUrl: "https://propp7.vercel.app/"
    }
  ];

  res.json({ success: true, data: defaultPortfolio });
});

// Leads API (POST)
app.post('/api/leads', async (req, res) => {
  const { email, name, phone, company, message, sourcePage = 'footer-form', lang = 'id', utm } = req.body;

  if (!email || !email.trim()) {
    return res.status(422).json({
      success: false,
      error: { code: 'MISSING_FIELD', field: 'email', message: 'Email wajib diisi' },
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_EMAIL', message: 'Email tidak valid' },
    });
  }

  const cleanEmail = email.trim().toLowerCase();
  const ipAddress = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
  const createdAt = new Date().toISOString();
  const utmSource = utm?.source || null;
  const utmCampaign = utm?.campaign || null;

  if (pool) {
    try {
      const [result] = await pool.query(
        `INSERT INTO leads (email, name, phone, company, message, source_page, lang, utm_source, utm_campaign, ip_address, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', NOW())`,
        [cleanEmail, name || null, phone || null, company || null, message || null, sourcePage, lang, utmSource, utmCampaign, ipAddress]
      );

      return res.status(201).json({
        success: true,
        data: {
          id: `ld_${result.insertId}`,
          email: cleanEmail,
          status: 'new',
          createdAt,
        },
      });
    } catch (err) {
      console.error('[API] Lead insert DB error:', err.message);
    }
  }

  // Backup storage to local JSON file
  const backupFile = path.join(dataDir, 'leads.json');
  let existing = [];
  try {
    if (fs.existsSync(backupFile)) {
      existing = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
    }
  } catch (e) {
    existing = [];
  }

  const leadId = `ld_local_${Date.now()}`;
  const record = {
    id: leadId,
    email: cleanEmail,
    name: name || null,
    phone: phone || null,
    company: company || null,
    message: message || null,
    sourcePage,
    lang,
    utm: { source: utmSource, campaign: utmCampaign },
    ip: ipAddress,
    status: 'new',
    createdAt,
  };

  existing.push(record);
  try {
    fs.writeFileSync(backupFile, JSON.stringify(existing, null, 2));
  } catch (e) {
    console.error('Backup write error:', e.message);
  }

  return res.status(201).json({
    success: true,
    data: {
      id: leadId,
      email: cleanEmail,
      status: 'new',
      createdAt,
      note: 'Stored via local backup (database pending setup)',
    },
  });
});

// Leads API (GET)
app.get('/api/leads', async (req, res) => {
  if (pool) {
    try {
      const [rows] = await pool.query(
        'SELECT id, email, name, phone, company, message, source_page, lang, status, created_at FROM leads ORDER BY id DESC LIMIT 100'
      );
      return res.json({ success: true, data: rows });
    } catch (err) {
      return res.status(500).json({ success: false, error: { code: 'DB_ERROR', message: err.message } });
    }
  }

  const backupFile = path.join(dataDir, 'leads.json');
  if (fs.existsSync(backupFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
      return res.json({ success: true, data: data.reverse() });
    } catch (e) {}
  }

  res.json({ success: true, data: [] });
});

// -----------------------------------------------------------------------------
// Serve Frontend in Production
// -----------------------------------------------------------------------------
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[Server] Estatewerks Full-Stack Server running on port ${PORT}`);
});
