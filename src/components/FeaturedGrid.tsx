import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS_DATA } from '../data/products';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export const FeaturedGrid: React.FC = () => {
  const { setCurrentRoute, setFilterState } = useCart();
  const [activeTab, setActiveTab] = useState<'all' | 'Phones' | 'Laptops' | 'Audio' | 'Gaming'>('all');

  const filtered = PRODUCTS_DATA.filter(p => {
    if (activeTab === 'all') return p.isFeatured || p.rating >= 4.8;
    return p.category === activeTab;
  }).slice(0, 8);

  const handleViewAll = () => {
    if (activeTab !== 'all') {
      setFilterState(prev => ({ ...prev, categories: [activeTab], searchQuery: '' }));
    } else {
      setFilterState(prev => ({ ...prev, categories: [], searchQuery: '' }));
    }
    setCurrentRoute('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-10">
      {/* Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 pb-3 border-b border-neutral-200 gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6A00] mb-0.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Hardware</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-neutral-900 font-['Space_Grotesk'] tracking-tight">
            Trending &amp; Best Sellers
          </h2>
        </div>

        {/* Tab Pills with horizontal scroll on mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
          {[
            { id: 'all', label: 'All Curations' },
            { id: 'Phones', label: 'Smartphones' },
            { id: 'Laptops', label: 'Computers' },
            { id: 'Audio', label: 'Audio' },
            { id: 'Gaming', label: 'Gaming' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4-Column Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Explore Full Catalog Banner Button */}
      <div className="mt-6 sm:mt-8 text-center">
        <button
          onClick={handleViewAll}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#F7F7F5] hover:bg-neutral-200/80 border border-neutral-300 text-neutral-900 text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer group"
        >
          <span>Explore Entire Catalog ({PRODUCTS_DATA.length}+ items)</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
