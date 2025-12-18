# ✅ GitHub Actions Setup Checklist

## 🎯 Pre-Setup Requirements

- [ ] GitHub repository dengan write access
- [ ] Telegram bot created (dari @BotFather)
- [ ] Private Telegram channel created
- [ ] Gemini API key (Google AI Studio)
- [ ] Telegram API credentials (API ID & Hash)
- [ ] Telegram session file

---

## 📋 Step-by-Step Setup

### 1️⃣ Prepare All Secrets

**Telegram Bot Secrets:**
```
Secret Name: TG_TOKEN
Value: 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
```
- [ ] TG_TOKEN added

```
Secret Name: TELEGRAM_CHANNEL_ID  
Value: -1001234567890 or @channel_username
```
- [ ] TELEGRAM_CHANNEL_ID added

**Telegram Client Secrets (untuk Phase 1):**
```
Secret Name: API_ID
Value: 123456
```
- [ ] API_ID added

```
Secret Name: API_HASH
Value: abcdef123456...
```
- [ ] API_HASH added

```
Secret Name: TELEGRAM_SESSION
Value: 1BVtsOH4BuAzOQIE...
```
- [ ] TELEGRAM_SESSION added

**Gemini API Secrets:**
```
Secret Name: GEMINI_API_KEY1
Value: AIzaSyDxPrXZ...
```
- [ ] GEMINI_API_KEY1 added
- [ ] GEMINI_API_KEY2 added (recommended)
- [ ] GEMINI_API_KEY3 added (optional)
- [ ] GEMINI_API_KEY4 added (optional)
- [ ] GEMINI_API_KEY5 added (optional)
- [ ] GEMINI_API_KEY6 added (optional)

**Optional Secrets:**
- [ ] OPENAI_API_KEY added (optional)
- [ ] GITHUB_TOKEN added (optional, auto-generated)

---

### 2️⃣ GitHub Repository Configuration

**Go to: Settings → Secrets and variables → Actions**

- [ ] Click "New repository secret"
- [ ] Tambahkan setiap secret satu-satu
- [ ] Verify semua secrets muncul di list
- [ ] Total secrets: Minimum 5, Recommended 7+

**Verify secrets:**
```bash
# Command untuk verify (replace YOUR_REPO):
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/actions/secrets
```

---

### 3️⃣ Enable GitHub Actions

**Go to: Settings → Actions → General**

- [ ] Verify "All repositories" or "Selected repositories" is enabled
- [ ] Check "Allow GitHub Actions to create and approve pull requests"
- [ ] Check workflow permissions allow read and write

---

### 4️⃣ Verify Workflow File

**File Location:** `.github/workflows/early-pipeline.yml`

- [ ] File exists
- [ ] Contains `cron: '0 */3 * * *'`
- [ ] TZ env is set to `Europe/Zurich`
- [ ] Jobs section contains `run-pipeline`

**Quick check:**
```bash
# Look for cron expression
grep "cron:" .github/workflows/early-pipeline.yml
# Should output: - cron: '0 */3 * * *'
```

---

### 5️⃣ Test Manual Trigger

**Go to: Actions tab → Crypto Early Detection Pipeline**

- [ ] Click "Run workflow" dropdown
- [ ] Select branch (usually "main" or "master")
- [ ] **Optional**: Check "Reset trackers" for fresh start
- [ ] Click "Run workflow"
- [ ] Monitor logs in real-time

**Expected output timeline:**
- Minute 0-1: Checkout code
- Minute 1-2: Setup Node.js
- Minute 2-3: Install dependencies
- Minute 3-5: Phase 1 - Collection
- Minute 5-10: Phase 2 - Analysis (can be slow)
- Minute 10-15: Phase 3 - Publishing
- Minute 15+: Upload artifacts

- [ ] Phase 1 completes ✅
- [ ] Phase 2 completes ✅
- [ ] Phase 3 completes ✅
- [ ] Total time < 30 minutes
- [ ] "Pipeline completed successfully!" message

---

### 6️⃣ Verify Telegram Messages

**Go to your Telegram private channel**

- [ ] Summary message appears (📊 Daily Crypto Early Detection)
- [ ] Hot opportunities listed (🔥)
- [ ] Early signals listed (⚡)
- [ ] Messages properly formatted with emojis
- [ ] Links are clickable

---

### 7️⃣ Check Data Generated

