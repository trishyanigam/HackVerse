import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import TableToolbar from '../../components/admin/TableToolbar';
import SearchBar from '../../components/admin/SearchBar';
import AdvancedFilter from '../../components/admin/AdvancedFilter';
import Pagination from '../../components/admin/Pagination';
import StatusBadge from '../../components/admin/StatusBadge';
import TeamCard from '../../components/admin/TeamCard';
import { adminTeams } from '../../mock/admin/teams';
import { FiGrid, FiList, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const FILTER_CONFIG = [
  {
    key: 'submissionStatus',
    placeholder: 'Submission Status',
    options: [
      { value: 'submitted', label: 'Submitted' },
      { value: 'pending', label: 'Pending' },
      { value: 'not_submitted', label: 'Not Submitted' },
    ],
  },
];

const ManageTeams = () => {
  const [teams, setTeams] = useState(adminTeams);
  const [search, setSearch] = useState('');
  const [filterSub, setFilterSub] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // Filter
  const filtered = teams.filter((t) => {
    const matchesSearch =
      t.teamName.toLowerCase().includes(search.toLowerCase()) ||
      t.leader.toLowerCase().includes(search.toLowerCase()) ||
      t.hackathon.toLowerCase().includes(search.toLowerCase());
    const matchesSub = filterSub ? t.submissionStatus === filterSub : true;
    return matchesSearch && matchesSub;
  });

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleEdit = (team) => {
    toast.success(`Editing details for Team: ${team.teamName}`);
  };

  const handleView = (team) => {
    toast.success(`Viewing full structure for Team: ${team.teamName}`);
  };

  const handleDelete = (id) => {
    setTeams((prev) => prev.filter((t) => t.id !== id));
    toast.success('Team registration record deleted.');
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        {/* Header Toolbar */}
        <TableToolbar
          actionSlot={
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
          }
        >
          <SearchBar value={search} onChange={setSearch} placeholder="Search teams by leader or hackathon..." />
          <AdvancedFilter
            filters={FILTER_CONFIG}
            selectedFilters={{ submissionStatus: filterSub }}
            onFilterChange={(_, val) => {
              setFilterSub(val);
              setCurrentPage(1);
            }}
          />
        </TableToolbar>

        {/* View Layout Switch */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedData.length === 0 ? (
              <div className="col-span-full text-center py-16 text-slate-500 text-sm">
                No teams matching current query found.
              </div>
            ) : (
              paginatedData.map((t) => (
                <TeamCard key={t.id} team={t} onView={handleView} onEdit={handleEdit} />
              ))
            )}
          </div>
        ) : (
          <div className="w-full overflow-x-auto rounded-2xl border border-white/5 bg-[#0f0f1a] shadow-xl">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Team Name</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Hackathon Event</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Leader</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Members</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Submission</th>
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
                  paginatedData.map((t) => (
                    <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-bold text-cyan-400 text-xs shrink-0">
                          {t.teamName.charAt(0)}
                        </div>
                        <span className="font-bold text-white block leading-tight">{t.teamName}</span>
                      </td>
                      <td className="p-4 font-semibold text-slate-300">{t.hackathon}</td>
                      <td className="p-4 text-slate-400">{t.leader}</td>
                      <td className="p-4 font-semibold text-slate-400">{t.members} members</td>
                      <td className="p-4">
                        <StatusBadge status={t.submissionStatus} />
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleView(t)}
                            className="p-1.5 bg-white/5 hover:bg-purple-500/10 text-slate-400 hover:text-purple-400 rounded-lg transition-all"
                          >
                            <FiEye size={13} />
                          </button>
                          <button
                            onClick={() => handleEdit(t)}
                            className="p-1.5 bg-white/5 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 rounded-lg transition-all"
                          >
                            <FiEdit2 size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(t.id)}
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
      </div>
    </AdminLayout>
  );
};

export default ManageTeams;
