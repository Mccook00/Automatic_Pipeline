# ⚡ GitHub Actions - Cheat Sheet

**Super ringkas untuk reference cepat!**

---

## 🎯 What Was Changed?

```yaml
# In: .github/workflows/early-pipeline.yml
schedule:
  - cron: '0 */3 * * *'  # Now: Every 3 hours (was: every 2 hours)
```

**Result**: Pipeline runs 8 times per day instead of 12.

---

## ⏰ Execution Schedule (UTC)

```
00:00  03:00  06:00  09:00  12:00  15:00  18:00  21:00
  ✅     ✅     ✅     ✅     ✅     ✅     ✅     ✅
```

---

## 📋 Setup Checklist

- [ ] Settings → Secrets → Add 6 secrets
- [ ] Settings → Actions → Enable
- [ ] Actions tab → Run workflow (manual test)
- [ ] Check Telegram channel for messages
- [ ] Done!

---

## 🔐 Required Secrets (6)

```
TG_TOKEN                    = bot token
TELEGRAM_CHANNEL_ID         = channel id
GEMINI_API_KEY1            = gemini key
API_ID                      = telegram api id
API_HASH                    = telegram api hash
TELEGRAM_SESSION            = session string
```

**Optional Secrets (5)**:
- GEMINI_API_KEY2-6 (for backup)

---

## 📍 Where to Add Secrets

```
GitHub → Settings → Secrets and variables → Actions → New repository secret
```

**Add them one by one:**
1. Name field → type secret name
2. Secret field → paste value
3. Click "Add secret"
4. Repeat 6+ times

---

## 🚀 Test Manual Trigger

```
Actions tab → Crypto Early Detection Pipeline → Run workflow
→ Select branch (main) → [Run workflow]
→ Wait 15-20 min → Check Telegram
```

---

## 🔍 What Runs in One Execution?

```
Phase 1 (5 min):   Collect data from GitHub, Telegram, RSS
Phase 2 (5 min):   Analyze with Gemini AI
Phase 3 (5 min):   Publish to Telegram
Total:             ~15-20 minutes
```

---

## 📊 What Gets Generated?

```
data/YYYY-MM-DD/
├── daily_signals.json
├── gemini_all_signals_analysis.json
├── gemini_all_signals_summary.txt
└── (other tracking files)
```

---

## 🎓 Key Features

✅ Incremental processing (no re-analysis)  
✅ Smart deduplication (no duplicates)  
✅ Multi-key support (6 Gemini keys)  
✅ Auto-retry (exponential backoff)  
✅ Error tracking (failed messages saved)  
✅ 24/7 automation (no manual work)  

---

## 🔄 Workflow Diagram

```
Data Collection → AI Analysis → Telegram Publish
     (Phase 1)        (Phase 2)      (Phase 3)
        5 min            5 min          5 min
         ↓                ↓              ↓
    Signals JSON → Analysis JSON → Messages Sent
         ↓
    Every 3 hours, 8x per day
```

---

## 💾 Monitor Status

```
Actions tab → Recent runs
├─ ✅ Completed (green) = Success
├─ ❌ Failed (red) = Error
└─ ⏳ In progress (blue) = Running
```

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| No workflow runs | Check if Actions enabled in Settings |
| Secrets missing | Add all 6 secrets in Settings → Secrets |
| No Telegram messages | Check TG_TOKEN & TELEGRAM_CHANNEL_ID |
| Gemini errors | Verify GEMINI_API_KEY1 valid |
| Can't find workflow | Should be in Actions tab automatically |

---

## 📞 Common Commands

```bash
# Run Phase 1 locally
node phase1/collect_data.mjs

# Run Phase 2 locally
node phase2/analyze_all_signals.mjs

# Run Phase 3 locally
node phase3/publish_early_detection.mjs

# Run all phases
node complete_phase.mjs

# Check cron expression
grep "cron:" .github/workflows/early-pipeline.yml
```

---

## 📚 Documentation Files

```
SETUP_GITHUB_ACTIONS_STEP_BY_STEP.md    ← START HERE (5 min)
GITHUB_ACTIONS_VISUAL_GUIDE.md           ← Diagrams
GITHUB_SETUP_CHECKLIST.md                ← Detailed checklist
GITHUB_ACTIONS_SETUP.md                  ← Complete reference
GITHUB_ACTIONS_SCHEDULE.md               ← Timing details
QUICK_START_GITHUB_ACTIONS.md            ← Quick ref
GITHUB_ACTIONS_SUMMARY.md                ← Summary
GITHUB_ACTIONS_INDEX.md                  ← Navigation
```

---

## ✅ Success = All True

- ✅ Secrets added
- ✅ Actions enabled
- ✅ Manual test completed
- ✅ Telegram messages received
- ✅ Next 3-hour slot runs automatically

---

## 🎯 Next 3-Hour Slot

```
Current time: [HH:MM]
Last run: [HH:MM]
Next run: [HH:MM] ← in X hours
```

Use this formula:
- If 00:00-02:59 UTC → Next run 03:00 UTC
- If 03:00-05:59 UTC → Next run 06:00 UTC
- If 06:00-08:59 UTC → Next run 09:00 UTC
- And so on...

---

## 🔐 Secret Value Formats

```
TG_TOKEN
├─ Format: 123456789:ABCDefGhIjKlmNoPqRstUvWxYz
└─ Length: ~40-50 chars

TELEGRAM_CHANNEL_ID
├─ Format: -1001234567890 OR @channel_name
└─ Important: Include minus sign if number!

GEMINI_API_KEY1
├─ Format: AIzaSyDxyzAbcDef1234GhiJklMnoPqRstUvWxYz
└─ Length: ~40+ chars

API_ID
├─ Format: 123456
└─ Just numbers

API_HASH
├─ Format: abcdef0123456789abcdef0123456789
└─ Hexadecimal string

TELEGRAM_SESSION
├─ Format: Long session string from telegram.session
└─ Length: Few KB
```

---

## 📈 Performance Expectations

```
Collection Phase: 3-5 min
Analysis Phase:   5-10 min (varies by signal count)
Publishing Phase: 2-5 min
Total:            10-20 min per execution
Frequency:        Every 3 hours
Daily executions: 8 times
```

---

## 🔗 Important Links

```
GitHub Settings:     https://github.com/YOUR_REPO/settings/secrets/actions
GitHub Actions:      https://github.com/YOUR_REPO/actions
Gemini Studio:       https://aistudio.google.com/app/apikey
Telegram BotFather:  https://t.me/botfather
Telegram MyApps:     https://my.telegram.org/auth
```

---

## 🎓 Cron Reference

```
0 */3 * * *
│ │    │ │ │
│ │    │ │ └─ Day of week (0-6)
│ │    │ └─── Month (1-12)
│ │    └───── Day (1-31)
│ └────────── Hour (0-23) → every 3 hours
└──────────── Minute (0-59) → at minute 0
```

---

## 🎉 You're Done When...

1. ✅ All 6 secrets added
2. ✅ Actions enabled
3. ✅ Manual run successful
4. ✅ Telegram messages received
5. ✅ Sitting back and watching it work! 😎

---

**That's it! Keep this handy for quick reference.**

---

Last Updated: 2024  
Status: ✅ Ready  
Schedule: Every 3 hours  
Next: Check Actions tab for recent runs!


