'use client';

import { useEffect } from 'react';

// This component will run client-side to prevent flicker on theme load
export const ThemeInitializer = () => {
  useEffect(() => {
    // Check if dark mode is stored in localStorage
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    // Or check user preference if nothing is stored
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (isDarkMode || (!localStorage.getItem('theme') && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return null;
}; 