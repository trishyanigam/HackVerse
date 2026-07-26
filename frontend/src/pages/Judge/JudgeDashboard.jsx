import React from 'react';
import JudgeLayout from '../../layouts/JudgeLayout';
import DashboardStatCard from '../../components/judge/DashboardStatCard';
import QuickActions from '../../components/judge/QuickActions';
import ActivityFeed from '../../components/judge/ActivityFeed';
import { judgeStats, recentEvaluations, upcomingDeadlines } from '../../mock/judgeDashboard';
import { motion } from 'framer-motion';
import { FiClock, FiAlertTriangle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const statsData = [
  { id: 1, type: 'assigned', label: 'Assigned Projects', value: judgeStats.find(s => s.type === 'assigned')?.value || 8, change: 'Across 2 hackathons' },
  { id: 2, type: 'pending', label: 'Pending Reviews', value: judgeStats.find(s => s.type === 'pending')?.value || 3, change: 'Deadline in 2 days' },
  { id: 3, type: 'completed', label: 'Completed Reviews', value: judgeStats.find(s => s.type === 'completed')?.value || 5, change: '100% accuracy' },
  { id: 4, type: 'avgScore', label: 'Average Score', value: judgeStats.find(s => s.type === 'avgScore')?.value || 84.6, change: 'Out of 100' },
];

const activityFromEvaluations = recentEvaluations.map((e) => ({
  id: e.id,
  message: `You evaluated "${e.projectName}" (${e.teamName}) — Score: ${e.score}/100`,
  timestamp: e.date,
}));

const JudgeDashboard = () => {
  const { user } = useAuth();
  const displayName = user?.name || user?.email?.split('@')[0] || 'Judge';

  return (
    <JudgeLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-white">Welcome back, {displayName}! 👋</h2>
          <p className="text-sm text-slate-500 mt-1">Here's an overview of your evaluation assignments and history.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statsData.map((stat, i) => (
            <DashboardStatCard key={stat.id} stat={stat} index={i} />
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Actions</h3>
          <QuickActions />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#111118] border border-white/5 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-gradient-to-b from-purple-500 to-blue-500 inline-block" />
              Recent Activity
            </h3>
            <ActivityFeed activities={activityFromEvaluations} />
          </div>

          <div className="bg-[#111118] border border-white/5 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-gradient-to-b from-amber-500 to-orange-500 inline-block" />
              Upcoming Deadlines
            </h3>
            <div className="space-y-3">
              {upcomingDeadlines.map((dl, i) => (
                <motion.div
                  key={dl.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`flex items-start gap-3 p-3 rounded-xl border ${
                    dl.severity === 'high'
                      ? 'bg-red-500/5 border-red-500/15'
                      : 'bg-amber-500/5 border-amber-500/15'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    dl.severity === 'high' ? 'bg-red-500/15' : 'bg-amber-500/15'
                  }`}>
                    {dl.severity === 'high'
                      ? <FiAlertTriangle size={14} className="text-red-400" />
                      : <FiClock size={14} className="text-amber-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{dl.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{dl.date}</p>
                    <span className={`text-[10px] font-bold mt-1 inline-block ${
                      dl.severity === 'high' ? 'text-red-400' : 'text-amber-400'
                    }`}>{dl.remaining}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </JudgeLayout>
  );
};

export default JudgeDashboard;
