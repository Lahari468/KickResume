// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TemplatesPage from './pages/TemplatesPage';
import EditorPage from './pages/EditorPage';
import FinalPreview from './pages/FinalPreview'; // ✅ ADDED
import HTemplates from './components/HTemplates';

import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { ResumeProvider } from './contexts/ResumeContext';
import { ThemeProvider } from './contexts/ThemeContext';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <AuthProvider>
          <ToastProvider>
            <Router>
              <Routes>
                {/* Auth Pages */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* App Pages */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/htemplates" element={<HTemplates />} />
                <Route path="/templates" element={<TemplatesPage />} />

                {/* Editor & Preview */}
                <Route path="/editor" element={<EditorPage />} />
                <Route path="/editor/:id" element={<EditorPage />} />
                <Route path="/preview/:id" element={<EditorPage />} />
                <Route path="/finalpreview" element={<FinalPreview />} />
                <Route path="/finalpreview/:id" element={<FinalPreview/>} />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </ToastProvider>
        </AuthProvider>
      </ResumeProvider>
    </ThemeProvider>
  );
};

export default App;
