import React from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Register from '../features/auth/pages/Register';
import Login from '../features/auth/pages/Login';
import AuthLayout from '../features/auth/components/AuthLayout';

// A root layout to provide the Toaster to all routes globally
const RootLayout = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Outlet />
    </>
  );
};

// Cleaned up routing structure for SupportOS
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/register" replace />
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/register",
            element: <Register />
          },
          {
            path: "/login",
            element: <Login />
          }
        ]
      }
      // You can add your AppLayout and other SupportOS specific routes here later
    ]
  }
]);