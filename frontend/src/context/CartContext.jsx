import React from 'react';
import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (game) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item._id === game._id);
            if (existingItem) {
                return prevCart.map(item =>
                    item._id === game._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...game, quantity: 1 }];
        });
    };

    const removeFromCart = (gameId) => {
        setCart(prevCart => prevCart.filter(item => item._id !== gameId));
    };

    const updateQuantity = (gameId, quantity) => {
        if (quantity < 1) return;
        setCart(prevCart =>
            prevCart.map(item => item._id === gameId ? { ...item, quantity } : item)
        );
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};
