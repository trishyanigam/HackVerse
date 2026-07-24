import React from 'react';
import { motion } from 'framer-motion';

const AnalyticsCard = ({ title, description, children, className = '', index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`bg-[#111118] border border-white/5 rounded-2xl p-5 hover:border-purple-500/10 transition-all duration-300 ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-sm font-bold text-white">{title}</h3>
        {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
      </div>
      <div className="w-full relative min-h-[240px]">
        {children}
      </div>
    </motion.div>
  );
};

export default AnalyticsCard;
