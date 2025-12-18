# GitHub Actions Schedule - 3 Jam Sekali

## 📅 Schedule Overview

Pipeline berjalan **setiap 3 jam** dalam siklus 24 jam (8 kali sehari).

### ⏰ Waktu Eksekusi

**UTC (Universal Coordinated Time)**:
```
00:00 ✅ Run #1
03:00 ✅ Run #2
06:00 ✅ Run #3
09:00 ✅ Run #4
12:00 ✅ Run #5
15:00 ✅ Run #6
18:00 ✅ Run #7
21:00 ✅ Run #8
```

**Europe/Zurich Time** (UTC+1 winter, UTC+2 summer):
```
01:00 ✅ Run #1
04:00 ✅ Run #2
07:00 ✅ Run #3
10:00 ✅ Run #4
13:00 ✅ Run #5
16:00 ✅ Run #6
19:00 ✅ Run #7
22:00 ✅ Run #8
```

### 🔧 Cron Expression

```yaml
cron: '0 */3 * * *'
```

Breakdown:
- `0` = Minute 0 (pada jam yang tepat)
- `*/3` = Setiap 3 jam (0, 3, 6, 9, 12, 15, 18, 21)
- `*` = Setiap hari dalam bulan
- `*` = Setiap bulan
- `*` = Setiap hari dalam minggu

### 📊 Comparison dengan Schedule Lain

| Schedule | Runs/Day | Frekuensi | Use Case |
|----------|----------|-----------|----------|
| Setiap jam | 24 | `0 * * * *` | Real-time monitoring (resource intensive) |
| **Setiap 3 jam** | **8** | **`0 */3 * * *`** | **Balanced (CURRENT)** |
| Setiap 4 jam | 6 | `0 */4 * * *` | Lower frequency |
| Setiap 6 jam | 4 | `0 */6 * * *` | Minimal frequency |
| 2x sehari | 2 | `0 0,12 * * *` | Very low frequency |

## 🎯 Why Every 3 Hours?

✅ **Pros**:
- Deteksi sinyal lebih cepat (maksimal 3 jam delay)
- Cukup untuk sebagian besar early detection use cases
- Efisien dalam penggunaan API (8 runs vs 24 runs per hari)
- Tidak overload rate limits
- Data cukup fresh setiap sesi

✅ **Cons**:
- Tidak real-time (jika perlu real-time, gunakan setiap jam atau less)
- Total 8 API calls per hari (vs 24 jika setiap jam)

## 📈 Expected API Usage

Per schedule dengan 3 jam:

### Phase 1 (Collection)
- **GitHub API**: ~10 calls per run
- **Telegram API**: ~5-10 calls per run
- **RSS**: ~20 feeds per run

### Phase 2 (Analysis)
- **Gemini API**: ~0.5-2 calls per signal (batched)
- Average: 10-30 signals per run = 5-60 Gemini calls

### Phase 3 (Publishing)
- **Telegram Bot API**: 1-20 messages per run

**Total per 8 runs (24 jam)**:
- GitHub: ~80 calls (usually free tier: 60 calls/hour, plenty of quota)
- Telegram: ~40-80 calls
- RSS: ~160 feeds
- Gemini: Budget depends on signals (see usage files)

## 🚀 How to Change Schedule

### Option 1: Increase Frequency (e.g., every 2 hours)
Edit `.github/workflows/early-pipeline.yml`:
```yaml
schedule:
  - cron: '0 */2 * * *'  # Every 2 hours (12 times per day)
```

### Option 2: Decrease Frequency (e.g., every 6 hours)
```yaml
schedule:
  - cron: '0 */6 * * *'  # Every 6 hours (4 times per day)
```

### Option 3: Specific Times (e.g., 9 AM and 3 PM Zurich time)
```yaml
schedule:
  - cron: '0 8,14 * * *'  # UTC time for 9 AM and 3 PM Zurich (Europe/Zurich)
```

### Option 4: Every 30 Minutes (minimal delay)
```yaml
schedule:
  - cron: '*/30 * * * *'  # Every 30 minutes
```

## 📌 Important Notes

⚠️ **GitHub Actions Limitations**:
- Minimum frequency: **5 minutes** (GitHub restricts it)
- Cron runs at: nearest 5-minute mark if you specify smaller intervals
- Schedule accuracy: ±5 minutes (GitHub queues jobs)

✅ **Best Practices**:
1. Jangan schedule lebih dari 1 workflow pada jam yang sama
2. Tambahkan random delay jika multiple projects berjalan pada GitHub
3. Monitor API usage untuk memastikan tidak kena rate limit
4. Test manual trigger dulu sebelum rely pada scheduled runs

## 🔍 Monitor Your Schedule

### View Recent Runs
1. Buka GitHub repository
2. Click **Actions** tab
3. Pilih workflow **Crypto Early Detection Pipeline**
4. Lihat history of runs dengan timestamps

### Set Up Notifications
GitHub Actions dapat memberikan notifikasi untuk:
- Failed runs
- Completed runs (dengan email notification settings)

### Track API Usage
Monitor di `data/gemini_usage_*.json` dan `data/openai_usage_*.json`

## 🎓 Cron Syntax Cheat Sheet

```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of week (0 - 6) (Sunday to Saturday; 7 is also Sunday)
│ │ │ │ │
│ │ │ │ │
* * * * *
```

### Common Examples
- `0 * * * *` - Every hour
- `0 */3 * * *` - Every 3 hours ← **CURRENT**
- `0 0 * * *` - Daily at midnight
- `0 9,17 * * *` - Daily at 9 AM and 5 PM
- `*/30 * * * *` - Every 30 minutes
- `0 0 1 * *` - First day of every month
- `0 0 * * 1` - Every Monday at midnight

## 📞 Support

Jika schedule tidak jalan:
1. Periksa Actions tab untuk logs
2. Verify secrets sudah di-set
3. Check internet connection GitHub runners
4. Review repository settings untuk action permissions

---

**Last Updated**: 2024
**Current Schedule**: Every 3 hours (8 runs per day)


