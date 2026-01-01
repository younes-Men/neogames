import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import GameDetail from './pages/GameDetail';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="flex flex-col min-h-screen bg-gaming-bg text-gaming-text font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game/:id" element={<GameDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
