require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Importe as rotas
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactionRoutes');
const tagRoutes = require('./routes/tagRoutes');


app.use('/api', authRoutes);
app.use('/api', transactionRoutes);
app.use('/api', tagRoutes);

// Rota de teste
app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'Pong!' });
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});