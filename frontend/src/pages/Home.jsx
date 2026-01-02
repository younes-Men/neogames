import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import GameCard from '../components/GameCard';

const Home = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Slideshow effect
    useEffect(() => {
        if (games.length > 0) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % games.length);
            }, 5000); // Change every 5 seconds
            return () => clearInterval(interval);
        }
    }, [games]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                // Try to fetch from backend
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await axios.get(`${apiUrl}/api/games`);
                setGames(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch games, using fallback if available", err);
                // Fallback or empty
                setError("Could not load games. Please make sure backend is running.");
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-gaming-primary text-xl">Loading Games...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">{error}</div>;

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center overflow-hidden mb-20 bg-black">
                {/* Background Slideshow */}
                <div className="absolute inset-0 z-0 bg-black">
                    {/* Gradient Overlays for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gaming-bg via-black/20 to-transparent z-20" />

                    {games.length > 0 ? (
                        games.map((game, index) => (
                            <motion.div
                                key={game.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="absolute inset-0 overflow-hidden"
                            >
                                <motion.img
                                    src={game.image}
                                    alt="Hero Background"
                                    initial={{ scale: 1.1 }}
                                    animate={{
                                        scale: index === currentImageIndex ? 1 : 1.1,
                                    }}
                                    transition={{ duration: 6, ease: "easeOut" }}
                                    className="w-full h-full object-cover opacity-60"
                                />
                            </motion.div>
                        ))
                    ) : (
                        <div className="w-full h-full bg-zinc-900" />
                    )}
                </div>

                {/* Content */}
                <div className="relative z-20 container mx-auto px-6 pt-20">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="inline-block px-3 py-1 mb-4 text-sm font-bold tracking-widest uppercase text-gaming-primary border border-gaming-primary/30 bg-black/50 backdrop-blur-sm rounded-sm">
                                Welcome to the Future
                            </span>
                            <h1 className="text-7xl md:text-9xl font-black text-white italic uppercase leading-[0.85] tracking-tighter mb-6 drop-shadow-2xl">
                                NeoGames <span className="text-transparent bg-clip-text bg-gradient-to-r from-gaming-primary to-white">Store</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-xl mb-8 font-light leading-relaxed">
                                Your ultimate destination for the latest games, exclusive deals, and next-gen experiences.
                            </p>
                        </motion.div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="absolute bottom-10 right-10 flex gap-2 z-30">
                        {games.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`h-1 transition-all duration-300 ${idx === currentImageIndex ? 'w-8 bg-white' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Game Grid */}
            <div id="featured-games" className="container mx-auto px-4 py-12">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-12 w-2 bg-gaming-primary rounded-sm" />
                    <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-gaming-primary to-gaming-accent">Games</span>
                    </h2>
                </div>

                {games.length === 0 ? (
                    <div className="text-white text-center text-xl py-20">No games found in the database.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {games.map(game => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
