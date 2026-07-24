import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ current, total, onPageChange }) => {
  if (total <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
      <p className="text-xs text-slate-500">
        Page <span className="font-semibold text-white">{current}</span> of <span className="font-semibold text-white">{total}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => current > 1 && onPageChange(current - 1)}
          disabled={current === 1}
          className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white disabled:opacity-40 disabled:hover:text-slate-400 disabled:cursor-not-allowed transition-all"
        >
          <FiChevronLeft size={16} />
        </button>
        <button
          onClick={() => current < total && onPageChange(current + 1)}
          disabled={current === total}
          className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white disabled:opacity-40 disabled:hover:text-slate-400 disabled:cursor-not-allowed transition-all"
        >
          <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
