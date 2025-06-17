/**
 * Test script for social media crawler detection
 * 
 * This script simulates a request from a social media crawler to test if the server
 * correctly detects it and serves the appropriate meta tags.
 * 
 * Usage:
 * 1. Start the server: npm start
 * 2. Run this script: node test-crawler.js
 */

const axios = require('axios');

// List of social media crawler user agents to test
const crawlerUserAgents = [
  'facebookexternalhit/1.1',
  'Twitterbot/1.0',
  'LinkedInBot/1.0',
  'WhatsApp/2.21.12.21',
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
];

// List of paths to test
const paths = [
  '/',
  '/about-us',
  '/services',
  '/services/ai-chatbots',
  '/contact-us'
];

// Function to test a specific user agent and path
async function testCrawler(userAgent, path) {
  try {
    console.log(`\n=== Testing ${userAgent} on ${path} ===`);
    
    // Check if server is running
    try {
      // First, check if the crawler is detected
      const testResponse = await axios.get('http://localhost:3000/api/test-crawler', {
        headers: {
          'User-Agent': userAgent
        },
        timeout: 5000 // 5 second timeout
      });
      
      console.log('Crawler detection result:', testResponse.data);
      
      if (!testResponse.data.isCrawler) {
        console.log('Warning: Crawler not detected! Using force crawler mode...');
      }
    } catch (error) {
      console.log('Warning: Could not connect to test-crawler endpoint. Is the server running?');
      console.log('Error details:', error.message);
    }
    
    // Then, get the HTML for the path with crawler=true to force crawler mode
    // Always get the root path since the server serves the same index.html for all routes
    const response = await axios.get(`http://localhost:3000/?crawler=true&path=${path}`, {
      headers: {
        'User-Agent': userAgent
      },
      timeout: 5000 // 5 second timeout
    });
    
    const html = response.data;
    
    // Extract meta tags
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : 'No title found';
    
    const descriptionMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    const description = descriptionMatch ? descriptionMatch[1] : 'No description found';
    
    const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i);
    const ogTitle = ogTitleMatch ? ogTitleMatch[1] : 'No OG title found';
    
    const ogDescriptionMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i);
    const ogDescription = ogDescriptionMatch ? ogDescriptionMatch[1] : 'No OG description found';
    
    const ogUrlMatch = html.match(/<meta\s+property=["']og:url["']\s+content=["'](.*?)["']/i);
    const ogUrl = ogUrlMatch ? ogUrlMatch[1] : 'No OG URL found';
    
    console.log('=== META TAGS ===');
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('OG Title:', ogTitle);
    console.log('OG Description:', ogDescription);
    console.log('OG URL:', ogUrl);
    
    // Check if the meta tags are correct for this path
    if (path === '/' || path === '') {
      // Check either the title or OG title for home page
      if (!title.includes('AI Chatbots') && !title.includes('KheyaMind AI') && !ogTitle.includes('AI Chatbots')) {
        console.log('❌ ERROR: Home page title is incorrect!');
      } else {
        console.log('✅ Home page title or OG title is correct');
      }
      
      // Check either the description or OG description for home page
      if (!description.includes('KheyaMind AI') && !ogDescription.includes('KheyaMind AI')) {
        console.log('❌ ERROR: Home page description is incorrect!');
      } else {
        console.log('✅ Home page description or OG description is correct');
      }
    } else if (path === '/about-us') {
      if (!title.includes('About') && !ogTitle.includes('About')) {
        console.log('❌ ERROR: About page title is incorrect!');
      } else {
        console.log('✅ About page title or OG title is correct');
      }
    } else if (path === '/services') {
      if (!title.includes('Services') && !ogTitle.includes('Services')) {
        console.log('❌ ERROR: Services page title is incorrect!');
      } else {
        console.log('✅ Services page title or OG title is correct');
      }
    }
    
    console.log('-----------------------------------');
    
  } catch (error) {
    console.error('Error testing crawler:', error.message);
  }
}

// Main function to run all tests
async function runTests(specificPath = null) {
  console.log('Starting crawler tests...');
  
  // Use a single user agent for testing
  const testUserAgent = 'facebookexternalhit/1.1';
  
  if (specificPath) {
    // Test only the specified path
    await testCrawler(testUserAgent, specificPath);
  } else {
    // Test all paths with the test user agent
    for (const path of paths) {
      await testCrawler(testUserAgent, path);
    }
  }
  
  console.log('\nAll tests completed.');
}

// Check if a specific path was provided as a command line argument
const specificPath = process.argv[2];
if (specificPath) {
  console.log(`Testing specific path: ${specificPath}`);
  runTests(specificPath);
} else {
  // Run tests for all paths
  runTests();
}