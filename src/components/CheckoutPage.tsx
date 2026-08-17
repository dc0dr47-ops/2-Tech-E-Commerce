import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShippingAddress, Order } from '../types';
import {
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  ChevronLeft,
  Lock,
  Package,
  Zap,
  Check,
  Building2,
  Calendar,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartTax,
    appliedPromo,
    createOrder,
    setCurrentRoute,
  } = useCart();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Alex Vance',
    email: 'alex.vance@techpulse.io',
    phone: '+1 (555) 382-9481',
    street: '742 Evergreen Silicon Way',
    apartment: 'Suite 400',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'United States',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'overnight'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'cod'>('card');

  // Card details
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('884');
  const [cardName, setCardName] = useState('Alex Vance');

  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const shippingCost = shippingMethod === 'standard' ? 0 : shippingMethod === 'express' ? 15 : 29;
  const grandTotal = Math.max(0, cartSubtotal - cartDiscount + shippingCost + cartTax);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order = createOrder(
      address,
      shippingMethod === 'standard' ? 'Free Standard (3-5 Days)' : shippingMethod === 'express' ? 'Express Priority (2 Days)' : 'Overnight Air',
      paymentMethod === 'card' ? 'Visa •••• 4242' : paymentMethod === 'applepay' ? 'Apple Pay / Digital Wallet' : 'Cash on Delivery'
    );
    setCompletedOrder(order);
    setStep(4);
  };

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-neutral-900 font-['Space_Grotesk']">No items to checkout</h2>
        <p className="text-xs text-neutral-500 mt-2 mb-6">
          Your cart is currently empty. Explore our pro electronics catalog to add items.
        </p>
        <button
          onClick={() => setCurrentRoute('shop')}
          className="px-6 py-3 rounded-xl bg-[#FF6A00] text-white text-xs font-bold hover:bg-[#E85D00]"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Checkout Stepper Progress */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-between relative">
          
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-neutral-200 -z-10" />

          {[
            { s: 1, label: 'Shipping' },
            { s: 2, label: 'Delivery' },
            { s: 3, label: 'Payment' },
            { s: 4, label: 'Confirmation' },
          ].map(item => {
            const isCompleted = step > item.s;
            const isCurrent = step === item.s;
            return (
              <div key={item.s} className="flex flex-col items-center bg-white px-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    isCompleted
                      ? 'bg-[#18864B] text-white'
                      : isCurrent
                      ? 'bg-[#FF6A00] text-white ring-4 ring-[#FF6A00]/20'
                      : 'bg-neutral-100 text-neutral-400 border border-neutral-200'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : item.s}
                </div>
                <span className={`text-xs font-semibold mt-2 ${isCurrent ? 'text-[#FF6A00]' : 'text-neutral-500'}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {step === 4 && completedOrder ? (
        /* Step 4: Order Confirmation Success View */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 text-center shadow-xl"
        >
          <div className="w-16 h-16 rounded-full bg-[#18864B]/10 text-[#18864B] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs uppercase font-bold tracking-wider text-[#18864B] bg-[#18864B]/10 px-3 py-1 rounded-full">
            Payment Confirmed
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-['Space_Grotesk'] mt-3 mb-2">
            Thank you for your order!
          </h2>

          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
            We have sent an order receipt with tracking details to <strong className="text-neutral-800">{completedOrder.shippingAddress.email}</strong>.
          </p>

          {/* Order Details Card */}
          <div className="bg-[#F7F7F5] rounded-2xl border border-neutral-200/90 p-5 text-left my-8 space-y-3 text-xs">
            <div className="flex justify-between pb-3 border-b border-neutral-200">
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Order Number</span>
                <span className="font-mono font-bold text-sm text-neutral-900">{completedOrder.id}</span>
              </div>
              <div className="text-right">
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Estimated Delivery</span>
                <span className="font-semibold text-neutral-900">{completedOrder.estimatedDelivery}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Tracking Code</span>
              <span className="font-mono font-bold text-[#FF6A00]">{completedOrder.trackingNumber}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Shipping To</span>
              <span className="font-medium text-neutral-800">
                {completedOrder.shippingAddress.street}, {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state}
              </span>
            </div>

            <div className="flex justify-between pt-2 border-t border-neutral-200 font-bold text-sm text-neutral-900">
              <span>Total Paid</span>
              <span className="text-[#FF6A00]">${completedOrder.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setCurrentRoute('orders');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
            >
              View Order Tracking
            </button>
            <button
              onClick={() => {
                setCurrentRoute('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-[#FF6A00] text-white text-xs font-bold hover:bg-[#E85D00] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      ) : (
        /* Steps 1, 2, 3: Form + Order Summary Columns */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Form Area (7 columns) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
            
            {/* Step 1: Customer Info & Address */}
            {step === 1 && (
              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
                  <h3 className="font-bold text-lg text-neutral-900 font-['Space_Grotesk']">
                    1. Shipping Information
                  </h3>
                  <span className="text-xs text-neutral-400">Step 1 of 3</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={e => setAddress({ ...address, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={address.email}
                      onChange={e => setAddress({ ...address, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1">Phone Number (For Delivery SMS)</label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={e => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    onChange={e => setAddress({ ...address, street: e.target.value })}
                    placeholder="House number and street name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={e => setAddress({ ...address, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={e => setAddress({ ...address, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">ZIP Code</label>
                    <input
                      type="text"
                      required
                      value={address.postalCode}
                      onChange={e => setAddress({ ...address, postalCode: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#FF6A00] hover:bg-[#E85D00] text-white font-bold text-xs sm:text-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Shipping Method</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Delivery Speed Option */}
            {step === 2 && (
              <form onSubmit={handleStep2Submit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
                  <h3 className="font-bold text-lg text-neutral-900 font-['Space_Grotesk']">
                    2. Select Shipping Method
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'standard', title: 'Standard Express (3-5 Days)', price: 'FREE', cost: 0, desc: 'Reliable ground courier delivery with tracking' },
                    { id: 'express', title: 'Priority 2-Day Air Delivery', price: '$15.00', cost: 15, desc: 'Guaranteed 2 business day delivery with signature required' },
                    { id: 'overnight', title: 'Overnight Priority Express', price: '$29.00', cost: 29, desc: 'Next morning dispatch with temperature-controlled handling' },
                  ].map(method => (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        shippingMethod === method.id
                          ? 'border-[#FF6A00] bg-[#FF6A00]/5 ring-2 ring-[#FF6A00]/20'
                          : 'border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingOption"
                          checked={shippingMethod === method.id}
                          onChange={() => setShippingMethod(method.id as any)}
                          className="w-4 h-4 text-[#FF6A00] accent-[#FF6A00]"
                        />
                        <div>
                          <p className="font-bold text-xs sm:text-sm text-neutral-900">{method.title}</p>
                          <p className="text-xs text-neutral-500">{method.desc}</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-xs sm:text-sm text-neutral-900">{method.price}</span>
                    </label>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#FF6A00] hover:bg-[#E85D00] text-white font-bold text-xs sm:text-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Payment Method */}
            {step === 3 && (
              <form onSubmit={handlePlaceOrder} className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
                  <h3 className="font-bold text-lg text-neutral-900 font-['Space_Grotesk']">
                    3. Payment Method
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-3 px-2 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#FF6A00] bg-[#FF6A00]/5 text-[#FF6A00]'
                        : 'border-neutral-200 text-neutral-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`py-3 px-2 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'applepay'
                        ? 'border-[#FF6A00] bg-[#FF6A00]/5 text-[#FF6A00]'
                        : 'border-neutral-200 text-neutral-700'
                    }`}
                  >
                    <Zap className="w-5 h-5" />
                    <span>Apple / Google Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-3 px-2 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#FF6A00] bg-[#FF6A00]/5 text-[#FF6A00]'
                        : 'border-neutral-200 text-neutral-700'
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                    <span>Cash on Delivery</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-2xl bg-neutral-900 text-white space-y-3">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">CVV / CVC</label>
                        <input
                          type="password"
                          value={cardCvc}
                          onChange={e => setCardCvc(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#FF6A00] hover:bg-[#E85D00] text-white font-bold text-sm transition-colors shadow-lg shadow-[#FF6A00]/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Pay ${grandTotal.toLocaleString()} &amp; Place Order</span>
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Right Summary Column (5 columns) */}
          <div className="lg:col-span-5 bg-[#F7F7F5] rounded-3xl border border-neutral-200 p-6 sm:p-8 space-y-5">
            <h4 className="font-bold text-base text-neutral-900 font-['Space_Grotesk']">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </h4>

            {/* Compact item previews */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.cartId} className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-neutral-200/80">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-contain bg-neutral-50 rounded-lg p-1 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs text-neutral-900 truncate">{item.product.name}</p>
                    <p className="text-[11px] text-neutral-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-xs text-neutral-900">
                    ${(item.unitPrice * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Details */}
            <div className="pt-4 border-t border-neutral-200 space-y-2 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-neutral-900">${cartSubtotal.toLocaleString()}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#18864B] font-semibold">
                  <span>Discount ({appliedPromo?.discountPercent}%)</span>
                  <span>-${cartDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-semibold text-neutral-900">
                  {shippingCost === 0 ? <span className="text-[#18864B]">FREE</span> : `$${shippingCost}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span className="font-semibold text-neutral-900">${cartTax.toLocaleString()}</span>
              </div>

              <div className="flex justify-between pt-3 border-t border-neutral-200 text-base font-extrabold text-neutral-900">
                <span>Total Due</span>
                <span className="text-[#FF6A00] text-lg">${grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200 text-[11px] text-neutral-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#18864B] shrink-0" />
              <span>Full coverage against damaged, defective, or delayed shipment packages.</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
