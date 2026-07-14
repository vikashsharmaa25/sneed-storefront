import React, { useState } from 'react';
import { Container } from '~/components/ui/Container';
import { SlidersHorizontal, Calendar, Tag, Globe, User, ListFilter, X, MapPin } from 'lucide-react';

interface KnowledgeBaseFilterBarProps {
    totalCount: number;
    filteredCount: number;
    categories: string[];
    languages: string[];
    authors: string[];
    regions: string[];
    tags: string[];

    selectedCategory: string;
    selectedLanguage: string;
    selectedAuthor: string;
    selectedRegion: string;
    selectedTag: string;
    selectedFrom: string;
    selectedTo: string;
    selectedLimit: number;

    onFilterChange: (filters: {
        category?: string;
        language?: string;
        author?: string;
        region?: string;
        tags?: string;
        from?: string;
        to?: string;
        limit?: number;
    }) => void;
    onClearAll: () => void;

    syncing?: boolean;
    loadedCount?: number;
}

export function KnowledgeBaseFilterBar({
    totalCount,
    filteredCount,
    categories,
    languages,
    authors,
    regions,
    tags,
    selectedCategory,
    selectedLanguage,
    selectedAuthor,
    selectedRegion,
    selectedTag,
    selectedFrom,
    selectedTo,
    selectedLimit,
    onFilterChange,
    onClearAll,
    syncing = false,
    loadedCount = 0,
}: KnowledgeBaseFilterBarProps) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const hasActiveFilters = !!(
        selectedCategory ||
        selectedLanguage ||
        selectedAuthor ||
        selectedRegion ||
        selectedTag ||
        selectedFrom ||
        selectedTo ||
        selectedLimit !== 10
    );

    // Format ISO string to YYYY-MM-DD for date input
    const getDateValue = (isoString: string) => {
        if (!isoString) return '';
        return isoString.split('T')[0];
    };

    return (
        <div className="bg-white border-b border-gray-200 shadow-xs relative z-20">
            <Container>
                {/* Main Filter Bar Row */}
                <div className="flex items-center justify-between py-4 flex-wrap gap-4">
                    {/* Articles count & sync banner */}
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-900 text-base">
                            {filteredCount === totalCount ? `${totalCount} Articles` : `${filteredCount} of ${totalCount} Articles`}
                        </span>
                        {syncing && (
                            <span className="inline-flex items-center gap-1.5 text-[11px] bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-200 animate-pulse font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                                Syncing ({loadedCount} loaded)...
                            </span>
                        )}
                    </div>

                    {/* Quick Category Buttons & Advanced toggler */}
                    <div className="flex items-center gap-3 flex-wrap">
                        {categories.length > 0 && (
                            <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-100">
                                <button
                                    onClick={() => onFilterChange({ category: '' })}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                        !selectedCategory
                                            ? 'bg-red-600 text-white shadow-xs'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                    }`}
                                >
                                    All
                                </button>
                                {categories.slice(0, 5).map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => onFilterChange({ category: selectedCategory === cat ? '' : cat })}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                            selectedCategory === cat
                                                ? 'bg-red-600 text-white shadow-xs'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-xs font-bold transition-all hover:shadow-xs active:scale-95 ${
                                    showAdvanced
                                        ? 'bg-gray-900 border-gray-900 text-white'
                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <SlidersHorizontal className="w-3.5 h-3.5" />
                                Filters
                            </button>

                            {hasActiveFilters && (
                                <button
                                    onClick={onClearAll}
                                    className="flex items-center gap-1.5 px-3 py-2 border border-red-200 text-red-600 rounded-xl text-xs font-bold hover:bg-red-50 transition-all active:scale-95"
                                >
                                    <X className="w-3.5 h-3.5" />
                                    Clear All
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Collapsible Advanced Filters Panel */}
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 border-t border-gray-100 overflow-hidden transition-all duration-300 ${
                        showAdvanced ? 'py-5 max-h-[800px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                >
                    {/* Category Select (Fallback/Additional if more than sliced pills) */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <ListFilter className="w-3.5 h-3.5" />
                            Category
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => onFilterChange({ category: e.target.value })}
                            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all cursor-pointer font-medium"
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Language Select */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <Globe className="w-3.5 h-3.5" />
                            Language
                        </label>
                        <select
                            value={selectedLanguage}
                            onChange={(e) => onFilterChange({ language: e.target.value })}
                            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all cursor-pointer font-medium"
                        >
                            <option value="">All Languages</option>
                            {languages.map(lang => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </select>
                    </div>

                    {/* Author Select */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            Author
                        </label>
                        <select
                            value={selectedAuthor}
                            onChange={(e) => onFilterChange({ author: e.target.value })}
                            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all cursor-pointer font-medium"
                        >
                            <option value="">All Authors</option>
                            {authors.map(auth => (
                                <option key={auth} value={auth}>{auth}</option>
                            ))}
                        </select>
                    </div>

                    {/* Region Select */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            Region
                        </label>
                        <select
                            value={selectedRegion}
                            onChange={(e) => onFilterChange({ region: e.target.value })}
                            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all cursor-pointer font-medium"
                        >
                            <option value="">All Regions</option>
                            {regions.map(reg => (
                                <option key={reg} value={reg}>{reg}</option>
                            ))}
                        </select>
                    </div>

                    {/* Tags Select */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <Tag className="w-3.5 h-3.5" />
                            Tag
                        </label>
                        <select
                            value={selectedTag}
                            onChange={(e) => onFilterChange({ tags: e.target.value })}
                            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all cursor-pointer font-medium"
                        >
                            <option value="">All Tags</option>
                            {tags.map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    {/* Date From */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            From Date
                        </label>
                        <input
                            type="date"
                            value={getDateValue(selectedFrom)}
                            onChange={(e) => {
                                const val = e.target.value;
                                onFilterChange({ from: val ? `${val}T00:00:00.000Z` : '' });
                            }}
                            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all font-medium"
                        />
                    </div>

                    {/* Date To */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            To Date
                        </label>
                        <input
                            type="date"
                            value={getDateValue(selectedTo)}
                            onChange={(e) => {
                                const val = e.target.value;
                                onFilterChange({ to: val ? `${val}T23:59:59.999Z` : '' });
                            }}
                            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all font-medium"
                        />
                    </div>

                    {/* Limit / Page Size */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <ListFilter className="w-3.5 h-3.5" />
                            Items Per Page
                        </label>
                        <select
                            value={selectedLimit}
                            onChange={(e) => onFilterChange({ limit: parseInt(e.target.value) })}
                            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all cursor-pointer font-medium"
                        >
                            <option value={5}>5 per page</option>
                            <option value={10}>10 per page</option>
                            <option value={20}>20 per page</option>
                            <option value={50}>50 per page</option>
                        </select>
                    </div>
                </div>
            </Container>
        </div>
    );
}
