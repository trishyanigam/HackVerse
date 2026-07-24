import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiEdit2, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const EvaluationSummaryCard = ({ evaluation, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-[#111118] border border-white/5 rounded-2xl p-5 hover:border-purple-500/20 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-4"
    >
      {/* Left */}
      <div className="flex-1 min-w-0">
        <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400">{evaluation.hackathonName}</span>
        <h3 className="text-sm font-bold text-white mt-0.5 truncate">{evaluation.projectName}</h3>
        <p className="text-xs text-slate-500 mt-0.5">Team: {evaluation.teamName}</p>
      </div>

      {/* Score display */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1.5 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl px-3 py-2">
          <FiStar size={13} className="text-amber-400" />
          <span className="text-sm font-bold text-white">{evaluation.totalScore}</span>
          <span className="text-xs text-slate-500">/ {evaluation.maxScore}</span>
        </div>
        <div className={`text-[10px] px-2.5 py-1 rounded-full border font-bold uppercase tracking-wider ${
          evaluation.recommendation === 'winner'
            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            : evaluation.recommendation === 'shortlisted'
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
        }`}>
          {evaluation.recommendation}
        </div>
      </div>

      {/* Date & action */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs text-slate-500 hidden sm:block">
          {new Date(evaluation.evaluatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
        </span>
        <button
          onClick={() => navigate(`/judge/evaluate/${evaluation.projectId}`)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-slate-300 transition-all"
        >
          <FiEdit2 size={11} /> Edit
        </button>
      </div>
    </motion.div>
  );
};

export default EvaluationSummaryCard;
