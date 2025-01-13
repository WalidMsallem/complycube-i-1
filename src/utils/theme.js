// src/theme.js
import { createTheme } from '@mui/material/styles';

export const drawerWidth = 240; // Sidebar width

// Example ComplyCube-ish color palette (you can tweak)
const brandBlue = '#2D9CDB'; 
const brandDark = '#14213D'; 
const brandLight = '#f0f4f8';

export const theme = createTheme({
  palette: {
    primary: {
      main: brandBlue,     // Used for app bars, buttons, etc.
    },
    secondary: {
      main: brandDark,
    },
    background: {
      default: brandLight, // Background color for the app
    },
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: 14,
  },
});
