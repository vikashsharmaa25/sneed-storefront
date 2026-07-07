import { SERVER_BASE_URL } from "./config";

export async function fetchFromApi<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const url = `${SERVER_BASE_URL}/${endpoint}`;

    const res = await fetch(url, {
        ...options,
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            ...options?.headers,
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch ${endpoint}`);
    }

    const text = await res.text();
    return (text ? JSON.parse(text) : {}) as T;
}
