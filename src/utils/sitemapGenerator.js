import { services } from '../data/constant';
import { blogsApi } from './api';

const SITE_URL = 'https://www.kheyamind.ai';

/**
 * Generate XML sitemap with all pages
 */
export const generateSitemap = async () => {
  try {
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
      const blogsResponse = await blogsApi.getBlogs();
      console.log('Blogs API response:', JSON.stringify(blogsResponse, null, 2));
      
      if (blogsResponse && blogsResponse.blogs && Array.isArray(blogsResponse.blogs)) {
        blogPages = blogsResponse.blogs.map(blog => ({
          url: `/blogs/${blog.slug}`,
          lastmod: blog.updatedAt || blog.createdAt || new Date().toISOString(),
          changefreq: 'weekly',
          priority: '0.7'
        }));
        console.log(`Found ${blogPages.length} blog pages for sitemap`);
        blogPages.forEach(page => {
          console.log(`Blog URL: ${SITE_URL}${page.url}`);
        });
      } else {
        console.warn('Blog response format unexpected:', blogsResponse);
      }
    } catch (error) {
      console.warn('Failed to fetch blogs for sitemap:', error);
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

    // Generate XML
    const xml = generateSitemapXML(allPages);
    
    return xml;
  } catch (error) {
    console.error('Error generating sitemap:', error);
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

/**
 * Save sitemap to public folder (for build process)
 */
export const saveSitemapToPublic = async () => {
  const fs = require('fs');
  const path = require('path');
  
  try {
    // Force a fresh API call to get the latest blogs
    console.log('Generating sitemap with latest blog data...');
    const sitemapXML = await generateSitemap();
    
    // Ensure the public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
      console.log('Created public directory');
    }
    
    const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    
    // Write the sitemap to the public folder
    fs.writeFileSync(publicPath, sitemapXML, 'utf8');
    console.log('✅ Sitemap generated successfully at /public/sitemap.xml');
    
    // Also write to the build folder if it exists (for production)
    const buildPath = path.join(process.cwd(), 'build');
    if (fs.existsSync(buildPath)) {
      const buildSitemapPath = path.join(buildPath, 'sitemap.xml');
      fs.writeFileSync(buildSitemapPath, sitemapXML, 'utf8');
      console.log('✅ Sitemap also copied to /build/sitemap.xml');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Failed to generate sitemap:', error);
    return false;
  }
};

/**
 * Generate sitemap for runtime (Express route)
 */
export const getSitemapXML = async () => {
  try {
    return await generateSitemap();
  } catch (error) {
    console.error('Error generating sitemap for route:', error);
    // Return basic sitemap if generation fails
    return generateSitemapXML([
      {
        url: '',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '1.0'
      }
    ]);
  }
};