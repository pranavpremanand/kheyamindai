# Dynamic Sitemap Solution for Vercel

This guide explains how to use the dynamic sitemap solution with Vercel.

## What's Changed

We've created a Vercel-compatible solution for generating dynamic sitemaps:

1. Added Next.js API routes in the `/pages/api` folder:
   - `/pages/api/sitemap.js` - Generates a fresh sitemap on demand
   - `/pages/api/test-sitemap.js` - Provides diagnostic information

2. Updated the `next.config.js` file to:
   - Add a redirect from `/dynamic-sitemap.xml` to `/api/sitemap`
   - Set cache control headers to prevent caching

3. Enhanced the sitemap generation script to use aggressive cache busting

## How to Use After Deployment

After deploying to Vercel, you can access the dynamic sitemap in two ways:

1. **Through the API route**:
   - Visit `https://www.kheyamind.ai/api/sitemap`

2. **Through the friendly URL**:
   - Visit `https://www.kheyamind.ai/dynamic-sitemap.xml`

Both will generate a fresh sitemap with the latest blog data.

## Testing the Sitemap

You can use the sitemap testing tool:

1. Visit `https://www.kheyamind.ai/sitemap-test.html`
2. Click on the different buttons to test:
   - "Test API Sitemap" - Tests the API route directly
   - "Dynamic Sitemap" - Tests the friendly URL
   - "View Current Sitemap" - Shows the static sitemap
   - "View Sitemap (No Cache)" - Shows the static sitemap with cache busting

## Updating Your Robots.txt

Consider updating your robots.txt to point to both sitemaps:

```
# Sitemaps
Sitemap: https://www.kheyamind.ai/sitemap.xml
Sitemap: https://www.kheyamind.ai/dynamic-sitemap.xml
```

## How It Works

The Next.js API routes are serverless functions that run on demand when accessed. When you visit `/dynamic-sitemap.xml` or `/api/sitemap`, the serverless function:

1. Makes a direct API call to fetch the latest blog data
2. Uses aggressive cache-busting to ensure fresh data
3. Generates the sitemap XML on the fly
4. Sets appropriate cache control headers to prevent caching

This ensures that the sitemap always reflects the current state of your blogs, without relying on periodic regeneration or static files.