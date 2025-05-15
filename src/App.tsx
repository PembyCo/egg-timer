import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaPlay, FaPause, FaRedo, FaFire, FaCog } from "react-icons/fa";

// Timer presets
const EGG_TIMES = {
  soft: { label: "Soft", minutes: 5 },
  medium: { label: "Medium", minutes: 8 },
  hard: { label: "Hard", minutes: 11 },
} as const;

type EggType = keyof typeof EGG_TIMES | "custom";

// Header component
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

// Egg visualization component
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
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

// Custom time input component
interface CustomTimeInputProps {
  customMinutes: number;
  setCustomMinutes: (minutes: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const CustomTimeInput: React.FC<CustomTimeInputProps> = ({ 
  customMinutes, 
  setCustomMinutes, 
  onSubmit,
  inputRef 
}) => {
  return (
    <div className="mb-6">
      <form onSubmit={onSubmit} className="flex items-center justify-center gap-2">
        <input
          ref={inputRef}
          type="number"
          min="1"
          max="60"
          value={customMinutes}
          onChange={(e) => setCustomMinutes(Math.max(1, Math.min(60, parseInt(e.target.value) || 1)))}
          className="w-16 px-3 py-2 border border-amber-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Custom minutes"
        />
        <span className="text-amber-700">minutes</span>
        <button
          type="submit"
          className="px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          Set
        </button>
      </form>
    </div>
  );
};

// Main App component
const App: React.FC = () => {
  // State management
  const [selectedType, setSelectedType] = useState<EggType>("medium");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(5);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const customInputRef = useRef<HTMLInputElement>(null);
  
  // Calculate total time based on selected type
  const totalTime = selectedType === "custom" 
    ? customMinutes * 60 
    : EGG_TIMES[selectedType as keyof typeof EGG_TIMES].minutes * 60;

  // Timer effect - updates every 100ms for smooth animation
  useEffect(() => {
    let timer: number;
    if (isRunning && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 0.1));
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Timer completion effect
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      new Audio("https://www.soundjay.com/buttons/beep-01a.mp3")
        .play()
        .catch(() => {});
    }
  }, [timeLeft, isRunning]);

  // Focus custom input when shown
  useEffect(() => {
    if (showCustomInput && customInputRef.current) {
      customInputRef.current.focus();
    }
  }, [showCustomInput]);

  // Timer control handlers
  const startTimer = useCallback(() => {
    if (!isRunning && timeLeft === 0) {
      setTimeLeft(totalTime);
    }
    setIsRunning(true);
  }, [isRunning, timeLeft, totalTime]);

  const pauseTimer = useCallback(() => setIsRunning(false), []);
  
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(0);
  }, []);

  // Custom time handlers
  const handleCustomTimeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCustomInput(false);
    setSelectedType("custom");
    if (!isRunning) setTimeLeft(0);
  };

  const handleCustomButtonClick = () => {
    setShowCustomInput(true);
    if (!isRunning) setTimeLeft(0);
  };

  // Calculate values for display
  const fillPercentage = timeLeft > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;
  const displayMinutes = Math.floor(timeLeft / 60);
  const displaySeconds = Math.floor(timeLeft % 60);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col items-center p-4">
      {/* Header */}
      <Header />
      
      {/* Main Timer Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
        {/* Cooking time selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {Object.entries(EGG_TIMES).map(([type, { label, minutes }]) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type as EggType);
                setShowCustomInput(false);
                if (!isRunning) setTimeLeft(0);
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedType === type
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md"
                  : "bg-white border border-amber-200 text-amber-700 hover:bg-amber-50"
              }`}
              aria-pressed={selectedType === type}
            >
              {label} ({minutes}m)
            </button>
          ))}
          <button
            onClick={handleCustomButtonClick}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1 ${
              selectedType === "custom" && !showCustomInput
                ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md"
                : "bg-white border border-amber-200 text-amber-700 hover:bg-amber-50"
            }`}
            aria-pressed={selectedType === "custom"}
          >
            <FaCog className="w-3.5 h-3.5" /> 
            {selectedType === "custom" && !showCustomInput 
              ? `Custom (${customMinutes}m)` 
              : "Custom"
            }
          </button>
        </div>

        {/* Custom time input */}
        {showCustomInput && (
          <CustomTimeInput 
            customMinutes={customMinutes}
            setCustomMinutes={setCustomMinutes}
            onSubmit={handleCustomTimeSubmit}
            inputRef={customInputRef}
          />
        )}

        {/* Egg visualization */}
        <EggVisualization fillPercentage={fillPercentage} />

        {/* Timer display */}
        <div className="text-4xl font-mono text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600 font-bold">
          {String(displayMinutes).padStart(2, "0")}:{String(displaySeconds).padStart(2, "0")}
        </div>

        {/* Timer controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={isRunning ? pauseTimer : startTimer}
            disabled={timeLeft === 0 && isRunning}
            className="p-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600 disabled:opacity-50 disabled:from-gray-300 disabled:to-gray-300 shadow-md transition-all"
            aria-label={isRunning ? "Pause timer" : "Start timer"}
          >
            {isRunning ? <FaPause /> : <FaPlay />}
          </button>
          <button
            onClick={resetTimer}
            disabled={timeLeft === 0 && !isRunning}
            className="p-4 rounded-full bg-white border border-red-300 text-red-500 hover:bg-red-50 disabled:opacity-50 disabled:text-gray-400 disabled:border-gray-200 disabled:hover:bg-white shadow-md transition-all"
            aria-label="Reset timer"
          >
            <FaRedo />
          </button>
        </div>

        {/* Completion notification */}
        {timeLeft === 0 && isRunning && (
          <div className="mt-4 text-center text-amber-600 font-medium bg-amber-50 p-3 rounded-lg border border-amber-200 animate-pulse">
            Your egg is ready!
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
