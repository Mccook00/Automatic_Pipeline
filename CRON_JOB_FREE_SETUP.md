# 🚀 Free Scheduling Setup: Cron-Job.org + Replit/Railway

Panduan lengkap untuk menjalankan pipeline Anda **100% GRATIS** menggunakan Cron-Job.org

## 📋 Opsi Deployment (Pilih Salah Satu)

### **Opsi 1: REPLIT (Paling Mudah - RECOMMENDED) ⭐⭐⭐⭐⭐**

**Completely FREE forever** - Perfect untuk use case Anda

#### Step 1: Upload ke Replit
1. Buka https://replit.com
2. Login dengan GitHub atau email
3. Klik "Create" → "Import from GitHub"
4. Paste repository URL: `https://github.com/initial69/Automatic_Pipeline.git`
5. Klik Import

#### Step 2: Setup Environment Variables di Replit
1. Di Replit sidebar, klik **"Secrets"** (lock icon)
2. Tambahkan semua secrets Anda:
   ```
   GEMINI_API_KEY1=your_key_1
   GEMINI_API_KEY2=your_key_2
   GEMINI_API_KEY3=your_key_3
   GEMINI_API_KEY4=your_key_4
   GEMINI_API_KEY5=your_key_5
   GEMINI_API_KEY6=your_key_6
   TG_TOKEN=your_telegram_token
   TELEGRAM_CHANNEL_ID=your_channel_id
   API_ID=your_api_id
   API_HASH=your_api_hash
   TELEGRAM_SESSION=your_session
   WEBHOOK_SECRET=your_secret_key_here
   ```

#### Step 3: Run Webhook Server di Replit
1. Di Replit, di field "Run" ketik:
   ```bash
   node webhook-server.mjs
   ```
2. Klik Run button
3. Replit akan memberikan URL publik (misalnya: `https://automatic-pipeline.replit.dev`)
4. **Catat URL ini** - Anda akan gunakan untuk Cron-Job

#### Step 4: Keep Replit Always Running
Untuk keep project tetap online:
1. Buka https://uptimerobot.com
2. Login gratis
3. Buat Monitor baru: **HTTP(s)**
4. Paste URL: `https://your-replit-url/health`
5. Set interval: 5 menit (untuk keep alive)
6. **BONUS**: UptimeRobot juga akan monitor & alert jika down!

---

### **Opsi 2: RAILWAY (Juga Gratis) ⭐⭐⭐⭐**

**Free tier dengan $5/month credit** - Cukup untuk use case Anda

#### Step 1: Deploy ke Railway
1. Buka https://railway.app
2. Login dengan GitHub
3. Klik "New Project"
4. Pilih "Deploy from GitHub repo"
5. Connect akun GitHub dan select `Automatic_Pipeline` repo

#### Step 2: Setup Environment Variables
1. Di Railway dashboard, klik Environment tab
2. Tambahkan semua variables (sama seperti di Replit)

#### Step 3: Expose Public URL
1. Di Railway, klik "Networking"
2. Klik "Generate Domain"
3. Catat URL yang diberikan

#### Step 4: Setup Start Command
1. Di Railway Settings, set Custom Start Command:
   ```bash
   node webhook-server.mjs
   ```

---

### **Opsi 3: FLY.IO (Juga Gratis) ⭐⭐⭐⭐**

**Truly FREE tier** - Unlimited running time

1. Install fly CLI: https://fly.io/docs/getting-started/installing-flyctl/
2. Login: `flyctl auth login`
3. Di project folder, jalankan:
   ```bash
   flyctl launch
   ```
4. Setup akan tanya beberapa pertanyaan
5. Deploy: `flyctl deploy`
6. Get URL: `flyctl info`

---

## 🎯 Setup Cron-Job.org (SCHEDULER)

### Step 1: Register di Cron-Job.org
1. Buka https://cron-job.org/en/
2. Klik "Sign up" (free)
3. Verify email

### Step 2: Create New Cron Job
1. Di dashboard, klik "Create Cron Job"
2. Set berikut:

**Title:** `Crypto Pipeline Every 2 Hours`

**URL:** 
```
https://your-replit-url/trigger?secret=your-secret-key
```
(ganti dengan URL Replit/Railway/Fly.io Anda)

**Schedule:**
```
*/2 * * * *
```
(setiap 2 jam)

