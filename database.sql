-- ==============================================================================
-- Estatewerks Database Schema & Seed Data for cPanel MySQL / phpMyAdmin
-- Compatible with MySQL 5.7+ / MariaDB 10.3+ / MySQL 8.0+
-- ==============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------------------------
-- Table: leads
-- Stores consultation inquiries and contact requests from prospective clients
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `leads` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(160) NOT NULL,
  `name` VARCHAR(120) DEFAULT NULL,
  `phone` VARCHAR(32) DEFAULT NULL,
  `company` VARCHAR(160) DEFAULT NULL,
  `message` TEXT DEFAULT NULL,
  `source_page` VARCHAR(60) DEFAULT 'footer-form',
  `lang` VARCHAR(10) DEFAULT 'id',
  `utm_source` VARCHAR(80) DEFAULT NULL,
  `utm_campaign` VARCHAR(80) DEFAULT NULL,
  `status` ENUM('new', 'contacted', 'qualified', 'won', 'lost') DEFAULT 'new',
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_leads_email` (`email`),
  INDEX `idx_leads_status` (`status`),
  INDEX `idx_leads_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Table: categories
-- Portfolio category classification
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `slug` VARCHAR(80) NOT NULL,
  `sort_order` INT DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_category_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`id`, `name`, `slug`, `sort_order`) VALUES
