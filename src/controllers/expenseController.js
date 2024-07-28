const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
    const { description, totalAmount, splitMethod, participants } = req.body;
    try {
        const expense = new Expense({ description, totalAmount, splitMethod, participants });
        await expense.save();
        res.status(201).json(expense);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getUserExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ 'participants.userId': req.params.userId });
        res.json(expenses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getOverallExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.downloadBalanceSheet = async (req, res) => {
    try {
        const expenses = await Expense.find();
        // Generate a downloadable balance sheet
        let balanceSheet = 'Description,Total Amount,Split Method,Participants\n';
        expenses.forEach(expense => {
            const participants = expense.participants.map(p => `${p.userId}:${p.amount}`).join('; ');
            balanceSheet += `${expense.description},${expense.totalAmount},${expense.splitMethod},${participants}\n`;
        });
        res.header('Content-Type', 'text/csv');
        res.attachment('balance-sheet.csv');
        res.send(balanceSheet);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
