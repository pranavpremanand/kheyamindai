const express = require('express');
const path = require('path');
const { generateSitemap } = require('./src/utils/serverSitemapGenerator');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Route to generate and serve the sitemap dynamically
app.get('/sitemap.xml', async (req, res) => {
  try {
    console.log('Generating fresh sitemap...');
    // Generate the sitemap with forceFresh to bypass any potential caching
    const sitemapXml = await generateSitemap({ forceFresh: true });

    // Set appropriate headers for XML content and to prevent caching
    res.set('Content-Type', 'application/xml');
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');

    // Send the generated sitemap
    res.send(sitemapXml);
    console.log('Successfully sent fresh sitemap.');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

// All other requests should serve the React app
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'build', 'index.html');
  
  // Read the HTML file
  let html = require('fs').readFileSync(indexPath, 'utf8');
  
  // Generate canonical URL for the current path with proper normalization
  let normalizedPath = req.path || '/';
  
  // Remove trailing slash except for root
  if (normalizedPath.endsWith('/') && normalizedPath !== '/') {
    normalizedPath = normalizedPath.slice(0, -1);
  }
  
  // Handle specific problem URLs
  if (normalizedPath.includes('/services/cloud-devops.ai')) {
    normalizedPath = '/services/cloud-devops-ai';
  } else if (normalizedPath.includes('/services/voice.ai-agents')) {
    normalizedPath = '/services/voice-ai-agents';
  }
  
  const canonicalUrl = `https://www.kheyamind.ai${normalizedPath === '/' ? '' : normalizedPath}`;
  
  // Replace the default canonical URL with the current page's canonical URL  
  html = html.replace(
    /<link rel="canonical" href="https:\/\/www\.kheyamind\.ai\/" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  
  console.log(`Serving page: ${req.path} with canonical: ${canonicalUrl}`);
  
  res.send(html);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
