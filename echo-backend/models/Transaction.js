const db = require('../utils/db');

class Transaction {
    static async create(userId, transactionData) {
        const { type, tag, value, transactionDate } = transactionData;
        const query = `
            INSERT INTO transactions (type, tag, value, transaction_date, user_id)
            VALUES (?, ?, ?, ?, ?)
        `;
        return db.query(query, [type, tag, value, transactionDate, userId]);
    }

    static async getAll(userId) {
        const query = `
            SELECT * FROM transactions WHERE user_id = ?
        `;
        return db.query(query, [userId]);
    }
}

module.exports = Transaction;