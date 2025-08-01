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
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
