const express = require('express');
const router = express.Router();
const { createTag, getAllTags } = require('../controllers/tagController');
const authMiddleware = require('../middleware/authMiddleware');

// Criar uma nova tag (requer autenticação)
router.post('/tags', authMiddleware, createTag);

// Obter todas as tags do usuário (requer autenticação)
router.get('/tags', authMiddleware, getAllTags);

module.exports = router;