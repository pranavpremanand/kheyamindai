/**
 * SEO Validation Utilities for Canonical URLs and Indexing
 */

import { services } from '../data/constant';
import { generateCanonicalUrl } from './canonicalUrl';

/**
 * Validate all canonical URLs for consistency
 * @returns {Object} Validation results
 */
export const validateCanonicalUrls = () => {
  const results = {
    valid: [],
    invalid: [],
    duplicates: [],
    summary: {}
  };

  const allUrls = new Set();
  const urlCounts = {};

  // Static pages
  const staticPages = [
    { path: '/', name: 'Home' },
    { path: '/about-us', name: 'About Us' },
    { path: '/services', name: 'Services' },
    { path: '/blogs', name: 'Blogs' },
    { path: '/contact-us', name: 'Contact Us' },
    { path: '/ai-enterprise-solutions', name: 'AI Enterprise Solutions' }
  ];

  // Validate static pages
  staticPages.forEach(page => {
    const canonicalUrl = generateCanonicalUrl(page.path);
    const key = `${page.name} (${page.path})`;
    
    if (canonicalUrl && canonicalUrl.startsWith('https://www.kheyamind.ai')) {
      results.valid.push({ page: key, url: canonicalUrl });
      allUrls.add(canonicalUrl);
      urlCounts[canonicalUrl] = (urlCounts[canonicalUrl] || 0) + 1;
    } else {
      results.invalid.push({ page: key, url: canonicalUrl, error: 'Invalid canonical URL format' });
    }
  });

  // Validate service pages
  services.forEach(service => {
    const path = `/services/${service.slug}`;
    const canonicalUrl = service.seo?.canonicalUrl || generateCanonicalUrl(path);
    const key = `${service.title} (${path})`;
    
    if (canonicalUrl && canonicalUrl.startsWith('https://www.kheyamind.ai')) {
      results.valid.push({ page: key, url: canonicalUrl });
      allUrls.add(canonicalUrl);
      urlCounts[canonicalUrl] = (urlCounts[canonicalUrl] || 0) + 1;
    } else {
      results.invalid.push({ page: key, url: canonicalUrl, error: 'Invalid canonical URL format' });
    }
  });

  // Check for duplicates
  Object.entries(urlCounts).forEach(([url, count]) => {
    if (count > 1) {
      results.duplicates.push({ url, count });
    }
  });

  // Generate summary
  results.summary = {
    totalPages: staticPages.length + services.length,
    validUrls: results.valid.length,
    invalidUrls: results.invalid.length,
    duplicateUrls: results.duplicates.length,
    uniqueUrls: allUrls.size
  };

  return results;
};

/**
 * Generate optimized sitemap with proper canonical URLs
 * @returns {Array} Array of sitemap entries
 */
export const generateOptimizedSitemapEntries = () => {
  const entries = [];
  const now = new Date().toISOString();

  // Static pages with priorities
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/about-us', priority: '0.8', changefreq: 'monthly' },
    { path: '/services', priority: '0.9', changefreq: 'weekly' },
    { path: '/blogs', priority: '0.8', changefreq: 'daily' },
    { path: '/contact-us', priority: '0.7', changefreq: 'monthly' },
    { path: '/ai-enterprise-solutions', priority: '0.8', changefreq: 'monthly' },
    { path: '/chatbots-voice-ai', priority: '0.8', changefreq: 'monthly' },
    { path: '/real-estate-ai-solutions', priority: '0.8', changefreq: 'monthly' }
  ];

  staticPages.forEach(page => {
    entries.push({
      url: page.path,
      lastmod: now,
      changefreq: page.changefreq,
      priority: page.priority,
      canonical: generateCanonicalUrl(page.path)
    });
  });

  // Service pages
  services.forEach(service => {
    const path = `/services/${service.slug}`;
    entries.push({
      url: path,
      lastmod: now,
      changefreq: 'monthly',
      priority: '0.8',
      canonical: service.seo?.canonicalUrl || generateCanonicalUrl(path)
    });
  });

  return entries;
};

/**
 * Validate page meta tags and structure
 * @param {Object} pageData - Page data to validate
 * @returns {Object} Validation results
 */
export const validatePageSEO = (pageData) => {
  const issues = [];
  
  // Title validation
  if (!pageData.title) {
    issues.push({ type: 'error', field: 'title', message: 'Missing page title' });
  } else if (pageData.title.length > 60) {
    issues.push({ type: 'warning', field: 'title', message: 'Title too long (>60 chars)' });
  } else if (pageData.title.length < 30) {
    issues.push({ type: 'warning', field: 'title', message: 'Title too short (<30 chars)' });
  }

  // Description validation
  if (!pageData.description) {
    issues.push({ type: 'error', field: 'description', message: 'Missing meta description' });
  } else if (pageData.description.length > 160) {
    issues.push({ type: 'warning', field: 'description', message: 'Description too long (>160 chars)' });
  } else if (pageData.description.length < 120) {
    issues.push({ type: 'warning', field: 'description', message: 'Description too short (<120 chars)' });
  }

  // Canonical URL validation
  if (!pageData.canonicalUrl) {
    issues.push({ type: 'error', field: 'canonical', message: 'Missing canonical URL' });
  } else if (!pageData.canonicalUrl.startsWith('https://www.kheyamind.ai')) {
    issues.push({ type: 'error', field: 'canonical', message: 'Invalid canonical URL domain' });
  }

  // Keywords validation
  if (!pageData.keywords) {
    issues.push({ type: 'warning', field: 'keywords', message: 'Missing keywords' });
  }

  return {
    isValid: issues.filter(i => i.type === 'error').length === 0,
    issues,
    score: Math.max(0, 100 - (issues.length * 10))
  };
};

export default {
  validateCanonicalUrls,
  generateOptimizedSitemapEntries,
  validatePageSEO
};