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

export async function getIndustryBySlug(slug: string) {
    const queryParams = new URLSearchParams();
    queryParams.append('status', 'active');
    queryParams.append('offset', '0');

    const response = await fetchFromApi<any>(`industries?${queryParams.toString()}`);
    const allIndustries: any[] = response.data || [];
    return allIndustries.find((ind: any) => ind.slug === slug) || null;
}

