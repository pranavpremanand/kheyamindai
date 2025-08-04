import React from "react";
import banner from "../assets/images/banners/aboutus.webp";
import PageBanner from "../Components/Website/PageBanner";
import HrLine from "../Components/HrLine";
import { Link } from "react-router-dom";
import { companyDetails } from "../data/constant";
import visionImg from "../assets/images/vision.webp";
import missionImg from "../assets/images/mission.webp";
import { ImPhone } from "react-icons/im";
import Testimonials from "../Components/Testimonials";
import SEO from "../Components/SEO/SEO";
import { OptimizedImage } from "../Components/LazyImage";
import { GiCheckMark } from "react-icons/gi";

const AboutUs = () => {
  return (
    <>
      <SEO
        type="about"
        title="About KheyaMind AI Technologies | AI Solutions Company"
        description="Learn about KheyaMind AI Technologies, a boutique AI consulting and solutions company specializing in AI-driven automation and digital products."
        keywords="About KheyaMind, AI Company, AI Solutions, Company History, AI Vision, AI Mission"
        image={banner}
        url="https://www.kheyamind.ai/about-us"
      />
      <PageBanner banner={banner} title="About Us" />

      {/* Vision Section */}
      <section className="pt-[5rem] wrapper grid md:grid-cols-2 gap-7">
        <div data-aos="fade-up" className="space-y-4">
          <p className="uppercase text-primary font-medium text-center md:text-start">
            Our Vision
          </p>
          <div className="md:hidden flex flex-col pb-3">
            <OptimizedImage
              src={visionImg}
              alt="Our Vision - KheyaMind AI"
              className="w-full h-full object-cover rounded-lg"
              priority={true}
            />
          </div>
          <h3 className="section-heading">
            Pioneering AI Solutions for a Smarter Tomorrow
          </h3>
          <HrLine />
          <p>
            At KheyaMind, we envision a future where AI technology seamlessly
            enhances human capabilities across industries. Our mission is to be at
            the forefront of this transformation, developing innovative AI
            solutions that drive efficiency, growth, and positive change.
          </p>
          <div className="grid grid-cols-2 gap-5 pt-5">
            {[
              "Global Impact",
              "Ethical AI",
              "Innovation First",
              "Client Success",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <GiCheckMark size={25} className="text-primary" />
                <p>{item}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col-reverse sm:flex-row items-center gap-5 sm:gap-10 pt-5">
            <Link to="/contact-us" className="primary-btn sm:w-fit w-full">
              Get Started
            </Link>
            <div className="flex gap-3 sm:justify-center sm:w-fit w-full">
              <div className="bg-primary h-full aspect-square flex justify-center items-center p-3">
                <ImPhone size={25} className="text-white" />
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
            src={visionImg}
            alt="Our Vision - KheyaMind AI"
            className="h-full w-full object-cover rounded-lg"
            priority={true}
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="pt-[5rem] wrapper grid md:grid-cols-2 gap-7">
        <div data-aos="fade-up" className="md:block hidden w-full h-full">
          <OptimizedImage
            src={missionImg}
            alt="Our Mission - KheyaMind AI"
            className="w-full h-full object-cover rounded-lg"
            priority={true}
          />
        </div>
        <div data-aos="fade-up" className="space-y-4">
          <p className="uppercase text-primary font-medium text-center">
            Why Us?
          </p>
          <h3 className="section-heading">Why Partner with KheyaMind AI?</h3>
          <HrLine />
          <div
            data-aos="fade-up"
            className="block md:hidden w-full aspect-square"
          >
            <OptimizedImage
              src={missionImg}
              alt="Our Mission - KheyaMind AI"
              className="w-full h-full object-cover rounded-lg"
              priority={true}
            />
          </div>
          <p>
            We combine deep technical expertise with industry knowledge to deliver
            AI solutions that create real business value. Our approach is
            collaborative, transparent, and focused on your success.
          </p>
          <div className="grid grid-cols-2 gap-5 pt-5">
            {[
              "Expert Team",
              "Custom Solutions",
              "Rapid Deployment",
              "Ongoing Support",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <GiCheckMark size={25} className="text-primary" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
};

export default AboutUs;
