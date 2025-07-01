const axios = require('axios');
const fs = require('fs');
const path = require('path');

// API base URL
const baseUrl = "https://kheyamind-blogplatform-backend.vercel.app/api";
const SITE_URL = 'https://www.kheyamind.ai';

async function generateAndCheckSitemap() {
  try {
    console.log('🚀 TESTING SITEMAP GENERATION DIRECTLY...');
    
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

    // Check if the test blog is in the blogPages array
    const testBlog = blogPages.find(page => page.url === '/blogs/test');
    if (testBlog) {
      console.log('✅ TEST BLOG FOUND IN SITEMAP DATA');
    } else {
      console.log('❌ TEST BLOG NOT FOUND IN SITEMAP DATA');
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

    // Save the sitemap to a test file
    const testSitemapPath = path.join(__dirname, 'test-sitemap.xml');
    fs.writeFileSync(testSitemapPath, sitemapXML, 'utf8');
    console.log(`✅ Test sitemap saved to ${testSitemapPath}`);
    
    // Check if the test blog is in the generated XML
    if (sitemapXML.includes('/blogs/test')) {
      console.log('✅ TEST BLOG FOUND IN GENERATED XML');
    } else {
      console.log('❌ TEST BLOG NOT FOUND IN GENERATED XML');
    }
    
    // Now let's check the actual sitemap.xml file in the build directory
    const buildSitemapPath = path.join(__dirname, 'build', 'sitemap.xml');
    if (fs.existsSync(buildSitemapPath)) {
      const buildSitemapContent = fs.readFileSync(buildSitemapPath, 'utf8');
      console.log('\n🔍 CHECKING EXISTING SITEMAP.XML IN BUILD DIRECTORY:');
      
      if (buildSitemapContent.includes('/blogs/test')) {
        console.log('✅ TEST BLOG FOUND IN EXISTING BUILD SITEMAP.XML');
      } else {
        console.log('❌ TEST BLOG NOT FOUND IN EXISTING BUILD SITEMAP.XML');
      }
    } else {
      console.log('❌ No sitemap.xml found in build directory');
    }
    
    // Now let's check the sitemap.xml file in the public directory
    const publicSitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
    if (fs.existsSync(publicSitemapPath)) {
      const publicSitemapContent = fs.readFileSync(publicSitemapPath, 'utf8');
      console.log('\n🔍 CHECKING EXISTING SITEMAP.XML IN PUBLIC DIRECTORY:');
      
      if (publicSitemapContent.includes('/blogs/test')) {
        console.log('✅ TEST BLOG FOUND IN EXISTING PUBLIC SITEMAP.XML');
      } else {
        console.log('❌ TEST BLOG NOT FOUND IN EXISTING PUBLIC SITEMAP.XML');
      }
    } else {
      console.log('❌ No sitemap.xml found in public directory');
    }
    
  } catch (error) {
    console.error('❌ Error generating test sitemap:', error.message);
    if (error.response) {
      console.error('API error details:', {
        status: error.response.status,
        data: JSON.stringify(error.response.data)
      });
    }
  }
}

// Run the test
generateAndCheckSitemap();