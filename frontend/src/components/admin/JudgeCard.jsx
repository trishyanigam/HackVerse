import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiAward, FiCheckSquare, FiStar } from 'react-icons/fi';
import StatusBadge from './StatusBadge';

const JudgeCard = ({ judge, onView, onEdit, onToggleStatus, onDelete }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-bold text-amber-400">
              {judge.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-tight">{judge.name}</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {judge.expertise.map((exp) => (
                  <span key={exp} className="px-1.5 py-0.5 bg-white/5 text-[9px] font-semibold text-slate-400 rounded-md">
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <StatusBadge status={judge.status} />
        </div>

        {/* Info */}
        <div className="space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FiMail size={13} className="text-slate-500" />
            <span className="truncate">{judge.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiAward size={13} className="text-slate-500" />
            <span>Assigned Projects: {judge.projectsAssigned}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCheckSquare size={13} className="text-slate-500" />
            <span>Reviews Completed: {judge.reviewsCompleted}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiStar size={13} className="text-amber-400 fill-amber-400/20" />
            <span>Rating: <strong className="text-white">{judge.rating}</strong> / 5.0</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-5 pt-3 border-t border-white/5">
        <button
          onClick={() => onView(judge)}
          className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold text-slate-300 transition-colors"
        >
          View
        </button>
        <button
          onClick={() => onEdit(judge)}
          className="flex-1 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-lg text-xs font-semibold transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onToggleStatus(judge)}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            judge.status === 'suspended'
              ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400'
              : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400'
          }`}
        >
          {judge.status === 'suspended' ? 'Activate' : 'Suspend'}
        </button>
      </div>
    </motion.div>
  );
};

export default JudgeCard;
