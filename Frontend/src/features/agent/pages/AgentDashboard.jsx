import React, { useEffect, useState } from 'react';
import { Filter, ArrowUpDown, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAgentTickets,acceptTicket } from "../../auth/api/auth.api";

const AgentDashboard = () => {

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await getAgentTickets();
        setTickets(res.data.tickets || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // ✅ SPLIT
  const assignedTickets = tickets.filter(t => t.assignedAgentId);
  const unassignedTickets = tickets.filter(t => !t.assignedAgentId);

  if (loading) {
    return <div className="p-6">Loading tickets...</div>;
  }

  const handleClaim = async (ticketId) => {
  try {
    const res = await acceptTicket(ticketId);

    const updatedTicket = res.data.ticket;

    setTickets((prev) =>
      prev.map((t) =>
        t._id === ticketId
          ? {
              ...t,
              assignedAgentId: updatedTicket.assignedAgentId,
              status: updatedTicket.status,
            }
          : t
      )
    );

  } catch (err) {
    console.error("Claim failed:", err);
  }
};



  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Assigned Workspace</h2>
              <span className="hidden xs:inline-block px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 dark:text-slate-400 rounded-sm">Current Focus</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link to="/agent/tickets" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-bold text-white bg-slate-900 dark:bg-slate-200 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white rounded-md transition-colors whitespace-nowrap">
                <Ticket size={14} /> Assigned
              </Link>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
                <Filter size={14} /> Filter
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
                <ArrowUpDown size={14} /> Sort
              </button>
            </div>
          </div>

          {/* Assigned Tickets */}
          <div className="bg-white dark:bg-[#1E293B] border rounded-xl overflow-hidden divide-y">

            {assignedTickets.map((ticket) => (
              <Link
                key={ticket._id}
                to={`/agent/ticket/${ticket._id}`}
                className="flex items-stretch relative hover:bg-slate-50 dark:hover:bg-slate-800/30 block"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E2B77A]" />

                <div className="p-4 flex gap-4 w-full ml-1">

                  {/* STATUS */}
                  <div className="flex flex-col items-center gap-1 w-8 pt-1">
                    <span className="text-[10px] font-bold text-slate-400">
                      {ticket.status?.toUpperCase()}
                    </span>
                    <span className="text-lg">
                      {ticket.status === "open" ? "!" : ticket.status === "in-progress" ? "⚡" : "✔"}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">

                        <div className="text-xs font-mono text-slate-400 flex flex-col">
                          <span>#{ticket.ticketNumber}</span>
                          <span>⏱ {new Date(ticket.createdAt).toLocaleString()}</span>
                        </div>

                        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {ticket.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-1">
                      {ticket.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}

          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Unassigned Queue</h2>
            <span className="text-xs text-slate-400">{unassignedTickets.length} total</span>
          </div>

          <div className="bg-white dark:bg-[#1E293B] border rounded-xl overflow-hidden divide-y">

            {unassignedTickets.map((ticket) => (
              <div key={ticket._id} className="p-5 hover:bg-slate-50 flex flex-col gap-3">

                <div className="flex justify-between">
                  <span className="text-xs font-bold uppercase text-red-500">
                    {ticket.status}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(ticket.createdAt).toLocaleTimeString()}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {ticket.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {ticket.description}
                  </p>
                </div>

                <button 
                onClick={()=>handleClaim(ticket._id)}
                className="w-full py-2 bg-white hover:bg-slate-200 text-xs font-bold uppercase rounded-md">
                  Claim Ticket
                </button>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default AgentDashboard;
