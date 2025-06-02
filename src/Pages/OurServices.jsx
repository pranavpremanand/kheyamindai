import React from "react";
import PageBanner from "../Components/Website/PageBanner";
import banner from "../assets/images/banners/services.webp";
import Services from "../Components/Services";
import { services } from "../data/constant";
import Testimonials from "../Components/Testimonials";
import ContactForm from "../Components/ContactForm";
import SEO from "../Components/SEO/SEO";

const OurServices = () => {
  return (
    <div>
      <SEO 
        type="service"
        title="AI Services | Chatbots, Voice AI & Automation Solutions | KheyaMind AI"
        description="Explore KheyaMind AI's comprehensive suite of AI services including chatbots, voice assistants, ERP automation, and custom AI solutions for businesses."
        keywords="AI Services, Chatbot Development, Voice AI, ERP Automation, NLP Solutions, AI Consulting"
        image={banner}
        pageData={{
          title: "AI Services by KheyaMind",
          description: "Custom IT Solutions for Your Successful Business with AI-powered automation, chatbots, and voice assistants."
        }}
        url="https://www.kheymind.ai/services"
      />
      <PageBanner banner={banner} title="Our Services" />
      <Services
        data={services}
        title="Our Services"
        heading="Custom IT Solutions for Your Successful Business"
      />
      <Testimonials />
      <ContactForm />
    </div>
  );
};

export default OurServices;
