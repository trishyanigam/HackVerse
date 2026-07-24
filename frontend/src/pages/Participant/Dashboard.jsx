import React from 'react';
import { motion } from 'framer-motion';
import {
  FiCalendar, FiUpload, FiUsers, FiStar, FiAlertTriangle, FiArrowRight,
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
import {
  participantUser,
  dashboardStats,
  upcomingDeadlines,
  registrationTrendData,
  submissionStatusData,
  participationSummaryData,
} from '../../mock/participantDashboard';
import { activities } from '../../mock/activities';
import { notifications } from '../../mock/notifications';

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

const urgencyConfig = {
  high: 'border-red-500/20 bg-red-500/5 text-red-400',
  medium: 'border-amber-500/20 bg-amber-500/5 text-amber-400',
  low: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400',
};

const ParticipantDashboard = () => {
  const navigate = useNavigate();
  const unreadNotifs = notifications.filter((n) => !n.isRead).length;

  const getDaysLeft = (dateStr) => {
    const diff = new Date(dateStr) - new Date();
    const days = Math.ceil(diff / 86400000);
    return days;
  };

  return (
    <ParticipantLayout>
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl bg-gradient-to-r from-purple-600/20 via-blue-600/10 to-transparent border border-purple-500/20 p-6 mb-6 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTYgMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-sm text-purple-300 font-medium mb-1">Welcome back 👋</p>
            <h2 className="text-2xl font-bold text-white mb-1">{participantUser.name}</h2>
            <p className="text-sm text-slate-400">
              {participantUser.college} · {participantUser.branch}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="text-center">
                <p className="text-xl font-bold text-white">{participantUser.hackathonsWon}</p>
                <p className="text-xs text-slate-500">Wins</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <p className="text-xl font-bold text-white">{participantUser.totalPoints.toLocaleString()}</p>
                <p className="text-xs text-slate-500">Points</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <p className="text-xl font-bold text-white">#{participantUser.rank}</p>
                <p className="text-xs text-slate-500">Rank</p>
              </div>
            </div>
          </div>
          {unreadNotifs > 0 && (
            <button
              onClick={() => navigate('/participant/notifications')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm hover:bg-purple-500/20 transition-all"
            >
              <span className="w-5 h-5 bg-purple-500 rounded-full text-white text-xs flex items-center justify-center">
                {unreadNotifs}
              </span>
              New Notifications
            </button>
          )}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {dashboardStats.map((stat, i) => {
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Area Chart */}
        <ChartCard
          title="Registration Trend"
          subtitle="Monthly hackathon sign-ups"
          className="lg:col-span-2"
          index={0}
        >
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={registrationTrendData}>
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

        {/* Pie Chart */}
        <ChartCard title="Submission Status" subtitle="Current breakdown" index={1}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={submissionStatusData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
              >
                {submissionStatusData.map((entry, index) => (
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
        </ChartCard>
      </div>

      {/* Participation Summary Bar Chart */}
      <ChartCard title="Participation Summary" subtitle="Wins, submissions & registrations" className="mb-6" index={2}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={participationSummaryData} barSize={12}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(v) => <span className="text-xs text-slate-400">{v}</span>}
            />
            <Bar dataKey="registrations" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Registrations" />
            <Bar dataKey="submissions" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Submissions" />
            <Bar dataKey="wins" fill="#10b981" radius={[4, 4, 0, 0]} name="Wins" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Bottom Grid: Deadlines | Activity | Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Upcoming Deadlines */}
        <DashboardCard
          title="Upcoming Deadlines"
          subtitle="Don't miss these dates"
          action={
            <button
              onClick={() => navigate('/participant/hackathons')}
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              View All <FiArrowRight size={12} />
            </button>
          }
          index={3}
        >
          <div className="space-y-3">
            {upcomingDeadlines.map((dl) => {
              const daysLeft = getDaysLeft(dl.dueDate);
              const cfg = urgencyConfig[dl.urgency];
              return (
                <div key={dl.id} className={`p-3 rounded-xl border ${cfg}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{dl.hackathon}</p>
                      <p className="text-xs mt-0.5 opacity-80">{dl.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{daysLeft}</p>
                      <p className="text-xs opacity-70">days left</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardCard>

        {/* Quick Actions */}
        <DashboardCard title="Quick Actions" subtitle="Shortcuts to key features" index={4}>
          <QuickActions />
        </DashboardCard>

        {/* Recent Activity */}
        <DashboardCard title="Recent Activity" subtitle="Your latest actions" index={5}>
          <RecentActivity activities={activities} />
        </DashboardCard>
      </div>
    </ParticipantLayout>
  );
};

export default ParticipantDashboard;
