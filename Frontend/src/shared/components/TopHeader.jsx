import React from 'react';
import { Search, Bell, History, Menu } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';

const TopHeader = ({ role, toggleSidebar }) => {
  const navigate = useNavigate();
  const { notifications } = useSocket();

  const handleProfileClick = () => {
    if (role === 'customer') navigate('/customer/profile');
    if (role === 'agent') navigate('/agent/profile');
  };

  const getSearchPlaceholder = () => {
    switch (role) {
      case 'admin':
        return 'Search data...';
      case 'agent':
        return 'Search tickets...';
      case 'customer':
      default:
        return 'Search...';
    }
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0F172A] flex items-center justify-between px-4 md:px-8 shrink-0">
      {/* Mobile Menu & Search */}
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* Search Bar */}
        <div className="hidden sm:block flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder={getSearchPlaceholder()}
              className="w-full pl-10 pr-4 py-1.5 bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-md text-sm text-slate-800 dark:text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-300 dark:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-colors"
            />
          </div>
        </div>

        {/* Mobile Search Icon (only visible on mobile instead of full bar) */}
        <button className="sm:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <Search size={20} />
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 md:gap-6 ml-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Link 
            to={role === 'agent' ? "/agent/notifications" : "#"}
            className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors relative"
          >
            <Bell size={18} />
            {role === 'agent' && notifications.length > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-slate-50 dark:border-[#0F172A]">
                {notifications.length}
              </span>
            )}
          </Link>
          <button className="hidden sm:flex p-2 text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
            <History size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3 pl-3 md:pl-6 border-l border-slate-200 dark:border-slate-800">
          {role === 'agent' && (
            <div className="text-right hidden md:block">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase">Agent #402</div>
              <div className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 tracking-wider">ONLINE</div>
            </div>
          )}
          <button 
            onClick={handleProfileClick}
            className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-300 dark:border-slate-600 shrink-0 hover:ring-2 hover:ring-blue-500 transition-all focus:outline-none"
          >
            <img 
              src="https://i.pravatar.cc/150?img=11" 
              alt="User Avatar" 
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
