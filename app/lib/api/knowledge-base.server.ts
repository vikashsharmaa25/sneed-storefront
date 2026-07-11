import { fetchFromApi } from "./api-client.server";

export interface KnowledgeBaseItem {
    id: string;
    title: string;
    author: string;
    summary: string;
    problem: string;
    solution: string[] | null;
    category: string;
    language: string;
    file_key: string;
    related_info: string[];
    region: string[];
    tags: string[];
    last_updated: string;
    [key: string]: any;
}

export interface KnowledgeBaseResponse {
    total_count: number;
    data: KnowledgeBaseItem[];
    count: number;
    lastKey: string | null;
}

export async function getKnowledgeBase(limit?: number, lastKey?: string | null): Promise<KnowledgeBaseResponse> {
    let query = '';
    if (limit) query += `limit=${limit}`;
    if (lastKey) query += `${query ? '&' : ''}exclusiveStartKey=${lastKey}`;
    
    const endpoint = `knowledge-base${query ? `?${query}` : ''}`;
    const response = await fetchFromApi<KnowledgeBaseResponse>(endpoint);
    return response;
}

export async function getKnowledgeBaseById(id: string): Promise<KnowledgeBaseItem> {
    const response = await fetchFromApi<KnowledgeBaseItem>(`knowledge-base/${id}`);
    return response;
}

// Server-side cache implementation
interface KBCache {
    items: KnowledgeBaseItem[];
    totalCount: number;
    lastFetched: number;
    isFetching: boolean;
}

const GLOBAL_KB_CACHE_KEY = "__kb_cache_global__";

function getGlobalCache(): KBCache {
    const g = globalThis as any;
    if (!g[GLOBAL_KB_CACHE_KEY]) {
        g[GLOBAL_KB_CACHE_KEY] = {
            items: [],
            totalCount: 0,
            lastFetched: 0,
            isFetching: false,
        };
    }
    return g[GLOBAL_KB_CACHE_KEY];
}

async function fetchAllItemsSequentially(): Promise<{ items: KnowledgeBaseItem[]; totalCount: number }> {
    let allItems: KnowledgeBaseItem[] = [];
    let lastKey: string | null = null;
    let limit = 100;
    let page = 1;
    let totalCountFromApi = 0;

    try {
        do {
            let query = `limit=${limit}`;
            if (lastKey) query += `&exclusiveStartKey=${lastKey}`;
            const res = await fetchFromApi<KnowledgeBaseResponse>(`knowledge-base?${query}`);
            
            if (res.total_count) {
                totalCountFromApi = res.total_count;
            }
            if (res.data && Array.isArray(res.data)) {
                // Deduplicate items
                const existingIds = new Set(allItems.map(i => i.id));
                const newItems = res.data.filter(i => !existingIds.has(i.id));
                allItems.push(...newItems);
            }
            lastKey = res.lastKey;
            page++;
            // Yield to event loop to avoid blocking server execution
            await new Promise(resolve => setTimeout(resolve, 50));
        } while (lastKey && allItems.length < 3000);
    } catch (err) {
        console.error("Failed to fetch sequential items for KB cache:", err);
        throw err;
    }

    return {
        items: allItems,
        totalCount: totalCountFromApi || allItems.length
    };
}

export async function getKnowledgeBaseCached(waitUntil?: (promise: Promise<any>) => void): Promise<{ items: KnowledgeBaseItem[]; totalCount: number; syncing: boolean }> {
    const cache = getGlobalCache();
    const now = Date.now();
    const CACHE_TTL = 30 * 60 * 1000; // 30 minutes cache

    // If cache is empty, fetch the first page synchronously to return some data immediately
    if (cache.items.length === 0) {
        if (!cache.isFetching) {
            cache.isFetching = true;
            try {
                const firstPage = await fetchFromApi<KnowledgeBaseResponse>(`knowledge-base?limit=100`);
                cache.items = firstPage.data || [];
                cache.totalCount = firstPage.total_count || cache.items.length;
                cache.lastFetched = now;

                // Fire background task to load the rest
                const backgroundFetchPromise = (async () => {
                    try {
                        const result = await fetchAllItemsSequentially();
                        cache.items = result.items;
                        cache.totalCount = result.totalCount;
                        cache.lastFetched = Date.now();
                        console.log(`Background KB Cache population completed. Loaded ${cache.items.length} items.`);
                    } catch (e) {
                        console.error("Background sequential KB fetch failed:", e);
                    } finally {
                        cache.isFetching = false;
                    }
                })();

                if (waitUntil) {
                    waitUntil(backgroundFetchPromise);
                }
            } catch (err) {
                cache.isFetching = false;
                console.error("Failed to fetch initial page for KB cache:", err);
                throw err;
            }
        }
        return { items: cache.items, totalCount: cache.totalCount, syncing: true };
    }

    // Stale-While-Revalidate pattern: return stale cache immediately and fetch in background
    const isExpired = now - cache.lastFetched > CACHE_TTL;
    if (isExpired && !cache.isFetching) {
        cache.isFetching = true;
        const backgroundRevalidatePromise = (async () => {
            try {
                const result = await fetchAllItemsSequentially();
                cache.items = result.items;
                cache.totalCount = result.totalCount;
                cache.lastFetched = Date.now();
                console.log(`Background KB Cache revalidation completed. Loaded ${cache.items.length} items.`);
            } catch (e) {
                console.error("Background sequential KB revalidation failed:", e);
            } finally {
                cache.isFetching = false;
            }
        })();

        if (waitUntil) {
            waitUntil(backgroundRevalidatePromise);
        }
    }

    return {
        items: cache.items,
        totalCount: cache.totalCount,
        syncing: cache.isFetching
    };
}

