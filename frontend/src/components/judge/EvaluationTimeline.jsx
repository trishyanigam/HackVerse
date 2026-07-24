import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock } from 'react-icons/fi';

const EvaluationTimeline = ({ events }) => {
  return (
    <div className="space-y-0">
      {events.map((event, i) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.07 }}
          className="flex gap-4 relative"
        >
          {/* Line */}
          {i < events.length - 1 && (
            <div className="absolute left-4 top-8 bottom-0 w-px bg-white/5" />
          )}
          {/* Icon */}
          <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
            event.completed
              ? 'bg-emerald-500/15 border border-emerald-500/25'
              : 'bg-white/5 border border-white/5'
          }`}>
            {event.completed
              ? <FiCheckCircle size={14} className="text-emerald-400" />
              : <FiClock size={14} className="text-slate-500" />}
          </div>
          {/* Content */}
          <div className="pb-6 flex-1">
            <h4 className={`text-sm font-semibold ${event.completed ? 'text-white' : 'text-slate-500'}`}>
              {event.title}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">{event.description}</p>
            {event.timestamp && (
              <span className="text-[10px] text-slate-600 font-medium mt-1 inline-block">
                {new Date(event.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default EvaluationTimeline;
