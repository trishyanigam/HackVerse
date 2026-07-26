import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiArrowRight, FiUserCheck, FiAward, FiShield, FiCode, FiLayers } from 'react-icons/fi';
import Button from '../ui/Button';

export const HeroSection = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/hackathons?search=${encodeURIComponent(query)}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="relative w-full overflow-hidden py-12 sm:py-20 flex flex-col items-center justify-center text-center">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/20 blur-3xl rounded-full -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue/20 blur-3xl rounded-full -z-10 animate-pulse-slow" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8 flex flex-col items-center"
      >
        {/* Status Tag */}
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-brand-purple/30 text-xs font-bold text-slate-200 tracking-wide shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            Centralized MERN Hackathon Management Platform
          </span>
        </motion.div>

        {/* Core Headline */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white max-w-4xl">
            One Unified Platform for <span className="text-gradient">Hackathons</span>, Team Building & Evaluation
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Replacing fragmented Google Forms, WhatsApp groups, and spreadsheets with a single, end-to-end MERN solution for Organizers, Participants, Judges, and Admins.
          </p>
        </motion.div>

        {/* Primary Action Buttons (Get Started -> Login/Signup) */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/login')}
            rightIcon={<FiArrowRight size={18} />}
            className="px-8 py-3.5 text-sm font-bold shadow-xl shadow-brand-purple/25 hover:scale-105 transition-all"
          >
            Get Started
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/signup')}
            className="px-8 py-3.5 text-sm font-semibold border-slate-700 hover:border-brand-purple hover:bg-brand-purple/10"
          >
            Create Account
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate('/hackathons')}
            rightIcon={<FiLayers size={16} />}
            className="text-slate-300 hover:text-white"
          >
            Browse Hackathons
          </Button>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={itemVariants} className="w-full max-w-xl pt-2">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-dark-card/95 border border-dark-border rounded-2xl p-1.5 shadow-2xl relative"
          >
            <span className="absolute left-4.5 text-slate-400 pointer-events-none">
              <FiSearch size={18} />
            </span>
            <input
              type="text"
              placeholder="Search hackathons by title, theme, or tech stack..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-0 pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="shrink-0 rounded-xl text-xs font-semibold px-5"
            >
              Search
            </Button>
          </form>
        </motion.div>

        {/* Quick Role Portal Badges */}
        <motion.div variants={itemVariants} className="pt-4 border-t border-slate-800/80 w-full max-w-3xl">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
            Access Role Dashboards
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => navigate('/login?role=participant')}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-brand-purple/50 hover:bg-brand-purple/10 transition-all text-xs font-semibold text-slate-300 hover:text-white"
            >
              <FiCode className="text-brand-purple" /> Participant
            </button>
            <button
              onClick={() => navigate('/login?role=organizer')}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-brand-blue/50 hover:bg-brand-blue/10 transition-all text-xs font-semibold text-slate-300 hover:text-white"
            >
              <FiUserCheck className="text-brand-blue" /> Organizer
            </button>
            <button
              onClick={() => navigate('/login?role=judge')}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all text-xs font-semibold text-slate-300 hover:text-white"
            >
              <FiAward className="text-amber-400" /> Judge
            </button>
            <button
              onClick={() => navigate('/login?role=admin')}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all text-xs font-semibold text-slate-300 hover:text-white"
            >
              <FiShield className="text-emerald-400" /> Admin
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
