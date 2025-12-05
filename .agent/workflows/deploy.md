---
description: How to deploy the IPO Watch application
---

# Deployment Guide

This is a Next.js application, which gives you several robust options for deployment.

## Option 1: Deploy to Vercel (Recommended)

Vercel is the creators of Next.js and provides the easiest deployment experience.

1.  **Install Vercel CLI** (if you haven't already):
    ```bash
    npm install -g vercel
    ```

2.  **Login to Vercel**:
    ```bash
    vercel login
    ```

3.  **Deploy**:
    Run the following command in your project root:
    ```bash
    vercel
    ```
    - Follow the prompts (accept defaults for most).
    - It will automatically detect Next.js and configure the build settings.

4.  **Production Deployment**:
    For a production build (instead of a preview), run:
    ```bash
    vercel --prod
    ```

## Option 2: Self-Hosted (Node.js Server)

If you want to host it on your own server (e.g., DigitalOcean, AWS EC2, or a VPS):

1.  **Build the Application**:
    ```bash
    npm run build
    ```

2.  **Start the Server**:
    ```bash
    npm start
    ```
    - This will start the production server on port 3000 by default.
    - You can use a process manager like `pm2` to keep it running:
      ```bash
      npm install -g pm2
      pm2 start npm --name "ipo-watch" -- start
      ```

## Option 3: Static Export (Optional)

If you want to host on a static host (like GitHub Pages or AWS S3) and don't need server-side features (API routes, dynamic headers):

1.  Update `next.config.ts`:
    ```typescript
    const nextConfig: NextConfig = {
      output: 'export',
    };
    ```
2.  Run Build:
    ```bash
    npm run build
    ```
3.  The `out` folder will contain your static site.

**Note**: Since this app uses `mockIpos.json` and client-side fetching/filtering, a Static Export is actually a very viable and cheap option!

## Automated Data Updates

Since the data is in `src/data/mockIpos.json`, you need to update this file to refresh the data.

-   **On Vercel**: You would typically set up a Cron Job (Vercel Cron) or a GitHub Action that runs `npm run update-data` and commits the changes to the repo, triggering a new deployment.
-   **On Self-Hosted**: Set up a standard cron job to run `npm run update-data` and then rebuild/restart if necessary (though for a JSON file import, a rebuild is usually required for Next.js to pick up the changes in a production build).
