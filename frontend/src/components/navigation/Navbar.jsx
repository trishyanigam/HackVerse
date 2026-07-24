import React, { useState } from 'react';
import { FiMenu, FiBell, FiChevronDown, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import clsx from 'clsx';
import Badge from '../ui/Badge';

export const Navbar = ({
  user = {
    name: 'Admin User',
    email: 'admin@hackverse.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop'
  },
  onMenuToggle,
  notificationsCount = 3,
  actions,
  className,
  ...props
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 w-full glass-panel border-b border-dark-border/40 bg-dark-bg/70 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-md',
        className
      )}
      {...props}
    >
      {/* Left section: Hamburger (mobile) & Brand title */}
      <div className="flex items-center gap-3">
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple cursor-pointer"
            aria-label="Open sidebar menu"
          >
            <FiMenu size={20} />
          </button>
        )}
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center font-black text-white text-base tracking-widest shadow-md">
            H
          </span>
          <span className="text-lg font-bold text-white tracking-wide hidden sm:block">
            Hack<span className="text-brand-blue">Verse</span>
          </span>
        </div>
      </div>

      {/* Right actions section */}
      <div className="flex items-center gap-4.5">
        {actions && <div className="hidden md:flex items-center gap-3">{actions}</div>}

        {/* Notifications Icon Button */}
        <button
          className="relative text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple cursor-pointer"
          aria-label="View notifications"
        >
          <FiBell size={20} />
          {notificationsCount > 0 && (
            <Badge
              variant="danger"
              size="sm"
              className="absolute top-1.5 right-1.5 min-w-[16px] h-4 flex items-center justify-center text-[9px] px-1"
            >
              {notificationsCount}
            </Badge>
          )}
        </button>

        {/* Profile Avatar Dropdown */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-purple p-1 rounded-lg transition-colors cursor-pointer"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-700 shadow-inner"
              />
              <span className="font-medium hidden md:block">{user.name}</span>
              <FiChevronDown size={14} className="hidden md:block text-slate-400" />
            </button>

            {/* Dropdown Card */}
            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2.5 w-52 rounded-xl glass-panel border border-dark-border bg-dark-card shadow-2xl z-20 py-2.5 animate-in fade-in-50 slide-in-from-top-1">
                  {/* User Profile Summary */}
                  <div className="px-4 py-2 border-b border-dark-border/40">
                    <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                  </div>

                  {/* Menu Options */}
                  <div className="py-1">
                    <a
                      href="#profile"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FiUser size={14} className="text-slate-400" />
                      My Profile
                    </a>
                    <a
                      href="#settings"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FiSettings size={14} className="text-slate-400" />
                      Settings
                    </a>
                  </div>

                  <div className="border-t border-dark-border/40 mt-1.5 pt-1.5">
                    <button
                      onClick={() => setDropdownOpen(false)}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-colors text-left cursor-pointer"
                    >
                      <FiLogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
