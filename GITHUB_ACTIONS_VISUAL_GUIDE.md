# 🎨 GitHub Actions - Visual Guide

Panduan visual untuk setup dan monitoring GitHub Actions pipeline.

---

## 🗺️ Navigation Map

```
GITHUB REPOSITORY
│
├─ Settings (gear icon, top right)
│  │
│  ├─ Secrets and variables → Actions
│  │  └─ [ADD YOUR 6+ SECRETS HERE]
│  │
│  └─ Actions → General
│     └─ [ENABLE ACTIONS HERE]
│
├─ Actions (tab, top of repo)
│  │
│  ├─ Workflows (left sidebar)
│  │  └─ Crypto Early Detection Pipeline
│  │
│  ├─ Run workflow (blue button)
│  │  └─ Trigger manual execution
│  │
│  └─ Recent runs
│     ├─ [Run #1] ✅ Completed
│     ├─ [Run #2] ✅ Completed
│     └─ [Run #3] ⏳ In Progress
│
└─ Code (tab)
   └─ .github/workflows/early-pipeline.yml
      └─ [The workflow definition]
```

---

## 📸 Step-by-Step Screenshots (Text Version)

### STEP 1: Open Settings

```
🔗 https://github.com/YOUR_USERNAME/YOUR_REPO
              ↓
        [Settings] (gear icon)
```

### STEP 2: Find Secrets

```
Settings Page
├─ General
├─ Branches
├─ Rules
├─ Secrets and variables  ← YOU ARE HERE
│  ├─ Dependabot
│  ├─ Actions  ← Click this
│  └─ Codespaces
├─ Environments
└─ ...
```

### STEP 3: Add New Secret

```
Secrets and variables > Actions
├─ Org secrets (grayed out)
│
├─ Repository secrets
│  ├─ [New repository secret] ← GREEN BUTTON, CLICK HERE
│  │
│  ├─ Existing secrets:
│  │  ├─ ✅ TG_TOKEN
│  │  ├─ ✅ TELEGRAM_CHANNEL_ID
│  │  ├─ ✅ API_ID
│  │  ├─ ✅ API_HASH
│  │  ├─ ✅ TELEGRAM_SESSION
│  │  └─ ✅ GEMINI_API_KEY1
│  │
│  └─ Add more secrets button (if needed for KEY2-6)
```

### STEP 4: Fill Secret Form

```
┌─────────────────────────────────┐
│  New Secret                     │
├─────────────────────────────────┤
│ Name: [TG_TOKEN...............]│
│ Secret: [*****HIDDEN****...]   │
│ Repository Access: This repo   │
│                                 │
│  [Add secret] ← GREEN BUTTON    │
└─────────────────────────────────┘
```

### STEP 5: Go to Actions Tab

```
Repository Top Menu
├─ Code
├─ Pull requests
├─ Issues
├─ Actions  ← CLICK HERE
├─ Projects
├─ ...
```

### STEP 6: Select Workflow

```
Actions Page
├─ Workflows (left sidebar)
│  ├─ Crypto Early Detection Pipeline ← CLICK HERE
│  ├─ Other workflows...
│  └─ ...
│
└─ Recent runs
   ├─ [Run] ✅
   └─ [Run] ✅
```

### STEP 7: Run Workflow

```
Workflow Page
├─ Recent runs
├─ Run workflow ← BLUE DROPDOWN BUTTON
│  ├─ Branch: main (or your branch)
│  ├─ Reset trackers: ☐ (optional)
│  └─ [Run workflow] ← SUBMIT BUTTON
└─ Status: ⏳ In progress or ✅ Passed
```

---

## ⏱️ Execution Timeline

### Total Time: ~20 minutes

```
TIMELINE FOR ONE EXECUTION
═══════════════════════════════════════

MINUTE 0: Workflow triggered
  │
  ├─ 0-1 min: Checkout repository
  │   └─ 📦 Get latest code
  │
  ├─ 1-2 min: Setup Node.js
  │   └─ 🔧 Install Node 20
  │
  ├─ 2-3 min: npm install
  │   └─ 📚 Install dependencies
  │
  ├─ 3-5 min: Prepare Telegram session
  │   └─ 🔐 Setup credentials
  │
  ├─ 5-7 min: PHASE 1 - DATA COLLECTION
  │   ├─ GitHub: Fetch issues/releases
  │   ├─ Telegram: Read messages
  │   ├─ RSS: Parse feeds
  │   └─ Deduplikasi signals
  │
  ├─ 7-12 min: PHASE 2 - AI ANALYSIS
  │   ├─ Load signals
  │   ├─ Filter new ones
  │   ├─ Gemini AI analyze
  │   └─ Generate scores
  │
  ├─ 12-18 min: PHASE 3 - PUBLISH
  │   ├─ Categorize results
  │   ├─ Deduplicate
  │   └─ Send Telegram messages
  │
  └─ 18-20 min: Upload artifacts & Complete
      └─ ✅ DONE
```

