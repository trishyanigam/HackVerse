import React from 'react';
import { motion } from 'framer-motion';
import ActivityFeed from './ActivityFeed';

const RecentActivity = ({ activities }) => {
  const recent = activities.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {recent.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-600 text-sm">No recent activities yet.</p>
        </div>
      ) : (
        <ActivityFeed activities={recent} />
      )}
    </motion.div>
  );
};

export default RecentActivity;
