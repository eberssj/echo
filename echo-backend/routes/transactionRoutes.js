const express = require('express');
const router = express.Router();
const { createTransaction, getAllTransactions } = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/transactions', authMiddleware, createTransaction);

router.get('/transactions', authMiddleware, getAllTransactions);

module.exports = router; 

