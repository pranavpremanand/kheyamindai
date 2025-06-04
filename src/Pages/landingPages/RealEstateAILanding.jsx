import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import HrLine from "../../Components/HrLine";
import ContactForm from "../../Components/ContactForm";
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
  FaCogs,
  FaShieldAlt,
} from "react-icons/fa";
import { LuHeartHandshake } from "react-icons/lu";
import { GiCheckMark } from "react-icons/gi";
import { ImPhone } from "react-icons/im";
import { MdIntegrationInstructions } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Link as Scroll } from "react-scroll";
import { companyDetails } from "../../data/constant";
import ReactPlayer from "react-player";
import bannerVid from "../../assets/vid/banner.mp4";
import { useKeenSlider } from "keen-slider/react";

// You'll need to add these images to your assets folder
// import realEstateAI from "../../assets/images/real-estate-ai.webp";
import realEstateAssistant from "../../assets/images/real-estate-assistant.webp";
import propertyManagement from "../../assets/images/property-management.webp";
import realEstate from "../../assets/images/real-estate-ai.webp";

// FAQ Item Component
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      data-aos="fade-up"
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <button
        className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h4 className="font-semibold">{question}</h4>
        <span
          className={`text-primary transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <IoIosArrowDown size={20} />
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className="p-5 pt-3 border-t">
          <p className="text-gray-700">{answer}</p>
        </div>
      </div>
    </div>
  );
};

// Custom Testimonials Component with Slider
const CustomTestimonials = () => {
  const realEstateTestimonials = [
    {
      name: "Raj Kapoor",
      designation: "CEO, Horizon Properties",
      image: null, // We'll use initials instead
      initials: "RK",
      review:
        "Implementing KheyaMind's AI solutions has transformed how our agents work. Administrative tasks that used to take hours now happen automatically, and our team can focus on building relationships and closing deals. The ROI has been remarkable.",
    },
    {
      name: "Sarah Chen",
      designation: "Operations Director, GlobalHomes",
      image: null,
      initials: "SC",
      review:
        "The property management virtual assistant has been a game-changer for our operations. Tenant inquiries are handled instantly, maintenance is more efficient, and our property managers can handle 30% more units without added stress.",
    },
    {
      name: "Michael Rodriguez",
      designation: "Broker Owner, Premier Realty Group",
      image: null,
      initials: "MR",
      review:
        "As a mid-sized brokerage, we couldn't afford enterprise-level AI solutions until KheyaMind. Their tailored approach gave us the same capabilities as larger competitors at a price point that works for our business. Our lead conversion has increased by 28%.",
    },
    {
      name: "Jennifer Taylor",
      designation: "Marketing Director, Urban Living Realty",
      image: null,
      initials: "JT",
      review:
        "The AI-generated property descriptions and marketing content have elevated our listings. What used to take our team hours to create is now done in seconds, with better results. Our properties are getting more attention and selling faster.",
    },
    {
      name: "David Wilson",
      designation: "CTO, NextGen Property Management",
      image: null,
      initials: "DW",
      review:
        "Integration with our existing systems was seamless. KheyaMind's team understood our technical requirements and delivered a solution that works perfectly with our CRM and property management software. The transition was smooth and the results immediate.",
    },
  ];

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      breakpoints: {
        "(min-width: 600px)": {
          slides: { perView: 2, spacing: 10 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 3, spacing: 10 },
        },
      },
      slides: { perView: 1, spacing: 10 },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div data-aos="fade-up" className="keen-slider mt-[2rem]" ref={sliderRef}>
      {realEstateTestimonials.map((item) => (
        <div
          key={item.name}
          className="keen-slider__slide bg-primary/10 rounded-lg overflow-hidden"
        >
          <div className="flex items-center gap-2 px-5 pt-5 pb-3">
            {item.image ? (
              <img
                src={item.image}
                className="w-[3.5rem] min-w-[3.5rem] h-[3.5rem] rounded-full bg-primary"
                alt={`${item.name} testimonial`}
              />
            ) : (
              <div className="w-[3.5rem] min-w-[3.5rem] h-[3.5rem] rounded-full bg-primary flex items-center justify-center text-white font-bold">
                {item.initials}
              </div>
            )}
            <div className="space-y-1">
              <p className="font-bold text-primary">{item.name}</p>
              <p>{item.designation}</p>
            </div>
          </div>
          <hr className="border-2" />
          <p className="pt-3 px-5 pb-5">{item.review}</p>
        </div>
      ))}
    </div>
  );
};

const RealEstateAILanding = () => {
  const services = [
    {
      id: 1,
      title: "AI Solution Development",
      icon: FaRobot,
      desc: "Custom AI development tailored for real estate operations",
      features: [
        "Lead qualification algorithms",
        "Personalized recommendation engines",
        "Property valuation models",
        "Smart document processing",
        "Custom chatbots and voice agents",
      ],
    },
    {
      id: 2,
      title: "Setup & Activation",
      icon: FaCogs,
      desc: "Streamlined implementation for quick results",
      features: [
        "Data integration with your systems",
        "Custom training for your market",
        "Workflow optimization",
        "Agent onboarding and training",
        "Performance monitoring",
      ],
    },
    {
      id: 3,
      title: "Technical Integration",
      icon: MdIntegrationInstructions,
      desc: "Seamless connection to your tech ecosystem",
      features: [
        "API connections to existing platforms",
        "Mobile app integration",
        "Website embedding",
        "Cloud deployment",
        "Continuous updates",
      ],
    },
    {
      id: 4,
      title: "AI Analytics & Compliance",
      icon: FaShieldAlt,
      desc: "Ensuring performance and compliance",
      features: [
        "Performance monitoring",
        "Data security protocols",
        "Privacy compliance",
        "Continuous improvement",
        "Regulatory adherence",
      ],
    },
  ];

  const faqs = [
    {
      question: "What makes AI important for real estate operations?",
      answer:
        "AI automates repetitive tasks, enhances decision-making with data analysis, provides 24/7 client engagement, and helps agents and property managers focus on high-value activities instead of administrative work.",
    },
    {
      question:
        "Can KheyaMind solutions be customized to fit our unique business processes?",
      answer:
        "Yes, our AI systems are designed to adapt to your specific workflows, branding, and business requirements. We conduct a thorough discovery process to ensure the solution fits your exact needs.",
    },
    {
      question:
        "What's the typical timeframe for implementing your real estate AI solutions?",
      answer:
        "Most implementations are completed within 2-4 weeks, with initial results visible in the first month of operation. Our phased approach ensures minimal disruption to your business.",
    },
    {
      question: "Do you offer integration support?",
      answer:
        "Yes, our technical team handles all aspects of integration with your existing CRM, property management software, and communication channels to ensure a seamless experience.",
    },
    {
      question: "Is AI suitable for smaller real estate businesses?",
      answer:
        "Absolutely. We offer scalable solutions that provide significant benefits to brokerages and property management companies of all sizes, with pricing models designed to deliver ROI regardless of your company scale.",
    },
  ];

  return (
    <>
      <SEO
        type="website"
        title="Real Estate AI Solutions | Property Management Automation | KheyaMind AI"
        description="Revolutionize your real estate business with AI-powered lead qualification, property management automation, and intelligent customer support. Boost sales and efficiency."
        keywords="real estate AI, property management automation, real estate chatbot, lead qualification AI, property search AI, real estate CRM, automated property management"
        url="https://www.kheyamind.ai/real-estate-ai-solutions"
        image={realEstate}
        pageData={{
          faqs: faqs
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
          <div data-aos="fade-up" className="space-y-3 relative z-[1]">
            <p className="section-heading-2">Real Estate AI Solutions</p>
            <h1 className="heading">
              Transform Real Estate Operations with AI-Powered Analytics &
              Automation
            </h1>
            <p className="mt-5 text-lg">
              Boost agent productivity, streamline property management, and
              drive data-backed decisions with KheyaMind's intelligent solutions
              for real estate professionals.
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
            className="bg-primary w-full text-white flex gap-3 justify-center p-4"
          >
            <div className="bg-white h-full aspect-square flex justify-center items-center p-2">
              <FaUserFriends size={50} className="text-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-base !leading-tight">
                Increased Agent Productivity
              </p>
              <h3 className="heading-2 md:!text-4xl">
                <CountUp
                  end={30}
                  suffix="%"
                  duration={3}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h3>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="bg-white w-full text-primary flex gap-3 justify-center p-4"
          >
            <div className="bg-primary h-full aspect-square flex justify-center items-center p-2">
              <FaCheckDouble size={45} className="text-white" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-base !leading-tight">
                Faster Document Processing
              </p>
              <h3 className="heading-2 md:!text-4xl text-secondary">
                <CountUp
                  end={4}
                  suffix="X"
                  duration={3}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h3>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="bg-primary w-full text-white flex gap-3 justify-center p-4"
          >
            <div className="bg-white h-full aspect-square flex justify-center items-center p-2">
              <FaIndustry size={50} className="text-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-base !leading-tight">
                Lead Conversion Improvement
              </p>
              <h3 className="heading-2 md:!text-4xl">
                <CountUp
                  end={2}
                  suffix="X"
                  duration={3}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h3>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="bg-white w-full text-primary flex gap-3 justify-center p-4"
          >
            <div className="bg-primary h-full aspect-square flex justify-center items-center p-2">
              <FaUsers size={50} className="text-white" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-base !leading-tight">
                Reduced Administrative Work
              </p>
              <h3 className="heading-2 md:!text-4xl text-secondary">
                <CountUp
                  end={41}
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
                Real Estate AI
              </p>
              <h2 className="section-heading">
                Intelligent Text-Based Conversational AI
              </h2>
              <HrLine />
            </div>
            <p className="mt-4">
              Our AI-powered Real Estate Assistant handles routine inquiries,
              qualifies leads, and schedules viewings – all without agent
              intervention. Generate compelling property descriptions and
              marketing copy in seconds while maintaining your brand voice.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Automate lead qualification and follow-up sequences",
                "Generate professional property descriptions instantly",
                "Extract key data from real estate documents",
                "Provide 24/7 property information to prospects",
                "Streamline appointment scheduling",
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
              src={realEstateAssistant}
              alt="Agent looking at property listings with AI assistant interface on tablet"
              className="w-full h-full aspect-video object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-20">
          <div data-aos="fade-up" className="md:order-2">
            <div className="space-y-4">
              <p className="uppercase text-primary font-medium">
                Property Management
              </p>
              <h2 className="section-heading">
                Natural Voice Agents for Property Management
              </h2>
              <HrLine />
            </div>
            <p className="mt-4">
              Voice-enabled AI assistants handle tenant inquiries, maintenance
              requests, and payment reminders with natural conversation. Free
              your property managers from routine calls and help them focus on
              high-value tasks.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Respond to common tenant questions instantly",
                "Schedule and coordinate maintenance visits",
                "Send automated payment and lease reminders",
                "Escalate complex issues to human managers when needed",
                "Provide 24/7 emergency response protocols",
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
              src={propertyManagement}
              alt="Property manager interacting with voice assistant dashboard"
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
              Our AI solutions seamlessly integrate with your existing real
              estate tech stack, enhancing your tools without disrupting your
              workflows.
            </p>
          </div>

          <div data-aos="fade-up" className="mt-10">
            <img
              src={realEstate}
              alt="Real estate agent using AI tools on a mobile"
              className="w-full h-auto aspect-video max-w-4xl rounded-2xl object-cover mx-auto"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "CRM Integration",
                items: [
                  "Salesforce",
                  "HubSpot",
                  "Propertybase",
                  "Custom CRM Solutions",
                ],
              },
              {
                title: "Property Systems",
                items: [
                  "MLS Platforms",
                  "Zillow",
                  "PropertyGuru",
                  "Management Software",
                ],
              },
              {
                title: "Communication Channels",
                items: ["Website", "WhatsApp", "Email", "Phone"],
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
            Comprehensive Real Estate AI Services
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
                    Purpose-built AI specifically designed for real estate
                    workflows, backed by advanced machine learning models that
                    improve over time.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-primary w-[3.5rem] aspect-square flex justify-center items-center p-3 rounded-lg">
                  <FaAward size={30} className="text-white" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-lg">Integration</p>
                  <p>
                    Seamless integration with your existing real estate systems
                    and processes, requiring minimal disruption to your
                    operations.
                  </p>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              className="sm:row-span-2 md:row-span-1 w-full h-full aspect-[4/3] sm:aspect-auto md:aspect-square overflow-hidden rounded-xl shadow-xl"
            >
              <img
                src={realEstate}
                alt="Real estate agent using AI tools on a mobile"
                className="w-full h-full object-cover"
              />
            </div>
            <div data-aos="fade-up" className="flex flex-col gap-7">
              <div className="space-y-3">
                <div className="bg-primary w-[3.5rem] aspect-square flex justify-center items-center p-3 rounded-lg">
                  <FaPeopleCarry size={30} className="text-white" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-lg">Support</p>
                  <p>
                    Dedicated AI specialists to ensure successful implementation
                    and continuous optimization of your real estate AI tools.
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
                    Our specialized team provides ongoing assistance to maximize
                    your ROI and adapt to changing business needs.
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
              Ready to Transform Your Real Estate Business?
            </h2>
            <p className="mt-4">
              Schedule a free consultation to discuss how KheyaMind AI can
              revolutionize your operations.
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
                Book a Demo
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

      {/* Testimonials Section with Slider */}
      <section className="wrapper pt-[5rem]">
        <div
          data-aos="fade-up"
          className="space-y-4 flex flex-col sm:items-center sm:text-center max-w-2xl mx-auto"
        >
          <p className="uppercase text-primary font-medium">testimonials</p>
          <h3 className="section-heading">
            What Our Clients Say About Our Real Estate Solutions
          </h3>
          <HrLine />
        </div>
        <CustomTestimonials />
      </section>

      {/* Contact Form */}
      <ContactForm />
      
      {/* Custom FAQ Section */}
      <section className="wrapper pt-[5rem]">
        <div
          data-aos="fade-up"
          className="space-y-4 flex flex-col sm:items-center sm:text-center max-w-5xl mx-auto"
        >
          <p className="uppercase text-primary font-medium">FAQ</p>
          <h3 className="section-heading">Frequently Asked Questions</h3>
          <HrLine />
          <p className="pb-6">
            Find answers to common questions about our Real Estate AI solutions
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-2">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>
      </div>
    </>
  );
};

export default RealEstateAILanding;
