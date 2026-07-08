import React from 'react';
import { useLoaderData, Link } from 'react-router';
import { Container } from '~/components/ui/Container';
import { getSeoArticles } from '~/lib/api/content-management';
import { Calendar, User, Clock, FileText, ChevronRight, Tag } from 'lucide-react';

export async function loader() {
    try {
        const seoArticles = await getSeoArticles();
        return { seoArticles: seoArticles || [] };
    } catch (error) {
        console.error("Failed to load articles:", error);
        return { seoArticles: [] };
    }
}

export default function SeoArticlesRoute() {
    const { seoArticles } = useLoaderData<typeof loader>();

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200 py-4 shadow-sm">
                <Container>
                    <nav className="flex items-center gap-2 text-sm text-gray-600">
                        <Link to="/" className="hover:text-red-800 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Articles</span>
                    </nav>
                </Container>
            </div>

            {/* Grid Area */}
            <div className="py-12">
                <Container>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
                        Articles
                    </h1>
                    {seoArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {seoArticles.map((article: any) => {
                                // Calculate reading time
                                const wordsPerMinute = 200;
                                const cleanText = article.content ? article.content.replace(/<[^>]*>/g, "") : "";
                                const wordCount = cleanText.split(/\s+/).length;
                                const readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

                                return (
                                    <div
                                        key={article.id}
                                        className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col group"
                                    >
                                        {/* Image */}
                                        <Link to={`/seo-articles/${article.id}`} className="relative h-48 overflow-hidden block bg-gray-50 border-b border-gray-100">
                                            <img
                                                src={article.file_url || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop'}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 p-4"
                                            />
                                            <div className="absolute top-3 left-3 bg-red-800 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                                                Article
                                            </div>
                                        </Link>

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            {/* Meta */}
                                            <div className="flex items-center gap-4 text-gray-500 text-xs mb-3">
                                                {article.industry_name && (
                                                    <span className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                                                        <Tag className="w-3 h-3" />
                                                        {article.industry_name}
                                                    </span>
                                                )}
                                                <div className="flex items-center gap-1 ml-auto">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{readTime} min read</span>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-gray-900 font-bold text-lg mb-3 line-clamp-2 group-hover:text-red-800 transition-colors">
                                                <Link to={`/seo-articles/${article.id}`}>
                                                    {article.title}
                                                </Link>
                                            </h3>

                                            {/* Description */}
                                            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                                {article.excerpt || article.content?.replace(/<[^>]*>/g, "").substring(0, 150) || "No description available"}
                                            </p>

                                            {/* Read More */}
                                            <div className="mt-auto pt-4 border-t border-gray-50">
                                                <Link
                                                    to={`/seo-articles/${article.id}`}
                                                    className="inline-flex items-center gap-1 text-red-800 hover:text-red-950 font-bold text-sm transition-colors duration-200"
                                                >
                                                    Read Full Article
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
                            <h3 className="text-lg font-bold text-gray-900 mb-2">No Articles Found</h3>
                            <p className="text-gray-500">We couldn't find any articles at this moment. Please check back later.</p>
                        </div>
                    )}
                </Container>
            </div>
        </div>
    );
}
