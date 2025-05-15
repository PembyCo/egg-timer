'use client';

import React, { useState } from "react";
import { FaFire } from "react-icons/fa";

const Header: React.FC = () => {
  const [isIconHovered, setIsIconHovered] = useState(false);
  
  return (
    <div className="w-full max-w-md flex items-center justify-center mb-8">
      <div 
        className="flex items-center gap-4 px-7 py-5 bg-white/70 backdrop-blur-sm rounded-full shadow-md"
        onMouseEnter={() => setIsIconHovered(true)}
        onMouseLeave={() => setIsIconHovered(false)}
      >
        <FaFire 
          className={`w-8 h-8 text-amber-500 transition-all duration-300 flex-shrink-0 ${
            isIconHovered ? "scale-125 text-amber-600" : ""
          } ${isIconHovered ? "animate-wiggle" : "animate-bounce-slow"}`}
        />
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600 animate-pulse pb-1 leading-relaxed">
          Egg Timer
        </h1>
      </div>
    </div>
  );
};

export default Header; 