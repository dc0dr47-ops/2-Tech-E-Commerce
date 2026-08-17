import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  X,
  Star,
  ShoppingCart,
  Heart,
  Scale,
  Plus,
  Minus,
  Check,
  ArrowRight,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    openProductDetail,
  } = useCart();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product.storageOptions && product.storageOptions.length > 0 ? product.storageOptions[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedStorage);
    setQuickViewProduct(null);
  };

  const handleViewFull = () => {
    setQuickViewProduct(null);
    openProductDetail(product);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs"
        />

        <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 z-50"
          >
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
              {/* Product Image */}
              <div className="bg-[#F7F7F5] rounded-2xl p-6 flex items-center justify-center relative border border-neutral-200/80">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-64 object-contain mix-blend-multiply"
                />
                {product.discountPercent && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#FF6A00] text-white text-xs font-bold shadow-sm">
                    -{product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    {product.brand} &bull; {product.category}
                  </span>

                  <h3 className="font-bold text-lg text-neutral-900 font-['Space_Grotesk'] leading-tight">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center text-[#FF8A00]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-neutral-700">{product.rating}</span>
                    <span className="text-xs text-neutral-400">({product.reviewCount})</span>
                  </div>

                  <div className="flex items-baseline gap-2 my-3">
                    <span className="text-2xl font-extrabold text-neutral-900">${product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed mb-4">
                    {product.shortDescription}
                  </p>

                  {/* Colors */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="mb-4">
                      <span className="text-xs font-semibold text-neutral-700 block mb-1.5">
                        Color: {selectedColor}
                      </span>
                      <div className="flex items-center gap-2">
                        {product.colors.map(c => (
                          <button
                            key={c.name}
                            onClick={() => setSelectedColor(c.name)}
                            className={`w-6 h-6 rounded-full border-2 transition-transform ${
                              selectedColor === c.name ? 'scale-110 border-[#FF6A00]' : 'border-transparent'
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Storage */}
                  {product.storageOptions && product.storageOptions.length > 0 && (
                    <div className="mb-4">
                      <span className="text-xs font-semibold text-neutral-700 block mb-1.5">
                        Capacity: {selectedStorage}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.storageOptions.map(st => (
                          <button
                            key={st}
                            onClick={() => setSelectedStorage(st)}
                            className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-colors ${
                              selectedStorage === st
                                ? 'border-[#FF6A00] bg-[#FF6A00]/10 text-[#FF6A00]'
                                : 'border-neutral-200 text-neutral-700'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-neutral-200 rounded-xl bg-white p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-bold text-xs">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="flex-1 py-3 rounded-xl bg-[#FF6A00] hover:bg-[#E85D00] text-white text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Bag &bull; ${(product.price * quantity).toLocaleString()}</span>
                    </button>
                  </div>

                  <button
                    onClick={handleViewFull}
                    className="w-full text-center text-xs font-bold text-neutral-600 hover:text-[#FF6A00] transition-colors py-1 block"
                  >
                    View Full Technical Specifications &rarr;
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
