import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiCpu, FiUser, FiFileText, FiAward } from 'react-icons/fi';
import StatusBadge from './StatusBadge';

const SubmissionCard = ({ submission, onView, onAssignJudge }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-indigo-400">
              <FiFileText size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-tight">{submission.projectName}</h4>
              <span className="text-[11px] text-slate-500 font-semibold uppercase mt-0.5">
                {submission.hackathon}
              </span>
            </div>
          </div>
          <StatusBadge status={submission.status} />
        </div>

        {/* Info */}
        <div className="space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FiUsers size={13} className="text-slate-500" />
            <span>Team: <strong className="text-white">{submission.team}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <FiUser size={13} className="text-slate-500" />
            <span>Judge: {submission.judge ? <strong className="text-white">{submission.judge}</strong> : <span className="text-rose-400 font-bold">Unassigned</span>}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiAward size={13} className="text-slate-500" />
            <span>Score: {submission.score !== null ? <span className="text-emerald-400 font-bold">{submission.score}%</span> : <span className="text-slate-500">Not Graded</span>}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-5 pt-3 border-t border-white/5">
        <button
          onClick={() => onView(submission)}
          className="flex-grow py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold text-slate-300 transition-colors"
        >
          View Submission
        </button>
        {!submission.judge && onAssignJudge && (
          <button
            onClick={() => onAssignJudge(submission)}
            className="py-1.5 px-3 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-lg text-xs font-semibold transition-colors"
          >
            Assign Judge
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default SubmissionCard;
