import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaArrowLeft, FaStar, FaGamepad, FaEnvelope, FaInfinity, FaBolt, FaHeadset } from 'react-icons/fa';
import { motion } from 'framer-motion';

const GameDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await axios.get(`${apiUrl}/api/games/${id}`);
                setGame(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchGame();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-gaming-primary">Loading...</div>;
    if (!game) return <div className="min-h-screen flex items-center justify-center text-red-500">Game not found</div>;

    return (
        <div className="min-h-screen pt-24 pb-12 container mx-auto px-4">
            <Link to="/" className="inline-flex items-center gap-2 text-gaming-muted hover:text-white mb-8 transition-colors">
                <FaArrowLeft /> Back to Store
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gaming-card rounded-2xl overflow-hidden shadow-2xl border border-white/5 grid md:grid-cols-2 gap-8"
            >
                <div className="relative h-[400px] md:h-full">
                    <img src={game.image} alt={game.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gaming-card to-transparent md:bg-gradient-to-r" />
                </div>

                <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-gaming-primary/20 text-gaming-primary px-3 py-1 rounded-full text-sm font-bold border border-gaming-primary/30">
                            {game.platform}
                        </span>
                        <span className="bg-white/10 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                            <FaStar className="text-yellow-500" /> {game.rating}
                        </span>
                    </div>

                    <h1 className="text-4xl font-bold mb-6 text-white">{game.title}</h1>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3 text-white">
                            <div className="w-10 h-10 rounded-lg bg-gaming-primary/20 border border-gaming-primary/30 flex items-center justify-center">
                                <FaGamepad className="text-gaming-primary text-lg" />
                            </div>
                            <span className="text-sm font-medium">Compte Steam Officiel</span>
                        </div>
                        <div className="flex items-center gap-3 text-white">
                            <div className="w-10 h-10 rounded-lg bg-gaming-primary/20 border border-gaming-primary/30 flex items-center justify-center">
                                <FaEnvelope className="text-gaming-primary text-lg" />
                            </div>
                            <span className="text-sm font-medium">Full access (u can change Email + Password)</span>
                        </div>
                        <div className="flex items-center gap-3 text-white">
                            <div className="w-10 h-10 rounded-lg bg-gaming-primary/20 border border-gaming-primary/30 flex items-center justify-center">
                                <FaInfinity className="text-gaming-primary text-lg" />
                            </div>
                            <span className="text-sm font-medium">Lifetime Access</span>
                        </div>
                        <div className="flex items-center gap-3 text-white">
                            <div className="w-10 h-10 rounded-lg bg-gaming-primary/20 border border-gaming-primary/30 flex items-center justify-center">
                                <FaBolt className="text-gaming-primary text-lg" />
                            </div>
                            <span className="text-sm font-medium">Instant Delivery</span>
                        </div>
                        <div className="flex items-center gap-3 text-white">
                            <div className="w-10 h-10 rounded-lg bg-gaming-primary/20 border border-gaming-primary/30 flex items-center justify-center">
                                <FaHeadset className="text-gaming-primary text-lg" />
                            </div>
                            <span className="text-sm font-medium">24/7 Support</span>
                        </div>
                    </div>

                    <div className="mt-auto border-t border-white/10 pt-8 flex items-center justify-between">
                        <span className="text-3xl font-bold text-gaming-secondary">{game.price} DH</span>
                        <button
                            onClick={() => {
                                addToCart(game);
                                navigate('/cart');
                            }}
                            className="bg-gaming-primary hover:bg-gaming-secondary text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-colors shadow-lg shadow-gaming-primary/20"
                        >
                            <FaShoppingCart /> Acheter
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default GameDetail;
