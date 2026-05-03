import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../../store/auth.store';

/**
 * A wrapper component that restricts access to routes based on user login flags.
 * 
 * @param {string} allowedFlag - The flag in auth store that must be true (e.g. 'isUserLoggedIn', 'isBusinessLoggedIn', 'isAgentLoggedIn')
 */
const ProtectedRoute = ({ allowedFlag }) => {
  const { isUserLoggedIn, isBusinessLoggedIn, isAgentLoggedIn, isLoading, isInitialized } = useAuthStore();
  
  const isLoggedIn = isUserLoggedIn || isBusinessLoggedIn || isAgentLoggedIn;

  // 1. If still loading the initial session, show nothing (or a spinner)
  // This prevents the "flash" of the login page on refresh
  if (isLoading || !isInitialized) {
    return null; // Or <LoadingSpinner />
  }

  // 2. If not logged in at all after initialization, go to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check if the specific role is logged in
  const hasAccess = useAuthStore.getState()[allowedFlag];

  if (!hasAccess) {
    // Redirect to the dashboard they actually have access to
    if (isBusinessLoggedIn) return <Navigate to="/admin" replace />;
    if (isAgentLoggedIn) return <Navigate to="/agent" replace />;
    if (isUserLoggedIn) return <Navigate to="/customer" replace />;
    
    // Fallback if somehow flags are inconsistent
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
