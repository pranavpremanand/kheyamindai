/**
 * SEO Fix Validation Script
 * Run this to validate all canonical tag fixes and page uniqueness
 */

const { validateCanonicalUrls, validatePageSEO } = require('./src/utils/seoValidation');
const { services } = require('./src/data/constant');

console.log('🔍 Validating SEO Fixes for Google Indexing...\n');

// 1. Validate canonical URLs
console.log('1️⃣ Checking Canonical URLs...');
const canonicalResults = validateCanonicalUrls();

console.log(`✅ Valid URLs: ${canonicalResults.summary.validUrls}`);
console.log(`❌ Invalid URLs: ${canonicalResults.summary.invalidUrls}`);
console.log(`🔄 Duplicate URLs: ${canonicalResults.summary.duplicateUrls}`);

if (canonicalResults.invalid.length > 0) {
  console.log('\n❌ Invalid URLs found:');
  canonicalResults.invalid.forEach(item => {
    console.log(`   - ${item.page}: ${item.error}`);
  });
}

if (canonicalResults.duplicates.length > 0) {
  console.log('\n🔄 Duplicate URLs found:');
  canonicalResults.duplicates.forEach(item => {
    console.log(`   - ${item.url} (appears ${item.count} times)`);
  });
}

// 2. Validate top 10 problematic pages
console.log('\n2️⃣ Validating Top 10 Pages...');
const problematicPages = [
  // Service pages (first 7)
  ...services.slice(0, 7).map(service => ({
    name: service.title,
    title: service.seo?.title,
    description: service.seo?.description,
    canonicalUrl: service.seo?.canonicalUrl,
    keywords: service.seo?.keywords
  })),
  // Static pages (3)
  {
    name: 'Contact Us',
    title: 'Contact KheyaMind AI | AI Consulting Services & Enterprise Solutions',
    description: 'Contact KheyaMind AI for expert AI consulting services, enterprise AI solutions, and business automation. Get free consultation for AI chatbots, voice AI, and custom AI development projects.',
    canonicalUrl: 'https://www.kheyamind.ai/contact-us',
    keywords: 'AI consulting contact, enterprise AI solutions inquiry'
  },
  {
    name: 'About Us',
    title: 'About KheyaMind AI | Leading AI Consulting & Enterprise Solutions Company',
    description: 'KheyaMind AI is a boutique AI consulting company specializing in enterprise AI solutions, business automation, and AI implementation services.',
    canonicalUrl: 'https://www.kheyamind.ai/about-us',
    keywords: 'AI consulting company, enterprise AI solutions'
  },
  {
    name: 'AI Enterprise Solutions',
    title: 'Enterprise AI Solutions | Custom AI Development | ERP Integration | KheyaMind AI',
    description: 'Transform your enterprise with custom AI solutions. AI-powered ERP systems, NLP solutions, cloud infrastructure, and intelligent automation.',
    canonicalUrl: 'https://www.kheyamind.ai/ai-enterprise-solutions',
    keywords: 'enterprise AI, custom AI development, AI ERP systems'
  }
];

let validPages = 0;
let totalIssues = 0;

problematicPages.forEach((page, index) => {
  console.log(`\nPage ${index + 1}: ${page.name}`);
  const validation = validatePageSEO(page);
  
  if (validation.isValid) {
    console.log(`   ✅ Valid (Score: ${validation.score}/100)`);
    validPages++;
  } else {
    console.log(`   ❌ Issues found (Score: ${validation.score}/100)`);
    validation.issues.forEach(issue => {
      console.log(`      - ${issue.type.toUpperCase()}: ${issue.message}`);
      totalIssues++;
    });
  }
});

// 3. Final Summary
console.log('\n📊 SUMMARY:');
console.log(`Total pages validated: ${problematicPages.length}`);
console.log(`Pages ready for indexing: ${validPages}/${problematicPages.length}`);
console.log(`Total issues to fix: ${totalIssues}`);

if (validPages === problematicPages.length && canonicalResults.summary.invalidUrls === 0) {
  console.log('\n🎉 ALL FIXES COMPLETE! Pages ready for Google indexing.');
  console.log('\nNext steps:');
  console.log('1. Deploy changes to production');
  console.log('2. Submit sitemap to Google Search Console');
  console.log('3. Request re-indexing for the 10 problematic pages');
  console.log('4. Monitor indexing status in 3-7 days');
} else {
  console.log('\n⚠️  Some issues remain. Please fix before requesting re-indexing.');
}

console.log('\n🔗 Key URLs to monitor:');
problematicPages.forEach((page, index) => {
  if (page.canonicalUrl) {
    console.log(`${index + 1}. ${page.canonicalUrl}`);
  }
});