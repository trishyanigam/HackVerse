import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiEye, FiUser } from 'react-icons/fi';

const SubmissionTable = ({ submissions, onViewClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'under_review':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'rejected':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

  return (
    <div className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Project / Team</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">GitHub</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Demo</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Submission Time</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Judge</th>
              <th className="text-right px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-slate-600">
                  No submissions found.
                </td>
              </tr>
            ) : (
              submissions.map((sub, i) => (
                <motion.tr
                  key={sub.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-white">{sub.projectName}</p>
                      <p className="text-xs text-slate-500 mt-0.5">Team: {sub.teamName} · {sub.hackathonTitle}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {sub.githubUrl ? (
                      <a href={sub.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white inline-flex items-center gap-1">
                        <FiGithub size={14} />
                        <span className="text-xs">Repo</span>
                      </a>
                    ) : (
                      <span className="text-xs text-slate-600">No URL</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {sub.liveDemoUrl ? (
                      <a href={sub.liveDemoUrl} target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-1">
                        <FiExternalLink size={14} />
                        <span className="text-xs">Live</span>
                      </a>
                    ) : (
                      <span className="text-xs text-slate-600">No URL</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-400">
                    {sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                    }) : 'Draft'}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border uppercase font-medium ${getStatusColor(sub.reviewStatus || 'pending')}`}>
                      {(sub.reviewStatus || 'pending').replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <FiUser size={12} className="text-slate-500" />
                      <span>{sub.assignedJudgeName || 'Not Assigned'}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => onViewClick && onViewClick(sub)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                      title="View Details"
                    >
                      <FiEye size={14} />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionTable;
