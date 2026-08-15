/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FarmProvider } from './context/FarmContext';
import { LanguageProvider } from './context/LanguageContext';

import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Crops from './pages/Crops';
import Expenses from './pages/Expenses';
import Tasks from './pages/Tasks';
import Weather from './pages/Weather';

export default function App() {
  return (
    <LanguageProvider>
      <FarmProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Authenticated Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/crops" element={<Crops />} />
              <Route path="/fields" element={<div className="p-8 text-slate-500">Fields management coming soon...</div>} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/profile" element={<div className="p-8 text-slate-500">Profile settings coming soon...</div>} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </FarmProvider>
    </LanguageProvider>
  );
}
