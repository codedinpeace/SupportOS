import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuthStore from '../../../store/auth.store';

import {
  customerLogin,
  customerRegister,
  businessLogin,
  businessRegister,
  agentLogin,
  agentRegister,
  logoutCustomer,
  logoutBusiness,
  logoutAgent,
  getMe,
  getBusinessMe,
  getAgentMe,
} from '../api/auth.api';

// ── Customer Login ─────────────────────────────────────────
export const useCustomerLogin = () => {
  const { setUser, setLoading, setError } = useAuthStore();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await customerLogin(email, password);
      setUser(data.user);
      toast.success('Welcome back!');
      navigate('/customer');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    isLoading: useAuthStore((s) => s.isLoading),
    error: useAuthStore((s) => s.error),
  };
};

// ── Customer Register ─────────────────────────────────────
export const useCustomerRegister = () => {
  const { setLoading, setError } = useAuthStore();
  const navigate = useNavigate();

  const register = async (fullname, email, password) => {
    setLoading(true);
    try {
      await customerRegister(fullname, email, password);
      toast.success('Account created!');
      navigate('/verify-email', { state: { email } });
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    isLoading: useAuthStore((s) => s.isLoading),
    error: useAuthStore((s) => s.error),
  };
};

// ── Business Login ────────────────────────────────────────
export const useBusinessLogin = () => {
  const { setBusiness, setLoading, setError } = useAuthStore();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await businessLogin(email, password);
      setBusiness(data.user);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    isLoading: useAuthStore((s) => s.isLoading),
    error: useAuthStore((s) => s.error),
  };
};

// ── Business Register ─────────────────────────────────────
export const useBusinessRegister = () => {
  const { setLoading, setError } = useAuthStore();
  const navigate = useNavigate();

  const register = async (organization, email, password, websiteURL) => {
    setLoading(true);
    const toastId = toast.loading('Crawling your website data...');
    try {
      await businessRegister(organization, email, password, websiteURL);
      toast.success('Business registered!', { id: toastId });
      navigate('/verify-email', { state: { email } });
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      toast.error(msg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    isLoading: useAuthStore((s) => s.isLoading),
    error: useAuthStore((s) => s.error),
  };
};

// ── Business Check ────────────────────────────────────────
export const useBusinessCheck = () => {
  const { setBusiness, setError, setLoading } = useAuthStore();

  const checkBusiness = async () => {
    setLoading(true);
    try {
      const { data } = await getBusinessMe();
      if (data.business) {
        setBusiness(data.business);
        console.log('business authenticated');
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Business auth failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    checkBusiness,
    isLoading: useAuthStore((s) => s.isLoading),
    error: useAuthStore((s) => s.error),
  };
};

// ── Agent Login ───────────────────────────────────────────
export const useAgentLogin = () => {
  const { setAgent, setLoading, setError } = useAuthStore();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await agentLogin(email, password);
      setAgent(data.agent);
      toast.success('Welcome back!');
      navigate('/agent');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    isLoading: useAuthStore((s) => s.isLoading),
    error: useAuthStore((s) => s.error),
  };
};

// ── Agent Register ────────────────────────────────────────
export const useAgentRegister = () => {
  const { setLoading, setError } = useAuthStore();
  const navigate = useNavigate();

  const register = async (name, email, password, code) => {
    setLoading(true);
    try {
      await agentRegister(name, email, password, code);
      toast.success('Agent registered!');
      navigate('/verify-email', { state: { email } });
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    isLoading: useAuthStore((s) => s.isLoading),
    error: useAuthStore((s) => s.error),
  };
};

// ── Agent Check ───────────────────────────────────────────
export const useAgentCheck = () => {
  const { setAgent, setError, setLoading } = useAuthStore();

  const checkAgent = async () => {
    setLoading(true);
    try {
      const { data } = await getAgentMe();
      if (data.agent) {
        setAgent(data.agent);
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Agent auth failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    checkAgent,
    isLoading: useAuthStore((s) => s.isLoading),
    error: useAuthStore((s) => s.error),
  };
};

// ── Logout ────────────────────────────────────────────────
export const useLogout = () => {
  const { clearAuth, user, business, agent } = useAuthStore();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      if (business) await logoutBusiness();
      else if (agent) await logoutAgent();
      else if (user) await logoutCustomer();
    } catch {}

    clearAuth();
    toast.success('Logged out');
    navigate('/login');
  };

  return { logout };
};

// ── Init Auth (BEST VERSION) ──────────────────────────────
export const useInitAuth = () => {
  const { setUser, setBusiness, setAgent, clearAuth, setLoading } = useAuthStore();

const initAuth = async () => {
  setLoading(true);

  try {
    // 1. Business
    try {
      const { data } = await getBusinessMe();
      if (data.business) {
        setBusiness(data.business);
        return; // 🔥 CRITICAL
      }
    } catch {}

    // 2. Agent
    try {
      const { data } = await getAgentMe();
      if (data.agent) {
        setAgent(data.agent);
        return; // 🔥 CRITICAL
      }
    } catch {}

    // 3. User
    try {
      const { data } = await getMe();
      if (data.user) {
        setUser(data.user);
        return; // 🔥 CRITICAL
      }
    } catch {}

    clearAuth();
  } finally {
    setLoading(false);
  }
};

  return { initAuth };
};