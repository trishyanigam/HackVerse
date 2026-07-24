import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiUpload, FiShield, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const HackathonCard = ({ hackathon, index, onDelete }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'upcoming':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'completed':
        return 'bg-slate-500/10 text-slate-400 border-white/10';
      default:
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden group hover:border-purple-500/20 transition-all duration-300 flex flex-col h-full"
    >
      {/* Banner */}
      <div className="h-40 relative overflow-hidden bg-slate-900 shrink-0">
        <img
          src={hackathon.banner}
          alt={hackathon.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          <span className={`text-xs px-2.5 py-1 rounded-full border backdrop-blur-sm font-semibold capitalize ${getStatusColor(hackathon.status)}`}>
            {hackathon.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex-1">
          <p className="text-xs text-purple-400 font-semibold uppercase tracking-wider">{hackathon.theme}</p>
          <h3 className="text-base font-bold text-white mt-1.5 line-clamp-1 group-hover:text-purple-300 transition-colors">
            {hackathon.title}
          </h3>
          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {hackathon.tagline}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-white/5 text-slate-400">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                <FiUsers size={12} />
                <span className="text-[10px] font-semibold uppercase tracking-wider">Regs</span>
              </div>
              <p className="text-xs font-bold text-white">{hackathon.registrations || 0}</p>
            </div>
            <div className="text-center border-x border-white/5">
              <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                <FiUpload size={12} />
                <span className="text-[10px] font-semibold uppercase tracking-wider">Project</span>
              </div>
              <p className="text-xs font-bold text-white">{hackathon.submissionsCount || Math.floor((hackathon.registrations || 0) * 0.4)}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                <FiShield size={12} />
                <span className="text-[10px] font-semibold uppercase tracking-wider">Judges</span>
              </div>
              <p className="text-xs font-bold text-white">{hackathon.judgesCount || 3}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-5 pt-4 border-t border-white/5 shrink-0">
          <button
            onClick={() => navigate(`/organizer/hackathon/${hackathon.id}`)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 transition-all"
          >
            <FiEye size={13} />
            View
          </button>
          <button
            onClick={() => navigate(`/organizer/hackathon/edit/${hackathon.id}`)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition-all"
          >
            <FiEdit2 size={13} />
            Edit
          </button>
          <button
            onClick={() => onDelete && onDelete(hackathon.id)}
            className="p-2 rounded-xl text-red-400 bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 hover:border-red-500/20 transition-all"
          >
            <FiTrash2 size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HackathonCard;
