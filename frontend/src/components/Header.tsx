import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-2xl font-bold text-[#2F3C7E]">KickResume</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-[#6C757D] hover:text-[#2F3C7E] transition-colors duration-200 focus:outline-none">
              Features
            </a>
            <a href="#templates" className="text-[#6C757D] hover:text-[#2F3C7E] transition-colors duration-200 focus:outline-none">
              Templates
            </a>
            <Link 
              to="/login"
              className="text-[#6C757D] hover:text-[#2F3C7E] transition-colors duration-200 font-medium focus:outline-none"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-[#2F3C7E] text-white px-6 py-2 rounded-lg hover:bg-[#00C9A7] transition-colors duration-200 font-medium"
            >
              Sign Up
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#2F3C7E] hover:text-[#00C9A7] transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-[#E9ECEF]">
              <a href="#features" className="block px-3 py-2 text-[#6C757D] hover:text-[#2F3C7E] transition-colors duration-200 focus:outline-none">
                Features
              </a>
              <a href="#templates" className="block px-3 py-2 text-[#6C757D] hover:text-[#2F3C7E] transition-colors duration-200 focus:outline-none">
                Templates
              </a>
              <Link 
                to="/login" 
                className="block px-3 py-2 text-[#6C757D] hover:text-[#2F3C7E] transition-colors duration-200 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 bg-[#2F3C7E] text-white rounded-lg hover:bg-[#00C9A7] transition-colors duration-200 font-medium mx-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;