import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import TableToolbar from '../../components/admin/TableToolbar';
import SearchBar from '../../components/admin/SearchBar';
import AdvancedFilter from '../../components/admin/AdvancedFilter';
import Pagination from '../../components/admin/Pagination';
import StatusBadge from '../../components/admin/StatusBadge';
import OrganizerCard from '../../components/admin/OrganizerCard';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { adminOrganizers } from '../../mock/admin/organizers';
import { FiGrid, FiList, FiEye, FiEdit2, FiSlash, FiCheckCircle, FiTrash2, FiPlus } from 'react-icons/fi';
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

const ManageOrganizers = () => {
  const [organizers, setOrganizers] = useState(adminOrganizers);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [currentPage, setCurrentPage] = useState(1);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '', target: null });

  const itemsPerPage = 6;

  // Filter Logic
  const filtered = organizers.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(search.toLowerCase()) ||
      org.organization.toLowerCase().includes(search.toLowerCase()) ||
      org.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus ? org.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const confirmAction = () => {
    const { type, target } = modalConfig;
    setModalConfig({ isOpen: false, type: '', target: null });

    if (type === 'delete') {
      setOrganizers((prev) => prev.filter((o) => o.id !== target.id));
      toast.success(`Organizer ${target.name} has been deleted.`);
    } else if (type === 'suspend') {
      setOrganizers((prev) =>
        prev.map((o) => (o.id === target.id ? { ...o, status: 'suspended' } : o))
      );
      toast.success(`Organizer ${target.name} suspended.`);
    } else if (type === 'activate') {
      setOrganizers((prev) =>
        prev.map((o) => (o.id === target.id ? { ...o, status: 'active' } : o))
      );
      toast.success(`Organizer ${target.name} activated.`);
    }
  };

  const handleEdit = (org) => {
    toast.success(`Edit dialog for ${org.name}`);
  };

  const handleView = (org) => {
    toast.success(`Viewing full audit for organizer: ${org.organization}`);
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
                onClick={() => toast.success('Create Organizer Account triggered')}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 rounded-xl text-xs font-bold text-white transition-all shadow-md shadow-purple-500/10"
              >
                <FiPlus size={14} /> Add Organizer
              </button>
            </div>
          }
        >
          <SearchBar value={search} onChange={setSearch} placeholder="Search organizer or company name..." />
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
                No organizers found matching query.
              </div>
            ) : (
              paginatedData.map((org) => (
                <OrganizerCard
                  key={org.id}
                  organizer={org}
                  onView={handleView}
                  onEdit={handleEdit}
                  onToggleStatus={(o) =>
                    setModalConfig({
                      isOpen: true,
                      type: o.status === 'suspended' ? 'activate' : 'suspend',
                      target: o,
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
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Organizer Details</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Organization</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Hackathons Created</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-slate-400 text-right uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500 text-sm">
                      No organizers found.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((o) => (
                    <tr key={o.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-blue-400 text-xs shrink-0">
                          {o.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-white block leading-tight">{o.name}</span>
                          <span className="text-[11px] text-slate-500">{o.email}</span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold">{o.organization}</td>
                      <td className="p-4 text-slate-400">{o.hackathonsCreated} hackathons</td>
                      <td className="p-4">
                        <StatusBadge status={o.status} />
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleView(o)}
                            className="p-1.5 bg-white/5 hover:bg-purple-500/10 text-slate-400 hover:text-purple-400 rounded-lg transition-all"
                          >
                            <FiEye size={13} />
                          </button>
                          <button
                            onClick={() => handleEdit(o)}
                            className="p-1.5 bg-white/5 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 rounded-lg transition-all"
                          >
                            <FiEdit2 size={13} />
                          </button>
                          <button
                            onClick={() =>
                              setModalConfig({
                                isOpen: true,
                                type: o.status === 'suspended' ? 'activate' : 'suspend',
                                target: o,
                              })
                            }
                            className="p-1.5 bg-white/5 hover:bg-amber-500/10 text-slate-400 hover:text-amber-400 rounded-lg transition-all"
                          >
                            {o.status === 'suspended' ? <FiCheckCircle size={13} /> : <FiSlash size={13} />}
                          </button>
                          <button
                            onClick={() => setModalConfig({ isOpen: true, type: 'delete', target: o })}
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

        {/* Action Dialog */}
        <ConfirmationModal
          isOpen={modalConfig.isOpen}
          title={
            modalConfig.type === 'delete'
              ? 'Delete Organizer?'
              : modalConfig.type === 'suspend'
              ? 'Suspend Organizer?'
              : 'Activate Organizer?'
          }
          message={`Are you sure you want to perform this action on ${modalConfig.target?.name}? This status affects their active hackathons.`}
          confirmLabel="Confirm"
          onConfirm={confirmAction}
          onCancel={() => setModalConfig({ isOpen: false, type: '', target: null })}
        />
      </div>
    </AdminLayout>
  );
};

export default ManageOrganizers;
