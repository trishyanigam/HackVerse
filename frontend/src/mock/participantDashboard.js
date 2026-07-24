// Mock data for participant dashboard

export const participantUser = {
  id: 'u001',
  name: 'Aryan Sharma',
  email: 'aryan.sharma@college.edu',
  avatar: null,
  college: 'IIT Delhi',
  branch: 'Computer Science & Engineering',
  year: '3rd Year',
  role: 'Participant',
  bio: 'Passionate full-stack developer and AI enthusiast. Love building products that solve real-world problems.',
  skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'MongoDB', 'Docker'],
  socialLinks: {
    github: 'https://github.com/aryan-sharma',
    linkedin: 'https://linkedin.com/in/aryan-sharma',
    twitter: 'https://twitter.com/aryan_dev',
    portfolio: 'https://aryan.dev',
  },
  joinedDate: '2024-01-15',
  hackathonsWon: 2,
  totalPoints: 4850,
  rank: 12,
};

export const dashboardStats = [
  {
    id: 'stat1',
    label: 'Hackathons Registered',
    value: 8,
    icon: 'FiCalendar',
    color: 'purple',
    change: '+2 this month',
    changePositive: true,
  },
  {
    id: 'stat2',
    label: 'Submissions Made',
    value: 6,
    icon: 'FiUpload',
    color: 'blue',
    change: '+1 this week',
    changePositive: true,
  },
  {
    id: 'stat3',
    label: 'Teams Joined',
    value: 4,
    icon: 'FiUsers',
    color: 'emerald',
    change: 'Same as last month',
    changePositive: null,
  },
  {
    id: 'stat4',
    label: 'Total Points',
    value: '4,850',
    icon: 'FiStar',
    color: 'amber',
    change: '+320 this month',
    changePositive: true,
  },
];

export const upcomingDeadlines = [
  {
    id: 'dl1',
    hackathon: 'CodeSprint 2025',
    type: 'Submission Deadline',
    dueDate: '2025-08-10T23:59:00',
    urgency: 'high',
  },
  {
    id: 'dl2',
    hackathon: 'AI Builder Fest',
    type: 'Registration Closes',
    dueDate: '2025-08-15T23:59:00',
    urgency: 'medium',
  },
  {
    id: 'dl3',
    hackathon: 'Web3 Innovate',
    type: 'Team Formation',
    dueDate: '2025-08-20T23:59:00',
    urgency: 'low',
  },
];

export const registrationTrendData = [
  { month: 'Jan', registrations: 1 },
  { month: 'Feb', registrations: 1 },
  { month: 'Mar', registrations: 2 },
  { month: 'Apr', registrations: 1 },
  { month: 'May', registrations: 3 },
  { month: 'Jun', registrations: 2 },
  { month: 'Jul', registrations: 2 },
  { month: 'Aug', registrations: 0 },
];

export const submissionStatusData = [
  { name: 'Approved', value: 3, fill: '#10b981' },
  { name: 'Under Review', value: 2, fill: '#8b5cf6' },
  { name: 'Draft', value: 1, fill: '#6b7280' },
];

export const participationSummaryData = [
  { month: 'Mar', wins: 0, submissions: 1, registrations: 2 },
  { month: 'Apr', wins: 1, submissions: 1, registrations: 1 },
  { month: 'May', wins: 0, submissions: 2, registrations: 3 },
  { month: 'Jun', wins: 1, submissions: 2, registrations: 2 },
  { month: 'Jul', wins: 0, submissions: 1, registrations: 2 },
];
