import React from "react";
import ReactPlayer from "react-player";
import bannerVid from "../assets/vid/banner.mp4";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import HrLine from "../Components/HrLine";
import {
  appDevelopmentServices,
  companyDetails,
  webDevelopmentServices,
} from "../data/constant";
import aboutImg from "../assets/images/about.webp";
import whyChooseImg from "../assets/images/whychooseus.webp";
import Services from "../Components/Services";
import ContactForm from "../Components/ContactForm";
import { FaAward, FaCheckDouble, FaIndustry, FaRegThumbsUp, FaUserFriends, FaUsers } from "react-icons/fa";
import { LuHeartHandshake } from "react-icons/lu";
import { GiCheckMark } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";
import Testimonials from "../Components/Testimonials";
import webAboutImg from "../assets/images/web-dev-about.webp";
import appAboutImg from "../assets/images/app-dev-about.webp";
import ContactForm2 from "../Components/ContactForm2";
import { TiArrowBack } from "react-icons/ti";
import { ImPhone } from "react-icons/im";
import Portfolio from "../Components/LandingPage/Portfolio";
import { Link as Scroll } from "react-scroll";

const LandingPage = ({ page }) => {
  const isWeb = page === "web";
  return (
    <div id="banner" className="pt-[5rem]">
      <section className="relative min-h-screen flex items-center justify-center bg-black/30">
        <div className="pt-[4rem] md:pt-[8rem] pb-[4rem]">
          <div
            data-aos="fade-up"
            className="wrapper flex flex-col text-center text-white gap-5 justify-center h-full"
          >
            <p className="section-heading">Welcome to KheyaMind  AI Pvt Ltd</p>
            <h1 className="heading">
              {isWeb
                ? "Websites Designed to Engage, Convert, and Delight"
                : "Seamless Apps That Empower Your Business"}
            </h1>
            <div className="flex sm:flex-row flex-col justify-center gap-5 mt-5">
              <Link to="/about-us" className="primary-btn">
                Learn More
              </Link>
              <Scroll
                smooth
                spy
                offset={-80}
                to="contact"
                className="transparent-btn"
              >
                Contact Us
              </Scroll>
            </div>
          </div>
        </div>
        <div className="">
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
              zIndex: -1,
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
        </div>
      </section>
      <div className="wrapper pt-[3rem] sm:pt-0 sm:-translate-y-1/3 lg:-translate-y-1/2">
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

      <div className="pt-[2rem] wrapper flex flex-col-reverse md:grid grid-cols-[auto_55%] gap-7">
        <div className="">
          <ContactForm2 />
        </div>
        <div data-aos="fade-up">
          <div className="space-y-4 text-start">
            <p className="uppercase text-primary font-medium">Book a Free Consultation</p>
            <h3 className="section-heading">
              Ready to Get Started? Schedule a Free Consultation with Us
            </h3>
            <HrLine />
          </div>
          <div className="mt-5 grid sm:grid-cols-2 gap-3 sm:gap-5">
            <div className="">
              <TiArrowBack size={25} className="inline -mt-2 text-primary" />
              <span className="font-bold ml-2">
                Consultation within 24 hours
              </span>
            </div>
            <div className="">
              <ImPhone size={20} className="inline -mt-2 text-primary" />
              <span className="font-bold ml-2">
                Free phone consultation available
              </span>
            </div>
          </div>
          <p className="mt-5">
            We’re excited to help you get started with a free consultation! To
            make the most of our time together, please provide a bit of
            information about your project or needs. Share any specific goals or
            challenges you’re facing, and we’ll tailor the consultation to help
            you take the next steps with confidence.
          </p>
        </div>
      </div>

      <section id="about" className="pt-[5rem]">
        <div className="wrapper grid md:grid-cols-2 gap-7">
          <div data-aos="fade-up" className="space-y-4">
            <p className="uppercase text-primary font-medium text-center md:text-start">
              {isWeb ? "Web Development" : "App Development"}
            </p>
            <div className="md:hidden flex flex-col pb-3">
              <img
                src={aboutImg}
                alt="About Us"
                className="h-full w-full aspect-video object-cover rounded-xl"
              />
            </div>
            <h3 className="section-heading">
              {isWeb
                ? "Transforming Digital Presence with Innovative Website Design and Development."
                : "Revolutionizing Mobile App Development to Drive Business Growth."}
            </h3>
            <HrLine />
            <p>
              {isWeb
                ? "At KheyaMind  AI Pvt Ltd, we specialize in creating high-performance, user-centric websites that deliver exceptional results. From conceptualization to deployment, our expert team provides innovative web development solutions that empower businesses to expand their digital presence, engage customers, and drive growth."
                : "KheyaMind  AI Pvt Ltd offers comprehensive mobile app development services that deliver tailored, seamless, and intuitive solutions. From ideation to launch, we create innovative mobile apps that empower businesses to enhance user experiences, drive engagement, and scale globally."}
            </p>
            <div className="grid grid-cols-2 gap-5 pt-5">
              {[
                "Award Winning",
                "24/7 Support",
                "Professional Staff",
                "Fair Prices",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <GiCheckMark size={25} className="text-primary" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col-reverse sm:flex-row items-center gap-5 sm:gap-10 pt-5">
              <div className="flex gap-3 sm:justify-center sm:w-fit w-full">
                <div className="bg-primary h-full aspect-square flex justify-center items-center p-3">
                  <BiSupport size={25} className="text-white" />
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
          <div data-aos="fade-up" className="hidden md:flex flex-col">
            <img
              src={isWeb ? webAboutImg : appAboutImg}
              alt="About Us"
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
        </div>
      </section>
      <section className="wrapper pt-[5rem]">
        <div
          data-aos="fade-up"
          className="space-y-4 flex flex-col sm:items-center sm:text-center max-w-2xl mx-auto"
        >
          <p className="uppercase text-primary font-medium">Why Choose Us</p>
          <h3 className="section-heading">
            We Are Here to Grow Your Business Exponentially
          </h3>
          <HrLine />
        </div>
        <div className="mt-[2rem] grid sm:grid-cols-2 md:grid-cols-3 gap-7">
          <div data-aos="fade-up" className="flex flex-col gap-7">
            <div className="space-y-3">
              <div className="bg-primary w-[3.5rem] aspect-square flex justify-center items-center p-3">
                <FaRegThumbsUp size={30} className="text-white" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg">Best In Industry</p>
                <p>
                  We are recognized as a leader in delivering top-notch IT
                  solutions, trusted by businesses worldwide for our excellence
                  and innovation.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-primary w-[3.5rem] aspect-square flex justify-center items-center p-3">
                <FaAward size={30} className="text-white" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg">Award Winning</p>
                <p>
                  With a proven track record of success, KheyaMind  AI has been
                  honored with multiple industry awards for innovation and
                  outstanding service.
                </p>
              </div>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="sm:row-span-2 md:row-span-1 w-full h-full aspect-[4/3] sm:aspect-auto md:aspect-square overflow-hidden rounded-xl"
          >
            <img
              src={whyChooseImg}
              alt="Why Choose Us"
              className="md:aspect-[2/3] w-full h-full object-cover object-bottom"
            />
          </div>
          <div data-aos="fade-up" className="flex flex-col gap-7">
            <div className="space-y-3">
              <div className="bg-primary w-[3.5rem] aspect-square flex justify-center items-center p-3">
                <FaPeopleGroup size={30} className="text-white" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg">Professional Staff</p>
                <p>
                  Our team of skilled professionals brings unmatched expertise
                  and dedication, ensuring every project exceeds expectations.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-primary w-[3.5rem] aspect-square flex justify-center items-center p-3">
                <LuHeartHandshake size={30} className="text-white" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg">24/7 Support</p>
                <p>
                  Our dedicated support team is available around the clock to
                  ensure seamless operations and quick resolution of your
                  queries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Services
        title={
          isWeb
            ? "our web development services"
            : "our app development services"
        }
        heading={
          isWeb
            ? "Empowering Your Business with Innovative Web Solutions"
            : "Custom App Development Solutions for Business Success"
        }
        data={isWeb ? webDevelopmentServices : appDevelopmentServices}
      />
      <Portfolio page={page} />
      <Testimonials />
      <ContactForm />
    </div>
  );
};

export default LandingPage;
