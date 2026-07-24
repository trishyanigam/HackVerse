import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import AnalyticsCard from '../../components/admin/AnalyticsCard';
import {
  userGrowth,
  hackathonGrowth,
  registrationTrend,
  submissionTrend,
  activeUsers,
  roleDistribution,
  topHackathons,
  participationRate,
} from '../../mock/admin/analytics';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const PIE_COLORS = ['#8b5cf6', '#3b82f6', '#f59e0b', '#10b981'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#12121e] border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl">
      <p className="text-slate-400 mb-1 font-semibold">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-bold">
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

const Analytics = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-white tracking-wide">Platform Analytics</h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time data visualization of user engagement, hackathon creation, and platform activities.
          </p>
        </motion.div>

        {/* Charts Grid Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* User Growth */}
          <AnalyticsCard title="User Growth" subtitle="Cumulative user registration trend over months">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={userGrowth}>
                <defs>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="participants" name="Participants" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#userGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </AnalyticsCard>

          {/* Hackathon Growth */}
          <AnalyticsCard title="Hackathon Growth" subtitle="Number of events launched monthly">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={hackathonGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="hackathons" name="Hackathons" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </AnalyticsCard>
        </div>

        {/* Charts Grid Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Registration Trend */}
          <AnalyticsCard title="Registration Trend" subtitle="Daily registration velocity (past 7 days)">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={registrationTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="registrations" name="Registrations" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </AnalyticsCard>

          {/* Submission Trend */}
          <AnalyticsCard title="Submission Trend" subtitle="Daily project submissions (past 7 days)">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={submissionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="submissions" name="Submissions" stroke="#f59e0b" strokeWidth={2.5} dot={{ fill: '#f59e0b', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </AnalyticsCard>
        </div>

        {/* Charts Grid Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Active Users Hourly */}
          <div className="lg:col-span-2">
            <AnalyticsCard title="Active Users By Hour" subtitle="Hourly user activity metrics (realtime)">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={activeUsers} barSize={25}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="hour" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="active" name="Active Users" fill="url(#actGrad)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </AnalyticsCard>
          </div>

          {/* Top Hackathons Engagement */}
          <AnalyticsCard title="Top Hackathons Engagement" subtitle="Total registrations by event name">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topHackathons} layout="vertical" barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#64748b', fontSize: 9 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="participants" name="Participants" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </AnalyticsCard>
        </div>

        {/* Distribution row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Role Distribution */}
          <AnalyticsCard title="Role Distribution Breakdown">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={roleDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4}>
                  {roleDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs text-slate-400">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </AnalyticsCard>

          {/* Participation Conversion Rate */}
          <AnalyticsCard title="Project Submission Rate">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={participationRate} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4}>
                  {participationRate.map((entry, index) => (
                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs text-slate-400">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </AnalyticsCard>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
