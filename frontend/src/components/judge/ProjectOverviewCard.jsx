import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiUsers, FiCalendar, FiTag } from 'react-icons/fi';

const ProjectOverviewCard = ({ project }) => {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111118] border border-white/5 rounded-2xl p-6 space-y-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400">{project.hackathonName}</span>
          <h2 className="text-xl font-bold text-white mt-1">{project.projectName}</h2>
          <p className="text-sm text-slate-400 mt-1">by <span className="text-purple-300 font-semibold">{project.teamName}</span></p>
        </div>
        <span className={`shrink-0 text-[10px] px-3 py-1.5 rounded-full border font-bold uppercase tracking-wider ${
          project.status === 'completed'
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
        }`}>
          {project.status}
        </span>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-1"><FiUsers size={12}/> Team Size</div>
          <p className="text-sm font-bold text-white">{project.teamSize} members</p>
        </div>
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-1"><FiCalendar size={12}/> Submitted</div>
          <p className="text-sm font-bold text-white">{new Date(project.submissionDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-1"><FiTag size={12}/> Category</div>
          <p className="text-sm font-bold text-white truncate">{project.category}</p>
        </div>
      </div>

      {project.techStack && (
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <span key={t} className="px-2.5 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-lg text-xs font-semibold">{t}</span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-2 border-t border-white/5">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-slate-300 transition-all">
            <FiGithub size={13}/> GitHub
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-slate-300 transition-all">
            <FiExternalLink size={13}/> Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectOverviewCard;
