import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid,
  FiLayers,
  FiFileText,
  FiClock,
  FiTrendingUp,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronRight,
  FiZap,
} from 'react-icons/fi';

const navItems = [
  { label: 'Dashboard', icon: FiGrid, path: '/judge/dashboard' },
  { label: 'Assigned Projects', icon: FiLayers, path: '/judge/projects' },
  { label: 'Evaluation History', icon: FiClock, path: '/judge/history' },
  { label: 'Analytics', icon: FiTrendingUp, path: '/judge/analytics' },
  { label: 'Notifications', icon: FiBell, path: '/judge/notifications' },
  { label: 'Profile', icon: FiUser, path: '/judge/profile' },
];

const SidebarContent = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <FiZap className="text-white text-sm" />
          </div>
          <span className="text-lg font-bold text-white">HackVerse</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors lg:hidden">
            <FiX size={20} />
          </button>
        )}
      </div>

      {/* Role Badge */}
      <div className="px-5 py-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1">
          Judge
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path ||
            (item.path !== '/judge/dashboard' && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/10 text-purple-300 border border-purple-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={isActive ? 'text-purple-400' : 'text-slate-500 group-hover:text-white'} />
                <span>{item.label}</span>
              </div>
              {isActive && <FiChevronRight size={14} className="text-purple-400" />}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <button
          onClick={() => navigate('/settings')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <FiSettings size={18} />
          <span>Settings</span>
        </button>
        <button
          onClick={() => navigate('/login')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <FiLogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

const JudgeLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const currentPage = navItems.find((n) => location.pathname.startsWith(n.path))?.label || 'Judge';

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 flex font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed top-0 left-0 h-full bg-[#0f0f1a] border-r border-white/5 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              key="sidebar"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-64 bg-[#0f0f1a] border-r border-white/5 z-50 lg:hidden"
            >
              <SidebarContent onClose={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-400 hover:text-white transition-colors"
              >
                <FiMenu size={22} />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-white">{currentPage}</h1>
                <p className="text-xs text-slate-500">HackVerse Judge Panel</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-semibold text-sm">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-x-hidden">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 px-6 py-4 text-center text-xs text-slate-600">
          © 2026 HackVerse · Judge Portal
        </footer>
      </div>
    </div>
  );
};

export default JudgeLayout;
