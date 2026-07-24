export const evaluationCriteria = [
  { id: 'innovation', name: 'Innovation & Originality', max: 15, desc: 'How creative and unique is the solution? Does it address the problem statement in a novel way?' },
  { id: 'techComplexity', name: 'Technical Complexity', max: 20, desc: 'Depth of technical logic, engineering decisions, and viability of the codebase architecture.' },
  { id: 'uiUX', name: 'User Interface & Experience', max: 15, desc: 'Intuitiveness of the design, accessibility features, user flow, and overall aesthetic cohesion.' },
  { id: 'functionality', name: 'Functionality & Completeness', max: 15, desc: 'How much of the core feature flow is actually working and deployable? Does the demo function without crashing?' },
  { id: 'scalability', name: 'Scalability & Performance', max: 15, desc: 'Can this platform support high workloads? Are database queries and API layouts optimized?' },
  { id: 'documentation', name: 'Documentation & Code Quality', max: 10, desc: 'Is the repository read-me informative? Is the code clean, commented, and structured?' },
  { id: 'presentation', name: 'Presentation & Pitch', max: 10, desc: 'Clarity of the video walkthrough and visual slides. Did the team convey the value proposition well?' }
];

export const evaluationHistory = [
  { id: 'eval1', projectId: 'sub001', projectName: 'EcoTrack', teamName: 'ByteBuilders', hackathon: 'CodeSprint 2025', score: 95, date: '2026-07-24', status: 'completed' },
  { id: 'eval2', projectId: 'sub002', projectName: 'DeFi Wallet Pro', teamName: 'ChainCraft', hackathon: 'Web3 Innovate', score: 87, date: '2026-07-23', status: 'completed' },
  { id: 'eval3', projectId: 'sub003', projectName: 'MedAssist AI', teamName: 'Neural Nexus', hackathon: 'AI Builder Fest', score: 82, date: '2026-07-22', status: 'completed' },
];