**Timezone:** 
```
Europe/Zurich
(atau timezone Anda)
```

**Request Method:** `GET`

**HTTP Authentication:** (leave empty)

**Notifications:** 
- ✅ Email on failure
- ✅ Email on success (optional)

### Step 3: Save & Test
1. Klik "Save"
2. Klik "Run" untuk test sekarang
3. Cek logs di `/logs` endpoint untuk verify

---

## ✅ Verification Checklist

Setelah setup, verifikasi dengan:

### Test 1: Health Check
```bash
# Buka di browser atau curl:
curl https://your-url/health
```

Response harusnya:
```json
{
  "status": "ok",
  "running": false,
  "lastRun": null,
  "uptime": 123.45
}
```

### Test 2: Manual Trigger
```bash
curl "https://your-url/trigger?secret=your-secret-key"
```

Response harusnya:
```json
{
  "success": true,
  "message": "Pipeline started",
  "startTime": "2025-11-22T10:30:00.000Z"
}
```

### Test 3: Check Logs
```bash
curl https://your-url/logs
```

Harusnya menunjukkan log dari pipeline execution

---

## 📊 Monitoring & Alerts

### Option A: UptimeRobot (FREE) - RECOMMENDED
- Setup ping ke `/health` endpoint
- Get email alerts jika down
- Website: https://uptimerobot.com

### Option B: Built-in Cron-Job.org Notifications
- Email alerts otomatis dari Cron-Job.org
- Log history tersimpan 1 tahun

### Option C: GitHub Actions Backup (OPTIONAL)
Masih keep GitHub Actions sebagai backup:
```yaml
# Di .github/workflows/backup-monitor.yml
- name: Ping webhook
  run: curl "https://your-url/trigger?secret=your-secret"
```

---

## 🚨 Troubleshooting

### Problem: "Pipeline already running"
**Solution:** Ada 2 trigger berjalan bersamaan. Tunggu satu selesai.

### Problem: Timeout (> 60 minutes)
**Solution:** Pipeline akan auto-kill setelah 60 menit. Cek logs untuk error.

### Problem: Secrets tidak terbaca
**Solution:** 
- Di Replit: Pastikan di "Secrets" tab, bukan di env file
- Di Railway: Refresh page setelah add secrets
- Verify dengan log output

### Problem: Telegram tidak post
**Solution:** Check failed_messages.json
```bash
curl https://your-url/logs
# Cari untuk "failed_telegram_messages.json"
```

---

## 💡 Cost Analysis

| Platform | Cost | Runtime | Uptime |
|----------|------|---------|--------|
| Replit | FREE | ∞ | 99.5% |
| Railway | $5/mo credit (FREE) | ∞ | 99.9% |
| Fly.io | FREE | ∞ | 99.8% |
| Cron-Job.org | FREE | N/A | 99.99% |
| UptimeRobot | FREE | N/A | 99.99% |
| **TOTAL** | **FREE** | **∞** | **99.9%+** |

---

## 🔧 Advanced Configuration

### Custom Telegram Session per Region
```bash
# In Replit secrets, store multiple sessions:
TELEGRAM_SESSION_US=...
TELEGRAM_SESSION_EU=...
TELEGRAM_SESSION_ASIA=...
```

### Performance Optimization
```bash
# Di webhook-server.mjs, set higher timeout jika perlu:
setTimeout(() => {
  process.kill();
}, 90 * 60 * 1000); // 90 minutes instead of 60
```

### Add Slack Notifications (Optional)
```bash
# Tambah di complete_phase.mjs:
import { notifySlack } from './utils/slack.mjs';
// Send completion status to Slack
```

---

## 📞 Support

- **Cron-Job.org Docs:** https://cron-job.org/help/
- **Replit Docs:** https://docs.replit.com/
- **Railway Docs:** https://docs.railway.app/
- **Fly.io Docs:** https://fly.io/docs/

---

## 🎉 Next Steps

1. ✅ Deploy ke salah satu platform (Replit/Railway/Fly.io)
2. ✅ Setup Cron-Job.org dengan webhook URL
3. ✅ Setup UptimeRobot untuk monitoring
4. ✅ Test manual trigger
5. ✅ Monitor logs untuk first 24 jam
6. ✅ Enjoy FREE & STABLE scheduling! 🚀

---

**Questions?** Check logs di `/logs` endpoint atau baca error messages di Cron-Job.org dashboard.

