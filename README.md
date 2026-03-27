# BuildTrack Telangana - SaaS Deployment Guide

This document outlines the steps to transform this application into a production-ready SaaS product and deploy it to GitHub Pages with CI/CD.

## 1. Prerequisites
- A GitHub account.
- Node.js and npm installed locally.
- A Gemini API Key (for the AI features).

## 2. Deployment to GitHub Pages

### Step 1: Install `gh-pages`
```bash
npm install gh-pages --save-dev
```

### Step 2: Update `package.json`
Add the following fields to your `package.json`:
```json
{
  "homepage": "https://<your-username>.github.io/buildtrack-telangana",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 3: Deploy
```bash
npm run deploy
```

## 3. Setting up CI/CD (GitHub Actions)

Create a file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Install and Build
        run: |
          npm install
          npm run build
        env:
          VITE_GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
```

## 4. SaaS Monetization (Razorpay/Stripe)

To enable real payments:
1. Create a Razorpay or Stripe account.
2. Install the SDK: `npm install razorpay` or `npm install stripe`.
3. Create a backend route (Express) to handle checkout sessions.
4. Update the `Pricing.tsx` component to trigger the checkout flow.

## 5. Connecting Real Data

The current application uses `src/constants.ts` for data. To use real data:
1. **TG-bPASS API:** Request access to the Telangana Building Permission Approval and Self Certification System API.
2. **RERA Portal:** Scrape or use official APIs from the Telangana RERA portal.
3. **Material Prices:** Use APIs like `Infra.Market` or `Indiamart` (if available) or a custom scraper for local market rates.

## 6. AI Features (Gemini)

The AI Cost Estimator is currently a placeholder. To implement it:
1. Use the `@google/genai` SDK.
2. Prompt Gemini with: "Estimate construction cost for a [Type] project in [Location] with [Area] sqft, given current material prices: [Prices]."
3. Display the structured response in the UI.

---
BuildTrack Telangana - Empowering Construction Transparency.
