import React from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS_DATA } from '../data/products';
import { ProductCard } from './ProductCard';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist, setCurrentRoute, addToCart, addToast } = useCart();

  const wishlistedProducts = PRODUCTS_DATA.filter(p => wishlist.includes(p.id));

  const handleAddAllToBag = () => {
    wishlistedProducts.forEach(p => addToCart(p));
    addToast('Added to Bag', `Added ${wishlistedProducts.length} saved items to your cart.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-neutral-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-500 mb-1">
            <Heart className="w-4 h-4 fill-current" />
            <span>Saved Favorites</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-['Space_Grotesk'] tracking-tight">
            My Wishlist ({wishlistedProducts.length})
          </h1>
        </div>

        {wishlistedProducts.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddAllToBag}
              className="px-5 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#E85D00] text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add All to Cart</span>
            </button>
            <button
              onClick={clearWishlist}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 text-neutral-600 hover:text-red-500 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid */}
      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-[#F7F7F5] rounded-3xl border border-neutral-200 p-16 text-center max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center mx-auto mb-4 text-red-400 shadow-sm">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 font-['Space_Grotesk']">
            Your wishlist is empty
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xs mx-auto">
            Save items you want to keep track of by clicking the heart icon on any product card.
          </p>
          <button
            onClick={() => setCurrentRoute('shop')}
            className="mt-6 px-6 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#E85D00] text-white text-xs font-bold transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <span>Explore Electronics</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
