import { FiCpu, FiShield, FiSliders, FiActivity, FiGlobe, FiDatabase } from 'react-icons/fi';

export const mockCategories = [
  { id: 'ai', label: 'AI & Analytics', count: 12, description: 'LLMs, AI agents, data modeling, neural workflows.', icon: 'FiCpu' },
  { id: 'blockchain', label: 'Blockchain & DeFi', count: 8, description: 'Smart contracts, web3 wallets, decentralized pipelines.', icon: 'FiShield' },
  { id: 'iot', label: 'Internet of Things', count: 6, description: 'Wearables, telemetry loggers, edge computing nodes.', icon: 'FiActivity' },
  { id: 'devtools', label: 'Developer Tools', count: 9, description: 'Editor extensions, CLI scripts, code compilers.', icon: 'FiSliders' },
  { id: 'sustainability', label: 'Green Tech & Agritech', count: 5, description: 'Clean energy apps, solar analytics, crop trackers.', icon: 'FiGlobe' },
  { id: 'cloud', label: 'Cloud Infrastructure', count: 7, description: 'K8s, serverless wrappers, microservices, databases.', icon: 'FiDatabase' }
];

export default mockCategories;
