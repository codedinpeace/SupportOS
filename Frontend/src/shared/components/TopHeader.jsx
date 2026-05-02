import React from 'react';
import { Search, Bell, History } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';

const TopHeader = ({ role }) => {
  const navigate = useNavigate();
  const { notifications } = useSocket();

  const handleProfileClick = () => {
    if (role === 'customer') navigate('/customer/profile');
    if (role === 'agent') navigate('/agent/profile');
    // For admin, we don't have a profile page in the spec yet, so we could just route to admin dashboard or do nothing
  };

  // Dynamic content based on role
  const getSearchPlaceholder = () => {
    switch (role) {
      case 'admin':
        return 'Search data points, tickets, or agents...';
      case 'agent':
        return 'Search tickets, customers, or logs...';
      case 'customer':
      default:
        return 'Search your tickets...';
    }
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0F172A] flex items-center justify-between px-8 shrink-0">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder={getSearchPlaceholder()}
            className="w-full pl-10 pr-4 py-1.5 bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-md text-sm text-slate-800 dark:text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-300 dark:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-colors"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <Link 
            to={role === 'agent' ? "/agent/notifications" : "#"}
            className="text-slate-400 dark:text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 transition-colors relative"
          >
            <Bell size={18} />
            {role === 'agent' && notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-slate-50 dark:border-[#0F172A]">
                {notifications.length}
              </span>
            )}
          </Link>
          <button className="text-slate-400 dark:text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 transition-colors">
            <History size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-800">
          {role === 'agent' && (
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wider">AGENT #402</div>
              <div className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 tracking-wider">ONLINE</div>
            </div>
          )}
          <button 
            onClick={handleProfileClick}
            className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-300 dark:border-slate-600 shrink-0 hover:ring-2 hover:ring-blue-500 transition-all focus:outline-none"
          >
            {/* Dummy Avatar image */}
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
