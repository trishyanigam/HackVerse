import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

const TableToolbar = ({
  selectedCount = 0,
  onBulkDelete,
  children,
  actionSlot,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f0f1a] border border-white/5 rounded-2xl p-4 shadow-lg mb-4">
      <div className="flex flex-1 items-center gap-3 w-full min-w-0">
        {selectedCount > 0 ? (
          <div className="flex items-center gap-3 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-xl shrink-0">
            <span className="text-xs font-semibold text-purple-300">
              {selectedCount} selected
            </span>
            {onBulkDelete && (
              <button
                onClick={onBulkDelete}
                className="text-rose-400 hover:text-rose-300 p-1 hover:bg-rose-500/10 rounded-lg transition-colors"
                title="Delete Selected"
              >
                <FiTrash2 size={15} />
              </button>
            )}
          </div>
        ) : null}
        <div className="flex-1 w-full min-w-0 flex flex-wrap items-center gap-3">
          {children}
        </div>
      </div>
      {actionSlot && <div className="flex items-center gap-2 shrink-0">{actionSlot}</div>}
    </div>
  );
};

export default TableToolbar;
