
import { Plus, AlertCircle, Ticket, CheckCircle2, ChevronRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getAgentTickets } from "../../auth/api/auth.api";

const TicketsManagement = () => {

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await getAgentTickets();

        // ✅ backend → UI mapping (IMPORTANT)
        const formatted = res.data.tickets.map((t) => ({
          id: t.ticketNumber || t._id,
          _id: t._id,          // ✅ add karo
          title: t.title,
          status: t.status,    // ✅ add karo
          customer: t.userId?.fullname || "Customer",
          customerInitials: t.userId?.fullname
            ? t.userId.fullname.slice(0, 2).toUpperCase()
            : "CU",
          agent: t.assignedAgentId?.agentFullName || "Pending",
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
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Managing {loading ? '...' : tickets.length} active support requests.
          </p>
        </div>
        <div className="flex items-center gap-3">
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 relative overflow-hidden flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">Pending</div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white leading-none">
              {loading ? '...' : tickets.filter(t => t.agent === 'Pending').length}
            </div>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-xl">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Open Tickets */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 relative overflow-hidden flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">Open Tickets</div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white leading-none">
              {loading ? '...' : tickets.length}
            </div>
          </div>
          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <Ticket className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </div>
        </div>

        {/* Resolved Today */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 relative overflow-hidden flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">Resolved Today</div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white leading-none">
              {loading ? '...' : tickets.filter(t => t.status === 'resolved').length}
            </div>
          </div>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Status</label>
          <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
            <option>All Statuses</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Priority</label>
          <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
            <option>All Priorities</option>
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
          </button>
        </div>
      </div>

      {/* Tickets Table Area */}
      <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col">

        {/* Scrollable Table Content */}
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
                <div className="p-6 text-center text-slate-400">Loading...</div>
              ) : (
                tickets.map((ticket, i) => (
                  <Link
                    key={i}
                    to={`/agent/ticket/${ticket._id}`}
                    className="grid grid-cols-5 items-center px-6 py-5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group"
                  >

                    {/* Ticket Details */}
                    <div className="col-span-2 pr-4">
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">{ticket.title}</div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-500">{ticket.id}</div>
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
                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"></div>
                      )}
                      <span className={`text-sm ${ticket.agent === 'Pending' ? 'text-slate-400 dark:text-slate-500 italic' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
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

