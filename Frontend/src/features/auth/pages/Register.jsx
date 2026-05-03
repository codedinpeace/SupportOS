import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Building, Globe, Key, Headphones, Eye, EyeOff } from 'lucide-react';
import {
  useCustomerRegister,
  useBusinessRegister,
  useAgentRegister,
} from '../hook/useAuth';

const Register = () => {
  const [activeTab, setActiveTab] = useState('customer');
  const [showPassword, setShowPassword] = useState(false);

  // Per-tab form state
  const [customerForm, setCustomerForm] = useState({ fullname: '', email: '', password: '' });
  const [businessForm, setBusinessForm] = useState({ organization: '', businessEmail: '', businessPassword: '', websiteURL: '' });
  const [agentForm, setAgentForm] = useState({ agentFullName: '', agentEmail: '', agentPassword: '', invitationCode: '' });

  const { register: customerRegister, isLoading: cLoading } = useCustomerRegister();
  const { register: businessRegister, isLoading: bLoading } = useBusinessRegister();
  const { register: agentRegister, isLoading: aLoading } = useAgentRegister();

  const tabs = [
    { id: 'customer', label: 'Customer', icon: User },
    { id: 'business', label: 'Business', icon: Building },
    { id: 'agent', label: 'Agent', icon: Headphones },
  ];

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    customerRegister(customerForm.fullname, customerForm.email, customerForm.password);
  };

  const handleBusinessSubmit = (e) => {
    e.preventDefault();
    businessRegister(businessForm.organization, businessForm.businessEmail, businessForm.businessPassword, businessForm.websiteURL);
  };

  const handleAgentSubmit = (e) => {
    e.preventDefault();
    agentRegister(agentForm.agentFullName, agentForm.agentEmail, agentForm.agentPassword, agentForm.invitationCode);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 w-full">
      {/* Left Column: Branding / Welcome */}
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-slate-50 tracking-tight mb-6">
          Welcome to SupportAI
        </h1>
        <p className="text-lg text-zinc-600 dark:text-slate-400 mb-8 max-w-lg mx-auto lg:mx-0">
          The next-generation AI-powered customer support platform. Seamlessly connect with your audience, automate responses, and empower your agents with cutting-edge tools.
        </p>
        <div className="hidden lg:flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-200 dark:border-slate-700 shadow-sm text-sm text-zinc-700 dark:text-slate-300 font-medium">
            ✨ AI Automation
          </div>
          <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-200 dark:border-slate-700 shadow-sm text-sm text-zinc-700 dark:text-slate-300 font-medium">
            ⚡ Real-time Analytics
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="w-full max-w-md bg-white/70 dark:bg-slate-800/90 backdrop-blur-xl border border-zinc-200 dark:border-slate-700 rounded-[24px] p-6 sm:p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-slate-50 mb-2">Create Account</h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-slate-400">Join us to get started with SupportAI</p>
        </div>

      {/* Tabs */}
      <div className="relative flex p-1 mb-6 sm:mb-8 bg-zinc-100 dark:bg-slate-900 rounded-full overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex-1 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full transition-colors z-10 min-w-[80px] ${
              activeTab === tab.id 
                ? 'text-zinc-900 dark:text-slate-50' 
                : 'text-zinc-500 dark:text-slate-400 hover:text-zinc-700 dark:hover:text-slate-300'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-sm"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                style={{ zIndex: -1 }}
              />
            )}
            <div className="flex items-center justify-center gap-2">
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </div>
          </button>
        ))}
      </div>

      <div className="min-h-[320px]">
        <AnimatePresence mode="wait">

          {/* ── Customer Tab ─────────────────────────────────────────────── */}
          {activeTab === 'customer' && (
            <motion.div
              key="customer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <form className="space-y-4" onSubmit={handleCustomerSubmit}>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-600 dark:text-slate-400 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-slate-500" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={customerForm.fullname}
                      onChange={(e) => setCustomerForm({ ...customerForm, fullname: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm text-zinc-900 dark:text-slate-50"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-600 dark:text-slate-400 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-slate-500" />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={customerForm.email}
                      onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm text-zinc-900 dark:text-slate-50"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-600 dark:text-slate-400 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={customerForm.password}
                      onChange={(e) => setCustomerForm({ ...customerForm, password: e.target.value })}
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm text-zinc-900 dark:text-slate-50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={cLoading}
                  className="w-full py-3 mt-4 bg-zinc-900 hover:bg-zinc-800 dark:bg-slate-500 dark:hover:bg-slate-400 text-white rounded-xl font-medium text-sm transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {cLoading ? 'Creating account...' : 'Create Account'}
                </button>

                <div className="relative py-4 flex items-center">
                  <div className="flex-grow border-t border-zinc-200 dark:border-slate-600"></div>
                  <span className="flex-shrink-0 mx-4 text-xs text-zinc-400">OR</span>
                  <div className="flex-grow border-t border-zinc-200 dark:border-slate-600"></div>
                </div>

                <a
                  href="http://localhost:8000/api/auth/google"
                  className="w-full py-3 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-600 hover:bg-zinc-50 dark:hover:bg-slate-700 text-zinc-700 dark:text-slate-300 rounded-xl font-medium text-sm transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </a>
              </form>
            </motion.div>
          )}

          {/* ── Business Tab ─────────────────────────────────────────────── */}
          {activeTab === 'business' && (
            <motion.div
              key="business"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <form className="space-y-4" onSubmit={handleBusinessSubmit}>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-600 dark:text-slate-400 ml-1">Organization Name</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-slate-500" />
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      value={businessForm.organization}
                      onChange={(e) => setBusinessForm({ ...businessForm, organization: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm text-zinc-900 dark:text-slate-50"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-600 dark:text-slate-400 ml-1">Business Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-slate-500" />
                    <input
                      type="email"
                      placeholder="admin@acmecorp.com"
                      value={businessForm.businessEmail}
                      onChange={(e) => setBusinessForm({ ...businessForm, businessEmail: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm text-zinc-900 dark:text-slate-50"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-600 dark:text-slate-400 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={businessForm.businessPassword}
                      onChange={(e) => setBusinessForm({ ...businessForm, businessPassword: e.target.value })}
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm text-zinc-900 dark:text-slate-50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-600 dark:text-slate-400 ml-1">Website Link</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-slate-500" />
                    <input
                      type="url"
                      placeholder="https://acmecorp.com"
                      value={businessForm.websiteURL}
                      onChange={(e) => setBusinessForm({ ...businessForm, websiteURL: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm text-zinc-900 dark:text-slate-50"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={bLoading}
                  className="w-full py-3 mt-4 bg-zinc-900 hover:bg-zinc-800 dark:bg-slate-500 dark:hover:bg-slate-400 text-white rounded-xl font-medium text-sm transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {bLoading ? 'Registering...' : 'Register Business'}
                </button>
              </form>
            </motion.div>
          )}

          {/* ── Agent Tab ────────────────────────────────────────────────── */}
          {activeTab === 'agent' && (
            <motion.div
              key="agent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <form className="space-y-4" onSubmit={handleAgentSubmit}>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-600 dark:text-slate-400 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-slate-500" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={agentForm.agentFullName}
                      onChange={(e) => setAgentForm({ ...agentForm, agentFullName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm text-zinc-900 dark:text-slate-50"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-600 dark:text-slate-400 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-slate-500" />
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={agentForm.agentEmail}
                      onChange={(e) => setAgentForm({ ...agentForm, agentEmail: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm text-zinc-900 dark:text-slate-50"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-600 dark:text-slate-400 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={agentForm.agentPassword}
                      onChange={(e) => setAgentForm({ ...agentForm, agentPassword: e.target.value })}
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm text-zinc-900 dark:text-slate-50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-600 dark:text-slate-400 ml-1">Business Invitation Code</label>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-slate-500" />
                    <input
                      type="text"
                      placeholder="123456"
                      maxLength={6}
                      value={agentForm.invitationCode}
                      onChange={(e) => setAgentForm({ ...agentForm, invitationCode: e.target.value.toUpperCase() })}
                      className="w-full pl-12 pr-4 py-3 text-center tracking-[0.2em] sm:tracking-[0.5em] font-mono rounded-xl bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm text-zinc-900 dark:text-slate-50 uppercase"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={aLoading}
                  className="w-full py-3 mt-4 bg-zinc-900 hover:bg-zinc-800 dark:bg-slate-500 dark:hover:bg-slate-400 text-white rounded-xl font-medium text-sm transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {aLoading ? 'Joining...' : 'Join as Agent'}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-zinc-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-zinc-900 dark:text-slate-50 hover:underline">
            Log in
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
};

export default Register;