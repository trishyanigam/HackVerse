import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import TableToolbar from '../../components/admin/TableToolbar';
import SearchBar from '../../components/admin/SearchBar';
import AdvancedFilter from '../../components/admin/AdvancedFilter';
import Pagination from '../../components/admin/Pagination';
import StatusBadge from '../../components/admin/StatusBadge';
import HackathonCard from '../../components/admin/HackathonCard';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { adminHackathons } from '../../mock/admin/hackathons';
import { FiGrid, FiList, FiEye, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

const FILTER_CONFIG = [
  {
    key: 'status',
    placeholder: 'Filter Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'completed', label: 'Completed' },
      { value: 'upcoming', label: 'Upcoming' },
      { value: 'cancelled', label: 'Cancelled' },
    ],
  },
];

const ManageHackathons = () => {
  const [hackathons, setHackathons] = useState(adminHackathons);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, targetId: null });

  const itemsPerPage = 6;

  // Filter
  const filtered = hackathons.filter((h) => {
    const matchesSearch =
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.organizer.toLowerCase().includes(search.toLowerCase()) ||
      h.theme.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus ? h.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const confirmDelete = () => {
    const id = modalConfig.targetId;
    setModalConfig({ isOpen: false, targetId: null });
    setHackathons((prev) => prev.filter((h) => h.id !== id));
    toast.success('Hackathon has been deleted permanently.');
  };

  const handleEdit = (hackathon) => {
    toast.success(`Editing Hackathon: ${hackathon.title}`);
  };

  const handleView = (hackathon) => {
    toast.success(`Viewing details for Hackathon: ${hackathon.title}`);
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        {/* Header toolbar */}
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
                onClick={() => toast.success('Create Hackathon wizard triggered')}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 rounded-xl text-xs font-bold text-white transition-all shadow-md shadow-purple-500/10"
              >
                <FiPlus size={14} /> Create Hackathon
              </button>
            </div>
          }
        >
          <SearchBar value={search} onChange={setSearch} placeholder="Search hackathons by theme or organizer..." />
          <AdvancedFilter
            filters={FILTER_CONFIG}
            selectedFilters={{ status: filterStatus }}
            onFilterChange={(_, val) => {
              setFilterStatus(val);
              setCurrentPage(1);
            }}
          />
        </TableToolbar>

        {/* Dynamic layout modes */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedData.length === 0 ? (
              <div className="col-span-full text-center py-16 text-slate-500 text-sm">
                No matching hackathons found.
              </div>
            ) : (
              paginatedData.map((h) => (
                <HackathonCard
                  key={h.id}
                  hackathon={h}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={(id) => setModalConfig({ isOpen: true, targetId: id })}
                />
              ))
            )}
          </div>
        ) : (
          <div className="w-full overflow-x-auto rounded-2xl border border-white/5 bg-[#0f0f1a] shadow-xl">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Hackathon Title</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Organizer</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Theme</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Metrics</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-slate-400 text-right uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500 text-sm">
                      No matching records.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((h) => (
                    <tr key={h.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={h.banner}
                          alt=""
                          className="w-10 h-7 object-cover rounded-lg border border-white/5"
                        />
                        <span className="font-bold text-white leading-tight">{h.title}</span>
                      </td>
                      <td className="p-4 font-semibold text-slate-300">{h.organizer}</td>
                      <td className="p-4 text-slate-400">{h.theme}</td>
                      <td className="p-4 text-xs text-slate-400">
                        {h.participants} P · {h.teams} T · {h.submissions} S
                      </td>
                      <td className="p-4">
                        <StatusBadge status={h.status} />
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleView(h)}
                            className="p-1.5 bg-white/5 hover:bg-purple-500/10 text-slate-400 hover:text-purple-400 rounded-lg transition-all"
                          >
                            <FiEye size={13} />
                          </button>
                          <button
                            onClick={() => handleEdit(h)}
                            className="p-1.5 bg-white/5 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 rounded-lg transition-all"
                          >
                            <FiEdit2 size={13} />
                          </button>
                          <button
                            onClick={() => setModalConfig({ isOpen: true, targetId: h.id })}
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
          title="Delete Hackathon permanently?"
          message="Deleting this hackathon will drop associated registrations, team structures, submissions and grading data indexes."
          confirmLabel="Delete Hackathon"
          onConfirm={confirmDelete}
          onCancel={() => setModalConfig({ isOpen: false, targetId: null })}
        />
      </div>
    </AdminLayout>
  );
};

export default ManageHackathons;
