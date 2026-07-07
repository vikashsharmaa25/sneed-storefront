import { CLIENT_BASE_URL } from "./config";

export async function fetchFromApi<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const url = `${CLIENT_BASE_URL}/${endpoint}`;

    const res = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
            ...options?.headers,
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch ${endpoint}`);
    }

    const text = await res.text();
    return (text ? JSON.parse(text) : {}) as T;
}
