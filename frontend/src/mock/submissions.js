// Mock data for project submissions

export const submissions = [
  {
    id: 'sub001',
    hackathonId: 'h001',
    hackathonTitle: 'CodeSprint 2025',
    teamName: 'ByteBuilders',
    projectName: 'EcoTrack',
    problemStatement:
      'Lack of real-time environmental monitoring tools for students and communities to track local pollution levels.',
    solution:
      'A web platform that aggregates IoT sensor data and public APIs to display real-time air quality, noise, and water quality metrics on an interactive map.',
    description:
      'EcoTrack uses a React frontend with Leaflet.js for map rendering, a Node.js backend with Express, and MongoDB for storing historical data. Users can subscribe to alerts for their local area.',
    githubUrl: 'https://github.com/bytebuilders/ecotrack',
    liveDemoUrl: 'https://ecotrack.demo.dev',
    demoVideoUrl: 'https://youtube.com/watch?v=demo001',
    techStack: ['React', 'Node.js', 'MongoDB', 'Leaflet.js', 'IoT APIs'],
    screenshots: [],
    presentationUrl: '',
    status: 'submitted',
    reviewStatus: 'under_review',
    submittedAt: '2025-08-09T18:30:00',
    lastUpdated: '2025-08-09T18:30:00',
    score: null,
    feedback: null,
  },
  {
    id: 'sub002',
    hackathonId: 'h003',
    hackathonTitle: 'Web3 Innovate',
    teamName: 'ChainCraft',
    projectName: 'DeFi Wallet Pro',
    problemStatement:
      'Existing DeFi wallets are too complex for non-technical users, leading to poor adoption.',
    solution:
      'A simplified, mobile-first DeFi wallet with guided onboarding, plain English explanations of transactions, and AI-powered portfolio recommendations.',
    description:
      'Built on Ethereum using Solidity smart contracts, with a React Native frontend and integration to multiple DEXes via the 1inch API.',
    githubUrl: 'https://github.com/chaincraft/defi-wallet-pro',
    liveDemoUrl: '',
    demoVideoUrl: 'https://youtube.com/watch?v=demo002',
    techStack: ['Solidity', 'React Native', 'Ethers.js', '1inch API'],
    screenshots: [],
    presentationUrl: '',
    status: 'submitted',
    reviewStatus: 'approved',
    submittedAt: '2025-07-29T22:15:00',
    lastUpdated: '2025-07-30T10:00:00',
    score: 87,
    feedback:
      'Excellent UX approach. Solidity contracts are well-structured. Suggest adding multi-chain support.',
  },
  {
    id: 'sub003',
    hackathonId: 'h002',
    hackathonTitle: 'AI Builder Fest',
    teamName: 'Neural Nexus',
    projectName: 'MedAssist AI',
    problemStatement:
      'Rural patients struggle to get preliminary medical diagnosis due to lack of nearby healthcare facilities.',
    solution:
      'A multilingual AI chatbot that provides preliminary diagnosis based on symptom description, integrated with a telemedicine booking system.',
    description:
      'Uses GPT-4 with a custom fine-tuned dataset of Indian medical conditions. Flask backend, React frontend with voice input support via Web Speech API.',
    githubUrl: 'https://github.com/neuralnexus/medassist-ai',
    liveDemoUrl: 'https://medassist.demo.dev',
    demoVideoUrl: '',
    techStack: ['Python', 'Flask', 'GPT-4', 'React', 'Web Speech API'],
    screenshots: [],
    presentationUrl: '',
    status: 'draft',
    reviewStatus: null,
    submittedAt: null,
    lastUpdated: '2025-08-05T14:00:00',
    score: null,
    feedback: null,
  },
];

export const getSubmissionById = (id) => submissions.find((s) => s.id === id);
export const getSubmissionByHackathon = (hackathonId) =>
  submissions.find((s) => s.hackathonId === hackathonId);
