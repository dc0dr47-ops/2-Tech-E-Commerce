import React from 'react';
import { useCart } from '../context/CartContext';
import {
  X,
  Scale,
  Trash2,
  ShoppingCart,
  Check,
  Star,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CompareModal: React.FC = () => {
  const {
    compareList,
    isCompareOpen,
    setIsCompareOpen,
    removeFromCompare,
    clearCompare,
    addToCart,
    openProductDetail,
    setCurrentRoute,
  } = useCart();

  return (
    <AnimatePresence>
      {isCompareOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCompareOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
          />

          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 z-50 my-8"
            >
              
              {/* Header */}
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-900 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6A00] flex items-center justify-center">
                    <Scale className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-['Space_Grotesk']">
                      Side-by-Side Product Comparison ({compareList.length}/4)
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Compare technical specifications, battery capacity, displays, and pricing.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {compareList.length > 0 && (
                    <button
                      onClick={clearCompare}
                      className="text-xs text-neutral-400 hover:text-red-400 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsCompareOpen(false)}
                    className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 overflow-x-auto">
                {compareList.length > 0 ? (
                  <table className="w-full min-w-[700px] text-xs text-left border-collapse">
                    <tbody>
                      {/* Product Header Row */}
                      <tr className="border-b border-neutral-200">
                        <td className="p-4 font-bold text-neutral-400 w-44 bg-neutral-50/50">Product</td>
                        {compareList.map(item => (
                          <td key={item.id} className="p-4 align-top w-64">
                            <div className="relative bg-[#F7F7F5] rounded-2xl p-4 mb-3 h-44 flex items-center justify-center border border-neutral-200/80">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="max-h-36 object-contain mix-blend-multiply"
                              />
                              <button
                                onClick={() => removeFromCompare(item.id)}
                                className="absolute top-2 right-2 p-1.5 rounded-full bg-white text-neutral-400 hover:text-red-500 shadow-sm"
                                title="Remove"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                              {item.brand}
                            </span>
                            <h4
                              onClick={() => {
                                setIsCompareOpen(false);
                                openProductDetail(item);
                              }}
                              className="font-bold text-neutral-900 text-sm hover:text-[#FF6A00] transition-colors cursor-pointer line-clamp-2"
                            >
                              {item.name}
                            </h4>
                          </td>
                        ))}
                      </tr>

                      {/* Price Row */}
                      <tr className="border-b border-neutral-100">
                        <td className="p-4 font-bold text-neutral-900 bg-neutral-50/50">Price</td>
                        {compareList.map(item => (
                          <td key={item.id} className="p-4">
                            <span className="font-extrabold text-base text-neutral-900">${item.price.toLocaleString()}</span>
                            {item.originalPrice && (
                              <span className="text-neutral-400 line-through ml-2">${item.originalPrice.toLocaleString()}</span>
                            )}
                          </td>
                        ))}
                      </tr>

                      {/* Rating Row */}
                      <tr className="border-b border-neutral-100">
                        <td className="p-4 font-bold text-neutral-900 bg-neutral-50/50">Customer Rating</td>
                        {compareList.map(item => (
                          <td key={item.id} className="p-4">
                            <div className="flex items-center gap-1 text-[#FF8A00]">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span className="font-bold text-neutral-800">{item.rating}</span>
                              <span className="text-neutral-400">({item.reviewCount})</span>
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Category & Brand */}
                      <tr className="border-b border-neutral-100">
                        <td className="p-4 font-bold text-neutral-900 bg-neutral-50/50">Department</td>
                        {compareList.map(item => (
                          <td key={item.id} className="p-4 font-medium text-neutral-700">
                            {item.category}
                          </td>
                        ))}
                      </tr>

                      {/* Dynamic Key Specs Matrix */}
                      <tr className="border-b border-neutral-100">
                        <td className="p-4 font-bold text-neutral-900 bg-neutral-50/50">Primary Specs</td>
                        {compareList.map(item => (
                          <td key={item.id} className="p-4 space-y-1.5">
                            {item.specs.slice(0, 4).map((spec, i) => (
                              <div key={i} className="text-[11px]">
                                <span className="font-semibold text-neutral-800">{spec.label}:</span>{' '}
                                <span className="text-neutral-600">{spec.value}</span>
                              </div>
                            ))}
                          </td>
                        ))}
                      </tr>

                      {/* Warranty */}
                      <tr className="border-b border-neutral-100">
                        <td className="p-4 font-bold text-neutral-900 bg-neutral-50/50">Warranty</td>
                        {compareList.map(item => (
                          <td key={item.id} className="p-4 text-neutral-600">
                            {item.warranty}
                          </td>
                        ))}
                      </tr>

                      {/* Actions */}
                      <tr>
                        <td className="p-4 font-bold text-neutral-900 bg-neutral-50/50">Action</td>
                        {compareList.map(item => (
                          <td key={item.id} className="p-4">
                            <button
                              onClick={() => {
                                addToCart(item);
                                setIsCompareOpen(false);
                              }}
                              className="w-full py-2.5 px-4 rounded-xl bg-[#FF6A00] hover:bg-[#E85D00] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Add to Bag</span>
                            </button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
                      <Scale className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-neutral-900 text-sm font-['Space_Grotesk']">
                      No products added to comparison
                    </h4>
                    <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                      Click the compare icon on any product card to view side-by-side specs.
                    </p>
                    <button
                      onClick={() => {
                        setIsCompareOpen(false);
                        setCurrentRoute('shop');
                      }}
                      className="mt-5 px-5 py-2.5 rounded-xl bg-[#FF6A00] text-white text-xs font-bold hover:bg-[#E85D00]"
                    >
                      Browse Electronics
                    </button>
                  </div>
                )}
              </div>

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
