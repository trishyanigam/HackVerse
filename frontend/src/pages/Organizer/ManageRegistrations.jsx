import React, { useState } from 'react';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import RegistrationTable from '../../components/organizer/RegistrationTable';
import SearchBar from '../../components/organizer/SearchBar';
import FilterBar from '../../components/organizer/FilterBar';
import Pagination from '../../components/organizer/Pagination';
import { recentRegistrations } from '../../mock/organizerDashboard';
import toast from 'react-hot-toast';

const STATUS_FILTERS = [
  { label: 'All Registrations', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

const ITEMS_PER_PAGE = 4;

const ManageRegistrations = () => {
  const [data, setData] = useState(recentRegistrations);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Handlers
  const handleApprove = (id) => {
    setData(prev => prev.map(item => item.id === id ? { ...item, status: 'approved' } : item));
    toast.success('Registration approved successfully!');
  };

  const handleReject = (id) => {
    const reason = window.prompt('Enter rejection reason:');
    if (reason !== null) {
      setData(prev => prev.map(item => item.id === id ? { ...item, status: 'rejected', rejectionReason: reason } : item));
      toast.error('Registration rejected.');
    }
  };

  const handleViewTeam = (reg) => {
    alert(`Viewing Team details for: ${reg.teamName}\nLeader: ${reg.leader}\nMembers: ${reg.members}`);
  };

  // Filter & Search
  const filteredData = data.filter(item => {
    const matchesSearch = item.teamName.toLowerCase().includes(search.toLowerCase()) ||
                          item.hackathon.toLowerCase().includes(search.toLowerCase()) ||
                          item.leader.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <OrganizerLayout>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Manage Registrations</h2>
        <p className="text-sm text-slate-500 mt-1">Review team registrations, approve entries, or reject them with feedback</p>
      </div>

      {/* Control bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6 bg-[#111118]/50 p-4 rounded-2xl border border-white/5">
        <SearchBar value={search} onChange={(val) => { setSearch(val); setCurrentPage(1); }} placeholder="Search team, leader or hackathon..." />
        <FilterBar selected={filter} onChange={(val) => { setFilter(val); setCurrentPage(1); }} options={STATUS_FILTERS} />
      </div>

      {/* Table */}
      <RegistrationTable
        registrations={paginatedData}
        onApprove={handleApprove}
        onReject={handleReject}
        onViewTeam={handleViewTeam}
      />

      {/* Pagination */}
      <Pagination
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
      />
    </OrganizerLayout>
  );
};

export default ManageRegistrations;
