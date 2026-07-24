import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import JudgeLayout from '../../layouts/JudgeLayout';
import EvaluationCriteriaCard from '../../components/judge/EvaluationCriteriaCard';
import FeedbackEditor from '../../components/judge/FeedbackEditor';
import ConfirmationModal from '../../components/judge/ConfirmationModal';
import { evaluationCriteria } from '../../mock/evaluations';
import { getProjectDetails } from '../../mock/projectDetails';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSend, FiStar } from 'react-icons/fi';

const RECOMMENDATIONS = ['winner', 'shortlisted', 'rejected'];

const ProjectEvaluation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProjectDetails(id);

  const initialScores = Object.fromEntries(evaluationCriteria.map((c) => [c.id, 0]));
  const [scores, setScores] = useState(initialScores);
  const [feedback, setFeedback] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

  const totalMax = evaluationCriteria.reduce((acc, c) => acc + c.max, 0);
  const totalScore = Object.values(scores).reduce((acc, v) => acc + v, 0);
  const pct = Math.round((totalScore / totalMax) * 100);

  const handleScoreChange = (criterionId, value) => {
    setScores((prev) => ({ ...prev, [criterionId]: value }));
  };

  const handleSubmit = () => {
    if (!recommendation) {
      toast.error('Please select a recommendation before submitting.');
      return;
    }
    if (!feedback.trim()) {
      toast.error('Please provide feedback before submitting.');
      return;
    }
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    toast.success('Evaluation submitted successfully!');
    setTimeout(() => navigate('/judge/history'), 1200);
  };

  return (
    <JudgeLayout>
      <div className="space-y-6 max-w-3xl">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <FiArrowLeft size={16} /> Back
        </motion.button>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-white">
            Evaluate: {project?.projectName || 'Project'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">Team: {project?.teamName}</p>
        </motion.div>

        {/* Live Score Bar */}
        <div className="bg-[#111118] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Score</span>
            <div className="flex items-center gap-1.5 text-sm font-bold text-white">
              <FiStar size={14} className="text-amber-400" />
              {totalScore} / {totalMax}
              <span className="text-slate-500 text-xs font-normal ml-1">({pct}%)</span>
            </div>
          </div>
          <div className="w-full bg-white/[0.04] rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
              animate={{ width: `${pct}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            />
          </div>
        </div>

        {/* Criteria */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Scoring Criteria</h3>
          {evaluationCriteria.map((criterion) => (
            <EvaluationCriteriaCard
              key={criterion.id}
              criterion={{ ...criterion, maxScore: criterion.max, description: criterion.desc }}
              score={scores[criterion.id]}
              onChange={handleScoreChange}
            />
          ))}
        </div>

        {/* Feedback */}
        <FeedbackEditor value={feedback} onChange={setFeedback} />

        {/* Recommendation */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recommendation</label>
          <div className="flex flex-wrap gap-3">
            {RECOMMENDATIONS.map((r) => (
              <button
                key={r}
                onClick={() => setRecommendation(r)}
                className={`px-5 py-2.5 rounded-xl border text-sm font-bold capitalize transition-all ${
                  recommendation === r
                    ? r === 'winner'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : r === 'shortlisted'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-red-500/20 text-red-300 border-red-500/30'
                    : 'bg-white/[0.03] text-slate-400 border-white/5 hover:bg-white/[0.07]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl text-sm font-semibold text-slate-300 transition-all"
          >
            Save Draft
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 rounded-xl text-sm font-bold text-white transition-all shadow-lg"
          >
            <FiSend size={14} /> Submit Evaluation
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="Submit Evaluation?"
        message={`You are about to submit your final evaluation for "${project?.projectName}". This action will record your scores and feedback. Are you sure?`}
        confirmLabel="Yes, Submit"
      />
    </JudgeLayout>
  );
};

export default ProjectEvaluation;
