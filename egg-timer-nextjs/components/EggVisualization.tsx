'use client';

import React from "react";

interface EggVisualizationProps {
  fillPercentage: number;
}

const EggVisualization: React.FC<EggVisualizationProps> = ({ fillPercentage }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="relative w-44 h-64">
        <svg className="w-full h-full" viewBox="0 0 100 140">
          {/* Egg shape with more rounded bottom */}
          <path
            d="M50 20 C35 20 25 30 15 55 C5 85 5 110 25 125 C40 135 60 135 75 125 C95 110 95 85 85 55 C75 30 65 20 50 20"
            fill="#f3f4f6"
            stroke="#e5e7eb"
            strokeWidth="2"
            strokeLinejoin="round"
            className="dark:fill-gray-700 dark:stroke-gray-600"
          />
          <clipPath id="eggClip">
            <path d="M50 20 C35 20 25 30 15 55 C5 85 5 110 25 125 C40 135 60 135 75 125 C95 110 95 85 85 55 C75 30 65 20 50 20" />
          </clipPath>
          <rect
            x="5" 
            y={135 - (fillPercentage * 115) / 100}
            width="90"
            height="115"
            fill="url(#eggGradient)"
            clipPath="url(#eggClip)"
            style={{ transition: "y 0.1s linear" }}
          />
          <defs>
            <linearGradient id="eggGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" className="dark:[stop-color:#d97706]" />
              <stop offset="100%" stopColor="#fbbf24" className="dark:[stop-color:#f59e0b]" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default EggVisualization; 