// Test script to verify the sitemap fix
const { generateSitemap } = require('./src/utils/serverSitemapGenerator');

async function testSitemapFix() {
  console.log('🧪 Testing sitemap fix...\n');
  
  try {
    // Test 1: Generate sitemap
    console.log('Test 1: Generating sitemap...');
    const startTime = Date.now();
    const xml = await generateSitemap();
    const endTime = Date.now();
    
    console.log(`✅ Sitemap generated in ${endTime - startTime}ms`);
    console.log(`📊 XML length: ${xml.length} characters`);
    
    // Test 2: Validate XML structure
    console.log('\nTest 2: Validating XML structure...');
    if (xml.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
      console.log('✅ XML declaration found');
    } else {
      throw new Error('Missing XML declaration');
    }
    
    if (xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
      console.log('✅ Sitemap namespace found');
    } else {
      throw new Error('Missing sitemap namespace');
    }
    
    // Test 3: Count URLs
    const urlCount = (xml.match(/<url>/g) || []).length;
    console.log(`✅ Found ${urlCount} URLs in sitemap`);
    
    if (urlCount < 15) {
      throw new Error(`Expected at least 15 URLs, found ${urlCount}`);
    }
    
    // Test 4: Check for required pages
    const requiredPages = [
      'https://www.kheyamind.ai',
      'https://www.kheyamind.ai/about-us',
      'https://www.kheyamind.ai/services',
      'https://www.kheyamind.ai/blogs',
      'https://www.kheyamind.ai/contact-us'
    ];
    
    console.log('\nTest 4: Checking required pages...');
    for (const page of requiredPages) {
      if (xml.includes(page)) {
        console.log(`✅ Found: ${page}`);
      } else {
        throw new Error(`Missing required page: ${page}`);
      }
    }
    
    // Test 5: Check for blog pages
    console.log('\nTest 5: Checking for blog pages...');
    const blogUrlPattern = /https:\/\/www\.kheyamind\.ai\/blogs\/[a-z0-9-]+/g;
    const blogUrls = xml.match(blogUrlPattern) || [];
    console.log(`✅ Found ${blogUrls.length} blog URLs`);
    
    if (blogUrls.length > 0) {
      console.log('📝 Sample blog URLs:');
      blogUrls.slice(0, 3).forEach(url => console.log(`   - ${url}`));
    }
    
    console.log('\n🎉 All tests passed! The sitemap fix is working correctly.');
    console.log('\n📋 Summary:');
    console.log(`   - Total URLs: ${urlCount}`);
    console.log(`   - Blog URLs: ${blogUrls.length}`);
    console.log(`   - Generation time: ${endTime - startTime}ms`);
    console.log(`   - XML size: ${xml.length} characters`);
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

testSitemapFix();