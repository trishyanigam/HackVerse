import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiFolder, FiSend, FiCalendar, FiUser } from 'react-icons/fi';
import StatusBadge from './StatusBadge';

const HackathonCard = ({ hackathon, onView, onEdit, onDelete }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-[#0f0f1a] border border-white/5 rounded-2xl overflow-hidden shadow-lg flex flex-col h-full"
    >
      <div className="h-28 relative">
        <img
          src={hackathon.banner}
          alt={hackathon.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] to-transparent" />
        <div className="absolute top-3 right-3">
          <StatusBadge status={hackathon.status} />
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide">{hackathon.title}</h4>
            <span className="text-[11px] text-slate-500 font-medium">Theme: {hackathon.theme}</span>
          </div>

          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <FiUser size={13} className="text-slate-500" />
              <span>Organizer: <strong className="text-white">{hackathon.organizer}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar size={13} className="text-slate-500" />
              <span>{hackathon.startDate} to {hackathon.endDate}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] uppercase font-bold text-slate-500">
              <div className="text-center bg-white/[0.02] border border-white/5 rounded-lg py-1">
                <FiUsers className="mx-auto mb-1 text-purple-400" size={12} />
                <span>{hackathon.participants} Part.</span>
              </div>
              <div className="text-center bg-white/[0.02] border border-white/5 rounded-lg py-1">
                <FiFolder className="mx-auto mb-1 text-blue-400" size={12} />
                <span>{hackathon.teams} Teams</span>
              </div>
              <div className="text-center bg-white/[0.02] border border-white/5 rounded-lg py-1">
                <FiSend className="mx-auto mb-1 text-emerald-400" size={12} />
                <span>{hackathon.submissions} Subs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-5 pt-3 border-t border-white/5">
          <button
            onClick={() => onView(hackathon)}
            className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold text-slate-300 transition-colors"
          >
            View
          </button>
          <button
            onClick={() => onEdit(hackathon)}
            className="flex-1 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-lg text-xs font-semibold transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(hackathon.id)}
            className="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-xs transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HackathonCard;
