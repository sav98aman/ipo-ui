# Auto-Update Setup Guide

## ✅ What's Configured

The site now automatically updates IPO data **every 5 minutes** using GitHub Actions.

## 🔧 How It Works

1. **Every 5 minutes**, GitHub Actions runs:
   - Fetches latest IPO data from APIs
   - Updates `mockIpos.json`
   - Rebuilds the static site
   - Deploys to GitHub Pages

2. **Smart Updates**:
   - Only deploys if data actually changed
   - Skips deployment if no changes (saves resources)

## 🚀 Setup Steps

### 1. Enable GitHub Pages (if not already done)
Go to: `https://github.com/sav98aman/ipo-ui/settings/pages`

**Settings:**
- **Source:** GitHub Actions
- **Branch:** (managed by workflow)

### 2. Enable Actions Permissions
Go to: `https://github.com/sav98aman/ipo-ui/settings/actions`

**Set:**
- ✅ Allow all actions and reusable workflows
- ✅ Read and write permissions
- ✅ Allow GitHub Actions to create and approve pull requests

### 3. Push the Workflow
```bash
git add .github/workflows/auto-update.yml
git commit -m "Add auto-update workflow"
git push origin master
```

### 4. Verify It's Running
Go to: `https://github.com/sav98aman/ipo-ui/actions`

You should see:
- ✅ "Auto Update IPO Data" workflow
- 🔄 Running every 5 minutes
- 📊 Deployment logs

## 📊 Monitor Updates

Check the Actions tab to see:
- When data was last updated
- If deployment succeeded
- Any errors

## ⚙️ Manual Trigger

You can also trigger updates manually:
1. Go to Actions tab
2. Select "Auto Update IPO Data"
3. Click "Run workflow"

## 🔄 Change Update Frequency

Edit `.github/workflows/auto-update.yml`:

```yaml
schedule:
  - cron: '*/5 * * * *'   # Every 5 minutes
  # - cron: '*/10 * * * *'  # Every 10 minutes
  # - cron: '0 * * * *'     # Every hour
```

## 💰 GitHub Actions Limits

**Free tier:** 2,000 minutes/month
**Usage:** ~2-3 min per update × 12 updates/hour × 24 hours = ~720-860 min/day

**Recommendation:** Consider 10-minute intervals to stay well within limits:
- 10 min intervals = ~360 min/day (safe for free tier)

## 🛑 Disable Auto-Updates

To stop automatic updates:

**Option 1:** Disable in GitHub
- Go to Actions tab → "Auto Update IPO Data" → Disable

**Option 2:** Delete workflow file
```bash
git rm .github/workflows/auto-update.yml
git commit -m "Disable auto-updates"
git push
```

## 📝 Notes

- First run may take 5-10 minutes to initialize
- Data updates only when there are actual changes
- Check Actions tab for real-time status
- Old workflow `nextjs.yml` handles initial deployment
