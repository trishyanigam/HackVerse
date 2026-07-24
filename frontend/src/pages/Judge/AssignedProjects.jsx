import React, { useState } from 'react';
import JudgeLayout from '../../layouts/JudgeLayout';
import AssignedProjectCard from '../../components/judge/AssignedProjectCard';
import SearchBar from '../../components/judge/SearchBar';
import FilterBar from '../../components/judge/FilterBar';
import Pagination from '../../components/judge/Pagination';
import { assignedProjects } from '../../mock/assignedProjects';
import { motion } from 'framer-motion';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

const PAGE_SIZE = 6;

const AssignedProjects = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = assignedProjects.filter((p) => {
    const matchSearch =
      p.projectName.toLowerCase().includes(search.toLowerCase()) ||
      p.teamName.toLowerCase().includes(search.toLowerCase()) ||
      p.hackathonName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || p.status === filter;
    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <JudgeLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-white">Assigned Projects</h2>
          <p className="text-sm text-slate-500 mt-1">{assignedProjects.length} projects assigned for your review.</p>
        </motion.div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search projects, teams..." />
          <FilterBar filters={FILTERS} active={filter} onSelect={(v) => { setFilter(v); setPage(1); }} />
        </div>

        {/* Grid */}
        {paginated.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-sm">No projects match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {paginated.map((project, i) => (
              <AssignedProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}

        <Pagination current={page} total={totalPages} onPageChange={setPage} />
      </div>
    </JudgeLayout>
  );
};

export default AssignedProjects;
