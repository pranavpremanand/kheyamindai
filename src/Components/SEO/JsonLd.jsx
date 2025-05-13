import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * JsonLd Component
 * 
 * A reusable component that injects JSON-LD structured data into the document head
 * using React Helmet. This helps search engines understand the content of the page
 * and can enable rich results in search engine results pages.
 * 
 * @param {Object} schema - The JSON-LD schema object to be injected
 * @returns {JSX.Element} - React Helmet component with JSON-LD script
 */
const JsonLd = ({ schema }) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

/**
 * MultipleJsonLd Component
 * 
 * A component that injects multiple JSON-LD schema objects into the document head.
 * Useful when a page needs multiple schema types (e.g., Organization + WebSite + WebPage).
 * 
 * @param {Array} schemas - Array of JSON-LD schema objects to be injected
 * @returns {JSX.Element} - React Helmet component with multiple JSON-LD scripts
 */
export const MultipleJsonLd = ({ schemas }) => {
  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default JsonLd;