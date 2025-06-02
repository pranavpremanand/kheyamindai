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
    "alternateName": "KheyaMind AI",
    "url": url,
    "logo": `${url}/logo.png`,
    "description": "Empowering Intelligence. Elevating Enterprises. AI solutions including chatbots, voice AI, ERP automation, and custom AI development.",
    "foundingDate": "2023",
    "industry": "Artificial Intelligence",
    "serviceType": "AI Solutions",
    "areaServed": [
      {
        "@type": "Country",
        "name": "India"
      },
      {
        "@type": "Country", 
        "name": "United Arab Emirates"
      },
      {
        "@type": "Country",
        "name": "United States"
      },
      {
        "@type": "Country",
        "name": "United Kingdom"
      },
      {
        "@type": "Country",
        "name": "Singapore"
      },
      {
        "@type": "Country",
        "name": "Australia"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/kheyamindai/",
      "https://www.facebook.com/kheyamindai",
      "https://www.instagram.com/KheyaMindai"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9242049993",
      "contactType": "Customer Service",
      "availableLanguage": "English",
      "areaServed": ["IN", "AE", "US", "GB", "SG", "AU"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "India",
      "addressRegion": "Karnataka",
      "addressLocality": "Bangalore"
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Chatbot Development",
      "Voice AI",
      "Natural Language Processing",
      "Enterprise Resource Planning",
      "Business Automation",
      "Custom AI Development"
    ]
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
  const baseUrl = url.split('/').slice(0, 3).join('/');
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    "name": title,
    "description": description,
    "serviceType": "AI Solutions",
    "category": "Artificial Intelligence",
    "provider": {
      "@type": "Organization",
      "@id": `${baseUrl}#organization`,
      "name": "KheyaMind AI Technologies",
      "url": baseUrl
    },
    "url": url,
    "image": image,
    "areaServed": [
      {
        "@type": "Country",
        "name": "India"
      },
      {
        "@type": "Country", 
        "name": "United Arab Emirates"
      },
      {
        "@type": "Country",
        "name": "United States"
      },
      {
        "@type": "Country",
        "name": "United Kingdom"
      },
      {
        "@type": "Country",
        "name": "Singapore"
      },
      {
        "@type": "Country",
        "name": "Australia"
      }
    ],
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": url,
      "servicePhone": "+91-9242049993",
      "availableLanguage": "English"
    },
    "brand": {
      "@type": "Brand",
      "name": "KheyaMind AI Technologies"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD",
      "description": "Custom AI solution pricing available on consultation"
    }
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

// Enhanced service schema with specific service details
export const getEnhancedServiceSchema = (serviceData, url) => {
  const baseUrl = url.split('/').slice(0, 3).join('/');
  
  // Service-specific keywords and categories
  const serviceCategories = {
    "AI Chatbots": {
      category: "Chatbot Development",
      keywords: ["AI Chatbots", "Customer Support Automation", "Conversational AI", "Business Chatbots"],
      serviceOutput: "Intelligent chatbot systems for customer engagement"
    },
    "Voice AI Agents": {
      category: "Voice AI Technology", 
      keywords: ["Voice AI", "Call Center Automation", "Voice Assistants", "Speech Recognition"],
      serviceOutput: "Human-like voice AI agents for call center operations"
    },
    "NLP & Custom GPT Solutions": {
      category: "Natural Language Processing",
      keywords: ["NLP", "Custom GPT", "Document Processing", "Language AI"],
      serviceOutput: "Custom language AI models and NLP solutions"
    },
    "AI-Powered ERP Tools": {
      category: "Enterprise Resource Planning",
      keywords: ["AI ERP", "Business Automation", "Process Optimization", "Enterprise AI"],
      serviceOutput: "AI-enhanced ERP systems and business process automation"
    },
    "Cloud & DevOps AI": {
      category: "Cloud Infrastructure",
      keywords: ["Cloud AI", "DevOps Automation", "Infrastructure Optimization", "AI Deployment"],
      serviceOutput: "AI-optimized cloud infrastructure and deployment solutions"
    },
    "AI Interface Design": {
      category: "User Experience Design",
      keywords: ["AI UX", "Interface Design", "User Experience", "AI Applications"],
      serviceOutput: "Intuitive user interfaces for AI applications"
    },
    "Mobile App Development": {
      category: "Mobile Application Development",
      keywords: ["AI Mobile Apps", "iOS Development", "Android Development", "Mobile AI"],
      serviceOutput: "AI-powered mobile applications for various industries"
    }
  };

  const serviceInfo = serviceCategories[serviceData.title] || {
    category: "AI Solutions",
    keywords: ["Artificial Intelligence", "AI Solutions"],
    serviceOutput: "Custom AI solutions"
  };

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    "name": serviceData.title,
    "alternateName": serviceData.title.replace(/&/g, 'and'),
    "description": serviceData.seo?.description || serviceData.desc,
    "serviceType": "AI Solutions",
    "category": serviceInfo.category,
    "keywords": serviceInfo.keywords.join(", "),
    "serviceOutput": serviceInfo.serviceOutput,
    "provider": {
      "@type": "Organization",
      "@id": `${baseUrl}#organization`,
      "name": "KheyaMind AI Technologies",
      "alternateName": "KheyaMind AI",
      "url": baseUrl,
      "logo": `${baseUrl}/logo.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9242049993",
        "contactType": "Customer Service",
        "availableLanguage": "English"
      }
    },
    "url": url,
    "image": {
      "@type": "ImageObject",
      "url": serviceData.detailsPage?.banner || `${baseUrl}/og-image.png`,
      "caption": `${serviceData.title} by KheyaMind AI Technologies`
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "India",
        "sameAs": "https://en.wikipedia.org/wiki/India"
      },
      {
        "@type": "Country", 
        "name": "United Arab Emirates",
        "sameAs": "https://en.wikipedia.org/wiki/United_Arab_Emirates"
      },
      {
        "@type": "Country",
        "name": "United States",
        "sameAs": "https://en.wikipedia.org/wiki/United_States"
      },
      {
        "@type": "Country",
        "name": "United Kingdom",
        "sameAs": "https://en.wikipedia.org/wiki/United_Kingdom"
      },
      {
        "@type": "Country",
        "name": "Singapore",
        "sameAs": "https://en.wikipedia.org/wiki/Singapore"
      },
      {
        "@type": "Country",
        "name": "Australia",
        "sameAs": "https://en.wikipedia.org/wiki/Australia"
      }
    ],
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": url,
      "servicePhone": "+91-9242049993",
      "availableLanguage": "English",
      "serviceLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "India",
          "addressRegion": "Karnataka",
          "addressLocality": "Bangalore"
        }
      }
    },
    "brand": {
      "@type": "Brand",
      "name": "KheyaMind AI Technologies",
      "logo": `${baseUrl}/logo.png`
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD",
      "description": "Custom AI solution pricing available on consultation",
      "seller": {
        "@id": `${baseUrl}#organization`
      }
    },
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "Enterprise, SME, Startups"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${serviceData.title} Solutions`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `Custom ${serviceData.title}`,
            "description": `Tailored ${serviceData.title.toLowerCase()} solutions for your business needs`
          }
        }
      ]
    }
  };
};

// Breadcrumb schema for service pages
export const getBreadcrumbSchema = (serviceData, url) => {
  const baseUrl = url.split('/').slice(0, 3).join('/');
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${baseUrl}/services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": serviceData.title,
        "item": url
      }
    ]
  };
};