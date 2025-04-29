import React from "react";
import PageBanner from "../Components/Website/PageBanner";
import banner from "../assets/images/banners/services.webp";
import Services from "../Components/Services";
import { services } from "../data/constant";
import Testimonials from "../Components/Testimonials";
import ContactForm from "../Components/ContactForm";

const OurServices = () => {
  return (
    <div>
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
