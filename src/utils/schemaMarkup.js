/**
 * Schema.org JSON-LD structured data utility functions
 * These functions generate structured data for Google rich results
 */

// Organization schema for the company
export const getOrganizationSchema = (url) => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}#organization`,
    "name": "KheyaMind AI Technologies",
    "url": url,
    "logo": `${url}/logo.png`,
    "sameAs": [
      "https://www.facebook.com/kheyamindai",
      "https://www.linkedin.com/company/kheyamind-ai",
      "https://twitter.com/kheyamindai"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9999999999", // Replace with actual phone number
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"]
    }
  };
};

// Website schema
export const getWebsiteSchema = (url) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}#website`,
    "url": url,
    "name": "KheyaMind AI Technologies",
    "description": "KheyaMind AI crafts intelligent solutions including AI Chatbots, Voice Assistants, ERP Automations, and NLP tools.",
    "publisher": {
      "@id": `${url}#organization`
    }
  };
};

// Home page schema
export const getHomePageSchema = (url) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    "url": url,
    "name": "AI Chatbots, Voice Assistants & Automation Solutions | KheyaMind AI Technologies",
    "description": "KheyaMind AI crafts intelligent solutions including AI Chatbots, Voice Assistants, ERP Automations, and NLP tools. Empower your enterprise with next-gen AI solutions.",
    "isPartOf": {
      "@id": `${url}#website`
    },
    "about": {
      "@id": `${url}#organization`
    }
  };
};

// Service page schema
export const getServicePageSchema = (url, title, description, image) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    "name": title,
    "description": description,
    "provider": {
      "@id": `${url.split('/').slice(0, 3).join('/')}#organization`
    },
    "url": url,
    "image": image
  };
};

// Blog post schema
export const getBlogPostSchema = (url, title, description, image, datePublished, dateModified, authorName) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#blogpost`,
    "headline": title,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@id": `${url.split('/').slice(0, 3).join('/')}#organization`
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };
};

// FAQ schema
export const getFAQSchema = (faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Contact page schema
export const getContactPageSchema = (url, email, phone, address) => {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${url}#contactpage`,
    "url": url,
    "name": "Contact KheyaMind AI Technologies",
    "description": "Get in touch with KheyaMind AI Technologies for AI solutions, chatbots, voice assistants, and automation services.",
    "mainEntity": {
      "@type": "Organization",
      "@id": `${url.split('/').slice(0, 3).join('/')}#organization`,
      "email": email,
      "telephone": phone,
      "address": {
        "@type": "PostalAddress",
        ...address
      }
    }
  };
};

// About page schema
export const getAboutPageSchema = (url) => {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}#aboutpage`,
    "url": url,
    "name": "About KheyaMind AI Technologies",
    "description": "Learn about KheyaMind AI Technologies, a boutique AI consulting and solutions company specializing in AI-driven automation and digital products.",
    "about": {
      "@id": `${url.split('/').slice(0, 3).join('/')}#organization`
    }
  };
};