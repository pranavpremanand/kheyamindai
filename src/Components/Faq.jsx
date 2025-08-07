import React, { useState, useRef, useEffect } from "react";
import HrLine from "./HrLine";
import { IoIosArrowDown } from "react-icons/io";

const Faq = () => {
  const faqData = [
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
  ];

  return (
    <section className="wrapper pt-[5rem]">
      <div
        data-aos="fade-up"
        className="space-y-4 flex flex-col sm:items-center sm:text-center max-w-5xl mx-auto"
      >
        <p className="uppercase text-primary font-medium">FAQ</p>
        <h3 className="section-heading">Frequently Asked Questions</h3>
        <HrLine />
        <p className="pb-6">
          Find answers to common questions about our AI solutions and services
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-2">
        {faqData.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
};

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

export default Faq;