---

## 🔄 Schedule Grid (24 Hour View)

```
HOUR BY HOUR - UTC TIME
════════════════════════════════════════════════════════════════

00:00 ✅ RUN #1 - Early morning
   └─ Schedule: executed (0 */3 * * *)

03:00 ✅ RUN #2 - Middle of night
   └─ 3 hours after previous

06:00 ✅ RUN #3 - Dawn
   └─ 3 hours after previous

09:00 ✅ RUN #4 - Morning
   └─ 3 hours after previous

12:00 ✅ RUN #5 - Noon
   └─ 3 hours after previous

15:00 ✅ RUN #6 - Afternoon
   └─ 3 hours after previous

18:00 ✅ RUN #7 - Evening
   └─ 3 hours after previous

21:00 ✅ RUN #8 - Night
   └─ 3 hours after previous
   └─ Next run: Tomorrow 00:00


SUMMARY
───────
Total Runs: 8 per day
Frequency: Every 3 hours
Total Hours Covered: 24/7
```

---

## 📊 Secrets Quick Reference

```
Your Secrets Checklist
═══════════════════════════════════════════════════════════════

TELEGRAM BOT (for Publishing)
┌─────────────────────────────────┐
│ Secret Name: TG_TOKEN           │
│ Value Format: 123456789:ABCDef  │
│ Source: @BotFather              │
│ Status: ☑ REQUIRED              │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Secret Name: TELEGRAM_CHANNEL_ID│
│ Value Format: -1001234567890    │
│ Source: Your private channel    │
│ Status: ☑ REQUIRED              │
└─────────────────────────────────┘

TELEGRAM CLIENT (for Reading)
┌─────────────────────────────────┐
│ Secret Name: API_ID             │
│ Value Format: 123456            │
│ Source: https://my.telegram.org │
│ Status: ☑ REQUIRED              │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Secret Name: API_HASH           │
│ Value Format: abcdef1234...     │
│ Source: https://my.telegram.org │
│ Status: ☑ REQUIRED              │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Secret Name: TELEGRAM_SESSION   │
│ Value Format: Long string...    │
│ Source: telegram.session file   │
│ Status: ☑ REQUIRED              │
└─────────────────────────────────┘

GEMINI API (for AI Analysis)
┌─────────────────────────────────┐
│ Secret Name: GEMINI_API_KEY1    │
│ Value Format: AIzaSyD...        │
│ Source: https://aistudio.google │
│ Status: ☑ REQUIRED              │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Secret Name: GEMINI_API_KEY2-6  │
│ Value Format: AIzaSyD...        │
│ Source: https://aistudio.google │
│ Status: ☐ OPTIONAL (backup)     │
└─────────────────────────────────┘

SUMMARY
─────────────────────────────────
Required: 6 secrets
Optional: 5 secrets (for backup)
Total to Setup: 6+ secrets
```

---

## 🎯 Data Flow Diagram

```
PHASE 1: DATA COLLECTION
═════════════════════════════════════════════

GitHub Sources          Telegram Channels       RSS Feeds
      │                       │                      │
      ├─ Issues              ├─ Messages             ├─ Feed 1
      ├─ Releases            ├─ Pinned posts        ├─ Feed 2
      └─ Discussions         └─ Reactions           └─ Feed N
                                    │
                                    ↓
                            [Collection Tracker]
                                    │
                                    ↓
                        Daily Signals JSON
                        (+ JSONL format)


PHASE 2: AI ANALYSIS
═════════════════════════════════════════════

Daily Signals JSON
      │
      ├─ Load signals
      │
      ├─ Filter new signals only
      │ (using collection tracker)
      │
      ├─ Deduplicate content
      │ (similarity detection)
      │
      └─ Gemini AI Analysis
         ├─ Project name
         ├─ Opportunity type
         ├─ Investment angle
         ├─ Score (1-100)
         ├─ Importance
         └─ Market impact
         
                                    ↓
                        Gemini Analysis JSON
                        (analysis results)


PHASE 3: PUBLISHING
═════════════════════════════════════════════

Gemini Analysis Results
      │
      ├─ Categorize by score
      │ ├─ 🔥 Hot (8-10)
      │ ├─ ⚡ Early (6-7)
      │ ├─ 👀 Watch (4-5)
      │ └─ 🚨 Risk (1-3)
      │
      ├─ Advanced Deduplication
      │ ├─ URL check
      │ ├─ Content similarity
      │ ├─ Title similarity
      │ └─ Source frequency
      │
      ├─ Format Telegram Messages
      │
      └─ Send via Telegram Bot API
         
                                    ↓
                        Telegram Channel
                        (user sees messages!)
```

---

## 🔍 Monitoring Dashboard

### GitHub Actions Tab Overview

