import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaGamepad } from 'react-icons/fa';

const Navbar = () => {
    const { cartCount } = useCart();

    return (
        <nav className="fixed w-full top-0 z-50 transition-all duration-300 bg-transparent hover:bg-black/80 hover:backdrop-blur-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <img src="/Logo.png" alt="NeoGames" className="h-16 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                </Link>

                <div className="flex items-center gap-8">
                    <button
                        onClick={() => {
                            const section = document.getElementById('featured-games');
                            if (section) {
                                section.scrollIntoView({ behavior: 'smooth' });
                            } else {
                                window.location.href = '/#featured-games';
                            }
                        }}
                        className="text-white/80 hover:text-white uppercase tracking-widest text-sm font-bold transition-colors bg-transparent border-none cursor-pointer"
                    >
                        Games
                    </button>
                    <Link to="/cart" className="relative group flex items-center gap-2">
                        <span className="text-white/80 group-hover:text-white uppercase tracking-widest text-sm font-bold transition-colors">Cart</span>
                        <div className="relative">
                            <FaShoppingCart className="text-lg text-white group-hover:scale-110 transition-transform" />
                            {cartCount > 0 && (
                                <span className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-lg">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
