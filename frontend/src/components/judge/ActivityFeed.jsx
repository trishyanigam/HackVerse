import React from 'react';
import { motion } from 'framer-motion';

const ActivityFeed = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return <p className="text-sm text-slate-500 text-center py-8">No recent activity.</p>;
  }

  return (
    <div className="space-y-3">
      {activities.map((act, i) => (
        <motion.div
          key={act.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-start gap-3"
        >
          <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-300 leading-snug">{act.message}</p>
            <span className="text-[11px] text-slate-600 font-medium">
              {new Date(act.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ActivityFeed;
