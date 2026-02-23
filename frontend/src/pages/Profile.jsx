import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button, Avatar, Grid, Stack, Alert, IconButton, Card, CardContent, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PhotoCamera, Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        phone: '',
        profilePicture: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data } = await api.get('/users/profile');
            setFormData({
                name: data.name || '',
                email: data.email || '',
                bio: data.bio || '',
                phone: data.phone || '',
                profilePicture: data.profilePicture || ''
            });
        } catch (err) {
            console.error(err);
            setError('Failed to fetch profile data');
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5000000) { // 5MB limit
                setError('Image size should be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, profilePicture: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const { data } = await api.put('/users/profile', formData);
            setSuccess('Profile updated successfully!');
            setIsEditing(false);
            // Update global auth context
            updateUser({ ...user, ...data });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maxWidth="lg" mx="auto" pb={4} pt={4}>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
                My Profile
            </Typography>

            <Grid container spacing={4}>
                {/* Profile Card */}
                <Grid item xs={12} md={4}>
                    <Card elevation={0} sx={{ borderRadius: 4, height: '100%', border: '1px solid rgba(0,0,0,0.08)' }}>
                        <CardContent sx={{ textAlign: 'center', py: 6 }}>
                            <Box position="relative" display="inline-block" mb={2}>
                                <Avatar
                                    src={formData.profilePicture}
                                    alt={formData.name}
                                    sx={{ width: 120, height: 120, fontSize: '3rem', mx: 'auto', border: '4px solid white', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                                >
                                    {formData.name.charAt(0).toUpperCase()}
                                </Avatar>
                                {isEditing && (
                                    <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        component="label"
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            bgcolor: 'background.paper',
                                            boxShadow: 2,
                                            '&:hover': { bgcolor: 'background.paper' }
                                        }}
                                    >
                                        <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
                                        <PhotoCamera />
                                    </IconButton>
                                )}
                            </Box>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>{formData.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{formData.email}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Details Card */}
                <Grid item xs={12} md={8}>
                    <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid rgba(0,0,0,0.08)' }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" p={3} borderBottom="1px solid rgba(0,0,0,0.08)">
                            <Typography variant="h6" fontWeight="bold">Personal Information</Typography>
                            {!isEditing ? (
                                <Button
                                    startIcon={<EditIcon />}
                                    onClick={() => setIsEditing(true)}
                                    variant="outlined"
                                    sx={{ borderRadius: 2, textTransform: 'none' }}
                                >
                                    Edit Profile
                                </Button>
                            ) : (
                                <Button
                                    startIcon={<CancelIcon />}
                                    onClick={() => { setIsEditing(false); fetchProfile(); }}
                                    color="error"
                                    sx={{ borderRadius: 2, textTransform: 'none' }}
                                >
                                    Cancel
                                </Button>
                            )}
                        </Box>

                        <CardContent sx={{ p: 4 }}>
                            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
                            {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

                            <Box component="form" onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Full Name"
                                            fullWidth
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            disabled={!isEditing}
                                            variant={isEditing ? 'outlined' : 'filled'}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Email Address"
                                            fullWidth
                                            value={formData.email}
                                            disabled // Email usually shouldn't be editable easily
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Bio"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            disabled={!isEditing}
                                            variant={isEditing ? 'outlined' : 'filled'}
                                            placeholder="Tell us a little about yourself..."
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Phone Number"
                                            fullWidth
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            disabled={!isEditing}
                                            variant={isEditing ? 'outlined' : 'filled'}
                                        />
                                    </Grid>
                                </Grid>

                                {isEditing && (
                                    <Box mt={4} display="flex" justifyContent="flex-end">
                                        <LoadingButton
                                            type="submit"
                                            variant="contained"
                                            loading={loading}
                                            startIcon={<SaveIcon />}
                                            size="large"
                                            sx={{ borderRadius: 2, px: 4 }}
                                        >
                                            Save Changes
                                        </LoadingButton>
                                    </Box>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
