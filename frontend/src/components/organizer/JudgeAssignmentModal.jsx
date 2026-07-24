import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiSearch } from 'react-icons/fi';
import { submissions } from '../../mock/submissions';

const JudgeAssignmentModal = ({ isOpen, onClose, judge, onAssign }) => {
  const [search, setSearch] = useState('');

  if (!isOpen || !judge) return null;

  // Filter submissions that aren't already assigned to this judge
  const eligibleProjects = submissions.filter((sub) => {
    const isAlreadyAssigned = judge.assignedProjectsList?.some((ap) => ap.id === sub.id);
    const matchesSearch = sub.projectName.toLowerCase().includes(search.toLowerCase()) ||
                          sub.teamName.toLowerCase().includes(search.toLowerCase());
    return !isAlreadyAssigned && matchesSearch;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md bg-[#111118] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Assign Projects</h3>
              <p className="text-xs text-slate-500 mt-0.5">Assign submissions to {judge.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Search bar */}
          <div className="relative mb-4">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <input
              type="text"
              placeholder="Search projects or teams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a0a0f] border border-white/10 text-white rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-purple-500/50 transition-all"
            />
          </div>

          {/* Project List */}
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {eligibleProjects.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8">No eligible projects found.</p>
            ) : (
              eligibleProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all"
                >
                  <div>
                    <p className="text-xs font-semibold text-white">{proj.projectName}</p>
                    <p className="text-[10px] text-purple-400 mt-0.5">{proj.hackathonTitle}</p>
                    <p className="text-[10px] text-slate-500">Team: {proj.teamName}</p>
                  </div>
                  <button
                    onClick={() => {
                      onAssign(judge.id, proj);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all"
                  >
                    <FiCheck size={11} />
                    Assign
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Bottom Actions */}
          <div className="flex gap-2.5 mt-5">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-xl text-xs font-semibold text-slate-400 bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default JudgeAssignmentModal;
