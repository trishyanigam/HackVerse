import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 bg-[#0f0f1a] border border-white/5 rounded-2xl p-4 shadow-lg">
      <div className="text-xs font-semibold text-slate-500">
        Showing <span className="text-slate-300">{totalItems > 0 ? startItem : 0}</span> to{' '}
        <span className="text-slate-300">{endItem}</span> of{' '}
        <span className="text-slate-300">{totalItems}</span> records
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] disabled:opacity-40 disabled:hover:bg-white/[0.02] text-slate-400 hover:text-white transition-all"
        >
          <FiChevronLeft size={16} />
        </button>
        <div className="text-xs font-bold text-slate-300 px-3">
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-2 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] disabled:opacity-40 disabled:hover:bg-white/[0.02] text-slate-400 hover:text-white transition-all"
        >
          <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
