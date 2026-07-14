import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface KnowledgeBasePaginationProps {
    currentPage: number;
    hasMore: boolean;
    loadedItemsCount: number;
    itemsPerPage: number;
    onPrevPage: () => void;
    onNextPage: () => void;
}

export function KnowledgeBasePagination({
    currentPage,
    hasMore,
    loadedItemsCount,
    itemsPerPage,
    onPrevPage,
    onNextPage,
}: KnowledgeBasePaginationProps) {
    if (currentPage === 1 && !hasMore) return null; // No pagination needed

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = startItem + loadedItemsCount - 1;

    return (
        <div className="mt-12 flex flex-col items-center gap-4">
            {/* Results info */}
            {loadedItemsCount > 0 && (
                <p className="text-sm text-gray-500">
                    Showing <span className="font-semibold text-gray-800">{startItem}–{endItem}</span>
                    {hasMore ? ' of many' : ''} articles (Page <span className="font-semibold text-gray-800">{currentPage}</span>)
                </p>
            )}

            {/* Page controls */}
            <div className="flex items-center gap-3">
                {/* Prev button */}
                <button
                    onClick={onPrevPage}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed rounded-xl text-sm font-semibold transition-all active:scale-95 shadow-xs"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Prev
                </button>

                <span className="text-sm font-bold text-gray-700 bg-gray-150 px-3.5 py-2 rounded-xl border border-gray-200">
                    Page {currentPage}
                </span>

                {/* Next button */}
                <button
                    onClick={onNextPage}
                    disabled={!hasMore}
                    className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed rounded-xl text-sm font-semibold transition-all active:scale-95 shadow-xs"
                >
                    Next
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
