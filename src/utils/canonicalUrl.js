/**
 * Utility functions for handling canonical URLs
 */

/**
 * Generates a canonical URL for any given path
 * @param {string} path - The current path (from React Router)
 * @returns {string} - The full canonical URL
 */
export const generateCanonicalUrl = (path) => {
  const BASE_URL = 'https://www.kheyamind.ai';

  // Clean and normalize the path
  let normalizedPath = path || '/';
  
  // Remove query parameters and hash
  if (normalizedPath.includes('?')) {
    normalizedPath = normalizedPath.split('?')[0];
  }
  if (normalizedPath.includes('#')) {
    normalizedPath = normalizedPath.split('#')[0];
  }
  
  // Remove trailing slash except for root
  if (normalizedPath.endsWith('/') && normalizedPath !== '/') {
    normalizedPath = normalizedPath.slice(0, -1);
  }
  
  // Handle specific problem URLs from Search Console
  if (normalizedPath.includes('/services/cloud-devops.ai')) {
    normalizedPath = '/services/cloud-devops-ai';
  } else if (normalizedPath.includes('/services/voice.ai-agents')) {
  }
}

/**
 * Validates if a URL is a valid canonical URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export const isValidCanonicalUrl = (url) => {
    try {
        const urlObj = new URL(url);
        return urlObj.protocol === 'https:' &&
            urlObj.hostname === 'www.kheyamind.ai' &&
            !urlObj.search && // No query parameters
            !urlObj.hash;    // No hash
    } catch {
        return false;
    }
}; 