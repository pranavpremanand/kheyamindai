import React from "react";
import banner from "../assets/images/banners/contact-us.webp";
import HrLine from "../Components/HrLine";
import { ImPhone } from "react-icons/im";
import { Link } from "react-router-dom";
import { companyDetails } from "../data/constant";
import { IoMail } from "react-icons/io5";
import MapComponent from "../Components/Website/MapComponent";
import ContactForm2 from "../Components/ContactForm2";
import SEO from "../Components/SEO/SEO";

const ContactUs = () => {
  return (
    <>
      <SEO 
        type="contact"
        title="Contact KheyaMind AI | AI Consulting Services & Enterprise Solutions"
        description="Contact KheyaMind AI for expert AI consulting services, enterprise AI solutions, and business automation. Get free consultation for AI chatbots, voice AI, and custom AI development projects in India and globally."
        keywords="AI consulting services contact, enterprise AI solutions inquiry, business automation consultation, AI implementation contact, machine learning consulting, custom AI development inquiry, AI transformation services"
        url="https://www.kheyamind.ai/contact-us"
        image={banner}
        pageData={{
          email: companyDetails.email,
          phone: companyDetails.phone,
          address: {
            streetAddress: companyDetails.address,
            addressLocality: "Dhanbad",
            addressRegion: "Jharkhand",
            postalCode: "826001",
            addressCountry: "India"
          }
        }}
      />
      <div className="pt-[4rem] sm:pt-[5rem] md:pt-[7rem] relative z-[1]">
        <div className="aspect-[6/4] md:aspect-[19/6] relative">
          <img
            src={banner}
            alt="Contact Us"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
      <div className="wrapper pt-[5rem]">
        <div
          data-aos="fade-up"
          className="space-y-4 flex flex-col md:items-center md:text-center"
        >
          <p className="uppercase text-primary font-medium">contact us</p>
          <h3 className="section-heading">
            If You Have Any Query, Feel Free To Contact Us
          </h3>
          <HrLine />
        </div>
        <div className="pt-[3rem] grid md:grid-cols-2 gap-4">
          <div data-aos="fade-up" className="flex gap-3 sm:justify-center">
            <div className="bg-primary h-full aspect-square flex justify-center items-center p-3">
              <ImPhone size={25} className="text-white" />
            </div>
            <div className="flex flex-col capitalize">
              <p className="">Call to ask any question</p>
              <Link
                to={`tel:${companyDetails.phone}`}
                className="font-semibold text-primary"
              >
                {companyDetails.phone}
              </Link>
            </div>
          </div>
          <div data-aos="fade-up" className="flex gap-3 sm:justify-center">
            <div className="bg-primary h-full aspect-square flex justify-center items-center p-3">
              <IoMail size={25} className="text-white" />
            </div>
            <div className="flex flex-col capitalize">
              <p className="">Email to get free Quote</p>
              <Link
                to={`mailto:${companyDetails.email}`}
                className="font-semibold text-primary"
              >
                {companyDetails.email}
              </Link>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          className="pt-[3rem] flex flex-col-reverse md:grid grid-cols-[45%_auto] gap-7"
        >
          <ContactForm2 />
          <MapComponent />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
