const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

const standardDescription = "🎮 Compte Steam Officiel\n📧 Full access (u can change Email + Password)\n♾️ Lifetime Access\n⚡ Instant Delivery\n🆘 24/7 Support";

const sampleGames = [
    {
        title: "FC 26",
        description: standardDescription,
        price: 200,
        image: "/EGS_EASPORTSFC26StandardEdition_EACANADA_S2_1200x1600-effee280c00b9890a0c5249d4b0e5c97.png",
        platform: "Multi-platform",
        rating: 4.8
    },
    {
        title: "FC 25",
        description: standardDescription,
        price: 80,
        image: "/EGS_EASPORTSFC25StandardEdition_EACanada_S2_1200x1600-6e6b5c1d5d30e15b1dbdde721c6bc544.png",
        platform: "Multi-platform",
        rating: 4.5
    },
    {
        title: "GTA V",
        description: standardDescription,
        price: 170,
        image: "/gta.png",
        platform: "Multi-platform",
        rating: 4.9
    },
    {
        title: "Battlefield",
        description: standardDescription,
        price: 300,
        image: "/Battlefield-6-SuccesOneFR-Microsoft.jpg",
        platform: "Multi-platform",
        rating: 4.6
    },
    {
        title: "Red Dead Redemption 2",
        description: standardDescription,
        price: 160,
        image: "/Dpf3AxzXoAAFFf9.jpg",
        platform: "Multi-platform",
        rating: 5.0
    },
    {
        title: "Forza Horizon 5",
        description: standardDescription,
        price: 170,
        image: "/apps.49800.13718773309227929.bebdcc0e-1ed5-4778-8732-f4ef65a2f445.9ac09d39-064d-466c-81ca-2f1b6f0b95c5.png",
        platform: "Multi-platform",
        rating: 4.7
    },
    {
        title: "Euro Truck Simulator",
        description: standardDescription,
        price: 70,
        image: "/project_01_detail.jpg",
        platform: "PC",
        rating: 4.4
    }
];

router.get('/', async (req, res) => {
    try {
        await Game.deleteMany({});
        const createdGames = await Game.insertMany(sampleGames);
        res.send({ createdGames });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
