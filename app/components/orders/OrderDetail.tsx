import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '~/lib/auth-context';
import { getOrderById } from '~/lib/api/orders.client';
import { Link } from 'react-router';
import { ArrowLeft, Package, Calendar, MapPin, Mail, Phone, Truck, FileText, Loader2, AlertCircle } from 'lucide-react';

interface OrderAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface OrderItem {
  id?: number;
  productId: number;
  productVariantId: number;
  quantity: number;
  price?: number;
  sale_price?: number;
  product_name?: string;
  product_variant_name?: string;
  image_url?: string;
}

interface Order {
  id: number | string;
  createdAt?: string;
  created_at?: string;
  status?: string;
  order_status?: string;
  customerEmail?: string;
  customerFirstName?: string;
  customerLastName?: string;
  phone?: string;
  currency?: string;
  shippingMethod?: string;
  shippingCost?: number;
  shippingAddress?: OrderAddress;
  billingAddress?: OrderAddress;
  items?: OrderItem[];
}

interface OrderDetailProps {
  orderId: string;
}

export function OrderDetail({ orderId }: OrderDetailProps) {
  const { user, loading: authLoading, openAuthModal } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderDetail = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getOrderById(orderId);
      // Handle response wrapper (e.g. { success: true, data: {...} })
      const orderData = data?.data || data;
      if (orderData) {
        setOrder(orderData);
      } else {
        setError('Order not found.');
      }
    } catch (err: any) {
      console.error('Failed to fetch order details:', err);
      setError('Failed to load order details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (!authLoading && user) {
      void fetchOrderDetail();
    } else if (!authLoading && !user) {
      setIsLoading(false);
    }
  }, [user, authLoading, fetchOrderDetail]);

  const getStatusStyle = (status = 'pending') => {
    const s = status.toLowerCase();
    if (s === 'completed' || s === 'delivered' || s === 'paid' || s === 'success') {
      return 'bg-green-50 text-green-700 border-green-200';
    }
    if (s === 'processing' || s === 'shipped' || s === 'placed') {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    }
    if (s === 'cancelled' || s === 'failed' || s === 'refunded') {
      return 'bg-red-50 text-red-700 border-red-200';
    }
    return 'bg-yellow-50 text-yellow-700 border-yellow-200';
  };

  if (authLoading || (user && isLoading)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-red-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Fetching order details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 px-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please sign in to view this order details.</p>
          <button
            onClick={() => openAuthModal('login')}
            className="inline-block w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors text-center cursor-pointer border-none"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-2xl mx-auto my-12 px-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-red-800 mb-1">Error Loading Order</h3>
          <p className="text-red-600 mb-4">{error || 'Order not found.'}</p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/orders"
              className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Back to Orders
            </Link>
            <button
              onClick={() => { void fetchOrderDetail(); }}
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const dateVal = order.createdAt || order.created_at;
  const formattedDate = dateVal
    ? new Date(dateVal).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    : 'Date unavailable';

  const status = order.status || order.order_status || 'pending';
  const currencySymbol = order.currency === 'USD' ? '$' : '₹';

  // Calculate prices based on items
  const subtotal = order.items?.reduce((sum, item) => {
    const price = item.sale_price || item.price || 0;
    return sum + (price * item.quantity);
  }, 0) || 0;
  const shippingCost = order.shippingCost || 0;
  const tax = subtotal * 0.18; // 18% Tax
  const grandTotal = subtotal + shippingCost + tax;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Navigation / Back button */}
      <Link
        to="/orders"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 font-medium mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Purchases
      </Link>

      {/* Header Block */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3.5">
            <h1 className="text-2xl font-bold text-gray-900 font-mono">
              Order #{order.id}
            </h1>
            <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold uppercase tracking-wider ${getStatusStyle(status)}`}>
              {status}
            </span>
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            Placed on {formattedDate}
          </p>
        </div>

        <div className="text-left md:text-right border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 w-full md:w-auto">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Grand Total</p>
          <p className="text-2xl font-extrabold text-red-600">
            {currencySymbol}{grandTotal.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Content Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Order Items & Pricing Breakdown */}
        <div className="lg:col-span-8 space-y-6">

          {/* Items Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-400" />
              Order Items
            </h2>

            <div className="divide-y divide-gray-100">
              {order.items?.map((item, idx) => {
                const itemPrice = item.sale_price || item.price || 0;
                return (
                  <div key={item.id || idx} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center shrink-0">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.product_name || 'Product Image'}
                          className="w-full h-full object-cover p-1 rounded-lg"
                        />
                      ) : (
                        <Package className="w-8 h-8 text-gray-300" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {item.product_name || `Product Variant #${item.productVariantId}`}
                      </h4>
                      {item.product_variant_name && (
                        <p className="text-xs text-gray-500 mt-0.5 truncate">
                          {item.product_variant_name}
                        </p>
                      )}
                      <p className="text-[10px] text-gray-400 font-mono mt-1">
                        ID: {item.productVariantId}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {currencySymbol}{itemPrice.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 font-medium">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calculations / Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-400" />
              Payment Summary
            </h2>

            <div className="space-y-3 font-medium text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">{currencySymbol}{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">{shippingCost === 0 ? 'Free' : `${currencySymbol}${shippingCost.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Tax (18% GST)</span>
                <span className="font-semibold text-gray-900">{currencySymbol}{tax.toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-baseline">
                <span className="text-base font-bold text-gray-950">Grand Total</span>
                <span className="text-2xl font-extrabold text-red-600">
                  {currencySymbol}{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Customer & Delivery Details */}
        <div className="lg:col-span-4 space-y-6">

          {/* Customer / Shipping Address Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              Delivery Details
            </h3>

            <div className="space-y-5 text-sm font-medium">
              {/* Customer Names */}
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Customer</p>
                <p className="text-gray-900">
                  {order.customerFirstName || ''} {order.customerLastName || ''}
                </p>
              </div>

              {/* Email */}
              {order.customerEmail && (
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email
                  </p>
                  <p className="text-gray-900 break-all">{order.customerEmail}</p>
                </div>
              )}

              {/* Phone */}
              {order.phone && (
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Phone
                  </p>
                  <p className="text-gray-900 font-mono">{order.phone}</p>
                </div>
              )}

              {/* Shipping Address */}
              {order.shippingAddress && (
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Shipping Address</p>
                  <div className="text-gray-800 text-xs leading-relaxed space-y-0.5">
                    <p>{order.shippingAddress.addressLine1}</p>
                    {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                    </p>
                    <p className="font-semibold">{order.shippingAddress.country}</p>
                  </div>
                </div>
              )}

              {/* Shipping Method */}
              {order.shippingMethod && (
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Shipping Method
                  </p>
                  <p className="text-gray-900">{order.shippingMethod}</p>
                </div>
              )}
            </div>
          </div>

          {/* Billing Address Card */}
          {order.billingAddress && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-400" />
                Billing Details
              </h3>

              <div className="space-y-4 text-sm font-medium">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Billing Address</p>
                  <div className="text-gray-800 text-xs leading-relaxed space-y-0.5">
                    <p>{order.billingAddress.addressLine1}</p>
                    {order.billingAddress.addressLine2 && <p>{order.billingAddress.addressLine2}</p>}
                    <p>
                      {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.postalCode}
                    </p>
                    <p className="font-semibold">{order.billingAddress.country}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
