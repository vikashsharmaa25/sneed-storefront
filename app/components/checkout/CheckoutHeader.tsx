import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';

export function CheckoutHeader() {
  return (
    <>
      {/* Header / Brand Logo */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">
        Sneed Coding Solutions
      </h1>

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
        <Link to="/cart" className="hover:underline text-blue-600 transition-colors">Cart</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-900 font-medium">Information</span>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-400">Shipping</span>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-400">Payment</span>
      </nav>
    </>
  );
}
