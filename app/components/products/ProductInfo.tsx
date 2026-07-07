import React, { useState } from 'react';
import { Share2, Heart, ChevronDown } from 'lucide-react';
import type { Product } from './types';
import { useCart } from '~/lib/cart-context';

interface ProductInfoProps {
  product: Product;
  onAddToCart?: (quantity: number) => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || ''
  );
  const { addToCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    console.log("test")
    const productId = parseInt(product.id, 10) || 0;
    const productVariantId = 0;

    if (!productId) {
      alert('Invalid product ID');
      return;
    }

    try {
      await addToCart(productId, productVariantId, quantity);
      onAddToCart?.(quantity);
      alert(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart!`);
    } catch (err) {
      alert('Failed to add item to cart. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          {product.sku && (
            <div className="text-sm text-gray-500 mb-2">{product.sku}</div>
          )}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {product.title}
          </h1>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-red-600">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice}
              </span>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            {product.discount && (
              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded">
                {product.discount} OFF
              </span>
            )}
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              On Sale
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            aria-label="Share product"
          >
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
          <button
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            aria-label="Add to wishlist"
          >
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {product.variants && product.variants.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Variant
            </label>
            <div className="relative">
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {product.variants.map((variant, index) => (
                  <option key={index} value={variant}>
                    {variant}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-16 h-10 text-center border border-gray-300 rounded-lg"
              aria-label="Quantity"
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          ADD TO CART
        </button>
      </div>

      {product.features && product.features.length > 0 && (
        <div className="space-y-3 pt-4 border-t">
          <h3 className="font-semibold text-gray-900">Key Features</h3>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-green-600">
            Free Existing Info/trial • (You can begin FREE 30-payment AC.)
          </p>
        </div>
      )}
    </div>
  );
};
