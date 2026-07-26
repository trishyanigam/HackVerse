export const organizerStats = [
  { label: 'Total Hackathons', value: 12, change: '+2 new this month', type: 'hackathons', color: 'from-purple-500 to-indigo-500' },
  { label: 'Total Participants', value: 1845, change: '+24% from last event', type: 'participants', color: 'from-blue-500 to-cyan-500' },
  { label: 'Submissions', value: 432, change: '+18% conversion rate', type: 'submissions', color: 'from-emerald-500 to-teal-500' },
  { label: 'Assigned Judges', value: 28, change: '4 new request pending', type: 'judges', color: 'from-amber-500 to-orange-500' },
];

export const recentRegistrations = [
  { id: 'reg1', teamName: 'ApexCreators', leader: 'Kabir Dev', members: 4, date: '2026-07-24T09:12:00', hackathon: 'NeuralFlow: Generative AI Sprint', status: 'pending' },
  { id: 'reg2', teamName: 'ByteBuilders', leader: 'Trishya Nigam', members: 3, date: '2026-07-23T14:30:00', hackathon: 'NeuralFlow: Generative AI Sprint', status: 'approved' },
  { id: 'reg3', teamName: 'Skyline Devs', leader: 'Sarah Khan', members: 2, date: '2026-07-23T11:15:00', hackathon: 'FitTrack IoT: Smart Wearables', status: 'approved' },
  { id: 'reg4', teamName: 'QuantumCoders', leader: 'Amit Patel', members: 4, date: '2026-07-22T17:45:00', hackathon: 'EtherWallet: Smart Contract Sprint', status: 'pending' },
  { id: 'reg5', teamName: 'Web3 Wizards', leader: 'John Doe', members: 1, date: '2026-07-22T10:00:00', hackathon: 'EtherWallet: Smart Contract Sprint', status: 'rejected' },
];

export const upcomingDeadlines = [
  { id: 'dl1', title: 'NeuralFlow Submission Close', date: 'July 27, 2026 11:59 PM', remaining: '3 days left', severity: 'high' },
  { id: 'dl2', title: 'FitTrack Hardware Dispatch', date: 'August 01, 2026 12:00 PM', remaining: '8 days left', severity: 'medium' },
  { id: 'dl3', title: 'CodeCraft Kickoff Day', date: 'August 28, 2026 02:00 PM', remaining: '1 month left', severity: 'low' },
];

export const recentSubmissions = [
  { id: 'sub1', teamName: 'ByteBuilders', projectName: 'EcoTrack', hackathon: 'CodeSprint 2025', submittedAt: '2026-07-24T08:30:00', status: 'under_review' },
  { id: 'sub2', teamName: 'ChainCraft', projectName: 'DeFi Wallet Pro', hackathon: 'Web3 Innovate', submittedAt: '2026-07-23T21:15:00', status: 'approved' },
  { id: 'sub3', teamName: 'ApexCreators', projectName: 'AI Agents Hub', hackathon: 'NeuralFlow: Generative AI Sprint', submittedAt: '2026-07-23T18:45:00', status: 'pending' },
];

export const quickActions = [
  { label: 'Create Hackathon', path: '/organizer/hackathon/create', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  { label: 'Manage Registrations', path: '/organizer/registrations', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { label: 'Assign Judges', path: '/organizer/judges', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { label: 'View Submissions', path: '/organizer/submissions', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
];
