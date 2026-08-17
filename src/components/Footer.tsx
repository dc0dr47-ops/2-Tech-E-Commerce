import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  Zap,
  Mail,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Phone,
  MapPin,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateToCategory, setCurrentRoute, setFilterState, addToast } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    addToast('Subscribed!', 'Use coupon TECH20 for 20% off your first electronics order.');
  };

  return (
    <footer className="bg-[#111113] text-white border-t border-neutral-800 mt-20">
      
      {/* Top Newsletter & VIP Signup Banner */}
      <div className="border-b border-neutral-800/80 bg-[#161619]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[#FF6A00] text-xs font-bold uppercase tracking-wider mb-1">
                <Zap className="w-4 h-4" />
                <span>VoltPulse Member Club</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-['Space_Grotesk'] text-white">
                Unlock 20% Off Your First Order
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Receive priority access to GPU drops, flash sales, and early hardware releases.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              {subscribed ? (
                <div className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Success! Use coupon 'TECH20' at checkout for 20% off.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={e => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full pl-10 pr-4 py-3 bg-[#202024] border border-neutral-700 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#FF6A00] hover:bg-[#E85D00] text-white font-bold text-xs rounded-xl transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FF6A00] flex items-center justify-center text-white shadow-md shadow-[#FF6A00]/25">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-['Space_Grotesk'] font-extrabold text-lg text-white tracking-tight leading-none">
                  VOLT<span className="text-[#FF6A00]">PULSE</span>
                </span>
                <span className="text-[9px] tracking-widest text-neutral-400 uppercase font-mono mt-0.5">
                  Electronics Hub
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              VoltPulse is a premier authorized consumer electronics destination delivering genuine flagship smartphones, studio acoustics, creator workstations, and next-gen hardware.
            </p>

            <div className="space-y-2 pt-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF6A00] shrink-0" />
                <span>1-800-VOLTPULSE (24/7 Tech Hotline)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF6A00] shrink-0" />
                <span>support@voltpulse-electronics.io</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF6A00] shrink-0" />
                <span>500 Howard St, Silicon Valley, CA 94105</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4 font-['Space_Grotesk']">
              Departments
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              {['Phones', 'Laptops', 'Audio', 'Smartwatch', 'Gaming', 'Cameras'].map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => navigateToCategory(cat)}
                    className="hover:text-[#FF6A00] transition-colors cursor-pointer text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4 font-['Space_Grotesk']">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => {
                    setCurrentRoute('orders');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#FF6A00] transition-colors"
                >
                  Track Order &amp; Logistics
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setFilterState(prev => ({ ...prev, onSaleOnly: true }));
                    setCurrentRoute('deals');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#FF6A00] transition-colors"
                >
                  Flash Deals &amp; Discounts
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentRoute('wishlist');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#FF6A00] transition-colors"
                >
                  Saved Wishlist
                </button>
              </li>
              <li>
                <span className="hover:text-[#FF6A00] cursor-pointer transition-colors">
                  2-Year Warranty Registration
                </span>
              </li>
              <li>
                <span className="hover:text-[#FF6A00] cursor-pointer transition-colors">
                  30-Day Easy Returns Portal
                </span>
              </li>
            </ul>
          </div>

          {/* Trust & Guarantees */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4 font-['Space_Grotesk']">
              Guarantees
            </h4>
            <div className="space-y-3 text-xs text-neutral-400">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#18864B] shrink-0 mt-0.5" />
                <span>100% Genuine Authorized Stock</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5" />
                <span>Free 2-Day Priority Express over $99</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & payment cards */}
        <div className="pt-10 mt-10 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} VoltPulse Electronics Inc. All rights reserved.</p>

          <div className="flex items-center gap-3 text-neutral-400 font-mono text-[11px]">
            <span className="px-2 py-1 rounded bg-[#202024] border border-neutral-700">VISA</span>
            <span className="px-2 py-1 rounded bg-[#202024] border border-neutral-700">MASTERCARD</span>
            <span className="px-2 py-1 rounded bg-[#202024] border border-neutral-700">APPLE PAY</span>
            <span className="px-2 py-1 rounded bg-[#202024] border border-neutral-700">GOOGLE PAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
