const axios = require('axios');
const fs = require('fs');
const path = require('path');

// API base URL
const baseUrl = "https://kheyamind-blogplatform-backend.vercel.app/api";
const SITE_URL = 'https://www.kheyamind.ai';

async function updateSitemap() {
  try {
    console.log('🚀 UPDATING SITEMAP FILES WITH LATEST BLOG DATA...');
    
    // Static pages
    const staticPages = [
      { url: '', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '1.0' },
      { url: '/about-us', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
      { url: '/services', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.9' },
      { url: '/blogs', lastmod: new Date().toISOString(), changefreq: 'daily', priority: '0.8' },
      { url: '/contact-us', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.7' }
    ];

    // Service pages
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

    // Fetch blog posts with EXTREME cache busting
    console.log('🔄 Fetching blogs for sitemap with cache busting...');
    
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
      
      console.log('📝 Blog slugs found for sitemap:');
      response.data.blogs.forEach(blog => {
        console.log(`   - ${blog.slug} (${blog.title || 'No title'})`);
      });
    }

    // Combine all pages
    const allPages = [...staticPages, ...servicePages, ...blogPages, ...landingPages];
    console.log(`📊 Total URLs in sitemap: ${allPages.length}`);

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

    // Update the sitemap in the build directory
    const buildSitemapPath = path.join(__dirname, 'build', 'sitemap.xml');
    fs.writeFileSync(buildSitemapPath, sitemapXML, 'utf8');
    console.log(`✅ Updated sitemap.xml in build directory`);
    
    // Update the sitemap in the public directory
    const publicSitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
    fs.writeFileSync(publicSitemapPath, sitemapXML, 'utf8');
    console.log(`✅ Updated sitemap.xml in public directory`);
    
    console.log('🎉 SITEMAP UPDATE COMPLETE!');
    console.log('Please restart your server to ensure the changes take effect.');
    
  } catch (error) {
    console.error('❌ Error updating sitemap:', error.message);
    if (error.response) {
      console.error('API error details:', {
        status: error.response.status,
        data: JSON.stringify(error.response.data)
      });
    }
  }
}

// Run the update
updateSitemap();