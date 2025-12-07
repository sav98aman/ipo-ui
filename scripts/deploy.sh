#!/bin/bash

echo "🚀 Manual Deployment Script"
echo "============================"
echo ""

# Step 1: Update data
echo "📊 Step 1: Updating IPO data..."
npm run update-data
if [ $? -ne 0 ]; then
    echo "❌ Failed to update data"
    exit 1
fi
echo "✅ Data updated"
echo ""

# Step 2: Build
echo "🔨 Step 2: Building site..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Failed to build"
    exit 1
fi
echo "✅ Build complete"
echo ""

# Step 3: Commit changes
echo "💾 Step 3: Committing data changes..."
git add src/data/mockIpos.json src/data/lastUpdate.json
if git diff --staged --quiet; then
    echo "ℹ️  No data changes to commit"
else
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M IST')
    git commit -m "Auto-update: IPO data $TIMESTAMP"
    echo "✅ Changes committed"
fi
echo ""

# Step 4: Push
echo "📤 Step 4: Pushing to GitHub..."
git push origin master
if [ $? -ne 0 ]; then
    echo "❌ Failed to push"
    exit 1
fi
echo "✅ Pushed to GitHub"
echo ""

echo "🎉 Deployment complete!"
echo "GitHub Actions will deploy automatically in 1-2 minutes"
echo "Check: https://github.com/sav98aman/ipo-ui/actions"
