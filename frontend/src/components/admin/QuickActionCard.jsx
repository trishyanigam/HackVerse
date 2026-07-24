import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const QuickActionCard = ({ action }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(action.path)}
      className={`p-5 rounded-2xl bg-gradient-to-br ${action.color} cursor-pointer shadow-lg hover:shadow-xl transition-all relative overflow-hidden group`}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-black/10 opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-300" />
      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl group-hover:scale-125 transition-transform" />

      <div className="relative z-10 flex items-center justify-between gap-4">
        <h4 className="text-sm font-bold text-white tracking-wide">{action.label}</h4>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:translate-x-1 transition-transform">
          <FiArrowRight size={15} />
        </div>
      </div>
    </motion.div>
  );
};

export default QuickActionCard;
