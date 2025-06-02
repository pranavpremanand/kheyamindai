import React, { Suspense, lazy } from 'react';
import FancyLoader from '../Components/FancyLoader';

/**
 * Higher-order component for lazy loading with custom fallback
 */
export const withLazyLoading = (importFunc, fallback = <FancyLoader />) => {
  const LazyComponent = lazy(importFunc);
  
  return (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

/**
 * Preload a component for better UX
 */
export const preloadComponent = (importFunc) => {
  const componentImport = importFunc();
  return componentImport;
};

/**
 * Route-based code splitting
 */
export const createLazyRoute = (importFunc, fallback) => {
  return withLazyLoading(importFunc, fallback);
};

// Lazy load heavy components
export const LazyTestimonials = withLazyLoading(
  () => import('../Components/Testimonials'),
  <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
);

export const LazyContactForm = withLazyLoading(
  () => import('../Components/ContactForm'),
  <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
);

export const LazyBlogsSection = withLazyLoading(
  () => import('../Components/Website/BlogsSection'),
  <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
);

export const LazyPortfolioList = withLazyLoading(
  () => import('../Components/Website/PortfolioList'),
  <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
);

export const LazyFaq = withLazyLoading(
  () => import('../Components/Faq'),
  <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
);

// Page-level lazy loading
export const LazyHome = createLazyRoute(() => import('../Pages/Home'));
export const LazyAboutUs = createLazyRoute(() => import('../Pages/AboutUs'));
export const LazyOurServices = createLazyRoute(() => import('../Pages/OurServices'));
export const LazyServiceDetails = createLazyRoute(() => import('../Pages/ServiceDetails'));
export const LazyBlogs = createLazyRoute(() => import('../Pages/Blogs'));
export const LazyBlogDetails = createLazyRoute(() => import('../Pages/BlogDetails'));
export const LazyContactUs = createLazyRoute(() => import('../Pages/ContactUs'));
export const LazyLandingPage = createLazyRoute(() => import('../Pages/LandingPage'));

// Landing pages
export const LazyChatbotVoiceAILanding = createLazyRoute(
  () => import('../Pages/landingPages/ChatbotVoiceAILanding')
);
export const LazyEnterpriseAILanding = createLazyRoute(
  () => import('../Pages/landingPages/EnterpriseAILanding')
);
export const LazyRealEstateAILanding = createLazyRoute(
  () => import('../Pages/landingPages/RealEstateAILanding')
);