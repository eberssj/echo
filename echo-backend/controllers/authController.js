const User = require('../models/User');
const emailUtils = require('../utils/email');
const jwt = require('jsonwebtoken');
exports.login = async (req, res) => {
const { email, password } = req.body;
try {
// Buscar o usuário pelo email
const user = await User.findByEmail(email);
if (!user) {
return res.status(404).json({ error: 'User not found' });
}
// Comparar a senha fornecida com o hash armazenado
const isPasswordValid = await User.comparePassword(password, user.password_hash);
if (!isPasswordValid) {
return res.status(401).json({ error: 'Invalid password' });
}
// Gerar o token JWT
const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
// Retornar o token
res.json({ message: 'Login successful', token });
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Internal server error' });
}
};
exports.register = async (req, res) => {
const { email, password } = req.body;
try {
const existingUser = await User.findByEmail(email);
if (existingUser) {
return res.status(400).json({ error: 'Email already exists' });
}
const newUser = await User.create(email, password);
res.status(201).json({ message: 'User registered successfully', user: newUser });
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Internal server error' });
}
};
exports.requestPasswordReset = async (req, res) => {
const { email } = req.body;
try {
const user = await User.findByEmail(email);
if (!user) {
return res.status(404).json({ error: 'User not found' });
}
const code = await User.generateResetCode(email);
await emailUtils.sendResetCode(email, code);
res.json({ message: 'Reset code sent to your email' });
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Internal server error' });
}
};
exports.resetPassword = async (req, res) => {
const { email, code, newPassword } = req.body;
try {
const user = await User.validateResetCode(email, code);
if (!user) {
return res.status(400).json({ error: 'Invalid or expired reset code' });
}
await User.updatePassword(email, newPassword);
res.json({ message: 'Password updated successfully' });
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Internal server error' });
}
};
// controllers/authController.js
exports.deleteAccount = async (req, res) => {
const userId = req.user.id;
try {
// Buscar o usuário pelo ID
const user = await User.findById(userId);
if (!user) {
return res.status(404).json({ error: 'User not found' });
}
// Excluir o usuário
await User.deleteById(userId);
// Retornar uma resposta de sucesso
res.json({ message: 'Account deleted successfully', user: { id: userId } });
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Internal server error' });
}
};