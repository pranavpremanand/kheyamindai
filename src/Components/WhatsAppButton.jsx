import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { companyDetails } from "../data/constant";

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Always keep the WhatsApp button visible
      setIsVisible(true);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${companyDetails.phone.replace(
      /\D/g,
      ""
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className="fixed z-40 bottom-8 right-8 md:right-24 group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip - hidden on mobile */}
      <div
        className={`hidden md:block absolute bottom-full right-0 mb-2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap transition-all duration-200 ${
          showTooltip
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        Chat with us on WhatsApp
        {/* Tooltip arrow */}
        <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
      </div>

      {/* Pulsing effect */}
      <div className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping"></div>

      {/* Main button */}
      <button
        onClick={openWhatsApp}
        className={`relative bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp size={24} />
      </button>
    </div>
  );
};

export default WhatsAppButton;
