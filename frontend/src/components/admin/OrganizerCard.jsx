import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiBriefcase, FiCpu, FiUsers } from 'react-icons/fi';
import StatusBadge from './StatusBadge';

const OrganizerCard = ({ organizer, onView, onEdit, onToggleStatus }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-blue-400">
              {organizer.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-tight">{organizer.name}</h4>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold uppercase mt-0.5">
                <FiBriefcase size={10} />
                <span className="truncate max-w-[120px]">{organizer.organization}</span>
              </div>
            </div>
          </div>
          <StatusBadge status={organizer.status} />
        </div>

        {/* Stats */}
        <div className="space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FiMail size={13} className="text-slate-500" />
            <span className="truncate">{organizer.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCpu size={13} className="text-slate-500" />
            <span>Hackathons Created: {organizer.hackathonsCreated}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiUsers size={13} className="text-slate-500" />
            <span>Total Participants Managed: {organizer.totalParticipants}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-5 pt-3 border-t border-white/5">
        <button
          onClick={() => onView(organizer)}
          className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold text-slate-300 transition-colors"
        >
          View
        </button>
        <button
          onClick={() => onEdit(organizer)}
          className="flex-1 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 rounded-lg text-xs font-semibold transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onToggleStatus(organizer)}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            organizer.status === 'suspended'
              ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400'
              : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400'
          }`}
        >
          {organizer.status === 'suspended' ? 'Activate' : 'Suspend'}
        </button>
      </div>
    </motion.div>
  );
};

export default OrganizerCard;
