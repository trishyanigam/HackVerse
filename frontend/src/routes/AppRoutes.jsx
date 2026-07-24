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

// Phase 3 Authentication pages & components
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';
import VerifyEmail from '../pages/Auth/VerifyEmail';
import ChooseRole from '../pages/Auth/ChooseRole';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import ProtectedRoute from '../components/auth/ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Pages (Unwrapped from public layout for clean auth card focus) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/choose-role" element={<ChooseRole />} />

      {/* Public Pages wrapped in PublicLayout */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
      <Route
        path="/about"
        element={
          <PublicLayout>
            <About />
          </PublicLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicLayout>
            <Contact />
          </PublicLayout>
        }
      />
      <Route
        path="/hackathons"
        element={
          <PublicLayout>
            <Hackathons />
          </PublicLayout>
        }
      />
      <Route
        path="/hackathons/:id"
        element={
          <PublicLayout>
            <HackathonDetails />
          </PublicLayout>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <PublicLayout>
            <Leaderboard />
          </PublicLayout>
        }
      />
      <Route
        path="/faq"
        element={
          <PublicLayout>
            <FAQ />
          </PublicLayout>
        }
      />

      {/* Protected Routes (Wrapped in ProtectedRoute & PublicLayout) */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <PublicLayout>
              <Profile />
            </PublicLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <PublicLayout>
              <Settings />
            </PublicLayout>
          </ProtectedRoute>
        }
      />

      {/* Showcase & Dashboard Demo */}
      <Route
        path="/showcase"
        element={
          <PublicLayout>
            <Showcase />
          </PublicLayout>
        }
      />
      <Route
        path="/dashboard-demo"
        element={
          <PublicLayout>
            <DashboardDemo />
          </PublicLayout>
        }
      />

      {/* 404 Page */}
      <Route
        path="*"
        element={
          <PublicLayout>
            <NotFound />
          </PublicLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
