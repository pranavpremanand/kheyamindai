/**
 * Test script to verify sitemap generation and blog URL inclusion
 */
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { generateSitemap } = require('./generateSitemap');

// API base URL
const API_BASE_URL = 'https://kheyamind-blogplatform-backend.vercel.app/api';

/**
 * Directly fetch blogs from API to compare with sitemap
 */
const fetchBlogsDirectly = async () => {
  try {
    console.log('Directly fetching blogs from API...');
    const response = await axios.get(`${API_BASE_URL}/blogs/published`);
    return response.data.blogs || [];
  } catch (error) {
    console.error('Error fetching blogs directly:', error.message);
    return [];
  }
};

/**
 * Parse sitemap XML to extract URLs
 */
const extractUrlsFromSitemap = (sitemapXml) => {
  const urls = [];
  const matches = sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g);
  
  for (const match of matches) {
    urls.push(match[1]);
  }
  
  return urls;
};

/**
 * Main test function
 */
const testSitemapGeneration = async () => {
  console.log('🧪 Testing sitemap generation...');
  
  try {
    // 1. Fetch blogs directly from API
    const blogs = await fetchBlogsDirectly();
    console.log(`📊 Found ${blogs.length} blogs directly from API`);
    
    if (blogs.length > 0) {
      console.log('Sample blog data:');
      console.log(JSON.stringify(blogs[0], null, 2));
    }
    
    // 2. Generate sitemap
    console.log('\n🔄 Generating sitemap...');
    await generateSitemap();
    
    // 3. Read generated sitemap
    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
      throw new Error('Sitemap file not found after generation');
    }
    
    const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
    console.log(`📄 Sitemap size: ${sitemapXml.length} bytes`);
    
    // 4. Extract URLs from sitemap
    const sitemapUrls = extractUrlsFromSitemap(sitemapXml);
    console.log(`🔍 Found ${sitemapUrls.length} URLs in sitemap`);
    
    // 5. Check if all blog URLs are included
    const blogUrlsInSitemap = sitemapUrls.filter(url => url.includes('/blogs/') && !url.endsWith('/blogs'));
    console.log(`📝 Found ${blogUrlsInSitemap.length} blog URLs in sitemap`);
    
    // 6. Compare with direct API results
    const expectedBlogUrls = blogs.map(blog => `https://www.kheyamind.ai/blogs/${blog.slug}`);
    
    console.log('\n🔍 Checking if all blog URLs are included in sitemap:');
    
    let allBlogsIncluded = true;
    for (const expectedUrl of expectedBlogUrls) {
      const isIncluded = sitemapUrls.includes(expectedUrl);
      console.log(`${isIncluded ? '✅' : '❌'} ${expectedUrl}`);
      
      if (!isIncluded) {
        allBlogsIncluded = false;
      }
    }
    
    // 7. Final result
    if (allBlogsIncluded) {
      console.log('\n✅ SUCCESS: All blog URLs are included in the sitemap');
    } else {
      console.log('\n❌ FAILURE: Some blog URLs are missing from the sitemap');
      
      // Show missing URLs
      const missingUrls = expectedBlogUrls.filter(url => !sitemapUrls.includes(url));
      console.log('\nMissing URLs:');
      missingUrls.forEach(url => console.log(`- ${url}`));
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

// Run the test
testSitemapGeneration()
  .then(() => {
    console.log('\n🏁 Sitemap test completed');
  })
  .catch(error => {
    console.error('💥 Unexpected error during test:', error);
  });