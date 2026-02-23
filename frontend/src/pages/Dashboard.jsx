import React, { useEffect, useState } from 'react';
import {
  Grid, Paper, Typography, Box, CircularProgress, Alert, Button,
  Card, CardContent, CardHeader, Divider, useTheme, alpha, Skeleton
} from '@mui/material';
import {
  Today as TodayIcon,
  CalendarMonth as CalendarMonthIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  Category as CategoryIcon,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar
} from 'recharts';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

// Modern color palette
const COLORS = [
  '#f97316', '#fb923c', '#fdba74', '#ffedd5',
  '#ea580c', '#c2410c', '#9a3412', '#7c2d12'
];

const StatCard = ({ title, value, icon, color, change, changeLabel }) => {
  const theme = useTheme();
  const isPositive = change >= 0;

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.default, 0.8)} 100%)`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8]
        }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={500} gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={700} color="text.primary">
              ₹{value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
            {change !== undefined && (
              <Box display="flex" alignItems="center" mt={1}>
                <Box
                  component="span"
                  sx={{
                    color: isPositive ? 'success.main' : 'error.main',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}
                >
                  {isPositive ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                  {Math.abs(change)}% {changeLabel}
                </Box>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              p: 1.5,
              borderRadius: '12px',
              background: alpha(color || theme.palette.primary.main, 0.1),
              color: color || theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {React.cloneElement(icon, { fontSize: 'large' })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const ChartContainer = ({ title, children, height = 350, loading = false }) => (
  <Card
    elevation={0}
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 3,
      background: (theme) => alpha(theme.palette.background.paper, 0.8),
      backdropFilter: 'blur(10px)',
      border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      '& .recharts-cartesian-grid-horizontal line, & .recharts-cartesian-grid-vertical line': {
        stroke: (theme) => alpha(theme.palette.divider, 0.1)
      }
    }}
  >
    <CardHeader
      title={title}
      titleTypographyProps={{
        variant: 'h6',
        fontWeight: 600,
        color: 'text.primary'
      }}
      sx={{ pb: 1 }}
    />
    <Divider />
    <Box sx={{ p: 2, flex: 1, minHeight: height }}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress size={30} />
        </Box>
      ) : children}
    </Box>
  </Card>
);

const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    monthTotal: 0,
    allTimeTotal: 0,
    byCategory: [],
    byDay: [],
    lastMonthTotal: 0,
    yesterdayTotal: 0,
    topExpenses: []
  });
  const [today, setToday] = useState(0);

  // Mock data for demonstration
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [monthlyRes, dailyRes] = await Promise.all([
          api.get('/expenses/summary/monthly'),
          api.get('/expenses/summary/daily')
        ]);

        const monthlyData = monthlyRes.data;
        const dailyData = dailyRes.data;

        setStats({
          monthTotal: monthlyData.monthTotal || 0,
          allTimeTotal: monthlyData.allTimeTotal || 0,
          byCategory: monthlyData.byCategory || [],
          byDay: monthlyData.byDay || [],
          topExpenses: [], // Ideally this should be populated from an API backend
          lastMonthTotal: 0, // Backend doesn't provide this yet
          yesterdayTotal: 0 // Backend doesn't provide this yet
        });

        setToday(dailyData.today || 0);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate percentage changes
  const monthChange = stats.lastMonthTotal
    ? ((stats.monthTotal - stats.lastMonthTotal) / stats.lastMonthTotal) * 100
    : 0;

  const todayChange = stats.yesterdayTotal
    ? ((today - stats.yesterdayTotal) / stats.yesterdayTotal) * 100
    : 0;

  const categoryData = stats.byCategory.map(c => ({
    name: c._id,
    value: c.total,
    percent: (c.total / stats.monthTotal) * 100
  }));

  const byDayData = stats.byDay.map(d => ({
    day: d._id,
    total: d.total
  }));

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        mb={4}
        gap={2}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} color="text.primary">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your expenses
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/add"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 3,
            textTransform: 'none',
            px: 3,
            py: 1,
            fontWeight: 600,
            boxShadow: '0 4px 14px 0 rgba(249, 115, 22, 0.2)',
            '&:hover': {
              boxShadow: '0 6px 20px 0 rgba(249, 115, 22, 0.3)'
            }
          }}
        >
          Add Expense
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Today's Spending"
            value={today}
            icon={<TodayIcon />}
            color="#f97316"
            change={todayChange}
            changeLabel="vs yesterday"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="This Month"
            value={stats.monthTotal}
            icon={<CalendarMonthIcon />}
            color="#ea580c"
            change={monthChange}
            changeLabel="vs last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="All-Time Total"
            value={stats.allTimeTotal}
            icon={<AccountBalanceWalletIcon />}
            color="#c2410c"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Monthly Trend */}
        <Grid item xs={12} lg={8}>
          <ChartContainer
            title="Monthly Spending Trend"
            loading={loading}
            height={400}
          >
            {byDayData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={byDayData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                >
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                    tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      boxShadow: theme.shadows[3]
                    }}
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                    labelFormatter={(label) => `Day ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke={theme.palette.primary.main}
                    strokeWidth={3}
                    dot={{
                      fill: theme.palette.primary.main,
                      stroke: theme.palette.background.paper,
                      strokeWidth: 2,
                      r: 4,
                      fillOpacity: 1
                    }}
                    activeDot={{
                      r: 6,
                      stroke: theme.palette.primary.main,
                      strokeWidth: 3,
                      fill: theme.palette.background.paper
                    }}
                    name="Daily Total"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
                textAlign="center"
                p={3}
              >
                <TrendingUpIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  No spending data available
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, mb: 2 }}>
                  Start adding expenses to see your spending trends and insights.
                </Typography>
                <Button
                  component={Link}
                  to="/add"
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<AddIcon />}
                  sx={{ mt: 1 }}
                >
                  Add Expense
                </Button>
              </Box>
            )}
          </ChartContainer>
        </Grid>

        {/* Category Breakdown */}
        <Grid item xs={12} lg={4}>
          <ChartContainer
            title="Spending by Category"
            loading={loading}
            height={400}
          >
            {categoryData.length > 0 ? (
              <Box height="100%" display="flex" flexDirection="column">
                <Box flex={1} minHeight={200}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            stroke={theme.palette.background.paper}
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: 8,
                          backgroundColor: theme.palette.background.paper,
                          border: `1px solid ${theme.palette.divider}`,
                          boxShadow: theme.shadows[3]
                        }}
                        formatter={(value, name, props) => [
                          `₹${value.toLocaleString('en-IN')}`,
                          `${name} (${Math.round(props.payload.percent * 100)}%)`
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Box mt={2}>
                  <Grid container spacing={1}>
                    {categoryData.map((category, index) => (
                      <Grid item xs={6} key={category.name}>
                        <Box display="flex" alignItems="center" mb={1}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '2px',
                              bgcolor: COLORS[index % COLORS.length],
                              mr: 1
                            }}
                          />
                          <Typography variant="body2" color="text.primary" noWrap>
                            {category.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" ml="auto">
                            {Math.round(category.percent)}%
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
                textAlign="center"
                p={3}
              >
                <CategoryIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  No categories to display
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, mb: 2 }}>
                  Your expense categories will appear here once you start adding transactions.
                </Typography>
              </Box>
            )}
          </ChartContainer>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} lg={8}>
          <ChartContainer
            title="Recent Transactions"
            loading={loading}
            height={300}
          >
            {stats.topExpenses.length > 0 ? (
              <Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                  px={1}
                >
                  <Typography variant="subtitle2" color="text.secondary">DESCRIPTION</Typography>
                  <Typography variant="subtitle2" color="text.secondary">AMOUNT</Typography>
                </Box>
                <Box>
                  {stats.topExpenses.map((expense) => (
                    <Box
                      key={expense._id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        mb: 1,
                        borderRadius: 2,
                        backgroundColor: 'background.default',
                        transition: 'background-color 0.2s',
                        '&:hover': {
                          backgroundColor: 'action.hover'
                        }
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" color="text.primary" fontWeight={500}>
                          {expense.description}
                        </Typography>
                        <Box display="flex" alignItems="center" mt={0.5}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: COLORS[expense.category.length % COLORS.length],
                              mr: 1
                            }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {expense.category} • {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                        -₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box mt={2} textAlign="right">
                  <Button
                    component={Link}
                    to="/expenses"
                    color="primary"
                    size="small"
                    sx={{ textTransform: 'none' }}
                  >
                    View All Transactions
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
                textAlign="center"
                p={3}
              >
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  No recent transactions
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, mb: 2 }}>
                  Your recent transactions will appear here once you start adding expenses.
                </Typography>
              </Box>
            )}
          </ChartContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;


