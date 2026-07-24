import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import Home from '../pages/Home/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Hackathons from '../pages/Hackathons';
import HackathonDetails from '../pages/HackathonDetails';
import Leaderboard from '../pages/Leaderboard';
import FAQ from '../pages/FAQ';
import NotFound from '../pages/NotFound';
import Showcase from '../pages/Showcase';
import DashboardDemo from '../pages/DashboardDemo';

export const AppRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hackathons" element={<Hackathons />} />
        <Route path="/hackathons/:id" element={<HackathonDetails />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/faq" element={<FAQ />} />
        
        {/* Phase 1 Design System & Dashboard Demo links */}
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/dashboard-demo" element={<DashboardDemo />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PublicLayout>
  );
};

export default AppRoutes;
