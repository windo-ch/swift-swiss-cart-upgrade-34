
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/80c228b4-813c-499f-b601-34324112c42f.png" 
              alt="Brings Logo" 
              className="h-12 mr-2"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-brings-dark hover:text-brings-primary font-medium transition-colors">
              Startsiite
            </Link>
            <Link to="/order" className="text-brings-dark hover:text-brings-primary font-medium transition-colors">
              Bstelle
            </Link>
            <Link to="/products" className="text-brings-dark hover:text-brings-primary font-medium transition-colors">
              Produkt
            </Link>
            <Link to="/categories" className="text-brings-dark hover:text-brings-primary font-medium transition-colors">
              Kategorie
            </Link>
            <Link to="/about" className="text-brings-dark hover:text-brings-primary font-medium transition-colors">
              Über Eus
            </Link>
          </div>
          
          {/* Search & Cart */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 text-brings-dark hover:text-brings-primary transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button 
              className="p-2 text-brings-dark hover:text-brings-primary transition-colors relative"
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-brings-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="p-2 text-brings-dark md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-brings-dark hover:text-brings-primary transition-colors">
                Startsiite
              </Link>
              <Link to="/order" className="text-brings-dark hover:text-brings-primary transition-colors">
                Bstelle
              </Link>
              <Link to="/products" className="text-brings-dark hover:text-brings-primary transition-colors">
                Produkt
              </Link>
              <Link to="/categories" className="text-brings-dark hover:text-brings-primary transition-colors">
                Kategorie
              </Link>
              <Link to="/about" className="text-brings-dark hover:text-brings-primary transition-colors">
                Über Eus
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;
