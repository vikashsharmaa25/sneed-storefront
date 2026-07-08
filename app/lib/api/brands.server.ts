import { fetchFromApi } from "./api-client.server";

export async function getBrands() {
    const response = await fetchFromApi<any>("brands");
    return response.data;
}

export async function getBrandById(id: string) {
    // No single-brand endpoint exists — filter from the list
    const response = await fetchFromApi<any>("brands");
    const brands: any[] = response.data || [];
    return brands.find((b: any) => String(b.id) === String(id)) || null;
}
