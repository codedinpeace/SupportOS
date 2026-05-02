import React from 'react';
import { Users, Ticket, FileText, UserPlus, Filter, MoreVertical } from 'lucide-react';

const AgentManagement = () => {
  // TODO: Replace with API call
  const agents = [
    {
      initials: 'EK',
      name: 'Elias Kaelen',
      email: 'elias@supportai.ai',
      role: 'Senior Lead',
      status: 'Active',
      statusActive: true,
      activeTickets: 12,
      ticketPercent: 80
    },
    {
      initials: 'SM',
      name: 'Sarah Miller',
      email: 'sarah.m@supportai.ai',
      role: 'Junior Agent',
      status: 'Active',
      statusActive: true,
      activeTickets: 8,
      ticketPercent: 60
    },
    {
      initials: 'JD',
      name: 'James Donovan',
      email: 'james.d@supportai.ai',
      role: 'Support Agent',
      status: 'Inactive',
      statusActive: false,
      activeTickets: 0,
      ticketPercent: 0
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Agent Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage team access, roles, and real-time performance monitoring.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 rounded-md font-medium text-sm transition-colors">
            <FileText size={16} />
            Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-200 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 rounded-md font-medium text-sm transition-colors">
            <UserPlus size={16} />
            Invite New Agent
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Agents */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-6 right-6">
            <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-400/10 rounded-full">+4%</span>
          </div>
          <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg w-fit mb-4">
            <Users className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Agents</div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white leading-none">42</div>
          </div>
        </div>

        {/* Active Tickets */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-6 right-6">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Active</span>
          </div>
          <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg w-fit mb-4">
            <Ticket className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Active Tickets</div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white leading-none">128</div>
          </div>
        </div>
      </div>

      {/* Agents Table Area */}
      <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col">
        {/* Tabs & Controls */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="py-4 text-sm font-semibold text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white">
              All Agents
            </button>
            <button className="py-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
              Active Now
            </button>
            <button className="py-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
              Pending Approval
            </button>
          </div>
          <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
            <button className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors"><Filter size={16} /></button>
            <button className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors"><MoreVertical size={16} /></button>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-4 px-6 py-3 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
          <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">Agent Name</div>
          <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">Role</div>
          <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">Status</div>
          <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">Active Tickets</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-slate-200 dark:divide-slate-800/50">
          {agents.map((agent, i) => (
            <div key={i} className="grid grid-cols-4 items-center px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
              
              {/* Agent Name */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300">
                  {agent.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-200">{agent.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-500">{agent.email}</div>
                </div>
              </div>

              {/* Role */}
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {agent.role}
              </div>

              {/* Status */}
              <div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  agent.statusActive 
                    ? 'bg-emerald-100 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${agent.statusActive ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-slate-400'}`}></span>
                  {agent.status}
                </span>
              </div>

              {/* Active Tickets (Progress Bar) */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 w-4">{agent.activeTickets}</span>
                  <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-300 dark:bg-slate-600 rounded-full" 
                      style={{ width: `${agent.ticketPercent}%` }} 
                    />
                  </div>
                </div>
                <button className="text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Table Footer / Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#1E293B]">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Showing 1 to 3 of 42 agents</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentManagement;
