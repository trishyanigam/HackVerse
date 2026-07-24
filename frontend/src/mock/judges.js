export const mockJudges = [
  {
    id: 'j1',
    name: 'Dr. Aris Thorne',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    expertise: ['Generative AI', 'Deep Learning', 'Python'],
    email: 'aris.thorne@ai-institute.org',
    projectsAssigned: 3,
    maxProjects: 5,
    assignedProjectsList: [
      { id: 'sub001', name: 'EcoTrack', team: 'ByteBuilders' },
      { id: 'sub003', name: 'MedAssist AI', team: 'Neural Nexus' }
    ]
  },
  {
    id: 'j2',
    name: 'Elena Rostova',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    expertise: ['Smart Contracts', 'Solidity', 'Web3 Architecture'],
    email: 'elena@blockchain-lab.io',
    projectsAssigned: 2,
    maxProjects: 6,
    assignedProjectsList: [
      { id: 'sub002', name: 'DeFi Wallet Pro', team: 'ChainCraft' }
    ]
  },
  {
    id: 'j3',
    name: 'Siddharth Mehta',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    expertise: ['UI/UX Design', 'Product Strategy', 'React Frontend'],
    email: 'sid@designtech.co',
    projectsAssigned: 0,
    maxProjects: 4,
    assignedProjectsList: []
  },
  {
    id: 'j4',
    name: 'Sarah Jenkins',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    expertise: ['IoT Telemetry', 'Cloud Infrastructure', 'Embedded C++'],
    email: 'sarah.j@iot-solutions.net',
    projectsAssigned: 1,
    maxProjects: 4,
    assignedProjectsList: [
      { id: 'sub005', name: 'Smart Watering Systems', team: 'GreenRoots' }
    ]
  }
];

export default mockJudges;
