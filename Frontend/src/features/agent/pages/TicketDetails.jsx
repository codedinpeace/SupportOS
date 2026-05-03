
import React, { useEffect, useState } from 'react';
import { History, Paperclip, BarChart2, CheckCircle2, ChevronRight, Share2, MoreHorizontal, Send, Image as ImageIcon, Link as LinkIcon, Bold, Italic } from 'lucide-react';
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

        const found = res.data.tickets.find(
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
    return <div className="p-10 text-center text-slate-400">Loading...</div>;
  }

  if (!ticket) {
    return <div className="p-10 text-center text-red-400">Ticket not found</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      
      {/* Left Panel */}
      <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
        
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 tracking-wider">
            <Link to="/agent/tickets">TICKETS</Link>
            <ChevronRight size={12} />
            <span className="text-slate-800 dark:text-slate-200">
              {ticket.ticketNumber || ticket._id}
            </span>
          </div>

          <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-4 leading-snug">
            {ticket.title}
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <span className="px-2.5 py-1 text-[10px] font-bold bg-red-100 text-red-600 rounded-full uppercase">
              Priority
            </span>
            <span className="px-2.5 py-1 text-[10px] font-bold bg-slate-100 text-slate-600 rounded-full uppercase">
              {ticket.status}
            </span>
          </div>
        </div>

        <div className="border-t"></div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Created</div>
            <div className="text-sm">
              {new Date(ticket.createdAt).toLocaleString()}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Customer</div>
            <div className="text-sm font-bold">
              {ticket.userId?.fullname || "Customer"}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Assigned Agent</div>
            <div className="text-sm">
              {ticket.assignedAgentId?.agentFullName || "Unassigned"}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Category</div>
            <div className="text-sm">General</div>
          </div>
        </div>

        <div className="border-t"></div>

        {/* Description */}
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase mb-3">Problem Description</div>
          <p className="text-sm text-slate-700">
            {ticket.description}
          </p>
        </div>

        <div className="mt-auto pt-6 flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 border rounded-lg font-bold text-sm">
            <CheckCircle2 size={16} />
            Resolve Ticket
          </button>

          <button className="w-12 h-12 flex items-center justify-center border rounded-lg">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Right Panel (UNCHANGED UI) */}
      <div className="flex-1 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col overflow-hidden shadow-sm">
        
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase">
            Live Thread
          </h2>
        </div>

        <div className="flex-1 p-6 text-sm text-slate-400">
          Chat system not integrated yet
        </div>

        <div className="p-6 border-t">
          <textarea 
            rows="3"
            placeholder="Compose your response..."
            className="w-full px-4 py-3 border rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
