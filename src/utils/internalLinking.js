/**
 * Internal Linking Strategy Configuration
 * Defines relationships between services and content for SEO optimization
 */

// Service relationships and cross-linking configuration
export const serviceRelationships = {
  "ai-chatbots": {
    callToAction: {
      primary: "Schedule Chatbot Demo",
    },
    keywords: [
      "AI chatbots",
      "customer support automation",
      "conversational AI",
    ],
  },

  "voice-ai-agents": {
    callToAction: {
      primary: "Test Voice AI Demo",
    },
    keywords: ["voice AI agents", "call center automation", "voice assistants"],
  },

  "nlp-custom-gpt-solutions": {
    callToAction: {
      primary: "Explore NLP Solutions",
    },
    keywords: [
      "custom GPT",
      "NLP solutions",
      "language AI",
      "document processing",
    ],
  },

  "ai-powered-erp-tools": {
    callToAction: {
      primary: "ERP AI Consultation",
    },
    keywords: [
      "AI ERP",
      "business automation",
      "enterprise AI",
      "process optimization",
    ],
  },

  "cloud-devops-ai": {
    callToAction: {
      primary: "Cloud AI Consultation",
    },
    keywords: ["cloud AI", "DevOps automation", "infrastructure optimization"],
  },

  "ai-interface-design": {
    callToAction: {
      primary: "UI/UX Consultation",
    },
    keywords: [
      "AI interface design",
      "AI UX",
      "user experience",
      "AI applications",
    ],
  },

  "mobile-app-development": {
    callToAction: {
      primary: "Mobile AI Consultation",
    },
    keywords: [
      "AI mobile apps",
      "mobile development",
      "iOS AI apps",
      "Android AI apps",
    ],
  },
};

// Blog to service linking configuration
export const blogServiceLinks = {
  // Keywords that should link to specific services
  keywords: {
    "AI chatbot": { slug: "ai-chatbots", anchorText: "AI chatbot solutions" },
    chatbot: { slug: "ai-chatbots", anchorText: "chatbot development" },
    "voice AI": { slug: "voice-ai-agents", anchorText: "voice AI agents" },
    "voice assistant": {
      slug: "voice-ai-agents",
      anchorText: "voice AI solutions",
    },
    NLP: { slug: "nlp-custom-gpt-solutions", anchorText: "NLP solutions" },
    "custom GPT": {
      slug: "nlp-custom-gpt-solutions",
      anchorText: "custom GPT development",
    },
    "ERP automation": {
      slug: "ai-powered-erp-tools",
      anchorText: "AI-powered ERP tools",
    },
    "business automation": {
      slug: "ai-powered-erp-tools",
      anchorText: "business automation solutions",
    },
    "cloud AI": {
      slug: "cloud-devops-ai",
      anchorText: "cloud AI infrastructure",
    },
    DevOps: { slug: "cloud-devops-ai", anchorText: "AI DevOps solutions" },
    "mobile AI": {
      slug: "mobile-app-development",
      anchorText: "AI mobile app development",
    },
    "AI interface": {
      slug: "ai-interface-design",
      anchorText: "AI interface design",
    },
    "AI UX": {
      slug: "ai-interface-design",
      anchorText: "AI UX design services",
    },
  },
};

// Breadcrumb configuration
export const breadcrumbConfig = {
  services: {
    home: { title: "Home", url: "/" },
    services: { title: "Services", url: "/services" },
  },
  blogs: {
    home: { title: "Home", url: "/" },
    blogs: { title: "Blogs", url: "/blogs" },
  },
};

// Call-to-action templates
export const ctaTemplates = {
  primary: {
    className:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 inline-block",
    style: "primary",
  },
  secondary: {
    className:
      "border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 inline-block",
    style: "secondary",
  },
  text: {
    className:
      "text-blue-600 hover:text-blue-800 font-semibold underline transition-colors duration-300",
    style: "text",
  },
};

// Get call-to-action for a service
export const getServiceCTA = (serviceSlug) => {
  return (
    serviceRelationships[serviceSlug]?.callToAction || {
      primary: "Get Started",
    }
  );
};

// Generate internal link with proper anchor text
export const generateInternalLink = (
  targetSlug,
  anchorText,
  className = ""
) => {
  return {
    url: `/services/${targetSlug}`,
    text: anchorText,
    className:
      className ||
      "text-blue-600 hover:text-blue-800 font-medium underline transition-colors duration-300",
  };
};

// Get breadcrumb path for service pages
export const getServiceBreadcrumb = (serviceTitle, serviceSlug) => {
  return [
    breadcrumbConfig.services.home,
    breadcrumbConfig.services.services,
    { title: serviceTitle, url: `/services/${serviceSlug}`, current: true },
  ];
};

// Get breadcrumb path for blog pages
export const getBlogBreadcrumb = (blogTitle, blogSlug) => {
  return [
    breadcrumbConfig.blogs.home,
    breadcrumbConfig.blogs.blogs,
    { title: blogTitle, url: `/blogs/${blogSlug}`, current: true },
  ];
};
