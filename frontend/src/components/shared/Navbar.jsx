import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiLayers } from 'react-icons/fi';
import clsx from 'clsx';
import Button from '../ui/Button';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Hackathons', path: '/hackathons' },
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'FAQ', path: '/faq' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-dark-border/40 bg-dark-bg/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-lg">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <span className="h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center font-black text-white text-base tracking-widest group-hover:scale-105 transition-transform duration-200">
          H
        </span>
        <span className="text-lg font-bold text-white tracking-wide">
          Hack<span className="text-brand-blue">Verse</span>
        </span>
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-6.5">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.label}
              to={link.path}
              className={clsx(
                'text-xs font-semibold tracking-wider uppercase transition-colors relative py-1',
                isActive ? 'text-white' : 'text-slate-400 hover:text-white'
              )}
            >
              {link.label}
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-brand rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* CTA Button (Desktop) */}
      <div className="hidden md:block">
        <Link to="/hackathons">
          <Button variant="primary" size="sm">
            Browse Hackathons
          </Button>
        </Link>
      </div>

      {/* Hamburger Menu Trigger (Mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple cursor-pointer"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Mobile Drawer Overlay & Links */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[60px] left-0 right-0 w-full glass-panel bg-dark-card border-b border-dark-border shadow-2xl flex flex-col p-5 space-y-4.5 md:hidden"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'text-sm font-semibold tracking-wide py-2.5 px-3 rounded-lg transition-colors border border-transparent',
                    isActive
                      ? 'bg-slate-900 border-dark-border text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-dark-border/40">
              <Link to="/hackathons" onClick={() => setIsOpen(false)}>
                <Button variant="primary" size="md" className="w-full">
                  Browse Hackathons
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
