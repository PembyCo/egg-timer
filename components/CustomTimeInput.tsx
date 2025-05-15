'use client';

import React from "react";

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
          className="w-16 px-3 py-2 border border-amber-200 dark:border-amber-700 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          aria-label="Custom minutes"
        />
        <span className="text-amber-700 dark:text-amber-400">minutes</span>
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

export default CustomTimeInput; 