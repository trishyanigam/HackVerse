import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import DashboardStatsCard from '../../components/organizer/DashboardStatsCard';
import HackathonCard from '../../components/organizer/HackathonCard';
import NotificationPanel from '../../components/organizer/NotificationPanel';
import { useAuth } from '../../context/AuthContext';
import { quickActions } from '../../mock/organizerDashboard';
import { notifications } from '../../mock/notifications';
import { fetchDashboardMetrics, fetchPublicHackathons } from '../../services/api';
import { FiPlus, FiArrowRight, FiActivity, FiUsers, FiLayers, FiInfo } from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [metrics, setMetrics] = useState(null);
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadOrganizerData = async () => {
      const [mRes, hRes] = await Promise.all([
        fetchDashboardMetrics(),
        fetchPublicHackathons(),
      ]);
      if (isMounted) {
        setMetrics(mRes);
        setHackathons(hRes);
        setLoading(false);
      }
    };
    loadOrganizerData();
    return () => {
      isMounted = false;
    };
  }, []);

  const displayName = user?.name || user?.email?.split('@')[0] || 'Organizer';

  // Compute real dashboard stats from DB metrics
  const realOrganizerStats = [
    {
      label: 'Active Hackathons',
      value: hackathons.length,
      change: hackathons.length > 0 ? `${hackathons.length} published` : '0 events created',
      changeType: 'positive',
      icon: FiActivity,
      color: 'purple',
    },
    {
      label: 'Total Registrations',
      value: metrics?.overview?.totalRegistrations || 0,
      change: metrics?.overview?.totalRegistrations ? `+${metrics.overview.totalRegistrations} total` : '0 registered',
      changeType: 'positive',
      icon: FiUsers,
      color: 'blue',
    },
    {
      label: 'Project Submissions',
      value: metrics?.overview?.totalSubmissions || 0,
      change: metrics?.overview?.totalSubmissions ? `${metrics.overview.totalSubmissions} received` : '0 submitted',
      changeType: 'positive',
      icon: FiLayers,
      color: 'emerald',
    },
    {
      label: 'Total Platform Users',
      value: metrics?.overview?.totalUsers || 1,
      change: 'Active users in DB',
      changeType: 'neutral',
      icon: FiUsers,
      color: 'amber',
    },
  ];

  return (
    <OrganizerLayout>
      {/* Welcome Banner */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-purple-900/40 via-indigo-900/20 to-transparent p-6 rounded-2xl border border-purple-500/10">
        <div>
          <h2 className="text-xl font-bold text-white">Welcome back, {displayName}!</h2>
          <p className="text-xs text-slate-400 mt-1">Manage your event registrations, submissions, and judge scoring.</p>
        </div>
        <button
          onClick={() => navigate('/organizer/hackathon/create')}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all shadow-lg shrink-0"
        >
          <FiPlus size={14} />
          Create Hackathon
        </button>
      </div>

      {/* Real Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {realOrganizerStats.map((stat, i) => (
          <DashboardStatsCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111118] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <FiActivity className="text-purple-400" />
                Registrations Trend
              </h3>
              <button
                onClick={() => navigate('/organizer/analytics')}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
              >
                View Analytics <FiArrowRight size={12} />
              </button>
            </div>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Mon', regs: 0 },
                  { name: 'Tue', regs: 0 },
                  { name: 'Wed', regs: 0 },
                  { name: 'Thu', regs: 0 },
                  { name: 'Fri', regs: metrics?.overview?.totalRegistrations || 0 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                    itemStyle={{ color: '#8b5cf6', fontSize: '11px' }}
                  />
                  <Bar dataKey="regs" fill="url(#colorRegs)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="colorRegs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">My Active Hackathons</h3>
              <button
                onClick={() => navigate('/organizer/hackathons')}
                className="text-xs text-slate-400 hover:text-white font-semibold flex items-center gap-1"
              >
                See All <FiArrowRight size={12} />
              </button>
            </div>
            {hackathons.length === 0 ? (
              <div className="p-8 text-center bg-[#111118] border border-white/5 rounded-2xl space-y-3">
                <FiInfo size={28} className="mx-auto text-purple-400" />
                <h4 className="text-sm font-bold text-white">No Hackathons Created Yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Click "Create Hackathon" to publish your first challenge event.
                </p>
                <button
                  onClick={() => navigate('/organizer/hackathon/create')}
                  className="px-4 py-2 text-xs font-bold bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all mt-2"
                >
                  Create New Event
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hackathons.slice(0, 2).map((h, i) => (
                  <HackathonCard key={h._id || h.id} hackathon={h} index={i} onDelete={() => {}} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#111118] border border-white/5 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all hover:bg-white/[0.02] active:scale-[0.98] ${action.color}`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </OrganizerLayout>
  );
};

export default OrganizerDashboard;
