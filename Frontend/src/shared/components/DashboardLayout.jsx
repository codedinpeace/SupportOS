import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import LeftPanel from './LeftPanel.jsx';
import TopHeader from './TopHeader.jsx';
import { SocketProvider } from '../context/SocketContext.jsx';
import useAuthStore from '../../store/auth.store.js';

const DashboardLayout = () => {
  const location = useLocation();
  const { user, business, agent } = useAuthStore();
  const activeUser = user || business || agent;
  
  // Determine role based on the current path for demonstration purposes
  let currentRole = 'customer';
  if (location.pathname.startsWith('/admin')) currentRole = 'admin';
  else if (location.pathname.startsWith('/agent')) currentRole = 'agent';

  return (
    <SocketProvider businessId={activeUser?.businessId || activeUser?._id}>
      <div className="flex h-screen w-full bg-slate-50 dark:bg-[#0F172A] text-slate-800 dark:text-slate-200 overflow-hidden font-sans">
        {/* Sidebar */}
        <LeftPanel />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <TopHeader role={currentRole} />
          
          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SocketProvider>
  );
};

export default DashboardLayout;
