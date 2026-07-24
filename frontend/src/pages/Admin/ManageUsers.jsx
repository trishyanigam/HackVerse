import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import DataTable from '../../components/admin/DataTable';
import TableToolbar from '../../components/admin/TableToolbar';
import SearchBar from '../../components/admin/SearchBar';
import AdvancedFilter from '../../components/admin/AdvancedFilter';
import Pagination from '../../components/admin/Pagination';
import StatusBadge from '../../components/admin/StatusBadge';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { adminUsers } from '../../mock/admin/users';
import { FiEye, FiEdit2, FiSlash, FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const FILTER_CONFIG = [
  {
    key: 'role',
    placeholder: 'Filter by Role',
    options: [
      { value: 'participant', label: 'Participant' },
      { value: 'organizer', label: 'Organizer' },
      { value: 'judge', label: 'Judge' },
    ],
  },
  {
    key: 'status',
    placeholder: 'Filter by Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'blocked', label: 'Blocked' },
      { value: 'suspended', label: 'Suspended' },
    ],
  },
];

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(adminUsers);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ role: '', status: '' });
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [sortDesc, setSortDesc] = useState(false);

  // Modal State
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '', target: null });

  const itemsPerPage = 6;

  // Filter & Search Logic
  const filteredData = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filters.role ? u.role === filters.role : true;
    const matchesStatus = filters.status ? u.status === filters.status : true;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Sort Logic
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortBy) return 0;
    let valA = a[sortBy];
    let valB = b[sortBy];
    if (typeof valA === 'string') {
      return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
    }
    return sortDesc ? valB - valA : valA - valB;
  });

  // Pagination bounds
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(field);
      setSortDesc(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map((d) => d.id));
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Modals confirmation
  const confirmAction = () => {
    const { type, target } = modalConfig;
    setModalConfig({ isOpen: false, type: '', target: null });

    if (type === 'delete') {
      setUsers((prev) => prev.filter((u) => u.id !== target.id));
      toast.success(`User ${target.name} has been removed.`);
    } else if (type === 'block') {
      setUsers((prev) =>
        prev.map((u) => (u.id === target.id ? { ...u, status: 'blocked' } : u))
      );
      toast.success(`User ${target.name} has been blocked.`);
    } else if (type === 'unblock') {
      setUsers((prev) =>
        prev.map((u) => (u.id === target.id ? { ...u, status: 'active' } : u))
      );
      toast.success(`User ${target.name} has been unblocked.`);
    } else if (type === 'bulk_delete') {
      setUsers((prev) => prev.filter((u) => !selectedIds.includes(u.id)));
      setSelectedIds([]);
      toast.success('Selected users deleted successfully.');
    }
  };

  // Table Columns Setup
  const columns = [
    {
      key: 'name',
      label: 'User Info',
      sortable: true,
      render: (_, u) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center font-bold text-xs text-purple-400">
            {u.name.charAt(0)}
          </div>
          <div>
            <span className="font-bold text-white block leading-tight">{u.name}</span>
            <span className="text-[11px] text-slate-500">{u.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (role) => (
        <span className="text-xs font-semibold capitalize bg-white/5 px-2 py-0.5 border border-white/5 rounded-md text-slate-300">
          {role}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (status) => <StatusBadge status={status} />,
    },
    {
      key: 'registeredAt',
      label: 'Registered Date',
      sortable: true,
      render: (date) => (
        <span className="text-xs text-slate-400">
          {new Date(date).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      className: 'text-right',
      render: (_, u) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => navigate(`/admin/users/${u.id}`)}
            className="p-1.5 bg-white/5 hover:bg-purple-500/10 text-slate-400 hover:text-purple-400 rounded-lg transition-all"
            title="View Details"
          >
            <FiEye size={14} />
          </button>
          <button
            onClick={() => toast.success(`Edit user modal triggered for ${u.name}`)}
            className="p-1.5 bg-white/5 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 rounded-lg transition-all"
            title="Edit User"
          >
            <FiEdit2 size={14} />
          </button>
          {u.status === 'blocked' ? (
            <button
              onClick={() => setModalConfig({ isOpen: true, type: 'unblock', target: u })}
              className="p-1.5 bg-white/5 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 rounded-lg transition-all"
              title="Unblock User"
            >
              <FiCheckCircle size={14} />
            </button>
          ) : (
            <button
              onClick={() => setModalConfig({ isOpen: true, type: 'block', target: u })}
              className="p-1.5 bg-white/5 hover:bg-amber-500/10 text-slate-400 hover:text-amber-400 rounded-lg transition-all"
              title="Block User"
            >
              <FiSlash size={14} />
            </button>
          )}
          <button
            onClick={() => setModalConfig({ isOpen: true, type: 'delete', target: u })}
            className="p-1.5 bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 rounded-lg transition-all"
            title="Delete User"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-4">
        {/* Toolbar */}
        <TableToolbar
          selectedCount={selectedIds.length}
          onBulkDelete={() => setModalConfig({ isOpen: true, type: 'bulk_delete', target: null })}
        >
          <SearchBar value={search} onChange={setSearch} placeholder="Search users by name or email..." />
          <AdvancedFilter
            filters={FILTER_CONFIG}
            selectedFilters={filters}
            onFilterChange={handleFilterChange}
          />
        </TableToolbar>

        {/* Users Table */}
        <DataTable
          columns={columns}
          data={paginatedData}
          selectedIds={selectedIds}
          onSelectAll={handleSelectAll}
          onSelectRow={handleSelectRow}
          sortBy={sortBy}
          sortDesc={sortDesc}
          onSort={handleSort}
          emptyMessage="No users matching the filters found."
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />

        {/* Confirmation Dialogs */}
        <ConfirmationModal
          isOpen={modalConfig.isOpen}
          title={
            modalConfig.type === 'bulk_delete'
              ? 'Delete Selected Users?'
              : modalConfig.type === 'delete'
              ? 'Delete User Account?'
              : modalConfig.type === 'block'
              ? 'Block User Access?'
              : 'Unblock User Access?'
          }
          message={
            modalConfig.type === 'bulk_delete'
              ? `Are you sure you want to delete ${selectedIds.length} users? This will erase all matching records permanently.`
              : `Are you sure you want to proceed with the action on ${modalConfig.target?.name}?`
          }
          confirmLabel="Confirm Action"
          onConfirm={confirmAction}
          onCancel={() => setModalConfig({ isOpen: false, type: '', target: null })}
        />
      </div>
    </AdminLayout>
  );
};

export default ManageUsers;
