import React from 'react';
import { Filter, ArrowUpDown, Plus, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

const AgentDashboard = () => {
  // TODO: Replace with API calls
  const assignedWorkspace = [
    {
      priority: 'P0',
      pColor: 'text-red-600 dark:text-red-400',
      icon: '!',
      id: '#TK-99283',
      time: '14m ago',
      title: 'Critical: API Latency Spike in EU-West Region',
      client: 'GlobalLogistics Inc.',
      badges: ['CRITICAL', 'INFRASTRUCTURE'],
      selected: true
    },
    {
      priority: 'P1',
      pColor: 'text-amber-600 dark:text-amber-400',
      icon: '⚡',
      id: '#TK-99275',
      time: '1h ago',
      title: 'Unable to provision new managed database instance',
      client: 'MetaCorp DevTeam',
      badges: ['HIGH', 'PROVISIONING'],
      selected: false
    },
    {
      priority: 'P2',
      pColor: 'text-slate-400 dark:text-slate-500 dark:text-slate-400',
      icon: '=',
      id: '#TK-99150',
      time: '4h ago',
      title: 'Request for increased quota on S3 storage buckets',
      client: 'Acme Marketing',
      badges: ['MEDIUM', 'BILLING'],
      selected: false
    }
  ];

  const unassignedQueue = [
    {
      priority: 'URGENT',
      pColor: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-400/10 border-red-200 dark:border-red-400/20',
      time: '2m ago',
      title: 'Auth server handshake failures',
      desc: 'Customers reporting 502 errors during login...'
    },
    {
      priority: 'HIGH',
      pColor: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-400/10 border-amber-200 dark:border-amber-400/20',
      time: '12m ago',
      title: 'Webhook delivery failing for tier-1 customers',
      desc: 'Retries exhausted for endpoint...'
    },
    {
      priority: 'NORMAL',
      pColor: 'text-slate-400 dark:text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
      time: '45m ago',
      title: 'Password reset link not arriving',
      desc: 'User checked spam folder, still no arrival aft...'
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Assigned Workspace */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Assigned Workspace</h2>
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 dark:text-slate-400 rounded-sm">Current Focus</span>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/agent/tickets" className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-white bg-slate-900 dark:bg-slate-200 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white rounded-md transition-colors">
                <Ticket size={14} /> Assigned Tickets
              </Link>
              <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
                <Filter size={14} /> Filter
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
                <ArrowUpDown size={14} /> Sort
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-200 dark:divide-slate-800/50">
            {assignedWorkspace.map((ticket, i) => (
              <Link 
                key={i} 
                to={`/agent/ticket/${ticket.id.replace('#', '')}`}
                className={`flex items-stretch relative ${
                  ticket.selected 
                    ? 'bg-slate-100 dark:bg-slate-800/50' 
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'
                } block`}
              >
                {/* Selection Indicator */}
                {ticket.selected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E2B77A]" />}

                <div className="p-4 flex gap-4 w-full ml-1">
                  {/* Priority Column */}
                  <div className="flex flex-col items-center gap-1 w-8 shrink-0 pt-1">
                    <span className={`text-[10px] font-bold ${ticket.pColor}`}>{ticket.priority}</span>
                    <span className={`text-lg leading-none ${ticket.pColor}`}>{ticket.icon}</span>
                  </div>

                  {/* Content Column */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <div className="text-xs font-mono text-slate-400 dark:text-slate-500 flex flex-col">
                          <span>{ticket.id}</span>
                          <span className="flex items-center gap-1">⏱ {ticket.time}</span>
                        </div>
                        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{ticket.title}</h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                        👤 {ticket.client}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {ticket.badges.map((badge, j) => (
                          <span key={j} className="px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 rounded-full">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column: Unassigned Queue & Team */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Unassigned Queue</h2>
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">48 total</span>
          </div>

          <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-200 dark:divide-slate-800/50">
            {unassignedQueue.map((ticket, i) => (
              <div key={i} className="p-5 hover:bg-slate-50 dark:bg-slate-800/30 transition-colors flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase border rounded-sm ${ticket.pColor}`}>
                    {ticket.priority}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">{ticket.time}</span>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1 leading-tight">{ticket.title}</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 dark:text-slate-400 line-clamp-1">{ticket.desc}</p>
                </div>

                <button className="w-full py-2 bg-white hover:bg-slate-200 text-slate-900 rounded-md text-xs font-bold tracking-wider uppercase transition-colors">
                  Claim Ticket
                </button>
              </div>
            ))}
            
            <button className="w-full py-3.5 text-xs font-semibold text-slate-400 dark:text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:bg-slate-800/50 transition-colors bg-slate-50 dark:bg-slate-900/20">
              View All Queue (45 more)
            </button>
          </div>

          {/* Team Availability */}
          <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <h3 className="text-[11px] font-bold tracking-widest text-slate-400 dark:text-slate-500 dark:text-slate-400 uppercase mb-4">Team Availability</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full border border-slate-300 dark:border-slate-600 bg-slate-200 dark:bg-slate-700 shrink-0">
                  <img src="https://i.pravatar.cc/150?u=sarah2" alt="Sarah" className="w-full h-full rounded-full object-cover" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-amber-500 border-2 border-[#1E293B] rounded-full"></div>
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Sarah L. (On Break)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full border border-slate-300 dark:border-slate-600 bg-slate-200 dark:bg-slate-700 shrink-0">
                  <img src="https://i.pravatar.cc/150?u=marcus" alt="Marcus" className="w-full h-full rounded-full object-cover" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#1E293B] rounded-full"></div>
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Marcus T. (Available)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="absolute bottom-0 right-0 w-14 h-14 bg-slate-900 dark:bg-slate-200 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95">
        <Plus size={24} />
      </button>
    </div>
  );
};

export default AgentDashboard;