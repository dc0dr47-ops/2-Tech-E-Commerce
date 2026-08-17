import React, { useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryBrowser } from './components/CategoryBrowser';
import { FlashSale } from './components/FlashSale';
import { FeaturedGrid } from './components/FeaturedGrid';
import { EditorialBanners } from './components/EditorialBanners';
import { TrustStrip } from './components/TrustStrip';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import { WishlistPage } from './components/WishlistPage';
import { OrdersPage } from './components/OrdersPage';
import { CartDrawer } from './components/CartDrawer';
import { CompareModal } from './components/CompareModal';
import { QuickViewModal } from './components/QuickViewModal';
import { ToastContainer } from './components/Toast';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { currentRoute, setIsCompareOpen, setFilterState } = useCart();

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  // Handle deals and new-arrivals routes by preparing filters
  useEffect(() => {
    if (currentRoute === 'deals') {
      setFilterState(prev => ({ ...prev, onSaleOnly: true }));
    } else if (currentRoute === 'new-arrivals') {
      setFilterState(prev => ({ ...prev, sortBy: 'newest', onSaleOnly: false }));
    }
  }, [currentRoute, setFilterState]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F5] text-neutral-900 font-sans selection:bg-[#FF6A00] selection:text-white">
      {/* Top Banner Notice */}
      <TopBar />

      {/* Primary Sticky Header */}
      <Header />

      {/* Main Page Content Dynamic Views */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <>
            <Hero />
            <CategoryBrowser />
            <FlashSale />
            <FeaturedGrid />
            <EditorialBanners />
            <TrustStrip />
          </>
        )}

        {(currentRoute === 'shop' || currentRoute === 'deals' || currentRoute === 'new-arrivals') && (
          <ShopPage />
        )}

        {currentRoute === 'product-detail' && <ProductDetailPage />}

        {currentRoute === 'checkout' && <CheckoutPage />}

        {currentRoute === 'wishlist' && <WishlistPage />}

        {currentRoute === 'orders' && <OrdersPage />}

        {currentRoute === 'compare' && (
          <div className="py-8">
            <ShopPage />
          </div>
        )}
      </main>

      {/* Global Interactive Drawers & Overlays */}
      <CartDrawer />
      <CompareModal />
      <QuickViewModal />
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
