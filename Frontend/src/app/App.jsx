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

  // ✅ Initialize auth once on app load
  useEffect(() => {
    initAuth();
  }, []);

  // ✅ Debug updated state (runs AFTER state changes)
  useEffect(() => {
    console.log("UPDATED STATE:", { user, business, agent });
  }, [user, business, agent]);

  return <RouterProvider router={router} />;
};

const App = () => {
  return <AppInner />;
};

export default App;