import React from 'react';
import { motion } from 'framer-motion';

const ChartCard = ({ title, subtitle, children, className = '', index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-[#111118] border border-white/5 rounded-2xl p-5 shadow-lg ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-5">
          {title && <h3 className="text-sm font-semibold text-white">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      )}
      {children}
    </motion.div>
  );
};

export default ChartCard;
