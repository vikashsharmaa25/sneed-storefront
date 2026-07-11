import React, { useState, useEffect } from 'react';
import { useLoaderData, useRevalidator } from 'react-router';
import { Container } from '~/components/ui/Container';
import { getKnowledgeBaseCached } from '~/lib/api/knowledge-base.server';
import { KnowledgeBaseHero } from '~/components/knowledge-base/KnowledgeBaseHero';
import { KnowledgeBaseFilterBar } from '~/components/knowledge-base/KnowledgeBaseFilterBar';
import { KnowledgeBaseCard } from '~/components/knowledge-base/KnowledgeBaseCard';
import { KnowledgeBaseEmptyState } from '~/components/knowledge-base/KnowledgeBaseEmptyState';
import { KnowledgeBasePagination } from '~/components/knowledge-base/KnowledgeBasePagination';

const ITEMS_PER_PAGE = 12;

export async function loader({ context }: any) {
    try {
        console.log("Loader context keys:", Object.keys(context || {}));
        const { items, totalCount, syncing } = await getKnowledgeBaseCached(context?.waitUntil);
        const optimizedItems = items.map(item => ({
            id: item.id,
            title: item.title,
            summary: item.summary,
            problem: item.problem,
            category: item.category,
            language: item.language,
            tags: item.tags,
            author: item.author,
            last_updated: item.last_updated
        }));

        return {
            items: optimizedItems,
            total_count: totalCount,
            syncing
        };
    } catch (error) {
        console.error('Failed to load knowledge base from cache:', error);
        return { items: [], total_count: 0, syncing: false };
    }
}

export default function KnowledgeBaseRoute() {
    const { items: serverItems, total_count, syncing } = useLoaderData<typeof loader>();
    const revalidator = useRevalidator();
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Revalidate data periodically if server cache is still syncing
    useEffect(() => {
        if (!syncing) return;

        const interval = setInterval(() => {
            revalidator.revalidate();
        }, 3000);

        return () => clearInterval(interval);
    }, [syncing, revalidator]);

    const categories: string[] = Array.from(
        new Set(serverItems.map((i: any) => i.category).filter(Boolean))
    );

    const filtered = serverItems.filter((item: any) => {
        const matchesSearch =
            !search ||
            item.title?.toLowerCase().includes(search.toLowerCase()) ||
            item.summary?.toLowerCase().includes(search.toLowerCase()) ||
            item.tags?.some((t: string) => t.toLowerCase().includes(search.toLowerCase()));
        const matchesCategory = !selectedCategory || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <KnowledgeBaseHero search={search} onSearchChange={handleSearchChange} />

            <KnowledgeBaseFilterBar
                totalCount={total_count}
                filteredCount={filtered.length}
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryChange}
                syncing={syncing}
                loadedCount={serverItems.length}
            />

            <div className="py-12">
                <Container>
                    {paginated.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paginated.map((item: any) => (
                                    <KnowledgeBaseCard key={item.id} item={item} />
                                ))}
                            </div>

                            <KnowledgeBasePagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                totalItems={filtered.length}
                                itemsPerPage={ITEMS_PER_PAGE}
                                onPageChange={handlePageChange}
                            />
                        </>
                    ) : (
                        <KnowledgeBaseEmptyState
                            hasFilters={!!(search || selectedCategory)}
                            onClearFilters={() => {
                                setSearch('');
                                setSelectedCategory('');
                                setCurrentPage(1);
                            }}
                        />
                    )}
                </Container>
            </div>
        </div>
    );
}
