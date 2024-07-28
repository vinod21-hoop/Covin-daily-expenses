const express = require('express');
const { createUser, getUserDetails } = require('../controllers/userController');
const router = express.Router();
const { validateUser } = require('../middleware/validateInput');

router.post('/', validateUser, createUser);
router.get('/:id', getUserDetails);

module.exports = router;
