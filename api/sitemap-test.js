const axios = require('axios');

// API base URL
const baseUrl = "https://kheyamind-blogplatform-backend.vercel.app/api";

module.exports = async (req, res) => {
  try {
    console.log('🔄 VERCEL SERVERLESS: Generating test sitemap...');
    
    // Define the site URL
    const SITE_URL = 'https://www.kheyamind.ai';
    
    // Static pages - just the homepage for the test
    const staticPages = [
      { url: '', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '1.0' }
    ];

    // Fetch blog posts with EXTREME cache busting
    console.log('🔄 Directly fetching latest blogs from API for test sitemap...');
    
    // Generate a unique cache-busting parameter
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const cacheBuster = `_t=${timestamp}&_r=${random}`;
    
    // Make the API request with aggressive cache busting
    const response = await axios({
      method: 'get',
      url: `${baseUrl}/blogs/published?${cacheBuster}`,
      timeout: 30000, // 30 second timeout
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'X-Cache-Bust': timestamp
      },
      params: {
        _nocache: timestamp
      }
    });
    
    console.log(`✅ API Response status: ${response.status}`);
    
    let blogPages = [];
    if (!response.data || !response.data.blogs || !Array.isArray(response.data.blogs)) {
      console.error('❌ API response missing blogs array:', JSON.stringify(response.data));
    } else {
      console.log(`📊 Found ${response.data.blogs.length} blogs in API response`);
      
      blogPages = response.data.blogs.map(blog => ({
        url: `/blogs/${blog.slug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: '0.7'
      }));
      
      console.log('📝 Blog slugs found for test sitemap:');
      response.data.blogs.forEach(blog => {
        console.log(`   - ${blog.slug} (${blog.title || 'No title'})`);
      });
    }

    // Combine all pages
    const allPages = [...staticPages, ...blogPages];
    console.log(`📊 Total URLs in test sitemap: ${allPages.length}`);

    // Generate XML
    const urlElements = allPages.map(page => {
      const fullUrl = `${SITE_URL}${page.url}`;
      return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }).join('\n');

    const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;

    // Set proper content type and cache control headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    // Send the fresh sitemap
    res.status(200).send(sitemapXML);
    console.log('📤 Sent test sitemap to client');
  } catch (error) {
    console.error('❌ Error generating test sitemap:', error);
    res.status(500).send(`Error generating test sitemap: ${error.message}`);
  }
};