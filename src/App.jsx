import React from 'react';
import './App.css';
import Layout from './layout/Layout';
import ContentListPage from './pages/contentListPage/ContentListPage';
import CameraListPage from './pages/cameraListPage/CameraListPage';
import ScreenListPage from './pages/screenListPage/ScreenListPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* Определение маршрутов */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/contentlist" element={<ContentListPage />} />
          <Route path="/cameralist" element={<CameraListPage />} />
          <Route path="/screenlist" element={<ScreenListPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App
