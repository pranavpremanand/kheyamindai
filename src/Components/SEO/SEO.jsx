import React from 'react';
import { Helmet } from 'react-helmet';
import { MultipleJsonLd } from './JsonLd';
import { 
  getOrganizationSchema, 
  getWebsiteSchema,
  getHomePageSchema,
  getServicePageSchema,
  getBlogPostSchema,
  getFAQSchema,
  getContactPageSchema,
  getAboutPageSchema
} from '../../utils/schemaMarkup';

/**
 * Normalizes a URL to create a consistent canonical URL format
 * - Removes query parameters
 * - Ensures consistent trailing slash handling
 * - Handles specific problematic URLs
 */
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

/**
 * SEO Component
 * 
 * A comprehensive SEO component that handles meta tags and structured data.
 * This component should be included in every page of the application.
 * 
 * Note: OG tags are now handled by _document.js for better reliability with Facebook
 * and other social media platforms.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Page keywords (comma separated)
 * @param {string} props.image - Page image URL (for social sharing)
 * @param {string} props.url - Current page URL
 * @param {string} props.type - Page type (e.g., 'home', 'service', 'blog', 'contact', 'about')
 * @param {Object} props.pageData - Additional data specific to the page type
 * @returns {JSX.Element} - SEO component with meta tags and structured data
 */
const SEO = ({ 
  title = "AI Chatbots, Voice Assistants & Automation Solutions | KheyaMind AI Technologies",
  description = "KheyaMind AI crafts intelligent solutions including AI Chatbots, Voice Assistants, ERP Automations, and NLP tools. Empower your enterprise with next-gen AI solutions.",
  keywords = "AI Solutions, Chatbots, Voice AI, ERP Automation, NLP, AI Company India, AI Development, Business Automation",
  image = "/og-image.png", // Updated to use the new OG image
  url,
  type = "website",
  pageData = {}
}) => {
  // Get the current URL if not provided
  const rawUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  
  // Use a hardcoded base URL for SSR to ensure absolute paths always work
  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.protocol}//${window.location.host}`
    : 'https://www.kheyamind.ai';
  
  // Get normalized canonical URL
  const canonicalUrl = getNormalizedCanonicalUrl(rawUrl);
  
  // Ensure absolute image URL with proper format
  const absoluteImageUrl = image.startsWith('http') 
    ? image 
    : `${baseUrl}${image.startsWith('/') ? '' : '/'}${image}`;
  
  // Generate schemas based on page type
  const generateSchemas = () => {
    // Base schemas that should be included on all pages
    const baseSchemas = [
      getOrganizationSchema(baseUrl),
      getWebsiteSchema(baseUrl)
    ];
    
    // Add page-specific schema based on type
    switch (type) {
      case 'home':
        return [...baseSchemas, getHomePageSchema(canonicalUrl)];
      
      case 'service':
        return [
          ...baseSchemas, 
          getServicePageSchema(
            canonicalUrl, 
            pageData.title || title, 
            pageData.description || description, 
            pageData.image || absoluteImageUrl
          )
        ];
      
      case 'blog':
        return [
          ...baseSchemas, 
          getBlogPostSchema(
            canonicalUrl,
            pageData.title || title,
            pageData.description || description,
            pageData.image || absoluteImageUrl,
            pageData.datePublished,
            pageData.dateModified,
            pageData.author || 'KheyaMind AI'
          )
        ];
      
      case 'faq':
        return [
          ...baseSchemas,
          getFAQSchema(pageData.faqs || [])
        ];
      
      case 'contact':
        return [
          ...baseSchemas,
          getContactPageSchema(
            canonicalUrl,
            pageData.email || 'contact@kheyamind.ai',
            pageData.phone || '+91-9999999999',
            pageData.address || {
              streetAddress: '123 AI Street',
              addressLocality: 'Tech City',
              addressRegion: 'IN',
              postalCode: '123456',
              addressCountry: 'India'
            }
          )
        ];
      
      case 'about':
        return [
          ...baseSchemas,
          getAboutPageSchema(canonicalUrl)
        ];
      
      default:
        return baseSchemas;
    }
  };

  const schemas = generateSchemas();

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        
        {/* OG tags are now handled by _document.js for better reliability */}
        {/* Open Graph / Facebook tags removed to avoid duplication */}
        {/* 
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={absoluteImageUrl} />
        <meta property="og:image:secure_url" content={absoluteImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="KheyaMind AI Technologies logo" />
        <meta property="og:site_name" content="KheyaMind AI Technologies" />
        */}
        
        {/* Twitter tags removed to avoid duplication */}
        {/*
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={absoluteImageUrl} />
        */}
        
        {/* Canonical URL - Using normalized URL */}
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      
      {/* JSON-LD Structured Data */}
      <MultipleJsonLd schemas={schemas} />
    </>
  );
};

export default SEO;
