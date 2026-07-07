import { fetchFromApi } from "./api-client";

export type CheckoutItem = {
  variant_id: number;
  quantity: number;
  price: number;
  discount_amount: number;
};

export type CheckoutPayload = {
  items: CheckoutItem[];
  customer_id: string;
};

export async function checkout(payload: CheckoutPayload): Promise<{ order_id: string; status: string }> {
  return await fetchFromApi<{ order_id: string; status: string }>("checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
