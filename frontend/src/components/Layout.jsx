import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import NavBar from './NavBar';
import SideNav from './SideNav';

const drawerWidth = 240;

const Layout = ({ children, mode, toggleMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} mode={mode} toggleMode={toggleMode} />
      <SideNav drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: mode === 'light'
            ? 'radial-gradient(at 40% 20%, hsla(28,100%,88%,0.2) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(30,100%,90%,0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(340,100%,90%,0.1) 0px, transparent 50%), #fff7ed'
            : 'radial-gradient(at 40% 20%, hsla(28,100%,16%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(30,100%,20%,1) 0px, transparent 50%), #1c1917',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1 }}>
          {children}
        </Box>

        {/* Footer */}
        <Box component="footer" sx={{
          mt: 4,
          py: 3,
          px: 2,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #fb923c 0%, #fdba74 100%)',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 -4px 6px -1px rgb(0 0 0 / 0.1)'
        }}>
          <Box sx={{ maxWidth: 'lg', mx: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Expense Tracker</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Manage your finances with style.</div>
            </Box>
            <Box sx={{ fontSize: '0.8rem', opacity: 0.9 }}>
              &copy; {new Date().getFullYear()} All Rights Reserved.
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
