import React, { useState, useEffect } from 'react';
import { useLoaderData, Link, useSearchParams, useNavigate, useNavigation } from 'react-router';
import { Container } from '~/components/ui/Container';
import { getTempSeoArticles } from '~/lib/api/content-management';
import { Calendar, FileText, ChevronRight, ChevronLeft } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

export async function loader() {
    try {
        const response = await getTempSeoArticles();
        console.log('[TempSeoArticles Loader] response:', response);
        return {
            articles: response.data || [],
            totalCount: response.total_count || 0,
        };
    } catch (error) {
        console.error("Failed to load product articles:", error);
        return {
            articles: [],
            totalCount: 0,
        };
    }
}

function ArticleSkeletonCard() {
    return (
        <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden flex flex-col animate-pulse">
            <div className="h-1.5 bg-gray-200 w-full" />
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-5 w-20 bg-gray-200 rounded-full" />
                    <div className="h-5 w-24 bg-gray-200 rounded-full" />
                </div>
                <div className="h-6 bg-gray-200 rounded-md mb-2 w-3/4" />
                <div className="h-6 bg-gray-200 rounded-md mb-4 w-1/2" />
                <div className="space-y-2 mb-6 flex-1">
                    <div className="h-3.5 bg-gray-200 rounded w-full" />
                    <div className="h-3.5 bg-gray-200 rounded w-11/12" />
                    <div className="h-3.5 bg-gray-200 rounded w-4/5" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
            </div>
        </div>
    );
}

export default function TempSeoArticlesRoute() {
    const { articles, totalCount } = useLoaderData<typeof loader>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const navigation = useNavigation();

    const [isPageLoading, setIsPageLoading] = useState(false);

    // Show skeleton when router is navigating or when page searchParams change
    useEffect(() => {
        setIsPageLoading(true);
        const timer = setTimeout(() => {
            setIsPageLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchParams]);

    const showSkeleton = isPageLoading || navigation.state === 'loading';

    // Read current page reactively from searchParams
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const totalArticles = articles.length > 0 ? articles.length : totalCount;
    const totalPages = Math.max(1, Math.ceil(totalArticles / ITEMS_PER_PAGE));
    const currentPage = Math.min(Math.max(1, isNaN(pageParam) ? 1 : pageParam), totalPages);

    // Calculate display range for current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalArticles);
    const displayArticles = articles.slice(startIndex, endIndex);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setIsPageLoading(true);
            navigate(`?page=${newPage}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) pages.push(i);
            }

            if (currentPage < totalPages - 2) pages.push('...');
            if (!pages.includes(totalPages)) pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200 py-4 shadow-xs">
                <Container>
                    <nav className="flex items-center gap-2 text-sm text-gray-600">
                        <Link to="/" className="hover:text-red-800 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Product Articles</span>
                    </nav>
                </Container>
            </div>

            {/* Grid Area */}
            <div className="py-12">
                <Container>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-900">
                            Product Articles
                        </h1>
                        {totalArticles > 0 && (
                            <p className="text-sm text-gray-500 font-medium">
                                Showing <span className="font-bold text-gray-800">{displayArticles.length > 0 ? startIndex + 1 : 0}–{endIndex}</span> of <span className="font-bold text-gray-800">{totalArticles}</span> articles
                            </p>
                        )}
                    </div>

                    {showSkeleton ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                                <ArticleSkeletonCard key={idx} />
                            ))}
                        </div>
                    ) : displayArticles.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {displayArticles.map((article: any) => {
                                    return (
                                        <div
                                            key={article.id}
                                            className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col group"
                                        >
                                            {/* Top accent stripe */}
                                            <div className="h-1.5 bg-red-650 w-full" />

                                            {/* Content */}
                                            <div className="p-6 flex-1 flex flex-col">
                                                {/* Badges row */}
                                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                                    {article.page_type && (
                                                        <span className="bg-red-50 text-red-800 text-xs font-bold px-2.5 py-1 rounded-full border border-red-100 uppercase tracking-wider">
                                                            {article.page_type}
                                                        </span>
                                                    )}
                                                    {article.product_name && (
                                                        <span className="bg-blue-50 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-100">
                                                            {article.product_name}
                                                        </span>
                                                    )}
                                                    {article.normalized_name && (
                                                        <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-1 rounded-full border border-gray-200">
                                                            {article.normalized_name}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-gray-900 font-bold text-lg mb-3 line-clamp-2 group-hover:text-red-800 transition-colors">
                                                    <Link to={`/temp-seo-articles/${article.id}`}>
                                                        {article.title}
                                                    </Link>
                                                </h3>

                                                {/* Excerpt */}
                                                <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
                                                    {article.content?.replace(/<[^>]*>/g, "").substring(0, 150) || "No content available"}
                                                </p>

                                                {/* Footer */}
                                                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                                                    {article.created_at ? (
                                                        <span className="flex items-center gap-1.5 text-xs text-gray-400">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            {new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                        </span>
                                                    ) : (
                                                        <span />
                                                    )}
                                                    <Link
                                                        to={`/temp-seo-articles/${article.id}`}
                                                        className="inline-flex items-center gap-1 text-red-800 hover:text-red-950 font-bold text-sm transition-colors duration-200"
                                                    >
                                                        Read Full
                                                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
                                    <p className="text-sm text-gray-500">
                                        Page <span className="font-bold text-gray-800">{currentPage}</span> of <span className="font-bold text-gray-800">{totalPages}</span>
                                    </p>

                                    <div className="flex items-center gap-2">
                                        {/* Prev Button */}
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="flex items-center gap-1 px-3.5 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed rounded-xl text-sm font-semibold transition-all active:scale-95 shadow-xs"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Prev
                                        </button>

                                        {/* Page Numbers */}
                                        <div className="flex items-center gap-1">
                                            {getPageNumbers().map((num, idx) => (
                                                typeof num === 'number' ? (
                                                    <Link
                                                        key={idx}
                                                        to={`?page=${num}`}
                                                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                                        className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                                                            currentPage === num
                                                                ? 'bg-red-800 text-white shadow-xs'
                                                                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        {num}
                                                    </Link>
                                                ) : (
                                                    <span key={idx} className="px-2 text-gray-400 font-bold select-none">
                                                        {num}
                                                    </span>
                                                )
                                            ))}
                                        </div>

                                        {/* Next Button */}
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="flex items-center gap-1 px-3.5 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed rounded-xl text-sm font-semibold transition-all active:scale-95 shadow-xs"
                                        >
                                            Next
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">No Product Articles Found</h3>
                            <p className="text-gray-500">We couldn't find any product articles at this moment. Please check back later.</p>
                        </div>
                    )}
                </Container>
            </div>
        </div>
    );
}
