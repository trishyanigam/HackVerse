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

      {/* Phase 5 Organizer Module Routes */}
      <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
      <Route path="/organizer/hackathons" element={<OrganizerHackathons />} />
      <Route path="/organizer/hackathon/create" element={<CreateHackathon />} />
      <Route path="/organizer/hackathon/edit/:id" element={<EditHackathon />} />
      <Route path="/organizer/hackathon/:id" element={<ViewHackathon />} />
      <Route path="/organizer/registrations" element={<ManageRegistrations />} />
      <Route path="/organizer/teams" element={<ManageTeams />} />
      <Route path="/organizer/judges" element={<AssignJudges />} />
      <Route path="/organizer/submissions" element={<ManageSubmissions />} />
      <Route path="/organizer/results" element={<Results />} />
      <Route path="/organizer/analytics" element={<Analytics />} />
      <Route path="/organizer/profile" element={<OrganizerProfile />} />
      <Route path="/organizer/notifications" element={<OrganizerNotifications />} />

      {/* Phase 6 Judge Module Routes */}
      <Route path="/judge/dashboard" element={<JudgeDashboard />} />
      <Route path="/judge/projects" element={<AssignedProjects />} />
      <Route path="/judge/project/:id" element={<ProjectDetails />} />
      <Route path="/judge/evaluate/:id" element={<ProjectEvaluation />} />
      <Route path="/judge/history" element={<EvaluationHistory />} />
      <Route path="/judge/analytics" element={<JudgeAnalytics />} />
      <Route path="/judge/notifications" element={<JudgeNotifications />} />
      <Route path="/judge/profile" element={<JudgeProfile />} />

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
