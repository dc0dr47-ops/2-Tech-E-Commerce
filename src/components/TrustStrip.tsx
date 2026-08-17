import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones, Zap } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const items = [
    {
      icon: Truck,
      title: 'Free Express Delivery',
      desc: 'Free 2-day priority on orders over $99',
    },
    {
      icon: ShieldCheck,
      title: '2-Year Official Warranty',
      desc: '100% genuine brand-certified repair coverage',
    },
    {
      icon: RefreshCw,
      title: '30-Day Easy Returns',
      desc: 'Zero hassle return with prepaid shipping label',
    },
    {
      icon: Headphones,
      title: '24/7 Tech Concierge',
      desc: 'Live certified hardware engineers on standby',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
      <div className="bg-[#F7F7F5] rounded-2xl border border-neutral-200/80 p-4 sm:p-6 lg:p-7">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 shadow-xs text-[#FF6A00]">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900 font-['Space_Grotesk'] leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
