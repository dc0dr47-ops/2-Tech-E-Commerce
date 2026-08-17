import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { PROMO_SLIDES, CATEGORIES_DATA, PRODUCTS_DATA } from '../data/products';
import { getProductImage } from '../data/productImages';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Flame, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Hero: React.FC = () => {
  const { setCurrentRoute, setFilterState, navigateToCategory, openProductDetail } = useCart();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % PROMO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = PROMO_SLIDES[currentSlideIndex];

  const handleHeroCta = () => {
    setFilterState(prev => ({ ...prev, categories: slide.categoryTarget ? [slide.categoryTarget] : [], searchQuery: '' }));
    setCurrentRoute('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDealsCta = () => {
    setFilterState(prev => ({ ...prev, onSaleOnly: true, searchQuery: '' }));
    setCurrentRoute('deals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredProduct = PRODUCTS_DATA.find(p => p.id === 'prod-01');
  const featuredProductImage = featuredProduct ? getProductImage(featuredProduct.id, featuredProduct.imageUrl) : '';

  const HERO_PRODUCT_BY_CATEGORY: Record<string, string> = {
    Phones: 'prod-01',
    Laptops: 'prod-03',
    Audio: 'prod-02',
    Smartwatch: 'prod-04',
    Gaming: 'prod-05',
    Cameras: 'prod-06',
    Speakers: 'prod-07',
    Accessories: 'prod-08',
  };
  const heroProductId = slide.categoryTarget ? HERO_PRODUCT_BY_CATEGORY[slide.categoryTarget] : undefined;
  const heroProduct = heroProductId ? PRODUCTS_DATA.find(p => p.id === heroProductId) : undefined;
  const heroImage = heroProduct ? getProductImage(heroProduct.id, heroProduct.imageUrl) : slide.imageUrl;

  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4">
      <div className="hero-viewport grid grid-cols-1 md:grid-cols-12 gap-3 lg:gap-4 xl:gap-5 items-stretch">
        <div className="hidden lg:flex lg:col-span-3 bg-white rounded-2xl border border-neutral-200/90 p-3 xl:p-4 shadow-sm flex-col justify-between overflow-hidden">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-neutral-100 shrink-0">
              <span className="font-bold text-xs uppercase tracking-wider text-neutral-800 flex items-center gap-1.5 font-['Space_Grotesk']"><Zap className="w-3.5 h-3.5 text-[#FF6A00]" /> Departments</span>
              <span className="text-[10px] text-neutral-400 font-mono">8 Categories</span>
            </div>
            <div className="flex-1 flex flex-col justify-between min-h-0 space-y-0.5 overflow-hidden">
              {CATEGORIES_DATA.map(cat => (
                <button key={cat.id} onClick={() => navigateToCategory(cat.id)} className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-xs text-neutral-700 hover:text-[#FF6A00] hover:bg-[#F7F7F5] transition-colors text-left group shrink-0">
                  <span className="font-medium truncate group-hover:translate-x-0.5 transition-transform text-[11px] xl:text-xs">{cat.name}</span>
                  <span className="text-[10px] text-neutral-400 font-mono group-hover:text-[#FF6A00] ml-2 shrink-0">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="pt-2 mt-2 border-t border-neutral-100 shrink-0">
            <div className="p-2.5 rounded-xl bg-neutral-900 text-white text-xs">
              <div className="flex items-center justify-between"><div className="flex items-center gap-1 text-[#FF6A00] font-semibold text-[11px]"><Flame className="w-3 h-3" /> Member Code</div><span className="font-mono font-bold bg-neutral-800 px-1.5 py-0.5 rounded text-[10px] text-[#FF6A00]">TECH20</span></div>
              <p className="text-neutral-300 font-medium text-[11px] mt-1 truncate">Extra 10% off at checkout</p>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-7 lg:col-span-6 rounded-2xl bg-[#0F0F11] text-white overflow-hidden relative flex flex-col justify-between p-4 sm:p-6 lg:p-7 shadow-xl border border-neutral-800">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-25 blur-3xl pointer-events-none transition-colors duration-1000" style={{ backgroundColor: slide.accentColor }} />
          <div className="relative z-10 flex items-center justify-between shrink-0 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[11px] sm:text-xs font-semibold text-white backdrop-blur-md border border-white/10"><Sparkles className="w-3 h-3 text-[#FF6A00]" /><span>{slide.highlightBadge}</span></span>
            <div className="flex items-center gap-1.5">{PROMO_SLIDES.map((_, idx) => <button key={idx} onClick={() => setCurrentSlideIndex(idx)} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlideIndex ? 'w-5 sm:w-6 bg-[#FF6A00]' : 'w-1.5 sm:w-2 bg-neutral-600 hover:bg-neutral-400'}`} aria-label={`Go to slide ${idx + 1}`} />)}</div>
          </div>

          <div className="relative z-10 flex-1 flex flex-col justify-center py-2 sm:py-3 min-h-0">
            <AnimatePresence mode="wait">
              <motion.div key={slide.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(300px,1.08fr)] items-center gap-5 lg:gap-7 h-full min-h-0">
                <div className="min-w-0 flex h-full flex-col justify-center py-2 lg:py-4">
                  <span className="text-[10px] sm:text-xs font-bold tracking-[0.16em] uppercase text-[#FF6A00] mb-2">{slide.tag}</span>
                  <h1 className="text-[clamp(1.45rem,3.2vw,2.25rem)] font-extrabold tracking-tight text-white leading-[1.1] font-['Space_Grotesk'] max-w-[22ch]">{slide.title}</h1>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-[46ch] mt-3 sm:mt-4">{slide.description}</p>
                  <div className="flex flex-wrap items-center gap-2.5 pt-4 sm:pt-5 mt-auto lg:mt-5">
                    <button onClick={handleHeroCta} className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#FF6A00] hover:bg-[#E85D00] text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-[#FF6A00]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95"><span>{slide.ctaText}</span><ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
                    <button onClick={handleDealsCta} className="inline-flex px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-colors backdrop-blur-sm border border-white/10 cursor-pointer">{slide.secondaryCta}</button>
                  </div>
                </div>

                <div className="hidden lg:flex relative h-full min-h-[230px] max-h-[340px] items-center justify-center rounded-[1.4rem] overflow-hidden bg-gradient-to-br from-white/[0.055] via-white/[0.02] to-transparent border border-white/[0.07] p-5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,106,0,0.10),transparent_58%)] pointer-events-none" />
                  <img src={heroImage} alt={slide.featuredProduct || slide.title} loading="eager" decoding="async" className="relative z-10 block h-full w-full max-h-full max-w-full object-contain object-center mix-blend-multiply drop-shadow-[0_28px_45px_rgba(0,0,0,0.65)] transition-transform duration-500 hover:scale-[1.025]" />
                </div>

                <div className="lg:hidden my-2 flex items-center justify-center relative h-[clamp(100px,20svh,150px)] rounded-2xl overflow-hidden p-3">
                  <img src={heroImage} alt={slide.featuredProduct || slide.title} loading="eager" decoding="async" className="h-full w-full object-contain object-center mix-blend-multiply drop-shadow-2xl" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 flex items-center justify-between pt-2.5 sm:pt-3 border-t border-white/10 text-[11px] sm:text-xs text-neutral-400 shrink-0">
            <div className="flex items-center gap-1.5 min-w-0"><ShieldCheck className="w-3.5 h-3.5 text-[#18864B] shrink-0" /><span className="truncate">2-Year Official Manufacturer Warranty</span></div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button onClick={() => setCurrentSlideIndex(prev => (prev - 1 + PROMO_SLIDES.length) % PROMO_SLIDES.length)} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Previous slide"><ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
              <button onClick={() => setCurrentSlideIndex(prev => (prev + 1) % PROMO_SLIDES.length)} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Next slide"><ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:col-span-5 lg:col-span-3 bg-gradient-to-b from-[#18181A] to-[#121214] rounded-2xl border border-neutral-800 p-4 lg:p-5 text-white flex-col justify-between shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#FF6A00]/15 rounded-full blur-2xl pointer-events-none" />
          <div className="shrink-0">
            <div className="flex items-center justify-between text-xs mb-1.5"><span className="px-2 py-0.5 rounded-md bg-[#FF6A00] text-white font-bold text-[10px] tracking-wide">HOT PRODUCT</span><span className="text-[#FF8A00] font-semibold text-[11px]">★★★★★ 4.9</span></div>
            <h3 className="font-bold text-sm lg:text-base text-white font-['Space_Grotesk'] leading-snug line-clamp-1">Titanium Phone 16 Pro Max</h3>
            <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">A18 Pro Silicon &bull; 48MP Quad Camera</p>
          </div>
          <div className="flex-1 my-2 relative flex items-center justify-center min-h-0 overflow-hidden rounded-xl bg-white/[0.02]">
            <img src={featuredProductImage} alt="Titanium iPhone 16 Pro Max" loading="eager" decoding="async" className="h-[clamp(150px,24vh,220px)] w-[clamp(150px,90%,240px)] max-h-full max-w-full object-contain object-center p-2 group-hover:scale-[1.025] transition-transform duration-300 drop-shadow-[0_24px_36px_rgba(0,0,0,0.6)]" />
          </div>
          <div className="shrink-0 pt-2 border-t border-neutral-800/80">
            <div className="flex items-baseline justify-between mb-2"><div><span className="text-[10px] text-neutral-400 block">Starting at</span><div className="flex items-baseline gap-1.5"><span className="text-base lg:text-lg font-extrabold text-white">$1,199</span><span className="text-[11px] text-neutral-500 line-through">$1,299</span></div></div><span className="text-[10px] font-semibold text-[#18864B] bg-[#18864B]/20 px-2 py-0.5 rounded">Save $100</span></div>
            <button onClick={() => { if (featuredProduct) openProductDetail(featuredProduct); }} className="w-full py-2 rounded-xl bg-white text-neutral-900 hover:bg-[#FF6A00] hover:text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-98">View Product Specs <ArrowRight className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      </div>
    </section>
  );
};