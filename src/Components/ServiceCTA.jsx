import React from "react";
import { Link } from "react-router-dom";
import { FaRocket, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { getServiceCTA } from "../utils/internalLinking";

const ServiceCTA = ({ serviceSlug, serviceName, className = "" }) => {
  const cta = getServiceCTA(serviceSlug);

  return (
    <section
      className={`bg-gradient-to-r from-primary to-secondary py-12 ${className}`}
    >
      <div className="wrapper">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Business with {serviceName}?
          </h2>
          <p className="desc mb-8 opacity-90 max-w-3xl mx-auto">
            Join hundreds of businesses that have already revolutionized their
            operations with our AI solutions. Get started today and see the
            difference intelligent automation can make.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary CTA */}
            <Link
              to="/contact-us"
              className="bg-white text-secondary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center group shadow-lg"
            >
              <FaRocket className="w-5 h-5 mr-3 group-hover:animate-pulse" />
              {cta.primary}
              <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCTA;
