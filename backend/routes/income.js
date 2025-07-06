import express from 'express';
import Income from '../models/Income.js';
import mongoose from 'mongoose';
const router = express.Router();

// Get all incomes (sorted by date desc)
router.get('/', async (req, res) => {
  try {
    const incomes = await Income.find().sort({ date: -1 });
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get monthly incomes for chart
router.get('/monthly-incomes', async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const monthlyIncomes = await Income.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(currentYear, 0, 1),
            $lt: new Date(currentYear + 1, 0, 1)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$date' },
          totalIncome: { $sum: '$amount' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(monthlyIncomes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create income
router.post('/', async (req, res) => {
  try {
    const { amount, description, date } = req.body;
    const income = new Income({ amount, description, date });
    await income.save();
    res.status(201).json(income);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update income
router.put('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid income ID' });
  }
  try {
    const { amount, description, date } = req.body;
    const income = await Income.findByIdAndUpdate(
      req.params.id,
      { amount, description, date },
      { new: true, runValidators: true }
    );
    if (!income) return res.status(404).json({ error: 'Not found' });
    res.json(income);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete income
router.delete('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid income ID' });
  }
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    if (!income) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 