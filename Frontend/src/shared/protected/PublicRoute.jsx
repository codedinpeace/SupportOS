// src/shared/protected/PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store/auth.store";

const PublicRoute = () => {
  const {
    isUserLoggedIn,
    isBusinessLoggedIn,
    isAgentLoggedIn,
    isLoading,
    isInitialized
  } = useAuthStore();

  if (isLoading || !isInitialized) return null;

  // 🔥 If already logged in → redirect to correct dashboard
  if (isBusinessLoggedIn) return <Navigate to="/admin" replace />;
  if (isAgentLoggedIn) return <Navigate to="/agent" replace />;
  if (isUserLoggedIn) return <Navigate to="/customer" replace />;

  return <Outlet />;
};

export default PublicRoute; 