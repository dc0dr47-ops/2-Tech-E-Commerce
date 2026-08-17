import React from 'react';
import { useCart } from '../context/CartContext';
import { ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export const EditorialBanners: React.FC = () => {
  const { navigateToCategory, setCurrentRoute, setFilterState } = useCart();

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* Large Primary Editorial Block */}
        <div className="lg:col-span-7 bg-[#0A0A0C] text-white rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-9 lg:p-10 relative flex flex-col justify-between min-h-[340px] sm:min-h-[380px] border border-neutral-800 shadow-2xl group">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6A00]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Background Imagery / Device Display */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 hidden sm:flex items-center justify-end pr-4 pointer-events-none opacity-90 group-hover:scale-105 transition-transform duration-500">
            <img
              src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80"
              alt="Flagship Smartphone"
              className="max-h-72 object-contain drop-shadow-2xl"
            />
          </div>

          <div className="relative z-10 max-w-sm">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF6A00]/20 text-[#FF6A00] text-[11px] font-bold uppercase tracking-wider mb-3 border border-[#FF6A00]/30">
              <Sparkles className="w-3 h-3" /> Next-Gen Optics
            </span>

            <h3 className="text-xl sm:text-3xl font-extrabold font-['Space_Grotesk'] leading-tight text-white">
              Studio Power in Your Pocket.
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 mt-2.5 leading-relaxed">
              Explore 48MP ProRaw cameras, 5x telephoto periscopes, and 3nm processors built for high-demand creators.
            </p>
          </div>

          <div className="relative z-10 pt-4 sm:pt-6">
            <button
              onClick={() => navigateToCategory('Phones')}
              className="px-5 py-2.5 sm:py-3 rounded-xl bg-[#FF6A00] hover:bg-[#E85D00] text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-[#FF6A00]/25 flex items-center gap-2 cursor-pointer group-hover:gap-3"
            >
              <span>Explore Flagship Phones</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Right 2 Stacked Editorial Cards */}
        <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
          
          {/* Top Right Card: Studio Audio */}
          <div className="bg-gradient-to-r from-[#18181A] to-[#222226] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex items-center justify-between border border-neutral-800 shadow-xl overflow-hidden relative group">
            <div className="max-w-[62%] z-10">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#FF8A00] uppercase tracking-wider block mb-1">
                Acoustic Perfection
              </span>
              <h4 className="text-base sm:text-lg font-bold font-['Space_Grotesk'] leading-snug">
                Studio ANC Headphones
              </h4>
              <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                Up to 40h high-res playback
              </p>
              <button
                onClick={() => navigateToCategory('Audio')}
                className="mt-3 text-xs font-bold text-[#FF6A00] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Shop Audio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="w-28 h-28 sm:w-32 sm:h-32 relative flex items-center justify-center shrink-0">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"
                alt="Headphones"
                className="h-24 sm:h-28 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-xl"
              />
            </div>
          </div>

          {/* Bottom Right Card: High-Performance Laptops */}
          <div className="bg-gradient-to-r from-[#18181A] to-[#1D2026] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex items-center justify-between border border-neutral-800 shadow-xl overflow-hidden relative group">
            <div className="max-w-[62%] z-10">
              <span className="text-[10px] sm:text-[11px] font-bold text-blue-400 uppercase tracking-wider block mb-1">
                Pro Workstations
              </span>
              <h4 className="text-base sm:text-lg font-bold font-['Space_Grotesk'] leading-snug">
                M3 &amp; RTX Ultra Laptops
              </h4>
              <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                Engineered for 8K rendering
              </p>
              <button
                onClick={() => navigateToCategory('Laptops')}
                className="mt-3 text-xs font-bold text-blue-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Explore Computers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="w-28 h-28 sm:w-32 sm:h-32 relative flex items-center justify-center shrink-0">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"
                alt="Laptop"
                className="h-24 sm:h-28 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-xl"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
