import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-[#2F3C7E] dark:text-white">KickResume</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/dashboard" 
              className={`transition-colors duration-200 ${
                isActive('/dashboard') 
                  ? 'text-[#2F3C7E] dark:text-white font-semibold' 
                  : 'text-[#6C757D] dark:text-gray-300 hover:text-[#2F3C7E] dark:hover:text-white'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/templates" 
              className={`transition-colors duration-200 ${
                isActive('/templates') 
                  ? 'text-[#2F3C7E] dark:text-white font-semibold' 
                  : 'text-[#6C757D] dark:text-gray-300 hover:text-[#2F3C7E] dark:hover:text-white'
              }`}
            >
              Templates
            </Link>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-500 rotate-0 transition-transform duration-300" />
              ) : (
                <Moon size={20} className="text-gray-600 dark:text-gray-300 rotate-0 transition-transform duration-300" />
              )}
            </button>
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-[#6C757D] dark:text-gray-300">
                <User size={20} />
                <span className="font-medium">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-[#6C757D] dark:text-gray-300 hover:text-[#FF6B6B] dark:hover:text-red-400 transition-colors duration-200"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun size={18} className="text-yellow-500 transition-transform duration-300" />
              ) : (
                <Moon size={18} className="text-gray-600 transition-transform duration-300" />
              )}
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#2F3C7E] dark:text-white hover:text-[#00C9A7] dark:hover:text-gray-300 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-[#E9ECEF] dark:border-gray-700">
              <Link 
                to="/dashboard" 
                className="block px-3 py-2 text-[#6C757D] dark:text-gray-300 hover:text-[#2F3C7E] dark:hover:text-white transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/templates" 
                className="block px-3 py-2 text-[#6C757D] dark:text-gray-300 hover:text-[#2F3C7E] dark:hover:text-white transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Templates
              </Link>
              
              <div className="px-3 py-2 text-[#6C757D] dark:text-gray-300 border-t border-[#E9ECEF] dark:border-gray-700 mt-2">
                <div className="flex items-center space-x-2 mb-2">
                  <User size={16} />
                  <span className="text-sm">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-[#FF6B6B] dark:text-red-400 hover:text-[#FF6B6B]/80 dark:hover:text-red-300 transition-colors duration-200"
                >
                  <LogOut size={16} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;