import { fetchFromApi } from "./api-client.server";

export async function getSuccessStories() {
    const response = await fetchFromApi<any>("content/success-stories");
    return response.data;
}

export async function getBlogs() {
    const response = await fetchFromApi<any>("content/blogs");
    return response.data;
}

export async function getSeoArticles() {
    const response = await fetchFromApi<any>("content/seo-articles");
    return response.data;
}

export async function getBlogById(id: string | number) {
    const response = await fetchFromApi<any>(`content/blogs/${id}`);
    return response;
}

export async function getSuccessStoryById(id: string | number) {
    const response = await fetchFromApi<any>(`content/success-stories/${id}`);
    return response;
}

export async function getSeoArticleById(id: string | number) {
    const response = await fetchFromApi<any>(`content/seo-articles/${id}`);
    return response;
}

export async function getMessageSections() {
    const response = await fetchFromApi<any>("home-page-management/message-section");
    return response;
}

// Add cache-busting helper function for client-side calls
export async function fetchContentWithoutCache(contentType: string) {
    const timestamp = Date.now();
    const response = await fetchFromApi<any>(`content/${contentType}?_t=${timestamp}`);
    return response.data;
}

export async function getContentRecommendations() {
    const response = await fetchFromApi<any>("home/content-recommendations");
    return response.data;
}

export async function getTempSeoArticles() {
    const response = await fetchFromApi<any>("temp-seo-articles");
    return response.data || [];
}

export async function getTempSeoArticleById(id: string | number) {
    const response = await fetchFromApi<any>(`temp-seo-articles/${id}`);
    return response;
}

export interface PerformanceGuaranteeItem {
    id: number;
    page: string;
    sectionKey: string;
    title: string | null;
    subtitle: string | null;
    content: string | null;
    status: string;
}

export async function getPerformanceGuarantee(): Promise<PerformanceGuaranteeItem[]> {
    const response = await fetchFromApi<PerformanceGuaranteeItem[]>("performance-guarantee/performance-guarantee");
    return response || [];
}
