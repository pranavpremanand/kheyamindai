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

const AboutUs = () => {
  return (
    <>
      <SEO 
        type="about"
        title="About KheyaMind AI Technologies | AI Solutions Company"
        description="Learn about KheyaMind AI Technologies, a boutique AI consulting and solutions company specializing in AI-driven automation and digital products."
        keywords="About KheyaMind, AI Company, AI Solutions, Company History, AI Vision, AI Mission"
        image={banner}
        url="https://www.kheymind.ai/about-us"
      />
      <PageBanner banner={banner} title="About Us" />
      <section className="pt-[5rem] wrapper grid md:grid-cols-2 gap-7">
        <div data-aos="fade-up" className="space-y-4">
          <p className="uppercase text-primary font-medium text-start">
            About Us
          </p>
          <h3 className="section-heading">
          Welcome to KheyaMind.ai
          </h3>
          <HrLine />
          <p>
            We help businesses simplify complexity and unlock growth with intelligent, AI-powered
            solutions. Our team crafts tailored Chatbots, Voice Assistants, ERP Automations, NLP tools, and
            custom AI applications to streamline operations and elevate customer experiences.
          </p>
          <p className="font-semibold mt-4">What Sets Us Apart:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>AI-First Thinking — Innovation is the foundation of every solution</li>
            <li>Scalable Systems — Built to grow with your business</li>
            <li>Clarity-Driven Design — Intuitive and user-friendly workflows</li>
            <li>Dedicated Support — From consultation to deployment & beyond</li>
          </ul>
          <p className="mt-2">Let's build the future of work together.</p>
          <div className="flex flex-col-reverse sm:flex-row items-center gap-5 sm:gap-10 pt-5">
            <Link to="/contact-us" className="primary-btn sm:w-fit w-full">
              Request A Quote
            </Link>
            <div className="flex gap-3 sm:justify-center sm:w-fit w-full">
              <div className="bg-primary h-full aspect-square flex justify-center items-center p-3">
                <ImPhone size={25} className="text-white" />
              </div>
              <div className="flex flex-col capitalize">
                <p className="">Call to ask any question</p>
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
        <div data-aos="fade-up" className="w-full h-full">
          <img
            src={visionImg}
            className="w-full h-full object-cover object-bottom rounded-lg"
            alt="Our Vision"
          />
        </div>
      </section>
      <section className="pt-[5rem] wrapper space-y-[2.5rem]">
        <div className="space-y-4">
          <h3 className="section-heading">
            Our Mission – Tailored Solutions with Real Impact
          </h3>
          <HrLine />
          <p>
            At KheyaMind  AI, we’re on a mission to deliver tailored digital
            solutions that address the specific needs of each business. Whether
            you’re looking to implement AI to enhance customer interactions,
            optimize your workflow with an ERP system, or create a mobile app
            that boosts engagement, we are here to provide expert guidance and
            results-driven solutions.
            <br />
            Our approach is all about understanding your business first—your
            challenges, goals, and aspirations—so we can design solutions that
            are both practical and forward-thinking. We’re committed to
            providing high-quality, reliable, and scalable solutions that bring
            real value to your business, now and for years to come.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="section-heading">
            Our Vision – Driving Tomorrow's Innovation, Today
          </h3>
          <HrLine />
          <p>
            Our vision is to be a leader in leveraging technology to power
            business success. We’re driven by the belief that technology should
            not only solve problems but also unlock new opportunities. We aim to
            bridge the gap between cutting-edge innovations and practical
            applications, helping businesses thrive in an ever-changing digital
            landscape.
            <br />
            We are committed to providing the tools, insights, and strategies
            businesses need to not just keep up with trends but lead the way. By
            becoming a trusted partner in your digital transformation, we help
            you build a future that’s sustainable, scalable, and truly
            innovative.
          </p>
        </div>
      </section>
      <section className="pt-[5rem] wrapper grid md:grid-cols-2 gap-7">
        <div data-aos="fade-up" className="md:block hidden w-full h-full">
          <img
            src={missionImg}
            className="w-full h-full object-cover rounded-lg"
            alt="Our Mission"
          />
        </div>
        <div data-aos="fade-up" className="space-y-4">
          <p className="uppercase text-primary font-medium text-center">
            Why Us?
          </p>
          <h3 className="section-heading">Why Partner with KheyaMind  AI?</h3>
          <HrLine />
          <div
            data-aos="fade-up"
            className="block md:hidden w-full aspect-square"
          >
            <img
              src={missionImg}
              className="w-full h-full object-cover rounded-lg"
              alt="Our Mission"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-lg">AI-First Thinking</h4>
              <p>Innovation isn't an add-on — it's the foundation of every solution we build. We engineer AI at the core to automate, optimize, and enhance business processes.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg">Scalable Architecture</h4>
              <p>Our solutions are built for growth. Whether you start with a single chatbot or a complete ERP system, scalability ensures your technology grows with your business.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg">Clarity-Driven Design</h4>
              <p>Complexity made simple. Our team prioritizes intuitive user experiences, intelligent workflows, and solutions your team can adopt quickly.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg">Strategic Consulting</h4>
              <p>We do more than build software. We analyze your challenges, identify opportunities, and guide your business toward digital transformation with data-backed insights.</p>
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row items-center gap-5 sm:gap-10 pt-5">
            <Link to="/contact-us" className="primary-btn sm:w-fit w-full">
              Request A Quote
            </Link>
            <div className="flex gap-3 sm:justify-center sm:w-fit w-full">
              <div className="bg-primary h-full aspect-square flex justify-center items-center p-3">
                <ImPhone size={25} className="text-white" />
              </div>
              <div className="flex flex-col capitalize">
                <p className="">Call to ask any question</p>
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
      </section>
      <Testimonials />
    </>
  );
};

export default AboutUs;
