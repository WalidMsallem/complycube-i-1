// src/pages/Home.js
import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Welcome to the ComplyCube Showcase
      </Typography>
      <Typography variant="h6" gutterBottom>
        Explore different integration scenarios and learn how ComplyCube can
        streamline compliance workflows.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          component={Link}
          to="/government-portal"
          sx={{ mr: 2 }}
        >
          Government portal
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/case-trader"
          sx={{ mr: 2 }}
        >
          Trader Onboarding
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/case-gaming"
          sx={{ mr: 2 }}
        >
          18+ Gaming Signup
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/case-address"
          sx={{ mr: 2 }}
        >
          Address Validation & Multi-Bureau Check
        </Button>
      </Box>
    </Box>
  )
}

export default Home
