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

// Phase 4 Participant Module pages
import ParticipantDashboard from '../pages/Participant/Dashboard';
import MyHackathons from '../pages/Participant/MyHackathons';
import ParticipantHackathonDetails from '../pages/Participant/ParticipantHackathonDetails';
import MyRegistrations from '../pages/Participant/MyRegistrations';
import MyTeams from '../pages/Participant/MyTeams';
import CreateTeam from '../pages/Participant/CreateTeam';
import TeamDetails from '../pages/Participant/TeamDetails';
import JoinTeam from '../pages/Participant/JoinTeam';
import Submission from '../pages/Participant/Submission';
import SubmissionHistory from '../pages/Participant/SubmissionHistory';
import Notifications from '../pages/Participant/Notifications';
import ParticipantProfile from '../pages/Participant/ParticipantProfile';

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

      {/* Phase 4 Participant Module Routes */}
      <Route path="/participant/dashboard" element={<ParticipantDashboard />} />
      <Route path="/participant/hackathons" element={<MyHackathons />} />
      <Route path="/participant/hackathons/:id" element={<ParticipantHackathonDetails />} />
      <Route path="/participant/registrations" element={<MyRegistrations />} />
      <Route path="/participant/teams" element={<MyTeams />} />
      <Route path="/participant/team/create" element={<CreateTeam />} />
      <Route path="/participant/team/join" element={<JoinTeam />} />
      <Route path="/participant/team/:id" element={<TeamDetails />} />
      <Route path="/participant/submission" element={<Submission />} />
      <Route path="/participant/submissions" element={<SubmissionHistory />} />
      <Route path="/participant/notifications" element={<Notifications />} />
      <Route path="/participant/profile" element={<ParticipantProfile />} />

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
