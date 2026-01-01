const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // URL or path to image
    platform: { type: String },
    rating: { type: Number, default: 0 },
}, {
    timestamps: true
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
