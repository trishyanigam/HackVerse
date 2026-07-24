import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Button from '../ui/Button';

export const Pagination = ({
  currentPage = 1,
  totalPages = 5,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4.5 pt-6">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
        leftIcon={<FiChevronLeft />}
        aria-label="Go to previous page"
      >
        Previous
      </Button>

      {/* Pages Tracker */}
      <span className="text-xs text-slate-400 font-semibold">
        Page <span className="text-white">{currentPage}</span> of{' '}
        <span className="text-white">{totalPages}</span>
      </span>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange && onPageChange(currentPage + 1)}
        rightIcon={<FiChevronRight />}
        aria-label="Go to next page"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