**Go to: Actions → Recent run → Artifacts**

- [ ] Download `pipeline-data-*` artifact
- [ ] Extract and verify structure:

```
data/
└── YYYY-MM-DD/
    ├── daily_signals.json ✅
    ├── daily_signals.jsonl ✅
    ├── daily_summary.json ✅
    ├── gemini_all_signals_analysis.json ✅
    ├── gemini_all_signals_summary.txt ✅
    └── (failed_telegram_messages.json - if any failed)
```

- [ ] Each file is valid JSON/text
- [ ] File sizes are reasonable (> 100 bytes)

---

### 8️⃣ Setup Monitoring

**Go to: Settings → Notifications**

- [ ] Email on workflow failures: ✅ enabled
- [ ] Email on workflow success (optional)

**Recommended: Setup GitHub Pages for Status**
- [ ] (Optional) Setup GitHub Pages dashboard for monitoring

---

### 9️⃣ Verify Schedule Timing

**Create test to verify cron execution:**

- [ ] Note current UTC time
- [ ] Next 3-hour execution slot:
  - [ ] Current run just past: 00:00, 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, or 21:00 UTC?
  - [ ] Next run will be 3 hours from now

**Visual check:**
```
Current UTC Time: 14:30
Last run was: 12:00 UTC ✅
Next run will be: 15:00 UTC ✅ (in 30 minutes)
```

- [ ] Next run scheduled within 3-hour window
- [ ] GitHub Actions shows scheduled runs in timeline

---

### 🔟 Final Verification

**Go to: Actions → Crypto Early Detection Pipeline → Recent runs**

- [ ] At least 1 successful run completed
- [ ] Each successful run took < 30 minutes
- [ ] No error logs in successful runs
- [ ] Artifacts were uploaded
- [ ] Telegram messages were sent

**Workflow runs should look like:**
```
✅ Run #1 completed in 15 mins (manual trigger)
⏳ Run #2 scheduled for 03:00 UTC (tomorrow morning)
```

---

## 🎯 Go-Live Confirmation

Once ALL checkboxes above are checked:

- [ ] Schedule confirmed (will run 3 hours from now)
- [ ] All phases working
- [ ] Telegram integration working
- [ ] Data persists between runs
- [ ] No blocking errors

**You're ready! The pipeline will now run automatically every 3 hours! 🚀**

---

## 🔧 Troubleshooting Checklist

### If Manual Trigger Fails:

- [ ] Check logs for specific error
- [ ] Verify all secrets are added
- [ ] Try with "Reset trackers" option
- [ ] Check Node version: should be 20.x
- [ ] Check npm install completed successfully

### If Telegram Messages Don't Appear:

- [ ] Verify TG_TOKEN is correct
- [ ] Verify TELEGRAM_CHANNEL_ID is correct
- [ ] Verify bot is admin in the channel
- [ ] Check failed_telegram_messages.json in artifacts
- [ ] Try manual trigger to test again

### If Schedule Doesn't Run:

- [ ] Verify workflow is enabled in Settings → Actions
- [ ] Check GitHub Actions quota not exceeded
- [ ] Verify cron syntax in YAML file
- [ ] Try manual trigger to confirm repo works
- [ ] Check GitHub status page for outages

### If Analysis Returns No Results:

- [ ] Verify GEMINI_API_KEY1 is correct
- [ ] Check Gemini API quotas in Google Cloud Console
- [ ] Verify signals were collected in Phase 1
- [ ] Check gemini_usage_*.json for errors
- [ ] Try manual run with "Reset trackers" option

---

## 📞 Support Commands

**Check workflow status:**
```bash
git log --oneline -5
```

**View last Actions run:**
```bash
# On GitHub: Actions tab → Recent runs
```

**View cron expression:**
```bash
grep -A2 "schedule:" .github/workflows/early-pipeline.yml
```

---

## ✨ Success Indicators

Pipeline is working correctly when:

✅ Manual trigger completes successfully  
✅ Telegram messages appear in channel  
✅ Data files generated daily  
✅ No error logs in Actions  
✅ Consistent timing (±5 minutes from cron)  
✅ Incremental processing (not re-analyzing old signals)  
✅ Deduplication working (not sending duplicate messages)  

---

**Last Updated:** 2024  
**Schedule:** Every 3 hours (8 times per day)  
**Expected Run Time:** 10-20 minutes per execution


