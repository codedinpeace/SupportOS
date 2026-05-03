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

// ── Customer Login ─────────────────────────────────────────────────────────────
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
    }
  };

  return { login, isLoading: useAuthStore((s) => s.isLoading), error: useAuthStore((s) => s.error) };
};

// ── Customer Register ──────────────────────────────────────────────────────────
export const useCustomerRegister = () => {
  const { setLoading, setError } = useAuthStore();
  const navigate = useNavigate();

  const register = async (fullname, email, password) => {
    setLoading(true);
    try {
      await customerRegister(fullname, email, password);
      setLoading(false);
      toast.success('Account created!');
      navigate('/verify-email', { state: { email } });
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      toast.error(msg);
    }
  };

  return { register, isLoading: useAuthStore((s) => s.isLoading), error: useAuthStore((s) => s.error) };
};

// ── Business Login ─────────────────────────────────────────────────────────────
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
    }
  };

  return { login, isLoading: useAuthStore((s) => s.isLoading), error: useAuthStore((s) => s.error) };
};

// ── Business Register ──────────────────────────────────────────────────────────
export const useBusinessRegister = () => {
  const { setLoading, setError } = useAuthStore();
  const navigate = useNavigate();

  const register = async (organization, businessEmail, businessPassword, websiteURL) => {
    setLoading(true);
    const toastId = toast.loading('Crawling your website data...');
    try {
      await businessRegister(organization, businessEmail, businessPassword, websiteURL);
      setLoading(false);
      toast.success('Business registered!', { id: toastId });
      navigate('/verify-email', { state: { email: businessEmail } });
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      toast.error(msg, { id: toastId });
    }
  };

  return { register, isLoading: useAuthStore((s) => s.isLoading), error: useAuthStore((s) => s.error) };
};


// ---- Business Check----------------------------------------------------------

export const useBusinessCheck = ()=>{
  
}

// ── Agent Login ────────────────────────────────────────────────────────────────
export const useAgentLogin = () => {
  const { setAgent, setLoading, setError } = useAuthStore();
  const navigate = useNavigate();

  const login = async (agentEmail, agentPassword) => {
    setLoading(true);
    try {
      const { data } = await agentLogin(agentEmail, agentPassword);
      setAgent(data.user);
      toast.success('Welcome back!');
      navigate('/agent');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
      toast.error(msg);
    }
  };

  return { login, isLoading: useAuthStore((s) => s.isLoading), error: useAuthStore((s) => s.error) };
};

// ── Agent Register ─────────────────────────────────────────────────────────────
export const useAgentRegister = () => {
  const { setLoading, setError } = useAuthStore();
  const navigate = useNavigate();

  const register = async (agentFullName, agentEmail, agentPassword, invitationCode) => {
    setLoading(true);
    try {
      await agentRegister(agentFullName, agentEmail, agentPassword, invitationCode);
      setLoading(false);
      toast.success('Agent registered!');
      navigate('/verify-email', { state: { email: agentEmail } });
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      toast.error(msg);
    }
  };

  return { register, isLoading: useAuthStore((s) => s.isLoading), error: useAuthStore((s) => s.error) };
};

// ── Logout ─────────────────────────────────────────────────────────────────────
export const useLogout = () => {
  const { clearAuth, user, business, agent } = useAuthStore();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      if (business) await logoutBusiness();
      else if (agent) await logoutAgent();
      else if (user) await logoutCustomer();
    } catch (_) {
      // silently fail — clear local state regardless
    } finally {
      clearAuth();
      toast.success('Logged out');
      navigate('/login');
    }
  };

  return { logout };
};

// ── Session Hydration (call on app load) ──────────────────────────────────────
export const useGetMe = () => {
  const { setUser, setBusiness, setAgent, setLoading, setInitialized, clearAuth } = useAuthStore();

  const fetchMe = async () => {
    setLoading(true);
    try {
      // 1. Try Business session first (highest priority)
      try {
        const { data: bData } = await getBusinessMe();
        if (bData.business) {
          setBusiness(bData.business);
          setLoading(false);
          setInitialized(true);
          return;
        }
      } catch (e) {}

      // 2. Try Agent session
      try {
        const { data: aData } = await getAgentMe();
        if (aData.agent) {
          setAgent(aData.agent);
          setLoading(false);
          setInitialized(true);
          return;
        }
      } catch (e) {}

      // 3. Try Customer session
      try {
        const { data: cData } = await getMe();
        if (cData.user) {
          setUser(cData.user);
          setLoading(false);
          setInitialized(true);
          return;
        }
      } catch (e) {}

      // If no session found in any role
      clearAuth();
    } catch (_) {
      clearAuth();
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  return { fetchMe };
};
