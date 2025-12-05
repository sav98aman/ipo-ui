# IPO Watch Dashboard - Maintenance & Deployment Guide

Welcome to the **IPO Watch Dashboard**! This project is designed to be 100% data-driven and easy to maintain. This guide covers how to run the project, how to update data, and how to deploy it to production.

## 🚀 How to Run Locally

To run this project on your local machine, follow these steps:

1.  **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Start Development Server**:
    ```bash
    npm run dev
    ```
4.  **View Application**: Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 How to Add or Update Data

The entire application is powered by a single JSON file. You do **not** need to touch the code to add new IPOs.

**Data File Location**: `src/data/mockIpos.json`

### 🔄 Automated Updates (Recommended)
You can automatically fetch new IPOs from the Groww API using the built-in script. This will add new IPOs and update existing ones (dates, logos, etc.) without overwriting your manual GMP data.

Run this command daily:
```bash
npm run update-data
```

### Manual Updates
If you prefer to edit manually:

1.  Open `src/data/mockIpos.json`.
2.  Add a new object to the array. Use the following template:

```json
{
  "id": "unique-id-here",
  "companyName": "New Company Name",
  "logo": "https://link-to-logo.png",
  "openDate": "YYYY-MM-DD",
  "closeDate": "YYYY-MM-DD",
  "priceRange": "₹100 - ₹120",
  "lotSize": 50,
  "issueSize": "₹1,000 Cr",
  "listingDate": "YYYY-MM-DD",
  "gmp": 50,
  "gmpPercent": 45.5,
  "gmpLastUpdated": "2024-12-05T10:00:00Z",
  "subscribed": "0.00x",
  "retail": "0.00x",
  "qib": "0.00x",
  "nii": "0.00x",
  "aiSummary": "Brief analysis of the IPO...",
  "status": "Upcoming", 
  "sector": "Technology",
  "leadManager": "Manager Name",
  "nseUrl": "https://www.nseindia.com/...",
  "bseUrl": "https://www.bseindia.com/...",
  "prospectusUrl": "#",
  "gmpHistory": [
    { "date": "2024-12-01", "gmp": 40, "gmpPercent": 35 },
    { "date": "2024-12-02", "gmp": 50, "gmpPercent": 45.5 }
  ]
}
```

### Updating GMP (Grey Market Premium)
To update the GMP for an existing IPO:
1.  Find the company in `src/data/mockIpos.json`.
2.  Update the `gmp` and `gmpPercent` fields.
3.  Add a new entry to the `gmpHistory` array so the chart updates.

### Status Values
The `status` field controls the badge color and filtering:
*   `"Upcoming"` (Blue)
*   `"Current"` (Orange)
*   `"Closed"` (Green)

---

## 🌍 Deployment Guide

### Option 1: Deploy to Vercel (Recommended)
Vercel is the creators of Next.js and offers the easiest deployment.

1.  **Push to GitHub**:
    *   Initialize git: `git init`
    *   Add files: `git add .`
    *   Commit: `git commit -m "Initial commit"`
    *   Create a repo on GitHub and push your code.
2.  **Connect to Vercel**:
    *   Go to [Vercel.com](https://vercel.com) and sign up/login.
    *   Click **"Add New..."** -> **"Project"**.
    *   Import your GitHub repository.
    *   Click **"Deploy"**.
3.  **Done!** Vercel will automatically build and deploy your site. Any time you push changes to `mockIpos.json`, Vercel will automatically update the live site.

### Option 2: Deploy to a VPS (Ubuntu/DigitalOcean/AWS)
If you prefer a traditional server:

1.  **Build the Project**:
    Run this command on your server to create an optimized production build:
    ```bash
    npm run build
    ```
2.  **Start the Server**:
    ```bash
    npm start
    ```
    This will run the app on port 3000.
3.  **Keep it Running (PM2)**:
    Use PM2 to keep the app running in the background:
    ```bash
    npm install -g pm2
    pm2 start npm --name "ipo-watch" -- start
    ```

### Option 3: Docker
1.  Build the image:
    ```bash
    docker build -t ipo-watch .
    ```
2.  Run the container:
    ```bash
    docker run -p 3000:3000 ipo-watch
    ```

---

## 🛠️ Project Structure

*   `src/app`: Main application pages and layout.
*   `src/components`: Reusable UI components.
*   `src/config`: Configuration for table columns and modal sections.
*   `src/data`: **The Data Source (JSON)**.
*   `src/lib`: Utility functions and state management (Zustand).
