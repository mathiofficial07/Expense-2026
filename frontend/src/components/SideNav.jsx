import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Toolbar, Avatar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Expenses', icon: <ReceiptLongIcon />, path: '/expenses' },
  { text: 'Add Expense', icon: <AddCircleIcon />, path: '/add' },
  { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
];

const SideNav = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const drawerContent = (
    <Box sx={{
      height: '100%',
      background: 'linear-gradient(180deg, #fb923c 0%, #fdba74 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Toolbar />
      <Box
        onClick={() => navigate('/profile')}
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }
        }}
      >
        <Avatar
          alt={user?.name}
          src={user?.profilePicture}
          sx={{ width: 50, height: 50, border: '2px solid rgba(255,255,255,0.5)' }}
        />
        <Box sx={{ overflow: 'hidden' }}>
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            {user?.name || 'User'}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }} noWrap>
            {user?.email || 'user@example.com'}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
      <List sx={{ flexGrow: 1, px: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding component={Link} to={item.path} sx={{ color: 'inherit', textDecoration: 'none', mb: 1 }}>
            <ListItemButton sx={{
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'translateY(-2px) translateZ(10px)',
                boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)'
              }
            }}>
              <ListItemIcon sx={{ color: '#fff', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 600, letterSpacing: '0.5px' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
              transform: 'translateY(-2px)',
              borderColor: 'rgba(255, 0, 0, 0.3)'
            }
          }}
        >
          <ListItemIcon sx={{ color: '#fff', minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 600 }} />
        </ListItemButton>
      </Box>

      <Box sx={{ p: 2, textAlign: 'center', opacity: 0.7 }}>
        <Typography variant="caption" sx={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>© 2026 ExpenseTracker</Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' }
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' }
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default SideNav;
