
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAgeVerification } from '../contexts/AgeVerificationContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdult } = useAgeVerification();
  const { totalItems, setIsCartOpen } = useCart();
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/7dd740a9-78e5-46d0-be44-ac092b1e536d.png"
                alt="Brings Logo"
                className="h-[100px]" 
              />
              {isAdult && (
                <span className="ml-2 text-xs font-bold bg-red-500 text-white px-1.5 py-0.5 rounded">18+</span>
              )}
            </Link>

            {/* Desktop & Mobile Actions */}
            <div className="flex items-center gap-4">
              <Link to="/auth" className="hover:text-brings-primary">
                <User size={20} className="text-[#1D557A]" />
              </Link>
              <button 
                className="relative" 
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={20} className="text-[#1D557A]" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brings-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button 
                onClick={toggleMenu}
                className="text-[#1D557A] md:hidden focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Search Bar - Always visible */}
          <div className="w-full">
            <div className="relative">
              <Input
                type="text"
                placeholder="Produkt sueche..."
                className="w-full pl-4 pr-4 py-2 bg-gray-50 border-brings-primary/20 focus:border-brings-primary"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link to="/products" className="px-4 py-2 text-[#1D557A] hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>
                Produkte
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
