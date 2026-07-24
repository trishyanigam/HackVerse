import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import {
  FiArrowLeft, FiUpload, FiPlus, FiTrash, FiSave, FiEye, FiCheckCircle
} from 'react-icons/fi';
import { mockHackathons } from '../../mock/hackathons';
import toast from 'react-hot-toast';

const EditHackathon = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the hackathon or default to first
  const targetHackathon = mockHackathons.find(h => h.id === id) || mockHackathons[0];

  const [faqs, setFaqs] = useState(
    targetHackathon.faqs || [
      { question: 'What is the team size?', answer: '1-4 Members.' },
      { question: 'Is it virtual?', answer: 'Yes, online.' }
    ]
  );
  const [rules, setRules] = useState(targetHackathon.rules || ['Code must be created during event.']);
  const [criteria, setCriteria] = useState(targetHackathon.judgingCriteria || [{ criteria: 'Innovation', weight: '30%', desc: 'Creativity.' }]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: targetHackathon.title,
      theme: targetHackathon.theme,
      description: targetHackathon.description,
      mode: targetHackathon.venue.includes('Virtual') ? 'online' : 'hybrid',
      venue: targetHackathon.venue,
      prizePool: targetHackathon.prizePool,
      maxTeamSize: parseInt(targetHackathon.teamSize) || 4,
      status: targetHackathon.status === 'ongoing' ? 'published' : 'draft',
      sponsors: 'Google Cloud, Vercel',
      contactEmail: 'contact@organizer.com'
    }
  });

  const handleAddFaq = () => setFaqs([...faqs, { question: '', answer: '' }]);
  const handleRemoveFaq = (index) => setFaqs(faqs.filter((_, i) => i !== index));
  const handleFaqChange = (index, field, value) => {
    const next = [...faqs];
    next[index][field] = value;
    setFaqs(next);
  };

  const handleAddRule = () => setRules([...rules, '']);
  const handleRemoveRule = (index) => setRules(rules.filter((_, i) => i !== index));
  const handleRuleChange = (index, value) => {
    const next = [...rules];
    next[index] = value;
    setRules(next);
  };

  const handleAddCriteria = () => setCriteria([...criteria, { criteria: '', weight: '', desc: '' }]);
  const handleRemoveCriteria = (index) => setCriteria(criteria.filter((_, i) => i !== index));
  const handleCriteriaChange = (index, field, value) => {
    const next = [...criteria];
    next[index][field] = value;
    setCriteria(next);
  };

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Hackathon updated successfully!');
      navigate('/organizer/hackathons');
    }, 1200);
  };

  const handleDelete = () => {
    const ok = window.confirm('Are you sure you want to delete this hackathon? (UI Only)');
    if (ok) {
      toast.error('Hackathon deleted successfully');
      navigate('/organizer/hackathons');
    }
  };

  const handlePreview = () => {
    toast.success('Loading preview...');
    navigate(`/organizer/hackathon/${targetHackathon.id}`);
  };

  return (
    <OrganizerLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/organizer/hackathons')}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
          >
            <FiArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-white">Edit Hackathon</h2>
            <p className="text-sm text-slate-500">Modify configure settings for this challenge</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePreview}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
          >
            <FiEye size={13} />
            Preview
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-all"
          >
            <FiTrash size={13} />
            Delete
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl space-y-6">
        {/* Banner Upload */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111118] border border-white/5 rounded-2xl p-5"
        >
          <h3 className="text-sm font-bold text-white mb-4">Event Banner</h3>
          <div className="relative rounded-xl overflow-hidden h-48 bg-slate-900 border border-white/5 mb-4">
            <img src={targetHackathon.banner} alt="" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-semibold cursor-pointer hover:bg-black/80 transition-all">
                <FiUpload size={14} />
                Change Banner
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          </div>
        </motion.div>

        {/* Basic Information */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-[#111118] border border-white/5 rounded-2xl p-5 space-y-4"
        >
          <h3 className="text-sm font-bold text-white mb-1">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Hackathon Title *</label>
              <input
                {...register('title', { required: 'Title is required' })}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all"
              />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Theme / Tagline *</label>
              <input
                {...register('theme', { required: 'Theme is required' })}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all"
              />
              {errors.theme && <p className="text-red-400 text-xs mt-1">{errors.theme.message}</p>}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1.5 block font-medium">Full Description *</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={4}
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all resize-none"
            />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Mode *</label>
              <select
                {...register('mode')}
                className="w-full bg-[#0a0a0f] border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500/50 transition-all"
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Venue *</label>
              <input
                {...register('venue', { required: 'Venue is required' })}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all"
              />
              {errors.venue && <p className="text-red-400 text-xs mt-1">{errors.venue.message}</p>}
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Prize Pool *</label>
              <input
                {...register('prizePool', { required: 'Prize pool details are required' })}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all"
              />
              {errors.prizePool && <p className="text-red-400 text-xs mt-1">{errors.prizePool.message}</p>}
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={() => navigate('/organizer/hackathons')}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-slate-400 bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 disabled:opacity-60 transition-all"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <FiSave size={16} />
                Update Hackathon
              </>
            )}
          </button>
        </div>
      </form>
    </OrganizerLayout>
  );
};

export default EditHackathon;
