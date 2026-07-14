import React from 'react';
import { useLoaderData, Link } from 'react-router';
import { Container } from '~/components/ui/Container';
import { getTempSeoArticles } from '~/lib/api/content-management';
import { Calendar, FileText, ChevronRight } from 'lucide-react';

export async function loader() {
    try {
        const tempArticles = await getTempSeoArticles();
        return { tempArticles: tempArticles || [] };
    } catch (error) {
        console.error("Failed to load product articles:", error);
        return { tempArticles: [] };
    }
}

export default function TempSeoArticlesRoute() {
    const { tempArticles } = useLoaderData<typeof loader>();

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
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
                        Product Articles
                    </h1>
                    {tempArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tempArticles.map((article: any) => {
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
