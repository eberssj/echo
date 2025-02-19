const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
    console.log('Recebendo solicitação para criar transação:', req.body);
    try {
        const { type, tag, value, transactionDate } = req.body;
        const userId = req.user.id; 

        if (!['income', 'expense'].includes(type)) {
            return res.status(400).json({ error: "Invalid transaction type. Must be 'income' or 'expense'." });
        }

        await Transaction.create(userId, { type, tag, value, transactionDate });
        res.status(201).json({ message: 'Transaction created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllTransactions = async (req, res) => {
    try {
        const userId = req.user.id; // Obtém o ID do usuário autenticado
        const transactions = await Transaction.getAll(userId);
        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};