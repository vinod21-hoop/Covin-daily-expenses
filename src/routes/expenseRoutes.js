const express = require('express');
const { addExpense, getUserExpenses, getOverallExpenses, downloadBalanceSheet } = require('../controllers/expenseController');
const router = express.Router();
const { validateExpense } = require('../middleware/validateInput');
const auth = require('../middleware/auth');

router.post('/', auth, validateExpense, addExpense);
router.get('/user/:userId', auth, getUserExpenses);
router.get('/', auth, getOverallExpenses);
router.get('/download', auth, downloadBalanceSheet);

module.exports = router;
