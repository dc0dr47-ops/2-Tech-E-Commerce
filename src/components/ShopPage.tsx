import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS_DATA } from '../data/products';
import { ProductCard } from './ProductCard';
import { FilterSidebar } from './FilterSidebar';
import { ViewMode } from '../types';
import {
  LayoutGrid,
  List,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  ArrowUpDown,
  Search,
  RotateCcw,
  Flame,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ShopPage: React.FC = () => {
  const { filterState, setFilterState, resetFilters, setCurrentRoute } = useCart();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter(product => {
      // Search query
      if (filterState.searchQuery) {
        const query = filterState.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesTags = product.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesCategory && !matchesTags) return false;
      }

      // Categories
      if (filterState.categories.length > 0) {
        if (!filterState.categories.includes(product.category)) return false;
      }

      // Brands
      if (filterState.brands.length > 0) {
        if (!filterState.brands.includes(product.brand)) return false;
      }

      // Price
      if (product.price < filterState.minPrice || product.price > filterState.maxPrice) {
        return false;
      }

      // Rating
      if (filterState.minRating > 0 && product.rating < filterState.minRating) {
        return false;
      }

      // In Stock
      if (filterState.inStockOnly && !product.inStock) {
        return false;
      }

      // On Sale
      if (filterState.onSaleOnly && (!product.originalPrice || product.originalPrice <= product.price)) {
        return false;
      }

      // Free Shipping
      if (filterState.freeShippingOnly && !product.freeShipping) {
        return false;
      }

      // Discount Threshold
      if (filterState.discountThreshold !== null) {
        if (!product.discountPercent || product.discountPercent < filterState.discountThreshold) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (filterState.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        case 'discount':
          return (b.discountPercent || 0) - (a.discountPercent || 0);
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [filterState]);

  const activeCategoryTitle =
    filterState.categories.length === 1
      ? filterState.categories[0]
      : filterState.onSaleOnly
      ? 'Special Deals & Flash Sales'
      : filterState.searchQuery
      ? `Results for "${filterState.searchQuery}"`
      : 'All Electronics';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
        <button
          onClick={() => {
            setCurrentRoute('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="hover:text-[#FF6A00] transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <button
          onClick={() => {
            resetFilters();
            setCurrentRoute('shop');
          }}
          className="hover:text-[#FF6A00] transition-colors"
        >
          Electronics
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="font-semibold text-neutral-900">{activeCategoryTitle}</span>
      </nav>

      {/* Top Title & Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-['Space_Grotesk'] tracking-tight">
            {activeCategoryTitle}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Showing <strong className="text-neutral-900">{filteredProducts.length}</strong> items available with 2-day express dispatch
          </p>
        </div>

        {/* Controls: Mobile Filter Button, Sort Dropdown, Grid/List switcher */}
        <div className="flex items-center gap-3 flex-wrap">
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#FF6A00]" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-neutral-100/80 rounded-xl px-3 py-1.5 border border-neutral-200/80 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-neutral-500 hidden sm:inline">Sort by:</span>
            <select
              value={filterState.sortBy}
              onChange={e =>
                setFilterState(prev => ({
                  ...prev,
                  sortBy: e.target.value as any,
                }))
              }
              aria-label="Sort products by"
              className="bg-transparent font-semibold text-neutral-900 focus:outline-none cursor-pointer text-xs"
            >
              <option value="featured">Featured &amp; Recommended</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Savings</option>
            </select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="hidden sm:flex items-center bg-neutral-100 rounded-xl p-1 border border-neutral-200/80">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white shadow-xs text-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white shadow-xs text-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Listing Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar (3 columns) */}
        <div className="hidden lg:block lg:col-span-3">
          <FilterSidebar />
        </div>

        {/* Product Grid Area (9 columns) */}
        <div className="lg:col-span-9">
          {filteredProducts.length > 0 ? (
            <div>
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>

              {/* Bottom Pagination & Count Bar */}
              <div className="mt-12 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
                <p>
                  Showing <strong>{filteredProducts.length}</strong> of <strong>{PRODUCTS_DATA.length}</strong> total products
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-neutral-900 text-white font-semibold">1</span>
                  <span className="px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-400 font-semibold cursor-not-allowed">2</span>
                </div>
              </div>
            </div>
          ) : (
            /* Empty Search/Filter Results State */
            <div className="bg-[#F7F7F5] rounded-3xl border border-neutral-200 p-12 text-center max-w-lg mx-auto my-8">
              <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center mx-auto mb-4 text-neutral-400 shadow-sm">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 font-['Space_Grotesk']">
                No products match your filters
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xs mx-auto">
                Try widening your price range or clearing active filters to browse all tech items.
              </p>
              <button
                onClick={resetFilters}
                className="mt-5 px-6 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#E85D00] text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Mobile Slide-in Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl z-50 p-4"
            >
              <FilterSidebar
                isMobileDrawer={true}
                onClose={() => setIsMobileFilterOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
