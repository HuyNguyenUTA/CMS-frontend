'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(shouldUseDark);

    if (shouldUseDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-xl bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 shadow hover:scale-105 transition"
      aria-label="Toggle Theme"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
