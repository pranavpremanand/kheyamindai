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
 * SEO Component
 * 
 * A comprehensive SEO component that handles both meta tags and structured data.
 * This component should be included in every page of the application.
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
  image = "/logo.png",
  url,
  type = "website",
  pageData = {}
}) => {
  // Get the current URL if not provided
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';
  
  // Generate schemas based on page type
  const generateSchemas = () => {
    // Base schemas that should be included on all pages
    const baseSchemas = [
      getOrganizationSchema(baseUrl),
      getWebsiteSchema(baseUrl)
    ];
    
    // Add page-specific schema
    switch (type) {
      case 'home':
        return [...baseSchemas, getHomePageSchema(currentUrl)];
      
      case 'service':
        return [
          ...baseSchemas, 
          getServicePageSchema(
            currentUrl, 
            pageData.title || title, 
            pageData.description || description, 
            pageData.image || `${baseUrl}${image}`
          )
        ];
      
      case 'blog':
        return [
          ...baseSchemas, 
          getBlogPostSchema(
            currentUrl,
            pageData.title || title,
            pageData.description || description,
            pageData.image || `${baseUrl}${image}`,
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
            currentUrl,
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
          getAboutPageSchema(currentUrl)
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
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${baseUrl}${image}`} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={currentUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={`${baseUrl}${image}`} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
      </Helmet>
      
      {/* JSON-LD Structured Data */}
      <MultipleJsonLd schemas={schemas} />
    </>
  );
};

export default SEO;