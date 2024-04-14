import React from 'react';
import './App.css';
import Layout from './layout/Layout';
import MediaContentListPage from './pages/mediaContentListPage/MediaContentListPage';
import MediaContentDetailPage from './pages/mediaContentDetailPage/MediaContentDetailPage';
import CameraListPage from './pages/cameraListPage/CameraListPage';
import ScreenListPage from './pages/screenListPage/ScreenListPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* Определение маршрутов */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/mediacontent" element={<MediaContentListPage />} />
          <Route path="/mediacontent/:id" element={<MediaContentDetailPage />} /> 
          <Route path="/camera" element={<CameraListPage />} />
          <Route path="/screen" element={<ScreenListPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App
