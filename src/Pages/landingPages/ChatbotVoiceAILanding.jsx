import React from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import HrLine from "../../Components/HrLine";
import ContactForm from "../../Components/ContactForm";
import Testimonials from "../../Components/Testimonials";
import SEO from "../../Components/SEO/SEO";
import {
  FaRegThumbsUp,
  FaAward,
  FaPeopleCarry,
  FaUserFriends,
  FaCheckDouble,
  FaIndustry,
  FaUsers,
  FaRobot,
  FaHeadset,
  FaSyncAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { LuHeartHandshake } from "react-icons/lu";
import { GiCheckMark } from "react-icons/gi";
import { ImPhone } from "react-icons/im";
import aiChatbotBanner from "../../assets/images/ai-chatbot-banner.webp";
import chatbotFeature from "../../assets/images/chatbot-feature.webp";
import voiceAIFeature from "../../assets/images/voice-ai-feature.webp";
import chatbot from "../../assets/images/chatbot.webp";
import integrationDiagram from "../../assets/images/ai-integration-diagram.webp";
import { Link as Scroll } from "react-scroll";
import { companyDetails } from "../../data/constant";
import ReactPlayer from "react-player";
import bannerVid from "../../assets/vid/banner.mp4";
import Faq from "../../Components/Faq";

const ChatbotVoiceAILanding = () => {
  const services = [
    {
      id: 1,
      title: "AI Chatbot Development",
      icon: FaRobot,
      desc: "Intelligent text-based chatbots for websites, apps, and messaging platforms",
      features: [
        "Natural Language Understanding",
        "Multi-channel deployment",
        "CRM integration",
        "24/7 customer support",
        "Lead qualification",
      ],
    },
    {
      id: 2,
      title: "Voice AI Solutions",
      icon: FaHeadset,
      desc: "Human-like voice assistants for call centers and IVR systems",
      features: [
        "Speech recognition",
        "Emotion detection",
        "Payment processing",
        "Call analytics",
        "Seamless human handoff",
      ],
    },
    {
      id: 3,
      title: "Omnichannel Integration",
      icon: FaSyncAlt,
      desc: "Unified conversational AI across all customer touchpoints",
      features: [
        "Shared knowledge base",
        "Context preservation",
        "Cross-channel analytics",
        "Single dashboard management",
        "API-first architecture",
      ],
    },
    {
      id: 4,
      title: "AI Security & Compliance",
      icon: FaShieldAlt,
      desc: "Enterprise-grade security for conversational AI",
      features: [
        "Data encryption",
        "PCI compliance",
        "Access controls",
        "Audit logging",
        "GDPR-ready",
      ],
    },
  ];

  return (
    <>
      <SEO
        type="website"
        title="AI Chatbot & Voice AI Solutions | Automate Customer Support | KheyaMind AI"
        description="Transform your customer experience with intelligent AI chatbots and voice AI solutions. 24/7 automated support, lead qualification, and seamless CRM integration. Get started today!"
        keywords="AI chatbot, voice AI, customer support automation, chatbot development, voice assistant, AI customer service, automated support, conversational AI, NLP solutions"
        url="https://www.kheyamind.ai/chatbots-voice-ai"
        image={aiChatbotBanner}
        pageData={{
          faqs: [
            {
              question: "How quickly can you deploy an AI chatbot?",
              answer: "We can deploy a basic chatbot within 2-4 weeks, with full customization and integration typically taking 6-8 weeks depending on complexity."
            },
            {
              question: "Do your chatbots support multiple languages?",
              answer: "Yes, our AI chatbots support over 50 languages and can automatically detect and respond in the customer's preferred language."
            },
            {
              question: "Can the chatbot integrate with our existing CRM?",
              answer: "Absolutely! We provide seamless integration with popular CRM systems like Salesforce, HubSpot, Zoho, and custom solutions."
            },
            {
              question: "What's the difference between chatbots and voice AI?",
              answer: "Chatbots handle text-based conversations on websites and messaging platforms, while voice AI manages phone calls and voice interactions with natural speech recognition."
            }
          ]
        }}
      />
      <div className="pt-[5rem]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-[1] w-full h-full" />

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
            <p className="section-heading-2">Conversational AI Solutions</p>
            <h1 className="heading">
              Transform Customer Experiences with AI-Powered Chatbots & Voice
              Agents
            </h1>
            <p className="mt-5 text-lg">
              Deploy intelligent conversational AI that understands, engages,
              and converts customers 24/7 across all channels
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
              {/* <Link to="#demo" className="transparent-btn">
                See Demo
              </Link> */}
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
              <p className="uppercase text-primary font-medium">AI Chatbots</p>
              <h2 className="section-heading">
                Intelligent Text-Based Conversational AI
              </h2>
              <HrLine />
            </div>
            <p className="mt-4">
              Our AI chatbots deliver human-like interactions across websites,
              mobile apps, and messaging platforms. Powered by advanced NLP,
              they understand context, handle complex queries, and learn from
              every conversation.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Reduce customer service costs by up to 40%",
                "Handle 80% of routine inquiries automatically",
                "24/7 availability with instant responses",
                "Seamless integration with your CRM/helpdesk",
                "Multilingual support out of the box",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <GiCheckMark
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
              src={chatbotFeature}
              alt="AI Chatbot Features"
              className="w-full h-full aspect-video object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-20">
          <div data-aos="fade-up" className="md:order-2">
            <div className="space-y-4">
              <p className="uppercase text-primary font-medium">Voice AI</p>
              <h2 className="section-heading">
                Natural Voice Agents for Phone Systems
              </h2>
              <HrLine />
            </div>
            <p className="mt-4">
              Our voice AI solutions transform call centers with human-like
              telephone interactions that customers can't distinguish from live
              agents. Reduce costs while improving customer satisfaction.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "60% reduction in call center operational costs",
                "Emotion detection for better service",
                "PCI-compliant payment processing",
                "Accent and noise tolerant",
                "Seamless handoff to human agents",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <GiCheckMark
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
              src={voiceAIFeature}
              alt="Voice AI Features"
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
                Seamless Integration
              </p>
              <h2 className="section-heading">
                Works With Your Existing Systems
              </h2>
              <HrLine className="mx-auto" />
            </div>
            <p className="mt-4">
              Our conversational AI solutions integrate effortlessly with your
              current tech stack, ensuring minimal disruption and maximum ROI.
            </p>
          </div>

          <div data-aos="fade-up" className="mt-10">
            <img
              src={integrationDiagram}
              alt="Integration Diagram"
              className="w-full h-auto aspect-video max-w-4xl rounded-2xl object-cover mx-auto"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "CRM Integration",
                items: ["Salesforce", "HubSpot", "Zoho", "Microsoft Dynamics"],
              },
              {
                title: "Helpdesk Systems",
                items: [
                  "Zendesk",
                  "Freshdesk",
                  "ServiceNow",
                  "Jira Service Desk",
                ],
              },
              {
                title: "Communication Channels",
                items: ["WhatsApp", "Facebook", "SMS", "Email", "Live Chat"],
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
                      <GiCheckMark size={18} className="text-primary" />
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
          <p className="uppercase text-primary font-medium">Our Solutions</p>
          <h2 className="section-heading">
            Comprehensive Conversational AI Services
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
                      <GiCheckMark
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
            <h2 className="section-heading">The KheyaMind AI Advantage</h2>
            <HrLine className="mx-auto" />
          </div>

          <div className="mt-[2rem] grid sm:grid-cols-2 md:grid-cols-3 gap-7">
            <div data-aos="fade-up" className="flex flex-col gap-7">
              <div className="space-y-3">
                <div className="bg-primary w-[3.5rem] aspect-square flex justify-center items-center p-3 rounded-lg">
                  <FaRegThumbsUp size={30} className="text-white" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-lg">Proven Technology</p>
                  <p>
                    Our AI models are trained on millions of real conversations
                    across industries for unmatched accuracy.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-primary w-[3.5rem] aspect-square flex justify-center items-center p-3 rounded-lg">
                  <FaAward size={30} className="text-white" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-lg">Industry Recognition</p>
                  <p>
                    Award-winning solutions recognized for innovation and
                    business impact.
                  </p>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              className="sm:row-span-2 md:row-span-1 w-full h-full aspect-[4/3] sm:aspect-auto md:aspect-square overflow-hidden rounded-xl shadow-xl"
            >
              <img
                src={chatbot}
                alt="Why Choose Us"
                className="w-full h-full object-cover"
              />
            </div>
            <div data-aos="fade-up" className="flex flex-col gap-7">
              <div className="space-y-3">
                <div className="bg-primary w-[3.5rem] aspect-square flex justify-center items-center p-3 rounded-lg">
                  <FaPeopleCarry size={30} className="text-white" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-lg">AI Experts</p>
                  <p>
                    Team of PhDs and industry veterans with deep NLP and speech
                    recognition expertise.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-primary w-[3.5rem] aspect-square flex justify-center items-center p-3 rounded-lg">
                  <LuHeartHandshake size={30} className="text-white" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-lg">Dedicated Support</p>
                  <p>
                    24/7 monitoring and support with guaranteed response times.
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
              Ready to Transform Your Customer Experience?
            </h2>
            <p className="mt-4">
              Schedule a free consultation to discuss how our AI solutions can
              automate your customer interactions and reduce costs.
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

export default ChatbotVoiceAILanding;
