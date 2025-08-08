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
import LocalBusinessSchema from "../Components/SEO/LocalBusinessSchema";
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
        title="AI Consulting Services | Enterprise AI Solutions & Business Automation | KheyaMind AI"
        description="Leading AI consulting company offering enterprise AI solutions, custom chatbot development, voice AI agents, and business process automation. Reduce costs by 75% with proven AI automation from India to Global markets. ROI in 6-12 months."
        keywords="AI consulting services, enterprise AI solutions, AI automation services, business process automation, AI chatbot development, voice AI solutions, machine learning consulting, custom AI development, AI implementation, artificial intelligence consulting"
        pageData={{
          faqs: [
            {
              question: "What is AI consulting and how can it transform my business?",
              answer:
                "AI consulting involves strategic guidance on implementing artificial intelligence solutions to automate processes, enhance decision-making, and drive growth. KheyaMind AI helps businesses reduce operational costs by up to 75%, automate customer support, streamline workflows, and unlock new revenue opportunities through intelligent automation across industries like retail, finance, healthcare, and manufacturing."
            },
            {
              question: "How much does AI implementation cost for small and medium businesses?",
              answer:
                "AI implementation costs vary based on project scope and complexity. Basic AI chatbot solutions start from $5,000, while comprehensive enterprise AI systems range from $25,000-$100,000. Most businesses see ROI within 6-12 months through reduced operational costs, improved efficiency, and enhanced customer experience. We offer flexible pricing and phased implementation to fit any budget."
            },
            {
              question: "What's the difference between AI chatbots and voice AI agents?",
              answer:
                "AI chatbots handle text-based conversations on websites, mobile apps, and messaging platforms like WhatsApp, providing 24/7 customer support and lead qualification. Voice AI agents manage phone calls with human-like speech, handling sales calls, appointment scheduling, and customer service through natural voice interactions. Both reduce staffing costs by 60-90% while improving response times."
            },
            {
              question: "How long does it take to implement AI solutions in my business?",
              answer:
                "Implementation timelines depend on project complexity. Basic AI chatbots deploy within 2-4 weeks, custom AI development takes 6-8 weeks, and enterprise-wide AI automation requires 8-16 weeks. We use agile development methodology with weekly progress updates, ensuring transparent communication and faster delivery without compromising quality."
            },
            {
              question: "Can AI solutions integrate with my existing business software?",
              answer:
                "Yes, our AI solutions integrate seamlessly with popular CRM systems (Salesforce, HubSpot), ERP platforms (SAP, Oracle), helpdesk tools (Zendesk, Freshdesk), and communication channels (WhatsApp, Facebook Messenger). We provide custom API development and middleware solutions to ensure smooth integration with any existing business system or workflow."
            },
            {
              question: "What industries benefit most from AI automation and consulting?",
              answer:
                "All industries benefit from AI, but we specialize in retail and e-commerce (inventory management, customer service), healthcare (appointment scheduling, patient support), finance (fraud detection, customer onboarding), manufacturing (predictive maintenance, quality control), real estate (lead qualification, property management), and professional services (document processing, client communication)."
            },
            {
              question: "How do you ensure AI solutions are secure and compliant?",
              answer:
                "We implement enterprise-grade security with SOC2 compliance, end-to-end encryption, secure API connections, and GDPR adherence. All AI models are hosted on secure cloud infrastructure with regular security audits, access controls, and data backup systems. We follow industry best practices for data privacy and maintain compliance with healthcare (HIPAA), finance (PCI DSS), and international regulations."
            },
            {
              question: "What ongoing support do you provide after AI implementation?",
              answer:
                "We provide comprehensive post-deployment support including 24/7 technical monitoring, regular system updates, performance optimization, user training, and dedicated account management. Our support packages include monthly performance reports, quarterly strategy reviews, and continuous AI model improvement to ensure your solutions evolve with your business needs and market changes."
            },
            {
              question: "Can AI solutions help reduce my business operational costs?",
              answer:
                "Absolutely. Our AI solutions typically reduce operational costs by 40-75% through automation of repetitive tasks, 24/7 availability eliminating overtime costs, reduced human error, and improved efficiency. Businesses save an average of $50,000-$200,000 annually on customer service, data processing, and administrative tasks while improving service quality and response times."
            },
            {
              question: "What makes KheyaMind AI different from other AI consulting companies?",
              answer:
                "KheyaMind AI combines deep technical expertise with business strategy, offering end-to-end solutions from consulting to implementation and support. We provide transparent pricing, agile development, multilingual support, and proven results across 50+ industries. Our unique approach focuses on measurable ROI, seamless integration, and scalable solutions that grow with your business, backed by continuous optimization and dedicated support."
            }
          ],
        }}
        url="https://www.kheyamind.ai"
      />
      <LocalBusinessSchema />
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-[1] w-full h-full" />
        <div className="pt-[4rem] md:pt-[8rem] pb-[4rem]">
          <div
            data-aos="fade-up"
            className="wrapper relative z-[1] flex flex-col text-center text-white gap-5 justify-center h-full"
          >
            <h1 className="heading">
              AI Consulting Services | Reduce Costs by 75% with Enterprise AI Automation
            </h1>
            <p>
              Leading AI consulting company offering custom chatbot development, voice AI agents, and business process automation. Transform your business with intelligent AI solutions from India to Global markets.
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-0">
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

      {/* Social Proof Statistics Section */}
      <section className="py-[2rem] sm:py-[3rem] bg-gradient-to-r from-primary/5 via-white to-secondary/5">
        <div className="wrapper text-center">
          <div data-aos="fade-up" className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
              Trusted Results That Drive Growth
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8">
              <div className="space-y-1 sm:space-y-2 p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary">₹2.5+ Cr</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Cost Savings Generated</p>
              </div>
              <div className="space-y-1 sm:space-y-2 p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary">75%</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Cost Reduction</p>
              </div>
              <div className="space-y-1 sm:space-y-2 p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary">2-16 Weeks</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Implementation</p>
              </div>
              <div className="space-y-1 sm:space-y-2 p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary">24/7</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">AI Support</p>
              </div>
            </div>
            <div className="pt-3 sm:pt-4">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
                <strong>From India to Global:</strong> Serving enterprises across healthcare, finance, retail, and manufacturing with proven AI automation solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section - Redesigned */}
      <section className="pt-[3rem] sm:pt-[5rem] pb-[3rem] sm:pb-[5rem]">
        <div className="wrapper">
          <div data-aos="fade-up" className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <p className="uppercase text-primary font-medium mb-4">About us</p>
              <h3 className="section-heading mb-6">Welcome to KheyaMind.ai</h3>
              <HrLine />
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 sm:p-8 border border-gray-100">
                  <p className="text-lg leading-relaxed text-gray-700">
                    KheyaMind is a <span className="text-primary font-semibold">boutique AI consulting and solutions company</span> based
                    in India with global aspirations. We specialize in deploying
                    AI-driven automation and digital products across enterprise
                    verticals, empowering clients to rethink operations, service
                    delivery, and intelligence.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {[
                    { icon: "🚀", title: "Innovative Solutions", desc: "Cutting-edge AI technology" },
                    { icon: "🛟", title: "24/7 Support", desc: "Round-the-clock assistance" },
                    { icon: "👥", title: "Expert Team", desc: "Seasoned AI professionals" },
                    { icon: "🎯", title: "Quality Assurance", desc: "Rigorous testing standards" },
                  ].map((item) => (
                    <div key={item.title} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="text-2xl sm:text-3xl mb-2">{item.icon}</div>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industry Expertise */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                  <h4 className="text-xl sm:text-2xl font-bold text-primary mb-6">Industry Expertise & Proven Results</h4>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4 py-2">
                      <h5 className="font-semibold text-sm sm:text-base text-secondary">Healthcare AI (HIPAA Compliant)</h5>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">Automated 80% of appointment scheduling, reducing wait times by 60%</p>
                    </div>
                    <div className="border-l-4 border-secondary pl-4 py-2">
                      <h5 className="font-semibold text-sm sm:text-base text-secondary">Retail & E-commerce</h5>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">Reduced customer service costs by 67% with 90% inquiry automation</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4 py-2">
                      <h5 className="font-semibold text-sm sm:text-base text-secondary">Finance & Banking</h5>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">Implemented fraud detection reducing false positives by 45%</p>
                    </div>
                    <div className="border-l-4 border-secondary pl-4 py-2">
                      <h5 className="font-semibold text-sm sm:text-base text-secondary">Manufacturing</h5>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">Quality control automation increased accuracy by 85%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <Link to="/about-us" className="primary-btn w-full sm:w-auto">
                Learn More About Us
              </Link>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="bg-primary w-12 h-12 flex justify-center items-center rounded-lg">
                  <BiSupport size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Need Help? Call Us Now</p>
                  <Link
                    to={`tel:${companyDetails.phone}`}
                    className="font-semibold text-primary hover:text-secondary transition-colors"
                  >
                    {companyDetails.phone}
                  </Link>
                </div>
              </div>
            </div>
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
                  AI isn't a feature — it's the foundation of every solution we
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
                  We don't just deliver projects — we guide transformations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-[3rem] sm:py-[5rem] bg-gray-50">
        <div className="wrapper text-center">
          <div data-aos="fade-up" className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
              Powered by Leading AI Technologies
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              We leverage cutting-edge AI platforms and custom development to deliver enterprise-grade solutions
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-6 sm:pt-8">
              <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl sm:text-3xl">🤖</div>
                <h4 className="font-semibold text-sm sm:text-base">OpenAI GPT-5</h4>
                <p className="text-xs sm:text-sm text-gray-600">Next-gen language models</p>
              </div>
              <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl sm:text-3xl">⚡</div>
                <h4 className="font-semibold text-sm sm:text-base">Claude AI</h4>
                <p className="text-xs sm:text-sm text-gray-600">Intelligent reasoning</p>
              </div>
              <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl sm:text-3xl">☁️</div>
                <h4 className="font-semibold text-sm sm:text-base">Azure AI</h4>
                <p className="text-xs sm:text-sm text-gray-600">Microsoft cloud services</p>
              </div>
              <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl sm:text-3xl">🛠️</div>
                <h4 className="font-semibold text-sm sm:text-base">Custom Models</h4>
                <p className="text-xs sm:text-sm text-gray-600">Tailored AI development</p>
              </div>
            </div>
            <div className="pt-4 sm:pt-6">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                <span className="bg-white px-2 sm:px-3 py-1 rounded-full border">AWS AI Services</span>
                <span className="bg-white px-2 sm:px-3 py-1 rounded-full border">Google Gemini</span>
                <span className="bg-white px-2 sm:px-3 py-1 rounded-full border">Hugging Face</span>
                <span className="bg-white px-2 sm:px-3 py-1 rounded-full border">TensorFlow</span>
                <span className="bg-white px-2 sm:px-3 py-1 rounded-full border">PyTorch</span>
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
              challenges and recommend the right AI solutions — whether it's
              Chatbots, Voice AI, ERP Automation, or a custom AI-driven app.
              <br />
              <br />
              Our team reviews every request carefully to provide tailored
              solutions designed to save time, reduce costs, and help you scale
              with confidence. <br />
              <br />
              Let's start building smarter solutions, together.
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

      {/* ROI Calculator Section */}
      <section className="py-[3rem] sm:py-[5rem] bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="wrapper text-center">
          <div data-aos="fade-up" className="max-w-5xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Calculate Your AI ROI Potential
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              See how much you could save with AI automation
            </p>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-8 mt-8 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 text-center">
                <div className="space-y-4 p-4 sm:p-6 bg-red-500/10 rounded-xl border border-red-500/20">
                  <h3 className="text-lg sm:text-xl font-semibold text-red-400">Current Monthly Costs</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-gray-400">Customer Service Staff</p>
                      <p className="text-xl sm:text-2xl font-bold text-white">₹5,00,000</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-gray-400">Manual Processing</p>
                      <p className="text-xl sm:text-2xl font-bold text-white">₹3,00,000</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 p-4 sm:p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-400">With AI Automation</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-gray-400">75% Cost Reduction</p>
                      <p className="text-xl sm:text-2xl font-bold text-green-400">₹2,00,000 Saved</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-gray-400">24/7 Availability</p>
                      <p className="text-lg sm:text-xl font-semibold text-green-400">∞ Uptime</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 p-4 sm:p-6 bg-green-500/10 rounded-xl border border-green-500/20">
                  <h3 className="text-lg sm:text-xl font-semibold text-green-400">Annual Savings</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-gray-400">Total Cost Reduction</p>
                      <p className="text-2xl sm:text-3xl font-bold text-white">₹24,00,000</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-gray-400">ROI Timeline</p>
                      <p className="text-lg sm:text-xl font-semibold text-white">6-12 Months</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 sm:mt-8 pt-6 border-t border-white/20">
                <p className="text-xs sm:text-sm text-gray-400 mb-4 max-w-3xl mx-auto">
                  *Calculations based on average enterprise client results. Your actual savings may vary based on implementation scope and business requirements.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto">
                  <Link to="/contact-us" className="bg-primary hover:bg-primary/90 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl">
                    Get Custom ROI Analysis
                  </Link>
                  <Link to="/services" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition-colors backdrop-blur-sm">
                    View AI Services
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 text-xs sm:text-sm">
              <div className="space-y-1 p-3 bg-white/5 rounded-lg">
                <p className="font-semibold text-white">Implementation</p>
                <p className="text-gray-400">2-16 weeks</p>
              </div>
              <div className="space-y-1 p-3 bg-white/5 rounded-lg">
                <p className="font-semibold text-white">Support</p>
                <p className="text-gray-400">24/7 monitoring</p>
              </div>
              <div className="space-y-1 p-3 bg-white/5 rounded-lg">
                <p className="font-semibold text-white">Scalability</p>
                <p className="text-gray-400">Enterprise ready</p>
              </div>
              <div className="space-y-1 p-3 bg-white/5 rounded-lg">
                <p className="font-semibold text-white">Compliance</p>
                <p className="text-gray-400">HIPAA, GDPR ready</p>
              </div>
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
              alt="Verified agency on DesignRush"
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