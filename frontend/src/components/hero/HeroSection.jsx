import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiArrowRight, FiSliders } from 'react-icons/fi';
import Button from '../ui/Button';

export const HeroSection = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Redirect to hackathon list page passing search query
    navigate(`/hackathons?search=${encodeURIComponent(query)}`);
  };

  // Motion physics parameters
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
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
    <div className="relative w-full overflow-hidden py-16 sm:py-24 flex flex-col items-center justify-center text-center">
      {/* Absolute Gradient Glow Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-purple/15 blur-3xl rounded-full -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-blue/15 blur-3xl rounded-full -z-10 animate-pulse-slow" />

      {/* Main Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 flex flex-col items-center"
      >
        {/* Floating status tag */}
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-dark-border text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            Active Hackathon Platform Live
          </span>
        </motion.div>

        {/* Headings */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-white max-w-3xl">
            Where Ideas Accelerate Into{' '}
            <span className="text-gradient">Production</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            HackVerse bridges global developer squads with cutting-edge sponsor platforms. Host, deploy, evaluate, and scale software concepts inside 72 hours.
          </p>
        </motion.div>

        {/* Dynamic Search Box Form */}
        <motion.div variants={itemVariants} className="w-full max-w-lg">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-dark-card/95 border border-dark-border rounded-xl p-1.5 shadow-2xl relative"
          >
            <span className="absolute left-4.5 text-slate-500 pointer-events-none">
              <FiSearch size={18} />
            </span>
            <input
              type="text"
              placeholder="Search hackathons (e.g. NeuralFlow, DeFi)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-0 pl-11 pr-4 py-3 text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="shrink-0 rounded-lg text-xs"
            >
              Search
            </Button>
          </form>
        </motion.div>

        {/* Navigation CTAs */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/hackathons')}
            rightIcon={<FiArrowRight />}
          >
            Browse Tracks
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={() => navigate('/leaderboard')}
            className="text-slate-400 hover:text-white"
          >
            Winner Rankings
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
