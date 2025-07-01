# Dynamic Sitemap Solution for Vercel

This guide explains how to use the dynamic sitemap solution with Vercel.

## What's Changed

We've created a solution for generating dynamic sitemaps that works with React apps on Vercel:

1. Added a new route in `server.js`:
   - `/dynamic-sitemap.xml` - Generates a fresh sitemap on demand

2. Updated the `vercel.json` file to:
   - Configure proper builds for both the React app and the server
   - Set cache control headers to prevent caching

3. Updated `robots.txt` to include both sitemaps

## How to Use After Deployment

After deploying to Vercel, you can access the dynamic sitemap at:

- `https://www.kheyamind.ai/dynamic-sitemap.xml`

This will generate a fresh sitemap with the latest blog data every time it's accessed.

## Testing the Sitemap

You can use the sitemap testing tool:

1. Visit `https://www.kheyamind.ai/sitemap-test.html`
2. Click on the different buttons to test:
   - "Dynamic Sitemap" - Tests the dynamic sitemap
   - "View Current Sitemap" - Shows the static sitemap
   - "View Sitemap (No Cache)" - Shows the static sitemap with cache busting

## How It Works

The dynamic sitemap solution works by:

1. Using Express.js routes in `server.js` to handle the `/dynamic-sitemap.xml` request
2. Making a direct API call to fetch the latest blog data with aggressive cache busting
3. Generating the sitemap XML on the fly
4. Setting appropriate cache control headers to prevent caching

This ensures that the sitemap always reflects the current state of your blogs, without relying on periodic regeneration or static files.

## Troubleshooting

If you're still having issues:

1. Check the Vercel deployment logs for any errors
2. Make sure the server.js file is being properly deployed
3. Try adding a version parameter to bypass caching: `https://www.kheyamind.ai/dynamic-sitemap.xml?v=123`