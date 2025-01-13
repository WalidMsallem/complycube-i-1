// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
// import CaseTrader from './pages/CaseTrader';
// import CaseGaming from './pages/CaseGaming';
// import CaseAddress from './pages/CaseAddress';
import Sidebar from './components/SideBar';
import GovernmentPortalCase from './pages/government-portal-case';
import TraderOnboarding from './pages/trader-onboarding';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '16px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/government-portal" element={<GovernmentPortalCase />} />
            <Route path="/case-trader" element={<TraderOnboarding />} />
            <Route path="/case-gaming" element={<TraderOnboarding />} />
            <Route path="/case-address" element={<TraderOnboarding />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
