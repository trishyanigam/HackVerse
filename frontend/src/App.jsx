import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Showcase from './pages/Showcase';
import DashboardDemo from './pages/DashboardDemo';
import NotFound from './components/common/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          {/* Main design system component showcase page */}
          <Route path="/" element={<Showcase />} />
          
          {/* Real-world mockup dashboard demo */}
          <Route path="/dashboard" element={<DashboardDemo />} />
          
          {/* Fallback route - 404 handler */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
