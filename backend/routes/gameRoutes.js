const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');

// GET all games
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('games')
            .select('*');

        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET game by ID
router.get('/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('games')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error || !data) {
            res.status(404).json({ message: 'Game not found' });
        } else {
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
