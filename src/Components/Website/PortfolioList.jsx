import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosLink } from "react-icons/io";
import { AiFillAppstore } from "react-icons/ai";
import { FaGlobe } from "react-icons/fa";
import HrLine from "../HrLine";
import { appPortfolio, webPortfolio } from "../../data/constant";

// Convert category names to match the keys in portfolio object
const categoryList = [
  { key: "all", name: "All", icon: <FaGlobe size={30} /> },
  {
    key: "appDevelopment",
    name: "App Development",
    icon: <AiFillAppstore size={30} />,
  },
  {
    key: "webDevelopment",
    name: "Web Development",
    icon: <FaGlobe size={30} />,
  },
];

const PortfolioList = () => {
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);

  const getAllItems = () => {
    if (selectedCategory.key === "all") {
      return [...appPortfolio, ...webPortfolio];
    }
    return selectedCategory.key === "appDevelopment"
      ? appPortfolio
      : webPortfolio;
  };

  return (
    <div className="wrapper pt-[5rem]">
      <div className="flex flex-col items-center gap-5">
        <div
          data-aos="fade-up"
          className="space-y-4 flex flex-col items-center text-center"
        >
          <p className="uppercase text-primary font-medium text-center md:text-start">
            Portfolio
          </p>
          <h3 className="section-heading">
            Some of Our Early AI-Powered Projects
          </h3>
          <HrLine />
        </div>

        <div data-aos="fade-up" className="w-full mt-3">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categoryList.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedCategory.key === category.key
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "text-gray-600 bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div
          data-aos="fade-up"
          className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full"
        >
          {getAllItems().map((item) => (
            <Link
              key={item.title}
              target="_blank"
              to={item.link}
              className="w-full sm:w-[calc(100%/2-1.25rem)] lg:w-[calc(100%/3-1.75rem)] xl:w-[calc(100%/4-1.75rem)] flex flex-col items-center bg-primary hover:bg-secondary text-white px-5 py-7 gap-3 rounded-md relative aspect-square group overflow-hidden"
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-125 group-hover:rotate-12 transition-all duration-300"
              />
              <div className="absolute text-secondary z-[1] bottom-0 left-0 w-full bg-primary p-2 flex flex-col gap-2 items-center">
                <h3 className="text-base text-center flex items-center gap-2 group-hover:underline">
                  <IoIosLink className="w-5 h-5 min-w-5" /> {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioList;
