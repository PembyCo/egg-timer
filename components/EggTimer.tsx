'use client';

import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaPlay, FaPause, FaRedo, FaCog } from "react-icons/fa";
import EggVisualization from "./EggVisualization";
import CustomTimeInput from "./CustomTimeInput";

// Timer presets
const EGG_TIMES = {
  soft: { label: "Soft", minutes: 5 },
  medium: { label: "Medium", minutes: 8 },
  hard: { label: "Hard", minutes: 11 },
} as const;

type EggType = keyof typeof EGG_TIMES | "custom";

const EggTimer: React.FC = () => {
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

  // Timer completion effect with better sound
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      
      // Try to play sound with fallbacks for mobile
      const playNotificationSound = async () => {
        try {
          // Create a more pleasant notification sound using Web Audio API
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          
          // Resume audio context if it's suspended (required for mobile)
          if (audioContext.state === 'suspended') {
            await audioContext.resume();
          }
          
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          // Create a pleasant bell-like sound
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 1);
        } catch (error) {
          // Fallback for mobile: vibration if available
          if ('vibrate' in navigator) {
            navigator.vibrate([200, 100, 200, 100, 200]);
          }
          console.log("Timer completed!");
        }
      };
      
      playNotificationSound();
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
    
    // Initialize audio context on user interaction (required for mobile)
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    } catch (error) {
      // Audio not supported, will fall back to vibration
    }
  }, [isRunning, timeLeft, totalTime]);

  const pauseTimer = useCallback(() => setIsRunning(false), []);
  
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(0);
  }, []);

  const handlePlayPause = useCallback(() => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  }, [isRunning, startTimer, pauseTimer]);

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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 max-w-md w-full">
      <section>
        <h2 className="sr-only">Cooking Time Selection</h2>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6 w-full">
          {Object.entries(EGG_TIMES).map(([type, { label, minutes }]) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type as EggType);
                setShowCustomInput(false);
                if (!isRunning) setTimeLeft(0);
              }}
              className={`w-full py-2 sm:py-3 rounded-lg transition-colors text-center font-medium text-base sm:text-lg ${
                selectedType === type
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md"
                  : "bg-white dark:bg-gray-700 border border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-600"
              }`}
              aria-pressed={selectedType === type}
            >
              {label} ({minutes}m)
            </button>
          ))}
          <button
            onClick={handleCustomButtonClick}
            className={`w-full py-2 sm:py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium text-base sm:text-lg ${
              selectedType === "custom" && !showCustomInput
                ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md"
                : "bg-white dark:bg-gray-700 border border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-600"
            }`}
            aria-pressed={selectedType === "custom"}
          >
            <FaCog className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" title="Settings icon" /> 
            {selectedType === "custom" && !showCustomInput 
              ? `Custom (${customMinutes}m)` 
              : "Custom"
            }
          </button>
        </div>
      </section>

      {/* Custom time input */}
      {showCustomInput && (
        <section>
          <h3 className="sr-only">Custom Timer Settings</h3>
          <CustomTimeInput 
            customMinutes={customMinutes}
            setCustomMinutes={setCustomMinutes}
            onSubmit={handleCustomTimeSubmit}
            inputRef={customInputRef}
          />
        </section>
      )}

      {/* Egg visualization */}
      <section>
        <h3 className="sr-only">Timer Visualization</h3>
        <EggVisualization fillPercentage={fillPercentage} />
      </section>

      {/* Timer display */}
      <section>
        <h3 className="sr-only">Timer Display</h3>
        <div className="text-3xl sm:text-5xl font-mono text-center mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600 dark:from-amber-400 dark:to-yellow-500 font-bold">
          {String(displayMinutes).padStart(2, "0")}:{String(displaySeconds).padStart(2, "0")}
        </div>
      </section>

      {/* Timer controls - Compact for mobile, normal for desktop */}
      <section>
        <h3 className="sr-only">Timer Controls</h3>
        <div className="flex justify-center gap-3 sm:gap-4">
          <button
            onClick={isRunning ? pauseTimer : startTimer}
            disabled={timeLeft === 0 && isRunning}
            className="p-3 sm:p-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600 disabled:opacity-50 disabled:from-gray-300 disabled:to-gray-300 shadow-md transition-all"
            aria-label={isRunning ? "Pause timer" : "Start timer"}
          >
            {isRunning ? <FaPause className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" title="Pause icon" /> : <FaPlay className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" title="Play icon" />}
          </button>
          <button
            onClick={resetTimer}
            disabled={timeLeft === 0 && !isRunning}
            className="p-3 sm:p-4 rounded-full bg-white dark:bg-gray-700 border border-red-300 dark:border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:text-gray-400 disabled:border-gray-200 disabled:hover:bg-white dark:disabled:hover:bg-gray-700 shadow-md transition-all"
            aria-label="Reset timer"
          >
            <FaRedo className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" title="Reset icon" />
          </button>
        </div>
      </section>

      {/* Completion notification */}
      {timeLeft === 0 && isRunning && (
        <section className="mt-3 sm:mt-4">
          <h3 className="sr-only">Timer Complete</h3>
          <div className="text-center text-amber-600 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-900/20 p-2 sm:p-3 rounded-lg border border-amber-200 dark:border-amber-700 animate-pulse text-sm sm:text-base">
            Your egg is ready!
          </div>
        </section>
      )}
    </div>
  );
};

export default EggTimer; 