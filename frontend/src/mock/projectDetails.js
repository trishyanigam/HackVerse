export const mockProjectDetails = {
  sub001: {
    id: 'sub001',
    projectName: 'EcoTrack',
    teamName: 'ByteBuilders',
    hackathonName: 'CodeSprint 2025',
    members: [
      { name: 'Aryan Sharma', role: 'Leader / Fullstack' },
      { name: 'Priya Gupta', role: 'Frontend Designer' },
      { name: 'Rohan Verma', role: 'Backend / IoT Dev' }
    ],
    problemStatement: 'Lack of real-time environmental monitoring tools for students and communities to track local pollution levels.',
    solution: 'A web platform that aggregates IoT sensor data and public air metrics APIs to display real-time air quality, noise, and water indicators on an interactive map.',
    description: 'EcoTrack uses a React frontend with Leaflet.js maps, a Node/Express backend, and MongoDB. The system utilizes mock sensor streams representing PM2.5, carbon levels, and humidity telemetry from college campuses.',
    techStack: ['React', 'Leaflet.js', 'Node.js', 'Express', 'MongoDB', 'IoT Mock API'],
    githubUrl: 'https://github.com/bytebuilders/ecotrack',
    liveDemoUrl: 'https://ecotrack.demo.dev',
    presentationPdf: 'https://example.com/ecotrack-presentation.pdf',
    demoVideo: 'https://youtube.com/watch?v=ecotrack-demo',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=300&auto=format&fit=crop'
    ]
  },
  sub004: {
    id: 'sub004',
    projectName: 'SecureSign Protocol',
    teamName: 'QuantumLeap',
    hackathonName: 'Web3 Innovate',
    members: [
      { name: 'Kabir Mehta', role: 'Smart Contract Auditor' },
      { name: 'Aditi Roy', role: 'Frontend Engineer' }
    ],
    problemStatement: 'Existing digital signature networks rely on central authorities, creating key custody risks.',
    solution: 'A fully decentralized transaction signature layer built on Ethereum Sepolia, utilizing public ledger validations and gasless meta-transactions.',
    description: 'SecureSign provides secure document signatures using cryptographic keys stored locally. Documents are hashed on IPFS and mapped onto account abstract wallet logs.',
    techStack: ['Solidity', 'Ethers.js', 'IPFS', 'React', 'Tailwind CSS'],
    githubUrl: 'https://github.com/quantumleap/securesign',
    liveDemoUrl: 'https://securesign.demo.dev',
    presentationPdf: 'https://example.com/securesign-pitch.pdf',
    demoVideo: 'https://youtube.com/watch?v=securesign-demo',
    screenshots: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=300&auto=format&fit=crop'
    ]
  }
};

export const getProjectDetails = (id) => mockProjectDetails[id] || mockProjectDetails['sub001'];
