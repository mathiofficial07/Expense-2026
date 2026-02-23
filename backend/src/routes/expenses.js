import { Router } from 'express';
import auth from '../middleware/auth.js';
import {
  listExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  dailySummary,
  monthlySummary
} from '../controllers/expenseController.js';

const router = Router();

// All routes are protected by auth middleware
router.use(auth);

// Basic CRUD operations
router.get('/', listExpenses);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

// Summary endpoints
router.get('/summary/daily', dailySummary);
router.get('/summary/monthly', monthlySummary);

export default router;
