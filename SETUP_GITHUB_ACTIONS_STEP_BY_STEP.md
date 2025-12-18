# 🚀 Setup GitHub Actions - Step by Step (VERY SIMPLE)

Hanya 5 langkah sederhana untuk membuat pipeline berjalan otomatis setiap 3 jam!

---

## ✅ STEP 1: Gather All Your Information

Sebelum mulai, siapkan informasi ini:

### Telegram Bot
- [ ] Telegram Bot Token (dari @BotFather)
  - Format: `123456789:ABCDefGHiJKlmnoPQRstuvWXYz`
  - Simpan sebagai: **TG_TOKEN**

- [ ] Private Channel ID (channel yang Anda buat untuk publish)
  - Format: `-1001234567890` atau `@channel_username`
  - Simpan sebagai: **TELEGRAM_CHANNEL_ID**

### Telegram Client (untuk membaca Telegram channels)
- [ ] Telegram API ID
  - Dapatkan dari: https://my.telegram.org/auth
  - Format: angka seperti `123456`
  - Simpan sebagai: **API_ID**

- [ ] Telegram API Hash
  - Dapatkan dari: https://my.telegram.org/auth (sama seperti di atas)
  - Format: string panjang seperti `abcdef123456...`
  - Simpan sebagai: **API_HASH**

- [ ] Telegram Session File
  - Dapatkan dengan menjalankan: `node sources/telegram_simple.mjs`
  - Akan generate file di `config/telegram.session`
  - Copy isi file tersebut
  - Simpan sebagai: **TELEGRAM_SESSION**

### Gemini API
- [ ] Gemini API Key (dari Google AI Studio)
  - Buka: https://aistudio.google.com/app/apikey
  - Copy key yang ter-generate
  - Format: `AIzaSyD...`
  - Simpan sebagai: **GEMINI_API_KEY1**

- [ ] (Optional) 2nd, 3rd, 4th, 5th, 6th Gemini keys
  - Buat multiple keys jika ingin backup
  - Simpan sebagai: **GEMINI_API_KEY2**, **GEMINI_API_KEY3**, etc.

---

## ✅ STEP 2: Buka Repository Settings

1. Buka repository GitHub Anda di browser
2. Klik tombol **Settings** (di menu repository bagian atas)
3. Pilih **Secrets and variables** → **Actions** (di sidebar kiri)

Sekarang Anda ada di halaman untuk menambah secrets.

---

## ✅ STEP 3: Tambahkan Semua Secrets

Di halaman Secrets, klik tombol hijau **New repository secret**.

### Secret #1: TG_TOKEN
1. Name: `TG_TOKEN`
2. Secret: (paste bot token Anda)
3. Klik **Add secret**

### Secret #2: TELEGRAM_CHANNEL_ID
1. Name: `TELEGRAM_CHANNEL_ID`
2. Secret: (paste channel ID Anda, contoh: `-1001234567890` atau `@mychannel`)
3. Klik **Add secret**

### Secret #3: API_ID
1. Name: `API_ID`
2. Secret: (paste API ID Anda, contoh: `123456`)
3. Klik **Add secret**

### Secret #4: API_HASH
1. Name: `API_HASH`
2. Secret: (paste API hash Anda)
3. Klik **Add secret**

### Secret #5: TELEGRAM_SESSION
1. Name: `TELEGRAM_SESSION`
2. Secret: (paste telegram session string)
3. Klik **Add secret**

### Secret #6: GEMINI_API_KEY1
1. Name: `GEMINI_API_KEY1`
2. Secret: (paste Gemini API key Anda)
3. Klik **Add secret**

### Secret #7+ (Optional): GEMINI_API_KEY2-6
Ulangi proses di atas untuk keys tambahan jika ingin.

---

## ✅ STEP 4: Enable GitHub Actions

1. Di Settings, pilih **Actions** → **General** (di sidebar kiri)
2. Cari section **Actions permissions**
3. Pastikan **All repositories** atau **Selected repositories** dipilih
4. Klik checkbox **Allow GitHub Actions to create and approve pull requests** (optional tapi recommended)
5. Scroll ke bawah dan klik **Save**

---

