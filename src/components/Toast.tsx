import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast, isCartOpen } = useCart();
  const [bottomActionHeight, setBottomActionHeight] = useState<number>(0);

  // Dynamic collision detection for sticky bottom action bars and mobile cart drawer
  useEffect(() => {
    const updateBottomOffset = () => {
      let maxBottomHeight = 0;

      // 1. Check for Cart Drawer footer on mobile viewports (< 768px) where drawer spans full viewport width
      if (isCartOpen && window.innerWidth < 768) {
        const cartFooter = document.getElementById('cart-drawer-footer-actions');
        if (cartFooter) {
          const rect = cartFooter.getBoundingClientRect();
          if (rect.height > 0) {
            maxBottomHeight = Math.max(maxBottomHeight, rect.height);
          }
        } else {
          // Fallback height for mobile cart footer with checkout button + promo input
          maxBottomHeight = Math.max(maxBottomHeight, 230);
        }
      }

      // 2. Check for any explicit sticky bottom action bars in the DOM
      const bottomActionElements = document.querySelectorAll<HTMLElement>(
        '[data-bottom-action="true"], .sticky-bottom-action-bar, [data-sticky-bottom="true"]'
      );

      bottomActionElements.forEach(el => {
        // Only count if element is visible and in the bottom section of viewport
        const rect = el.getBoundingClientRect();
        if (rect.height > 0 && rect.bottom >= window.innerHeight - 10) {
          // If on desktop (>768px) and element doesn't overlap the center 420px zone, skip
          const viewportCenter = window.innerWidth / 2;
          const isOverlappingCenter =
            window.innerWidth < 768 ||
            (rect.left <= viewportCenter + 210 && rect.right >= viewportCenter - 210);

          if (isOverlappingCenter) {
            maxBottomHeight = Math.max(maxBottomHeight, rect.height);
          }
        }
      });

      setBottomActionHeight(maxBottomHeight);
    };

    updateBottomOffset();

    // Resize observer to continuously measure DOM changes
    const observer = new ResizeObserver(() => {
      updateBottomOffset();
    });

    observer.observe(document.body);
    window.addEventListener('resize', updateBottomOffset);

    // Minor delay to catch drawer animation complete states
    const timer = setTimeout(updateBottomOffset, 150);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateBottomOffset);
      clearTimeout(timer);
    };
  }, [isCartOpen, toasts.length]);

  return (
    <div
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        bottom: `calc(${bottomActionHeight}px + var(--bottom-safe-gap, 24px) + env(safe-area-inset-bottom, 0px))`,
        transition: 'bottom 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="pointer-events-none w-[calc(100vw-32px)] max-w-[420px] flex flex-col-reverse gap-2.5 items-center"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto w-full flex items-start gap-3 p-4 rounded-2xl bg-[#18181A] text-white border border-neutral-800 shadow-2xl shadow-black/50 backdrop-blur-md"
          >
            {/* Icon */}
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && (
                <div className="w-6 h-6 rounded-full bg-[#FF6A00]/15 flex items-center justify-center text-[#FF6A00]">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6A00] stroke-[2.5]" />
                </div>
              )}
              {toast.type === 'error' && (
                <div className="w-6 h-6 rounded-full bg-red-500/15 flex items-center justify-center text-red-400">
                  <AlertCircle className="w-4 h-4 text-red-400 stroke-[2.5]" />
                </div>
              )}
              {toast.type === 'info' && (
                <div className="w-6 h-6 rounded-full bg-blue-500/15 flex items-center justify-center text-blue-400">
                  <Info className="w-4 h-4 text-blue-400 stroke-[2.5]" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-1">
              <p className="font-bold text-sm text-white font-['Space_Grotesk'] leading-snug">
                {toast.title}
              </p>
              <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed break-words">
                {toast.message}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

