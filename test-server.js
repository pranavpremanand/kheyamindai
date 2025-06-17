/**
 * Server Status Checker
 * 
 * This script checks if the server is running and tests the meta tags endpoint.
 */

const axios = require('axios');

async function checkServer() {
  console.log('Checking if server is running...');
  
  try {
    const response = await axios.get('http://localhost:3000', {
      timeout: 5000 // 5 second timeout
    });
    
    console.log('✅ Server is running!');
    return true;
  } catch (error) {
    console.error('❌ Server is not running or not accessible.');
    console.error('Error details:', error.message);
    
    console.log('\nTo start the server, run:');
    console.log('npm start');
    
    return false;
  }
}

async function testMetaTags() {
  console.log('\nTesting meta tags endpoint...');
  
  try {
    const response = await axios.get('http://localhost:3000/api/test-crawler', {
      headers: {
        'User-Agent': 'facebookexternalhit/1.1'
      },
      timeout: 5000 // 5 second timeout
    });
    
    console.log('✅ Meta tags endpoint is working!');
    console.log('Response:', response.data);
    
    if (response.data.isCrawler) {
      console.log('✅ Crawler detection is working correctly!');
    } else {
      console.log('❌ Crawler detection is not working correctly.');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Meta tags endpoint is not working or not accessible.');
    console.error('Error details:', error.message);
    return false;
  }
}

async function main() {
  const serverRunning = await checkServer();
  
  if (serverRunning) {
    await testMetaTags();
    
    console.log('\nTo test meta tags for specific pages, run:');
    console.log('node test-crawler.js /');
    console.log('node test-crawler.js /about-us');
    console.log('node test-crawler.js /services');
    
    console.log('\nOr visit:');
    console.log('http://localhost:3000/meta-debugger.html');
  }
}

main();