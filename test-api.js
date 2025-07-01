const axios = require('axios');

// API base URL
const baseUrl = "https://kheyamind-blogplatform-backend.vercel.app/api";

async function testAPI() {
  try {
    console.log('🔍 TESTING API DIRECTLY...');
    
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
      // Prevent axios from caching
      params: {
        _nocache: timestamp
      }
    });
    
    console.log(`✅ API Response status: ${response.status}`);
    
    if (!response.data || !response.data.blogs || !Array.isArray(response.data.blogs)) {
      console.error('❌ API response missing blogs array:', JSON.stringify(response.data));
      return;
    }
    
    console.log(`📊 Found ${response.data.blogs.length} blogs in API response`);
    
    // Check if the test blog is in the response
    const testBlog = response.data.blogs.find(blog => blog.slug === 'test');
    if (testBlog) {
      console.log('✅ TEST BLOG FOUND IN API RESPONSE:');
      console.log(JSON.stringify(testBlog, null, 2));
    } else {
      console.log('❌ TEST BLOG NOT FOUND IN API RESPONSE');
      console.log('Available blog slugs:');
      response.data.blogs.forEach(blog => {
        console.log(`- ${blog.slug} (${blog.title || 'No title'})`);
      });
    }
    
    // Generate XML for the test blog
    if (testBlog) {
      const SITE_URL = 'https://www.kheyamind.ai';
      const testBlogXML = `  <url>
    <loc>${SITE_URL}/blogs/${testBlog.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
      
      console.log('📄 XML that should be in sitemap:');
      console.log(testBlogXML);
    }
    
  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    if (error.response) {
      console.error('API error details:', {
        status: error.response.status,
        data: JSON.stringify(error.response.data)
      });
    } else if (error.request) {
      console.error('❌ No response received from API:', error.request);
    } else {
      console.error('❌ Error setting up request:', error.message);
    }
  }
}

// Run the test
testAPI();