```
┌─────────────────────────────────────────────────┐
│  Actions                                        │
├─────────────────────────────────────────────────┤
│                                                 │
│ Workflows (left sidebar)                        │
│ ├─ Crypto Early Detection Pipeline  ← YOURS    │
│ │                                               │
│ Recent runs                                     │
│ ├─ ✅ Run 2024-01-15 15:00 (completed)        │
│ │  └─ ⏱️ Duration: 18 minutes                  │
│ │  └─ 📊 123 signals collected                │
│ │  └─ 🔥 8 hot opportunities sent             │
│ │                                              │
│ ├─ ✅ Run 2024-01-15 12:00 (completed)        │
│ │  └─ ⏱️ Duration: 16 minutes                 │
│ │                                              │
│ ├─ ✅ Run 2024-01-15 09:00 (completed)        │
│ │  └─ ⏱️ Duration: 19 minutes                 │
│ │                                              │
│ ├─ ✅ Run 2024-01-15 06:00 (completed)        │
│ │  └─ ⏱️ Duration: 17 minutes                 │
│ │                                              │
│ └─ ⏳ Run 2024-01-15 03:00 (in progress)      │
│    └─ ⏱️ Started 2 min ago                    │
│                                                │
└─────────────────────────────────────────────────┘
```

---

## 📈 Expected Outputs

### After Each Run, You Should See:

```
✅ Telegram Channel
   ├─ Summary message (📊 Daily Crypto Early Detection)
   ├─ 🔥 Hot opportunities (score 8-10)
   ├─ ⚡ Early signals (score 6-7)
   ├─ 👀 Watch closely items (score 4-5)
   └─ 🚨 Risk alerts (score 1-3)

✅ GitHub Actions
   ├─ Completed run in ~18 minutes
   ├─ No error logs
   └─ Artifacts uploaded

✅ Data Folder (data/YYYY-MM-DD/)
   ├─ daily_signals.json
   ├─ gemini_all_signals_analysis.json
   ├─ gemini_all_signals_summary.txt
   └─ (other tracking files)
```

---

## 🎓 Common Status Icons

```
✅ Passed - Workflow completed successfully
❌ Failed - Workflow encountered an error
⏳ In progress - Workflow is running
⏭️  Skipped - Workflow was skipped
⏸️  Cancelled - Workflow was manually stopped
```

---

## 🚨 Quick Troubleshooting Flowchart

```
Pipeline Not Running?
│
├─ Check Secrets Tab
│  └─ Are all 6 secrets present?
│     ├─ NO → Add secrets (Step 3)
│     └─ YES ↓
│
├─ Check Actions Tab
│  └─ Does workflow show in list?
│     ├─ NO → Workflow file broken
│     └─ YES ↓
│
├─ Manual Trigger Test
│  └─ Run workflow button works?
│     ├─ NO → Enable Actions (Step 4)
│     └─ YES ↓
│
├─ Check Logs
│  └─ Any error messages?
│     ├─ NO → Likely working fine!
│     └─ YES → See error message
│
└─ Check Telegram
   └─ Did messages appear?
      ├─ NO → Check TG_TOKEN, TELEGRAM_CHANNEL_ID
      └─ YES → ✅ Everything works!
```

---

## 📋 Checklist Summary

```
Setup Checklist
═════════════════════════════════════════════════════════════════

PHASE 1: Gather Information
  ☐ Telegram Bot Token (TG_TOKEN)
  ☐ Telegram Channel ID (TELEGRAM_CHANNEL_ID)
  ☐ Telegram API ID (API_ID)
  ☐ Telegram API Hash (API_HASH)
  ☐ Telegram Session (TELEGRAM_SESSION)
  ☐ Gemini API Key (GEMINI_API_KEY1)

PHASE 2: Add Secrets
  ☐ TG_TOKEN added
  ☐ TELEGRAM_CHANNEL_ID added
  ☐ API_ID added
  ☐ API_HASH added
  ☐ TELEGRAM_SESSION added
  ☐ GEMINI_API_KEY1 added

PHASE 3: Enable Actions
  ☐ Settings → Actions → General
  ☐ Actions enabled

PHASE 4: Test Manual Trigger
  ☐ Actions tab → Run workflow
  ☐ Workflow completes successfully
  ☐ Telegram messages appear

PHASE 5: Verify Schedule
  ☐ Next 3-hour slot arrives
  ☐ Automatic run triggered
  ☐ Messages published automatically

STATUS: ☑ READY TO GO!
```

---

## 🎉 Success!

When everything is working:

1. ✅ Every 3 hours, GitHub Actions runs automatically
2. ✅ Data is collected from GitHub, Telegram, RSS
3. ✅ AI analysis via Gemini
4. ✅ Results published to Telegram
5. ✅ Zero manual intervention needed!

---

**Visual Guide Complete!**

For detailed text guides, see:
- SETUP_GITHUB_ACTIONS_STEP_BY_STEP.md
- QUICK_START_GITHUB_ACTIONS.md
- GITHUB_SETUP_CHECKLIST.md


