import { useState } from 'react';
import { LogOut, Mail, User } from 'lucide-react';
import useAuthStore from '../../../store/auth.store';
import { useLogout } from '../../auth/hook/useAuth';

/* ─── tiny inline keyframe styles injected once ─── */
const styles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: .6; }
    70%  { transform: scale(1.55); opacity: 0; }
    100% { transform: scale(1.55); opacity: 0; }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }

  .cp-card {
    animation: fadeUp .55s cubic-bezier(.22,.68,0,1.2) both;
  }
  .cp-avatar-ring::before {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 2px solid #6366f1;
    animation: pulse-ring 2.4s ease-out infinite;
  }
  .cp-logout-btn {
    position: relative;
    overflow: hidden;
    transition: transform .2s ease, box-shadow .2s ease;
  }
  .cp-logout-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,.18) 50%, transparent 80%);
    background-size: 400px 100%;
    opacity: 0;
    transition: opacity .3s;
  }
  .cp-logout-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(239,68,68,.35);
  }
  .cp-logout-btn:hover::after {
    opacity: 1;
    animation: shimmer .7s linear;
  }
  .cp-logout-btn:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(239,68,68,.25);
  }
  .cp-field {
    transition: border-color .2s, box-shadow .2s;
  }
  .cp-field:focus-within {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,.18);
  }
`;

const CustomerProfile = () => {
  const user = useAuthStore((s) => s.user);
  const { logout } = useLogout();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    // navigation handled inside useLogout
  };

  /* Derive initials for avatar fallback */
  const initials = user?.fullname
    ? user.fullname.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <>
      {/* Inject keyframes once */}
      <style>{styles}</style>

      {/* Page wrapper — fills the customer layout content area */}
      <div
        className="min-h-full flex items-center justify-center p-6"
        style={{ background: 'transparent' }}
      >
        {/* Glass card */}
        <div
          className="cp-card w-full max-w-sm rounded-3xl p-8 relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: '0 24px 60px rgba(0,0,0,.28)',
          }}
        >
          {/* Background gradient blob */}
          <div
            className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,.25) 0%, transparent 70%)',
              filter: 'blur(24px)',
            }}
          />
          <div
            className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(168,85,247,.18) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />

          {/* ── Avatar ── */}
          <div className="flex flex-col items-center mb-8 relative z-10">
            <div className="cp-avatar-ring relative mb-4">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white select-none"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  boxShadow: '0 8px 24px rgba(99,102,241,.45)',
                }}
              >
                {initials}
              </div>
            </div>

            <h1
              className="text-2xl font-bold text-white tracking-tight"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,.3)' }}
            >
              {user?.fullname || 'Your Name'}
            </h1>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,.45)' }}>
              Customer Account
            </p>
          </div>

          {/* ── Info fields ── */}
          <div className="space-y-3 mb-8 relative z-10">
            {/* Name field */}
            <div
              className="cp-field flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.09)',
              }}
            >
              <User size={16} style={{ color: '#6366f1', flexShrink: 0 }} />
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest font-semibold mb-0.5"
                   style={{ color: 'rgba(255,255,255,.35)' }}>
                  Full Name
                </p>
                <p className="text-sm font-medium text-white truncate">
                  {user?.fullname || '—'}
                </p>
              </div>
            </div>

            {/* Email field */}
            <div
              className="cp-field flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.09)',
              }}
            >
              <Mail size={16} style={{ color: '#a855f7', flexShrink: 0 }} />
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest font-semibold mb-0.5"
                   style={{ color: 'rgba(255,255,255,.35)' }}>
                  Email Address
                </p>
                <p className="text-sm font-medium text-white truncate">
                  {user?.email || '—'}
                </p>
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div
            className="mb-6 relative z-10"
            style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }}
          />

          {/* ── Logout button ── */}
          <div className="relative z-10">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="cp-logout-btn w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold text-white"
              style={{
                background: loggingOut
                  ? 'rgba(239,68,68,.35)'
                  : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                border: '1px solid rgba(239,68,68,.4)',
                cursor: loggingOut ? 'not-allowed' : 'pointer',
                opacity: loggingOut ? 0.7 : 1,
                letterSpacing: '0.04em',
              }}
            >
              <LogOut
                size={16}
                style={{
                  transition: 'transform .3s ease',
                  transform: loggingOut ? 'translateX(4px)' : 'none',
                }}
              />
              {loggingOut ? 'Signing out…' : 'Log Out'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerProfile;
