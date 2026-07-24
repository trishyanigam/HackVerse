import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

const DataTable = ({
  columns = [],
  data = [],
  selectedIds = [],
  onSelectAll,
  onSelectRow,
  sortBy,
  sortDesc,
  onSort,
  emptyMessage = 'No records found.',
}) => {
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-white/5 bg-[#0f0f1a] shadow-xl">
      <table className="w-full text-left border-collapse table-auto">
        <thead>
          <tr className="border-b border-white/5 bg-white/[0.02]">
            {onSelectAll && (
              <th className="p-4 w-12 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={onSelectAll}
                  className="rounded border-slate-600 bg-white/5 text-purple-600 focus:ring-purple-500 focus:ring-offset-[#0f0f1a]"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sortable && onSort && onSort(col.key)}
                className={`p-4 text-xs font-bold text-slate-400 uppercase tracking-wider ${
                  col.sortable ? 'cursor-pointer hover:text-white select-none' : ''
                } ${col.className || ''}`}
              >
                <div className="flex items-center gap-1.5">
                  <span>{col.label}</span>
                  {col.sortable && sortBy === col.key && (
                    <span className="text-purple-400 shrink-0">
                      {sortDesc ? <FiChevronDown size={14} /> : <FiChevronUp size={14} />}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (onSelectAll ? 1 : 0)} className="p-8 text-center text-slate-500 text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rIndex) => {
              const isSelected = selectedIds.includes(row.id);
              return (
                <motion.tr
                  key={row.id || rIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: rIndex * 0.02 }}
                  className={`group hover:bg-white/[0.02] transition-colors ${
                    isSelected ? 'bg-purple-500/5' : ''
                  }`}
                >
                  {onSelectRow && (
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectRow(row.id)}
                        className="rounded border-slate-600 bg-white/5 text-purple-600 focus:ring-purple-500 focus:ring-offset-[#0f0f1a]"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className={`p-4 text-sm text-slate-300 ${col.className || ''}`}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </motion.tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
