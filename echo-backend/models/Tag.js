const db = require('../utils/db');

class Tag {
    static async create(userId, tagData) {
        const { name, type } = tagData;
        const query = `
            INSERT INTO tags (name, type, user_id)
            VALUES (?, ?, ?)
        `;
        return db.query(query, [name, type, userId]);
    }

    static async getAll(userId) {
        const query = `
            SELECT * FROM tags WHERE user_id = ?
        `;
        return db.query(query, [userId]);
    }
}

module.exports = Tag;