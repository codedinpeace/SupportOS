import React from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Auth Imports
import Register from '../features/auth/pages/Register';
import Login from '../features/auth/pages/Login';
import AuthLayout from '../features/auth/components/AuthLayout';

// Dashboard Imports
import DashboardLayout from '../shared/components/DashboardLayout';
import AdminDashboard from '../features/admin/AdminDashboard';
import AgentManagement from '../features/admin/AgentManagement';
import AnalyticsDashboard from '../features/admin/AnalyticsDashboard';
import AgentDashboard from '../features/agent/AgentDashboard';
import AgentProfile from '../features/agent/AgentProfile';
import TicketsManagement from '../features/agent/TicketsManagement';
import TicketDetails from '../features/agent/TicketDetails';
import CustomerPortal from '../features/customer/CustomerPortal';
import CustomerProfile from '../features/customer/CustomerProfile';
import CreateTicket from '../features/customer/CreateTicket';

// A root layout to provide the Toaster to all routes globally
const RootLayout = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Outlet />
    </>
  );
};

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/register" replace />
      },
      // Auth Routes
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
      },
      // Dashboard Routes
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/admin",
            element: <AdminDashboard />
          },
          {
            path: "/admin/management",
            element: <AgentManagement />
          },
          {
            path: "/admin/analytics",
            element: <AnalyticsDashboard />
          },
          {
            path: "/agent",
            element: <AgentDashboard />
          },
          {
            path: "/agent/profile",
            element: <AgentProfile />
          },
          {
            path: "/agent/tickets",
            element: <TicketsManagement />
          },
          {
            path: "/agent/ticket/:ticketId",
            element: <TicketDetails />
          },
          {
            path: "/customer",
            element: <CustomerPortal />
          },
          {
            path: "/customer/profile",
            element: <CustomerProfile />
          },
          {
            path: "/customer/create-ticket",
            element: <CreateTicket />
          }
        ]
      }
    ]
  }
]);
