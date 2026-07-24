import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import DashboardStatsCard from '../../components/organizer/DashboardStatsCard';
import HackathonCard from '../../components/organizer/HackathonCard';
import RecentRegistrations from '../../components/organizer/RecentRegistrations';
import ActivityTimeline from '../../components/organizer/ActivityTimeline';
import NotificationPanel from '../../components/organizer/NotificationPanel';
import {
  organizerStats,
  recentRegistrations,
  upcomingDeadlines,
  recentSubmissions,
  quickActions,
} from '../../mock/organizerDashboard';
import { mockHackathons } from '../../mock/hackathons';
import { notifications } from '../../mock/notifications';
import { FiPlus, FiArrowRight, FiActivity, FiUsers, FiLayers } from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const mockChartData = [
  { name: 'Mon', regs: 25 },
  { name: 'Tue', regs: 45 },
  { name: 'Wed', regs: 38 },
  { name: 'Thu', regs: 70 },
  { name: 'Fri', regs: 85 },
  { name: 'Sat', regs: 110 },
  { name: 'Sun', regs: 90 },
];

const OrganizerDashboard = () => {
  const navigate = useNavigate();

  // Handler for delete hackathon (UI only)
  const handleDeleteHackathon = (id) => {
    alert('Hackathon delete is UI-only');
  };

  return (
    <OrganizerLayout>
      {/* Welcome Banner */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-purple-900/40 via-indigo-900/20 to-transparent p-6 rounded-2xl border border-purple-500/10">
        <div>
          <h2 className="text-xl font-bold text-white">Welcome back, Organizer!</h2>
          <p className="text-xs text-slate-400 mt-1">Here is a quick summary of your hackathons, submissions, and judge assignments.</p>
        </div>
        <button
          onClick={() => navigate('/organizer/hackathon/create')}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all shadow-lg shrink-0"
        >
          <FiPlus size={14} />
          Create Hackathon
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {organizerStats.map((stat, i) => (
          <DashboardStatsCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column: Chart, Hackathons */}
        <div className="lg:col-span-2 space-y-6">
          {/* Analytics Preview Chart */}
          <div className="bg-[#111118] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <FiActivity className="text-purple-400" />
                Registrations Trend (This Week)
              </h3>
              <button
                onClick={() => navigate('/organizer/analytics')}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
              >
                View Analytics
                <FiArrowRight size={12} />
              </button>
            </div>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData}>
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

          {/* Featured/My Hackathons section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">Active Hackathons</h3>
              <button
                onClick={() => navigate('/organizer/hackathons')}
                className="text-xs text-slate-400 hover:text-white font-semibold flex items-center gap-1"
              >
                See All
                <FiArrowRight size={12} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockHackathons.slice(0, 2).map((h, i) => (
                <HackathonCard key={h.id} hackathon={h} index={i} onDelete={handleDeleteHackathon} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Deadlines, Quick Actions, Recent Registrations */}
        <div className="space-y-6">
          {/* Quick Actions */}
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

          {/* Upcoming Deadlines */}
          <div className="bg-[#111118] border border-white/5 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-4">Upcoming Deadlines</h3>
            <div className="space-y-3">
              {upcomingDeadlines.map((dl) => (
                <div
                  key={dl.id}
                  className="flex items-start justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{dl.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-1">{dl.date}</p>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${
                    dl.severity === 'high' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    dl.severity === 'medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                    {dl.remaining}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Registrations mini widget */}
          <div className="bg-[#111118] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <FiUsers className="text-blue-400" />
                Recent Registrations
              </h3>
              <button
                onClick={() => navigate('/organizer/registrations')}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
              >
                Manage
              </button>
            </div>
            <RecentRegistrations registrations={recentRegistrations} />
          </div>
        </div>
      </div>

      {/* Lower Row: Recent Submissions & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Submissions */}
        <div className="lg:col-span-2 bg-[#111118] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <FiLayers className="text-emerald-400" />
              Recent Submissions
            </h3>
            <button
              onClick={() => navigate('/organizer/submissions')}
              className="text-xs text-slate-400 hover:text-white font-semibold flex items-center gap-1"
            >
              See All
              <FiArrowRight size={12} />
            </button>
          </div>

          <div className="space-y-3">
            {recentSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{sub.projectName}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Team: {sub.teamName} · {sub.hackathon}</p>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  sub.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                  sub.status === 'under_review' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                  'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {sub.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications Widget */}
        <div className="bg-[#111118] border border-white/5 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Notification Center</h3>
          <NotificationPanel notifications={notifications.slice(0, 3)} />
        </div>
      </div>
    </OrganizerLayout>
  );
};

export default OrganizerDashboard;
