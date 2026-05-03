import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

const AuthLayout = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 bg-zinc-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100]">
        <button
          onClick={toggleTheme}
          className="p-2.5 sm:p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-zinc-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-slate-100 active:scale-95"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={18} className="sm:w-5 sm:h-5" /> : <Moon size={18} className="sm:w-5 sm:h-5" />}
        </button>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
