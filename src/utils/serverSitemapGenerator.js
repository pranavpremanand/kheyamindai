const axios = require('axios');

const SITE_URL = 'https://www.kheyamind.ai';
const baseUrl = "https://kheyamind-blogplatform-backend.vercel.app/api";

// Static services data (hardcoded for server-side reliability)
const services = [
  { slug: 'ai-chatbots' },
  { slug: 'voice-ai-agents' },
  { slug: 'nlp-custom-gpt-solutions' },
  { slug: 'ai-powered-erp-tools' },
  { slug: 'cloud-devops-ai' },
  { slug: 'ai-interface-design' },
  { slug: 'mobile-app-development' }
];

/**
 * Generate XML sitemap with all pages (Server-side version)
 */
const generateSitemap = async (options = {}) => {
  try {
    console.log('🔄 SERVER: Generating fresh sitemap...');
    
    // Static pages with their priorities and change frequencies
    const staticPages = [
      {
        url: '',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '1.0'
      },
      {
        url: '/about-us',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: '0.8'
      },
      {
        url: '/services',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.9'
      },
      {
        url: '/blogs',
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: '0.8'
      },
      {
        url: '/contact-us',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: '0.7'
      }
    ];

    // Service pages
    const servicePages = services.map(service => ({
      url: `/services/${service.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    }));

    // Fetch blog posts
    let blogPages = [];
    try {
      console.log('🔄 Fetching blogs for sitemap...');
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 15);
      
      const response = await axios({
        method: 'get',
        url: `${baseUrl}/blogs/published`,
        timeout: 15000,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Accept': 'application/json',
          'X-Cache-Bust': timestamp
        },
        params: {
          _t: timestamp,
          _r: random,
          _nocache: timestamp
        }
      });
      
      console.log(`✅ API Response status: ${response.status}`);
      
      if (response.data && response.data.blogs && Array.isArray(response.data.blogs)) {
        blogPages = response.data.blogs.map(blog => ({
          url: `/blogs/${blog.slug}`,
          lastmod: blog.updatedAt || blog.createdAt || new Date().toISOString(),
          changefreq: 'weekly',
          priority: '0.7'
        }));
        console.log(`📊 Found ${blogPages.length} blog pages for sitemap`);
        blogPages.forEach(page => {
          console.log(`📝 Blog URL: ${SITE_URL}${page.url}`);
        });
      } else {
        console.warn('⚠️ Blog response format unexpected:', response.data);
      }
    } catch (error) {
      console.warn('⚠️ Failed to fetch blogs for sitemap:', error.message);
      // Continue without blog pages if API fails
    }

    // Landing pages
    const landingPages = [
      {
        url: '/chatbots-voice-ai',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: '0.8'
      },
      {
        url: '/ai-enterprise-solutions',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: '0.8'
      },
      {
        url: '/real-estate-ai-solutions',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: '0.8'
      }
    ];

    // Combine all pages
    const allPages = [...staticPages, ...servicePages, ...blogPages, ...landingPages];
    console.log(`📊 Total URLs in sitemap: ${allPages.length}`);

    // Generate XML
    const xml = generateSitemapXML(allPages);
    
    return xml;
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    throw error;
  }
};

/**
 * Generate XML string from pages array
 */
const generateSitemapXML = (pages) => {
  const urlElements = pages.map(page => {
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
};

module.exports = { generateSitemap };