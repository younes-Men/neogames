import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaInfoCircle } from 'react-icons/fa';

const GameCard = ({ game }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group relative h-[450px] w-full rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] border border-transparent hover:border-gaming-primary/50 bg-zinc-900 transition-all duration-300"
        >
            <Link to={`/game/${game._id}`} className="block h-full relative">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="mb-2">

                        <h3 className="text-2xl font-black text-white uppercase italic leading-none mb-1 tracking-tight drop-shadow-lg">
                            {game.title}
                        </h3>
                    </div>

                    <div className="flex items-center justify-between pb-2">
                        <span className="text-xl font-bold text-white">{game.price} DH</span>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(game);
                            }}
                            className="flex items-center gap-2 bg-gaming-primary px-4 py-2 rounded-sm text-white font-bold uppercase tracking-wider text-xs hover:bg-red-700 transition-colors shadow-lg transform hover:scale-105 active:scale-95"
                        >
                            <span>Acheter</span>
                            <FaShoppingCart size={12} />
                        </button>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default GameCard;
