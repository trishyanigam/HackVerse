import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiInfo, FiLayers } from 'react-icons/fi';

const ProfileCard = ({ profile, onEdit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-6 shadow-xl space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shrink-0 shadow-lg shadow-purple-500/10">
          {profile.name.charAt(0)}
        </div>
        <div className="text-center sm:text-left space-y-1">
          <h3 className="text-lg font-bold text-white tracking-wide">{profile.name}</h3>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            {profile.role}
          </p>
          <p className="text-xs text-slate-400 mt-1">{profile.bio}</p>
        </div>
      </div>

      <div className="border-t border-white/5 pt-5 space-y-3">
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <FiMail className="text-slate-500 shrink-0" size={15} />
          <span className="truncate">{profile.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <FiPhone className="text-slate-500 shrink-0" size={15} />
          <span>{profile.phone}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <FiLayers className="text-slate-500 shrink-0" size={15} />
          <span>Role level: Super Administrator</span>
        </div>
      </div>

      {onEdit && (
        <button
          onClick={onEdit}
          className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-semibold text-slate-300 transition-all"
        >
          Edit Profile Information
        </button>
      )}
    </motion.div>
  );
};

export default ProfileCard;
