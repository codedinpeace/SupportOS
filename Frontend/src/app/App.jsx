import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './app.routes.jsx';

import { useInitAuth } from '../features/auth/hook/useAuth';
import useAuthStore from '../store/auth.store.js';

// Inner component so hooks can use router context
const AppInner = () => {
  const { initAuth } = useInitAuth();

  // ✅ Correct Zustand usage (ensures re-render)
  const user = useAuthStore((s) => s.user);
  const business = useAuthStore((s) => s.business);
  const agent = useAuthStore((s) => s.agent);

  const isInitialized = useAuthStore((s) => s.isInitialized);
  const isLoading = useAuthStore((s) => s.isLoading);

  // ✅ Initialize auth once on app load
  useEffect(() => {
    initAuth();
  }, []);

  // ✅ Debug updated state (runs AFTER state changes)
  useEffect(() => {
    if (isInitialized) {
      console.log("AUTH INITIALIZED:", { user, business, agent });
    }
  }, [isInitialized, user, business, agent]);

  if (!isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-[#0F172A]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
          <p className="text-slate-600 dark:text-slate-400 font-medium animate-pulse">Initializing SupportOS...</p>
        </div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
};

const App = () => {
  return <AppInner />;
};

export default App;