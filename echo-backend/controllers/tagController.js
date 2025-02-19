const Tag = require('../models/Tag');

exports.createTag = async (req, res) => {
    try {
        const { name, type } = req.body;
        const userId = req.user.id; // Obtém o ID do usuário autenticado

        await Tag.create(userId, { name, type });
        res.status(201).json({ message: 'Tag created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllTags = async (req, res) => {
    try {
        const userId = req.user.id; // Obtém o ID do usuário autenticado
        const tags = await Tag.getAll(userId);
        res.status(200).json(tags);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};