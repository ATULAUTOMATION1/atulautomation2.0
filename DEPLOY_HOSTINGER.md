# Deploying to Hostinger (VPS or Cloud)

Since we have fixed the **Critical White Screen Crash** by removing `framer-motion`, you **MUST redeploy** your application for the fixes to take effect on your live site.

Here is the step-by-step guide to update your Hostinger server.

## 1. Push Latest Changes to GitHub
First, ensure all your local changes (the fixes we just made) are pushed to your GitHub repository.

```bash
git add .
git commit -m "Fix: Remove framer-motion to resolve white screen crash"
git push origin main
```

## 2. Connect to Your Hostinger Server (SSH)
Open your terminal (PowerShell or Command Prompt) and SSH into your Hostinger VPS.
*(Replace `root` and `your_server_ip` with your actual details)*

```bash
ssh root@your_server_ip
```

## 3. Navigate to Your App Directory
Go to the folder where your Next.js app is located.

```bash
cd /path/to/atul-automation-new
```
*(Common paths: `/var/www/atul-automation-new` or similar)*

## 4. Pull the Latest Code
Update the server with the fixes from GitHub.

```bash
git pull origin main
```

## 5. Re-Install Dependencies
Since we removed `framer-motion`, we need to update the `node_modules`.

```bash
npm install
# OR if you use yarn
yarn install
```

## 6. Build the Application
Rebuild the Next.js app with the new code.

```bash
npm run build
```

**✅ Success Check:** You should see `✓ Compiled successfully` and `✓ Route (app) ...` in the output.

## 7. Restart the Application
Restart the running process so the new code goes live.

### Option A: Using PM2 (Recommended)
If you are using PM2 (highly recommended for production):

```bash
pm2 restart all
# OR specific app name
pm2 restart atul-automation
```

*Note: I have added an `ecosystem.config.js` file to your project. You can now start the app with:*
```bash
pm2 start ecosystem.config.js
```

### Option B: Using standard npm
If you are running manually (not recommended for production):
1. Stop the current process (Ctrl+C).
2. Run:
```bash
npm start
```

## 8. 🚨 CRITICAL: Clear Browser Cache
After deployment, go to your website and **Hard Refresh** to ensure your browser loads the new code, not the old broken version.

- **Windows/Linux**: Press `Ctrl` + `F5`
- **Mac**: Press `Cmd` + `Shift` + `R`

---

## Troubleshooting

### "White Screen" Persists?
If the screen is still white after redeploying and refreshing:
1. Check the browser console (F12 > Console) for errors.
2. Check the server logs:
   ```bash
   pm2 logs
   ```
3. Ensure `framer-motion` is truly gone from `package.json` and `node_modules`.

### Environment Variables
Ensure your `.env.local` or `.env` file on the server has the necessary keys:
- `NEXT_PUBLIC_GOOGLE_SHEETS_ID`
- `GOOGLE_SHEETS_CLIENT_EMAIL`
- `GOOGLE_SHEETS_PRIVATE_KEY`
