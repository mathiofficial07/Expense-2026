import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Stack, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const LandingHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  // Effect to handle scroll for glassmorphism transition
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'How it Works', id: 'how-it-works' },
    { label: 'Features', id: 'features' },
  ];

  const drawer = (
    <Box sx={{ p: 2, height: '100%', bgcolor: 'background.paper' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ p: 0.5, bgcolor: 'primary.main', borderRadius: 1, display: 'flex' }}>
            <TrackChangesIcon sx={{ color: 'white', fontSize: 20 }} />
          </Box>
          <Typography variant="h6" fontWeight="bold">ExpenseTracker</Typography>
        </Stack>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.label} onClick={() => scrollToSection(item.id)}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}

      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          bgcolor: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
          transition: 'all 0.3s ease',
          py: 1
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Logo */}
            <Stack direction="row" alignItems="center" spacing={1} sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  p: 0.8,
                  background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
                  borderRadius: '10px',
                  display: 'flex',
                  boxShadow: '0 4px 10px rgba(249, 115, 22, 0.3)'
                }}
              >
                <TrackChangesIcon sx={{ color: 'white' }} />
              </Box>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  fontWeight: 800,
                  color: scrolled ? 'text.primary' : 'text.primary', // Keep dark even on transparent for readability against light bg
                  textDecoration: 'none',
                  fontSize: '1.25rem',
                  letterSpacing: '-0.5px'
                }}
              >
                ExpenseTracker
              </Typography>
            </Stack>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Stack direction="row" spacing={4} alignItems="center">
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => scrollToSection(item.id)}
                    color="inherit"
                    sx={{
                      fontWeight: 600,
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main', bgcolor: 'transparent' }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}


              </Stack>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default LandingHeader;


