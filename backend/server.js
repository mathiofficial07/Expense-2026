console.log('--- Starting backend server.js ---');
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.js';
import expenseRoutes from './src/routes/expenses.js';

import userRoutes from './src/routes/users.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*', credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

console.log('Registering /api/users routes');
app.use('/api/users', userRoutes);

// DB and Server
const PORT = process.env.PORT || 5000;

console.log('Connecting to MongoDB...');
connectDB()
  .then(() => {
    console.log('MongoDB connection successful, starting server...');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
    process.exit(1);
  });
