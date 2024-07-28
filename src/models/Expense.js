// Expense.js
const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    description: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    splitMethod: { type: String, enum: ['equal', 'exact', 'percentage'], required: true },
    participants: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, amount: Number }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
