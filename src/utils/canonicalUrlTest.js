/**
 * Test utility to verify canonical URL generation
 * This can be used to debug canonical URL issues
 */

const testCanonicalUrls = () => {
  const testUrls = [
    'https://www.kheyamind.ai/services/ai-chatbots',
    'https://www.kheyamind.ai/services/voice-ai-agents',
    'https://www.kheyamind.ai/services/ai-powered-erp-tools',
    'https://www.kheyamind.ai/services/cloud-devops-ai',
    'https://www.kheyamind.ai/services/ai-interface-design',
    'https://www.kheyamind.ai/services/mobile-app-development'
  ];

  console.log('Testing Canonical URLs:');
  testUrls.forEach(url => {
    console.log(`Original: ${url}`);
    console.log(`Normalized: ${getNormalizedCanonicalUrl(url)}`);
    console.log('---');
  });
};

const getNormalizedCanonicalUrl = (url) => {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url);
    
    // Remove query parameters
    urlObj.search = '';
    
    // Get the path and normalize trailing slash
    let path = urlObj.pathname;
    if (path.endsWith('/') && path !== '/') {
      path = path.slice(0, -1);
    }
    
    // Handle specific problem URLs from Search Console
    if (path.includes('/services/cloud-devops.ai')) {
      path = '/services/cloud-devops-ai';
    } else if (path.includes('/services/voice.ai-agents')) {
      path = '/services/voice-ai-agents';
    }
    
    // Reassemble the URL with normalized path
    urlObj.pathname = path;
    
    return urlObj.toString();
  } catch (e) {
    console.error('Error normalizing canonical URL:', e);
    return url;
  }
};

export { testCanonicalUrls, getNormalizedCanonicalUrl };