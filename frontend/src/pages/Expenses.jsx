import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, MenuItem, Button, IconButton,
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, TableSortLabel,
  Chip, Divider, Stack, Dialog, DialogTitle,
  DialogContent, DialogActions, useMediaQuery, useTheme,
  Card, CardContent, CardHeader, InputAdornment, Fade,
  Tooltip, CircularProgress, Alert
} from '@mui/material';
import {
  Add as AddIcon,
  FilterList as FilterListIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  DateRange as DateRangeIcon,
  Category as CategoryIcon,
  Clear as ClearIcon,
  TrendingUp as TrendingUpIcon,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [filter, setFilter] = useState('all');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock data for offline use
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await api.get('/expenses');
      setExpenses(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (expense = null) => {
    setCurrentExpense(expense || { description: '', amount: '', category: '', date: new Date().toISOString().split('T')[0] });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentExpense(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentExpense(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentExpense._id) {
        // Update existing expense
        const res = await api.put(`/expenses/${currentExpense._id}`, currentExpense);
        setExpenses(expenses.map(exp =>
          exp._id === currentExpense._id ? res.data : exp
        ));
      } else {
        // Add new expense
        const res = await api.post('/expenses', currentExpense);
        setExpenses([res.data, ...expenses]);
      }
      handleCloseDialog();
    } catch (err) {
      console.error(err);
      alert('Failed to save expense');
    } finally {
      // Logic could go here but dialog closes immediately
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await api.delete(`/expenses/${id}`);
        setExpenses(expenses.filter(exp => exp._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete expense');
      }
    }
  };

  // Filter and sort expenses
  const filteredExpenses = React.useMemo(() => {
    let filtered = [...expenses];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(expense =>
        expense.description.toLowerCase().includes(term) ||
        expense.category.toLowerCase().includes(term)
      );
    }

    // Apply category filter
    if (filter !== 'all') {
      filtered = filtered.filter(expense => expense.category === filter);
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      let comparison = 0;
      if (a[orderBy] > b[orderBy]) {
        comparison = 1;
      } else if (a[orderBy] < b[orderBy]) {
        comparison = -1;
      }
      return order === 'desc' ? -comparison : comparison;
    });
  }, [expenses, searchTerm, filter, order, orderBy]);

  // Get unique categories for filter
  const categories = React.useMemo(() => {
    const cats = new Set(expenses.map(exp => exp.category));
    return ['all', ...Array.from(cats)].sort();
  }, [expenses]);

  // Prepare data for chart
  const chartData = React.useMemo(() => {
    const categoryMap = new Map();

    expenses.forEach(expense => {
      const current = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, current + expense.amount);
    });

    return Array.from(categoryMap.entries()).map(([category, total]) => ({
      category,
      total: parseFloat(total.toFixed(2))
    }));
  }, [expenses]);

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Expenses
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Expense
        </Button>
      </Box>

      {/* Summary Cards */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Expenses
            </Typography>
            <Typography variant="h5" component="div">
              ₹{totalExpenses.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              This Month
            </Typography>
            <Typography variant="h5" component="div">
              ₹{totalExpenses.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
          <TextField
            select
            size="small"
            label="Category"
            value={filter}
            onChange={handleFilterChange}
            sx={{ minWidth: 150 }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            size="small"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchTerm('')}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ flex: 1, maxWidth: 400 }}
          />
        </Box>
      </Paper>

      {/* Expenses Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <TableContainer sx={{ maxHeight: '60vh' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'description'}
                    direction={orderBy === 'description' ? order : 'asc'}
                    onClick={() => handleRequestSort('description')}
                  >
                    Description
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === 'amount'}
                    direction={orderBy === 'amount' ? order : 'asc'}
                    onClick={() => handleRequestSort('amount')}
                  >
                    Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'category'}
                    direction={orderBy === 'category' ? order : 'asc'}
                    onClick={() => handleRequestSort('category')}
                  >
                    Category
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'date'}
                    direction={orderBy === 'date' ? order : 'desc'}
                    onClick={() => handleRequestSort('date')}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExpenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography color="textSecondary">
                      No expenses found. Add your first expense!
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredExpenses
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((expense) => (
                    <TableRow hover key={expense._id}>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell align="right">
                        ₹{expense.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={expense.category}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(expense)}
                          color="primary"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(expense._id)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredExpenses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Add/Edit Expense Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {currentExpense?._id ? 'Edit Expense' : 'Add New Expense'}
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                name="description"
                label="Description"
                value={currentExpense?.description || ''}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                name="amount"
                label="Amount"
                type="number"
                value={currentExpense?.amount || ''}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />
              <TextField
                name="category"
                label="Category"
                select
                value={currentExpense?.category || ''}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
              >
                {categories
                  .filter(cat => cat !== 'all')
                  .map((category) => (
                    <MenuItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </MenuItem>
                  ))}
              </TextField>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  label="Date"
                  value={currentExpense?.date || null}
                  onChange={(newValue) => {
                    setCurrentExpense(prev => ({
                      ...prev,
                      date: newValue.toISOString().split('T')[0]
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="normal"
                      required
                    />
                  )}
                />
              </LocalizationProvider>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {currentExpense?._id ? 'Update' : 'Add'} Expense
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Category Breakdown Chart */}
      {chartData.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Expenses by Category
          </Typography>
          <Paper sx={{ p: 2, height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="category" />
                <YAxis />
                <RechartsTooltip
                  formatter={(value) => [`₹${value}`, 'Total']}
                  labelFormatter={(label) => `Category: ${label}`}
                />
                <Bar dataKey="total" fill="#f97316" name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default Expenses;
