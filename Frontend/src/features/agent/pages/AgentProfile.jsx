import React from 'react';
import { Mail, Clock, CheckCircle2, User } from 'lucide-react';
import useAuthStore from "../../../store/auth.store";

const AgentProfile = () => {
  const { agent, isLoading } = useAuthStore();

  if (isLoading) return <div className="p-10 text-center text-slate-400">Loading profile...</div>;
  if (!agent) return <div className="p-10 text-center text-red-400">No agent profile found. Please login again.</div>;

  // Safe data access with defaults
  const profile = {
    name: agent.agentFullName || "Agent",
    email: agent.agentEmail || "Not provided",
    avatar: agent.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(agent.agentFullName || "Agent") + "&background=random",
    role: agent.agentRole || "Support Agent",
    team: agent.agentTeam || "General Support",
    efficiency: agent.agentEfficiency || "94%",
    stats: {
        active: agent.stats?.active || 0,
        inProgress: agent.stats?.inProgress || 0,
        inactive: agent.stats?.inactive || 0
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header Area */}
      <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 relative overflow-hidden shadow-sm">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <div className="shrink-0 relative">
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-md object-cover"
            />
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left pt-2 w-full">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{profile.name}</h1>
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 dark:text-slate-400 mb-6">
              <Mail size={16} />
              <span>{profile.email}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8">
              <button className="px-5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-sm font-semibold rounded-lg transition-colors">
                Edit Profile
              </button>
              <button className="px-5 py-2 bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white text-sm font-semibold rounded-lg transition-colors">
                Message
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-left">
              <div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">Role</div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{profile.role}</div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">Team</div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{profile.team}</div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">Efficiency</div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{profile.efficiency}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Metrics Area */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Assigned Ticket Overview</h2>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">All Time</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active Tickets */}
          <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-amber-50 dark:bg-amber-500/10 rounded-full shrink-0">
              <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Active</div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white leading-none">{profile.stats.active}</div>
            </div>
          </div>

          {/* In Progress Tickets */}
          <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-full shrink-0">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">In Progress</div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white leading-none">{profile.stats.inProgress}</div>
            </div>
          </div>

          {/* Inactive / Resolved Tickets */}
          <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full shrink-0">
              <CheckCircle2 className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Inactive / Resolved</div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white leading-none">{profile.stats.inactive}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
