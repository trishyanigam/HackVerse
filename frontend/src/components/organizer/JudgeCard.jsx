import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLayers, FiPlus } from 'react-icons/fi';

const JudgeCard = ({ judge, index, onAssignClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-[#111118] border border-white/5 rounded-2xl p-5 hover:border-purple-500/20 transition-all duration-300 flex flex-col h-full"
    >
      <div className="flex items-start gap-4 flex-1">
        <img
          src={judge.photo}
          alt={judge.name}
          className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0 bg-slate-800"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-white truncate">{judge.name}</h3>
          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1 truncate">
            <FiMail size={12} className="shrink-0 text-slate-600" />
            {judge.email}
          </p>

          {/* Expertise */}
          <div className="flex flex-wrap gap-1 mt-3">
            {judge.expertise.map((exp) => (
              <span
                key={exp}
                className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
              >
                {exp}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Assigned Projects info */}
      <div className="mt-5 pt-4 border-t border-white/5 flex-1">
        <h4 className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
          <FiLayers size={12} className="text-blue-400" />
          Assigned Projects ({judge.projectsAssigned}/{judge.maxProjects})
        </h4>

        {judge.assignedProjectsList && judge.assignedProjectsList.length > 0 ? (
          <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
            {judge.assignedProjectsList.map((proj) => (
              <div key={proj.id} className="flex justify-between items-center bg-white/[0.02] border border-white/5 rounded-lg px-2.5 py-1 text-[11px] text-slate-300">
                <span className="font-medium truncate max-w-[120px]">{proj.name}</span>
                <span className="text-[10px] text-slate-500 truncate max-w-[80px]">{proj.team}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-600 italic py-1">No projects assigned yet.</p>
        )}
      </div>

      <button
        onClick={() => onAssignClick && onAssignClick(judge)}
        className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all shrink-0"
      >
        <FiPlus size={14} />
        Assign Project
      </button>
    </motion.div>
  );
};

export default JudgeCard;
