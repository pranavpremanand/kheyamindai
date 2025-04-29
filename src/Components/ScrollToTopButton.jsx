import React, { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled more than 100vh
      const isScrolledDown = window.scrollY > window.innerHeight;
      setIsVisible(isScrolledDown);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed z-40 bottom-8 right-8 bg-secondary hover:bg-primary text-white p-3 rounded-full shadow-lg transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
      aria-label="Scroll to top"
    >
      <IoIosArrowUp size={24} />
    </button>
  );
};

export default ScrollToTopButton;
