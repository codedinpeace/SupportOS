import React from 'react';
import { Mail, ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const VerifyEmail = () => {
  const location = useLocation();
  const email = location.state?.email || 'your email address';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col justify-center items-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-500 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md relative">
        <div className="bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] text-center">
          
          {/* Animated Mail Icon Container */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl mb-8 relative">
            <div className="absolute inset-0 bg-indigo-500 rounded-2xl animate-ping opacity-20"></div>
            <Mail className="text-indigo-600 dark:text-indigo-400" size={40} />
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Verify your email
          </h1>
          
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            A verification link has been sent to <span className="font-semibold text-slate-900 dark:text-white">{email}</span>. 
            Please click the link in the email to activate your account.
          </p>

          <div className="space-y-4">
            <a 
              href="https://mail.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-500/25 active:scale-[0.98]"
            >
              Open Email App
              <ExternalLink size={18} />
            </a>

            <Link 
              to="/login"
              className="flex items-center justify-center gap-2 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold py-4 rounded-2xl transition-all duration-300 active:scale-[0.98]"
            >
              <ArrowLeft size={18} />
              Back to Login
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800/50">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Didn't receive the email?{' '}
              <button className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline inline-flex items-center gap-1">
                <RefreshCw size={14} />
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
