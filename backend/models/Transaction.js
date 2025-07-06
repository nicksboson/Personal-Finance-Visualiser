import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema); 