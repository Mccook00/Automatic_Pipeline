# ⚡ QUICK START - 15 Minutes to FREE Scheduling

## 🎯 Goal
Get your Crypto Pipeline running **automatically every 2 hours** on FREE platforms with **99.9%+ uptime**.

## ✨ What You'll Have
```
✅ Webhook server (auto-scales for free)
✅ Cron scheduler (unlimited executions free)
✅ Monitoring & alerts (email on failure)
✅ Logs & status dashboard (real-time)
✅ $0/month cost forever
```

---

## 🚀 3 Steps to Production

### **STEP 1: Deploy Webhook (5 min)**

Pick ONE:

#### **A) REPLIT (Easiest - Recommended)**
```bash
1. Go to https://replit.com
2. Click "Create" → "Import from GitHub"
3. Paste: https://github.com/initial69/Automatic_Pipeline.git
4. Wait for import...
5. Click "Secrets" (lock icon)
6. Add all your secrets:
   GEMINI_API_KEY1=xxx
   GEMINI_API_KEY2=xxx
   ... (all 12 secrets)
7. In "Run" field: node webhook-server.mjs
8. Click "Run" button
9. Wait for startup message
10. Copy the public URL from top-right (https://...)
```

✅ **DONE! You have a public webhook URL**

---

#### **B) RAILWAY (If you prefer)**
```bash
1. Go to https://railway.app
2. Login with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select: Automatic_Pipeline
5. Add Environment Variables (all secrets)
6. Wait for deploy
7. Click "Networking" → "Generate Domain"
8. Copy the domain
```

✅ **DONE! You have a public webhook URL**

---

#### **C) FLY.IO (If you want most control)**
```bash
1. Install: https://fly.io/docs/getting-started/
2. In project folder:
   flyctl launch
3. Answer prompts (region: pick closest to you)
4. Add secrets:
   flyctl secrets set GEMINI_API_KEY1=xxx
   flyctl secrets set GEMINI_API_KEY2=xxx
   ... (repeat for all)
5. Deploy:
   flyctl deploy
6. Get URL:
   flyctl info
   # Copy the .fly.dev URL
```

✅ **DONE! You have a public webhook URL**

---

### **STEP 2: Setup Scheduler (3 min)**

```bash
1. Go to https://cron-job.org
2. Sign Up (FREE - no card needed)
3. Verify email
4. Click "Create Cron Job"
5. Fill in:

   Title: "Crypto Pipeline"
   
   URL: https://YOUR-URL-HERE/trigger?secret=PICK-A-SECRET
   
   Schedule: */2 * * * *
   
   Timezone: Europe/Zurich
   
   Email: your@email.com
   
   ✅ Email on failure
   ✅ Email on success
   
6. Click "Save"
7. Click "Run" to test NOW
8. Check logs at: https://YOUR-URL-HERE/logs
```

✅ **DONE! Pipeline will run every 2 hours**

---

### **STEP 3: Setup Monitoring (5 min) - OPTIONAL**

```bash
1. Go to https://uptimerobot.com
2. Sign Up (FREE)
3. Verify email
4. Click "Add Monitor"
5. Type: HTTP(s)
6. URL: https://YOUR-URL-HERE/health
7. Interval: 5 minutes
8. Alert: Email
9. Click "Create Monitor"
```

✅ **DONE! You'll get alerts if server goes down**

---

## 🧪 Verify Everything Works

### Test 1: Health Check (Should show online)
```bash
curl https://YOUR-URL-HERE/health
# Should return: {"status":"ok",...}
```

### Test 2: Manual Trigger (Should start pipeline)
```bash
curl "https://YOUR-URL-HERE/trigger?secret=YOUR-SECRET"
# Should return: {"success":true,...}
```

### Test 3: Check Logs (Should show execution)
```bash
curl https://YOUR-URL-HERE/logs
# Should show pipeline logs
```

---

## 📊 URLs You'll Need

