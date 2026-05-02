import { create } from 'zustand';

const useAuthStore = create((set) => ({
  // ── State ──────────────────────────────────────────────────────────────────
  user: null,             // { id, email, fullname, role }
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // ── Actions ────────────────────────────────────────────────────────────────
  setUser: (user) => set({ user, isAuthenticated: true, error: null, isLoading: false }),

  setLoading: (bool) => set({ isLoading: bool }),

  setError: (msg) => set({ error: msg, isLoading: false }),

  clearError: () => set({ error: null }),

  clearAuth: () => set({ user: null, isAuthenticated: false, error: null, isLoading: false }),
}));

export default useAuthStore;
