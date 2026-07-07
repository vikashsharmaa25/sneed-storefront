import { fetchFromApi } from "./api-client.server";

export async function getCategories() {
    return fetchFromApi<any[]>("categories");
}