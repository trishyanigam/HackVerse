import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiCpu, FiUser } from 'react-icons/fi';
import StatusBadge from './StatusBadge';

const TeamCard = ({ team, onView, onEdit }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-bold text-cyan-400">
              {team.teamName.charAt(0)}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-tight">{team.teamName}</h4>
              <span className="text-[11px] text-slate-500 font-semibold uppercase mt-0.5">
                {team.hackathon}
              </span>
            </div>
          </div>
          <StatusBadge status={team.submissionStatus} />
        </div>

        {/* Stats */}
        <div className="space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FiUser size={13} className="text-slate-500" />
            <span>Leader: <strong className="text-white">{team.leader}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <FiUsers size={13} className="text-slate-500" />
            <span>Members Count: {team.members}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCpu size={13} className="text-slate-500" />
            <span>Formed: {new Date(team.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-5 pt-3 border-t border-white/5">
        <button
          onClick={() => onView(team)}
          className="flex-grow py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold text-slate-300 transition-colors"
        >
          View Team Details
        </button>
        <button
          onClick={() => onEdit(team)}
          className="py-1.5 px-3 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-lg text-xs font-semibold transition-colors"
        >
          Edit
        </button>
      </div>
    </motion.div>
  );
};

export default TeamCard;
