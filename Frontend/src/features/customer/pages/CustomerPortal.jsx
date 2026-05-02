import { Plus, Ticket, ClipboardClock, CheckCircle2, ListFilter, MoreVertical, Bot, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerPortal = () => {
  // TODO: Replace with API call
  const recentTickets = [
    {
      id: '#TK-8842',
      title: 'Issue with monthly billing statement',
      snippet: 'I noticed a discrepancy in my last invoice (INV-2023-011). It seems I was charged twice for the premium add-...',
      status: 'IN PROGRESS',
      statusColor: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-400/10 border-amber-200 dark:border-amber-400/20',
      time: '2 hours ago'
    },
    {
      id: '#TK-8791',
      title: 'API integration timeout errors',
      snippet: 'We are seeing constant 504 timeouts on the /v2/clinical/records endpoint during peak hours...',
      status: 'URGENT',
      statusColor: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-400/10 border-red-200 dark:border-red-400/20',
      time: 'Yesterday'
    },
    {
      id: '#TK-8650',
      title: 'Change account email address',
      snippet: 'Requesting to update our primary contact from admin@clinical.io to support@clinical.io...',
      status: 'RESOLVED',
      statusColor: 'text-slate-400 dark:text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
      time: '3 days ago'
    },
    {
      id: '#TK-8612',
      title: 'Question about data retention policy',
      snippet: 'Could you provide more documentation on how long patient records are stored after account closure?',
      status: 'RESOLVED',
      statusColor: 'text-slate-400 dark:text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
      time: 'May 12, 2024'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Customer Portal</h1>
          <p className="text-sm text-slate-400 dark:text-slate-500 dark:text-slate-400">Manage and track your support requests</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/customer/chat-with-ai"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-md font-medium text-sm transition-all shadow-md shadow-violet-500/20"
          >
            <Sparkles size={15} />
            Chat with AI
          </Link>
          <Link
            to="/customer/create-ticket"
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-200 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 rounded-md font-medium text-sm transition-colors"
          >
            <Plus size={16} />
            Create a Ticket
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Tickets */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex items-center gap-5">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <Ticket className="w-6 h-6 text-slate-400 dark:text-slate-500 dark:text-slate-400" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">Total Tickets</div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white leading-none">12</div>
          </div>
        </div>

        {/* Active Tickets */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex items-center gap-5">
          <div className="p-3 bg-amber-900/30 rounded-lg">
            <ClipboardClock className="w-6 h-6 text-amber-600 dark:text-amber-500" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">Active</div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white leading-none">3</div>
          </div>
        </div>

        {/* Resolved Tickets */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex items-center gap-5">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-slate-400 dark:text-slate-500 dark:text-slate-400" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">Resolved</div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white leading-none">9</div>
          </div>
        </div>
      </div>

      {/* Recent Tickets List */}
      <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 dark:text-slate-400 tracking-wider uppercase">Recent Tickets</h2>
          <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
            <button className="hover:text-slate-700 dark:text-slate-300 transition-colors"><ListFilter size={16} /></button>
            <button className="hover:text-slate-700 dark:text-slate-300 transition-colors"><MoreVertical size={16} /></button>
          </div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800/50">
          {recentTickets.map((ticket, index) => (
            <div key={index} className="p-6 hover:bg-slate-50 dark:bg-slate-800/30 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{ticket.id}</span>
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{ticket.title}</h3>
                </div>
                <p className="text-sm text-slate-400 dark:text-slate-500 dark:text-slate-400 truncate">{ticket.snippet}</p>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase border rounded-full ${ticket.statusColor}`}>
                  {ticket.status}
                </span>
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500">{ticket.time}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-4 text-xs font-semibold text-slate-400 dark:text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:bg-slate-800/50 transition-colors border-t border-slate-200 dark:border-slate-800">
          View All Ticket History
        </button>
      </div>
    </div>
  );
};

export default CustomerPortal;