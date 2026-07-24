import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const recommendationColor = {
  winner: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  shortlisted: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  rejected: 'text-red-400 bg-red-500/10 border-red-500/20',
  pending: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
};

const ReviewHistoryTable = ({ evaluations }) => {
  const navigate = useNavigate();

  if (!evaluations || evaluations.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500 text-sm">No evaluations completed yet.</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5">
            {['Project', 'Team', 'Hackathon', 'Score', 'Recommendation', 'Date', ''].map((h) => (
              <th key={h} className="text-left text-[11px] text-slate-500 font-semibold uppercase tracking-wider px-4 py-3 first:pl-0 last:pr-0">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {evaluations.map((ev, i) => (
            <motion.tr
              key={ev.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="hover:bg-white/[0.02] transition-colors group"
            >
              <td className="px-4 py-3.5 pl-0">
                <span className="text-white font-semibold text-xs">{ev.projectName}</span>
              </td>
              <td className="px-4 py-3.5 text-slate-400 text-xs">{ev.teamName}</td>
              <td className="px-4 py-3.5 text-slate-400 text-xs">{ev.hackathonName}</td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-1">
                  <FiStar size={12} className="text-amber-400" />
                  <span className="text-white text-xs font-bold">{ev.totalScore}</span>
                  <span className="text-slate-600 text-xs">/{ev.maxScore}</span>
                </div>
              </td>
              <td className="px-4 py-3.5">
                <span className={`text-[10px] px-2.5 py-1 rounded-full border font-bold uppercase tracking-wider ${recommendationColor[ev.recommendation] || recommendationColor.pending}`}>
                  {ev.recommendation}
                </span>
              </td>
              <td className="px-4 py-3.5 text-slate-500 text-xs">
                {new Date(ev.evaluatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
              </td>
              <td className="px-4 py-3.5 pr-0">
                <button
                  onClick={() => navigate(`/judge/evaluate/${ev.projectId}`)}
                  className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold text-slate-300 transition-all"
                >
                  <FiEdit2 size={11} /> Edit
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewHistoryTable;
