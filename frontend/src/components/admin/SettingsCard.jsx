import React from 'react';

const SettingsCard = ({ title, description, children }) => {
  return (
    <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-6 shadow-xl space-y-4">
      <div>
        <h3 className="text-sm font-bold text-white tracking-wide uppercase">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="border-t border-white/5 pt-4 space-y-4">
        {children}
      </div>
    </div>
  );
};

export default SettingsCard;
