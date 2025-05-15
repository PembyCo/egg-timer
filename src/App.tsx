import React, { useState, useEffect, useCallback } from "react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

const EGG_TIMES = {
  soft: { label: "Soft", minutes: 5 },
  medium: { label: "Medium", minutes: 8 },
  hard: { label: "Hard", minutes: 11 },
} as const;

type EggType = keyof typeof EGG_TIMES;

const App: React.FC = () => {
  const [selectedType, setSelectedType] = useState<EggType>("medium");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const totalTime = EGG_TIMES[selectedType].minutes * 60;

  useEffect(() => {
    let timer: number;
    if (isRunning && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      new Audio("https://www.soundjay.com/buttons/beep-01a.mp3")
        .play()
        .catch(() => {});
    }
  }, [timeLeft, isRunning]);

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

  const fillPercentage =
    timeLeft > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Egg Timer
        </h1>

        <div className="flex justify-center gap-2 mb-6">
          {Object.entries(EGG_TIMES).map(([type, { label, minutes }]) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type as EggType);
                if (!isRunning) setTimeLeft(0);
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedType === type
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              aria-pressed={selectedType === type}
            >
              {label} ({minutes}m)
            </button>
          ))}
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-52">
            <svg className="w-full h-full" viewBox="0 0 100 120">
              <path
                d="M50 10 C20 10 10 40 10 60 C10 90 30 110 50 110 C70 110 90 90 90 60 C90 40 80 10 50 10 Z"
                fill="#f3f4f6"
              />
              <clipPath id="eggClip">
                <path d="M50 10 C20 10 10 40 10 60 C10 90 30 110 50 110 C70 110 90 90 90 60 C90 40 80 10 50 10 Z" />
              </clipPath>
              <rect
                x="10"
                y={110 - (fillPercentage * 100) / 120}
                width="80"
                height="100"
                fill="#f59e0b"
                clipPath="url(#eggClip)"
              />
            </svg>
          </div>
        </div>

        <div className="text-4xl font-mono text-center mb-6 text-gray-800">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={isRunning ? pauseTimer : startTimer}
            disabled={timeLeft === 0 && isRunning}
            className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
            aria-label={isRunning ? "Pause timer" : "Start timer"}
          >
            {isRunning ? <FaPause /> : <FaPlay />}
          </button>
          <button
            onClick={resetTimer}
            disabled={timeLeft === 0 && !isRunning}
            className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300 transition-colors"
            aria-label="Reset timer"
          >
            <FaRedo />
          </button>
        </div>

        {timeLeft === 0 && isRunning && (
          <div className="mt-4 text-center text-green-600 font-medium">
            Your egg is ready!
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
