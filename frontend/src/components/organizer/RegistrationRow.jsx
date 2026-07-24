import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiUsers, FiEye } from 'react-icons/fi';
import RegistrationStatusBadge from '../participant/RegistrationStatusBadge';

const RegistrationRow = ({ registration, index, onApprove, onReject, onViewTeam }) => {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.04 }}
      className="border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors"
    >
      <td className="px-5 py-4">
        <div>
          <p className="font-semibold text-white">{registration.teamName}</p>
          <p className="text-xs text-slate-500 mt-0.5">{registration.hackathon}</p>
        </div>
      </td>
      <td className="px-5 py-4">
        <p className="text-slate-300 font-medium">{registration.leader}</p>
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <FiUsers size={12} className="text-purple-400" />
          <span>{registration.members} member{registration.members !== 1 ? 's' : ''}</span>
        </div>
      </td>
      <td className="px-5 py-4 text-xs text-slate-400">
        {new Date(registration.date || registration.registeredOn).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </td>
      <td className="px-5 py-4">
        <RegistrationStatusBadge status={registration.status} />
      </td>
      <td className="px-5 py-4">
        <div className="flex justify-end items-center gap-2">
          {onViewTeam && (
            <button
              onClick={() => onViewTeam(registration)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              title="View Team"
            >
              <FiEye size={14} />
            </button>
          )}
          {registration.status === 'pending' && (
            <>
              <button
                onClick={() => onApprove && onApprove(registration.id)}
                className="p-1.5 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-emerald-500/10 transition-all"
                title="Approve Team"
              >
                <FiCheck size={14} />
              </button>
              <button
                onClick={() => onReject && onReject(registration.id)}
                className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/10 transition-all"
                title="Reject Team"
              >
                <FiX size={14} />
              </button>
            </>
          )}
        </div>
      </td>
    </motion.tr>
  );
};

export default RegistrationRow;
