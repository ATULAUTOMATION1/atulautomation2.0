#!/bin/bash
# Hostinger Auto-Deployment Script

echo "🚀 Starting Automated Deployment..."

# 1. Pull Latest Changes
echo "Running: git pull origin main..."
git pull origin main

# 2. Update Dependencies
echo "Running: npm install..."
npm install

# 3. Clean Re-Build
echo "Running: npm run build..."
rm -rf .next
npm run build

# 4. Restart Server
echo "Running: pm2 restart 'atul-automation'..."
pm2 restart atul-automation || pm2 start ecosystem.config.js --name "atul-automation"

echo "✅ DEPLOYMENT COMPLETE!"
echo "Please wait 1-2 minutes for the site to initialize."
echo "CRITICAL: Remember to Hard Refresh your browser (Ctrl+F5)!"
