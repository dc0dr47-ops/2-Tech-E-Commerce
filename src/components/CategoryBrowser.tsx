import React from 'react';
import { useCart } from '../context/CartContext';
import { CATEGORIES_DATA } from '../data/products';
import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Gamepad2,
  Camera,
  Speaker,
  Cpu,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const CategoryBrowser: React.FC = () => {
  const { navigateToCategory } = useCart();

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'Phones':
        return Smartphone;
      case 'Laptops':
        return Laptop;
      case 'Audio':
        return Headphones;
      case 'Smartwatch':
        return Watch;
      case 'Gaming':
        return Gamepad2;
      case 'Cameras':
        return Camera;
      case 'Speakers':
        return Speaker;
      case 'Accessories':
      default:
        return Cpu;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 pb-3 border-b border-neutral-200 gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6A00] mb-0.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Departments</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-neutral-900 font-['Space_Grotesk'] tracking-tight">
            Browse By Category
          </h2>
        </div>
        <p className="text-xs text-neutral-500 sm:text-right max-w-md hidden sm:block">
          Explore pro-grade electronics, mobile devices, studio audio, and creative computing hardware.
        </p>
      </div>

      {/* Grid of Category Cards */}
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 lg:gap-4">
        {CATEGORIES_DATA.map(category => {
          const Icon = getCategoryIcon(category.id);
          return (
            <button
              key={category.id}
              onClick={() => navigateToCategory(category.id)}
              className="bg-white hover:bg-[#F7F7F5] rounded-xl sm:rounded-2xl border border-neutral-200/90 hover:border-[#FF6A00] p-2.5 sm:p-3.5 lg:p-4 flex flex-col items-center justify-center text-center transition-all duration-200 hover:shadow-md group cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#F7F7F5] group-hover:bg-[#FF6A00] text-neutral-700 group-hover:text-white flex items-center justify-center mb-1.5 sm:mb-2.5 transition-colors duration-200 shadow-xs">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-[11px] sm:text-xs font-bold text-neutral-900 group-hover:text-[#FF6A00] transition-colors leading-tight line-clamp-1">
                {category.name}
              </h3>
              <span className="text-[9px] sm:text-[10px] text-neutral-400 mt-0.5 font-mono">
                {category.count} items
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
