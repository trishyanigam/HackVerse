import React from 'react';
import { motion } from 'framer-motion';

const AnalyticsCard = ({ title, subtitle, children, actions }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-5 shadow-lg flex flex-col h-full"
    >
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide uppercase">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
      <div className="flex-1 w-full relative min-h-[220px]">
        {children}
      </div>
    </motion.div>
  );
};

export default AnalyticsCard;
