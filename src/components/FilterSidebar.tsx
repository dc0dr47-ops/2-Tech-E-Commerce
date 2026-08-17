import React from 'react';
import { useCart } from '../context/CartContext';
import { CATEGORIES_DATA, PRODUCTS_DATA } from '../data/products';
import { Filter, Star, Check, RotateCcw, X, DollarSign, Tag, CheckSquare, Square } from 'lucide-react';

interface FilterSidebarProps {
  isMobileDrawer?: boolean;
  onClose?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isMobileDrawer = false,
  onClose,
}) => {
  const { filterState, setFilterState, resetFilters } = useCart();

  // Extract unique brands from dataset
  const allBrands = Array.from(new Set(PRODUCTS_DATA.map(p => p.brand))).sort();

  const handleCategoryToggle = (catId: string) => {
    setFilterState(prev => {
      const exists = prev.categories.includes(catId);
      const updated = exists
        ? prev.categories.filter(c => c !== catId)
        : [...prev.categories, catId];
      return { ...prev, categories: updated };
    });
  };

  const handleBrandToggle = (brand: string) => {
    setFilterState(prev => {
      const exists = prev.brands.includes(brand);
      const updated = exists
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands: updated };
    });
  };

  const handleMinPriceChange = (val: number) => {
    setFilterState(prev => ({ ...prev, minPrice: Math.max(0, val) }));
  };

  const handleMaxPriceChange = (val: number) => {
    setFilterState(prev => ({ ...prev, maxPrice: Math.max(prev.minPrice, val) }));
  };

  const handleRatingSelect = (rating: number) => {
    setFilterState(prev => ({
      ...prev,
      minRating: prev.minRating === rating ? 0 : rating,
    }));
  };

  const handleDiscountSelect = (threshold: number) => {
    setFilterState(prev => ({
      ...prev,
      discountThreshold: prev.discountThreshold === threshold ? null : threshold,
    }));
  };

  const hasActiveFilters =
    filterState.categories.length > 0 ||
    filterState.brands.length > 0 ||
    filterState.minPrice > 0 ||
    filterState.maxPrice < 4000 ||
    filterState.minRating > 0 ||
    filterState.inStockOnly ||
    filterState.onSaleOnly ||
    filterState.freeShippingOnly ||
    filterState.discountThreshold !== null ||
    filterState.searchQuery !== '';

  return (
    <aside
      className={`bg-white rounded-2xl border border-neutral-200/90 p-5 ${
        isMobileDrawer ? 'h-full overflow-y-auto' : 'sticky top-28'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200">
        <div className="flex items-center gap-2 font-bold text-sm text-neutral-900 font-['Space_Grotesk']">
          <Filter className="w-4 h-4 text-[#FF6A00]" />
          <span>Filters</span>
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-neutral-500 hover:text-[#FF6A00] flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
          {isMobileDrawer && onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-neutral-500 hover:text-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="mb-5 pb-4 border-b border-neutral-100">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
            Active Filters
          </span>
          <div className="flex flex-wrap gap-1.5">
            {filterState.searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-medium">
                "{filterState.searchQuery}"
                <button
                  onClick={() => setFilterState(prev => ({ ...prev, searchQuery: '' }))}
                  className="hover:text-[#FF6A00]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterState.categories.map(c => (
              <span
                key={c}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FF6A00]/10 text-[#FF6A00] text-xs font-medium"
              >
                {c}
                <button onClick={() => handleCategoryToggle(c)} className="hover:text-neutral-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filterState.brands.map(b => (
              <span
                key={b}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-medium"
              >
                {b}
                <button onClick={() => handleBrandToggle(b)} className="hover:text-[#FF6A00]">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filterState.onSaleOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-medium">
                On Sale
                <button
                  onClick={() => setFilterState(prev => ({ ...prev, onSaleOnly: false }))}
                  className="hover:text-amber-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterState.minRating > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-medium">
                {filterState.minRating}★ &amp; Up
                <button
                  onClick={() => setFilterState(prev => ({ ...prev, minRating: 0 }))}
                  className="hover:text-amber-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Filter Sections Container */}
      <div className="space-y-6 text-xs text-neutral-700">
        
        {/* Category Facet */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-3 font-['Space_Grotesk']">
            Categories
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {CATEGORIES_DATA.map(cat => {
              const checked = filterState.categories.includes(cat.id);
              return (
                <label
                  key={cat.id}
                  className="flex items-center justify-between p-1.5 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleCategoryToggle(cat.id)}
                      className="w-4 h-4 rounded text-[#FF6A00] focus:ring-[#FF6A00] accent-[#FF6A00]"
                    />
                    <span className={`font-medium ${checked ? 'text-[#FF6A00]' : 'text-neutral-700'}`}>
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono">{cat.count}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Brand Facet */}
        <div className="pt-4 border-t border-neutral-100">
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-3 font-['Space_Grotesk']">
            Brand
          </h4>
          <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
            {allBrands.map(brand => {
              const checked = filterState.brands.includes(brand);
              const count = PRODUCTS_DATA.filter(p => p.brand === brand).length;
              return (
                <label
                  key={brand}
                  className="flex items-center justify-between p-1.5 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleBrandToggle(brand)}
                      className="w-4 h-4 rounded text-[#FF6A00] focus:ring-[#FF6A00] accent-[#FF6A00]"
                    />
                    <span className={`font-medium ${checked ? 'text-[#FF6A00]' : 'text-neutral-700'}`}>
                      {brand}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono">{count}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Price Range Facet */}
        <div className="pt-4 border-t border-neutral-100">
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-3 font-['Space_Grotesk']">
            Price Range ($)
          </h4>
          
          {/* Dual Range Inputs */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <span className="text-[10px] text-neutral-400 block mb-1">Min ($)</span>
              <input
                type="number"
                value={filterState.minPrice}
                onChange={e => handleMinPriceChange(Number(e.target.value))}
                min={0}
                max={filterState.maxPrice}
                step={50}
                className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-900 focus:outline-none focus:border-[#FF6A00]"
              />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block mb-1">Max ($)</span>
              <input
                type="number"
                value={filterState.maxPrice}
                onChange={e => handleMaxPriceChange(Number(e.target.value))}
                min={filterState.minPrice}
                max={4000}
                step={50}
                className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-900 focus:outline-none focus:border-[#FF6A00]"
              />
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={4000}
            step={50}
            value={filterState.maxPrice}
            onChange={e => handleMaxPriceChange(Number(e.target.value))}
            className="w-full accent-[#FF6A00] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
            <span>$0</span>
            <span>$2,000</span>
            <span>$4,000+</span>
          </div>
        </div>

        {/* Customer Rating Facet */}
        <div className="pt-4 border-t border-neutral-100">
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-3 font-['Space_Grotesk']">
            Customer Rating
          </h4>
          <div className="space-y-1.5">
            {[4.8, 4.5, 4.0].map(star => {
              const isSelected = filterState.minRating === star;
              return (
                <button
                  key={star}
                  onClick={() => handleRatingSelect(star)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer ${
                    isSelected ? 'bg-amber-50 border border-amber-200' : 'hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-[#FF8A00]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(star) ? 'fill-current' : 'text-neutral-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-xs text-neutral-800">{star} &amp; Up</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#FF6A00]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Discount Thresholds */}
        <div className="pt-4 border-t border-neutral-100">
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-3 font-['Space_Grotesk']">
            Discount Threshold
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {[10, 20, 30, 50].map(disc => {
              const active = filterState.discountThreshold === disc;
              return (
                <button
                  key={disc}
                  onClick={() => handleDiscountSelect(disc)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-colors ${
                    active
                      ? 'border-[#FF6A00] bg-[#FF6A00]/10 text-[#FF6A00]'
                      : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  {disc}%+ Off
                </button>
              );
            })}
          </div>
        </div>

        {/* Special Flags Checkboxes */}
        <div className="pt-4 border-t border-neutral-100 space-y-2.5">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={filterState.inStockOnly}
              onChange={e => setFilterState(prev => ({ ...prev, inStockOnly: e.target.checked }))}
              className="w-4 h-4 rounded text-[#FF6A00] focus:ring-[#FF6A00] accent-[#FF6A00]"
            />
            <span className="font-medium text-neutral-800">In Stock Only</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={filterState.onSaleOnly}
              onChange={e => setFilterState(prev => ({ ...prev, onSaleOnly: e.target.checked }))}
              className="w-4 h-4 rounded text-[#FF6A00] focus:ring-[#FF6A00] accent-[#FF6A00]"
            />
            <span className="font-medium text-neutral-800">On Sale / Special Deals</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={filterState.freeShippingOnly}
              onChange={e => setFilterState(prev => ({ ...prev, freeShippingOnly: e.target.checked }))}
              className="w-4 h-4 rounded text-[#FF6A00] focus:ring-[#FF6A00] accent-[#FF6A00]"
            />
            <span className="font-medium text-neutral-800">Free Express Shipping</span>
          </label>
        </div>

      </div>

      {isMobileDrawer && onClose && (
        <div className="mt-6 pt-4 border-t border-neutral-200">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#FF6A00] hover:bg-[#E85D00] text-white font-bold text-xs shadow-md"
          >
            Apply Filters
          </button>
        </div>
      )}
    </aside>
  );
};
