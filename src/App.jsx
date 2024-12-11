import React from 'react';
import './App.css';
import Layout from './layout/Layout';
import CameraListPage from './pages/cameraListPage/CameraListPage.jsx';
import CameraDetailPage from './pages/cameraDetailPage/CameraDetailPage.jsx';
import DashboardPage from './pages/dashboardPage/DashboardPage.jsx';

import { Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/loginPage/LoginPage.jsx";

function App() {
  return (
    <div>
      {/* Определение маршрутов */}
      <Routes>
          <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="/cameras" element={<CameraListPage />} />
          <Route path="/cameras/:id" element={<CameraDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App
