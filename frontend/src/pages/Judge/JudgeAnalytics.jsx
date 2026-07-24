import React from 'react';
import JudgeLayout from '../../layouts/JudgeLayout';
import AnalyticsCard from '../../components/judge/AnalyticsCard';
import {
  scoresDistribution,
  reviewsTrend,
  monthlyReviews,
  averageScores,
} from '../../mock/analytics';
import { evaluationHistory } from '../../mock/evaluations';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const PIE_COLORS = ['#10b981', '#f59e0b'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a27] border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl">
      <p className="text-slate-400 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-bold">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

const summaryStats = [
  { label: 'Total Evaluated', value: evaluationHistory.length },
  { label: 'Avg Score Given', value: Math.round(evaluationHistory.reduce((a, e) => a + e.score, 0) / evaluationHistory.length) + '%' },
  { label: 'Highest Score', value: Math.max(...evaluationHistory.map((e) => e.score)) },
  { label: 'Lowest Score', value: Math.min(...evaluationHistory.map((e) => e.score)) },
];

const JudgeAnalytics = () => {
  return (
    <JudgeLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-white">Analytics</h2>
          <p className="text-sm text-slate-500 mt-1">Insights into your evaluation performance.</p>
        </motion.div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {summaryStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#111118] border border-white/5 rounded-2xl p-4 text-center"
            >
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Score Distribution */}
          <AnalyticsCard title="Score Distribution">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={scoresDistribution} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="range" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Projects" radius={[6, 6, 0, 0]} fill="url(#barGrad)" />
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </AnalyticsCard>

          {/* Reviews Pie */}
          <AnalyticsCard title="Reviews Status">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={reviewsTrend}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {reviewsTrend.map((entry, index) => (
                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} strokeWidth={0} />
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
          </AnalyticsCard>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Monthly Reviews Trend */}
          <AnalyticsCard title="Monthly Reviews">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthlyReviews}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="reviews"
                  name="Reviews"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  dot={{ fill: '#8b5cf6', r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </AnalyticsCard>

          {/* Average Scores by Hackathon */}
          <AnalyticsCard title="Avg Score by Hackathon">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={averageScores} layout="vertical" barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="hackathon" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="avgScore" name="Avg Score" radius={[0, 6, 6, 0]} fill="url(#hBarGrad)" />
                <defs>
                  <linearGradient id="hBarGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </AnalyticsCard>
        </div>
      </div>
    </JudgeLayout>
  );
};

export default JudgeAnalytics;
