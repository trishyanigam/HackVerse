import React from 'react';
import clsx from 'clsx';
import { FiCheck, FiX } from 'react-icons/fi';

export const PasswordStrength = ({ password = '' }) => {
  const criteria = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'One uppercase letter (A-Z)', valid: /[A-Z]/.test(password) },
    { label: 'One lowercase letter (a-z)', valid: /[a-z]/.test(password) },
    { label: 'One number (0-9)', valid: /[0-9]/.test(password) }
  ];

  const passedCount = criteria.filter((c) => c.valid).length;

  let strengthLabel = 'Weak';
  let strengthColor = 'bg-red-500';
  let textColor = 'text-red-400';
  let widthPercent = '25%';

  if (passedCount === 4) {
    strengthLabel = 'Strong';
    strengthColor = 'bg-emerald-500';
    textColor = 'text-emerald-400';
    widthPercent = '100%';
  } else if (passedCount >= 2) {
    strengthLabel = 'Medium';
    strengthColor = 'bg-amber-500';
    textColor = 'text-amber-400';
    widthPercent = '60%';
  }

  if (!password) return null;

  return (
    <div className="space-y-2 pt-1">
      {/* Progress Meter */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
          <span className="text-slate-400">Password Strength</span>
          <span className={textColor}>{strengthLabel}</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className={clsx('h-full transition-all duration-300', strengthColor)}
            style={{ width: widthPercent }}
          />
        </div>
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-2 gap-1.5 text-[10px]">
        {criteria.map((item, idx) => (
          <div
            key={idx}
            className={clsx(
              'flex items-center gap-1 font-medium',
              item.valid ? 'text-emerald-400' : 'text-slate-500'
            )}
          >
            {item.valid ? <FiCheck size={12} /> : <FiX size={12} />}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrength;
