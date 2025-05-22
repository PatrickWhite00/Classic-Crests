import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, ShoppingBag, Heart, Settings } from 'lucide-react';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#C5A572]/20 text-[#C5A572] hover:bg-[#C5A572]/30 transition-colors"
        aria-expanded={isOpen}
        aria-label="User menu"
      >
        <User className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          
          <div className="py-1">
            <Link
              to="/account"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <User className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              My Account
            </Link>
            <Link
              to="/account/orders"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBag className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              My Orders
            </Link>
            <Link
              to="/wishlist"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <Heart className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              Wishlist
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              Settings
            </Link>
          </div>
          
          <div className="py-1 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;