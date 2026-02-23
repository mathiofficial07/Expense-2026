import React from 'react';
import { Box, Button, Container, Typography, Grid, Paper, Stack, useTheme, alpha } from '@mui/material';
import { Link } from 'react-router-dom';
import LandingHeader from '../components/LandingHeader';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import PieChartIcon from '@mui/icons-material/PieChart';
import SecurityIcon from '@mui/icons-material/Security';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

// Placeholder for the hero image - will be replaced with generated image
// import HeroImage from '../assets/landing_hero_dashboard.png'; 

const FeatureCard = ({ icon, title, description }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        height: '100%',
        borderRadius: 4,
        bgcolor: 'background.paper',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
          borderColor: 'transparent'
        }
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          color: 'primary.main'
        }}
      >
        {React.cloneElement(icon, { fontSize: 'large' })}
      </Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" lineHeight={1.6}>
        {description}
      </Typography>
    </Paper>
  );
};

const LandingPage = () => {
  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <LandingHeader />

      {/* Hero Section */}
      <Box
        id="hero"
        sx={{
          pt: { xs: 15, md: 20 },
          pb: { xs: 10, md: 15 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="h1"
                  color="text.primary"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.75rem' },
                    fontWeight: 800,
                    lineHeight: 1.2,
                    mb: 3
                  }}
                >
                  Master Your Money <br />
                  <Box component="span" sx={{ color: 'primary.main' }}>
                    With Style.
                  </Box>
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    mb: 5,
                    opacity: 0.8,
                    fontWeight: 400,
                    maxWidth: { xs: '100%', md: '90%' },
                    mx: { xs: 'auto', md: 0 }
                  }}
                >
                  Track, Analyze, and Optimize your spending with our premium, intuitive expense tracker. Financial clarity has never looked this good.
                </Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  justifyContent={{ xs: 'center', md: 'flex-start' }}
                >
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    size="large"
                    sx={{
                      py: 1.8,
                      px: 5,
                      borderRadius: '50px',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      boxShadow: '0 8px 20px rgba(249, 115, 22, 0.3)',
                    }}
                  >
                    Get Started Now
                  </Button>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    size="large"
                    sx={{
                      py: 1.8,
                      px: 5,
                      borderRadius: '50px',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      borderWidth: 2,
                      '&:hover': { borderWidth: 2 }
                    }}
                  >
                    Log In
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* CSS-only Premium Dashboard Mockup */}
              <Box
                sx={{
                  position: 'relative',
                  perspective: '1500px', // Adds depth for 3D effect
                  height: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '5%',
                    right: '-10%',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle, rgba(251,146,60,0.15) 0%, rgba(255,255,255,0) 70%)',
                    zIndex: -1
                  }
                }}
              >
                {/* Main Interface Card */}
                <Paper
                  elevation={10}
                  sx={{
                    width: { xs: '90%', md: 450 },
                    height: 320,
                    borderRadius: 4,
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    overflow: 'hidden',
                    position: 'relative',
                    transform: 'rotateY(-10deg) rotateX(5deg)',
                    transition: 'transform 0.5s ease',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'rotateY(0deg) rotateX(0deg)'
                    },
                    zIndex: 2
                  }}
                >
                  {/* Mock UI Structure */}
                  <Box sx={{ display: 'flex', height: '100%' }}>
                    {/* Sidebar */}
                    <Box sx={{ width: 60, height: '100%', bgcolor: '#f8fafc', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 3, gap: 2 }}>
                      <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'primary.main', opacity: 0.8 }} />
                      <Box sx={{ width: 20, height: 4, borderRadius: 2, bgcolor: '#cbd5e1' }} />
                      <Box sx={{ width: 20, height: 4, borderRadius: 2, bgcolor: '#cbd5e1' }} />
                      <Box sx={{ width: 20, height: 4, borderRadius: 2, bgcolor: '#cbd5e1' }} />
                    </Box>

                    {/* Main Content */}
                    <Box sx={{ flex: 1, p: 3 }}>
                      {/* Header */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Box>
                          <Box sx={{ width: 100, height: 8, borderRadius: 4, bgcolor: '#e2e8f0', mb: 1 }} />
                          <Box sx={{ width: 60, height: 6, borderRadius: 4, bgcolor: '#f1f5f9' }} />
                        </Box>
                        <Box sx={{ width: 32, height: 32, borderRadius: 8, bgcolor: '#f1f5f9' }} />
                      </Box>

                      {/* Stats / Charts */}
                      <Grid container spacing={2}>
                        <Grid item xs={7}>
                          <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: '#fffbed', border: '1px solid #ffedd5', mb: 2 }}>
                            <Box sx={{ width: 40, height: 6, borderRadius: 4, bgcolor: '#fdba74', mb: 1 }} />
                            <Box sx={{ display: 'flex', alignItems: 'end', gap: 0.5, height: 40 }}>
                              <Box sx={{ width: 6, height: '40%', bgcolor: '#fdba74', borderRadius: 1 }} />
                              <Box sx={{ width: 6, height: '70%', bgcolor: '#fb923c', borderRadius: 1 }} />
                              <Box sx={{ width: 6, height: '50%', bgcolor: '#fdba74', borderRadius: 1 }} />
                              <Box sx={{ width: 6, height: '90%', bgcolor: '#f97316', borderRadius: 1 }} />
                              <Box sx={{ width: 6, height: '60%', bgcolor: '#fdba74', borderRadius: 1 }} />
                            </Box>
                          </Box>
                          <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: '#f8fafc' }}>
                            <Box sx={{ width: 80, height: 6, borderRadius: 4, bgcolor: '#e2e8f0', mb: 1.5 }} />
                            <Stack spacing={1}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#e2e8f0' }} />
                                <Box sx={{ width: 60, height: 6, borderRadius: 4, bgcolor: '#f1f5f9', mt: 0.8 }} />
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#e2e8f0' }} />
                                <Box sx={{ width: 60, height: 6, borderRadius: 4, bgcolor: '#f1f5f9', mt: 0.8 }} />
                              </Box>
                            </Stack>
                          </Box>
                        </Grid>
                        <Grid item xs={5}>
                          <Box sx={{ height: '100%', borderRadius: 3, bgcolor: 'primary.main', p: 1.5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'white' }}>
                            <CloudQueueIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                            <Box>
                              <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.6rem' }}>Total Saved</Typography>
                              <Typography variant="body2" fontWeight="bold">₹24k</Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Paper>

                {/* Floating "Credit Card" Element */}
                <Paper
                  elevation={12}
                  sx={{
                    position: 'absolute',
                    bottom: 80,
                    right: { xs: 0, md: 50 },
                    width: 180,
                    height: 110,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                    color: 'white',
                    p: 2,
                    zIndex: 3,
                    transform: 'rotateZ(5deg) translateZ(50px)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ width: 20, height: 12, borderRadius: 1, bgcolor: '#94a3b8', opacity: 0.5 }} />
                    <SecurityIcon sx={{ fontSize: 16, opacity: 0.8 }} />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <Box sx={{ width: 30, height: 4, borderRadius: 2, bgcolor: '#475569' }} />
                      <Box sx={{ width: 10, height: 4, borderRadius: 2, bgcolor: '#475569' }} />
                    </Box>
                    <Typography variant="caption" sx={{ fontSize: '0.6rem', opacity: 0.6 }}>EXPENSE CARD</Typography>
                  </Box>
                </Paper>

                {/* Floating "Success" Badge */}
                <Paper
                  elevation={8}
                  sx={{
                    position: 'absolute',
                    top: 100,
                    left: { xs: 0, md: 20 },
                    px: 2,
                    py: 1,
                    borderRadius: 50,
                    bgcolor: '#ffffff',
                    color: '#10b981',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    zIndex: 4,
                    transform: 'rotateZ(-3deg) translateZ(80px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.08)'
                  }}
                >
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981' }} />
                  Goal Reached!
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Box id="about" sx={{ py: 15, bgcolor: '#fff' }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                ABOUT US
              </Typography>
              <Typography variant="h3" fontWeight={800} color="text.primary" gutterBottom>
                Our Mission for Your Financial Freedom
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
                We believe that managing your money should be as effortless as spending it. ExpenseTracker was born from the need for a simple, yet powerful tool that helps people regain control of their finances without the complexity of traditional accounting software.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Our platform combines premium design with intuitive features, allowing you to focus on what matters most—reaching your financial goals.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  borderRadius: 8,
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  bgcolor: 'primary.main',
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textAlign: 'center',
                  p: 4
                }}
              >
                <Box>
                  <TrackChangesIcon sx={{ fontSize: 80, mb: 2, opacity: 0.8 }} />
                  <Typography variant="h4" fontWeight="bold">Simplicity in every bite</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box id="how-it-works" sx={{ py: 15, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={10}>
            <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
              PROCESS
            </Typography>
            <Typography variant="h3" fontWeight={800} color="text.primary">
              How It Works
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {[
              { step: '01', title: 'Connect Account', desc: 'Securely link your accounts or start manual tracking in seconds.' },
              { step: '02', title: 'Track Expenses', desc: 'Categorize your daily spending automatically or with a single tap.' },
              { step: '03', title: 'Gain Insights', desc: 'Receive personalized reports and reach your savings goals faster.' }
            ].map((item, index) => (index === 2 ?
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 5,
                    borderRadius: 6,
                    height: '100%',
                    bgcolor: 'white',
                    border: '1px solid rgba(0,0,0,0.05)',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }
                  }}
                >
                  <Typography variant="h1" sx={{ position: 'absolute', top: 20, right: 30, opacity: 0.05, fontWeight: 900 }}>
                    {item.step}
                  </Typography>
                  <Box sx={{ width: 50, height: 50, borderRadius: '50%', bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, fontWeight: 'bold' }}>
                    {index + 1}
                  </Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {item.desc}
                  </Typography>
                </Paper>
              </Grid> :
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 5,
                    borderRadius: 6,
                    height: '100%',
                    bgcolor: 'white',
                    border: '1px solid rgba(0,0,0,0.05)',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }
                  }}
                >
                  <Typography variant="h1" sx={{ position: 'absolute', top: 20, right: 30, opacity: 0.05, fontWeight: 900 }}>
                    {item.step}
                  </Typography>
                  <Box sx={{ width: 50, height: 50, borderRadius: '50%', bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, fontWeight: 'bold' }}>
                    {index + 1}
                  </Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {item.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ py: 15, bgcolor: '#fafafa' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={10}>
            <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
              FEATURES
            </Typography>
            <Typography variant="h3" fontWeight={800} color="text.primary">
              Everything You Need
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={<TrackChangesIcon />}
                title="Smart Tracking"
                description="Log expenses instantly. Categorize standard and custom types to keep your ledger organized."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={<PieChartIcon />}
                title="Visual Reports"
                description="Understand your spending habits with beautiful, interactive charts and monthly summaries."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={<CloudQueueIcon />}
                title="Cloud Sync"
                description="Access your data from anywhere. Your finances are always up to date and secure."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={<SmartphoneIcon />}
                title="Mobile Friendly"
                description="Responsive design that looks great on your phone, tablet, or desktop."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={<SpeedIcon />}
                title="Fast & Efficient"
                description="Built for speed. No lag, no waiting. Add transactions in seconds."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={<SecurityIcon />}
                title="Secure Data"
                description="We prioritize your privacy. Your financial data is encrypted and safe with us."
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 15, bgcolor: '#fff', position: 'relative' }}>
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 6, md: 10 },
              textAlign: 'center',
              borderRadius: 8,
              background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative circles */}
            <Box sx={{ position: 'absolute', top: -50, left: -50, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
            <Box sx={{ position: 'absolute', bottom: -50, right: -50, width: 150, height: 150, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />

            <Typography variant="h3" fontWeight={800} gutterBottom>
              Ready to Take Control?
            </Typography>
            <Typography variant="h6" sx={{ mb: 6, opacity: 0.9, fontWeight: 400 }}>
              Join thousands of users who are mastering their financial future today.
            </Typography>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                py: 2,
                px: 6,
                bgcolor: 'white',
                color: 'primary.main',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                '&:hover': {
                  bgcolor: '#f8fafc'
                }
              }}
            >
              Create Free Account
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#0f172a', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} md={4}>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <Box sx={{ p: 0.5, bgcolor: 'primary.main', borderRadius: 1 }}>
                  <TrackChangesIcon />
                </Box>
                <Typography variant="h6" fontWeight="bold">ExpenseTracker</Typography>
              </Stack>
              <Typography variant="body2" color="grey.400" sx={{ maxWidth: 300 }}>
                Simple, beautiful, and powerful personal finance tracking for everyone.
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: 'grey.300' }}>PRODUCT</Typography>
              <Stack spacing={1}>
                <Link to="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Features</Link>
                <Link to="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Pricing</Link>
                <Link to="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Updates</Link>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: 'grey.300' }}>COMPANY</Typography>
              <Stack spacing={1}>
                <Link to="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>About</Link>
                <Link to="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Contact</Link>
                <Link to="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Privacy</Link>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <Typography variant="body2" color="grey.500">
              © {new Date().getFullYear()} Expense Tracker. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;




