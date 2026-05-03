import { Ticket, ClipboardClock, Smile, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminStats } from '../hook/adminHook';

const AdminDashboard = () => {
  const { stats, loading, error } = useAdminStats();

  const maxTotal = stats ? Math.max(...stats.last7Days.map(d => d.total), 1) : 1;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Administrative Overview</h1>
          <p className="text-sm text-slate-400 dark:text-slate-500">Real-time performance analytics and operational health.</p>
        </div>
      </div>

      {/* Sub-Navigation */}
      <div className="flex flex-wrap items-center gap-3 md:gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <Link to="/admin/management" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold transition-colors shadow-sm">
          <Users size={16} className="text-slate-400 dark:text-slate-500" />
          <span className="whitespace-nowrap">Agent Management</span>
        </Link>
        <Link to="/admin/analytics" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold transition-colors shadow-sm">
          <BarChart3 size={16} className="text-slate-400 dark:text-slate-500" />
          <span className="whitespace-nowrap">Analytics Dashboard</span>
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-400/10 border border-red-200 dark:border-red-400/20 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase">Total Tickets</div>
            <Ticket className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </div>
          <div className="flex items-end gap-3">
            <div className="text-4xl font-bold text-slate-900 dark:text-white leading-none">
              {loading ? '...' : stats?.totalTickets ?? 0}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase">Open Tickets</div>
            <ClipboardClock className="w-4 h-4 text-amber-600 dark:text-amber-500" />
          </div>
          <div className="flex items-end gap-3">
            <div className="text-4xl font-bold text-slate-900 dark:text-white leading-none">
              {loading ? '...' : stats?.openTickets ?? 0}
            </div>
            <div className="text-xs font-bold text-amber-500 mb-1">
              {!loading && `+${stats?.inProgressTickets ?? 0} in progress`}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase">Resolved</div>
            <Smile className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </div>
          <div className="flex items-end gap-3">
            <div className="text-4xl font-bold text-slate-900 dark:text-white leading-none">
              {loading ? '...' : stats?.resolvedTickets ?? 0}
            </div>
            <div className="text-xs font-medium text-emerald-500 mb-1">
              {!loading && stats && (
                stats.totalTickets > 0
                  ? `${Math.round((stats.resolvedTickets / stats.totalTickets) * 100)}% rate`
                  : '0% rate'
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Ticket Volume Trends */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Ticket Volume Trends</h2>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>Incoming</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#E2B77A]"></div>Resolved</div>
            </div>
          </div>

          <div className="flex-1 flex items-end justify-between gap-2 px-2 mt-auto h-48">
            {loading ? (
              <div className="w-full flex items-center justify-center text-slate-400 text-sm">Loading...</div>
            ) : (
              stats?.last7Days.map((col, i) => {
                const isToday = i === stats.last7Days.length - 1;
                const totalPct = Math.round((col.total / maxTotal) * 100);
                const resolvedPct = Math.round((col.resolved / maxTotal) * 100);
                return (
                  <div key={i} className="flex flex-col items-center gap-3 w-full group">
                    <div className="relative flex flex-col justify-end h-full w-full max-w-[16px]">
                      <div
                        className={`absolute bottom-0 w-full rounded-t-sm ${isToday ? 'bg-slate-300' : 'bg-slate-600'}`}
                        style={{ height: `${totalPct}%`, zIndex: 1 }}
                      />
                      <div
                        className={`absolute bottom-0 w-full rounded-t-sm ${isToday ? 'bg-[#E2B77A]' : 'bg-slate-700/80'}`}
                        style={{ height: `${resolvedPct}%`, zIndex: 2 }}
                      />
                    </div>
                    <div className={`text-xs font-medium ${isToday ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                      {col.day}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Ticket Status Breakdown */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Ticket Status</h2>
          <div className="flex-1 flex flex-col gap-5 justify-center">
            {loading ? (
              <div className="text-slate-400 text-sm text-center">Loading...</div>
            ) : (
              [
                { label: 'Open', value: stats?.openTickets ?? 0, color: 'bg-amber-400' },
                { label: 'In Progress', value: stats?.inProgressTickets ?? 0, color: 'bg-blue-400' },
                { label: 'Resolved', value: stats?.resolvedTickets ?? 0, color: 'bg-emerald-400' },
              ].map((item, i) => {
                const pct = stats?.totalTickets > 0
                  ? Math.round((item.value / stats.totalTickets) * 100)
                  : 0;
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.label}</span>
                        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">{item.value} ({pct}%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
