import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AssignedProjectCard = ({ project, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden group hover:border-purple-500/20 transition-all duration-300 flex flex-col h-full"
    >
      {/* Banner */}
      <div className="h-40 relative bg-slate-900 shrink-0">
        <img
          src={project.banner}
          alt={project.projectName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] px-2.5 py-1 rounded-full border font-bold uppercase tracking-wider backdrop-blur-sm ${
            project.status === 'completed'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
          }`}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400">
            {project.hackathonName}
          </span>
          <h3 className="text-base font-bold text-white mt-1 group-hover:text-purple-300 transition-colors">
            {project.projectName}
          </h3>
          <p className="text-xs text-slate-500 mt-1">Team: {project.teamName}</p>

          <div className="space-y-2 mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <FiCalendar size={13} className="text-slate-500 shrink-0" />
              <span>Submitted: {new Date(project.submissionDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <FiClock size={13} className="text-slate-500 shrink-0" />
              <span>Deadline: {new Date(project.evaluationDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-white/5 flex gap-2">
          <button
            onClick={() => navigate(`/judge/project/${project.id}`)}
            className="flex-1 py-2 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 rounded-xl text-xs font-semibold text-slate-300 transition-all text-center"
          >
            Details
          </button>
          <button
            onClick={() => navigate(`/judge/evaluate/${project.id}`)}
            className="flex-1 flex items-center justify-center gap-1 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 rounded-xl text-xs font-bold text-white transition-all shadow-md"
          >
            {project.status === 'completed' ? 'Edit Score' : 'Review'}
            <FiArrowRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AssignedProjectCard;
