import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { LandingPageLayout, MainLayout } from "./Layout";
import ScrollToTopButton from "./Components/ScrollToTopButton";
import SpinnerContextProvider from "./Components/SpinnerContext";
import { Suspense, lazy } from "react";
import { LoadingSpinner } from "./Components/LoadingSpinner";
import ScrollToTop from "./Components/ScrollToTop";

import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";
import DesignRushIcon from "./assets/images/DesignRushIcon.png";

const Home = lazy(() => import("./Pages/Home"));
const AboutUs = lazy(() => import("./Pages/AboutUs"));
const OurServices = lazy(() => import("./Pages/OurServices"));
const ServiceDetails = lazy(() => import("./Pages/ServiceDetails"));
const Blogs = lazy(() => import("./Pages/Blogs"));
const BlogDetails = lazy(() => import("./Pages/BlogDetails"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const ThankYou = lazy(() => import("./Pages/ThankYou"));
const ChatbotVoiceAILanding = lazy(() =>
  import("./Pages/landingPages/ChatbotVoiceAILanding")
);
const EnterpriseAILanding = lazy(() =>
  import("./Pages/landingPages/EnterpriseAILanding")
);

AOS.init({
  once: true,
  duration: 500,
  easing: "ease-in-out-quart",
  offset: -70,
});

function App() {
  return (
    <BrowserRouter>
      <ScrollToTopButton />
      <ScrollToTop />
      <Toaster position="top-center" />
      <Link
        to="https://www.designrush.com/agency/profile/kheyamind-ai-technologies-private-limited"
        target="_blank"
        className="w-[4rem] md:w-[6rem] fixed right-6 md:right-14 bottom-24 md:bottom-32 z-[9999] hover:scale-105 transition-all duration-300"
      >
        <img src={DesignRushIcon} alt="Verified agency on DesignRush" />
      </Link>
      <SpinnerContextProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="about-us" element={<AboutUs />} />
              <Route path="services" element={<OurServices />} />
              <Route path="services/:title" element={<ServiceDetails />} />
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
            </Route>
          </Routes>
        </Suspense>
      </SpinnerContextProvider>
    </BrowserRouter>
  );
}

export default App;
