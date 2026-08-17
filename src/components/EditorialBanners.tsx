import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductImage } from '../data/productImages';

export const EditorialBanners: React.FC = () => {
  const { navigateToCategory } = useCart();
  const phoneImage = getProductImage('prod-01', '');
  const headphonesImage = getProductImage('prod-02', '');
  const laptopImage = getProductImage('prod-03', '');

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
        <article className="lg:col-span-7 relative min-h-[390px] sm:min-h-[430px] lg:min-h-[500px] overflow-hidden rounded-[28px] border border-white/10 bg-[#08090b] text-white shadow-[0_24px_70px_rgba(0,0,0,0.16)] group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_38%,rgba(255,106,0,0.20),transparent_28%),radial-gradient(circle_at_70%_18%,rgba(31,111,235,0.18),transparent_30%),linear-gradient(135deg,#08090b_0%,#101216_54%,#15100d_100%)]" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute inset-y-0 right-0 w-[56%] bg-gradient-to-l from-black/10 via-black/5 to-transparent" />
          <div className="absolute right-[7%] top-[10%] h-[68%] w-[43%] rounded-[24px] border border-white/10 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
          <div className="absolute right-[4%] bottom-[7%] z-10 flex h-[72%] w-[48%] items-end justify-center pointer-events-none">
            <img src={phoneImage} alt="Titanium Phone 16 Pro Max" className="max-h-full max-w-full object-contain drop-shadow-[0_28px_45px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-out group-hover:scale-[1.04] group-hover:-translate-y-1" />
          </div>
          <div className="relative z-20 flex h-full min-h-[390px] sm:min-h-[430px] lg:min-h-[500px] flex-col justify-between p-6 sm:p-9 lg:p-10">
            <div className="max-w-[56%] lg:max-w-[55%]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-orange-300 shadow-[0_0_24px_rgba(255,106,0,0.08)]"><Sparkles className="h-3 w-3" /> Next-Gen Optics</span>
              <h3 className="mt-5 font-['Space_Grotesk'] text-[clamp(2rem,3.5vw,3.35rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-white">Studio Power in Your Pocket.</h3>
              <p className="mt-4 max-w-[31rem] text-sm sm:text-[15px] leading-6 text-white/65">Explore 48MP ProRaw cameras, 5x telephoto periscopes, and 3nm processors built for high-demand creators.</p>
            </div>
            <button onClick={() => navigateToCategory('Phones')} className="inline-flex w-fit items-center gap-2 rounded-2xl bg-[#FF6A00] px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(255,106,0,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff7615] hover:shadow-[0_16px_36px_rgba(255,106,0,0.36)] active:translate-y-0">Explore Flagship Phones <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></button>
          </div>
        </article>

        <div className="lg:col-span-5 grid grid-rows-2 gap-4 lg:gap-5">
          <article className="relative min-h-[230px] overflow-hidden rounded-[28px] border border-[#2a2b2f] bg-[#18191d] text-white shadow-[0_20px_55px_rgba(0,0,0,0.12)] group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_45%,rgba(255,193,7,0.13),transparent_30%),linear-gradient(135deg,#151619,#202126)]" />
            <div className="absolute right-0 top-0 h-full w-[52%] bg-gradient-to-l from-black/15 to-transparent" />
            <div className="absolute right-[5%] top-[12%] flex h-[76%] w-[43%] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035]"><img src={headphonesImage} alt="Sony WH-1000XM5 Studio ANC" className="max-h-[88%] max-w-[88%] object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105" /></div>
            <div className="relative z-10 flex h-full max-w-[57%] flex-col justify-center p-6 sm:p-7">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-orange-400">Acoustic Perfection</span>
              <h4 className="mt-2 font-['Space_Grotesk'] text-xl sm:text-[22px] font-bold leading-tight tracking-[-0.025em]">Studio ANC Headphones</h4>
              <p className="mt-2 text-xs sm:text-sm text-white/50">Up to 40h high-res playback</p>
              <button onClick={() => navigateToCategory('Audio')} className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs font-extrabold text-orange-400 transition-colors hover:text-white">Shop Audio <ArrowRight className="h-3.5 w-3.5" /></button>
            </div>
          </article>

          <article className="relative min-h-[230px] overflow-hidden rounded-[28px] border border-[#2a2b2f] bg-[#18191d] text-white shadow-[0_20px_55px_rgba(0,0,0,0.12)] group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_48%,rgba(79,70,229,0.18),transparent_32%),linear-gradient(135deg,#17181c,#202329)]" />
            <div className="absolute right-0 top-0 h-full w-[52%] bg-gradient-to-l from-black/15 to-transparent" />
            <div className="absolute right-[5%] top-[12%] flex h-[76%] w-[43%] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035]"><img src={laptopImage} alt="MacBook Pro 16 M3 Max" className="max-h-[88%] max-w-[88%] object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105" /></div>
            <div className="relative z-10 flex h-full max-w-[57%] flex-col justify-center p-6 sm:p-7">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-blue-400">Pro Workstations</span>
              <h4 className="mt-2 font-['Space_Grotesk'] text-xl sm:text-[22px] font-bold leading-tight tracking-[-0.025em]">M3 &amp; RTX Ultra Laptops</h4>
              <p className="mt-2 text-xs sm:text-sm text-white/50">Engineered for 8K rendering</p>
              <button onClick={() => navigateToCategory('Laptops')} className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs font-extrabold text-blue-400 transition-colors hover:text-white">Explore Computers <ArrowRight className="h-3.5 w-3.5" /></button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
