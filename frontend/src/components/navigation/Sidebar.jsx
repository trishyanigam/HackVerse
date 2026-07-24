import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import clsx from 'clsx';

export const Sidebar = ({
  isOpen = false,
  onClose,
  navItems = [],
  activePath = '/',
  className,
  ...props
}) => {

  const sidebarContent = (
    <div className="w-64 h-full bg-dark-card border-r border-dark-border/40 flex flex-col justify-between py-6">
      {/* Upper Navigation Header */}
      <div className="space-y-6">
        {/* Brand logo inside Sidebar */}
        <div className="px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center font-black text-white text-base tracking-widest">
              H
            </span>
            <span className="text-lg font-bold text-white tracking-wide">
              Hack<span className="text-brand-blue">Verse</span>
            </span>
          </div>

          {/* Close button for Mobile drawers */}
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple cursor-pointer"
              aria-label="Close sidebar"
            >
              <IoClose size={18} />
            </button>
          )}
        </div>

        {/* Sidebar Nav Items List */}
        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = activePath === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={onClose}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold tracking-wide transition-all group duration-200',
                  isActive
                    ? 'bg-gradient-brand text-white shadow-lg shadow-brand-purple/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-dark-border/50'
                )}
              >
                {Icon && (
                  <Icon
                    size={16}
                    className={clsx(
                      'shrink-0 transition-transform group-hover:scale-110',
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                    )}
                  />
                )}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Details */}
      <div className="px-6 border-t border-dark-border/40 pt-4.5">
        <div className="rounded-lg bg-slate-900/60 border border-dark-border p-3 flex flex-col gap-1">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
            Design System Mode
          </p>
          <p className="text-xs font-semibold text-white">
            HackVerse v1.0
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className={clsx('hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 z-30', className)}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Drawer Backdrop Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Slide Drawer Content */}
            <motion.div
              className="relative flex flex-col w-64 max-w-xs h-full shadow-2xl z-10"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
