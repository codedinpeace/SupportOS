import { useEffect, useState } from "react";
import {
  getAgentMe,
  agentLogin,
  agentRegister,
  logoutAgent,
} from "../../auth/api/auth.api"

export const useAgent = () => {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 GET CURRENT AGENT
  const fetchAgent = async () => {
    try {
      setLoading(true);
      const res = await getAgentMe();

      // backend returns: { agent }
      setAgent(res.data.agent);
      setError(null);
    } catch (err) {
      setAgent(null);
      setError(err.response?.data?.message || null);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 LOGIN
  const handleLogin = async (data) => {
    try {
      setLoading(true);

      await agentLogin(data.agentEmail, data.agentPassword);

      // login ke baad agent fetch
      await fetchAgent();

      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 REGISTER
  const handleRegister = async (data) => {
    try {
      setLoading(true);

      await agentRegister(
        data.agentFullName,
        data.agentEmail,
        data.agentPassword,
        data.invitationCode
      );

      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 LOGOUT
  const handleLogout = async () => {
    try {
      await logoutAgent();
      setAgent(null);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 AUTO FETCH ON LOAD
  useEffect(() => {
    fetchAgent();
  }, []);

  return {
    agent,
    loading,
    error,

    // actions
    handleLogin,
    handleRegister,
    handleLogout,
    refetchAgent: fetchAgent,
  };
};

