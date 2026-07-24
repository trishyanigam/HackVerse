import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import DashboardStatCard from '../../components/admin/DashboardStatCard';
import QuickActionCard from '../../components/admin/QuickActionCard';
import ActivityTimeline from '../../components/admin/ActivityTimeline';
import NotificationCard from '../../components/admin/NotificationCard';
import AnalyticsCard from '../../components/admin/AnalyticsCard';
import { adminStats, adminQuickActions, adminRecentActivity } from '../../mock/admin/dashboard';
import { adminNotifications } from '../../mock/admin/notifications';
import { roleDistribution, userGrowth } from '../../mock/admin/analytics';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

const AdminDashboard = () => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500/10 to-indigo-500/5 border border-purple-500/10 rounded-2xl p-6 shadow-md"
        >
          <h2 className="text-xl font-bold text-white tracking-wide">
            {greeting}, Administrator!
          </h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Welcome to the HackVerse Super Control Panel. Here you can monitor system status, manage users, audit submissions, and evaluate server performance metrics.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {adminStats.map((stat, i) => (
            <DashboardStatCard key={stat.id} stat={stat} index={i} />
          ))}
        </div>

        {/* Quick Actions & Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500">Quick Tools</h3>
            <div className="grid grid-cols-2 gap-3">
              {adminQuickActions.map((act, idx) => (
                <QuickActionCard key={idx} action={act} />
              ))}
            </div>
          </div>

          {/* User Distribution Chart */}
          <div className="lg:col-span-2">
            <AnalyticsCard title="Role Distribution">
              <ResponsiveContainer width="100%" height={170}>
                <PieChart>
                  <Pie
                    data={roleDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                  >
                    {roleDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#141424', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(v) => <span className="text-xs text-slate-400 font-semibold">{v}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </AnalyticsCard>
          </div>
        </div>

        {/* Activities and Notifications Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Latest Activities */}
          <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500">
              System Events log
            </h3>
            <ActivityTimeline activities={adminRecentActivity} />
          </div>

          {/* Pending Alerts */}
          <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500">
              Recent Alerts & Tasks
            </h3>
            <div className="space-y-3">
              {adminNotifications.slice(0, 3).map((notif, idx) => (
                <NotificationCard key={notif.id} notification={notif} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
