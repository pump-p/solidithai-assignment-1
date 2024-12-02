import React from 'react';
import Header from './Header'; // Import the Navbar component
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header /> {/* Navbar */}
      <Box component="main" sx={{ flex: 1, mt: 2 }}>
        {children} {/* Main content */}
      </Box>
    </Box>
  );
};

export default Layout;