```
Webhook Health:  https://YOUR-URL-HERE/health
Trigger Pipeline: https://YOUR-URL-HERE/trigger?secret=YOUR-SECRET
View Logs:        https://YOUR-URL-HERE/logs
Server Status:    https://YOUR-URL-HERE/status
```

---

## 🎛️ Secrets Template

Copy-paste all these to your platform's secrets:

```
GEMINI_API_KEY1=your_gemini_key_1
GEMINI_API_KEY2=your_gemini_key_2
GEMINI_API_KEY3=your_gemini_key_3
GEMINI_API_KEY4=your_gemini_key_4
GEMINI_API_KEY5=your_gemini_key_5
GEMINI_API_KEY6=your_gemini_key_6
TG_TOKEN=your_telegram_bot_token
TELEGRAM_CHANNEL_ID=your_channel_id_or_username
API_ID=your_telegram_api_id
API_HASH=your_telegram_api_hash
TELEGRAM_SESSION=your_telegram_session_string
WEBHOOK_SECRET=pick_any_random_secure_string
```

---

## 📋 Cron Schedule Examples

**What you have:**
```
*/2 * * * *     ← Every 2 hours ✅
```

**Other options:**
```
0 * * * *       ← Every hour
0 6 * * *       ← Once daily at 6 AM UTC
0 6,14,22 * *   ← Three times daily
0 0 * * 0       ← Once weekly (Sunday)
*/15 * * * *    ← Every 15 minutes
```

---

## ✅ Checklist

- [ ] Choose deployment platform (Replit recommended)
- [ ] Deploy webhook server
- [ ] Copy public URL
- [ ] Add all 12 secrets
- [ ] Sign up at cron-job.org
- [ ] Create cron job with your URL
- [ ] Test manual trigger
- [ ] Check logs
- [ ] Setup UptimeRobot (optional)
- [ ] Wait for first automatic run (in 2 hours)
- [ ] Verify Telegram post received

---

## 🆘 Quick Troubleshooting

### "404 Not Found"
→ Wrong URL or server not running

### "Pipeline already running"
→ Previous run still executing. Wait 10-15 min.

### "Secret not recognized"
→ Make sure secret is set in platform secrets, not in code

### "Telegram no message"
→ Check logs: `https://YOUR-URL/logs | grep -i telegram`

### "Server went to sleep"
→ Add UptimeRobot to keep it alive with ping

---

## 📈 What Happens Next

**Every 2 hours:**
1. Cron-Job.org pings your webhook
2. Webhook server receives request
3. Pipeline starts: phase1 (collect) → phase2 (analyze) → phase3 (publish)
4. Results posted to Telegram
5. Logs saved automatically
6. You get email if something fails

**Automatic:**
- ✅ Restarts on crash
- ✅ Deduplicates content
- ✅ Handles rate limits
- ✅ Falls back if API fails
- ✅ Saves all logs

---

## 💰 Final Cost

| Item | Cost |
|------|------|
| Webhook Server (Replit) | FREE |
| Scheduler (Cron-Job.org) | FREE |
| Monitoring (UptimeRobot) | FREE |
| Domain | FREE |
| **TOTAL** | **$0/month** |

---

## 🎉 You're Done!

Your pipeline is now running **automatically**, **reliably**, and **for FREE**.

**Total setup time:** ~15 minutes
**Total cost:** $0 forever
**Uptime:** 99.9%+

---

## 📚 Need More Details?

Read these files for deeper understanding:

- `CRON_JOB_FREE_SETUP.md` - Detailed step-by-step guide
- `DEPLOYMENT_COMPARISON.md` - Compare all platforms
- `FREE_SCHEDULING_SUMMARY.md` - Complete overview
- `webhook-server.mjs` - Webhook server code (well-commented)

---

## 🚀 Next Actions

1. **Pick platform:** Replit (easiest)
2. **Deploy webhook:** 5 minutes
3. **Setup Cron-Job.org:** 3 minutes
4. **Test:** 2 minutes
5. **Monitor:** 5 minutes

**Total: 15 minutes to production** ⚡

---

**Ready? Pick Replit and let's go!** 🚀

Questions? Check the detailed guides or the webhook server logs.

