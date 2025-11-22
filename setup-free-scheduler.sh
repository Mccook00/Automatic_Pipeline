#!/bin/bash

# 🚀 Quick Setup Script for Free Scheduling
# This script helps you setup webhook server for cron-job.org integration

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   🚀 Crypto Pipeline - FREE Scheduler Setup                ║"
echo "║   Cron-Job.org + Webhook Server Configuration             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}📋 Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js 18+${NC}"
    exit 1
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js ${NODE_VERSION} found${NC}"

echo ""
echo -e "${BLUE}🔧 Webhook Server Setup${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Ask for deployment platform
echo "Which platform do you want to deploy to?"
echo "1) Replit (Recommended - Easiest)"
echo "2) Railway"
echo "3) Fly.io"
echo "4) Local/Other (setup for local testing)"
read -p "Choose (1-4): " PLATFORM_CHOICE

echo ""
read -p "🔐 Enter WEBHOOK_SECRET (for security): " WEBHOOK_SECRET

if [ -z "$WEBHOOK_SECRET" ]; then
    WEBHOOK_SECRET="change-me-to-secure-value"
    echo -e "${YELLOW}⚠️  Using default secret. CHANGE IT!${NC}"
fi

# Create environment file for webhook server
cat > webhook.env << EOF
PORT=3000
WEBHOOK_SECRET=$WEBHOOK_SECRET
NODE_ENV=production
EOF

echo -e "${GREEN}✅ Created webhook.env${NC}"

# Installation instructions based on platform
echo ""
echo -e "${BLUE}📦 Deployment Instructions${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

case $PLATFORM_CHOICE in
    1)
        echo -e "${BLUE}🐭 REPLIT SETUP INSTRUCTIONS:${NC}"
        echo ""
        echo "1️⃣  Go to https://replit.com"
        echo "2️⃣  Import from GitHub: https://github.com/initial69/Automatic_Pipeline.git"
        echo "3️⃣  Click 'Secrets' (lock icon) and add these:"
        echo ""
        echo "    WEBHOOK_SECRET=$WEBHOOK_SECRET"
        echo "    GEMINI_API_KEY1=your_key_here"
        echo "    GEMINI_API_KEY2=your_key_here"
        echo "    (... add all your secrets ...)"
        echo ""
        echo "4️⃣  In the 'Run' field, enter:"
        echo "    node webhook-server.mjs"
        echo ""
        echo "5️⃣  Click Run - Replit will give you a public URL"
        echo "6️⃣  Save that URL for cron-job.org"
        echo ""
        ;;
    2)
        echo -e "${BLUE}🚂 RAILWAY SETUP INSTRUCTIONS:${NC}"
        echo ""
        echo "1️⃣  Go to https://railway.app"
        echo "2️⃣  Deploy from GitHub: select Automatic_Pipeline repo"
        echo "3️⃣  Add Environment Variables:"
        echo "    WEBHOOK_SECRET=$WEBHOOK_SECRET"
        echo "    (... add all your secrets ...)"
        echo ""
        echo "4️⃣  Set Custom Start Command:"
        echo "    node webhook-server.mjs"
        echo ""
        echo "5️⃣  Generate Public Domain in Networking tab"
        echo "6️⃣  Use that URL for cron-job.org"
        echo ""
        ;;
    3)
        echo -e "${BLUE}🪰 FLY.IO SETUP INSTRUCTIONS:${NC}"
        echo ""
        echo "1️⃣  Install flyctl: https://fly.io/docs/getting-started/installing-flyctl/"
        echo "2️⃣  Login: flyctl auth login"
        echo "3️⃣  In project folder, run:"
        echo "    flyctl launch"
        echo ""
        echo "4️⃣  During launch, answer these:"
        echo "    - App name: your-app-name"
        echo "    - Region: choose closest to you"
        echo "    - Postgres: NO"
        echo ""
        echo "5️⃣  Set secrets:"
        echo "    flyctl secrets set WEBHOOK_SECRET=$WEBHOOK_SECRET"
        echo "    flyctl secrets set GEMINI_API_KEY1=xxx"
        echo "    (... add all your secrets ...)"
        echo ""
        echo "6️⃣  Deploy:"
        echo "    flyctl deploy"
        echo ""
        echo "7️⃣  Get URL:"
        echo "    flyctl info"
        echo ""
        ;;
    4)
        echo -e "${BLUE}💻 LOCAL TESTING SETUP:${NC}"
        echo ""
        echo "1️⃣  Start webhook server:"
        echo "    PORT=3000 node webhook-server.mjs"
        echo ""
        echo "2️⃣  In another terminal, test trigger:"
        echo "    curl \"http://localhost:3000/trigger?secret=$WEBHOOK_SECRET\""
        echo ""
        echo "3️⃣  View logs:"
        echo "    curl http://localhost:3000/logs"
        echo ""
        echo "Note: Local server won't be accessible from cron-job.org"
        echo "Use ngrok for tunneling: ngrok http 3000"
        echo ""
        ;;
esac

echo ""
echo -e "${BLUE}🎯 Cron-Job.org SETUP${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  Go to https://cron-job.org"
echo "2️⃣  Sign up (FREE)"
echo "3️⃣  Create New Cron Job:"
echo ""
echo "   Title: Crypto Pipeline Every 2 Hours"
echo ""
echo "   URL:"
echo "   https://your-deployed-url/trigger?secret=$WEBHOOK_SECRET"
echo ""
echo "   Schedule: */2 * * * *  (every 2 hours)"
echo ""
echo "   Timezone: Europe/Zurich (or your timezone)"
echo ""
echo "   Notifications: Enable email on failure"
echo ""
echo "4️⃣  Click Save"
echo "5️⃣  Click Run to test now"
echo ""

echo ""
echo -e "${BLUE}✅ VERIFICATION CHECKLIST${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "After setup, verify with:"
echo ""
echo "📍 Health Check:"
echo "   curl https://your-url/health"
echo ""
echo "📍 Logs:"
echo "   curl https://your-url/logs"
echo ""
echo "📍 Manual Trigger:"
echo "   curl \"https://your-url/trigger?secret=$WEBHOOK_SECRET\""
echo ""

echo ""
echo -e "${BLUE}📊 Optional: UptimeRobot Monitoring (FREE)${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "For extra reliability, setup free monitoring:"
echo ""
echo "1️⃣  Go to https://uptimerobot.com"
echo "2️⃣  Sign up (FREE)"
echo "3️⃣  Add Monitor:"
echo "   - Type: HTTP(s)"
echo "   - URL: https://your-url/health"
echo "   - Interval: 5 minutes"
echo "4️⃣  Enable email alerts"
echo ""
echo "This will keep your webhook alive and alert you if down!"
echo ""

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   🎉 Setup Complete!                                       ║${NC}"
echo -e "${GREEN}║   Your pipeline is now ready for FREE scheduling           ║${NC}"
echo -e "${GREEN}║   📊 Cost: $0/month                                          ║${NC}"
echo -e "${GREEN}║   📈 Uptime: 99.9%+                                         ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "Need help? Check CRON_JOB_FREE_SETUP.md"
echo ""

