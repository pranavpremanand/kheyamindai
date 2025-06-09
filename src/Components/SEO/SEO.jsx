import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MultipleJsonLd } from './JsonLd';
import { useLocation } from 'react-router-dom';
import { generateCanonicalUrl, isValidCanonicalUrl } from '../../utils/canonicalUrl';
import {
  getOrganizationSchema,
  getWebsiteSchema,
  getHomePageSchema,
  getServicePageSchema,
  getEnhancedServiceSchema,
  getBreadcrumbSchema,
  getBlogPostSchema,
  getFAQSchema,
  getContactPageSchema,
  getAboutPageSchema
} from '../../utils/schemaMarkup';

/**
 * SEO Component
 * 
 * A comprehensive SEO component that handles canonical URLs and structured data.
 * Note: OG tags are now handled directly in the static index.html file.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Page keywords (comma separated)
 * @param {string} props.image - Page image URL (for schema.org)
 * @param {string} props.url - Current page URL
 * @param {string} props.type - Page type (e.g., 'home', 'service', 'blog', 'contact', 'about')
 * @param {Object} props.pageData - Additional data specific to the page type
 * @returns {JSX.Element} - SEO component with meta tags and structured data
 */
const SEO = ({
  type = 'website',
  title,
  description,
  keywords,
  image,
  url,
  pageData = {}
}) => {
  const location = useLocation();

  // Generate canonical URL if not provided or invalid
  const canonicalUrl = (url && isValidCanonicalUrl(url))
    ? url
    : generateCanonicalUrl(location.pathname);

  // Ensure image URL is absolute
  const absoluteImageUrl = image?.startsWith('http')
    ? image
    : `https://www.kheyamind.ai${image || ''}`;

  // Generate schema based on page type
  const schemas = [];

  // Always include organization and website schema with base URL
  const baseUrl = canonicalUrl.split('/').slice(0, 3).join('/');
  schemas.push(getOrganizationSchema(baseUrl));
  schemas.push(getWebsiteSchema(baseUrl));

  // Add page-specific schema
  switch (type) {
    case 'home':
      schemas.push(getHomePageSchema(canonicalUrl));
      break;
    case 'service':
      if (pageData.serviceData) {
        schemas.push(getServicePageSchema(
          canonicalUrl,
          pageData.serviceData.title || title,
          pageData.serviceData.description || pageData.serviceData.desc || description,
          pageData.serviceData.image || absoluteImageUrl
        ));
        schemas.push(getEnhancedServiceSchema(pageData.serviceData, canonicalUrl));
      }
      break;
    case 'blog':
      schemas.push(getBlogPostSchema(
        canonicalUrl,
        pageData.title || title,
        pageData.description || description,
        pageData.image || absoluteImageUrl,
        pageData.datePublished,
        pageData.dateModified,
        pageData.author
      ));
      break;
    case 'contact':
      schemas.push(getContactPageSchema(
        canonicalUrl,
        pageData.email || 'info@kheyamind.ai',
        pageData.phone || '+91-9242049993',
        pageData.address || {
          addressCountry: 'India',
          addressRegion: 'Karnataka',
          addressLocality: 'Bangalore'
        }
      ));
      break;
    case 'about':
      schemas.push(getAboutPageSchema(canonicalUrl));
      break;
    default:
      break;
  }

  // Add breadcrumb schema if available
  if (pageData.breadcrumb) {
    schemas.push(getBreadcrumbSchema(pageData.breadcrumb, canonicalUrl));
  }

  // Add FAQ schema if available
  if (pageData.faqs) {
    schemas.push(getFAQSchema(pageData.faqs));
  }

  // Debug logging for development
  if (process.env.NODE_ENV === 'development') {
    console.log('SEO Component Debug:', {
      type,
      providedUrl: url,
      canonicalUrl,
      title,
      description: description?.substring(0, 100),
      absoluteImageUrl,
      hasCanonicalUrl: !!canonicalUrl,
      canonicalUrlLength: canonicalUrl?.length || 0,
      serviceData: pageData.serviceData?.title || 'No service data'
    });

    console.log('Meta Tags to render:', {
      'og:title': title,
      'og:description': description,
      'og:image': absoluteImageUrl,
      'og:url': canonicalUrl,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': absoluteImageUrl
    });
  }

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type === 'blog' ? 'article' : 'website'} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* <meta property="og:image" content={absoluteImageUrl} /> */}
        {/* <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" /> */}
        <meta property="og:site_name" content="KheyaMind AI Technologies" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {/* <meta name="twitter:image" content={absoluteImageUrl} /> */}

        {/* Additional meta tags for articles/blogs */}
        {type === 'blog' && pageData.datePublished && (
          <meta property="article:published_time" content={pageData.datePublished} />
        )}
        {type === 'blog' && pageData.dateModified && (
          <meta property="article:modified_time" content={pageData.dateModified} />
        )}
        {type === 'blog' && pageData.author && (
          <meta property="article:author" content={pageData.author} />
        )}
      </Helmet>

      {/* JSON-LD Structured Data */}
      <MultipleJsonLd schemas={schemas} />
    </>
  );
};

export default SEO;
