import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * Test component to verify Helmet functionality
 * This can be temporarily added to any page to test if Helmet is working
 */
const HelmetTest = ({ testUrl = "https://www.kheyamind.ai/test" }) => {
  console.log('HelmetTest rendering with URL:', testUrl);
  
  return (
    <Helmet>
      <link rel="canonical" href={testUrl} />
      <meta name="test-meta" content="helmet-working" />
    </Helmet>
  );
};

export default HelmetTest;