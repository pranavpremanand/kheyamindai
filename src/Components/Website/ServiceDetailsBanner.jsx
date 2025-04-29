import React from "react";

const ServiceDetailsBanner = ({ banner, title }) => {
  return (
    <div className="pt-[5rem] md:pt-[7rem]">
      <div className="aspect-[6/4] md:aspect-[19/6] relative">
        <img
          src={banner}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-secondary/40 z-10 w-full h-full flex items-center justify-center">
          <h3 data-aos="fade-up" className="heading-2 text-white">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsBanner;
