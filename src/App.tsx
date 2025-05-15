import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import LiveTracking from './pages/LiveTracking';
import NotFound from './pages/NotFound';
import './styles/index.css';
import { Analytics } from './pages/Analytics';
import { Vehicles } from './pages/Vehicles';
import { Drivers } from './pages/Drivers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tracking" element={<LiveTracking />} />
          <Route path="history" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="alerts" element={<Dashboard />} />
          <Route path="settings" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;