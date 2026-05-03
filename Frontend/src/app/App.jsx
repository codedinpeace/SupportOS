import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './app.routes.jsx';
import { useGetMe } from '../features/auth/hook/useAuth';
import useAuthStore from '../store/auth.store.js';

// Inner component so hooks can use router context
const AppInner = () => {
  const { fetchMe } = useGetMe();
  const { user, business, agent } = useAuthStore()
  useEffect(() => {
    fetchMe(); // hydrate store from cookie on every page load
    console.log({ user, business, agent })
  }, []);

  return <RouterProvider router={router} />;
};

const App = () => {
  return <AppInner />;
};

export default App;