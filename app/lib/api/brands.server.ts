import { fetchFromApi } from "./api-client.server";

export async function getBrands() {
    const response = await fetchFromApi<any>("brands");
    return response.data;
}
