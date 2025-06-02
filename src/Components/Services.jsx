import React from "react";
import HrLine from "./HrLine";
import { Link } from "react-router-dom";
import { LuCircleArrowOutUpRight } from "react-icons/lu";

const Services = ({ title, heading, data }) => {
  return (
    <div id="services" className="wrapper pt-[5rem]">
      <div
        data-aos="fade-up"
        className="space-y-4 flex flex-col sm:items-center sm:text-center max-w-3xl mx-auto"
      >
        <p className="uppercase text-primary font-medium">{title}</p>
        <h3 className="section-heading">{heading}</h3>
        <HrLine />
      </div>
      <div
        data-aos="fade-up"
        className="mt-[2rem] flex flex-wrap justify-center gap-5 lg:gap-7"
      >
        {data.map((item) => (
          <Link
            to={item.detailsPage && `/services/${item.slug}`}
            key={item.id}
            className="relative sm:w-[calc(100%/2-1.25rem)] lg:w-[calc(100%/3-1.75rem)] overflow-hidden group bg-primary/10 px-5 py-10 flex flex-col items-center gap-2 rounded-lg hover:bg-primary/30 transition-all duration-200"
          >
            <div className="relative rotate-45 group-hover:rotate-0 transition-all duration-200 w-[4rem] h-[4rem] flex justify-center items-center bg-primary">
              <item.icon className="w-[2.5rem] -rotate-45 group-hover:rotate-0 transition-all duration-200 fill-white" />
            </div>
            <p className="mt-3 text-lg font-bold">{item.title}</p>
            <p className="text-center">{item.desc}</p>
            {item.detailsPage && (
              <Link
                className="absolute z-30 w-0 inset-0 group-hover:w-full group-hover:h-full bg-secondary/40 flex items-center justify-center transition-all duration-200"
                to={`/services/${item.slug}`}
              >
                <LuCircleArrowOutUpRight className="text-3xl text-white" />
              </Link>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
