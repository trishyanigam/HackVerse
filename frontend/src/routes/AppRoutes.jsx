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

// Phase 5 Organizer Module pages
import OrganizerDashboard from '../pages/Organizer/OrganizerDashboard';
import OrganizerHackathons from '../pages/Organizer/MyHackathons';
import CreateHackathon from '../pages/Organizer/CreateHackathon';
import EditHackathon from '../pages/Organizer/EditHackathon';
import ViewHackathon from '../pages/Organizer/ViewHackathon';
import ManageRegistrations from '../pages/Organizer/ManageRegistrations';
import ManageTeams from '../pages/Organizer/ManageTeams';
import AssignJudges from '../pages/Organizer/AssignJudges';
import ManageSubmissions from '../pages/Organizer/ManageSubmissions';
import Results from '../pages/Organizer/Results';
import Analytics from '../pages/Organizer/Analytics';
import OrganizerNotifications from '../pages/Organizer/Notifications';
import OrganizerProfile from '../pages/Organizer/Profile';

// Phase 6 Judge Module pages
import JudgeDashboard from '../pages/Judge/JudgeDashboard';
import AssignedProjects from '../pages/Judge/AssignedProjects';
import ProjectDetails from '../pages/Judge/ProjectDetails';
import ProjectEvaluation from '../pages/Judge/ProjectEvaluation';
import EvaluationHistory from '../pages/Judge/EvaluationHistory';
import JudgeAnalytics from '../pages/Judge/JudgeAnalytics';
import JudgeNotifications from '../pages/Judge/JudgeNotifications';
import JudgeProfile from '../pages/Judge/JudgeProfile';

