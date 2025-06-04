import React from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import HrLine from "../../Components/HrLine";
import ContactForm from "../../Components/ContactForm";
import Testimonials from "../../Components/Testimonials";
import SEO from "../../Components/SEO/SEO";
import {
  FaBrain,
  FaNetworkWired,
  FaShieldAlt,
  FaCogs,
  FaCloud,
  FaRobot,
  FaUsers,
  FaIndustry,
  FaCheckDouble,
  FaUserFriends,
} from "react-icons/fa";
import { LuCircuitBoard } from "react-icons/lu";
import { GiProcessor, GiArtificialIntelligence } from "react-icons/gi";
import { ImPhone } from "react-icons/im";
import aiEnterpriseBanner from "../../assets/images/ai-enterprise-banner.webp";
import erpDashboard from "../../assets/images/erp-dashboard.webp";
import nlpTools from "../../assets/images/nlp-tools.webp";
import cloudInfra from "../../assets/images/cloud-infra.webp";
import { Link as Scroll } from "react-scroll";
import { companyDetails } from "../../data/constant";
import ReactPlayer from "react-player";
import bannerVid from "../../assets/vid/banner.mp4";
import Faq from "../../Components/Faq";

const EnterpriseAILanding = () => {
  const services = [
    {
      id: 1,
      title: "AI-Powered ERP Systems",
      icon: FaCogs,
      desc: "Transform legacy ERP with intelligent automation and predictive analytics",
      features: [
        "Demand forecasting",
        "Automated procurement",
        "Anomaly detection",
        "Process optimization",
        "Real-time dashboards",
      ],
    },
    {
      id: 2,
      title: "Custom NLP Solutions",
      icon: GiArtificialIntelligence,
      desc: "Domain-specific language models for your business needs",
      features: [
        "Semantic search engines",
        "Document intelligence",
        "Knowledge management",
        "Regulatory compliance",
        "Sentiment analysis",
      ],
    },
    {
      id: 3,
      title: "Enterprise Cloud AI",
      icon: FaCloud,
      desc: "Scalable AI infrastructure with intelligent automation",
      features: [
        "Predictive scaling",
        "Cost optimization",
        "MLOps pipelines",
        "Security automation",
        "Hybrid cloud support",
      ],
    },
    {
      id: 4,
      title: "AI Integration",
      icon: LuCircuitBoard,
      desc: "Seamlessly connect AI with your existing systems",
      features: [
        "API-first architecture",
        "Legacy system modernization",
        "Data pipeline engineering",
        "Real-time synchronization",
        "Change management",
      ],
    },
  ];

  return (
    <>
      <SEO
        type="website"
        title="Enterprise AI Solutions | Custom AI Development | ERP Integration | KheyaMind AI"
        description="Transform your enterprise with custom AI solutions. AI-powered ERP systems, NLP solutions, cloud infrastructure, and intelligent automation for large-scale businesses."
        keywords="enterprise AI, custom AI development, AI ERP systems, NLP solutions, enterprise automation, AI cloud infrastructure, business intelligence, AI transformation"
        url="https://www.kheyamind.ai/ai-enterprise-solutions"
        image={aiEnterpriseBanner}
        pageData={{
          faqs: [
            {
              question: "How do you ensure AI solutions scale with our enterprise growth?",
              answer: "Our AI solutions are built on cloud-native architecture with auto-scaling capabilities, ensuring they grow seamlessly with your business needs."
            },
            {
              question: "What's the typical ROI timeline for enterprise AI implementation?",
              answer: "Most enterprises see initial ROI within 6-12 months, with full benefits realized within 18-24 months depending on implementation scope."
            },
            {
              question: "Do you provide ongoing support and maintenance?",
              answer: "Yes, we offer comprehensive 24/7 support, regular updates, performance monitoring, and continuous optimization services."
            },
            {
              question: "Can you integrate with our existing enterprise systems?",
              answer: "Absolutely! We specialize in seamless integration with existing ERP, CRM, and other enterprise systems without disrupting operations."
            }
          ]
        }}
      />
      <div className="pt-[5rem]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-[1] w-full h-full" />
        {/* <img
          src={aiEnterpriseBanner}
          alt="Enterprise AI Banner"
          className="w-full h-full object-cover absolute inset-0"
        /> */}
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
        <div className="wrapper pt-[4rem] md:pt-[8rem] pb-[4rem] text-center text-white relative z-[2]">
          <div data-aos="fade-up" className="relative z-[1]">
            <p className="section-heading-2">Enterprise AI Solutions</p>
            <h1 className="heading">
              Custom AI & Automation for Complex Business Challenges
            </h1>
            <p className="mt-5 text-lg">
              Transform operations with tailored AI solutions for ERP systems,
              NLP tools, and intelligent cloud infrastructure
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-5 mt-8">
              <Scroll
                to="contact"
                smooth
                spy
                duration={1000}
                offset={-100}
                className="primary-btn"
              >
                Get Started
              </Scroll>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="wrapper pt-[3rem] sm:pt-0 sm:-translate-y-1/3 lg:-translate-y-1/2 relative z-[2]">
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

      {/* Solutions Section */}
      <section id="solutions" className="wrapper py-[5rem]">
        <div className="grid md:grid-cols-2 gap-10">
          <div data-aos="fade-up">
            <div className="space-y-4">
              <p className="uppercase text-primary font-medium">
                Enterprise AI
              </p>
              <h2 className="section-heading">
                Intelligent ERP Transformation
              </h2>
              <HrLine />
            </div>
            <p className="mt-4">
              Modernize legacy ERP systems with AI-powered automation that
              predicts demand, optimizes procurement, and identifies operational
              anomalies in real-time.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "95% accuracy in demand forecasting",
                "40% reduction in operational costs",
                "Automated anomaly detection",
                "Seamless SAP/Oracle integration",
                "Real-time decision support",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <GiProcessor
                    size={20}
                    className="text-primary mt-1 flex-shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            data-aos="fade-up"
            className="rounded-xl overflow-hidden shadow-xl"
          >
            <img
              src={erpDashboard}
              alt="AI-Enhanced ERP Dashboard"
              className="w-full h-full aspect-video object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-20">
          <div data-aos="fade-up" className="md:order-2">
            <div className="space-y-4">
              <p className="uppercase text-primary font-medium">NLP Tools</p>
              <h2 className="section-heading">Domain-Specific Language AI</h2>
              <HrLine />
            </div>
            <p className="mt-4">
              Custom NLP solutions trained on your proprietary data to
              understand industry terminology, extract insights, and automate
              knowledge work.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "90%+ accuracy in document understanding",
                "Automated contract analysis",
                "Regulatory compliance monitoring",
                "Multilingual support",
                "Continuous learning",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <GiProcessor
                    size={20}
                    className="text-primary mt-1 flex-shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            data-aos="fade-up"
            className="md:order-1 rounded-xl overflow-hidden shadow-xl"
          >
            <img
              src={nlpTools}
              alt="NLP Tools Interface"
              className="w-full h-full aspect-video object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-20">
          <div data-aos="fade-up">
            <div className="space-y-4">
              <p className="uppercase text-primary font-medium">
                Cloud Infrastructure
              </p>
              <h2 className="section-heading">
                AI-Optimized Cloud Architecture
              </h2>
              <HrLine />
            </div>
            <p className="mt-4">
              Intelligent cloud infrastructure that automatically scales,
              optimizes costs, and maintains security for enterprise AI
              workloads.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "60% reduction in cloud costs",
                "Predictive scaling algorithms",
                "Automated MLOps pipelines",
                "Enterprise-grade security",
                "Hybrid cloud support",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <GiProcessor
                    size={20}
                    className="text-primary mt-1 flex-shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            data-aos="fade-up"
            className="rounded-xl overflow-hidden shadow-xl"
          >
            <img
              src={cloudInfra}
              alt="Cloud Infrastructure"
              className="w-full h-full aspect-video object-cover"
            />
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="bg-gray-50 py-[5rem]">
        <div className="wrapper">
          <div data-aos="fade-up" className="text-center max-w-3xl mx-auto">
            <div className="space-y-4 flex flex-col items-center">
              <p className="uppercase text-primary font-medium">
                Enterprise Integration
              </p>
              <h2 className="section-heading">
                Designed for Complex IT Environments
              </h2>
              <HrLine className="mx-auto" />
            </div>
            <p className="mt-4">
              Our solutions are built to work within your existing enterprise
              architecture with minimal disruption.
            </p>
          </div>

          <div data-aos="fade-up" className="mt-10">
            <img
              src={aiEnterpriseBanner}
              alt="Enterprise Integration Diagram"
              className="w-full h-auto aspect-video max-w-4xl rounded-2xl object-cover mx-auto"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "ERP Systems",
                items: ["SAP", "Oracle", "Microsoft Dynamics", "NetSuite"],
              },
              {
                title: "Data Platforms",
                items: ["Snowflake", "Databricks", "Hadoop", "SQL Server"],
              },
              {
                title: "Cloud Providers",
                items: ["AWS", "Azure", "Google Cloud", "Private Cloud"],
              },
            ].map((category, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="font-bold text-xl mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2">
                      <GiProcessor size={18} className="text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="wrapper py-[5rem]">
        <div
          data-aos="fade-up"
          className="text-center space-y-4 flex flex-col items-center max-w-3xl mx-auto"
        >
          <p className="uppercase text-primary font-medium">Our Services</p>
          <h2 className="section-heading">
            End-to-End Enterprise AI Solutions
          </h2>
          <HrLine className="mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {services.map((service) => (
            <div
              key={service.id}
              data-aos="fade-up"
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <service.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <GiProcessor
                        size={16}
                        className="text-primary mt-1 flex-shrink-0"
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-[5rem]">
        <div className="wrapper">
          <div
            data-aos="fade-up"
            className="text-center flex flex-col items-center space-y-4 max-w-3xl mx-auto"
          >
            <p className="uppercase text-primary font-medium">Why Choose Us</p>
            <h2 className="section-heading">Enterprise AI Expertise</h2>
            <HrLine className="mx-auto" />
          </div>

          <div className="mt-[2rem] grid sm:grid-cols-2 md:grid-cols-3 gap-7">
            <div data-aos="fade-up" className="flex flex-col gap-7">
              <div className="space-y-3">
                <div className="bg-primary w-[3.5rem] aspect-square flex justify-center items-center p-3 rounded-lg">
                  <FaBrain size={30} className="text-white" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-lg">Domain Specialization</p>
                  <p>
                    Deep expertise in finance, healthcare, manufacturing, and
                    logistics AI solutions.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-primary w-[3.5rem] aspect-square flex justify-center items-center p-3 rounded-lg">
                  <FaShieldAlt size={30} className="text-white" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-lg">Enterprise-Grade Security</p>
                  <p>
                    SOC 2 Type II compliant with end-to-end encryption and
                    access controls.
                  </p>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              className="sm:row-span-2 md:row-span-1 w-full h-full aspect-[4/3] sm:aspect-auto md:aspect-square overflow-hidden rounded-xl shadow-xl"
            >
              <img
                src={aiEnterpriseBanner}
                alt="Enterprise AI Dashboard"
                className="w-full h-full object-cover"
              />
            </div>
            <div data-aos="fade-up" className="flex flex-col gap-7">
              <div className="space-y-3">
                <div className="bg-primary w-[3.5rem] aspect-square flex justify-center items-center p-3 rounded-lg">
                  <FaNetworkWired size={30} className="text-white" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-lg">Complex Integration</p>
                  <p>
                    Proven track record with legacy systems and hybrid
                    environments.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-primary w-[3.5rem] aspect-square flex justify-center items-center p-3 rounded-lg">
                  <FaRobot size={30} className="text-white" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-lg">Explainable AI</p>
                  <p>
                    Transparent models with audit trails for regulated
                    industries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-[5rem] text-white">
        <div className="wrapper text-center">
          <div data-aos="fade-up" className="max-w-3xl mx-auto">
            <h2 className="section-heading text-white">
              Ready to Transform Your Enterprise with AI?
            </h2>
            <p className="mt-4">
              Schedule a consultation with our AI architects to discuss your
              automation and optimization challenges.
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-5 mt-8">
              <Scroll
                smooth
                spy
                duration={1000}
                offset={-100}
                to="contact"
                className="primary-btn"
              >
                Get Started
              </Scroll>
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

      <Testimonials />
      <ContactForm />
      <Faq />
      </div>
    </>
  );
};

export default EnterpriseAILanding;
