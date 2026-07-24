import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiGrid, FiCompass, FiBriefcase, FiLayers, FiFileText, FiAlertCircle } from 'react-icons/fi';
import Sidebar from '../components/navigation/Sidebar';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';

export const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Define sidebar navigation items for the Hackathon management dashboard
  const navItems = [
    { label: 'Component Showcase', icon: FiLayers, path: '/' },
    { label: 'Live Dashboard Demo', icon: FiGrid, path: '/dashboard' },
    { label: 'Explore Hackathons', icon: FiCompass, path: '/explore' },
    { label: 'My Teams', icon: FiBriefcase, path: '/teams' },
    { label: 'API Documentation', icon: FiFileText, path: '/docs' },
    { label: '404 Page Demo', icon: FiAlertCircle, path: '/this-route-does-not-exist' }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col font-sans">
      {/* Sidebar - Handles mobile slide actions and desktop persistent mode */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navItems={navItems}
        activePath={location.pathname}
      />

      {/* Main content grid wrapper - shifted right on desktops to accommodate sidebar */}
      <div className="flex-1 flex flex-col md:pl-64 transition-all duration-300">
        
        {/* Sticky top glassmorphic header */}
        <Navbar
          onMenuToggle={() => setSidebarOpen(true)}
          notificationsCount={3}
        />

        {/* Scrollable primary content window */}
        <main className="flex-1 flex flex-col relative">
          <div className="flex-1">
            {children}
          </div>
          
          {/* Dashboard nested footer */}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
