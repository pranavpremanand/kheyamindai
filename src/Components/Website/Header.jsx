import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { companyDetails, logo, LogoSvg } from "../../data/constant";
import { Divide as Hamburger } from "hamburger-react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { IoClose, IoMail } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { ImPhone } from "react-icons/im";

export const websiteLinks = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "About Us", path: "/about-us" },
  { id: 3, name: "Services", path: "/services" },
  { id: 4, name: "Blogs", path: "/blogs" },
  //   { id: 5, name: "Contact Us", path: "/contact-us" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <div className="fixed top-0 left-0 w-full max-w-[100vw] z-[999] bg-white shadow-sm">
      <div className="py-3 hidden sm:flex bg-secondary text-white">
        <div className="wrapper w-full flex items-center justify-between gap-4 md:gap-10">
          <div className="flex flex-row items-center gap-7">
            <div className="flex items-center gap-2">
              <IoMail size={20} className="fill-white text-secondary" />
              <Link to={`mailto:${companyDetails.email}`}>
                {companyDetails.email}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <ImPhone size={18} className="fill-white text-secondary" />
              <Link to={`tel:${companyDetails.phone}`}>
                {companyDetails.phone}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to={companyDetails.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 flex hover:bg-primary transition-all duration-200 justify-center items-center rounded-full border border-white"
            >
              <FaLinkedinIn className="fill-white" size={16} strokeWidth={1} />
            </Link>
            <Link
              to={companyDetails.instagram}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 flex hover:bg-primary transition-all duration-200 justify-center items-center rounded-full border border-white"
            >
              <FaInstagram
                className="fill-white text-secondary"
                size={16}
                strokeWidth={1}
              />
            </Link>
            <Link
              to={companyDetails.facebook}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 flex hover:bg-primary transition-all duration-200 justify-center items-center rounded-full border border-white"
            >
              <FaFacebookF className="fill-white" size={16} strokeWidth={1} />
            </Link>
          </div>
        </div>
      </div>
      <div className="py-4 bg-white">
        <div className="wrapper flex items-center justify-between gap-10">
          <Link to="/">
            {/* <img
              src={logo}
              alt="logo"
              className="w-[6.5rem] md:w-[8rem] object-contain"
            /> */}
            <LogoSvg className="w-[9rem] md:w-[180px] object-contain" />
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {websiteLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                className={`link ${
                  pathname === link.path && "font-bold text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link className="primary-btn" to="/contact-us">
              Contact Us
            </Link>
          </div>
          <div
            className="block md:hidden justify-self-end"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Hamburger
              color="#000000"
              size="26"
              toggled={isOpen}
              rounded
              toggle={setIsOpen}
            />
          </div>
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        direction="right"
        className="z-10 p-2"
      >
        <div className="mb-6 flex items-center justify-between px-[.7rem] py-[.4rem]">
          <LogoSvg className="h-[2rem] object-contain" />
          <button onClick={() => setIsOpen(false)}>
            <IoClose size={28} />
          </button>
        </div>
        <div className="py-4 px-7 flex flex-col gap-4 text-black">
          {websiteLinks.map((link) => (
            <Link
              onClick={() => setIsOpen(false)}
              key={link.name}
              to={link.path}
              className="text-2xl font-medium"
            >
              {link.name}
            </Link>
          ))}
          <Link
            onClick={() => setIsOpen(false)}
            to="/contact-us"
            className="text-2xl font-medium"
          >
            Contact Us
          </Link>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
