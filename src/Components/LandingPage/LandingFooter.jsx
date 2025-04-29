import React from "react";
import { companyDetails, logo } from "../../data/constant";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const LandingFooter = () => {
  return (
    <div className="relative bg-primary mt-[4rem]">
      <div className="wrapper text-secondary grid justify-center sm:justify-between sm:grid-cols-[30%_auto] gap-5">
        <div className="bg-white w-full sm:h-[calc(100%+2rem)] relative z-10 px-5 py-[2rem] flex flex-col h-full gap-3 justify-center items-center">
          <img src={logo} className="w-[15rem] object-contain" alt="Logo" />
        </div>
        <div className="px-5 pb-[2rem] sm:pb-0 w-full flex flex-col justify-center items-center sm:items-end gap-4">
          <div className="flex gap-4">
            <Link
              to={companyDetails.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 flex justify-center items-center rounded-full border border-secondary"
            >
              <FaLinkedinIn className="fill-secondary" size={16} strokeWidth={1} />
            </Link>
            <Link
              to={companyDetails.instagram}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 flex justify-center items-center rounded-full border border-secondary"
            >
              <FaInstagram
                className="fill-secondary"
                size={16}
                strokeWidth={1}
              />
            </Link>
            <Link
              to={companyDetails.facebook}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 flex justify-center items-center rounded-full border border-secondary"
            >
              <FaFacebookF className="fill-secondary" size={16} strokeWidth={1} />
            </Link>
          </div>
          <p className="text-center">
            Copyright © {new Date().getFullYear()}. All rights reserved
          </p>
        </div>
      </div>
      <div className="h-[2rem] relative bottom-0 w-full bg-secondary"></div>
    </div>
  );
};

export default LandingFooter;
