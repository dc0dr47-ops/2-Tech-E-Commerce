import React from 'react';
import { Product, ViewMode } from '../types';
import { useCart } from '../context/CartContext';
import { getProductImage } from '../data/productImages';
import { Star, Heart, Scale, Eye, ShoppingCart, Check, Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  viewMode?: ViewMode;
  showFlashProgress?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = 'grid',
  showFlashProgress = false,
}) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    setQuickViewProduct,
    openProductDetail,
    cart,
  } = useCart();

  const image = getProductImage(product.id, product.image);
  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const inCartCount = cart
    .filter(item => item.productId === product.id)
    .reduce((sum, item) => sum + item.quantity, 0);

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl border border-neutral-200/90 hover:border-neutral-300 hover:shadow-lg transition-all p-4 sm:p-5 flex flex-col sm:flex-row gap-5 group">
        <div className="relative w-full sm:w-56 h-48 bg-[#F7F7F5] rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-3">
          <img src={image} alt={product.name} referrerPolicy="no-referrer" className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" loading="lazy" />
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {product.discountPercent && <span className="px-2 py-0.5 rounded-md bg-[#FF6A00] text-white text-[11px] font-bold shadow-sm">-{product.discountPercent}%</span>}
            {product.isNewArrival && <span className="px-2 py-0.5 rounded-md bg-neutral-900 text-white text-[11px] font-semibold">NEW</span>}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs text-neutral-500 mb-1">
              <span className="font-semibold uppercase tracking-wider text-neutral-400">{product.brand}</span>
              <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full text-[11px]">{product.category}</span>
            </div>
            <button onClick={() => openProductDetail(product)} className="text-left font-bold text-base sm:text-lg text-neutral-900 hover:text-[#FF6A00] transition-colors line-clamp-1 cursor-pointer">{product.name}</button>
            <p className="text-xs text-neutral-500 mt-1.5 line-clamp-2 leading-relaxed">{product.shortDescription}</p>
            <div className="flex items-center gap-1.5 mt-2.5">
              <div className="flex items-center text-[#FF8A00]">{[...Array(5)].map((_, i) => <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-300'}`} />)}</div>
              <span className="text-xs font-semibold text-neutral-700">{product.rating}</span>
              <span className="text-xs text-neutral-400">({product.reviewCount})</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 mt-3 border-t border-neutral-100 gap-4 flex-wrap">
            <div>
              <div className="flex items-baseline gap-2"><span className="text-xl font-extrabold text-neutral-900">${product.price.toLocaleString()}</span>{product.originalPrice && <span className="text-xs text-neutral-400 line-through">${product.originalPrice.toLocaleString()}</span>}</div>
              {savings > 0 && <span className="text-[11px] text-[#18864B] font-medium block">Save ${savings.toLocaleString()}</span>}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setQuickViewProduct(product)} className="p-2.5 rounded-xl border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors" title="Quick View"><Eye className="w-4 h-4" /></button>
              <button onClick={() => toggleCompare(product)} className={`p-2.5 rounded-xl border transition-colors ${isCompared ? 'border-[#FF6A00] bg-[#FF6A00]/10 text-[#FF6A00]' : 'border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'}`} title="Compare Specs"><Scale className="w-4 h-4" /></button>
              <button onClick={() => toggleWishlist(product.id)} className={`p-2.5 rounded-xl border transition-colors ${isFavorited ? 'border-red-200 bg-red-50 text-red-500' : 'border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'}`} title="Save for Later"><Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} /></button>
              <button onClick={() => addToCart(product)} className="px-4 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#E85D00] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"><ShoppingCart className="w-4 h-4" /><span>{inCartCount > 0 ? `Add More (${inCartCount})` : 'Add to Cart'}</span></button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-neutral-200/90 hover:border-neutral-300 hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden h-full">
      <div className="relative w-full aspect-square bg-[#F7F7F5] overflow-hidden flex items-center justify-center p-3 sm:p-5">
        <button type="button" onClick={() => openProductDetail(product)} className="absolute inset-0 z-[1] cursor-pointer" aria-label={`View ${product.name}`} />
        <img src={image} alt={product.name} referrerPolicy="no-referrer" className="relative z-0 w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300 pointer-events-none" loading="lazy" />

        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.discountPercent && <span className="px-1.5 py-0.5 rounded-md bg-[#FF6A00] text-white text-[10px] sm:text-[11px] font-bold shadow-sm">-{product.discountPercent}%</span>}
          {product.isBestSeller && <span className="px-1.5 py-0.5 rounded-md bg-neutral-900 text-white text-[9px] sm:text-[10px] font-semibold tracking-wide">HOT</span>}
        </div>

        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 md:translate-x-12 md:opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200 z-20">
          <button onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-md flex items-center justify-center transition-colors ${isFavorited ? 'bg-red-500 text-white' : 'bg-white text-neutral-700 hover:text-red-500 hover:bg-neutral-50'}`} title="Wishlist"><Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} /></button>
          <button onClick={e => { e.stopPropagation(); toggleCompare(product); }} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-md flex items-center justify-center transition-colors ${isCompared ? 'bg-[#FF6A00] text-white' : 'bg-white text-neutral-700 hover:text-[#FF6A00] hover:bg-neutral-50'}`} title="Compare"><Scale className="w-3.5 h-3.5" /></button>
          <button onClick={e => { e.stopPropagation(); setQuickViewProduct(product); }} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-md text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 flex items-center justify-center transition-colors hidden sm:flex" title="Quick View"><Eye className="w-3.5 h-3.5" /></button>
        </div>

        <div className="absolute inset-x-3 bottom-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 hidden md:block z-20">
          <button onClick={e => { e.stopPropagation(); addToCart(product); }} className="w-full py-2 rounded-xl bg-neutral-900 hover:bg-[#FF6A00] text-white text-xs font-semibold shadow-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"><ShoppingCart className="w-3.5 h-3.5" /><span>{inCartCount > 0 ? `In Bag (${inCartCount})` : 'Quick Add'}</span></button>
        </div>
      </div>

      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1"><span className="font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]">{product.brand}</span><span className="text-[10px] sm:text-[11px] text-neutral-500">{product.category}</span></div>
          <button onClick={() => openProductDetail(product)} className="relative z-30 text-left font-bold text-xs sm:text-sm text-neutral-900 hover:text-[#FF6A00] transition-colors line-clamp-2 leading-snug cursor-pointer">{product.name}</button>
          <div className="flex items-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-2"><div className="flex items-center text-[#FF8A00]">{[...Array(5)].map((_, i) => <Star key={i} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-200'}`} />)}</div><span className="text-[11px] sm:text-xs font-semibold text-neutral-700">{product.rating}</span><span className="text-[10px] sm:text-xs text-neutral-400">({product.reviewCount})</span></div>
        </div>

        {showFlashProgress && product.flashSaleSoldPercent && <div className="mt-2.5"><div className="flex justify-between text-[10px] sm:text-[11px] text-neutral-500 mb-1 font-medium"><span>Sold: <strong className="text-neutral-800">{product.flashSaleSoldPercent}%</strong></span><span className="text-[#FF6A00] font-semibold">Stock: {product.stock}</span></div><div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#FF6A00] to-[#FF8A00] rounded-full" style={{ width: `${product.flashSaleSoldPercent}%` }} /></div></div>}

        <div className="pt-2.5 sm:pt-3 mt-2.5 sm:mt-3 border-t border-neutral-100 flex items-center justify-between">
          <div><div className="flex items-baseline gap-1"><span className="text-sm sm:text-base font-extrabold text-neutral-900">${product.price.toLocaleString()}</span>{product.originalPrice && <span className="text-[10px] sm:text-xs text-neutral-400 line-through">${product.originalPrice.toLocaleString()}</span>}</div>{savings > 0 && <span className="text-[9px] sm:text-[10px] text-[#18864B] font-semibold block">Save ${savings.toLocaleString()}</span>}</div>
          <button onClick={() => addToCart(product)} className="relative z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-neutral-100 hover:bg-[#FF6A00] hover:text-white text-neutral-700 flex items-center justify-center transition-colors shrink-0 shadow-sm cursor-pointer" title="Add to Cart"><ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
        </div>
      </div>
    </div>
  );
};
