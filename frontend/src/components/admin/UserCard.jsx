import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCalendar, FiActivity } from 'react-icons/fi';
import StatusBadge from './StatusBadge';

const UserCard = ({ user, onView, onEdit, onToggleBlock }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
    >
      <div className="space-y-4">
        {/* Header avatar + role */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-bold text-purple-400">
              {user.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-tight">{user.name}</h4>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {user.role}
              </span>
            </div>
          </div>
          <StatusBadge status={user.status} />
        </div>

        {/* Info */}
        <div className="space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FiMail size={13} className="text-slate-500" />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar size={13} className="text-slate-500" />
            <span>Registered: {new Date(user.registeredAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiActivity size={13} className="text-slate-500" />
            <span>{user.hackathons || 0} Hackathons · {user.teams || 0} Teams</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-5 pt-3 border-t border-white/5">
        <button
          onClick={() => onView(user.id)}
          className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold text-slate-300 transition-colors"
        >
          View
        </button>
        <button
          onClick={() => onEdit(user)}
          className="flex-1 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-lg text-xs font-semibold transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onToggleBlock(user)}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            user.status === 'blocked'
              ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400'
              : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400'
          }`}
        >
          {user.status === 'blocked' ? 'Unblock' : 'Block'}
        </button>
      </div>
    </motion.div>
  );
};

export default UserCard;
