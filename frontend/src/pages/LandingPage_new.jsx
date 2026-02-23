import React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Stack, 
  Divider, 
  useTheme,
  useMediaQuery,
  Card,
  CardContent
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import PieChartIcon from '@mui/icons-material/PieChart';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';

const Feature = ({ icon, title, description }) => (
  <Box textAlign="center" sx={{ height: '100%' }}>
    <Box 
      component={Paper} 
      elevation={3} 
      sx={{ 
        width: 80, 
        height: 80, 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        mx: 'auto', 
        mb: 2, 
        bgcolor: 'primary.main', 
        color: 'white',
        '&:hover': {
          transform: 'scale(1.05)',
          transition: 'transform 0.3s ease-in-out'
        }
      }}
    >
      {icon}
    </Box>
    <Typography variant="h6" fontWeight="bold" gutterBottom>{title}</Typography>
    <Typography variant="body1" color="text.secondary">{description}</Typography>
  </Box>
);

const LandingPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box 
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4
            }}
          >
            <Typography variant="h4" component="h1" fontWeight="bold">
              Expense Tracker
            </Typography>
            
            {user ? (
              <Stack direction="row" spacing={2}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => navigate('/dashboard')}
                  startIcon={<ArrowForwardIcon />}
                >
                  Go to Dashboard
                </Button>
                <Button 
                  variant="outlined" 
                  color="inherit"
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" spacing={2}>
                <Button 
                  component={RouterLink} 
                  to="/login" 
                  variant="outlined" 
                  color="inherit"
                  startIcon={<LoginIcon />}
                >
                  Login
                </Button>
                <Button 
                  component={RouterLink} 
                  to="/register" 
                  variant="contained" 
                  color="secondary"
                  startIcon={<PersonAddIcon />}
                >
                  Sign Up
                </Button>
              </Stack>
            )}
          </Box>
          
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Take Control of Your Finances
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
              Track your expenses, analyze your spending, and achieve your financial goals with our intuitive expense tracker.
            </Typography>
            {!user && (
              <Stack 
                direction={isMobile ? 'column' : 'row'} 
                spacing={2} 
                justifyContent="center"
                sx={{ mt: 4 }}
              >
                <Button 
                  component={RouterLink} 
                  to="/register" 
                  variant="contained" 
                  size="large"
                  color="secondary"
                  startIcon={<PersonAddIcon />}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Get Started Free
                </Button>
                <Button 
                  component={RouterLink} 
                  to="/login" 
                  variant="outlined" 
                  size="large"
                  color="inherit"
                  startIcon={<LoginIcon />}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Sign In
                </Button>
              </Stack>
            )}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Why Choose Our Expense Tracker?
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Feature
              icon={<TrackChangesIcon fontSize="large" />}
              title="Track Every Penny"
              description="Easily record and categorize your daily expenses to understand where your money goes."
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Feature
              icon={<PieChartIcon fontSize="large" />}
              title="Visual Reports"
              "Visualize your spending patterns with beautiful charts and detailed reports."
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Feature
              icon={<SecurityIcon fontSize="large" />}
              title="Secure & Private"
              "Your financial data is encrypted and stored securely, accessible only by you."
            />
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box bgcolor="grey.100" py={8}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Take Control of Your Finances?
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Join thousands of users who are already managing their expenses effectively.
          </Typography>
          {!user && (
            <Button 
              component={RouterLink} 
              to="/register" 
              variant="contained" 
              color="primary" 
              size="large"
              startIcon={<PersonAddIcon />}
              sx={{ px: 4, py: 1.5 }}
            >
              Create Free Account
            </Button>
          )}
        </Container>
      </Box>

      {/* Footer */}
      <Box bgcolor="primary.dark" color="white" py={4} mt="auto">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Expense Tracker</Typography>
              <Typography variant="body2">
                Helping you manage your finances since 2023.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom>Quick Links</Typography>
              <Stack spacing={1}>
                <Button 
                  component={RouterLink} 
                  to={user ? '/dashboard' : '/'} 
                  color="inherit"
                >
                  Home
                </Button>
                {!user && (
                  <>
                    <Button component={RouterLink} to="/login" color="inherit">
                      Login
                    </Button>
                    <Button component={RouterLink} to="/register" color="inherit">
                      Sign Up
                    </Button>
                  </>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom>Need Help?</Typography>
              <Typography variant="body2">
                Contact us at support@expensetracker.com
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.1)' }} />
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Expense Tracker. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
