import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MemberProvider } from './auth/MockAuth';
import HomePage from '@/components/pages/HomePage';
import DashBoardPage from '@/components/pages/DashBoardPage';
import FeaturesPage from '@/components/pages/FeaturesPage';
import PricingPage from '@/components/pages/PricingPage';
import ProfilePage from '@/components/pages/ProfilePage';
import ResumeBuilderPage from '@/components/pages/ResumeBuilderPage';
import ResumePreviewPage from '@/components/pages/ResumePreviewPage';
import TemplatesPage from '@/components/pages/TemplatesPage';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function AppRouter() {
  return (
    <MemberProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashBoardPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/resume-builder" element={<ResumeBuilderPage />} />
              <Route path="/resume-preview" element={<ResumePreviewPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </MemberProvider>
  );
}