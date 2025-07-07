import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { LandingPageLayout, MainLayout } from "./Layout";
import ScrollToTopButton from "./Components/ScrollToTopButton";
import WhatsAppButton from "./Components/WhatsAppButton";
import SpinnerContextProvider from "./Components/SpinnerContext";
import { Suspense, lazy, useEffect } from "react";
import { LoadingSpinner } from "./Components/LoadingSpinner";
import ScrollToTop from "./Components/ScrollToTop";
import QueryProvider from "./utils/QueryProvider";
import { initPerformanceMonitoring, observePerformance } from "./utils/performanceMonitoring";
import { optimizeExistingImages } from "./utils/imageOptimization";
import { createLazyComponent, initBundleOptimizations } from "./utils/bundleOptimization";
import { initCriticalCSS } from "./utils/criticalCSS";
import { initThirdPartyOptimizations } from "./utils/thirdPartyOptimization";
import { initIconOptimizations } from "./utils/iconOptimization";
import { HelmetProvider } from 'react-helmet-async';
import { initializeAnimations } from './utils/animationConfig';
import { initMobileFixes } from './utils/mobileFix';

// Lazy load Toaster to reduce initial bundle
const Toaster = lazy(() => import("react-hot-toast").then(module => ({ default: module.Toaster })));

// Optimized lazy loading with error boundaries
const Home = createLazyComponent(() => import("./Pages/Home"));
const AboutUs = createLazyComponent(() => import("./Pages/AboutUs"));
const OurServices = createLazyComponent(() => import("./Pages/OurServices"));
const ServiceDetails = createLazyComponent(() => import("./Pages/ServiceDetails"));
const Blogs = createLazyComponent(() => import("./Pages/Blogs"));
const BlogDetails = createLazyComponent(() => import("./Pages/BlogDetails"));
const ContactUs = createLazyComponent(() => import("./Pages/ContactUs"));
const ThankYou = createLazyComponent(() => import("./Pages/ThankYou"));
const ChatbotVoiceAILanding = createLazyComponent(() =>
  import("./Pages/landingPages/ChatbotVoiceAILanding")
);
const EnterpriseAILanding = createLazyComponent(() =>
  import("./Pages/landingPages/EnterpriseAILanding")
);
const RealEstateAILanding = createLazyComponent(() =>
  import("./Pages/landingPages/RealEstateAILanding")
);

function App() {
  useEffect(() => {
    // Initialize critical CSS immediately
    initCriticalCSS();
    
    // Initialize performance monitoring
    initPerformanceMonitoring();
    observePerformance();
    
    // Initialize bundle optimizations
    initBundleOptimizations();
    
    // Initialize icon optimizations
    initIconOptimizations();
    
    // Initialize third-party optimizations
    initThirdPartyOptimizations();
    
    // Initialize animations - disable on mobile to prevent content hiding
    const animationCleanup = initializeAnimations({
      disable: window.innerWidth <= 768,
      duration: 800
    });
    
    // Initialize mobile fixes
    const mobileFixCleanup = initMobileFixes();
      
      // Optimize existing images
      optimizeExistingImages();
    
    return () => {
      animationCleanup();
      mobileFixCleanup();
    };
  }, []);

  return (
    <HelmetProvider>
      <QueryProvider>
        <BrowserRouter>
          <ScrollToTopButton />
          <WhatsAppButton phoneNumber="919163885060" message="Hello! I'm interested in your AI services." />
          <ScrollToTop />
          <Suspense fallback={null}>
            <Toaster position="top-center" />
          </Suspense>
          <SpinnerContextProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Main Layout Routes */}
                <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="about-us" element={<AboutUs />} />
                <Route path="services" element={<OurServices />} />
                <Route path="services/:slug" element={<ServiceDetails />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="blogs/:slug" element={<BlogDetails />} />
                <Route path="contact-us" element={<ContactUs />} />
                <Route path="thank-you" element={<ThankYou />} />
              </Route>

                {/* Landing Page Layout Routes */}
                <Route element={<LandingPageLayout />}>
                  <Route path="chatbots-voice-ai" element={<ChatbotVoiceAILanding />} />
                  <Route path="ai-enterprise-solutions" element={<EnterpriseAILanding />} />
                  <Route path="real-estate-ai-solutions" element={<RealEstateAILanding />} />
              </Route>

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </SpinnerContextProvider>
      </BrowserRouter>
      </QueryProvider>
    </HelmetProvider>
  );
}

export default App;
