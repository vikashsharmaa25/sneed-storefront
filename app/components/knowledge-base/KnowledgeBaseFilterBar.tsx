import React from 'react';
import { Container } from '~/components/ui/Container';

interface KnowledgeBaseFilterBarProps {
    totalCount: number;
    filteredCount: number;
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
    syncing?: boolean;
    loadedCount?: number;
}

export function KnowledgeBaseFilterBar({
    totalCount,
    filteredCount,
    categories,
    selectedCategory,
    onSelectCategory,
    syncing = false,
    loadedCount = 0,
}: KnowledgeBaseFilterBarProps) {
    return (
        <div className="bg-white border-b border-gray-200 shadow-sm">
            <Container>
                <div className="flex items-center gap-6 py-3 text-sm text-gray-600 flex-wrap">
                    <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">
                            {filteredCount === totalCount ? `${totalCount} Articles` : `${filteredCount} of ${totalCount} Articles`}
                        </span>
                        {syncing && (
                            <span className="inline-flex items-center gap-1.5 text-[11px] bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-200 animate-pulse font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                                Loading remaining ({loadedCount} loaded)...
                            </span>
                        )}
                    </div>

                    {categories.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                            {/* All button */}
                            <button
                                onClick={() => onSelectCategory('')}
                                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                                    !selectedCategory
                                        ? 'bg-red-600 text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                All
                            </button>

                            {/* Category buttons */}
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => onSelectCategory(cat === selectedCategory ? '' : cat)}
                                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                                        selectedCategory === cat
                                            ? 'bg-red-600 text-white shadow-sm'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}
