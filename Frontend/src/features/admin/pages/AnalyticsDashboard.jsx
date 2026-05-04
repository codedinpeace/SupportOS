
import { Ticket, ClipboardClock } from 'lucide-react';
import { useAdminStats } from '../hook/adminHook'; // ✅ import karo

const AnalyticsDashboard = () => {
  const { stats, loading } = useAdminStats(); // ✅ real data

  // Active = open + in-progress
  const activeTickets = (stats?.openTickets ?? 0) + (stats?.inProgressTickets ?? 0)

  const ticketTrends = stats?.last7Days ?? []
  const maxTotal = ticketTrends.length ? Math.max(...ticketTrends.map(d => d.total), 1) : 1

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Analytics Overview</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Ticket performance and system health.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Tickets */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">Total Tickets</div>
            <Ticket className="w-5 h-5 text-amber-600 dark:text-amber-500" />
          </div>
          <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {loading ? '...' : stats?.totalTickets ?? 0}
          </div>
        </div>

        {/* Active Tickets */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">Active Tickets</div>
            <ClipboardClock className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </div>
          <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {loading ? '...' : activeTickets}
          </div>
          <div className="text-xs text-slate-500">
            {!loading && `${stats?.openTickets ?? 0} open + ${stats?.inProgressTickets ?? 0} in progress`}
          </div>
        </div>
      </div>

      {/* Ticket Trends Chart */}
      <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col h-96">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Ticket Trends</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Volume over the last 7 days</p>
        </div>

        <div className="flex-1 flex items-end justify-between gap-2 pb-6">
          {loading ? (
            <div className="w-full text-center text-slate-400 text-sm">Loading...</div>
          ) : (
            ticketTrends.map((col, i) => {
              const pct = Math.round((col.total / maxTotal) * 100)
              const isToday = i === ticketTrends.length - 1
              return (
                <div key={i} className="flex flex-col items-center gap-3 w-full h-full justify-end">
                  <div
                    className={`w-full max-w-[40px] rounded-t-sm ${isToday ? 'bg-slate-300 dark:bg-slate-200' : 'bg-slate-200 dark:bg-slate-700'}`}
                    style={{ height: `${pct}%` }}
                  />
                  <div className="text-[10px] font-mono text-slate-500 uppercase">{col.day}</div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;