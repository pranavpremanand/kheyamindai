import React from 'react';
import { Link } from 'react-router-dom';
import { blogServiceLinks } from '../utils/internalLinking';

/**
 * Component to automatically add internal links to content
 * Scans text for keywords and converts them to internal links
 */
const InternalLinkHelper = ({ content, className = "" }) => {
  if (!content) return null;

  // Function to add internal links to content
  const addInternalLinks = (text) => {
    let processedText = text;
    const keywords = blogServiceLinks.keywords;
    
    // Sort keywords by length (longest first) to avoid partial matches
    const sortedKeywords = Object.keys(keywords).sort((a, b) => b.length - a.length);
    
    sortedKeywords.forEach(keyword => {
      const linkData = keywords[keyword];
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      
      // Only replace if not already in a link
      const replacement = `<a href="/services/${linkData.slug}" class="text-blue-600 hover:text-blue-800 font-medium underline transition-colors duration-300" title="Learn more about ${linkData.anchorText}">${keyword}</a>`;
      
      processedText = processedText.replace(regex, (match) => {
        // Check if this keyword is already inside an HTML tag
        const beforeMatch = processedText.substring(0, processedText.indexOf(match));
        const openTags = (beforeMatch.match(/<[^>]*>/g) || []).length;
        const closeTags = (beforeMatch.match(/<\/[^>]*>/g) || []).length;
        
        // If we're inside a tag, don't replace
        if (openTags > closeTags) {
          return match;
        }
        
        return replacement;
      });
    });
    
    return processedText;
  };

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ 
        __html: addInternalLinks(content) 
      }}
    />
  );
};

/**
 * Component for manual internal links with proper styling
 */
export const InternalLink = ({ 
  to, 
  children, 
  className = "", 
  title = "",
  external = false 
}) => {
  const defaultClasses = "text-blue-600 hover:text-blue-800 font-medium underline transition-colors duration-300";
  const combinedClasses = `${defaultClasses} ${className}`.trim();

  if (external) {
    return (
      <a 
        href={to}
        className={combinedClasses}
        title={title}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link 
      to={to}
      className={combinedClasses}
      title={title}
    >
      {children}
    </Link>
  );
};

/**
 * Component for service cross-references within content
 */
export const ServiceReference = ({ 
  serviceSlug, 
  anchorText, 
  description = "",
  inline = true 
}) => {
  if (inline) {
    return (
      <InternalLink 
        to={`/services/${serviceSlug}`}
        title={description}
      >
        {anchorText}
      </InternalLink>
    );
  }

  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
      <div className="flex">
        <div className="ml-3">
          <p className="text-sm text-blue-700">
            <strong>Related Service:</strong>{' '}
            <InternalLink to={`/services/${serviceSlug}`}>
              {anchorText}
            </InternalLink>
            {description && (
              <>
                <br />
                <span className="text-blue-600">{description}</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InternalLinkHelper;