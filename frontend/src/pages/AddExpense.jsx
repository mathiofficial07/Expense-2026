import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Stack, MenuItem, Alert, Card, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import api from '../api/axios';

const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];

const AddExpense = ({ isEdit = false, item = null, onDone }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && item) {
      setAmount(item.amount);
      setCategory(item.category);
      setDescription(item.description);
      setDate(new Date(item.date).toISOString().slice(0, 10));
    } else {
      setAmount('');
      setCategory('');
      setDescription('');
      setDate(new Date().toISOString().slice(0, 10));
    }
  }, [isEdit, item]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = { amount: Number(amount), category, description, date };
      if (isEdit) {
        await api.put(`/expenses/${item._id}`, payload);
      } else {
        await api.post('/expenses', payload);
      }
      if (onDone) onDone(true);
      else navigate('/expenses');
    } catch (err) {
      setError(err.response?.data?.message || (isEdit ? 'Update failed' : 'Creation failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="80vh" pt={4}>
      <Card
        elevation={0}
        sx={{
          p: 0,
          width: '100%',
          maxWidth: 600,
          borderRadius: 4,
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.05)'
        }}
      >
        <Box sx={{
          p: 4,
          background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
          color: 'white',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          mb: 3
        }}>
          <Typography variant="h5" fontWeight="bold">
            {isEdit ? 'Edit Transaction' : 'New Transaction'}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {isEdit ? 'Update your expense details' : 'Track your spending'}
          </Typography>
        </Box>

        <Box component="form" onSubmit={onSubmit} sx={{ px: 4, pb: 4 }}>
          <Stack spacing={3}>
            {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              fullWidth
              InputProps={{
                startAdornment: <Typography color="text.secondary" mr={1}>₹</Typography>
              }}
              variant="outlined"
            />

            <TextField
              select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              fullWidth
            >
              {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>

            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={2}
            />

            <TextField
              type="date"
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <LoadingButton
              type="submit"
              variant="contained"
              loading={loading}
              size="large"
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                textTransform: 'none',
                background: 'linear-gradient(45deg, #f97316 30%, #fb923c 90%)',
                boxShadow: '0 3px 5px 2px rgba(249, 115, 22, .3)'
              }}
            >
              {isEdit ? 'Save Changes' : 'Add Expense'}
            </LoadingButton>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

export default AddExpense;

