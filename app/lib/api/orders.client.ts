import { fetchFromApi } from "./api-client";
import { auth } from "../firebase";

export type OrderAddress = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type OrderItem = {
  productId: number;
  productVariantId: number;
  quantity: number;
};

export type OrderPayload = {
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  phone: string;
  currency: string;
  shippingMethod: string;
  shippingCost: number;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  items: OrderItem[];
};

export async function placeOrder(payload: OrderPayload): Promise<any> {
  const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return await fetchFromApi<any>("orders", {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
}

export async function getOrders(): Promise<any> {
  const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return await fetchFromApi<any>("orders", {
    method: "GET",
    headers,
  });
}

export async function getOrderById(orderId: string): Promise<any> {
  const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return await fetchFromApi<any>(`orders/${orderId}`, {
    method: "GET",
    headers,
  });
}
