import React, { useEffect, useState } from 'react';
import { History, Paperclip, CheckCircle2, ChevronRight, Share2, MoreHorizontal, User } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { getAgentTickets } from "../../auth/api/auth.api";

const TicketDetails = () => {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await getAgentTickets();
        const found = res.data.tickets?.find(
          (t) => t._id === ticketId || t.ticketNumber === ticketId
        );
        setTicket(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-medium">Loading ticket details...</p>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Ticket not found</h2>
        <p className="text-slate-500 mb-6">The ticket you are looking for doesn't exist or you don't have access.</p>
        <Link to="/agent/tickets" className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold">
          Back to Queue
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-8rem)]">
      
      {/* Left Panel - Ticket Info */}
      <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-6 lg:overflow-y-auto pr-2 custom-scrollbar shrink-0">
        
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 tracking-wider">
            <Link to="/agent/tickets">TICKETS</Link>
            <ChevronRight size={12} />
            <span className="text-slate-800 dark:text-slate-200">
              {ticket.ticketNumber || "NO-NUMBER"}
            </span>
          </div>

          <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-4 leading-snug">
            {ticket.title}
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase ${
               ticket.status === 'open' ? 'bg-blue-100 text-blue-600' :
               ticket.status === 'in-progress' ? 'bg-amber-100 text-amber-600' :
               'bg-emerald-100 text-emerald-600'
            }`}>
              {ticket.status}
            </span>
            <span className="px-2.5 py-1 text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full uppercase">
               Priority: High
            </span>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800"></div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Created</div>
            <div className="text-[13px] text-slate-700 dark:text-slate-300">
              {new Date(ticket.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Customer</div>
            <div className="text-[13px] font-bold text-slate-900 dark:text-white">
              {ticket.userId?.fullname || "Verified Customer"}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Assigned Agent</div>
            <div className="text-[13px] text-slate-700 dark:text-slate-300">
              {ticket.assignedAgentId?.agentFullName || "Unassigned"}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Last Update</div>
            <div className="text-[13px] text-slate-700 dark:text-slate-300">
               {new Date(ticket.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800"></div>

        {/* Description */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="text-[10px] font-bold text-slate-500 uppercase mb-3">Problem Description</div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            {ticket.description}
          </p>
          <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-lg p-3 font-mono text-[10px] text-slate-600 dark:text-slate-400">
             // Origin Metadata<br/>
             TKT_ID: {ticket._id}<br/>
             SYS_TS: {new Date(ticket.createdAt).getTime()}
          </div>
        </div>

        <div className="mt-auto pt-6 flex items-center gap-2 mb-4 lg:mb-0">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-slate-900/10">
            <CheckCircle2 size={16} />
            Resolve Ticket
          </button>

          <button className="w-12 h-12 flex items-center justify-center border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <MoreHorizontal size={16} className="text-slate-600" />
          </button>
        </div>
      </div>

      {/* Right Panel - Live Thread */}
      <div className="flex-1 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col h-[500px] lg:h-full overflow-hidden shadow-sm">
        
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-wider uppercase">Live Thread</h2>
          </div>
          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <button className="hover:text-slate-900 dark:hover:text-white transition-colors"><History size={18}/></button>
            <button className="hover:text-slate-900 dark:hover:text-white transition-colors"><Paperclip size={18}/></button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-white dark:bg-[#1E293B]">
          
          {/* Initial Customer Message (Derived from description) */}
          <div className="max-w-[85%]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                 <User size={16} className="text-indigo-600" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white mr-2 uppercase">CUSTOMER</span>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">{new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
            <div className="ml-11 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {ticket.description}
            </div>
          </div>

          {/* System Info */}
          <div className="flex justify-center my-8">
            <div className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-full flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              <Share2 size={12} />
              Ticket Opened · {new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          <div className="text-center p-12 text-slate-400">
             <p className="text-xs italic">Waiting for agent response...</p>
          </div>

        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <div className="relative group">
            <textarea 
              rows="3"
              placeholder="Type your response to the customer..."
              className="w-full px-5 py-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 dark:focus:ring-white/5 transition-all resize-none shadow-sm group-focus-within:border-slate-400 dark:group-focus-within:border-slate-600"
            />
            <button className="absolute bottom-4 right-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2 rounded-xl text-xs font-bold uppercase transition-transform active:scale-95 shadow-lg">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
