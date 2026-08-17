import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS_DATA, CATEGORIES_DATA } from '../data/products';
import { Product } from '../types';
import {
  Search,
  ShoppingCart,
  Heart,
  Scale,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Flame,
  ArrowRight,
  Package,
  Layers,
  Zap,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const {
    cartItemCount,
    cartSubtotal,
    wishlist,
    compareList,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsCompareOpen,
    currentRoute,
    setCurrentRoute,
    setFilterState,
    openProductDetail,
    navigateToCategory,
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('voltpulse_recent_searches');
      return saved ? JSON.parse(saved) : ['MacBook M3', 'Titanium Pro', 'Noise Canceling', 'OLED Monitor'];
    } catch {
      return ['MacBook M3', 'Titanium Pro', 'Noise Canceling', 'OLED Monitor'];
    }
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setIsAccountMenuOpen(false);
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(e.target as Node)) {
        setIsCategoriesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for live search preview
  const searchResults: Product[] = searchQuery.trim()
    ? PRODUCTS_DATA.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    // Save to recent
    const updated = [searchQuery.trim(), ...recentSearches.filter(s => s.toLowerCase() !== searchQuery.trim().toLowerCase())].slice(0, 6);
    setRecentSearches(updated);
    try {
      localStorage.setItem('voltpulse_recent_searches', JSON.stringify(updated));
    } catch {}

    setFilterState(prev => ({
      ...prev,
      searchQuery: searchQuery.trim(),
      categories: [],
    }));
    setIsSearchFocused(false);
    setCurrentRoute('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term);
    setFilterState(prev => ({
      ...prev,
      searchQuery: term,
      categories: [],
    }));
    setIsSearchFocused(false);
    setCurrentRoute('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProductFromSearch = (product: Product) => {
    setIsSearchFocused(false);
    setSearchQuery('');
    openProductDetail(product);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#111111] text-white border-b border-neutral-800 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3 lg:gap-6">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                setCurrentRoute('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 text-left group"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#E85D00] flex items-center justify-center shadow-md shadow-[#FF6A00]/20 group-hover:scale-105 transition-transform">
                <Zap className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white fill-current" />
              </div>
              <div>
                <span className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-1 font-['Space_Grotesk']">
                  VOLTPULSE
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] inline-block"></span>
                </span>
                <span className="text-[9px] text-neutral-400 tracking-widest block uppercase font-medium hidden sm:block">
                  Electronics Store
                </span>
              </div>
            </button>
          </div>

          {/* Center: Search Bar with Autocomplete */}
          <div ref={searchContainerRef} className="flex-1 max-w-xl relative hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search products, brands, chips, models..."
                className="w-full h-9 sm:h-10 pl-9 sm:pl-10 pr-20 rounded-xl bg-[#1D1D1F] border border-neutral-700 text-white placeholder-neutral-400 text-xs focus:outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/20 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-16 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 text-xs"
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-[#FF6A00] hover:bg-[#E85D00] text-white text-[11px] font-semibold flex items-center justify-center transition-colors shadow-xs"
              >
                Search
              </button>
            </form>

            {/* Search Dropdown / Live Results Preview */}
            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1C] border border-neutral-750 rounded-2xl shadow-2xl p-4 z-50 text-neutral-200 backdrop-blur-xl"
                >
                  {/* If there is active search typing */}
                  {searchQuery.trim() ? (
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-xs text-neutral-400">
                        <span>Matching Products ({searchResults.length})</span>
                        <button
                          onClick={() => handleSearchSubmit()}
                          className="text-[#FF6A00] hover:underline flex items-center gap-1 font-medium"
                        >
                          View all results <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {searchResults.length > 0 ? (
                        <div className="space-y-1">
                          {searchResults.map(product => (
                            <button
                              key={product.id}
                              onClick={() => handleSelectProductFromSearch(product)}
                              className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-800/80 transition-colors text-left group"
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg bg-neutral-900 shrink-0 border border-neutral-700"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate group-hover:text-[#FF6A00] transition-colors">
                                  {product.name}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                                  <span className="text-[#FF6A00] font-semibold">${product.price}</span>
                                  {product.originalPrice && (
                                    <span className="line-through text-neutral-500">${product.originalPrice}</span>
                                  )}
                                  <span>&bull;</span>
                                  <span>{product.brand}</span>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="py-6 text-center text-sm text-neutral-400">
                          <p>No direct matches found for "{searchQuery}"</p>
                          <p className="text-xs text-neutral-500 mt-1">Try keywords like 'laptop', 'iphone', 'sony', or 'oled'</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Default state with Recent Searches & Popular Tags */
                    <div className="space-y-4">
                      {recentSearches.length > 0 && (
                        <div>
                          <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                            <span className="font-semibold tracking-wide uppercase text-[11px] text-neutral-400">Recent Searches</span>
                            <button
                              onClick={() => {
                                setRecentSearches([]);
                                localStorage.removeItem('voltpulse_recent_searches');
                              }}
                              className="text-neutral-500 hover:text-neutral-300 text-[11px]"
                            >
                              Clear
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {recentSearches.map(term => (
                              <button
                                key={term}
                                onClick={() => handleQuickSearch(term)}
                                className="px-3 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs transition-colors flex items-center gap-1.5"
                              >
                                <span>{term}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <span className="font-semibold tracking-wide uppercase text-[11px] text-neutral-400 block mb-2">
                          Popular Categories
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {CATEGORIES_DATA.slice(0, 4).map(cat => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                setIsSearchFocused(false);
                                navigateToCategory(cat.id);
                              }}
                              className="flex items-center justify-between p-2 rounded-xl bg-neutral-800/50 hover:bg-neutral-800 text-xs text-neutral-300 hover:text-white transition-colors"
                            >
                              <span>{cat.name}</span>
                              <span className="text-neutral-500 font-mono text-[10px]">{cat.count} items</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Action Icons: Compare, Wishlist, Account, Cart */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Compare Trigger */}
            <button
              onClick={() => setIsCompareOpen(true)}
              className="relative p-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition-colors hidden sm:flex items-center gap-1 text-xs"
              title="Compare products"
            >
              <Scale className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#FF6A00] text-white text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition-colors flex items-center"
              title="Saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#FF6A00] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account Menu */}
            <div ref={accountMenuRef} className="relative">
              <button
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="p-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition-colors flex items-center gap-1 text-xs"
              >
                <User className="w-5 h-5" />
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 hidden lg:block" />
              </button>

              {isAccountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-[#1A1A1C] border border-neutral-750 rounded-2xl shadow-2xl py-2 z-50 text-neutral-200">
                  <div className="px-4 py-2 border-b border-neutral-800">
                    <p className="text-xs font-semibold text-white">David Miller</p>
                    <p className="text-[11px] text-neutral-400">pro.member@techvolt.io</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setCurrentRoute('orders');
                      setIsAccountMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs hover:bg-neutral-800 transition-colors text-left"
                  >
                    <Package className="w-4 h-4 text-[#FF6A00]" />
                    <span>My Orders &amp; Invoices</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsWishlistOpen(true);
                      setIsAccountMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs hover:bg-neutral-800 transition-colors text-left"
                  >
                    <Heart className="w-4 h-4 text-neutral-400" />
                    <span>Wishlist ({wishlist.length})</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsCompareOpen(true);
                      setIsAccountMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs hover:bg-neutral-800 transition-colors text-left"
                  >
                    <Scale className="w-4 h-4 text-neutral-400" />
                    <span>Compare Matrix ({compareList.length})</span>
                  </button>

                  <div className="border-t border-neutral-800 my-1"></div>

                  <button
                    onClick={() => setIsAccountMenuOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs hover:bg-red-950/40 text-neutral-400 hover:text-red-400 transition-colors text-left"
                  >
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#E85D00] text-white font-medium text-xs transition-all shadow-md shadow-[#FF6A00]/20 hover:scale-[1.02]"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-white" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-white text-[#FF6A00] text-[10px] font-extrabold flex items-center justify-center shadow-sm">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-semibold">
                ${cartSubtotal.toLocaleString()}
              </span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800/80 md:hidden transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Secondary Navigation Row (Desktop) */}
        <div className="hidden md:flex items-center justify-between border-t border-neutral-850 py-1.5 text-xs font-medium text-neutral-300">
          <div className="flex items-center gap-1 lg:gap-2">
            
            {/* Categories Mega Dropdown trigger */}
            <div ref={categoryMenuRef} className="relative">
              <button
                onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-850 hover:bg-neutral-800 text-white font-semibold transition-colors"
              >
                <Layers className="w-4 h-4 text-[#FF6A00]" />
                <span>All Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoriesDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-72 bg-[#1A1A1C] border border-neutral-750 rounded-2xl shadow-2xl p-2 z-50">
                  {CATEGORIES_DATA.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setIsCategoriesDropdownOpen(false);
                        navigateToCategory(cat.id);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-neutral-300 hover:bg-neutral-800 hover:text-[#FF6A00] transition-colors text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#FF6A00]/50" />
                        <span className="font-medium">{cat.name}</span>
                      </div>
                      <span className="text-[11px] text-neutral-500 font-mono">{cat.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setCurrentRoute('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                currentRoute === 'home'
                  ? 'text-[#FF6A00] font-semibold bg-neutral-850'
                  : 'hover:text-white hover:bg-neutral-850/50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => {
                setFilterState(prev => ({ ...prev, categories: [], searchQuery: '' }));
                setCurrentRoute('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                currentRoute === 'shop'
                  ? 'text-[#FF6A00] font-semibold bg-neutral-850'
                  : 'hover:text-white hover:bg-neutral-850/50'
              }`}
            >
              Shop All
            </button>

            <button
              onClick={() => {
                setFilterState(prev => ({ ...prev, onSaleOnly: true, searchQuery: '' }));
                setCurrentRoute('deals');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                currentRoute === 'deals'
                  ? 'text-[#FF6A00] font-semibold bg-neutral-850'
                  : 'hover:text-white hover:bg-neutral-850/50'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span>Flash Deals</span>
            </button>

            <button
              onClick={() => {
                setFilterState(prev => ({ ...prev, sortBy: 'newest', searchQuery: '' }));
                setCurrentRoute('new-arrivals');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                currentRoute === 'new-arrivals'
                  ? 'text-[#FF6A00] font-semibold bg-neutral-850'
                  : 'hover:text-white hover:bg-neutral-850/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>New Arrivals</span>
            </button>

            <button
              onClick={() => {
                setIsCompareOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-neutral-850/50 transition-colors"
            >
              Compare Matrix
            </button>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span className="text-[11px] text-neutral-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#18864B]"></span> 24h Dispatch Guaranteed
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#18181A] border-t border-neutral-800 px-4 py-4 space-y-4"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search all tech..."
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs placeholder-neutral-400"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  setCurrentRoute('home');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-neutral-850 text-left font-medium text-neutral-200"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentRoute('shop');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-neutral-850 text-left font-medium text-neutral-200"
              >
                Shop All
              </button>
              <button
                onClick={() => {
                  setCurrentRoute('deals');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-neutral-850 text-left font-medium text-[#FF6A00] flex items-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5" /> Flash Deals
              </button>
              <button
                onClick={() => {
                  setCurrentRoute('new-arrivals');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-neutral-850 text-left font-medium text-blue-400 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> New Arrivals
              </button>
            </div>

            <div>
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Browse Categories</p>
              <div className="grid grid-cols-2 gap-1.5">
                {CATEGORIES_DATA.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      navigateToCategory(cat.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="p-2 rounded-lg bg-neutral-900/60 text-left text-xs text-neutral-300 hover:text-white"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
