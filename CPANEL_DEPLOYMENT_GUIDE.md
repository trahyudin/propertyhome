# Panduan Lengkap Deployment Estatewerks ke cPanel

Panduan ini disusun untuk memandu Anda mengunggah dan menghubungkan website full-stack **Estatewerks** ke hosting **cPanel** (lengkap dengan Frontend, Backend API, dan Database MySQL).

---

## Daftar Isi
1. [Struktur Berkas Siap Deploy](#1-struktur-berkas-siap-deploy)
2. [Opsi A: Deployment Universal cPanel (PHP 8.x + MySQL via phpMyAdmin) — DIREKOMENDASIKAN](#2-opsi-a-deployment-universal-cpanel-php-8x--mysql-via-phpmyadmin--direkomendasikan)
3. [Opsi B: Deployment via cPanel "Setup Node.js App"](#3-opsi-b-deployment-via-cpanel-setup-nodejs-app)
4. [Pemeriksaan & Pengujian Kesehatan Sistem](#4-pemeriksaan--pengujian-kesehatan-sistem)
5. [Troubleshooting Kendala Umum cPanel](#5-troubleshooting-kendala-umum-cpanel)

---

## 1. Struktur Berkas Siap Deploy

Setelah menjalankan perintah build:
```bash
npm run build
```
Folder `dist/` akan otomatis tercipta dengan struktur lengkap siap pakai:

```
dist/
├── index.html                 # Frontend React hasil kompilasi
├── assets/                    # Bundle CSS & JS teroptimasi
├── api/                       # Backend REST API PHP
│   ├── config.php             # Konfigurasi koneksi database MySQL
│   ├── leads.php              # Endpoint simpan lead & kontak (POST /api/leads)
│   ├── portfolio.php          # Endpoint data proyek template (GET /api/portfolio)
│   └── health.php             # Endpoint diagnostik server & DB (GET /api/health)
├── .htaccess                  # Konfigurasi Apache (SPA Routing, Rewrite API, Gzip, Cache)
└── database.sql               # Skema database MySQL + data seed 15 template
```

---

## 2. Opsi A: Deployment Universal cPanel (PHP 8.x + MySQL via phpMyAdmin) — DIREKOMENDASIKAN

Metode ini bekerja pada **100% semua jenis hosting cPanel** di dunia (Shared Hosting, Cloud Hosting, Dedicated, cPanel Niagahoster, DomaiNesia, Hostinger, Rumahweb, dll.) tanpa perlu modul tambahan.

### Langkah 1: Build Proyek Secara Lokal
Buka terminal di folder project Anda, lalu jalankan:
```bash
npm run build
```
Pastikan proses build selesai tanpa error dan folder `dist/` terbentuk.

---

### Langkah 2: Buat Database MySQL di cPanel
1. Login ke akun **cPanel** Anda.
2. Pada kolom pencarian cPanel, ketik dan klik **"MySQL Database Wizard"** (atau **"MySQL Databases"**).
3. **Step 1 — Create A Database**: Masukkan nama database, misalnya `estatewerks` (nama lengkap di cPanel biasanya menjadi `usernamecpanel_estatewerks`). Klik **Next Step**.
4. **Step 2 — Create Database Users**: Buat username (misal `dbuser`) dan buat password yang kuat. Catat password ini. Klik **Create User**.
5. **Step 3 — Add User to the Database**: Centang **"ALL PRIVILEGES"**, lalu klik **Make Changes**.
6. Simpan informasi berikut:
   - **Database Name**: `usernamecpanel_estatewerks`
   - **Database User**: `usernamecpanel_dbuser`
   - **Database Password**: `password_yang_anda_buat`

---

### Langkah 3: Impor Database via phpMyAdmin
1. Kembali ke halaman utama cPanel, klik menu **phpMyAdmin**.
2. Pada bilah sebelah kiri phpMyAdmin, klik nama database Anda (`usernamecpanel_estatewerks`).
3. Klik tab **Import** di bagian atas menu.
4. Pada bagian **"File to import"**, klik **Choose File** dan pilih file `database.sql` (bisa diambil dari folder `dist/database.sql` atau root project).
5. Klik tombol **Import** (atau **Go**) di bagian paling bawah.
6. Tabel `leads`, `categories`, dan `projects` akan otomatis terbentuk beserta data seed ke-15 template portofolio.

---

### Langkah 4: Upload Berkas ke cPanel File Manager
1. Di cPanel, buka **File Manager**.
2. Masuk ke folder root domain Anda:
   - Untuk domain utama: masuk ke folder `public_html/`.
   - Untuk subdomain (misal `property.domain.com`): masuk ke folder tujuan subdomain tersebut.
3. Compress seluruh isi di **dalam folder `dist/`** menjadi format `.zip` (misal `dist.zip`).
   > *Catatan penting: compress isi di dalam folder `dist/`, bukan folder `dist` itu sendiri.*
4. Klik tombol **Upload** di File Manager cPanel, lalu pilih `dist.zip`.
5. Setelah upload mencapai 100% (berwarna hijau), kembali ke File Manager dan klik kanan pada `dist.zip` → pilih **Extract**.
6. Pastikan file `.htaccess` ikut terekstrak (jika file tersembunyi tidak tampak, klik tombol **Settings** di pojok kanan atas File Manager → centang **"Show Hidden Files (dotfiles)"**).

---

### Langkah 5: Hubungkan Koneksi Database di `api/config.php`
1. Di dalam folder `public_html/api/` (atau subdomain Anda), cari file `config.php`.
2. Klik kanan `config.php` → pilih **Edit**.
3. Sesuaikan baris berikut dengan kredensial database yang Anda buat di Langkah 2:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_PORT', '3306');
   define('DB_NAME', 'usernamecpanel_estatewerks'); // Ganti dengan nama DB Anda
   define('DB_USER', 'usernamecpanel_dbuser');     // Ganti dengan user DB Anda
   define('DB_PASS', 'password_yang_anda_buat');   // Ganti dengan password DB Anda
   ```
4. Klik **Save Changes**.

---

## 3. Opsi B: Deployment via cPanel "Setup Node.js App"

Gunakan opsi ini jika paket hosting cPanel Anda mendukung fitur **Setup Node.js App** (CloudLinux / Phusion Passenger):

1. Di cPanel, buka menu **"Setup Node.js App"**.
2. Klik **Create Application**:
   - **Node.js version**: Pilih versi `18.x`, `20.x`, atau yang lebih baru.
   - **Application mode**: `Production`
   - **Application root**: `estatewerks`
   - **Application URL**: pilih domain/subdomain Anda.
   - **Application startup file**: `server.js`
3. Upload seluruh file project (`package.json`, `server.js`, folder `dist/`, `.env`) ke folder Application root di File Manager.
4. Pada halaman *Setup Node.js App*, klik tombol **"Run NPM Install"**.
5. Tambahkan Environment Variable di cPanel Node.js App:
   - `DB_HOST`: `localhost`
   - `DB_NAME`: nama database cPanel Anda
   - `DB_USER`: user database cPanel Anda
   - `DB_PASSWORD`: password database cPanel Anda
6. Klik tombol **Restart Application**.

---

## 4. Pemeriksaan & Pengujian Kesehatan Sistem

Setelah deployment selesai, lakukan verifikasi live:

1. **Uji Diagnostik Server & Database**:
   Buka URL di browser:
   ```
   https://domain-anda.com/api/health
   ```
   Respons yang benar:
   ```json
   {
     "success": true,
     "data": {
       "app": "Estatewerks API",
       "status": "healthy",
       "database": {
         "status": "connected",
         "database_name": "usernamecpanel_estatewerks",
         "projects_count": 15
       }
     }
   }
   ```

2. **Uji Frontend & Fitur Sneak Peek**:
   - Buka `https://domain-anda.com/`
   - Gulir ke section **Portofolio**.
   - Klik tombol **"Sneak Peek"** pada salah satu kartu properti (misal *Solara Estates*).
   - Pastikan modal interaktif muncul, website template termuat dalam iframe, dan Anda dapat mengganti viewport antara Desktop, Tablet, dan Mobile.
   - Gunakan tombol panah ◀ ▶ untuk berpindah ke template lainnya secara instan.

3. **Uji Form Konsultasi Lead**:
   - Gulir ke bagian **Footer** ("Siap Membangun Situs Properti...").
   - Masukkan email Anda dan klik **Minta Penawaran**.
   - Pastikan muncul pesan sukses: *"Terima kasih! Lead Anda telah tersimpan di database kami."*
   - Cek tabel `leads` di phpMyAdmin untuk melihat data yang baru masuk.

---

## 5. Troubleshooting Kendala Umum cPanel

| Masalah | Penyebab Umum | Solusi |
| --- | --- | --- |
| **Halaman reload menghasilkan 404** | File `.htaccess` belum ter-upload atau tersembunyi | Pastikan file `.htaccess` berada di root `public_html/`. Aktifkan *"Show Hidden Files"* di cPanel File Manager. |
| **API `/api/health` menghasilkan status `disconnected`** | Kredensial database di `api/config.php` salah | Periksa kembali penulisan `DB_NAME`, `DB_USER`, dan `DB_PASS` di `api/config.php`. Pastikan user sudah diberikan hak akses *ALL PRIVILEGES*. |
| **Internal Server Error (500) pada API** | Versi PHP terlalu lama atau ekstensi PDO MySQL tidak aktif | Buka menu **"Select PHP Version"** di cPanel, pastikan memilih PHP ≥ 8.0 dan centang ekstensi `pdo_mysql`. |
| **Iframe Sneak Peek menampilkan layar putih** | Pembatasan header `X-Frame-Options` pada browser klien | Klik tombol *"Buka di Tab Baru"* (ikon panah keluar) di pojok kanan atas modal Sneak Peek untuk membuka situs secara langsung. |
| **Gaya CSS tidak tampil** | Folder `assets/` tidak sejajar dengan `index.html` | Pastikan seluruh isi dari folder `dist/` diekstrak langsung ke dalam `public_html/`, bukan berada di dalam subfolder `public_html/dist/`. |
