import React from 'react';
import { Ticket, ClipboardClock, FileText, Plus } from 'lucide-react';

const AnalyticsDashboard = () => {
  // TODO: Replace with API calls
  const ticketTrends = [
    { label: '14 OCT', value: 40 },
    { label: '', value: 60 },
    { label: '', value: 50 },
    { label: '', value: 75 },
    { label: '', value: 85 },
    { label: '20 OCT', value: 45 },
    { label: '', value: 35 },
    { label: '', value: 65 },
    { label: '', value: 80 },
    { label: 'TODAY', value: 95, highlight: true, count: 284 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Analytics Overview</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Ticket performance and system health for the last 30 days.</p>
        </div>
        <div className="flex items-center gap-3">
        </div>
      </div>

      {/* Metric Cards (Restricted to Total and Active Tickets as requested) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Tickets */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">Total Tickets</div>
            <Ticket className="w-5 h-5 text-amber-600 dark:text-amber-500" />
          </div>
          <div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">2,842</div>
            <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="font-bold">↗</span> +12.5% vs last month
            </div>
          </div>
        </div>

        {/* Active Tickets (Added as requested) */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">Active Tickets</div>
            <ClipboardClock className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </div>
          <div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">142</div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-500 flex items-center gap-1">
              <span className="font-bold">—</span> Stable capacity
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Trends Chart */}
      <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col h-96">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Ticket Trends</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Volume over the last 14 days</p>
          </div>
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
            <button className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white">Daily</button>
            <button className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300">Weekly</button>
          </div>
        </div>

        <div className="flex-1 flex items-end justify-between gap-2 mt-auto relative">
          {/* Subtle horizontal grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
            <div className="border-b border-slate-100 dark:border-slate-800/50 w-full h-0"></div>
            <div className="border-b border-slate-100 dark:border-slate-800/50 w-full h-0"></div>
            <div className="border-b border-slate-100 dark:border-slate-800/50 w-full h-0"></div>
            <div className="border-b border-slate-100 dark:border-slate-800/50 w-full h-0"></div>
          </div>

          {ticketTrends.map((col, i) => (
            <div key={i} className="flex flex-col items-center gap-3 w-full group relative z-10 h-full justify-end">
              {col.highlight && (
                <div className="absolute -top-8 bg-slate-800 dark:bg-slate-700 text-white text-[10px] font-bold px-2 py-1 rounded">
                  {col.count}
                </div>
              )}
              <div 
                className={`w-full max-w-[40px] rounded-t-sm transition-all duration-300 ${
                  col.highlight 
                    ? 'bg-slate-300 dark:bg-slate-200' 
                    : 'bg-slate-200 dark:bg-slate-700/70 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
                style={{ height: `${col.value}%` }}
              ></div>
              <div className="text-[10px] font-mono text-slate-500 dark:text-slate-500 h-4 uppercase">
                {col.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
