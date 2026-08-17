import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  Sparkles,
  Truck,
  ShieldCheck,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartTotal,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setCurrentRoute,
    openProductDetail,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success?: boolean; text?: string } | null>(null);

  const freeShippingThreshold = 99;
  const amountNeededForFreeShip = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback({ success: res.success, text: res.message });
    if (res.success) setPromoInput('');
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentRoute('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
            >
              
              {/* Drawer Header */}
              <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#FF6A00]" />
                  <h3 className="font-bold text-base text-neutral-900 font-['Space_Grotesk']">
                    Shopping Cart ({cart.reduce((c, i) => c + i.quantity, 0)})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="bg-[#F7F7F5] px-5 py-3 border-b border-neutral-200/80">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-neutral-700 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#FF6A00]" />
                    {amountNeededForFreeShip > 0 ? (
                      <>
                        Add <strong className="text-[#FF6A00]">${amountNeededForFreeShip.toFixed(2)}</strong> for Free Delivery
                      </>
                    ) : (
                      <strong className="text-[#18864B]">You unlocked Free Express Shipping!</strong>
                    )}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF6A00] transition-all duration-300 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-neutral-100">
                {cart.length > 0 ? (
                  cart.map(item => (
                    <div key={item.cartId} className="pt-4 first:pt-0 flex gap-4 items-start">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        onClick={() => {
                          setIsCartOpen(false);
                          openProductDetail(item.product);
                        }}
                        className="w-18 h-18 object-contain rounded-xl bg-[#F7F7F5] p-2 border border-neutral-200 shrink-0 cursor-pointer"
                      />

                      <div className="flex-1 min-w-0">
                        <button
                          onClick={() => {
                            setIsCartOpen(false);
                            openProductDetail(item.product);
                          }}
                          className="font-bold text-xs sm:text-sm text-neutral-900 hover:text-[#FF6A00] transition-colors truncate block text-left"
                        >
                          {item.product.name}
                        </button>

                        <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-1">
                          {item.selectedColor && (
                            <span className="bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-700">
                              {item.selectedColor}
                            </span>
                          )}
                          {item.selectedStorage && (
                            <span className="bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-700">
                              {item.selectedStorage}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Stepper */}
                          <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50">
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 rounded-l transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center font-bold text-xs text-neutral-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 rounded-r transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="font-extrabold text-xs sm:text-sm text-neutral-900">
                              ${(item.unitPrice * item.quantity).toLocaleString()}
                            </span>
                            {item.quantity > 1 && (
                              <span className="block text-[10px] text-neutral-400">
                                (${item.unitPrice} each)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-neutral-400 hover:text-red-500 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
                      <ShoppingCart className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-neutral-900 text-sm font-['Space_Grotesk']">Your shopping bag is empty</h4>
                    <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                      Explore our latest electronics, pro laptops, and high-performance audio gear.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setCurrentRoute('shop');
                      }}
                      className="mt-5 px-5 py-2.5 rounded-xl bg-[#FF6A00] text-white text-xs font-bold hover:bg-[#E85D00] transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                )}
              </div>

              {/* Drawer Footer & Summary */}
              {cart.length > 0 && (
                <div
                  id="cart-drawer-footer-actions"
                  data-bottom-action="true"
                  className="p-5 border-t border-neutral-200 bg-[#FBFBFA] space-y-4 shrink-0"
                >
                  
                  {/* Promo Input */}
                  <div>
                    {appliedPromo ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                          <Tag className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Code '{appliedPromo.code}' Applied ({appliedPromo.discountPercent}% Off)</span>
                        </div>
                        <button
                          onClick={removePromoCode}
                          className="text-xs text-emerald-700 hover:underline font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={e => setPromoInput(e.target.value)}
                          placeholder="Coupon code (Try: TECH20)"
                          className="flex-1 px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white uppercase font-mono"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-colors"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-neutral-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-neutral-900">${cartSubtotal.toLocaleString()}</span>
                    </div>

                    {cartDiscount > 0 && (
                      <div className="flex justify-between text-[#18864B] font-semibold">
                        <span>Promo Discount ({appliedPromo?.discountPercent}%)</span>
                        <span>-${cartDiscount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Estimated Shipping</span>
                      <span className="font-semibold text-neutral-900">
                        {cartShipping === 0 ? <span className="text-[#18864B]">FREE</span> : `$${cartShipping}`}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Estimated Tax (8%)</span>
                      <span className="font-semibold text-neutral-900">${cartTax.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between pt-2 border-t border-neutral-200 text-sm font-extrabold text-neutral-900">
                      <span>Estimated Total</span>
                      <span className="text-[#FF6A00] text-base">${cartTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-xl bg-[#FF6A00] hover:bg-[#E85D00] text-white font-bold text-sm shadow-lg shadow-[#FF6A00]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-center text-neutral-400 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#18864B]" />
                    256-Bit Encrypted Secure Checkout
                  </p>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
