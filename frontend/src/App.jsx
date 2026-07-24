import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#111827',
            color: '#f3f4f6',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '12px',
          },
        }}
      />
      <AppRoutes />
    </Router>
  );
}

export default App;
