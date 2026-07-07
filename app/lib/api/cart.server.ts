import { fetchFromApi } from "./api-client.server";

export type CartItem = {
  id: number;
  product_id: number;
  product_variant_id: number;
  quantity: number;
  product_name: string;
  product_variant_name: string;
  product_variant_price: number;
  sale_price: number;
  discount_amount: number;
  inventory_status: "in_stock" | "out_of_stock" | "low_stock";
  available_quantity: number;
  sale: null | object;
};

export type AddToCartPayload = {
  productId: number;
  productVariantId: number;
  quantity: number;
};

export type UpdateCartPayload = {
  quantity: number;
};

export async function getCart(): Promise<CartItem[]> {
  return await fetchFromApi<CartItem[]>("cart");
}

export async function addToCart(payload: AddToCartPayload): Promise<CartItem> {
  return await fetchFromApi<CartItem>("cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function updateCartItem(cartItemId: number, payload: UpdateCartPayload): Promise<CartItem> {
  return await fetchFromApi<CartItem>(`cart/${cartItemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function removeFromCart(cartItemId: number): Promise<void> {
  return await fetchFromApi<void>(`cart/${cartItemId}`, {
    method: "DELETE",
  });
}

export async function clearCart(): Promise<void> {
  const cartItems = await getCart();
  await Promise.all(cartItems.map(item => removeFromCart(item.id)));
}
