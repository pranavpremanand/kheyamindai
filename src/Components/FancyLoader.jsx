import React from "react";
import { motion } from "framer-motion";

const FancyLoader = () => {
  // Use the site's primary color
  const primaryColor = "#FFB703";

  return (
    <div className="flex justify-center items-center py-12">
      <motion.div
        className="w-16 h-16 border-4 border-t-4 rounded-full"
        style={{
          borderColor: `${primaryColor}30`,
          borderTopColor: primaryColor,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default FancyLoader;
