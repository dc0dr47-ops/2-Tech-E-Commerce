import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS_DATA } from '../data/products';
import { ProductCard } from './ProductCard';
import {
  Star,
  Heart,
  Scale,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RefreshCw,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Share2,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  Zap,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    setCurrentRoute,
    setFilterState,
    addToast,
  } = useCart();

  const product = selectedProductDetail || PRODUCTS_DATA[0];

  // Gallery state
  const [selectedImage, setSelectedImage] = useState(product.images[0] || product.image);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product.storageOptions && product.storageOptions.length > 0 ? product.storageOptions[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'reviews'>('specs');

  // Customer Review Form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [customReviews, setCustomReviews] = useState(product.reviews || []);

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  // Related products
  const relatedProducts = PRODUCTS_DATA.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    const newRev = {
      id: 'rev-' + Date.now(),
      userName: reviewName,
      rating: reviewRating,
      date: 'Just now',
      title: reviewTitle || 'Excellent product',
      comment: reviewComment,
      verifiedPurchase: true,
      helpfulCount: 0,
    };

    setCustomReviews([newRev, ...customReviews]);
    setShowReviewForm(false);
    setReviewName('');
    setReviewTitle('');
    setReviewComment('');
    addToast('Review Submitted', 'Thank you! Your verified review is now live.');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedStorage);
    setCurrentRoute('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied', 'Product link copied to clipboard.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8 flex-wrap">
        <button
          onClick={() => {
            setCurrentRoute('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="hover:text-[#FF6A00] transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <button
          onClick={() => {
            setFilterState(prev => ({ ...prev, categories: [product.category] }));
            setCurrentRoute('shop');
          }}
          className="hover:text-[#FF6A00] transition-colors"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="font-semibold text-neutral-900 line-clamp-1">{product.name}</span>
      </nav>

      {/* Main Top Product Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b border-neutral-200">
        
        {/* Left Side: Product Image Gallery (6 columns) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Main Large Display Area */}
          <div className="relative aspect-square w-full bg-[#F7F7F5] rounded-3xl border border-neutral-200/90 flex items-center justify-center p-8 overflow-hidden group">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {product.discountPercent && (
                <span className="px-3 py-1 rounded-lg bg-[#FF6A00] text-white text-xs font-bold shadow-sm">
                  Save {product.discountPercent}%
                </span>
              )}
              {product.inStock ? (
                <span className="px-3 py-1 rounded-lg bg-[#18864B]/10 text-[#18864B] text-xs font-semibold">
                  In Stock ({product.stock} units)
                </span>
              ) : (
                <span className="px-3 py-1 rounded-lg bg-red-100 text-red-700 text-xs font-semibold">
                  Backorder
                </span>
              )}
            </div>

            {/* Share action */}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-neutral-600 hover:text-neutral-900 transition-colors shadow-xs"
              title="Share Product"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Gallery Thumbnails Carousel */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-2xl bg-[#F7F7F5] p-2 border-2 transition-all shrink-0 flex items-center justify-center cursor-pointer ${
                    selectedImage === img
                      ? 'border-[#FF6A00] shadow-sm'
                      : 'border-transparent hover:border-neutral-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details & Purchase Engine (6 columns) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs text-neutral-500 mb-2">
              <span className="font-bold uppercase tracking-wider text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-md">
                {product.brand}
              </span>
              <span className="text-neutral-400 font-mono">SKU: {product.id}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 font-['Space_Grotesk'] leading-tight">
              {product.name}
            </h1>

            {/* Rating Stars & Reviews link */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-[#FF8A00]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-neutral-800">{product.rating}</span>
              <span className="text-neutral-300">&bull;</span>
              <button
                onClick={() => setActiveTab('reviews')}
                className="text-xs text-neutral-600 hover:text-[#FF6A00] underline font-medium"
              >
                {product.reviewCount + customReviews.length} Verified Reviews
              </button>
            </div>

            {/* Price Box */}
            <div className="my-6 p-4 rounded-2xl bg-[#F7F7F5] border border-neutral-200/80 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-neutral-900">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-neutral-400 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {savings > 0 && (
                  <p className="text-xs text-[#18864B] font-semibold mt-0.5">
                    You save ${savings.toLocaleString()} ({product.discountPercent}% instant promo)
                  </p>
                )}
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-[11px] text-[#18864B] bg-[#18864B]/10 px-2.5 py-1 rounded-full font-bold">
                  <Zap className="w-3 h-3" /> Ready to Dispatch
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Swatches Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-2.5">
                  Color Finish: <span className="text-neutral-600 font-normal">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        selectedColor === color.name
                          ? 'border-[#FF6A00] bg-[#FF6A00]/5 text-[#FF6A00] ring-2 ring-[#FF6A00]/20'
                          : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage / Configuration Selector */}
            {product.storageOptions && product.storageOptions.length > 0 && (
              <div className="mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-2.5">
                  Capacity / Option: <span className="text-neutral-600 font-normal">{selectedStorage}</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.storageOptions.map(storage => (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(storage)}
                      className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        selectedStorage === storage
                          ? 'border-[#FF6A00] bg-neutral-900 text-white shadow-md'
                          : 'border-neutral-200 text-neutral-800 hover:border-neutral-400 bg-white'
                      }`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Bag / Buy Now Actions */}
            <div className="space-y-3 pt-4 border-t border-neutral-100">
              <div className="flex items-center gap-3">
                
                {/* Stepper */}
                <div className="flex items-center border border-neutral-200 rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-xs text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(product, quantity, selectedColor, selectedStorage)}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-[#FF6A00] hover:bg-[#E85D00] text-white font-bold text-sm shadow-lg shadow-[#FF6A00]/20 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart &bull; ${(product.price * quantity).toLocaleString()}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                    isFavorited
                      ? 'border-red-200 bg-red-50 text-red-500'
                      : 'border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>

                {/* Compare Button */}
                <button
                  onClick={() => toggleCompare(product)}
                  className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                    isCompared
                      ? 'border-[#FF6A00] bg-[#FF6A00]/10 text-[#FF6A00]'
                      : 'border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                  title="Compare"
                >
                  <Scale className="w-5 h-5" />
                </button>
              </div>

              {/* Buy Now Instant Checkout Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-xl bg-neutral-900 hover:bg-black text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                Instant Buy Now
              </button>
            </div>

            {/* Delivery & Warranty Guarantee List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-neutral-100 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#FF6A00] shrink-0" />
                <span>Free 2-Day Priority Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#18864B] shrink-0" />
                <span>2-Year Brand Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-blue-500 shrink-0" />
                <span>30-Day Free Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications, Features, Customer Reviews */}
      <div className="py-12 border-b border-neutral-200">
        
        {/* Tab Switcher */}
        <div className="flex items-center gap-4 border-b border-neutral-200 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-4 px-2 text-sm font-bold tracking-tight border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'specs'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-4 px-2 text-sm font-bold tracking-tight border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'features'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Key Capabilities &amp; Features
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 px-2 text-sm font-bold tracking-tight border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'reviews'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Customer Reviews ({product.reviewCount + customReviews.length})
          </button>
        </div>

        {/* Tab 1: Technical Specs */}
        {activeTab === 'specs' && (
          <div className="max-w-3xl">
            <div className="rounded-2xl border border-neutral-200 overflow-hidden divide-y divide-neutral-200">
              {product.specs.map((spec, i) => (
                <div key={i} className="grid grid-cols-3 p-4 text-xs sm:text-sm">
                  <span className="font-semibold text-neutral-900 col-span-1">{spec.label}</span>
                  <span className="text-neutral-600 col-span-2">{spec.value}</span>
                </div>
              ))}
              <div className="grid grid-cols-3 p-4 text-xs sm:text-sm bg-neutral-50">
                <span className="font-semibold text-neutral-900 col-span-1">Warranty</span>
                <span className="text-neutral-600 col-span-2">{product.warranty}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Key Features */}
        {activeTab === 'features' && (
          <div className="max-w-3xl space-y-4">
            {product.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#F7F7F5] border border-neutral-200/80">
                <div className="w-6 h-6 rounded-full bg-[#18864B]/10 text-[#18864B] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <p className="text-sm font-medium text-neutral-800 leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#F7F7F5] border border-neutral-200">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-neutral-900">{product.rating}</span>
                  <div className="flex items-center text-[#FF8A00]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Based on {product.reviewCount + customReviews.length} verified electronics owner ratings
                </p>
              </div>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-colors"
              >
                {showReviewForm ? 'Cancel Review' : 'Write a Verified Review'}
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="p-6 rounded-2xl border border-neutral-200 bg-white space-y-4 max-w-2xl">
                <h4 className="font-bold text-sm text-neutral-900 font-['Space_Grotesk']">
                  Share your experience with {product.name}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-500 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={reviewName}
                      onChange={e => setReviewName(e.target.value)}
                      placeholder="e.g. Jordan Hayes"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-500 block mb-1">Overall Rating</label>
                    <select
                      value={reviewRating}
                      onChange={e => setReviewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-white"
                    >
                      <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                      <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                      <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                      <option value={2}>★★☆☆☆ (2 Stars - Below Expectations)</option>
                      <option value={1}>★☆☆☆☆ (1 Star - Poor)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-neutral-500 block mb-1">Headline</label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={e => setReviewTitle(e.target.value)}
                    placeholder="e.g. Unbeatable performance and thermal efficiency"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-500 block mb-1">Review Comments</label>
                  <textarea
                    required
                    rows={3}
                    value={reviewComment}
                    onChange={e => setReviewComment(e.target.value)}
                    placeholder="Describe build quality, screen brightness, battery life, sound..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#FF6A00] text-white text-xs font-bold hover:bg-[#E85D00]"
                >
                  Submit Verified Review
                </button>
              </form>
            )}

            {/* Review List */}
            <div className="space-y-4 max-w-3xl">
              {customReviews.map(rev => (
                <div key={rev.id} className="p-5 rounded-2xl border border-neutral-200 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-neutral-900">{rev.userName}</span>
                      {rev.verifiedPurchase && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-[#18864B] bg-[#18864B]/10 px-2 py-0.5 rounded-full font-semibold">
                          <Check className="w-3 h-3" /> Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-neutral-400">{rev.date}</span>
                  </div>

                  <div className="flex items-center text-[#FF8A00] mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-current' : 'text-neutral-200'
                        }`}
                      />
                    ))}
                  </div>

                  <h5 className="font-bold text-xs sm:text-sm text-neutral-900 mb-1">{rev.title}</h5>
                  <p className="text-xs text-neutral-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="py-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-neutral-900 font-['Space_Grotesk']">
              Related Tech Gear
            </h3>
            <button
              onClick={() => {
                setFilterState(prev => ({ ...prev, categories: [product.category] }));
                setCurrentRoute('shop');
              }}
              className="text-xs font-bold text-[#FF6A00] hover:underline"
            >
              View More in {product.category}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
