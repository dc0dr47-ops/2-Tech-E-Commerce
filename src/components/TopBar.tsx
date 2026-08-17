import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, ChevronDown, PhoneCall, HelpCircle, ShieldCheck } from 'lucide-react';

export const TopBar: React.FC = () => {
  const { setCurrentRoute, setFilterState } = useCart();
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('English');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showCurrMenu, setShowCurrMenu] = useState(false);

  const handleSaleClick = () => {
    setFilterState(prev => ({
      ...prev,
      onSaleOnly: true,
      searchQuery: '',
    }));
    setCurrentRoute('deals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0A0A0A] text-neutral-400 text-xs border-b border-neutral-850 py-2 px-4 sm:px-8 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side: Promo Announcement */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FF6A00]/20 text-[#FF6A00] font-medium text-[11px]">
            <Sparkles className="w-3 h-3" /> Special Event
          </span>
          <span className="text-neutral-300">
            Summer Sale for all Tech Gear &mdash; Free Express Delivery &amp; Up to 50% OFF!
          </span>
          <button
            onClick={handleSaleClick}
            className="text-[#FF6A00] font-semibold underline underline-offset-2 hover:text-[#E85D00] ml-1 transition-colors cursor-pointer"
          >
            Shop Now
          </button>
        </div>

        {/* Right Side: Utilities */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer">
            <ShieldCheck className="w-3.5 h-3.5 text-[#18864B]" />
            <span>Authorized Retailer</span>
          </div>

          <div className="h-3 w-px bg-neutral-800" />

          {/* Currency Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowCurrMenu(!showCurrMenu);
                setShowLangMenu(false);
              }}
              className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
            >
              <span>{currency} ($)</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>
            {showCurrMenu && (
              <div className="absolute right-0 top-full mt-2 w-28 bg-[#181818] border border-neutral-750 rounded-lg shadow-xl py-1 z-50">
                {['USD ($)', 'EUR (€)', 'GBP (£)', 'CAD ($)'].map(curr => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr.split(' ')[0]);
                      setShowCurrMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-neutral-200 hover:bg-[#FF6A00] hover:text-white transition-colors"
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLangMenu(!showLangMenu);
                setShowCurrMenu(false);
              }}
              className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
            >
              <span>{language}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>
            {showLangMenu && (
              <div className="absolute right-0 top-full mt-2 w-28 bg-[#181818] border border-neutral-750 rounded-lg shadow-xl py-1 z-50">
                {['English', 'Español', 'Deutsch', 'Français'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLangMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-neutral-200 hover:bg-[#FF6A00] hover:text-white transition-colors"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-3 w-px bg-neutral-800" />

          <button
            onClick={() => {
              setCurrentRoute('orders');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
          >
            <span>Track Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};
