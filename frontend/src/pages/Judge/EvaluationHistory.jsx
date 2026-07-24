import React, { useState } from 'react';
import JudgeLayout from '../../layouts/JudgeLayout';
import ReviewHistoryTable from '../../components/judge/ReviewHistoryTable';
import EvaluationSummaryCard from '../../components/judge/EvaluationSummaryCard';
import SearchBar from '../../components/judge/SearchBar';
import FilterBar from '../../components/judge/FilterBar';
import { evaluationHistory } from '../../mock/evaluations';
import { motion } from 'framer-motion';
import { FiList, FiGrid } from 'react-icons/fi';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'winner', label: 'Winner' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'rejected', label: 'Rejected' },
];

// Map evaluationHistory to the shape used by summary/table components
const mapped = evaluationHistory.map((e) => ({
  id: e.id,
  projectId: e.projectId,
  projectName: e.projectName,
  teamName: e.teamName,
  hackathonName: e.hackathon,
  totalScore: e.score,
  maxScore: 100,
  recommendation: e.score >= 90 ? 'winner' : e.score >= 80 ? 'shortlisted' : 'rejected',
  evaluatedAt: e.date,
}));

const EvaluationHistory = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('list'); // 'list' | 'table'

  const filtered = mapped.filter((e) => {
    const matchSearch =
      e.projectName.toLowerCase().includes(search.toLowerCase()) ||
      e.teamName.toLowerCase().includes(search.toLowerCase()) ||
      e.hackathonName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || e.recommendation === filter;
    return matchSearch && matchFilter;
  });

  return (
    <JudgeLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-white">Evaluation History</h2>
          <p className="text-sm text-slate-500 mt-1">{mapped.length} projects evaluated so far.</p>
        </motion.div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <SearchBar value={search} onChange={setSearch} placeholder="Search evaluated projects..." />
            <FilterBar filters={FILTERS} active={filter} onSelect={setFilter} />
          </div>
          <div className="flex gap-1 bg-white/[0.04] border border-white/5 rounded-xl p-1 shrink-0">
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <FiList size={15} />
            </button>
            <button
              onClick={() => setView('table')}
              className={`p-2 rounded-lg transition-all ${view === 'table' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <FiGrid size={15} />
            </button>
          </div>
        </div>

        {/* Content */}
        {view === 'list' ? (
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <p className="text-center py-12 text-slate-500 text-sm">No evaluations match your filters.</p>
            ) : (
              filtered.map((ev, i) => <EvaluationSummaryCard key={ev.id} evaluation={ev} index={i} />)
            )}
          </div>
        ) : (
          <div className="bg-[#111118] border border-white/5 rounded-2xl p-5">
            <ReviewHistoryTable evaluations={filtered} />
          </div>
        )}
      </div>
    </JudgeLayout>
  );
};

export default EvaluationHistory;
