import React from 'react';
import RegistrationRow from './RegistrationRow';

const RegistrationTable = ({ registrations, onApprove, onReject, onViewTeam }) => {
  return (
    <div className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Team Name / Hackathon</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Leader</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Members</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Registration Date</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="text-right px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-slate-600">
                  No registrations found.
                </td>
              </tr>
            ) : (
              registrations.map((reg, i) => (
                <RegistrationRow
                  key={reg.id}
                  registration={reg}
                  index={i}
                  onApprove={onApprove}
                  onReject={onReject}
                  onViewTeam={onViewTeam}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrationTable;
