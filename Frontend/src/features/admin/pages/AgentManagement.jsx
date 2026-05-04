import React, { useState, useEffect } from 'react';
import { useAgents } from '../hook/adminHook.js';
import { Users, Ticket, FileText, UserPlus, Filter, MoreVertical, X, Copy, Check, RefreshCw } from 'lucide-react';

/* ─────────────────────────────────────────────
   Utility: generate a unique invite code
───────────────────────────────────────────── */
const generateInviteCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments = [4, 4, 4].map(() =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  );
  return segments.join('-');
};

/* ─────────────────────────────────────────────
   InviteModal component
───────────────────────────────────────────── */
const InviteModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [inviteCode, setInviteCode] = useState(generateInviteCode());
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Trap focus / close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleRefresh = () => setInviteCode(generateInviteCode());

  const handleSend = async (e) => {
    e.preventDefault();
    if (!email || !businessName) return;
    setSending(true);

    try {
      const res = await fetch('http://localhost:8000/api/business/invite-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          agentEmail: email,
          agentName: businessName  // form mein "Recipient Name" ke liye
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      setSending(false);
      setSent(true);
      setTimeout(onClose, 1400);
    } catch (err) {
      setSending(false);
      console.error('Invite error:', err.message)
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal card */}
      <div
        className="relative w-full max-w-md bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        style={{ animation: 'modalIn 0.22s cubic-bezier(.4,0,.2,1)' }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-500" />

        {/* Header */}
        <div className="px-6 pt-5 pb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-500/15">
              <UserPlus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Invite New Agent</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Send an invite link to join your team</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 dark:border-slate-800 mx-6" />

        {/* Form */}
        <form onSubmit={handleSend} className="px-6 py-5 space-y-4">

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 tracking-wide uppercase">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agent@company.com"
              required
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-500 transition"
            />
          </div>

          {/* Business Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 tracking-wide uppercase">
              Recipient Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Your Full Name"
              required
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-500 transition"
            />
          </div>

          {/* Unique Invite Code */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 tracking-wide uppercase">
              Unique Invite Code
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                <span className="flex-1 text-sm font-mono font-semibold text-indigo-600 dark:text-indigo-400 tracking-widest select-all">
                  {inviteCode}
                </span>
              </div>
              {/* Refresh */}
              <button
                type="button"
                onClick={handleRefresh}
                title="Generate new code"
                className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <RefreshCw size={14} />
              </button>
              {/* Copy */}
              <button
                type="button"
                onClick={handleCopy}
                title="Copy code"
                className={`p-2.5 rounded-lg border transition-colors ${copied
                  ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5">Share this code with the agent to verify their invite.</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={sending || sent}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all ${sent
                ? 'bg-emerald-500 text-white'
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-500/20 disabled:opacity-70'
                }`}
            >
              {sent ? (
                <><Check size={14} /> Invite Sent!</>
              ) : sending ? (
                <><RefreshCw size={14} className="animate-spin" /> Sending…</>
              ) : (
                <><UserPlus size={14} /> Send Invite</>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Keyframe injected inline (no external CSS needed) */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
      `}</style>
    </div>
  );
};

const AgentManagement = () => {
  const { agents, loading } = useAgents()
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Agent Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage team access, roles, and real-time performance monitoring.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-200 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 rounded-md font-medium text-sm transition-colors"
          >
            <UserPlus size={16} />
            Invite New Agent
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Agents */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 relative overflow-hidden">
          <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg w-fit mb-4">
            <Users className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Agents</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white leading-none">
            {loading ? '...' : agents?.length ?? 0}
          </div>
        </div>

        {/* Active Agents */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 relative overflow-hidden">
          <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg w-fit mb-4">
            <Ticket className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Active Agents</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white leading-none">
            {loading ? '...' : agents?.filter(a => a.isVerified).length ?? 0}
          </div>
        </div>
      </div>

      {/* Agents Table Area */}
      <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col">
        {/* Tabs & Controls */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-6 min-w-max">
            <button className="py-4 text-sm font-semibold text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white whitespace-nowrap">
              All Agents
            </button>
            <button className="py-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors whitespace-nowrap">
              Active Now
            </button>
            <button className="py-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors whitespace-nowrap">
              Pending Approval
            </button>
          </div>
          <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 ml-4">
            <button className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors"><Filter size={16} /></button>
            <button className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors"><MoreVertical size={16} /></button>
          </div>
        </div>

        {/* Scrollable Table Content */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-4 px-6 py-3 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">Agent Name</div>
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">Role</div>
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">Status</div>
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">Active Tickets</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-200 dark:divide-slate-800/50">
              {loading ? (
                <div className="px-6 py-8 text-center text-slate-400 text-sm">Loading...</div>
              ) : agents?.map((agent, i) => (
                <div key={i} className="grid grid-cols-4 items-center px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">

                  {/* Agent Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300">
                      {agent.agentFullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-200">{agent.agentFullName}</div>
                      <div className="text-xs text-slate-500">{agent.agentEmail}</div>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Support Agent
                  </div>

                  {/* Status */}
                  <div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${agent.isVerified
                      ? 'bg-emerald-100 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${agent.isVerified ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                      {agent.isVerified ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Active Tickets */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-medium text-slate-500">—</span>
                    <button className="text-slate-400 hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table Footer / Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#1E293B]">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {loading ? '...' : `Showing ${agents?.length ?? 0} agents`}
          </span>
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
      {showInviteModal && <InviteModal onClose={() => setShowInviteModal(false)} />}
    </div>
  );
};

export default AgentManagement;
