import React from 'react';
import { Search, FileText } from 'lucide-react';

interface KnowledgeBaseEmptyStateProps {
    hasFilters: boolean;
    onClearFilters: () => void;
}

export function KnowledgeBaseEmptyState({ hasFilters, onClearFilters }: KnowledgeBaseEmptyStateProps) {
    return (
        <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
            {hasFilters ? (
                <>
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-500 mb-4">Try different search terms or clear the filter.</p>
                    <button
                        onClick={onClearFilters}
                        className="text-red-600 font-semibold hover:underline text-sm"
                    >
                        Clear filters
                    </button>
                </>
            ) : (
                <>
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No Articles Yet</h3>
                    <p className="text-gray-500">Knowledge base articles will appear here once added.</p>
                </>
            )}
        </div>
    );
}
