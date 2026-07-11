import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface KnowledgeBasePaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export function KnowledgeBasePagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
}: KnowledgeBasePaginationProps) {
    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    // Build visible page numbers with ellipsis
    const getPageNumbers = () => {
        const pages: (number | 'ellipsis')[] = [];
        const delta = 2; // pages on each side of current

        const rangeStart = Math.max(2, currentPage - delta);
        const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

        pages.push(1);

        if (rangeStart > 2) pages.push('ellipsis');

        for (let i = rangeStart; i <= rangeEnd; i++) {
            pages.push(i);
        }

        if (rangeEnd < totalPages - 1) pages.push('ellipsis');

        if (totalPages > 1) pages.push(totalPages);

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="mt-12 flex flex-col items-center gap-4">
            {/* Results info */}
            <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-800">{startItem}–{endItem}</span> of{' '}
                <span className="font-semibold text-gray-800">{totalItems}</span> articles
            </p>

            {/* Page controls */}
            <div className="flex items-center gap-1.5">
                {/* Prev button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                        backgroundColor: currentPage === 1 ? '#f3f4f6' : '#f3f4f6',
                        color: currentPage === 1 ? '#9ca3af' : '#374151',
                    }}
                    onMouseEnter={e => {
                        if (currentPage !== 1) {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#e5e7eb';
                        }
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f3f4f6';
                    }}
                >
                    <ChevronLeft className="w-4 h-4" />
                    Prev
                </button>

                {/* Page numbers */}
                {pages.map((page, idx) =>
                    page === 'ellipsis' ? (
                        <span
                            key={`ellipsis-${idx}`}
                            className="px-2 py-2 text-sm text-gray-400 select-none"
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page as number)}
                            className="w-9 h-9 rounded-lg text-sm font-semibold transition-all"
                            style={{
                                backgroundColor: currentPage === page ? '#dc2626' : '#f3f4f6',
                                color: currentPage === page ? '#fff' : '#374151',
                                boxShadow: currentPage === page ? '0 1px 4px rgba(220,38,38,0.25)' : 'none',
                            }}
                            onMouseEnter={e => {
                                if (currentPage !== page) {
                                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#e5e7eb';
                                }
                            }}
                            onMouseLeave={e => {
                                if (currentPage !== page) {
                                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f3f4f6';
                                }
                            }}
                        >
                            {page}
                        </button>
                    )
                )}

                {/* Next button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                        backgroundColor: '#f3f4f6',
                        color: currentPage === totalPages ? '#9ca3af' : '#374151',
                    }}
                    onMouseEnter={e => {
                        if (currentPage !== totalPages) {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#e5e7eb';
                        }
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f3f4f6';
                    }}
                >
                    Next
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
