import React, { useState, useEffect } from 'react';
import { useLoaderData, useRevalidator, useNavigation, useSearchParams } from 'react-router';
import { Container } from '~/components/ui/Container';
import { getKnowledgeBaseCached, getKnowledgeBase } from '~/lib/api/knowledge-base.server';
import { KnowledgeBaseHero } from '~/components/knowledge-base/KnowledgeBaseHero';
import { KnowledgeBaseFilterBar } from '~/components/knowledge-base/KnowledgeBaseFilterBar';
import { KnowledgeBaseCard, KnowledgeBaseCardSkeleton } from '~/components/knowledge-base/KnowledgeBaseCard';
import { KnowledgeBaseEmptyState } from '~/components/knowledge-base/KnowledgeBaseEmptyState';
import { KnowledgeBasePagination } from '~/components/knowledge-base/KnowledgeBasePagination';

export async function loader({ request, context }: any) {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit')!) : 10;
    const exclusiveStartKey = url.searchParams.get('exclusiveStartKey') || null;
    const category = url.searchParams.get('category') || undefined;
    const language = url.searchParams.get('language') || undefined;
    const author = url.searchParams.get('author') || undefined;
    const region = url.searchParams.get('region') || undefined;
    const tags = url.searchParams.get('tags') || undefined;
    const from = url.searchParams.get('from') || undefined;
    const to = url.searchParams.get('to') || undefined;
    const q = url.searchParams.get('q') || undefined;

    try {
        // 1. Fetch dynamically filtered results from API
        const apiResponse = await getKnowledgeBase({
            limit,
            exclusiveStartKey,
            category,
            language,
            author,
            region,
            tags,
            from,
            to,
            q
        });

        // 2. Fetch cache to get dynamic filter lists (categories, languages, authors, etc.)
        const { items: allCachedItems, syncing } = await getKnowledgeBaseCached(context?.waitUntil);

        // Extract unique options from the cached items
        const categoriesList = Array.from(new Set(allCachedItems.map(item => item.category).filter(Boolean))).sort();
        const languagesList = Array.from(new Set(allCachedItems.map(item => item.language).filter(Boolean))).sort();
        const authorsList = Array.from(new Set(allCachedItems.map(item => item.author).filter(Boolean))).sort();
        const regionsList = Array.from(new Set(allCachedItems.flatMap(item => item.region || []).filter(Boolean))).sort();
        const tagsList = Array.from(new Set(allCachedItems.flatMap(item => item.tags || []).filter(Boolean))).sort();

        return {
            items: apiResponse.data || [],
            total_count: apiResponse.total_count || 0,
            lastKey: apiResponse.lastKey || null,
            syncing,
            filterOptions: {
                categories: categoriesList,
                languages: languagesList,
                authors: authorsList,
                regions: regionsList,
                tags: tagsList
            }
        };
    } catch (error) {
        return {
            items: [],
            total_count: 0,
            lastKey: null,
            syncing: false,
            filterOptions: {
                categories: [],
                languages: [],
                authors: [],
                regions: [],
                tags: []
            }
        };
    }
}

