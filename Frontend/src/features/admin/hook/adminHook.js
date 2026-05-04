import { useEffect, useState } from 'react';
import { getAdminStatsApi } from '../api/admin.api.js';

export const useAdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getAdminStatsApi();
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};


export const useAgents = () => {
  const [agents, setAgents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/agent/all-agents', {
          credentials: 'include'
        })
        const data = await res.json()
        setAgents(data.agents)
      } catch (err) {
        setError('Failed to fetch agents')
      } finally {
        setLoading(false)
      }
    }
    fetchAgents()
  }, []);

  return { agents, loading, error };
};