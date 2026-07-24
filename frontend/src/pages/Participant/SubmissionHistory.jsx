import React from 'react';
import ParticipantLayout from '../../layouts/ParticipantLayout';
import SubmissionCard from '../../components/participant/SubmissionCard';
import { submissions } from '../../mock/submissions';
import { FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SubmissionHistory = () => {
  const navigate = useNavigate();

  return (
    <ParticipantLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Submission History</h2>
          <p className="text-sm text-slate-500 mt-1">All your project submissions across hackathons</p>
        </div>
        <button
          onClick={() => navigate('/participant/submission')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all"
        >
          <FiUpload size={14} />
          New Submission
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total', value: submissions.length, color: 'text-white' },
          {
            label: 'Approved',
            value: submissions.filter((s) => s.reviewStatus === 'approved').length,
            color: 'text-emerald-400',
          },
          {
            label: 'Under Review',
            value: submissions.filter((s) => s.reviewStatus === 'under_review').length,
            color: 'text-purple-400',
          },
        ].map((s) => (
          <div key={s.label} className="bg-[#111118] border border-white/5 rounded-2xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-20">
          <FiUpload size={40} className="mx-auto text-slate-700 mb-4" />
          <p className="text-slate-500 text-sm">No submissions yet.</p>
          <button
            onClick={() => navigate('/participant/submission')}
            className="mt-4 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all"
          >
            Make your first submission
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub, i) => (
            <SubmissionCard key={sub.id} submission={sub} index={i} />
          ))}
        </div>
      )}
    </ParticipantLayout>
  );
};

export default SubmissionHistory;
