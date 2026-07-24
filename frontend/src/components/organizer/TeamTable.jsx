import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';

const TeamTable = ({ teams }) => {
  return (
    <div className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Team Name</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Leader</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Members</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Project Name</th>
              <th className="text-center px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Submission Status</th>
            </tr>
          </thead>
          <tbody>
            {teams.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-slate-600">
                  No teams registered yet.
                </td>
              </tr>
            ) : (
              teams.map((team, i) => (
                <motion.tr
                  key={team.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">{team.name}</p>
                    <p className="text-xs text-purple-400 mt-0.5">{team.hackathon}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-slate-300 font-medium">{team.leader || team.members?.[0]?.name || 'N/A'}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <FiUsers size={12} className="text-purple-400" />
                      <span>{team.teamSize || team.members?.length || 1} members</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-300">
                    {team.projectName || 'EcoTrack Prototype'}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-center">
                      {team.submissionStatus === 'submitted' || team.members?.length > 1 ? (
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <FiCheckCircle size={11} />
                          Submitted
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <FiClock size={11} />
                          In Progress
                        </span>
                      )}
                    </div>
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

export default TeamTable;
