
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1D557A] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/7dd740a9-78e5-46d0-be44-ac092b1e536d.png"
                alt="Brings Logo"
                className="h-[120px]" 
              />
            </div>
            <p className="text-gray-300 mb-4">
              Snacks & Getränk - sofort zu dir glieferet. I 30 Minute bi dir in Züri.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brings-secondary" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brings-secondary" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brings-secondary" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-brings-secondary transition-colors">
                  Über Eus
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-brings-secondary transition-colors">
                  Produkt
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-brings-secondary transition-colors">
                  Kategorie
                </Link>
              </li>
              <li>
                <Link to="/order" className="text-gray-300 hover:text-brings-secondary transition-colors">
                  Bstelle
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-white mb-4">Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-brings-secondary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-brings-secondary transition-colors">
                  Lieferige
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-white mb-4">Kontakt</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex">
                <MapPin size={20} className="mr-2 text-brings-secondary flex-shrink-0" />
                <span>Brings</span>
              </li>
              <li className="flex">
                <Phone size={20} className="mr-2 text-brings-secondary flex-shrink-0" />
                <span>+41 79 900 02 02</span>
              </li>
              <li className="flex">
                <Mail size={20} className="mr-2 text-brings-secondary flex-shrink-0" />
                <span>hallo@gobrings.ch</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2025 Brings AG. Alli Rächt vorbehalte.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link to="/dateschutz" className="hover:text-brings-secondary transition-colors">
              Dateschutz
            </Link>
            <Link to="/agb" className="hover:text-brings-secondary transition-colors">
              AGB
            </Link>
            <Link to="/impressum" className="hover:text-brings-secondary transition-colors">
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

