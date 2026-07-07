import { fetchFromApi } from "./api-client.server";

export async function getIndustries(params?: {
    id?: number;
    status?: string;
    offset?: number;
    limit?: number;
}) {
    const queryParams = new URLSearchParams();
    
    if (params?.id) queryParams.append('id', params.id.toString());
    queryParams.append('status', params?.status || 'active');
    queryParams.append('offset', (params?.offset || 0).toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const url = queryParams.toString() ? `industries?${queryParams.toString()}` : 'industries';
    const response = await fetchFromApi<any>(url);
    return response.data;
}
