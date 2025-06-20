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
      //console.warn('Failed to fetch blogs for dynamic sitemap:', error.message);
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

// Test endpoint for social media crawler detection
app.get('/api/test-crawler', (req, res) => {
  const userAgent = req.headers['user-agent'];
  const isCrawler = isSocialMediaCrawler(userAgent);
  
  res.json({
    userAgent,
    isCrawler,
    timestamp: new Date().toISOString()
  });
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

// Social media crawler detection and handling
const isSocialMediaCrawler = (userAgent) => {
  if (!userAgent) return false;
  
  const userAgentLower = userAgent.toLowerCase();
  const crawlers = [
    'facebookexternalhit',
    'facebot',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'slackbot',
    'telegrambot',
    'discordbot',
    'pinterest',
    'googlebot',
    'bingbot',
    'yandexbot',
    'baiduspider',
    'tumblr',
    'vkshare',
    'snapchat',
    'skype',
    'line',
    'viber',
    'wechat',
    'instagram',
    'telegram',
    'reddit',
    'ia_archiver', // Internet Archive
    'developers.google.com/+/web/snippet',
    'embedly',
    'outbrain',
    'quora link preview',
    'nuzzel',
    'bitlybot',
    'applebot'
  ];

  // Check if the user agent contains any of the crawler identifiers
  return crawlers.some(crawler => userAgentLower.includes(crawler));
};

// Page metadata mapping
const pageMetadata = {
  '/': {
    title: 'AI Chatbots, Voice Assistants & Automation Solutions | KheyaMind AI Technologies',
    description: 'KheyaMind AI crafts intelligent solutions including AI Chatbots, Voice Assistants, ERP Automations, and NLP tools. Empower your enterprise with next-gen AI solutions.'
  },
  '': { // Also match empty path for root
    title: 'AI Chatbots, Voice Assistants & Automation Solutions | KheyaMind AI Technologies',
    description: 'KheyaMind AI crafts intelligent solutions including AI Chatbots, Voice Assistants, ERP Automations, and NLP tools. Empower your enterprise with next-gen AI solutions.'
  },
  '/about-us': {
    title: 'About KheyaMind AI Technologies | AI Solutions Company',
    description: 'Learn about KheyaMind AI Technologies, a boutique AI consulting and solutions company specializing in AI-driven automation and digital products.'
  },
  '/services': {
    title: 'AI Services | Chatbots, Voice AI & Automation Solutions | KheyaMind AI',
    description: 'Explore KheyaMind AI comprehensive suite of AI services including chatbots, voice assistants, ERP automation, and custom AI solutions for businesses.'
  },
  '/contact-us': {
    title: 'Contact Us | Get in Touch with KheyaMind AI Technologies',
    description: 'Contact KheyaMind AI for AI chatbots, voice assistants, and automation solutions. Get expert consultation and transform your business with AI technology.'
  },
  '/services/ai-chatbots': {
    title: 'AI Chatbots for Business | 24/7 Customer Support Automation | KheyaMind AI',
    description: 'Automate customer support with intelligent AI chatbots. Handle queries, generate leads, and enhance customer experience 24/7. Get your AI chatbot today.'
  },
  '/services/voice-ai-agents': {
    title: 'Voice AI Agents | AI-Powered Sales & Call Center Solutions | KheyaMind AI',
    description: 'Transform call center operations with human-like voice AI agents. Automate sales calls, customer support, and lead qualification with advanced voice AI.'
  },
  '/services/nlp-custom-gpt-solutions': {
    title: 'Custom GPT Development | NLP Solutions | Enterprise AI | KheyaMind AI',
    description: 'Build domain-specific AI with custom GPT solutions. Advanced NLP for document processing, content generation, and intelligent business automation.'
  },
  '/services/ai-powered-erp-tools': {
    title: 'AI-Powered ERP Systems | Smart Enterprise Resource Planning | KheyaMind AI',
    description: 'Enhance enterprise systems with AI-powered ERP tools. Automate procurement, demand forecasting, and process optimization for maximum efficiency.'
  },
  '/chatbots-voice-ai': {
    title: 'AI Chatbot & Voice AI Solutions | Automate Customer Support | KheyaMind AI',
    description: 'Transform your customer experience with intelligent AI chatbots and voice AI solutions. 24/7 automated support, lead qualification, and seamless CRM integration. Get started today!'
  },
  '/ai-enterprise-solutions': {
    title: 'Enterprise AI Solutions | Custom AI Development | ERP Integration | KheyaMind AI',
    description: 'Transform your enterprise with custom AI solutions. AI-powered ERP systems, NLP solutions, cloud infrastructure, and intelligent automation for large-scale businesses.'
  },
  '/real-estate-ai-solutions': {
    title: 'Real Estate AI Solutions | Property Management Automation | KheyaMind AI',
    description: 'Revolutionize your real estate business with AI-powered lead qualification, property management automation, and intelligent customer support. Boost sales and efficiency.'
  }
};

// Middleware to handle social media crawlers
app.get('*', async (req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';
  
  // Force crawler mode for testing if ?crawler=true is in the URL
  const forceCrawler = req.query.crawler === 'true';
  
  // Log all requests from potential crawlers for debugging
  if (userAgent.toLowerCase().includes('bot') || forceCrawler) {
    console.log(`Crawler detected: ${userAgent} - Path: ${req.path}`);
  }

  // If it's not a social media crawler and not forced, proceed to the next middleware
  if (!isSocialMediaCrawler(userAgent) && !forceCrawler) {
    return next();
  }

  console.log(`Social media crawler detected: ${userAgent} - Path: ${req.path}`);

  try {
    // Read the index.html file
    const filePath = path.join(__dirname, 'build', 'index.html');
    let html = fs.readFileSync(filePath, 'utf8');

    // Get the path from the request or query parameter (for testing)
    const urlPath = req.query.path || req.path;
    
    // Normalize path for root
    const normalizedPath = urlPath === '/' ? '/' : urlPath;
    
    console.log(`Processing path: ${urlPath}, normalized: ${normalizedPath}`);
    
    // Check if we have metadata for this path
    let metadata = pageMetadata[normalizedPath];
    console.log(`Looking for metadata for path: ${normalizedPath}`);
    console.log(`Available paths:`, Object.keys(pageMetadata));
    console.log(`Found metadata:`, metadata);

    // For blog posts
    if (urlPath.startsWith('/blogs/') && urlPath !== '/blogs') {
      const slug = urlPath.replace('/blogs/', '');
      try {
        // Try to fetch the blog data
        const response = await axios.get(`${baseUrl}/blogs/slug/${slug}`);
        const blog = response.data.blog;

        if (blog) {
          metadata = {
            title: `${blog.title} | KheyaMind AI Blog`,
            description: blog.excerpt || blog.description || 'Read our latest insights on AI technologies and solutions.',
            image: blog.coverImage || 'https://www.kheyamind.ai/og-image.png'
          };
        }
      } catch (error) {
        //console.warn(`Failed to fetch blog data for ${slug}:`, error.message);
      }
    }

    // For service detail pages that aren't explicitly defined
    if (urlPath.startsWith('/services/') && !metadata) {
      const serviceSlug = urlPath.replace('/services/', '');
      metadata = {
        title: `${serviceSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} | KheyaMind AI Services`,
        description: 'Explore our specialized AI services and solutions designed to transform your business operations and customer experiences.'
      };
    }

    // If we have metadata for this path, update the HTML
    if (metadata) {
      console.log(`Applying metadata for ${urlPath}:`, metadata);
      
      // Make sure we have a valid title and description
      const title = metadata.title || 'KheyaMind AI Technologies';
      const description = metadata.description || 'KheyaMind AI crafts intelligent solutions including AI Chatbots, Voice Assistants, ERP Automations, and NLP tools.';
      
      // Update the title - ensure it's properly replaced
      const titleRegex = /<title>.*?<\/title>/;
      if (titleRegex.test(html)) {
        html = html.replace(titleRegex, `<title>${title}</title>`);
      } else {
        const headPos = html.indexOf('</head>');
        html = html.slice(0, headPos) + `<title>${title}</title>` + html.slice(headPos);
      }
      
      // Add meta description if not present or replace existing one
      const descriptionRegex = /<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i;
      if (descriptionRegex.test(html)) {
        html = html.replace(descriptionRegex, `<meta name="description" content="${description}">`);
      } else {
        const headPos = html.indexOf('</head>');
        html = html.slice(0, headPos) + `<meta name="description" content="${description}">` + html.slice(headPos);
      }

      // Update or add OG and Twitter meta tags
      const headEndPos = html.indexOf('</head>');
      
      // Remove existing OG and Twitter tags to avoid duplicates
      html = html.replace(/<meta\s+property=["']og:.*?["']\s+content=["'].*?["']\s*\/?>/g, '');
      html = html.replace(/<meta\s+name=["']twitter:.*?["']\s+content=["'].*?["']\s*\/?>/g, '');
      
      // Add comprehensive meta tags
      const metaTags = `
        <!-- Dynamic Meta Tags for ${urlPath} -->
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="${urlPath.startsWith('/blogs/') ? 'article' : 'website'}">
        <meta property="og:url" content="https://www.kheyamind.ai${urlPath}">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${metadata.image || 'https://www.kheyamind.ai/og-image.png'}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:site_name" content="KheyaMind AI Technologies">
        
        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:url" content="https://www.kheyamind.ai${urlPath}">
        <meta name="twitter:title" content="${title}">
        <meta name="twitter:description" content="${description}">
        <meta name="twitter:image" content="${metadata.image || 'https://www.kheyamind.ai/og-image.png'}">
      `;

      html = html.slice(0, headEndPos) + metaTags + html.slice(headEndPos);
      
      // Log the first 500 characters of the modified HTML for debugging
      console.log(`Modified HTML head (first 500 chars): ${html.substring(0, 500)}...`);
    } else {
      console.log(`No metadata found for path: ${urlPath}`);
      
      // Use default metadata for unknown pages
      const headEndPos = html.indexOf('</head>');
      const defaultMetaTags = `
        <!-- Default Meta Tags for Unknown Page: ${urlPath} -->
        <meta name="description" content="KheyaMind AI crafts intelligent solutions including AI Chatbots, Voice Assistants, ERP Automations, and NLP tools.">
        <meta property="og:title" content="KheyaMind AI Technologies">
        <meta property="og:description" content="KheyaMind AI crafts intelligent solutions including AI Chatbots, Voice Assistants, ERP Automations, and NLP tools.">
        <meta property="og:url" content="https://www.kheyamind.ai${urlPath}">
        <meta property="og:type" content="website">
        <meta name="twitter:title" content="KheyaMind AI Technologies">
        <meta name="twitter:description" content="KheyaMind AI crafts intelligent solutions including AI Chatbots, Voice Assistants, ERP Automations, and NLP tools.">
      `;
      
      html = html.slice(0, headEndPos) + defaultMetaTags + html.slice(headEndPos);
    }

    // Send the modified HTML
    console.log(`Sending modified HTML for crawler at path: ${urlPath}`);
    res.send(html);
  } catch (error) {
    console.error('Error handling social media crawler:', error);
    next(); // Proceed to the next middleware if there's an error
  }
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});