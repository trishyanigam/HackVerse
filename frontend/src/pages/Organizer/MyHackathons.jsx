import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import HackathonCard from '../../components/organizer/HackathonCard';
import HackathonTable from '../../components/organizer/HackathonTable';
import SearchBar from '../../components/organizer/SearchBar';
import FilterBar from '../../components/organizer/FilterBar';
import { mockHackathons } from '../../mock/hackathons';
import { FiPlus, FiGrid, FiList } from 'react-icons/fi';

const STATUS_OPTIONS = [
  { label: 'All Hackathons', value: 'all' },
  { label: 'Ongoing', value: 'ongoing' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Completed', value: 'completed' }
];

const MyHackathons = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid, list

  const filtered = mockHackathons.filter((h) => {
    const matchesSearch = h.title.toLowerCase().includes(search.toLowerCase()) ||
                          h.theme.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || h.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id) => {
    alert('Delete action is UI-only');
  };

  return (
    <OrganizerLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">My Hackathons</h2>
          <p className="text-sm text-slate-500 mt-1">Manage and monitor all your created hackathons</p>
        </div>
        <button
          onClick={() => navigate('/organizer/hackathon/create')}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all shadow-lg shrink-0"
        >
          <FiPlus size={15} />
          Create Hackathon
        </button>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6 bg-[#111118]/50 p-4 rounded-2xl border border-white/5">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by title or theme..." />

        <div className="flex items-center gap-3 w-full md:w-auto justify-between sm:justify-start">
          <FilterBar selected={statusFilter} onChange={setStatusFilter} options={STATUS_OPTIONS} />

          {/* View Switcher */}
          <div className="flex items-center bg-white/5 border border-white/5 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-400 hover:text-white'}`}
              title="Grid View"
            >
              <FiGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-400 hover:text-white'}`}
              title="Table View"
            >
              <FiList size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Display Grid or Table */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-16 text-slate-600">
              No hackathons match the filters.
            </div>
          ) : (
            filtered.map((h, i) => (
              <HackathonCard key={h.id} hackathon={h} index={i} onDelete={handleDelete} />
            ))
          )}
        </div>
      ) : (
        <HackathonTable hackathons={filtered} onDelete={handleDelete} />
      )}
    </OrganizerLayout>
  );
};

export default MyHackathons;
