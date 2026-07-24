import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiAlertTriangle } from 'react-icons/fi';
import Button from '../ui/Button';

export const NotFound = () => {
  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center p-6 select-none">
      <div className="text-center space-y-8 max-w-xl mx-auto flex flex-col items-center">
        
        {/* Glowing animated visual */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-brand blur-3xl opacity-20 animate-pulse-slow rounded-full" />
          
          <div className="relative w-28 h-28 mx-auto rounded-full bg-slate-900 border border-dark-border flex items-center justify-center text-brand-purple shadow-2xl">
            <FiAlertTriangle size={52} className="animate-bounce" />
          </div>
        </motion.div>

        {/* 404 Header Text */}
        <div className="space-y-3">
          <h1 className="text-8xl font-black tracking-tighter text-gradient">
            404
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
            Lost in the Codebase?
          </h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            The page you are looking for does not exist, has been removed, or has moved to another namespace. Let's get you back on track.
          </p>
        </div>

        {/* Home Link CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Link to="/">
            <Button
              variant="primary"
              size="md"
              leftIcon={<FiHome size={16} />}
              className="px-6 py-3 font-semibold text-xs tracking-wider uppercase"
            >
              Back to Showcase
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
