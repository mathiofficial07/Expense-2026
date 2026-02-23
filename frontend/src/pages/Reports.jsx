import React, { useEffect, useState } from 'react'
import { Paper, Typography, Stack, TextField } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import api from '../api/axios'

const Reports = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [data, setData] = useState([])
  const [summary, setSummary] = useState({ total: 0, average: 0, count: 0 })
  const [range, setRange] = useState(() => {
    const end = new Date()
    const start = new Date()
    start.setDate(end.getDate() - 29)
    return { startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10) }
  })

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fixed endpoint to match backend
      const { data } = await api.get('/expenses/summary/daily', { params: range })

      const days = data.days || []
      setData(days)

      // Calculate summary
      const total = days.reduce((acc, curr) => acc + curr.total, 0)
      const count = days.length
      const average = count > 0 ? total / count : 0

      setSummary({ total, average, count })

    } catch (err) {
      setError('Failed to load report data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [range])

  return (
    <Stack spacing={3}>
      {/* Date Ranges */}
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight="bold" color="primary">Report Period</Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              type="date"
              label="Start Date"
              value={range.startDate}
              onChange={(e) => setRange({ ...range, startDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
            <TextField
              type="date"
              label="End Date"
              value={range.endDate}
              onChange={(e) => setRange({ ...range, endDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Stack>
        </Stack>
      </Paper>

      {/* Summary Cards */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Paper sx={{ p: 3, flex: 1, borderRadius: 3, background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)', color: 'white' }}>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>Total Spent</Typography>
          <Typography variant="h4" fontWeight="bold">₹{summary.total.toLocaleString('en-IN')}</Typography>
        </Paper>
        <Paper sx={{ p: 3, flex: 1, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Typography variant="body2" color="text.secondary">Daily Average</Typography>
          <Typography variant="h4" fontWeight="bold" color="primary">₹{Math.round(summary.average).toLocaleString('en-IN')}</Typography>
        </Paper>
        <Paper sx={{ p: 3, flex: 1, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Typography variant="body2" color="text.secondary">Active Days</Typography>
          <Typography variant="h4" fontWeight="bold" color="primary">{summary.count}</Typography>
        </Paper>
      </Stack>

      {/* Chart */}
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">Daily Trends</Typography>

        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        {!loading && !error && (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="_id"
                tickFormatter={(str) => {
                  const date = new Date(str);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
              />
              <YAxis />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Spent']}
                labelFormatter={(label) => new Date(label).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              />
              <Bar
                dataKey="total"
                fill="#f97316"
                radius={[4, 4, 0, 0]}
                name="Daily Spend"
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Paper>
    </Stack>
  )
}

export default Reports
