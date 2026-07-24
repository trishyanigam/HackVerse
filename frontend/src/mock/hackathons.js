export const mockHackathons = [
  {
    id: 'neuralflow-2026',
    title: 'NeuralFlow: Generative AI Sprint',
    tagline: 'Build the next generation of autonomous LLM workflows and cognitive agents.',
    theme: 'Artificial Intelligence & Machine Learning',
    description: 'NeuralFlow brings together machine learning engineers, prompt designers, and fullstack creators to build autonomous agency tools. Focus on multi-agent collaboration, semantic memory retrievals, and real-world productivity enhancements.',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    status: 'ongoing', // ongoing, upcoming, completed
    featured: true,
    prizePool: '$45,000',
    registrations: 489,
    organizer: 'Cerebral AI Lab & HackVerse Corp',
    venue: 'Virtual (Global Platform)',
    teamSize: '1 - 4 Members',
    category: 'AI & Analytics',
    timeline: {
      start: 'July 24, 2026',
      end: 'July 27, 2026',
      milestones: [
        { title: 'Kickoff & Team Matching', date: 'July 24, 10:00 AM' },
        { title: 'Mid-way Progress Check', date: 'July 25, 06:00 PM' },
        { title: 'Submission Deadline', date: 'July 27, 11:59 PM' },
        { title: 'Winner Announcement', date: 'July 29, 05:00 PM' }
      ]
    },
    rules: [
      'All source code must be hosted in a public GitHub repository created after the kickoff.',
      'Pre-existing platforms or commercial products cannot be submitted.',
      'Use of AI APIs (OpenAI, Anthropic, Gemini, etc.) is highly encouraged but must be declared.',
      'Maximum team size is 4 members. Solo participants are allowed.',
      'Deliverables must include a 3-minute video pitch and a working demo URL.'
    ],
    judgingCriteria: [
      { criteria: 'Technical Complexity', weight: '30%', desc: 'Depth of logic, code architecture, and deployment viability.' },
      { criteria: 'Originality & Innovation', weight: '25%', desc: 'Creativity of the concept and divergence from saturated AI solutions.' },
      { criteria: 'User Experience (UX)', weight: '25%', desc: 'Intuitiveness, aesthetic cohesion, and accessibility markers.' },
      { criteria: 'Pitch & Presentation', weight: '20%', desc: 'Clarity of documentation and readability of the video walkthrough.' }
    ]
  },
  {
    id: 'etherwallet-hack',
    title: 'EtherWallet: Smart Contract Sprint',
    tagline: 'Architect decentralized transaction pipes and secure account abstract utilities.',
    theme: 'Blockchain & Decentralized Finance',
    description: 'A focused crypto hackathon dedicated to Web3 account abstraction, gasless transactions, and premium decentralized application (dApp) experiences. Help onboarding the next billion users onto DeFi safely.',
    banner: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=600&auto=format&fit=crop',
    status: 'ongoing',
    featured: true,
    prizePool: '$30,000',
    registrations: 218,
    organizer: 'Ethereum Builders Foundation',
    venue: 'Hybrid (San Francisco + Online)',
    teamSize: '2 - 4 Members',
    category: 'Blockchain',
    timeline: {
      start: 'July 20, 2026',
      end: 'July 25, 2026',
      milestones: [
        { title: 'Hacking Begins', date: 'July 20, 09:00 AM' },
        { title: 'Mentor Checkpoints', date: 'July 22, 02:00 PM' },
        { title: 'Submissions Close', date: 'July 25, 11:59 PM' },
        { title: 'Live Judging Showcase', date: 'July 26, 03:00 PM' }
      ]
    },
    rules: [
      'Smart contracts must be deployed on an Ethereum Sepolia or equivalent testnet.',
      'Verifiable contracts source code on Etherscan is required for scoring.',
      'No plagiarized forks of existing protocol libraries.',
      'Teams must consist of at least 2 developers.'
    ],
    judgingCriteria: [
      { criteria: 'Security Audit Profile', weight: '40%', desc: 'Resistance to common smart contract vulnerabilities (reentrancy, overflows).' },
      { criteria: 'User Flow (UX)', weight: '30%', desc: 'Frictionless transactions and abstract wallet logins.' },
      { criteria: 'Utility / Value Add', weight: '30%', desc: 'How effectively does the project solve dApp entry barriers?' }
    ]
  },
  {
    id: 'fittrack-iot-2026',
    title: 'FitTrack IoT: Smart Wearables',
    tagline: 'Combine edge computing sensors with modern metrics pipelines.',
    theme: 'Internet of Things & HealthTech',
    description: 'FitTrack IoT challenges hackers to integrate physical telemetry sensors (heart rates, step counters, temperature logs) with cloud dashboard metrics in real-time, focusing on user wellness indicators.',
    banner: 'https://images.unsplash.com/photo-1510017808632-944c126e8aa2?q=80&w=600&auto=format&fit=crop',
    status: 'upcoming',
    featured: true,
    prizePool: '$25,000',
    registrations: 345,
    organizer: 'HealthTech Labs & SensorNodes',
    venue: 'Virtual (Global)',
    teamSize: '1 - 3 Members',
    category: 'Internet of Things',
    timeline: {
      start: 'August 12, 2026',
      end: 'August 16, 2026',
      milestones: [
        { title: 'Hardware Devkits Dispatched', date: 'August 01, 12:00 PM' },
        { title: 'Workshop: Edge Computing', date: 'August 12, 11:00 AM' },
        { title: 'Telemetry Submissions', date: 'August 16, 11:59 PM' }
      ]
    },
    rules: [
      'Projects must utilize at least one mock or physical sensor telemetry source.',
      'Cloud platforms used (AWS, Azure, Google Cloud) must be documented.',
      'Open-source licensing of project structures is mandatory.'
    ],
    judgingCriteria: [
      { criteria: 'Telemetry Reliability', weight: '35%', desc: 'Quality of telemetry data extraction and edge computation latency.' },
      { criteria: 'Health Analytics Insights', weight: '35%', desc: 'Meaningfulness of metrics dashboards for medical or wellness users.' },
      { criteria: 'Hardware Integration', weight: '30%', desc: 'Creative usage of sensor configurations.' }
    ]
  },
  {
    id: 'codecraft-ide-hack',
    title: 'CodeCraft: Developer Tools Sprint',
    tagline: 'Build extensions, CLIs, or IDE overlays that optimize developer velocity.',
    theme: 'Developer Experience & Productivity',
    description: 'An online global challenge focused purely on developer velocity. Create tools that reduce keystrokes, automate package deployments, compile logs, or optimize testing configurations.',
    banner: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=600&auto=format&fit=crop',
    status: 'upcoming',
    featured: false,
    prizePool: '$20,000',
    registrations: 156,
    organizer: 'DevVelocity & GitHub Sponsors',
    venue: 'Virtual (Global)',
    teamSize: '1 - 4 Members',
    category: 'Developer Tools',
    timeline: {
      start: 'August 28, 2026',
      end: 'August 31, 2026',
      milestones: [
        { title: 'IDE APIs Workshop', date: 'August 28, 02:00 PM' },
        { title: 'Coding Terminus', date: 'August 31, 11:59 PM' }
      ]
    },
    rules: [
      'The utility must support at least one popular editor (VS Code, Vim, Cursor, IntelliJ) or terminal shell.',
      'Documentation must contain clear installation guides.'
    ],
    judgingCriteria: [
      { criteria: 'Productivity Impact', weight: '50%', desc: 'Estimated time saved or complexity reduced for day-to-day coding tasks.' },
      { criteria: 'Ease of Installation', weight: '30%', desc: 'Minimal configuration required for standard developers.' },
      { criteria: 'Compatibility', weight: '20%', desc: 'Graceful handling of edge configuration inputs.' }
    ]
  },
  {
    id: 'smartagri-sensor-sprint',
    title: 'SmartAgri: Agritech IoT Hack',
    tagline: 'Develop smart crop analytics and automatic greenhouse water triggers.',
    theme: 'Sustainable Technology & Agritech',
    description: 'Focuses on combating food insecurity and environmental challenges using IoT. Create crop analytics dashboards, soil moisture sensors, or solar-powered greenhouse watering logic.',
    banner: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=600&auto=format&fit=crop',
    status: 'completed',
    featured: false,
    prizePool: '$15,000',
    registrations: 98,
    organizer: 'GreenFields Foundation',
    venue: 'Berlin Hub + Virtual',
    teamSize: '1 - 4 Members',
    category: 'Internet of Things',
    timeline: {
      start: 'June 10, 2026',
      end: 'June 12, 2026',
      milestones: [
        { title: 'Orientation Kickoff', date: 'June 10, 09:00 AM' },
        { title: 'Hacking Period End', date: 'June 12, 06:00 PM' },
        { title: 'Winners Declared', date: 'June 14, 12:00 PM' }
      ]
    },
    rules: [
      'Must address a specific sustainability objective (water conservation, soil protection).',
      'Telemetry logs must be uploaded as CSV or REST JSON payloads.'
    ],
    judgingCriteria: [
      { criteria: 'Eco-Impact Potential', weight: '45%', desc: 'Measurable environmental or resource-saving improvements.' },
      { criteria: 'Feasibility', weight: '35%', desc: 'Real-world deployability and low-cost materials usage.' },
      { criteria: 'Dashboard Clarity', weight: '20%', desc: 'How understandable the telemetry logs are to lay farmers.' }
    ]
  }
];

export default mockHackathons;
