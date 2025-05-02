import React, { useState, useRef, useEffect } from "react";
import HrLine from "./HrLine";
import { IoIosArrowDown } from "react-icons/io";

const Faq = () => {
  const faqData = [
    {
      question:
        "What types of businesses can benefit from AI chatbots and automation?",
      answer:
        "Enterprises across industries including retail, finance, healthcare, and logistics.",
    },
    {
      question:
        "Can KheyaMind solutions be customized to fit our unique business processes?",
      answer:
        "Yes, all solutions are fully tailored to your workflows and goals.",
    },
    {
      question: "What's the typical turnaround time for project delivery?",
      answer:
        "Timelines vary based on project scope, but we ensure fast, reliable deployment.",
    },
    {
      question: "Do you offer post-deployment support?",
      answer:
        "Yes, all solutions come with dedicated support and maintenance plans.",
    },
    {
      question: "Is AI integration scalable as our business grows?",
      answer:
        "Absolutely — scalability is built into every solution we deliver.",
    },
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
