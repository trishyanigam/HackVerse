import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-dark-bg text-slate-100 flex flex-col justify-between relative overflow-hidden py-8 px-4 sm:px-6 lg:px-8 selection:bg-brand-purple selection:text-white">
      {/* Ambient gradient glow backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-purple/15 blur-3xl rounded-full pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-blue/15 blur-3xl rounded-full pointer-events-none -z-10 animate-pulse-slow" />

      {/* Top Header Logo Link */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between z-10">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center font-black text-white text-lg tracking-widest group-hover:scale-105 transition-transform duration-200 shadow-lg shadow-brand-purple/20">
            H
          </span>
          <span className="text-xl font-bold text-white tracking-wide">
            Hack<span className="text-brand-blue">Verse</span>
          </span>
        </Link>
        <Link
          to="/"
          className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          &larr; Back to Home
        </Link>
      </header>

      {/* Main Centered Content */}
      <main className="w-full flex-1 flex items-center justify-center py-8 z-10">
        {children}
      </main>

      {/* Bottom Footer metadata */}
      <footer className="w-full max-w-7xl mx-auto text-center text-xs text-slate-500 z-10">
        &copy; {new Date().getFullYear()} HackVerse. Protected by Enterprise SSL Encryption.
      </footer>
    </div>
  );
};

export default AuthLayout;
