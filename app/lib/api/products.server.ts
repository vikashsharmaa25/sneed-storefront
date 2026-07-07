import { fetchFromApi } from "./api-client.server";

export async function getProducts(params?: {
    languageCode?: string;
    currencyCodeId?: number;
    productName?: string;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    brandId?: number;
    sortBy?: string;
    sortOrder?: string;
    limit?: number;
    offset?: number;
}) {
    const queryParams = new URLSearchParams();
    
    if (params?.languageCode) queryParams.append('languageCode', params.languageCode);
    if (params?.currencyCodeId) queryParams.append('currencyCodeId', params.currencyCodeId.toString());
    if (params?.productName) queryParams.append('productName', params.productName);
    if (params?.categoryId) queryParams.append('categoryId', params.categoryId.toString());
    if (params?.brandId) queryParams.append('brandId', params.brandId.toString());
    if (params?.minPrice) queryParams.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
    if (params?.inStock !== undefined) queryParams.append('inStock', params.inStock.toString());
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    
    const url = queryParams.toString() ? `products?${queryParams.toString()}` : 'products';
    const response = await fetchFromApi<any>(url);
    return response.data;
}

export async function getProductById(id: string) {
    const response = await fetchFromApi<any>(`products/${id}`);
    return response.data || response;
}