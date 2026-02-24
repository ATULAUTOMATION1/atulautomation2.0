#!/bin/bash
export PATH=/opt/alt/alt-nodejs18/root/usr/bin:$PATH
cd ~/domains/atulautomation.com/nodejs

echo "=== Node version ==="
node --version
npm --version

echo "=== Installing dependencies ==="
npm install 2>&1 | tail -10

echo "=== Building Next.js ==="
./node_modules/.bin/next build 2>&1 | tail -20

echo "=== Restarting app ==="
touch ~/domains/atulautomation.com/nodejs/tmp/restart.txt 2>/dev/null

echo "=== Verifying build ==="
ls -la .next/ 2>/dev/null | head -5
echo "=== DEPLOYMENT COMPLETE ==="
