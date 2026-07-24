// Admin Dashboard Mock Data

export const adminStats = [
  { id: 1, type: 'users', label: 'Total Users', value: 4820, change: '+12% this month', trend: 'up' },
  { id: 2, type: 'organizers', label: 'Total Organizers', value: 134, change: '+3 this week', trend: 'up' },
  { id: 3, type: 'judges', label: 'Total Judges', value: 89, change: '+5 this month', trend: 'up' },
  { id: 4, type: 'hackathons', label: 'Total Hackathons', value: 312, change: '+18 this month', trend: 'up' },
  { id: 5, type: 'teams', label: 'Total Teams', value: 1740, change: '+240 this month', trend: 'up' },
  { id: 6, type: 'submissions', label: 'Total Submissions', value: 5680, change: '+340 this month', trend: 'up' },
  { id: 7, type: 'active', label: 'Active Hackathons', value: 24, change: '6 ending soon', trend: 'neutral' },
  { id: 8, type: 'pending', label: 'Pending Reviews', value: 187, change: 'Requires attention', trend: 'down' },
];

export const adminQuickActions = [
  { label: 'Add Organizer', path: '/admin/organizers', color: 'from-purple-500 to-indigo-500' },
  { label: 'Add Judge', path: '/admin/judges', color: 'from-blue-500 to-cyan-500' },
  { label: 'View Reports', path: '/admin/reports', color: 'from-emerald-500 to-teal-500' },
  { label: 'System Settings', path: '/admin/settings', color: 'from-amber-500 to-orange-500' },
  { label: 'Activity Logs', path: '/admin/activity', color: 'from-rose-500 to-pink-500' },
  { label: 'Analytics', path: '/admin/analytics', color: 'from-violet-500 to-purple-500' },
];

export const adminRecentActivity = [
  { id: 1, action: 'New user registered', actor: 'Rohan Verma', timestamp: '2026-07-24T10:45:00Z', type: 'user' },
  { id: 2, action: 'Hackathon "AI Summit 2026" created', actor: 'Priya Organizer', timestamp: '2026-07-24T09:30:00Z', type: 'hackathon' },
  { id: 3, action: 'Submission reviewed & scored', actor: 'Dr. Sharma (Judge)', timestamp: '2026-07-24T08:15:00Z', type: 'review' },
  { id: 4, action: 'Team "NeuralNinjas" formed', actor: 'Aryan Mehta', timestamp: '2026-07-23T17:00:00Z', type: 'team' },
  { id: 5, action: 'Registration approved', actor: 'Admin', timestamp: '2026-07-23T14:45:00Z', type: 'registration' },
  { id: 6, action: 'User account suspended', actor: 'Admin', timestamp: '2026-07-23T11:00:00Z', type: 'moderation' },
];
