import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { generateCanonicalUrl } from '../../utils/canonicalUrl';

/**
 * Global Canonical URL Component
 * This component ensures every page has a canonical URL
 * Place this in your main App component or layout
 */
const GlobalCanonical = () => {
  const location = useLocation();
  const canonicalUrl = generateCanonicalUrl(location.pathname);

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default GlobalCanonical;