// src/components/Sidebar.js
import React from 'react'
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { drawerWidth } from '../utils/theme'

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '64px',
        }}
      >
        <img
          src="https://www.complycube.com/wp-content/uploads/2021/10/complycube-logo.svg"
          alt="ComplyCube Logo"
          style={{ objectFit: 'contain' }}
        />
      </Toolbar>
      <Divider />

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
  )
}

export default Sidebar