export default function KnowledgeBaseRoute() {
    const { items, total_count, lastKey, syncing, filterOptions } = useLoaderData<typeof loader>();
    const revalidator = useRevalidator();
    const navigation = useNavigation();
    const [searchParams, setSearchParams] = useSearchParams();

    // Revalidate data periodically if server cache is still syncing
    useEffect(() => {
        if (!syncing) return;

        const interval = setInterval(() => {
            revalidator.revalidate();
        }, 5000);

        return () => clearInterval(interval);
    }, [syncing, revalidator]);

    // Active filters from URL
    const search = searchParams.get('q') || '';
    const selectedCategory = searchParams.get('category') || '';
    const selectedLanguage = searchParams.get('language') || '';
    const selectedAuthor = searchParams.get('author') || '';
    const selectedRegion = searchParams.get('region') || '';
    const selectedTag = searchParams.get('tags') || '';
    const selectedFrom = searchParams.get('from') || '';
    const selectedTo = searchParams.get('to') || '';
    const selectedLimit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
    const currentCursor = searchParams.get('exclusiveStartKey') || null;

    // Maintain page cursor stack in client state
    const [cursorStack, setCursorStack] = useState<(string | null)[]>([null]);

    // Rebuild cursor stack if currentCursor changes
    useEffect(() => {
        if (currentCursor && !cursorStack.includes(currentCursor)) {
            setCursorStack(prev => [...prev, currentCursor]);
        }
    }, [currentCursor, cursorStack]);

    const currentPage = cursorStack.indexOf(currentCursor) + 1 || 1;

    // Helper to handle filter/search changes
    const handleFilterChange = (newFilters: Record<string, string | number | null>) => {
        const params = new URLSearchParams(searchParams);

        // Reset pagination when filter changes
        params.delete('exclusiveStartKey');
        setCursorStack([null]);

        Object.entries(newFilters).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '') {
                params.delete(key);
            } else {
                params.set(key, String(value));
            }
        });

        setSearchParams(params, { preventScrollReset: true });
    };

    const handleClearAll = () => {
        setCursorStack([null]);
        setSearchParams(new URLSearchParams());
    };

    const handlePageChange = (direction: 'next' | 'prev') => {
        const params = new URLSearchParams(searchParams);
        if (direction === 'next' && lastKey) {
            params.set('exclusiveStartKey', lastKey);
            setSearchParams(params);
            window.scrollTo({ top: 300, behavior: 'smooth' });
        } else if (direction === 'prev' && currentPage > 1) {
            const prevCursor = cursorStack[currentPage - 2];
            if (prevCursor === null) {
                params.delete('exclusiveStartKey');
            } else {
                params.set('exclusiveStartKey', prevCursor);
            }
            setSearchParams(params);
            window.scrollTo({ top: 300, behavior: 'smooth' });
        }
    };

    const hasActiveFilters = !!(
        search ||
        selectedCategory ||
        selectedLanguage ||
        selectedAuthor ||
        selectedRegion ||
        selectedTag ||
        selectedFrom ||
        selectedTo
    );

    const isTransitioning = navigation.state === 'loading';

    return (
        <div className="min-h-screen bg-gray-50">
            <KnowledgeBaseHero
                search={search}
                onSearchChange={(val) => handleFilterChange({ q: val })}
            />

            <KnowledgeBaseFilterBar
                totalCount={total_count}
                filteredCount={items.length}
                categories={filterOptions.categories}
                languages={filterOptions.languages}
                authors={filterOptions.authors}
                regions={filterOptions.regions}
                tags={filterOptions.tags}

                selectedCategory={selectedCategory}
                selectedLanguage={selectedLanguage}
                selectedAuthor={selectedAuthor}
                selectedRegion={selectedRegion}
                selectedTag={selectedTag}
                selectedFrom={selectedFrom}
                selectedTo={selectedTo}
                selectedLimit={selectedLimit}

                onFilterChange={handleFilterChange}
                onClearAll={handleClearAll}

                syncing={syncing}
                loadedCount={items.length}
            />

            <div className="py-12">
                <Container>
                    {isTransitioning ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: selectedLimit }).map((_, idx) => (
                                <KnowledgeBaseCardSkeleton key={idx} />
                            ))}
                        </div>
                    ) : items.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {items.map((item: any) => (
                                    <KnowledgeBaseCard key={item.id} item={item} />
                                ))}
                            </div>

                            <KnowledgeBasePagination
                                currentPage={currentPage}
                                hasMore={!!lastKey}
                                loadedItemsCount={items.length}
                                itemsPerPage={selectedLimit}
                                onPrevPage={() => handlePageChange('prev')}
                                onNextPage={() => handlePageChange('next')}
                            />
                        </>
                    ) : (
                        <KnowledgeBaseEmptyState
                            hasFilters={hasActiveFilters}
                            onClearFilters={handleClearAll}
                        />
                    )}
                </Container>
            </div>
        </div>
    );
}
