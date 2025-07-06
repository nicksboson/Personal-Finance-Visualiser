import express from 'express';
import Transaction from '../models/Transaction.js';
import mongoose from 'mongoose';
const router = express.Router();

// Get all transactions (sorted by date desc)
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get monthly expenses for chart
router.get('/monthly-expenses', async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const monthlyExpenses = await Transaction.aggregate([
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
          totalExpense: {
            $sum: {
              $cond: [ { $lt: ['$amount', 0] }, { $abs: '$amount' }, 0 ]
            }
          },
          totalIncome: {
            $sum: {
              $cond: [ { $gt: ['$amount', 0] }, '$amount', 0 ]
            }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(monthlyExpenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create transaction
router.post('/', async (req, res) => {
  try {
    const { amount, description, date } = req.body;
    const transaction = new Transaction({ amount, description, date });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update transaction
router.put('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid transaction ID' });
  }
  try {
    const { amount, description, date } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { amount, description, date },
      { new: true, runValidators: true }
    );
    if (!transaction) return res.status(404).json({ error: 'Not found' });
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete transaction
router.delete('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid transaction ID' });
  }
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 