import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS_DATA } from '../data/products';
import { ProductCard } from './ProductCard';
import { Flame, Clock, ArrowRight, Sparkles } from 'lucide-react';

export const FlashSale: React.FC = () => {
  const { setCurrentRoute, setFilterState } = useCart();

  // 3 days, 22 hours, 19 mins, 56 secs from now countdown
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 3,
    hours: 22,
    minutes: 19,
    seconds: 56,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = PRODUCTS_DATA.filter(p => p.isFlashSale).slice(0, 8);

  const handleViewAllDeals = () => {
    setFilterState(prev => ({
      ...prev,
      onSaleOnly: true,
      searchQuery: '',
    }));
    setCurrentRoute('deals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const padZero = (n: number) => n.toString().padStart(2, '0');

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-10">
      {/* Section Top Header with Countdown Bar */}
      <div className="bg-gradient-to-r from-[#18181A] via-[#1F1F23] to-[#18181A] text-white rounded-2xl p-4 sm:p-6 lg:p-7 mb-4 sm:mb-6 border border-neutral-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
        
        {/* Title and Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FF6A00] text-white flex items-center justify-center shadow-lg shadow-[#FF6A00]/25 shrink-0">
              <Flame className="w-5 h-5 fill-current animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-[#FF6A00]">Limited Time</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#18864B]"></span>
                <span className="text-[10px] text-neutral-400">Live Inventory</span>
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
                Flash Sale
              </h2>
            </div>
          </div>

          <div className="h-7 w-px bg-neutral-750 hidden sm:block mx-1" />

          {/* Dynamic Countdown Display */}
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-neutral-400 hidden lg:block" />
            <span className="text-xs text-neutral-400 font-medium hidden sm:inline">Ends in</span>

            <div className="flex items-center gap-1 font-mono text-xs sm:text-sm font-bold">
              <div className="flex flex-col items-center">
                <span className="bg-[#2A2A2E] text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-neutral-700 min-w-[30px] sm:min-w-[34px] text-center shadow-inner">
                  {padZero(timeLeft.days)}
                </span>
                <span className="text-[8px] sm:text-[9px] text-neutral-400 mt-0.5 uppercase tracking-wider">Days</span>
              </div>
              <span className="text-neutral-500 font-bold -mt-2.5">:</span>
              <div className="flex flex-col items-center">
                <span className="bg-[#2A2A2E] text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-neutral-700 min-w-[30px] sm:min-w-[34px] text-center shadow-inner">
                  {padZero(timeLeft.hours)}
                </span>
                <span className="text-[8px] sm:text-[9px] text-neutral-400 mt-0.5 uppercase tracking-wider">Hours</span>
              </div>
              <span className="text-neutral-500 font-bold -mt-2.5">:</span>
              <div className="flex flex-col items-center">
                <span className="bg-[#2A2A2E] text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-neutral-700 min-w-[30px] sm:min-w-[34px] text-center shadow-inner">
                  {padZero(timeLeft.minutes)}
                </span>
                <span className="text-[8px] sm:text-[9px] text-neutral-400 mt-0.5 uppercase tracking-wider">Mins</span>
              </div>
              <span className="text-neutral-500 font-bold -mt-2.5">:</span>
              <div className="flex flex-col items-center">
                <span className="bg-[#FF6A00] text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg min-w-[30px] sm:min-w-[34px] text-center shadow-md">
                  {padZero(timeLeft.seconds)}
                </span>
                <span className="text-[8px] sm:text-[9px] text-neutral-400 mt-0.5 uppercase tracking-wider">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* View All Deals Button */}
        <div>
          <button
            onClick={handleViewAllDeals}
            className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#E85D00] text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-[#FF6A00]/20 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer group"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 4-Column Product Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {flashProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            showFlashProgress={true}
          />
        ))}
      </div>
    </section>
  );
};
