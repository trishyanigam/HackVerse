import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiDollarSign, FiUsers, FiArrowRight, FiMonitor } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import RegistrationStatusBadge from './RegistrationStatusBadge';

const HackathonRegistrationCard = ({ registration, index = 0 }) => {
  const navigate = useNavigate();
  const {
    hackathonId,
    hackathonTitle,
    organizer,
    status,
    registeredOn,
    submissionDeadline,
    eventDate,
    prizePool,
    mode,
    category,
    teamName,
    teamSize,
    banner,
  } = registration;

  const gradients = [
    'from-purple-600 to-blue-600',
    'from-blue-600 to-cyan-600',
    'from-emerald-600 to-teal-600',
    'from-amber-600 to-orange-600',
    'from-pink-600 to-rose-600',
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/5 hover:border-purple-500/20 transition-all duration-300"
    >
      {/* Banner */}
      <div className={`h-32 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-3 left-4">
          <span className="text-xs text-white/80 bg-black/30 rounded-full px-2.5 py-1 backdrop-blur-sm">
            {category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <RegistrationStatusBadge status={status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-white mb-1 line-clamp-1">{hackathonTitle}</h3>
        <p className="text-xs text-slate-500 mb-4">by {organizer}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <FiCalendar size={12} className="text-purple-400 shrink-0" />
            <span>{new Date(submissionDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <FiDollarSign size={12} className="text-emerald-400 shrink-0" />
            <span>{prizePool}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <FiMonitor size={12} className="text-blue-400 shrink-0" />
            <span>{mode}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <FiUsers size={12} className="text-amber-400 shrink-0" />
            <span>{teamName} ({teamSize})</span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/participant/hackathons`)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-white/5 hover:bg-purple-500/10 hover:text-purple-300 text-slate-300 border border-white/5 hover:border-purple-500/20 transition-all duration-200"
        >
          View Details
          <FiArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
};

export default HackathonRegistrationCard;
