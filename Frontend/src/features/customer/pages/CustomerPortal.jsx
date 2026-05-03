
import { Plus, Ticket, ClipboardClock, CheckCircle2, ListFilter, MoreVertical, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetTickets } from '../hook/useGetTickets'

const getStatusStyle = (status) => {
  switch (status) {
    case 'open': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-400/10 border-blue-200 dark:border-blue-400/20'
    case 'in-progress': return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-400/10 border-amber-200 dark:border-amber-400/20'
    case 'resolved': return 'text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
    default: return ''
  }
}

const formatTime = (dateStr) => {
  const date = new Date(dateStr)
  const diff = Math.floor((new Date() - date) / 60000)
  if (diff < 60) return `${diff} minutes ago`
  if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`
  if (diff < 2880) return 'Yesterday'
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const CustomerPortal = () => {
  const { tickets, loading, error } = useGetTickets()

  const activeCount = tickets.filter(t => t.status !== 'resolved').length
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length

  return (
    <div className="space-y-6">
      {/* Page Header — same */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Customer Portal</h1>
          <p className="text-sm text-slate-400 dark:text-slate-500">Manage and track your support requests</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/customer/chat-with-ai" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-md font-medium text-sm transition-all shadow-md shadow-violet-500/20">
            <Sparkles size={15} />
            Chat with AI
          </Link>
          <Link to="/customer/create-ticket" className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-200 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 rounded-md font-medium text-sm transition-colors">
            <Plus size={16} />
            Create a Ticket
          </Link>
        </div>
      </div>

      {/* Metric Cards — real data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex items-center gap-5">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <Ticket className="w-6 h-6 text-slate-400 dark:text-slate-500" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-1">Total Tickets</div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white leading-none">{loading ? '...' : tickets.length}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex items-center gap-5">
          <div className="p-3 bg-amber-900/30 rounded-lg">
            <ClipboardClock className="w-6 h-6 text-amber-600 dark:text-amber-500" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-1">Active</div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white leading-none">{loading ? '...' : activeCount}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex items-center gap-5">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-slate-400 dark:text-slate-500" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-1">Resolved</div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white leading-none">{loading ? '...' : resolvedCount}</div>
          </div>
        </div>
      </div>

      {/* Recent Tickets List — real data */}
      <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase">Recent Tickets</h2>
          <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
            <button className="hover:text-slate-700 dark:text-slate-300 transition-colors"><ListFilter size={16} /></button>
            <button className="hover:text-slate-700 dark:text-slate-300 transition-colors"><MoreVertical size={16} /></button>
          </div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800/50">
          {loading ? (
            <div className="p-6 text-center text-sm text-slate-400">Loading tickets...</div>
          ) : error ? (
            <div className="p-6 text-center text-sm text-red-400">{error}</div>
          ) : tickets.length === 0 ? (
            <div className="p-6 text-center text-sm text-slate-400">No tickets yet</div>
          ) : (
            tickets.map((ticket) => (
              <div key={ticket._id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{ticket.ticketNumber}</span>
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{ticket.title}</h3>
                  </div>
                  <p className="text-sm text-slate-400 dark:text-slate-500 truncate">{ticket.description}</p>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                  <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase border rounded-full ${getStatusStyle(ticket.status)}`}>
                    {ticket.status}
                  </span>
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500">{formatTime(ticket.createdAt)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <button className="w-full py-4 text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors border-t border-slate-200 dark:border-slate-800">
          View All Ticket History
        </button>
      </div>
    </div>
  );
};

export default CustomerPortal;