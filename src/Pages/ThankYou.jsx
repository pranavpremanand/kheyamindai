import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import SEO from "../Components/SEO/SEO";

const ThankYou = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        type="website"
        title="Thank You | KheyaMind AI Technologies"
        description="Thank you for contacting KheyaMind AI. We have received your message and will get back to you soon."
        keywords="thank you, contact confirmation, KheyaMind AI"
        url="https://www.kheyamind.ai/thank-you"
      />
    <div className="pt-[6rem] sm:pt-[8rem] md:pt-[12rem] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-[1]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100"
          >
            <FaCheckCircle className="h-16 w-16 text-green-600" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-3xl font-extrabold text-secondary"
          >
            Thank You!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-2 text-gray-600"
          >
            Your message has been successfully sent.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-gray-500"
          >
            We appreciate your interest in KheyaMind AI. Our team will review
            your message and get back to you as soon as possible.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex justify-center"
        >
          <Link to="/" className="primary-btn">
            <IoArrowBack className="mr-2" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
};

export default ThankYou;
