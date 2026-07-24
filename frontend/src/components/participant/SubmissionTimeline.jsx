import React from 'react';
import { FiCheckCircle, FiCircle, FiClock } from 'react-icons/fi';

const steps = [
  { key: 'registered', label: 'Registered' },
  { key: 'team_formed', label: 'Team Formed' },
  { key: 'draft_saved', label: 'Draft Saved' },
  { key: 'submitted', label: 'Submitted' },
  { key: 'reviewed', label: 'Reviewed' },
];

const SubmissionTimeline = ({ currentStep = 'draft_saved' }) => {
  const currentIdx = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => {
        const isDone = i < currentIdx;
        const isCurrent = i === currentIdx;
        const isUpcoming = i > currentIdx;

        return (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                  isDone
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : isCurrent
                    ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                    : 'bg-white/5 border-white/10 text-slate-600'
                }`}
              >
                {isDone ? (
                  <FiCheckCircle size={14} />
                ) : isCurrent ? (
                  <FiClock size={14} />
                ) : (
                  <FiCircle size={14} />
                )}
              </div>
              <span
                className={`text-xs mt-1.5 whitespace-nowrap ${
                  isDone
                    ? 'text-emerald-400'
                    : isCurrent
                    ? 'text-purple-400 font-medium'
                    : 'text-slate-600'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-1 mb-5 rounded-full transition-all ${
                  i < currentIdx ? 'bg-emerald-500/50' : 'bg-white/5'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SubmissionTimeline;
