import React from 'react';
import { Calendar, Ticket, ClipboardClock, Smile, ExternalLink, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // TODO: Replace with API calls
  const agentPerformance = [
    { name: 'Sarah Connor', eff: '98%', val: 98, img: 'https://i.pravatar.cc/150?u=sarah' },
    { name: 'Mark J.', eff: '92%', val: 92, img: 'https://i.pravatar.cc/150?u=mark' },
    { name: 'Elena Rodriguez', eff: '89%', val: 89, img: 'https://i.pravatar.cc/150?u=elena' },
    { name: 'David Chen', eff: '85%', val: 85, img: 'https://i.pravatar.cc/150?u=david' },
  ];

  const volumeTrends = [
    { day: 'Mon', total: 80, resolved: 60 },
    { day: 'Tue', total: 95, resolved: 70 },
    { day: 'Wed', total: 90, resolved: 85 },
    { day: 'Thu', total: 100, resolved: 40, active: true },
    { day: 'Fri', total: 85, resolved: 65 },
    { day: 'Sat', total: 40, resolved: 35 },
    { day: 'Sun', total: 30, resolved: 25 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Administrative Overview</h1>
          <p className="text-sm text-slate-400 dark:text-slate-500 dark:text-slate-400">Real-time performance analytics and operational health.</p>
        </div>
        <div className="flex items-center gap-3">
        </div>
      </div>

      {/* Sub-Navigation */}
      <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <Link to="/admin/management" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold transition-colors shadow-sm">
          <Users size={16} className="text-slate-400 dark:text-slate-500" />
          Agent Management
        </Link>
        <Link to="/admin/analytics" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold transition-colors shadow-sm">
          <BarChart3 size={16} className="text-slate-400 dark:text-slate-500" />
          Analytics Dashboard
        </Link>
      </div>

      {/* Metric Cards (Avg Response removed per user request) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 dark:text-slate-400 tracking-wider uppercase">Total Tickets</div>
            <Ticket className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </div>
          <div className="flex items-end gap-3">
            <div className="text-4xl font-bold text-slate-900 dark:text-white leading-none">12,482</div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">+12%</div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 dark:text-slate-400 tracking-wider uppercase">Open Tickets</div>
            <ClipboardClock className="w-4 h-4 text-amber-600 dark:text-amber-500" />
          </div>
          <div className="flex items-end gap-3">
            <div className="text-4xl font-bold text-slate-900 dark:text-white leading-none">432</div>
            <div className="text-xs font-bold text-red-600 dark:text-red-400 mb-1">+5.2%</div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 dark:text-slate-400 tracking-wider uppercase">Satisfaction</div>
            <Smile className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </div>
          <div className="flex items-end gap-3">
            <div className="text-4xl font-bold text-slate-900 dark:text-white leading-none">98.2%</div>
            <div className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1">stable</div>
          </div>
        </div>
      </div>

      {/* Charts & Lists Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Ticket Volume Trends */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Ticket Volume Trends</h2>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-400 dark:text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>Incoming</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#E2B77A]"></div>Resolved</div>
            </div>
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-2 px-2 mt-auto h-48">
            {volumeTrends.map((col, i) => (
              <div key={i} className="flex flex-col items-center gap-3 w-full group">
                <div className="relative w-4 flex flex-col justify-end h-full w-full max-w-[12px] sm:max-w-[16px]">
                  {/* Incoming bar */}
                  <div 
                    className={`absolute bottom-0 w-full rounded-t-sm ${col.active ? 'bg-slate-300' : 'bg-slate-600'}`} 
                    style={{ height: `${col.total}%`, zIndex: 1 }}
                  />
                  {/* Resolved bar */}
                  <div 
                    className={`absolute bottom-0 w-full rounded-t-sm ${col.active ? 'bg-[#E2B77A]' : 'bg-slate-700/80'}`}
                    style={{ height: `${col.resolved}%`, zIndex: 2 }}
                  />
                </div>
                <div className={`text-xs font-medium ${col.active ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>{col.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Performance */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Agent Performance</h2>
          <div className="flex-1 flex flex-col gap-5 justify-center">
            {agentPerformance.map((agent, i) => (
              <div key={i} className="flex items-center gap-4">
                <img src={agent.img} alt={agent.name} className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{agent.name}</span>
                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 dark:text-slate-400">{agent.eff} efficiency</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-300 rounded-full" style={{ width: `${agent.val}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-2.5 mt-6 text-xs font-semibold text-slate-400 dark:text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:bg-slate-800 transition-colors rounded-md">
            View All Agents
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;