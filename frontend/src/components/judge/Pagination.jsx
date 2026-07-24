import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ current, total, onPageChange }) => {
  if (total <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 pt-6">
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/5 text-slate-400 hover:bg-white/[0.08] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <FiChevronLeft size={15} />
      </button>

      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold border transition-all ${
            page === current
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
              : 'bg-white/[0.03] text-slate-500 border-white/5 hover:bg-white/[0.07] hover:text-slate-200'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
        className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/5 text-slate-400 hover:bg-white/[0.08] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <FiChevronRight size={15} />
      </button>
    </div>
  );
};

export default Pagination;
