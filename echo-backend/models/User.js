const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

class User {
    // Criar um novo usuário
    static async create(email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.execute(
            'INSERT INTO users (email, password_hash) VALUES (?, ?)',
            [email, hashedPassword]
        );
        const newUser = { id: result.insertId, email, password_hash: hashedPassword };
        return newUser;
    }

    static async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
    
    // Buscar usuário pelo ID
    static async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    // Buscar usuário pelo email
    static async findByEmail(email) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    // Gerar código de recuperação de senha
    static async generateResetCode(email) {
        const code = crypto.randomBytes(3).toString('hex'); 
        const expires = new Date(Date.now() + 10 * 60 * 1000); 
        await pool.execute(
            'UPDATE users SET reset_code = ?, reset_code_expires = ? WHERE email = ?',
            [code, expires, email]
        );
        return code;
    }

    // Validar código de recuperação de senha
    static async validateResetCode(email, code) {
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE email = ? AND reset_code = ? AND reset_code_expires > NOW()',
            [email, code]
        );
        return rows[0];
    }

    // Atualizar senha
    static async updatePassword(email, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.execute(
            'UPDATE users SET password_hash = ?, reset_code = NULL, reset_code_expires = NULL WHERE email = ?',
            [hashedPassword, email]
        );
    }

    // Excluir usuário
    static async deleteById(id) {
        await pool.execute('DELETE FROM users WHERE id = ?', [id]);
        return { id }; // Retorna apenas o ID excluído
    }
}

module.exports = User;