import { Package } from 'lucide-react';
import type { CartItem } from '~/lib/cart-context';

interface OrderSummaryProps {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  tax: number;
  shippingCost: number;
  grandTotal: number;
}

export function OrderSummary({
  items,
  totalItems,
  subtotal,
  tax,
  shippingCost,
  grandTotal,
}: OrderSummaryProps) {
  return (
    <div className="lg:col-span-5 bg-[#fafafa] px-4 py-8 sm:px-8 lg:px-12 lg:py-12 flex flex-col items-start w-full">
      <div className="max-w-md w-full">

        {/* Products List */}
        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-1.5">
              <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center shrink-0 relative">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.product_name}
                    className="w-full h-full object-contain p-1 rounded-lg"
                  />
                ) : (
                  <Package className="w-8 h-8 text-gray-300" />
                )}
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold border border-white">
                  {item.quantity}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 truncate">
                  {item.product_name}
                </h4>
                {item.product_variant_name && (
                  <p className="text-xs text-gray-500 truncate">
                    {item.product_variant_name}
                  </p>
                )}
                <p className="text-[10px] text-gray-400 font-mono">
                  ID: {item.product_variant_id}
                </p>
              </div>

              <div className="text-sm font-semibold text-gray-950">
                ₹{((item.sale_price || item.product_variant_price) * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Calculations */}
        <div className="border-t border-gray-200 pt-5 mt-5 space-y-2.5">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal • {totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
            <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span className="text-gray-500 font-medium">Free</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Tax (18%)</span>
            <span className="text-gray-950 font-semibold">₹{tax.toFixed(2)}</span>
          </div>

          <div className="border-t border-gray-200 pt-5 mt-5 flex justify-between items-baseline">
            <span className="text-base font-semibold text-gray-900">Total</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-gray-400 font-bold">INR</span>
              <span className="text-xl font-bold text-gray-950">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
