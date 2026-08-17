import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, ToastMessage, FilterState, PageRoute, ShippingAddress } from '../types';
import { PRODUCTS_DATA } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  compareList: Product[];
  orders: Order[];
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  addToCart: (product: Product, quantity?: number, color?: string, storage?: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  selectedProductDetail: Product | null;
  setSelectedProductDetail: (product: Product | null) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  appliedPromo: { code: string; discountPercent: number } | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  createOrder: (address: ShippingAddress, shippingMethod: string, paymentMethod: string) => Order;
  currentRoute: PageRoute;
  setCurrentRoute: (route: PageRoute) => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTax: number;
  cartTotal: number;
  cartItemCount: number;
  openProductDetail: (product: Product) => void;
  navigateToCategory: (category: string) => void;
}

const initialFilterState: FilterState = {
  searchQuery: '',
  categories: [],
  brands: [],
  minPrice: 0,
  maxPrice: 4000,
  minRating: 0,
  inStockOnly: false,
  onSaleOnly: false,
  freeShippingOnly: false,
  discountThreshold: null,
  sortBy: 'featured',
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage loading
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('voltpulse_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('voltpulse_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [compareList, setCompareList] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('voltpulse_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('voltpulse_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('voltpulse_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('voltpulse_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1, color?: string, storage?: string) => {
    const chosenColor = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);
    const chosenStorage = storage || (product.storageOptions && product.storageOptions.length > 0 ? product.storageOptions[0] : undefined);
    const cartId = `${product.id}-${chosenColor || 'def'}-${chosenStorage || 'def'}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartId === cartId);
      if (existing) {
        return prev.map(item =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          cartId,
          productId: product.id,
          product,
          quantity,
          selectedColor: chosenColor,
          selectedStorage: chosenStorage,
          unitPrice: product.price,
        },
      ];
    });

    addToast('Added to Cart', `${product.name} has been added to your shopping bag.`);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(prev => prev.map(item => (item.cartId === cartId ? { ...item, quantity } : item)));
  };

  const removeFromCart = (cartId: string) => {
    const item = cart.find(i => i.cartId === cartId);
    setCart(prev => prev.filter(i => i.cartId !== cartId));
    if (item) {
      addToast('Item Removed', `${item.product.name} was removed from your bag.`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from Wishlist', product ? `${product.name} removed from wishlist.` : 'Item removed.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast('Saved to Wishlist', product ? `${product.name} saved to your wishlist.` : 'Item saved.');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const clearWishlist = () => {
    setWishlist([]);
    addToast('Wishlist Cleared', 'All saved items have been removed.', 'info');
  };

  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        addToast('Removed from Comparison', `${product.name} removed from compare.`, 'info');
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        addToast('Comparison Full', 'You can compare up to 4 items simultaneously.', 'error');
        return prev;
      }
      addToast('Added to Comparison', `${product.name} added to comparison list.`);
      setIsCompareOpen(true);
      return [...prev, product];
    });
  };

  const isInCompare = (productId: string) => compareList.some(p => p.id === productId);

  const removeFromCompare = (productId: string) => {
    setCompareList(prev => prev.filter(p => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'TECH20' || cleanCode === 'VOLT20') {
      setAppliedPromo({ code: cleanCode, discountPercent: 20 });
      addToast('Promo Applied', '20% discount applied to your order!');
      return { success: true, message: '20% off coupon code applied successfully!' };
    }
    if (cleanCode === 'FLASH10' || cleanCode === 'SAVE10') {
      setAppliedPromo({ code: cleanCode, discountPercent: 10 });
      addToast('Promo Applied', '10% discount applied to your order!');
      return { success: true, message: '10% off coupon code applied successfully!' };
    }
    if (cleanCode === 'VIP50') {
      setAppliedPromo({ code: cleanCode, discountPercent: 50 });
      addToast('VIP Promo Applied', '50% VIP discount applied!');
      return { success: true, message: 'VIP 50% discount activated!' };
    }
    addToast('Invalid Coupon', 'The coupon code entered is invalid or expired.', 'error');
    return { success: false, message: 'Invalid coupon code. Try TECH20 or FLASH10' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    addToast('Coupon Removed', 'Promotional code removed from your order.', 'info');
  };

  const openProductDetail = (product: Product) => {
    setSelectedProductDetail(product);
    setCurrentRoute('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (category: string) => {
    setFilterState(prev => ({
      ...prev,
      categories: [category],
      searchQuery: '',
    }));
    setCurrentRoute('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setFilterState(initialFilterState);
    addToast('Filters Reset', 'All product filters have been cleared.', 'info');
  };

  // Cart financial calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartDiscount = appliedPromo ? (cartSubtotal * appliedPromo.discountPercent) / 100 : 0;
  const cartShipping = cartSubtotal > 99 || cartSubtotal === 0 ? 0 : 15;
  const taxableAmount = Math.max(0, cartSubtotal - cartDiscount);
  const cartTax = Math.round(taxableAmount * 0.08 * 100) / 100;
  const cartTotal = Math.max(0, taxableAmount + cartShipping + cartTax);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const createOrder = (shippingAddress: ShippingAddress, shippingMethod: string, paymentMethod: string): Order => {
    const orderId = 'VP-' + Math.floor(100000 + Math.random() * 900000);
    const trackingNumber = 'TRK-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 3);

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shippingFee: cartShipping,
      tax: cartTax,
      total: cartTotal,
      shippingAddress,
      shippingMethod,
      paymentMethod,
      status: 'Confirmed',
      trackingNumber,
      estimatedDelivery: estDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setAppliedPromo(null);
    addToast('Order Confirmed!', `Order ${orderId} has been successfully placed.`);
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        compareList,
        orders,
        toasts,
        addToast,
        removeToast,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCompareOpen,
        setIsCompareOpen,
        quickViewProduct,
        setQuickViewProduct,
        selectedProductDetail,
        setSelectedProductDetail,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        toggleCompare,
        isInCompare,
        removeFromCompare,
        clearCompare,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        createOrder,
        currentRoute,
        setCurrentRoute,
        filterState,
        setFilterState,
        resetFilters,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTax,
        cartTotal,
        cartItemCount,
        openProductDetail,
        navigateToCategory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
