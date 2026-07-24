import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiArrowRight } from 'react-icons/fi';
import { BiCrown } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import RegistrationStatusBadge from './RegistrationStatusBadge';

const TeamCard = ({ team, index = 0 }) => {
  const navigate = useNavigate();
  const { id, name, description, hackathon, members, maxMembers, isLeader, status } = team;

  const filled = members.length;
  const pct = Math.round((filled / maxMembers) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -3 }}
      className="bg-[#111118] border border-white/5 rounded-2xl p-5 shadow-lg hover:border-purple-500/20 hover:shadow-purple-500/5 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
            {name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-white">{name}</h3>
              {isLeader && (
                <span className="text-amber-400">
                  <BiCrown size={12} />
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">{hackathon}</p>
          </div>
        </div>
        <RegistrationStatusBadge status={status} size="sm" />
      </div>

      <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">{description}</p>

      {/* Member Avatars */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex -space-x-2">
          {members.slice(0, 4).map((m, i) => (
            <div
              key={m.id}
              title={m.name}
              className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border-2 border-[#111118] flex items-center justify-center text-[10px] text-white font-semibold"
            >
              {m.name.slice(0, 1)}
            </div>
          ))}
          {members.length > 4 && (
            <div className="w-7 h-7 rounded-full bg-white/10 border-2 border-[#111118] flex items-center justify-center text-[10px] text-slate-400">
              +{members.length - 4}
            </div>
          )}
        </div>
        <span className="text-xs text-slate-500">
          {filled}/{maxMembers} members
        </span>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Team Capacity</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          />
        </div>
      </div>

      <button
        onClick={() => navigate(`/participant/team/${id}`)}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-white/5 hover:bg-purple-500/10 hover:text-purple-300 text-slate-300 border border-white/5 hover:border-purple-500/20 transition-all duration-200"
      >
        <FiUsers size={14} />
        View Team
        <FiArrowRight size={14} />
      </button>
    </motion.div>
  );
};

export default TeamCard;