## ✅ STEP 5: Test Manual Trigger

1. Buka tab **Actions** (di menu repository bagian atas)
2. Di list workflow, pilih **Crypto Early Detection Pipeline**
3. Klik tombol biru **Run workflow**
4. Di dropdown, pastikan branch yang benar dipilih (biasanya `main` atau `master`)
5. **OPTIONAL**: Centang "Reset trackers" jika mau fresh start
6. Klik tombol **Run workflow**

Sekarang GitHub Actions akan menjalankan pipeline!

---

## 👀 Lihat Status Eksekusi

Workflow akan berjalan dalam 1-2 menit. Untuk melihat statusnya:

1. Tetap di tab **Actions**
2. Lihat bagian **Recent runs**
3. Lihat run terbaru dengan status
4. Klik run untuk melihat detail logs

### Expected Timeline:
- **0-2 min**: Setup (checkout, node, npm install)
- **2-7 min**: Phase 1 (collect data)
- **7-12 min**: Phase 2 (AI analysis)
- **12-15 min**: Phase 3 (publish to Telegram)
- **15-30 min**: Done! ✅

---

## 📱 Check Telegram Channel

Setelah workflow selesai (15-30 menit):

1. Buka Telegram channel yang Anda setup
2. Lihat message dari bot Anda
3. Harus ada:
   - Summary message
   - Hot opportunities (🔥)
   - Early signals (⚡)
   - Watch closely (👀)
   - Risk alerts (🚨)

---

## ✅ SELESAI!

Jika semua steps berhasil, maka:

✅ Secrets sudah ditambahkan  
✅ GitHub Actions sudah enabled  
✅ Manual test berhasil  
✅ Telegram messages muncul  
✅ Pipeline siap berjalan otomatis  

---

## ⏰ Kapan Pipeline Berjalan Otomatis?

Sekarang GitHub Actions akan menjalankan pipeline **otomatis setiap 3 jam**:

| UTC Time | Zurich Time | Status |
|----------|------------|--------|
| 00:00 | 01:00 | ✅ |
| 03:00 | 04:00 | ✅ |
| 06:00 | 07:00 | ✅ |
| 09:00 | 10:00 | ✅ |
| 12:00 | 13:00 | ✅ |
| 15:00 | 16:00 | ✅ |
| 18:00 | 19:00 | ✅ |
| 21:00 | 22:00 | ✅ |

**Total: 8 kali per hari!**

---

## 🆘 Troubleshooting Cepat

### ❌ "Can't find workflow file"
→ File sudah ada di `.github/workflows/early-pipeline.yml`, tidak perlu buat baru

### ❌ "Workflow fails immediately"
→ Cek apakah semua 6 secrets sudah ditambahkan

### ❌ "Telegram messages tidak muncul"
→ Cek apakah:
- TG_TOKEN benar?
- Bot sudah ditambahkan ke channel?
- Bot adalah admin di channel?

### ❌ "Gemini analysis error"
→ Cek apakah GEMINI_API_KEY1 valid dan masih punya quota

### ❌ "Everything looks OK but still doesn't work"
→ Download artifacts dari run yang gagal untuk debugging:
1. Actions → recent run → Artifacts
2. Download file untuk melihat error logs

---

## 📚 Need More Help?

Baca file dokumentasi lengkap:

- **QUICK_START_GITHUB_ACTIONS.md** - 5 min overview
- **GITHUB_ACTIONS_SETUP.md** - Complete guide
- **GITHUB_SETUP_CHECKLIST.md** - Detailed checklist
- **GITHUB_ACTIONS_SCHEDULE.md** - Schedule info

---

## 🎉 DONE!

Pipeline Anda sekarang berjalan:

✅ Otomatis setiap 3 jam  
✅ 24/7 tanpa henti  
✅ Mengumpulkan sinyal  
✅ Menganalisis dengan AI  
✅ Mempublikasikan ke Telegram  

**Selesai! Nikmati automated pipeline Anda! 🚀**

---

**Questions?**
- Check logs in Actions tab
- Download artifacts for debugging
- Read other documentation files

**Last Updated:** 2024
**Schedule:** Every 3 hours (8 runs per day)


