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
    console.log(`Testing ${userAgent} on ${path}`);
    
    // First, check if the crawler is detected
    const testResponse = await axios.get('http://localhost:3000/api/test-crawler', {
      headers: {
        'User-Agent': userAgent
      }
    });
    
    console.log('Crawler detection result:', testResponse.data);
    
    if (!testResponse.data.isCrawler) {
      console.log('Warning: Crawler not detected!');
    }
    
    // Then, get the HTML for the path
    const response = await axios.get(`http://localhost:3000${path}`, {
      headers: {
        'User-Agent': userAgent
      }
    });
    
    const html = response.data;
    
    // Extract meta tags
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : 'No title found';
    
    const descriptionMatch = html.match(/<meta name="description" content="(.*?)"/);
    const description = descriptionMatch ? descriptionMatch[1] : 'No description found';
    
    const ogTitleMatch = html.match(/<meta property="og:title" content="(.*?)"/);
    const ogTitle = ogTitleMatch ? ogTitleMatch[1] : 'No OG title found';
    
    const ogDescriptionMatch = html.match(/<meta property="og:description" content="(.*?)"/);
    const ogDescription = ogDescriptionMatch ? ogDescriptionMatch[1] : 'No OG description found';
    
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('OG Title:', ogTitle);
    console.log('OG Description:', ogDescription);
    console.log('-----------------------------------');
    
  } catch (error) {
    console.error('Error testing crawler:', error.message);
  }
}

// Main function to run all tests
async function runTests() {
  console.log('Starting crawler tests...');
  
  for (const userAgent of crawlerUserAgents) {
    for (const path of paths) {
      await testCrawler(userAgent, path);
    }
  }
  
  console.log('All tests completed.');
}

// Run the tests
runTests();