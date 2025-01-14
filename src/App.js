// src/App.js
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Sidebar from './components/SideBar'
import GovernmentPortalCase from './pages/government-portal-case'
import TraderOnboarding from './pages/trader-onboarding'
import AgeRestrictedGaming from './pages/AgeRestrictedGaming'
import MultiStageAddress from './pages/MultiStageAddress'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { Analytics } from "@vercel/analytics/react"

import { theme } from './utils/theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Analytics/>
      <CssBaseline />
      <Router>
        <Box style={{ display: 'flex' }}>
          <Sidebar />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/government-portal"
                element={<GovernmentPortalCase />}
              />
              <Route path="/case-trader" element={<TraderOnboarding />} />
              <Route path="/case-gaming" element={<AgeRestrictedGaming />} />
              <Route path="/case-address" element={<MultiStageAddress />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App
