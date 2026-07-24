import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import TableToolbar from '../../components/admin/TableToolbar';
import SearchBar from '../../components/admin/SearchBar';
import AdvancedFilter from '../../components/admin/AdvancedFilter';
import Pagination from '../../components/admin/Pagination';
import StatusBadge from '../../components/admin/StatusBadge';
import JudgeCard from '../../components/admin/JudgeCard';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { adminJudges } from '../../mock/admin/judges';
import { FiGrid, FiList, FiEye, FiEdit2, FiSlash, FiCheckCircle, FiTrash2, FiPlus, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';

const FILTER_CONFIG = [
  {
    key: 'status',
    placeholder: 'Filter by Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'suspended', label: 'Suspended' },
    ],
  },
];

const ManageJudges = () => {
  const [judges, setJudges] = useState(adminJudges);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '', target: null });

  const itemsPerPage = 6;

  // Filtering
  const filtered = judges.filter((j) => {
    const matchesSearch =
      j.name.toLowerCase().includes(search.toLowerCase()) ||
      j.email.toLowerCase().includes(search.toLowerCase()) ||
      j.expertise.some((e) => e.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = filterStatus ? j.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const confirmAction = () => {
    const { type, target } = modalConfig;
    setModalConfig({ isOpen: false, type: '', target: null });

    if (type === 'delete') {
      setJudges((prev) => prev.filter((j) => j.id !== target.id));
      toast.success(`Judge account for ${target.name} deleted.`);
    } else if (type === 'suspend') {
      setJudges((prev) =>
        prev.map((j) => (j.id === target.id ? { ...j, status: 'suspended' } : j))
      );
      toast.success(`Judge ${target.name} suspended.`);
    } else if (type === 'activate') {
      setJudges((prev) =>
        prev.map((j) => (j.id === target.id ? { ...j, status: 'active' } : j))
      );
      toast.success(`Judge ${target.name} activated.`);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        {/* Toolbar Header */}
        <TableToolbar
          actionSlot={
            <div className="flex items-center gap-2">
              <div className="flex bg-white/5 border border-white/5 rounded-xl p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Grid View"
                >
                  <FiGrid size={15} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="List View"
                >
                  <FiList size={15} />
                </button>
              </div>
              <button
                onClick={() => toast.success('Add Judge Account dialog triggered')}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 rounded-xl text-xs font-bold text-white transition-all shadow-md shadow-purple-500/10"
              >
                <FiPlus size={14} /> Add Judge
              </button>
            </div>
          }
        >
          <SearchBar value={search} onChange={setSearch} placeholder="Search judges by name or expertise..." />
          <AdvancedFilter
            filters={FILTER_CONFIG}
            selectedFilters={{ status: filterStatus }}
            onFilterChange={(_, val) => {
              setFilterStatus(val);
              setCurrentPage(1);
            }}
          />
        </TableToolbar>

        {/* View Layout Switch */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedData.length === 0 ? (
              <div className="col-span-full text-center py-16 text-slate-500 text-sm">
                No judges found.
              </div>
            ) : (
              paginatedData.map((judge) => (
                <JudgeCard
                  key={judge.id}
                  judge={judge}
                  onView={(j) => toast.success(`Viewing evaluation history for Judge: ${j.name}`)}
                  onEdit={(j) => toast.success(`Edit Judge panel details for ${j.name}`)}
                  onToggleStatus={(j) =>
                    setModalConfig({
                      isOpen: true,
                      type: j.status === 'suspended' ? 'activate' : 'suspend',
                      target: j,
                    })
                  }
                />
              ))
            )}
          </div>
        ) : (
          <div className="w-full overflow-x-auto rounded-2xl border border-white/5 bg-[#0f0f1a] shadow-xl">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Judge Name</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Expertise</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Reviews Info</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Rating</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-slate-400 text-right uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500 text-sm">
                      No judges matching query.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((j) => (
                    <tr key={j.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-bold text-amber-400 text-xs shrink-0">
                          {j.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-white block leading-tight">{j.name}</span>
                          <span className="text-[11px] text-slate-500">{j.email}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {j.expertise.map((exp) => (
                            <span key={exp} className="px-1.5 py-0.5 bg-white/5 text-[10px] text-slate-400 rounded-md border border-white/5">
                              {exp}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-xs text-slate-400">
                        {j.reviewsCompleted} / {j.projectsAssigned} completed
                      </td>
                      <td className="p-4">
                        <span className="flex items-center gap-1 text-xs text-white font-bold">
                          <FiStar size={12} className="text-amber-400 fill-amber-400" />
                          {j.rating}
                        </span>
                      </td>
                      <td className="p-4">
                        <StatusBadge status={j.status} />
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => toast.success(`Viewing history for ${j.name}`)}
                            className="p-1.5 bg-white/5 hover:bg-purple-500/10 text-slate-400 hover:text-purple-400 rounded-lg transition-all"
                          >
                            <FiEye size={13} />
                          </button>
                          <button
                            onClick={() => toast.success(`Edit info for ${j.name}`)}
                            className="p-1.5 bg-white/5 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 rounded-lg transition-all"
                          >
                            <FiEdit2 size={13} />
                          </button>
                          <button
                            onClick={() =>
                              setModalConfig({
                                isOpen: true,
                                type: j.status === 'suspended' ? 'activate' : 'suspend',
                                target: j,
                              })
                            }
                            className="p-1.5 bg-white/5 hover:bg-amber-500/10 text-slate-400 hover:text-amber-400 rounded-lg transition-all"
                          >
                            {j.status === 'suspended' ? <FiCheckCircle size={13} /> : <FiSlash size={13} />}
                          </button>
                          <button
                            onClick={() => setModalConfig({ isOpen: true, type: 'delete', target: j })}
                            className="p-1.5 bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 rounded-lg transition-all"
                          >
                            <FiTrash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />

        {/* Confirm Dialog */}
        <ConfirmationModal
          isOpen={modalConfig.isOpen}
          title={modalConfig.type === 'delete' ? 'Delete Judge Profile?' : modalConfig.type === 'suspend' ? 'Suspend Judge Profile?' : 'Activate Judge Profile?'}
          message={`Are you sure you want to proceed with updating the account for ${modalConfig.target?.name}? This alters active score reviews.`}
          confirmLabel="Confirm"
          onConfirm={confirmAction}
          onCancel={() => setModalConfig({ isOpen: false, type: '', target: null })}
        />
      </div>
    </AdminLayout>
  );
};

export default ManageJudges;
