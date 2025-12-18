# ⚡ Quick Start - GitHub Actions Setup

## 🎯 Apa yang Sudah Dikonfigurasi?

✅ Pipeline berjalan **otomatis setiap 3 jam** (8 kali per hari)  
✅ Timezone: **Europe/Zurich**  
✅ Incremental processing (tidak analisis ulang sinyal lama)  
✅ Advanced deduplication (tidak publish duplikat)  
✅ Multi-key support untuk Gemini API  
✅ Auto-retry dengan exponential backoff  

## 🚀 5 Langkah Setup

### Step 1: Setup GitHub Secrets

Buka: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Tambahkan secrets ini:

```
✅ TG_TOKEN = <bot_token_telegram>
✅ TELEGRAM_CHANNEL_ID = <channel_id_atau_@username>
✅ GEMINI_API_KEY1 = <gemini_api_key_1>
✅ GEMINI_API_KEY2 = <gemini_api_key_2>
   (opsional: GEMINI_API_KEY3-6)
✅ API_ID = <telegram_api_id>
✅ API_HASH = <telegram_api_hash>
✅ TELEGRAM_SESSION = <session_string>
```

**Total: Minimum 5 secrets, maksimal 11 secrets**

### Step 2: Verify Workflow File

Workflow sudah di-setup di:
```
.github/workflows/early-pipeline.yml
```

Sudah dikonfigurasi dengan:
- ✅ Cron: `0 */3 * * *` (setiap 3 jam)
- ✅ Timezone: Europe/Zurich
- ✅ Timeout: 60 menit
- ✅ Node.js 20
- ✅ Dependency caching

### Step 3: Enable GitHub Actions

1. Buka tab **Actions** di repository
2. Klik **I understand my workflows, go ahead and enable them**

### Step 4: Test Manual Trigger

1. Tab **Actions** → **Crypto Early Detection Pipeline**
2. Klik **Run workflow**
3. Pilih branch (biasanya `main`)
4. **OPSIONAL**: Centang "Reset trackers" untuk fresh run
5. Klik **Run workflow**

### Step 5: Monitor First Run

1. Lihat logs real-time di Actions tab
2. Tunggu ~5-15 menit untuk complete
3. Check Telegram channel untuk messages

---

## ⏰ Schedule Eksekusi

| Waktu UTC | Waktu Zurich | Run # |
|-----------|--------------|-------|
| 00:00 | 01:00 | ✅ 1 |
| 03:00 | 04:00 | ✅ 2 |
| 06:00 | 07:00 | ✅ 3 |
| 09:00 | 10:00 | ✅ 4 |
| 12:00 | 13:00 | ✅ 5 |
| 15:00 | 16:00 | ✅ 6 |
| 18:00 | 19:00 | ✅ 7 |
| 21:00 | 22:00 | ✅ 8 |

---

## 🔧 Troubleshooting Cepat

### ❌ "Workflow not found"
→ Periksa `.github/workflows/early-pipeline.yml` exists

### ❌ "Secret not found"
→ Pergi ke Settings → Secrets → verify semua secrets ada

### ❌ "npm ERR! code ENOVERSIONS"
→ Workflow sudah fix ini, coba manual run lagi

### ❌ "Telegram API error"
→ Check TG_TOKEN dan TELEGRAM_CHANNEL_ID sudah betul

### ❌ "Gemini rate limited"
→ Tambahkan GEMINI_API_KEY2-6 untuk auto-switching

### ❌ "No new signals to analyze"
→ Normal! Ini artinya semua signals sudah di-analyze

---

## 📊 Apa yang Setiap Run Lakukan?

```
RUN START (setiap 3 jam)
  │
  ├─ Phase 1: COLLECT
  │   ├─ GitHub signals
  │   ├─ Telegram signals
  │   ├─ RSS feeds
  │   └─ Deduplikasi & save daily_signals.json
  │
  ├─ Phase 2: ANALYZE
  │   ├─ Load sinyal dari Phase 1
  │   ├─ Filter sinyal yang belum analyzed
  │   ├─ Deduplikasi content
  │   ├─ Analisis dengan Gemini AI
  │   └─ Save gemini_all_signals_analysis.json
  │
  ├─ Phase 3: PUBLISH
  │   ├─ Load hasil analisis dari Phase 2
  │   ├─ Kategorisasi: 🔥 Hot / ⚡ Early / 👀 Watch / 🚨 Risk
  │   ├─ Deduplikasi advanced
  │   ├─ Kirim ke Telegram bot
  │   └─ Save failed messages (jika ada)
  │
  └─ COMPLETE
    ├─ Upload artifacts (untuk debugging)
    └─ Cache updated untuk run berikutnya
```

---

## 💾 Data Generated

Setiap run menghasilkan folder: `data/YYYY-MM-DD/`

```
data/2024-01-15/
├── daily_signals.json              # Semua sinyal yang dikumpulkan
├── daily_signals.jsonl             # Format baris (easy to process)
├── daily_summary.json              # Statistik collection
├── gemini_all_signals_analysis.json # Hasil analisis AI
├── gemini_all_signals_summary.txt   # Ringkasan readable
└── failed_telegram_messages.json   # Pesan yang gagal (jika ada)
```

---

## 🎮 Manual Commands (Local)

Jika ingin jalankan local untuk testing:

```bash
# Phase 1 saja
node phase1/collect_data.mjs

# Phase 2 saja
node phase2/analyze_all_signals.mjs

# Phase 3 saja
node phase3/publish_early_detection.mjs

# Semua phases
node complete_phase.mjs
```

---

## 📈 Monitoring & Optimization

### Monitor Runs
- Buka tab **Actions** → pilih workflow
- Lihat "Recent runs" dengan duration

### Check API Usage
- Buka `data/gemini_usage_*.json`
- Buka `data/openai_usage_*.json`

### Optimize Schedule
Mau ubah ke frekuensi lain? Edit `.github/workflows/early-pipeline.yml`:

```yaml
schedule:
  # Ubah ini:
  - cron: '0 */3 * * *'  # Sekarang: setiap 3 jam

  # Opsi lain:
  # - cron: '0 */2 * * *'  # Setiap 2 jam (12x/hari)
  # - cron: '0 * * * *'    # Setiap jam (24x/hari)
  # - cron: '0 */6 * * *'  # Setiap 6 jam (4x/hari)
```

---

## 🎓 Useful Links

- [GitHub Secrets Management](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Cron Syntax Help](https://crontab.guru/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

## ✅ Checklist Sebelum Go Live

- [ ] Semua 5+ secrets sudah ditambahkan
- [ ] Workflow file ada di `.github/workflows/early-pipeline.yml`
- [ ] Manual test run berhasil
- [ ] Telegram messages muncul di channel
- [ ] Actions tab menunjukkan "Recent runs"
- [ ] Tidak ada error logs di recent runs
- [ ] Data folder ter-generate dengan file JSON

---

## 🆘 Need Help?

1. **Check logs**: Tab Actions → pilih run terbaru → lihat logs
2. **Download artifacts**: Actions → pilih run → Download artifacts
3. **Manual test**: Buat issue atau test manual trigger dulu
4. **Reset**: Use "Run workflow" dengan "Reset trackers" centang

---

**Sekarang pipeline Anda berjalan otomatis setiap 3 jam! 🚀**


