import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import Logo from './Logo';
import UserMenu from './UserMenu';
import AccessibilityMenu from './AccessibilityMenu';
import { ShoppingCart, Menu, Search, X, Settings, Globe } from 'lucide-react';

// Product data for search suggestions
const sampleProducts = [
  {
    id: 1,
    name: "Manchester United 1999 Home",
    image: "https://6w7yvz0yjw.ufs.sh/f/ryrByRsPLHsjZMQyABRpadhrJvM4mVRI17uPgHyYwZint8Bo",
    year: "1999",
    team: "Manchester United",
    league: "Premier League"
  },
  {
    id: 2,
    name: "AC Milan 2007 Away",
    image: "https://classicfootballkit.co.uk/cdn/shop/files/resize-0-main01665048889_768x768.jpg?v=1700235220",
    year: "2007",
    team: "AC Milan",
    league: "Serie A"
  },
  {
    id: 3,
    name: "Brazil 2002 Home",
    image: "https://6w7yvz0yjw.ufs.sh/f/ryrByRsPLHsjkLXnESunWVvdepfXcLkSa9w2Fm6ON345TQGH",
    year: "2002",
    team: "Brazil",
    league: "National"
  },
  {
    id: 4,
    name: "Netherlands 1988 Home",
    image: "https://6w7yvz0yjw.ufs.sh/f/ryrByRsPLHsjLrr3Y6RGQnRiZSGuxH2J1Uyw9gKa3Pfe7EN6",
    year: "1988",
    team: "Netherlands",
    league: "National"
  },
  {
    id: 5,
    name: "Real Madrid 2000 Away",
    image: "https://footsoccerpro.co/wp-content/uploads/2021/08/MAILLOT-RETRO-VINTAGE-REAL-MADRID-AWAY-1999-2000-1.jpg",
    year: "2000",
    team: "Real Madrid",
    league: "La Liga"
  },
  {
    id: 9,
    name: "Manchester City 2011 Home",
    image: "https://www.vintagefootballshirts.com/cdn/shop/files/2011-12-manchester-city-umbro-63655-1.jpg?v=1730093007",
    year: "2011",
    team: "Manchester City",
    league: "Premier League"
  }
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toggleCart, totalItems, currency, setCurrency } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof sampleProducts>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accessibilityMenuOpen, setAccessibilityMenuOpen] = useState(false);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  // Handle search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filteredResults = sampleProducts.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.year.includes(query) ||
      product.team.toLowerCase().includes(query) ||
      product.league.toLowerCase().includes(query)
    );
    
    setSearchResults(filteredResults);
    setShowSearchDropdown(true);
  }, [searchQuery]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setCurrencyMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchDropdown(false);
      setMobileMenuOpen(false);
    }
  };

  const handleSearchItemClick = (id: number) => {
    navigate(`/shop?product=${id}`);
    setShowSearchDropdown(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleAccessibilityMenu = () => {
    setAccessibilityMenuOpen(!accessibilityMenuOpen);
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    setCurrencyMenuOpen(false);
  };

  return (
    <nav className="bg-black text-[#C5A572]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          {/* Main navbar */}
          <div className="flex items-center justify-between h-40">
            {/* Center container */}
            <div className="flex items-center justify-between w-full">
              {/* Logo */}
              <div className="-my-8">
                <Link to="/">
                  <Logo />
                </Link>
              </div>
              
              {/* Navigation and icons - centered */}
              <div className="flex-1 flex items-center justify-center">
                {/* Navigation links */}
                <div className="hidden md:flex items-center gap-10">
                  <Link 
                    to="/" 
                    className={`text-[#C5A572] hover:text-[#E3C28D] transition-colors text-lg ${location.pathname === '/' ? 'font-bold' : ''}`}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/shop" 
                    className={`text-[#C5A572] hover:text-[#E3C28D] transition-colors text-lg ${location.pathname === '/shop' ? 'font-bold' : ''}`}
                  >
                    Shop
                  </Link>
                  <Link 
                    to="/community" 
                    className={`text-[#C5A572] hover:text-[#E3C28D] transition-colors text-lg ${location.pathname === '/community' ? 'font-bold' : ''}`}
                  >
                    Community
                  </Link>
                  <Link 
                    to="/about" 
                    className={`text-[#C5A572] hover:text-[#E3C28D] transition-colors text-lg ${location.pathname === '/about' ? 'font-bold' : ''}`}
                  >
                    About
                  </Link>
                  <Link 
                    to="/contact" 
                    className={`text-[#C5A572] hover:text-[#E3C28D] transition-colors text-lg ${location.pathname === '/contact' ? 'font-bold' : ''}`}
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Auth buttons and icons */}
              <div className="flex items-center gap-6">
                {isAuthenticated ? (
                  <div className="flex items-center gap-4">
                    <div className="relative" ref={currencyRef}>
                      <button
                        className="p-2 text-[#C5A572] hover:text-[#E3C28D] transition-colors flex items-center gap-1"
                        onClick={() => setCurrencyMenuOpen(!currencyMenuOpen)}
                        aria-label="Select currency"
                      >
                        <Globe className="w-5 h-5" />
                        <span>{currency}</span>
                      </button>
                      {currencyMenuOpen && (
                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-2 z-50">
                          <button
                            onClick={() => handleCurrencyChange('GBP')}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                          >
                            GBP (£)
                          </button>
                          <button
                            onClick={() => handleCurrencyChange('EUR')}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                          >
                            EUR (€)
                          </button>
                          <button
                            onClick={() => handleCurrencyChange('USD')}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                          >
                            USD ($)
                          </button>
                        </div>
                      )}
                    </div>
                    <button
                      className="p-2 text-[#C5A572] hover:text-[#E3C28D] transition-colors"
                      onClick={toggleAccessibilityMenu}
                      aria-label="Accessibility options"
                    >
                      <Settings className="w-6 h-6" />
                    </button>
                    <button 
                      className="p-2 text-[#C5A572] hover:text-[#E3C28D] transition-colors relative"
                      aria-label="View shopping cart"
                      onClick={toggleCart}
                    >
                      <ShoppingCart className="w-6 h-6" />
                      {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                          {totalItems}
                        </span>
                      )}
                    </button>
                    <UserMenu />
                  </div>
                ) : (
                  <div className="hidden md:flex items-center gap-4">
                    <div className="relative" ref={currencyRef}>
                      <button
                        className="p-2 text-[#C5A572] hover:text-[#E3C28D] transition-colors flex items-center gap-1"
                        onClick={() => setCurrencyMenuOpen(!currencyMenuOpen)}
                        aria-label="Select currency"
                      >
                        <Globe className="w-5 h-5" />
                        <span>{currency}</span>
                      </button>
                      {currencyMenuOpen && (
                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-2 z-50">
                          <button
                            onClick={() => handleCurrencyChange('GBP')}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                          >
                            GBP (£)
                          </button>
                          <button
                            onClick={() => handleCurrencyChange('EUR')}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                          >
                            EUR (€)
                          </button>
                          <button
                            onClick={() => handleCurrencyChange('USD')}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                          >
                            USD ($)
                          </button>
                        </div>
                      )}
                    </div>
                    <button
                      className="p-2 text-[#C5A572] hover:text-[#E3C28D] transition-colors"
                      onClick={toggleAccessibilityMenu}
                      aria-label="Accessibility options"
                    >
                      <Settings className="w-6 h-6" />
                    </button>
                    <button 
                      className="p-2 text-[#C5A572] hover:text-[#E3C28D] transition-colors relative"
                      aria-label="View shopping cart"
                      onClick={toggleCart}
                    >
                      <ShoppingCart className="w-6 h-6" />
                      {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                          {totalItems}
                        </span>
                      )}
                    </button>
                    <Link 
                      to="/login"
                      className="px-6 py-2 text-[#C5A572] hover:text-[#E3C28D] border border-[#C5A572] hover:border-[#E3C28D] rounded-full transition-colors"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      className="px-6 py-2 bg-[#C5A572] text-black hover:bg-[#E3C28D] rounded-full transition-colors"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
                <button 
                  className="md:hidden p-2 text-[#C5A572]"
                  onClick={toggleMobileMenu}
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="-mt-6 pb-2" ref={searchRef}>
            <div className="relative max-w-2xl mx-auto w-full">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for jerseys, teams, or players..."
                    className="w-full bg-gray-900 text-white px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C5A572] placeholder-gray-400 pr-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search for jerseys, teams, or players"
                    aria-expanded={showSearchDropdown}
                    aria-controls="search-results-dropdown"
                  />
                  <button 
                    type="submit" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#C5A572] hover:text-[#E3C28D] transition-colors"
                    aria-label="Submit search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>
              
              {/* Search Results Dropdown */}
              {showSearchDropdown && searchResults.length > 0 && (
                <div 
                  id="search-results-dropdown"
                  className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <ul className="max-h-96 overflow-y-auto">
                    {searchResults.map(product => (
                      <li key={product.id}>
                        <button
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition text-left"
                          onClick={() => handleSearchItemClick(product.id)}
                        >
                          <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.team} • {product.league} • {product.year}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="p-3 border-t border-gray-100">
                    <button
                      className="w-full text-center text-[#C5A572] hover:text-[#B08E5C] font-medium"
                      onClick={handleSearch}
                    >
                      See all results
                    </button>
                  </div>
                </div>
              )}
              
              {/* No Results Message */}
              {showSearchDropdown && searchQuery.trim() !== '' && searchResults.length === 0 && (
                <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 text-center text-gray-600">
                    No results found for "{searchQuery}"
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-[#C5A572] hover:text-[#E3C28D] transition-colors text-lg py-2 ${location.pathname === '/' ? 'font-bold' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className={`text-[#C5A572] hover:text-[#E3C28D] transition-colors text-lg py-2 ${location.pathname === '/shop' ? 'font-bold' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/community" 
                className={`text-[#C5A572] hover:text-[#E3C28D] transition-colors text-lg py-2 ${location.pathname === '/community' ? 'font-bold' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Community
              </Link>
              <Link 
                to="/about" 
                className={`text-[#C5A572] hover:text-[#E3C28D] transition-colors text-lg py-2 ${location.pathname === '/about' ? 'font-bold' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`text-[#C5A572] hover:text-[#E3C28D] transition-colors text-lg py-2 ${location.pathname === '/contact' ? 'font-bold' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {!isAuthenticated && (
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-800">
                  <Link 
                    to="/login"
                    className="w-full py-2 text-center text-[#C5A572] hover:text-[#E3C28D] border border-[#C5A572] hover:border-[#E3C28D] rounded-full transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full py-2 text-center bg-[#C5A572] text-black hover:bg-[#E3C28D] rounded-full transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Accessibility Menu */}
      <AccessibilityMenu 
        isOpen={accessibilityMenuOpen} 
        onClose={() => setAccessibilityMenuOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;