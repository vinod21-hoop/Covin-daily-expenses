const { body, validationResult } = require('express-validator');

exports.validateUser = [
    body('email').isEmail().withMessage('Email is invalid'),
    body('name').notEmpty().withMessage('Name is required'),
    body('mobile').isMobilePhone().withMessage('Mobile number is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateExpense = [
    body('description').notEmpty().withMessage('Description is required'),
    body('totalAmount').isFloat({ gt: 0 }).withMessage('Total amount must be greater than 0'),
    body('splitMethod').isIn(['equal', 'exact', 'percentage']).withMessage('Invalid split method'),
    body('participants').isArray().withMessage('Participants must be an array'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
