import React, { useState } from 'react';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import TeamTable from '../../components/organizer/TeamTable';
import SearchBar from '../../components/organizer/SearchBar';
import FilterBar from '../../components/organizer/FilterBar';
import Pagination from '../../components/organizer/Pagination';
import { myTeams } from '../../mock/teams';

const TEAM_FILTERS = [
  { label: 'All Teams', value: 'all' },
  { label: 'Submitted', value: 'submitted' },
  { label: 'In Progress', value: 'in_progress' }
];

const ITEMS_PER_PAGE = 5;

const ManageTeams = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Extend mock teams to match columns requirements
  const teamsData = myTeams.map((t, idx) => ({
    ...t,
    leader: t.members?.find(m => m.isLeader)?.name || 'Leader Name',
    teamSize: t.members?.length || 4,
    projectName: idx === 0 ? 'EcoTrack' : 'MedAssist AI',
    submissionStatus: idx === 0 ? 'submitted' : 'in_progress',
  }));

  const filtered = teamsData.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(search.toLowerCase()) ||
                          team.hackathon.toLowerCase().includes(search.toLowerCase()) ||
                          team.leader.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' ||
                          (filter === 'submitted' && team.submissionStatus === 'submitted') ||
                          (filter === 'in_progress' && team.submissionStatus === 'in_progress');
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <OrganizerLayout>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Manage Teams</h2>
        <p className="text-sm text-slate-500 mt-1">Track registered teams, their members, project progress, and submission status</p>
      </div>

      {/* Control bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6 bg-[#111118]/50 p-4 rounded-2xl border border-white/5">
        <SearchBar value={search} onChange={(val) => { setSearch(val); setCurrentPage(1); }} placeholder="Search team, leader or hackathon..." />
        <FilterBar selected={filter} onChange={(val) => { setFilter(val); setCurrentPage(1); }} options={TEAM_FILTERS} />
      </div>

      {/* Table */}
      <TeamTable teams={paginated} />

      {/* Pagination */}
      <Pagination
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
      />
    </OrganizerLayout>
  );
};

export default ManageTeams;
