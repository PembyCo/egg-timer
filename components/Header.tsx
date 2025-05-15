'use client';

import React, { useState } from "react";
import { FaFire } from "react-icons/fa";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "./ThemeContext";

const Header: React.FC = () => {
  const [isIconHovered, setIsIconHovered] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div className="w-full max-w-md flex items-center justify-between mb-6 sm:mb-8 px-3 relative">
      <div 
        className="flex items-center gap-3 px-5 py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full shadow-md transition-all hover:shadow-lg flex-grow"
        onMouseEnter={() => setIsIconHovered(true)}
        onMouseLeave={() => setIsIconHovered(false)}
      >
        <FaFire 
          className={`w-6 h-6 sm:w-7 sm:h-7 text-amber-500 dark:text-amber-400 transition-all duration-300 flex-shrink-0 ${
            isIconHovered ? "scale-125 text-amber-600 dark:text-amber-500" : ""
          } ${isIconHovered ? "animate-wiggle" : "animate-bounce-slow"}`}
          aria-hidden="true"
          role="img"
          title="Fire icon"
        />
        <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600 dark:from-amber-400 dark:to-yellow-500 animate-pulse pb-1 leading-relaxed">
          Egg Timer: Perfect Eggs in Seconds
        </h1>
        
        <button 
          onClick={toggleTheme}
          className="ml-auto p-2.5 bg-white/90 dark:bg-gray-800/90 text-amber-500 dark:text-amber-400 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 border border-amber-100 dark:border-gray-700"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? 
            <FaSun className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" title="Sun icon" /> : 
            <FaMoon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" title="Moon icon" />
          }
        </button>
      </div>
    </div>
  );
};

export default Header; 