import React from 'react';
import { motion } from 'framer-motion';

const FeedbackEditor = ({ value, onChange, placeholder = 'Write your feedback for this project...' }) => {
  const charLimit = 1000;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-2"
    >
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        Detailed Feedback
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= charLimit) onChange(e.target.value);
          }}
          placeholder={placeholder}
          rows={6}
          className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.05] resize-none transition-all"
        />
        <div className="absolute bottom-3 right-4 text-[10px] text-slate-600 font-medium">
          {value.length}/{charLimit}
        </div>
      </div>
      <p className="text-[11px] text-slate-600">
        Provide constructive feedback that will help the team improve. This feedback may be shared with participants.
      </p>
    </motion.div>
  );
};

export default FeedbackEditor;
