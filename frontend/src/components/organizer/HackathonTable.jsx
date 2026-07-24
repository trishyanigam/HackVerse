import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiUpload, FiShield, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const HackathonTable = ({ hackathons, onDelete }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'upcoming':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'completed':
        return 'bg-slate-500/10 text-slate-400 border-white/10';
      default:
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    }
  };

  return (
    <div className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Hackathon</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Theme</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="text-center px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Registrations</th>
              <th className="text-center px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Submissions</th>
              <th className="text-center px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Judges</th>
              <th className="text-right px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hackathons.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-slate-600">
                  No hackathons found.
                </td>
              </tr>
            ) : (
              hackathons.map((h, i) => (
                <motion.tr
                  key={h.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={h.banner} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-semibold text-white">{h.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{h.organizer}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-300 text-xs">{h.theme}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border uppercase font-medium ${getStatusColor(h.status)}`}>
                      {h.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center text-white font-medium">{h.registrations || 0}</td>
                  <td className="px-5 py-4 text-center text-white font-medium">{h.submissionsCount || Math.floor((h.registrations || 0) * 0.4)}</td>
                  <td className="px-5 py-4 text-center text-white font-medium">{h.judgesCount || 3}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => navigate(`/organizer/hackathon/${h.id}`)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                        title="View Hackathon"
                      >
                        <FiEye size={14} />
                      </button>
                      <button
                        onClick={() => navigate(`/organizer/hackathon/edit/${h.id}`)}
                        className="p-1.5 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-500/5 transition-all"
                        title="Edit Hackathon"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(h.id)}
                        className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all"
                        title="Delete"
                      >
                        <FiTrash2 size={14} />
                      </button>
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

export default HackathonTable;
