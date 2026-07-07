import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CartItem as ApiCartItem, AddToCartPayload } from './api/cart.client';
import { getCart, addToCart as apiAddToCart, updateCartItem, removeFromCart as apiRemoveFromCart, clearCart as apiClearCart } from './api/cart.client';

export type { ApiCartItem as CartItem };

interface CartContextType {
  items: ApiCartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  error: string | null;
  addToCart: (productId: number, productVariantId: number, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ApiCartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const refreshCart = useCallback(async () => {
    if (!isClient) return;

    setIsLoading(true);
    setError(null);
    try {
      const cartItems = await getCart();
      setItems(cartItems);
    } catch (err) {
      console.log('Failed to load cart from API:', err);
      setError('Failed to load cart');
    } finally {
      setIsLoading(false);
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      refreshCart();
    }
  }, [isClient, refreshCart]);

  const addToCart = async (productId: number, productVariantId: number, quantity: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const payload: AddToCartPayload = {
        productId,
        productVariantId,
        quantity,
      };
      await apiAddToCart(payload);
      await refreshCart();
    } catch (err) {
      console.error('Failed to add to cart:', err);
      setError('Failed to add item to cart');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await apiRemoveFromCart(cartItemId);
      await refreshCart();
    } catch (err) {
      console.error('Failed to remove from cart:', err);
      setError('Failed to remove item from cart');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(cartItemId);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await updateCartItem(cartItemId, { quantity });
      await refreshCart();
    } catch (err) {
      console.error('Failed to update quantity:', err);
      setError('Failed to update quantity');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await apiClearCart();
      setItems([]);
    } catch (err) {
      console.error('Failed to clear cart:', err);
      setError('Failed to clear cart');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce((sum, item) => {
    const price = item.sale_price || item.product_variant_price;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      totalItems,
      totalPrice,
      isLoading,
      error,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      refreshCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
