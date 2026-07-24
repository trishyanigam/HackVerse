import React from 'react';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import AnalyticsCard from '../../components/organizer/AnalyticsCard';
import {
  registrationTrend,
  dailyRegistrations,
  submissionTrend,
  hackathonPopularity,
  prizeDistribution,
  participantStats
} from '../../mock/analytics';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, Cell, PieChart, Pie, Legend,
  RadialBarChart, RadialBar
} from 'recharts';

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const Analytics = () => {
  return (
    <OrganizerLayout>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Event Analytics</h2>
        <p className="text-sm text-slate-500 mt-1">Real-time charts, metrics, and trends for participant registrations and project submissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Registration Trend (AreaChart) */}
        <AnalyticsCard
          title="Registration Trend"
          description="Cumulative count of registrations by month"
          index={0}
        >
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={registrationTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                labelStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                itemStyle={{ color: '#8b5cf6', fontSize: '11px' }}
              />
              <Area type="monotone" dataKey="registrations" stroke="#8b5cf6" fill="url(#colorRegsArea)" />
              <defs>
                <linearGradient id="colorRegsArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </AnalyticsCard>

        {/* Daily Registrations (BarChart) */}
        <AnalyticsCard
          title="Daily Registrations"
          description="Number of registrations per day of the week"
          index={1}
        >
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dailyRegistrations}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                labelStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                itemStyle={{ color: '#3b82f6', fontSize: '11px' }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </AnalyticsCard>

        {/* Submission Trend (LineChart) */}
        <AnalyticsCard
          title="Submission Trend"
          description="Velocity of projects uploaded over the hacking period"
          index={2}
        >
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={submissionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                labelStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                itemStyle={{ color: '#10b981', fontSize: '11px' }}
              />
              <Line type="monotone" dataKey="submissions" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </AnalyticsCard>

        {/* Hackathon Popularity */}
        <AnalyticsCard
          title="Hackathon Popularity"
          description="Comparing registration counts across events"
          index={3}
        >
          <ResponsiveContainer width="100%" height={240}>
            <RadialBarChart data={hackathonPopularity} cx="50%" cy="50%" innerRadius="30%" outerRadius="100%" barSize={10}>
              <Tooltip
                contentStyle={{ backgroundColor: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                labelStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                itemStyle={{ color: '#fff', fontSize: '11px' }}
              />
              <RadialBar minAngle={15} background clockWise dataKey="participants" />
              <Legend iconSize={8} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '10px', color: '#94a3b8' }} />
            </RadialBarChart>
          </ResponsiveContainer>
        </AnalyticsCard>

        {/* Prize Distribution (PieChart) */}
        <AnalyticsCard
          title="Prize Distribution"
          description="Total funds allocated across track categories"
          index={4}
        >
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={prizeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {prizeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff', fontSize: '11px' }}
              />
              <Legend iconSize={8} wrapperStyle={{ fontSize: '10px', color: '#94a3b8' }} />
            </PieChart>
          </ResponsiveContainer>
        </AnalyticsCard>

        {/* Participant Demographics */}
        <AnalyticsCard
          title="Participant Demographics"
          description="Distribution of developers types"
          index={5}
        >
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={participantStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {participantStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff', fontSize: '11px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </AnalyticsCard>
      </div>
    </OrganizerLayout>
  );
};

export default Analytics;
