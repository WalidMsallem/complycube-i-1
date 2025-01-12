// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
// import CaseTrader from './pages/CaseTrader';
// import CaseGaming from './pages/CaseGaming';
// import CaseAddress from './pages/CaseAddress';
import Sidebar from './components/SideBar';
import GovernmentPortalCase from './pages/government-portal-case';
import Case2 from './pages/case2';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '16px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/government-portal" element={<GovernmentPortalCase />} />
            <Route path="/case-trader" element={<Case2 />} />
            <Route path="/case-gaming" element={<Case2 />} />
            <Route path="/case-address" element={<Case2 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
