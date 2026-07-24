import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiGithub, FiExternalLink, FiUsers } from 'react-icons/fi';

const placeMap = {
  '1st': { title: 'First Place', color: 'from-amber-400 to-amber-600', shadow: 'shadow-amber-500/10 border-amber-500/20' },
  '2nd': { title: 'Second Place', color: 'from-slate-300 to-slate-500', shadow: 'shadow-slate-400/10 border-slate-400/20' },
  '3rd': { title: 'Third Place', color: 'from-amber-700 to-amber-900', shadow: 'shadow-amber-800/10 border-amber-800/20' },
  'special': { title: 'Special Mention', color: 'from-purple-500 to-blue-500', shadow: 'shadow-purple-500/10 border-purple-500/20' },
};

const WinnerCard = ({ place, teamName, projectName, hackathon, prize, score, githubUrl, liveDemoUrl, index }) => {
  const config = placeMap[place] || placeMap['special'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className={`bg-[#111118] border rounded-2xl p-6 shadow-2xl relative overflow-hidden group transition-all duration-300 ${config.shadow}`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full blur-2xl" />

      {/* Award Badge */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <span className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full text-white bg-gradient-to-r ${config.color} shadow`}>
          {config.title}
        </span>
        <FiAward size={24} className={`text-transparent bg-clip-text bg-gradient-to-r ${config.color} shrink-0`} style={{ fill: 'currentColor' }} />
      </div>

      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">{projectName}</h3>
      <p className="text-xs text-purple-400 font-semibold mb-3">{teamName}</p>
      <p className="text-xs text-slate-500 mb-4">{hackathon}</p>

      {/* Details Box */}
      <div className="bg-[#0a0a0f] border border-white/5 rounded-xl p-3.5 space-y-2 mb-4">
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Prize Won</span>
          <span className="text-emerald-400 font-bold">{prize}</span>
        </div>
        <div className="flex justify-between text-xs border-t border-white/5 pt-2">
          <span className="text-slate-500">Evaluation Score</span>
          <span className="text-white font-semibold">{score}/100</span>
        </div>
      </div>

      {/* Footer links */}
      <div className="flex gap-4 border-t border-white/5 pt-4 text-xs">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <FiGithub size={13} />
            GitHub
          </a>
        )}
        {liveDemoUrl && (
          <a
            href={liveDemoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <FiExternalLink size={13} />
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default WinnerCard;
