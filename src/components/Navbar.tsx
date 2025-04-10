
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAgeVerification } from '../contexts/AgeVerificationContext';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdult } = useAgeVerification();
  const { totalItems, setIsCartOpen } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/e4d3037b-5d79-4749-a7ff-ea9a4c991cbb.png" 
              alt="Brings Logo" 
              className="h-8"
            />
            {isAdult && (
              <span className="ml-2 text-xs font-bold bg-red-500 text-white px-1.5 py-0.5 rounded">18+</span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Produkt</Link>
            <Link to="/categories" className="nav-link">Kategorie</Link>
            <Link to="/about" className="nav-link">Über üs</Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-500 hover:text-brings-primary">
              <Search size={20} />
            </button>
            <button 
              className="relative" 
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} className="text-brings-dark" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brings-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <Link to="/order">
              <Button className="bg-brings-primary hover:bg-brings-primary/90 text-white">
                Bstelle
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <button 
              className="relative" 
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} className="text-brings-dark" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brings-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button 
              onClick={toggleMenu}
              className="text-brings-dark focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/products" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
                Produkt
              </Link>
              <Link to="/categories" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
                Kategorie
              </Link>
              <Link to="/about" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
                Über üs
              </Link>
              <Link to="/order" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-brings-primary hover:bg-brings-primary/90 text-white">
                  Jetzt Bstelle
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
