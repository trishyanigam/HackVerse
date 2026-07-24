export const judgeStats = [
  { label: 'Assigned Projects', value: 8, change: 'Across 2 hackathons', type: 'assigned' },
  { label: 'Pending Reviews', value: 3, change: 'Deadline in 2 days', type: 'pending' },
  { label: 'Completed Reviews', value: 5, change: '100% accuracy', type: 'completed' },
  { label: 'Average Score Given', value: 84.6, change: 'Out of 100 max', type: 'avgScore' }
];

export const recentEvaluations = [
  { id: 'sub001', projectName: 'EcoTrack', teamName: 'ByteBuilders', hackathon: 'CodeSprint 2025', score: 95, date: '2026-07-24T08:30:00', status: 'completed' },
  { id: 'sub002', projectName: 'DeFi Wallet Pro', teamName: 'ChainCraft', hackathon: 'Web3 Innovate', score: 87, date: '2026-07-23T21:15:00', status: 'completed' },
  { id: 'sub003', projectName: 'MedAssist AI', teamName: 'Neural Nexus', hackathon: 'AI Builder Fest', score: 82, date: '2026-07-22T14:00:00', status: 'completed' },
];

export const upcomingDeadlines = [
  { id: 'dl1', title: 'EcoTrack Evaluation Close', date: 'July 27, 2026 11:59 PM', remaining: '2 days left', severity: 'high' },
  { id: 'dl2', title: 'SecureSign Protocol Review', date: 'August 05, 2026 12:00 PM', remaining: '10 days left', severity: 'medium' }
];

export const quickActions = [
  { label: 'View Projects', path: '/judge/projects', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  { label: 'Evaluation History', path: '/judge/history', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { label: 'Profile Settings', path: '/judge/profile', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { label: 'Notifications', path: '/judge/notifications', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
];
