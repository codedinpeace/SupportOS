import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Auth Imports
import Register from '../features/auth/pages/Register.jsx';
import Login from '../features/auth/pages/Login.jsx';
import AuthLayout from '../features/auth/components/AuthLayout.jsx';
import VerifyEmail from '../shared/pages/VerifyEmail.jsx';
import ProtectedRoute from '../shared/protected/ProtectedRoute.jsx';

// Dashboard Imports
import DashboardLayout from '../shared/components/DashboardLayout';
import AdminDashboard from '../features/admin/pages/AdminDashboard.jsx';
import AgentManagement from '../features/admin/pages/AgentManagement.jsx';
import AnalyticsDashboard from '../features/admin/pages/AnalyticsDashboard.jsx';
import AgentLayout from '../features/agent/components/AgentLayout.jsx';
import AgentDashboard from '../features/agent/pages/AgentDashboard.jsx';
import AgentProfile from '../features/agent/pages/AgentProfile.jsx';
import TicketsManagement from '../features/agent/pages/TicketsManagement.jsx';
import TicketDetails from '../features/agent/pages/TicketDetails.jsx';
import CustomerPortal from '../features/customer/pages/CustomerPortal.jsx';
import CustomerProfile from '../features/customer/pages/CustomerProfile.jsx';
import CreateTicket from '../features/customer/pages/CreateTicket.jsx';
import ChatWithAI from '../features/customer/pages/ChatWithAI.jsx';
import Notifications from '../features/agent/pages/Notifications.jsx';
import PublicRoute from '../shared/protected/PublicRoute.jsx';




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
      {
  element: <PublicRoute />,
  children: [
    {
      element: <AuthLayout />,
      children: [
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/verify-email", element: <VerifyEmail /> }
      ]
    }
  ]
},
      {
        element: <DashboardLayout />,
        children: [
          // Admin Routes
          {
            element: <ProtectedRoute allowedFlag="isBusinessLoggedIn" />,
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
            ]
          },
          // Agent Routes
          {
            element: <ProtectedRoute allowedFlag="isAgentLoggedIn" />,
            children: [
              {
                element: <AgentLayout />,
                children: [
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
                    path: "/agent/notifications",
                    element: <Notifications />
                  }
                ]
              },
            ]
          },
          // Customer Routes
          {
            element: <ProtectedRoute allowedFlag="isUserLoggedIn" />,
            children: [
              {
                path: "/customer",
                element:<CustomerPortal /> 
              },  
              {
                path: "/customer/profile",
                element: <CustomerProfile />
              },
              {
                path: "/customer/create-ticket",
                element: <CreateTicket />
              },
              {
                path: "/customer/chat-with-ai",
                element: <ChatWithAI />
              }
            ]
          }
        ]
      }
    ]
  }
]);