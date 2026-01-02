import React from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    const handleWhatsAppOrder = () => {
        if (cart.length === 0) return;

        let message = "Bonjour, je voudrais commander les jeux suivants :\n\n";
        cart.forEach(item => {
            message += `- ${item.title} (x${item.quantity}) : ${item.price * item.quantity} DH\n`;
        });
        message += `\nTotal: ${cartTotal.toFixed(2)} DH`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/212644553500?text=${encodedMessage}`, '_blank');
    };

    return (
        <div className="min-h-screen pt-24 pb-12 container mx-auto px-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
                <span className="w-2 h-8 bg-gaming-secondary rounded-full"></span>
                Votre Panier
            </h1>

            {cart.length === 0 ? (
                <div className="text-center py-20 bg-gaming-card rounded-xl border border-white/5">
                    <p className="text-xl text-gaming-muted mb-6">Votre panier est vide.</p>
                    <Link to="/" className="inline-block bg-gaming-primary text-white px-6 py-3 rounded-lg hover:bg-gaming-secondary transition-colors">
                        Découvrir les jeux
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        <AnimatePresence>
                            {cart.map(item => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-gaming-card p-4 rounded-xl border border-white/5 flex gap-4 items-center"
                                >
                                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-white mb-1">{item.title}</h3>
                                        <p className="text-gaming-secondary">{item.price} DH</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center bg-gaming-bg rounded-lg border border-white/10">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-white hover:text-gaming-primary">-</button>
                                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-white hover:text-gaming-primary">+</button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-400 p-2">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="md:col-span-1">
                        <div className="bg-gaming-card p-6 rounded-xl border border-white/5 sticky top-24">
                            <h2 className="text-xl font-bold mb-4 text-white">Résumé</h2>
                            <div className="space-y-2 mb-6 text-gaming-muted">
                                <div className="flex justify-between">
                                    <span>Sous-total</span>
                                    <span>{cartTotal.toFixed(2)} DH</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Livraison</span>
                                    <span className="text-green-400">Gratuit</span>
                                </div>
                                <div className="border-t border-white/10 pt-4 mt-4 flex justify-between text-white font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-gaming-accent">{cartTotal.toFixed(2)} DH</span>
                                </div>
                            </div>

                            <button
                                onClick={handleWhatsAppOrder}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors mb-4"
                            >
                                <FaWhatsapp className="text-xl" /> Valider ma commande
                            </button>

                            <button onClick={clearCart} className="w-full text-sm text-gaming-muted hover:text-red-500 transition-colors">
                                Vider le panier
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
