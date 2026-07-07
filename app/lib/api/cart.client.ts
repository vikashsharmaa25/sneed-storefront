import { fetchFromApi } from "./api-client";


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
  image_url?: string;
};

export type AddToCartPayload = {
  productId: number;
  productVariantId: number;
  quantity: number;
};

export type UpdateCartPayload = {
  quantity: number;
};

export async function getCart(currencyCodeId: number = 1): Promise<CartItem[]> {
  const endpoint = `cart?currencyCodeId=${currencyCodeId}`;
  console.log("Get Cart API Endpoint:", endpoint);
  const data = await fetchFromApi<CartItem[]>(endpoint);
  console.log("Get Cart API Data:", data);
  return data;
}

export async function addToCart(payload: AddToCartPayload, currencyCodeId: number = 1): Promise<CartItem> {
  const endpoint = `cart?currencyCodeId=${currencyCodeId}`;
  console.log("Add Cart API Endpoint:", endpoint);
  console.log("Add Cart API Payload:", payload);
  return await fetchFromApi<CartItem>(endpoint, {
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
