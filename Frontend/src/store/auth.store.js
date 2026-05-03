// src/store/auth.store.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  business: null,
  agent: null,

  isUserLoggedIn: false,
  isBusinessLoggedIn: false,
  isAgentLoggedIn: false,

  isLoading: false,
  isInitialized: false,
  error: null,

  setUser: (user) => set({
    user,
    isUserLoggedIn: true,
    business: null,
    agent: null,
    isBusinessLoggedIn: false,
    isAgentLoggedIn: false,
    isLoading: false,
    error: null,
    isInitialized: true,
  }),

  setBusiness: (business) => set({
    business,
    isBusinessLoggedIn: true,
    user: null,
    agent: null,
    isUserLoggedIn: false,
    isAgentLoggedIn: false,
    isLoading: false,
    error: null,
    isInitialized: true,
  }),

  setAgent: (agent) => set({
    agent,
    isAgentLoggedIn: true,
    user: null,
    business: null,
    isUserLoggedIn: false,
    isBusinessLoggedIn: false,
    isLoading: false,
    error: null,
    isInitialized: true,
  }),

  setLoading: (val) => set({ isLoading: val }),
  setError: (err) => set({ error: err, isLoading: false }),

  clearAuth: () => set({
    user: null,
    business: null,
    agent: null,
    isUserLoggedIn: false,
    isBusinessLoggedIn: false,
    isAgentLoggedIn: false,
    isLoading: false,
    error: null,
    isInitialized: true,
  }),
}));

export default useAuthStore;