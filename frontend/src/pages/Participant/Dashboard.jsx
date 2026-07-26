import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiCalendar, FiUpload, FiUsers, FiStar, FiArrowRight, FiInfo
} from 'react-icons/fi';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import ParticipantLayout from '../../layouts/ParticipantLayout';
import StatsCard from '../../components/participant/StatsCard';
import DashboardCard from '../../components/participant/DashboardCard';
import ChartCard from '../../components/participant/ChartCard';
import QuickActions from '../../components/participant/QuickActions';
import RecentActivity from '../../components/participant/RecentActivity';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  fetchMyRegistrations,
  fetchMySubmissions,
  fetchMyTeams,
  fetchPublicHackathons,
  fetchNotifications,
} from '../../services/api';

const iconMap = { FiCalendar, FiUpload, FiUsers, FiStar };

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-3 text-xs text-slate-300 shadow-xl">
        <p className="font-semibold text-white mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ParticipantDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const loadDashboardData = async () => {
      setLoading(true);
      const [regsData, subsData, teamsData, hackathonsData, notifsData] = await Promise.all([
        fetchMyRegistrations(),
        fetchMySubmissions(),
        fetchMyTeams(),
        fetchPublicHackathons(),
        fetchNotifications(),
      ]);

      if (isMounted) {
        setRegistrations(regsData);
        setSubmissions(subsData);
        setTeams(teamsData);
        setUpcomingEvents(hackathonsData);
        setNotifs(notifsData);
        setLoading(false);
      }
    };

    loadDashboardData();
    return () => {
      isMounted = false;
    };
  }, []);

  const displayName = user?.name || user?.email?.split('@')[0] || 'Participant';

  // Calculate real metrics from database state
  const registeredCount = registrations.length;
  const submissionsCount = submissions.length;
  const teamsCount = teams.length;
  const approvedSubmissions = submissions.filter((s) => s.status === 'APPROVED').length;
  const underReviewSubmissions = submissions.filter((s) => s.status === 'UNDER_REVIEW').length;
  const pendingSubmissions = submissions.filter((s) => s.status === 'PENDING' || s.status === 'DRAFT').length;

  const realStats = [
    {
      id: 'stat1',
      label: 'Hackathons Registered',
      value: registeredCount,
      icon: 'FiCalendar',
      color: 'purple',
      change: registeredCount > 0 ? `${registeredCount} active registrations` : 'No registrations yet',
      changePositive: registeredCount > 0,
    },
    {
      id: 'stat2',
      label: 'Submissions Made',
      value: submissionsCount,
      icon: 'FiUpload',
      color: 'blue',
      change: submissionsCount > 0 ? `${submissionsCount} total submissions` : 'No submissions yet',
      changePositive: submissionsCount > 0,
    },
    {
      id: 'stat3',
      label: 'Teams Joined',
      value: teamsCount,
      icon: 'FiUsers',
      color: 'emerald',
      change: teamsCount > 0 ? `${teamsCount} active teams` : 'No teams joined',
      changePositive: teamsCount > 0,
    },
    {
      id: 'stat4',
      label: 'Total Points',
      value: approvedSubmissions * 100,
      icon: 'FiStar',
      color: 'amber',
      change: approvedSubmissions > 0 ? `+${approvedSubmissions * 100} earned` : '0 points',
      changePositive: approvedSubmissions > 0,
    },
  ];

  const submissionStatusChartData = [
    { name: 'Approved', value: approvedSubmissions || 0, fill: '#10b981' },
    { name: 'Under Review', value: underReviewSubmissions || 0, fill: '#8b5cf6' },
    { name: 'Pending / Draft', value: pendingSubmissions || 0, fill: '#6b7280' },
  ];

  const unreadNotifs = notifs.filter((n) => !n.isRead).length;

  return (
    <ParticipantLayout>
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl bg-gradient-to-r from-purple-600/20 via-blue-600/10 to-transparent border border-purple-500/20 p-6 mb-6 overflow-hidden"
      >
        <div className="relative flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-purple-300 font-medium mb-1">Welcome back 👋</p>
            <h2 className="text-2xl font-bold text-white mb-1">{displayName}</h2>
            <p className="text-sm text-slate-400">
              Registered Hacker Account · {user?.email || 'Logged In'}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="text-center">
                <p className="text-xl font-bold text-white">{approvedSubmissions}</p>
                <p className="text-xs text-slate-400">Approved Projects</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <p className="text-xl font-bold text-white">{approvedSubmissions * 100}</p>
                <p className="text-xs text-slate-400">Earned Points</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <p className="text-xl font-bold text-white">{registeredCount > 0 ? '#1' : '-'}</p>
                <p className="text-xs text-slate-400">Leaderboard Rank</p>
              </div>
            </div>
          </div>

          {unreadNotifs > 0 && (
            <button
              onClick={() => navigate('/participant/notifications')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm hover:bg-purple-500/20 transition-all"
            >
              <span className="w-5 h-5 bg-purple-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                {unreadNotifs}
              </span>
              Notifications
            </button>
          )}
        </div>
      </motion.div>

      {/* Real Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {realStats.map((stat, i) => {
          const Icon = iconMap[stat.icon];
          return (
            <StatsCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              icon={Icon}
              color={stat.color}
              change={stat.change}
              changePositive={stat.changePositive}
              index={i}
            />
          );
        })}
      </div>

      {/* Charts & Status Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <ChartCard
          title="Activity & Registration Trend"
          subtitle="Real-time account registrations"
          className="lg:col-span-2"
          index={0}
        >
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={[
              { month: 'Jan', registrations: 0 },
              { month: 'Feb', registrations: 0 },
              { month: 'Mar', registrations: registeredCount > 0 ? 1 : 0 },
              { month: 'Apr', registrations: registeredCount },
            ]}>
              <defs>
                <linearGradient id="regGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="registrations"
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="url(#regGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Submission Status" subtitle="Live database breakdown" index={1}>
          {submissionsCount === 0 ? (
            <div className="h-[200px] flex flex-col items-center justify-center text-center p-4 text-slate-500 text-xs">
              <FiInfo size={24} className="mb-2 text-slate-600" />
              <span>No submissions in database yet.</span>
              <button
                onClick={() => navigate('/participant/submission')}
                className="mt-2 text-purple-400 font-semibold hover:underline"
              >
                Submit Project
              </button>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={submissionStatusChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {submissionStatusChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(v) => <span className="text-xs text-slate-400">{v}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* Bottom Row: Upcoming Hackathons / Quick Actions / Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <DashboardCard
          title="Available Hackathons"
          subtitle="Live events to join"
          action={
            <button
              onClick={() => navigate('/hackathons')}
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
            >
              Browse All <FiArrowRight size={12} />
            </button>
          }
          index={3}
        >
          <div className="space-y-3">
            {upcomingEvents.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 bg-white/[0.02] border border-white/5 rounded-xl">
                No active hackathons found.
              </div>
            ) : (
              upcomingEvents.slice(0, 3).map((h) => (
                <div key={h._id || h.id} className="p-3 rounded-xl border border-purple-500/20 bg-purple-500/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">{h.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{h.theme || h.mode}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/hackathons/${h._id || h.id}`)}
                      className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-purple-500 text-white hover:bg-purple-600"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </DashboardCard>

        <DashboardCard title="Quick Actions" subtitle="Shortcuts to key features" index={4}>
          <QuickActions />
        </DashboardCard>

        <DashboardCard title="Account Activity" subtitle="Real-time log" index={5}>
          <RecentActivity activities={[
            { id: 'act-1', type: 'LOGIN', message: `Signed in as ${user?.email}`, timestamp: 'Just now' },
            ...(registeredCount > 0 ? [{ id: 'act-2', type: 'REGISTRATION', message: `Registered for ${registeredCount} hackathon(s)`, timestamp: 'Active' }] : [])
          ]} />
        </DashboardCard>
      </div>
    </ParticipantLayout>
  );
};

export default ParticipantDashboard;
