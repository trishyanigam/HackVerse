import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import {
  FiArrowLeft, FiUpload, FiPlus, FiTrash, FiSave, FiEye, FiCheckCircle
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const CreateHackathon = () => {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);
  const [rules, setRules] = useState(['']);
  const [criteria, setCriteria] = useState([{ criteria: '', weight: '', desc: '' }]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      mode: 'online',
      status: 'draft',
      maxTeamSize: 4,
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
    // Combine nested arrays
    const formatted = {
      ...data,
      faqs: faqs.filter(f => f.question && f.answer),
      rules: rules.filter(r => r.trim()),
      judgingCriteria: criteria.filter(c => c.criteria && c.weight),
    };

    setTimeout(() => {
      setLoading(false);
      toast.success(`Hackathon "${data.title}" created successfully!`);
      navigate('/organizer/hackathons');
    }, 1500);
  };

  return (
    <OrganizerLayout>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/organizer/hackathons')}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
        >
          <FiArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white">Create Hackathon</h2>
          <p className="text-sm text-slate-500">Configure details to publish a new challenge</p>
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
          <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-purple-500/40 hover:bg-purple-500/5 transition-all group">
            <FiUpload size={28} className="text-slate-500 group-hover:text-purple-400 transition-colors" />
            <div className="text-center">
              <p className="text-sm text-slate-400 font-medium">Click to upload hackathon banner image</p>
              <p className="text-xs text-slate-600 mt-1">Recommended: 1200x600px PNG or JPG</p>
            </div>
            <input type="file" accept="image/*" className="hidden" />
          </label>
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
                placeholder="e.g. AI Agents Challenge"
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all"
              />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Theme / Tagline *</label>
              <input
                {...register('theme', { required: 'Theme is required' })}
                placeholder="e.g. Build collaborative workflows using LLMs"
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
              placeholder="Provide a detailed description of the hackathon objective, problem focus..."
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
                {...register('venue', { required: 'Venue description is required' })}
                placeholder="e.g. Zoom / SF HQ"
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all"
              />
              {errors.venue && <p className="text-red-400 text-xs mt-1">{errors.venue.message}</p>}
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Prize Pool *</label>
              <input
                {...register('prizePool', { required: 'Prize pool details are required' })}
                placeholder="e.g. $25,000"
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all"
              />
              {errors.prizePool && <p className="text-red-400 text-xs mt-1">{errors.prizePool.message}</p>}
            </div>
          </div>
        </motion.div>

        {/* Timeline & Limits */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111118] border border-white/5 rounded-2xl p-5 space-y-4"
        >
          <h3 className="text-sm font-bold text-white mb-1">Timeline & Teams</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Start Date *</label>
              <input
                type="date"
                {...register('startDate', { required: true })}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">End Date *</label>
              <input
                type="date"
                {...register('endDate', { required: true })}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Reg. Deadline *</label>
              <input
                type="date"
                {...register('deadline', { required: true })}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Max Team Size</label>
              <input
                type="number"
                min={1}
                max={10}
                {...register('maxTeamSize', { required: true })}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>
          </div>
        </motion.div>

        {/* Rules Section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-[#111118] border border-white/5 rounded-2xl p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Hackathon Rules</h3>
            <button
              type="button"
              onClick={handleAddRule}
              className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-semibold"
            >
              <FiPlus size={14} /> Add Rule
            </button>
          </div>

          <div className="space-y-3">
            {rules.map((rule, idx) => (
              <div key={idx} className="flex gap-3">
                <input
                  type="text"
                  value={rule}
                  onChange={(e) => handleRuleChange(idx, e.target.value)}
                  placeholder={`Rule #${idx + 1}`}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500/50 transition-all"
                />
                {rules.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveRule(idx)}
                    className="p-3 bg-red-500/5 border border-red-500/10 text-red-400 rounded-xl hover:bg-red-500/10 transition-all shrink-0"
                  >
                    <FiTrash size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Judging Criteria */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#111118] border border-white/5 rounded-2xl p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Judging Criteria</h3>
            <button
              type="button"
              onClick={handleAddCriteria}
              className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-semibold"
            >
              <FiPlus size={14} /> Add Criteria
            </button>
          </div>

          <div className="space-y-3">
            {criteria.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-3 bg-white/[0.01] border border-white/5 p-4 rounded-xl relative">
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Title (e.g. Design)"
                      value={item.criteria}
                      onChange={(e) => handleCriteriaChange(idx, 'criteria', e.target.value)}
                      className="col-span-2 bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-500/50 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Weight (e.g. 30%)"
                      value={item.weight}
                      onChange={(e) => handleCriteriaChange(idx, 'weight', e.target.value)}
                      className="bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-500/50 transition-all"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Short description of criteria..."
                    value={item.desc}
                    onChange={(e) => handleCriteriaChange(idx, 'desc', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>
                {criteria.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveCriteria(idx)}
                    className="p-3 bg-red-500/5 border border-red-500/10 text-red-400 rounded-xl hover:bg-red-500/10 transition-all self-center shrink-0"
                  >
                    <FiTrash size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-[#111118] border border-white/5 rounded-2xl p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Frequently Asked Questions</h3>
            <button
              type="button"
              onClick={handleAddFaq}
              className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-semibold"
            >
              <FiPlus size={14} /> Add FAQ
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="flex gap-3 bg-white/[0.01] border border-white/5 p-4 rounded-xl relative">
                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    placeholder="Question"
                    value={faq.question}
                    onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-500/50 transition-all font-semibold"
                  />
                  <textarea
                    placeholder="Answer"
                    value={faq.answer}
                    rows={2}
                    onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-500/50 transition-all resize-none"
                  />
                </div>
                {faqs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(idx)}
                    className="p-3 bg-red-500/5 border border-red-500/10 text-red-400 rounded-xl hover:bg-red-500/10 transition-all self-center shrink-0"
                  >
                    <FiTrash size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Status, Sponsors & Info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#111118] border border-white/5 rounded-2xl p-5 space-y-4"
        >
          <h3 className="text-sm font-bold text-white mb-1">Additional Metadata</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Sponsors</label>
              <input
                {...register('sponsors')}
                placeholder="e.g. Google Cloud, Vercel"
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Contact Email</label>
              <input
                type="email"
                {...register('contactEmail')}
                placeholder="organizer@hackverse.com"
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Initial Status *</label>
              <select
                {...register('status')}
                className="w-full bg-[#0a0a0f] border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500/50 transition-all"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="registration_open">Registration Open</option>
                <option value="registration_closed">Registration Closed</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Action footer */}
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
                <FiCheckCircle size={16} />
                Create Hackathon
              </>
            )}
          </button>
        </div>
      </form>
    </OrganizerLayout>
  );
};

export default CreateHackathon;
