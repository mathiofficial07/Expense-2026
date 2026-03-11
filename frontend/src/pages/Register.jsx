import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { TextField, Typography, Stack, Alert, Box, Link, Paper, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import GoogleAuthButton from '../components/GoogleAuthButton';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/register', { name, email, password });
      const { user, token } = response.data;
      login({ user, token });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Registration error:', err);
      const backendError = err.response?.data?.error;
      const message = err.response?.data?.message || 'Error during registration. Please try again.';
      setError(backendError ? `${message}: ${backendError}` : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url(https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)',
          zIndex: -1,
        }
      }}
    >
      <Paper sx={{ p: { xs: 3, md: 5 }, width: '100%', maxWidth: 450, borderRadius: 2 }}>
        <Typography component="h1" variant="h4" fontWeight="bold" textAlign="center">
          Create an Account
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3, width: '100%' }}>
          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
            <TextField label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              inputProps={{ minLength: 6 }}
              helperText="Minimum 6 characters"
            />
            <LoadingButton type="submit" variant="contained" loading={loading} fullWidth size="large" sx={{ py: 1.5 }}>
              Sign Up
            </LoadingButton>

            <Divider>
              <Typography variant="body2" color="text.secondary">OR</Typography>
            </Divider>

            <GoogleAuthButton setError={setError} />
            <Typography variant="body2" align="center">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" variant="body2">
                Sign In
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;




