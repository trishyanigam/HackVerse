import React, { useState } from 'react';
import { FiDownload, FiChevronDown, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ExportButton = ({ filename = 'report' }) => {
  const [open, setOpen] = useState(false);

  const handleExport = (type) => {
    setOpen(false);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 800)),
      {
        loading: `Exporting as ${type}...`,
        success: `File "${filename}.${type.toLowerCase()}" generated successfully!`,
        error: 'Export failed.',
      }
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 rounded-xl text-xs font-bold text-white transition-all shadow-md shadow-purple-500/10"
      >
        <FiDownload size={14} />
        <span>Export</span>
        <FiChevronDown size={12} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-40 bg-[#0f0f1a] border border-white/5 rounded-xl shadow-2xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            {['CSV', 'Excel', 'PDF'].map((format) => (
              <button
                key={format}
                onClick={() => handleExport(format)}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                <FiFileText size={13} className="text-slate-500" />
                <span>Export as {format}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExportButton;
