/**
 * Test script to simulate social media crawler requests
 * 
 * This script helps test if the server correctly handles social media crawler requests
 * by making requests with different user agents and checking the response HTML.
 */

const axios = require('axios');
const cheerio = require('cheerio');

// Base URL to test (change to your local development server)
const BASE_URL = 'http://localhost:3000';

// Pages to test
const PAGES = [
  '/',
  '/about-us',
  '/services',
  '/services/ai-chatbots',
  '/blogs'
];

// Social media crawler user agents
const CRAWLER_USER_AGENTS = {
  facebook: 'facebookexternalhit/1.1',
  twitter: 'Twitterbot/1.0',
  linkedin: 'LinkedInBot/1.0',
  whatsapp: 'WhatsApp/2.21.12.21'
};

// Regular browser user agent
const BROWSER_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

/**
 * Test a specific page with a specific user agent
 */
async function testPage(page, userAgentName, userAgent) {
  try {
    console.log(`Testing ${page} with ${userAgentName}...`);
    
    const response = await axios.get(`${BASE_URL}${page}`, {
      headers: {
        'User-Agent': userAgent
      }
    });
    
    const $ = cheerio.load(response.data);
    
    // Extract meta tags
    const title = $('title').text();
    const ogTitle = $('meta[property="og:title"]').attr('content');
    const ogDescription = $('meta[property="og:description"]').attr('content');
    const ogImage = $('meta[property="og:image"]').attr('content');
    
    console.log(`  Title: ${title}`);
    console.log(`  OG Title: ${ogTitle || 'Not found'}`);
    console.log(`  OG Description: ${ogDescription || 'Not found'}`);
    console.log(`  OG Image: ${ogImage || 'Not found'}`);
    console.log('-----------------------------------');
    
    return {
      title,
      ogTitle,
      ogDescription,
      ogImage,
      success: !!ogTitle && !!ogDescription && !!ogImage
    };
  } catch (error) {
    console.error(`Error testing ${page} with ${userAgentName}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Run tests for all pages with different user agents
 */
async function runTests() {
  console.log('Starting social crawler tests...\n');
  
  const results = {
    success: 0,
    failure: 0,
    total: 0
  };
  
  // Test with browser user agent first (baseline)
  console.log('=== TESTING WITH REGULAR BROWSER USER AGENT ===\n');
  for (const page of PAGES) {
    await testPage(page, 'Browser', BROWSER_USER_AGENT);
    results.total++;
  }
  
  // Test with social crawler user agents
  console.log('\n=== TESTING WITH SOCIAL MEDIA CRAWLER USER AGENTS ===\n');
  for (const [crawlerName, userAgent] of Object.entries(CRAWLER_USER_AGENTS)) {
    console.log(`\n--- ${crawlerName.toUpperCase()} CRAWLER ---\n`);
    
    for (const page of PAGES) {
      const result = await testPage(page, crawlerName, userAgent);
      results.total++;
      
      if (result.success) {
        results.success++;
      } else {
        results.failure++;
      }
    }
  }
  
  // Print summary
  console.log('\n=== TEST SUMMARY ===');
  console.log(`Total tests: ${results.total}`);
  console.log(`Successful: ${results.success}`);
  console.log(`Failed: ${results.failure}`);
  
  if (results.failure > 0) {
    console.log('\nSome tests failed. Check the output above for details.');
  } else {
    console.log('\nAll tests passed! Your server is correctly handling social media crawlers.');
  }
}

// Run the tests
runTests().catch(error => {
  console.error('Error running tests:', error);
});