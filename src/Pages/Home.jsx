import React, { lazy } from "react";
import ReactPlayer from "react-player";
import bannerVid from "../assets/vid/banner.mp4";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import HrLine from "../Components/HrLine";
import { companyDetails, services } from "../data/constant";
import aboutImg from "../assets/images/about.webp";
import whyChooseImg from "../assets/images/whychooseus.webp";

import {
  FaBrain,
  FaCheckDouble,
  FaChessKnight,
  FaEye,
  FaIndustry,
  FaNetworkWired,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { ImPhone } from "react-icons/im";
import aiEnterpriseBanner from "../assets/images/ai-enterprise-banner.webp";
import SEO from "../Components/SEO/SEO";
import LazyImage, { OptimizedImage } from "../Components/LazyImage";
import {
  LazyTestimonials,
  LazyContactForm,
  LazyBlogsSection,
  LazyPortfolioList,
  LazyFaq,
} from "../utils/codeSplitting";
import { preloadImages } from "../utils/imageOptimization";
import DesignRushIcon from "../assets/images/DesignRushIcon.png";
const Services = lazy(() => import("../Components/Services"));

const Home = () => {
  // Preload critical images
  React.useEffect(() => {
    const criticalImages = [aboutImg, whyChooseImg, aiEnterpriseBanner];
    preloadImages(criticalImages);
  }, []);
  return (
    <div className="pt-[4rem] sm:pt-[5rem] relative z-[1]">
      <SEO
        type="home"
        title="AI Chatbots, Voice Assistants & Automation Solutions | KheyaMind AI Technologies"
        description="KheyaMind AI crafts intelligent solutions including AI Chatbots, Voice Assistants, ERP Automations, and NLP tools. Empower your enterprise with next-gen AI solutions."
        keywords="AI Solutions, Chatbots, Voice AI, ERP Automation, NLP, AI Company India, AI Development, Business Automation"
        pageData={{
          faqs: [
            {
              question:
                "What types of businesses can benefit from AI chatbots and automation?",
              answer:
                "Enterprises across industries including retail, finance, healthcare, and logistics can benefit from AI chatbots and automation solutions.",
            },
            {
              question:
                "Can KheyaMind solutions be customized to fit our unique business processes?",
              answer:
                "Yes, all solutions are fully tailored to your workflows and goals. We provide custom AI development that integrates seamlessly with your existing business processes.",
            },
            {
              question:
                "What's the typical turnaround time for project delivery?",
              answer:
                "Timelines vary based on project scope, but we ensure fast, reliable deployment. Most projects are completed within 4-12 weeks depending on complexity.",
            },
            {
              question: "Do you offer post-deployment support?",
              answer:
                "Yes, all solutions come with dedicated support and maintenance plans. We provide ongoing technical support, updates, and optimization services.",
            },
            {
              question: "Is AI integration scalable as our business grows?",
              answer:
                "Absolutely — scalability is built into every solution we deliver. Our AI systems are designed to grow with your business and handle increased workloads.",
            },
          ],
        }}
        url="https://www.kheymind.ai"
      />
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-[1] w-full h-full" />
        <div className="pt-[4rem] md:pt-[8rem] pb-[4rem]">
          <div
            data-aos="fade-up"
            className="wrapper relative z-[1] flex flex-col text-center text-white gap-5 justify-center h-full"
          >
            <h1 className="heading">
              Vision Beyond AI: Intelligent Solutions for the Next Era
            </h1>
            <p>
              KheyaMind combines cognitive automation, design-led thinking, and
              future-focused AI to help enterprises grow smarter.
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-5 mt-5">
              <Link to="/services" className="primary-btn">
                Discover Services
              </Link>
              <Link to="/contact-us" className="transparent-btn">
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          <ReactPlayer
            url={bannerVid}
            playing
            muted
            loop
            playsinline
            width="100%"
            height="100%"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            config={{
              file: {
                attributes: {
                  style: {
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  },
                },
              },
            }}
          />
        </div>
      </section>
      <div className="wrapper relative z-[1] pt-[3rem] sm:pt-0 sm:-translate-y-1/3 lg:-translate-y-1/2">
        <div className="grid lg:grid-cols-4">
          <div
            data-aos="fade-up"
            className="bg-primary w-full text-white flex gap-3 justify-center p-6"
          >
            <div className="bg-white h-full aspect-square flex justify-center items-center p-3">
              <FaUserFriends size={50} className="text-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-lg">Clients Onboarded</p>
              <h3 className="heading-2">
                <CountUp
                  end={5}
                  suffix="+"
                  duration={3}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h3>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="bg-white w-full text-primary flex gap-3 justify-center p-6"
          >
            <div className="bg-primary h-full aspect-square flex justify-center items-center p-3">
              <FaCheckDouble size={45} className="text-white" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-lg">Successful Projects</p>
              <h3 className="heading-2 text-secondary">
                <CountUp
                  end={10}
                  suffix="+"
                  duration={3}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h3>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="bg-primary w-full text-white flex gap-3 justify-center p-6"
          >
            <div className="bg-white h-full aspect-square flex justify-center items-center p-3">
              <FaIndustry size={50} className="text-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-lg">Industries Served</p>
              <h3 className="heading-2">
                <CountUp
                  end={4}
                  suffix="+"
                  duration={3}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h3>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="bg-white w-full text-primary flex gap-3 justify-center p-6"
          >
            <div className="bg-primary h-full aspect-square flex justify-center items-center p-3">
              <FaUsers size={50} className="text-white" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-lg">Satisfaction Score</p>
              <h3 className="heading-2 text-secondary">
                <CountUp
                  end={100}
                  suffix="%"
                  duration={3}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h3>
            </div>
          </div>
        </div>
      </div>

      <section className="pt-[5rem]">
        <div className="wrapper grid md:grid-cols-2 gap-7">
          <div data-aos="fade-up" className="space-y-4">
            <p className="uppercase text-primary font-medium text-center md:text-start">
              About us
            </p>
            <div className="md:hidden flex flex-col pb-3">
              <OptimizedImage
                src={aboutImg}
                alt="About Us - KheyaMind AI Technologies"
                priority={false}
                className="h-full w-full aspect-video object-cover rounded-xl"
              /> 
            </div>
            <h3 className="section-heading">Welcome to KheyaMind.ai</h3>
            <HrLine />
            <p>
              {/* Founded in 2025 by Niraj Modak, */}
              KheyaMind is a boutique AI consulting and solutions company based
              in India with global aspirations. We specialize in deploying
              AI-driven automation and digital products across enterprise
              verticals, empowering clients to rethink operations, service
              delivery, and intelligence.
            </p>
            <div className="grid grid-cols-2 gap-5 pt-5">
              {[
                "Innovative Solutions",
                "24/7 Support",
                "Experienced Experts",
                "Quality Assurance",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <GiCheckMark size={25} className="text-primary" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col-reverse sm:flex-row items-center gap-5 sm:gap-10 pt-5">
              <Link to="/about-us" className="primary-btn sm:w-fit w-full">
                Know More
              </Link>
              <div className="flex gap-3 sm:justify-center sm:w-fit w-full">
                <div className="bg-primary h-full aspect-square flex justify-center items-center p-3">
                  <BiSupport size={25} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <p className="">Call Us Now</p>
                  <Link
                    to={`tel:${companyDetails.phone}`}
                    className="font-semibold"
                  >
                    {companyDetails.phone}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" className="hidden md:flex h-full flex-col">
            <OptimizedImage
              src={aboutImg}
              alt="About Us - KheyaMind AI Technologies"
              priority={false}
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
        </div>
      </section>
      <section className="wrapper py-[5rem]">
        <div
          data-aos="fade-up"
          className="space-y-4 flex flex-col sm:items-center sm:text-center max-w-2xl mx-auto"
        >
          <p className="uppercase text-primary font-medium">
            Why Choose KheyaMind{" "}
          </p>
          <h3 className="section-heading">
            Why Choose KheyaMind For Your Business
          </h3>
          <HrLine />
        </div>
        <div className="mt-[2rem] grid sm:grid-cols-2 md:grid-cols-3 gap-7">
          <div data-aos="fade-up" className="flex flex-col gap-10">
            <div className="space-y-3">
              <div className="bg-primary w-[3.5rem] aspect-square flex justify-center items-center p-3">
                <FaBrain size={30} className="text-white" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg">AI-First Thinking</p>
                <p>
                  AI isn’t a feature — it’s the foundation of every solution we
                  build.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-primary w-[3.5rem] aspect-square flex justify-center items-center p-3">
                <FaEye size={30} className="text-white" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg">Clarity-Driven Design</p>
                <p>We pair intuitive UI with intelligent workflows.</p>
              </div>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="sm:row-span-2 md:row-span-1 w-full h-full aspect-[4/3] sm:aspect-auto md:aspect-square overflow-hidden rounded-xl"
          >
            <LazyImage
              src={whyChooseImg}
              alt="Why Choose KheyaMind AI - Leading AI Solutions Provider"
              className="md:aspect-[2/3] w-full h-full object-cover object-bottom"
            />
          </div>
          <div data-aos="fade-up" className="flex flex-col gap-10">
            <div className="space-y-3">
              <div className="bg-primary w-[3.5rem] aspect-square flex justify-center items-center p-3">
                <FaNetworkWired size={30} className="text-white" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg">Scalable Architecture</p>
                <p>Cloud-native, API-ready systems built to scale globally.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-primary w-[3.5rem] aspect-square flex justify-center items-center p-3">
                <FaChessKnight size={30} className="text-white" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg">Strategic Consulting</p>
                <p>
                  We don’t just deliver projects — we guide transformations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[5rem] bg-secondary relative">
        <LazyImage
          src={aiEnterpriseBanner}
          className="absolute inset-0 z-[-2] h-full w-full object-cover"
          alt="AI Enterprise Solutions Background"
        />
        <div className="absolute inset-0 z-[-1] bg-gradient-to-tr from-primary/40 via-black/70 to-secondary/80"></div>
        <div className="wrapper text-center text-white">
          <div data-aos="fade-up" className="max-w-4xl mx-auto">
            <h2 className="section-heading">
              Ready to unlock new growth opportunities?
            </h2>
            <p className="mt-4">
              We ask for a few details so we can better understand your business
              challenges and recommend the right AI solutions — whether it’s
              Chatbots, Voice AI, ERP Automation, or a custom AI-driven app.
              <br />
              <br />
              Our team reviews every request carefully to provide tailored
              solutions designed to save time, reduce costs, and help you scale
              with confidence. <br />
              <br />
              Let’s start building smarter solutions, together.
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-5 mt-8">
              <Link
                to="/contact-us"
                className="primary-btn hover:!border border-white"
              >
                Get Started
              </Link>
              <Link
                to={`tel:${companyDetails.phone}`}
                className="transparent-btn border-white text-white hover:bg-white hover:text-primary"
              >
                <ImPhone className="inline mr-2" /> Call Us Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Services
        title="our services"
        heading="AI-Powered Services Crafted to Deliver Business Results"
        data={services}
      />
      <div className="relative wrapper !px-0">
        <LazyPortfolioList />
        <div className="wrapper md:block flex justify-center pt-10">
          <Link
            to="https://www.designrush.com/agency/profile/kheyamind-ai-technologies"
            target="_blank"
            className="w-[5rem] md:w-[6rem] z-[40] hover:scale-105 transition-all duration-300 md:absolute right-10 mx-auto bottom-4"
          >
            <LazyImage
              src={DesignRushIcon}
              alt="Verified agency on DesignRush"
              className="w-[5rem] md:w-[6rem]"
            />
          </Link>
        </div>
      </div>
      <LazyContactForm />
      <LazyTestimonials />
      <LazyBlogsSection />
      <LazyFaq />
    </div>
  );
};

export default Home;
