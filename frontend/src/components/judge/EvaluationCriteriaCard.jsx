import React from 'react';
import { motion } from 'framer-motion';

const EvaluationCriteriaCard = ({ criterion, score, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[#111118] border border-white/5 rounded-2xl p-5 space-y-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-white">{criterion.name}</h4>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{criterion.description}</p>
        </div>
        <span className="shrink-0 text-xs text-purple-400 font-bold bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">
          Weight: {criterion.weight}%
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={criterion.maxScore}
            value={score}
            onChange={(e) => onChange(criterion.id, Number(e.target.value))}
            className="w-full h-2 rounded-full accent-purple-500 cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-slate-600">0</span>
            <span className="text-[10px] text-slate-600">{criterion.maxScore}</span>
          </div>
        </div>
        <div className="w-14 h-10 bg-white/[0.04] border border-white/5 rounded-xl flex items-center justify-center">
          <span className="text-sm font-bold text-white">{score}</span>
        </div>
      </div>

      <div className="w-full bg-white/[0.04] rounded-full h-1.5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
          animate={{ width: `${(score / criterion.maxScore) * 100}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </motion.div>
  );
};

export default EvaluationCriteriaCard;