(1, 'Luxury Villa', 'luxury-villa', 1),
(2, 'Urban Penthouse', 'urban-penthouse', 2),
(3, 'Eco Resort', 'eco-resort', 3)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- ------------------------------------------------------------------------------
-- Table: projects (portfolio templates)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `projects` (
  `id` VARCHAR(50) NOT NULL,
  `title` VARCHAR(160) NOT NULL,
  `category` VARCHAR(80) NOT NULL,
  `tag` VARCHAR(80) NOT NULL,
  `badge` VARCHAR(50) DEFAULT 'Live Project',
  `description` TEXT NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `fallback` VARCHAR(255) NOT NULL,
  `tech_stack` TEXT NOT NULL,
  `features` TEXT NOT NULL,
  `live_url` VARCHAR(255) NOT NULL,
  `sort_order` INT DEFAULT 0,
  `is_published` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_category` (`category`),
  INDEX `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Seed: 15 Live Portfolio Projects
-- ------------------------------------------------------------------------------
INSERT INTO `projects` (`id`, `title`, `category`, `tag`, `badge`, `description`, `image`, `fallback`, `tech_stack`, `features`, `live_url`, `sort_order`, `is_published`) VALUES
('portfolio-1', 'Solara Estates', 'Luxury Villa', 'Tropical Luxury', 'Live Project', 
 'Portal properti tropis mewah Bali — koleksi residence eksklusif, private villa, dan prime development di destinasi paling dicari di Pulau Dewata.', 
 'https://user.uploads.dev/file/0e316c11441541faed90493ea7bc4617.png', 'https://user.uploads.dev/file/368bbd0d513fae1d9ec34cb228dae072.jpg', 
 '["Vite + React", "Tailwind CSS", "Editorial Serif"]', '["Curated Villas", "Prime Bali Destinations"]', 
 'https://solara-estates-56wi.vercel.app/', 1, 1),

('portfolio-2', 'AUREA', 'Urban Penthouse', 'Trophy Villas', 'Live Project', 
 'Portfolio privat sanctuaries cliff-front dan trophy residences — villa arsitektural modern untuk kolektor properti di Uluwatu.', 
 'https://user.uploads.dev/file/c38e31ff2396b9de1543736176a00054.png', 'https://user.uploads.dev/file/7a46590d4441462096c2fdd68088be7f.jpg', 
 '["Vite + React", "Tailwind CSS", "Dark Cinematic"]', '["Cliff-Front Sanctuaries", "Private Portfolio"]', 
 'https://aurea-wheat-iota.vercel.app/', 2, 1),

('portfolio-3', 'VALA ESTATES', 'Eco Resort', 'Coastal Estates', 'Live Project', 
 'Real estate arsitektural & coastal pilihan — villa mewah, clifftop sanctuary, dan estate di Uluwatu, Bingin, dan enclave pantai premium Bali.', 
 'https://user.uploads.dev/file/06006f38dddd56ac40d70ffe7f01760f.png', 'https://user.uploads.dev/file/6cf8acb1bdd5464998a3097a760edac4.jpg', 
 '["Vite + React", "Tailwind CSS", "Warm Minimal"]', '["Clifftop Sanctuaries", "Coastal Enclaves"]', 
 'https://vala-ten.vercel.app/', 3, 1),

('portfolio-4', 'VANDEN', 'Luxury Villa', 'Global Estates', 'Live Project', 
 'Kurasi monumen arsitektural langka, estate pesisir premium, dan private reserve residence di destinasi global paling bergengsi.', 
 'https://user.uploads.dev/file/b1cbc8784b60d0f1f90dd3910a0e0016.png', 'https://user.uploads.dev/file/432928826c00a99b500c25cf833828a2.jpg', 
 '["Vite + React", "Tailwind CSS", "Editorial Serif"]', '["Architectural Monuments", "Private Reserves"]', 
 'https://vanden-one.vercel.app/', 4, 1),

('portfolio-5', 'AETHERIA', 'Urban Penthouse', 'Modernist Living', 'Live Project', 
 'Platform real estate global bespoke — villa modernis langka, penthouse ikonik, estate privat off-market, dan layanan concierge interaktif.', 
 'https://user.uploads.dev/file/32439df559f818ba447ee2c0b289c44d.png', 'https://user.uploads.dev/file/3c744fe5c7db4509f3381e8880549ce0.jpg', 
 '["Vite + React", "Tailwind CSS", "Modernist"]', '["Off-Market Estates", "Concierge Services"]', 
 'https://pertiti.vercel.app/', 5, 1),

('portfolio-6', 'AURAIA', 'Luxury Villa', 'Architectural', 'Live Project', 
 'Real estate arsitektural kelas dunia — koleksi residence ikonik, sanctuaries, dan estate modernis dengan standard ultra-luxury.', 
 'https://user.uploads.dev/file/a39271c59a9e270d46139115291af6ed.png', 'https://user.uploads.dev/file/d6561db324fde8ef389dab96f642ad1a.jpg', 
 '["Vite + React", "Tailwind CSS", "Serif Editorial"]', '["Iconic Residences", "Modernist Estates"]', 
 'https://protx1.vercel.app/', 6, 1),

('portfolio-7', 'VÆLOR', 'Urban Penthouse', 'Ultra-Luxury', 'Live Project', 
 'Platform real estate sinematik generasi baru — residence terkurasi, penthouse sanctuary, lifestyle discovery, dan investment intelligence.', 
 'https://user.uploads.dev/file/56b140a2f4130efbe65e9e13c5f81349.png', 'https://user.uploads.dev/file/3a6b5f56ce39fe0209b015b413289633.jpg', 
 '["Vite + React", "Tailwind CSS", "Cinematic Dark"]', '["Lifestyle Discovery", "Investment Intelligence"]', 
 'https://prottx2.vercel.app/', 7, 1),

('portfolio-8', 'ARKHĒ', 'Luxury Villa', 'Marketplace', 'Live Project', 
 'Marketplace properti mewah dunia, editorial arsitektural, dan platform discovery interaktif untuk residence paling luar biasa.', 
 'https://user.uploads.dev/file/1ee9b94caf53f16821ade2c3c62cc00d.png', 'https://user.uploads.dev/file/7eb1c5ce31804e43fd55b6b3c7877617.jpg', 
 '["Vite + React", "Tailwind CSS", "Editorial"]', '["Luxury Marketplace", "Architectural Editorial"]', 
 'https://prottx3.vercel.app/', 8, 1),

('portfolio-9', 'VALO', 'Luxury Villa', 'Editorial', 'Live Project', 
 'Koleksi hunian pantai editorial modern, coastal enclave, dan properti tropis arsitektural bernilai tinggi.', 
 'https://user.uploads.dev/file/e3fa592e5f410640a2e6ed9dd27dd50f.png', 'https://user.uploads.dev/file/6cf8acb1bdd5464998a3097a760edac4.jpg', 
 '["Vite + React", "Tailwind CSS", "Light Minimal"]', '["Coastal Enclave", "Modern Editorial"]', 
 'https://proppp1.vercel.app/', 9, 1),

('portfolio-10', 'AUREXIS', 'Urban Penthouse', 'Dark Cinematic', 'Live Project', 
 'Penthouse metropolitan premium dan penthouse suite bertingkat dengan pemandangan cakrawala kota tak tertandingi.', 
 'https://user.uploads.dev/file/19b1173f7327fca9ddf9784298720186.png', 'https://user.uploads.dev/file/3c744fe5c7db4509f3381e8880549ce0.jpg', 
 '["Vite + React", "Tailwind CSS", "Dark Cinematic"]', '["Skyline Vistas", "Private Elevator"]', 
 'https://poppp2.vercel.app/', 10, 1),

('portfolio-11', 'VELARIS', 'Luxury Villa', 'Cinematic', 'Live Project', 
 'Koleksi villa kontemporer eksklusif dengan pencahayaan sinematik dan privasi maksimal.', 
 'https://user.uploads.dev/file/973e38ced0529c26fdb3585927ea7977.png', 'https://user.uploads.dev/file/7a46590d4441462096c2fdd68088be7f.jpg', 
 '["Vite + React", "Tailwind CSS", "Cinematic"]', '["Infinity Pool", "Panoramic Glass"]', 
 'https://proppp3.vercel.app/', 11, 1),

('portfolio-12', 'Atelier Vesta', 'Luxury Villa', 'Atelier Serif', 'Live Project', 
 'Studio arsitektur hunian dengan sentuhan kerajinan tangan, material alami, dan kehangatan tropis.', 
 'https://user.uploads.dev/file/c4c86944c27547b035847aba21104e6c.png', 'https://user.uploads.dev/file/432928826c00a99b500c25cf833828a2.jpg', 
 '["Vite + React", "Tailwind CSS", "Atelier Serif"]', '["Handcrafted Finish", "Tropical Warmth"]', 
 'https://proppp4.vercel.app/', 12, 1),

('portfolio-13', 'VÉLUM', 'Urban Penthouse', 'Dark Minimal', 'Live Project', 
 'Penthouse minimalis bernuansa monokrom dengan tata cahaya arsitektural dan ruang terbuka luas.', 
 'https://user.uploads.dev/file/dd5266d73f6e5ca4dba543d5e18695bb.png', 'https://user.uploads.dev/file/3a6b5f56ce39fe0209b015b413289633.jpg', 
 '["Vite + React", "Tailwind CSS", "Dark Minimal"]', '["Double-Height Living", "Private Terrace"]', 
 'https://proppp5.vercel.app/', 13, 1),

('portfolio-14', 'AETHERIA · Sanctuaries', 'Luxury Villa', 'Serif Editorial', 'Live Project', 
 'Sanctuary privat terpencil di puncak tebing dengan pemandangan samudra tanpa batas.', 
 'https://user.uploads.dev/file/6ca9ac4d5991dbd536175fc4ccf10890.png', 'https://user.uploads.dev/file/d6561db324fde8ef389dab96f642ad1a.jpg', 
 '["Vite + React", "Tailwind CSS", "Serif Editorial"]', '["Cliff Sanctuary", "Oceanfront Horizon"]', 
 'https://proppp6.vercel.app/', 14, 1),

('portfolio-15', 'AETHERIA · Estate', 'Eco Resort', 'Bright Minimal', 'Live Project', 
 'Eco resort modern berbalut keindahan alam tropis, material ramah lingkungan, dan kenyamanan bintang lima.', 
 'https://user.uploads.dev/file/32439df559f818ba447ee2c0b289c44d.png', 'https://user.uploads.dev/file/6b50ff3c8b77dea727125d7e9d9d9700.jpg', 
 '["Vite + React", "Tailwind CSS", "Bright Minimal"]', '["Sustainable Eco Design", "Five-Star Comfort"]', 
 'https://propp7.vercel.app/', 15, 1)
ON DUPLICATE KEY UPDATE 
  `title` = VALUES(`title`),
  `description` = VALUES(`description`),
  `live_url` = VALUES(`live_url`);

SET FOREIGN_KEY_CHECKS = 1;
