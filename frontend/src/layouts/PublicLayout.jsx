import React from 'react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

export const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col font-sans selection:bg-brand-purple selection:text-white">
      {/* Public Top Navbar */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Public Bottom Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
