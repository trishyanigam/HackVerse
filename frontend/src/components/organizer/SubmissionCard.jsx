import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiVideo, FiX, FiCheckCircle } from 'react-icons/fi';

const SubmissionCard = ({ submission, onClose, onReviewSubmit }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-[#111118] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
          <div>
            <h3 className="text-lg font-bold text-white">{submission.projectName}</h3>
            <p className="text-xs text-purple-400 mt-0.5">Team: {submission.teamName} · {submission.hackathonTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Problem Statement</h4>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">{submission.problemStatement}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Solution</h4>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">{submission.solution}</p>
          </div>

          {submission.description && (
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Implementation Details</h4>
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">{submission.description}</p>
            </div>
          )}

          {/* Tech Stack */}
          {submission.techStack && (
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {submission.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-4 pt-2">
            {submission.githubUrl && (
              <a
                href={submission.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                <FiGithub size={15} className="text-purple-400" />
                GitHub Repository
              </a>
            )}
            {submission.liveDemoUrl && (
              <a
                href={submission.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                <FiExternalLink size={15} className="text-blue-400" />
                Live Demo
              </a>
            )}
            {submission.demoVideoUrl && (
              <a
                href={submission.demoVideoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                <FiVideo size={15} className="text-amber-400" />
                Pitch Video
              </a>
            )}
          </div>

          {/* Score Review UI for Organizer */}
          <div className="pt-4 border-t border-white/5 space-y-3 bg-[#0a0a0f] p-4 rounded-xl border border-white/5">
            <h4 className="text-xs font-semibold text-white flex items-center gap-1.5">
              <FiCheckCircle size={14} className="text-emerald-400" />
              Evaluation & Feedback
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 block">Score (0-100)</label>
                <input
                  type="number"
                  placeholder="e.g. 85"
                  defaultValue={submission.score || ''}
                  id="evaluation-score"
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 block">Status</label>
                <select
                  id="evaluation-status"
                  defaultValue={submission.reviewStatus || 'under_review'}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-500/50 transition-all"
                >
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approve Project</option>
                  <option value="rejected">Reject Project</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 block">Feedback/Comments</label>
              <textarea
                id="evaluation-feedback"
                rows={2}
                placeholder="Provide feedback for the team..."
                defaultValue={submission.feedback || ''}
                className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-500/50 transition-all resize-none"
              />
            </div>
            <button
              onClick={() => {
                const score = document.getElementById('evaluation-score')?.value;
                const status = document.getElementById('evaluation-status')?.value;
                const feedback = document.getElementById('evaluation-feedback')?.value;
                onReviewSubmit && onReviewSubmit(submission.id, { score, status, feedback });
                onClose();
              }}
              className="w-full py-2.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all"
            >
              Save Review & Update Status
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SubmissionCard;
