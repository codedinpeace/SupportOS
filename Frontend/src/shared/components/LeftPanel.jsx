import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BriefcaseMedical, ShieldCheck, Headphones, User, Settings, HelpCircle, LogOut, Sun, Moon } from 'lucide-react';

const LeftPanel = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  // Theme logic
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

  const handleLogout = () => {
    // TODO: Add real logout logic (clear tokens, etc.)
    navigate('/login');
  };

  const navItems = [
    { id: 'admin', label: 'Admin', path: '/admin', icon: ShieldCheck },
    { id: 'agent', label: 'Agent', path: '/agent', icon: Headphones },
    { id: 'customer', label: 'Customer', path: '/customer', icon: User },
  ];

  return (
    <div className="w-64 h-screen bg-white dark:bg-[#0B1120] border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between py-6 shrink-0">
      <div>
        {/* Logo Section */}
        <div className="px-6 mb-10 flex items-center gap-3">
          <div className="bg-slate-200 text-slate-900 p-1.5 rounded-lg">
            <BriefcaseMedical size={20} />
          </div>
          <div>
            <h1 className="text-slate-900 dark:text-white font-bold text-lg leading-tight">SupportOS</h1>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 font-medium tracking-wider uppercase">Clinical Efficiency</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors relative ${
                  isActive
                    ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800/50'
                    : 'text-slate-400 dark:text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:bg-slate-800/30'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-300" />
                  )}
                  <item.icon size={18} className={isActive ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'} />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Links */}
      <div className="px-6 space-y-4">
        <div className="w-full h-px bg-slate-100 dark:bg-slate-800 mb-6"></div>
        <button className="flex items-center gap-3 text-sm font-medium text-slate-400 dark:text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 transition-colors w-full">
          <Settings size={18} className="text-slate-400 dark:text-slate-500" />
          Settings
        </button>
        <button className="flex items-center gap-3 text-sm font-medium text-slate-400 dark:text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 transition-colors w-full">
          <HelpCircle size={18} className="text-slate-400 dark:text-slate-500" />
          Help
        </button>
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="flex items-center justify-between w-full text-sm font-medium text-slate-400 dark:text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 transition-colors pt-2"
        >
          <div className="flex items-center gap-3">
            {isDark ? <Sun size={18} className="text-slate-400 dark:text-slate-500" /> : <Moon size={18} className="text-slate-400 dark:text-slate-500" />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </div>
          <div className="w-8 h-4 bg-slate-100 dark:bg-slate-800 rounded-full relative transition-colors">
            <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all ${isDark ? 'right-0.5 bg-white' : 'left-0.5 bg-slate-500'}`} />
          </div>
        </button>
        
        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-300 transition-colors w-full pt-2"
        >
          <LogOut size={18} className="text-red-500/70" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;
