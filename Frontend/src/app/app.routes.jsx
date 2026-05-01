import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Auth Imports
import Register from '../features/auth/pages/Register.jsx';
import Login from '../features/auth/pages/Login.jsx';
import AuthLayout from '../features/auth/components/AuthLayout.jsx';

// Dashboard Imports
import DashboardLayout from '../shared/components/DashboardLayout';
import AdminDashboard from '../features/admin/pages/AdminDashboard.jsx';
import AgentManagement from '../features/admin/pages/AgentManagement.jsx';
import AnalyticsDashboard from '../features/admin/pages/AnalyticsDashboard.jsx';
import AgentDashboard from '../features/agent/pages/AgentDashboard.jsx';
import AgentProfile from '../features/agent/pages/AgentProfile.jsx';
import TicketsManagement from '../features/agent/pages/TicketsManagement.jsx';
import TicketDetails from '../features/agent/pages/TicketDetails.jsx';
import CustomerPortal from '../features/customer/pages/CustomerPortal.jsx';
import CustomerProfile from '../features/customer/pages/CustomerProfile.jsx';
import CreateTicket from '../features/customer/pages/CreateTicket.jsx';

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
