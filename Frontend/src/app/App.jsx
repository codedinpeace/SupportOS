import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './app.routes.jsx';
import { useGetMe } from '../features/auth/hook/useAuth';

// Inner component so hooks can use router context
const AppInner = () => {
  const { fetchMe } = useGetMe();

  useEffect(() => {
    fetchMe(); // hydrate store from cookie on every page load
  }, []);

  return <RouterProvider router={router} />;
};

const App = () => {
  return <AppInner />;
};

export default App;