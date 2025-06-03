import React from 'react';
import { Helmet } from 'react-helmet-async';

const HelmetDebug = ({ title, description, image, url }) => {
  console.log('HelmetDebug props:', { title, description, image, url });
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default HelmetDebug;