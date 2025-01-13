// src/pages/Home.js
import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 800 }}>
      <Card>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>
            Welcome to the ComplyCube Showcase
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Please use the menu on the left to explore different verification flows, 
            each demonstrating how ComplyCube can streamline compliance for various industries.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
