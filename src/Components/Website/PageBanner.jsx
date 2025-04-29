import React from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";

const PageBanner = ({ banner, title }) => {
  return (
    <div className="pt-[5rem] md:pt-[7rem]">
      <div className="aspect-[6/4] md:aspect-[19/6] relative">
        <img
          src={banner}
          alt={title}
          className="w-full h-full object-cover object-top"
        />
        {title && (
          <div className="absolute inset-0 bg-secondary/30 z-10 w-full h-full flex items-center justify-center">
            <div
              data-aos="fade-up"
              className="flex text-white items-center text-xl gap-3"
            >
              <Link
                to="/"
                className="hover:text-primary duration-200 transition-all"
              >
                Home
              </Link>
              <MdOutlineArrowForwardIos className="-mt-1" />
              <p className="">{title}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageBanner;
