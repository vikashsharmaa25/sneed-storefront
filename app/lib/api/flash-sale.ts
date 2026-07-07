import { fetchFromApi } from "./api-client.server";

export async function getFlashSales() {
    const response = await fetchFromApi<any[]>("sales/active");
    return response;
}
