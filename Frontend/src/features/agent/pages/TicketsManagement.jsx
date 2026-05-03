import { Plus, AlertCircle, Ticket, CheckCircle2, ChevronRight, Filter, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getAgentTickets } from "../../auth/api/auth.api";

const TicketsManagement = () => {
 
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    unassigned: 0,
    open: 0,
    resolved: 0
  });

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await getAgentTickets();
        const rawTickets = res.data.tickets || [];

        // Calculate Stats
        const unassigned = rawTickets.filter(t => !t.assignedAgentId).length;
        const open = rawTickets.filter(t => t.status === 'open').length;
        const resolved = rawTickets.filter(t => t.status === 'resolved').length;
        
        setStats({ unassigned, open, resolved });

        // ✅ backend → UI mapping
        const formatted = rawTickets.map((t) => ({
          id: t.ticketNumber || t._id,
          rawId: t._id,
          title: t.title,
          status: t.status,
          customer: t.userId?.fullname || "Customer",
          customerInitials: t.userId?.fullname
            ? t.userId.fullname.slice(0, 2).toUpperCase()
            : "CU",
          agent: t.assignedAgentId?.agentFullName || "Unassigned",
          agentAvatar: null,
        }));

        setTickets(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Ticket Queue</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Managing {tickets.length} active support requests.</p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Unassigned */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 relative overflow-hidden flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">Unassigned</div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white leading-none">{stats.unassigned}</div>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-xl">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Open Tickets */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 relative overflow-hidden flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">Open Tickets</div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white leading-none">{stats.open}</div>
          </div>
          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <Ticket className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </div>
        </div>

        {/* Resolved Today */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 relative overflow-hidden flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">Resolved</div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white leading-none">{stats.resolved}</div>
          </div>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Filters (UI only for now) */}
      <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-5 gap-4 shadow-sm">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Status</label>
          <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
            <option>All Statuses</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Priority</label>
          <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Category</label>
          <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
            <option>All Categories</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Date Range</label>
          <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
            <option>Last 7 Days</option>
          </select>
        </div>
        <div className="flex items-end">
          <button className="w-full h-[38px] flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors">
            <Filter size={16} />
            <span className="text-xs font-bold uppercase">Apply</span>
          </button>
        </div>
      </div>

      {/* Tickets Table Area */}
      <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-sm">
        
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Table Header */}
            <div className="grid grid-cols-5 px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
              <div className="col-span-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">Ticket Details</div>
              <div className="col-span-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">Customer</div>
              <div className="col-span-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">Agent</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-200 dark:divide-slate-800/50">
              {loading ? (
                <div className="p-12 text-center">
                   <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mx-auto mb-4"></div>
                   <p className="text-slate-400 text-sm">Loading tickets...</p>
                </div>
              ) : tickets.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                  No tickets found matching your queue.
                </div>
              ) : (
                tickets.map((ticket) => (
                  <Link 
                    key={ticket.rawId} 
                    to={`/agent/ticket/${ticket.rawId}`}
                    className="grid grid-cols-5 items-center px-6 py-5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group"
                  >
                    
                    {/* Ticket Details */}
                    <div className="col-span-2 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{ticket.title}</span>
                        <span className={`px-1.5 py-0.5 text-[8px] font-bold uppercase rounded-md ${
                          ticket.status === 'open' ? 'bg-blue-100 text-blue-600' :
                          ticket.status === 'in-progress' ? 'bg-amber-100 text-amber-600' :
                          'bg-emerald-100 text-emerald-600'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-500">#{ticket.id}</div>
                    </div>

                    {/* Customer */}
                    <div className="col-span-2 flex items-center gap-3">
                      <div className="w-7 h-7 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-300">
                        {ticket.customerInitials}
                      </div>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {ticket.customer}
                      </div>
                    </div>

                    {/* Agent */}
                    <div className="col-span-1 flex items-center gap-2">
                      {ticket.agentAvatar ? (
                        <img src={ticket.agentAvatar} alt={ticket.agent} className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-700" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                           <User className="w-3 h-3 text-slate-400" />
                        </div>
                      )}
                      <span className={`text-sm ${ticket.agent === 'Unassigned' ? 'text-slate-400 dark:text-slate-500 italic' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
                        {ticket.agent}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#1E293B]">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Showing {tickets.length} tickets
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicketsManagement;
