import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '~/lib/auth-context';
import { getOrders } from '~/lib/api/orders.client';
import { Link } from 'react-router';
import { Package, ShoppingBag, Eye, Calendar, Loader2, AlertCircle } from 'lucide-react';

interface OrderItem {
  id?: number;
  productId?: number;
  productVariantId?: number;
  quantity: number;
  price?: number;
  sale_price?: number;
  product_name?: string;
}

interface Order {
  id: number | string;
  order_id?: string;
  createdAt?: string;
  created_at?: string;
  status?: string;
  order_status?: string;
  total_price?: number | string;
  totalPrice?: number;
  grandTotal?: number;
  grand_total?: number;
  currency?: string;
  shopify_order_id?: string;
  shopify_order_name?: string;
  customer_email?: string;
  items?: OrderItem[];
}

export function OrdersList() {
  const { user, loading: authLoading, openAuthModal } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getOrders();
      // Handle response wrapper (e.g. { success: true, data: { total_count: 1, data: [...] } })
      const orderList = data?.data?.data || (Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []));
      setOrders(orderList);
    } catch (err: any) {
      console.error('Failed to fetch orders:', err);
      setError('Failed to load your orders. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && user) {
      void fetchUserOrders();
    } else if (!authLoading && !user) {
      setIsLoading(false);
    }
  }, [user, authLoading, fetchUserOrders]);

  // Format Status Badge
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
        <p className="text-gray-500 font-medium">Loading your orders...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 px-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">View Your Orders</h2>
          <p className="text-gray-600 mb-6">Please sign in to your account to view your purchase history and order status.</p>
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

  if (error) {
    return (
      <div className="max-w-2xl mx-auto my-12 px-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-red-800 mb-1">Unable to Load Orders</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => { void fetchUserOrders(); }}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto my-16 px-4 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-950 mb-2">No Orders Yet</h2>
        <p className="text-gray-600 mb-8">You haven&apos;t placed any orders with us yet. Start exploring our collections today!</p>
        <Link
          to="/"
          className="bg-red-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-5">
        <ShoppingBag className="w-8 h-8 text-red-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Purchases</h1>
          <p className="text-sm text-gray-500 mt-1">Track and review all your shop orders</p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const dateVal = order.createdAt || order.created_at;
          const formattedDate = dateVal
            ? new Date(dateVal).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
            : 'Date unavailable';

          const status = order.status || order.order_status || 'pending';
          const rawTotal = order.total_price || order.totalPrice || order.grandTotal || order.grand_total || 0;
          const total = typeof rawTotal === 'string' ? parseFloat(rawTotal) : rawTotal;
          const currencySymbol = order.currency === 'USD' ? '$' : '₹';
          const totalItems = order.items?.reduce((acc, curr) => acc + curr.quantity, 0) || order.items?.length || 0;

          return (
            <div
              key={order.id}
              className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-gray-900 font-mono">
                    Order: {order.shopify_order_name || `#${order.id}`}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold uppercase tracking-wider ${getStatusStyle(status)}`}>
                    {status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {formattedDate}
                  </span>
                  <span>
                    • &nbsp; {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                <div className="text-left md:text-right">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Amount</p>
                  <p className="text-xl font-bold text-gray-900">
                    {currencySymbol}{total.toFixed(2)}
                  </p>
                </div>

                <Link
                  to={`/orders/${order.id}`}
                  className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors shrink-0"
                >
                  <Eye className="w-4 h-4 text-gray-500" />
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
