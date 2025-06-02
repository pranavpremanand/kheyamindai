import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { LandingPageLayout, MainLayout } from "./Layout";
import ScrollToTopButton from "./Components/ScrollToTopButton";
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

// Defer AOS initialization to reduce main thread blocking
let aosInitialized = false;
const initAOS = async () => {
  if (!aosInitialized && window.innerWidth > 768) {
    const AOS = await import("aos");
    await import("aos/dist/aos.css");
    AOS.init({
      once: true,
      duration: 500,
      easing: "ease-in-out-quart",
      offset: -70,
    });
    aosInitialized = true;
  }
};

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
    
    // Defer heavy operations to reduce main thread blocking
    const deferredOperations = setTimeout(() => {
      // Initialize AOS after initial render
      initAOS();
      
      // Optimize existing images
      optimizeExistingImages();
    }, 3000); // Further increased delay to reduce initial load impact
    
    return () => clearTimeout(deferredOperations);
  }, []);
  return (
    <HelmetProvider>
      <QueryProvider>
        <BrowserRouter>
          <ScrollToTopButton />
          <ScrollToTop />
          <Suspense fallback={null}>
            <Toaster position="top-center" />
          </Suspense>
          <SpinnerContextProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="about-us" element={<AboutUs />} />
                <Route path="services" element={<OurServices />} />
                <Route path="services/:slug" element={<ServiceDetails />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="blogs/:slug" element={<BlogDetails />} />
                <Route path="contact-us" element={<ContactUs />} />
                <Route path="thank-you" element={<ThankYou />} />
              </Route>

              <Route path="/" element={<LandingPageLayout />}>
                {/* Landing Page */}
                {/* <Route
                  path="web-development"
                  element={<LandingPage page="web" />}
                />
                <Route
                  path="app-development"
                  element={<LandingPage page="app" />}
                /> */}
                <Route
                  path="/chatbots-voice-ai"
                  element={<ChatbotVoiceAILanding />}
                />
                <Route
                  path="/ai-enterprise-solutions"
                  element={<EnterpriseAILanding />}
                />
                <Route
                  path="/real-estate-ai-solutions"
                  element={<RealEstateAILanding />}
                />
              </Route>
            </Routes>
          </Suspense>
        </SpinnerContextProvider>
      </BrowserRouter>
      </QueryProvider>
    </HelmetProvider>
  );
}

export default App;
