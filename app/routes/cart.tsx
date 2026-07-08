import { useCart } from '~/lib/cart-context';
import { Minus, Plus, Trash2, ArrowLeft, Package, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '~/lib/auth-context';
import { checkout } from '~/lib/api/checkout.client';
import { useState } from 'react';

export default function CartPage() {
  const { items, totalItems, totalPrice, isLoading, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleProceedToCheckout = async () => {
    setIsCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const checkoutItems = items.map((item: any) => ({
        variant_id: item.product_variant_id,
        quantity: item.quantity,
        price: item.sale_price || item.product_variant_price,
        discount_amount: item.discount_amount || 0,
      }));

      let customerId = 'guest';
      if (user) {
        customerId = (typeof window !== 'undefined' ? localStorage.getItem('shopifyCustomerId') : null) || user.uid;
      }

      await checkout({
        items: checkoutItems,
        customer_id: customerId,
      });

      void navigate('/checkout');
    } catch (err) {
      console.error('Checkout failed:', err);
      setCheckoutError('Failed to initialize checkout. Please try again.');
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  const handleRemove = async (id: number) => {
    await removeFromCart(id);
  };

  const handleUpdateQuantity = async (id: number, quantity: number) => {
    await updateQuantity(id, quantity);
  };

  const handleClearCart = async () => {
    await clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item: any) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    {item?.image_url ? (
                      <img src={item?.image_url} alt={item.product_name} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <Package className="w-10 h-10 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.product_name}</h3>
                        {item.product_variant_name && (
                          <p className="text-sm text-gray-600">Variant: {item.product_variant_name}</p>
                        )}
                        <p className="text-red-600 font-semibold">
                          ₹{(item.sale_price || item.product_variant_price).toFixed(2)}
                        </p>
                        {item.discount_amount > 0 && (
                          <p className="text-sm text-green-600">Save ₹{item.discount_amount}</p>
                        )}
                      </div>
                      <button
                        onClick={() => { void handleRemove(item.id); }}
                        disabled={isLoading}
                        className="text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { void handleUpdateQuantity(item.id, item.quantity - 1); }}
                          disabled={isLoading}
                          className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => { void handleUpdateQuantity(item.id, item.quantity + 1); }}
                          disabled={isLoading || item.quantity >= item.available_quantity}
                          className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center disabled:opacity-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {item.inventory_status !== 'in_stock' && (
                      <p className="text-sm text-orange-600 mt-2">
                        {item.inventory_status === 'out_of_stock' ? 'Out of stock' : 'Low stock'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span className="text-red-600">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {checkoutError && (
                  <p className="text-sm text-red-600 text-center">{checkoutError}</p>
                )}
                <button
                  onClick={() => { void handleProceedToCheckout(); }}
                  disabled={isLoading || isCheckoutLoading}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {(isLoading || isCheckoutLoading) ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>
                <button
                  onClick={() => { void handleClearCart(); }}
                  disabled={isLoading}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Clear Cart
                </button>
                <Link
                  to="/"
                  className="w-full block text-center text-gray-600 py-2 hover:text-red-600 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