// Phase 7 Admin Module pages
import AdminDashboard from '../pages/Admin/AdminDashboard';
import ManageUsers from '../pages/Admin/ManageUsers';
import UserDetails from '../pages/Admin/UserDetails';
import ManageOrganizers from '../pages/Admin/ManageOrganizers';
import ManageJudges from '../pages/Admin/ManageJudges';
import ManageHackathons from '../pages/Admin/ManageHackathons';
import AdminManageTeams from '../pages/Admin/ManageTeams';
import AdminManageSubmissions from '../pages/Admin/ManageSubmissions';
import AdminReports from '../pages/Admin/Reports';
import AdminAnalytics from '../pages/Admin/Analytics';
import ActivityLogs from '../pages/Admin/ActivityLogs';
import SystemSettings from '../pages/Admin/SystemSettings';
import AdminNotifications from '../pages/Admin/Notifications';
import AdminProfile from '../pages/Admin/Profile';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. PUBLIC LANDING PAGE (Unrestricted Access) */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />

      {/* 2. AUTHENTICATION PAGES (Unrestricted Access for Sign In / Sign Up) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/choose-role" element={<ChooseRole />} />

      {/* 3. ALL OTHER PAGES ARE STRICTLY PROTECTED (Redirect to /login if not authenticated) */}
      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <PublicLayout>
              <About />
            </PublicLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <PublicLayout>
              <Contact />
            </PublicLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/hackathons"
        element={
          <ProtectedRoute>
            <PublicLayout>
              <Hackathons />
            </PublicLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/hackathons/:id"
        element={
          <ProtectedRoute>
            <PublicLayout>
              <HackathonDetails />
            </PublicLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <PublicLayout>
              <Leaderboard />
            </PublicLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/faq"
        element={
          <ProtectedRoute>
            <PublicLayout>
              <FAQ />
            </PublicLayout>
          </ProtectedRoute>
        }
      />
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

      {/* Phase 4 Participant Module Routes (Protected) */}
      <Route path="/participant/dashboard" element={<ProtectedRoute><ParticipantDashboard /></ProtectedRoute>} />
      <Route path="/participant/hackathons" element={<ProtectedRoute><MyHackathons /></ProtectedRoute>} />
      <Route path="/participant/hackathons/:id" element={<ProtectedRoute><ParticipantHackathonDetails /></ProtectedRoute>} />
      <Route path="/participant/registrations" element={<ProtectedRoute><MyRegistrations /></ProtectedRoute>} />
      <Route path="/participant/teams" element={<ProtectedRoute><MyTeams /></ProtectedRoute>} />
      <Route path="/participant/team/create" element={<ProtectedRoute><CreateTeam /></ProtectedRoute>} />
      <Route path="/participant/team/join" element={<ProtectedRoute><JoinTeam /></ProtectedRoute>} />
      <Route path="/participant/team/:id" element={<ProtectedRoute><TeamDetails /></ProtectedRoute>} />
      <Route path="/participant/submission" element={<ProtectedRoute><Submission /></ProtectedRoute>} />
      <Route path="/participant/submissions" element={<ProtectedRoute><SubmissionHistory /></ProtectedRoute>} />
      <Route path="/participant/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/participant/profile" element={<ProtectedRoute><ParticipantProfile /></ProtectedRoute>} />

      {/* Phase 5 Organizer Module Routes (Protected) */}
      <Route path="/organizer/dashboard" element={<ProtectedRoute><OrganizerDashboard /></ProtectedRoute>} />
      <Route path="/organizer/hackathons" element={<ProtectedRoute><OrganizerHackathons /></ProtectedRoute>} />
      <Route path="/organizer/hackathon/create" element={<ProtectedRoute><CreateHackathon /></ProtectedRoute>} />
      <Route path="/organizer/hackathon/edit/:id" element={<ProtectedRoute><EditHackathon /></ProtectedRoute>} />
      <Route path="/organizer/hackathon/:id" element={<ProtectedRoute><ViewHackathon /></ProtectedRoute>} />
      <Route path="/organizer/registrations" element={<ProtectedRoute><ManageRegistrations /></ProtectedRoute>} />
      <Route path="/organizer/teams" element={<ProtectedRoute><ManageTeams /></ProtectedRoute>} />
      <Route path="/organizer/judges" element={<ProtectedRoute><AssignJudges /></ProtectedRoute>} />
      <Route path="/organizer/submissions" element={<ProtectedRoute><ManageSubmissions /></ProtectedRoute>} />
      <Route path="/organizer/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
      <Route path="/organizer/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/organizer/profile" element={<ProtectedRoute><OrganizerProfile /></ProtectedRoute>} />
      <Route path="/organizer/notifications" element={<ProtectedRoute><OrganizerNotifications /></ProtectedRoute>} />

      {/* Phase 6 Judge Module Routes (Protected) */}
      <Route path="/judge/dashboard" element={<ProtectedRoute><JudgeDashboard /></ProtectedRoute>} />
      <Route path="/judge/projects" element={<ProtectedRoute><AssignedProjects /></ProtectedRoute>} />
      <Route path="/judge/project/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
      <Route path="/judge/evaluate/:id" element={<ProtectedRoute><ProjectEvaluation /></ProtectedRoute>} />
      <Route path="/judge/history" element={<ProtectedRoute><EvaluationHistory /></ProtectedRoute>} />
      <Route path="/judge/analytics" element={<ProtectedRoute><JudgeAnalytics /></ProtectedRoute>} />
      <Route path="/judge/notifications" element={<ProtectedRoute><JudgeNotifications /></ProtectedRoute>} />
      <Route path="/judge/profile" element={<ProtectedRoute><JudgeProfile /></ProtectedRoute>} />

      {/* Phase 7 Admin Module Routes (Protected) */}
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><ManageUsers /></ProtectedRoute>} />
      <Route path="/admin/users/:id" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />
      <Route path="/admin/organizers" element={<ProtectedRoute><ManageOrganizers /></ProtectedRoute>} />
      <Route path="/admin/judges" element={<ProtectedRoute><ManageJudges /></ProtectedRoute>} />
      <Route path="/admin/hackathons" element={<ProtectedRoute><ManageHackathons /></ProtectedRoute>} />
      <Route path="/admin/teams" element={<ProtectedRoute><AdminManageTeams /></ProtectedRoute>} />
      <Route path="/admin/submissions" element={<ProtectedRoute><AdminManageSubmissions /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute><AdminReports /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />
      <Route path="/admin/activity" element={<ProtectedRoute><ActivityLogs /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute><SystemSettings /></ProtectedRoute>} />
      <Route path="/admin/notifications" element={<ProtectedRoute><AdminNotifications /></ProtectedRoute>} />
      <Route path="/admin/profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />

      {/* Showcase & Demos (Protected) */}
      <Route
        path="/showcase"
        element={
          <ProtectedRoute>
            <PublicLayout>
              <Showcase />
            </PublicLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard-demo"
        element={
          <ProtectedRoute>
            <PublicLayout>
              <DashboardDemo />
            </PublicLayout>
          </ProtectedRoute>
        }
      />

      {/* 404 Page (Protected / Redirect) */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <PublicLayout>
              <NotFound />
            </PublicLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
