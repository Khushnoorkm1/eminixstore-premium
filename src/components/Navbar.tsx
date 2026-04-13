import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Menu, 
  X, 
  LogOut, 
  LogIn, 
  ChevronDown, 
  Sun, 
  Moon, 
  Tag, 
  Globe, 
  ArrowRight,
  Home as HomeIcon,
  LayoutGrid,
  Percent,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { loginWithGoogle, logout } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { SAMPLE_PRODUCTS } from '../data/products';

// Announcement Bar Component
function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-teal-900 text-white py-2 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
        <span className="flex items-center">
          <Tag className="h-3 w-3 mr-2 text-gold-500" />
          Free Shipping on orders above ₹999 • 30-Day Easy Returns
        </span>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

// Mega Menu Component
function MegaMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const categories = [
    { 
      name: 'Apparel', 
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80',
      items: ['Men\'s Wear', 'Women\'s Wear', 'Kids', 'Accessories']
    },
    { 
      name: 'Accessories', 
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
      items: ['Watches', 'Jewelry', 'Bags', 'Wallets']
    },
    { 
      name: 'Electronics', 
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80',
      items: ['Audio', 'Smart Home', 'Gadgets', 'Wearables']
    },
    { 
      name: 'Home Decor', 
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80',
      items: ['Furniture', 'Lighting', 'Art', 'Textiles']
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onMouseEnter={() => {}} // Keep open
          onMouseLeave={onClose}
          className="absolute top-full left-0 w-full bg-white dark:bg-gray-950 shadow-2xl border-b border-gray-100 dark:border-gray-800 z-40 py-12"
        >
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-12">
            {categories.map((cat, i) => (
              <div key={i} className="space-y-6">
                <div className="aspect-[16/9] rounded-2xl overflow-hidden relative group">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-teal-900/40 group-hover:bg-teal-900/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link 
                      to={`/shop?cat=${cat.name}`} 
                      onClick={onClose}
                      className="bg-white text-teal-900 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
                <div>
                  <Link 
                    to={`/shop?cat=${cat.name}`} 
                    onClick={onClose}
                    className="text-sm font-bold text-gray-900 dark:text-white hover:text-gold-500 transition-colors uppercase tracking-widest"
                  >
                    {cat.name}
                  </Link>
                  <ul className="mt-4 space-y-2">
                    {cat.items.map((item, j) => (
                      <li key={j}>
                        <Link 
                          to={`/shop?cat=${cat.name}`} 
                          onClick={onClose}
                          className="text-xs text-gray-500 hover:text-teal-800 dark:hover:text-teal-400 transition-colors"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const { user, profile } = useAuth();
  const { items } = useCart();
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<{ type: 'product' | 'category', value: string, id?: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Handle scroll for sticky header height reduction
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside of search to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions as user types
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // Filter products
    const productMatches = SAMPLE_PRODUCTS
      .filter(p => p.name.toLowerCase().includes(query))
      .slice(0, 5)
      .map(p => ({ type: 'product' as const, value: p.name, id: p.id }));

    // Filter categories
    const categories = Array.from(new Set(SAMPLE_PRODUCTS.map(p => p.category)));
    const categoryMatches = categories
      .filter(c => c.toLowerCase().includes(query))
      .slice(0, 3)
      .map(c => ({ type: 'category' as const, value: c }));

    setSuggestions([...categoryMatches, ...productMatches]);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: { type: 'product' | 'category', value: string, id?: string }) => {
    if (suggestion.type === 'product') {
      navigate(`/product/${suggestion.id}`);
    } else {
      navigate(`/shop?cat=${encodeURIComponent(suggestion.value)}`);
    }
    setSearchQuery(suggestion.value);
    setShowSuggestions(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <AnnouncementBar />
      
      <nav className={`w-full relative transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-white dark:bg-gray-950 py-4'
      } border-b border-gray-100 dark:border-gray-800`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Left: Logo (Desktop) / Hamburger (Mobile) */}
            <div className="flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full mr-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <Link to="/" className="flex items-center space-x-1 group">
                <span className="text-2xl font-extrabold tracking-tighter text-teal-800 dark:text-teal-400 group-hover:text-teal-900 transition-colors">EMINIX</span>
                <span className="text-2xl font-light tracking-tighter text-gold-500">STORE</span>
              </Link>
            </div>

            {/* Center: Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-xl mx-12 relative" ref={searchRef}>
              <form onSubmit={handleSearch} className="relative w-full group">
                <input
                  type="text"
                  placeholder="Search premium products..."
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-gold-500 focus:bg-white dark:focus:bg-gray-800 transition-all dark:text-white text-sm"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-gold-500 transition-colors" />
              </form>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden py-2 z-50"
                  >
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(s)}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                      >
                        <div className={`p-2 rounded-lg ${s.type === 'category' ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-400'}`}>
                          {s.type === 'category' ? <Tag className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{s.value}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest">{s.type}</p>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button 
                onClick={toggleTheme}
                className="hidden sm:flex p-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>

              {/* Language Switcher */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center space-x-1 p-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all text-xs font-bold"
                >
                  <Globe className="h-4 w-4" />
                  <span>{language}</span>
                </button>
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 z-50"
                    >
                      <button 
                        onClick={() => { setLanguage('EN'); setIsLangOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-white"
                      >
                        English
                      </button>
                      <button 
                        onClick={() => { setLanguage('HI'); setIsLangOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-white"
                      >
                        हिन्दी
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/wishlist" className="relative p-2.5 text-gray-600 dark:text-gray-400 hover:text-teal-800 dark:hover:text-teal-400 transition-colors">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-gold-500 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white dark:border-gray-950">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative p-2.5 text-gray-600 dark:text-gray-400 hover:text-teal-800 dark:hover:text-teal-400 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-teal-800 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white dark:border-gray-950">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="relative">
                {user ? (
                  <button 
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
                  >
                    <img src={user.photoURL || ''} alt="" className="h-8 w-8 rounded-full border-2 border-gold-500/20" />
                  </button>
                ) : (
                  <button 
                    onClick={loginWithGoogle}
                    className="hidden sm:flex items-center space-x-2 bg-teal-800 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20"
                  >
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </button>
                )}

                <AnimatePresence>
                  {isUserDropdownOpen && user && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 py-3 overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-800 mb-2">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.displayName}</p>
                      </div>
                      <Link to="/account" className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                      <Link to="/account/orders" className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <ShoppingCart className="h-4 w-4" />
                        <span>My Orders</span>
                      </Link>
                      {profile?.role === 'admin' && (
                        <Link to="/admin" className="flex items-center space-x-3 px-4 py-2.5 text-sm text-blue-600 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                          <LayoutGrid className="h-4 w-4" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      <div className="h-px bg-gray-50 dark:bg-gray-800 my-2" />
                      <button 
                        onClick={() => { logout(); setIsUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-3 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Navigation Menu (Desktop) */}
          <div className="hidden md:flex items-center justify-center space-x-10 h-10 border-t border-gray-50 dark:border-gray-900/50">
            <Link to="/" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 hover:text-gold-500 transition-colors">Home</Link>
            <div 
              className="h-full flex items-center"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 hover:text-gold-500 transition-colors flex items-center h-full">
                Collections
                <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              <MegaMenu 
                isOpen={isMegaMenuOpen} 
                onClose={() => setIsMegaMenuOpen(false)} 
              />
            </div>
            <Link to="/shop" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 hover:text-gold-500 transition-colors">Shop</Link>
            <Link to="/shop?sort=sale" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 hover:text-gold-500 transition-colors flex items-center">
              <Percent className="h-3 w-3 mr-1 text-red-500" />
              Deals
            </Link>
            <Link to="/shop?sort=newest" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 hover:text-gold-500 transition-colors">New Arrivals</Link>
            <Link to="/about" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 hover:text-gold-500 transition-colors">About</Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-gray-950 z-[70] md:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-1">
                  <span className="text-xl font-extrabold tracking-tighter text-teal-800 dark:text-teal-400">EMINIX</span>
                  <span className="text-xl font-light tracking-tighter text-gold-500">STORE</span>
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto py-8 px-6 space-y-8">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Navigation</p>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { to: '/', label: 'Home', icon: HomeIcon },
                      { to: '/collections', label: 'Collections', icon: LayoutGrid },
                      { to: '/shop', label: 'All Products', icon: ShoppingCart },
                      { to: '/shop?sort=sale', label: 'Special Deals', icon: Percent },
                      { to: '/about', label: 'Our Story', icon: Info },
                    ].map((link, i) => (
                      <Link 
                        key={i} 
                        to={link.to} 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl text-sm font-bold text-gray-900 dark:text-white hover:bg-teal-800 hover:text-white transition-all"
                      >
                        <link.icon className="h-5 w-5" />
                        <span>{link.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Settings</p>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Dark Mode</span>
                    <button 
                      onClick={toggleTheme}
                      className={`w-12 h-6 rounded-full transition-colors relative ${theme === 'dark' ? 'bg-gold-500' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${theme === 'dark' ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Language</span>
                    <div className="flex space-x-2">
                      <button onClick={() => setLanguage('EN')} className={`px-3 py-1 rounded-lg text-[10px] font-bold ${language === 'EN' ? 'bg-teal-800 text-white' : 'bg-white dark:bg-gray-800 text-gray-500'}`}>EN</button>
                      <button onClick={() => setLanguage('HI')} className={`px-3 py-1 rounded-lg text-[10px] font-bold ${language === 'HI' ? 'bg-teal-800 text-white' : 'bg-white dark:bg-gray-800 text-gray-500'}`}>HI</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-gray-800">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={user.photoURL || ''} alt="" className="h-10 w-10 rounded-full border-2 border-gold-500" />
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{user.displayName}</p>
                        <p className="text-[10px] text-gray-500">Premium Member</p>
                      </div>
                    </div>
                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors">
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { loginWithGoogle(); setIsMenuOpen(false); }}
                    className="w-full bg-teal-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-xl shadow-teal-800/20"
                  >
                    <LogIn className="h-5 w-5" />
                    <span>Sign In with Google</span>
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 px-6 py-3 flex items-center justify-between z-[50] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {[
          { to: '/', icon: HomeIcon, label: 'Home' },
          { to: '/collections', icon: LayoutGrid, label: 'Categories' },
          { to: '/cart', icon: ShoppingCart, label: 'Cart', badge: cartCount },
          { to: '/account', icon: User, label: 'Account' },
        ].map((item, i) => (
          <Link key={i} to={item.to} className="flex flex-col items-center space-y-1 relative group">
            <div className="p-1 rounded-xl group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 transition-colors">
              <item.icon className="h-5 w-5 text-gray-500 group-hover:text-teal-800 dark:group-hover:text-teal-400 transition-colors" />
            </div>
            <span className="text-[9px] font-bold text-gray-400 group-hover:text-teal-800 dark:group-hover:text-teal-400 uppercase tracking-widest transition-colors">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="absolute -top-1 right-0 bg-teal-800 text-white text-[8px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center border border-white dark:border-gray-950">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </header>
  );
}
