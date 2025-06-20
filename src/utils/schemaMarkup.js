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
    "provider": {
      "@type": "Organization",
      "@id": `${baseUrl}#organization`,
      "name": "KheyaMind AI Technologies",
      "url": "https://www.kheyamind.ai"
    },
    "areaServed": [
      "India",
      "UAE", 
      "USA",
      "UK",
      "Singapore",
      "Australia"
    ],
    "url": url,
    "image": image,
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
    "description": serviceData.seo?.description || serviceData.desc,
    "serviceType": "AI Solutions",
    "provider": {
      "@type": "Organization",
      "@id": `${baseUrl}#organization`,
      "name": "KheyaMind AI Technologies",
      "url": "https://www.kheyamind.ai"
    },
    "areaServed": [
      "India",
      "UAE", 
      "USA",
      "UK",
      "Singapore",
      "Australia"
    ],
    "url": url,
    "image": serviceData.detailsPage?.banner || `${baseUrl}/og-image.png`,
    "category": serviceInfo.category,
    "keywords": serviceInfo.keywords.join(", "),
    "serviceOutput": serviceInfo.serviceOutput,
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

// Breadcrumb schema for service pages
export const getBreadcrumbSchema = (breadcrumbData, url) => {
  const baseUrl = url.split('/').slice(0, 3).join('/');
  
  // Create the itemListElement array from the breadcrumb data
  const itemListElement = breadcrumbData.map((item, index) => {
    return {
      "@type": "ListItem",
      "position": index + 1,
      "name": item.title, // Ensure the name property is always present
      "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    };
  });
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };
};