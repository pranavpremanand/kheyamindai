import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { generateCanonicalUrl } from '../../utils/canonicalUrl';

/**
 * Standalone Canonical Link Component
 * Use this component when you only need to add a canonical URL without other SEO meta tags
 */
const CanonicalLink = ({ url }) => {
  const location = useLocation();
  
  // Generate canonical URL if not provided
  const canonicalUrl = url || generateCanonicalUrl(location.pathname);

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default CanonicalLink;