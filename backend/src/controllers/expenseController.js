import mongoose from 'mongoose';
import Expense from '../models/Expense.js';
import DailyTotal from '../models/DailyTotal.js';

// Helper function to get start and end of day
const getDayRange = (date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  
  return { start, end };
};

// Helper function to update daily total when expense changes
const updateDailyTotal = async (userId, date, amountChange, isDelete = false) => {
  try {
    await DailyTotal.updateDailyTotal(userId, date, amountChange, isDelete);
  } catch (error) {
    console.error('Error updating daily total:', error);
    throw error;
  }
};

export const listExpenses = async (req, res) => {
  try {
    const { startDate, endDate, category, sort = '-date' } = req.query;
    const filter = { userId: req.user.id };

    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const expenses = await Expense.find(filter).sort(sort);
    res.json(expenses);
  } catch (err) {
    console.error('List expenses error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    if (amount == null || !category || !date) {
      return res.status(400).json({ message: 'amount, category, and date are required' });
    }

    const expense = await Expense.create({
      userId: req.user.id,
      amount,
      category,
      description: description || '',
      date: new Date(date),
    });
    res.status(201).json(expense);
  } catch (err) {
    console.error('Create expense error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const update = { ...req.body };
    if (update.date) update.date = new Date(update.date);

    const expense = await Expense.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      update,
      { new: true }
    );
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    console.error('Update expense error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Expense not found' });
    res.json({ success: true });
  } catch (err) {
    console.error('Delete expense error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const dailySummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const match = { userId: new mongoose.Types.ObjectId(req.user.id) };

    // Default to last 30 days if no range provided
    let start = startDate ? new Date(startDate) : new Date();
    if (!startDate) start.setDate(start.getDate() - 29);
    const end = endDate ? new Date(endDate) : new Date();

    match.date = { $gte: start, $lte: end };

    const results = await Expense.aggregate([
      { $match: match },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          total: { $sum: '$amount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const todayKey = new Date().toISOString().slice(0, 10);
    const today = results.find((r) => r._id === todayKey)?.total || 0;

    res.json({ range: { start, end }, today, days: results });
  } catch (err) {
    console.error('Daily summary error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const monthlySummary = async (req, res) => {
  try {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const userId = new mongoose.Types.ObjectId(req.user.id);

    const [byDay, byCategory, monthTotalAgg, allTimeTotalAgg] = await Promise.all([
      Expense.aggregate([
        { $match: { userId, date: { $gte: start, $lte: end } } },
        { $group: { _id: { $dayOfMonth: '$date' }, total: { $sum: '$amount' } } },
        { $sort: { _id: 1 } },
      ]),
      Expense.aggregate([
        { $match: { userId, date: { $gte: start, $lte: end } } },
        { $group: { _id: '$category', total: { $sum: '$amount' } } },
        { $sort: { total: -1 } },
      ]),
      Expense.aggregate([
        { $match: { userId, date: { $gte: start, $lte: end } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Expense.aggregate([
        { $match: { userId } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ]);

    const monthTotal = monthTotalAgg[0]?.total || 0;
    const allTimeTotal = allTimeTotalAgg[0]?.total || 0;

    res.json({
      range: { start, end },
      monthTotal,
      allTimeTotal,
      byDay,
      byCategory,
    });
  } catch (err) {
    console.error('Monthly summary error', err);
    res.status(500).json({ message: 'Server error' });
  }
};
