# Dokumentasi & Laporan Akhir KP — Estatewerks

Folder ini berisi dokumen yang siap ditempel ke laporan KP.

## Berkas

| Berkas | Isi |
| --- | --- |
| `LAPORAN-AKHIR-KP.md` | Dokumen utama: Laporan Ringkas/Executive Summary, Daftar Project & Modul, Arsitektur & Tech Stack, Database Structure (model data + usulan skema), API Documentation, Panduan Instalasi & Deployment, Hasil Pengujian, serta Catatan Pengembangan Mendatang / Known Bugs |
| `bukti/hero2.png` | Bukti visual — hero section (headline, deskripsi, trust badge, 2 CTA) |
| `bukti/pricing.png` | Bukti visual — 3 kartu paket harga + area add-on |

## Placeholder yang perlu diisi

Ganti semua penanda `[[...]]` berikut sebelum menyerahkan laporan:

| Placeholder | Diisi dengan |
| --- | --- |
| `[[NAMA_MAHASISWA]]` | Nama lengkap |
| `[[NIM_KELAS]]` | NIM / kelas |
| `[[PROGRAM_STUDI]]` | Program studi |
| `[[NAMA_PERUSAHAAN]]`, `[[DIVISI]]` | Tempat KP |
| `[[TANGGAL_MULAI]]`, `[[TANGGAL_SELESAI]]` | Periode KP |
| `[[PEMBIMBING_LAPANGAN]]`, `[[DOSEN_PEMBIMBING]]` | Pembimbing |
| `[[TANGGAL_DOKUMEN]]` | Tanggal penyusunan dokumen |
| `[[VCS_YANG_DIPAKAI]]` | Git/GitHub/GitLab + alur branch (isi "-" bila tidak dipakai) |
| `[[ISI_PERAN_ANDA_PER_PROJECT]]` | Peran Anda di tiap situs demo (paragraf singkat) |
| `[[NAMA_PENERUS_JIKA_ADA]]` | Penerus/handover PIC (boleh "-") |

## Konversi ke Word/PDF

- **Word (via Word online):** buka Word → *Insert* → *Text from File* (perlu konversi markdown → docx
  memakai pandoc: `pandoc LAPORAN-AKHIR-KP.md -o LAPORAN-AKHIR-KP.docx`).
- **PDF (via VS Code / Typora):** buka berkas `.md` → *Export* → *PDF*.
- **Cek tanda tangan/aplikasi Perchance:** untuk bagian "Cara Kerja Web", gunakan dokumen terpisah
  (sudah sengaja tidak dimasukkan ke laporan ini).

## Catatan penting

- Dokumen ini berada di luar folder `src/`, jadi **tidak ikut terkirim** bersama generator yang
  dipublikasikan (isi laporan tidak menjadi publik).
- Semua angka pada bagian *Hasil Pengujian* berasal dari pengujian nyata pada preview generator
  `property-12`. Bila kode berubah, ulangi pengujian lalu perbarui angkanya.
