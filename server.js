const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// API base URL
const baseUrl = "https://kheyamind-blogplatform-backend.vercel.app/api";

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = {
  blogs: {
    data: null,
    timestamp: 0
  },
  featuredBlogs: {
    data: null,
    timestamp: 0
  },
  blogsBySlug: {}
};

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'build')));

// Dynamic sitemap generation
const generateDynamicSitemap = async () => {
  const SITE_URL = 'https://www.kheyamind.ai';
  
  try {
    // Static pages
    const staticPages = [
      { url: '', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '1.0' },
      { url: '/about-us', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
      { url: '/services', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.9' },
      { url: '/blogs', lastmod: new Date().toISOString(), changefreq: 'daily', priority: '0.8' },
      { url: '/contact-us', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.7' }
    ];

    // Service pages (hardcoded for server)
    const servicePages = [
      { url: '/services/ai-chatbots', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
      { url: '/services/voice-ai-agents', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
      { url: '/services/nlp-custom-gpt-solutions', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
      { url: '/services/ai-powered-erp-tools', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
      { url: '/services/cloud-devops-ai', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
      { url: '/services/ai-interface-design', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
      { url: '/services/mobile-app-development', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' }
    ];

    // Landing pages
    const landingPages = [
      { url: '/chatbots-voice-ai', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
      { url: '/ai-enterprise-solutions', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
      { url: '/real-estate-ai-solutions', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' }
    ];

    // Fetch blog posts
    let blogPages = [];
    try {
      const response = await axios.get(`${baseUrl}/blogs/published`);
      blogPages = response.data.blogs.map(blog => ({
        url: `/blogs/${blog.slug}`,
        lastmod: blog.updatedAt || blog.createdAt || new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.7'
      }));
    } catch (error) {
      console.warn('Failed to fetch blogs for dynamic sitemap:', error.message);
    }

    // Combine all pages
    const allPages = [...staticPages, ...servicePages, ...blogPages, ...landingPages];

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

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
    // Return basic sitemap if generation fails
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
  }
};

// Dynamic sitemap route (fallback if static sitemap.xml doesn't exist)
app.get('/sitemap.xml', async (req, res) => {
  try {
    // First try to serve static sitemap.xml if it exists
    const staticSitemapPath = path.join(__dirname, 'build', 'sitemap.xml');
    if (fs.existsSync(staticSitemapPath)) {
      return res.sendFile(staticSitemapPath);
    }

    // If static sitemap doesn't exist, generate dynamic one
    console.log('Static sitemap not found, generating dynamic sitemap...');
    const sitemapXML = await generateDynamicSitemap();
    
    res.set('Content-Type', 'application/xml');
    res.send(sitemapXML);
  } catch (error) {
    console.error('Error serving sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

// API proxy endpoints with caching
app.get('/api/blogs/published', async (req, res) => {
  try {
    const now = Date.now();
    
    // Check if cache is valid
    if (cache.blogs.data && now - cache.blogs.timestamp < CACHE_DURATION) {
      return res.json(cache.blogs.data);
    }
    
    // Fetch fresh data
    const response = await axios.get(`${baseUrl}/blogs/published`);
    
    // Update cache
    cache.blogs.data = response.data;
    cache.blogs.timestamp = now;
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

app.get('/api/blogs/featured', async (req, res) => {
  try {
    const now = Date.now();
    
    // Check if cache is valid
    if (cache.featuredBlogs.data && now - cache.featuredBlogs.timestamp < CACHE_DURATION) {
      return res.json(cache.featuredBlogs.data);
    }
    
    // Fetch fresh data
    const response = await axios.get(`${baseUrl}/blogs/featured`);
    
    // Update cache
    cache.featuredBlogs.data = response.data;
    cache.featuredBlogs.timestamp = now;
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    res.status(500).json({ error: 'Failed to fetch featured blogs' });
  }
});

app.get('/api/blogs/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const now = Date.now();
    
    // Check if cache is valid
    if (
      cache.blogsBySlug[slug] && 
      cache.blogsBySlug[slug].data && 
      now - cache.blogsBySlug[slug].timestamp < CACHE_DURATION
    ) {
      return res.json(cache.blogsBySlug[slug].data);
    }
    
    // Fetch fresh data
    const response = await axios.get(`${baseUrl}/blogs/slug/${slug}`);
    
    // Update cache
    if (!cache.blogsBySlug[slug]) {
      cache.blogsBySlug[slug] = {};
    }
    cache.blogsBySlug[slug].data = response.data;
    cache.blogsBySlug[slug].timestamp = now;
    
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching blog with slug ${req.params.slug}:`, error);
    res.status(500).json({ error: 'Failed to fetch blog details' });
  }
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});