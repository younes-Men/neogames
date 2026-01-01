const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// GET all games
router.get('/', async (req, res) => {
    try {
        const games = await Game.find({});
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET game by ID
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (game) {
            res.json(game);
        } else {
            res.status(404).json({ message: 'Game not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
