import React, { useState } from 'react';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import WinnerCard from '../../components/organizer/WinnerCard';
import { FiCheckCircle, FiPlus, FiTrash, FiAward } from 'react-icons/fi';
import toast from 'react-hot-toast';

const mockWinners = [
  { place: '1st', teamName: 'ByteBuilders', projectName: 'EcoTrack', hackathon: 'CodeSprint 2025', prize: '₹1,00,000 + Internship', score: 95, githubUrl: 'https://github.com/bytebuilders/ecotrack' },
  { place: '2nd', teamName: 'ChainCraft', projectName: 'DeFi Wallet Pro', hackathon: 'Web3 Innovate', prize: '₹75,000', score: 87, githubUrl: 'https://github.com/chaincraft/defi-wallet' },
  { place: '3rd', teamName: 'Neural Nexus', projectName: 'MedAssist AI', hackathon: 'AI Builder Fest', prize: '₹50,000', score: 82, githubUrl: '' },
  { place: 'special', teamName: 'QuantumLeap', projectName: 'SecureSign Protocol', hackathon: 'Web3 Innovate', prize: '₹15,000 + Special Mention', score: 79, githubUrl: '' },
];

const Results = () => {
  const [winners, setWinners] = useState(mockWinners);
  const [isPublished, setIsPublished] = useState(false);

  const handlePublish = () => {
    setIsPublished(true);
    toast.success('Winners published successfully! Notifications sent to participants.');
  };

  return (
    <OrganizerLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Hackathon Winners & Results</h2>
          <p className="text-sm text-slate-500 mt-1">Review evaluations, assign winner places, and publish official results to leaderboard</p>
        </div>
        <button
          onClick={handlePublish}
          disabled={isPublished}
          className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all shadow-lg shrink-0 ${
            isPublished ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 active:scale-[0.98]'
          }`}
        >
          {isPublished ? (
            <>
              <FiCheckCircle size={15} />
              Results Published
            </>
          ) : (
            <>
              <FiAward size={15} />
              Publish Leaderboard
            </>
          )}
        </button>
      </div>

      {/* Winners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {winners.map((winner, idx) => (
          <WinnerCard
            key={winner.teamName}
            {...winner}
            index={idx}
          />
        ))}
      </div>

      {/* Editor preview mock section */}
      <div className="bg-[#111118] border border-white/5 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">Results Placement Panel</h3>
        <p className="text-xs text-slate-400 mb-6 max-w-xl leading-relaxed">
          Select team entries matching evaluation criteria, then map them to official winner placeholders. You can draft and review results before final leaderboard publishing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: '1st Place Team', placeholder: 'ByteBuilders' },
            { title: '2nd Place Team', placeholder: 'ChainCraft' },
            { title: '3rd Place Team', placeholder: 'Neural Nexus' },
            { title: 'Special Mention Team', placeholder: 'QuantumLeap' },
          ].map((item) => (
            <div key={item.title}>
              <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 block font-medium">{item.title}</label>
              <select defaultValue={item.placeholder} className="w-full bg-[#0a0a0f] border border-white/10 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-500/50 transition-all">
                <option value="ByteBuilders">ByteBuilders</option>
                <option value="ChainCraft">ChainCraft</option>
                <option value="Neural Nexus">Neural Nexus</option>
                <option value="QuantumLeap">QuantumLeap</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </OrganizerLayout>
  );
};

export default Results;
