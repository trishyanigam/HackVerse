import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiVideo, FiCalendar } from 'react-icons/fi';
import RegistrationStatusBadge from './RegistrationStatusBadge';

const SubmissionCard = ({ submission, index = 0 }) => {
  const {
    projectName,
    hackathonTitle,
    teamName,
    status,
    reviewStatus,
    submittedAt,
    lastUpdated,
    githubUrl,
    liveDemoUrl,
    techStack,
    score,
    feedback,
  } = submission;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="bg-[#111118] border border-white/5 rounded-2xl p-5 shadow-lg hover:border-purple-500/20 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-base font-semibold text-white mb-1">{projectName}</h3>
          <p className="text-xs text-slate-500">
            {hackathonTitle} · {teamName}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <RegistrationStatusBadge status={status} />
          {reviewStatus && <RegistrationStatusBadge status={reviewStatus} />}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Score */}
      {score !== null && (
        <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
          <span className="text-2xl font-bold text-emerald-400">{score}</span>
          <span className="text-xs text-emerald-600">/100</span>
          <span className="ml-auto text-xs text-emerald-400 font-medium">Score Received</span>
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div className="mb-4 p-3 rounded-xl bg-blue-500/5 border border-blue-500/20">
          <p className="text-xs text-slate-400 leading-relaxed">
            <span className="text-blue-400 font-medium">Feedback: </span>
            {feedback}
          </p>
        </div>
      )}

      {/* Links */}
      <div className="flex flex-wrap gap-2 mb-4">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
          >
            <FiGithub size={12} /> GitHub
          </a>
        )}
        {liveDemoUrl && (
          <a
            href={liveDemoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
          >
            <FiExternalLink size={12} /> Live Demo
          </a>
        )}
      </div>

      {/* Dates */}
      <div className="flex items-center justify-between text-xs text-slate-600 pt-3 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <FiCalendar size={11} />
          {submittedAt
            ? `Submitted: ${new Date(submittedAt).toLocaleDateString('en-IN')}`
            : 'Not yet submitted'}
        </div>
        <span>Updated: {new Date(lastUpdated).toLocaleDateString('en-IN')}</span>
      </div>
    </motion.div>
  );
};

export default SubmissionCard;
