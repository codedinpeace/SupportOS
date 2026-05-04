import { useEffect, useState } from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { getAgentTickets, resolveTicket } from "../../auth/api/auth.api";

const TicketDetails = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleResolve = async () => {
  try {
    await resolveTicket(ticket._id)
    setTicket(prev => ({ ...prev, status: 'resolved' }))
  } catch (err) {
    console.error(err)
  }
}

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await getAgentTickets();
        console.log('ALL TICKETS:', res.data.tickets);
        console.log('LOOKING FOR:', ticketId);
        const found = res.data.tickets.find(t => t._id.toString() === ticketId);
        console.log('FOUND:', found);
        setTicket(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [ticketId]);

  if (loading) return <div className="p-10 text-center text-slate-400">Loading...</div>;
  if (!ticket) return <div className="p-10 text-center text-red-400">Ticket not found</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-8rem)]">

      {/* Left Panel */}
      <div className="flex-1 flex flex-col gap-6 lg:overflow-y-auto pr-2 lg:pr-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider">
          <Link to="/agent/tickets">TICKETS</Link>
          <ChevronRight size={12} />
          <span className="text-slate-800 dark:text-slate-200">{ticket.ticketNumber}</span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-4 leading-snug">
            {ticket.title}
          </h1>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase ${ticket.status === 'open' ? 'bg-red-100 text-red-600' :
                ticket.status === 'in-progress' ? 'bg-amber-100 text-amber-600' :
                  'bg-emerald-100 text-emerald-600'
              }`}>
              {ticket.status}
            </span>
            <span className="px-2.5 py-1 text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full uppercase">
              General
            </span>
          </div>
        </div>

        <div className="border-t dark:border-slate-700"></div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Created</div>
            <div className="text-sm text-slate-700 dark:text-slate-300">
              {new Date(ticket.createdAt).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Customer</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {ticket.userId?.fullname || 'Customer'}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Assigned Agent</div>
            <div className="text-sm text-slate-700 dark:text-slate-300">
              {ticket.assignedAgentId?.agentFullName || 'Unassigned'}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Ticket No.</div>
            <div className="text-sm font-mono text-slate-700 dark:text-slate-300">
              {ticket.ticketNumber}
            </div>
          </div>
        </div>

        <div className="border-t dark:border-slate-700"></div>

        {/* Description */}
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase mb-3">Problem Description</div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {ticket.description}
          </p>
        </div>

        {/* Resolve Button */}
        <div className="mt-auto pt-6 flex items-center gap-2 mb-4 lg:mb-0">
          <button 
            onClick={handleResolve}
            disabled={ticket.status === 'resolved'}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold text-sm transition-colors">
            <CheckCircle2 size={16} />
            {ticket.status === 'resolved' ? 'Resolved ✓' : 'Resolve Ticket'}
          </button>
        </div>

      </div>

      {/* Right Panel - User Information Box */}
      <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col overflow-hidden" style={{ height: 'fit-content' }}>

        {/* Card Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/60 dark:to-slate-800/30 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-sm font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
            {(ticket.userId?.fullname || 'CU').slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {ticket.userId?.fullname || 'Customer'}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              {ticket.ticketNumber}
            </div>
          </div>
          <span className={`ml-auto shrink-0 px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wide ${
            ticket.status === 'open' ? 'bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400' :
            ticket.status === 'in-progress' ? 'bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400' :
            'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
          }`}>
            {ticket.status}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          {/* Subject */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Subject</div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
              {ticket.title}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 dark:border-slate-700/60" />

          {/* Message */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">User's Message</div>
            <div className="relative pl-3">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-indigo-300 dark:bg-indigo-500/50" />
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {ticket.description}
              </p>
            </div>
          </div>

          {/* Submitted at */}
          <div className="pt-1 flex items-center gap-1.5">
            <div className="text-[10px] text-slate-400 dark:text-slate-500">
              Submitted on {new Date(ticket.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;