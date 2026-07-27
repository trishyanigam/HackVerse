import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper API fetchers for real database data
export const fetchMyProfile = async () => {
  try {
    const res = await api.get('/auth/me');
    return res.data.data;
  } catch (err) {
    return null;
  }
};

export const fetchMyRegistrations = async () => {
  try {
    const res = await api.get('/registrations/my');
    return res.data.data || [];
  } catch (err) {
    return [];
  }
};

export const fetchMySubmissions = async () => {
  try {
    const res = await api.get('/submissions/my');
    return res.data.data || [];
  } catch (err) {
    return [];
  }
};

export const fetchMyTeams = async () => {
  try {
    const res = await api.get('/teams/my');
    return res.data.data?.teams || [];
  } catch (err) {
    return [];
  }
};

export const fetchPublicHackathons = async () => {
  try {
    const res = await api.get('/hackathons?limit=10');
    return res.data.data?.hackathons || [];
  } catch (err) {
    return [];
  }
};

export const fetchDashboardMetrics = async () => {
  try {
    const res = await api.get('/reports/dashboard');
    return res.data.data || null;
  } catch (err) {
    return null;
  }
};

export const fetchNotifications = async () => {
  try {
    const res = await api.get('/notifications');
    return res.data.data || [];
  } catch (err) {
    return [];
  }
};

export default api;
