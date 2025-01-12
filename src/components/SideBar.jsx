// src/components/Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 240 }}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/government-portal">
          <ListItemText primary="Government portal" />
        </ListItem>
        <ListItem button component={Link} to="/case-trader">
          <ListItemText primary="Trader Onboarding" />
        </ListItem>
        <ListItem button component={Link} to="/case-gaming">
          <ListItemText primary="18+ Gaming Signup" />
        </ListItem>
        <ListItem button component={Link} to="/case-address">
          <ListItemText primary="Address Validation" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
