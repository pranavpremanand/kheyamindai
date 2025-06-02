const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Import services data
const servicesPath = path.join(__dirname, '../src/data/constant.js');
let services = [];

// Read and parse services from constant.js
try {
  const constantsContent = fs.readFileSync(servicesPath, 'utf8');
  
  // Extract services array using regex (since we can't directly import ES modules in Node.js)
  const servicesMatch = constantsContent.match(/export const services = \[([\s\S]*?)\];/);
  if (servicesMatch) {
    // Parse service slugs from the content
    const serviceMatches = constantsContent.matchAll(/slug: ["']([^"']+)["']/g);
    services = Array.from(serviceMatches, match => ({ slug: match[1] }));
  }
} catch (error) {
  console.warn('Could not read services from constants.js:', error.message);
}

const SITE_URL = 'https://www.kheyamind.ai';
const API_BASE_URL = 'https://kheyamind-blogplatform-backend.vercel.app/api';

/**
 * Fetch blogs from API
 */
const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs/published`, {
      timeout: 10000 // 10 second timeout
    });
    return response.data.blogs || [];
  } catch (error) {
    console.warn('Failed to fetch blogs for sitemap:', error.message);
    return [];
  }
};

/**
 * Generate sitemap XML
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

/**
 * Main function to generate sitemap
 */
const generateSitemap = async () => {
  console.log('🚀 Starting sitemap generation...');
  
  try {
    // Static pages
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

    console.log(`📄 Found ${servicePages.length} service pages`);

    // Fetch blog posts
    console.log('📡 Fetching blog posts...');
    const blogs = await fetchBlogs();
    const blogPages = blogs.map(blog => ({
      url: `/blogs/${blog.slug}`,
      lastmod: blog.updatedAt || blog.createdAt || new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.7'
    }));

    console.log(`📝 Found ${blogPages.length} blog posts`);

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
    
    console.log(`📊 Total pages in sitemap: ${allPages.length}`);

    // Generate XML
    const sitemapXML = generateSitemapXML(allPages);

    // Save to public folder
    const publicPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(publicPath, sitemapXML, 'utf8');

    console.log('✅ Sitemap generated successfully at /public/sitemap.xml');
    console.log(`🔗 Sitemap will be available at: ${SITE_URL}/sitemap.xml`);
    
    return true;
  } catch (error) {
    console.error('❌ Failed to generate sitemap:', error);
    return false;
  }
};

// Run the script
if (require.main === module) {
  generateSitemap()
    .then(() => {
      console.log('🎉 Sitemap generation completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Sitemap generation failed:', error);
      process.exit(1);
    });
}

module.exports = { generateSitemap };