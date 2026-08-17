import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MapPin,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { orders, setCurrentRoute, addToast } = useCart();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(
    orders.length > 0 ? orders[0].id : null
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case 'In Transit':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            <Truck className="w-3.5 h-3.5" /> In Transit
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
            <Package className="w-3.5 h-3.5" /> Shipped
          </span>
        );
      case 'Processing':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
            <Clock className="w-3.5 h-3.5" /> Processing
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-neutral-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF6A00] mb-1">
            <Package className="w-4 h-4" />
            <span>Order History &amp; Logistics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-['Space_Grotesk'] tracking-tight">
            My Orders ({orders.length})
          </h1>
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map(order => {
            const isExpanded = expandedOrderId === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-neutral-200/90 overflow-hidden shadow-sm transition-all"
              >
                {/* Order Top Summary Bar */}
                <div
                  onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                  className="p-6 bg-[#F7F7F5] border-b border-neutral-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs">
                    <div>
                      <span className="text-neutral-400 block text-[10px] uppercase font-bold">Order ID</span>
                      <span className="font-mono font-bold text-sm text-neutral-900">{order.id}</span>
                    </div>

                    <div>
                      <span className="text-neutral-400 block text-[10px] uppercase font-bold">Date Placed</span>
                      <span className="font-semibold text-neutral-800">{order.date}</span>
                    </div>

                    <div>
                      <span className="text-neutral-400 block text-[10px] uppercase font-bold">Total Amount</span>
                      <span className="font-extrabold text-neutral-900 text-sm">
                        ${order.total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {getStatusBadge(order.status)}
                    <button
                      className="p-1 rounded-full text-neutral-400 hover:text-neutral-900"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details & Timeline */}
                {isExpanded && (
                  <div className="p-6 sm:p-8 space-y-8">
                    {/* Visual Shipment Timeline */}
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-400 mb-4 font-['Space_Grotesk']">
                        Live Shipment Tracking &bull; Tracking #{order.trackingNumber}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                        {[
                          { title: 'Order Placed', desc: 'Verified & authorized', active: true },
                          { title: 'Processing', desc: 'Quality checked & packed', active: true },
                          {
                            title: 'In Transit',
                            desc: 'Carrier linehaul dispatch',
                            active: order.status === 'In Transit' || order.status === 'Delivered',
                          },
                          {
                            title: 'Delivered',
                            desc: `Est. ${order.estimatedDelivery}`,
                            active: order.status === 'Delivered',
                          },
                        ].map((step, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-2xl border text-xs ${
                              step.active
                                ? 'border-[#FF6A00] bg-[#FF6A00]/5 text-neutral-900'
                                : 'border-neutral-200 bg-neutral-50/50 text-neutral-400'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1.5 font-bold">
                              <span
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${
                                  step.active ? 'bg-[#FF6A00]' : 'bg-neutral-300'
                                }`}
                              >
                                {idx + 1}
                              </span>
                              <span>{step.title}</span>
                            </div>
                            <p className="text-[11px] text-neutral-500">{step.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ordered Items Grid */}
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-400 mb-3 font-['Space_Grotesk']">
                        Included Products
                      </h4>
                      <div className="divide-y divide-neutral-100 border border-neutral-200 rounded-2xl overflow-hidden">
                        {order.items.map(item => (
                          <div key={item.cartId} className="p-4 flex items-center justify-between gap-4 bg-white">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-12 h-12 object-contain bg-neutral-50 rounded-xl p-1.5 border border-neutral-200 shrink-0"
                              />
                              <div>
                                <h5 className="font-bold text-xs sm:text-sm text-neutral-900">{item.product.name}</h5>
                                <div className="text-[11px] text-neutral-400 flex items-center gap-2 mt-0.5">
                                  <span>Qty: {item.quantity}</span>
                                  {item.selectedColor && <span>&bull; Color: {item.selectedColor}</span>}
                                  {item.selectedStorage && <span>&bull; {item.selectedStorage}</span>}
                                </div>
                              </div>
                            </div>
                            <span className="font-bold text-xs sm:text-sm text-neutral-900">
                              ${(item.unitPrice * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Destination and Method */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-neutral-200/80 space-y-1">
                        <span className="font-bold text-neutral-900 block flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#FF6A00]" /> Destination Address
                        </span>
                        <p className="text-neutral-600 font-medium">{order.shippingAddress.fullName}</p>
                        <p className="text-neutral-500">
                          {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-neutral-200/80 space-y-1">
                        <span className="font-bold text-neutral-900 block flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-[#FF6A00]" /> Method &amp; Payment
                        </span>
                        <p className="text-neutral-600 font-medium">Service: {order.shippingMethod}</p>
                        <p className="text-neutral-500">Billed: {order.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#F7F7F5] rounded-3xl border border-neutral-200 p-16 text-center max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center mx-auto mb-4 text-neutral-400 shadow-sm">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 font-['Space_Grotesk']">
            No order history found
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xs mx-auto">
            When you complete an order, your real-time tracking code and receipt will appear here.
          </p>
          <button
            onClick={() => setCurrentRoute('shop')}
            className="mt-6 px-6 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#E85D00] text-white text-xs font-bold transition-colors shadow-sm"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};
