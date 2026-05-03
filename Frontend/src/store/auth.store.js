import { create } from 'zustand';

const useAuthStore = create((set) => ({
  // ── State ──────────────────────────────────────────────────────────────────
  user: null,         
  business:null,
  agent:null,
  isBusinessLoggedIn:false,
  isAgentLoggedIn:false,    
  isUserLoggedIn: false,
  isLoading: false,
  isInitialized: false,
  error: null,

  // ── Actions ────────────────────────────────────────────────────────────────
  setUser: (user) => set({ 
    user, isUserLoggedIn: true, 
    business: null, isBusinessLoggedIn: false, 
    agent: null, isAgentLoggedIn: false,
    error: null, isLoading: false, isInitialized: true 
  }),

  setBusiness: (business) => set({
    business, isBusinessLoggedIn: true, 
    user: null, isUserLoggedIn: false, 
    agent: null, isAgentLoggedIn: false,
    error: null, isLoading: false, isInitialized: true 
  }),
  
  setAgent: (agent) => set({
    agent, isAgentLoggedIn: true, 
    user: null, isUserLoggedIn: false, 
    business: null, isBusinessLoggedIn: false,
    error: null, isLoading: false, isInitialized: true 
  }),

  setLoading: (isLoading) => set({ isLoading }),

  setInitialized: (isInitialized) => set({ isInitialized }),

  setError: (msg) => set({ error: msg, isLoading: false }),

  clearError: () => set({ error: null }),

  clearAuth: () => set({ 
    user: null, 
    business: null, 
    agent: null, 
    isUserLoggedIn: false, 
    isBusinessLoggedIn: false, 
    isAgentLoggedIn: false, 
    error: null, 
    isLoading: false 
  }),
}));

export default useAuthStore;
