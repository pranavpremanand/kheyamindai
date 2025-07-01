# Sitemap Deployment Guide for Vercel

This guide explains how to deploy the dynamic sitemap solution to Vercel.

## What's Changed

We've created a Vercel-compatible solution for generating dynamic sitemaps:

1. Added a `vercel.json` configuration file to handle routing
2. Created serverless API endpoints in the `/api` folder:
   - `/api/sitemap.js` - Generates the main sitemap.xml
   - `/api/sitemap-test.js` - Generates a test sitemap
   - `/api/test-sitemap.js` - Provides diagnostic information

## How to Deploy

1. Push these changes to your GitHub repository
2. In the Vercel dashboard, deploy from the repository
3. Make sure to set the following:
   - Framework Preset: Other
   - Build Command: `npm run vercel-build`
   - Output Directory: `build`

## Testing After Deployment

After deploying, test the following URLs:

1. `https://www.kheyamind.ai/sitemap.xml` - Should show the dynamically generated sitemap
2. `https://www.kheyamind.ai/sitemap-test.xml` - Should show a simplified test sitemap
3. `https://www.kheyamind.ai/api/test-sitemap` - Should show diagnostic information

## Troubleshooting

If you're still having issues:

1. Check the Vercel deployment logs for any errors
2. Make sure the API endpoints are being correctly routed
3. Try adding a version parameter to bypass caching: `https://www.kheyamind.ai/sitemap.xml?v=123`

## How It Works

The serverless functions in the `/api` folder are executed on-demand when the corresponding routes are accessed. These functions:

1. Make a direct API call to fetch the latest blog data
2. Use aggressive cache-busting to ensure fresh data
3. Generate the sitemap XML on the fly
4. Set appropriate cache control headers to prevent caching

This approach ensures that the sitemap always reflects the current state of your blogs, without relying on periodic regeneration or static files.