const axios = require('axios');

// API base URL
const baseUrl = "https://kheyamind-blogplatform-backend.vercel.app/api";

export default async function handler(req, res) {
  try {
    console.log('🔍 VERCEL PAGES API: SITEMAP DIAGNOSTIC TEST RUNNING...');
    
    // Generate a unique cache-busting parameter
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const cacheBuster = `_t=${timestamp}&_r=${random}`;
    
    console.log(`🔄 Fetching blogs from API with cache buster: ${cacheBuster}`);
    
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
    
    // Return diagnostic information
    res.status(200).json({
      timestamp: new Date().toISOString(),
      apiStatus: response.status,
      blogCount: response.data && response.data.blogs ? response.data.blogs.length : 0,
      blogSlugs: response.data && response.data.blogs ? response.data.blogs.map(blog => blog.slug) : [],
      headers: req.headers,
      serverInfo: {
        nodeVersion: process.version,
        platform: process.platform,
        memory: process.memoryUsage ? process.memoryUsage() : 'Not available in serverless',
        uptime: process.uptime ? process.uptime() : 'Not available in serverless'
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
}