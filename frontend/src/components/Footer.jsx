import React from "react";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="bg-gaming-card border-t border-white/10 mt-auto py-8">
            <div className="container mx-auto px-4 relative flex flex-col md:flex-row justify-center items-center text-gaming-muted">
                <div className="text-center mb-4 md:mb-0">
                    <p>&copy; {new Date().getFullYear()} NeoGames. All rights reserved.</p>
                    <div className="mt-2 flex gap-4 text-sm justify-center">
                        <a href="#" className="hover:text-gaming-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gaming-primary transition-colors">Terms of Service</a>
                    </div>
                </div>

                <div className="md:absolute md:right-4">
                    <a href="https://www.instagram.com/neogames.market/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gaming-accent transition-colors">
                        <FaInstagram size={28} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
