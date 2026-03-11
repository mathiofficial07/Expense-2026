import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const GoogleAuthButton = ({ onSuccess, onError }) => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await api.post('/auth/google-login', {
                    token: tokenResponse.access_token,
                });

                if (res.data.token) {
                    login({ token: res.data.token, user: res.data.user });
                    if (onSuccess) onSuccess(res.data);
                    navigate('/dashboard');
                }
            } catch (err) {
                console.error('Google Auth Error:', err);
                if (setError) {
                    const backendError = err.response?.data?.error;
                    const message = err.response?.data?.message || 'Google Login failed';
                    setError(backendError ? `${message}: ${backendError}` : message);
                }
                if (onError) onError(err);
            }
        },
        onError: (error) => {
            console.log('Login Failed:', error);
            if (onError) onError(error);
        },
    });

    return (
        <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={() => handleGoogleLogin()}
            sx={{
                py: 1.5,
                borderRadius: 2,
                mt: 2,
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'rgba(0,0,0,0.02)',
                },
            }}
        >
            Continue with Google
        </Button>
    );
};

export default GoogleAuthButton;
