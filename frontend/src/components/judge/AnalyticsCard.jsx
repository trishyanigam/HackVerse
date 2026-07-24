import React from 'react';
import { motion } from 'framer-motion';

const AnalyticsCard = ({ title, children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-[#111118] border border-white/5 rounded-2xl p-5 ${className}`}
  >
    {title && (
      <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-4 rounded-full bg-gradient-to-b from-purple-500 to-blue-500 inline-block" />
        {title}
      </h3>
    )}
    {children}
  </motion.div>
);

export default AnalyticsCard;
